import { useGLTF, Text, Float } from '@react-three/drei';
import { useFrame, useThree } from '@react-three/fiber';
import { useRef } from 'react';
import * as THREE from 'three';
import { useReducedMotion } from '../../hooks/useReducedMotion';

export default function NotFoundModel() {
    const { viewport } = useThree();
    const { nodes } = useGLTF('/medias/shards.glb');

    return (
        <group scale={viewport.width / 1.5}>
            {nodes.Scene.children.map((mesh, i) => (
                <Mesh key={i} data={mesh as THREE.Mesh} />
            ))}
            <Font />
        </group>
    );
}

function Font() {
    const textOptions = {
        fontSize: 0.5,
        color: '#ffffff' as const,
        anchorX: 'center' as const,
        anchorY: 'middle' as const,
    };

    return (
        <group>
            <Text {...textOptions} position={[0, 0, 0.1]}>
                eu ein
            </Text>
        </group>
    );
}

function Mesh({ data }: { data: unknown }) {
    const meshRef = useRef<THREE.Mesh>(null);
    const { viewport } = useThree();
    const prefersReduced = useReducedMotion();

    useFrame((state) => {
        if (!meshRef.current || prefersReduced) return;
        const { x, y } = state.mouse;
        meshRef.current.rotation.x = THREE.MathUtils.lerp(
            meshRef.current.rotation.x,
            y * (viewport.height / 2),
            0.1
        );
        meshRef.current.rotation.y = THREE.MathUtils.lerp(
            meshRef.current.rotation.y,
            x * (viewport.width / 2),
            0.1
        );
    });

    return (
        <Float>
            <mesh
                ref={meshRef}
                // @ts-expect-error - Spread de propriedades do mesh do GLTF
                {...data}
            />
        </Float>
    );
}
