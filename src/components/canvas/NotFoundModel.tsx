import { useGLTF, Text, Float } from '@react-three/drei';
import { useFrame, useThree } from '@react-three/fiber';
import { useRef } from 'react';
import * as THREE from 'three';

export default function NotFoundModel() {
    const { viewport } = useThree();
    const { nodes } = useGLTF('/medias/shards.glb');

    return (
        <group scale={viewport.width / 1.5}>
            {nodes.Scene.children.map((mesh, i) => (
                <Mesh key={i} data={mesh} />
            ))}
            <Font />
        </group>
    );
}

function Font() {
    const textOptions = {
        fontSize: 0.5,
        color: 'white' as const,
        anchorX: 'center' as const,
        anchorY: 'middle' as const,
    };

    return (
        <group>
            <Text {...textOptions} position={[0, 0, 0.1]}>
                Página não encontrada
            </Text>
        </group>
    );
}

function Mesh({ data }: { data: any }) {
    const meshRef = useRef<THREE.Mesh>(null);
    const { viewport } = useThree();

    useFrame((state) => {
        if (!meshRef.current) return;
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
                {...data}
            />
        </Float>
    );
}
