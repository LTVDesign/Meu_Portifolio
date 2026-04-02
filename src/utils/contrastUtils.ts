/**
 * Utilitários para cálculo de contraste e manipulação de cores baseados em WCAG
 * Todas as funções são puras e não possuem side effects
 */

/**
 * Tipos para cores
 */
export type RGB = { r: number; g: number; b: number };
export type HSL = { h: number; s: number; l: number };
export type ColorInput = string | RGB;

/**
 * Constantes WCAG para cálculo de luminância
 */
const SRGB_RED_COEFFICIENT = 0.2126;
const SRGB_GREEN_COEFFICIENT = 0.7152;
const SRGB_BLUE_COEFFICIENT = 0.0722;

/**
 * Cores seguras para fallback
 */
const SAFE_COLORS = {
  white: '#ffffff',
  black: '#000000',
  darkGray: '#333333',
  lightGray: '#cccccc',
  yellow: '#ffff00',
  cyan: '#00ffff',
  magenta: '#ff00ff',
  orange: '#ff6600',
  green: '#00ff00',
  blue: '#0000ff',
};

/**
 * Calcula a luminância relativa de uma cor RGB segundo WCAG 2.1
 * Aplica correção sRGB para valores linearizados
 *
 * Fórmula: L = 0.2126R + 0.7152G + 0.0722B
 * onde R, G, B são valores linearizados (sRGB)
 *
 * @param r - componente vermelho (0-255)
 * @param g - componente verde (0-255)
 * @param b - componente azul (0-255)
 * @returns luminância no intervalo [0, 1] onde 0 é preto e 1 é branco
 *
 * @example
 * getLuminance(255, 255, 255) // retorna 1
 * getLuminance(0, 0, 0) // retorna 0
 */
export function getLuminance(r: number, g: number, b: number): number {
  // Normaliza para 0-1
  const rs = r / 255;
  const gs = g / 255;
  const bs = b / 255;

  // Aplica correção sRGB (linearização)
  const linearize = (c: number): number => {
    return c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4;
  };

  const rLinear = linearize(rs);
  const gLinear = linearize(gs);
  const bLinear = linearize(bs);

  // Calcula luminância
  const luminance =
    rLinear * SRGB_RED_COEFFICIENT +
    gLinear * SRGB_GREEN_COEFFICIENT +
    bLinear * SRGB_BLUE_COEFFICIENT;

  return Math.max(0, Math.min(1, luminance));
}

/**
 * Calcula o ratio de contraste entre duas luminâncias
 * Fórmula WCAG: (L1 + 0.05) / (L2 + 0.05) onde L1 >= L2
 *
 * @param lum1 - primeira luminância (0-1)
 * @param lum2 - segunda luminância (0-1)
 * @returns ratio de contraste (>= 1)
 *
 * @example
 * getContrastRatio(1, 0) // retorna 21
 * getContrastRatio(0.5, 0.5) // retorna 1
 */
export function getContrastRatio(lum1: number, lum2: number): number {
  const L1 = Math.max(lum1, lum2);
  const L2 = Math.min(lum1, lum2);

  return (L1 + 0.05) / (L2 + 0.05);
}

/**
 * Converte uma cor hexadecimal para objeto RGB
 * @param hex - cor em formato hex (#RGB, #RRGGBB, ou sem #)
 * @returns objeto RGB com valores 0-255
 * @throws Error se o formato hex for inválido
 */
