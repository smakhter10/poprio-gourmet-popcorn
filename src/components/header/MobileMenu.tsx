import React, { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import gsap from 'gsap';
import { X } from 'lucide-react';
import {
  NAV_ITEMS,
  NavItemConfig,
  SITE_CONFIG,
  SOCIAL_LINKS,
  getWhatsAppOrderUrl,
  WHATSAPP_NUMBER,
  WHATSAPP_GREETING,
} from '../../config/site';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  activeNavId: NavItemConfig['id'];
  onSelectNav: (id: NavItemConfig['id']) => void;
}

const SOCIAL_BADGE_COLORS: Record<string, string> = {
  facebook: 'var(--color-butter-yellow)',
  instagram: 'var(--color-accent-pink)',
  youtube: 'var(--color-red-orange)',
};

function ComicSocialSvg({ id }: { id: string }) {
  switch (id) {
    case 'facebook':
      return (
        <svg
          viewBox="0 0 24 24"
          className="w-5 h-5 shrink-0 overflow-visible"
          aria-hidden="true"
          focusable="false"
        >
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
          className="w-5 h-5 shrink-0 overflow-visible"
          aria-hidden="true"
          focusable="false"
        >
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
          <circle
            cx="12"
            cy="12"
            r="4.2"
            fill="#FFC72C"
            stroke="#4B1F0F"
            strokeWidth="2.4"
          />
          <circle cx="17.2" cy="6.8" r="1.5" fill="#E0351B" />
        </svg>
      );
    case 'youtube':
      return (
        <svg
          viewBox="0 0 24 24"
          className="w-5 h-5 shrink-0 overflow-visible"
          aria-hidden="true"
          focusable="false"
        >
          <path
            d="M8.5 6.8L17.8 12L8.5 17.2V6.8Z"
            fill="#FFF3E0"
            stroke="#4B1F0F"
            strokeWidth="2.4"
            strokeLinejoin="round"
          />
        </svg>
      );
    default:
      return null;
  }
}

function WhatsAppIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="w-5 h-5 shrink-0 fill-current"
      aria-hidden="true"
      focusable="false"
    >
      <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91C2.13 13.66 2.59 15.36 3.45 16.86L2.05 22L7.3 20.62C8.75 21.41 10.38 21.83 12.04 21.83C17.5 21.83 21.95 17.38 21.95 11.92C21.95 9.27 20.92 6.78 19.05 4.91C17.18 3.03 14.69 2 12.04 2ZM12.05 3.67C14.25 3.67 16.31 4.53 17.87 6.09C19.42 7.65 20.28 9.72 20.28 11.92C20.28 16.46 16.58 20.15 12.04 20.15C10.56 20.15 9.11 19.76 7.85 19L7.55 18.83L4.43 19.65L5.26 16.61L5.06 16.29C4.24 14.98 3.8 13.47 3.8 11.91C3.81 7.37 7.5 3.67 12.05 3.67ZM8.53 7.33C8.37 7.33 8.1 7.39 7.87 7.64C7.65 7.89 7 8.5 7 9.71C7 10.93 7.89 12.1 8.01 12.27C8.14 12.44 9.76 14.94 12.25 16.01C14.34 16.92 14.76 16.74 15.21 16.7C15.66 16.66 16.68 16.09 16.89 15.51C17.1 14.92 17.1 14.42 17.04 14.31C16.97 14.2 16.81 14.14 16.56 14.01C16.31 13.89 15.09 13.28 14.87 13.2C14.64 13.11 14.48 13.07 14.31 13.32C14.15 13.57 13.67 14.14 13.53 14.31C13.38 14.48 13.24 14.5 12.99 14.37C12.74 14.25 11.94 13.98 11 13.14C10.26 12.48 9.77 11.67 9.62 11.42C9.48 11.17 9.6 11.04 9.73 10.92C9.84 10.81 9.98 10.62 10.1 10.48C10.23 10.33 10.27 10.23 10.35 10.06C10.43 9.89 10.39 9.75 10.33 9.62C10.27 9.5 9.77 8.28 9.56 7.78C9.36 7.29 9.16 7.35 9.01 7.34C8.86 7.33 8.7 7.33 8.53 7.33Z" />
    </svg>
  );
}

