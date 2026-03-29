import { useEffect, useRef, useState } from 'react';
import { useParticleConfig } from '../../contexts/ParticleConfigContext';
// @ts-expect-error
import { initLaunchParticles } from '../../utils/launchParticles.js';
import '../../launch.css';

// --- Sub-components for cleaner structure (#29) ---

interface SliderControlProps {
  label: string;
  value: number;
  min: string;
  max: string;
  step: string;
  onChange: (val: number) => void;
  decimals?: number;
}

const SliderControl: React.FC<SliderControlProps> = ({
  label,
  value,
  min,
  max,
  step,
  onChange,
  decimals = 1,
}) => {
  const id = `slider-${label.replace(/\s+/g, '-').toLowerCase()}`;
  return (
    <div className="block mb-3 last:mb-0 group/slider">
      <label
        htmlFor={id}
        className="flex justify-between text-gray-400 group-hover/slider:text-[#915EFF] text-[10px] uppercase tracking-widest mb-1.5 font-bold transition-colors"
      >
        <span>{label}</span>
        <span className="text-[#915EFF] font-mono bg-[#915EFF]/10 px-1.5 rounded">
          {value.toFixed(decimals)}
        </span>
      </label>
      <input
        id={id}
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(parseFloat(e.target.value))}
        className="w-full h-1.5 bg-white/10 rounded-lg appearance-none cursor-pointer accent-[#915EFF] hover:accent-[#a17fff] transition-all"
      />
    </div>
  );
};

interface ColorControlProps {
  label: string;
  value: string;
  onChange: (val: string) => void;
}

const ColorControl: React.FC<ColorControlProps> = ({ label, value, onChange }) => {
  const id = `color-${label.replace(/\s+/g, '-').toLowerCase()}`;
  return (
    <div className="flex flex-col mb-3 group/color">
      <label
        htmlFor={id}
        className="text-gray-400 group-hover/color:text-[#915EFF] text-[10px] uppercase tracking-widest mb-1.5 font-bold transition-colors"
      >
        {label}
      </label>
      <div className="relative flex items-center bg-black/40 border border-white/10 rounded-lg p-1.5 hover:border-[#915EFF] transition-all group">
        <input
          id={id}
          type="color"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
        />
        <div
          className="w-6 h-6 rounded-md shadow-inner border border-white/10 group-hover:scale-105 transition-transform"
          style={{ backgroundColor: value }}
        />
        <span className="ml-2 text-[10px] text-gray-300 font-mono uppercase tracking-[0.2em]">
          {value}
        </span>
      </div>
    </div>
  );
};

// --- Background Editor Panels (#29) ---

const ParticlesEditor: React.FC<{ config: any; updateConfig: any }> = ({
  config,
  updateConfig,
}) => (
  <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-12 gap-y-8">
    <div className="space-y-3">
      <ColorControl
        label="Cor Pontos"
        value={config.particleColor}
        onChange={(v) => updateConfig({ particleColor: v })}
      />
      <ColorControl
        label="Cor Linhas"
        value={config.particleLineColor}
        onChange={(v) => updateConfig({ particleLineColor: v })}
      />
      <SliderControl
        label="Velocidade"
        value={config.speed}
        min="0"
        max="3"
        step="0.1"
        onChange={(v) => updateConfig({ speed: v })}
      />
      <SliderControl
        label="Intensidade (Alpha)"
        value={config.intensity}
        min="0.1"
        max="1"
        step="0.1"
        onChange={(v) => updateConfig({ intensity: v })}
      />
      <SliderControl
        label="Quantidade"
        value={config.quantity}
        min="10"
        max="300"
        step="10"
        onChange={(v) => updateConfig({ quantity: v })}
        decimals={0}
      />
    </div>
    <div className="space-y-3">
      <SliderControl
        label="Tamanho"
        value={config.particleSize}
        min="0.5"
        max="10"
        step="0.5"
        onChange={(v) => updateConfig({ particleSize: v })}
      />
      <SliderControl
        label="Dist. Conexão"
        value={config.particleConnectDistance}
        min="50"
        max="300"
        step="10"
        onChange={(v) => updateConfig({ particleConnectDistance: v })}
        decimals={0}
      />
      <SliderControl
        label="Espessura Linha"
        value={config.lineThickness}
        min="0.1"
        max="3"
        step="0.1"
        onChange={(v) => updateConfig({ lineThickness: v })}
      />
      <SliderControl
        label="Opacidade Extra"
        value={config.particleOpacity}
        min="0.1"
        max="1"
        step="0.1"
        onChange={(v) => updateConfig({ particleOpacity: v })}
      />
      <SliderControl
        label="Zoom Câmera"
        value={config.zoom}
        min="0.5"
        max="3"
        step="0.1"
        onChange={(v) => updateConfig({ zoom: v })}
      />
    </div>
  </div>
);

