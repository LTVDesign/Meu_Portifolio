import { useTexture } from '@react-three/drei';
import { useEffect, useMemo, useRef } from 'react';
// Tree-shakeable Three.js imports for better performance
import {
  ClampToEdgeWrapping,
  LinearFilter,
  LinearMipmapLinearFilter,
  type MirroredRepeatWrapping,
  NearestFilter,
  type RepeatWrapping,
  RGBAFormat,
  SRGBColorSpace,
} from 'three';
import { usePerformance } from '../../contexts/PerformanceContext';

interface OptimizedTextureProps {
  urls: string | string[];
  type?:
    | 'albedo'
    | 'normal'
    | 'roughness'
    | 'metalness'
    | 'emissive'
    | 'ao'
    | 'height'
    | 'specular'
    | 'opacity'
    | 'displacement'
    | 'roughness-metalness'
    | 'noise';
  anisotropy?: number;
  wrapS?:
    | typeof ClampToEdgeWrapping
    | typeof RepeatWrapping
    | typeof MirroredRepeatWrapping;
  wrapT?:
    | typeof ClampToEdgeWrapping
    | typeof RepeatWrapping
    | typeof MirroredRepeatWrapping;
  repeat?: { x: number; y: number };
  flipY?: boolean;
  premultiplyAlpha?: boolean;
}

const OptimizedTexture = ({
  urls,
  type = 'albedo',
  anisotropy = 8,
  wrapS = ClampToEdgeWrapping,
  wrapT = ClampToEdgeWrapping,
  repeat = { x: 1, y: 1 },
  flipY = true,
  premultiplyAlpha = false,
}: OptimizedTextureProps) => {
  const { isLowPerformance } = usePerformance();
  const textureRefs = useRef<any[]>([]);

  const textures = useTexture(Array.isArray(urls) ? urls : [urls]);

  // Limpar texturas antigas quando o componente desmontar
  useEffect(() => {
    return () => {
      textureRefs.current.forEach((tex) => {
        if (tex?.dispose) {
          tex.dispose();
        }
      });
      textureRefs.current = [];
    };
  }, []);

  const processedTextures = useMemo(() => {
    const textureArray = Array.isArray(textures) ? textures : [textures];

    return textureArray.map((texture) => {
      const tex = texture.clone();

      // Armazenar referência para limpeza posterior
      textureRefs.current.push(tex);

      // Configurações base
      tex.generateMipmaps = true;
      tex.minFilter = LinearMipmapLinearFilter;
      tex.magFilter = LinearFilter;
      tex.anisotropy = isLowPerformance ? 2 : anisotropy || 8;

      // Configurações de wrapping
      tex.wrapS = wrapS;
      tex.wrapT = wrapT;

      // Configurações de repetição
      tex.repeat.set(repeat.x, repeat.y);

      // Outras configurações
      tex.flipY = flipY;
      tex.premultiplyAlpha = premultiplyAlpha;

      // Otimizações por tipo
      switch (type) {
        case 'normal':
          tex.format = RGBAFormat;
          tex.anisotropy = isLowPerformance ? 4 : 12;
          break;
        case 'roughness':
        case 'metalness':
        case 'ao':
        case 'height':
        case 'specular':
        case 'opacity':
        case 'displacement':
          tex.format = RGBAFormat;
          // Não aplicar color space para mapas de canal
          tex.anisotropy = isLowPerformance ? 2 : 4;
          break;
        case 'roughness-metalness':
          tex.format = RGBAFormat;
          // Não aplicar color space para mapas de canal
          tex.anisotropy = isLowPerformance ? 2 : 6;
          break;
        case 'noise':
          tex.minFilter = NearestFilter;
          tex.magFilter = NearestFilter;
          tex.anisotropy = 2;
          break;
        case 'emissive':
          tex.format = RGBAFormat;
          break;
        default:
          tex.colorSpace = SRGBColorSpace;
      }

      if (isLowPerformance) {
        // Reduzir qualidade em dispositivos de baixo desempenho
        tex.generateMipmaps = false;
        tex.minFilter = LinearFilter;
        tex.magFilter = LinearFilter;

        // Reduzir resolução efetiva
        tex.repeat.set(repeat.x * 0.5, repeat.y * 0.5);
      }

      tex.needsUpdate = true;
      return tex;
    });
  }, [
    textures,
    type,
    anisotropy,
    isLowPerformance,
    wrapS,
    wrapT,
    repeat,
    flipY,
    premultiplyAlpha,
  ]);

  return Array.isArray(urls) ? processedTextures : processedTextures[0];
};

export default OptimizedTexture;
