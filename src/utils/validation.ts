/**
 * Utilitários de validação e sanitização
 */

// Schema para configurações de partículas (versão simplificada sem zod)
export interface ParticleConfig {
  particleColor: string;
  speed: number;
  intensity: number;
  quantity: number;
  zoom: number;
  backgroundType: string;
  liquidResolution: number;
  liquidOctaves: number;
  liquidSpeed: number;
  liquidScale: number;
  liquidComplexity: number;
  liquidExpansion: number;
  liquidTwist: number;
  liquidGrain: number;
  liquidSmoothing: number;
  liquidColor1: string;
  liquidColor2: string;
  liquidColor3: string;
  liquidColor4: string;
  liquidColor5: string;
  liquidColor6: string;
  liquidIntensity: number;
  liquidNoiseScale: number;
  liquidGloss: number;
  liquidRefraction: number;
  particulateSpeed: number;
  particulateIntensity: number;
  particulateColor: string;
  particulateMode: string;
  particulateQuantity: number;
  particulateSize: number;
  particulateFriction: number;
  particulateSpring: number;
  particulatePalette: string;
  particulateColor1: string;
  particulateColor2: string;
  particulateColor3: string;
  particulateColor4: string;
  particulateColor5: string;
  particulateColor6: string;
  cyberpunkBloomStrength: number;
  cyberpunkFogDensity: number;
  cyberpunkSpeed: number;
  cyberpunkColor1: string;
  cyberpunkColor2: string;
  cyberpunkColor3: string;
  cyberpunkRotationSpeed: number;
  cyberpunkTunnelRadius: number;
  cyberpunkPointSize: number;
  cyberpunkLineOpacity: number;
  cyberpunkCameraFOV: number;
  wavefieldSpeed: number;
  wavefieldAmplitude: number;
  wavefieldColor: string;
  solidType: string;
  solidColor1: string;
  solidColor2: string;
  solidColor3: string;
  solidColor1Alpha: number;
  solidColor2Alpha: number;
  solidColor3Alpha: number;
  solidAngle: number;
  solidAnimationSpeed: number;
  solidGrain: boolean;
  solidOpacity: number;
  solidBlur: number;
  solidScale: number;
  particleSize: number;
  particleConnectDistance: number;
  lineThickness: number;
  particleOpacity: number;
  particleLineColor: string;
  particulateWanderSpeed: number;
  particulateWanderStrength: number;
  wavefieldFrequency: number;
  wavefieldComplexity: number;
  wavefieldGlow: number;
  wavefieldStarIntensity: number;
  wavefieldColor2: string;
  wavefieldColor3: string;
  wavefieldRotationSpeed: number;
  wavefieldMouseStrength: number;
  bolhasCount: number;
  bolhasSpeed: number;
  bolhasSize: number;
  bolhasSpread: number;
  bolhasColor1: string;
  bolhasColor2: string;
  bolhasColor3: string;
  matrixDensity: number;
  matrixSpeed: number;
  matrixFontSize: number;
  matrixColor: string;
  matrixBackgroundColor: string;
  glowIntensity: number;
  trailLength: number;
  columnSpacing: number;
  matrixCharSet: 'matrix' | 'binary' | 'japanese' | 'mixed';
}

