import { useRef, useMemo, useEffect } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { usePerformance } from '../../contexts/PerformanceContext';

interface ComputeInstancedLODParticlesProps {
    count?: number;
    colors?: string[];
    speed?: number;
    size?: number;
    spread?: number;
}

const ComputeInstancedLODParticles = ({
    count = 50000,
    colors = ['#915EFF', '#00D4FF', '#FF6B9D'],
    speed = 0.5,
    size = 0.02,
    spread = 50
}: ComputeInstancedLODParticlesProps) => {
    const meshRef = useRef<THREE.InstancedMesh>(null);
    useThree();
    const { level, particleCount, quality } = usePerformance();

    // Ajusta quantidade de partículas baseado na performance
    const actualCount = useMemo(() => {
        return Math.min(count, particleCount);
    }, [count, particleCount]);

    // Dados das partículas
    const particleData = useMemo(() => {
        const positions = new Float32Array(actualCount * 3);
        const velocities = new Float32Array(actualCount * 3);
        const colorsArray = new Float32Array(actualCount * 3);
        const sizes = new Float32Array(actualCount);
        const phases = new Float32Array(actualCount);

        const colorObjects = colors.map(c => new THREE.Color(c));

        for (let i = 0; i < actualCount; i++) {
            const i3 = i * 3;

            // Posição aleatória em esfera
            const theta = Math.random() * Math.PI * 2;
            const phi = Math.acos(2 * Math.random() - 1);
            const r = Math.random() * spread;

            positions[i3] = r * Math.sin(phi) * Math.cos(theta);
            positions[i3 + 1] = r * Math.sin(phi) * Math.sin(theta);
            positions[i3 + 2] = r * Math.cos(phi);

            // Velocidade aleatória
            velocities[i3] = (Math.random() - 0.5) * speed * 0.1;
            velocities[i3 + 1] = (Math.random() - 0.5) * speed * 0.1;
            velocities[i3 + 2] = (Math.random() - 0.5) * speed * 0.1;

            // Cor aleatória do palette
            const color = colorObjects[Math.floor(Math.random() * colorObjects.length)];
            colorsArray[i3] = color.r;
            colorsArray[i3 + 1] = color.g;
            colorsArray[i3 + 2] = color.b;

            // Tamanho e fase
            sizes[i] = size * (0.5 + Math.random() * 0.5) * quality;
            phases[i] = Math.random() * Math.PI * 2;
        }

        return { positions, velocities, colorsArray, sizes, phases };
    }, [actualCount, colors, speed, size, spread, quality]);

    // Matrix temporária para instancing
    const tempObject = useMemo(() => new THREE.Object3D(), []);
    const tempColor = useMemo(() => new THREE.Color(), []);

    useFrame((state, delta) => {
        if (!meshRef.current) return;

        const time = state.clock.elapsedTime;
        const positions = particleData.positions;
        const velocities = particleData.velocities;
        const colors = particleData.colorsArray;
        const sizes = particleData.sizes;
        const phases = particleData.phases;

        // Atualiza posições e matrizes
        for (let i = 0; i < actualCount; i++) {
            const i3 = i * 3;

            // Animação de movimento
            const phase = phases[i];
            const waveOffset = Math.sin(time * speed + phase) * 0.5;

            positions[i3] += velocities[i3] * delta + waveOffset * delta * 0.1;
            positions[i3 + 1] += velocities[i3 + 1] * delta + waveOffset * delta * 0.1;
            positions[i3 + 2] += velocities[i3 + 2] * delta + waveOffset * delta * 0.1;

            // Mantém partículas dentro da área
            if (Math.abs(positions[i3]) > spread) positions[i3] *= -0.9;
            if (Math.abs(positions[i3 + 1]) > spread) positions[i3 + 1] *= -0.9;
            if (Math.abs(positions[i3 + 2]) > spread) positions[i3 + 2] *= -0.9;

            // Define matrix
            tempObject.position.set(positions[i3], positions[i3 + 1], positions[i3 + 2]);
            tempObject.scale.setScalar(sizes[i] * (1 + Math.sin(time * 2 + phase) * 0.2));
            tempObject.updateMatrix();
            meshRef.current.setMatrixAt(i, tempObject.matrix);

            // Atualiza cor com pulsação
            const pulse = 0.7 + Math.sin(time * 3 + phase) * 0.3;
            tempColor.setRGB(
                colors[i3] * pulse,
                colors[i3 + 1] * pulse,
                colors[i3 + 2] * pulse
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
            meshRef.current.renderOrder = -1;
        }
    }, []);

    return (
        <group>
            <instancedMesh
                ref={meshRef}
                args={[undefined, undefined, actualCount]}
                frustumCulled
            >
                <sphereGeometry args={[1, level === 'low' ? 4 : level === 'medium' ? 6 : 8, level === 'low' ? 4 : level === 'medium' ? 6 : 8]} />
                <meshBasicMaterial
                    transparent
                    opacity={0.8}
                    depthWrite={false}
                    blending={THREE.AdditiveBlending}
                />
            </instancedMesh>
        </group>
    );
};

export default ComputeInstancedLODParticles;