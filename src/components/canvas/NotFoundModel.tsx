import { Float, Text, useGLTF } from '@react-three/drei';
import { useFrame, useThree } from '@react-three/fiber';
import { useRef } from 'react';
import type { Mesh as ThreeMesh } from 'three';
import { MathUtils } from 'three';

export default function NotFoundModel() {
  const { viewport } = useThree();
  const { nodes } = useGLTF('/medias/shards.glb');

  return (
    <group scale={viewport.width / 1.5}>
      {nodes.Scene.children.map((mesh, i) => (
        <Mesh key={i} data={mesh as ThreeMesh} />
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

function Mesh({ data }: { data: any }) {
  const meshRef = useRef<ThreeMesh>(null);
  const { viewport } = useThree();

  useFrame((state) => {
    if (!meshRef.current) return;
    const { x, y } = state.mouse;
    meshRef.current.rotation.x = MathUtils.lerp(
      meshRef.current.rotation.x,
      y * (viewport.height / 2),
      0.1
    );
    meshRef.current.rotation.y = MathUtils.lerp(
      meshRef.current.rotation.y,
      x * (viewport.width / 2),
      0.1
    );
  });

  return (
    <Float>
      <mesh ref={meshRef} {...data} />
    </Float>
  );
}
