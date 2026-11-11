import React, {
  createContext,
  useContext,
  useState,
  useMemo,
  useCallback,
  ReactNode,
} from 'react';
import {
  PoprioContentSchema,
  PoprioMetaContent,
  PoprioHeroContent,
  PoprioTrailerContent,
  PoprioFlavourverseContent,
  PoprioOriginStoryContent,
  PoprioHowToOrderContent,
  PoprioAboutContent,
  PoprioContactContent,
  PoprioFooterContent,
} from '../types/content';
import {
  POPRIO_PRODUCTS,
  FLAVOURVERSE_BENTO_CARDS,
  ProductDetailItem,
} from '../data/products';
import { HERO_PACKAGES } from '../data/heroPackages';
import {
  ORIGIN_STORY_INTRO,
  ORIGIN_STORY_SCENES,
} from '../data/originStoryData';
import {
  SITE_CONFIG,
  SOCIAL_LINKS,
  WHATSAPP_GREETING,
  WHATSAPP_NUMBER,
} from '../config/site';
import { getAssetUrl } from '../lib/assets';

/**
 * Normalizes an asset path or URL:
 * If it's a relative path starting with '/assets/', resolve it via getAssetUrl().
 */
function normalizeAssetUrl(url: string | undefined): string {
  if (!url) return '';
  if (/^(https?:)?\/\//.test(url) || url.startsWith('data:')) {
    return url;
  }
  return getAssetUrl(url);
}

/**
 * Builds the canonical client default schema matching the real POPRIO website data.
 */
