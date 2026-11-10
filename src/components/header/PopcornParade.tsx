import React, { useState, useEffect, useRef } from 'react';
import { SOCIAL_LINKS, SocialLinkConfig } from '../../config/site';

type PopcornFlavour = 'butter' | 'chocolate' | 'strawberry' | 'caramel';
type KernelShape = 'puff-a' | 'puff-b' | 'puff-c' | 'puff-d';

interface ParadePiece {
  id: number;
  flavour: PopcornFlavour;
  shape: KernelShape;
  rotation: number;
  scale: number;
  offsetY: number;
}

const FLAVOUR_PALETTES: Record<
  PopcornFlavour,
  { base: string; cap: string; shine: string }
> = {
  butter: {
    base: '#FFF3E0',
    cap: '#FFC72C',
    shine: '#FFFFFF',
  },
  chocolate: {
    base: '#7A351C',
    cap: '#D78A24',
    shine: '#F3DEC8',
  },
  strawberry: {
    base: '#F5A7BE',
    cap: '#E0351B',
    shine: '#FFF3E0',
  },
  caramel: {
    base: '#D78A24',
    cap: '#FFC72C',
    shine: '#FFF3E0',
  },
};

/**
 * Exactly 5 decorative comic-book popcorn kernels, centralised in the top bar
 * with varied shapes, flavours, and playful tilts.
 */
const PARADE_SEQUENCE: readonly ParadePiece[] = [
  { id: 1, flavour: 'butter', shape: 'puff-a', rotation: -12, scale: 1.0, offsetY: 1 },
  { id: 2, flavour: 'strawberry', shape: 'puff-b', rotation: 10, scale: 1.04, offsetY: -1 },
  { id: 3, flavour: 'caramel', shape: 'puff-c', rotation: -5, scale: 1.06, offsetY: 0 },
  { id: 4, flavour: 'chocolate', shape: 'puff-d', rotation: 12, scale: 1.03, offsetY: -1 },
  { id: 5, flavour: 'butter', shape: 'puff-b', rotation: -9, scale: 1.0, offsetY: 1 },
] as const;

