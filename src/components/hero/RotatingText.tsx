import React, { useEffect, useRef, useState, useMemo } from 'react';
import gsap from 'gsap';

export interface RotatingWordItem {
  text: string;
  color?: string;
  pillBg?: string;
  badgeBg?: string;
  strokeColor?: string;
  strokeWidth?: string;
  textShadow?: string;
}

export interface RotatingTextProps {
  items: readonly (string | RotatingWordItem)[];
  /** Time each word stays fully open before closing (seconds). Default: 2.4 */
  displayDuration?: number;
  /** Duration of the close + open animation cycle (seconds). Default: 0.42 */
  transitionDuration?: number;
  /** Initial delay before starting the rotation cycle (seconds). Default: 0 */
  initialDelay?: number;
  /** Icon type rendered inside the left circular badge of the inline pill */
  iconVariant?: 'popcorn' | 'flavour';
  /** Additional classes for the pill container */
  pillClassName?: string;
  /** Additional classes applied to the word text */
  wordClassName?: string;
  /** Default text color if an item does not specify its own color */
  defaultColor?: string;
}

function PillBadgeIcon({
  variant,
  badgeBg,
}: {
  variant: 'popcorn' | 'flavour';
  badgeBg: string;
}) {
  return (
    <span
      aria-hidden="true"
      className="w-[clamp(1.75rem,2.6vw,2.75rem)] h-[clamp(1.75rem,2.6vw,2.75rem)] rounded-full border-[0.14rem] sm:border-[0.175rem] border-[#180904] flex items-center justify-center shrink-0 transition-colors duration-300"
      style={{ backgroundColor: badgeBg }}
    >
      {variant === 'popcorn' ? (
        <svg
          viewBox="0 0 32 32"
          className="w-[68%] h-[68%] overflow-visible"
          focusable="false"
          aria-hidden="true"
        >
          <path
            d="M10.5 24.5C7 24.5 5 21.8 5.6 18.4C4.4 15.8 5.8 12.2 8.8 11.4C10 7.6 14.2 6 17.6 7.8C21.2 6.5 25 9.2 24.8 13C27.2 15 26.8 19.2 24 21.2C23.2 23.5 20.6 24.8 17.8 24.2C15.6 25.2 12.6 25 10.5 24.5Z"
            fill="#FFF3E0"
            stroke="#180904"
            strokeWidth="2.6"
            strokeLinejoin="round"
          />
          <circle
            cx="15.8"
            cy="16.2"
            r="4.2"
            fill="#FFC72C"
            stroke="#180904"
            strokeWidth="2"
          />
        </svg>
      ) : (
        <svg
          viewBox="0 0 28 28"
          className="w-[62%] h-[62%] overflow-visible"
          focusable="false"
          aria-hidden="true"
        >
          <path
            d="M14 2.5L17.1 10.5L25.5 14L17.1 17.5L14 25.5L10.9 17.5L2.5 14L10.9 10.5L14 2.5Z"
            fill="#FFF3E0"
            stroke="#180904"
            strokeWidth="2.5"
            strokeLinejoin="round"
          />
        </svg>
      )}
    </span>
  );
}

