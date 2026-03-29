import { useRef } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { InstancedMesh, Object3D } from 'three';
import { Detailed } from '@react-three/drei';
import { usePerformance } from '../../contexts/PerformanceContext';

interface InstancedLODProps {
    count: number;
    positions: [number, number, number][];
    highModel: unknown;
    mediumModel: unknown;
    lowModel: unknown;
    distanceThresholds?: [number, number];
}

const tempObject = new Object3D();

const InstancedLOD = ({
    count,
    positions,
    highModel,
    mediumModel,
    lowModel,
    distanceThresholds = [25, 60],
}: InstancedLODProps) => {
    const { camera } = useThree();
    const { isLowPerformance } = usePerformance();
    const meshRef = useRef<InstancedMesh>(null!);

    const thresholds = isLowPerformance
        ? [15, 40]
        : distanceThresholds;

    useFrame(() => {
        if (!meshRef.current) return;

        let visibleCount = 0;

        positions.forEach((pos, i) => {
            const distance = camera.position.distanceTo(tempObject.position.set(...pos));

            let level = 2;
            if (distance < thresholds[0]) level = 0;
            else if (distance < thresholds[1]) level = 1;

            if (isLowPerformance && distance > 20) level = 2;

            if (level < 2 || Math.random() > 0.3) {
                tempObject.position.set(...pos);
                tempObject.updateMatrix();
                meshRef.current.setMatrixAt(i, tempObject.matrix);
                visibleCount++;
            }
        });

        meshRef.current.instanceMatrix.needsUpdate = true;
        meshRef.current.count = Math.min(count, visibleCount);
    });

    return (
        <group>
            <Detailed distances={[0, thresholds[0], thresholds[1]]}>
                {highModel as any}
                {mediumModel as any}
                {lowModel as any}
            </Detailed>

            {isLowPerformance && (
                <instancedMesh ref={meshRef} args={[undefined, undefined, count]}>
                    <sphereGeometry args={[0.5, 8, 8]} />
                    <meshBasicMaterial color="#915EFF" />
                </instancedMesh>
            )}
        </group>
    );
};

export default InstancedLOD;
