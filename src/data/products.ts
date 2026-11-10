export type ProductIllustrationVariant =
  | 'cookies-cream'
  | 'caramel'
  | 'chocolate'
  | 'buttery-classic';

export interface ProductMenuEntry {
  /** Matches POPRIO_PRODUCTS id (e.g. 'pkg-caramel') */
  id: string;
  name: string;
  subtitle?: string;
  backgroundColor: string;
  textColor?: string;
  imageSrc: string;
  imageAlt: string;
  illustrationVariant: ProductIllustrationVariant;
  fullWidth?: boolean;
}

/**
 * Official 5 POPRIO flavours for THE FLAVOURVERSE mega menu in the header.
 */
export const FLAVOURVERSE_PRODUCTS: readonly ProductMenuEntry[] = [
  {
    id: 'pkg-caramel',
    name: 'Caramel',
    subtitle: 'THE GOLDEN ONE',
    backgroundColor: 'var(--color-caramel)',
    textColor: 'var(--color-cocoa-brown)',
    imageSrc: '/assets/packages/package%201.png',
    imageAlt: 'POPRIO Caramel Gourmet Popcorn pouch',
    illustrationVariant: 'caramel',
  },
  {
    id: 'pkg-cookies-cream',
    name: 'Cookies & Cream',
    subtitle: 'THE CREAMY ONE',
    backgroundColor: 'var(--color-light-cocoa)',
    textColor: 'var(--color-cocoa-brown)',
    imageSrc: '/assets/packages/package%202.png',
    imageAlt: 'POPRIO Cookies & Cream Gourmet Popcorn pouch',
    illustrationVariant: 'cookies-cream',
  },
  {
    id: 'pkg-strawberry',
    name: 'Strawberry',
    subtitle: 'THE FRUITY ONE',
    backgroundColor: 'var(--color-accent-pink)',
    textColor: 'var(--color-cocoa-brown)',
    imageSrc: '/assets/packages/package%203.png',
    imageAlt: 'POPRIO Strawberry Gourmet Popcorn pouch',
    illustrationVariant: 'cookies-cream',
  },
  {
    id: 'pkg-nutella',
    name: 'Choco Hazelnut',
    subtitle: 'THE NUTTY ONE',
    backgroundColor: 'var(--color-chocolate-rich)',
    textColor: 'var(--color-warm-cream)',
    imageSrc: '/assets/packages/package%204.png',
    imageAlt: 'POPRIO Choco Hazelnut Gourmet Popcorn pouch',
    illustrationVariant: 'chocolate',
  },
  {
    id: 'pkg-snickers',
    name: 'Chocolate Peanut Caramel',
    subtitle: 'THE INDULGENT ONE',
    backgroundColor: 'var(--color-butter-yellow)',
    textColor: 'var(--color-cocoa-brown)',
    imageSrc: '/assets/packages/package%205.png',
    imageAlt: 'POPRIO Chocolate Peanut Caramel Gourmet Popcorn pouch',
    illustrationVariant: 'buttery-classic',
    fullWidth: true,
  },
] as const;

/* ==========================================================================
   FULL PRODUCT DETAILS DATA FOR HERO PACKAGE POPUP MODAL
   ========================================================================== */

export type IngredientIconKey =
  | 'popcorn'
  | 'butter'
  | 'caramel'
  | 'chocolate'
  | 'cookie'
  | 'strawberry'
  | 'hazelnut'
  | 'peanut'
  | 'cream';

export interface ProductIngredient {
  id: string;
  name: string;
  icon: IngredientIconKey;
}

export interface ProductSizeOption {
  id: 'regular' | 'large';
  label: 'Regular' | 'Large';
  subtitle: string;
}

export interface ProductGalleryImage {
  id: string;
  label: string;
  src: string;
  alt: string;
  kind: 'package' | 'cluster' | 'detail';
}

export interface ProductDetailItem {
  /** Matches HeroPackageItem.id (e.g. 'pkg-caramel') */
  id: string;
  slug: string;
  title: string;
  badge?: string;
  accentColor: string;
  shortDescription: string;
  flavourNotes: readonly string[];
  ingredients: readonly ProductIngredient[];
  sizes: readonly ProductSizeOption[];
  packageImage: string;
  galleryImages: readonly ProductGalleryImage[];
  whatsappMessage?: string;
}

