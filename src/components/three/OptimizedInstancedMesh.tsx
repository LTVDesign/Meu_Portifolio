import { useRef, useMemo, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { usePerformance } from '../../contexts/PerformanceContext';

interface OptimizedInstancedMeshProps {
    count: number;
    geometry: THREE.BufferGeometry;
    material: THREE.Material;
    positions?: THREE.Vector3[];
    colors?: THREE.Color[];
    scales?: THREE.Vector3[];
    onUpdate?: (mesh: THREE.InstancedMesh, delta: number) => void;
}

const OptimizedInstancedMesh = ({
    count,
    geometry,
    material,
    positions = [],
    colors,
    scales,
    onUpdate,
}: OptimizedInstancedMeshProps) => {
    const meshRef = useRef<THREE.InstancedMesh>(null!);
    const { isLowPerformance } = usePerformance();

    const dummy = useMemo(() => new THREE.Object3D(), []);

    // Configuração inicial das instâncias
    useEffect(() => {
        const mesh = meshRef.current;
        if (!mesh) return;

        const finalCount = isLowPerformance ? Math.floor(count * 0.4) : count;
        mesh.count = finalCount;

        for (let i = 0; i < finalCount; i++) {
            const pos = positions[i] || new THREE.Vector3(
                (Math.random() - 0.5) * 100,
                (Math.random() - 0.5) * 60,
                (Math.random() - 0.5) * 120
            );

            dummy.position.copy(pos);

            if (scales && scales[i]) {
                dummy.scale.copy(scales[i]);
            } else {
                const s = isLowPerformance ? 0.6 : 1.0;
                dummy.scale.setScalar(s + Math.random() * 0.4);
            }

            dummy.updateMatrix();
            mesh.setMatrixAt(i, dummy.matrix);

            if (colors && colors[i] && mesh.instanceColor) {
                mesh.setColorAt(i, colors[i]);
            }
        }

        mesh.instanceMatrix.needsUpdate = true;
        if (mesh.instanceColor) mesh.instanceColor.needsUpdate = true;
    }, [count, positions, scales, colors, isLowPerformance]);

    // Animação eficiente
    useFrame((_, delta) => {
        if (!meshRef.current) return;

        const mesh = meshRef.current;

        if (onUpdate) {
            onUpdate(mesh, delta);
        } else {
            for (let i = 0; i < mesh.count; i++) {
                mesh.getMatrixAt(i, dummy.matrix);
                dummy.rotation.y += delta * 0.2;
                dummy.updateMatrix();
                mesh.setMatrixAt(i, dummy.matrix);
            }
        }

        mesh.instanceMatrix.needsUpdate = true;
    });

    return (
        <instancedMesh
            ref={meshRef}
            args={[geometry, material, count]}
            frustumCulled={true}
        />
    );
};

export default OptimizedInstancedMesh;