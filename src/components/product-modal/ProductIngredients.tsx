import React from 'react';
import {
  IngredientIconKey,
  ProductIngredient,
} from '../../data/products';

function IngredientComicIcon({
  icon,
  className = 'w-3.5 h-3.5 sm:w-5 sm:h-5 shrink-0',
}: {
  icon: IngredientIconKey;
  className?: string;
}) {
  switch (icon) {
    case 'popcorn':
      return (
        <svg
          viewBox="0 0 28 28"
          className={className}
          aria-hidden="true"
          focusable="false"
        >
          <path
            d="M9.5 22.5C6.5 22.5 4.8 20.1 5.3 17.2C4.2 15 5.4 11.8 8 11.2C9 7.8 12.6 6.5 15.6 8C18.8 6.8 22 9.2 21.8 12.5C24 14.2 23.6 17.8 21.2 19.6C20.5 21.6 18.2 22.8 15.8 22.2C13.8 23 11.2 22.8 9.5 22.5Z"
            fill="#FFF3E0"
            stroke="#4B1F0F"
            strokeWidth="2.2"
            strokeLinejoin="round"
          />
          <circle
            cx="14"
            cy="15"
            r="3.4"
            fill="#FFC72C"
            stroke="#4B1F0F"
            strokeWidth="1.8"
          />
        </svg>
      );

    case 'butter':
      return (
        <svg
          viewBox="0 0 28 28"
          className={className}
          aria-hidden="true"
          focusable="false"
        >
          <rect
            x="5"
            y="9"
            width="18"
            height="11"
            rx="2.5"
            fill="#FFC72C"
            stroke="#4B1F0F"
            strokeWidth="2.2"
          />
          <path
            d="M3 20H25"
            stroke="#4B1F0F"
            strokeWidth="2.4"
            strokeLinecap="round"
          />
          <path
            d="M8.5 12.5H14"
            stroke="#FFF3E0"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </svg>
      );

    case 'caramel':
      return (
        <svg
          viewBox="0 0 28 28"
          className={className}
          aria-hidden="true"
          focusable="false"
        >
          <path
            d="M14 4.5C14 4.5 21 12.2 21 17.2C21 21 17.9 23.8 14 23.8C10.1 23.8 7 21 7 17.2C7 12.2 14 4.5 14 4.5Z"
            fill="#D78A24"
            stroke="#4B1F0F"
            strokeWidth="2.2"
            strokeLinejoin="round"
          />
          <path
            d="M11 16.5C11 18.4 12.3 20 14.2 20.2"
            stroke="#FFF3E0"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </svg>
      );

    case 'chocolate':
      return (
        <svg
          viewBox="0 0 28 28"
          className={className}
          aria-hidden="true"
          focusable="false"
        >
          <rect
            x="6"
            y="5"
            width="16"
            height="18"
            rx="2.5"
            fill="#6B2D16"
            stroke="#4B1F0F"
            strokeWidth="2.2"
          />
          <path
            d="M6 14H22M14 5V23"
            stroke="#4B1F0F"
            strokeWidth="2"
          />
        </svg>
      );

    case 'cookie':
      return (
        <svg
          viewBox="0 0 28 28"
          className={className}
          aria-hidden="true"
          focusable="false"
        >
          <circle
            cx="14"
            cy="14"
            r="9"
            fill="#6B2D16"
            stroke="#4B1F0F"
            strokeWidth="2.2"
          />
          <circle cx="11" cy="11.5" r="1.4" fill="#FFF3E0" />
          <circle cx="16.5" cy="12" r="1.3" fill="#FFF3E0" />
          <circle cx="13.5" cy="16.8" r="1.5" fill="#FFF3E0" />
        </svg>
      );

    case 'strawberry':
      return (
        <svg
          viewBox="0 0 28 28"
          className={className}
          aria-hidden="true"
          focusable="false"
        >
          <path
            d="M14 23.5C9.5 23.5 6.8 18.2 7.5 13.5C8 10.2 10.8 8.8 14 9.5C17.2 8.8 20 10.2 20.5 13.5C21.2 18.2 18.5 23.5 14 23.5Z"
            fill="#E0351B"
            stroke="#4B1F0F"
            strokeWidth="2.2"
            strokeLinejoin="round"
          />
          <path
            d="M10.5 6.5L14 9L17.5 6.5"
            stroke="#4B1F0F"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <circle cx="12" cy="14" r="1" fill="#FFF3E0" />
          <circle cx="16" cy="14.5" r="1" fill="#FFF3E0" />
          <circle cx="14" cy="18" r="1" fill="#FFF3E0" />
        </svg>
      );

    case 'hazelnut':
    case 'peanut':
      return (
        <svg
          viewBox="0 0 28 28"
          className={className}
          aria-hidden="true"
          focusable="false"
        >
          <path
            d="M14 6C18.5 6 21.5 9.6 21 14.5C20.5 19.2 16.8 22.8 14 22.8C11.2 22.8 7.5 19.2 7 14.5C6.5 9.6 9.5 6 14 6Z"
            fill="#D78A24"
            stroke="#4B1F0F"
            strokeWidth="2.2"
          />
          <path
            d="M7.5 11.5C10.5 13 17.5 13 20.5 11.5"
            stroke="#4B1F0F"
            strokeWidth="2.2"
            strokeLinecap="round"
          />
        </svg>
      );

    case 'cream':
    default:
      return (
        <svg
          viewBox="0 0 28 28"
          className={className}
          aria-hidden="true"
          focusable="false"
        >
          <path
            d="M14 5.5C16.8 9.2 20 12.2 20 16.2C20 19.8 17.3 22.5 14 22.5C10.7 22.5 8 19.8 8 16.2C8 12.2 11.2 9.2 14 5.5Z"
            fill="#FFF3E0"
            stroke="#4B1F0F"
            strokeWidth="2.2"
            strokeLinejoin="round"
          />
          <path
            d="M11.5 16.5C11.5 18.2 12.7 19.5 14.5 19.5"
            stroke="#FFC72C"
            strokeWidth="2.2"
            strokeLinecap="round"
          />
        </svg>
      );
  }
}

interface ProductIngredientsProps {
  ingredients: readonly ProductIngredient[];
}

export const ProductIngredients: React.FC<ProductIngredientsProps> = ({
  ingredients,
}) => {
  return (
    <div>
      <h3 className="m-0 mb-1.5 sm:mb-2.5 font-hero text-xs sm:text-[0.875rem] tracking-[0.06em] text-cocoa-brown uppercase">
        Key Ingredients
      </h3>

      <div className="grid grid-cols-2 gap-2 sm:gap-2.5">
        {ingredients.map((ingredient) => (
          <div
            key={ingredient.id}
            className="flex items-center gap-1.5 sm:gap-2.5 px-2 sm:px-3 py-1.5 sm:py-2 rounded-[0.625rem] sm:rounded-[0.75rem] bg-butter-yellow/35 border-[0.125rem] sm:border-[0.15rem] border-cocoa-brown min-w-0"
            style={{ boxShadow: 'var(--shadow-hard-xs)' }}
          >
            <span className="w-6 h-6 sm:w-8 sm:h-8 rounded-[0.375rem] sm:rounded-[0.5rem] bg-warm-cream border-[0.1rem] sm:border-[0.125rem] border-cocoa-brown flex items-center justify-center shrink-0">
              <IngredientComicIcon icon={ingredient.icon} />
            </span>

            <span className="font-jakarta text-[0.6875rem] sm:text-xs md:text-[0.875rem] font-bold text-cocoa-brown leading-tight min-w-0 break-words">
              {ingredient.name}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};
