import React, { useState, useEffect, useRef } from 'react';
import { getWhatsAppOrderUrl, WHATSAPP_NUMBER } from '../../config/site';
import { usePoprioContent } from '../../context/PoprioContentContext';

function WhatsAppComicIcon({ isScrolled }: { isScrolled: boolean }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={`shrink-0 fill-current transition-transform duration-300 ${
        isScrolled ? 'w-[1.375rem] h-[1.375rem] scale-105' : 'w-[1.25rem] h-[1.25rem]'
      }`}
      aria-hidden="true"
      focusable="false"
    >
      <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91C2.13 13.66 2.59 15.36 3.45 16.86L2.05 22L7.3 20.62C8.75 21.41 10.38 21.83 12.04 21.83C17.5 21.83 21.95 17.38 21.95 11.92C21.95 9.27 20.92 6.78 19.05 4.91C17.18 3.03 14.69 2 12.04 2ZM12.05 3.67C14.25 3.67 16.31 4.53 17.87 6.09C19.42 7.65 20.28 9.72 20.28 11.92C20.28 16.46 16.58 20.15 12.04 20.15C10.56 20.15 9.11 19.76 7.85 19L7.55 18.83L4.43 19.65L5.26 16.61L5.06 16.29C4.24 14.98 3.8 13.47 3.8 11.91C3.81 7.37 7.5 3.67 12.05 3.67ZM8.53 7.33C8.37 7.33 8.1 7.39 7.87 7.64C7.65 7.89 7 8.5 7 9.71C7 10.93 7.89 12.1 8.01 12.27C8.14 12.44 9.76 14.94 12.25 16.01C14.34 16.92 14.76 16.74 15.21 16.7C15.66 16.66 16.68 16.09 16.89 15.51C17.1 14.92 17.1 14.42 17.04 14.31C16.97 14.2 16.81 14.14 16.56 14.01C16.31 13.89 15.09 13.28 14.87 13.2C14.64 13.11 14.48 13.07 14.31 13.32C14.15 13.57 13.67 14.14 13.53 14.31C13.38 14.48 13.24 14.5 12.99 14.37C12.74 14.25 11.94 13.98 11 13.14C10.26 12.48 9.77 11.67 9.62 11.42C9.48 11.17 9.6 11.04 9.73 10.92C9.84 10.81 9.98 10.62 10.1 10.48C10.23 10.33 10.27 10.23 10.35 10.06C10.43 9.89 10.39 9.75 10.33 9.62C10.27 9.5 9.77 8.28 9.56 7.78C9.36 7.29 9.16 7.35 9.01 7.34C8.86 7.33 8.7 7.33 8.53 7.33Z" />
    </svg>
  );
}

interface WhatsAppButtonProps {
  isScrolled: boolean;
}

export const WhatsAppButton: React.FC<WhatsAppButtonProps> = ({
  isScrolled,
}) => {
  const { meta } = usePoprioContent();
  const whatsappUrl = getWhatsAppOrderUrl(meta?.whatsappNumber || WHATSAPP_NUMBER);
  const [showUnconfiguredNotice, setShowUnconfiguredNotice] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!showUnconfiguredNotice) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setShowUnconfiguredNotice(false);
      }
    };

    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setShowUnconfiguredNotice(false);
      }
    };

    const timer = window.setTimeout(() => {
      setShowUnconfiguredNotice(false);
    }, 4000);

    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      window.clearTimeout(timer);
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showUnconfiguredNotice]);

  const buttonPaddingClass = isScrolled ? 'px-3 py-2.5' : 'px-5 py-2.5';

  const labelSpanClass = `overflow-hidden whitespace-nowrap transition-all duration-300 ease-out ${
    isScrolled
      ? 'max-w-0 opacity-0 ml-0'
      : 'max-w-[10rem] opacity-100 ml-2.5'
  }`;

  if (whatsappUrl) {
    return (
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        className={`poprio-whatsapp-btn inline-flex items-center justify-center ${buttonPaddingClass} text-[0.9375rem] leading-none tracking-wide whitespace-nowrap shrink-0 select-none`}
        aria-label="Chat and order POPRIO gourmet popcorn on WhatsApp"
      >
        <WhatsAppComicIcon isScrolled={isScrolled} />
        <span aria-hidden={isScrolled} className={labelSpanClass}>
          CHAT &amp; ORDER
        </span>
      </a>
    );
  }

  return (
    <div ref={containerRef} className="relative inline-flex items-center">
      <button
        type="button"
        aria-disabled="true"
        aria-label="Chat and order on WhatsApp (official number pending configuration)"
        aria-describedby={
          showUnconfiguredNotice ? 'whatsapp-config-status' : undefined
        }
        onClick={() => setShowUnconfiguredNotice((prev) => !prev)}
        title="Official WhatsApp number pending configuration (WHATSAPP_NUMBER)"
        className={`poprio-whatsapp-btn inline-flex items-center justify-center ${buttonPaddingClass} text-[0.9375rem] leading-none tracking-wide whitespace-nowrap shrink-0 select-none cursor-not-allowed opacity-95`}
      >
        <WhatsAppComicIcon isScrolled={isScrolled} />
        <span aria-hidden={isScrolled} className={labelSpanClass}>
          CHAT &amp; ORDER
        </span>
      </button>

      {showUnconfiguredNotice && (
        <div
          id="whatsapp-config-status"
          role="status"
          aria-live="polite"
          className="absolute right-0 top-[calc(100%+0.75rem)] z-50 w-[17.5rem] bg-warm-cream text-cocoa-brown comic-border-card rounded-[0.75rem] p-3 text-left"
          style={{ boxShadow: 'var(--shadow-hard)' }}
        >
          <p className="font-comic text-[1rem] tracking-wider text-red-orange uppercase leading-tight mb-1">
            COMING SOON!
          </p>
          <p className="font-body text-[0.8125rem] font-bold leading-snug text-cocoa-brown">
            WhatsApp ordering link will activate once{' '}
            <code className="bg-butter-yellow/60 px-1 py-0.5 rounded text-[0.75rem]">
              WHATSAPP_NUMBER
            </code>{' '}
            is configured.
          </p>
        </div>
      )}
    </div>
  );
};
