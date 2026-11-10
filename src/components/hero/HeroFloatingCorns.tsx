import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface FloatingCornItem {
  id: string;
  src: string;
  alt: string;
  side: 'left' | 'right';
  depth: 'closer' | 'farther';
  /** Positioning styles on the hero canvas */
  positionStyle: React.CSSProperties;
  /** Responsive width classes (bigger for closer, smaller for farther) */
  sizeClass: string;
  /** CSS filter & opacity for depth-of-field effect */
  depthClass: string;
  /** Initial rotation angle in degrees */
  initialRotation: number;
  /** Vertical parallax travel distance on scroll (px) */
  parallaxY: number;
  /** Rotational shift during scroll (deg) */
  parallaxRotation: number;
  /** Idle floating bob amplitude (px) and duration (s) */
  floatAmplitude: number;
  floatDuration: number;
}

const FLOATING_CORN_ITEMS: readonly FloatingCornItem[] = [
  {
    id: 'corn-left-closer',
    src: '/assets/floating-corns/Caramel%20Drizzled%20Popcorn%20Cluster-2.png',
    alt: '',
    side: 'left',
    depth: 'closer',
    positionStyle: { left: '3.5%', top: '20%' },
    sizeClass: 'w-14 sm:w-20 md:w-[clamp(7.25rem,10.25vw,11rem)]',
    depthClass: 'z-0 sm:z-20 opacity-40 sm:opacity-100 drop-shadow-[0_10px_0_rgba(75,31,15,0.22)]',
    initialRotation: -15,
    parallaxY: -195,
    parallaxRotation: 18,
    floatAmplitude: 10,
    floatDuration: 3.4,
  },
  {
    id: 'corn-left-farther',
    src: '/assets/floating-corns/Gourmet%20Golden%20Popcorn%20Cluster.png',
    alt: '',
    side: 'left',
    depth: 'farther',
    positionStyle: { left: '9.5%', top: '54%' },
    sizeClass: 'w-[clamp(4.25rem,5.75vw,6.25rem)]',
    depthClass: 'z-0 blur-[3.5px] opacity-85',
    initialRotation: 18,
    parallaxY: -75,
    parallaxRotation: -12,
    floatAmplitude: 6,
    floatDuration: 4.2,
  },
  {
    id: 'corn-right-closer',
    src: '/assets/floating-corns/Chocolate%20Drizzled%20Cookie%20Popcorn%20Cluster-1.png',
    alt: '',
    side: 'right',
    depth: 'closer',
    positionStyle: { right: '3.5%', top: '24%' },
    sizeClass: 'w-14 sm:w-20 md:w-[clamp(7rem,9.75vw,10.5rem)]',
    depthClass: 'z-0 sm:z-20 opacity-40 sm:opacity-100 drop-shadow-[0_10px_0_rgba(75,31,15,0.22)]',
    initialRotation: 14,
    parallaxY: -180,
    parallaxRotation: -16,
    floatAmplitude: 11,
    floatDuration: 3.7,
  },
  {
    id: 'corn-right-farther',
    src: '/assets/floating-corns/Chocolate-Drizzled%20Gourmet%20Popcorn%20Cluster.png',
    alt: '',
    side: 'right',
    depth: 'farther',
    positionStyle: { right: '9.5%', top: '57%' },
    sizeClass: 'w-[clamp(4rem,5.5vw,6rem)]',
    depthClass: 'z-0 blur-[4px] opacity-85',
    initialRotation: -20,
    parallaxY: -65,
    parallaxRotation: 14,
    floatAmplitude: 6,
    floatDuration: 4.5,
  },
] as const;

export const HeroFloatingCorns: React.FC = () => {
  const layerRef = useRef<HTMLDivElement>(null);
  const parallaxRefs = useRef<(HTMLDivElement | null)[]>([]);
  const floatRefs = useRef<(HTMLImageElement | null)[]>([]);

  useEffect(() => {
    const layerEl = layerRef.current;
    if (!layerEl) return;

    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;

    const ctx = gsap.context(() => {
      FLOATING_CORN_ITEMS.forEach((item, index) => {
        const parallaxEl = parallaxRefs.current[index];
        const floatEl = floatRefs.current[index];
        if (!parallaxEl || !floatEl) return;

        gsap.set(parallaxEl, {
          y: 0,
          rotation: item.initialRotation,
          force3D: true,
        });

        if (prefersReducedMotion) return;

        // Subtle continuous floating motion on the inner image
        gsap.to(floatEl, {
          y: item.floatAmplitude,
          rotation: index % 2 === 0 ? 4 : -4,
          duration: item.floatDuration,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
        });

        // Scroll-driven depth parallax on the outer wrapper
        gsap.to(parallaxEl, {
          y: item.parallaxY,
          rotation: item.initialRotation + item.parallaxRotation,
          ease: 'none',
          scrollTrigger: {
            trigger: layerEl,
            start: 'top top',
            end: 'bottom top',
            scrub: 0.65,
          },
        });
      });
    }, layerRef);

    return () => {
      ctx.revert();
    };
  }, []);

  return (
    <div
      ref={layerRef}
      aria-hidden="true"
      role="presentation"
      className="absolute inset-0 w-full h-full pointer-events-none select-none overflow-hidden"
    >
      {FLOATING_CORN_ITEMS.map((item, index) => (
        <div
          key={item.id}
          ref={(el) => {
            parallaxRefs.current[index] = el;
          }}
          style={item.positionStyle}
          className={`absolute will-change-transform ${item.sizeClass} ${item.depthClass}`}
        >
          <img
            ref={(el) => {
              floatRefs.current[index] = el;
            }}
            src={item.src}
            alt={item.alt}
            draggable={false}
            className="w-full h-auto block object-contain select-none pointer-events-none will-change-transform"
          />
        </div>
      ))}
    </div>
  );
};
