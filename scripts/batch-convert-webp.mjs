import sharp from 'sharp';
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, '..');

const SKIP_DIRS = ['desktop_pc', '3d-models'];
const SKIP_FILES = [
  'favicon-16x16.png',
  'favicon-32x32.png', 
  'favicon-196.png',
  'apple-touch-icon.png',
  'android-chrome-192x192.png',
  'android-chrome-512x512.png',
  'qrcode.png',
  'preview.png',
  'logo.png',
  'logo_grande.png',
  'herobg-BKiCkBFT.png',
  'logo.webp'
];

async function getFiles(dir, relativeRoot = '') {
  let files = [];
  try {
    const entries = await fs.readdir(dir, { withFileTypes: true });
    for (const entry of entries) {
      const fullPath = path.join(dir, entry.name);
      const relPath = path.join(relativeRoot, entry.name);
      
      if (entry.isDirectory()) {
        if (!SKIP_DIRS.includes(entry.name)) {
          files = files.concat(await getFiles(fullPath, relPath));
        }
      } else if (entry.isFile() && (entry.name.endsWith('.png') || entry.name.endsWith('.jpg') || entry.name.endsWith('.jpeg'))) {
        if (!SKIP_FILES.includes(entry.name)) {
          files.push({ src: fullPath, rel: relPath });
        }
      }
    }
  } catch (err) {
    console.error('Error reading', dir, err.message);
  }
  return files;
}

async function convertToWebp(srcPath, relPath) {
  const dir = path.dirname(relPath);
  const ext = path.extname(relPath);
  const name = path.basename(relPath, ext);
  const destPath = path.join(root, dir, `${name}.webp`);
  
  try {
    const srcStat = await fs.stat(srcPath);
    const srcSizeKB = (srcStat.size / 1024).toFixed(1);

    await sharp(srcPath)
      .webp({ quality: 80, effort: 6 })
      .toFile(destPath);

    const destStat = await fs.stat(destPath);
    const destSizeKB = (destStat.size / 1024).toFixed(1);
    const savings = ((1 - destStat.size / srcStat.size) * 100).toFixed(0);

    console.log(`✅ ${relPath} (${srcSizeKB}KB → ${destSizeKB}KB, -${savings}%)`);
    return true;
  } catch (err) {
    console.error(`❌ ${relPath}: ${err.message}`);
    return false;
  }
}

async function main() {
  const publicDir = path.join(root, 'public');
  const srcDir = path.join(root, 'src', 'assets');

  console.log('🔄 Finding images to convert...\n');
  
  const publicFiles = await getFiles(publicDir, 'public');
  console.log(`Found ${publicFiles.length} images in public/`);
  
  if (publicFiles.length > 0) {
    console.log('\n🔄 Converting to WebP...\n');
    for (const file of publicFiles) {
      await convertToWebp(file.src, file.rel);
    }
  }
  
  console.log('\n✅ Done!');
}

main();