export function hexToRGB(hex: string): RGB {
  // Remove # se presente
  hex = hex.replace(/^#/, '');

  // Expande forma curta #RGB para #RRGGBB
  if (hex.length === 3) {
    hex = hex
      .split('')
      .map((c) => c + c)
      .join('');
  }

  if (hex.length !== 6) {
    throw new Error(`Formato hexadecimal inválido: ${hex}`);
  }

  const result = /^([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  if (!result) {
    throw new Error(`Formato hexadecimal inválido: ${hex}`);
  }

  return {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16),
  };
}

/**
 * Converte RGB para HSL
 * @param r - vermelho (0-255)
 * @param g - verde (0-255)
 * @param b - azul (0-255)
 * @returns objeto HSL com H em [0,360], S e L em [0,1]
 */
function rgbToHSL(r: number, g: number, b: number): HSL {
  const rs = r / 255;
  const gs = g / 255;
  const bs = b / 255;

  const max = Math.max(rs, gs, bs);
  const min = Math.min(rs, gs, bs);
  const delta = max - min;

  let h = 0;
  let s = 0;
  const l = (max + min) / 2;

  if (delta !== 0) {
    // Calcula matiz
    if (max === rs) {
      h = ((gs - bs) / delta) % 6;
    } else if (max === gs) {
      h = (bs - rs) / delta + 2;
    } else {
      h = (rs - gs) / delta + 4;
    }
    h = h * 60;
    if (h < 0) h += 360;

    // Calcula saturação
    s = delta / (1 - Math.abs(2 * l - 1));
  }

  return {
    h: Math.round(h) % 360,
    s: s,
    l: l,
  };
}

/**
 * Converte HSL para RGB
 * @param h - matiz (0-360)
 * @param s - saturação (0-1)
 * @param l - luminância (0-1)
 * @returns objeto RGB com valores 0-255
 */
function hslToRGB(h: number, s: number, l: number): RGB {
  const c = (1 - Math.abs(2 * l - 1)) * s;
  const x = c * (1 - Math.abs(((h / 60) % 2) - 1));
  const m = l - c / 2;

  let rs = 0,
    gs = 0,
    bs = 0;

  if (0 <= h && h < 60) {
    rs = c;
    gs = x;
    bs = 0;
  } else if (60 <= h && h < 120) {
    rs = x;
    gs = c;
    bs = 0;
  } else if (120 <= h && h < 180) {
    rs = 0;
    gs = c;
    bs = x;
  } else if (180 <= h && h < 240) {
    rs = 0;
    gs = x;
    bs = c;
  } else if (240 <= h && h < 300) {
    rs = x;
    gs = 0;
    bs = c;
  } else if (300 <= h && h < 360) {
    rs = c;
    gs = 0;
    bs = x;
  }

  return {
    r: Math.round((rs + m) * 255),
    g: Math.round((gs + m) * 255),
    b: Math.round((bs + m) * 255),
  };
}

/**
 * Converte RGB para hexadecimal
 * @param r - vermelho (0-255)
 * @param g - verde (0-255)
 * @param b - azul (0-255)
 * @returns cor em formato hex com #
 */
function rgbToHex(r: number, g: number, b: number): string {
  const toHex = (n: number): string => {
    const hex = Math.max(0, Math.min(255, Math.round(n))).toString(16);
    return hex.length === 1 ? '0' + hex : hex;
  };

  return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
}

/**
 * Retorna a cor complementar de uma cor hexadecimal
 * Rotaciona o matiz (H) em 180° no espaço HSL
 *
 * @param hex - cor de entrada em formato hex
 * @returns cor complementar em formato hex
 *
 * @example
 * getComplementaryColor('#ff0000') // retorna '#00ffff' (ciano)
 * getComplementaryColor('#00ff00') // retorna '#ff00ff' (magenta)
 */
export function getComplementaryColor(hex: string): string {
  const rgb = hexToRGB(hex);
  const hsl = rgbToHSL(rgb.r, rgb.g, rgb.b);

  // Rotaciona matiz 180°
  hsl.h = (hsl.h + 180) % 360;

  const complementaryRGB = hslToRGB(hsl.h, hsl.s, hsl.l);
  return rgbToHex(complementaryRGB.r, complementaryRGB.g, complementaryRGB.b);
}

/**
 * Calcula a cor dominante de uma paleta
 * Estratégia: retorna a cor mais frequente (por comparação exata)
 * ou a média ponderada se houver muitas cores únicas
 *
 * @param colors - array de cores em formato hex
 * @returns cor dominante em formato hex
 *
 * @example
 * getDominantColorFromPalette(['#ff0000', '#00ff00', '#ff0000']) // retorna '#ff0000'
 */
export function getDominantColorFromPalette(colors: string[]): string {
  if (colors.length === 0) {
    throw new Error('Array de cores não pode estar vazio');
  }

  // Conta frequência de cada cor
  const frequency = new Map<string, number>();
  colors.forEach((color) => {
    const normalized = color.toLowerCase();
    frequency.set(normalized, (frequency.get(normalized) || 0) + 1);
  });

  // Encontra a cor mais frequente
  let maxFreq = 0;
  let dominantColor = colors[0];

  for (const [color, count] of frequency.entries()) {
    if (count > maxFreq) {
      maxFreq = count;
      dominantColor = color;
    }
  }

  // Se a frequência máxima é pelo menos 2x maior que a segunda,
  // retorna a cor mais frequente. Caso contrário, calcula média ponderada.
  const sorted = Array.from(frequency.entries()).sort((a, b) => b[1] - a[1]);

  if (sorted.length > 1 && sorted[0][1] < sorted[1][1] * 2) {
    // Média ponderada das cores
    let totalR = 0,
      totalG = 0,
      totalB = 0;
    let totalWeight = 0;

    for (const [color, count] of frequency.entries()) {
      try {
        const rgb = hexToRGB(color);
        totalR += rgb.r * count;
        totalG += rgb.g * count;
        totalB += rgb.b * count;
        totalWeight += count;
      } catch {
        // Ignora cores inválidas
      }
    }

    if (totalWeight > 0) {
      return rgbToHex(
        Math.round(totalR / totalWeight),
        Math.round(totalG / totalWeight),
        Math.round(totalB / totalWeight)
      );
    }
  }

  return dominantColor;
}

/**
 * Verifica se um fundo é escuro baseado na luminância
 * @param luminance - luminância (0-1)
 * @returns true se luminância < 0.5
 */
export function isDarkBackground(luminance: number): boolean {
  return luminance < 0.5;
}

/**
 * Retorna a cor de texto ótima (preto ou branco) para um fundo
 * Baseada no contraste mínimo WCAG AA de 4.5:1
 *
 * @param bgLuminance - luminância do fundo (0-1)
 * @returns '#000000' ou '#ffffff'
 *
 * @example
 * getOptimalTextColor(0.9) // retorna '#000000' (fundo claro)
 * getOptimalTextColor(0.1) // retorna '#ffffff' (fundo escuro)
 */
export function getOptimalTextColor(bgLuminance: number): string {
  // Luminância do preto: 0, do branco: 1
  const contrastWithBlack = getContrastRatio(bgLuminance, 0);
  const contrastWithWhite = getContrastRatio(bgLuminance, 1);

  // WCAG AA requer contraste mínimo de 4.5:1 para texto normal
  const MIN_CONTRAST = 4.5;

  if (contrastWithBlack >= MIN_CONTRAST) {
    return '#000000';
  }
  if (contrastWithWhite >= MIN_CONTRAST) {
    return '#ffffff';
  }

  // Se nenhum atinge o mínimo, retorna a de maior contraste
  return contrastWithBlack > contrastWithWhite ? '#000000' : '#ffffff';
}

/**
 * Calcula a cor de texto ótima para uma cor de fundo hexadecimal
 * Versão conveniente que aceita cor em hex diretamente
 *
 * @param bgHex - cor de fundo em formato hex
 * @returns cor de texto em formato hex
 */
export function getOptimalTextColorForHex(bgHex: string): string {
  const rgb = hexToRGB(bgHex);
  const luminance = getLuminance(rgb.r, rgb.g, rgb.b);
  return getOptimalTextColor(luminance);
}

/**
 * Verifica se o contraste entre duas cores atende ao WCAG AA
 * @param bgHex - cor de fundo em formato hex
 * @param textHex - cor de texto em formato hex
 * @param level - nível de contraste (4.5 para AA, 7 para AAA)
 * @returns true se contraste é adequado
 */
export function hasSufficientContrast(
  bgHex: string,
  textHex: string,
  level: number = 4.5
): boolean {
  try {
    const bgRGB = hexToRGB(bgHex);
    const textRGB = hexToRGB(textHex);

    const bgLuminance = getLuminance(bgRGB.r, bgRGB.g, bgRGB.b);
    const textLuminance = getLuminance(textRGB.r, textRGB.g, textRGB.b);

    const contrast = getContrastRatio(bgLuminance, textLuminance);
    return contrast >= level;
  } catch {
    return false;
  }
}

/**
 * Gera uma cor de texto segura que garante contraste mínimo
 * Testa múltiplas cores seguras até encontrar uma que atenda ao contraste
 *
 * @param bgHex - cor de fundo em formato hex
 * @param level - nível de contraste (4.5 para AA, 7 para AAA)
 * @returns cor de texto segura em formato hex
 */
export function getSafeTextColor(bgHex: string, level: number = 4.5): string {
  const safeColorsArray = Object.values(SAFE_COLORS);

  for (const color of safeColorsArray) {
    if (hasSufficientContrast(bgHex, color, level)) {
      return color;
    }
  }

  // Se nenhuma cor segura funcionar, retorna preto ou branco baseado na luminância
  try {
    const bgRGB = hexToRGB(bgHex);
    const bgLuminance = getLuminance(bgRGB.r, bgRGB.g, bgRGB.b);
    return bgLuminance > 0.5 ? '#000000' : '#ffffff';
  } catch {
    return '#000000';
  }
}

/**
 * Verifica se uma cor é transparente ou quase transparente
 * @param hex - cor em formato hex
 * @param threshold - limiar de transparência (0-1)
 * @returns true se transparência for maior que o threshold
 */
export function isTransparent(hex: string, threshold: number = 0.1): boolean {
  try {
    // Remove # se presente
    hex = hex.replace(/^#/, '');

    // Verifica se é formato RGBA
    if (hex.length === 8) {
      const alpha = parseInt(hex.substring(6, 8), 16) / 255;
      return alpha <= threshold;
    }

    // Para hex normal, assume totalmente opaco
    return false;
  } catch {
    return false;
  }
}

/**
 * Ajusta a cor para garantir contraste mínimo com outra cor
 * Modifica a cor de texto se necessário para atingir contraste adequado
 *
 * @param bgHex - cor de fundo em formato hex
 * @param textHex - cor de texto inicial em formato hex
 * @param level - nível de contraste desejado (4.5 para AA, 7 para AAA)
 * @returns cor de texto ajustada em formato hex
 */
export function adjustColorForContrast(
  bgHex: string,
  textHex: string,
  level: number = 4.5
): string {
  if (hasSufficientContrast(bgHex, textHex, level)) {
    return textHex;
  }

  // Tenta cores seguras primeiro
  const safeColor = getSafeTextColor(bgHex, level);
  if (safeColor !== textHex) {
    return safeColor;
  }

  // Se nenhuma cor segura funcionar, tenta ajustar a cor original
  try {
    const bgRGB = hexToRGB(bgHex);
    const bgLuminance = getLuminance(bgRGB.r, bgRGB.g, bgRGB.b);

    // Se fundo é claro, tenta tons mais escuros do texto
    if (bgLuminance > 0.5) {
      // Escurece gradualmente até atingir contraste
      let currentLuminance = bgLuminance;
      let contrast = getContrastRatio(bgLuminance, currentLuminance);

      while (contrast < level && currentLuminance > 0.1) {
        // Escurece em 10%
        currentLuminance = Math.max(0.1, currentLuminance - 0.1);
        contrast = getContrastRatio(bgLuminance, currentLuminance);
      }

      return currentLuminance > 0.1 ? '#000000' : textHex;
    } else {
      // Fundo escuro, tenta tons mais claros
      let currentLuminance = bgLuminance;
      let contrast = getContrastRatio(bgLuminance, currentLuminance);

      while (contrast < level && currentLuminance < 0.9) {
        // Clareia em 10%
        currentLuminance = Math.min(0.9, currentLuminance + 0.1);
        contrast = getContrastRatio(bgLuminance, currentLuminance);
      }

      return currentLuminance < 0.9 ? '#ffffff' : textHex;
    }
  } catch {
    return textHex;
  }
}

/**
 * Calcula a cor de texto ideal considerando múltiplos fatores
 * - Contraste mínimo WCAG
 * - Preferência de cor (se fornecida)
 * - Cores seguras de fallback
 *
 * @param bgHex - cor de fundo em formato hex
 * @param preferredColor - cor de texto preferida (opcional)
 * @param level - nível de contraste desejado (4.5 para AA, 7 para AAA)
 * @returns cor de texto ideal em formato hex
 */
export function getOptimalTextColorWithFallback(
  bgHex: string,
  preferredColor?: string,
  level: number = 4.5
): string {
  if (!preferredColor) {
    return getSafeTextColor(bgHex, level);
  }

  // Primeiro tenta a cor preferida
  if (hasSufficientContrast(bgHex, preferredColor, level)) {
    return preferredColor;
  }

  // Depois tenta cores seguras
  const safeColor = getSafeTextColor(bgHex, level);
  if (safeColor !== preferredColor) {
    return safeColor;
  }

  // Como último recurso, ajusta a cor preferida
  return adjustColorForContrast(bgHex, preferredColor, level);
}

/**
 * Verifica se uma cor é considerada colorida (não neutra)
 * Baseado em saturação e distância do cinza
 *
 * @param hex - cor em formato hex
 * @param saturationThreshold - limiar de saturação (0-1)
 * @returns true se cor for considerada colorida
 */
export function isColorful(hex: string, saturationThreshold: number = 0.1): boolean {
  try {
    const rgb = hexToRGB(hex);
    const hsl = rgbToHSL(rgb.r, rgb.g, rgb.b);
    return hsl.s > saturationThreshold;
  } catch {
    return false;
  }
}

/**
 * Calcula a média de luminância de múltiplas cores
 *
 * @param colors - array de cores em formato hex
 * @returns média de luminância (0-1)
 */
export function getAverageLuminance(colors: string[]): number {
  if (colors.length === 0) return 0;

  let totalLuminance = 0;
  let validCount = 0;

  for (const color of colors) {
    try {
      const rgb = hexToRGB(color);
      const luminance = getLuminance(rgb.r, rgb.g, rgb.b);
      totalLuminance += luminance;
      validCount++;
    } catch {
      // Ignora cores inválidas
    }
  }

  return validCount > 0 ? totalLuminance / validCount : 0;
}

/**
 * Verifica se uma cor está dentro de um intervalo de luminância
 *
 * @param hex - cor em formato hex
 * @param minLuminance - luminância mínima (0-1)
 * @param maxLuminance - luminância máxima (0-1)
 * @returns true se luminância estiver no intervalo
 */
export function isLuminanceInRange(
  hex: string,
  minLuminance: number,
  maxLuminance: number
): boolean {
  try {
    const rgb = hexToRGB(hex);
    const luminance = getLuminance(rgb.r, rgb.g, rgb.b);
    return luminance >= minLuminance && luminance <= maxLuminance;
  } catch {
    return false;
  }
}
