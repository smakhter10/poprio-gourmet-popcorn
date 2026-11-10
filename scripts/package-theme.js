import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';

const themeDir = path.resolve('wp-content/themes/poprio-theme');
const fullZipFile = path.resolve('poprio-theme.zip');
const liteZipFile = path.resolve('poprio-theme-lite.zip');
const assetsZipFile = path.resolve('poprio-assets.zip');

if (!fs.existsSync(themeDir)) {
  console.error('Error: Theme directory not found at', themeDir);
  process.exit(1);
}

// Ensure old zips are removed
[fullZipFile, liteZipFile, assetsZipFile].forEach((zip) => {
  if (fs.existsSync(zip)) {
    fs.unlinkSync(zip);
  }
});

console.log('----------------------------------------------------');
console.log('POPRIO Theme Packaging & Optimization Suite');
console.log('----------------------------------------------------');

// Helper to run PowerShell Compress-Archive
function createZip(sourcePath, destZip) {
  const cmd = `powershell -Command "$ProgressPreference = 'SilentlyContinue'; Compress-Archive -Path '${sourcePath}' -DestinationPath '${destZip}' -Force"`;
  execSync(cmd, { stdio: 'inherit' });
  const stats = fs.statSync(destZip);
  return (stats.size / (1024 * 1024)).toFixed(2);
}

// 1. Package Full Standalone Theme (No duplicate dist media)
console.log('\n[1/3] Packaging poprio-theme.zip (Full standalone theme with all media)...');
try {
  const fullSize = createZip(themeDir, fullZipFile);
  console.log(`✓ Created: poprio-theme.zip (${fullSize} MB)`);
} catch (err) {
  console.error('Failed to create full theme ZIP:', err);
}

// 2. Package Ultra-Lite Theme (< 2 MB for standard WordPress admin upload)
// Uses folder name "poprio-theme" inside staging so WordPress installs into wp-content/themes/poprio-theme
console.log('\n[2/3] Building poprio-theme-lite.zip (Ultra-lite package < 2 MB)...');
const stagingDir = path.resolve('.temp-lite-staging');
const liteThemeDir = path.join(stagingDir, 'poprio-theme');

try {
  if (fs.existsSync(stagingDir)) {
    fs.rmSync(stagingDir, { recursive: true, force: true });
  }
  fs.mkdirSync(liteThemeDir, { recursive: true });

  // Copy root theme files
  for (const file of fs.readdirSync(themeDir)) {
    const fullPath = path.join(themeDir, file);
    if (fs.statSync(fullPath).isFile()) {
      fs.copyFileSync(fullPath, path.join(liteThemeDir, file));
    }
  }

  // Copy inc directory
  fs.cpSync(path.join(themeDir, 'inc'), path.join(liteThemeDir, 'inc'), { recursive: true });

  // Copy dist directory (manifest + compiled JS & CSS)
  fs.cpSync(path.join(themeDir, 'dist'), path.join(liteThemeDir, 'dist'), { recursive: true });

  // Copy essential brand logo
  const liteBrandDir = path.join(liteThemeDir, 'assets', 'brand');
  fs.mkdirSync(liteBrandDir, { recursive: true });
  const logoSrc = path.join(themeDir, 'assets', 'brand', 'poprio-logo.webp');
  if (fs.existsSync(logoSrc)) {
    fs.copyFileSync(logoSrc, path.join(liteBrandDir, 'poprio-logo.webp'));
  }

  // Add README in assets explaining asset placement
  fs.writeFileSync(
    path.join(liteThemeDir, 'assets', 'README.txt'),
    'POPRIO THEME ASSETS DIRECTORY\n\nTo supply full local video and package graphics:\nExtract poprio-assets.zip directly into this assets/ directory, or copy wp-content/themes/poprio-theme/assets from the repository.\n'
  );

  const liteSize = createZip(liteThemeDir, liteZipFile);
  const liteStats = fs.statSync(liteZipFile);
  const liteKb = (liteStats.size / 1024).toFixed(0);
  console.log(`✓ Created: poprio-theme-lite.zip (${liteKb} KB / ${liteSize} MB)`);
} catch (err) {
  console.error('Failed to create lite theme ZIP:', err);
} finally {
  if (fs.existsSync(stagingDir)) {
    fs.rmSync(stagingDir, { recursive: true, force: true });
  }
}

// 3. Package Standalone Assets ZIP (for pairing with lite theme)
console.log('\n[3/3] Packaging poprio-assets.zip (Standalone media assets)...');
try {
  const assetsDir = path.join(themeDir, 'assets');
  const assetsSize = createZip(assetsDir, assetsZipFile);
  console.log(`✓ Created: poprio-assets.zip (${assetsSize} MB)`);
} catch (err) {
  console.error('Failed to create assets ZIP:', err);
}

console.log('\n----------------------------------------------------');
console.log('Packaging complete! Results:');
console.log('1. poprio-theme.zip       -> Full theme with all local media (~59.5 MB)');
console.log('2. poprio-theme-lite.zip  -> Instant WP Admin upload (< 1 MB, installs into wp-content/themes/poprio-theme)');
console.log('3. poprio-assets.zip      -> Standalone media folder (~58 MB)');
console.log('----------------------------------------------------');
