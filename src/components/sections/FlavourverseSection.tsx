import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { FLAVOURVERSE_BENTO_CARDS } from '../../data/products';
import { FlavourBentoCard } from './FlavourBentoCard';
import { usePoprioContent } from '../../context/PoprioContentContext';
import { PoprioEditableElement } from '../editor/PoprioEditableElement';

gsap.registerPlugin(ScrollTrigger);

/**
 * Decorative Comic Sound-Effect Sticker 1: "POP!"
 * Placed along the Strawberry / Caramel diagonal panel boundary.
 */
const ComicPopSticker: React.FC<{
  stickerRef: React.RefObject<HTMLDivElement | null>;
}> = ({ stickerRef }) => (
  <div
    ref={stickerRef}
    aria-hidden="true"
    className="pointer-events-none select-none hidden lg:flex absolute left-[66.6667%] top-[19%] -translate-x-1/2 -translate-y-1/2 z-30 items-center justify-center"
  >
    <div className="relative -rotate-8 flex items-center justify-center">
      {/* Small decorative comic burst lines around the starburst */}
      <svg
        viewBox="0 0 156 108"
        className="w-[9.25rem] h-[6.4rem] overflow-visible drop-shadow-[0.25rem_0.25rem_0_#4B1F0F]"
      >
        {/* Outer Decorative Action Lines */}
        <line
          x1="12"
          y1="14"
          x2="2"
          y2="4"
          stroke="#4B1F0F"
          strokeWidth="3.5"
          strokeLinecap="round"
        />
        <line
          x1="144"
          y1="16"
          x2="154"
          y2="6"
          stroke="#4B1F0F"
          strokeWidth="3.5"
          strokeLinecap="round"
        />
        <line
          x1="146"
          y1="88"
          x2="155"
          y2="98"
          stroke="#4B1F0F"
          strokeWidth="3.5"
          strokeLinecap="round"
        />

        {/* Irregular 12-Point Comic Starburst Polygon */}
        <polygon
          points="78,4 95,18 122,8 120,32 148,42 130,62 144,86 114,86 102,104 78,90 54,104 42,86 12,86 26,62 8,42 36,32 34,8 61,18"
          fill="#FFC72C"
          stroke="#4B1F0F"
          strokeWidth="4"
          strokeLinejoin="round"
        />

        {/* Inner Accent Starburst */}
        <polygon
          points="78,13 92,24 114,16 113,36 135,44 121,60 132,79 109,79 99,94 78,82 57,94 47,79 24,79 35,60 21,44 43,36 42,16 64,24"
          fill="#FFF3E0"
          stroke="#E0351B"
          strokeWidth="2.5"
          strokeLinejoin="round"
        />
      </svg>

      {/* Bangers Comic Sound Effect Lettering */}
      <span
        className="absolute font-comic text-[2.05rem] leading-none tracking-[0.06em] uppercase"
        style={{
          color: '#E0351B',
          WebkitTextStroke: '0.18rem #4B1F0F',
          paintOrder: 'stroke fill',
          textShadow: '0.125rem 0.125rem 0 #4B1F0F',
        }}
      >
        POP!
      </span>
    </div>
  </div>
);

/**
 * Decorative Comic Sound-Effect Sticker 2: "CRUNCH!"
 * Placed along the boundary between Cookies & Cream and the final Chocolate Peanut Caramel panel.
 */
const ComicCrunchSticker: React.FC<{
  stickerRef: React.RefObject<HTMLDivElement | null>;
}> = ({ stickerRef }) => (
  <div
    ref={stickerRef}
    aria-hidden="true"
    className="pointer-events-none select-none hidden lg:flex absolute left-[45%] top-0 -translate-x-1/2 -translate-y-1/2 z-30 items-center justify-center"
  >
    <div className="relative rotate-6 flex items-center justify-center">
      <svg
        viewBox="0 0 188 96"
        className="w-[10.75rem] h-[5.5rem] overflow-visible drop-shadow-[0.25rem_0.25rem_0_#4B1F0F]"
      >
        {/* Small Decorative Action Rays */}
        <line
          x1="16"
          y1="10"
          x2="5"
          y2="1"
          stroke="#4B1F0F"
          strokeWidth="3.5"
          strokeLinecap="round"
        />
        <line
          x1="172"
          y1="12"
          x2="183"
          y2="2"
          stroke="#4B1F0F"
          strokeWidth="3.5"
          strokeLinecap="round"
        />
        <line
          x1="14"
          y1="84"
          x2="4"
          y2="93"
          stroke="#4B1F0F"
          strokeWidth="3.5"
          strokeLinecap="round"
        />

        {/* Bold Jagged Comic Sticker Shape */}
        <polygon
          points="20,16 52,6 76,15 108,5 136,16 170,10 164,38 182,54 162,72 168,90 130,83 102,92 74,82 40,91 22,74 6,54 24,36"
          fill="#E0351B"
          stroke="#4B1F0F"
          strokeWidth="4"
          strokeLinejoin="round"
        />

        {/* Inner Butter Yellow Comic Highlight */}
        <polygon
          points="29,22 55,14 77,21 106,13 132,22 159,17 154,39 169,53 153,67 157,81 127,76 102,83 76,75 45,82 30,68 17,53 32,38"
          fill="#FFC72C"
        />
      </svg>

      {/* Bangers Comic Sound Effect Lettering */}
      <span
        className="absolute font-comic text-[1.95rem] leading-none tracking-[0.06em] uppercase"
        style={{
          color: '#FFF3E0',
          WebkitTextStroke: '0.18rem #4B1F0F',
          paintOrder: 'stroke fill',
          textShadow: '0.125rem 0.125rem 0 #4B1F0F',
        }}
      >
        CRUNCH!
      </span>
    </div>
  </div>
);

