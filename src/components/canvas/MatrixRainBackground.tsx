import React, { useEffect, useRef } from 'react';

interface MatrixRainBackgroundProps {
    density?: number;
    speed?: number;
    fontSize?: number;
    color?: string;
    backgroundColor?: string;
    charSet?: 'matrix' | 'binary' | 'japanese' | 'mixed';
    glowIntensity?: number;
    trailLength?: number;
    columnSpacing?: number;
}

const MatrixRainBackground: React.FC<MatrixRainBackgroundProps> = ({
    density = 50,
    speed = 50,
    fontSize = 2,
    color = '#00ff00',
    backgroundColor = '#000000',
    charSet = 'matrix',
    glowIntensity = 0.5,
    trailLength = 20,
    columnSpacing = 0
}) => {
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!containerRef.current) return;

        // Limpar conteúdo anterior
        containerRef.current.innerHTML = '';

        // Remover estilos anteriores
        const existingStyles = document.querySelectorAll('style[data-matrix-rain]');
        existingStyles.forEach(style => style.remove());

        // Funções auxiliares
        const randomInt = (from: number, to: number) => {
            return Math.floor(Math.random() * (to - from + 1) + from);
        };

        const getRandomChar = () => {
            const charSets: Record<string, number[][]> = {
                matrix: [
                    [0x3041, 0x30ff],
                    [0x2000, 0x206f],
                    [0x0020, 0x007f],
                    [0xff00, 0xffef]
                ],
                binary: [
                    [0x30, 0x39],
                    [0x0041, 0x005A],
                    [0x0061, 0x007A]
                ],
                japanese: [
                    [0x3041, 0x3096],
                    [0x30A1, 0x30FA],
                    [0x4E00, 0x9FAF]
                ],
                mixed: [
                    [0x3041, 0x30ff],
                    [0x2000, 0x206f],
                    [0x0020, 0x007f],
                    [0xff00, 0xffef],
                    [0x30, 0x39],
                    [0x0041, 0x005A],
                    [0x0061, 0x007A]
                ]
            };

            const sets = charSets[charSet] || charSets.matrix;
            const selectedRange = sets[randomInt(0, sets.length - 1)];
            return String.fromCharCode(randomInt(selectedRange[0], selectedRange[1]));
        };

        // Converter hex para HSL
        const hexToHSL = (hex: string) => {
            const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
            if (!result) return { h: 120, s: 100, l: 50 };

            let r = parseInt(result[1], 16) / 255;
            let g = parseInt(result[2], 16) / 255;
            let b = parseInt(result[3], 16) / 255;

            const max = Math.max(r, g, b), min = Math.min(r, g, b);
            let h = 0, s = 0;
            const l = (max + min) / 2;

            if (max !== min) {
                const d = max - min;
                s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
                switch (max) {
                    case r: h = (g - b) / d + (g < b ? 6 : 0); break;
                    case g: h = (b - r) / d + 2; break;
                    case b: h = (r - g) / d + 4; break;
                }
                h /= 6;
            }

            return {
                h: Math.round(h * 360),
                s: Math.round(s * 100),
                l: Math.round(l * 100)
            };
        };

        const mainColorHSL = hexToHSL(color);

        // Classe para representar um caractere
        class MatrixChar {
            element: HTMLSpanElement;

            constructor() {
                this.element = document.createElement('span');
                this.mutate();
            }

            mutate() {
                this.element.textContent = getRandomChar();
            }
        }

        // Classe para representar uma trilha de caracteres
        class Trail {
            list: MatrixChar[];
            options: { size: number; offset: number };
            body: (MatrixChar | null)[];

            constructor(list: MatrixChar[] = [], options: { size?: number; offset?: number } = {}) {
                this.list = list;
                this.options = { size: 10, offset: 0, ...options };
                this.body = [];
                this.move();
            }

            traverse(fn: (char: MatrixChar, index: number, isLast: boolean) => void) {
                this.body.forEach((char, i) => {
                    const last = (i === this.body.length - 1);
                    if (char) fn(char, i, last);
                });
            }

            move() {
                this.body = [];
                const { offset, size } = this.options;

                for (let i = 0; i < size; ++i) {
                    const item = this.list[offset + i - size + 1];
                    this.body.push(item || null);
                }

                this.options.offset = (offset + 1) % (this.list.length + size - 1);
            }
        }

        // Classe para representar uma coluna de chuva
        class RainColumn {
            element: HTMLParagraphElement;
            trail!: Trail;

            constructor(target: HTMLElement, rowLength: number) {
                this.element = document.createElement('p');
                this.build(rowLength);
                if (target) {
                    target.appendChild(this.element);
                }
                this.startDrop();
            }

            build(row = 20) {
                const fragment = document.createDocumentFragment();
                const chars: MatrixChar[] = [];

                for (let i = 0; i < row; ++i) {
                    const char = new MatrixChar();
                    fragment.appendChild(char.element);
                    chars.push(char);

                    if (Math.random() < 0.5) {
                        this.startMutation(char);
                    }
                }

                this.trail = new Trail(chars, {
                    size: trailLength,
                    offset: randomInt(0, 100)
                });

                this.element.appendChild(fragment);
            }

            startMutation(char: MatrixChar) {
                const interval = randomInt(1000, 5000);
                const mutationHandler = () => {
                    char.mutate();
                    setTimeout(mutationHandler, interval);
                };
                setTimeout(mutationHandler, interval);
            }

            startDrop() {
                const trail = this.trail;
                const len = trail.body.length;
                const delay = randomInt(10, speed);

                const dropHandler = () => {
                    trail.move();
                    trail.traverse((char, i, isLast) => {
                        const baseLightness = Math.max(20, 70 / len * (i + 1));
                        const lightness = Math.min(100, baseLightness + (glowIntensity * 30));
                        const saturation = Math.min(100, mainColorHSL.s + (glowIntensity * 20));

                        char.element.style.color = `hsl(${mainColorHSL.h}, ${saturation}%, ${lightness}%)`;

                        if (isLast) {
                            const glowSize = glowIntensity * 2;
                            char.element.style.color = `hsl(${mainColorHSL.h}, ${saturation}%, 90%)`;
                            char.element.style.textShadow = `
                                0 0 ${glowSize}em #fff,
                                0 0 ${glowSize * 1.5}em currentColor
                            `;
                        }
                    });

                    setTimeout(dropHandler, delay);
                };

                dropHandler();
            }
        }

        // Configurar contêiner
        containerRef.current.style.display = 'flex';
        containerRef.current.style.flexWrap = 'wrap';
        containerRef.current.style.width = '100%';
        containerRef.current.style.height = '100%';
        containerRef.current.style.backgroundColor = backgroundColor;
        containerRef.current.style.overflow = 'hidden';
        containerRef.current.style.position = 'fixed';
        containerRef.current.style.top = '0';
        containerRef.current.style.left = '0';
        containerRef.current.style.zIndex = '-1';
        containerRef.current.style.alignItems = 'flex-start';
        containerRef.current.style.justifyContent = 'space-around';

        // Criar colunas de chuva
        const columns: RainColumn[] = [];
        for (let i = 0; i < density; ++i) {
            const column = new RainColumn(containerRef.current, 30);
            column.element.style.lineHeight = '1';
            column.element.style.margin = '0';
            column.element.style.padding = '0';
            column.element.style.display = 'flex';
            column.element.style.flexDirection = 'column';
            column.element.style.flex = '1';
            if (columnSpacing > 0) {
                column.element.style.margin = `0 ${columnSpacing / 2}px`;
            }
            columns.push(column);
        }

        // Estilizar caracteres
        const style = document.createElement('style');
        style.setAttribute('data-matrix-rain', 'true');
        style.textContent = `
            .matrix-rain-background {
                display: flex !important;
                flex-wrap: wrap !important;
                align-items: flex-start !important;
                justify-content: flex-start !important;
                gap: 0 !important;
            }

            .matrix-rain-background p {
                margin: 0 !important;
                padding: 0 !important;
                display: flex !important;
                flex-direction: column !important;
                flex: 1 1 auto !important;
                min-width: 0 !important;
                max-width: none !important;
                width: auto !important;
                height: 100% !important;
                overflow: visible !important;
            }

            .matrix-rain-background span {
                display: block !important;
                width: ${fontSize}vmin !important;
                height: ${fontSize}vmin !important;
                font-size: ${fontSize}vmin !important;
                color: ${color}11 !important;
                text-align: center !important;
                font-family: "Courier New", monospace !important;
                transition: color 0.1s ease !important;
                line-height: 1 !important;
                flex-shrink: 0 !important;
            }
        `;
        document.head.appendChild(style);

        // Forçar reflow para garantir que o layout seja aplicado
        containerRef.current.offsetHeight;

        return () => {
            document.head.removeChild(style);
        };
    }, [density, speed, fontSize, color, backgroundColor, charSet, glowIntensity, trailLength, columnSpacing]);

    return (
        <div
            ref={containerRef}
            className="matrix-rain-background fixed inset-0 -z-10 pointer-events-none"
            style={{ backgroundColor }}
        />
    );
};

export default MatrixRainBackground;