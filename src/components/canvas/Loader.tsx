import { Html, useProgress } from '@react-three/drei';

const Loader = () => {
  const { progress } = useProgress();
  return (
    <Html center>
      <div className='flex flex-col items-center justify-center translate-y-[-20px]'>
        <div className='motion-loader scale-50 md:scale-75'></div>
        <p
          style={{
            fontSize: 14,
            color: '#915EFF',
            fontWeight: 800,
            marginTop: 20,
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
