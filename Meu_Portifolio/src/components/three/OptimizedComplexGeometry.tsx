import { Detailed, useGLTF } from '@react-three/drei';
import { useMemo } from 'react';
import * as THREE from 'three';
import { usePerformance } from '../../contexts/PerformanceContext';

interface OptimizedComplexGeometryProps {
  url: string;
  position?: [number, number, number];
  scale?: number;
  name?: string;
}

const OptimizedComplexGeometry = ({
  url,
  position = [0, 0, 0],
  scale = 1,
  name = 'model',
}: OptimizedComplexGeometryProps) => {
  const { scene } = useGLTF(url);
  const { isLowPerformance } = usePerformance();

  // Clona e otimiza a cena
  const optimizedScene = useMemo(() => {
    const cloned = scene.clone();

    cloned.traverse((child) => {
      if (child instanceof THREE.Mesh) {
        // Garanta BufferGeometry
        if (!(child.geometry instanceof THREE.BufferGeometry)) {
          child.geometry = new THREE.BufferGeometry();
        }

        // Simplificação em runtime se necessário
        if (isLowPerformance && child.geometry.attributes.position.count > 5000) {
          // Reduz vértices manualmente em low performance
          const position = child.geometry.attributes.position;
          const stride = Math.ceil(position.count / 2000);
          const newPositions = [];

          for (let i = 0; i < position.count; i += stride) {
            newPositions.push(position.getX(i), position.getY(i), position.getZ(i));
          }

          child.geometry.setAttribute(
            'position',
            new THREE.BufferAttribute(new Float32Array(newPositions), 3)
          );
        }

        // Otimizações comuns
        child.geometry.computeVertexNormals();
        if (child.material && !Array.isArray(child.material)) {
          child.material.needsUpdate = true;
        }
      }
    });

    return cloned;
  }, [scene, isLowPerformance]);

  return (
    <group position={position} scale={scale} name={name}>
      <Detailed distances={isLowPerformance ? [0, 20, 50] : [0, 35, 80]}>
        {/* High detail */}
        <primitive object={optimizedScene.clone()} />
        {/* Medium detail */}
        <primitive object={optimizedScene.clone()} />
        {/* Low detail */}
        <primitive object={optimizedScene.clone()} />
      </Detailed>
    </group>
  );
};

export default OptimizedComplexGeometry;
