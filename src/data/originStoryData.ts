import { POPRIO_PRODUCTS } from './products';

export interface OriginStoryPackageCastItem {
  id: string;
  title: string;
  imageSrc: string;
  alt: string;
  /** Position class within the Scene 04 comic reveal halo */
  positionClassName: string;
  /** Resting rotation in degrees */
  rotation: number;
  /** Scale multiplier */
  scale: number;
}

export interface OriginStorySceneConfig {
  sceneNumber: 1 | 2 | 3 | 4 | 5;
  chapterCode: '01' | '02' | '03' | '04' | '05';
  identityLabel: string;
  title: string;
  description: string;
  backgroundColor: string;
  textColor: string;
  mutedTextColor: string;
  badgeBgColor: string;
  badgeTextColor: string;
  isDarkBackground: boolean;
}

export const ORIGIN_STORY_INTRO = {
  eyebrow: 'THE ORIGIN OF THE POP',
  heading: 'HOW IT ALL POPPED!',
  description: 'From an ordinary crunch to something extraordinary.',
  stickerText: 'POP!',
} as const;

export const ORIGIN_STORY_ASSETS = {
  scene1: {
    boringPopcorn: {
      src: '/assets/story/boring-popcorn.png',
      alt: 'Bored, unimpressed plain popcorn character',
    },
  },
  scene2: {
    mascotThinking: {
      src: '/assets/story/mascot-thinking.png',
      alt: 'POPRIO mascot in a thinking pose pondering a bold new popcorn idea',
    },
    mascotEureka: {
      src: '/assets/story/mascot-eureka.png',
      alt: 'POPRIO mascot in an excited Eureka discovery pose with a glowing lightbulb',
    },
  },
  scene3: {
    flavourExplosion: {
      src: '/assets/story/flavour-explosion.png',
      alt: 'Dynamic gourmet popcorn and flavour explosion with caramel, cookies, chocolate and strawberry',
    },
    ingredientStickers: {
      src: '/assets/story/ingredient-stickers.png',
      alt: 'Illustrated ingredient sticker sheet featuring caramel, chocolate, cookies, strawberry, hazelnuts and popcorn',
    },
  },
  scene4: {
    mascotCelebration: {
      src: '/assets/story/mascot-celebration.png',
      alt: 'POPRIO mascot celebrating in a triumphant hero pose',
    },
  },
  scene5: {
    mascotPointing: {
      src: '/assets/story/mascot-pointing.png',
      alt: 'POPRIO mascot smiling and pointing toward the Chat and Order button',
    },
  },
} as const;

/**
 * Canonical 5 POPRIO product packages arranged as a supporting cast halo
 * around the celebratory mascot in Scene 04 (derived from POPRIO_PRODUCTS).
 */
export const ORIGIN_SCENE_4_PACKAGES: readonly OriginStoryPackageCastItem[] = [
  {
    id: POPRIO_PRODUCTS[2].id, // pkg-strawberry
    title: POPRIO_PRODUCTS[2].title,
    imageSrc: POPRIO_PRODUCTS[2].packageImage,
    alt: 'POPRIO Strawberry Popcorn pouch',
    positionClassName: 'left-[2%] top-[8%]',
    rotation: -18,
    scale: 0.92,
  },
  {
    id: POPRIO_PRODUCTS[0].id, // pkg-caramel
    title: POPRIO_PRODUCTS[0].title,
    imageSrc: POPRIO_PRODUCTS[0].packageImage,
    alt: 'POPRIO Caramel Popcorn pouch',
    positionClassName: 'left-[4%] bottom-[8%]',
    rotation: -11,
    scale: 0.95,
  },
  {
    id: POPRIO_PRODUCTS[1].id, // pkg-cookies-cream
    title: POPRIO_PRODUCTS[1].title,
    imageSrc: POPRIO_PRODUCTS[1].packageImage,
    alt: 'POPRIO Cookies & Cream Popcorn pouch',
    positionClassName: 'left-[36%] -top-[2%]',
    rotation: -4,
    scale: 0.9,
  },
  {
    id: POPRIO_PRODUCTS[3].id, // pkg-nutella (Choco Hazelnut)
    title: POPRIO_PRODUCTS[3].title,
    imageSrc: POPRIO_PRODUCTS[3].packageImage,
    alt: 'POPRIO Choco Hazelnut Popcorn pouch',
    positionClassName: 'right-[3%] top-[8%]',
    rotation: 16,
    scale: 0.92,
  },
  {
    id: POPRIO_PRODUCTS[4].id, // pkg-snickers (Chocolate Peanut Caramel)
    title: POPRIO_PRODUCTS[4].title,
    imageSrc: POPRIO_PRODUCTS[4].packageImage,
    alt: 'POPRIO Chocolate Peanut Caramel Popcorn pouch',
    positionClassName: 'right-[4%] bottom-[8%]',
    rotation: 12,
    scale: 0.95,
  },
] as const;

