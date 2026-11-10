import React, { forwardRef } from 'react';

export type AllowedSoundWord = 'MEH...' | 'AHA!' | 'POP!' | 'CRUNCH!' | 'BOOM!' | string;

export interface ComicSoundEffectProps {
  word: AllowedSoundWord;
  variant?: 'starburst' | 'jagged' | 'boom';
  burstFill?: string;
  innerFill?: string;
  textFill?: string;
  size?: 'sm' | 'md' | 'lg';
  rotationDeg?: number;
  className?: string;
}

export const ComicSoundEffect = forwardRef<
  HTMLDivElement,
  ComicSoundEffectProps
>(
  (
    {
      word,
      variant = 'starburst',
      burstFill = '#FFC72C',
      innerFill = '#FFF3E0',
      textFill = '#E0351B',
      size = 'md',
      rotationDeg = -6,
      className = '',
    },
    ref
  ) => {
    const dimensionsClass =
      size === 'lg'
        ? 'w-[12.25rem] h-[7.75rem]'
        : size === 'sm'
          ? 'w-[8.25rem] h-[5.4rem]'
          : 'w-[10rem] h-[6.5rem]';

    const textSizeClass =
      size === 'lg'
        ? 'text-[2.5rem]'
        : size === 'sm'
          ? 'text-[1.65rem]'
          : 'text-[2.05rem]';

    return (
      <div
        ref={ref}
        aria-hidden="true"
        className={`pointer-events-none select-none inline-flex items-center justify-center ${className}`}
      >
        <div
          className="relative flex items-center justify-center"
          style={{ transform: `rotate(${rotationDeg}deg)` }}
        >
          <svg
            viewBox="0 0 180 116"
            className={`${dimensionsClass} overflow-visible drop-shadow-[0.28rem_0.28rem_0_#4B1F0F]`}
          >
            {/* Decorative Action Burst Lines */}
            <line
              x1="14"
              y1="14"
              x2="2"
              y2="3"
              stroke="#4B1F0F"
              strokeWidth="4"
              strokeLinecap="round"
            />
            <line
              x1="166"
              y1="15"
              x2="178"
              y2="4"
              stroke="#4B1F0F"
              strokeWidth="4"
              strokeLinecap="round"
            />
            <line
              x1="164"
              y1="98"
              x2="176"
              y2="109"
              stroke="#4B1F0F"
              strokeWidth="4"
              strokeLinecap="round"
            />
            <line
              x1="16"
              y1="98"
              x2="4"
              y2="109"
              stroke="#4B1F0F"
              strokeWidth="4"
              strokeLinecap="round"
            />

            {variant === 'jagged' ? (
              <>
                <polygon
                  points="18,18 50,6 76,16 106,5 134,17 166,10 158,40 176,58 156,76 164,98 126,90 98,104 70,90 36,100 20,78 4,58 22,38"
                  fill={burstFill}
                  stroke="#4B1F0F"
                  strokeWidth="4.5"
                  strokeLinejoin="round"
                />
                <polygon
                  points="28,25 53,15 76,23 104,14 128,24 154,19 148,42 162,57 146,72 151,88 122,82 98,93 73,82 43,90 30,72 16,57 31,41"
                  fill={innerFill}
                />
              </>
            ) : variant === 'boom' ? (
              <>
                <polygon
                  points="90,3 110,19 142,7 136,34 172,42 148,64 166,92 130,90 116,112 90,95 64,112 50,90 14,92 32,64 8,42 44,34 38,7 70,19"
                  fill={burstFill}
                  stroke="#4B1F0F"
                  strokeWidth="4.5"
                  strokeLinejoin="round"
                />
                <polygon
                  points="90,14 107,27 132,18 127,39 156,46 136,63 150,84 122,83 111,100 90,86 69,100 58,83 30,84 44,63 24,46 53,39 48,18 73,27"
                  fill={innerFill}
                  stroke="#E0351B"
                  strokeWidth="2.5"
                  strokeLinejoin="round"
                />
              </>
            ) : (
              <>
                <polygon
                  points="90,5 108,20 138,10 134,35 166,45 146,66 162,92 128,90 114,110 90,94 66,110 52,90 18,92 34,66 14,45 46,35 42,10 72,20"
                  fill={burstFill}
                  stroke="#4B1F0F"
                  strokeWidth="4.5"
                  strokeLinejoin="round"
                />
                <polygon
                  points="90,15 105,27 128,19 125,39 151,47 135,64 147,84 121,83 109,98 90,86 71,98 59,83 33,84 45,64 29,47 55,39 52,19 75,27"
                  fill={innerFill}
                />
              </>
            )}
          </svg>

          {/* Bangers Sound-Effect Word */}
          <span
            className={`absolute font-comic ${textSizeClass} leading-none tracking-[0.06em] uppercase whitespace-nowrap`}
            style={{
              color: textFill,
              WebkitTextStroke: '0.19rem #4B1F0F',
              paintOrder: 'stroke fill',
              textShadow: '0.135rem 0.135rem 0 #4B1F0F',
            }}
          >
            {word}
          </span>
        </div>
      </div>
    );
  }
);

ComicSoundEffect.displayName = 'ComicSoundEffect';