const defaultConfig: ParticleConfig = {
  particleColor: '#915EFF',
  speed: 1,
  intensity: 0.7,
  quantity: 50,
  zoom: 1,
  backgroundType: 'cyberpunk',
  liquidResolution: 0.5,
  liquidOctaves: 3,
  liquidSpeed: 0.5,
  liquidScale: 0.05,
  liquidComplexity: 3.0,
  liquidExpansion: 1.6,
  liquidTwist: 0.0,
  liquidGrain: 0.018,
  liquidSmoothing: 0.6,
  liquidColor1: '#339cff',
  liquidColor2: '#384fff',
  liquidColor3: '#261985',
  liquidColor4: '#3623c7',
  liquidColor5: '#cce9ff',
  liquidColor6: '#ffffff',
  liquidIntensity: 1.0,
  liquidNoiseScale: 1.0,
  liquidGloss: 0.6,
  liquidRefraction: 0.5,
  particulateSpeed: 1,
  particulateIntensity: 0.8,
  particulateColor: '#ffffff',
  particulateMode: 'blow',
  particulateQuantity: 1000,
  particulateSize: 3,
  particulateFriction: 0.94,
  particulateSpring: 0.01,
  particulatePalette: 'abstract',
  particulateColor1: '#FF6B6B',
  particulateColor2: '#4ECDC4',
  particulateColor3: '#45B7D1',
  particulateColor4: '#96CEB4',
  particulateColor5: '#FFEAA7',
  particulateColor6: '#DDA0DD',
  cyberpunkBloomStrength: 5,
  cyberpunkFogDensity: 0.7,
  cyberpunkSpeed: 1,
  cyberpunkColor1: '#00ff00',
  cyberpunkColor2: '#ffff00',
  cyberpunkColor3: '#4499ff',
  cyberpunkRotationSpeed: 1.0,
  cyberpunkTunnelRadius: 0.65,
  cyberpunkPointSize: 0.015,
  cyberpunkLineOpacity: 0.5,
  cyberpunkCameraFOV: 75,
  wavefieldSpeed: 1,
  wavefieldAmplitude: 1,
  wavefieldColor: '#00ffff',
  solidType: 'solid',
  solidColor1: '#08080c',
  solidColor2: '#915EFF',
  solidColor3: '#ff0055',
  solidColor1Alpha: 1,
  solidColor2Alpha: 1,
  solidColor3Alpha: 1,
  solidAngle: 135,
  solidAnimationSpeed: 10,
  solidGrain: false,
  solidOpacity: 1,
  solidBlur: 0,
  solidScale: 1,
  particleSize: 1.5,
  particleConnectDistance: 120,
  lineThickness: 1.0,
  particleOpacity: 0.8,
  particleLineColor: '#915EFF',
  particulateWanderSpeed: 0.02,
  particulateWanderStrength: 0.05,
  wavefieldFrequency: 2.0,
  wavefieldComplexity: 1.0,
  wavefieldGlow: 0.8,
  wavefieldStarIntensity: 0.7,
  wavefieldColor2: '#ff00ff',
  wavefieldColor3: '#ff0055',
  wavefieldRotationSpeed: 1.0,
  wavefieldMouseStrength: 1.0,
  bolhasCount: 15000,
  bolhasSpeed: 0.5,
  bolhasSize: 0.02,
  bolhasSpread: 50,
  bolhasColor1: '#915EFF',
  bolhasColor2: '#00D4FF',
  bolhasColor3: '#FF6B9D',
  matrixDensity: 50,
  matrixSpeed: 50,
  matrixFontSize: 2,
  matrixColor: '#00ff00',
  matrixBackgroundColor: '#000000',
  glowIntensity: 0.5,
  trailLength: 20,
  columnSpacing: 0,
  matrixCharSet: 'matrix',
};

/**
 * Valida e sanitiza dados do localStorage
 */
