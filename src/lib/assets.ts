/**
 * Dynamic Asset URL Resolver for POPRIO.
 *
 * Resolves static assets seamlessly across both environments:
 * 1. WordPress Theme mode: Resolves relative to the active theme's /assets directory
 *    using window.POPRIO_DATA.assetsBaseUrl (handles subdirectory installations).
 * 2. Standalone Vite mode: Resolves to '/assets/...' so npm run dev continues to work.
 */
export function getAssetUrl(path: string): string {
  if (!path) return '';
  if (/^(https?:)?\/\//.test(path) || path.startsWith('data:')) {
    return path;
  }

  // Strip leading slashes and optional 'assets/' prefix for uniform joining
  const cleanPath = path.replace(/^\/?(assets\/)?/, '');

  // Check if WordPress has injected the theme assets base URL
  const wpAssetsBase =
    typeof window !== 'undefined'
      ? (window as any).POPRIO_DATA?.assetsBaseUrl ||
        ((window as any).POPRIO_THEME_URI ? `${(window as any).POPRIO_THEME_URI}/assets` : null)
      : null;

  const base = wpAssetsBase || '/assets';
  return `${base.replace(/\/+$/, '')}/${cleanPath}`;
}
