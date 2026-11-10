import React from 'react';
import { ArrowRight } from 'lucide-react';
import { RotatingText, RotatingWordItem } from './RotatingText';
import { HeroPackageShowcase } from './HeroPackageShowcase';
import { HeroFloatingCorns } from './HeroFloatingCorns';

/**
 * Line 1 rotating words in natural Title Case:
 * 1. Popcorn
 * 2. Snack
 * 3. Craving
 * 4. Treat
 */
const HERO_PRIMARY_WORDS: readonly RotatingWordItem[] = [
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
] as const;

/**
 * Line 2 rotating flavours in natural Title Case with white comic lettering,
 * black stroke, and flavour-coloured pill badges:
 * 1. Cookies & Cream
 * 2. Caramel
 * 3. Strawberry
 * 4. Choco Hazelnut
 */
const HERO_FLAVOUR_WORDS: readonly RotatingWordItem[] = [
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
] as const;

/**
 * Shared uniform font size for both static (Archivo Black) and animated (Bangers) hero texts.
 */
const UNIFORM_HERO_TEXT_SIZE =
  'text-[clamp(1.75rem,7.2vw,2.25rem)] sm:text-[clamp(1.85rem,3.4vw,2.5rem)] lg:text-[clamp(2rem,3.4vw,3.125rem)]';

export const HeroSection: React.FC = () => {
  const handleExploreClick = () => {
    const showcaseEl = document.getElementById('hero-packages-showcase');
    showcaseEl?.scrollIntoView({ behavior: 'smooth', block: 'center' });
  };

  return (
    <section
      aria-label="POPRIO Hero"
      className="relative w-full min-h-screen bg-butter-yellow text-cocoa-brown flex flex-col items-center justify-start pt-32 sm:pt-36 lg:pt-[10.5rem] pb-8 sm:pb-0 px-5 sm:px-6 overflow-hidden select-none"
    >
      {/* =====================================================================
          SIDE FLOATING POPCORN CLUSTERS (DEPTH-OF-FIELD BLUR + SCROLL PARALLAX)
          ===================================================================== */}
      <HeroFloatingCorns />

      {/* 4-Line Fixed Mobile / 2-Line Desktop Inline Comic Pill Composition + Space Grotesk Subtitle + Minimal Rounded CTA */}
      <div className="relative z-30 w-full max-w-[84rem] mx-auto flex flex-col items-center justify-center text-center gap-3 sm:gap-3.5 py-1 sm:py-0">
        {/* ===================================================================
            LINE 1 & 2 ON MOBILE (Fixed 2 lines on mobile, 1 inline row on desktop):
            Not Your Ordinary
            [ 🍿 Popcorn / Snack / Craving / Treat ]
            =================================================================== */}
        <h1 className="m-0 flex flex-col md:flex-row items-center justify-center gap-x-2.5 sm:gap-x-4 gap-y-2.5 sm:gap-y-3">
          <span className="sr-only">
            Not Your Ordinary Popcorn, Snack, Craving, or Treat.
          </span>

          <span
            aria-hidden="true"
            className={`comic-heading-white font-hero ${UNIFORM_HERO_TEXT_SIZE} leading-[1.15] tracking-[0.01em] whitespace-nowrap block`}
          >
            Not Your Ordinary
          </span>

          <RotatingText
            items={HERO_PRIMARY_WORDS}
            iconVariant="popcorn"
            displayDuration={2.4}
            transitionDuration={0.42}
            initialDelay={0}
            wordClassName={`font-comic ${UNIFORM_HERO_TEXT_SIZE} leading-[1.1] tracking-[0.04em]`}
          />
        </h1>

        {/* ===================================================================
            LINE 3 & 4 ON MOBILE (Fixed 2 lines on mobile, 1 inline row on desktop):
            Your Next Obsession?
            [ ✨ Cookies & Cream / Caramel ... ]
            =================================================================== */}
        <h2 className="m-0 flex flex-col md:flex-row items-center justify-center gap-x-2.5 sm:gap-x-4 gap-y-2.5 sm:gap-y-3">
          <span className="sr-only">
            Your Next Obsession? Cookies and Cream, Caramel, Strawberry, or
            Choco Hazelnut.
          </span>

          <span
            aria-hidden="true"
            className={`comic-heading-white font-hero ${UNIFORM_HERO_TEXT_SIZE} leading-[1.15] tracking-[0.01em] whitespace-nowrap block`}
          >
            Your Next Obsession?
          </span>

          <RotatingText
            items={HERO_FLAVOUR_WORDS}
            iconVariant="flavour"
            displayDuration={2.4}
            transitionDuration={0.42}
            initialDelay={0.8}
            wordClassName={`font-comic ${UNIFORM_HERO_TEXT_SIZE} leading-[1.1] tracking-[0.04em]`}
          />
        </h2>

        {/* ===================================================================
            HERO SUBTITLE (Space Grotesk)
            =================================================================== */}
        <p className="mt-1 max-w-[38rem] font-subtitle text-xs sm:text-base lg:text-[clamp(1.0625rem,1.35vw,1.25rem)] font-bold leading-relaxed text-cocoa-brown tracking-[-0.01em] px-3">
          Handcrafted in small batches with bold, crunchy flavours that turn
          every handful into a comic-sized flavour explosion.
        </p>

        {/* ===================================================================
            SIMPLE, MINIMAL COMPACT ROUNDED CTA BUTTON
            =================================================================== */}
        <div className="mt-1.5 sm:mt-3">
          <button
            type="button"
            onClick={handleExploreClick}
            className="group inline-flex items-center justify-center gap-2 px-5 py-2.5 sm:px-7 sm:py-3.5 rounded-full bg-cocoa-brown text-warm-cream font-subtitle text-sm sm:text-[1rem] font-bold tracking-tight cursor-pointer transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0 whitespace-nowrap shrink-0"
          >
            <span>Explore Flavours</span>
            <ArrowRight
              aria-hidden="true"
              className="w-3.5 h-3.5 sm:w-4 sm:h-4 stroke-[2.5] transition-transform duration-200 group-hover:translate-x-1"
            />
          </button>
        </div>
      </div>

      {/* =====================================================================
          5-PACKAGE RANDOMISED FAN SHOWCASE
          ===================================================================== */}
      <div className="relative z-10 w-full">
        <HeroPackageShowcase />
      </div>
    </section>
  );
};
