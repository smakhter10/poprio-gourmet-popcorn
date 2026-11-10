import React from 'react';
import {
  ORIGIN_STORY_ASSETS,
  ORIGIN_STORY_SCENES,
  ORIGIN_SCENE_4_PACKAGES,
} from '../../data/originStoryData';
import {
  getWhatsAppOrderUrl,
  WHATSAPP_GREETING,
  WHATSAPP_NUMBER,
} from '../../config/site';
import { ComicBubble } from './ComicBubble';
import { ComicSoundEffect } from './ComicSoundEffect';

function WhatsAppCtaIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="w-6 h-6 shrink-0 fill-current"
      aria-hidden="true"
      focusable="false"
    >
      <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91C2.13 13.66 2.59 15.36 3.45 16.86L2.05 22L7.3 20.62C8.75 21.41 10.38 21.83 12.04 21.83C17.5 21.83 21.95 17.38 21.95 11.92C21.95 9.27 20.92 6.78 19.05 4.91C17.18 3.03 14.69 2 12.04 2ZM12.05 3.67C14.25 3.67 16.31 4.53 17.87 6.09C19.42 7.65 20.28 9.72 20.28 11.92C20.28 16.46 16.58 20.15 12.04 20.15C10.56 20.15 9.11 19.76 7.85 19L7.55 18.83L4.43 19.65L5.26 16.61L5.06 16.29C4.24 14.98 3.8 13.47 3.8 11.91C3.81 7.37 7.5 3.67 12.05 3.67ZM8.53 7.33C8.37 7.33 8.1 7.39 7.87 7.64C7.65 7.89 7 8.5 7 9.71C7 10.93 7.89 12.1 8.01 12.27C8.14 12.44 9.76 14.94 12.25 16.01C14.34 16.92 14.76 16.74 15.21 16.7C15.66 16.66 16.68 16.09 16.89 15.51C17.1 14.92 17.1 14.42 17.04 14.31C16.97 14.2 16.81 14.14 16.56 14.01C16.31 13.89 15.09 13.28 14.87 13.2C14.64 13.11 14.48 13.07 14.31 13.32C14.15 13.57 13.67 14.14 13.53 14.31C13.38 14.48 13.24 14.5 12.99 14.37C12.74 14.25 11.94 13.98 11 13.14C10.26 12.48 9.77 11.67 9.62 11.42C9.48 11.17 9.6 11.04 9.73 10.92C9.84 10.81 9.98 10.62 10.1 10.48C10.23 10.33 10.27 10.23 10.35 10.06C10.43 9.89 10.39 9.75 10.33 9.62C10.27 9.5 9.77 8.28 9.56 7.78C9.36 7.29 9.16 7.35 9.01 7.34C8.86 7.33 8.7 7.33 8.53 7.33Z" />
    </svg>
  );
}

/**
 * Reusable Comic Radial Sunburst SVG Background Accent
 */
const ComicRadialBurstSvg: React.FC<{
  fill?: string;
  className?: string;
}> = ({ fill = '#FFC72C', className = '' }) => (
  <svg
    viewBox="0 0 500 500"
    aria-hidden="true"
    className={`pointer-events-none select-none ${className}`}
  >
    <polygon
      points="250,10 282,145 375,32 332,165 462,102 368,205 492,212 376,256 482,332 356,302 422,428 316,338 326,482 256,356 202,486 206,348 102,442 166,318 32,356 144,272 12,236 146,216 42,118 176,174 128,36 218,148"
      fill={fill}
      stroke="#4B1F0F"
      strokeWidth="5"
      strokeLinejoin="round"
    />
  </svg>
);

export interface OriginStorySceneProps {
  sceneNumber: 1 | 2 | 3 | 4 | 5;
  /** True when rendering inside the reduced-motion static vertical list */
  staticMode?: boolean;
  /** Whether Scene 5 interactive elements should be keyboard focusable */
  isInteractiveActive?: boolean;
}

