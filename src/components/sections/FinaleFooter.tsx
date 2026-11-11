import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowUp, ArrowUpRight } from 'lucide-react';
import {
  getWhatsAppOrderUrl,
  NavItemConfig,
  SOCIAL_LINKS,
  WHATSAPP_GREETING,
  WHATSAPP_NUMBER,
} from '../../config/site';
import { ORIGIN_STORY_ASSETS } from '../../data/originStoryData';
import { usePoprioContent } from '../../context/PoprioContentContext';
import { PoprioEditableElement } from '../editor/PoprioEditableElement';

gsap.registerPlugin(ScrollTrigger);

function WhatsAppFinaleIcon() {
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

function normalizeExternalUrl(rawUrl: string | undefined): string | null {
  const trimmed = rawUrl?.trim() ?? '';
  if (!trimmed) return null;
  if (/^https?:\/\//i.test(trimmed)) return trimmed;
  return `https://${trimmed}`;
}

export interface FinaleFooterProps {
  onNavigate?: (id: NavItemConfig['id']) => void;
}

export const FinaleFooter: React.FC<FinaleFooterProps> = ({ onNavigate }) => {
  const { footer, meta } = usePoprioContent();
  const footerRef = useRef<HTMLElement>(null);
  const statementRef = useRef<HTMLParagraphElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const copyRef = useRef<HTMLParagraphElement>(null);
  const ctaGroupRef = useRef<HTMLDivElement>(null);
  const utilityNavRef = useRef<HTMLElement>(null);
  const watermarkRef = useRef<HTMLDivElement>(null);

  const currentYear = new Date().getFullYear();

  const whatsappUrl = getWhatsAppOrderUrl(
    meta?.whatsappNumber || WHATSAPP_NUMBER,
    meta?.whatsappGreeting || WHATSAPP_GREETING
  );

  const socialLinks = meta?.socialLinks?.length ? meta.socialLinks : SOCIAL_LINKS;
  const instagramEntry = socialLinks.find((item) => item.id === 'instagram');
  const instagramUrl = normalizeExternalUrl(instagramEntry?.url);

  const scrollToSection = (sectionId: string) => {
    const targetEl = document.getElementById(sectionId);
    if (!targetEl) return;

    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;

    targetEl.scrollIntoView({
      behavior: prefersReducedMotion ? 'auto' : 'smooth',
      block: 'start',
    });
  };

  const handleBackToTop = () => {
    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;

    window.scrollTo({
      top: 0,
      behavior: prefersReducedMotion ? 'auto' : 'smooth',
    });
  };

  useEffect(() => {
    const footerEl = footerRef.current;
    if (!footerEl) return;

    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;

    const ctx = gsap.context(() => {
      const statementEl = statementRef.current;
      const headlineEl = headlineRef.current;
      const copyEl = copyRef.current;
      const ctaEl = ctaGroupRef.current;
      const navEl = utilityNavRef.current;
      const watermarkEl = watermarkRef.current;

      if (prefersReducedMotion) {
        gsap.set(
          [statementEl, headlineEl, copyEl, ctaEl, navEl, watermarkEl],
          {
            opacity: 1,
            y: 0,
          }
        );
        return;
      }

      gsap.set([statementEl, headlineEl, copyEl, ctaEl, navEl], {
        opacity: 0,
        y: '1.5rem',
      });
      gsap.set(watermarkEl, {
        opacity: 0,
        y: '2rem',
      });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: footerEl,
          start: 'top 82%',
          once: true,
        },
      });

      tl.to(statementEl, {
        opacity: 1,
        y: '0rem',
        duration: 0.4,
        ease: 'power3.out',
      })
        .to(
          headlineEl,
          {
            opacity: 1,
            y: '0rem',
            duration: 0.55,
            ease: 'back.out(1.25)',
          },
          '-=0.24'
        )
        .to(
          copyEl,
          {
            opacity: 1,
            y: '0rem',
            duration: 0.45,
            ease: 'power3.out',
          },
          '-=0.3'
        )
        .to(
          ctaEl,
          {
            opacity: 1,
            y: '0rem',
            duration: 0.48,
            ease: 'back.out(1.35)',
          },
          '-=0.26'
        )
        .to(
          navEl,
          {
            opacity: 1,
            y: '0rem',
            duration: 0.42,
            ease: 'power3.out',
          },
          '-=0.26'
        )
        .to(
          watermarkEl,
          {
            opacity: 1,
            y: '0rem',
            duration: 0.65,
            ease: 'power3.out',
          },
          '-=0.35'
        );
    }, footerRef);

    return () => {
      ctx.revert();
    };
  }, []);

  return (
    <footer
      id="contact"
      ref={footerRef}
      aria-labelledby="finale-cta-heading"
      className="relative w-full bg-[#4B1F0F] text-warm-cream border-t-[0.3125rem] border-solid border-[#260E06] overflow-hidden"
    >
      {/* =====================================================================
          LOW-CONTRAST COMIC HALFTONE & RADIAL RAYS TEXTURE (LOWEST LAYER)
          ===================================================================== */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-0 opacity-[0.045]"
        style={{
          backgroundImage:
            'radial-gradient(#FFF3E0 1.5px, transparent 1.5px)',
          backgroundSize: '20px 20px',
        }}
      />

      <svg
        aria-hidden="true"
        viewBox="0 0 1440 800"
        preserveAspectRatio="xMidYMid slice"
        className="pointer-events-none absolute inset-0 w-full h-full z-0 opacity-[0.045]"
      >
        <g stroke="#FFF3E0" strokeWidth="2">
          <line x1="720" y1="300" x2="0" y2="0" />
          <line x1="720" y1="300" x2="360" y2="0" />
          <line x1="720" y1="300" x2="720" y2="0" />
          <line x1="720" y1="300" x2="1080" y2="0" />
          <line x1="720" y1="300" x2="1440" y2="0" />
          <line x1="720" y1="300" x2="0" y2="400" />
          <line x1="720" y1="300" x2="1440" y2="400" />
          <line x1="720" y1="300" x2="180" y2="800" />
          <line x1="720" y1="300" x2="1260" y2="800" />
        </g>
      </svg>

      {/* =====================================================================
          MAIN FINALE CALL-TO-ACTION AREA (FOREGROUND LAYER)
          ===================================================================== */}
      <div className="relative z-20 w-full max-w-[84rem] mx-auto pt-24 lg:pt-28 px-6 lg:px-10 flex flex-col items-center text-center">
        {/* 1. Small Upper Brand Statement */}
        <PoprioEditableElement elementId="footer.statement" type="text" label="Footer Statement">
          <p
            ref={statementRef}
            className="m-0 font-jakarta text-[0.625rem] sm:text-xs md:text-[0.875rem] font-extrabold tracking-[0.11em] md:tracking-[0.18em] text-butter-yellow uppercase"
          >
            {footer?.statement || 'SMALL BATCHES ✦ BIG CRAVINGS ✦ FLAVOUR THAT POPS'}
          </p>
        </PoprioEditableElement>

        {/* 2. Large Central Headline */}
        <PoprioEditableElement elementId="footer.headline" type="text" label="Footer Headline">
          <h2
            id="finale-cta-heading"
            ref={headlineRef}
            className="m-0 mt-3 sm:mt-5 font-hero text-[2.375rem] sm:text-5xl lg:text-[clamp(3.5rem,7.6vw,8rem)] leading-[1.05] lg:leading-[0.95] tracking-[-0.02em] text-warm-cream uppercase"
            style={{
              textShadow: '0.25rem 0.25rem 0 #E0351B, 0.45rem 0.45rem 0 #260E06',
            }}
          >
            {footer?.headline || 'READY TO POP IN?'}
          </h2>
        </PoprioEditableElement>

        {/* 3. Supporting Copy */}
        <PoprioEditableElement elementId="footer.copy" type="text" label="Footer Copy">
          <p
            ref={copyRef}
            className="m-0 mt-3 sm:mt-6 max-w-[40rem] font-jakarta text-sm sm:text-base lg:text-[clamp(1.125rem,1.4vw,1.375rem)] font-bold leading-relaxed text-warm-cream/90"
          >
            {footer?.copy || 'Your next popcorn obsession is only a WhatsApp message away.'}
          </p>
        </PoprioEditableElement>

        {/* 4. Two Prominent CTA Buttons */}
        <div
          ref={ctaGroupRef}
          className="mt-6 sm:mt-9 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-5 w-full max-w-xs sm:max-w-none"
        >
          {/* Button 1 — Primary: CHAT ON WHATSAPP */}
          <PoprioEditableElement elementId="footer.ctaWhatsApp" type="button" label="WhatsApp CTA Button">
            {whatsappUrl ? (
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-6 sm:px-8 py-3.5 sm:py-4 rounded-full bg-butter-yellow text-cocoa-brown border-[0.22rem] border-solid border-[#260E06] font-jakarta text-sm sm:text-[1rem] font-extrabold tracking-[0.06em] uppercase cursor-pointer select-none shadow-[0.3125rem_0.3125rem_0_#E0351B] transition-all duration-200 hover:-translate-y-1 hover:-rotate-1 hover:shadow-[0.45rem_0.45rem_0_#E0351B] active:translate-y-0.5 active:rotate-0 active:shadow-[0.15rem_0.15rem_0_#E0351B]"
              >
                <WhatsAppFinaleIcon />
                <span>{footer?.ctaWhatsAppText || 'CHAT ON WHATSAPP'}</span>
              </a>
            ) : (
              <button
                type="button"
                disabled
                aria-disabled="true"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-6 sm:px-8 py-3.5 sm:py-4 rounded-full bg-butter-yellow text-cocoa-brown border-[0.22rem] border-solid border-[#260E06] font-jakarta text-sm sm:text-[1rem] font-extrabold tracking-[0.06em] uppercase opacity-90 cursor-not-allowed select-none shadow-[0.3125rem_0.3125rem_0_#E0351B]"
              >
                <WhatsAppFinaleIcon />
                <span>{footer?.ctaWhatsAppText || 'CHAT ON WHATSAPP'}</span>
              </button>
            )}
          </PoprioEditableElement>

          {/* Button 2 — Secondary: VIEW FLAVOURS */}
          <PoprioEditableElement elementId="footer.ctaFlavours" type="button" label="View Flavours CTA Button">
            <button
              type="button"
              onClick={() => {
                if (onNavigate) {
                  onNavigate('products');
                } else {
                  scrollToSection('flavourverse');
                }
              }}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-6 sm:px-8 py-3.5 sm:py-4 rounded-full bg-warm-cream text-cocoa-brown border-[0.22rem] border-solid border-[#260E06] font-jakarta text-sm sm:text-[1rem] font-extrabold tracking-[0.06em] uppercase cursor-pointer select-none shadow-[0.3125rem_0.3125rem_0_#260E06] transition-all duration-200 hover:-translate-y-1 hover:rotate-1 hover:shadow-[0.45rem_0.45rem_0_#260E06] active:translate-y-0.5 active:rotate-0 active:shadow-[0.15rem_0.15rem_0_#260E06]"
            >
              <span>{footer?.ctaFlavoursText || 'VIEW FLAVOURS'}</span>
            </button>
          </PoprioEditableElement>
        </div>

        {/* 5. Utility Navigation Links */}
        <nav
          ref={utilityNavRef}
          aria-label="Footer utility navigation"
          className="mt-12 flex flex-wrap items-center justify-center gap-x-9 gap-y-3"
        >
          <a
            href="#about"
            onClick={(e) => {
              e.preventDefault();
              if (onNavigate) {
                onNavigate('about');
              } else {
                scrollToSection('origin-story');
              }
            }}
            className="group inline-flex items-center gap-1 font-jakarta text-[0.875rem] font-extrabold tracking-[0.14em] text-warm-cream/85 hover:text-butter-yellow uppercase transition-colors duration-200"
          >
            <span>ABOUT</span>
            <ArrowUpRight
              aria-hidden="true"
              className="w-3.5 h-3.5 opacity-70 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            />
          </a>

          <a
            href="#flavourverse"
            onClick={(e) => {
              e.preventDefault();
              if (onNavigate) {
                onNavigate('products');
              } else {
                scrollToSection('flavourverse');
              }
            }}
            className="group inline-flex items-center gap-1 font-jakarta text-[0.875rem] font-extrabold tracking-[0.14em] text-warm-cream/85 hover:text-butter-yellow uppercase transition-colors duration-200"
          >
            <span>PRODUCTS</span>
            <ArrowUpRight
              aria-hidden="true"
              className="w-3.5 h-3.5 opacity-70 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            />
          </a>

          <a
            href="#contact-page"
            onClick={(e) => {
              e.preventDefault();
              if (onNavigate) {
                onNavigate('contact');
              } else {
                scrollToSection('how-to-order');
              }
            }}
            className="group inline-flex items-center gap-1 font-jakarta text-[0.875rem] font-extrabold tracking-[0.14em] text-warm-cream/85 hover:text-butter-yellow uppercase transition-colors duration-200"
          >
            <span>CONTACT</span>
            <ArrowUpRight
              aria-hidden="true"
              className="w-3.5 h-3.5 opacity-70 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            />
          </a>

          {instagramUrl ? (
            <a
              href={instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-1 font-jakarta text-[0.875rem] font-extrabold tracking-[0.14em] text-warm-cream/85 hover:text-butter-yellow uppercase transition-colors duration-200"
            >
              <span>INSTAGRAM</span>
              <ArrowUpRight
                aria-hidden="true"
                className="w-3.5 h-3.5 opacity-70 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              />
            </a>
          ) : (
            <span
              title="Official Instagram URL pending configuration in src/config/site.ts"
              className="inline-flex items-center gap-1 font-jakarta text-[0.875rem] font-extrabold tracking-[0.14em] text-warm-cream/50 uppercase cursor-default"
            >
              <span>INSTAGRAM</span>
            </span>
          )}
        </nav>
      </div>

      {/* =====================================================================
          6 & 7. GIANT DECORATIVE BRAND WORD + SINGLE PEEKING MASCOT ACCENT
          ===================================================================== */}
      <div
        ref={watermarkRef}
        className="pointer-events-none select-none relative z-10 w-full max-w-[90rem] mx-auto mt-8 lg:mt-10 pt-8 overflow-hidden flex flex-col items-center justify-end"
      >
        {/* Single Approved Mascot Character Peeking Above the Oversized Brand Word */}
        <div className="relative z-20 w-full max-w-[78rem] mx-auto flex justify-end pr-8 lg:pr-20 -mb-8 lg:-mb-12">
          <img
            src={ORIGIN_STORY_ASSETS.scene4.mascotCelebration.src}
            alt="POPRIO mascot waving from the footer"
            loading="lazy"
            decoding="async"
            draggable={false}
            className="h-[7rem] lg:h-[9.25rem] w-auto object-contain -rotate-6 drop-shadow-[0_8px_0_#260E06]"
          />
        </div>

        {/* Giant Editorial Background Brand Wordmark (Partially Cropped at Lower Edge) */}
        <div
          aria-hidden="true"
          className="relative z-10 font-hero text-[clamp(6.25rem,18.5vw,18.5rem)] leading-[0.76] tracking-[-0.03em] uppercase whitespace-nowrap translate-y-[10%]"
          style={{
            color: '#381509',
            WebkitTextStroke: '0.15rem rgba(255, 243, 224, 0.16)',
            paintOrder: 'stroke fill',
            textShadow: '0.375rem 0.375rem 0 #260E06',
          }}
        >
          POPRIO
        </div>
      </div>

      {/* =====================================================================
          8 & 9. FOOTER LOWER AREA + BACK-TO-TOP CONTROL
          ===================================================================== */}
      <div className="relative z-20 w-full border-t-[0.125rem] border-solid border-warm-cream/20 bg-[#3B170B]">
        <div className="w-full max-w-[84rem] mx-auto px-4 sm:px-6 lg:px-10 py-4 md:py-5 flex flex-col md:flex-row items-center justify-between gap-3 md:gap-4">
          {/* Left: Dynamic Copyright */}
          <p className="m-0 font-jakarta text-[0.6875rem] md:text-[0.8125rem] font-bold tracking-[0.06em] md:tracking-[0.08em] text-warm-cream/85 uppercase text-center md:text-left">
            &copy; {currentYear} {meta?.name || 'POPRIO'}. {footer?.copyrightText ? footer.copyrightText.toUpperCase() : 'ALL RIGHTS RESERVED.'}
          </p>

          {/* Right: Tagline + Back-to-Top Button */}
          <div className="flex items-center gap-3 md:gap-5">
            <p className="m-0 font-jakarta text-[0.65rem] sm:text-xs md:text-[0.8125rem] font-extrabold tracking-[0.07em] md:tracking-[0.1em] text-butter-yellow uppercase text-center md:text-right">
              CRAFTED IN DHAKA{' '}
              <span aria-hidden="true" className="mx-1 text-red-orange">
                ✦
              </span>{' '}
              SERVED WITH CRUNCH
            </p>

            {/* Back-to-Top Button */}
            <button
              type="button"
              onClick={handleBackToTop}
              aria-label="Back to top"
              title="Back to top"
              className="group w-9 h-9 md:w-11 md:h-11 rounded-[0.625rem] md:rounded-[0.75rem] bg-butter-yellow text-cocoa-brown border-[0.15rem] md:border-[0.1875rem] border-solid border-[#260E06] flex items-center justify-center shrink-0 cursor-pointer shadow-[0.15rem_0.15rem_0_#260E06] md:shadow-[0.2rem_0.2rem_0_#260E06] transition-all duration-200 hover:-translate-y-1 hover:shadow-[0.3rem_0.3rem_0_#260E06] active:translate-y-0 active:shadow-[0.1rem_0.1rem_0_#260E06]"
            >
              <ArrowUp
                aria-hidden="true"
                className="w-4 h-4 md:w-5 md:h-5 stroke-[2.75] transition-transform duration-200 group-hover:-translate-y-0.5"
              />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