export const MobileMenu: React.FC<MobileMenuProps> = ({
  isOpen,
  onClose,
  activeNavId,
  onSelectNav,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  const whatsappUrl = getWhatsAppOrderUrl(WHATSAPP_NUMBER, WHATSAPP_GREETING);

  // Lock body scroll reliably on mobile touch browsers and handle Escape key
  useEffect(() => {
    if (!isOpen) return;

    const originalOverflow = document.body.style.overflow;
    const originalPosition = document.body.style.position;
    const originalTop = document.body.style.top;
    const originalWidth = document.body.style.width;
    const scrollY = window.scrollY;

    // Lock page completely to stop background scroll chaining, ScrollTrigger firing, and repaints
    document.body.style.overflow = 'hidden';
    document.body.style.position = 'fixed';
    document.body.style.top = `-${scrollY}px`;
    document.body.style.width = '100%';

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    // GSAP entrance animation with transform cleanup to ensure hardware-accelerated smooth native scrolling
    const containerEl = containerRef.current;
    const contentEl = contentRef.current;
    if (containerEl && contentEl) {
      gsap.fromTo(
        containerEl,
        { opacity: 0 },
        { opacity: 1, duration: 0.22, ease: 'power2.out' }
      );
      gsap.fromTo(
        contentEl,
        { y: -16, opacity: 0, scale: 0.98 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.28,
          ease: 'power3.out',
          onComplete: () => {
            // Remove transform so mobile browsers don't glitch or stutter during touch scrolling
            gsap.set(contentEl, { clearProps: 'transform' });
          },
        }
      );
    }

    return () => {
      document.body.style.overflow = originalOverflow;
      document.body.style.position = originalPosition;
      document.body.style.top = originalTop;
      document.body.style.width = originalWidth;
      window.scrollTo(0, scrollY);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen || typeof document === 'undefined') return null;

  const handleNavClick = (id: NavItemConfig['id']) => {
    onClose();
    window.setTimeout(() => {
      onSelectNav(id);
    }, 50);
  };

  return createPortal(
    <div
      ref={containerRef}
      role="dialog"
      aria-modal="true"
      aria-label="Mobile Navigation Menu"
      className="fixed inset-0 z-[99999] w-full h-full bg-warm-cream flex flex-col overflow-y-auto overscroll-contain touch-pan-y"
      style={{
        WebkitOverflowScrolling: 'touch',
      }}
    >
      <div
        ref={contentRef}
        className="w-full min-h-full flex flex-col justify-between p-6 sm:p-8"
      >
        {/* Top Header: Logo + Close Button */}
        <div className="flex items-center justify-between gap-4 pb-5 border-b-[0.22rem] border-cocoa-brown">
          <a
            href="#top"
            onClick={(e) => {
              e.preventDefault();
              handleNavClick('home');
            }}
            className="inline-flex items-center"
            aria-label="POPRIO Home"
          >
            <img
              src={SITE_CONFIG.logo.src}
              alt={SITE_CONFIG.logo.alt}
              className="h-10 sm:h-12 w-auto object-contain select-none"
            />
          </a>

          {/* Comic Close Button */}
          <button
            type="button"
            onClick={onClose}
            aria-label="Close navigation menu"
            className="w-9 h-9 sm:w-11 sm:h-11 rounded-full bg-butter-yellow text-cocoa-brown border-[0.15rem] sm:border-[0.2rem] border-cocoa-brown shadow-[0.125rem_0.125rem_0_#4B1F0F] flex items-center justify-center cursor-pointer transition-transform duration-150 hover:scale-105 active:scale-95"
          >
            <X className="w-5 h-5 sm:w-6 sm:h-6 stroke-[2.75]" />
          </button>
        </div>

        {/* Center: Nav Menu Items */}
        <nav
          aria-label="Mobile menu links"
          className="my-auto py-6 sm:py-8 flex flex-col items-start gap-4 sm:gap-6"
        >
          {NAV_ITEMS.map((item, idx) => {
            const isActive = activeNavId === item.id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => handleNavClick(item.id)}
                className={`group flex items-center gap-2.5 sm:gap-3 text-left font-hero text-xl sm:text-2xl md:text-3xl lg:text-[clamp(1.75rem,7vw,2.5rem)] leading-none uppercase tracking-wide cursor-pointer transition-all duration-200 ${
                  isActive
                    ? 'text-red-orange translate-x-2'
                    : 'text-cocoa-brown hover:text-red-orange hover:translate-x-2'
                }`}
              >
                <span
                  aria-hidden="true"
                  className={`w-3 h-3 sm:w-3.5 sm:h-3.5 rounded-full border-[0.14rem] sm:border-[0.16rem] border-cocoa-brown transition-transform duration-200 ${
                    isActive
                      ? 'bg-red-orange scale-125'
                      : 'bg-butter-yellow group-hover:scale-125'
                  }`}
                />
                <span>{item.label}</span>
                <span className="font-comic text-xs sm:text-base text-cocoa-brown/40 lowercase ml-1">
                  0{idx + 1}
                </span>
              </button>
            );
          })}
        </nav>

        {/* Bottom: WhatsApp CTA Button + Social Icons */}
        <div className="pt-6 border-t-[0.22rem] border-cocoa-brown flex flex-col gap-5">
          {/* Primary WhatsApp Order CTA */}
          {whatsappUrl ? (
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={onClose}
              className="poprio-whatsapp-btn w-full py-4 px-6 inline-flex items-center justify-center gap-3 text-[1.125rem] tracking-wider uppercase select-none text-center rounded-[1rem] shadow-[0.3125rem_0.3125rem_0_#4B1F0F]"
            >
              <WhatsAppIcon />
              <span>CHAT &amp; ORDER ON WHATSAPP</span>
            </a>
          ) : (
            <button
              type="button"
              disabled
              className="poprio-whatsapp-btn w-full py-4 px-6 inline-flex items-center justify-center gap-3 text-[1.125rem] tracking-wider uppercase select-none text-center rounded-[1rem] opacity-90 shadow-[0.3125rem_0.3125rem_0_#4B1F0F]"
            >
              <WhatsAppIcon />
              <span>CHAT &amp; ORDER ON WHATSAPP</span>
            </button>
          )}

          {/* Social Icons Row */}
          <div className="flex items-center justify-center gap-4 pt-1">
            <span className="font-comic text-sm tracking-wider uppercase text-cocoa-brown/70 mr-1">
              FOLLOW US:
            </span>
            {SOCIAL_LINKS.map((social) => {
              const bgColor = SOCIAL_BADGE_COLORS[social.id];
              const normalizedUrl = social.url
                ? /^https?:\/\//i.test(social.url)
                  ? social.url
                  : `https://${social.url}`
                : undefined;

              if (normalizedUrl) {
                return (
                  <a
                    key={social.id}
                    href={normalizedUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.label}
                    className="poprio-social-btn w-11 h-11 inline-flex items-center justify-center shrink-0 cursor-pointer rounded-[0.625rem] border-[0.16rem] border-cocoa-brown shadow-[0.1875rem_0.1875rem_0_#4B1F0F]"
                    style={{ backgroundColor: bgColor }}
                  >
                    <ComicSocialSvg id={social.id} />
                  </a>
                );
              }

              return (
                <span
                  key={social.id}
                  className="poprio-social-btn w-11 h-11 inline-flex items-center justify-center shrink-0 rounded-[0.625rem] border-[0.16rem] border-cocoa-brown shadow-[0.1875rem_0.1875rem_0_#4B1F0F] opacity-75"
                  style={{ backgroundColor: bgColor }}
                >
                  <ComicSocialSvg id={social.id} />
                </span>
              );
            })}
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
};
