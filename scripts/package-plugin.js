import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';

const pluginDir = path.resolve('wp-content/plugins/poprio-visual-editor');
const zipFile = path.resolve('poprio-visual-editor.zip');

if (!fs.existsSync(pluginDir)) {
  console.error('Error: Plugin directory not found at', pluginDir);
  process.exit(1);
}

// Remove old zip if present
if (fs.existsSync(zipFile)) {
  fs.unlinkSync(zipFile);
}

console.log('Packaging poprio-visual-editor into installable ZIP...');

try {
  const cmd = `powershell -Command "$ProgressPreference = 'SilentlyContinue'; Compress-Archive -Path '${pluginDir}' -DestinationPath '${zipFile}' -Force"`;
  execSync(cmd, { stdio: 'inherit' });
  const stats = fs.statSync(zipFile);
  const sizeKb = (stats.size / 1024).toFixed(2);
  console.log(`✓ Created installable plugin ZIP: poprio-visual-editor.zip (${sizeKb} KB)`);
} catch (err) {
  console.error('Failed to create ZIP package:', err);
  process.exit(1);
}

