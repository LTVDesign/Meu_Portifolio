import type React from 'react';
import { useEffect, useRef } from 'react';
import {
  Color,
  Mesh,
  OrthographicCamera,
  PlaneGeometry,
  Scene,
  ShaderMaterial,
  Vector2,
  WebGLRenderer,
} from 'three';
import { useParticleConfig } from '../../contexts/ParticleConfigContext';
import { usePerformance } from '../../contexts/PerformanceContext';

interface LiquidBackgroundProps {
  resolution: number;
  octaves: number;
  speed: number;
  scale: number;
  complexity: number;
  expansion: number;
  twist: number;
  grain: number;
  smoothing: number;
  color1: string;
  color2: string;
  color3: string;
  color4: string;
  color5: string;
}

const LiquidBackground: React.FC<LiquidBackgroundProps> = ({
  resolution,
  octaves,
  speed,
  scale,
  complexity,
  expansion,
  twist,
  grain,
  smoothing,
  color1,
  color2,
  color3,
  color4,
  color5,
}) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const materialRef = useRef<ShaderMaterial | null>(null);
  const { config } = useParticleConfig();
  const { isLowPerformance } = usePerformance();
  const mouseRef = useRef({ x: 0.5, y: 0.5 });
  const lastMouseMoveRef = useRef(0);

  // Reactive uniform updates — avoids full WebGL rebuild
  useEffect(() => {
    const mat = materialRef.current;
    if (!mat) return;
    mat.uniforms.u_speed.value = speed;
    mat.uniforms.u_scale.value = scale;
    mat.uniforms.u_complexity.value = complexity;
    mat.uniforms.u_expansion.value = expansion;
    mat.uniforms.u_twist.value = twist;
    mat.uniforms.u_grain.value = grain;
    mat.uniforms.u_smoothing.value = smoothing;
    mat.uniforms.u_octaves.value = octaves;
    mat.uniforms.u_color1.value.set(color1);
    mat.uniforms.u_color2.value.set(color2);
    mat.uniforms.u_color3.value.set(color3);
    mat.uniforms.u_color4.value.set(color4);
    mat.uniforms.u_color5.value.set(color5);
  }, [
    speed,
    scale,
    complexity,
    expansion,
    twist,
    grain,
    smoothing,
    octaves,
    color1,
    color2,
    color3,
    color4,
    color5,
  ]);

  // Update mouse uniform
  useEffect(() => {
    const mat = materialRef.current;
    if (!mat) return;
    mat.uniforms.u_mouse.value.set(mouseRef.current.x, mouseRef.current.y);
    mat.uniforms.u_interactionMode.value = config.interactionMode || 'none';
  }, [config.interactionMode, mouseRef.current.x, mouseRef.current.y]);

  // Handle resolution changes
  useEffect(() => {
    // Resolution requires renderer rebuild — handled by re-mount via key or full effect
  }, [resolution]);

  const handleMouseMove = (e: MouseEvent) => {
    const now = Date.now();
    // Throttle mais agressivo em baixa performance
    const throttleTime = isLowPerformance ? 32 : 16;
    if (now - lastMouseMoveRef.current < throttleTime) return;
    lastMouseMoveRef.current = now;

    // Normaliza as coordenadas do mouse para 0-1
    mouseRef.current.x = e.clientX / window.innerWidth;
    mouseRef.current.y = 1.0 - e.clientY / window.innerHeight; // Inverte Y para corresponder ao UV
  };

  useEffect(() => {
    if (!mountRef.current) return;

    // Vertex Shader
    const vertexShader = `
      varying vec2 vUv;
      void main() {
        vUv = uv;
        gl_Position = vec4(position, 1.0);
      }
    `;

    // Fragment Shader
    const fragmentShader = `
      uniform float u_time;
      uniform vec2 u_resolution;
      uniform vec2 u_mouse;
      uniform int u_interactionMode; // 0: none, 1: blow, 2: attract, 3: freeze

      uniform float u_speed;
      uniform float u_scale;
      uniform float u_complexity;

      uniform float u_expansion;
      uniform float u_twist;
      uniform float u_grain;
      uniform float u_smoothing;
      uniform int u_octaves;

      uniform vec3 u_color1;
      uniform vec3 u_color2;
      uniform vec3 u_color3;
      uniform vec3 u_color4;
      uniform vec3 u_color5;

      varying vec2 vUv;

      #define PI 3.14159265359

      // --- Utility Functions ---
      mat2 rot(float a) {
        float s = sin(a), c = cos(a);
        return mat2(c, -s, s, c);
      }

      // --- Oklab Color Space (Prevents "Gray" Dead Zones) ---
      vec3 srgb_to_oklab(vec3 c) {
        float l = 0.4122214708 * c.r + 0.5363325363 * c.g + 0.0514459929 * c.b;
        float m = 0.2119034982 * c.r + 0.6806995451 * c.g + 0.1073969566 * c.b;
        float s = 0.0883024619 * c.r + 0.2817188376 * c.g + 0.6299787005 * c.b;
        float l_ = pow(max(0.0, l), 1.0/3.0);
        float m_ = pow(max(0.0, m), 1.0/3.0);
        float s_ = pow(max(0.0, s), 1.0/3.0);
        return vec3(
          0.2104542553*l_ + 0.7936177850*m_ - 0.0040720468*s_,
          1.9779984951*l_ - 2.4285922050*m_ + 0.4505937099*s_,
          0.0259040371*l_ + 0.7827717662*m_ - 0.8086757660*s_
        );
      }

      vec3 oklab_to_srgb(vec3 c) {
        float l_ = c.x + 0.3963377774 * c.y + 0.2158037573 * c.z;
        float m_ = c.x - 0.1055613458 * c.y - 0.0638541728 * c.z;
        float s_ = c.x - 0.0894841775 * c.y - 1.2914855480 * c.z;
        float l = l_*l_*l_;
        float m = m_*m_*m_;
        float s = s_*s_*s_;
        return vec3(
          4.0767416621 * l - 3.3077115913 * m + 0.2309699292 * s,
          -1.2684380046 * l + 2.6097574011 * m - 0.3413193965 * s,
          -0.0041960863 * l - 0.7034186147 * m + 1.7076147010 * s
        );
      }

      vec3 oklab_mix(vec3 col1, vec3 col2, float t) {
        vec3 lab1 = srgb_to_oklab(col1);
        vec3 lab2 = srgb_to_oklab(col2);
        return oklab_to_srgb(mix(lab1, lab2, t));
      }

      // --- Ultra-Smooth Quintic Perlin Noise ---
      vec2 random2(vec2 st){
        st = vec2( dot(st,vec2(127.1,311.7)), dot(st,vec2(269.5,183.3)) );
        return -1.0 + 2.0 * fract(sin(st) * 43758.5453123);
      }

      float perlinNoise(vec2 st) {
        vec2 i = floor(st);
        vec2 f = fract(st);

        // Quintic interpolation polynomial for infinitely smooth curves
        vec2 u = f * f * f * (f * (f * 6.0 - 15.0) + 10.0);

        return mix( mix( dot( random2(i + vec2(0.0,0.0) ), f - vec2(0.0,0.0) ),
                         dot( random2(i + vec2(1.0,0.0) ), f - vec2(1.0,0.0) ), u.x),
                    mix( dot( random2(i + vec2(0.0,1.0) ), f - vec2(0.0,1.0) ),
                         dot( random2(i + vec2(1.0,1.0) ), f - vec2(1.0,1.0) ), u.x), u.y);
      }

      // Fractal Brownian Motion using Quintic Perlin
      float fbm_tex(vec2 p) {
        float v = 0.0; float a = 0.5; mat2 r = rot(0.5);
        for (int i = 0; i < 5; ++i) {
          if (i >= u_octaves) break; // Optimization: Dynamic octaves

          // Exponentially fade out high frequencies for ultimate smoothness
          float octave_weight = mix(1.0, pow(0.4, float(i)), u_smoothing);
          v += a * perlinNoise(p) * octave_weight;
          p = r * p * 2.0;
          a *= 0.5;
        }
        return v;
      }

      // --- EXACT OKLAB BLENDING ---
      vec3 getPalette(float t) {
        t = fract(t);
        float local_t = fract(t * 4.0);
        if (t < 0.25) return oklab_mix(u_color1, u_color2, local_t);
        if (t < 0.50) return oklab_mix(u_color2, u_color3, local_t);
        if (t < 0.75) return oklab_mix(u_color3, u_color4, local_t);
        return oklab_mix(u_color4, u_color1, local_t);
      }

      // --- PHYSICAL GLASS LIGHTING ---
      vec3 applyGlassLighting(vec3 baseColor, vec2 normal, vec2 lightDir, float shininess, float intensity) {
        float light = dot(normal, normalize(lightDir));

        // Soften shadows based on the smoothing parameter
        float diffuse = light * mix(0.35, 0.15, u_smoothing) + mix(0.65, 0.85, u_smoothing);

        vec3 highlightTint = mix(u_color5, baseColor, 0.45);
        vec3 specular = highlightTint * pow(max(0.0, light), shininess) * intensity;

        return clamp(baseColor * diffuse + specular, 0.0, 1.0);
      }

      // --- LIQUID SILK DOMAIN WARPING ---
      float map(vec2 p, float t, vec2 mouse, int mode) {
        // Aplica distorção do mouse se o modo não for 'none' ou 'freeze'
        vec2 distortedP = p;
        if (mode != 0 && mode != 3) { // 0 = none, 3 = freeze
          vec2 mouseEffect = (mouse - 0.5) * 2.0; // Normaliza para -1 a 1
          float dist = distance(p, mouseEffect);
          float influence = smoothstep(0.5, 0.0, dist);

          // blow (1) = repulsa, attract (2) = atração
          float direction = (mode == 1) ? -1.0 : 1.0; // 1 = blow (repel), 2 = attract
          distortedP += mouseEffect * influence * 0.3 * direction;
        }

        vec2 q = vec2(fbm_tex(distortedP * u_complexity + t * 0.2), fbm_tex(distortedP * u_complexity + vec2(5.2, 1.3) - t * 0.2));
        q *= rot(u_twist);

        vec2 r = vec2(fbm_tex(distortedP + q * 2.0 + t * 0.1), fbm_tex(distortedP + q * 2.0 - t * 0.15));
        float f = fbm_tex(distortedP + r * u_expansion * 3.0);

        // Introduce trigonometric wrapping for absolutely smooth, vector-like silk folds
        float folds = 0.5 - 0.5 * cos(f * mix(3.0, 8.0, u_smoothing) + t * 0.5);

        // Morph between chaotic noise and perfect flowing waves
        return mix(f, folds, u_smoothing);
      }

      void main() {
        vec2 p = vUv * 2.0 - 1.0;
        p.x *= u_resolution.x / u_resolution.y;

        float t = u_time * u_speed;
        vec2 st = p * u_scale;

        float val = map(st, t, u_mouse, int(u_interactionMode));

        // Ultra-smooth normal calculation using Central Differences
        // Epsilon grows massively with smoothing to blur out any microscopic light bumps
        vec2 eps = vec2(mix(0.01, 0.15, u_smoothing), 0.0);
        float dx = map(st + eps.xy, t, u_mouse, int(u_interactionMode)) - map(st - eps.xy, t, u_mouse, int(u_interactionMode));
        float dy = map(st + eps.yx, t, u_mouse, int(u_interactionMode)) - map(st - eps.yx, t, u_mouse, int(u_interactionMode));

        vec2 normal = vec2(dx, dy);
        if (length(normal) > 0.0001) normal = normalize(normal);
        else normal = vec2(0.0, 1.0);

        // Map color palette over the smoothed values
        vec3 baseColor = getPalette(val * 1.5 - t * 0.1);

        vec2 lightDir = normalize(vec2(1.0, 1.0));
        vec3 color = applyGlassLighting(baseColor, normal, lightDir, 8.0, 0.6);

        // Premium Cinematic Film Grain
        vec2 seed = gl_FragCoord.xy + fract(u_time) * 1000.0;
        vec3 p3 = fract(vec3(seed.xyx) * 0.1031);
        p3 += dot(p3, p3.yzx + 33.33);
        float dither = fract((p3.x + p3.y) * p3.z);

        color += (dither - 0.5) * u_grain;

        // Central Radial Mask
        float dist = length(p);
        float mask = smoothstep(1.8, 0.2, dist);

        gl_FragColor = vec4(clamp(color, 0.0, 1.0), 1.0);
      }
    `;

    // Scene setup
    const scene = new Scene();
    const camera = new OrthographicCamera(-1, 1, 1, -1, 0.1, 10);
    camera.position.z = 1;
    const renderer = new WebGLRenderer({
      antialias: false, // Desativado para performance
      alpha: true,
      powerPreference: 'high-performance',
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio * resolution);
    mountRef.current.appendChild(renderer.domElement);

    // Shader material
    const material = new ShaderMaterial({
      vertexShader,
      fragmentShader,
      uniforms: {
        u_time: { value: 0.0 },
        u_resolution: { value: new Vector2(window.innerWidth, window.innerHeight) },
        u_mouse: { value: new Vector2(0.5, 0.5) },
        u_interactionMode: { value: 0 }, // 0: none, 1: blow, 2: attract, 3: freeze
        u_speed: { value: speed },
        u_scale: { value: scale },
        u_complexity: { value: complexity },
        u_expansion: { value: expansion },
        u_twist: { value: twist },
        u_grain: { value: grain },
        u_smoothing: { value: smoothing },
        u_octaves: { value: octaves },
        u_color1: { value: new Color(color1) },
        u_color2: { value: new Color(color2) },
        u_color3: { value: new Color(color3) },
        u_color4: { value: new Color(color4) },
        u_color5: { value: new Color(color5) },
      },
      depthWrite: false,
      depthTest: false,
    });
    materialRef.current = material;

    // Plane geometry
    const geometry = new PlaneGeometry(2, 2);
    const mesh = new Mesh(geometry, material);
    scene.add(mesh);

    // Animation loop
    const startTime = performance.now();
    const animate = () => {
      const elapsedTime = (performance.now() - startTime) * 0.001;
      material.uniforms.u_time.value = elapsedTime;
      renderer.render(scene, camera);
      requestAnimationFrame(animate);
    };
    animate();

    // Resize
    const handleResize = () => {
      renderer.setSize(window.innerWidth, window.innerHeight);
      material.uniforms.u_resolution.value.set(window.innerWidth, window.innerHeight);
    };
    window.addEventListener('resize', handleResize);
    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      mountRef.current?.removeChild(renderer.domElement);
      renderer.dispose();
    };
  }, []);

  return (
    <div
      ref={mountRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        zIndex: -1,
        pointerEvents: 'none' as const,
        touchAction: 'none' as const,
        width: '100%',
        height: '100%',
      }}
    />
  );
};

export default LiquidBackground;
