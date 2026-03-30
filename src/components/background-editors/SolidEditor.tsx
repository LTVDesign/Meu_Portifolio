import React from 'react';
import type { ParticleConfig } from '../../types';
import { SliderControl, ColorControl } from './Controls';

interface SolidEditorProps {
    config: ParticleConfig;
    updateConfig: (newConfig: Partial<ParticleConfig>) => void;
}

const SolidEditor: React.FC<SolidEditorProps> = ({ config, updateConfig }) => (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-12 gap-y-8">
        <div className="block mb-2">
            <label
                htmlFor="solid-type"
                className="block text-gray-300 text-[10px] mb-1 uppercase tracking-wider font-semibold"
            >
                Tipo de Fundo
            </label>
            <select
                id="solid-type"
                value={config.solidType}
                onChange={(e) => updateConfig({ solidType: e.target.value as string })}
                className="w-full bg-gray-800 text-white border border-gray-600 focus:border-[#915EFF] outline-none rounded px-2 py-1.5 text-xs mb-1 transition-colors"
            >
                <option value="solid">Cor Sólida Única</option>
                <option value="linear">Gradiente Linear</option>
                <option value="radial">Gradiente Radial</option>
                <option value="conic">Gradiente Cônico</option>
                <option value="animated">Gradiente Animado</option>
            </select>
        </div>

        <div className="grid grid-cols-2 gap-2 mt-2">
            <ColorControl
                label={config.solidType === 'solid' ? 'Cor' : 'Cor 1'}
                value={config.solidColor1}
                onChange={(v) => updateConfig({ solidColor1: v as string })}
            />
            {config.solidType !== 'solid' && (
                <>
                    <ColorControl
                        label="Cor 2"
                        value={config.solidColor2}
                        onChange={(v) => updateConfig({ solidColor2: v as string })}
                    />
                    <div className="col-span-2">
                        <ColorControl
                            label="Cor 3"
                            value={config.solidColor3}
                            onChange={(v) => updateConfig({ solidColor3: v as string })}
                        />
                    </div>
                </>
            )}
        </div>

        {/* Controles de transparência (alpha) para cada cor */}
        {config.solidType === 'solid' && (
            <SliderControl
                label="Transparência Cor 1"
                value={config.solidColor1Alpha ?? 1}
                min="0"
                max="1"
                step="0.01"
                onChange={(v) => updateConfig({ solidColor1Alpha: v as number })}
                decimals={2}
            />
        )}

        {config.solidType !== 'solid' && (
            <>
                <SliderControl
                    label="Alpha Cor 1"
                    value={config.solidColor1Alpha ?? 1}
                    min="0"
                    max="1"
                    step="0.01"
                    onChange={(v) => updateConfig({ solidColor1Alpha: v as number })}
                    decimals={2}
                />
                <SliderControl
                    label="Alpha Cor 2"
                    value={config.solidColor2Alpha ?? 1}
                    min="0"
                    max="1"
                    step="0.01"
                    onChange={(v) => updateConfig({ solidColor2Alpha: v as number })}
                    decimals={2}
                />
                {config.solidType !== 'radial' && (
                    <SliderControl
                        label="Alpha Cor 3"
                        value={config.solidColor3Alpha ?? 1}
                        min="0"
                        max="1"
                        step="0.01"
                        onChange={(v) => updateConfig({ solidColor3Alpha: v as number })}
                        decimals={2}
                    />
                )}
            </>
        )}

        {config.solidType !== 'solid' && config.solidType !== 'radial' && (
            <SliderControl
                label="Ângulo (º)"
                value={config.solidAngle}
                min="0"
                max="360"
                step="1"
                onChange={(v) => updateConfig({ solidAngle: v as number })}
                decimals={0}
            />
        )}

        {config.solidType === 'animated' && (
            <SliderControl
                label="Velocidade (s)"
                value={config.solidAnimationSpeed}
                min="2"
                max="30"
                step="1"
                onChange={(v) => updateConfig({ solidAnimationSpeed: v as number })}
                decimals={0}
            />
        )}

        <label className="flex items-center text-white mt-3 p-2 bg-gray-800/50 rounded-md border border-gray-600/50 cursor-pointer hover:border-[#915EFF] transition-colors group">
            <input
                type="checkbox"
                checked={config.solidGrain}
                onChange={(e) => updateConfig({ solidGrain: e.target.checked as boolean })}
                className="mr-3 accent-[#915EFF] w-4 h-4 cursor-pointer"
            />
            <span className="text-gray-300 group-hover:text-white transition-colors uppercase tracking-wider font-semibold text-[10px]">
                Textura Granulada (Noise)
            </span>
        </label>

        <SliderControl
            label="Opacidade Geral"
            value={config.solidOpacity}
            min="0"
            max="1"
            step="0.01"
            onChange={(v) => updateConfig({ solidOpacity: v as number })}
            decimals={2}
        />

        <SliderControl
            label="Desfoque (px)"
            value={config.solidBlur}
            min="0"
            max="20"
            step="0.5"
            onChange={(v) => updateConfig({ solidBlur: v as number })}
            decimals={1}
        />

        {/* Controle de escala/zoom para gradientes */}
        {config.solidType !== 'solid' && (
            <SliderControl
                label="Escala do Gradiente"
                value={config.solidScale ?? 1}
                min="0.1"
                max="3"
                step="0.1"
                onChange={(v) => updateConfig({ solidScale: v as number })}
                decimals={1}
            />
        )}
    </div>
);

export default SolidEditor;
