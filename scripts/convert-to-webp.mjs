import sharp from 'sharp';
import { readdir, stat, copyFile } from 'fs/promises';
import { join, extname, basename, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, '..');

// Files to convert from src/assets
const filesToConvert = [
  { src: join(root, 'src/assets/images/eu.jpg'), dest: join(root, 'src/assets/images/eu.webp') },
  { src: join(root, 'src/assets/images/user-photo.jpg'), dest: join(root, 'src/assets/images/user-photo.webp') },
  // Public assets - create webp version of eu.jpg for OnlineResume
  { src: join(root, 'public/assets/images/eu.jpg'), dest: join(root, 'public/assets/images/eu.webp') },
  { src: join(root, 'public/assets/images/eu-hM19CCeb.jpg'), dest: join(root, 'public/assets/images/eu-hM19CCeb.webp') },
];

async function convert(srcPath, destPath) {
  try {
    const srcStat = await stat(srcPath);
    const srcSizeKB = (srcStat.size / 1024).toFixed(1);

    await sharp(srcPath)
      .webp({ quality: 82, effort: 6 })
      .toFile(destPath);

    const destStat = await stat(destPath);
    const destSizeKB = (destStat.size / 1024).toFixed(1);
    const savings = ((1 - destStat.size / srcStat.size) * 100).toFixed(0);

    console.log(`✅ ${basename(srcPath)} (${srcSizeKB}KB) → ${basename(destPath)} (${destSizeKB}KB) [-${savings}%]`);
  } catch (err) {
    console.error(`❌ Failed: ${basename(srcPath)} — ${err.message}`);
  }
}

console.log('🔄 Converting images to WebP...\n');

for (const { src, dest } of filesToConvert) {
  await convert(src, dest);
}

console.log('\n✨ Done!');
