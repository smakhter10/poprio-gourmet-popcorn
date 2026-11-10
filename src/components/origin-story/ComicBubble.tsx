import React, { forwardRef } from 'react';

export interface ComicBubbleProps {
  text: string;
  variant?: 'speech' | 'thought';
  tailPosition?: 'bottom-left' | 'bottom-right' | 'bottom-center';
  useBangersFont?: boolean;
  bgColor?: string;
  textColor?: string;
  className?: string;
}

export const ComicBubble = forwardRef<HTMLDivElement, ComicBubbleProps>(
  (
    {
      text,
      variant = 'speech',
      tailPosition = 'bottom-left',
      useBangersFont = false,
      bgColor = '#FFF3E0',
      textColor = '#4B1F0F',
      className = '',
    },
    ref
  ) => {
    const tailAlignmentClass =
      tailPosition === 'bottom-right'
        ? 'right-7'
        : tailPosition === 'bottom-center'
          ? 'left-1/2 -translate-x-1/2'
          : 'left-7';

    return (
      <div
        ref={ref}
        aria-hidden="true"
        className={`pointer-events-none select-none relative inline-flex flex-col items-center ${className}`}
      >
        {/* Main Comic Bubble Body */}
        <div
          className={`relative z-10 px-5 py-3 border-[0.22rem] border-solid border-cocoa-brown ${
            variant === 'thought' ? 'rounded-[2rem]' : 'rounded-[1.125rem]'
          }`}
          style={{
            backgroundColor: bgColor,
            color: textColor,
            boxShadow: '0.28rem 0.28rem 0 #4B1F0F',
          }}
        >
          <span
            className={`block whitespace-nowrap leading-none uppercase ${
              useBangersFont
                ? 'font-comic text-[1.5rem] tracking-[0.06em]'
                : 'font-hero text-[1.0625rem] tracking-[0.02em]'
            }`}
          >
            {text}
          </span>
        </div>

        {/* Speech Pointer Tail or Thought Trailing Dots */}
        {variant === 'speech' ? (
          <svg
            viewBox="0 0 32 22"
            className={`absolute -bottom-[1.05rem] ${tailAlignmentClass} w-7 h-5 z-20 overflow-visible`}
          >
            <polygon
              points="4,0 22,0 8,19"
              fill={bgColor}
              stroke="#4B1F0F"
              strokeWidth="3.5"
              strokeLinejoin="round"
            />
            {/* Cover seam line */}
            <line
              x1="5"
              y1="0"
              x2="21"
              y2="0"
              stroke={bgColor}
              strokeWidth="4.5"
            />
          </svg>
        ) : (
          <div
            className={`absolute -bottom-6 ${tailAlignmentClass} flex flex-col items-center gap-1 z-20`}
          >
            <span
              className="w-3.5 h-3.5 rounded-full border-[0.18rem] border-cocoa-brown block"
              style={{
                backgroundColor: bgColor,
                boxShadow: '0.125rem 0.125rem 0 #4B1F0F',
              }}
            />
            <span
              className="w-2 h-2 rounded-full border-[0.15rem] border-cocoa-brown block -ml-3"
              style={{
                backgroundColor: bgColor,
                boxShadow: '0.1rem 0.1rem 0 #4B1F0F',
              }}
            />
          </div>
        )}
      </div>
    );
  }
);

ComicBubble.displayName = 'ComicBubble';
