interface MotionLoaderProps {
  isSection?: boolean;
}

const MotionLoader: React.FC<MotionLoaderProps> = ({ isSection }) => {
  return (
    <div
      className={`${
        isSection ? 'relative is-section' : 'fixed inset-0 z-[100] h-screen w-screen'
      } motion-loader-container`}
    >
      <div className="motion-loader"></div>
    </div>
  );
};

export default MotionLoader;
