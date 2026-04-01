import { Canvas } from '@react-three/fiber';
import NotFoundModel from './NotFoundModel';

export default function NotFoundScene() {
  return (
    <Canvas orthographic camera={{ zoom: 100 }}>
      <ambientLight intensity={0.5} />
      <directionalLight position={[10, 10, 5]} intensity={1} />
      <NotFoundModel />
    </Canvas>
  );
}