function PopcornKernelSvg({
  flavour,
  shape,
}: {
  flavour: PopcornFlavour;
  shape: KernelShape;
}) {
  const palette = FLAVOUR_PALETTES[flavour];

  return (
    <svg
      viewBox="0 0 36 36"
      className="w-[1.5rem] h-[1.5rem] shrink-0 select-none overflow-visible"
      focusable="false"
      aria-hidden="true"
    >
      {shape === 'puff-a' && (
        <g>
          {/* Classic 3-lobe cloud puff */}
          <path
            d="M11.5 28.5C7.2 28.5 4.5 25.4 5.2 21.2C3.8 18.2 5.4 13.8 9.2 12.8C10.5 8.2 15.6 6.2 19.8 8.4C24.2 6.8 28.8 10.2 28.6 14.8C31.6 17.2 31.2 22.4 27.8 24.8C26.8 27.6 23.6 29.2 20.2 28.4C17.6 29.6 14.1 29.4 11.5 28.5Z"
            fill={palette.base}
            stroke="#4B1F0F"
            strokeWidth="2.8"
            strokeLinejoin="round"
          />
          <circle
            cx="17.5"
            cy="18.5"
            r="5.2"
            fill={palette.cap}
            stroke="#4B1F0F"
            strokeWidth="2.2"
          />
          <path
            d="M12.2 11.8C13.8 10.2 16.2 9.8 17.8 10.6"
            stroke={palette.shine}
            strokeWidth="2"
            strokeLinecap="round"
          />
        </g>
      )}

      {shape === 'puff-b' && (
        <g>
          {/* Butterfly twin-wing pop */}
          <path
            d="M8.5 26.8C4.8 25.2 4.2 19.8 7.4 16.8C6.2 12.2 10.4 7.8 15.2 9.6C17.8 6.8 23.2 7.2 25.4 11.2C29.8 11.8 31.8 16.8 29.2 20.6C30.6 24.8 26.6 28.8 22.2 27.4C19.2 29.4 15.2 28.8 13.2 26.8C11.4 27.6 9.8 27.4 8.5 26.8Z"
            fill={palette.base}
            stroke="#4B1F0F"
            strokeWidth="2.8"
            strokeLinejoin="round"
          />
          <path
            d="M14 16.5C14 14.2 16.2 12.8 18.5 13.5C20.8 12.8 22.8 14.8 22.2 17.2C23.2 19.5 20.8 21.8 18.2 21.2C15.6 21.8 13.5 19.2 14 16.5Z"
            fill={palette.cap}
            stroke="#4B1F0F"
            strokeWidth="2.2"
            strokeLinejoin="round"
          />
          <path
            d="M9.6 14.2C10.6 12.4 12.4 11.6 14.2 11.8"
            stroke={palette.shine}
            strokeWidth="2"
            strokeLinecap="round"
          />
        </g>
      )}

      {shape === 'puff-c' && (
        <g>
          {/* Star-bloom round puff */}
          <path
            d="M18 6.8C21.6 6.8 24.4 9.2 25.2 12.4C28.8 13.4 30.8 17.2 29.4 20.8C30.4 24.4 27.6 28.2 23.8 28.2C21.8 30.4 17.8 30.8 15.2 28.8C11.2 29.8 7.2 26.8 7.4 22.8C4.8 20.2 5.4 15.4 8.8 13.6C9.6 9.6 13.8 6.8 18 6.8Z"
            fill={palette.base}
            stroke="#4B1F0F"
            strokeWidth="2.8"
            strokeLinejoin="round"
          />
          <circle
            cx="18"
            cy="19"
            r="4.8"
            fill={palette.cap}
            stroke="#4B1F0F"
            strokeWidth="2.2"
          />
          <path
            d="M15.4 10.2C17.2 9.4 19.4 9.6 21 10.6"
            stroke={palette.shine}
            strokeWidth="2"
            strokeLinecap="round"
          />
        </g>
      )}

      {shape === 'puff-d' && (
        <g>
          {/* Plump Asymmetric Kernel */}
          <path
            d="M10.2 27.4C6.4 26.4 4.8 22.2 6.8 18.8C5.4 14.6 8.8 10.2 13.4 10.6C16.2 7.2 21.8 7.4 24.4 11.2C28.6 11.6 31.2 15.8 29.4 19.8C30.8 23.8 27.8 28.2 23.4 27.8C20.2 29.8 15.8 29.4 13.4 27.2C12.2 27.8 11.2 27.7 10.2 27.4Z"
            fill={palette.base}
            stroke="#4B1F0F"
            strokeWidth="2.8"
            strokeLinejoin="round"
          />
          <ellipse
            cx="18.2"
            cy="18.6"
            rx="5.4"
            ry="4.4"
            transform="rotate(-12 18.2 18.6)"
            fill={palette.cap}
            stroke="#4B1F0F"
            strokeWidth="2.2"
          />
          <path
            d="M17.2 10.4C19.2 9.8 21.2 10.4 22.4 11.8"
            stroke={palette.shine}
            strokeWidth="2"
            strokeLinecap="round"
          />
        </g>
      )}
    </svg>
  );
}

function ComicSocialSvg({ id }: { id: SocialLinkConfig['id'] }) {
  switch (id) {
    case 'facebook':
      return (
        <svg
          viewBox="0 0 24 24"
          className="w-[1.0625rem] h-[1.0625rem] shrink-0 overflow-visible"
          aria-hidden="true"
          focusable="false"
        >
          {/* Chunky comic-book "f" with Cocoa Brown fill and Warm Cream highlight */}
          <path
            d="M13.8 21V13.2H16.6L17.1 9.6H13.8V7.5C13.8 6.5 14.2 5.8 15.6 5.8H17.3V2.6C16.9 2.5 15.7 2.4 14.4 2.4C11.5 2.4 9.6 4.1 9.6 7.2V9.6H6.8V13.2H9.6V21H13.8Z"
            fill="#4B1F0F"
            stroke="#4B1F0F"
            strokeWidth="1.2"
            strokeLinejoin="round"
          />
          <path
            d="M11.2 6.8C11.3 5.3 12.2 4.3 13.8 4.1"
            stroke="#FFF3E0"
            strokeWidth="1.4"
            strokeLinecap="round"
          />
        </svg>
      );

    case 'instagram':
      return (
        <svg
          viewBox="0 0 24 24"
          className="w-[1.0625rem] h-[1.0625rem] shrink-0 overflow-visible"
          aria-hidden="true"
          focusable="false"
        >
          {/* Comic camera body */}
          <rect
            x="3"
            y="3"
            width="18"
            height="18"
            rx="5.5"
            fill="#FFF3E0"
            stroke="#4B1F0F"
            strokeWidth="2.5"
          />
          {/* Comic camera lens */}
          <circle
            cx="12"
            cy="12"
            r="4.2"
            fill="#FFC72C"
            stroke="#4B1F0F"
            strokeWidth="2.4"
          />
          {/* Flash dot */}
          <circle cx="17.2" cy="6.8" r="1.5" fill="#E0351B" />
        </svg>
      );

    case 'youtube':
      return (
        <svg
          viewBox="0 0 24 24"
          className="w-[1.125rem] h-[1.125rem] shrink-0 overflow-visible"
          aria-hidden="true"
          focusable="false"
        >
          {/* Comic play triangle */}
          <path
            d="M8.5 6.8L17.8 12L8.5 17.2V6.8Z"
            fill="#FFF3E0"
            stroke="#4B1F0F"
            strokeWidth="2.4"
            strokeLinejoin="round"
          />
        </svg>
      );
  }
}

