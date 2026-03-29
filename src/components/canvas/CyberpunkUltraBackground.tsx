import type React from 'react';
import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js';
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass.js';

interface CyberpunkUltraBackgroundProps {
  bloomStrength: number;
  fogDensity: number;
  speed: number;
  color1: string;
  color2: string;
  color3: string;
  rotationSpeed: number;
  tunnelRadius: number;
  pointSize: number;
  lineOpacity: number;
  cameraFOV: number;
}

const CyberpunkUltraBackground: React.FC<CyberpunkUltraBackgroundProps> = ({
  bloomStrength,
  fogDensity,
  speed,
  color1,
  color2,
  color3,
  rotationSpeed,
  tunnelRadius,
  pointSize,
  lineOpacity,
  cameraFOV,
}) => {
  const mountRef = useRef<HTMLDivElement>(null);

  const bloomPassRef = useRef<any>(null);
  const fogRef = useRef<THREE.FogExp2 | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const speedRef = useRef(speed);
  const rotationSpeedRef = useRef(rotationSpeed);
  const lineMatRef = useRef<THREE.LineBasicMaterial | null>(null);
  const pointMaterialsRef = useRef<THREE.MeshBasicMaterial[]>([]);

  // Reactive updates — avoids full WebGL rebuild
  useEffect(() => {
    speedRef.current = speed;
    rotationSpeedRef.current = rotationSpeed;
    if (bloomPassRef.current) {
      bloomPassRef.current.strength = bloomStrength;
    }
    if (fogRef.current) {
      fogRef.current.density = fogDensity;
    }
    if (cameraRef.current) {
      cameraRef.current.fov = cameraFOV;
      cameraRef.current.updateProjectionMatrix();
    }
    if (lineMatRef.current) {
      lineMatRef.current.opacity = lineOpacity;
    }
  }, [bloomStrength, fogDensity, speed, rotationSpeed, cameraFOV, lineOpacity]);

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

    // --- ZOMBIE EXTERMINATOR: Remove any existing cyberpunk background canvases ---
    const existingCanvases = document.querySelectorAll('canvas[data-bg-type="cyberpunk-bg"]');
    existingCanvases.forEach((c) => {
      console.log('KILLING ZOMBIE CYBERPUNK CANVAS');
      c.remove();
    });

    if (mountRef.current) {
      while (mountRef.current.firstChild) {
        mountRef.current.removeChild(mountRef.current.firstChild);
      }
    }
    // -----------------------------------------------------------------------------

    const w = window.innerWidth;
    const h = window.innerHeight;
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x000000, fogDensity);
    fogRef.current = scene.fog as THREE.FogExp2;
    const camera = new THREE.PerspectiveCamera(cameraFOV, w / h, 0.01, 2000);
    camera.position.z = 5;
    cameraRef.current = camera;
    const renderer = new THREE.WebGLRenderer({ antialias: false, alpha: true });
    renderer.setClearAlpha(0);
    renderer.setSize(w, h);
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));

    // Ajuste da posição inicial da câmera para dentro do túnel
    camera.position.set(0, 0, 0);

    // Ajuste fino do campo de visão para melhor efeito de túnel
    camera.fov = cameraFOV;
    camera.updateProjectionMatrix();

    const canvas = renderer.domElement;
    canvas.setAttribute('data-bg-type', 'cyberpunk-bg');
    mountRef.current.appendChild(canvas);

    // REMOVED OrbitControls as it conflicts with the path animation

    const renderScene = new RenderPass(scene, camera);
    const bloomPass = new UnrealBloomPass(new THREE.Vector2(w, h), 1.5, 0.4, 100);
    bloomPass.threshold = 0.002;
    bloomPass.strength = bloomStrength;
    bloomPass.radius = 0;
    bloomPassRef.current = bloomPass;
    const composer = new EffectComposer(renderer);
    composer.addPass(renderScene);
    composer.addPass(bloomPass);

    const curvePath = [
      -0.15439987182617188, -4.138374328613281, -3.073897361755371, -0.869240403175354,
      -5.335973739624023, -2.7324037551879883, -1.633371353149414, -5.862466812133789,
      -1.7560205459594727, -1.9328842163085938, -5.843876838684082, -1.1907804012298584,
      -2.15252685546875, -5.668161869049072, -0.644770622253418, -2.159583568572998,
      -5.050915241241455, -0.1310250163078308, -2.1433849334716797, -4.40407657623291,
      0.3640003204345703, -2.451664924621582, -3.9286396503448486, 1.3159711360931396,
      -2.7058067321777344, -3.404994487762451, 2.207650661468506, -2.0846996307373047,
      -1.873553991317749, 2.309267044067383, -1.2601451873779297, -0.2743096351623535,
      2.092146873474121, -1.0130963325500488, 0.8422636985778809, 2.544243574142456,
      -0.7751436233520508, 1.9591703414916992, 3.013312339782715, 0.2966790795326233,
      4.3367791175842285, 2.9735190868377686, 1.3506059646606445, 4.95012092590332,
      1.5352253913879395, 0.9760977625846863, 3.2327873706817627, 0.8298614025115967,
      0.2991504669189453, 1.1627817153930664, 0.39388465881347656, 0.5221062898635864,
      0.7404534816741943, -0.3582862913608551, 1.137399673461914, 1.2396659851074219,
      -1.0834779739379883, 2.7765538692474365, 4.385804653167725, -1.5419139862060547,
      4.430294990539551, 7.450641632080078, -2.0930042266845703, 5.475499153137207,
      7.852602481842041, -3.6867828369140625, 5.584137916564941, 6.385196685791016,
      -5.076840400695801, 4.807437419891357, 3.7945828437805176, -5.751949310302734,
      3.6053285598754883, 1.381692886352539, -5.501461982727051, 2.6468048095703125,
      0.4823716878890991, -4.470411777496338, 1.65478515625, -0.0785517692565918,
      -3.1033201217651367, 0.6955953240394592, -1.3061118125915527, -2.337378740310669,
      0.034491539001464844, -2.9893672466278076, -2.4886598587036133, -0.0851704403758049,
      -3.677823543548584, -2.8274037837982178, -0.2470083236694336, -4.365466117858887,
      -3.0880308151245117,
    ];

    const pointst = [];
    const len = curvePath.length;
    for (let p = 0; p < len; p += 3) {
      pointst.push(new THREE.Vector3(curvePath[p], curvePath[p + 1], curvePath[p + 2]));
    }

    const spline = new THREE.CatmullRomCurve3(pointst, true); // Ensure closed
    const run = new THREE.TubeGeometry(spline, 400, tunnelRadius, 32, true);

    // Efficient Points rendering
    const pointMat = new THREE.PointsMaterial({
      size: pointSize,
      transparent: true,
      opacity: 0.8,
      blending: THREE.AdditiveBlending,
      vertexColors: true,
    });

    const posAttr = run.attributes.position;
    const colorsAttr = new Float32Array(posAttr.count * 3);
    const colorNodes = [new THREE.Color(color1), new THREE.Color(color2), new THREE.Color(color3)];

    for (let i = 0; i < posAttr.count; i++) {
      const c = colorNodes[i % 3];
      colorsAttr[i * 3] = c.r;
      colorsAttr[i * 3 + 1] = c.g;
      colorsAttr[i * 3 + 2] = c.b;
    }

    const pointGeo = new THREE.BufferGeometry();
    pointGeo.setAttribute('position', posAttr);
    pointGeo.setAttribute('color', new THREE.BufferAttribute(colorsAttr, 3));

    const tunnelPoints = new THREE.Points(pointGeo, pointMat);
    scene.add(tunnelPoints);

    const edges = new THREE.EdgesGeometry(run, 0.35);
    const lineMat = new THREE.LineBasicMaterial({
      color: color3,
      transparent: true,
      opacity: lineOpacity,
      blending: THREE.AdditiveBlending,
    });
    lineMatRef.current = lineMat;

    const tunnelLines = new THREE.LineSegments(edges, lineMat);
    scene.add(tunnelLines);

    function updateCamera(elapsedTime: number) {
      const time = elapsedTime * speedRef.current;
      const loopTime = 40;
      const p = (time % loopTime) / loopTime;

      const pos = spline.getPointAt(p);
      const tangent = spline.getTangentAt(p).normalize();

      // Ajuste para manter a câmera dentro do túnel com uma pequena distância do centro
      const offset = new THREE.Vector3(0, 0, 0.5); // Pequeno offset para dentro do túnel

      // Aplica rotação ao offset para criar movimento dentro do túnel
      const angle = elapsedTime * 0.5 * rotationSpeedRef.current;
      offset.applyAxisAngle(tangent, angle);

      const cameraPos = pos.clone().add(offset);
      const lookAt = pos.clone().add(tangent.multiplyScalar(1));

      camera.position.copy(cameraPos);
      camera.lookAt(lookAt);

      // Ajuste da rotação da câmera para manter a orientação correta
      camera.up.set(0, 0, 1); // Mantém o "up" consistente

      // Pequeno ajuste de rotação adicional se necessário
      camera.rotateZ(-elapsedTime * 0.2 * rotationSpeedRef.current);
    }

    const startTime = performance.now();
    let animationId: number;
    function animate() {
      animationId = requestAnimationFrame(animate);
      const currentTime = performance.now();
      const elapsedTime = (currentTime - startTime) * 0.001;
      updateCamera(elapsedTime);
      composer.render();
    }

    animate();

    const handleWindowResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
      composer.setSize(window.innerWidth, window.innerHeight);
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
  }, []);

  return (
    <div
      ref={mountRef}
      style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', zIndex: -1 }}
    />
  );
};

export default CyberpunkUltraBackground;
