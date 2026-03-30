import React from 'react';
import type { ParticleConfig } from '../../types';
import { SliderControl, ColorControl } from './Controls';

interface ParticulateEditorProps {
    config: ParticleConfig;
    updateConfig: (newConfig: Partial<ParticleConfig>) => void;
}

const ParticulateEditor: React.FC<ParticulateEditorProps> = ({ config, updateConfig }) => (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-12 gap-y-8 text-[11px]">
        <div className="space-y-4">
            <div>
                <h4 className="text-gray-400 text-[9px] uppercase tracking-widest mb-5 font-bold border-b border-white/5 pb-2">
                    Geral e Foco
                </h4>
                <div className="space-y-2">
                    <SliderControl
                        label="Velocidade Geral"
                        value={config.particulateSpeed}
                        min="0.1"
                        max="3"
                        step="0.1"
                        onChange={(v) => updateConfig({ particulateSpeed: v as number })}
                    />
                    <SliderControl
                        label="Intensidade Foco"
                        value={config.particulateIntensity}
                        min="0.1"
                        max="2"
                        step="0.1"
                        onChange={(v) => updateConfig({ particulateIntensity: v as number })}
                    />
                    <SliderControl
                        label="Quantidade"
                        value={config.particulateQuantity}
                        min="500"
                        max="8000"
                        step="100"
                        onChange={(v) => updateConfig({ particulateQuantity: v as number })}
                        decimals={0}
                    />
                </div>
            </div>

            <div>
                <h4 className="text-gray-400 text-[9px] uppercase tracking-widest mb-5 font-bold border-b border-white/5 pb-2">
                    Movimento Orgânico (Wander)
                </h4>
                <div className="space-y-2">
                    <SliderControl
                        label="Freq. Wander"
                        value={config.particulateWanderSpeed}
                        min="0.001"
                        max="0.1"
                        step="0.001"
                        onChange={(v) => updateConfig({ particulateWanderSpeed: v as number })}
                        decimals={3}
                    />
                    <SliderControl
                        label="Força Wander"
                        value={config.particulateWanderStrength}
                        min="0.01"
                        max="0.5"
                        step="0.01"
                        onChange={(v) => updateConfig({ particulateWanderStrength: v as number })}
                        decimals={2}
                    />
                </div>
            </div>

            <div>
                <h4 className="text-gray-400 text-[9px] uppercase tracking-widest mb-5 font-bold border-b border-white/5 pb-2">
                    Interação
                </h4>
                <div className="flex gap-1.5 mt-1">
                    {(['blow', 'magnet', 'freeze'] as const).map((m) => (
                        <button
                            type="button"
                            key={m}
                            onClick={() => updateConfig({ particulateMode: m })}
                            className={`flex-1 py-2 text-[9px] font-bold uppercase tracking-wider rounded transition-all border ${config.particulateMode === m
                                    ? 'bg-secondary/40 border-[#915EFF] text-white'
                                    : 'bg-gray-800/40 border-white/5 text-gray-400 hover:text-white'
                                }`}
                        >
                            {m === 'blow' ? 'Soprar' : m === 'magnet' ? 'Atrair' : 'Congelar'}
                        </button>
                    ))}
                </div>
            </div>
        </div>

        <div className="space-y-4">
            <div>
                <h4 className="text-gray-400 text-[9px] uppercase tracking-widest mb-5 font-bold border-b border-white/5 pb-2">
                    Física de Retorno
                </h4>
                <div className="space-y-2">
                    <SliderControl
                        label="Tamanho Base"
                        value={config.particulateSize}
                        min="1"
                        max="8"
                        step="0.5"
                        onChange={(v) => updateConfig({ particulateSize: v as number })}
                    />
                    <SliderControl
                        label="Fricção"
                        value={config.particulateFriction}
                        min="0.85"
                        max="0.99"
                        step="0.01"
                        onChange={(v) => updateConfig({ particulateFriction: v as number })}
                        decimals={2}
                    />
                    <SliderControl
                        label="Força Mola"
                        value={config.particulateSpring}
                        min="0.001"
                        max="0.05"
                        step="0.001"
                        onChange={(v) => updateConfig({ particulateSpring: v as number })}
                        decimals={3}
                    />
                </div>
            </div>

            <div>
                <h4 className="text-gray-400 text-[9px] uppercase tracking-widest mb-5 font-bold border-b border-white/5 pb-2">
                    Cores dos Pontos
                </h4>
                <div className="space-y-3">
                    <div className="block">
                        <label
                            htmlFor="particulate-palette"
                            className="text-[9px] uppercase tracking-widest text-gray-400 mb-1.5 block"
                        >
                            Paleta Predefinida
                        </label>
                        <select
                            id="particulate-palette"
                            value={config.particulatePalette}
                            onChange={(e) => updateConfig({ particulatePalette: e.target.value as string })}
                            className="w-full bg-gray-900/60 text-white border border-white/10 rounded px-2 py-1.5 text-[10px] focus:border-[#915EFF] outline-none transition-colors"
                        >
                            <option value="custom">Personalizada</option>
                            <option value="city">Noite na Cidade</option>
                            <option value="nature">Natureza</option>
                            <option value="sunset">Pôr do Sol</option>
                            <option value="abstract">Artes abstratas</option>
                        </select>
                    </div>

                    {config.particulatePalette === 'custom' && (
                        <div className="grid grid-cols-2 gap-x-3 gap-y-2 pt-1">
                            {([1, 2, 3, 4, 5, 6] as const).map((i) => (
                                <ColorControl
                                    key={i}
                                    label={`Cor ${i}`}
                                    value={config[`particulateColor${i}` as keyof ParticleConfig] as string}
                                    onChange={(v) => updateConfig({ [`particulateColor${i}`]: v as string })}
                                />
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    </div>
);

export default ParticulateEditor;
