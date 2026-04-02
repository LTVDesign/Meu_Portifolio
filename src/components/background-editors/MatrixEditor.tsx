import type React from 'react';
import type { ParticleConfig } from '../../types';
import { ColorControl, SliderControl } from './Controls';

interface MatrixEditorProps {
  config: ParticleConfig;
  updateConfig: (newConfig: Partial<ParticleConfig>) => void;
}

const MatrixEditor: React.FC<MatrixEditorProps> = ({ config, updateConfig }) => (
  <div className='grid grid-cols-1 sm:grid-cols-2 gap-x-12 gap-y-8 text-[11px]'>
    <div className='space-y-2.5'>
      <div>
        <h4 className='text-gray-400 text-[9px] uppercase tracking-widest mb-5 font-bold border-b border-white/5 pb-2'>
          Configurações Básicas
        </h4>
        <div className='space-y-2'>
          <SliderControl
            label='Densidade'
            value={config.matrixDensity}
            min='1'
            max='200'
            step='1'
            onChange={(v) => updateConfig({ matrixDensity: v as number })}
            decimals={0}
          />
          <SliderControl
            label='Velocidade (ms)'
            value={config.matrixSpeed}
            min='1'
            max='200'
            step='1'
            onChange={(v) => updateConfig({ matrixSpeed: v as number })}
            decimals={0}
          />
          <SliderControl
            label='Tamanho Fonte (vmin)'
            value={config.matrixFontSize}
            min='0.5'
            max='30'
            step='0.5'
            onChange={(v) => updateConfig({ matrixFontSize: v as number })}
          />
          <SliderControl
            label='Comprimento Trilha'
            value={config.trailLength}
            min='5'
            max='100'
            step='1'
            onChange={(v) => updateConfig({ trailLength: v as number })}
            decimals={0}
          />
          <SliderControl
            label='Espaçamento Colunas (px)'
            value={config.columnSpacing}
            min='0'
            max='50'
            step='1'
            onChange={(v) => updateConfig({ columnSpacing: v as number })}
            decimals={0}
          />
          <SliderControl
            label='Intensidade Brilho'
            value={config.glowIntensity}
            min='0'
            max='1'
            step='0.05'
            onChange={(v) => updateConfig({ glowIntensity: v as number })}
            decimals={2}
          />
        </div>
      </div>

      <div>
        <h4 className='text-gray-400 text-[9px] uppercase tracking-widest mb-5 font-bold border-b border-white/5 pb-2'>
          Conjunto de Caracteres
        </h4>
        <div className='space-y-2'>
          <label className='block text-gray-400 text-[10px] uppercase tracking-widest mb-1.5 font-bold'>
            Tipo de Caracteres
          </label>
          <select
            value={config.matrixCharSet || 'matrix'}
            onChange={(e) =>
              updateConfig({
                matrixCharSet: e.target.value as
                  | 'matrix'
                  | 'binary'
                  | 'japanese'
                  | 'mixed',
              })
            }
            className='w-full bg-gray-800 text-white border border-gray-600 focus:border-[#915EFF] outline-none rounded px-2 py-1.5 text-xs transition-colors'
          >
            <option value='matrix'>Matrix (Hiragana/Katakana)</option>
            <option value='binary'>Binary (0-9, A-Z, a-z)</option>
            <option value='japanese'>Japanese (Hiragana/Katakana/Kanji)</option>
            <option value='mixed'>Mixed (Todos os conjuntos)</option>
          </select>
        </div>
      </div>
    </div>

    <div className='space-y-2.5'>
      <div>
        <h4 className='text-gray-400 text-[9px] uppercase tracking-widest mb-5 font-bold border-b border-white/5 pb-2'>
          Cores
        </h4>
        <div className='space-y-3'>
          <ColorControl
            label='Cor dos Caracteres'
            value={config.matrixColor}
            onChange={(v) => updateConfig({ matrixColor: v as string })}
          />
          <ColorControl
            label='Cor de Fundo'
            value={config.matrixBackgroundColor}
            onChange={(v) => updateConfig({ matrixBackgroundColor: v as string })}
          />
        </div>
      </div>

      <div>
        <h4 className='text-gray-400 text-[9px] uppercase tracking-widest mb-5 font-bold border-b border-white/5 pb-2'>
          Prévia
        </h4>
        <div className='bg-black/40 rounded-lg p-4 border border-white/10'>
          <div className='text-[10px] text-gray-400 space-y-1'>
            <p>• Densidade: {config.matrixDensity} colunas</p>
            <p>• Velocidade: {config.matrixSpeed}ms</p>
            <p>• Tamanho: {config.matrixFontSize}vmin</p>
            <p>• Trilha: {config.trailLength} caracteres</p>
            <p>• Brilho: {(config.glowIntensity * 100).toFixed(0)}%</p>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default MatrixEditor;
