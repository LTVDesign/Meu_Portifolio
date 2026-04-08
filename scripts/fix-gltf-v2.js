import fs from 'fs';
import path from 'path';

const gltfPath = 'd:/Projetos/sites/portifolio/public/desktop_pc/scene-optimized.gltf';
const texturesDir = 'd:/Projetos/sites/portifolio/public/desktop_pc/';
const woodTexture = 'baseColor_1.webp';
const techTexture = 'baseColor_2.webp';

try {
    const gltf = JSON.parse(fs.readFileSync(gltfPath, 'utf8'));
    let fixedCount = 0;

    if (gltf.images) {
        // We want to redirect anything that was "missing" (and is currently wood) to tech gray
        // EXCEPT the very first wood texture which is likely the desk.
        // Usually, in these optimized models, the first few images are the large ones (desk).
        gltf.images.forEach((image, index) => {
            if (image.uri === woodTexture && index > 0) {
                console.log(`Image index ${index}: Redirecting wood to tech gray (${techTexture})`);
                image.uri = techTexture;
                fixedCount++;
            }
        });
    }

    if (fixedCount > 0) {
        fs.writeFileSync(gltfPath, JSON.stringify(gltf, null, 2));
        console.log(`Successfully fixed ${fixedCount} texture references in GLTF.`);
    } else {
        console.log('No textures needed fixing.');
    }
} catch (error) {
    console.error('Error fixing GLTF textures:', error);
}
