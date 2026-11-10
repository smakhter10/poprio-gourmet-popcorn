import React, { useState } from 'react';
import { ArrowRight } from 'lucide-react';
import {
  ProductIllustrationVariant,
  ProductMenuEntry,
} from '../../data/products';

function FlavourClusterSvg({
  variant,
}: {
  variant: ProductIllustrationVariant;
}) {
  switch (variant) {
    case 'cookies-cream':
      return (
        <svg
          viewBox="0 0 88 88"
          className="w-full h-full overflow-visible"
          aria-hidden="true"
          focusable="false"
        >
          {/* Back kernel */}
          <path
            d="M22 58C14 55 12 44 18 37C16 28 24 20 33 23C39 17 50 18 54 26C62 27 66 36 61 44C63 52 55 60 46 57C40 61 30 60 22 58Z"
            fill="#FFF3E0"
            stroke="#4B1F0F"
            strokeWidth="3.5"
            strokeLinejoin="round"
          />
          {/* Front main popcorn puff */}
          <path
            d="M30 70C20 70 14 62 16 52C12 45 16 34 25 32C28 21 40 16 50 22C60 18 71 26 70 37C77 43 76 55 68 61C65 68 57 72 49 70C43 73 36 72 30 70Z"
            fill="#FFFFFF"
            stroke="#4B1F0F"
            strokeWidth="3.8"
            strokeLinejoin="round"
          />
          {/* Cream & butter fold */}
          <circle
            cx="43"
            cy="46"
            r="11"
            fill="#FFF3E0"
            stroke="#4B1F0F"
            strokeWidth="3"
          />
          {/* Dark cocoa cookie crumbles */}
          <circle cx="31" cy="37" r="3.4" fill="#4B1F0F" />
          <circle cx="54" cy="34" r="4" fill="#4B1F0F" />
          <circle cx="58" cy="51" r="3.2" fill="#4B1F0F" />
          <circle cx="33" cy="57" r="3.6" fill="#4B1F0F" />
          <circle cx="44" cy="45" r="2.6" fill="#4B1F0F" />
          <circle cx="24" cy="48" r="2.4" fill="#4B1F0F" />
          {/* Comic shine */}
          <path
            d="M32 27C36 24 41 23 45 25"
            stroke="#FFC72C"
            strokeWidth="2.8"
            strokeLinecap="round"
          />
        </svg>
      );

    case 'caramel':
      return (
        <svg
          viewBox="0 0 88 88"
          className="w-full h-full overflow-visible"
          aria-hidden="true"
          focusable="false"
        >
          {/* Golden caramel puff */}
          <path
            d="M28 69C18 68 13 59 16 49C12 41 17 30 27 29C32 19 45 16 54 23C64 21 73 30 70 41C76 48 73 60 64 64C59 71 49 73 41 69C36 71 32 70 28 69Z"
            fill="#F4A62A"
            stroke="#4B1F0F"
            strokeWidth="3.8"
            strokeLinejoin="round"
          />
          {/* Glossy caramel glaze ribbon */}
          <path
            d="M22 42C28 33 41 31 52 35C60 38 64 46 58 53C53 59 42 58 35 55C27 52 19 48 22 42Z"
            fill="#D78A24"
            stroke="#4B1F0F"
            strokeWidth="3.2"
            strokeLinejoin="round"
          />
          {/* Warm amber center */}
          <circle
            cx="44"
            cy="45"
            r="8.5"
            fill="#FFC72C"
            stroke="#4B1F0F"
            strokeWidth="2.8"
          />
          {/* Glossy comic highlight */}
          <path
            d="M31 26C37 22 44 22 49 25"
            stroke="#FFF3E0"
            strokeWidth="3.2"
            strokeLinecap="round"
          />
          <circle cx="58" cy="33" r="2.5" fill="#FFF3E0" />
        </svg>
      );

    case 'chocolate':
      return (
        <svg
          viewBox="0 0 88 88"
          className="w-full h-full overflow-visible"
          aria-hidden="true"
          focusable="false"
        >
          {/* Rich cocoa popcorn base */}
          <path
            d="M29 70C19 69 13 60 16 50C12 42 17 31 27 29C31 19 43 16 52 22C62 19 72 28 70 39C76 46 74 58 65 63C61 70 51 73 43 69C38 71 33 71 29 70Z"
            fill="#FFF3E0"
            stroke="#4B1F0F"
            strokeWidth="3.8"
            strokeLinejoin="round"
          />
          {/* Rich chocolate cap */}
          <path
            d="M24 44C23 34 33 26 44 27C55 26 65 34 63 45C62 55 52 61 43 59C33 61 25 53 24 44Z"
            fill="#6B2D16"
            stroke="#4B1F0F"
            strokeWidth="3.2"
            strokeLinejoin="round"
          />
          {/* Comic chocolate drizzle zig-zag */}
          <path
            d="M21 40C31 34 55 36 65 42M24 50C35 45 53 47 62 53"
            stroke="#4B1F0F"
            strokeWidth="3.6"
            strokeLinecap="round"
          />
          {/* Highlight */}
          <path
            d="M33 32C38 29 44 29 49 32"
            stroke="#F3DEC8"
            strokeWidth="2.8"
            strokeLinecap="round"
          />
        </svg>
      );

    case 'buttery-classic':
    default:
      return (
        <svg
          viewBox="0 0 88 88"
          className="w-full h-full overflow-visible"
          aria-hidden="true"
          focusable="false"
        >
          {/* Classic golden puff */}
          <path
            d="M29 70C19 70 13 61 15 51C11 43 16 32 25 30C29 20 41 15 51 21C61 17 72 25 71 37C78 43 77 56 68 62C65 69 56 73 48 70C42 73 35 72 29 70Z"
            fill="#FFF3E0"
            stroke="#4B1F0F"
            strokeWidth="3.8"
            strokeLinejoin="round"
          />
          {/* Melted butter heart */}
          <path
            d="M32 45C31 37 38 31 45 33C53 31 59 38 57 46C59 53 52 59 44 57C37 59 31 52 32 45Z"
            fill="#FFC72C"
            stroke="#4B1F0F"
            strokeWidth="3.2"
            strokeLinejoin="round"
          />
          {/* Inner kernel star-Burst detail */}
          <circle cx="45" cy="45" r="4.5" fill="#D78A24" />
          {/* Shine */}
          <path
            d="M30 26C35 22 41 22 46 24"
            stroke="#FFFFFF"
            strokeWidth="3"
            strokeLinecap="round"
          />
        </svg>
      );
  }
}

