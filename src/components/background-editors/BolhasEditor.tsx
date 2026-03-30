import React from 'react';
import type { ParticleConfig } from '../../types';
import { SliderControl, ColorControl } from './Controls';

interface BolhasEditorProps {
    config: ParticleConfig;
    updateConfig: (newConfig: Partial<ParticleConfig>) => void;
}

const BolhasEditor: React.FC<BolhasEditorProps> = ({ config, updateConfig }) => (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-12 gap-y-8 text-[11px]">
        <div className="space-y-2.5">
            <div>
                <h4 className="text-gray-400 text-[9px] uppercase tracking-widest mb-4 font-bold border-b border-white/5 pb-2">
                    Dinâmica
                </h4>
                <div className="space-y-1">
                    <SliderControl
                        label="Quantidade"
                        value={config.bolhasCount}
                        min="1000"
                        max="100000"
                        step="1000"
                        onChange={(v) => updateConfig({ bolhasCount: v as number })}
                        decimals={0}
                    />
                    <SliderControl
                        label="Velocidade"
                        value={config.bolhasSpeed}
                        min="0"
                        max="2"
                        step="0.1"
                        onChange={(v) => updateConfig({ bolhasSpeed: v as number })}
                        decimals={1}
                    />
                    <SliderControl
                        label="Tamanho"
                        value={config.bolhasSize}
                        min="0.01"
                        max="0.1"
                        step="0.01"
                        onChange={(v) => updateConfig({ bolhasSize: v as number })}
                        decimals={2}
                    />
                    <SliderControl
                        label="Alcance (Spread)"
                        value={config.bolhasSpread}
                        min="10"
                        max="200"
                        step="5"
                        onChange={(v) => updateConfig({ bolhasSpread: v as number })}
                        decimals={0}
                    />
                </div>
            </div>
        </div>
        <div className="space-y-2.5">
            <div>
                <h4 className="text-gray-400 text-[9px] uppercase tracking-widest mb-4 font-bold border-b border-white/5 pb-2">
                    Cores Variadas
                </h4>
                <div className="space-y-3">
                    <ColorControl
                        label="Cor 1"
                        value={config.bolhasColor1}
                        onChange={(v) => updateConfig({ bolhasColor1: v as string })}
                    />
                    <ColorControl
                        label="Cor 2"
                        value={config.bolhasColor2}
                        onChange={(v) => updateConfig({ bolhasColor2: v as string })}
                    />
                    <ColorControl
                        label="Cor 3"
                        value={config.bolhasColor3}
                        onChange={(v) => updateConfig({ bolhasColor3: v as string })}
                    />
                </div>
            </div>
        </div>
    </div>
);

export default BolhasEditor;