export function getDefaultContentSchema(): PoprioContentSchema {
  return {
    version: '1.0.0',
    meta: {
      name: SITE_CONFIG.name,
      tagline: 'Gourmet Flavoured Popcorn',
      domain: SITE_CONFIG.domain,
      logo: {
        src: SITE_CONFIG.logo.src,
        alt: SITE_CONFIG.logo.alt,
        width: SITE_CONFIG.logo.width,
        height: SITE_CONFIG.logo.height,
      },
      whatsappNumber: WHATSAPP_NUMBER,
      whatsappGreeting: WHATSAPP_GREETING,
      socialLinks: SOCIAL_LINKS.map((s) => ({
        id: s.id,
        label: s.label,
        url: s.url,
      })),
    },
    hero: {
      eyebrow1: 'Not Your Ordinary',
      eyebrow2: 'Your Next Obsession?',
      subtitle:
        'Handcrafted in small batches with bold, crunchy flavours that turn every handful into a comic-sized flavour explosion.',
      ctaText: 'Explore Flavours',
      primaryWords: [
        {
          text: 'Popcorn',
          color: '#FFFFFF',
          pillBg: 'var(--color-warm-cream)',
          badgeBg: 'var(--color-red-orange)',
          strokeColor: '#180904',
          strokeWidth: '0.24rem',
        },
        {
          text: 'Snack',
          color: '#FFFFFF',
          pillBg: 'var(--color-warm-cream)',
          badgeBg: 'var(--color-red-orange)',
          strokeColor: '#180904',
          strokeWidth: '0.24rem',
        },
        {
          text: 'Craving',
          color: '#FFFFFF',
          pillBg: 'var(--color-warm-cream)',
          badgeBg: 'var(--color-red-orange)',
          strokeColor: '#180904',
          strokeWidth: '0.24rem',
        },
        {
          text: 'Treat',
          color: '#FFFFFF',
          pillBg: 'var(--color-warm-cream)',
          badgeBg: 'var(--color-red-orange)',
          strokeColor: '#180904',
          strokeWidth: '0.24rem',
        },
      ],
      flavourWords: [
        {
          text: 'Cookies & Cream',
          color: '#FFFFFF',
          pillBg: 'var(--color-accent-pink)',
          badgeBg: 'var(--color-cocoa-brown)',
          strokeColor: '#180904',
          strokeWidth: '0.24rem',
        },
        {
          text: 'Caramel',
          color: '#FFFFFF',
          pillBg: 'var(--color-caramel)',
          badgeBg: 'var(--color-warm-cream)',
          strokeColor: '#180904',
          strokeWidth: '0.24rem',
        },
        {
          text: 'Strawberry',
          color: '#FFFFFF',
          pillBg: 'var(--color-red-orange)',
          badgeBg: 'var(--color-accent-pink)',
          strokeColor: '#180904',
          strokeWidth: '0.24rem',
        },
        {
          text: 'Choco Hazelnut',
          color: '#FFFFFF',
          pillBg: 'var(--color-chocolate-rich)',
          badgeBg: 'var(--color-caramel)',
          strokeColor: '#180904',
          strokeWidth: '0.24rem',
        },
      ],
      packages: HERO_PACKAGES,
    },
    trailer: {
      videoSrc: getAssetUrl(
        '/assets/videos/POPRIO-The-Art-of-The-Pop-15s-Trailer-1920x1080.mp4'
      ),
      videoSrcMobile: getAssetUrl(
        '/assets/videos/POPRIO-The-Art-of-The-Pop-15s-Trailer-1080x1920-Mobile.mp4'
      ),
      posterSrc: '',
      badge: 'TRAILER',
      heading: 'THE ART OF THE POP',
    },
    flavourverse: {
      eyebrow: 'POPRIO FLAVOURVERSE',
      title: 'THE FLAVOURVERSE',
      subtitle:
        'Five bold flavours. Giant mushroom kernels. Handcrafted for maximum crunch.',
      cards: FLAVOURVERSE_BENTO_CARDS,
      products: POPRIO_PRODUCTS,
    },
    originStory: {
      intro: ORIGIN_STORY_INTRO,
      scenes: ORIGIN_STORY_SCENES,
    },
    howToOrder: {
      eyebrow: '3-STEP CRUNCH DISPATCH',
      title: 'HOW TO POP IN',
      subtitle:
        'Getting fresh gourmet popcorn delivered straight to your door in Dhaka is as easy as 1-2-3.',
      videoSrc: getAssetUrl('/assets/videos/how-it-works.mp4'),
      videoSrcMobile: getAssetUrl(
        '/assets/videos/POPRIO-How-To-Order-10s-Loop-1080x1920-Mobile.mp4'
      ),
      whatsappMessage: "Hi POPRIO! I'd like to place an order.",
      steps: [
        {
          stepNumber: '01',
          title: 'PICK YOUR POP',
          description: 'Choose your favourite flavour.',
        },
        {
          stepNumber: '02',
          title: 'CHAT & ORDER',
          description: 'Message us directly on WhatsApp.',
        },
        {
          stepNumber: '03',
          title: 'ENJOY THE CRUNCH',
          description: 'Get ready for POPRIO!',
        },
      ],
    },
    about: {
      eyebrow: 'OUR STORY ✦ BORN IN DHAKA',
      heading:
        "WE DIDN'T JUST MAKE POPCORN. WE STARTED A CRUNCH REVOLUTION.",
      paragraphs: [
        'Born in the heart of Dhaka, POPRIO started with a simple, stubborn question: why was everyone settling for lifeless, cardboard-tasting popcorn? We believed snack time deserved genuine excitement — the kind of bold, unapologetic flavour that makes you pause mid-crunch and reach straight back into the bag.',
        'Every single pouch of POPRIO is crafted in small batches using giant, cloud-like mushroom kernels popped to airy perfection. From slow-simmered golden caramel and real creamery butter to crushed dark cocoa cookies, tangy strawberry glazes, and roasted hazelnuts, we layer real, indulgent ingredients until every kernel is coated with main-character energy.',
        "Whether you're queuing up a late-night movie marathon, sharing a pouch with friends across town, or satisfying a midnight sweet-and-salty craving, POPRIO is built to bring colour, playfulness, and an unforgettable crunch to every moment. No boring kernels. No compromises. Just flavour that pops.",
      ],
    },
    contact: {
      eyebrow: 'THE POPRIO HOTLINE ✦ DHAKA CRUNCH HQ',
      headline: "LET'S TALK POPCORN!",
      subtitle:
        'Planning a movie night, ordering bulk party pouches, looking to stock POPRIO at your store, or just want to say hello? Drop us a Crunch Gram below!',
      phone: '+880 1705-117793',
      email: 'HELLO@EATPOPRIO.COM',
      location: 'DHAKA, BANGLADESH',
      hours: 'DAILY · 10 AM – 10 PM',
      topics: [
        {
          id: 'party-order',
          label: 'Party / Bulk Order',
          badgeColor: 'var(--color-butter-yellow)',
        },
        {
          id: 'wholesale',
          label: 'Retail / Stockist',
          badgeColor: 'var(--color-accent-pink)',
        },
        {
          id: 'corporate',
          label: 'Corporate Gifting',
          badgeColor: 'var(--color-caramel)',
        },
        {
          id: 'general',
          label: 'General Say Hello',
          badgeColor: 'var(--color-light-cocoa)',
        },
      ],
      faqs: [
        {
          id: 'faq-delivery',
          question: 'HOW FAST DO YOU DELIVER ACROSS DHAKA?',
          answer:
            'We pop fresh daily in Dhaka! Standard orders placed via WhatsApp are dispatched within 24 hours so every pouch arrives at peak crunch.',
          accentColor: 'var(--color-butter-yellow)',
        },
        {
          id: 'faq-bulk',
          question: 'DO YOU TAKE CUSTOM PARTY, WEDDING OR CORPORATE ORDERS?',
          answer:
            'Absolutely! From movie nights and birthday parties to branded corporate gift boxes, we offer custom batch bundles across all 5 gourmet flavours.',
          accentColor: 'var(--color-accent-pink)',
        },
        {
          id: 'faq-freshness',
          question: 'HOW LONG DOES POPRIO STAY CRUNCHY AFTER OPENING?',
          answer:
            'Our heavy-duty barrier pouches lock in freshness. Once opened, seal it tight and enjoy within 5–7 days (though most pouches disappear in 10 minutes!).',
          accentColor: 'var(--color-light-cocoa)',
        },
        {
          id: 'faq-flavours',
          question: 'CAN I MIX AND MATCH ALL 5 FLAVOURS IN ONE ORDER?',
          answer:
            'Yes! You can mix Caramel, Cookies & Cream, Strawberry, Choco Hazelnut, and Chocolate Peanut Caramel in any combination or size when you message us.',
          accentColor: 'var(--color-caramel)',
        },
      ],
    },
    footer: {
      statement: 'SMALL BATCHES ✦ BIG CRAVINGS ✦ FLAVOUR THAT POPS',
      headline: 'READY TO POP IN?',
      copy: 'Your next popcorn obsession is only a WhatsApp message away.',
      ctaWhatsAppText: 'CHAT ON WHATSAPP',
      ctaFlavoursText: 'VIEW FLAVOURS',
      copyrightText: 'All rights reserved. Handcrafted with obsession in Dhaka.',
    },
    styles: {},
  };
}

