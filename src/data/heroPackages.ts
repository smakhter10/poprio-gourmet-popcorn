import { getAssetUrl } from '../lib/assets';

export type HeroSlotId =
  | 'far-left'
  | 'inner-left'
  | 'centre'
  | 'inner-right'
  | 'far-right';

export interface HeroPackageItem {
  id: string;
  imagePath: string;
  flavourName: string;
  altText: string;
}

export interface HeroSlotConfig {
  slotId: HeroSlotId;
  slotIndex: number;
  label: string;
  rotation: number;
  scale: number;
  offsetYRem: number;
  offsetXRem: number;
  zIndex: number;
  revealStep: number;
}

/**
 * Complete typed package objects pairing each official POPRIO pouch image
 * with its true flavour identity and accessible alt text.
 */
export const HERO_PACKAGES: readonly HeroPackageItem[] = [
  {
    id: 'pkg-caramel',
    imagePath: getAssetUrl('/assets/packages/package%201.png'),
    flavourName: 'Caramel',
    altText: 'POPRIO Caramel Gourmet Popcorn pouch',
  },
  {
    id: 'pkg-cookies-cream',
    imagePath: getAssetUrl('/assets/packages/package%202.png'),
    flavourName: 'Cookies & Cream',
    altText: 'POPRIO Cookies & Cream Gourmet Popcorn pouch',
  },
  {
    id: 'pkg-strawberry',
    imagePath: getAssetUrl('/assets/packages/package%203.png'),
    flavourName: 'Strawberry',
    altText: 'POPRIO Strawberry Gourmet Popcorn pouch',
  },
  {
    id: 'pkg-nutella',
    imagePath: getAssetUrl('/assets/packages/package%204.png'),
    flavourName: 'Nutella Choco Hazelnut',
    altText: 'POPRIO Nutella Choco Hazelnut Gourmet Popcorn pouch',
  },
  {
    id: 'pkg-snickers',
    imagePath: getAssetUrl('/assets/packages/package%205.png'),
    flavourName: 'Snickers Inspired',
    altText: 'POPRIO Snickers Inspired Gourmet Popcorn pouch',
  },
] as const;

/**
 * Cohesive centered 5-slot fan geometry.
 * Position styling belongs strictly to the slot, never hardcoded to a flavour.
 *
 * Reveal order (centre outward):
 * 1. Centre (index 2)
 * 2. Inner left (index 1)
 * 3. Inner right (index 3)
 * 4. Far left (index 0)
 * 5. Far right (index 4)
 */
export const HERO_FAN_SLOTS: readonly HeroSlotConfig[] = [
  {
    slotId: 'far-left',
    slotIndex: 0,
    label: 'Far left',
    rotation: -14,
    scale: 0.86,
    offsetYRem: 2.25,
    offsetXRem: 1.5,
    zIndex: 10,
    revealStep: 3, // 4th to reveal
  },
  {
    slotId: 'inner-left',
    slotIndex: 1,
    label: 'Inner left',
    rotation: -7,
    scale: 0.94,
    offsetYRem: 0.875,
    offsetXRem: 0.75,
    zIndex: 20,
    revealStep: 1, // 2nd to reveal
  },
  {
    slotId: 'centre',
    slotIndex: 2,
    label: 'Centre',
    rotation: 0,
    scale: 1.06,
    offsetYRem: -0.375,
    offsetXRem: 0,
    zIndex: 30,
    revealStep: 0, // 1st to reveal (largest & most prominent)
  },
  {
    slotId: 'inner-right',
    slotIndex: 3,
    label: 'Inner right',
    rotation: 7,
    scale: 0.94,
    offsetYRem: 0.875,
    offsetXRem: -0.75,
    zIndex: 20,
    revealStep: 2, // 3rd to reveal
  },
  {
    slotId: 'far-right',
    slotIndex: 4,
    label: 'Far right',
    rotation: 14,
    scale: 0.86,
    offsetYRem: 2.25,
    offsetXRem: -1.5,
    zIndex: 10,
    revealStep: 4, // 5th to reveal
  },
] as const;

/**
 * Unbiased Fisher–Yates shuffle returning a new array of complete package objects.
 */
export function shufflePackagesFisherYates(
  source: readonly HeroPackageItem[]
): HeroPackageItem[] {
  const copy = [...source];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    const temp = copy[i];
    copy[i] = copy[j];
    copy[j] = temp;
  }
  return copy;
}

/**
 * Page-load singleton cache so React Strict Mode double-mounting in development
 * or any component re-renders never cause a second shuffle during the session.
 */
let pageLoadShuffledPackages: readonly HeroPackageItem[] | null = null;

export function getPageLoadShuffledPackages(
  source: readonly HeroPackageItem[] = HERO_PACKAGES
): readonly HeroPackageItem[] {
  if (!pageLoadShuffledPackages) {
    pageLoadShuffledPackages = Object.freeze(
      shufflePackagesFisherYates(source)
    );
  }
  return pageLoadShuffledPackages;
}
