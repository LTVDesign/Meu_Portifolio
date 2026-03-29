import { useMemo } from 'react';
import { useTexture } from '@react-three/drei';
// Tree-shakeable Three.js imports for better performance
import { LinearMipmapLinearFilter, LinearFilter, NearestFilter, RGBAFormat, SRGBColorSpace } from 'three';
import { usePerformance } from '../../contexts/PerformanceContext';

interface OptimizedTextureProps {
    urls: string | string[];
    type?: 'albedo' | 'normal' | 'roughness' | 'emissive' | 'noise';
    anisotropy?: number;
}

const OptimizedTexture = ({
    urls,
    type = 'albedo',
    anisotropy = 8
}: OptimizedTextureProps) => {
    const { isLowPerformance } = usePerformance();

    const textures = useTexture(Array.isArray(urls) ? urls : [urls]);

    const processedTextures = useMemo(() => {
        return (Array.isArray(textures) ? textures : [textures]).map((texture) => {
            const tex = texture.clone();

            // Configurações base
            tex.generateMipmaps = true;
            tex.minFilter = LinearMipmapLinearFilter;
            tex.magFilter = LinearFilter;
            tex.anisotropy = isLowPerformance ? 2 : (anisotropy || 8);

            // Otimizações por tipo
            switch (type) {
                case 'normal':
                    tex.format = RGBAFormat;
                    tex.anisotropy = isLowPerformance ? 4 : 12;
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
                tex.repeat.set(0.5, 0.5);
            }

            tex.needsUpdate = true;
            return tex;
        });
    }, [textures, type, anisotropy, isLowPerformance]);

    return Array.isArray(urls) ? processedTextures : processedTextures[0];
};

export default OptimizedTexture;