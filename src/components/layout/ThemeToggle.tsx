import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { m } from 'framer-motion';
import { useParticleConfig } from '../../contexts/ParticleConfigContext';
// @ts-expect-error
import { initLaunchParticles } from '../../utils/launchParticles.js';
import {
  BolhasEditor,
  ParticlesEditor,
  LiquidEditor,
  ParticulateEditor,
  CyberpunkEditor,
  WavefieldEditor,
  SolidEditor,
  MatrixEditor,
} from '../background-editors';

// --- Background type labels (#30 — all PT-BR) ---
const BG_LABELS: Record<string, string> = {
  bolhas: 'Bolhas',
  particles: 'Partículas',
  liquid: 'Líquido',
  particulate: 'Pontos',
  cyberpunk: 'Túnel',
  wavefield: 'Ondas',
  solid: 'Cor Sólida',
  matrix: 'Matrix',
};

const BG_TYPES = Object.keys(BG_LABELS);

// --- Main ThemeToggle ---

const ThemeToggle = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isEditorOpen, setIsEditorOpen] = useState(false);
  const { config, updateConfig } = useParticleConfig();
  const [selectedBg, setSelectedBg] = useState(config.backgroundType || 'bolhas');

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const btnRef = useRef<HTMLButtonElement>(null);

  // Sincroniza selectedBg quando config.backgroundType muda
  useEffect(() => {
    setSelectedBg(config.backgroundType || 'bolhas');
  }, [config.backgroundType]);

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

  const renderEditor = () => {
    const props = { config, updateConfig };
    switch (selectedBg) {
      case 'bolhas':
        return <BolhasEditor {...props} />;
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
      case 'matrix':
        return <MatrixEditor {...props} />;
      default:
        return null;
    }
  };

  // === RETURN CORRIGIDO ===
  return (
    <>
      <canvas id="particles-canvas" ref={canvasRef} />

      {/* Botão da engrenagem */}
      <div className="fixed left-2 sm:left-4 top-1/2 -translate-y-1/2 z-[10000] theme-toggle-container">
        <div className="relative group/gear">
          {/* Efeito de glow sutil com cor original */}
          <div className="absolute inset-0 bg-[#915EFF] rounded-full blur-xl opacity-20 animate-pulse-glow" />

          {/* Container da animação de respiração */}
          <m.div
            className="launch-btn-wrap relative gear-breathing-enhanced"
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
          >
            <button
              ref={btnRef}
              onClick={() => setIsOpen(!isOpen)}
              aria-label="Toggle theme settings"
              aria-expanded={isOpen}
              className="launch-btn relative flex items-center justify-center p-4 bg-black/10 border-2 border-[#915EFF]/30 rounded-full shadow-[0_0_15px_rgba(145,94,255,0.3)] hover:shadow-[0_0_25px_rgba(145,94,255,0.5)] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#915EFF] focus-visible:ring-offset-2 focus-visible:ring-offset-black transition-all duration-300"
            >
              {/* Borda animada sutil */}
              <div className="absolute inset-0 rounded-full border-2 border-transparent bg-gradient-to-br from-[#915EFF] to-[#00FFFF] bg-clip-padding opacity-20 animate-rotate-border" />

              {/* Ícone SVG com cor original branca */}
              <m.svg
                animate={{ rotate: 360 }}
                transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                className="w-8 h-8 relative z-10 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
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
              </m.svg>
            </button>
          </m.div>

          {/* Menu de seleção de estilo */}
          {isOpen && (
            <div className="fixed top-[20%] left-[100px] bg-black/90 backdrop-blur-2xl rounded-3xl shadow-2xl p-6 min-w-[340px] z-[99999] border border-white/10">
              <h3 className="text-white font-bold mb-4 text-sm uppercase tracking-widest">Configurações</h3>
              <div className="grid grid-cols-2 gap-3 mb-6">
                {BG_TYPES.map((type) => (
                  <button
                    key={type}
                    onClick={() => updateConfig({ backgroundType: type })}
                    className={`w-full py-3 text-xs font-bold uppercase tracking-widest rounded-2xl transition-all ${config.backgroundType === type
                      ? 'bg-[#915EFF] text-white'
                      : 'bg-white/10 text-white/80 hover:bg-white/20'
                      }`}
                  >
                    {BG_LABELS[type]}
                  </button>
                ))}
              </div>

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedBg(config.backgroundType || 'bolhas');
                  setIsEditorOpen(true);
                  setIsOpen(false);
                }}
                className="w-full bg-[#915EFF] hover:bg-[#a17fff] text-white font-bold py-4 rounded-3xl text-sm uppercase tracking-widest flex items-center justify-center gap-2"
              >
                ✏️ EDITAR BACKGROUND
              </button>
            </div>
          )}
        </div>
      </div>

      {/* ===================== PAINEL FLUTUANTE MODERNO ===================== */}
      {isEditorOpen && createPortal(
        <div className="fixed inset-0 z-[99999999] flex items-center justify-center bg-black/70 backdrop-blur-2xl p-4" onClick={() => { setIsEditorOpen(false); setIsOpen(true); }}>
          <div className="bg-[#0a0820] border border-[#915EFF]/70 rounded-3xl w-full max-w-2xl max-h-[85vh] overflow-hidden shadow-2xl" onClick={(e) => e.stopPropagation()}>

            {/* Header elegante */}
            <div className="px-7 py-5 border-b border-white/10 flex items-center justify-between bg-gradient-to-r from-[#1a1433] to-black">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-gradient-to-br from-[#915EFF] to-[#00FFFF] rounded-2xl flex items-center justify-center text-lg shadow-lg">
                  ✏️
                </div>
                <div>
                  <h2 className="text-xl font-bold text-white tracking-tight">
                    Editando Background
                  </h2>
                  <p className="text-[#915EFF] text-sm font-medium">
                    {BG_LABELS[selectedBg] || selectedBg}
                  </p>
                </div>
              </div>

              <button
                onClick={() => {
                  setIsEditorOpen(false);
                  setIsOpen(true);
                }}
                className="w-9 h-9 flex items-center justify-center text-white hover:bg-white/10 rounded-full transition-all hover:scale-110"
              >
                ✕
              </button>
            </div>

            {/* Corpo do painel - mais compacto */}
            <div className="p-7 overflow-y-auto max-h-[calc(85vh-70px)] custom-scrollbar">
              {renderEditor() || (
                <div className="text-center py-16 text-gray-400">
                  Editor para "{selectedBg}" ainda não implementado
                </div>
              )}
            </div>

            {/* Footer sutil */}
            <div className="px-7 py-3 border-t border-white/10 text-[10px] text-white/40 text-center">
              Alterações em tempo real • Clique fora para fechar
            </div>
          </div>
        </div>,
        document.body
      )}
    </>
  );
};

export default ThemeToggle;
