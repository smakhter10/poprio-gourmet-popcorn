import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ORIGIN_STORY_ASSETS } from '../../data/originStoryData';

gsap.registerPlugin(ScrollTrigger);

interface MascotPoseItem {
  id: string;
  src: string;
  alt: string;
  caption: string;
  accentBg: string;
}

const MASCOT_POSES: readonly MascotPoseItem[] = [
  {
    id: 'celebration',
    src: ORIGIN_STORY_ASSETS.scene4.mascotCelebration.src,
    alt: ORIGIN_STORY_ASSETS.scene4.mascotCelebration.alt,
    caption: 'MOOD 01 · READY TO PARTY',
    accentBg: 'var(--color-butter-yellow)',
  },
  {
    id: 'eureka',
    src: ORIGIN_STORY_ASSETS.scene2.mascotEureka.src,
    alt: ORIGIN_STORY_ASSETS.scene2.mascotEureka.alt,
    caption: 'MOOD 02 · FLAVOUR EUREKA!',
    accentBg: 'var(--color-accent-pink)',
  },
  {
    id: 'thinking',
    src: ORIGIN_STORY_ASSETS.scene2.mascotThinking.src,
    alt: ORIGIN_STORY_ASSETS.scene2.mascotThinking.alt,
    caption: 'MOOD 03 · PLOTTING THE CRUNCH',
    accentBg: 'var(--color-light-cocoa)',
  },
  {
    id: 'pointing',
    src: ORIGIN_STORY_ASSETS.scene5.mascotPointing.src,
    alt: ORIGIN_STORY_ASSETS.scene5.mascotPointing.alt,
    caption: 'MOOD 04 · YOUR TURN TO POP',
    accentBg: 'var(--color-caramel)',
  },
] as const;

