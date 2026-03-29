import type React from 'react';
import { useEffect, useRef } from 'react';
// Tree-shakeable Three.js imports for better performance
import { Scene, OrthographicCamera, WebGLRenderer, PlaneGeometry, ShaderMaterial, Mesh, Color, Vector2 } from 'three';

interface LiquidUltraBackgroundProps {
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
  color6: string;
  intensity: number;
  noiseScale: number;
  gloss: number;
  refraction: number;
}

const LiquidUltraBackground: React.FC<LiquidUltraBackgroundProps> = ({
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
  color6,
  intensity,
  noiseScale,
  gloss,
  refraction,
}) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const materialRef = useRef<ShaderMaterial | null>(null);

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
    mat.uniforms.u_intensity.value = intensity;
    mat.uniforms.u_noiseScale.value = noiseScale;
    mat.uniforms.u_gloss.value = gloss;
    mat.uniforms.u_refraction.value = refraction;

    mat.uniforms.u_color1.value.set(color1);
    mat.uniforms.u_color2.value.set(color2);
    mat.uniforms.u_color3.value.set(color3);
    mat.uniforms.u_color4.value.set(color4);
    mat.uniforms.u_color5.value.set(color5);
    mat.uniforms.u_color6.value.set(color6);
  }, [
    speed,
    scale,
    complexity,
    expansion,
    twist,
    grain,
    smoothing,
    octaves,
    intensity,
    noiseScale,
    gloss,
    refraction,
    color1,
    color2,
    color3,
    color4,
    color5,
    color6,
  ]);

  useEffect(() => {
    if (!mountRef.current) return;

    // NUCLEAR CLEANUP: Remove any existing canvas before starting
    const existingCanvas = mountRef.current.querySelector('canvas');
    if (existingCanvas) {
      mountRef.current.removeChild(existingCanvas);
    }

    const vertexShader = `
      varying vec2 vUv;
      void main() {
        vUv = uv;
        gl_Position = vec4(position, 1.0);
      }
    `;

    const fragmentShader = `
      uniform float u_time;
      uniform vec2 u_resolution;
      uniform float u_speed;
      uniform float u_scale;
      uniform float u_complexity;
      uniform float u_expansion;
      uniform float u_twist;
      uniform float u_grain;
      uniform float u_smoothing;
      uniform int u_octaves;
      
      uniform float u_intensity;
      uniform float u_noiseScale;
      uniform float u_gloss;
      uniform float u_refraction;

      uniform vec3 u_color1;
      uniform vec3 u_color2;
      uniform vec3 u_color3;
      uniform vec3 u_color4;
      uniform vec3 u_color5;
      uniform vec3 u_color6;

      varying vec2 vUv;

      #define PI 3.14159265359

      mat2 rot(float a) {
        float s = sin(a), c = cos(a);
        return mat2(c, -s, s, c);
      }

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

      vec2 random2(vec2 st){
        st = vec2( dot(st,vec2(127.1,311.7)), dot(st,vec2(269.5,183.3)) );
        return -1.0 + 2.0 * fract(sin(st) * 43758.5453123);
      }

      float perlinNoise(vec2 st) {
        vec2 i = floor(st);
        vec2 f = fract(st);
        vec2 u = f * f * f * (f * (f * 6.0 - 15.0) + 10.0);
        return mix( mix( dot( random2(i + vec2(0.0,0.0) ), f - vec2(0.0,0.0) ),
                         dot( random2(i + vec2(1.0,0.0) ), f - vec2(1.0,0.0) ), u.x),
                    mix( dot( random2(i + vec2(0.0,1.0) ), f - vec2(0.0,1.0) ),
                         dot( random2(i + vec2(1.0,1.0) ), f - vec2(1.0,1.0) ), u.x), u.y);
      }

      float fbm_tex(vec2 p) {
        float v = 0.0; float a = 0.5; mat2 r = rot(0.5);
        for (int i = 0; i < 6; ++i) {
          if (i >= u_octaves) break;
          float octave_weight = mix(1.0, pow(0.4, float(i)), u_smoothing);
          v += a * perlinNoise(p * u_noiseScale) * octave_weight;
          p = r * p * 2.0;
          a *= 0.5;
        }
        return v;
      }

      vec3 getPalette(float t) {
        t = fract(t);
        float local_t = fract(t * 5.0);
        if (t < 0.2) return oklab_mix(u_color1, u_color2, local_t);
        if (t < 0.4) return oklab_mix(u_color2, u_color3, local_t);
        if (t < 0.6) return oklab_mix(u_color3, u_color4, local_t);
        if (t < 0.8) return oklab_mix(u_color4, u_color6, local_t);
        return oklab_mix(u_color6, u_color1, local_t);
      }

      vec3 applyGlassLighting(vec3 baseColor, vec2 normal, vec2 lightDir, float shininess, float intensity) {
        float light = dot(normal, normalize(lightDir));
        float diffuse = light * mix(0.35, 0.15, u_smoothing) + mix(0.65, 0.85, u_smoothing);
        vec3 highlightTint = mix(u_color5, baseColor, 0.45);
        vec3 specular = highlightTint * pow(max(0.0, light), shininess * u_gloss * 2.0) * (intensity * u_intensity);
        return clamp(baseColor * diffuse + specular, 0.0, 1.0);
      }

      float map(vec2 p, float t) {
        vec2 q = vec2(fbm_tex(p * u_complexity + t * 0.2), fbm_tex(p * u_complexity + vec2(5.2, 1.3) - t * 0.2));
        q *= rot(u_twist);
        vec2 r = vec2(fbm_tex(p + q * 2.0 + t * 0.1), fbm_tex(p + q * 2.0 - t * 0.15));
        float f = fbm_tex(p + r * u_expansion * 3.0);
        float folds = 0.5 - 0.5 * cos(f * mix(3.0, 8.0, u_smoothing) + t * 0.5);
        return mix(f, folds, u_smoothing);
      }

      void main() {
        vec2 p = vUv * 2.0 - 1.0;
        p.x *= u_resolution.x / u_resolution.y;

        float t = u_time * u_speed;
        vec2 st = p * u_scale;

        float val = map(st, t);

        vec2 eps = vec2(mix(0.01, 0.15, u_smoothing) * (1.0 + u_refraction), 0.0);
        float dx = map(st + eps.xy, t) - map(st - eps.xy, t);
        float dy = map(st + eps.yx, t) - map(st - eps.yx, t);

        vec2 normal = vec2(dx, dy);
        if (length(normal) > 0.0001) normal = normalize(normal);
        else normal = vec2(0.0, 1.0);

        vec3 baseColor = getPalette(val * 1.5 - t * 0.1);
        vec2 lightDir = normalize(vec2(1.0, 1.0));
        vec3 color = applyGlassLighting(baseColor, normal, lightDir, 8.0, 0.6);

        vec2 seed = gl_FragCoord.xy + fract(u_time) * 1000.0;
        vec3 p3 = fract(vec3(seed.xyx) * 0.1031);
        p3 += dot(p3, p3.yzx + 33.33);
        float dither = fract((p3.x + p3.y) * p3.z);
        color += (dither - 0.5) * u_grain;

        gl_FragColor = vec4(clamp(color * u_intensity, 0.0, 1.0), 1.0);
      }
    `;

    const scene = new Scene();
    const camera = new OrthographicCamera(-1, 1, 1, -1, 0.1, 10);
    camera.position.z = 1;
    const renderer = new WebGLRenderer({
      antialias: false,
      alpha: true,
      powerPreference: 'high-performance',
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5) * resolution);

    const canvas = renderer.domElement;
    canvas.setAttribute('data-bg-type', 'liquid-ultra');
    mountRef.current.appendChild(canvas);

    const material = new ShaderMaterial({
      vertexShader,
      fragmentShader,
      uniforms: {
        u_time: { value: 0.0 },
        u_resolution: { value: new Vector2(window.innerWidth, window.innerHeight) },
        u_speed: { value: speed },
        u_scale: { value: scale },
        u_complexity: { value: complexity },
        u_expansion: { value: expansion },
        u_twist: { value: twist },
        u_grain: { value: grain },
        u_smoothing: { value: smoothing },
        u_octaves: { value: octaves },
        u_intensity: { value: intensity },
        u_noiseScale: { value: noiseScale },
        u_gloss: { value: gloss },
        u_refraction: { value: refraction },
        u_color1: { value: new Color(color1) },
        u_color2: { value: new Color(color2) },
        u_color3: { value: new Color(color3) },
        u_color4: { value: new Color(color4) },
        u_color5: { value: new Color(color5) },
        u_color6: { value: new Color(color6) },
      },
      depthWrite: false,
      depthTest: false,
    });
    materialRef.current = material;

    const geometry = new PlaneGeometry(2, 2);
    const mesh = new Mesh(geometry, material);
    scene.add(mesh);

    const startTime = performance.now();
    let animationId: number;
    const animate = () => {
      animationId = requestAnimationFrame(animate);
      const currentTime = performance.now();
      const elapsedTime = (currentTime - startTime) * 0.001;
      material.uniforms.u_time.value = elapsedTime;
      renderer.render(scene, camera);
    };
    animate();

    const handleResize = () => {
      renderer.setSize(window.innerWidth, window.innerHeight);
      material.uniforms.u_resolution.value.set(window.innerWidth, window.innerHeight);
    };
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationId);
      if (mountRef.current && canvas.parentNode === mountRef.current) {
        mountRef.current.removeChild(canvas);
      }
      geometry.dispose();
      material.dispose();
      renderer.dispose();
    };
  }, [resolution]);

  return <div ref={mountRef} className="fixed inset-0 -z-10 w-full h-full pointer-events-none" />;
};

export default LiquidUltraBackground;