/**
 * Deeply hydrates raw server JSON content, ensuring all asset URLs are resolved.
 */
function hydrateServerContent(
  raw: any,
  defaults: PoprioContentSchema
): PoprioContentSchema {
  if (!raw || typeof raw !== 'object') {
    return defaults;
  }

  return {
    version: raw.version || defaults.version,
    updated_at: raw.updated_at || defaults.updated_at,
    meta: {
      ...defaults.meta,
      ...(raw.meta || {}),
      logo: {
        ...defaults.meta.logo,
        ...(raw.meta?.logo || {}),
        src: normalizeAssetUrl(raw.meta?.logo?.src || defaults.meta.logo.src),
      },
    },
    hero: {
      ...defaults.hero,
      ...(raw.hero || {}),
      packages: (raw.hero?.packages || defaults.hero.packages).map(
        (p: any, idx: number) => {
          const defaultPkg =
            defaults.hero.packages.find((dp) => dp.id === p.id) ||
            defaults.hero.packages[idx];
          const rawPath = p.imagePath || defaultPkg?.imagePath || '';
          return {
            ...p,
            imagePath: normalizeAssetUrl(rawPath),
          };
        }
      ),
    },
    trailer: {
      ...defaults.trailer,
      ...(raw.trailer || {}),
      videoSrc: normalizeAssetUrl(raw.trailer?.videoSrc || defaults.trailer.videoSrc),
      videoSrcMobile: normalizeAssetUrl(
        raw.trailer?.videoSrcMobile || defaults.trailer.videoSrcMobile
      ),
      posterSrc: normalizeAssetUrl(raw.trailer?.posterSrc || defaults.trailer.posterSrc),
    },
    flavourverse: {
      ...defaults.flavourverse,
      ...(raw.flavourverse || {}),
      cards: (raw.flavourverse?.cards || defaults.flavourverse.cards).map(
        (c: any) => ({
          ...c,
          packageImage: normalizeAssetUrl(c.packageImage),
        })
      ),
      products: (raw.flavourverse?.products || defaults.flavourverse.products).map(
        (prod: any) => ({
          ...prod,
          packageImage: normalizeAssetUrl(prod.packageImage),
          galleryImages: (prod.galleryImages || []).map((gi: any) => ({
            ...gi,
            src: normalizeAssetUrl(gi.src),
          })),
        })
      ),
    },
    originStory: {
      intro: {
        ...defaults.originStory.intro,
        ...(raw.originStory?.intro || {}),
      },
      scenes: raw.originStory?.scenes || defaults.originStory.scenes,
    },
    howToOrder: {
      ...defaults.howToOrder,
      ...(raw.howToOrder || {}),
      videoSrc: normalizeAssetUrl(
        raw.howToOrder?.videoSrc || defaults.howToOrder.videoSrc
      ),
      videoSrcMobile: normalizeAssetUrl(
        raw.howToOrder?.videoSrcMobile || defaults.howToOrder.videoSrcMobile
      ),
    },
    about: {
      ...defaults.about,
      ...(raw.about || {}),
    },
    contact: {
      ...defaults.contact,
      ...(raw.contact || {}),
    },
    footer: {
      ...defaults.footer,
      ...(raw.footer || {}),
    },
    styles: raw.styles || defaults.styles || {},
  };
}

