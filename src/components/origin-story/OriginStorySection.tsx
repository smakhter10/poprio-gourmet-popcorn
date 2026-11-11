import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  ORIGIN_STORY_ASSETS,
  ORIGIN_STORY_INTRO,
} from '../../data/originStoryData';
import { ComicSoundEffect } from './ComicSoundEffect';
import { OriginStoryStage } from './OriginStoryStage';
import { OriginStoryScene } from './OriginStoryScene';
import { usePoprioContent } from '../../context/PoprioContentContext';
import { PoprioEditableElement } from '../editor/PoprioEditableElement';

gsap.registerPlugin(ScrollTrigger);

const STORY_PRELOAD_URLS: readonly string[] = [
  ORIGIN_STORY_ASSETS.scene1.boringPopcorn.src,
  ORIGIN_STORY_ASSETS.scene2.mascotThinking.src,
  ORIGIN_STORY_ASSETS.scene2.mascotEureka.src,
  ORIGIN_STORY_ASSETS.scene3.flavourExplosion.src,
  ORIGIN_STORY_ASSETS.scene3.ingredientStickers.src,
  ORIGIN_STORY_ASSETS.scene4.mascotCelebration.src,
  ORIGIN_STORY_ASSETS.scene5.mascotPointing.src,
];

export const OriginStorySection: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const introRef = useRef<HTMLDivElement>(null);
  const eyebrowRef = useRef<HTMLParagraphElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const underlineRef = useRef<SVGSVGElement>(null);
  const copyRef = useRef<HTMLParagraphElement>(null);
  const stickerRef = useRef<HTMLDivElement>(null);

  const [prefersReducedMotion, setPrefersReducedMotion] = useState<boolean>(
    () =>
      typeof window !== 'undefined'
        ? window.matchMedia('(prefers-reduced-motion: reduce)').matches
        : false
  );

  // Preload story PNG illustrations for smooth scroll scrubbing
  useEffect(() => {
    STORY_PRELOAD_URLS.forEach((src) => {
      const img = new Image();
      img.src = src;
    });
  }, []);

  // Listen for prefers-reduced-motion changes
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const handleChange = (e: MediaQueryListEvent) => {
      setPrefersReducedMotion(e.matches);
    };
    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  // Section Intro Scroll-Reveal Animation (Normal Flow, Unpinned)
  useEffect(() => {
    const introEl = introRef.current;
    if (!introEl) return;

    const ctx = gsap.context(() => {
      const eyebrowEl = eyebrowRef.current;
      const headingEl = headingRef.current;
      const underlineEl = underlineRef.current;
      const copyEl = copyRef.current;
      const stickerEl = stickerRef.current;

      if (prefersReducedMotion) {
        gsap.set([eyebrowEl, headingEl, underlineEl, copyEl, stickerEl], {
          opacity: 1,
          y: 0,
          scale: 1,
        });
        return;
      }

      gsap.set([eyebrowEl, headingEl, copyEl], {
        opacity: 0,
        y: '1.5rem',
      });
      gsap.set(underlineEl, {
        opacity: 0,
        scaleX: 0.4,
        transformOrigin: 'center center',
      });
      gsap.set(stickerEl, {
        opacity: 0,
        scale: 0.35,
      });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: introEl,
          start: 'top 84%',
          once: true,
        },
      });

      tl.to(eyebrowEl, {
        opacity: 1,
        y: '0rem',
        duration: 0.45,
        ease: 'power3.out',
      })
        .to(
          headingEl,
          {
            opacity: 1,
            y: '0rem',
            duration: 0.55,
            ease: 'back.out(1.3)',
          },
          '-=0.28'
        )
        .to(
          underlineEl,
          {
            opacity: 1,
            scaleX: 1,
            duration: 0.45,
            ease: 'back.out(1.5)',
          },
          '-=0.32'
        )
        .to(
          copyEl,
          {
            opacity: 1,
            y: '0rem',
            duration: 0.48,
            ease: 'power3.out',
          },
          '-=0.3'
        )
        .to(
          stickerEl,
          {
            opacity: 1,
            scale: 1,
            duration: 0.48,
            ease: 'back.out(2.1)',
          },
          '-=0.32'
        );
    }, introRef);

    return () => {
      ctx.revert();
    };
  }, [prefersReducedMotion]);

  const { originStory } = usePoprioContent();
  const intro = originStory?.intro ?? ORIGIN_STORY_INTRO;

  return (
    <section
      id="origin-story"
      ref={sectionRef}
      aria-labelledby="origin-story-heading"
      className="relative z-20 w-full bg-transparent text-cocoa-brown pt-6 lg:pt-10 pb-20 overflow-x-hidden"
    >
      {/* =====================================================================
          PART A: NORMAL-FLOW SECTION INTRODUCTION (NOT PINNED)
          ===================================================================== */}
      <div
        ref={introRef}
        className="relative w-full max-w-[84rem] mx-auto px-6 lg:px-10 pb-8 lg:pb-10 text-center flex flex-col items-center"
      >
        {/* Eyebrow */}
        <PoprioEditableElement elementId="originStory.eyebrow" type="text" label="Origin Story Eyebrow">
          <p
            ref={eyebrowRef}
            className="m-0 font-jakarta text-[0.875rem] font-extrabold tracking-[0.16em] text-red-orange uppercase"
          >
            {intro.eyebrow}
          </p>
        </PoprioEditableElement>

        {/* Oversized Main Heading + Playful POP! Sticker Accent */}
        <div className="relative inline-flex flex-col items-center mt-3">
          <PoprioEditableElement elementId="originStory.heading" type="text" label="Origin Story Heading">
            <h2
              id="origin-story-heading"
              ref={headingRef}
              className="m-0 font-hero text-3xl sm:text-4xl lg:text-[clamp(3rem,5.2vw,5rem)] leading-[1.0] lg:leading-[0.98] tracking-[-0.02em] text-cocoa-brown uppercase"
            >
              {intro.heading}
            </h2>
          </PoprioEditableElement>

          {/* Playful Small POP! Sticker Accent */}
          <div
            ref={stickerRef}
            className="hidden md:block absolute -right-24 -top-6 z-20"
          >
            <ComicSoundEffect
              word={intro.stickerText || 'POP!'}
              variant="starburst"
              burstFill="#FFC72C"
              innerFill="#FFF3E0"
              textFill="#E0351B"
              size="sm"
              rotationDeg={11}
            />
          </div>

          {/* Comic Inked Underline Accent */}
          <svg
            ref={underlineRef}
            aria-hidden="true"
            viewBox="0 0 360 18"
            className="w-44 sm:w-[16rem] lg:w-[22rem] h-3.5 sm:h-4 mt-2 overflow-visible"
          >
            <path
              d="M6 12 Q 180 3 354 11"
              fill="none"
              stroke="#E0351B"
              strokeWidth="6"
              strokeLinecap="round"
            />
            <path
              d="M18 15 Q 180 8 342 14"
              fill="none"
              stroke="#4B1F0F"
              strokeWidth="3.5"
              strokeLinecap="round"
            />
          </svg>
        </div>

        {/* Supporting Copy */}
        <PoprioEditableElement elementId="originStory.description" type="text" label="Origin Story Description">
          <p
            ref={copyRef}
            className="m-0 mt-3 sm:mt-4 max-w-[36rem] font-jakarta text-sm sm:text-base lg:text-[clamp(1.0625rem,1.35vw,1.25rem)] font-bold leading-relaxed text-cocoa-brown/80"
          >
            {intro.description}
          </p>
        </PoprioEditableElement>
      </div>

      {/* =====================================================================
          PART B: STICKY FULL-VIEWPORT COMIC STORYTELLING STAGE
          (or Static Vertical Sequence when prefers-reduced-motion is enabled)
          ===================================================================== */}
      {prefersReducedMotion ? (
        <div className="w-full max-w-[84rem] mx-auto px-6 lg:px-10 flex flex-col gap-10">
          <OriginStoryScene sceneNumber={1} staticMode={true} />
          <OriginStoryScene sceneNumber={2} staticMode={true} />
          <OriginStoryScene sceneNumber={3} staticMode={true} />
          <OriginStoryScene sceneNumber={4} staticMode={true} />
          <OriginStoryScene sceneNumber={5} staticMode={true} />
        </div>
      ) : (
        <OriginStoryStage />
      )}
    </section>
  );
};
