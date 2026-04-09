import { Html, useProgress } from '@react-three/drei';

const Loader = () => {
  const { progress } = useProgress();
  return (
    <Html center>
      <div className='flex flex-col items-center justify-center translate-y-[-20px]'>
        <div className='motion-loader scale-[clamp(0.5,1.5vw,0.75)]'></div>
        <p
          style={{
            fontSize: 'clamp(0.75rem, 1.5vw, 0.875rem)',
            color: '#915EFF',
            fontWeight: 800,
            marginTop: 'clamp(1rem, 2vw, 1.25rem)',
            letterSpacing: '0.1em',
            fontFamily: 'monospace',
          }}
        >
          {progress.toFixed(0)}%
        </p>
      </div>
    </Html>
  );
};

export default Loader;