export const ORIGIN_STORY_SCENES: readonly OriginStorySceneConfig[] = [
  {
    sceneNumber: 1,
    chapterCode: '01',
    identityLabel: '01 / THE PROBLEM',
    title: 'POPCORN WAS GETTING BORING.',
    description: 'Same old snack. Same old crunch. Nothing exciting.',
    backgroundColor: '#EADFCB',
    textColor: '#4B1F0F',
    mutedTextColor: 'rgba(75, 31, 15, 0.82)',
    badgeBgColor: '#FFF3E0',
    badgeTextColor: '#4B1F0F',
    isDarkBackground: false,
  },
  {
    sceneNumber: 2,
    chapterCode: '02',
    identityLabel: '02 / THE SPARK',
    title: 'THEN CAME THE IDEA.',
    description:
      'What if popcorn could be bold, playful, and bursting with flavour?',
    backgroundColor: '#FFC72C',
    textColor: '#4B1F0F',
    mutedTextColor: 'rgba(75, 31, 15, 0.88)',
    badgeBgColor: '#FFF3E0',
    badgeTextColor: '#E0351B',
    isDarkBackground: false,
  },
  {
    sceneNumber: 3,
    chapterCode: '03',
    identityLabel: '03 / THE EXPERIMENT',
    title: 'WE STARTED MIXING MAGIC.',
    description: 'Crunch met caramel. Cream met cookies. Flavour met fun.',
    backgroundColor: '#E0351B',
    textColor: '#FFF3E0',
    mutedTextColor: 'rgba(255, 243, 224, 0.92)',
    badgeBgColor: '#FFC72C',
    badgeTextColor: '#4B1F0F',
    isDarkBackground: true,
  },
  {
    sceneNumber: 4,
    chapterCode: '04',
    identityLabel: '04 / THE REVEAL',
    title: 'AND THEN... POPRIO WAS BORN.',
    description:
      'Bold flavours. Bright packaging. One deliciously different popcorn experience.',
    backgroundColor: '#F5A7BE',
    textColor: '#4B1F0F',
    mutedTextColor: 'rgba(75, 31, 15, 0.88)',
    badgeBgColor: '#FFC72C',
    badgeTextColor: '#4B1F0F',
    isDarkBackground: false,
  },
  {
    sceneNumber: 5,
    chapterCode: '05',
    identityLabel: '05 / THE INVITATION',
    title: "NOW IT'S YOUR TURN TO POP IN.",
    description: 'Pick your flavour. Open the pack. Start the obsession.',
    backgroundColor: '#7A3DA6',
    textColor: '#FFF3E0',
    mutedTextColor: 'rgba(255, 243, 224, 0.92)',
    badgeBgColor: '#FFC72C',
    badgeTextColor: '#4B1F0F',
    isDarkBackground: true,
  },
] as const;