export const OriginStoryScene: React.FC<OriginStorySceneProps> = ({
  sceneNumber,
  staticMode = false,
  isInteractiveActive = true,
}) => {
  const sceneConfig =
    ORIGIN_STORY_SCENES[sceneNumber - 1] ?? ORIGIN_STORY_SCENES[0];

  const whatsappOrderUrl = getWhatsAppOrderUrl(
    WHATSAPP_NUMBER,
    WHATSAPP_GREETING
  );

  const wrapperPositionClass = staticMode
    ? 'relative w-full min-h-[34rem] border-[0.3125rem] border-solid border-cocoa-brown rounded-[1.5rem] overflow-hidden p-6 sm:p-8 lg:p-12'
    : 'absolute inset-0 w-full h-full px-4 sm:px-8 lg:px-12 py-2 sm:py-6 flex items-center overflow-hidden';

  /* =========================================================================
     SCENE 01 — THE BORING BEGINNING
     ========================================================================= */
  if (sceneNumber === 1) {
    return (
      <div
        data-origin-scene="1"
        aria-label="Chapter 01: The Problem — Popcorn Was Getting Boring"
        className={wrapperPositionClass}
        style={
          staticMode
            ? {
                backgroundColor: sceneConfig.backgroundColor,
                boxShadow: '0.5rem 0.5rem 0 #4B1F0F',
              }
            : undefined
        }
      >
        <div className="relative z-10 w-full h-full flex flex-col justify-between sm:justify-center lg:grid lg:grid-cols-[44%_56%] gap-2 sm:gap-6 lg:gap-8 items-center py-1 sm:py-2">
          {/* Left Narrative Column (44%) */}
          <div className="flex flex-col items-center lg:items-start justify-center text-center lg:text-left shrink-0">
            <span
              data-scene1-text
              className="inline-flex items-center px-2.5 sm:px-3.5 py-0.5 sm:py-1.5 rounded-[0.5rem] bg-warm-cream comic-border-card font-hero text-[0.6875rem] sm:text-[0.8125rem] tracking-[0.08em] text-cocoa-brown uppercase"
              style={{ boxShadow: 'var(--shadow-hard-xs)' }}
            >
              {sceneConfig.identityLabel}
            </span>

            <h3
              data-scene1-text
              className="m-0 mt-2 sm:mt-5 font-hero text-xl sm:text-2xl md:text-3xl lg:text-[clamp(2.35rem,3.8vw,3.75rem)] leading-tight lg:leading-[1.0] tracking-[-0.015em] text-cocoa-brown uppercase"
            >
              {sceneConfig.title}
            </h3>

            <p
              data-scene1-text
              className="m-0 mt-1.5 sm:mt-4 max-w-[27rem] font-jakarta text-xs sm:text-sm md:text-base lg:text-[clamp(1.0625rem,1.35vw,1.25rem)] font-bold leading-normal sm:leading-relaxed text-cocoa-brown/80"
            >
              {sceneConfig.description}
            </p>
          </div>

          {/* Right Illustration Stage (56%) — Deliberately Quiet & Underwhelmed */}
          <div className="relative w-full h-auto min-h-0 sm:min-h-[22rem] flex-1 sm:flex-initial flex items-center justify-center">
            {/* Quiet Comic Panel Frame */}
            <div
              data-scene1-frame
              aria-hidden="true"
              className="absolute w-[13rem] sm:w-[18rem] lg:w-[25rem] h-[9.5rem] sm:h-[15rem] lg:h-[23rem] rounded-[1.5rem] bg-warm-cream/65 border-[0.18rem] sm:border-[0.22rem] border-dashed border-cocoa-brown/45"
            />

            {/* Speech Bubble: "MEH..." */}
            <div
              data-scene1-bubble
              className="absolute top-[2%] sm:top-[8%] left-[8%] sm:left-[12%] lg:left-[15%] z-30 -rotate-6 scale-75 sm:scale-100 origin-top-left"
            >
              <ComicBubble
                text="MEH..."
                variant="speech"
                tailPosition="bottom-right"
                useBangersFont={true}
                bgColor="#FFF3E0"
                textColor="#4B1F0F"
              />
            </div>

            {/* Bored Popcorn Character */}
            <div
              data-scene1-char
              className="relative z-20 flex items-center justify-center pt-2 sm:pt-4"
            >
              <img
                src={ORIGIN_STORY_ASSETS.scene1.boringPopcorn.src}
                alt={ORIGIN_STORY_ASSETS.scene1.boringPopcorn.alt}
                draggable={false}
                className="h-[8.5rem] sm:h-[13rem] md:h-[18rem] lg:h-[23.5rem] w-auto object-contain drop-shadow-[0_10px_0_rgba(75,31,15,0.2)] select-none pointer-events-none"
              />
            </div>
          </div>
        </div>
      </div>
    );
  }

  /* =========================================================================
     SCENE 02 — THE BIG IDEA (Thinking Mascot -> Eureka Mascot)
     ========================================================================= */
  if (sceneNumber === 2) {
    return (
      <div
        data-origin-scene="2"
        aria-label="Chapter 02: The Spark — Then Came The Idea"
        className={wrapperPositionClass}
        style={
          staticMode
            ? {
                backgroundColor: sceneConfig.backgroundColor,
                boxShadow: '0.5rem 0.5rem 0 #4B1F0F',
              }
            : undefined
        }
      >
        <div className="relative z-10 w-full h-full flex flex-col justify-between sm:justify-center lg:grid lg:grid-cols-[43%_57%] gap-2 sm:gap-6 lg:gap-8 items-center py-1 sm:py-2">
          {/* Left Narrative Column (43%) */}
          <div className="flex flex-col items-center lg:items-start justify-center text-center lg:text-left shrink-0">
            <span
              data-scene2-text
              className="inline-flex items-center px-2.5 sm:px-3.5 py-0.5 sm:py-1.5 rounded-[0.5rem] bg-warm-cream comic-border-card font-hero text-[0.6875rem] sm:text-[0.8125rem] tracking-[0.08em] text-red-orange uppercase"
              style={{ boxShadow: 'var(--shadow-hard-xs)' }}
            >
              {sceneConfig.identityLabel}
            </span>

            <h3
              data-scene2-text
              className="m-0 mt-2 sm:mt-5 font-hero text-xl sm:text-2xl md:text-3xl lg:text-[clamp(2.35rem,3.8vw,3.75rem)] leading-tight lg:leading-[1.0] tracking-[-0.015em] text-cocoa-brown uppercase"
            >
              {sceneConfig.title}
            </h3>

            <p
              data-scene2-text
              className="m-0 mt-1.5 sm:mt-4 max-w-[27rem] font-jakarta text-xs sm:text-sm md:text-base lg:text-[clamp(1.0625rem,1.35vw,1.25rem)] font-bold leading-normal sm:leading-relaxed text-cocoa-brown/90"
            >
              {sceneConfig.description}
            </p>
          </div>

          {/* Right Illustration Stage (57%) — Thinking -> Eureka Transformation */}
          <div className="relative w-full h-auto min-h-0 sm:min-h-[24rem] flex-1 sm:flex-initial flex items-center justify-center">
            {/* Eureka Sunburst Backdrop */}
            <div
              data-scene2-burst
              className="absolute inset-0 flex items-center justify-center pointer-events-none"
            >
              <ComicRadialBurstSvg
                fill="#FFF3E0"
                className="w-[15rem] sm:w-[20rem] lg:w-[30rem] h-[15rem] sm:h-[20rem] lg:h-[30rem] opacity-90"
              />
            </div>

            {staticMode ? (
              /* Static Reduced-Motion Side-by-Side Pair */
              <div className="relative z-20 flex flex-wrap items-center justify-center gap-4 sm:gap-6">
                <div className="relative flex flex-col items-center">
                  <ComicBubble
                    text="WHAT IF...?"
                    variant="thought"
                    tailPosition="bottom-center"
                    bgColor="#FFF3E0"
                    textColor="#4B1F0F"
                    className="mb-2 sm:mb-3 scale-75 sm:scale-100"
                  />
                  <img
                    src={ORIGIN_STORY_ASSETS.scene2.mascotThinking.src}
                    alt={ORIGIN_STORY_ASSETS.scene2.mascotThinking.alt}
                    className="h-[8.5rem] sm:h-[13rem] md:h-[15rem] w-auto object-contain"
                  />
                </div>
                <div className="relative flex flex-col items-center">
                  <ComicSoundEffect
                    word="AHA!"
                    size="sm"
                    burstFill="#E0351B"
                    innerFill="#FFF3E0"
                    textFill="#E0351B"
                    rotationDeg={6}
                  />
                  <img
                    src={ORIGIN_STORY_ASSETS.scene2.mascotEureka.src}
                    alt={ORIGIN_STORY_ASSETS.scene2.mascotEureka.alt}
                    className="h-[8.5rem] sm:h-[13rem] md:h-[15rem] w-auto object-contain"
                  />
                </div>
              </div>
            ) : (
              /* Pinned Scroll-Choreographed Stage Region (Same Anchor Position) */
              <div className="relative w-full h-full flex items-center justify-center">
                {/* Thought Bubble ("WHAT IF...?") placed on upper-left to complement PNG's right "Hmm..." */}
                <div
                  data-scene2-thought
                  className="absolute top-[2%] sm:top-[6%] left-[2%] sm:left-[4%] lg:left-[8%] z-30 -rotate-4 scale-75 sm:scale-100 origin-top-left"
                >
                  <ComicBubble
                    text="WHAT IF...?"
                    variant="thought"
                    tailPosition="bottom-right"
                    bgColor="#FFF3E0"
                    textColor="#4B1F0F"
                  />
                </div>

                {/* Phase 2A: Thinking Mascot */}
                <div
                  data-scene2-thinking
                  className="absolute inset-0 z-20 flex items-center justify-center"
                >
                  <img
                    src={ORIGIN_STORY_ASSETS.scene2.mascotThinking.src}
                    alt={ORIGIN_STORY_ASSETS.scene2.mascotThinking.alt}
                    draggable={false}
                    className="h-[8.5rem] sm:h-[13rem] md:h-[18rem] lg:h-[24.5rem] w-auto object-contain drop-shadow-[0_12px_0_rgba(75,31,15,0.28)] select-none pointer-events-none"
                  />
                </div>

                {/* Phase 2B: Eureka Mascot (Enters in exact same stage region) */}
                <div
                  data-scene2-eureka
                  className="absolute inset-0 z-20 flex items-center justify-center"
                >
                  <img
                    src={ORIGIN_STORY_ASSETS.scene2.mascotEureka.src}
                    alt={ORIGIN_STORY_ASSETS.scene2.mascotEureka.alt}
                    draggable={false}
                    className="h-[8.5rem] sm:h-[13rem] md:h-[18rem] lg:h-[25rem] w-auto object-contain drop-shadow-[0_12px_0_rgba(75,31,15,0.3)] select-none pointer-events-none"
                  />
                </div>

                {/* Sound Effect: "AHA!" placed on upper-right to balance Eureka's left lightbulb */}
                <div
                  data-scene2-aha
                  className="absolute top-[2%] sm:top-[4%] right-[2%] lg:right-[6%] z-30 scale-75 sm:scale-100 origin-top-right"
                >
                  <ComicSoundEffect
                    word="AHA!"
                    variant="starburst"
                    burstFill="#E0351B"
                    innerFill="#FFF3E0"
                    textFill="#E0351B"
                    size="md"
                    rotationDeg={8}
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  /* =========================================================================
     SCENE 03 — THE FLAVOUR EXPERIMENT (Flavour Explosion + Ingredient Stickers)
     ========================================================================= */
  if (sceneNumber === 3) {
    return (
      <div
        data-origin-scene="3"
        aria-label="Chapter 03: The Experiment — We Started Mixing Magic"
        className={wrapperPositionClass}
        style={
          staticMode
            ? {
                backgroundColor: sceneConfig.backgroundColor,
                boxShadow: '0.5rem 0.5rem 0 #4B1F0F',
              }
            : undefined
        }
      >
        <div className="relative z-10 w-full h-full flex flex-col justify-between sm:justify-center lg:grid lg:grid-cols-[40%_60%] gap-2 sm:gap-6 items-center py-1 sm:py-2">
          {/* Left Narrative + Secondary Ingredient Sticker Sheet Card (40%) */}
          <div className="flex flex-col items-center lg:items-start justify-center text-center lg:text-left shrink-0">
            <span
              data-scene3-text
              className="inline-flex items-center px-2.5 sm:px-3.5 py-0.5 sm:py-1.5 rounded-[0.5rem] bg-butter-yellow comic-border-card font-hero text-[0.6875rem] sm:text-[0.8125rem] tracking-[0.08em] text-cocoa-brown uppercase"
              style={{ boxShadow: 'var(--shadow-hard-xs)' }}
            >
              {sceneConfig.identityLabel}
            </span>

            <h3
              data-scene3-text
              className="m-0 mt-2 sm:mt-4 font-hero text-xl sm:text-2xl md:text-3xl lg:text-[clamp(2.25rem,3.5vw,3.5rem)] leading-tight lg:leading-[1.0] tracking-[-0.015em] text-warm-cream uppercase"
              style={{ textShadow: '0.1875rem 0.1875rem 0 #4B1F0F' }}
            >
              {sceneConfig.title}
            </h3>

            <p
              data-scene3-text
              className="m-0 mt-1.5 sm:mt-3.5 max-w-[25rem] font-jakarta text-xs sm:text-sm md:text-base lg:text-[clamp(1.0625rem,1.3vw,1.1875rem)] font-bold leading-normal sm:leading-relaxed text-warm-cream/95"
            >
              {sceneConfig.description}
            </p>

            {/* Secondary Supporting Graphic: Ingredient Sticker Sheet */}
            <div
              data-scene3-stickers
              className="mt-2 sm:mt-5 bg-warm-cream comic-border-card rounded-[1.125rem] p-2 sm:p-3.5 flex items-center gap-2.5 sm:gap-4 max-w-[20rem] sm:max-w-[24rem] -rotate-1 hidden sm:flex"
              style={{ boxShadow: '0.3125rem 0.3125rem 0 #4B1F0F' }}
            >
              <img
                src={ORIGIN_STORY_ASSETS.scene3.ingredientStickers.src}
                alt={ORIGIN_STORY_ASSETS.scene3.ingredientStickers.alt}
                draggable={false}
                className="w-16 h-16 sm:w-24 sm:h-24 lg:w-28 lg:h-28 object-contain shrink-0 select-none pointer-events-none"
              />
              <div className="text-left">
                <span className="block font-hero text-[0.75rem] sm:text-[0.8125rem] tracking-[0.06em] text-red-orange uppercase">
                  THE SECRET STASH
                </span>
                <span className="block mt-0.5 sm:mt-1 font-jakarta text-[0.75rem] sm:text-[0.8125rem] font-bold leading-snug text-cocoa-brown">
                  Real golden caramel, rich cocoa drizzle, cookie crumbs, sweet
                  berry glaze &amp; roasted nuts.
                </span>
              </div>
            </div>
          </div>

          {/* Right Dominant Flavour Explosion Stage (60%) */}
          <div className="relative w-full h-auto min-h-0 sm:min-h-[24rem] flex-1 sm:flex-initial flex items-center justify-center">
            {/* Layered Radial Action Burst */}
            <div
              data-scene3-radial
              className="absolute inset-0 flex items-center justify-center pointer-events-none"
            >
              <ComicRadialBurstSvg
                fill="#FFC72C"
                className="w-[15rem] sm:w-[22rem] lg:w-[32rem] h-[15rem] sm:h-[22rem] lg:h-[32rem]"
              />
            </div>

            {/* Dominant Flavour Explosion Artwork */}
            <div
              data-scene3-explosion
              className="relative z-20 flex items-center justify-center"
            >
              <img
                src={ORIGIN_STORY_ASSETS.scene3.flavourExplosion.src}
                alt={ORIGIN_STORY_ASSETS.scene3.flavourExplosion.alt}
                draggable={false}
                className="h-[8.5rem] sm:h-[13rem] md:h-[18rem] lg:h-[25.5rem] w-auto object-contain drop-shadow-[0_14px_0_rgba(75,31,15,0.38)] select-none pointer-events-none"
              />
            </div>

            {/* Sound Effect 1: "POP!" (Upper-Left of Explosion) */}
            <div
              data-scene3-pop
              className="absolute top-[2%] left-[2%] lg:left-[5%] z-30 scale-75 sm:scale-100 origin-top-left"
            >
              <ComicSoundEffect
                word="POP!"
                variant="starburst"
                burstFill="#FFC72C"
                innerFill="#FFF3E0"
                textFill="#E0351B"
                size="md"
                rotationDeg={-9}
              />
            </div>

            {/* Sound Effect 2: "CRUNCH!" (Bottom-Right of Explosion) */}
            <div
              data-scene3-crunch
              className="absolute bottom-[2%] right-[1%] lg:right-[4%] z-30 scale-75 sm:scale-100 origin-bottom-right"
            >
              <ComicSoundEffect
                word="CRUNCH!"
                variant="jagged"
                burstFill="#FFF3E0"
                innerFill="#FFC72C"
                textFill="#4B1F0F"
                size="md"
                rotationDeg={7}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }

  /* =========================================================================
     SCENE 04 — POPRIO IS BORN (Celebration Mascot + 5 Supporting Packages + BOOM!)
     ========================================================================= */
  if (sceneNumber === 4) {
    return (
      <div
        data-origin-scene="4"
        aria-label="Chapter 04: The Reveal — And Then POPRIO Was Born"
        className={wrapperPositionClass}
        style={
          staticMode
            ? {
                backgroundColor: sceneConfig.backgroundColor,
                boxShadow: '0.5rem 0.5rem 0 #4B1F0F',
              }
            : undefined
        }
      >
        <div className="relative z-10 w-full h-full flex flex-col justify-between sm:justify-center lg:grid lg:grid-cols-[38%_62%] gap-2 sm:gap-6 items-center py-1 sm:py-2">
          {/* Left Climax Narrative Column (38%) */}
          <div className="flex flex-col items-center lg:items-start justify-center text-center lg:text-left shrink-0">
            <span
              data-scene4-text
              className="inline-flex items-center px-2.5 sm:px-3.5 py-0.5 sm:py-1.5 rounded-[0.5rem] bg-butter-yellow comic-border-card font-hero text-[0.6875rem] sm:text-[0.8125rem] tracking-[0.08em] text-cocoa-brown uppercase"
              style={{ boxShadow: 'var(--shadow-hard-xs)' }}
            >
              {sceneConfig.identityLabel}
            </span>

            <h3
              data-scene4-text
              className="m-0 mt-2 sm:mt-5 font-hero text-xl sm:text-2xl md:text-3xl lg:text-[clamp(2.25rem,3.6vw,3.6rem)] leading-tight lg:leading-[1.0] tracking-[-0.015em] text-cocoa-brown uppercase"
            >
              {sceneConfig.title}
            </h3>

            <p
              data-scene4-text
              className="m-0 mt-1.5 sm:mt-4 max-w-[25rem] font-jakarta text-xs sm:text-sm md:text-base lg:text-[clamp(1.0625rem,1.35vw,1.25rem)] font-bold leading-normal sm:leading-relaxed text-cocoa-brown/90"
            >
              {sceneConfig.description}
            </p>
          </div>

          {/* Right Climax Hero Stage: Mascot Center + 5 Packages Halo + BOOM! (62%) */}
          <div className="relative w-full h-auto min-h-0 sm:min-h-[25rem] flex-1 sm:flex-initial flex items-center justify-center">
            {/* Large Butter Yellow Comic Burst Behind Character */}
            <div
              data-scene4-burst
              className="absolute inset-0 flex items-center justify-center pointer-events-none"
            >
              <ComicRadialBurstSvg
                fill="#FFC72C"
                className="w-[15rem] sm:w-[22rem] lg:w-[31rem] h-[15rem] sm:h-[22rem] lg:h-[31rem]"
              />
            </div>

            {/* 5 Canonical POPRIO Packages Arranged as Supporting Cast Halo Behind Mascot */}
            <div
              aria-label="All five POPRIO gourmet popcorn flavours"
              className="absolute inset-0 z-10 pointer-events-none"
            >
              {ORIGIN_SCENE_4_PACKAGES.map((pkg) => (
                <div
                  key={pkg.id}
                  data-scene4-pkg
                  className={`absolute ${pkg.positionClassName} w-10 sm:w-16 lg:w-[9.25rem] aspect-[3/4] flex items-center justify-center`}
                  style={{
                    transform: `rotate(${pkg.rotation}deg) scale(${pkg.scale})`,
                  }}
                >
                  <img
                    src={pkg.imageSrc}
                    alt={pkg.alt}
                    draggable={false}
                    className="w-full h-full object-contain drop-shadow-[0_8px_0_rgba(75,31,15,0.3)] select-none"
                  />
                </div>
              ))}
            </div>

            {/* Main Hero Character: Celebration Mascot */}
            <div
              data-scene4-mascot
              className="relative z-20 flex items-center justify-center pt-2 sm:pt-6"
            >
              <img
                src={ORIGIN_STORY_ASSETS.scene4.mascotCelebration.src}
                alt={ORIGIN_STORY_ASSETS.scene4.mascotCelebration.alt}
                draggable={false}
                className="h-[8.5rem] sm:h-[13rem] md:h-[18rem] lg:h-[23rem] w-auto object-contain drop-shadow-[0_14px_0_rgba(75,31,15,0.36)] select-none pointer-events-none"
              />
            </div>

            {/* Large Climax Sound Effect: "BOOM!" */}
            <div
              data-scene4-boom
              className="absolute top-[1%] right-[1%] lg:right-[3%] z-30 scale-75 sm:scale-100 origin-top-right"
            >
              <ComicSoundEffect
                word="BOOM!"
                variant="boom"
                burstFill="#E0351B"
                innerFill="#FFC72C"
                textFill="#FFF3E0"
                size="lg"
                rotationDeg={8}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }

  /* =========================================================================
     SCENE 05 — YOUR TURN (Pointing Mascot on Left -> Invitation & CTA on Right)
     ========================================================================= */
  return (
    <div
      data-origin-scene="5"
      aria-label="Chapter 05: The Invitation — Now It's Your Turn To Pop In"
      className={wrapperPositionClass}
      style={
        staticMode
          ? {
              backgroundColor: sceneConfig.backgroundColor,
              boxShadow: '0.5rem 0.5rem 0 #4B1F0F',
            }
          : undefined
      }
    >
      <div className="relative z-10 w-full h-full flex flex-col justify-between sm:justify-center lg:grid lg:grid-cols-[46%_54%] gap-2 sm:gap-6 lg:gap-8 items-center py-1 sm:py-2">
        {/* Left Column (46%): Pointing Mascot + Speech Bubble pointing right toward CTA */}
        <div className="relative w-full h-auto min-h-0 sm:min-h-[23rem] flex-1 sm:flex-initial flex items-center justify-center">
          {/* Butter Yellow Comic Accent Burst */}
          <div
            data-scene5-burst
            className="absolute inset-0 flex items-center justify-center pointer-events-none"
          >
            <ComicRadialBurstSvg
              fill="#FFC72C"
              className="w-[15rem] sm:w-[20rem] lg:w-[26rem] h-[15rem] sm:h-[20rem] lg:h-[26rem]"
            />
          </div>

          {/* Speech Bubble: "WHICH ONE'S YOURS?" */}
          <div
            data-scene5-bubble
            className="absolute top-[2%] sm:top-[3%] left-[2%] sm:left-[4%] lg:left-[8%] z-30 -rotate-4 scale-75 sm:scale-100 origin-top-left"
          >
            <ComicBubble
              text="WHICH ONE'S YOURS?"
              variant="speech"
              tailPosition="bottom-right"
              bgColor="#FFF3E0"
              textColor="#4B1F0F"
            />
          </div>

          {/* Pointing Mascot (points directly right toward the CTA) */}
          <div
            data-scene5-mascot
            className="relative z-20 flex items-center justify-center pt-2 sm:pt-6"
          >
            <img
              src={ORIGIN_STORY_ASSETS.scene5.mascotPointing.src}
              alt={ORIGIN_STORY_ASSETS.scene5.mascotPointing.alt}
              draggable={false}
              className="h-[8.5rem] sm:h-[13rem] md:h-[18rem] lg:h-[24rem] w-auto object-contain drop-shadow-[0_14px_0_rgba(75,31,15,0.4)] select-none pointer-events-none"
            />
          </div>
        </div>

        {/* Right Column (54%): Invitation Copy + Interactive CHAT & ORDER CTA */}
        <div className="relative z-30 flex flex-col items-center lg:items-start justify-center text-center lg:text-left lg:pl-4 shrink-0">
          <span
            data-scene5-text
            className="inline-flex items-center px-2.5 sm:px-3.5 py-0.5 sm:py-1.5 rounded-[0.5rem] bg-butter-yellow comic-border-card font-hero text-[0.6875rem] sm:text-[0.8125rem] tracking-[0.08em] text-cocoa-brown uppercase"
            style={{ boxShadow: 'var(--shadow-hard-xs)' }}
          >
            {sceneConfig.identityLabel}
          </span>

          <h3
            data-scene5-text
            className="m-0 mt-2 sm:mt-5 font-hero text-xl sm:text-2xl md:text-3xl lg:text-[clamp(2.35rem,3.8vw,3.75rem)] leading-tight lg:leading-[1.0] tracking-[-0.015em] text-warm-cream uppercase"
            style={{ textShadow: '0.1875rem 0.1875rem 0 #4B1F0F' }}
          >
            {sceneConfig.title}
          </h3>

          <p
            data-scene5-text
            className="m-0 mt-1.5 sm:mt-4 max-w-[28rem] font-jakarta text-xs sm:text-sm md:text-base lg:text-[clamp(1.0625rem,1.35vw,1.25rem)] font-bold leading-normal sm:leading-relaxed text-warm-cream/90"
          >
            {sceneConfig.description}
          </p>

          {/* Interactive WhatsApp Ordering CTA */}
          <div data-scene5-cta className="mt-3 sm:mt-7 pointer-events-auto">
            {whatsappOrderUrl ? (
              <a
                href={whatsappOrderUrl}
                target="_blank"
                rel="noopener noreferrer"
                tabIndex={isInteractiveActive ? 0 : -1}
                aria-label="Chat and Order POPRIO Gourmet Popcorn on WhatsApp"
                className="poprio-whatsapp-btn inline-flex items-center justify-center gap-2.5 sm:gap-3.5 px-5 sm:px-8 py-2.5 sm:py-4 text-sm sm:text-base lg:text-[1.25rem] tracking-wider uppercase cursor-pointer select-none"
              >
                <WhatsAppCtaIcon />
                <span>CHAT &amp; ORDER</span>
              </a>
            ) : (
              <button
                type="button"
                disabled
                tabIndex={isInteractiveActive ? 0 : -1}
                className="poprio-whatsapp-btn inline-flex items-center justify-center gap-2.5 sm:gap-3.5 px-5 sm:px-8 py-2.5 sm:py-4 text-sm sm:text-base lg:text-[1.25rem] tracking-wider uppercase opacity-90 cursor-not-allowed select-none"
              >
                <WhatsAppCtaIcon />
                <span>CHAT &amp; ORDER</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
