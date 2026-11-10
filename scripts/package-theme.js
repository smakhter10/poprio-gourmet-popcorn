import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';

const themeDir = path.resolve('wp-content/themes/poprio-theme');
const zipFile = path.resolve('poprio-theme.zip');

if (!fs.existsSync(themeDir)) {
  console.error('Error: Theme directory not found at', themeDir);
  process.exit(1);
}

// Remove old zip if present
if (fs.existsSync(zipFile)) {
  fs.unlinkSync(zipFile);
}

console.log('Packaging poprio-theme into installable ZIP...');

try {
  // Use PowerShell Compress-Archive with suppressed progress on Windows
  const cmd = `powershell -Command "$ProgressPreference = 'SilentlyContinue'; Compress-Archive -Path '${themeDir}' -DestinationPath '${zipFile}' -Force"`;
  execSync(cmd, { stdio: 'inherit' });
  const stats = fs.statSync(zipFile);
  const sizeMb = (stats.size / (1024 * 1024)).toFixed(2);
  console.log(`✓ Created installable theme ZIP: poprio-theme.zip (${sizeMb} MB)`);
} catch (err) {
  console.error('Failed to create ZIP package:', err);
  process.exit(1);
}
