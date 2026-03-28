import type React from 'react';

const MotionLoader: React.FC = () => {
  return (
    <div
      className="fixed inset-0 z-[100] flex h-screen w-screen items-center justify-center bg-black"
      style={{ animation: 'colorRot 5000ms linear infinite' }}
    >
      <div className="motion-loader"></div>
    </div>
  );
};

export default MotionLoader;
