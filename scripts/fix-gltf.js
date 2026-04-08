import fs from 'fs';
import path from 'path';

const gltfPath = 'd:/Projetos/sites/portifolio/public/desktop_pc/scene-optimized.gltf';
const texturesDir = 'd:/Projetos/sites/portifolio/public/desktop_pc/';
const fallbackTexture = 'baseColor_16.webp';

try {
    const gltf = JSON.parse(fs.readFileSync(gltfPath, 'utf8'));
    let fixedCount = 0;

    if (gltf.images) {
        gltf.images.forEach((image) => {
            if (image.uri) {
                const texturePath = path.join(texturesDir, image.uri);
                if (!fs.existsSync(texturePath)) {
                    console.log(`Texture missing: ${image.uri}. Redirecting to ${fallbackTexture}`);
                    image.uri = fallbackTexture;
                    fixedCount++;
                }
            }
        });
    }

    if (fixedCount > 0) {
        fs.writeFileSync(gltfPath, JSON.stringify(gltf, null, 2));
        console.log(`Successfully fixed ${fixedCount} texture references in GLTF.`);
    } else {
        console.log('No missing textures found in GLTF.');
    }
} catch (error) {
    console.error('Error fixing GLTF:', error);
}
