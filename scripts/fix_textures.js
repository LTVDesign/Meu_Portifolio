import fs from 'fs';
import path from 'path';

const gltfPath = 'public/desktop_pc/scene-optimized.gltf';

try {
  console.log('Reading GLTF file...');
  const data = fs.readFileSync(gltfPath, 'utf8');
  const gltf = JSON.parse(data);

  // 1. Add EXT_texture_webp to extensionsUsed
  if (!gltf.extensionsUsed) gltf.extensionsUsed = [];
  if (!gltf.extensionsUsed.includes('EXT_texture_webp')) {
    console.log('Adding EXT_texture_webp to extensionsUsed...');
    gltf.extensionsUsed.push('EXT_texture_webp');
  }

  // 2. Fix images array
  // Let's see if baseColor_1.webp is there.
  const imageNames = gltf.images.map(img => img.uri);
  const baseColor1Index = imageNames.indexOf('baseColor_1.webp');

  if (baseColor1Index === -1) {
    console.log('baseColor_1.webp is missing from images array. Adding it...');
    // We insert it at the beginning to avoid shifting too many indices if it was supposed to be first,
    // BUT inserting at the beginning shifts ALL indices.
    // Instead, let's append it and update the textures that SHOULD point to it.
    gltf.images.push({
      mimeType: 'image/webp',
      uri: 'baseColor_1.webp'
    });
    const newIndex = gltf.images.length - 1;

    // Based on analysis, texture[0] points to source 1 (baseColor_2)
    // and texture[1] points to source 0 (metallicRoughness_1).
    // Material 0 uses texture 0 (which is baseColor_2).
    // If we want Material 0 to use baseColor_1, we should update texture 0 to point to our newIndex.
    
    if (gltf.textures && gltf.textures[0]) {
      console.log(`Updating texture[0] to point to new image index ${newIndex} (baseColor_1.webp)`);
      gltf.textures[0].source = newIndex;
    }
  }

  // 3. Ensure all images have mimeType image/webp
  gltf.images.forEach(img => {
    if (img.uri.endsWith('.webp') && !img.mimeType) {
      img.mimeType = 'image/webp';
    }
  });

  console.log('Saving modified GLTF file...');
  fs.writeFileSync(gltfPath, JSON.stringify(gltf, null, 2));
  console.log('Successfully fixed GLTF textures!');

} catch (error) {
  console.error('Error fixing GLTF:', error);
  process.exit(1);
}