interface ProductMenuCardProps {
  product: ProductMenuEntry;
  onSelect: (product: ProductMenuEntry, triggerEl: HTMLButtonElement | null) => void;
}

export const ProductMenuCard: React.FC<ProductMenuCardProps> = ({
  product,
  onSelect,
}) => {
  const [imageError, setImageError] = useState(false);
  const buttonRef = React.useRef<HTMLButtonElement>(null);
  const showPhoto = Boolean(product.imageSrc && !imageError);

  return (
    <button
      ref={buttonRef}
      type="button"
      onClick={() => onSelect(product, buttonRef.current)}
      className={`poprio-product-card group w-full flex items-center justify-between gap-3.5 p-3 text-left cursor-pointer select-none ${
        product.fullWidth ? 'col-span-2' : ''
      }`}
      style={{
        backgroundColor: product.backgroundColor,
        color: product.textColor ?? 'var(--color-cocoa-brown)',
      }}
    >
      {/* Left: Real Package Pouch Container */}
      <div className="w-[4.25rem] h-[4.75rem] shrink-0 rounded-[0.625rem] bg-warm-cream/95 border-[0.15rem] border-cocoa-brown flex items-center justify-center p-1 overflow-hidden">
        <div className="product-card-illustration w-full h-full flex items-center justify-center">
          {showPhoto ? (
            <img
              src={product.imageSrc}
              alt={product.imageAlt}
              loading="lazy"
              draggable={false}
              onError={() => setImageError(true)}
              className="w-full h-full object-contain drop-shadow-[0_3px_0_rgba(75,31,15,0.22)] select-none"
            />
          ) : (
            <FlavourClusterSvg variant={product.illustrationVariant} />
          )}
        </div>
      </div>

      {/* Right: Product Title, Subtitle & Comic Arrow */}
      <div className="flex-1 min-w-0 flex items-center justify-between gap-2 pr-1">
        <div className="flex flex-col min-w-0">
          {product.subtitle && (
            <span
              className="font-jakarta text-[0.625rem] font-extrabold tracking-[0.12em] uppercase opacity-80 leading-tight mb-0.5"
            >
              {product.subtitle}
            </span>
          )}
          <span className="font-hero text-[1.0625rem] leading-tight tracking-wide uppercase">
            {product.name}
          </span>
        </div>

        <span
          className="product-card-arrow w-8 h-8 rounded-full bg-warm-cream border-[0.15rem] border-cocoa-brown flex items-center justify-center shrink-0 text-cocoa-brown"
          aria-hidden="true"
        >
          <ArrowRight className="w-4 h-4 stroke-[3]" />
        </span>
      </div>
    </button>
  );
};