const SOCIAL_BADGE_COLORS: Record<SocialLinkConfig['id'], string> = {
  facebook: 'var(--color-butter-yellow)',
  instagram: 'var(--color-accent-pink)',
  youtube: 'var(--color-red-orange)',
};

interface PopcornParadeProps {
  paradeRef: React.RefObject<HTMLDivElement | null>;
}

export const PopcornParade: React.FC<PopcornParadeProps> = ({ paradeRef }) => {
  const [pendingSocialNotice, setPendingSocialNotice] = useState<string | null>(
    null
  );
  const socialClusterRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!pendingSocialNotice) return;

    const timer = window.setTimeout(() => {
      setPendingSocialNotice(null);
    }, 3000);

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setPendingSocialNotice(null);
    };

    const handleOutsideClick = (e: MouseEvent) => {
      if (
        socialClusterRef.current &&
        !socialClusterRef.current.contains(e.target as Node)
      ) {
        setPendingSocialNotice(null);
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('mousedown', handleOutsideClick);

    return () => {
      window.clearTimeout(timer);
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, [pendingSocialNotice]);

  return (
    <div
      ref={paradeRef}
      className={`w-full bg-warm-cream border-b-[0.1875rem] border-solid select-none pointer-events-auto relative z-20 ${
        pendingSocialNotice ? 'overflow-visible' : 'overflow-hidden'
      }`}
      style={{
        height: 'var(--parade-height)',
        borderBottomColor: 'rgba(75, 31, 15, 1)',
      }}
    >
      <div className="max-w-[84rem] mx-auto h-full px-6 lg:px-10 grid grid-cols-[1fr_auto_1fr] items-center gap-8">
        {/* Left column spacer to guarantee strict horizontal centering of the 5 popcorns */}
        <div aria-hidden="true" />

        {/* Centre: 5 Decorative Illustrated Popcorn Pieces */}
        <div
          aria-hidden="true"
          role="presentation"
          className="flex items-center justify-center gap-5 sm:gap-7 pointer-events-none"
        >
          {PARADE_SEQUENCE.map((piece) => (
            <div
              key={piece.id}
              className="flex items-center justify-center shrink-0"
              style={{
                transform: `translateY(${piece.offsetY}px) rotate(${piece.rotation}deg) scale(${piece.scale})`,
              }}
            >
              <PopcornKernelSvg flavour={piece.flavour} shape={piece.shape} />
            </div>
          ))}
        </div>

        {/* Far Right: Comic-Book Social Media Icons (Facebook, Instagram, YouTube) - Hidden on mobile, moved to mobile menu */}
        <div
          ref={socialClusterRef}
          className="relative hidden md:flex items-center justify-end gap-2.5"
        >
          {SOCIAL_LINKS.map((social) => {
            const bgColor = SOCIAL_BADGE_COLORS[social.id];

            if (social.url) {
              return (
                <a
                  key={social.id}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className="poprio-social-btn w-[1.875rem] h-[1.875rem] inline-flex items-center justify-center shrink-0 cursor-pointer"
                  style={{ backgroundColor: bgColor }}
                >
                  <ComicSocialSvg id={social.id} />
                </a>
              );
            }

            return (
              <button
                key={social.id}
                type="button"
                aria-label={`${social.label} (official URL pending configuration)`}
                title={`${social.label} — URL pending in src/config/site.ts`}
                onClick={() =>
                  setPendingSocialNotice(
                    `${social.label} link pending in src/config/site.ts`
                  )
                }
                className="poprio-social-btn w-[1.875rem] h-[1.875rem] inline-flex items-center justify-center shrink-0 cursor-pointer"
                style={{ backgroundColor: bgColor }}
              >
                <ComicSocialSvg id={social.id} />
              </button>
            );
          })}

          {pendingSocialNotice && (
            <div
              role="status"
              aria-live="polite"
              className="absolute right-0 top-[calc(100%+0.5rem)] z-50 bg-warm-cream text-cocoa-brown comic-border-card rounded-[0.625rem] px-3 py-1.5 font-body text-[0.75rem] font-extrabold whitespace-nowrap"
              style={{ boxShadow: 'var(--shadow-hard-sm)' }}
            >
              {pendingSocialNotice}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