export const DEFAULT_PRODUCT_SIZES: readonly ProductSizeOption[] = [
  {
    id: 'regular',
    label: 'Regular',
    subtitle: 'Solo snack pouch',
  },
  {
    id: 'large',
    label: 'Large',
    subtitle: 'Shareable family pouch',
  },
] as const;

export const POPRIO_PRODUCTS: readonly ProductDetailItem[] = [
  {
    id: 'pkg-caramel',
    slug: 'caramel-popcorn',
    title: 'Caramel Popcorn',
    badge: 'FLAVOUR 01 · BEST SELLER',
    accentColor: 'var(--color-caramel)',
    shortDescription:
      'Air-popped mushroom kernels tumbled in slow-cooked golden caramel with rich creamery butter and a crisp, glass-like crunch in every bite.',
    flavourNotes: ['Sweet', 'Crunchy', 'Buttery', 'Golden Glaze'],
    ingredients: [
      { id: 'ing-popcorn', name: 'Mushroom Popcorn', icon: 'popcorn' },
      { id: 'ing-caramel', name: 'Golden Caramel', icon: 'caramel' },
      { id: 'ing-butter', name: 'Creamery Butter', icon: 'butter' },
      { id: 'ing-cream', name: 'Vanilla Cream Note', icon: 'cream' },
    ],
    sizes: DEFAULT_PRODUCT_SIZES,
    packageImage: '/assets/packages/package%201.png',
    galleryImages: [
      {
        id: 'caramel-pack',
        label: 'Package Front',
        src: '/assets/packages/package%201.png',
        alt: 'POPRIO Caramel Popcorn package front',
        kind: 'package',
      },
      {
        id: 'caramel-cluster',
        label: 'Caramel Cluster',
        src: '/assets/floating-corns/Caramel%20Drizzled%20Popcorn%20Cluster-2.png',
        alt: 'Caramel drizzled gourmet popcorn cluster',
        kind: 'cluster',
      },
      {
        id: 'caramel-golden',
        label: 'Golden Kernel',
        src: '/assets/floating-corns/Gourmet%20Golden%20Popcorn%20Cluster.png',
        alt: 'Close-up of golden popped gourmet kernel',
        kind: 'detail',
      },
    ],
    whatsappMessage:
      "Hi POPRIO! I'd like to order Caramel Popcorn. Could you share availability and pricing?",
  },
  {
    id: 'pkg-cookies-cream',
    slug: 'cookies-and-cream-popcorn',
    title: 'Cookies & Cream Popcorn',
    badge: 'FLAVOUR 02 · FAN FAVOURITE',
    accentColor: 'var(--color-accent-pink)',
    shortDescription:
      'Crisp golden popcorn folded into velvety white cream coating and generously dusted with crushed dark cocoa sandwich cookies.',
    flavourNotes: ['Creamy', 'Crunchy', 'Sweet', 'Cocoa Crumb'],
    ingredients: [
      { id: 'ing-popcorn', name: 'Mushroom Popcorn', icon: 'popcorn' },
      { id: 'ing-cookie', name: 'Dark Cookie Crumbs', icon: 'cookie' },
      { id: 'ing-cream', name: 'Velvet Cream Coating', icon: 'cream' },
      { id: 'ing-butter', name: 'Pure Butter', icon: 'butter' },
    ],
    sizes: DEFAULT_PRODUCT_SIZES,
    packageImage: '/assets/packages/package%202.png',
    galleryImages: [
      {
        id: 'cookies-pack',
        label: 'Package Front',
        src: '/assets/packages/package%202.png',
        alt: 'POPRIO Cookies & Cream Popcorn package front',
        kind: 'package',
      },
      {
        id: 'cookies-cluster',
        label: 'Cookie Cluster',
        src: '/assets/floating-corns/Chocolate%20Drizzled%20Cookie%20Popcorn%20Cluster-1.png',
        alt: 'Cookies and cream drizzled popcorn cluster',
        kind: 'cluster',
      },
      {
        id: 'cookies-detail',
        label: 'Cream & Cocoa',
        src: '/assets/floating-corns/Chocolate-Drizzled%20Gourmet%20Popcorn%20Cluster.png',
        alt: 'Close-up of cocoa dusted gourmet popcorn',
        kind: 'detail',
      },
    ],
    whatsappMessage:
      "Hi POPRIO! I'd like to order Cookies & Cream Popcorn. Could you share availability and pricing?",
  },
  {
    id: 'pkg-strawberry',
    slug: 'strawberry-popcorn',
    title: 'Strawberry Popcorn',
    badge: 'FLAVOUR 03 · BERRY POP',
    accentColor: 'var(--color-accent-pink)',
    shortDescription:
      'Bright, fruity strawberry glaze meets buttery caramelised crunch for a vibrant pink treat bursting with sweet berry aroma.',
    flavourNotes: ['Fruity', 'Sweet', 'Creamy', 'Crunchy'],
    ingredients: [
      { id: 'ing-popcorn', name: 'Mushroom Popcorn', icon: 'popcorn' },
      { id: 'ing-strawberry', name: 'Strawberry Glaze', icon: 'strawberry' },
      { id: 'ing-cream', name: 'Sweet Cream Drizzle', icon: 'cream' },
      { id: 'ing-butter', name: 'Creamery Butter', icon: 'butter' },
    ],
    sizes: DEFAULT_PRODUCT_SIZES,
    packageImage: '/assets/packages/package%203.png',
    galleryImages: [
      {
        id: 'strawberry-pack',
        label: 'Package Front',
        src: '/assets/packages/package%203.png',
        alt: 'POPRIO Strawberry Popcorn package front',
        kind: 'package',
      },
      {
        id: 'strawberry-cluster',
        label: 'Golden Kernel',
        src: '/assets/floating-corns/Gourmet%20Golden%20Popcorn%20Cluster.png',
        alt: 'Golden gourmet popcorn cluster base',
        kind: 'cluster',
      },
      {
        id: 'strawberry-glaze',
        label: 'Glazed Crunch',
        src: '/assets/floating-corns/Caramel%20Drizzled%20Popcorn%20Cluster-2.png',
        alt: 'Glazed gourmet popcorn cluster detail',
        kind: 'detail',
      },
    ],
    whatsappMessage:
      "Hi POPRIO! I'd like to order Strawberry Popcorn. Could you share availability and pricing?",
  },
  {
    id: 'pkg-nutella',
    slug: 'choco-hazelnut-popcorn',
    title: 'Choco Hazelnut Popcorn',
    badge: 'FLAVOUR 04 · CHOCO LUXE',
    accentColor: 'var(--color-light-cocoa)',
    shortDescription:
      'Decadent roasted hazelnut and smooth milk chocolate ribbons drizzled over crisp caramelised popcorn for true choco-hazelnut lovers.',
    flavourNotes: ['Chocolatey', 'Nutty', 'Creamy', 'Crunchy'],
    ingredients: [
      { id: 'ing-popcorn', name: 'Mushroom Popcorn', icon: 'popcorn' },
      { id: 'ing-chocolate', name: 'Milk Chocolate', icon: 'chocolate' },
      { id: 'ing-hazelnut', name: 'Roasted Hazelnut', icon: 'hazelnut' },
      { id: 'ing-butter', name: 'Creamery Butter', icon: 'butter' },
    ],
    sizes: DEFAULT_PRODUCT_SIZES,
    packageImage: '/assets/packages/package%204.png',
    galleryImages: [
      {
        id: 'nutella-pack',
        label: 'Package Front',
        src: '/assets/packages/package%204.png',
        alt: 'POPRIO Choco Hazelnut Popcorn package front',
        kind: 'package',
      },
      {
        id: 'nutella-cluster',
        label: 'Choco Drizzle',
        src: '/assets/floating-corns/Chocolate-Drizzled%20Gourmet%20Popcorn%20Cluster.png',
        alt: 'Chocolate-drizzled gourmet popcorn cluster',
        kind: 'cluster',
      },
      {
        id: 'nutella-detail',
        label: 'Cocoa Crunch',
        src: '/assets/floating-corns/Chocolate%20Drizzled%20Cookie%20Popcorn%20Cluster-1.png',
        alt: 'Rich chocolate glazed popcorn cluster',
        kind: 'detail',
      },
    ],
    whatsappMessage:
      "Hi POPRIO! I'd like to order Choco Hazelnut Popcorn. Could you share availability and pricing?",
  },
  {
    id: 'pkg-snickers',
    slug: 'chocolate-peanut-caramel-popcorn',
    title: 'Chocolate Peanut Caramel Popcorn',
    badge: 'FLAVOUR 05 · LOADED CRUNCH',
    accentColor: 'var(--color-butter-yellow)',
    shortDescription:
      'A bold collision of chewy golden caramel, roasted peanut crunch, and rich chocolate drizzle layered over giant gourmet popcorn puffs.',
    flavourNotes: ['Nutty', 'Chocolatey', 'Sweet', 'Crunchy'],
    ingredients: [
      { id: 'ing-popcorn', name: 'Mushroom Popcorn', icon: 'popcorn' },
      { id: 'ing-peanut', name: 'Roasted Peanuts', icon: 'peanut' },
      { id: 'ing-caramel', name: 'Golden Caramel', icon: 'caramel' },
      { id: 'ing-chocolate', name: 'Chocolate Drizzle', icon: 'chocolate' },
    ],
    sizes: DEFAULT_PRODUCT_SIZES,
    packageImage: '/assets/packages/package%205.png',
    galleryImages: [
      {
        id: 'snickers-pack',
        label: 'Package Front',
        src: '/assets/packages/package%205.png',
        alt: 'POPRIO Chocolate Peanut Caramel Popcorn package front',
        kind: 'package',
      },
      {
        id: 'snickers-caramel',
        label: 'Caramel Ribbon',
        src: '/assets/floating-corns/Caramel%20Drizzled%20Popcorn%20Cluster-2.png',
        alt: 'Caramel drizzled popcorn cluster',
        kind: 'cluster',
      },
      {
        id: 'snickers-choco',
        label: 'Choco & Nut',
        src: '/assets/floating-corns/Chocolate-Drizzled%20Gourmet%20Popcorn%20Cluster.png',
        alt: 'Chocolate drizzled gourmet popcorn cluster',
        kind: 'detail',
      },
    ],
    whatsappMessage:
      "Hi POPRIO! I'd like to order Chocolate Peanut Caramel Popcorn. Could you share availability and pricing?",
  },
] as const;

