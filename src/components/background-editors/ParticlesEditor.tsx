import type React from 'react';
import type { ParticleConfig } from '../../types';
import { ColorControl, SliderControl } from './Controls';

interface ParticlesEditorProps {
  config: ParticleConfig;
  updateConfig: (newConfig: Partial<ParticleConfig>) => void;
}

const INTERACTION_MODES = [
  { value: 'none', label: 'Nenhuma' },
  { value: 'blow', label: 'Soprar' },
  { value: 'attract', label: 'Atrair' },
  { value: 'freeze', label: 'Congelar' },
] as const;

const ParticlesEditor: React.FC<ParticlesEditorProps> = ({ config, updateConfig }) => (
  <div className='grid grid-cols-1 sm:grid-cols-2 gap-x-12 gap-y-8'>
    <div className='space-y-3'>
      <div>
        <h4 className='text-gray-400 text-[9px] uppercase tracking-widest mb-4 font-bold border-b border-white/5 pb-2'>
          Modo de Interação
        </h4>
        <div className='grid grid-cols-2 gap-3'>
          {INTERACTION_MODES.map(({ value, label }) => (
            <button
              key={value}
              type='button'
              onClick={() => updateConfig({ interactionMode: value })}
              className={`px-3 py-2 text-[10px] font-bold uppercase tracking-wider rounded transition-all ${
                (config.interactionMode || 'none') === value
                  ? 'bg-cyan-600/80 text-white shadow-lg shadow-cyan-500/30 border border-cyan-400/50'
                  : 'bg-white/5 text-gray-300 border border-white/10 hover:bg-white/10 hover:border-cyan-500/40'
              }`}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      <ColorControl
        label='Cor Pontos'
        value={config.particleColor}
        onChange={(v) => updateConfig({ particleColor: v as string })}
      />
      <ColorControl
        label='Cor Linhas'
        value={config.particleLineColor}
        onChange={(v) => updateConfig({ particleLineColor: v as string })}
      />
      <SliderControl
        label='Velocidade'
        value={config.speed}
        min='0'
        max='3'
        step='0.1'
        onChange={(v) => updateConfig({ speed: v as number })}
      />
      <SliderControl
        label='Intensidade (Alpha)'
        value={config.intensity}
        min='0.1'
        max='1'
        step='0.1'
        onChange={(v) => updateConfig({ intensity: v as number })}
      />
      <SliderControl
        label='Quantidade'
        value={config.quantity}
        min='10'
        max='300'
        step='10'
        onChange={(v) => updateConfig({ quantity: v as number })}
        decimals={0}
      />
    </div>
    <div className='space-y-3'>
      <SliderControl
        label='Tamanho'
        value={config.particleSize}
        min='0.5'
        max='10'
        step='0.5'
        onChange={(v) => updateConfig({ particleSize: v as number })}
      />
      <SliderControl
        label='Dist. Conexão'
        value={config.particleConnectDistance}
        min='50'
        max='300'
        step='10'
        onChange={(v) => updateConfig({ particleConnectDistance: v as number })}
        decimals={0}
      />
      <SliderControl
        label='Espessura Linha'
        value={config.lineThickness}
        min='0.1'
        max='3'
        step='0.1'
        onChange={(v) => updateConfig({ lineThickness: v as number })}
      />
      <SliderControl
        label='Opacidade Extra'
        value={config.particleOpacity}
        min='0.1'
        max='1'
        step='0.1'
        onChange={(v) => updateConfig({ particleOpacity: v as number })}
      />
      <SliderControl
        label='Zoom Câmera'
        value={config.zoom}
        min='0.5'
        max='3'
        step='0.1'
        onChange={(v) => updateConfig({ zoom: v as number })}
      />
    </div>
  </div>
);

export default ParticlesEditor;
