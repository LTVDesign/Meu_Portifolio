import type React from 'react';
import type { ParticleConfig } from '../../types';
import { ColorControl, SliderControl } from './Controls';

interface CyberpunkEditorProps {
  config: ParticleConfig;
  updateConfig: (newConfig: Partial<ParticleConfig>) => void;
}

const CyberpunkEditor: React.FC<CyberpunkEditorProps> = ({ config, updateConfig }) => (
  <div className='grid grid-cols-1 sm:grid-cols-2 gap-x-12 gap-y-8 text-[11px]'>
    <div className='space-y-4'>
      <div>
        <h4 className='text-gray-400 text-[9px] uppercase tracking-widest mb-5 font-bold border-b border-white/5 pb-2'>
          Atmosfera e Bloom
        </h4>
        <div className='space-y-2'>
          <SliderControl
            label='Força do Bloom'
            value={config.cyberpunkBloomStrength}
            min='0'
            max='15'
            step='0.5'
            onChange={(v) => updateConfig({ cyberpunkBloomStrength: v as number })}
          />
          <SliderControl
            label='Névoa (Fog)'
            value={config.cyberpunkFogDensity}
            min='0'
            max='1'
            step='0.05'
            onChange={(v) => updateConfig({ cyberpunkFogDensity: v as number })}
          />
          <SliderControl
            label='FOV (Zoom)'
            value={config.cyberpunkCameraFOV}
            min='40'
            max='120'
            step='5'
            onChange={(v) => updateConfig({ cyberpunkCameraFOV: v as number })}
            decimals={0}
          />
        </div>
      </div>

      <div>
        <h4 className='text-gray-400 text-[9px] uppercase tracking-widest mb-5 font-bold border-b border-white/5 pb-2'>
          Movimento e Rotação
        </h4>
        <div className='space-y-2'>
          <SliderControl
            label='Vel. Avanço'
            value={config.cyberpunkSpeed}
            min='0.1'
            max='5'
            step='0.1'
            onChange={(v) => updateConfig({ cyberpunkSpeed: v as number })}
          />
          <SliderControl
            label='Vel. Rotação'
            value={config.cyberpunkRotationSpeed}
            min='0'
            max='5'
            step='0.1'
            onChange={(v) => updateConfig({ cyberpunkRotationSpeed: v as number })}
          />
        </div>
      </div>
    </div>

    <div className='space-y-4'>
      <div>
        <h4 className='text-gray-400 text-[9px] uppercase tracking-widest mb-5 font-bold border-b border-white/5 pb-2'>
          Geometria do Túnel
        </h4>
        <div className='space-y-2'>
          <SliderControl
            label='Raio do Túnel'
            value={config.cyberpunkTunnelRadius}
            min='0.2'
            max='2.5'
            step='0.1'
            onChange={(v) => updateConfig({ cyberpunkTunnelRadius: v as number })}
          />
          <SliderControl
            label='Tamanho Pontos'
            value={config.cyberpunkPointSize}
            min='0.005'
            max='0.05'
            step='0.005'
            onChange={(v) => updateConfig({ cyberpunkPointSize: v as number })}
            decimals={3}
          />
          <SliderControl
            label='Opacidade Linhas'
            value={config.cyberpunkLineOpacity}
            min='0'
            max='1'
            step='0.1'
            onChange={(v) => updateConfig({ cyberpunkLineOpacity: v as number })}
          />
        </div>
      </div>

      <div>
        <h4 className='text-gray-400 text-[9px] uppercase tracking-widest mb-5 font-bold border-b border-white/5 pb-2'>
          Cores Cyber
        </h4>
        <div className='grid grid-cols-2 gap-2'>
          <ColorControl
            label='Nó 1'
            value={config.cyberpunkColor1}
            onChange={(v) => updateConfig({ cyberpunkColor1: v as string })}
          />
          <ColorControl
            label='Nó 2'
            value={config.cyberpunkColor2}
            onChange={(v) => updateConfig({ cyberpunkColor2: v as string })}
          />
          <div className='col-span-2'>
            <ColorControl
              label='Linhas e Brilho'
              value={config.cyberpunkColor3}
              onChange={(v) => updateConfig({ cyberpunkColor3: v as string })}
            />
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default CyberpunkEditor;