export function getProductDetailById(
  productId: string | null | undefined
): ProductDetailItem | null {
  if (!productId) return null;
  return POPRIO_PRODUCTS.find((item) => item.id === productId) ?? null;
}

/* ==========================================================================
   SECTION 03: THE FLAVOURVERSE BENTO GRID CONFIGURATION
   ========================================================================== */

export type BentoCardLayoutVariant =
  | 'horizontal-feature'
  | 'vertical-compact'
  | 'wide-finale';

export interface FlavourBentoCardConfig {
  id: string;
  /** Canonical product ID matching POPRIO_PRODUCTS (e.g. 'pkg-strawberry') */
  productId: string;
  flavourNumber: string;
  label: string;
  title: string;
  description: string;
  row: 1 | 2 | 3;
  colSpan: 1 | 2 | 3;
  layoutVariant: BentoCardLayoutVariant;
  cardBg: string;
  textColor: string;
  mutedTextColor: string;
  labelColor: string;
  arrowBadgeBg: string;
  arrowBadgeText: string;
  stageAccentBg: string;
  packageImage: string;
  packageAlt: string;
  /** Initial scroll-reveal slight tilt (degrees) */
  entranceRotation: number;
  /** Subtle card tilt on hover (degrees, max ±1.2deg) */
  hoverCardRotation: number;
  /** Resting editorial tilt of the package image (degrees) */
  basePackageRotation: number;
  /** Additional rotation delta applied to the package on hover (degrees) */
  hoverPackageRotationDelta: number;
}

