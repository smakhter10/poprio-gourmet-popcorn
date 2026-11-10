export interface NavItemConfig {
  id: 'home' | 'products' | 'about' | 'contact';
  label: 'HOME' | 'PRODUCTS' | 'ABOUT US' | 'CONTACT';
  hasMegaMenu?: boolean;
}

/**
 * Central configuration value for the WhatsApp Order CTA.
 * Leave empty ("") until the official international phone number is provided.
 * Example format when ready: "8801XXXXXXXXX" (no "+", spaces, or dashes).
 */
export const WHATSAPP_NUMBER: string = '8801705117793';

/**
 * Default pre-filled greeting message for WhatsApp inquiries.
 */
export const WHATSAPP_GREETING: string =
  "Hi POPRIO! I'd like to know more about your popcorn flavours.";

/**
 * Builds a sanitized wa.me link if WHATSAPP_NUMBER is configured,
 * or returns null when unconfigured so the button stays safely disabled.
 */
export function getWhatsAppOrderUrl(
  rawNumber: string = WHATSAPP_NUMBER,
  greeting: string = WHATSAPP_GREETING
): string | null {
  const sanitizedDigits = rawNumber.replace(/[^\d]/g, '');
  if (!sanitizedDigits) {
    return null;
  }
  const encodedGreeting = encodeURIComponent(greeting);
  return `https://wa.me/${sanitizedDigits}?text=${encodedGreeting}`;
}

export const SITE_CONFIG = {
  name: 'POPRIO',
  domain: 'eatpoprio.com',
  logo: {
    src: '/assets/brand/poprio-logo.webp',
    alt: 'POPRIO Official Logo',
    width: 240,
    height: 89,
  },
  scrollShrinkThresholdRem: 6, // 6rem (96px), within the 5rem–7rem range
} as const;

export interface SocialLinkConfig {
  id: 'facebook' | 'instagram' | 'youtube';
  label: string;
  /**
   * Leave empty ("") until official social profile URLs are provided,
   * or populate with full https:// URLs.
   */
  url: string;
}

export const SOCIAL_LINKS: readonly SocialLinkConfig[] = [
  {
    id: 'facebook',
    label: 'POPRIO on Facebook',
    url: 'facebook.com',
  },
  {
    id: 'instagram',
    label: 'POPRIO on Instagram',
    url: 'instagram.com',
  },
  {
    id: 'youtube',
    label: 'POPRIO on YouTube',
    url: 'youtube.com',
  },
] as const;

export const NAV_ITEMS: readonly NavItemConfig[] = [
  { id: 'home', label: 'HOME' },
  { id: 'products', label: 'PRODUCTS', hasMegaMenu: true },
  { id: 'about', label: 'ABOUT US' },
  { id: 'contact', label: 'CONTACT' },
] as const;