export const FlavourverseSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const headingGroupRef = useRef<HTMLDivElement>(null);
  const eyebrowRef = useRef<HTMLParagraphElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const descriptionRef = useRef<HTMLParagraphElement>(null);

  const comicPageRef = useRef<HTMLDivElement>(null);
  const row1Ref = useRef<HTMLDivElement>(null);
  const row2Ref = useRef<HTMLDivElement>(null);
  const row3Ref = useRef<HTMLDivElement>(null);

  const popStickerRef = useRef<HTMLDivElement>(null);
  const crunchStickerRef = useRef<HTMLDivElement>(null);

  const { flavourverse } = usePoprioContent();
  const cards = flavourverse?.cards?.length ? flavourverse.cards : FLAVOURVERSE_BENTO_CARDS;

  // Extract canonical card configs by row
  const row1Cards = cards.filter((c) => c.row === 1);
  const row2Cards = cards.filter((c) => c.row === 2);
  const row3Cards = cards.filter((c) => c.row === 3);

  useEffect(() => {
    const sectionEl = sectionRef.current;
    if (!sectionEl) return;

    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;

    const ctx = gsap.context(() => {
      const eyebrowEl = eyebrowRef.current;
      const titleEl = titleRef.current;
      const descEl = descriptionRef.current;
      const comicPageEl = comicPageRef.current;
      const popEl = popStickerRef.current;
      const crunchEl = crunchStickerRef.current;

      const allCopyBlocks =
        sectionEl.querySelectorAll<HTMLElement>('[data-panel-copy]');
      const allStageBlocks =
        sectionEl.querySelectorAll<HTMLElement>('[data-panel-stage]');

      if (prefersReducedMotion) {
        gsap.set([eyebrowEl, titleEl, descEl, comicPageEl], {
          opacity: 1,
          y: 0,
          scale: 1,
        });
        gsap.set([allCopyBlocks, allStageBlocks, popEl, crunchEl], {
          opacity: 1,
          y: 0,
          scale: 1,
        });
        return;
      }

      // 1. Heading Group Progressive Reveal (Eyebrow -> Title -> Description)
      gsap.set([eyebrowEl, titleEl, descEl], {
        opacity: 0,
        y: '1.5rem',
      });

      const headingTl = gsap.timeline({
        scrollTrigger: {
          trigger: headingGroupRef.current,
          start: 'top 85%',
          once: true,
        },
      });

      headingTl
        .to(eyebrowEl, {
          opacity: 1,
          y: '0rem',
          duration: 0.45,
          ease: 'power3.out',
        })
        .to(
          titleEl,
          {
            opacity: 1,
            y: '0rem',
            duration: 0.55,
            ease: 'back.out(1.3)',
          },
          '-=0.28'
        )
        .to(
          descEl,
          {
            opacity: 1,
            y: '0rem',
            duration: 0.48,
            ease: 'power3.out',
          },
          '-=0.32'
        );

      // 2. Connected Comic Page Frame Reveal (keeps all panel borders connected without gaps)
      if (comicPageEl) {
        gsap.fromTo(
          comicPageEl,
          {
            opacity: 0,
            y: '2rem',
          },
          {
            opacity: 1,
            y: '0rem',
            duration: 0.6,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: comicPageEl,
              start: 'top 86%',
              once: true,
            },
          }
        );
      }

      // 3. Row-by-Row Internal Content & Sound-Effect Sticker Reveal
      const rowConfigs = [
        { rowEl: row1Ref.current, stickerEl: popEl },
        { rowEl: row2Ref.current, stickerEl: null },
        { rowEl: row3Ref.current, stickerEl: crunchEl },
      ];

      rowConfigs.forEach(({ rowEl, stickerEl }) => {
        if (!rowEl) return;

        const copyEls =
          rowEl.querySelectorAll<HTMLElement>('[data-panel-copy]');
        const stageEls =
          rowEl.querySelectorAll<HTMLElement>('[data-panel-stage]');

        gsap.set(copyEls, {
          opacity: 0,
          y: '1.75rem',
        });

        gsap.set(stageEls, {
          opacity: 0,
          y: '2.5rem',
          scale: 0.92,
        });

        if (stickerEl) {
          gsap.set(stickerEl, {
            opacity: 0,
            scale: 0.35,
          });
        }

        const rowTl = gsap.timeline({
          scrollTrigger: {
            trigger: rowEl,
            start: 'top 84%',
            once: true,
          },
        });

        rowTl
          .to(copyEls, {
            opacity: 1,
            y: '0rem',
            duration: 0.58,
            stagger: 0.12,
            ease: 'power3.out',
          })
          .to(
            stageEls,
            {
              opacity: 1,
              y: '0rem',
              scale: 1,
              duration: 0.72,
              stagger: 0.12,
              ease: 'back.out(1.35)',
            },
            '-=0.44'
          );

        if (stickerEl) {
          rowTl.to(
            stickerEl,
            {
              opacity: 1,
              scale: 1,
              duration: 0.5,
              ease: 'back.out(2.1)',
            },
            '-=0.38'
          );
        }
      });
    }, sectionRef);

    // Ensure ScrollTrigger positions account for the preceding pinned video section
    const refreshTimer = window.setTimeout(() => {
      ScrollTrigger.refresh();
    }, 60);

    return () => {
      window.clearTimeout(refreshTimer);
      ctx.revert();
    };
  }, []);

  return (
    <section
      id="flavourverse"
      ref={sectionRef}
      aria-labelledby="flavourverse-heading"
      className="relative z-20 w-full bg-transparent text-cocoa-brown -mt-[42vh] sm:-mt-[44vh] lg:-mt-[45vh] pt-2 sm:pt-3 lg:pt-4 pb-20 sm:pb-24 lg:pb-28 px-4 sm:px-6 lg:px-10 overflow-hidden"
    >
      <div className="relative z-10 w-full max-w-[84rem] mx-auto">
        {/* ===================================================================
            CENTRED SECTION HEADING GROUP
            =================================================================== */}
        <div
          ref={headingGroupRef}
          className="max-w-[44rem] mx-auto text-center mb-8 sm:mb-10 lg:mb-14"
        >
          {/* Small Eyebrow Label */}
          <PoprioEditableElement elementId="flavourverse.eyebrow" type="text" label="Flavourverse Eyebrow">
            <p
              ref={eyebrowRef}
              className="m-0 font-jakarta text-[0.875rem] font-extrabold tracking-[0.16em] text-red-orange uppercase"
            >
              {flavourverse?.eyebrow || 'WELCOME TO THE FLAVOURVERSE'}
            </p>
          </PoprioEditableElement>

          {/* Main Heading */}
          <PoprioEditableElement elementId="flavourverse.title" type="text" label="Flavourverse Title">
            <h2
              id="flavourverse-heading"
              ref={titleRef}
              className="m-0 mt-3 font-hero text-3xl sm:text-4xl lg:text-[clamp(2.75rem,4.6vw,4.25rem)] leading-tight lg:leading-[1.02] tracking-[-0.015em] text-cocoa-brown uppercase"
            >
              {flavourverse?.title || 'PICK YOUR POP!'}
            </h2>
          </PoprioEditableElement>

          {/* Supporting Text */}
          <PoprioEditableElement elementId="flavourverse.subtitle" type="text" label="Flavourverse Subtitle">
            <p
              ref={descriptionRef}
              className="m-0 mt-2 sm:mt-3.5 font-jakarta text-sm sm:text-base lg:text-[clamp(1.0625rem,1.35vw,1.25rem)] font-bold leading-relaxed text-cocoa-brown/80"
            >
              {flavourverse?.subtitle || 'Five bold flavours. A whole lot of personality.'}
            </p>
          </PoprioEditableElement>
        </div>

        {/* ===================================================================
            CONNECTED COMIC-BOOK PAGE FRAME (ZERO INTERNAL GAPS)
            =================================================================== */}
        <div
          ref={comicPageRef}
          role="region"
          aria-label="POPRIO gourmet popcorn comic-book flavour showcase"
          className="relative w-full border-[0.3125rem] border-solid border-cocoa-brown rounded-[1.125rem] bg-cocoa-brown overflow-hidden"
          style={{
            boxShadow: '0.5rem 0.5rem 0 #4B1F0F',
          }}
        >
          {/* =================================================================
              ROW 1: STRAWBERRY (2 COLS) + CARAMEL (1 COL)
              Shared bottom Cocoa Brown divider + subtle angled diagonal divider
              ================================================================= */}
          <div
            ref={row1Ref}
            className="relative grid grid-cols-1 lg:grid-cols-3 gap-0 border-b-[0.25rem] border-solid border-cocoa-brown"
          >
            {row1Cards.map((card, idx) => (
              <div
                key={card.id}
                className={`${
                  card.colSpan === 2
                    ? 'col-span-1 lg:col-span-2'
                    : 'col-span-1 lg:col-span-1'
                } ${
                  idx === 0
                    ? 'border-b-[0.25rem] lg:border-b-0 border-solid border-cocoa-brown'
                    : ''
                }`}
              >
                <FlavourBentoCard card={card} />
              </div>
            ))}

            {/* Desktop Subtle Angled Comic Divider Between Strawberry (#F5A7BE) & Caramel (#D78A24) */}
            <svg
              aria-hidden="true"
              viewBox="0 0 44 100"
              preserveAspectRatio="none"
              className="pointer-events-none hidden lg:block absolute top-0 bottom-0 left-[66.6667%] -translate-x-1/2 w-[2.75rem] h-full z-20"
            >
              {/* Left Fill matching Strawberry Panel (#F5A7BE) */}
              <polygon points="0,0 35,0 9,100 0,100" fill="#F5A7BE" />
              {/* Right Fill matching Caramel Panel (#D78A24) */}
              <polygon points="35,0 44,0 44,100 9,100" fill="#D78A24" />
              {/* Inked 4px (0.25rem) Cocoa Brown Diagonal Divider Line */}
              <line
                x1="35"
                y1="0"
                x2="9"
                y2="100"
                stroke="#4B1F0F"
                strokeWidth="4"
                vectorEffect="non-scaling-stroke"
              />
            </svg>

            {/* Decorative Sound Effect 1: POP! at the Strawberry / Caramel boundary */}
            <ComicPopSticker stickerRef={popStickerRef} />
          </div>

          {/* =================================================================
              ROW 2: CHOCO HAZELNUT (1 COL) + COOKIES & CREAM (2 COLS)
              Shared bottom Cocoa Brown divider + subtle angled diagonal divider
              ================================================================= */}
          <div
            ref={row2Ref}
            className="relative grid grid-cols-1 lg:grid-cols-3 gap-0 border-b-[0.25rem] border-solid border-cocoa-brown"
          >
            {row2Cards.map((card, idx) => (
              <div
                key={card.id}
                className={`${
                  card.colSpan === 2
                    ? 'col-span-1 lg:col-span-2'
                    : 'col-span-1 lg:col-span-1'
                } ${
                  idx === 0
                    ? 'border-b-[0.25rem] lg:border-b-0 border-solid border-cocoa-brown'
                    : ''
                }`}
              >
                <FlavourBentoCard card={card} />
              </div>
            ))}

            {/* Desktop Subtle Angled Comic Divider Between Choco Hazelnut (#6B2D16) & Cookies & Cream (#F3DEC8) */}
            <svg
              aria-hidden="true"
              viewBox="0 0 44 100"
              preserveAspectRatio="none"
              className="pointer-events-none hidden lg:block absolute top-0 bottom-0 left-[33.3333%] -translate-x-1/2 w-[2.75rem] h-full z-20"
            >
              {/* Left Fill matching Choco Hazelnut Panel (#6B2D16) */}
              <polygon points="0,0 9,0 35,100 0,100" fill="#6B2D16" />
              {/* Right Fill matching Cookies & Cream Panel (#F3DEC8) */}
              <polygon points="9,0 44,0 44,100 35,100" fill="#F3DEC8" />
              {/* Inked 4px (0.25rem) Cocoa Brown Diagonal Divider Line */}
              <line
                x1="9"
                y1="0"
                x2="35"
                y2="100"
                stroke="#4B1F0F"
                strokeWidth="4"
                vectorEffect="non-scaling-stroke"
              />
            </svg>
          </div>

          {/* =================================================================
              ROW 3: CHOCOLATE PEANUT CARAMEL (FULL 3-COLUMN CLOSING PANEL)
              ================================================================= */}
          <div ref={row3Ref} className="relative w-full">
            {row3Cards.map((card) => (
              <div key={card.id} className="w-full">
                <FlavourBentoCard card={card} />
              </div>
            ))}

            {/* Decorative Sound Effect 2: CRUNCH! on the boundary between Cookies & Cream and Row 3 */}
            <ComicCrunchSticker stickerRef={crunchStickerRef} />
          </div>
        </div>
      </div>
    </section>
  );
};