export interface PoprioContentContextValue {
  content: PoprioContentSchema;
  meta: PoprioMetaContent;
  hero: PoprioHeroContent;
  trailer: PoprioTrailerContent;
  flavourverse: PoprioFlavourverseContent;
  originStory: PoprioOriginStoryContent;
  howToOrder: PoprioHowToOrderContent;
  about: PoprioAboutContent;
  contact: PoprioContactContent;
  footer: PoprioFooterContent;
  products: readonly ProductDetailItem[];
  getProductById: (id: string | null | undefined) => ProductDetailItem | null;
  updateContent: (newContent: Partial<PoprioContentSchema>) => void;
}

const PoprioContentContext = createContext<PoprioContentContextValue | null>(
  null
);

export interface PoprioContentProviderProps {
  children: ReactNode;
  initialContent?: PoprioContentSchema;
}

export const PoprioContentProvider: React.FC<PoprioContentProviderProps> = ({
  children,
  initialContent,
}) => {
  const [content, setContent] = useState<PoprioContentSchema>(() => {
    const defaults = getDefaultContentSchema();

    if (initialContent) {
      return hydrateServerContent(initialContent, defaults);
    }

    const wpData = typeof window !== 'undefined' ? (window as any).POPRIO_DATA : undefined;
    if (wpData?.published) {
      return hydrateServerContent(wpData.published, defaults);
    }

    return defaults;
  });

  const updateContent = useCallback((patch: Partial<PoprioContentSchema>) => {
    setContent((prev) => ({
      ...prev,
      ...patch,
    }));
  }, []);

  const getProductById = useCallback(
    (id: string | null | undefined): ProductDetailItem | null => {
      if (!id) return null;
      return (
        content.flavourverse.products.find((item) => item.id === id) ?? null
      );
    },
    [content.flavourverse.products]
  );

  const value = useMemo<PoprioContentContextValue>(
    () => ({
      content,
      meta: content.meta,
      hero: content.hero,
      trailer: content.trailer,
      flavourverse: content.flavourverse,
      originStory: content.originStory,
      howToOrder: content.howToOrder,
      about: content.about,
      contact: content.contact,
      footer: content.footer,
      products: content.flavourverse.products,
      getProductById,
      updateContent,
    }),
    [content, getProductById, updateContent]
  );

  return (
    <PoprioContentContext.Provider value={value}>
      {children}
    </PoprioContentContext.Provider>
  );
};

export function usePoprioContent(): PoprioContentContextValue {
  const context = useContext(PoprioContentContext);
  if (!context) {
    throw new Error(
      'usePoprioContent must be used within a PoprioContentProvider'
    );
  }
  return context;
}
