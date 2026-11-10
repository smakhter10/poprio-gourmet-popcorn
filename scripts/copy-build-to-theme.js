import fs from 'fs';
import path from 'path';

const srcDir = path.resolve('dist');
const destDir = path.resolve('wp-content/themes/poprio-theme/dist');

if (fs.existsSync(srcDir)) {
  if (fs.existsSync(destDir)) {
    fs.rmSync(destDir, { recursive: true, force: true });
  }
  fs.mkdirSync(destDir, { recursive: true });
  fs.cpSync(srcDir, destDir, { recursive: true });
  console.log('✓ Successfully synchronized build assets to wp-content/themes/poprio-theme/dist');
} else {
  console.error('Error: dist directory does not exist. Run vite build first.');
  process.exit(1);
}
