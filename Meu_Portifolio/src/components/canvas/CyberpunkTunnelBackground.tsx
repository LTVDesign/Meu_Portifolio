import type React from 'react';
import { useEffect, useRef } from 'react';
import { useViewport } from '../../hooks/useViewport';
// Tree-shakeable Three.js imports for better performance
import {
  ACESFilmicToneMapping,
  CatmullRomCurve3,
  EdgesGeometry,
  FogExp2,
  LineBasicMaterial,
  LineSegments,
  Mesh,
  MeshBasicMaterial,
  PerspectiveCamera,
  Scene,
  SphereGeometry,
  SRGBColorSpace,
  TubeGeometry,
  Vector2,
  Vector3,
  WebGLRenderer,
} from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass';
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass';

interface CyberpunkTunnelBackgroundProps {
  bloomStrength: number;
  fogDensity: number;
  speed: number;
  color1: string;
  color2: string;
  color3: string;
}

const CyberpunkTunnelBackground: React.FC<CyberpunkTunnelBackgroundProps> = ({
  bloomStrength,
  fogDensity,
  speed,
  color1,
  color2,
  color3,
}) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const { width: viewportWidth, height: viewportHeight } = useViewport();

  const bloomPassRef = useRef<UnrealBloomPass | null>(null);
  const fogRef = useRef<FogExp2 | null>(null);
  const speedRef = useRef(speed);
  const pointMaterialsRef = useRef<MeshBasicMaterial[]>([]);
  const lineMatRef = useRef<LineBasicMaterial | null>(null);

  // Reactive updates — avoids full WebGL rebuild
  useEffect(() => {
    speedRef.current = speed;
    if (bloomPassRef.current) {
      bloomPassRef.current.strength = bloomStrength;
    }
    if (fogRef.current) {
      fogRef.current.density = fogDensity;
    }
  }, [bloomStrength, fogDensity, speed]);

  // Reactive color updates
  useEffect(() => {
    const colors = [color1, color2, color3];
    pointMaterialsRef.current.forEach((mat, i) => {
      mat.color.set(colors[i % 3]);
    });
    if (lineMatRef.current) {
      lineMatRef.current.color.set(color3);
    }
  }, [color1, color2, color3]);

  useEffect(() => {
    if (!mountRef.current) return;

    const w = viewportWidth;
    const h = viewportHeight;
    const scene = new Scene();
    scene.fog = new FogExp2(0x000000, fogDensity);
    fogRef.current = scene.fog as FogExp2;
    const camera = new PerspectiveCamera(60, w / h, 0.1, 1000);
    camera.position.z = 3;
    const renderer = new WebGLRenderer({ antialias: false }); // Desativado para performance
    renderer.setSize(w, h);
    renderer.toneMapping = ACESFilmicToneMapping;
    renderer.outputColorSpace = SRGBColorSpace;
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5)); // Limita o pixel ratio
    mountRef.current.appendChild(renderer.domElement);

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.03;
    // Desabilita interação touch para não bloquear scroll da página
    controls.touches = {
      ONE: 0,  // NONE
      TWO: 0,  // NONE
    };

    const renderScene = new RenderPass(scene, camera);
    const bloomPass = new UnrealBloomPass(new Vector2(w, h), 1.5, 0.4, 100);
    bloomPass.threshold = 0.002;
    bloomPass.strength = bloomStrength;
    bloomPass.radius = 0;
    bloomPassRef.current = bloomPass;
    const composer = new EffectComposer(renderer);
    composer.addPass(renderScene);
    composer.addPass(bloomPass);

    // Padrão inicial: túnel curvo com curvas suaves e enquadrado para a câmera
    const curvePath = [
      // Primeira curva - entrada do túnel
      0,
      -8,
      0, // Ponto inicial
      1,
      -7,
      0,
      2,
      -6,
      0,
      3,
      -5,
      0,
      4,
      -4,
      0,
      5,
      -3,
      0,
      6,
      -2,
      0,
      7,
      -1,
      0,
      8,
      0,
      0, // Meio do túnel (reto)

      // Segunda curva - curva para direita
      8,
      1,
      0,
      7,
      2,
      0,
      6,
      3,
      0,
      5,
      4,
      0,
      4,
      5,
      0,
      3,
      6,
      0,
      2,
      7,
      0,
      1,
      8,
      0,
      0,
      9,
      0,

      // Terceira curva - curva para esquerda
      -1,
      8,
      0,
      -2,
      7,
      0,
      -3,
      6,
      0,
      -4,
      5,
      0,
      -5,
      4,
      0,
      -6,
      3,
      0,
      -7,
      2,
      0,
      -8,
      1,
      0,
      -9,
      0,
      0,

      // Quarta curva - retorno ao centro
      -8,
      -1,
      0,
      -7,
      -2,
      0,
      -6,
      -3,
      0,
      -5,
      -4,
      0,
      -4,
      -5,
      0,
      -3,
      -6,
      0,
      -2,
      -7,
      0,
      -1,
      -8,
      0,
      0,
      -9,
      0, // Fim do loop
    ];

    const pointst = [];
    const len = curvePath.length;
    for (let p = 0; p < len; p += 3) {
      pointst.push(new Vector3(curvePath[p], curvePath[p + 1], curvePath[p + 2]));
    }

    const spline = new CatmullRomCurve3(pointst);

    const run = new TubeGeometry(spline, 222, 2.5, 16, true);

    const vertices = run.attributes.position;
    const pointGeometry = new SphereGeometry(0.01, 0.01, 0.01);

    const colors = [color1, color2, color3];

    // Create one shared material per color
    const sharedMaterials = colors.map((c) => new MeshBasicMaterial({ color: c }));

    for (let i = 0; i < vertices.count; i++) {
      const x = vertices.getX(i);
      const y = vertices.getY(i);
      const z = vertices.getZ(i);

      const colorIndex = i % colors.length;
      const pointMaterial = sharedMaterials[colorIndex];

      const pointMesh = new Mesh(pointGeometry, pointMaterial);
      pointMesh.position.set(x, y, z);
      scene.add(pointMesh);
    }
    pointMaterialsRef.current = sharedMaterials;

    const edges = new EdgesGeometry(run, 0.35);
    const lineMat = new LineBasicMaterial({
      color: color3,
    });
    lineMatRef.current = lineMat;

    const line2 = new LineSegments(edges, lineMat);
    scene.add(line2);

    function updateCamera(t: number) {
      const time = t * 0.1 * speedRef.current;
      const loopTime = 20 * 400;
      const p = (time % loopTime) / loopTime;
      const pos = run.parameters.path.getPointAt(p);
      const lookAt = run.parameters.path.getPointAt((p + 0.01) % 1);
      camera.position.copy(pos);
      camera.lookAt(lookAt);
    }

    const startTime = performance.now();
    let animationId: number;
    function animate() {
      animationId = requestAnimationFrame(animate);
      const elapsedTime = (performance.now() - startTime) * 0.001;
      updateCamera(elapsedTime);
      composer.render();
      controls.update();
    }

    animate();

    const handleWindowResize = () => {
      camera.aspect = viewportWidth / viewportHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(viewportWidth, viewportHeight);
    };
    window.addEventListener('resize', handleWindowResize, false);

    return () => {
      window.removeEventListener('resize', handleWindowResize);
      if (animationId) cancelAnimationFrame(animationId);
      if (mountRef.current && renderer.domElement) {
        mountRef.current.removeChild(renderer.domElement);
      }
      renderer.dispose();
      composer.dispose();
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
        pointerEvents: 'none' as const,
        touchAction: 'none' as const,
      }}
    />
  );
};

export default CyberpunkTunnelBackground;
