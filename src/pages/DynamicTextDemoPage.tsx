import { useState, useRef, useEffect } from 'react';
import { DynamicText } from '../components/atoms/DynamicText';
import ParticleBackground from '../components/canvas/ParticleBackground';
import { useDynamicTextColor } from '../hooks/useDynamicTextColor';
import { getComplementaryColor } from '../utils/contrastUtils';

type ColorModeOption = 'auto' | 'dark' | 'light' | 'complement';
type SelectedBackgroundType = 'particles' | 'light' | 'dark' | 'colorful';

export default function DynamicTextDemoPage() {
    // Estados
    const [isPanelOpen, setIsPanelOpen] = useState(true);
    const [colorMode, setColorMode] = useState<ColorModeOption>('auto');
    const [backgroundType, setBackgroundType] = useState<SelectedBackgroundType>('particles');
    const [customBackground, setCustomBackground] = useState<string>('#ffffff');

    // Ref para o container principal
    const containerRef = useRef<HTMLDivElement>(null);

    // Hook para detecção de cor
    const {
        textColor,
        backgroundColor,
        luminance,
    } = useDynamicTextColor(containerRef, {
        sampleSize: 16,
        updateInterval: 100,
        fallbackMode: 'auto',
    });

    // Aplica background customizado quando não está usando partículas
    useEffect(() => {
        if (backgroundType !== 'particles' && containerRef.current) {
            containerRef.current.style.backgroundColor = customBackground;
        }
    }, [backgroundType, customBackground]);

    // Handlers
    const togglePanel = () => setIsPanelOpen(prev => !prev);

    const handleColorModeChange = (mode: ColorModeOption) => {
        setColorMode(mode);
    };

    const handleBackgroundChange = (type: SelectedBackgroundType) => {
        setBackgroundType(type);
        switch (type) {
            case 'light':
                setCustomBackground('#ffffff');
                break;
            case 'dark':
                setCustomBackground('#1a1a1a');
                break;
            case 'colorful':
                setCustomBackground('#4F46E5');
                break;
            case 'particles':
            default:
                // Partículas usam seu próprio fundo
                break;
        }
    };

    const getEffectiveTextColor = () => {
        switch (colorMode) {
            case 'dark':
                return '#000000';
            case 'light':
                return '#ffffff';
            case 'complement':
                return getComplementaryColor(backgroundColor);
            case 'auto':
            default:
                return textColor;
        }
    };

    const effectiveColor = getEffectiveTextColor();

    return (
        <div className="relative w-screen min-h-screen">
            {/* ParticleBackground - sempre presente quando selecionado */}
            {backgroundType === 'particles' && <ParticleBackground />}

            {/* Container principal */}
            <div
                ref={containerRef}
                className="flex flex-col items-center justify-center p-8"
                style={{
                    backgroundColor: backgroundType === 'particles' ? 'transparent' : customBackground,
                    minHeight: '100vh',
                    boxSizing: 'border-box',
                }}
            >
                {/* Conteúdo da página */}
                <div className="text-center max-w-4xl">
                    <h1 className="text-5xl font-bold mb-6">
                        <DynamicText colorMode={colorMode} transitionDuration={400}>
                            Demonstração DynamicText
                        </DynamicText>
                    </h1>

                    <h2 className="text-3xl font-semibold mb-4">
                        <DynamicText colorMode={colorMode} transitionDuration={400}>
                            Detecção de contraste inteligente
                        </DynamicText>
                    </h2>

                    <h3 className="text-2xl font-medium mb-8">
                        <DynamicText colorMode={colorMode} transitionDuration={400}>
                            WCAG AA 4.5:1 garantido
                        </DynamicText>
                    </h3>

                    <div className="space-y-6 mb-12 text-lg leading-relaxed">
                        <p>
                            <DynamicText colorMode={colorMode} transitionDuration={400}>
                                Este é um exemplo de parágrafo usando o componente DynamicText.
                                O texto se adapta automaticamente ao fundo, garantindo legibilidade
                                em qualquer condição de contraste.
                            </DynamicText>
                        </p>

                        <p>
                            <DynamicText colorMode={colorMode} transitionDuration={400}>
                                Teste diferentes modos de cor no painel de controle.
                                Você pode alternar entre detecção automática, modo claro, modo escuro
                                e cor complementar.
                            </DynamicText>
                        </p>

                        <p>
                            <DynamicText colorMode={colorMode} transitionDuration={400}>
                                A transição entre cores é suave (400ms) e sem flicker, graças à
                                otimização do hook useDynamicTextColor.
                            </DynamicText>
                        </p>
                    </div>

                    {/* Botões de exemplo */}
                    <div className="flex gap-4 flex-wrap justify-center mb-12">
                        <button
                            className="px-6 py-3 rounded-lg border-none cursor-pointer text-base font-medium transition-transform hover:scale-105"
                            style={{
                                backgroundColor: '#4F46E5',
                                color: effectiveColor,
                            }}
                        >
                            <DynamicText colorMode={colorMode} transitionDuration={400}>
                                Botão Primário
                            </DynamicText>
                        </button>

                        <button
                            className="px-6 py-3 rounded-lg border-2 cursor-pointer text-base font-medium"
                            style={{
                                borderColor: effectiveColor,
                                backgroundColor: 'transparent',
                                color: effectiveColor,
                            }}
                        >
                            <DynamicText colorMode={colorMode} transitionDuration={400}>
                                Botão Secundário
                            </DynamicText>
                        </button>

                        <a
                            href="#"
                            className="px-6 py-3 rounded-lg border-none cursor-pointer text-base font-medium no-underline inline-block transition-transform hover:scale-105"
                            style={{
                                backgroundColor: '#10B981',
                                color: '#ffffff',
                            }}
                        >
                            <DynamicText colorMode={colorMode} transitionDuration={400}>
                                Link Estilizado
                            </DynamicText>
                        </a>
                    </div>

                    {/* Menu de navegação */}
                    <nav className="mt-8 p-6 rounded-xl bg-black/5">
                        <ul className="flex gap-8 list-none p-0 m-0">
                            {['Início', 'Sobre', 'Projetos', 'Contato'].map((item) => (
                                <li key={item}>
                                    <a
                                        href="#"
                                        className="no-underline text-base font-medium"
                                        style={{ color: effectiveColor }}
                                    >
                                        <DynamicText colorMode={colorMode} transitionDuration={400}>
                                            {item}
                                        </DynamicText>
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </nav>

                    {/* Informações de contraste */}
                    <div className="mt-12 p-4 rounded-lg bg-black/5 text-center text-sm">
                        <DynamicText colorMode={colorMode} transitionDuration={400}>
                            Contraste atual: {luminance ? `${(luminance * 100).toFixed(1)}% luminância` : 'Calculando...'}
                        </DynamicText>
                    </div>
                </div>
            </div>

            {/* Botão toggle fixo no topo direito */}
            <button
                onClick={togglePanel}
                className="fixed top-4 right-4 z-50 px-6 py-3 bg-indigo-600 text-white border-none rounded-lg cursor-pointer text-base font-semibold shadow-lg flex items-center gap-2 hover:bg-indigo-700 transition-colors"
            >
                <span className="text-xl">{isPanelOpen ? '⚙️' : '🎛️'}</span>
                {isPanelOpen ? 'Ocultar Painel' : 'Mostrar Painel'}
            </button>

            {/* Painel de controle */}
            {isPanelOpen && (
                <div
                    className="fixed top-24 right-4 z-40 w-80 max-h-[calc(100vh-8rem)] overflow-y-auto bg-gray-900/95 rounded-xl p-6 shadow-2xl border border-gray-700 text-white"
                >
                    {/* Cabeçalho */}
                    <div className="flex justify-between items-center mb-6 pb-4 border-b border-gray-700">
                        <h3 className="m-0 text-lg font-bold">🎛️ Painel de Controle</h3>
                    </div>

                    {/* Modo de cor */}
                    <div className="mb-6">
                        <label className="block mb-2 text-sm font-semibold text-gray-300">
                            🎨 Modo de Cor:
                        </label>
                        <div className="flex gap-2 flex-wrap">
                            {(['auto', 'dark', 'light', 'complement'] as ColorModeOption[]).map((mode) => (
                                <button
                                    key={mode}
                                    onClick={() => handleColorModeChange(mode)}
                                    className="px-4 py-2 rounded-lg text-sm cursor-pointer border-2 flex-1 min-w-[70px] transition-colors"
                                    style={{
                                        borderColor: colorMode === mode ? '#4F46E5' : '#4b5563',
                                        backgroundColor: colorMode === mode ? '#4F46E5' : 'transparent',
                                        color: colorMode === mode ? '#ffffff' : '#d1d5db',
                                        fontWeight: colorMode === mode ? '600' : '500',
                                    }}
                                >
                                    {mode === 'auto' ? 'Auto' :
                                        mode === 'dark' ? 'Escuro' :
                                            mode === 'light' ? 'Claro' : 'Complementar'}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Tipo de background */}
                    <div className="mb-6">
                        <label className="block mb-2 text-sm font-semibold text-gray-300">
                            🌈 Background:
                        </label>
                        <div className="flex gap-2 flex-wrap">
                            {[
                                { type: 'particles', label: 'Partículas', icon: '✨' },
                                { type: 'light', label: 'Claro', icon: '☀️' },
                                { type: 'dark', label: 'Escuro', icon: '🌙' },
                                { type: 'colorful', label: 'Colorido', icon: '🎨' },
                            ].map(({ type, label, icon }) => (
                                <button
                                    key={type}
                                    onClick={() => handleBackgroundChange(type as SelectedBackgroundType)}
                                    className="px-4 py-2 rounded-lg text-sm cursor-pointer border-2 flex-1 min-w-[70px] flex items-center justify-center gap-1 transition-colors"
                                    style={{
                                        borderColor: backgroundType === type ? '#4F46E5' : '#4b5563',
                                        backgroundColor: backgroundType === type ? '#4F46E5' : 'transparent',
                                        color: backgroundType === type ? '#ffffff' : '#d1d5db',
                                        fontWeight: backgroundType === type ? '600' : '500',
                                    }}
                                >
                                    {icon} {label}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Informações de detecção */}
                    <div className="mb-6 p-4 rounded-lg bg-white/5 border border-white/10">
                        <h4 className="m-0 mb-3 text-sm font-bold flex items-center gap-2">
                            📊 Detecção em Tempo Real
                        </h4>
                        <div className="grid grid-cols-2 gap-3 text-sm">
                            <span className="text-gray-400 font-medium">Fundo detectado:</span>
                            <span className="font-mono font-semibold flex items-center gap-2 justify-start text-white">
                                <span
                                    className="inline-block w-3.5 h-3.5 rounded-full border-2 border-gray-500 shadow"
                                    style={{ backgroundColor: backgroundColor || '#000' }}
                                />
                                {backgroundColor || '---'}
                            </span>

                            <span className="text-gray-400 font-medium">Texto recomendado:</span>
                            <span className="font-mono font-semibold flex items-center gap-2 justify-start text-white">
                                <span
                                    className="inline-block w-3.5 h-3.5 rounded-full border-2 border-gray-500 shadow"
                                    style={{ backgroundColor: textColor || '#000' }}
                                />
                                {textColor || '---'}
                            </span>

                            <span className="text-gray-400 font-medium">Luminância:</span>
                            <span className="font-mono font-semibold text-white">
                                {luminance ? `${(luminance * 100).toFixed(1)}%` : '---'}
                            </span>

                            <span className="text-gray-400 font-medium">Tipo:</span>
                            <span className="font-semibold capitalize text-white">
                                {backgroundColor ? 'color' : '---'}
                            </span>
                        </div>
                    </div>

                    {/* Cor efetiva atual */}
                    <div className="mb-6 p-4 rounded-lg bg-white/5 border border-white/10">
                        <h4 className="m-0 mb-3 text-sm font-bold flex items-center gap-2">
                            🎯 Cor Efetiva
                        </h4>
                        <div className="flex items-center gap-3">
                            <span
                                className="inline-block w-12 h-12 rounded-lg border-3 border-gray-500 shadow transition-colors"
                                style={{ backgroundColor: effectiveColor }}
                            />
                            <div>
                                <div className="font-mono text-base font-bold text-white">
                                    {effectiveColor}
                                </div>
                                <div className="text-sm text-gray-400">
                                    Modo: {colorMode === 'auto' ? '🤖 Auto' :
                                        colorMode === 'dark' ? '🌙 Escuro' :
                                            colorMode === 'light' ? '☀️ Claro' : '🎨 Complementar'}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Instruções */}
                    <div className="mt-6 p-3 rounded-lg bg-indigo-500/10 border border-indigo-500/20 text-sm text-indigo-200 leading-relaxed">
                        <strong>💡 Dica:</strong> Altere o background e observe como o texto se
                        adapta automaticamente. O contraste WCAG AA (4.5:1) é mantido em todos
                        os modos.
                    </div>
                </div>
            )}
        </div>
    );
}
