import type React from 'react';
import { useEffect, useRef } from 'react';
// Tree-shakeable Three.js imports for better performance
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
import type { WavefieldUniforms } from '../../types';
import { useViewport } from '../../hooks/useViewport';

interface WavefieldUltraBackgroundProps {
  speed: number;
  amplitude: number;
  color: string;
  color2: string;
  color3: string;
  frequency: number;
  complexity: number;
  glow: number;
  starIntensity: number;
  rotationSpeed: number;
  mouseStrength: number;
}

const WavefieldUltraBackground: React.FC<WavefieldUltraBackgroundProps> = ({
  speed,
  amplitude,
  color,
  color2,
  color3,
  frequency,
  complexity,
  glow,
  starIntensity,
  rotationSpeed,
  mouseStrength,
}) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const uniformsRef = useRef<WavefieldUniforms | null>(null);
  const { width: viewportWidth, height: viewportHeight } = useViewport();

  // Reactive uniform updates — avoids full WebGL rebuild
  useEffect(() => {
    if (!uniformsRef.current) return;
    const hexToRgb = (hex: string) => {
      const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
      return result
        ? new Color(
          parseInt(result[1], 16) / 255,
          parseInt(result[2], 16) / 255,
          parseInt(result[3], 16) / 255
        )
        : new Color(0, 1, 1);
    };
    uniformsRef.current.speed.value = speed;
    uniformsRef.current.amplitude.value = amplitude;
    uniformsRef.current.color.value = hexToRgb(color);
    uniformsRef.current.color2.value = hexToRgb(color2);
    uniformsRef.current.color3.value = hexToRgb(color3);
    uniformsRef.current.frequency.value = frequency;
    uniformsRef.current.complexity.value = complexity;
    uniformsRef.current.glow.value = glow;
    uniformsRef.current.starIntensity.value = starIntensity;
    uniformsRef.current.rotationSpeed.value = rotationSpeed;
    uniformsRef.current.mouseStrength.value = mouseStrength;
  }, [
    speed,
    amplitude,
    color,
    color2,
    color3,
    frequency,
    complexity,
    glow,
    starIntensity,
    rotationSpeed,
    mouseStrength,
  ]);

  useEffect(() => {
    if (!mountRef.current) return;

    let scene: Scene,
      camera: OrthographicCamera,
      renderer: WebGLRenderer,
      material: ShaderMaterial;

    const mouse = new Vector2(0.5, 0.5);
    const targetMouse = new Vector2(0.5, 0.5);
    const hexToRgb = (hex: string) => {
      const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
      return result
        ? new Color(
          parseInt(result[1], 16) / 255,
          parseInt(result[2], 16) / 255,
          parseInt(result[3], 16) / 255
        )
        : new Color(0, 1, 1);
    };
    const uniforms = {
      t: { value: 0.0 },
      r: { value: new Vector2(viewportWidth, viewportHeight) },
      mouse: { value: new Vector2(0.5, 0.5) },
      speed: { value: speed },
      amplitude: { value: amplitude },
      color: { value: hexToRgb(color) },
      color2: { value: hexToRgb(color2) },
      color3: { value: hexToRgb(color3) },
      frequency: { value: frequency },
      complexity: { value: complexity },
      glow: { value: glow },
      starIntensity: { value: starIntensity },
      rotationSpeed: { value: rotationSpeed },
      mouseStrength: { value: mouseStrength },
    };
    uniformsRef.current = uniforms;

    function init() {
      // Global Zombie Exterminator: Remove ANY canvas tagged as 'wavefield-bg' from the entire document
      const existingCanvases = document.querySelectorAll(
        'canvas[data-bg-type="wavefield-bg"]'
      );
      existingCanvases.forEach((c) => {
        c.remove();
      });

      // Nuclear cleanup to prevent zombie canvases in the local mount
      if (mountRef.current) {
        while (mountRef.current.firstChild) {
          mountRef.current.removeChild(mountRef.current.firstChild);
        }
      }

      scene = new Scene();
      camera = new OrthographicCamera(-1, 1, 1, -1, 0.1, 10);
      camera.position.z = 1;
      renderer = new WebGLRenderer({ antialias: true, alpha: true, preserveDrawingBuffer: true });
      renderer.setClearAlpha(0);
      renderer.setSize(viewportWidth, viewportHeight);
      renderer.setPixelRatio(window.devicePixelRatio);

      const canvas = renderer.domElement;
      canvas.setAttribute('data-bg-type', 'wavefield-bg');
      mountRef.current!.appendChild(canvas);

      const geometry = new PlaneGeometry(2, 2);
      material = new ShaderMaterial({
        uniforms: uniforms,
        vertexShader: `
          varying vec2 vUv;
          void main() {
            vUv = uv;
            gl_Position = vec4(position, 1.0);
          }
        `,
        fragmentShader: `
          /* SHADER_VERSION: 1.0.5-ULTRA-ENHANCED */
          uniform vec2 r;
          uniform float t;
          uniform vec2 mouse;
          uniform float speed;
          uniform float amplitude;
          uniform float frequency;
          uniform float complexity;
          uniform float glow;
          uniform float starIntensity;
          uniform float rotationSpeed;
          uniform float mouseStrength;
          uniform vec3 color;
          uniform vec3 color2;
          uniform vec3 color3;
          varying vec2 vUv;
          #define PI 3.14159265359

          mat2 rot(float a) {
            float s = sin(a);
            float c = cos(a);
            return mat2(c, -s, s, c);
          }

          float wave(vec2 p, float phase, float freq) {
            return sin(p.x * freq + phase) * 0.3 * sin(p.y * freq * 0.5 + phase * 0.7);
          }

          float glowLine(float dist, float thickness, float intensity) {
            return intensity * thickness / (abs(dist) + thickness * 0.05);
          }

          vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
          vec2 mod289(vec2 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
          vec3 permute(vec3 x) { return mod289(((x*34.0)+1.0)*x); }

          float snoise(vec2 v) {
            const vec4 C = vec4(0.211324865405187, 0.366025403784439, -0.577350269189626, 0.024390243902439);
            vec2 i = floor(v + dot(v, C.yy));
            vec2 x0 = v - i + dot(i, C.xx);
            vec2 i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
            vec4 x12 = x0.xyxy + C.xxzz;
            x12.xy -= i1;
            i = mod289(i);
            vec3 p = permute(permute(i.y + vec3(0.0, i1.y, 1.0)) + i.x + vec3(0.0, i1.x, 1.0));
            vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy), dot(x12.zw,x12.zw)), 0.0);
            m = m*m; m = m*m;
            vec3 x = 2.0 * fract(p * C.www) - 1.0;
            vec3 h = abs(x) - 0.5;
            vec3 ox = floor(x + 0.5);
            vec3 a0 = x - ox;
            m *= (1.79284291400159 - 0.85373472095314 * (a0*a0 + h*h));
            vec3 g;
            g.x = a0.x * x0.x + h.x * x0.y;
            g.yz = a0.yz * x12.xz + h.yz * x12.yw;
            return 130.0 * dot(m, g);
          }

          float hash(vec2 p) {
            return fract(sin(dot(p, vec2(12.9898, 78.233))) * 43758.5453);
          }

          float starfield(vec2 uv, float time) {
            vec2 grid = floor(uv * 100.0);
            vec2 frac = fract(uv * 100.0) - 0.5;
            float star = hash(grid);
            if (star < 0.98) return 0.0;
            float twinkle = sin(time * 3.0 + grid.x * 10.0) * 0.5 + 0.5;
            float dist = length(frac);
            // Increased sparkle size and visibility
            float sparkle = smoothstep(0.12, 0.0, dist) * twinkle;
            return sparkle * starIntensity * 2.0;
          }

          void main() {
            vec2 uv = (vUv - 0.5) * 2.0;
            uv.x *= r.x / r.y;
            vec2 uv0 = uv;
            vec3 col = vec3(0.0);
            
            float time = t * 0.8 * speed; // Doubled from 0.4
            
            // Background cosmic dust
            float noise = (snoise(uv * 0.3 * complexity + time * 0.1) + 1.0) * 0.5;
            col += noise * color * 0.05;
            
            // Mouse Interaction
            vec2 mouse_uv = (mouse - 0.5) * 2.0;
            mouse_uv.x *= r.x / r.y;
            float mouseDist = length(uv - mouse_uv);
            uv += (mouse_uv - uv) * (0.4 * mouseStrength / (mouseDist + 0.6));
            
            float mouseGlow = 0.15 * mouseStrength / (mouseDist + 0.15);
            mouseGlow *= (sin(t * 2.0) * 0.3 + 0.7);
            col += mouseGlow * color3 * 0.4;
            
            // Rotation
            uv *= rot(time * 0.1 * rotationSpeed);
            
            // Waves
            float waveNoise = snoise(uv * 1.5 * complexity + time * 0.3) * 0.12;
            
            // Wave 1 - Primary
            float y1 = uv.y - wave(uv, time * 1.5, frequency) * amplitude + waveNoise;
            float line1 = glowLine(y1, 0.025, glow);
            col += color * line1;
            
            // Wave 2 - Secondary
            float y2 = uv.y + 0.4 - wave(uv + vec2(1.0, 0.5), time * 1.2, frequency * 1.3) * amplitude + waveNoise * 0.7;
            float line2 = glowLine(y2, 0.02, glow * 0.8);
            col += color2 * line2;
            
            // Wave 3 - Accent
            float y3 = uv.y - 0.4 - wave(uv + vec2(-0.5, 1.0), time * 1.8, frequency * 0.8) * amplitude + waveNoise * 1.4;
            float line3 = glowLine(y3, 0.015, glow * 1.2);
            col += color3 * line3;
            
            // Geometric Bloom
            float dist = length(uv0);
            float circle = abs(sin(dist * 3.0 - time * 1.2)) * exp(-dist * 0.8);
            col += color * circle * 0.2;
            
            // Stars
            float stars = starfield(uv0 * 2.5 + time * 0.02, t);
            col += stars * vec3(1.0, 0.95, 0.9);
            
            // Central Glow
            float centerGlow = exp(-dist * 1.5) * 0.25;
            col += centerGlow * color2;
            
            // Vignette
            float vignette = 1.0 - dist * 0.45;
            col *= smoothstep(0.0, 1.0, vignette);
            
            col = pow(col, vec3(0.9));
            gl_FragColor = vec4(col, 1.0);
          }
        `,
      });
      const mesh = new Mesh(geometry, material);
      scene.add(mesh);
    }

    const onMouseMove = (event: MouseEvent) => {
      targetMouse.x = event.clientX / viewportWidth;
      targetMouse.y = 1.0 - event.clientY / viewportHeight;
    };

    const onTouchMove = (event: TouchEvent) => {
      if (event.touches.length > 0) {
        targetMouse.x = event.touches[0].clientX / viewportWidth;
        targetMouse.y = 1.0 - event.touches[0].clientY / viewportHeight;
      }
    };

    const onWindowResize = () => {
      renderer.setSize(viewportWidth, viewportHeight);
      uniforms.r.value.set(viewportWidth, viewportHeight);
      renderer.setPixelRatio(window.devicePixelRatio);
    };

    let startTime: number | null = null;
    let animationId: number;
    function animate(time: number) {
      animationId = requestAnimationFrame(animate);
      if (startTime === null) startTime = time;
      const currentTime = performance.now();
      const elapsedTime = (currentTime - startTime) * 0.001;
      uniforms.t.value = elapsedTime;

      mouse.lerp(targetMouse, 0.05);
      uniforms.mouse.value.copy(mouse);
      renderer.render(scene, camera);
    }

    init();
    animate(performance.now()); // Pass initial time to animate

    window.addEventListener('mousemove', onMouseMove, { passive: true });
    // passive: true garante que o scroll da página não é bloqueado
    window.addEventListener('touchmove', onTouchMove, { passive: true });
    window.addEventListener('resize', onWindowResize, { passive: true });

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('touchmove', onTouchMove);
      window.removeEventListener('resize', onWindowResize);
      if (animationId) cancelAnimationFrame(animationId);
      if (mountRef.current && renderer.domElement) {
        mountRef.current.removeChild(renderer.domElement);
      }
      renderer.dispose();
      material.dispose();
    };
  }, [viewportWidth, viewportHeight]);

  return (
    <div
      ref={mountRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: -1,
        // Backgrounds de fundo NUNCA devem bloquear eventos da página
        pointerEvents: 'none',
        touchAction: 'pan-y',
      }}
    />
  );
};

export default WavefieldUltraBackground;