export function validateLocalStorageData(data: unknown): ParticleConfig | null {
  try {
    if (typeof data !== 'object' || data === null) {
      return null;
    }

    // Faz uma cópia do objeto para evitar mutações indesejadas
    const validatedData = { ...defaultConfig, ...data };

    // Validação de tipos e valores
    if (
      typeof validatedData.particleColor !== 'string' ||
      !isValidHexColor(validatedData.particleColor)
    ) {
      validatedData.particleColor = defaultConfig.particleColor;
    }

    if (
      typeof validatedData.speed !== 'number' ||
      validatedData.speed < 0 ||
      validatedData.speed > 10
    ) {
      validatedData.speed = defaultConfig.speed;
    }

    if (
      typeof validatedData.intensity !== 'number' ||
      validatedData.intensity < 0 ||
      validatedData.intensity > 1
    ) {
      validatedData.intensity = defaultConfig.intensity;
    }

    if (
      typeof validatedData.quantity !== 'number' ||
      validatedData.quantity < 0 ||
      validatedData.quantity > 5000
    ) {
      validatedData.quantity = defaultConfig.quantity;
    }

    if (
      typeof validatedData.zoom !== 'number' ||
      validatedData.zoom < 0.1 ||
      validatedData.zoom > 5
    ) {
      validatedData.zoom = defaultConfig.zoom;
    }

    if (typeof validatedData.backgroundType !== 'string') {
      validatedData.backgroundType = defaultConfig.backgroundType;
    }

    // Validação de cores líquidas
    const liquidColors = [
      'liquidColor1',
      'liquidColor2',
      'liquidColor3',
      'liquidColor4',
      'liquidColor5',
      'liquidColor6',
      'particulateColor1',
      'particulateColor2',
      'particulateColor3',
      'particulateColor4',
      'particulateColor5',
      'particulateColor6',
      'cyberpunkColor1',
      'cyberpunkColor2',
      'cyberpunkColor3',
      'wavefieldColor',
      'wavefieldColor2',
      'wavefieldColor3',
      'solidColor1',
      'solidColor2',
      'solidColor3',
      'particleLineColor',
      'bolhasColor1',
      'bolhasColor2',
      'bolhasColor3',
      'matrixColor',
      'matrixBackgroundColor'
    ];

    for (const colorKey of liquidColors) {
      const colorValue = validatedData[colorKey as keyof ParticleConfig];
      if (typeof colorValue !== 'string' || !isValidHexColor(colorValue as string)) {
        validatedData[colorKey as keyof ParticleConfig] = defaultConfig[
          colorKey as keyof ParticleConfig
        ] as never;
      }
    }

    // Validação de modos
    if (!['blow', 'magnet', 'freeze'].includes(validatedData.particulateMode)) {
      validatedData.particulateMode = defaultConfig.particulateMode;
    }

    // Validação de conjuntos de caracteres da Matrix
    if (!['matrix', 'binary', 'japanese', 'mixed'].includes(validatedData.matrixCharSet)) {
      validatedData.matrixCharSet = defaultConfig.matrixCharSet;
    }

    // Validação de tipos de fundo sólido
    if (!['solid', 'linear', 'radial', 'conic', 'animated'].includes(validatedData.solidType)) {
      validatedData.solidType = defaultConfig.solidType;
    }

    // Validação de tipos de fundo sólido
    if (!['solid', 'linear', 'radial', 'conic', 'animated'].includes(validatedData.solidType)) {
      validatedData.solidType = defaultConfig.solidType;
    }

    // Validação de tipos de background
    if (!['particles', 'liquid', 'cyberpunk', 'wavefield', 'particulate', 'solid', 'bolhas', 'matrix'].includes(validatedData.backgroundType)) {
      validatedData.backgroundType = defaultConfig.backgroundType;
    }

    // Validação de números
    const numericFields: Array<keyof ParticleConfig> = [
      'liquidResolution',
      'liquidOctaves',
      'liquidSpeed',
      'liquidScale',
      'liquidComplexity',
      'liquidExpansion',
      'liquidTwist',
      'liquidGrain',
      'liquidSmoothing',
      'liquidIntensity',
      'liquidNoiseScale',
      'liquidGloss',
      'liquidRefraction',
      'particulateSpeed',
      'particulateIntensity',
      'particulateQuantity',
      'particulateSize',
      'particulateFriction',
      'particulateSpring',
      'cyberpunkBloomStrength',
      'cyberpunkFogDensity',
      'cyberpunkSpeed',
      'cyberpunkRotationSpeed',
      'cyberpunkTunnelRadius',
      'cyberpunkPointSize',
      'cyberpunkLineOpacity',
      'cyberpunkCameraFOV',
      'wavefieldSpeed',
      'wavefieldAmplitude',
      'wavefieldRotationSpeed',
      'wavefieldMouseStrength',
      'solidAngle',
      'solidAnimationSpeed',
      'solidOpacity',
      'solidBlur',
      'solidScale',
      'solidColor1Alpha',
      'solidColor2Alpha',
      'solidColor3Alpha',
      'particleSize',
      'particleConnectDistance',
      'lineThickness',
      'particleOpacity',
      'bolhasCount',
      'bolhasSpeed',
      'bolhasSize',
      'bolhasSpread',
      'matrixDensity',
      'matrixSpeed',
      'matrixFontSize'
    ];

    // Validação de propriedades da Matrix (cores já estão no array de cores)
    if (typeof validatedData.matrixDensity !== 'number' || validatedData.matrixDensity < 1 || validatedData.matrixDensity > 200) {
      validatedData.matrixDensity = defaultConfig.matrixDensity;
    }
    if (typeof validatedData.matrixSpeed !== 'number' || validatedData.matrixSpeed < 1 || validatedData.matrixSpeed > 200) {
      validatedData.matrixSpeed = defaultConfig.matrixSpeed;
    }
    if (typeof validatedData.matrixFontSize !== 'number' || validatedData.matrixFontSize < 0.5 || validatedData.matrixFontSize > 10) {
      validatedData.matrixFontSize = defaultConfig.matrixFontSize;
    }
    if (typeof validatedData.glowIntensity !== 'number' || validatedData.glowIntensity < 0 || validatedData.glowIntensity > 1) {
      validatedData.glowIntensity = defaultConfig.glowIntensity;
    }
    if (typeof validatedData.trailLength !== 'number' || validatedData.trailLength < 5 || validatedData.trailLength > 100) {
      validatedData.trailLength = defaultConfig.trailLength;
    }
    if (typeof validatedData.columnSpacing !== 'number' || validatedData.columnSpacing < 0 || validatedData.columnSpacing > 50) {
      validatedData.columnSpacing = defaultConfig.columnSpacing;
    }

    for (const field of numericFields) {
      const value = validatedData[field];
      if (typeof value !== 'number' || Number.isNaN(value)) {
        validatedData[field] = defaultConfig[field] as never;
      }
    }

    // Validação de booleanos
    if (typeof validatedData.solidGrain !== 'boolean') {
      validatedData.solidGrain = defaultConfig.solidGrain;
    }

    return validatedData;
  } catch {
    return null;
  }
}