const LiquidEditor: React.FC<{ config: any; updateConfig: any }> = ({ config, updateConfig }) => {
  const randomHex = () =>
    '#' +
    Math.floor(Math.random() * 16777215)
      .toString(16)
      .padStart(6, '0');

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-12 gap-y-8 text-[11px]">
      <div className="space-y-2.5">
        <div>
          <h4 className="text-gray-400 text-[9px] uppercase tracking-widest mb-4 font-bold border-b border-white/5 pb-2">
            Dinâmica e Fluxo
          </h4>
          <div className="space-y-1">
            <SliderControl
              label="Resolução"
              value={config.liquidResolution}
              min="0.5"
              max="2"
              step="0.1"
              onChange={(v) => updateConfig({ liquidResolution: v })}
            />
            <SliderControl
              label="Detalhe (Octavas)"
              value={config.liquidOctaves}
              min="1"
              max="5"
              step="1"
              onChange={(v) => updateConfig({ liquidOctaves: v })}
              decimals={0}
            />
            <SliderControl
              label="Fluxo Temporal"
              value={config.liquidSpeed}
              min="0"
              max="1"
              step="0.01"
              onChange={(v) => updateConfig({ liquidSpeed: v })}
              decimals={2}
            />
            <SliderControl
              label="Zoom (Escala)"
              value={config.liquidScale}
              min="0.01"
              max="0.2"
              step="0.01"
              onChange={(v) => updateConfig({ liquidScale: v })}
              decimals={2}
            />
          </div>
        </div>

        <div>
          <h4 className="text-gray-400 text-[9px] uppercase tracking-widest mb-4 font-bold border-b border-white/5 pb-2">
            Propriedades do Fluido
          </h4>
          <div className="space-y-1">
            <SliderControl
              label="Suavização"
              value={config.liquidSmoothing}
              min="0"
              max="1"
              step="0.1"
              onChange={(v) => updateConfig({ liquidSmoothing: v })}
            />
            <SliderControl
              label="Granulação"
              value={config.liquidGrain}
              min="0"
              max="0.2"
              step="0.001"
              onChange={(v) => updateConfig({ liquidGrain: v })}
              decimals={3}
            />
            <SliderControl
              label="Torção (Twist)"
              value={config.liquidTwist}
              min="0"
              max="5"
              step="0.1"
              onChange={(v) => updateConfig({ liquidTwist: v })}
            />
            <SliderControl
              label="Complexidade"
              value={config.liquidComplexity}
              min="0.1"
              max="8"
              step="0.1"
              onChange={(v) => updateConfig({ liquidComplexity: v })}
            />
          </div>
        </div>
      </div>

      <div className="space-y-2.5">
        <div>
          <h4 className="text-gray-400 text-[9px] uppercase tracking-widest mb-4 font-bold border-b border-white/5 pb-2">
            Ultra Rendering
          </h4>
          <div className="space-y-1">
            <SliderControl
              label="Intensidade"
              value={config.liquidIntensity}
              min="0.1"
              max="2"
              step="0.1"
              onChange={(v) => updateConfig({ liquidIntensity: v })}
            />
            <SliderControl
              label="Brilho (Gloss)"
              value={config.liquidGloss}
              min="0"
              max="2"
              step="0.1"
              onChange={(v) => updateConfig({ liquidGloss: v })}
            />
            <SliderControl
              label="Escala Ruído"
              value={config.liquidNoiseScale}
              min="0.1"
              max="3"
              step="0.1"
              onChange={(v) => updateConfig({ liquidNoiseScale: v })}
            />
            <SliderControl
              label="Refração"
              value={config.liquidRefraction}
              min="0"
              max="1"
              step="0.1"
              onChange={(v) => updateConfig({ liquidRefraction: v })}
            />
          </div>
        </div>

        <div>
          <h4 className="text-gray-400 text-[9px] uppercase tracking-widest mb-4 font-bold border-b border-white/5 pb-2">
            Espectro de Cores
          </h4>
          <div className="grid grid-cols-2 gap-2 mb-3">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <ColorControl
                key={i}
                label={`Nó ${i}`}
                value={(config as any)[`liquidColor${i}`]}
                onChange={(v) => updateConfig({ [`liquidColor${i}`]: v })}
              />
            ))}
          </div>
          <button
            type="button"
            onClick={() => {
              updateConfig({
                liquidColor1: randomHex(),
                liquidColor2: randomHex(),
                liquidColor3: randomHex(),
                liquidColor4: randomHex(),
                liquidColor5: randomHex(),
                liquidColor6: randomHex(),
              });
            }}
            className="w-full py-2 bg-blue-600/30 hover:bg-blue-600/50 border border-blue-500/40 text-blue-200 hover:text-white text-[9px] font-bold uppercase tracking-widest rounded transition-all shadow-md backdrop-blur-sm"
          >
            Gerar Paleta Aleatória
          </button>
        </div>
      </div>
    </div>
  );
};

