import { useFrame, useThree } from '@react-three/fiber';
import { useEffect, useMemo, useRef } from 'react';
import type React from 'react';
import * as THREE from 'three';
import { useParticleConfig } from '../../contexts/ParticleConfigContext';
import { usePerformance } from '../../contexts/PerformanceContext';

interface ComputeInstancedLODParticlesProps {
  count?: number;
  colors?: string[];
  speed?: number;
  size?: number;
  spread?: number;
  /** @deprecated use mouseRef instead */
  mousePosition?: { x: number; y: number; z: number };
  /** Ref mutável para posição do mouse em coordenadas 3D */
  mouseRef?: React.MutableRefObject<{ x: number; y: number; z: number }>;
}

const ComputeInstancedLODParticles = ({
  count = 15000,
  colors = ['#915EFF', '#00D4FF', '#FF6B9D'],
  speed = 0.5,
  size = 0.02,
  spread = 50,
  mouseRef: externalMouseRef,
}: ComputeInstancedLODParticlesProps) => {
  const meshRef = useRef<THREE.InstancedMesh>(null);
  const { camera, size: canvasSize } = useThree();
  const { level, particleCount, quality } = usePerformance();
  const { config } = useParticleConfig();

  // Ref para interactionMode — garante reatividade sem re-render
  const interactionModeRef = useRef(config.interactionMode || 'none');
  useEffect(() => {
    interactionModeRef.current = config.interactionMode || 'none';
  }, [config.interactionMode]);

  // Posição do mouse em coordenadas 3D — usa ref externo ou cria interno
  const internalMouseRef = useRef<{ x: number; y: number; z: number }>({ x: 0, y: 0, z: 0 });
  const mousePositionRef = externalMouseRef || internalMouseRef;

  // Captura de mouse interna (fallback quando não há ref externo)
  useEffect(() => {
    if (externalMouseRef) return; // Já gerenciado externamente

    const handleMouseMove = (e: MouseEvent) => {
      const ndcX = (e.clientX / canvasSize.width) * 2 - 1;
      const ndcY = -(e.clientY / canvasSize.height) * 2 + 1;

      const vec = new THREE.Vector3(ndcX, ndcY, 0.5);
      vec.unproject(camera);
      const dir = vec.sub(camera.position).normalize();
      const distance = -camera.position.z / dir.z;
      const pos = camera.position.clone().add(dir.multiplyScalar(distance));

      mousePositionRef.current = { x: pos.x, y: pos.y, z: pos.z };
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length === 0) return;
      const touch = e.touches[0];
      const ndcX = (touch.clientX / canvasSize.width) * 2 - 1;
      const ndcY = -(touch.clientY / canvasSize.height) * 2 + 1;

      const vec = new THREE.Vector3(ndcX, ndcY, 0.5);
      vec.unproject(camera);
      const dir = vec.sub(camera.position).normalize();
      const distance = -camera.position.z / dir.z;
      const pos = camera.position.clone().add(dir.multiplyScalar(distance));

      mousePositionRef.current = { x: pos.x, y: pos.y, z: pos.z };
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('touchmove', handleTouchMove, { passive: true });

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('touchmove', handleTouchMove);
    };
  }, [camera, canvasSize, externalMouseRef, mousePositionRef]);

  // Ajusta quantidade de partículas baseado na performance
  const actualCount = useMemo(() => {
    const baseCount = Math.min(count, particleCount);
    if (level === 'low') return Math.min(baseCount, 3000);
    if (level === 'medium') return Math.min(baseCount, 8000);
    return baseCount;
  }, [count, particleCount, level]);

  // Dados das partículas
  const particleData = useMemo(() => {
    const positions = new Float32Array(actualCount * 3);
    const velocities = new Float32Array(actualCount * 3);
    const colorsArray = new Float32Array(actualCount * 3);
    const sizes = new Float32Array(actualCount);
    const phases = new Float32Array(actualCount);

    const colorObjects = colors.map((c) => new THREE.Color(c));

    for (let i = 0; i < actualCount; i++) {
      const i3 = i * 3;

      // Posição aleatória em esfera
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      const r = Math.random() * spread;

      positions[i3]     = r * Math.sin(phi) * Math.cos(theta);
      positions[i3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      positions[i3 + 2] = r * Math.cos(phi);

      // Velocidade aleatória
      velocities[i3]     = (Math.random() - 0.5) * speed * 0.1;
      velocities[i3 + 1] = (Math.random() - 0.5) * speed * 0.1;
      velocities[i3 + 2] = (Math.random() - 0.5) * speed * 0.1;

      // Cor aleatória do palette
      const color = colorObjects[Math.floor(Math.random() * colorObjects.length)];
      colorsArray[i3]     = color.r;
      colorsArray[i3 + 1] = color.g;
      colorsArray[i3 + 2] = color.b;

      // Tamanho e fase
      sizes[i]  = size * (0.5 + Math.random() * 0.5) * quality;
      phases[i] = Math.random() * Math.PI * 2;
    }

    return { positions, velocities, colorsArray, sizes, phases };
  }, [actualCount, colors, speed, size, spread, quality]);

  // Matrix temporária para instancing
  const tempObject = useMemo(() => new THREE.Object3D(), []);
  const tempColor   = useMemo(() => new THREE.Color(), []);

  useFrame((state, delta) => {
    if (!meshRef.current) return;

    const time = state.clock.elapsedTime;
    const { positions, velocities, colorsArray, sizes, phases } = particleData;

    // Lê o modo de interação via ref (sempre atualizado)
    const mode = interactionModeRef.current;

    // Raio de interação — proporcional ao spread para funcionar em qualquer configuração
    const interactionRadius = spread * 0.35;

    // Força de interação — bem mais forte para ser visível
    // blow: repulsa forte e rápida
    // attract: atração suave e contínua
    const blowForce    = 18.0;
    const attractForce = 12.0;

    // Posição atual do mouse
    const mx = mousePositionRef.current.x;
    const my = mousePositionRef.current.y;
    const mz = mousePositionRef.current.z;

    for (let i = 0; i < actualCount; i++) {
      const i3 = i * 3;

      if (mode !== 'freeze') {
        // Animação de movimento base (flutuação)
        const phase      = phases[i];
        const waveOffset = Math.sin(time * speed + phase) * 0.5;

        positions[i3]     += velocities[i3]     * delta + waveOffset * delta * 0.1;
        positions[i3 + 1] += velocities[i3 + 1] * delta + waveOffset * delta * 0.1;
        positions[i3 + 2] += velocities[i3 + 2] * delta + waveOffset * delta * 0.1;

        // Interação com o mouse (blow/attract)
        if (mode === 'blow' || mode === 'attract') {
          const dx   = positions[i3]     - mx;
          const dy   = positions[i3 + 1] - my;
          const dz   = positions[i3 + 2] - mz;
          const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);

          if (dist < interactionRadius && dist > 0.01) {
            // Força cai linearmente com a distância (mais forte no centro)
            const normalizedForce = (interactionRadius - dist) / interactionRadius;

            if (mode === 'blow') {
              // Soprar: empurra para longe do cursor com força forte e imediata
              const force = normalizedForce * normalizedForce * blowForce * delta;
              positions[i3]     += (dx / dist) * force;
              positions[i3 + 1] += (dy / dist) * force;
              positions[i3 + 2] += (dz / dist) * force;

              // Adiciona velocidade extra para efeito de "explosão"
              velocities[i3]     += (dx / dist) * force * 0.5;
              velocities[i3 + 1] += (dy / dist) * force * 0.5;
              velocities[i3 + 2] += (dz / dist) * force * 0.5;
            } else {
              // Atrair: puxa suavemente em direção ao cursor
              const force = normalizedForce * attractForce * delta;
              positions[i3]     -= (dx / dist) * force;
              positions[i3 + 1] -= (dy / dist) * force;
              positions[i3 + 2] -= (dz / dist) * force;

              // Amortece a velocidade para evitar oscilação
              velocities[i3]     *= 0.95;
              velocities[i3 + 1] *= 0.95;
              velocities[i3 + 2] *= 0.95;
            }
          } else if (mode === 'blow') {
            // Amortece velocidade extra quando fora do raio (blow)
            velocities[i3]     *= 0.98;
            velocities[i3 + 1] *= 0.98;
            velocities[i3 + 2] *= 0.98;
          }
        }

        // Mantém partículas dentro da área com bounce suave
        if (Math.abs(positions[i3])     > spread) {
          positions[i3]     *= -0.9;
          velocities[i3]     *= -0.5;
        }
        if (Math.abs(positions[i3 + 1]) > spread) {
          positions[i3 + 1] *= -0.9;
          velocities[i3 + 1] *= -0.5;
        }
        if (Math.abs(positions[i3 + 2]) > spread) {
          positions[i3 + 2] *= -0.9;
          velocities[i3 + 2] *= -0.5;
        }
      }

      // Define matrix
      tempObject.position.set(positions[i3], positions[i3 + 1], positions[i3 + 2]);
      tempObject.scale.setScalar(sizes[i] * (1 + Math.sin(time * 2 + phases[i]) * 0.2));
      tempObject.updateMatrix();
      meshRef.current.setMatrixAt(i, tempObject.matrix);

      // Atualiza cor com pulsação
      const pulse = 0.7 + Math.sin(time * 3 + phases[i]) * 0.3;
      tempColor.setRGB(
        colorsArray[i3]     * pulse,
        colorsArray[i3 + 1] * pulse,
        colorsArray[i3 + 2] * pulse
      );
      meshRef.current.setColorAt(i, tempColor);
    }

    meshRef.current.instanceMatrix.needsUpdate = true;
    if (meshRef.current.instanceColor) {
      meshRef.current.instanceColor.needsUpdate = true;
    }
  });

  // Otimização: frustum culling e LOD
  useEffect(() => {
    if (meshRef.current) {
      meshRef.current.frustumCulled = true;
      meshRef.current.renderOrder   = -999;
    }
  }, []);

  return (
    <group>
      <instancedMesh
        ref={meshRef}
        args={[undefined, undefined, actualCount]}
        frustumCulled
        renderOrder={-999}
      >
        <sphereGeometry
          args={[
            1,
            level === 'low' ? 3 : level === 'medium' ? 5 : 7,
            level === 'low' ? 3 : level === 'medium' ? 5 : 7,
          ]}
        />
        <meshBasicMaterial
          transparent
          opacity={level === 'low' ? 0.6 : 0.8}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </instancedMesh>
    </group>
  );
};

export default ComputeInstancedLODParticles;