export const FLAVOURVERSE_BENTO_CARDS: readonly FlavourBentoCardConfig[] = [
  // ROW 1: Strawberry (2 cols) + Caramel (1 col)
  {
    id: 'bento-strawberry',
    productId: 'pkg-strawberry',
    flavourNumber: '01',
    label: 'THE FRUITY ONE',
    title: 'STRAWBERRY',
    description: 'A little sweet. A lot of pop.',
    row: 1,
    colSpan: 2,
    layoutVariant: 'horizontal-feature',
    cardBg: 'var(--color-accent-pink)',
    textColor: 'var(--color-cocoa-brown)',
    mutedTextColor: 'rgba(75, 31, 15, 0.86)',
    labelColor: 'var(--color-red-orange)',
    arrowBadgeBg: 'var(--color-warm-cream)',
    arrowBadgeText: 'var(--color-cocoa-brown)',
    stageAccentBg: 'var(--color-warm-cream)',
    packageImage: '/assets/packages/package%203.png',
    packageAlt: 'POPRIO Strawberry Gourmet Popcorn pouch',
    entranceRotation: -1.75,
    hoverCardRotation: -0.85,
    basePackageRotation: -3.5,
    hoverPackageRotationDelta: -3.5,
  },
  {
    id: 'bento-caramel',
    productId: 'pkg-caramel',
    flavourNumber: '02',
    label: 'THE GOLDEN ONE',
    title: 'CARAMEL',
    description: 'Golden, sweet, and satisfyingly crunchy.',
    row: 1,
    colSpan: 1,
    layoutVariant: 'vertical-compact',
    cardBg: 'var(--color-caramel)',
    textColor: 'var(--color-cocoa-brown)',
    mutedTextColor: 'rgba(75, 31, 15, 0.88)',
    labelColor: 'var(--color-warm-cream)',
    arrowBadgeBg: 'var(--color-butter-yellow)',
    arrowBadgeText: 'var(--color-cocoa-brown)',
    stageAccentBg: 'var(--color-butter-yellow)',
    packageImage: '/assets/packages/package%201.png',
    packageAlt: 'POPRIO Caramel Gourmet Popcorn pouch',
    entranceRotation: 1.75,
    hoverCardRotation: 1,
    basePackageRotation: 2.5,
    hoverPackageRotationDelta: 3.5,
  },

  // ROW 2: Choco Hazelnut (1 col) + Cookies & Cream (2 cols)
  {
    id: 'bento-choco-hazelnut',
    productId: 'pkg-nutella',
    flavourNumber: '03',
    label: 'THE NUTTY ONE',
    title: 'CHOCO HAZELNUT',
    description: 'Rich chocolate flavour with a nutty twist.',
    row: 2,
    colSpan: 1,
    layoutVariant: 'vertical-compact',
    cardBg: 'var(--color-chocolate-rich)',
    textColor: 'var(--color-warm-cream)',
    mutedTextColor: 'rgba(255, 243, 224, 0.88)',
    labelColor: 'var(--color-butter-yellow)',
    arrowBadgeBg: 'var(--color-butter-yellow)',
    arrowBadgeText: 'var(--color-cocoa-brown)',
    stageAccentBg: 'var(--color-cocoa-brown)',
    packageImage: '/assets/packages/package%204.png',
    packageAlt: 'POPRIO Choco Hazelnut Gourmet Popcorn pouch',
    entranceRotation: -1.65,
    hoverCardRotation: -1,
    basePackageRotation: -2.5,
    hoverPackageRotationDelta: -3.5,
  },
  {
    id: 'bento-cookies-cream',
    productId: 'pkg-cookies-cream',
    flavourNumber: '04',
    label: 'THE CREAMY ONE',
    title: 'COOKIES & CREAM',
    description: 'Cookie crunch meets creamy goodness.',
    row: 2,
    colSpan: 2,
    layoutVariant: 'horizontal-feature',
    cardBg: 'var(--color-light-cocoa)',
    textColor: 'var(--color-cocoa-brown)',
    mutedTextColor: 'rgba(75, 31, 15, 0.86)',
    labelColor: 'var(--color-warm-purple)',
    arrowBadgeBg: 'var(--color-accent-pink)',
    arrowBadgeText: 'var(--color-cocoa-brown)',
    stageAccentBg: 'var(--color-warm-cream)',
    packageImage: '/assets/packages/package%202.png',
    packageAlt: 'POPRIO Cookies & Cream Gourmet Popcorn pouch',
    entranceRotation: 1.65,
    hoverCardRotation: 0.85,
    basePackageRotation: 3.5,
    hoverPackageRotationDelta: 3.5,
  },

  // ROW 3: Chocolate Peanut Caramel (full 3 cols closing feature)
  {
    id: 'bento-chocolate-peanut-caramel',
    productId: 'pkg-snickers',
    flavourNumber: '05',
    label: 'THE INDULGENT ONE',
    title: 'CHOCOLATE PEANUT CARAMEL',
    description: 'Chocolate. Caramel. Crunch.',
    row: 3,
    colSpan: 3,
    layoutVariant: 'wide-finale',
    cardBg: 'var(--color-butter-yellow)',
    textColor: 'var(--color-cocoa-brown)',
    mutedTextColor: 'rgba(75, 31, 15, 0.88)',
    labelColor: 'var(--color-red-orange)',
    arrowBadgeBg: 'var(--color-warm-cream)',
    arrowBadgeText: 'var(--color-cocoa-brown)',
    stageAccentBg: 'var(--color-caramel)',
    packageImage: '/assets/packages/package%205.png',
    packageAlt: 'POPRIO Chocolate Peanut Caramel Gourmet Popcorn pouch',
    entranceRotation: -1.25,
    hoverCardRotation: -0.65,
    basePackageRotation: -3,
    hoverPackageRotationDelta: -3.5,
  },
] as const;

