import React from 'react';
import {
  FLAVOURVERSE_PRODUCTS,
  ProductMenuEntry,
} from '../../data/products';
import { useProductModal } from '../../context/ProductModalContext';
import { ProductMenuCard } from './ProductMenuCard';

function ComicSparkleSvg() {
  return (
    <svg
      viewBox="0 0 28 28"
      className="w-6 h-6 shrink-0 overflow-visible"
      aria-hidden="true"
      focusable="false"
    >
      <path
        d="M14 2L17.2 10.8L26 14L17.2 17.2L14 26L10.8 17.2L2 14L10.8 10.8L14 2Z"
        fill="#FFC72C"
        stroke="#4B1F0F"
        strokeWidth="2.6"
        strokeLinejoin="round"
      />
    </svg>
  );
}

interface ProductsMegaMenuProps {
  isOpen: boolean;
  menuId: string;
  triggerId: string;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
  onCloseMenu?: () => void;
}

export const ProductsMegaMenu: React.FC<ProductsMegaMenuProps> = ({
  isOpen,
  menuId,
  triggerId,
  onMouseEnter,
  onMouseLeave,
  onCloseMenu,
}) => {
  const { openProductModal } = useProductModal();

  const handleProductClick = (
    product: ProductMenuEntry,
    triggerEl: HTMLButtonElement | null
  ) => {
    onCloseMenu?.();
    openProductModal(product.id, triggerEl);
  };

  return (
    <div
      id={menuId}
      role="region"
      aria-labelledby={triggerId}
      aria-hidden={!isOpen}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      className={`absolute left-1/2 -translate-x-1/2 top-full pt-3.5 w-[38rem] max-w-[calc(100vw-2rem)] z-50 transition-all duration-200 origin-top ${
        isOpen
          ? 'opacity-100 translate-y-0 scale-100 pointer-events-auto visible'
          : 'opacity-0 -translate-y-2 scale-[0.98] pointer-events-none invisible'
      }`}
    >
      {/* Main Comic Panel */}
      <div
        className="bg-warm-cream comic-border-thick rounded-[1.25rem] p-6 text-cocoa-brown"
        style={{ boxShadow: 'var(--shadow-hard-xl)' }}
      >
        {/* Panel Header */}
        <div className="flex items-center justify-between gap-4 pb-4 mb-5 border-b-[0.1875rem] border-cocoa-brown">
          <div className="flex items-center gap-2.5">
            <ComicSparkleSvg />
            <h2 className="font-display text-[1.5rem] leading-none tracking-wide text-cocoa-brown uppercase">
              THE FLAVOURVERSE
            </h2>
          </div>

          <span className="font-comic text-[1.0625rem] tracking-wider text-warm-purple uppercase select-none">
            5 GOURMET FLAVOURS
          </span>
        </div>

        {/* Two-Column Product Card Grid (5th item spans 2 columns) */}
        <div className="grid grid-cols-2 gap-3.5">
          {FLAVOURVERSE_PRODUCTS.map((product) => (
            <ProductMenuCard
              key={product.id}
              product={product}
              onSelect={handleProductClick}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
