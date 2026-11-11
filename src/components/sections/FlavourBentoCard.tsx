import React, { useRef, useEffect, useCallback, forwardRef } from 'react';
import gsap from 'gsap';
import { ArrowUpRight } from 'lucide-react';
import { FlavourBentoCardConfig } from '../../data/products';
import { useProductModal } from '../../context/ProductModalContext';
import { PoprioEditableElement } from '../editor/PoprioEditableElement';

interface FlavourBentoCardProps {
  card: FlavourBentoCardConfig;
}

export const FlavourBentoCard = forwardRef<
  HTMLDivElement,
  FlavourBentoCardProps
>(({ card }, panelRef) => {
  const { selectedProductId, openProductModal } = useProductModal();

  const buttonRef = useRef<HTMLButtonElement>(null);
  const highlightOverlayRef = useRef<HTMLSpanElement>(null);
  const hoverImageRef = useRef<HTMLDivElement>(null);
  const arrowBadgeRef = useRef<HTMLSpanElement>(null);
  const arrowIconRef = useRef<SVGSVGElement>(null);
  const stageDecorRef = useRef<HTMLDivElement>(null);

  // Set initial resting orientation on the inner package image wrapper
  useEffect(() => {
    const imgWrap = hoverImageRef.current;
    if (!imgWrap) return;

    gsap.set(imgWrap, {
      rotation: card.basePackageRotation,
      scale: 1,
      y: 0,
      transformOrigin: 'center center',
    });
  }, [card.basePackageRotation]);

  const handleEnter = useCallback(() => {
    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;
    if (prefersReducedMotion) return;

    const highlightEl = highlightOverlayRef.current;
    const imgWrap = hoverImageRef.current;
    const arrowBadgeEl = arrowBadgeRef.current;
    const arrowEl = arrowIconRef.current;
    const decorEl = stageDecorRef.current;

    // 1. Subtle internal panel brightness highlight (panel boundaries stay stationary)
    if (highlightEl) {
      gsap.to(highlightEl, {
        opacity: 1,
        duration: 0.3,
        ease: 'power2.out',
        overwrite: 'auto',
      });
    }

    // 2. Lift product package ~0.5rem (-8px), scale to ~1.07, rotate 3–4 degrees
    if (imgWrap) {
      gsap.to(imgWrap, {
        scale: 1.07,
        rotation: card.basePackageRotation + card.hoverPackageRotationDelta,
        y: -8,
        duration: 0.36,
        ease: 'back.out(1.4)',
        overwrite: 'auto',
      });
    }

    // 3. Animate internal comic stage frame behind the package
    if (decorEl) {
      gsap.to(decorEl, {
        scale: 1.05,
        rotation: card.hoverCardRotation * -3,
        duration: 0.36,
        ease: 'power2.out',
        overwrite: 'auto',
      });
    }

    // 4. Animate arrow badge & arrow icon diagonally upward-right
    if (arrowBadgeEl) {
      gsap.to(arrowBadgeEl, {
        scale: 1.06,
        duration: 0.28,
        ease: 'power2.out',
        overwrite: 'auto',
      });
    }

    if (arrowEl) {
      gsap.to(arrowEl, {
        x: 3.5,
        y: -3.5,
        duration: 0.3,
        ease: 'power3.out',
        overwrite: 'auto',
      });
    }
  }, [
    card.basePackageRotation,
    card.hoverCardRotation,
    card.hoverPackageRotationDelta,
  ]);

  const handleLeave = useCallback(() => {
    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;
    if (prefersReducedMotion) return;

    const highlightEl = highlightOverlayRef.current;
    const imgWrap = hoverImageRef.current;
    const arrowBadgeEl = arrowBadgeRef.current;
    const arrowEl = arrowIconRef.current;
    const decorEl = stageDecorRef.current;

    if (highlightEl) {
      gsap.to(highlightEl, {
        opacity: 0,
        duration: 0.32,
        ease: 'power2.out',
        overwrite: 'auto',
      });
    }

    if (imgWrap) {
      gsap.to(imgWrap, {
        scale: 1,
        rotation: card.basePackageRotation,
        y: 0,
        duration: 0.36,
        ease: 'power3.out',
        overwrite: 'auto',
      });
    }

    if (decorEl) {
      gsap.to(decorEl, {
        scale: 1,
        rotation: 0,
        duration: 0.36,
        ease: 'power2.out',
        overwrite: 'auto',
      });
    }

    if (arrowBadgeEl) {
      gsap.to(arrowBadgeEl, {
        scale: 1,
        duration: 0.28,
        ease: 'power2.out',
        overwrite: 'auto',
      });
    }

    if (arrowEl) {
      gsap.to(arrowEl, {
        x: 0,
        y: 0,
        duration: 0.3,
        ease: 'power3.out',
        overwrite: 'auto',
      });
    }
  }, [card.basePackageRotation]);

  const handleClick = () => {
    openProductModal(card.productId, buttonRef.current);
  };

  const isHorizontalFeature = card.layoutVariant === 'horizontal-feature';
  const isVerticalCompact = card.layoutVariant === 'vertical-compact';
  const isWideFinale = card.layoutVariant === 'wide-finale';

  return (
    <div
      ref={panelRef}
      data-bento-card={card.id}
      data-bento-row={card.row}
      className="relative w-full h-full overflow-hidden"
      style={{
        backgroundColor: card.cardBg,
      }}
    >
      {/* Connected Stationary Comic Panel Button */}
      <button
        ref={buttonRef}
        type="button"
        onClick={handleClick}
        onMouseEnter={handleEnter}
        onMouseLeave={handleLeave}
        onFocus={handleEnter}
        onBlur={handleLeave}
        aria-haspopup="dialog"
        aria-expanded={selectedProductId === card.productId}
        aria-label={`${card.title} — ${card.description} Click to open full flavour details.`}
        className={`relative w-full h-full p-0 m-0 border-0 rounded-none text-left cursor-pointer overflow-hidden select-none flex focus-visible:outline-none focus-visible:ring-inset focus-visible:ring-4 focus-visible:ring-warm-purple ${
          isVerticalCompact
            ? 'flex-col justify-between min-h-[17rem] sm:min-h-[24rem]'
            : isWideFinale
              ? 'flex-col lg:flex-row items-stretch justify-between min-h-[17.5rem] sm:min-h-[20.5rem] lg:h-[21.5rem]'
              : 'flex-col sm:flex-row items-stretch justify-between min-h-[17.5rem] sm:min-h-[24rem]'
        }`}
        style={{
          backgroundColor: card.cardBg,
          color: card.textColor,
        }}
      >
        {/* Subtle Hover Highlight Layer */}
        <span
          ref={highlightOverlayRef}
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 z-0 opacity-0 bg-warm-cream/12"
        />

        {/* Top-Right Comic Arrow-Up-Right Action Badge */}
        <span
          ref={arrowBadgeRef}
          aria-hidden="true"
          className="absolute top-3.5 right-3.5 sm:top-6 sm:right-6 z-30 w-8 h-8 sm:w-11 sm:h-11 rounded-full comic-border-card flex items-center justify-center shrink-0"
          style={{
            backgroundColor: card.arrowBadgeBg,
            color: card.arrowBadgeText,
            boxShadow: 'var(--shadow-hard-xs)',
          }}
        >
          <ArrowUpRight
            ref={arrowIconRef}
            className="w-4 h-4 sm:w-5 sm:h-5 stroke-[2.75]"
          />
        </span>

        {/* =================================================================
            VARIANT A: LARGE HORIZONTAL PANEL (Row 1 Strawberry, Row 2 Cookies & Cream)
            ================================================================= */}
        {isHorizontalFeature && (
          <>
            {/* Left Editorial Copy Block */}
            <span
              data-panel-copy
              className={`relative z-20 w-full sm:w-[53%] p-5 sm:p-8 lg:p-10 flex flex-col justify-between ${
                card.id === 'bento-cookies-cream' ? 'lg:pl-12' : ''
              }`}
            >
              <span className="block">
                <span
                  className="inline-flex items-center gap-1.5 sm:gap-2 font-jakarta text-[0.6875rem] sm:text-[0.8125rem] font-extrabold uppercase tracking-[0.14em]"
                  style={{ color: card.labelColor }}
                >
                  <span>{card.flavourNumber}</span>
                  <span aria-hidden="true">·</span>
                  <span>{card.label}</span>
                </span>

                <span
                  className="block mt-2 sm:mt-3 font-hero text-xl sm:text-2xl lg:text-[clamp(2.125rem,2.9vw,3rem)] leading-[1.02] lg:leading-[0.98] tracking-[-0.015em] uppercase"
                  style={{ color: card.textColor }}
                >
                  {card.title}
                </span>

                <span
                  className="block mt-2 sm:mt-3.5 max-w-[20rem] font-jakarta text-xs sm:text-sm lg:text-[1.0625rem] font-bold leading-snug"
                  style={{ color: card.mutedTextColor }}
                >
                  {card.description}
                </span>
              </span>

              <span
                className="mt-3.5 sm:mt-6 inline-flex items-center gap-2 font-jakarta text-[0.6875rem] sm:text-[0.75rem] font-extrabold uppercase tracking-[0.12em]"
                style={{ color: card.textColor }}
              >
                <span
                  aria-hidden="true"
                  className="w-2.5 h-2.5 rounded-full border-[0.125rem] border-cocoa-brown"
                  style={{ backgroundColor: card.arrowBadgeBg }}
                />
                <span>VIEW FLAVOUR DOSSIER</span>
              </span>
            </span>

            {/* Right Oversized Package Stage */}
            <span
              data-panel-stage
              className={`relative z-10 w-full sm:w-[47%] min-h-[13rem] sm:min-h-full flex items-center justify-center py-4 sm:py-5 ${
                card.id === 'bento-strawberry'
                  ? 'pr-4 sm:pr-8 lg:pr-12'
                  : 'pr-4 sm:pr-6 lg:pr-10'
              }`}
            >
              {/* Internal Comic Stage Frame */}
              <div
                ref={stageDecorRef}
                aria-hidden="true"
                className="absolute right-4 sm:right-8 lg:right-12 top-1/2 -translate-y-1/2 w-[10.5rem] sm:w-[13.5rem] h-[13.5rem] sm:h-[16.5rem] rounded-[1.25rem] comic-border-card"
                style={{
                  backgroundColor: card.stageAccentBg,
                  boxShadow: 'var(--shadow-hard-sm)',
                }}
              />

              {/* Inner Package Image Transform Wrapper */}
              <div
                ref={hoverImageRef}
                className="relative z-10 flex items-center justify-center"
              >
                <PoprioEditableElement
                  elementId={`flavourverse.card.${card.id}`}
                  type="image"
                  label={`${card.title} Package`}
                >
                  <img
                    src={card.packageImage}
                    alt={card.packageAlt}
                    loading="lazy"
                    decoding="async"
                    draggable={false}
                    className="h-[12.5rem] sm:h-[15rem] lg:h-[18.75rem] w-auto object-contain drop-shadow-[0_10px_0_rgba(75,31,15,0.32)] select-none pointer-events-none"
                  />
                </PoprioEditableElement>
              </div>
            </span>
          </>
        )}

        {/* =================================================================
            VARIANT B: COMPACT VERTICAL PANEL (Row 1 Caramel, Row 2 Choco Hazelnut)
            ================================================================= */}
        {isVerticalCompact && (
          <>
            {/* Top Editorial Header */}
            <span
              data-panel-copy
              className={`relative z-20 w-full p-5 sm:p-7 lg:p-8 pb-1 sm:pb-2 block ${
                card.id === 'bento-caramel' ? 'lg:pl-10' : 'lg:pr-10'
              }`}
            >
              <span
                className="inline-flex items-center gap-1.5 sm:gap-2 font-jakarta text-[0.6875rem] sm:text-[0.8125rem] font-extrabold uppercase tracking-[0.14em] pr-10"
                style={{ color: card.labelColor }}
              >
                <span>{card.flavourNumber}</span>
                <span aria-hidden="true">·</span>
                <span>{card.label}</span>
              </span>

              <span
                className="block mt-1.5 sm:mt-2.5 font-hero text-lg sm:text-xl lg:text-[clamp(1.75rem,2.1vw,2.15rem)] leading-[1.0] tracking-[-0.015em] uppercase pr-8"
                style={{ color: card.textColor }}
              >
                {card.title}
              </span>

              <span
                className="block mt-1.5 sm:mt-2 max-w-[17.5rem] font-jakarta text-xs sm:text-sm lg:text-[0.95rem] font-bold leading-snug"
                style={{ color: card.mutedTextColor }}
              >
                {card.description}
              </span>
            </span>

            {/* Dominant Lower Product Package Visual */}
            <span
              data-panel-stage
              className="relative z-10 w-full flex-1 flex items-end justify-center pb-3.5 sm:pb-5 pt-1 px-4"
            >
              {/* Internal Comic Stage Backdrop */}
              <div
                ref={stageDecorRef}
                aria-hidden="true"
                className="absolute bottom-2.5 sm:bottom-3.5 left-1/2 -translate-x-1/2 w-[9.5rem] sm:w-[11.5rem] h-[8rem] sm:h-[9.5rem] rounded-[1.125rem] comic-border-card"
                style={{
                  backgroundColor: card.stageAccentBg,
                  boxShadow: 'var(--shadow-hard-xs)',
                }}
              />

              {/* Inner Package Image Transform Wrapper */}
              <div
                ref={hoverImageRef}
                className="relative z-10 flex items-center justify-center"
              >
                <PoprioEditableElement
                  elementId={`flavourverse.card.${card.id}`}
                  type="image"
                  label={`${card.title} Package`}
                >
                  <img
                    src={card.packageImage}
                    alt={card.packageAlt}
                    loading="lazy"
                    decoding="async"
                    draggable={false}
                    className="h-[9.5rem] sm:h-[11rem] lg:h-[12.75rem] w-auto object-contain drop-shadow-[0_9px_0_rgba(75,31,15,0.34)] select-none pointer-events-none"
                  />
                </PoprioEditableElement>
              </div>
            </span>
          </>
        )}

        {/* =================================================================
            VARIANT C: FULL-WIDTH CLOSING PANEL (Row 3 Chocolate Peanut Caramel)
            ================================================================= */}
        {isWideFinale && (
          <>
            {/* Left Editorial Finale Copy Block */}
            <span
              data-panel-copy
              className="relative z-20 w-full lg:w-[58%] p-5 sm:p-8 lg:p-10 flex flex-col justify-between"
            >
              <span className="block">
                <span
                  className="inline-flex items-center gap-1.5 sm:gap-2 font-jakarta text-[0.6875rem] sm:text-[0.875rem] font-extrabold uppercase tracking-[0.14em]"
                  style={{ color: card.labelColor }}
                >
                  <span>{card.flavourNumber}</span>
                  <span aria-hidden="true">·</span>
                  <span>{card.label}</span>
                </span>

                <span
                  className="block mt-2 sm:mt-3 font-hero text-xl sm:text-2xl lg:text-[clamp(2.125rem,3.2vw,3.25rem)] leading-[1.02] lg:leading-[0.98] tracking-[-0.015em] uppercase max-w-[36rem]"
                  style={{ color: card.textColor }}
                >
                  {card.title}
                </span>

                <span
                  className="block mt-2 sm:mt-3.5 font-jakarta text-xs sm:text-sm lg:text-[1.1875rem] font-bold leading-snug max-w-[26rem]"
                  style={{ color: card.mutedTextColor }}
                >
                  {card.description}
                </span>
              </span>

              <span className="mt-3.5 sm:mt-6 flex flex-wrap items-center gap-x-3 sm:gap-x-4 gap-y-1.5 sm:gap-y-2 font-jakarta text-[0.6875rem] sm:text-[0.8125rem] font-extrabold uppercase tracking-[0.12em]">
                <span className="inline-flex items-center gap-1.5 sm:gap-2">
                  <span
                    aria-hidden="true"
                    className="w-2 sm:w-2.5 h-2 sm:h-2.5 rounded-full bg-red-orange border-[0.125rem] border-cocoa-brown"
                  />
                  <span>ROASTED PEANUT CRUNCH</span>
                </span>
                <span aria-hidden="true" className="opacity-50">
                  ·
                </span>
                <span>GOLDEN CARAMEL GLAZE</span>
                <span aria-hidden="true" className="opacity-50">
                  ·
                </span>
                <span>CHOCOLATE DRIZZLE</span>
              </span>
            </span>

            {/* Right Prominent Finale Package Showcase */}
            <span
              data-panel-stage
              className="relative z-10 w-full lg:w-[42%] min-h-[13rem] sm:min-h-[16.5rem] lg:min-h-full flex items-center justify-center pr-4 sm:pr-6 lg:pr-14 py-3 sm:py-4"
            >
              {/* Wide Finale Internal Comic Stage Frame */}
              <div
                ref={stageDecorRef}
                aria-hidden="true"
                className="absolute right-4 sm:right-10 lg:right-16 top-1/2 -translate-y-1/2 w-[12.5rem] sm:w-[17rem] h-[12.5rem] sm:h-[15.5rem] rounded-[1.25rem] comic-border-card"
                style={{
                  backgroundColor: card.stageAccentBg,
                  boxShadow: 'var(--shadow-hard)',
                }}
              />

              {/* Inner Package Image Transform Wrapper */}
              <div
                ref={hoverImageRef}
                className="relative z-10 flex items-center justify-center"
              >
                <PoprioEditableElement
                  elementId={`flavourverse.card.${card.id}`}
                  type="image"
                  label={`${card.title} Package`}
                >
                  <img
                    src={card.packageImage}
                    alt={card.packageAlt}
                    loading="lazy"
                    decoding="async"
                    draggable={false}
                    className="h-[12rem] sm:h-[15rem] lg:h-[18rem] w-auto object-contain drop-shadow-[0_12px_0_rgba(75,31,15,0.34)] select-none pointer-events-none"
                  />
                </PoprioEditableElement>
              </div>
            </span>
          </>
        )}
      </button>
    </div>
  );
});

FlavourBentoCard.displayName = 'FlavourBentoCard';
