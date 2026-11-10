import fs from 'fs';
import path from 'path';

const srcDir = path.resolve('dist');
const destDir = path.resolve('wp-content/themes/poprio-theme/dist');

if (fs.existsSync(srcDir)) {
  if (fs.existsSync(destDir)) {
    fs.rmSync(destDir, { recursive: true, force: true });
  }
  fs.mkdirSync(destDir, { recursive: true });

  // 1. Copy .vite manifest directory
  const viteSrc = path.join(srcDir, '.vite');
  if (fs.existsSync(viteSrc)) {
    fs.cpSync(viteSrc, path.join(destDir, '.vite'), { recursive: true });
  }

  // 2. Copy root manifest and HTML files if present
  for (const file of fs.readdirSync(srcDir)) {
    const fullSrc = path.join(srcDir, file);
    if (fs.statSync(fullSrc).isFile()) {
      fs.copyFileSync(fullSrc, path.join(destDir, file));
    }
  }

  // 3. Copy ONLY compiled JS, CSS, and MAP files from dist/assets (exclude duplicate media)
  const assetsSrc = path.join(srcDir, 'assets');
  const assetsDest = path.join(destDir, 'assets');
  if (fs.existsSync(assetsSrc)) {
    fs.mkdirSync(assetsDest, { recursive: true });
    for (const item of fs.readdirSync(assetsSrc)) {
      const itemSrc = path.join(assetsSrc, item);
      const stat = fs.statSync(itemSrc);
      if (stat.isFile() && /\.(js|css|map)$/i.test(item)) {
        fs.copyFileSync(itemSrc, path.join(assetsDest, item));
      }
    }
  }

  console.log('✓ Successfully synchronized compiled code to wp-content/themes/poprio-theme/dist (excluding duplicate media)');
} else {
  console.error('Error: dist directory does not exist. Run vite build first.');
  process.exit(1);
}