/**
 * Verifica se uma string é uma cor hexadecimal válida
 */
function isValidHexColor(color: string): boolean {
  return /^#[0-9A-Fa-f]{6}$/.test(color);
}

/**
 * Sanitiza URLs para evitar ataques de XSS via window.open
 */
export function sanitizeUrl(url: string): boolean {
  try {
    const parsed = new URL(url, window.location.origin);
    // Apenas permite URLs com protocolos http/https e mesmo origem
    const allowedProtocols = ['http:', 'https:'];
    const allowedHosts = [window.location.hostname, 'localhost', '127.0.0.1'];

    if (!allowedProtocols.includes(parsed.protocol)) {
      return false;
    }

    // Verifica se é mesmo origem ou domínio permitido
    if (!allowedHosts.includes(parsed.hostname)) {
      // Pode adicionar allowlist de domínios externos confiáveis
      // Por segurança, apenas permite mesmo origem por padrão
      return false;
    }

    return true;
  } catch {
    return false;
  }
}

/**
 * Sanitiza string para prevenir XSS
 */
export function sanitizeString(input: string): string {
  return input
    .replace(/&/g, '&')
    .replace(/</g, '<')
    .replace(/>/g, '>')
    .replace(/"/g, '"')
    .replace(/'/g, '&#039;');
}

/**
 * Valida email com regex mais rigorosa
 */
export function validateEmail(email: string): boolean {
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return emailRegex.test(email);
}

/**
 * Valida telefone brasileiro
 */
export function validatePhone(phone: string): boolean {
  // Remove não dígitos
  const digits = phone.replace(/\D/g, '');
  // Aceita 10 ou 11 dígitos (com DDD)
  return /^(\d{10}|\d{11})$/.test(digits);
}

/**
 * Função para limpar dados do localStorage
 */
export function clearInvalidLocalStorage(): void {
  const keys = ['particleConfig', 'theme'];
  for (const key of keys) {
    try {
      const item = localStorage.getItem(key);
      if (item) {
        const parsed = JSON.parse(item);
        if (key === 'particleConfig') {
          const validated = validateLocalStorageData(parsed);
          if (!validated) {
            localStorage.removeItem(key);
          }
        }
      }
    } catch {
      localStorage.removeItem(key);
    }
  }
}
