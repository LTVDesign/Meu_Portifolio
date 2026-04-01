import type React from 'react';

interface SolidColorBackgroundProps {
  type: string;
  color1: string;
  color2: string;
  color3: string;
  angle: number;
  animationSpeed: number;
  grain: boolean;
  opacity: number;
  blur: number;
}

const SolidColorBackground: React.FC<SolidColorBackgroundProps> = ({
  type,
  color1,
  color2,
  color3,
  angle,
  animationSpeed,
  grain,
  opacity,
  blur,
}) => {
  let backgroundStyle = {};

  if (type === 'solid') {
    backgroundStyle = { backgroundColor: color1 };
  } else if (type === 'linear') {
    backgroundStyle = {
      background: `linear-gradient(${angle}deg, ${color1}, ${color2}, ${color3})`,
    };
  } else if (type === 'radial') {
    backgroundStyle = {
      background: `radial-gradient(circle at center, ${color1}, ${color2}, ${color3})`,
    };
  } else if (type === 'conic') {
    backgroundStyle = {
      background: `conic-gradient(from ${angle}deg, ${color1}, ${color2}, ${color3})`,
    };
  } else if (type === 'animated') {
    backgroundStyle = {
      background: `linear-gradient(${angle}deg, ${color1}, ${color2}, ${color3}, ${color1})`,
      backgroundSize: '300% 300%',
      animation: `gradientShift ${animationSpeed}s ease infinite`,
    };
  }

  return (
    <>
      <div
        className='fixed inset-0 -z-1'
        style={{
          ...backgroundStyle,
          opacity,
          filter: blur > 0 ? `blur(${blur}px)` : undefined,
        }}
      />
      {grain && (
        <div
          className='fixed inset-0 -z-[5] opacity-[0.03] pointer-events-none mix-blend-overlay'
          style={{
            backgroundImage:
              'url("data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.65%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E")',
          }}
        />
      )}
      {type === 'animated' && (
        <style>
          {`
                        @keyframes gradientShift {
                            0% { background-position: 0% 50%; }
                            50% { background-position: 100% 50%; }
                            100% { background-position: 0% 50%; }
                        }
                    `}
        </style>
      )}
    </>
  );
};

export default SolidColorBackground;
