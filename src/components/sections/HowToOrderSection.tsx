import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  getWhatsAppOrderUrl,
  WHATSAPP_NUMBER,
} from '../../config/site';
import { OrderingStep, OrderingStepData } from './OrderingStep';
import { getAssetUrl } from '../../lib/assets';

gsap.registerPlugin(ScrollTrigger);

export const HOW_TO_ORDER_VIDEO_SRC = getAssetUrl('/assets/videos/how-it-works.mp4');
export const HOW_TO_ORDER_MOBILE_VIDEO_SRC =
  getAssetUrl('/assets/videos/POPRIO-How-To-Order-10s-Loop-1080x1920-Mobile.mp4');

export const HOW_TO_ORDER_PREFILLED_MESSAGE =
  "Hi POPRIO! I'd like to place an order.";

export const ORDERING_STEPS: readonly OrderingStepData[] = [
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
] as const;

function WhatsAppOrderIcon({
  className = 'w-4.5 h-4.5 sm:w-5 sm:h-5 md:w-6 md:h-6 shrink-0 fill-current',
}: {
  className?: string;
}) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      aria-hidden="true"
      focusable="false"
    >
      <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91C2.13 13.66 2.59 15.36 3.45 16.86L2.05 22L7.3 20.62C8.75 21.41 10.38 21.83 12.04 21.83C17.5 21.83 21.95 17.38 21.95 11.92C21.95 9.27 20.92 6.78 19.05 4.91C17.18 3.03 14.69 2 12.04 2ZM12.05 3.67C14.25 3.67 16.31 4.53 17.87 6.09C19.42 7.65 20.28 9.72 20.28 11.92C20.28 16.46 16.58 20.15 12.04 20.15C10.56 20.15 9.11 19.76 7.85 19L7.55 18.83L4.43 19.65L5.26 16.61L5.06 16.29C4.24 14.98 3.8 13.47 3.8 11.91C3.81 7.37 7.5 3.67 12.05 3.67ZM8.53 7.33C8.37 7.33 8.1 7.39 7.87 7.64C7.65 7.89 7 8.5 7 9.71C7 10.93 7.89 12.1 8.01 12.27C8.14 12.44 9.76 14.94 12.25 16.01C14.34 16.92 14.76 16.74 15.21 16.7C15.66 16.66 16.68 16.09 16.89 15.51C17.1 14.92 17.1 14.42 17.04 14.31C16.97 14.2 16.81 14.14 16.56 14.01C16.31 13.89 15.09 13.28 14.87 13.2C14.64 13.11 14.48 13.07 14.31 13.32C14.15 13.57 13.67 14.14 13.53 14.31C13.38 14.48 13.24 14.5 12.99 14.37C12.74 14.25 11.94 13.98 11 13.14C10.26 12.48 9.77 11.67 9.62 11.42C9.48 11.17 9.6 11.04 9.73 10.92C9.84 10.81 9.98 10.62 10.1 10.48C10.23 10.33 10.27 10.23 10.35 10.06C10.43 9.89 10.39 9.75 10.33 9.62C10.27 9.5 9.77 8.28 9.56 7.78C9.36 7.29 9.16 7.35 9.01 7.34C8.86 7.33 8.7 7.33 8.53 7.33Z" />
    </svg>
  );
}

