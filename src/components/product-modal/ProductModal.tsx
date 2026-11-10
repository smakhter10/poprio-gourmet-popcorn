import React, { useState, useEffect, useRef, useCallback } from 'react';
import { createPortal } from 'react-dom';
import gsap from 'gsap';
import { X, Check } from 'lucide-react';
import {
  ProductDetailItem,
  ProductSizeOption,
} from '../../data/products';
import { getWhatsAppOrderUrl, WHATSAPP_NUMBER } from '../../config/site';
import { ProductGallery } from './ProductGallery';
import { ProductIngredients } from './ProductIngredients';

function WhatsAppModalIcon() {
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

interface ProductModalProps {
  product: ProductDetailItem | null;
  onClose: () => void;
}

export const ProductModal: React.FC<ProductModalProps> = ({
  product,
  onClose,
}) => {
  const [selectedSize, setSelectedSize] =
    useState<ProductSizeOption['id']>('regular');
  const [showWhatsAppNotice, setShowWhatsAppNotice] = useState(false);

  const overlayRef = useRef<HTMLDivElement>(null);
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const isClosingRef = useRef(false);

  // Reset size and notice whenever a new product opens
  useEffect(() => {
    if (product) {
      setSelectedSize(product.sizes[0]?.id ?? 'regular');
      setShowWhatsAppNotice(false);
      isClosingRef.current = false;
    }
  }, [product]);

  // Smooth close handler with GSAP exit animation
  const triggerClose = useCallback(() => {
    if (isClosingRef.current) return;
    isClosingRef.current = true;

    const overlayEl = overlayRef.current;
    const dialogEl = dialogRef.current;

    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;

    if (prefersReducedMotion || !overlayEl || !dialogEl) {
      onClose();
      return;
    }

    const tl = gsap.timeline({
      onComplete: () => {
        onClose();
      },
    });

    tl.to(dialogEl, {
      scale: 0.94,
      y: 20,
      opacity: 0,
      duration: 0.22,
      ease: 'power2.in',
    });

    tl.to(
      overlayEl,
      {
        opacity: 0,
        duration: 0.2,
        ease: 'power2.inOut',
      },
      '<+=0.03'
    );
  }, [onClose]);

  // Lock body scroll, animate entrance, trap focus, and handle Escape
  useEffect(() => {
    if (!product) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const overlayEl = overlayRef.current;
    const dialogEl = dialogRef.current;

    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;

    const ctx = gsap.context(() => {
      if (!overlayEl || !dialogEl) return;

      if (prefersReducedMotion) {
        gsap.set(overlayEl, { opacity: 1 });
        gsap.set(dialogEl, { opacity: 1, scale: 1, y: 0 });
      } else {
        gsap.fromTo(
          overlayEl,
          { opacity: 0 },
          { opacity: 1, duration: 0.26, ease: 'power2.out' }
        );
        gsap.fromTo(
          dialogEl,
          { opacity: 0, scale: 0.92, y: 28 },
          {
            opacity: 1,
            scale: 1,
            y: 0,
            duration: 0.38,
            ease: 'back.out(1.25)',
          }
        );
      }
    });

    // Focus the close button on mount for immediate keyboard accessibility
    const focusTimer = window.setTimeout(() => {
      closeButtonRef.current?.focus();
    }, 30);

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault();
        triggerClose();
        return;
      }

      if (event.key === 'Tab' && dialogEl) {
        const focusableElements = dialogEl.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'
        );
        if (focusableElements.length === 0) return;

        const firstEl = focusableElements[0];
        const lastEl = focusableElements[focusableElements.length - 1];

        if (event.shiftKey && document.activeElement === firstEl) {
          event.preventDefault();
          lastEl.focus();
        } else if (!event.shiftKey && document.activeElement === lastEl) {
          event.preventDefault();
          firstEl.focus();
        }
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      window.clearTimeout(focusTimer);
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = previousOverflow;
      ctx.revert();
    };
  }, [product, triggerClose]);

  if (!product || typeof document === 'undefined') return null;

  const activeSizeObj =
    product.sizes.find((s) => s.id === selectedSize) ?? product.sizes[0];

  const customWhatsAppGreeting = `Hi POPRIO! I'd like to order ${product.title} (${activeSizeObj?.label ?? 'Regular'} size).`;
  const whatsappUrl = getWhatsAppOrderUrl(
    WHATSAPP_NUMBER,
    customWhatsAppGreeting
  );

  const titleId = `poprio-modal-title-${product.slug}`;
  const descId = `poprio-modal-desc-${product.slug}`;

  return createPortal(
    <div
      ref={overlayRef}
      onClick={(event) => {
        if (event.target === event.currentTarget) {
          triggerClose();
        }
      }}
      className="fixed inset-0 z-[9999] bg-cocoa-brown/80 flex items-center justify-center p-4 lg:p-6 overflow-y-auto"
    >
      {/* Centered Near-Fullscreen Modal Container */}
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        aria-describedby={descId}
        className="relative w-[96vw] max-w-[92rem] max-h-[92vh] lg:min-h-[88vh] bg-warm-cream text-cocoa-brown comic-border-thick rounded-[1.25rem] sm:rounded-[1.5rem] lg:rounded-[1.75rem] p-4 sm:p-7 lg:p-11 my-auto flex flex-col justify-start lg:justify-center overflow-y-auto lg:overflow-hidden"
        style={{ boxShadow: '0.4rem 0.4rem 0 #4B1F0F' }}
      >
        {/* Top-Right Close Button */}
        <button
          ref={closeButtonRef}
          type="button"
          onClick={triggerClose}
          aria-label="Close product details popup"
          className="absolute top-3 right-3 sm:top-6 sm:right-6 z-30 w-8 h-8 sm:w-11 sm:h-11 md:w-12 md:h-12 rounded-full bg-butter-yellow text-cocoa-brown comic-border-card flex items-center justify-center cursor-pointer transition-transform duration-200 hover:scale-105 hover:rotate-6 active:scale-95 shadow-[0.14rem_0.14rem_0_#4B1F0F] sm:shadow-[var(--shadow-hard-sm)]"
        >
          <X className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 stroke-[3]" />
        </button>

        {/* Two-Column Desktop Content Layout: Left ~45% Media | Right ~55% Details */}
        <div className="w-full flex-1 grid grid-cols-1 lg:grid-cols-[45%_55%] gap-5 sm:gap-7 lg:gap-10 items-stretch">
          {/* LEFT COLUMN (45%): Product Media & Gallery Panel */}
          <div className="w-full h-full flex flex-col">
            <ProductGallery
              productTitle={product.title}
              accentColor={product.accentColor}
              images={product.galleryImages}
            />
          </div>

          {/* RIGHT COLUMN (55%): Product Information Panel */}
          <div className="w-full lg:pr-10 flex flex-col justify-between gap-4 sm:gap-5 lg:gap-6">
            <div>
              {/* B. Small Comic Flavour Badge (Bangers) */}
              {product.badge && (
                <p className="m-0 mb-1 sm:mb-2 font-comic text-xs sm:text-sm lg:text-[1.1875rem] tracking-[0.08em] text-red-orange uppercase">
                  {product.badge}
                </p>
              )}

              {/* A. Large Product Title (Archivo Black) */}
              <h2
                id={titleId}
                className="m-0 font-hero text-xl sm:text-2xl lg:text-[clamp(2.125rem,3.2vw,3.125rem)] leading-[1.06] tracking-[-0.01em] text-cocoa-brown pr-8 sm:pr-12"
              >
                {product.title}
              </h2>

              {/* D. Flavour Notes (Clean Typographic Row) */}
              <div
                aria-label="Flavour notes"
                className="mt-1.5 sm:mt-3 flex flex-wrap items-center gap-x-2 sm:gap-x-3 gap-y-1 font-jakarta text-xs sm:text-sm lg:text-[0.9375rem] font-extrabold text-warm-purple uppercase tracking-wider"
              >
                {product.flavourNotes.map((note, idx) => (
                  <React.Fragment key={note}>
                    <span>{note}</span>
                    {idx < product.flavourNotes.length - 1 && (
                      <span aria-hidden="true" className="text-cocoa-brown/45">
                        ·
                      </span>
                    )}
                  </React.Fragment>
                ))}
              </div>

              {/* C. Short Appetising Description (Plus Jakarta Sans) */}
              <p
                id={descId}
                className="mt-2 sm:mt-4 mb-0 font-jakarta text-xs sm:text-sm lg:text-[1.0625rem] font-semibold leading-relaxed text-cocoa-brown/90"
              >
                {product.shortDescription}
              </p>
            </div>

            {/* E. Ingredients Section with Icons */}
            <ProductIngredients ingredients={product.ingredients} />

            {/* F. Size Options (2 lines on mobile, 1 line on desktop) */}
            <div>
              <h3 className="m-0 mb-1.5 sm:mb-2.5 font-hero text-xs sm:text-[0.875rem] tracking-[0.06em] text-cocoa-brown uppercase">
                Select Pouch Size
              </h3>

              <div
                role="radiogroup"
                aria-label="Select pouch size"
                className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3.5"
              >
                {product.sizes.map((sizeOption) => {
                  const isSelected = selectedSize === sizeOption.id;

                  return (
                    <button
                      key={sizeOption.id}
                      type="button"
                      role="radio"
                      aria-checked={isSelected}
                      onClick={() => setSelectedSize(sizeOption.id)}
                      className={`px-3.5 sm:px-4 py-2 sm:py-3.5 rounded-[0.75rem] sm:rounded-[0.875rem] text-left cursor-pointer transition-all duration-200 flex items-center justify-between gap-2 ${
                        isSelected
                          ? 'bg-butter-yellow comic-border-card -translate-y-0.5'
                          : 'bg-warm-cream border-[0.15rem] border-cocoa-brown/50 hover:border-cocoa-brown'
                      }`}
                      style={{
                        boxShadow: isSelected
                          ? 'var(--shadow-hard-sm)'
                          : 'var(--shadow-hard-xs)',
                      }}
                    >
                      <div>
                        <span className="block font-hero text-xs sm:text-sm lg:text-[1rem] text-cocoa-brown leading-tight">
                          {sizeOption.label}
                        </span>
                        <span className="block font-jakarta text-[0.6875rem] sm:text-xs lg:text-[0.8125rem] font-bold text-cocoa-brown/75 mt-0.5">
                          {sizeOption.subtitle}
                        </span>
                      </div>

                      <span
                        aria-hidden="true"
                        className={`w-5 h-5 sm:w-6 sm:h-6 rounded-full border-[0.125rem] border-cocoa-brown flex items-center justify-center shrink-0 ${
                          isSelected
                            ? 'bg-cocoa-brown text-warm-cream'
                            : 'bg-warm-cream'
                        }`}
                      >
                        {isSelected && <Check className="w-3 h-3 sm:w-3.5 sm:h-3.5 stroke-[3]" />}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* G. Prominent WhatsApp CTA Button */}
            <div className="pt-2 border-t-[0.15rem] border-cocoa-brown/15">
              {whatsappUrl ? (
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="poprio-whatsapp-btn w-full py-2.5 sm:py-3.5 lg:py-4 px-4 sm:px-6 inline-flex items-center justify-center gap-2.5 sm:gap-3 text-xs sm:text-sm lg:text-[1.125rem] tracking-wider uppercase select-none"
                >
                  <WhatsAppModalIcon />
                  <span>CHAT &amp; ORDER ON WHATSAPP</span>
                </a>
              ) : (
                <div className="flex flex-col gap-2">
                  <button
                    type="button"
                    aria-disabled="true"
                    onClick={() => setShowWhatsAppNotice((prev) => !prev)}
                    className="poprio-whatsapp-btn w-full py-2.5 sm:py-3.5 lg:py-4 px-4 sm:px-6 inline-flex items-center justify-center gap-2.5 sm:gap-3 text-xs sm:text-sm lg:text-[1.125rem] tracking-wider uppercase cursor-pointer select-none"
                  >
                    <WhatsAppModalIcon />
                    <span>CHAT &amp; ORDER ON WHATSAPP</span>
                  </button>

                  {showWhatsAppNotice && (
                    <div
                      role="status"
                      aria-live="polite"
                      className="px-3.5 py-2 rounded-[0.75rem] bg-butter-yellow/55 border-[0.125rem] border-cocoa-brown font-jakarta text-[0.8125rem] font-bold text-cocoa-brown"
                    >
                      Ready to order <strong>{product.title}</strong> (
                      {activeSizeObj?.label})! Set{' '}
                      <code className="bg-warm-cream px-1 py-0.5 rounded">
                        WHATSAPP_NUMBER
                      </code>{' '}
                      in <code className="bg-warm-cream px-1 py-0.5 rounded">src/config/site.ts</code>{' '}
                      to activate direct WhatsApp checkout.
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
};