export const RotatingText: React.FC<RotatingTextProps> = ({
  items,
  displayDuration = 2.4,
  transitionDuration = 0.42,
  initialDelay = 0,
  iconVariant = 'popcorn',
  pillClassName = '',
  wordClassName = '',
  defaultColor = '#FFFFFF',
}) => {
  const normalizedItems: RotatingWordItem[] = useMemo(
    () =>
      items.map((item) =>
        typeof item === 'string' ? { text: item, color: defaultColor } : item
      ),
    [items, defaultColor]
  );

  const [activeIndex, setActiveIndex] = useState(0);
  const activeIndexRef = useRef(0);
  const revealWrapperRef = useRef<HTMLSpanElement>(null);
  const innerWordRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const revealEl = revealWrapperRef.current;
    const wordEl = innerWordRef.current;

    if (!revealEl || !wordEl || normalizedItems.length <= 1) return;

    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (mediaQuery.matches) {
      gsap.set(revealEl, { width: 'auto', opacity: 1 });
      gsap.set(wordEl, { opacity: 1, scale: 1 });
      return;
    }

    let isCancelled = false;

    const ctx = gsap.context(() => {
      gsap.set(revealEl, { width: 'auto', opacity: 1 });
      gsap.set(wordEl, { opacity: 1, yPercent: 0 });

      const runCycle = () => {
        if (isCancelled) return;

        const nextIdx = (activeIndexRef.current + 1) % normalizedItems.length;

        const tl = gsap.timeline({
          onComplete: () => {
            if (!isCancelled) {
              gsap.delayedCall(displayDuration, runCycle);
            }
          },
        });

        // 1. Closing animation: pill smoothly closes horizontally around the text
        tl.to(wordEl, {
          opacity: 0,
          scale: 0.94,
          duration: transitionDuration * 0.65,
          ease: 'power2.in',
        });

        tl.to(
          revealEl,
          {
            width: 0,
            duration: transitionDuration,
            ease: 'power3.inOut',
          },
          '<'
        );

        // 2. Swap active word while pill is closed
        tl.call(() => {
          if (isCancelled) return;
          activeIndexRef.current = nextIdx;
          setActiveIndex(nextIdx);
        });

        // Allow React to commit new word text, then measure & animate open
        tl.to({}, { duration: 0.03 });

        // 3. Opening animation: pill expands smoothly to the new word's natural width
        tl.to(revealEl, {
          width: 'auto',
          duration: transitionDuration * 1.15,
          ease: 'back.out(1.25)',
        });

        tl.to(
          wordEl,
          {
            opacity: 1,
            scale: 1,
            duration: transitionDuration * 0.85,
            ease: 'power3.out',
          },
          '<+=0.06'
        );
      };

      gsap.delayedCall(initialDelay + displayDuration, runCycle);
    });

    const handleMotionChange = (event: MediaQueryListEvent) => {
      if (event.matches) {
        isCancelled = true;
        ctx.revert();
        activeIndexRef.current = 0;
        setActiveIndex(0);
        gsap.set(revealEl, { width: 'auto', opacity: 1 });
        gsap.set(wordEl, { opacity: 1, scale: 1 });
      }
    };

    mediaQuery.addEventListener('change', handleMotionChange);

    return () => {
      isCancelled = true;
      mediaQuery.removeEventListener('change', handleMotionChange);
      ctx.revert();
    };
  }, [normalizedItems, displayDuration, transitionDuration, initialDelay]);

  if (normalizedItems.length === 0) {
    return null;
  }

  const currentItem = normalizedItems[activeIndex] ?? normalizedItems[0];
  const badgeColor =
    currentItem.badgeBg ??
    (iconVariant === 'popcorn'
      ? 'var(--color-red-orange)'
      : 'var(--color-butter-yellow)');

  const pillBackground = currentItem.pillBg ?? 'var(--color-warm-cream)';

  return (
    <span
      aria-hidden="true"
      className={`inline-flex items-center border-[0.16rem] sm:border-[0.22rem] border-[#180904] rounded-full pl-1.5 sm:pl-2 pr-3 sm:pr-4 py-0.5 sm:py-1.5 align-middle select-none transition-colors duration-300 ${pillClassName}`}
      style={{
        backgroundColor: pillBackground,
        boxShadow: '0.18rem 0.18rem 0 #180904',
      }}
    >
      {/* Left Circular Comic Icon Badge */}
      <PillBadgeIcon variant={iconVariant} badgeBg={badgeColor} />

      {/* Opening & Closing Masked Text Window */}
      <span
        ref={revealWrapperRef}
        className="inline-flex items-center overflow-hidden whitespace-nowrap"
      >
        <span
          ref={innerWordRef}
          className={`inline-block pl-2.5 pr-1.5 py-0.5 whitespace-nowrap will-change-transform ${wordClassName}`}
          style={{
            color: currentItem.color ?? defaultColor,
            WebkitTextStroke: `${currentItem.strokeWidth ?? '0.22rem'} ${currentItem.strokeColor ?? '#180904'}`,
            paintOrder: 'stroke fill',
            textShadow:
              currentItem.textShadow ?? '0.15rem 0.15rem 0 #180904',
          }}
        >
          {currentItem.text}
        </span>
      </span>
    </span>
  );
};
