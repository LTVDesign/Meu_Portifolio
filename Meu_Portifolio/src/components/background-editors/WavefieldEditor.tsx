import type React from 'react';
import type { ParticleConfig } from '../../types';
import { ColorControl, SliderControl } from './Controls';

interface WavefieldEditorProps {
  config: ParticleConfig;
  updateConfig: (newConfig: Partial<ParticleConfig>) => void;
}

const WavefieldEditor: React.FC<WavefieldEditorProps> = ({ config, updateConfig }) => (
  <div className='grid grid-cols-1 sm:grid-cols-2 gap-x-12 gap-y-8 text-[11px]'>
    <div className='space-y-4'>
      <div>
        <h4 className='text-gray-400 text-[9px] uppercase tracking-widest mb-5 font-bold border-b border-white/5 pb-2'>
          Geral e Ondulação
        </h4>
        <div className='space-y-2'>
          <SliderControl
            label='Velocidade'
            value={config.wavefieldSpeed}
            min='0.1'
            max='3'
            step='0.1'
            onChange={(v) => updateConfig({ wavefieldSpeed: v as number })}
          />
          <SliderControl
            label='Amplitude'
            value={config.wavefieldAmplitude}
            min='0.1'
            max='5'
            step='0.1'
            onChange={(v) => updateConfig({ wavefieldAmplitude: v as number })}
          />
          <SliderControl
            label='Frequência'
            value={config.wavefieldFrequency}
            min='0.1'
            max='10'
            step='0.1'
            onChange={(v) => updateConfig({ wavefieldFrequency: v as number })}
          />
          <SliderControl
            label='Vel. Rotação'
            value={config.wavefieldRotationSpeed}
            min='0'
            max='3'
            step='0.1'
            onChange={(v) => updateConfig({ wavefieldRotationSpeed: v as number })}
          />
        </div>
      </div>

      <div>
        <h4 className='text-gray-400 text-[9px] uppercase tracking-widest mb-5 font-bold border-b border-white/5 pb-2'>
          Interação e Mouse
        </h4>
        <div className='space-y-2'>
          <SliderControl
            label='Força Mouse'
            value={config.wavefieldMouseStrength}
            min='0'
            max='3'
            step='0.1'
            onChange={(v) => updateConfig({ wavefieldMouseStrength: v as number })}
          />
          <SliderControl
            label='Complexidade'
            value={config.wavefieldComplexity}
            min='0.1'
            max='5'
            step='0.1'
            onChange={(v) => updateConfig({ wavefieldComplexity: v as number })}
          />
        </div>
      </div>
    </div>

    <div className='space-y-4'>
      <div>
        <h4 className='text-gray-400 text-[9px] uppercase tracking-widest mb-5 font-bold border-b border-white/5 pb-2'>
          Cores e Brilho
        </h4>
        <div className='space-y-3'>
          <div className='grid grid-cols-2 gap-2'>
            <ColorControl
              label='Onda Principal'
              value={config.wavefieldColor}
              onChange={(v) => updateConfig({ wavefieldColor: v as string })}
            />
            <ColorControl
              label='Onda Secundária'
              value={config.wavefieldColor2}
              onChange={(v) => updateConfig({ wavefieldColor2: v as string })}
            />
          </div>
          <ColorControl
            label='Acento/Glow'
            value={config.wavefieldColor3}
            onChange={(v) => updateConfig({ wavefieldColor3: v as string })}
          />
          <SliderControl
            label='Intensidade Glow'
            value={config.wavefieldGlow}
            min='0.1'
            max='2'
            step='0.1'
            onChange={(v) => updateConfig({ wavefieldGlow: v as number })}
          />
        </div>
      </div>

      <div>
        <h4 className='text-gray-400 text-[9px] uppercase tracking-widest mb-5 font-bold border-b border-white/5 pb-2'>
          Ambientação (Estrelas)
        </h4>
        <div className='space-y-2'>
          <SliderControl
            label='Brilho Estrelas'
            value={config.wavefieldStarIntensity}
            min='0'
            max='1'
            step='0.05'
            onChange={(v) => updateConfig({ wavefieldStarIntensity: v as number })}
          />
        </div>
      </div>
    </div>
  </div>
);

export default WavefieldEditor;