export const HowToOrderSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const headingGroupRef = useRef<HTMLDivElement>(null);
  const eyebrowRef = useRef<HTMLParagraphElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const descriptionRef = useRef<HTMLParagraphElement>(null);
  const videoElRef = useRef<HTMLVideoElement>(null);
  const stepsGroupRef = useRef<HTMLDivElement>(null);
  const stepItemRefs = useRef<(HTMLDivElement | null)[]>([]);
  const ctaWrapRef = useRef<HTMLDivElement>(null);

  const whatsappUrl = getWhatsAppOrderUrl(
    WHATSAPP_NUMBER,
    HOW_TO_ORDER_PREFILLED_MESSAGE
  );

  const [isMobile, setIsMobile] = useState<boolean>(() => {
    if (typeof window === 'undefined') return false;
    return window.matchMedia('(max-width: 768px)').matches;
  });

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const mql = window.matchMedia('(max-width: 768px)');
    const onChange = (e: MediaQueryListEvent) => {
      setIsMobile(e.matches);
    };
    mql.addEventListener('change', onChange);
    return () => mql.removeEventListener('change', onChange);
  }, []);

  const activeVideoSrc = isMobile
    ? HOW_TO_ORDER_MOBILE_VIDEO_SRC
    : HOW_TO_ORDER_VIDEO_SRC;

  // Viewport & tab visibility playback optimization + reduced-motion handling
  useEffect(() => {
    const videoEl = videoElRef.current;
    if (!videoEl) return;

    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    let isIntersecting = false;

    const syncPlayback = () => {
      if (mediaQuery.matches || document.hidden || !isIntersecting) {
        if (!videoEl.paused) {
          videoEl.pause();
        }
      } else {
        const playPromise = videoEl.play();
        if (playPromise !== undefined) {
          playPromise.catch(() => {
            // Autoplay blocked by browser policy; remain muted and stationary
          });
        }
      }
    };

    if (mediaQuery.matches) {
      videoEl.pause();
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (!entry) return;
        isIntersecting = entry.isIntersecting;
        syncPlayback();
      },
      { threshold: 0.15 }
    );

    observer.observe(videoEl);

    const handleVisibilityChange = () => {
      syncPlayback();
    };

    const handleMotionChange = () => {
      syncPlayback();
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    mediaQuery.addEventListener('change', handleMotionChange);

    return () => {
      observer.disconnect();
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      mediaQuery.removeEventListener('change', handleMotionChange);
    };
  }, [activeVideoSrc]);

  // Subtle surrounding content entrance animations (video itself is never scroll-scrubbed)
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
      const stepEls = stepItemRefs.current.filter(
        (el): el is HTMLDivElement => el !== null
      );
      const ctaEl = ctaWrapRef.current;

      if (prefersReducedMotion) {
        gsap.set([eyebrowEl, titleEl, descEl, ...stepEls, ctaEl], {
          opacity: 1,
          y: 0,
        });
        return;
      }

      // 1. Heading Group Subtle Reveal
      gsap.set([eyebrowEl, titleEl, descEl], {
        opacity: 0,
        y: '1.25rem',
      });

      const headingTl = gsap.timeline({
        scrollTrigger: {
          trigger: headingGroupRef.current,
          start: 'top 86%',
          once: true,
        },
      });

      headingTl
        .to(eyebrowEl, {
          opacity: 1,
          y: '0rem',
          duration: 0.42,
          ease: 'power3.out',
        })
        .to(
          titleEl,
          {
            opacity: 1,
            y: '0rem',
            duration: 0.5,
            ease: 'back.out(1.25)',
          },
          '-=0.26'
        )
        .to(
          descEl,
          {
            opacity: 1,
            y: '0rem',
            duration: 0.45,
            ease: 'power3.out',
          },
          '-=0.3'
        );

      // 2. Three Steps + Primary WhatsApp CTA Subtle Staggered Reveal
      gsap.set(stepEls, {
        opacity: 0,
        y: '1.5rem',
      });
      gsap.set(ctaEl, {
        opacity: 0,
        y: '1.25rem',
      });

      const stepsTl = gsap.timeline({
        scrollTrigger: {
          trigger: stepsGroupRef.current,
          start: 'top 88%',
          once: true,
        },
      });

      stepsTl
        .to(stepEls, {
          opacity: 1,
          y: '0rem',
          duration: 0.48,
          stagger: 0.12,
          ease: 'back.out(1.3)',
        })
        .to(
          ctaEl,
          {
            opacity: 1,
            y: '0rem',
            duration: 0.45,
            ease: 'back.out(1.4)',
          },
          '-=0.2'
        );
    }, sectionRef);

    return () => {
      ctx.revert();
    };
  }, []);

  return (
    <section
      id="how-to-order"
      ref={sectionRef}
      aria-labelledby="how-to-order-heading"
      className="relative w-full bg-[#FFC72C] text-cocoa-brown py-12 sm:py-18 md:py-24 lg:py-32 px-4 sm:px-6 lg:px-10 overflow-x-hidden"
    >
      <div className="w-full max-w-[84rem] mx-auto flex flex-col items-center">
        {/* ===================================================================
            A, B, C: HEADING GROUP (Eyebrow + Main Heading + Description)
            =================================================================== */}
        <div
          ref={headingGroupRef}
          className="max-w-[52rem] mx-auto text-center"
        >
          {/* A. Small Eyebrow Label */}
          <p
            ref={eyebrowRef}
            className="m-0 font-jakarta text-xs sm:text-[0.875rem] font-extrabold tracking-[0.16em] text-red-orange uppercase"
          >
            IT&apos;S EASY AS 1, 2, POP!
          </p>

          {/* B. Large Heading */}
          <h2
            id="how-to-order-heading"
            ref={titleRef}
            className="m-0 mt-2 sm:mt-3 font-hero text-xl sm:text-3xl md:text-4xl lg:text-[clamp(2.5rem,4.6vw,4.5rem)] leading-tight lg:leading-[1.02] tracking-[-0.015em] text-cocoa-brown uppercase"
          >
            CRAVE IT. CHAT IT. CRUNCH IT.
          </h2>

          {/* C. Short Supporting Description */}
          <p
            ref={descriptionRef}
            className="m-0 mt-1.5 sm:mt-2.5 md:mt-3.5 font-jakarta text-xs sm:text-sm md:text-base lg:text-[clamp(1.0625rem,1.35vw,1.25rem)] font-bold leading-relaxed text-cocoa-brown/85"
          >
            Three simple steps to your next popcorn obsession.
          </p>
        </div>

        {/* ===================================================================
            D. WIDE (DESKTOP) / 9:16 VERTICAL (MOBILE) LOOPING ANIMATION
            Sits directly on #FFC72C with zero framing
            =================================================================== */}
        <div className="w-full max-w-[15.5rem] sm:max-w-[18.5rem] md:max-w-[78rem] mx-auto mt-6 sm:mt-8 md:mt-10 lg:mt-12 bg-[#FFC72C] flex items-center justify-center">
          <video
            ref={videoElRef}
            key={activeVideoSrc}
            src={activeVideoSrc}
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            aria-label="Animated guide showing how to choose a POPRIO flavour, message us on WhatsApp, and enjoy the popcorn."
            className="block w-full h-auto aspect-[9/16] md:aspect-auto object-contain bg-[#FFC72C] m-0 p-0 border-0 shadow-none rounded-none"
          >
            <source
              src={HOW_TO_ORDER_MOBILE_VIDEO_SRC}
              media="(max-width: 768px)"
              type="video/mp4"
            />
            <source src={HOW_TO_ORDER_VIDEO_SRC} type="video/mp4" />
          </video>
        </div>

        {/* ===================================================================
            E. THREE CONCISE ORDERING STEPS
            =================================================================== */}
        <div
          ref={stepsGroupRef}
          className="w-full max-w-[68rem] mx-auto mt-5 sm:mt-7 md:mt-8 lg:mt-10 grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 md:gap-8 lg:gap-10 items-start"
        >
          {ORDERING_STEPS.map((step, index) => (
            <OrderingStep
              key={step.stepNumber}
              ref={(el) => {
                stepItemRefs.current[index] = el;
              }}
              step={step}
              isLast={index === ORDERING_STEPS.length - 1}
            />
          ))}
        </div>

        {/* ===================================================================
            F. PRIMARY WHATSAPP CTA
            =================================================================== */}
        <div
          ref={ctaWrapRef}
          className="mt-6 sm:mt-8 md:mt-10 lg:mt-12 flex flex-col items-center text-center px-3"
        >
          {whatsappUrl ? (
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2.5 sm:gap-3 md:gap-3.5 px-6 sm:px-7 md:px-9 py-3 sm:py-3.5 md:py-4.5 rounded-[0.75rem] md:rounded-[0.875rem] bg-red-orange text-warm-cream border-[0.16rem] md:border-[0.22rem] border-solid border-cocoa-brown font-display text-sm sm:text-base md:text-[1.1875rem] tracking-[0.04em] uppercase cursor-pointer select-none shadow-[0.2rem_0.2rem_0_#4B1F0F] md:shadow-[0.3125rem_0.3125rem_0_#4B1F0F] transition-all duration-200 hover:-translate-y-1 hover:scale-[1.02] hover:shadow-[0.4375rem_0.4375rem_0_#4B1F0F] active:translate-y-0.5 active:scale-[0.99] active:shadow-[0.125rem_0.125rem_0_#4B1F0F]"
            >
              <WhatsAppOrderIcon className="w-4.5 h-4.5 sm:w-5 sm:h-5 md:w-6 md:h-6 shrink-0 fill-current" />
              <span>CHAT &amp; ORDER ON WHATSAPP</span>
            </a>
          ) : (
            <button
              type="button"
              disabled
              aria-disabled="true"
              className="inline-flex items-center justify-center gap-2.5 sm:gap-3 md:gap-3.5 px-6 sm:px-7 md:px-9 py-3 sm:py-3.5 md:py-4.5 rounded-[0.75rem] md:rounded-[0.875rem] bg-red-orange text-warm-cream border-[0.16rem] md:border-[0.22rem] border-solid border-cocoa-brown font-display text-sm sm:text-base md:text-[1.1875rem] tracking-[0.04em] uppercase opacity-90 cursor-not-allowed select-none shadow-[0.2rem_0.2rem_0_#4B1F0F] md:shadow-[0.3125rem_0.3125rem_0_#4B1F0F]"
            >
              <WhatsAppOrderIcon className="w-4.5 h-4.5 sm:w-5 sm:h-5 md:w-6 md:h-6 shrink-0 fill-current" />
              <span>CHAT &amp; ORDER ON WHATSAPP</span>
            </button>
          )}
        </div>
      </div>
    </section>
  );
};
