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
}

