import React, { useState, useEffect } from 'react';
import { ProductGalleryImage } from '../../data/products';

interface ProductGalleryProps {
  productTitle: string;
  accentColor: string;
  images: readonly ProductGalleryImage[];
}

export const ProductGallery: React.FC<ProductGalleryProps> = ({
  productTitle,
  accentColor,
  images,
}) => {
  const [selectedIndex, setSelectedIndex] = useState(0);

  // Reset to primary package image whenever a different product is opened
  useEffect(() => {
    setSelectedIndex(0);
  }, [productTitle]);

  const activeImage = images[selectedIndex] ?? images[0];

  if (!activeImage) return null;

  return (
    <div className="w-full h-full flex flex-col justify-between gap-4 select-none">
      {/* Main Product Image Stage */}
      <div
        className="relative flex-1 min-h-[13rem] sm:min-h-[18rem] lg:min-h-[26rem] rounded-[1.25rem] comic-border-thick p-4 sm:p-6 flex items-center justify-center overflow-hidden"
        style={{
          backgroundColor: accentColor,
          boxShadow: 'var(--shadow-hard)',
        }}
      >
        {/* Subtle inner comic radial spotlight */}
        <div
          aria-hidden="true"
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              'radial-gradient(circle at 50% 50%, rgba(255, 243, 224, 0.65) 0%, rgba(255, 243, 224, 0) 72%)',
          }}
        />

        <img
          key={activeImage.id}
          src={activeImage.src}
          alt={activeImage.alt}
          draggable={false}
          className="relative z-10 w-full max-h-[13rem] sm:max-h-[18rem] lg:max-h-[28rem] object-contain drop-shadow-[0_10px_0_rgba(75,31,15,0.28)] lg:drop-shadow-[0_14px_0_rgba(75,31,15,0.28)] transition-transform duration-300 hover:scale-[1.03]"
        />

        {/* Active View Label */}
        <span className="absolute bottom-2.5 sm:bottom-3.5 left-3 sm:left-4 z-10 font-comic text-xs sm:text-[0.9375rem] tracking-wider uppercase text-cocoa-brown bg-warm-cream/95 px-2.5 sm:px-3 py-0.5 rounded-[0.5rem] border-[0.125rem] border-cocoa-brown">
          {activeImage.label}
        </span>
      </div>

      {/* Gallery Thumbnail Strip */}
      {images.length > 1 && (
        <div
          role="group"
          aria-label={`${productTitle} image gallery`}
          className="grid grid-cols-3 gap-2 sm:gap-3.5"
        >
          {images.map((img, idx) => {
            const isSelected = idx === selectedIndex;

            return (
              <button
                key={img.id}
                type="button"
                onClick={() => setSelectedIndex(idx)}
                aria-label={`View ${img.label}`}
                aria-pressed={isSelected}
                className={`group relative h-[3.75rem] sm:h-[4.75rem] lg:h-[6rem] rounded-[0.625rem] sm:rounded-[0.875rem] p-1.5 sm:p-2.5 flex flex-col items-center justify-center cursor-pointer transition-all duration-200 ${
                  isSelected
                    ? 'bg-butter-yellow comic-border-card -translate-y-0.5'
                    : 'bg-warm-cream border-[0.15rem] border-cocoa-brown/60 hover:border-cocoa-brown hover:-translate-y-0.5'
                }`}
                style={{
                  boxShadow: isSelected
                    ? 'var(--shadow-hard-sm)'
                    : 'var(--shadow-hard-xs)',
                }}
              >
                <img
                  src={img.src}
                  alt={img.alt}
                  draggable={false}
                  className="w-full h-full object-contain pointer-events-none transition-transform duration-200 group-hover:scale-105"
                />
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
};