export const AboutStorySection: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const leftColRef = useRef<HTMLDivElement>(null);
  const rightColRef = useRef<HTMLDivElement>(null);
  const mascotImageRefs = useRef<(HTMLImageElement | null)[]>([]);

  const [activePoseIndex, setActivePoseIndex] = useState<number>(0);

  // Preload mascot images for seamless crossfades
  useEffect(() => {
    MASCOT_POSES.forEach((pose) => {
      const img = new Image();
      img.src = pose.src;
    });
  }, []);

  // Auto-advance mascot pose every 3.2 seconds
  useEffect(() => {
    const intervalId = window.setInterval(() => {
      setActivePoseIndex((prev) => (prev + 1) % MASCOT_POSES.length);
    }, 3200);

    return () => {
      window.clearInterval(intervalId);
    };
  }, []);

  // Smooth GSAP transition whenever activePoseIndex changes
  useEffect(() => {
    const prefersReducedMotion =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    mascotImageRefs.current.forEach((imgEl, idx) => {
      if (!imgEl) return;
      const isCurrent = idx === activePoseIndex;

      if (prefersReducedMotion) {
        gsap.set(imgEl, {
          opacity: isCurrent ? 1 : 0,
          scale: 1,
          y: 0,
          rotation: 0,
        });
        return;
      }

      if (isCurrent) {
        gsap.fromTo(
          imgEl,
          {
            opacity: 0,
            scale: 0.88,
            y: 14,
            rotation: -4,
          },
          {
            opacity: 1,
            scale: 1,
            y: 0,
            rotation: 0,
            duration: 0.65,
            ease: 'back.out(1.4)',
            overwrite: 'auto',
          }
        );
      } else {
        gsap.to(imgEl, {
          opacity: 0,
          scale: 0.92,
          y: -10,
          rotation: 3,
          duration: 0.45,
          ease: 'power2.out',
          overwrite: 'auto',
        });
      }
    });
  }, [activePoseIndex]);

  // Entrance scroll reveal animation
  useEffect(() => {
    const sectionEl = sectionRef.current;
    const leftEl = leftColRef.current;
    const rightEl = rightColRef.current;
    if (!sectionEl || !leftEl || !rightEl) return;

    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;

    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        leftEl,
        { opacity: 0, x: -28, rotate: -1.5 },
        {
          opacity: 1,
          x: 0,
          rotate: 0,
          duration: 0.65,
          ease: 'back.out(1.3)',
          scrollTrigger: {
            trigger: sectionEl,
            start: 'top 80%',
            once: true,
          },
        }
      );

      gsap.fromTo(
        rightEl,
        { opacity: 0, y: 24 },
        {
          opacity: 1,
          y: 0,
          duration: 0.65,
          delay: 0.12,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionEl,
            start: 'top 80%',
            once: true,
          },
        }
      );
    }, sectionRef);

    return () => {
      ctx.revert();
    };
  }, []);

  const currentPose = MASCOT_POSES[activePoseIndex] ?? MASCOT_POSES[0];

  return (
    <section
      id="about-us-story"
      ref={sectionRef}
      aria-labelledby="about-story-heading"
      className="relative z-20 w-full max-w-[84rem] mx-auto px-4 sm:px-6 lg:px-10 py-14 sm:py-20 lg:py-28 text-cocoa-brown"
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-10 lg:gap-14 items-center">
        {/* ===================================================================
            LEFT SIDE: AUTO-TRANSITIONING MASCOT COMIC SHOWCASE STAGE
            =================================================================== */}
        <div
          ref={leftColRef}
          className="lg:col-span-5 flex flex-col items-center"
        >
          <div
            className="relative w-full max-w-[26rem] lg:max-w-none aspect-[4/4.3] rounded-[1.5rem] sm:rounded-[2rem] border-[0.22rem] sm:border-[0.28rem] border-solid border-cocoa-brown overflow-hidden flex flex-col items-center justify-between p-5 sm:p-7 transition-colors duration-500"
            style={{
              backgroundColor: currentPose.accentBg,
              boxShadow: '0.375rem 0.375rem 0 #4B1F0F',
            }}
          >
            {/* Subtle Comic Halftone Dots Layer */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 opacity-[0.1]"
              style={{
                backgroundImage:
                  'radial-gradient(#4B1F0F 1.75px, transparent 1.75px)',
                backgroundSize: '18px 18px',
              }}
            />

            {/* Soft Radial Comic Sunburst Rays */}
            <svg
              aria-hidden="true"
              viewBox="0 0 400 400"
              className="pointer-events-none absolute inset-0 w-full h-full opacity-[0.14]"
            >
              <g stroke="#4B1F0F" strokeWidth="2">
                <line x1="200" y1="200" x2="0" y2="0" />
                <line x1="200" y1="200" x2="200" y2="0" />
                <line x1="200" y1="200" x2="400" y2="0" />
                <line x1="200" y1="200" x2="400" y2="200" />
                <line x1="200" y1="200" x2="400" y2="400" />
                <line x1="200" y1="200" x2="200" y2="400" />
                <line x1="200" y1="200" x2="0" y2="400" />
                <line x1="200" y1="200" x2="0" y2="200" />
              </g>
            </svg>

            {/* Top Comic Header Pill inside Mascot Card */}
            <div className="relative z-20 w-full flex items-center justify-between gap-2">
              <span className="inline-flex items-center px-3 py-1 rounded-full bg-warm-cream text-cocoa-brown border-[0.14rem] border-cocoa-brown font-jakarta text-[0.65rem] sm:text-xs font-extrabold tracking-[0.12em] uppercase shadow-[0.125rem_0.125rem_0_#4B1F0F]">
                {currentPose.caption}
              </span>

              <span className="font-comic text-sm sm:text-base tracking-wider text-cocoa-brown uppercase px-2.5 py-0.5 rounded-full bg-warm-cream/90 border-[0.125rem] border-cocoa-brown">
                0{activePoseIndex + 1} / 0{MASCOT_POSES.length}
              </span>
            </div>

            {/* Stacked Mascot Poses with Smooth Auto-Transition */}
            <div className="relative z-10 w-full flex-1 flex items-center justify-center my-2">
              {MASCOT_POSES.map((pose, idx) => (
                <img
                  key={pose.id}
                  ref={(el) => {
                    mascotImageRefs.current[idx] = el;
                  }}
                  src={pose.src}
                  alt={pose.alt}
                  draggable={false}
                  className="absolute w-[78%] h-[86%] object-contain drop-shadow-[0_10px_0_rgba(75,31,15,0.28)] select-none pointer-events-none"
                  style={{
                    opacity: idx === 0 ? 1 : 0,
                  }}
                />
              ))}
            </div>

            {/* Bottom Pose Indicator Dots */}
            <div className="relative z-20 flex items-center justify-center gap-2 pt-1">
              {MASCOT_POSES.map((pose, idx) => (
                <button
                  key={pose.id}
                  type="button"
                  onClick={() => setActivePoseIndex(idx)}
                  aria-label={`Show mascot pose ${idx + 1}: ${pose.caption}`}
                  className={`h-2.5 rounded-full border-[0.125rem] border-cocoa-brown transition-all duration-300 cursor-pointer ${
                    idx === activePoseIndex
                      ? 'w-7 bg-red-orange'
                      : 'w-2.5 bg-warm-cream hover:bg-butter-yellow'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* ===================================================================
            RIGHT SIDE: TITLE & 3-PARAGRAPH BRAND STORY
            =================================================================== */}
        <div
          ref={rightColRef}
          className="lg:col-span-7 flex flex-col items-start text-left"
        >
          {/* Small Eyebrow Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-butter-yellow border-[0.15rem] border-cocoa-brown shadow-[0.15rem_0.15rem_0_#4B1F0F]">
            <span className="font-jakarta text-[0.6875rem] sm:text-xs font-extrabold tracking-[0.14em] text-cocoa-brown uppercase">
              OUR STORY <span className="text-red-orange mx-1">✦</span> BORN IN DHAKA
            </span>
          </div>

          {/* Main Section Heading */}
          <h1
            id="about-story-heading"
            className="m-0 mt-4 sm:mt-5 font-hero text-2xl sm:text-4xl lg:text-[clamp(2.5rem,4.2vw,3.75rem)] leading-[1.06] tracking-[-0.02em] text-cocoa-brown uppercase"
          >
            WE DIDN&apos;T JUST MAKE POPCORN.{' '}
            <span className="text-red-orange">
              WE STARTED A CRUNCH REVOLUTION.
            </span>
          </h1>

          {/* Comic Inked Underline Accent */}
          <svg
            aria-hidden="true"
            viewBox="0 0 320 16"
            className="w-40 sm:w-56 h-3.5 mt-2.5 overflow-visible"
          >
            <path
              d="M4 11 Q 160 3 316 10"
              fill="none"
              stroke="#E0351B"
              strokeWidth="5.5"
              strokeLinecap="round"
            />
            <path
              d="M14 14 Q 160 8 304 13"
              fill="none"
              stroke="#4B1F0F"
              strokeWidth="3"
              strokeLinecap="round"
            />
          </svg>

          {/* 3-Paragraph Long About Us Copy */}
          <div className="mt-5 sm:mt-6 flex flex-col gap-4 sm:gap-5 font-jakarta text-sm sm:text-base lg:text-[1.0625rem] font-semibold leading-relaxed text-cocoa-brown/90">
            <p className="m-0">
              Born in the heart of Dhaka, <strong className="font-extrabold text-cocoa-brown">POPRIO</strong> started with a simple, stubborn question: why was everyone settling for lifeless, cardboard-tasting popcorn? We believed snack time deserved genuine excitement — the kind of bold, unapologetic flavour that makes you pause mid-crunch and reach straight back into the bag.
            </p>

            <p className="m-0">
              Every single pouch of POPRIO is crafted in small batches using giant, cloud-like mushroom kernels popped to airy perfection. From slow-simmered golden caramel and real creamery butter to crushed dark cocoa cookies, tangy strawberry glazes, and roasted hazelnuts, we layer real, indulgent ingredients until every kernel is coated with main-character energy.
            </p>

            <p className="m-0">
              Whether you&apos;re queuing up a late-night movie marathon, sharing a pouch with friends across town, or satisfying a midnight sweet-and-salty craving, POPRIO is built to bring colour, playfulness, and an unforgettable crunch to every moment. No boring kernels. No compromises. Just flavour that pops.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
