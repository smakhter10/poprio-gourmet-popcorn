/**
 * Dynamic Asset URL Resolver for POPRIO.
 *
 * Resolves static assets seamlessly across all environments:
 * 1. WordPress Theme mode via window.POPRIO_DATA.assetsBaseUrl.
 * 2. WordPress Theme mode via window.POPRIO_THEME_URI.
 * 3. Auto-detected WordPress Theme mode via script/link tags in document DOM.
 * 4. Auto-detected WordPress Theme mode via import.meta.url.
 * 5. Standalone Vite mode: Resolves to '/assets/...' so npm run dev continues to work.
 */

function resolveThemeAssetsBase(): string {
  if (typeof window !== 'undefined') {
    // 1. Explicit WordPress runtime payload injected into window
    const wpData = (window as any).POPRIO_DATA;
    if (wpData?.assetsBaseUrl) {
      return String(wpData.assetsBaseUrl).replace(/\/+$/, '');
    }
    if ((window as any).POPRIO_THEME_URI) {
      return `${String((window as any).POPRIO_THEME_URI).replace(/\/+$/, '')}/assets`;
    }

    // 2. Auto-detect from script tags or stylesheet link tags in document head/body
    const themeAssetElement = document.querySelector<HTMLElement>(
      'script[src*="/wp-content/themes/"], link[href*="/wp-content/themes/"]'
    );
    if (themeAssetElement) {
      const src =
        (themeAssetElement as HTMLScriptElement).src ||
        (themeAssetElement as HTMLLinkElement).href;
      if (src) {
        const match = src.match(/^(.*\/wp-content\/themes\/[^\/]+)/);
        if (match) {
          return `${match[1]}/assets`;
        }
      }
    }
  }

  // 3. Auto-detect from Vite's import.meta.url (works inside ES modules in any domain/subdirectory)
  try {
    if (typeof import.meta !== 'undefined' && import.meta.url) {
      const match = import.meta.url.match(/^(.*\/wp-content\/themes\/[^\/]+)/);
      if (match) {
        return `${match[1]}/assets`;
      }
    }
  } catch {}

  // 4. Standalone dev fallback
  return '/assets';
}

export function getAssetUrl(path: string): string {
  if (!path) return '';
  if (/^(https?:)?\/\//.test(path) || path.startsWith('data:')) {
    return path;
  }

  // Strip leading slashes and optional 'assets/' prefix for uniform joining
  let cleanPath = path.replace(/^\/?(assets\/)?/, '');

  // Normalize spaces to %20 so file requests with spaces succeed uniformly
  if (!cleanPath.includes('%20') && cleanPath.includes(' ')) {
    cleanPath = cleanPath.replace(/ /g, '%20');
  }

  const base = resolveThemeAssetsBase();
  return `${base.replace(/\/+$/, '')}/${cleanPath}`;
}