const ParticulateEditor: React.FC<{ config: any; updateConfig: any }> = ({
  config,
  updateConfig,
}) => (
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
            onChange={(v) => updateConfig({ particulateSpeed: v })}
          />
          <SliderControl
            label="Intensidade Foco"
            value={config.particulateIntensity}
            min="0.1"
            max="2"
            step="0.1"
            onChange={(v) => updateConfig({ particulateIntensity: v })}
          />
          <SliderControl
            label="Quantidade"
            value={config.particulateQuantity}
            min="500"
            max="8000"
            step="100"
            onChange={(v) => updateConfig({ particulateQuantity: v })}
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
            onChange={(v) => updateConfig({ particulateWanderSpeed: v })}
            decimals={3}
          />
          <SliderControl
            label="Força Wander"
            value={config.particulateWanderStrength}
            min="0.01"
            max="0.5"
            step="0.01"
            onChange={(v) => updateConfig({ particulateWanderStrength: v })}
            decimals={2}
          />
        </div>
      </div>

      <div>
        <h4 className="text-gray-400 text-[9px] uppercase tracking-widest mb-5 font-bold border-b border-white/5 pb-2">
          Interação
        </h4>
        <div className="flex gap-1.5 mt-1">
          {['blow', 'magnet', 'freeze'].map((m) => (
            <button
              type="button"
              key={m}
              onClick={() => updateConfig({ particulateMode: m })}
              className={`flex-1 py-2 text-[9px] font-bold uppercase tracking-wider rounded transition-all border ${
                config.particulateMode === m
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
            onChange={(v) => updateConfig({ particulateSize: v })}
          />
          <SliderControl
            label="Fricção"
            value={config.particulateFriction}
            min="0.85"
            max="0.99"
            step="0.01"
            onChange={(v) => updateConfig({ particulateFriction: v })}
            decimals={2}
          />
          <SliderControl
            label="Força Mola"
            value={config.particulateSpring}
            min="0.001"
            max="0.05"
            step="0.001"
            onChange={(v) => updateConfig({ particulateSpring: v })}
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
              onChange={(e) => updateConfig({ particulatePalette: e.target.value })}
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
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <ColorControl
                  key={i}
                  label={`Cor ${i}`}
                  value={(config as any)[`particulateColor${i}`]}
                  onChange={(v) => updateConfig({ [`particulateColor${i}`]: v })}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  </div>
);

const CyberpunkEditor: React.FC<{ config: any; updateConfig: any }> = ({
  config,
  updateConfig,
}) => (
  <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-12 gap-y-8 text-[11px]">
    <div className="space-y-4">
      <div>
        <h4 className="text-gray-400 text-[9px] uppercase tracking-widest mb-5 font-bold border-b border-white/5 pb-2">
          Atmosfera e Bloom
        </h4>
        <div className="space-y-2">
          <SliderControl
            label="Força do Bloom"
            value={config.cyberpunkBloomStrength}
            min="0"
            max="15"
            step="0.5"
            onChange={(v) => updateConfig({ cyberpunkBloomStrength: v })}
          />
          <SliderControl
            label="Névoa (Fog)"
            value={config.cyberpunkFogDensity}
            min="0"
            max="1"
            step="0.05"
            onChange={(v) => updateConfig({ cyberpunkFogDensity: v })}
          />
          <SliderControl
            label="FOV (Zoom)"
            value={config.cyberpunkCameraFOV}
            min="40"
            max="120"
            step="5"
            onChange={(v) => updateConfig({ cyberpunkCameraFOV: v })}
            decimals={0}
          />
        </div>
      </div>

      <div>
        <h4 className="text-gray-400 text-[9px] uppercase tracking-widest mb-5 font-bold border-b border-white/5 pb-2">
          Movimento e Rotação
        </h4>
        <div className="space-y-2">
          <SliderControl
            label="Vel. Avanço"
            value={config.cyberpunkSpeed}
            min="0.1"
            max="5"
            step="0.1"
            onChange={(v) => updateConfig({ cyberpunkSpeed: v })}
          />
          <SliderControl
            label="Vel. Rotação"
            value={config.cyberpunkRotationSpeed}
            min="0"
            max="5"
            step="0.1"
            onChange={(v) => updateConfig({ cyberpunkRotationSpeed: v })}
          />
        </div>
      </div>
    </div>

    <div className="space-y-4">
      <div>
        <h4 className="text-gray-400 text-[9px] uppercase tracking-widest mb-5 font-bold border-b border-white/5 pb-2">
          Geometria do Túnel
        </h4>
        <div className="space-y-2">
          <SliderControl
            label="Raio do Túnel"
            value={config.cyberpunkTunnelRadius}
            min="0.2"
            max="2.5"
            step="0.1"
            onChange={(v) => updateConfig({ cyberpunkTunnelRadius: v })}
          />
          <SliderControl
            label="Tamanho Pontos"
            value={config.cyberpunkPointSize}
            min="0.005"
            max="0.05"
            step="0.005"
            onChange={(v) => updateConfig({ cyberpunkPointSize: v })}
            decimals={3}
          />
          <SliderControl
            label="Opacidade Linhas"
            value={config.cyberpunkLineOpacity}
            min="0"
            max="1"
            step="0.1"
            onChange={(v) => updateConfig({ cyberpunkLineOpacity: v })}
          />
        </div>
      </div>

      <div>
        <h4 className="text-gray-400 text-[9px] uppercase tracking-widest mb-5 font-bold border-b border-white/5 pb-2">
          Cores Cyber
        </h4>
        <div className="grid grid-cols-2 gap-2">
          <ColorControl
            label="Nó 1"
            value={config.cyberpunkColor1}
            onChange={(v) => updateConfig({ cyberpunkColor1: v })}
          />
          <ColorControl
            label="Nó 2"
            value={config.cyberpunkColor2}
            onChange={(v) => updateConfig({ cyberpunkColor2: v })}
          />
          <div className="col-span-2">
            <ColorControl
              label="Linhas e Brilho"
              value={config.cyberpunkColor3}
              onChange={(v) => updateConfig({ cyberpunkColor3: v })}
            />
          </div>
        </div>
      </div>
    </div>
  </div>
);

const WavefieldEditor: React.FC<{ config: any; updateConfig: any }> = ({
  config,
  updateConfig,
}) => (
  <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-12 gap-y-8 text-[11px]">
    <div className="space-y-4">
      <div>
        <h4 className="text-gray-400 text-[9px] uppercase tracking-widest mb-5 font-bold border-b border-white/5 pb-2">
          Geral e Ondulação
        </h4>
        <div className="space-y-2">
          <SliderControl
            label="Velocidade"
            value={config.wavefieldSpeed}
            min="0.1"
            max="3"
            step="0.1"
            onChange={(v) => updateConfig({ wavefieldSpeed: v })}
          />
          <SliderControl
            label="Amplitude"
            value={config.wavefieldAmplitude}
            min="0.1"
            max="5"
            step="0.1"
            onChange={(v) => updateConfig({ wavefieldAmplitude: v })}
          />
          <SliderControl
            label="Frequência"
            value={config.wavefieldFrequency}
            min="0.1"
            max="10"
            step="0.1"
            onChange={(v) => updateConfig({ wavefieldFrequency: v })}
          />
          <SliderControl
            label="Vel. Rotação"
            value={config.wavefieldRotationSpeed}
            min="0"
            max="3"
            step="0.1"
            onChange={(v) => updateConfig({ wavefieldRotationSpeed: v })}
          />
        </div>
      </div>

      <div>
        <h4 className="text-gray-400 text-[9px] uppercase tracking-widest mb-5 font-bold border-b border-white/5 pb-2">
          Interação e Mouse
        </h4>
        <div className="space-y-2">
          <SliderControl
            label="Força Mouse"
            value={config.wavefieldMouseStrength}
            min="0"
            max="3"
            step="0.1"
            onChange={(v) => updateConfig({ wavefieldMouseStrength: v })}
          />
          <SliderControl
            label="Complexidade"
            value={config.wavefieldComplexity}
            min="0.1"
            max="5"
            step="0.1"
            onChange={(v) => updateConfig({ wavefieldComplexity: v })}
          />
        </div>
      </div>
    </div>

    <div className="space-y-4">
      <div>
        <h4 className="text-gray-400 text-[9px] uppercase tracking-widest mb-5 font-bold border-b border-white/5 pb-2">
          Cores e Brilho
        </h4>
        <div className="space-y-3">
          <div className="grid grid-cols-2 gap-2">
            <ColorControl
              label="Onda Principal"
              value={config.wavefieldColor}
              onChange={(v) => updateConfig({ wavefieldColor: v })}
            />
            <ColorControl
              label="Onda Secundária"
              value={config.wavefieldColor2}
              onChange={(v) => updateConfig({ wavefieldColor2: v })}
            />
          </div>
          <ColorControl
            label="Acento/Glow"
            value={config.wavefieldColor3}
            onChange={(v) => updateConfig({ wavefieldColor3: v })}
          />
          <SliderControl
            label="Intensidade Glow"
            value={config.wavefieldGlow}
            min="0.1"
            max="2"
            step="0.1"
            onChange={(v) => updateConfig({ wavefieldGlow: v })}
          />
        </div>
      </div>

      <div>
        <h4 className="text-gray-400 text-[9px] uppercase tracking-widest mb-5 font-bold border-b border-white/5 pb-2">
          Ambientação (Estrelas)
        </h4>
        <div className="space-y-2">
          <SliderControl
            label="Brilho Estrelas"
            value={config.wavefieldStarIntensity}
            min="0"
            max="1"
            step="0.05"
            onChange={(v) => updateConfig({ wavefieldStarIntensity: v })}
          />
        </div>
      </div>
    </div>
  </div>
);

const SolidEditor: React.FC<{ config: any; updateConfig: any }> = ({ config, updateConfig }) => (
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
        onChange={(e) => updateConfig({ solidType: e.target.value })}
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
        onChange={(v) => updateConfig({ solidColor1: v })}
      />
      {config.solidType !== 'solid' && (
        <>
          <ColorControl
            label="Cor 2"
            value={config.solidColor2}
            onChange={(v) => updateConfig({ solidColor2: v })}
          />
          <div className="col-span-2">
            <ColorControl
              label="Cor 3"
              value={config.solidColor3}
              onChange={(v) => updateConfig({ solidColor3: v })}
            />
          </div>
        </>
      )}
    </div>

    {config.solidType !== 'solid' && config.solidType !== 'radial' && (
      <SliderControl
        label="Ângulo (º)"
        value={config.solidAngle}
        min="0"
        max="360"
        step="1"
        onChange={(v) => updateConfig({ solidAngle: v })}
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
        onChange={(v) => updateConfig({ solidAnimationSpeed: v })}
        decimals={0}
      />
    )}

    <label className="flex items-center text-white mt-3 p-2 bg-gray-800/50 rounded-md border border-gray-600/50 cursor-pointer hover:border-[#915EFF] transition-colors group">
      <input
        type="checkbox"
        checked={config.solidGrain}
        onChange={(e) => updateConfig({ solidGrain: e.target.checked })}
        className="mr-3 accent-[#915EFF] w-4 h-4 cursor-pointer"
      />
      <span className="text-gray-300 group-hover:text-white transition-colors uppercase tracking-wider font-semibold text-[10px]">
        Textura Granulada (Noise)
      </span>
    </label>

    <SliderControl
      label="Opacidade"
      value={config.solidOpacity}
      min="0"
      max="1"
      step="0.01"
      onChange={(v) => updateConfig({ solidOpacity: v })}
      decimals={2}
    />

    <SliderControl
      label="Desfoque (px)"
      value={config.solidBlur}
      min="0"
      max="20"
      step="0.5"
      onChange={(v) => updateConfig({ solidBlur: v })}
      decimals={1}
    />
  </div>
);

// --- Background type labels (#30 — all PT-BR) ---
const BG_LABELS: Record<string, string> = {
  particles: 'Partículas',
  liquid: 'Líquido',
  particulate: 'Pontos',
  cyberpunk: 'Túnel',
  wavefield: 'Ondas',
  solid: 'Cor Sólida',
};

const BG_TYPES = Object.keys(BG_LABELS);

// --- Main ThemeToggle ---

const ThemeToggle = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isEditorOpen, setIsEditorOpen] = useState(false);
  const [selectedBg, setSelectedBg] = useState('particles');
  const { config, updateConfig } = useParticleConfig();

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const btnRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (canvasRef.current && btnRef.current) {
      const cleanup = initLaunchParticles(canvasRef.current, btnRef.current);
      return cleanup;
    }
  }, []);

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') as 'light' | 'dark' | null;
    if (savedTheme) {
      document.documentElement.classList.toggle('dark', savedTheme === 'dark');
    } else {
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      document.documentElement.classList.toggle('dark', prefersDark);
    }
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Element;
      if (!target.closest('.theme-toggle-container')) {
        setIsOpen(false);
        setIsEditorOpen(false);
      }
    };

    if (isOpen || isEditorOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen, isEditorOpen]);

  const renderEditor = () => {
    const props = { config, updateConfig };
    switch (selectedBg) {
      case 'particles':
        return <ParticlesEditor {...props} />;
      case 'liquid':
        return <LiquidEditor {...props} />;
      case 'particulate':
        return <ParticulateEditor {...props} />;
      case 'cyberpunk':
        return <CyberpunkEditor {...props} />;
      case 'wavefield':
        return <WavefieldEditor {...props} />;
      case 'solid':
        return <SolidEditor {...props} />;
      default:
        return null;
    }
  };

  // Menu positioned top-left, just below the header
  return (
    <>
      <canvas id="particles-canvas" ref={canvasRef} />
      <div className="fixed left-2 sm:left-4 top-1/2 -translate-y-1/2 z-50 theme-toggle-container scale-110 sm:scale-125 origin-top-left transition-all duration-300">
        <div className="relative group/gear">
          {/* Label that appears on hover or subtly */}
          <div className="absolute -top-10 left-0 whitespace-nowrap opacity-0 group-hover/gear:opacity-100 transition-opacity duration-300 bg-black/60 backdrop-blur-md px-3 py-1 rounded-full text-[10px] text-white font-bold tracking-widest border border-white/10 uppercase">
            Ajustar Background
          </div>

          {/* Gear icon wrapped in burst animations */}
          <div className="launch-btn-wrap">
            <div className="bloom"></div>
            <button
              type="button"
              ref={btnRef}
              onClick={() => setIsOpen(!isOpen)}
              className="launch-btn flex items-center justify-center p-4 shadow-[0_0_30px_rgba(145,94,255,0.5)]"
              aria-label="Ajustar Background"
            >
              <svg
                className="w-8 h-8 transition-transform duration-200 hover:rotate-90 text-white drop-shadow-[0_0_8px_rgba(255,255,255,0.5)]"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <title>Configurações de Fundo</title>
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
            </button>
          </div>

          {/* Animated shapes */}
          <span className="shape square"></span>
          <span className="shape triangle"></span>
          <span className="shape circle-shape"></span>
          <span className="shape diamond"></span>
          <span className="shape star"></span>

          {/* Main menu — opens to the right with massive margin to clear icon */}
          {isOpen && (
            <div className="absolute left-[calc(100%+16px)] top-1/2 -translate-y-1/2 bg-tertiary/75 backdrop-blur-xl rounded-2xl shadow-2xl p-10 min-w-[320px] max-w-[90vw] z-50 border border-white/10 ring-1 ring-white/5 transition-all duration-300 animate-in fade-in slide-in-from-left-4">
              <h3 className="text-white font-bold mb-4 text-xs uppercase tracking-[0.2em] border-b border-white/5 pb-2">
                Configurações
              </h3>

              <div className="text-[10px] font-medium text-gray-400 uppercase tracking-widest mb-3 px-1">
                Selecione o Estilo
              </div>

              {/* Background type buttons in 2 columns */}
              <div className="grid grid-cols-2 gap-3 mb-6">
                {BG_TYPES.map((type) => (
                  <button
                    type="button"
                    key={type}
                    onClick={() => updateConfig({ backgroundType: type })}
                    className={`w-full text-center px-1 py-2.5 text-[10px] font-bold uppercase tracking-wider rounded transition-all duration-200 border ${
                      config.backgroundType === type
                        ? 'bg-secondary/40 border-[#915EFF] text-white shadow-[0_0_10px_rgba(145,94,255,0.15)]'
                        : 'bg-gray-800/60 border-gray-600/30 text-gray-300 hover:border-gray-500 hover:text-white'
                    }`}
                  >
                    {BG_LABELS[type]}
                  </button>
                ))}
              </div>

              {/* Edit button */}
              <button
                type="button"
                onClick={() => {
                  setSelectedBg(config.backgroundType);
                  setIsOpen(false);
                  setIsEditorOpen(true);
                }}
                className="w-full flex items-center justify-center px-3 py-2 mt-2 rounded text-white bg-blue-600/40 hover:bg-blue-600/60 border border-blue-400/50 transition-all duration-200 gap-2 font-bold text-[10px] uppercase tracking-[0.15em] shadow-lg backdrop-blur-sm"
              >
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <title>Editar Background</title>
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
                Editar Background
              </button>
            </div>
          )}

          {/* Background editor panel — even larger margin */}
          {isEditorOpen && (
            <div className="absolute left-[calc(100%+16px)] top-1/2 -translate-y-1/2 bg-tertiary/70 backdrop-blur-xl rounded-3xl shadow-2xl p-10 min-w-[360px] sm:min-w-[540px] md:min-w-[620px] max-w-[95vw] z-50 max-h-[85vh] flex flex-col border border-white/10 ring-1 ring-white/5 transition-all duration-300 animate-in fade-in slide-in-from-left-6">
              <div className="flex items-center justify-between mb-6 shrink-0 border-b border-white/10 pb-4">
                <h3 className="text-white font-bold text-sm uppercase tracking-[0.2em]">
                  {BG_LABELS[selectedBg] || 'Background'}
                </h3>
                <button
                  type="button"
                  onClick={() => {
                    setIsEditorOpen(false);
                    setIsOpen(true);
                  }}
                  className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-gray-300 hover:text-white text-[10px] uppercase tracking-widest font-bold transition-all"
                >
                  <span className="text-xs">←</span> Voltar
                </button>
              </div>

              <div className="overflow-y-auto flex-1 pr-2 custom-scrollbar min-h-0 py-2">
                {renderEditor()}
              </div>

              <button
                type="button"
                onClick={() => setIsEditorOpen(false)}
                className="w-full mt-6 px-4 py-3 bg-red-500/10 hover:bg-red-500/20 border border-red-500/30 text-red-400 hover:text-white font-bold tracking-[0.3em] uppercase text-[10px] rounded-xl transition-all shrink-0 shadow-lg backdrop-blur-sm group"
              >
                <span className="group-hover:scale-110 transition-transform inline-block">
                  Fechar Painel
                </span>
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default ThemeToggle;
