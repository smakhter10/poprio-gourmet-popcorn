import React, { useState, useRef, useEffect, useCallback } from 'react';
import gsap from 'gsap';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import {
  getPageLoadShuffledPackages,
  HERO_FAN_SLOTS,
  HeroPackageItem,
  HeroSlotConfig,
} from '../../data/heroPackages';
import { useProductModal } from '../../context/ProductModalContext';
import { usePoprioContent } from '../../context/PoprioContentContext';
import { PoprioEditableElement } from '../editor/PoprioEditableElement';

export const HeroPackageShowcase: React.FC = () => {
  const { hero } = usePoprioContent();

  // Initialized once per page load via Fisher–Yates shuffle; never reshuffled on re-render or modal open.
  const [shuffledPackages] = useState<readonly HeroPackageItem[]>(() =>
    getPageLoadShuffledPackages(hero?.packages?.length ? hero.packages : undefined)
  );

  const [mobileIndex, setMobileIndex] = useState<number>(0);
  const mobileCardRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const isInitialMount = useRef<boolean>(true);
  const touchStartX = useRef<number | null>(null);
  const touchStartY = useRef<number | null>(null);
  const isDragging = useRef<boolean>(false);
  const dragDeltaX = useRef<number>(0);
  const burstRef = useRef<SVGSVGElement | null>(null);

  const { selectedProductId, openProductModal } = useProductModal();

  const containerRef = useRef<HTMLDivElement>(null);
  const slotRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const getRootRemPx = useCallback(() => {
    if (typeof window === 'undefined') return 16;
    return (
      parseFloat(getComputedStyle(document.documentElement).fontSize) || 16
    );
  }, []);

  useEffect(() => {
    const containerEl = containerRef.current;
    if (!containerEl) return;

    const remPx = getRootRemPx();
    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;

    const ctx = gsap.context(() => {
      if (prefersReducedMotion) {
        HERO_FAN_SLOTS.forEach((slot, idx) => {
          const el = slotRefs.current[idx];
          if (!el) return;
          gsap.set(el, {
            opacity: 1,
            x: slot.offsetXRem * remPx,
            y: slot.offsetYRem * remPx,
            rotation: slot.rotation,
            scale: slot.scale,
            zIndex: slot.zIndex,
          });
        });
        return;
      }

      // Establish initial pre-reveal state for all 5 slots
      HERO_FAN_SLOTS.forEach((slot, idx) => {
        const el = slotRefs.current[idx];
        if (!el) return;
        gsap.set(el, {
          opacity: 0,
          x: slot.offsetXRem * remPx * 0.35,
          y: slot.offsetYRem * remPx + 88,
          rotation: slot.rotation * 0.3,
          scale: slot.scale * 0.72,
          zIndex: slot.zIndex,
          force3D: true,
        });
      });

      const tl = gsap.timeline();

      // Sort slots by revealStep so animation reveals strictly:
      // 1. Centre -> 2. Inner left -> 3. Inner right -> 4. Far left -> 5. Far right
      const slotsInRevealOrder = [...HERO_FAN_SLOTS].sort(
        (a, b) => a.revealStep - b.revealStep
      );

      slotsInRevealOrder.forEach((slot) => {
        const el = slotRefs.current[slot.slotIndex];
        if (!el) return;

        const startTime = 0.1 + slot.revealStep * 0.11;

        tl.to(
          el,
          {
            opacity: 1,
            x: slot.offsetXRem * remPx,
            y: slot.offsetYRem * remPx,
            rotation: slot.rotation,
            scale: slot.scale,
            duration: 0.72,
            ease: 'back.out(1.55)',
          },
          startTime
        );
      });
    }, containerRef);

    return () => {
      ctx.revert();
    };
  }, [getRootRemPx]);

  const handleSlotEnter = useCallback(
    (slot: HeroSlotConfig) => {
      const el = slotRefs.current[slot.slotIndex];
      if (!el) return;

      const prefersReducedMotion = window.matchMedia(
        '(prefers-reduced-motion: reduce)'
      ).matches;
      if (prefersReducedMotion) return;

      const remPx = getRootRemPx();

      // Bring hovered slot forward smoothly while preserving its positional character
      gsap.set(el, { zIndex: 50 });
      gsap.to(el, {
        x: slot.offsetXRem * remPx,
        y: (slot.offsetYRem - 1.45) * remPx,
        scale: slot.scale * 1.08,
        rotation: slot.rotation * 0.55,
        duration: 0.28,
        ease: 'power3.out',
        overwrite: 'auto',
      });
    },
    [getRootRemPx]
  );

  const handleSlotLeave = useCallback(
    (slot: HeroSlotConfig) => {
      const el = slotRefs.current[slot.slotIndex];
      if (!el) return;

      const prefersReducedMotion = window.matchMedia(
        '(prefers-reduced-motion: reduce)'
      ).matches;
      if (prefersReducedMotion) return;

      const remPx = getRootRemPx();

      gsap.set(el, { zIndex: slot.zIndex });
      gsap.to(el, {
        x: slot.offsetXRem * remPx,
        y: slot.offsetYRem * remPx,
        scale: slot.scale,
        rotation: slot.rotation,
        duration: 0.34,
        ease: 'power3.out',
        overwrite: 'auto',
      });
    },
    [getRootRemPx]
  );

  const handleOpenProductModal = (
    pkg: HeroPackageItem,
    slotIndex: number
  ) => {
    openProductModal(pkg.id, slotRefs.current[slotIndex]);
  };

  const getMobileDiff = (idx: number, current: number, total: number) => {
    let diff = idx - current;
    const half = Math.floor(total / 2);
    if (diff > half) diff -= total;
    if (diff < -half) diff += total;
    return diff;
  };

  const getCardBaseProps = useCallback((diff: number) => {
    // Dynamic offset matching mobile viewport width
    const winWidth = typeof window !== 'undefined' ? window.innerWidth : 375;
    const offsetPx = Math.min(Math.max(winWidth * 0.23, 76), 96);

    if (diff === 0) {
      return {
        x: 0,
        y: 0,
        scale: 1,
        rotation: 0,
        opacity: 1,
        zIndex: 20,
      };
    }
    if (diff === -1) {
      return {
        x: -offsetPx,
        y: 6,
        scale: 0.76,
        rotation: -7,
        opacity: 0.45,
        zIndex: 10,
      };
    }
    if (diff === 1) {
      return {
        x: offsetPx,
        y: 6,
        scale: 0.76,
        rotation: 7,
        opacity: 0.45,
        zIndex: 10,
      };
    }
    return {
      x: diff < 0 ? -offsetPx * 1.9 : offsetPx * 1.9,
      y: 14,
      scale: 0.5,
      rotation: diff < 0 ? -14 : 14,
      opacity: 0,
      zIndex: 2,
    };
  }, []);

  useEffect(() => {
    const total = shuffledPackages.length;
    if (total === 0) return;

    const prefersReducedMotion =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    mobileCardRefs.current.forEach((el, idx) => {
      if (!el) return;
      const diff = getMobileDiff(idx, mobileIndex, total);
      const props = getCardBaseProps(diff);

      if (isInitialMount.current || prefersReducedMotion) {
        gsap.set(el, {
          x: props.x,
          y: props.y,
          scale: props.scale,
          rotation: props.rotation,
          opacity: props.opacity,
          zIndex: props.zIndex,
          force3D: true,
        });
      } else {
        gsap.to(el, {
          x: props.x,
          y: props.y,
          scale: props.scale,
          rotation: props.rotation,
          opacity: props.opacity,
          zIndex: props.zIndex,
          duration: diff === 0 ? 0.44 : 0.38,
          ease: diff === 0 ? 'back.out(1.65)' : 'power2.out',
          overwrite: 'auto',
          force3D: true,
        });
      }
    });

    // Comic burst pop animation behind the newly focused active package
    if (!isInitialMount.current && !prefersReducedMotion && burstRef.current) {
      gsap.killTweensOf(burstRef.current);
      gsap.fromTo(
        burstRef.current,
        { scale: 0.3, rotation: -20, opacity: 0.9 },
        {
          scale: 1.15,
          rotation: 15,
          opacity: 0,
          duration: 0.45,
          ease: 'power2.out',
        }
      );
    }

    if (isInitialMount.current) {
      isInitialMount.current = false;
    }
  }, [mobileIndex, shuffledPackages.length, getCardBaseProps]);

  const handlePrev = useCallback(() => {
    setMobileIndex((prev) =>
      prev === 0 ? shuffledPackages.length - 1 : prev - 1
    );
  }, [shuffledPackages.length]);

  const handleNext = useCallback(() => {
    setMobileIndex((prev) =>
      prev === shuffledPackages.length - 1 ? 0 : prev + 1
    );
  }, [shuffledPackages.length]);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0]?.clientX ?? null;
    touchStartY.current = e.touches[0]?.clientY ?? null;
    isDragging.current = false;
    dragDeltaX.current = 0;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const currentX = e.touches[0]?.clientX ?? 0;
    const currentY = e.touches[0]?.clientY ?? 0;
    const deltaX = currentX - touchStartX.current;
    const deltaY = currentY - (touchStartY.current ?? 0);

    // If swipe is primarily horizontal, prevent default browser interference and update card positions live
    if (Math.abs(deltaX) > Math.abs(deltaY) && Math.abs(deltaX) > 8) {
      isDragging.current = true;
      dragDeltaX.current = deltaX;

      const total = shuffledPackages.length;
      mobileCardRefs.current.forEach((el, idx) => {
        if (!el) return;
        const diff = getMobileDiff(idx, mobileIndex, total);
        if (Math.abs(diff) <= 1) {
          const base = getCardBaseProps(diff);
          gsap.set(el, {
            x: base.x + deltaX * 0.55,
            rotation: base.rotation + deltaX * 0.04,
          });
        }
      });
    }
  };

  const handleTouchEnd = () => {
    if (touchStartX.current === null) return;
    const deltaX = dragDeltaX.current;

    if (isDragging.current) {
      if (deltaX > 35) {
        handlePrev();
      } else if (deltaX < -35) {
        handleNext();
      } else {
        // Snap back to resting positions with a spring bounce
        const total = shuffledPackages.length;
        mobileCardRefs.current.forEach((el, idx) => {
          if (!el) return;
          const diff = getMobileDiff(idx, mobileIndex, total);
          const base = getCardBaseProps(diff);
          gsap.to(el, {
            x: base.x,
            y: base.y,
            scale: base.scale,
            rotation: base.rotation,
            opacity: base.opacity,
            duration: 0.32,
            ease: 'back.out(1.5)',
            overwrite: 'auto',
          });
        });
      }
    }

    touchStartX.current = null;
    touchStartY.current = null;
    setTimeout(() => {
      isDragging.current = false;
      dragDeltaX.current = 0;
    }, 60);
  };

  return (
    <div
      id="hero-packages-showcase"
      aria-label="POPRIO gourmet popcorn flavours showcase"
      className="w-full max-w-[90rem] mx-auto select-none"
    >
      {/* =====================================================================
          DESKTOP: 5-PACKAGE RANDOMISED FAN SHOWCASE (UNTOUCHED MD+)
          ===================================================================== */}
      <div
        ref={containerRef}
        className="hidden md:flex w-full mt-12 pt-6 pb-10 items-end justify-center select-none"
      >
        <div className="relative flex items-end justify-center py-4 px-4">
          {HERO_FAN_SLOTS.map((slot, index) => {
            const pkg = shuffledPackages[index];
            if (!pkg) return null;

            const isCentre = slot.slotId === 'centre';

            return (
              <button
                key={slot.slotId}
                ref={(el) => {
                  slotRefs.current[index] = el;
                }}
                type="button"
                data-slot={slot.slotId}
                data-flavour={pkg.id}
                onClick={() => handleOpenProductModal(pkg, index)}
                onMouseEnter={() => handleSlotEnter(slot)}
                onMouseLeave={() => handleSlotLeave(slot)}
                onFocus={() => handleSlotEnter(slot)}
                onBlur={() => handleSlotLeave(slot)}
                aria-haspopup="dialog"
                aria-expanded={selectedProductId === pkg.id}
                aria-label={`View ${pkg.flavourName} details and ingredients`}
                className={`relative -mx-6 sm:-mx-8 lg:-mx-10 p-0 bg-transparent border-0 shrink-0 cursor-pointer outline-none rounded-[1.25rem] will-change-transform ${
                  isCentre
                    ? 'w-[clamp(15rem,19.5vw,19.5rem)]'
                    : 'w-[clamp(13.5rem,17.75vw,17.75rem)]'
                }`}
                style={{
                  zIndex: slot.zIndex,
                  transformOrigin: 'center bottom',
                }}
              >
                <span className="w-full aspect-[3/4] flex items-center justify-center">
                  <PoprioEditableElement
                    elementId={`hero.package.${index}`}
                    type="image"
                    label={`Pouch: ${pkg.flavourName}`}
                    className="w-full h-full flex items-center justify-center"
                  >
                    <img
                      src={pkg.imagePath}
                      alt={pkg.altText}
                      draggable={false}
                      className="w-full h-full object-contain drop-shadow-[0_12px_0_rgba(75,31,15,0.28)] select-none pointer-events-none"
                    />
                  </PoprioEditableElement>
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* =====================================================================
          MOBILE: 3-PACKAGE PEEK SLIDER WITH COMIC ANIMATION (< MD)
          ===================================================================== */}
      <div className="md:hidden flex flex-col items-center justify-center w-full px-2 mt-4 pb-6 overflow-hidden">
        {/* Peek Stage & Floating Comic Arrow Buttons */}
        <div
          className="relative w-full max-w-sm sm:max-w-md h-52 sm:h-60 flex items-center justify-center touch-pan-y py-2 overflow-visible select-none"
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          onTouchCancel={handleTouchEnd}
        >
          {/* Comic Starburst Pop Burst Accent behind the active center package */}
          <svg
            ref={burstRef}
            viewBox="0 0 120 120"
            className="absolute pointer-events-none z-10 w-44 h-44 opacity-0 select-none"
            aria-hidden="true"
          >
            <polygon
              points="60,5 72,38 105,25 90,56 120,68 88,85 100,118 68,102 52,120 45,88 12,98 28,68 0,52 32,42 22,10 52,28"
              fill="#FFC72C"
              stroke="#4B1F0F"
              strokeWidth="3.5"
              strokeLinejoin="round"
            />
          </svg>

          {/* Left Comic Arrow Button */}
          <button
            type="button"
            onClick={handlePrev}
            aria-label="Previous popcorn flavour"
            className="absolute left-1 z-30 w-10 h-10 rounded-full bg-butter-yellow text-cocoa-brown border-[2.2px] border-cocoa-brown flex items-center justify-center cursor-pointer transition-transform duration-150 active:translate-x-0.5 active:translate-y-0.5 hover:bg-[#FFD700] shrink-0"
            style={{
              boxShadow: '0.15rem 0.15rem 0 #4B1F0F',
            }}
          >
            <ChevronLeft className="w-5 h-5 stroke-[3]" />
          </button>

          {/* Carousel Stage: All 5 packages positioned and animated with GSAP */}
          {shuffledPackages.map((pkg, idx) => {
            const diff = getMobileDiff(idx, mobileIndex, shuffledPackages.length);
            const isCenter = diff === 0;
            const isLeftPeek = diff === -1;
            const isRightPeek = diff === 1;

            return (
              <button
                key={pkg.id}
                ref={(el) => {
                  mobileCardRefs.current[idx] = el;
                }}
                type="button"
                data-mobile-diff={diff}
                onClick={() => {
                  if (isDragging.current) return;
                  if (isLeftPeek) {
                    handlePrev();
                  } else if (isRightPeek) {
                    handleNext();
                  } else if (isCenter) {
                    openProductModal(pkg.id, mobileCardRefs.current[idx]);
                  }
                }}
                aria-label={
                  isCenter
                    ? `View ${pkg.flavourName} details and ingredients`
                    : `Switch to ${pkg.flavourName}`
                }
                tabIndex={isCenter ? 0 : -1}
                className={`absolute w-32 sm:w-40 aspect-[3/4] p-0 bg-transparent border-0 cursor-pointer outline-none flex flex-col items-center justify-center select-none ${
                  isCenter
                    ? 'active:scale-95 transition-transform'
                    : 'hover:opacity-65 transition-opacity'
                }`}
                style={{
                  transformOrigin: 'center center',
                  pointerEvents: Math.abs(diff) <= 1 ? 'auto' : 'none',
                }}
              >
                {isCenter ? (
                  <PoprioEditableElement
                    elementId={`hero.package.${idx}`}
                    type="image"
                    label={`Pouch: ${pkg.flavourName}`}
                    className="w-full h-full flex items-center justify-center"
                  >
                    <img
                      src={pkg.imagePath}
                      alt={pkg.altText}
                      draggable={false}
                      className="w-full h-full object-contain drop-shadow-[0_12px_0_rgba(75,31,15,0.28)] select-none pointer-events-none"
                    />
                  </PoprioEditableElement>
                ) : (
                  <img
                    src={pkg.imagePath}
                    alt=""
                    draggable={false}
                    className="w-full h-full object-contain select-none pointer-events-none drop-shadow-[0_6px_0_rgba(75,31,15,0.2)]"
                  />
                )}
              </button>
            );
          })}

          {/* Right Comic Arrow Button */}
          <button
            type="button"
            onClick={handleNext}
            aria-label="Next popcorn flavour"
            className="absolute right-1 z-30 w-10 h-10 rounded-full bg-butter-yellow text-cocoa-brown border-[2.2px] border-cocoa-brown flex items-center justify-center cursor-pointer transition-transform duration-150 active:translate-x-0.5 active:translate-y-0.5 hover:bg-[#FFD700] shrink-0"
            style={{
              boxShadow: '0.15rem 0.15rem 0 #4B1F0F',
            }}
          >
            <ChevronRight className="w-5 h-5 stroke-[3]" />
          </button>
        </div>

        {/* Dots Indicator */}
        <div className="flex items-center gap-2 mt-3.5">
          {shuffledPackages.map((pkg, idx) => (
            <button
              key={pkg.id}
              type="button"
              onClick={() => setMobileIndex(idx)}
              aria-label={`Switch to package ${idx + 1}`}
              className={`h-2.5 rounded-full border-[1.75px] border-cocoa-brown transition-all duration-200 cursor-pointer ${
                idx === mobileIndex
                  ? 'w-7 bg-red-orange'
                  : 'w-2.5 bg-warm-cream hover:bg-butter-yellow'
              }`}
              style={
                idx === mobileIndex
                  ? { boxShadow: '0.1rem 0.1rem 0 #4B1F0F' }
                  : undefined
              }
            />
          ))}
        </div>
      </div>
    </div>
  );
};
