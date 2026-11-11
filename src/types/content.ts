import { RotatingWordItem } from '../components/hero/RotatingText';
import { HeroPackageItem } from '../data/heroPackages';
import {
  FlavourBentoCardConfig,
  ProductDetailItem,
} from '../data/products';
import { OriginStorySceneConfig } from '../data/originStoryData';

export interface PoprioLogoConfig {
  src: string;
  alt: string;
  width: number;
  height: number;
}

export interface PoprioSocialLink {
  id: string;
  label: string;
  url: string;
}

export interface PoprioMetaContent {
  name: string;
  tagline: string;
  domain: string;
  logo: PoprioLogoConfig;
  whatsappNumber: string;
  whatsappGreeting: string;
  socialLinks: PoprioSocialLink[];
}

export interface PoprioHeroContent {
  eyebrow1: string;
  eyebrow2: string;
  subtitle: string;
  ctaText: string;
  primaryWords: readonly RotatingWordItem[];
  flavourWords: readonly RotatingWordItem[];
  packages: readonly HeroPackageItem[];
}

export interface PoprioTrailerContent {
  videoSrc: string;
  videoSrcMobile: string;
  posterSrc?: string;
  badge: string;
  heading: string;
}

export interface PoprioFlavourverseContent {
  eyebrow: string;
  title: string;
  subtitle: string;
  cards: readonly FlavourBentoCardConfig[];
  products: readonly ProductDetailItem[];
}

export interface PoprioOriginStoryIntro {
  eyebrow: string;
  heading: string;
  description: string;
  stickerText: string;
}

export interface PoprioOriginStoryContent {
  intro: PoprioOriginStoryIntro;
  scenes: readonly OriginStorySceneConfig[];
}

export interface PoprioOrderingStep {
  stepNumber: string;
  title: string;
  description: string;
}

export interface PoprioHowToOrderContent {
  eyebrow: string;
  title: string;
  subtitle: string;
  videoSrc: string;
  videoSrcMobile: string;
  whatsappMessage: string;
  steps: readonly PoprioOrderingStep[];
}

export interface PoprioAboutContent {
  eyebrow: string;
  heading: string;
  paragraphs: readonly string[];
}

export interface PoprioInquiryTopic {
  id: string;
  label: string;
  badgeColor: string;
}

export interface PoprioFaqItem {
  id: string;
  question: string;
  answer: string;
  accentColor: string;
}

export interface PoprioContactContent {
  eyebrow: string;
  headline: string;
  subtitle: string;
  phone: string;
  email: string;
  location: string;
  hours: string;
  topics: readonly PoprioInquiryTopic[];
  faqs: readonly PoprioFaqItem[];
}

export interface PoprioFooterContent {
  statement: string;
  headline: string;
  copy: string;
  ctaWhatsAppText: string;
  ctaFlavoursText: string;
  copyrightText: string;
}

/**
 * Granular Visual CSS & Style Overrides for an individual element.
 */
export interface PoprioCustomElementStyle {
  // Typography
  fontSize?: string;
  fontWeight?: string;
  fontFamily?: string;
  color?: string;
  textAlign?: 'left' | 'center' | 'right' | 'justify';
  lineHeight?: string;
  letterSpacing?: string;
  textTransform?: 'none' | 'uppercase' | 'lowercase' | 'capitalize';

  // Box Model & Spacing
  paddingTop?: string;
  paddingRight?: string;
  paddingBottom?: string;
  paddingLeft?: string;
  marginTop?: string;
  marginRight?: string;
  marginBottom?: string;
  marginLeft?: string;

  // Background & Borders
  backgroundColor?: string;
  borderColor?: string;
  borderWidth?: string;
  borderStyle?: 'solid' | 'dashed' | 'dotted' | 'none';
  borderRadius?: string;

  // Neo-Brutalist Box Shadow
  boxShadow?: string;

  // Transforms & Opacity
  rotation?: number; // In degrees (-15 to 15)
  scale?: number; // Multiplier (0.8 to 1.3)
  opacity?: number; // Multiplier (0.0 to 1.0)
}

export interface PoprioContentSchema {
  version: string;
  updated_at?: string;
  meta: PoprioMetaContent;
  hero: PoprioHeroContent;
  trailer: PoprioTrailerContent;
  flavourverse: PoprioFlavourverseContent;
  originStory: PoprioOriginStoryContent;
  howToOrder: PoprioHowToOrderContent;
  about: PoprioAboutContent;
  contact: PoprioContactContent;
  footer: PoprioFooterContent;
  /** Granular Element-level CSS Style Overrides keyed by Element ID */
  styles?: Record<string, PoprioCustomElementStyle>;
}
