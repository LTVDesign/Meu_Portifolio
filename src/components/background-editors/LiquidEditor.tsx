import type React from 'react';
import { useMemo } from 'react';
import type { ParticleConfig } from '../../types';
import { ColorControl, SliderControl } from './Controls';

interface LiquidEditorProps {
  config: ParticleConfig;
  updateConfig: (newConfig: Partial<ParticleConfig>) => void;
}

const INTERACTION_MODES = [
  { value: 'none', label: 'Nenhuma' },
  { value: 'blow', label: 'Soprar' },
  { value: 'attract', label: 'Atrair' },
  { value: 'freeze', label: 'Congelar' },
] as const;

const LiquidEditor: React.FC<LiquidEditorProps> = ({ config, updateConfig }) => {
  const randomHex = () =>
    '#' +
    Math.floor(Math.random() * 16777215)
      .toString(16)
      .padStart(6, '0');

  const colorNodes = useMemo(() => [1, 2, 3, 4, 5, 6], []);

  return (
    <div className='grid grid-cols-[repeat(auto-fit,minmax(clamp(12rem,25vw,18rem),1fr))] gap-[clamp(1rem,3vw,2rem)] text-[clamp(0.6rem,1.5vw,0.7rem)]'>
      <div className='space-y-2.5'>
        <div>
          <h4 className='text-gray-400 text-[9px] uppercase tracking-widest mb-4 font-bold border-b border-white/5 pb-2'>
            Modo de Interação
          </h4>
          <div className='grid grid-cols-2 gap-3 mb-4'>
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
          <h4 className='text-gray-400 text-[9px] uppercase tracking-widest mb-4 font-bold border-b border-white/5 pb-2'>
            Dinâmica e Fluxo
          </h4>
          <div className='space-y-1'>
            <SliderControl
              label='Resolução'
              value={config.liquidResolution}
              min='0.5'
              max='2'
              step='0.1'
              onChange={(v) => updateConfig({ liquidResolution: v as number })}
            />
            <SliderControl
              label='Detalhe (Octavas)'
              value={config.liquidOctaves}
              min='1'
              max='5'
              step='1'
              onChange={(v) => updateConfig({ liquidOctaves: v as number })}
              decimals={0}
            />
            <SliderControl
              label='Fluxo Temporal'
              value={config.liquidSpeed}
              min='0'
              max='1'
              step='0.01'
              onChange={(v) => updateConfig({ liquidSpeed: v as number })}
              decimals={2}
            />
            <SliderControl
              label='Zoom (Escala)'
              value={config.liquidScale}
              min='0.01'
              max='0.2'
              step='0.01'
              onChange={(v) => updateConfig({ liquidScale: v as number })}
              decimals={2}
            />
          </div>
        </div>

        <div>
          <h4 className='text-gray-400 text-[9px] uppercase tracking-widest mb-4 font-bold border-b border-white/5 pb-2'>
            Propriedades do Fluido
          </h4>
          <div className='space-y-1'>
            <SliderControl
              label='Suavização'
              value={config.liquidSmoothing}
              min='0'
              max='1'
              step='0.1'
              onChange={(v) => updateConfig({ liquidSmoothing: v as number })}
            />
            <SliderControl
              label='Granulação'
              value={config.liquidGrain}
              min='0'
              max='0.2'
              step='0.001'
              onChange={(v) => updateConfig({ liquidGrain: v as number })}
              decimals={3}
            />
            <SliderControl
              label='Torção (Twist)'
              value={config.liquidTwist}
              min='0'
              max='5'
              step='0.1'
              onChange={(v) => updateConfig({ liquidTwist: v as number })}
            />
            <SliderControl
              label='Complexidade'
              value={config.liquidComplexity}
              min='0.1'
              max='8'
              step='0.1'
              onChange={(v) => updateConfig({ liquidComplexity: v as number })}
            />
          </div>
        </div>
      </div>

      <div className='space-y-2.5'>
        <div>
          <h4 className='text-gray-400 text-[9px] uppercase tracking-widest mb-4 font-bold border-b border-white/5 pb-2'>
            Ultra Rendering
          </h4>
          <div className='space-y-1'>
            <SliderControl
              label='Intensidade'
              value={config.liquidIntensity}
              min='0.1'
              max='2'
              step='0.1'
              onChange={(v) => updateConfig({ liquidIntensity: v as number })}
            />
            <SliderControl
              label='Brilho (Gloss)'
              value={config.liquidGloss}
              min='0'
              max='2'
              step='0.1'
              onChange={(v) => updateConfig({ liquidGloss: v as number })}
            />
            <SliderControl
              label='Escala Ruído'
              value={config.liquidNoiseScale}
              min='0.1'
              max='3'
              step='0.1'
              onChange={(v) => updateConfig({ liquidNoiseScale: v as number })}
            />
            <SliderControl
              label='Refração'
              value={config.liquidRefraction}
              min='0'
              max='1'
              step='0.1'
              onChange={(v) => updateConfig({ liquidRefraction: v as number })}
            />
          </div>
        </div>

        <div>
          <h4 className='text-gray-400 text-[9px] uppercase tracking-widest mb-4 font-bold border-b border-white/5 pb-2'>
            Espectro de Cores
          </h4>
          <div className='grid grid-cols-2 gap-2 mb-3'>
            {colorNodes.map((i) => (
              <ColorControl
                key={i}
                label={`Nó ${i}`}
                value={config[`liquidColor${i}` as keyof ParticleConfig] as string}
                onChange={(v) => updateConfig({ [`liquidColor${i}`]: v as string })}
              />
            ))}
          </div>
          <button
            type='button'
            onClick={() => {
              updateConfig({
                liquidColor1: randomHex() as string,
                liquidColor2: randomHex() as string,
                liquidColor3: randomHex() as string,
                liquidColor4: randomHex() as string,
                liquidColor5: randomHex() as string,
                liquidColor6: randomHex() as string,
              });
            }}
            className='w-full py-2 bg-blue-600/30 hover:bg-blue-600/50 border border-blue-500/40 text-blue-200 hover:text-white text-[9px] font-bold uppercase tracking-widest rounded transition-all shadow-md backdrop-blur-sm'
          >
            Gerar Paleta Aleatória
          </button>
        </div>
      </div>
    </div>
  );
};

export default LiquidEditor;
