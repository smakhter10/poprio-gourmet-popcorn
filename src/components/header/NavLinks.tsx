import React, { useState, useRef, useEffect, useCallback } from 'react';
import { ChevronDown } from 'lucide-react';
import { NAV_ITEMS, NavItemConfig } from '../../config/site';
import { ProductsMegaMenu } from './ProductsMegaMenu';

interface NavLinksProps {
  activeNavId: NavItemConfig['id'];
  onSelectNav: (id: NavItemConfig['id']) => void;
}

export const NavLinks: React.FC<NavLinksProps> = ({
  activeNavId,
  onSelectNav,
}) => {
  const [isMegaMenuOpen, setIsMegaMenuOpen] = useState(false);
  const productsContainerRef = useRef<HTMLLIElement>(null);
  const productsTriggerRef = useRef<HTMLButtonElement>(null);
  const closeTimeoutRef = useRef<number | null>(null);

  const clearCloseTimer = useCallback(() => {
    if (closeTimeoutRef.current !== null) {
      window.clearTimeout(closeTimeoutRef.current);
      closeTimeoutRef.current = null;
    }
  }, []);

  const openMegaMenu = useCallback(() => {
    clearCloseTimer();
    setIsMegaMenuOpen(true);
  }, [clearCloseTimer]);

  const scheduleCloseMegaMenu = useCallback(() => {
    clearCloseTimer();
    closeTimeoutRef.current = window.setTimeout(() => {
      setIsMegaMenuOpen(false);
    }, 140);
  }, [clearCloseTimer]);

  const closeMegaMenuImmediate = useCallback(() => {
    clearCloseTimer();
    setIsMegaMenuOpen(false);
  }, [clearCloseTimer]);

  useEffect(() => {
    return () => {
      clearCloseTimer();
    };
  }, [clearCloseTimer]);

  // Close on Escape or outside click
  useEffect(() => {
    if (!isMegaMenuOpen) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault();
        closeMegaMenuImmediate();
        productsTriggerRef.current?.focus();
      }
    };

    const handlePointerDown = (event: MouseEvent | TouchEvent) => {
      if (
        productsContainerRef.current &&
        !productsContainerRef.current.contains(event.target as Node)
      ) {
        closeMegaMenuImmediate();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('mousedown', handlePointerDown);
    document.addEventListener('touchstart', handlePointerDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('mousedown', handlePointerDown);
      document.removeEventListener('touchstart', handlePointerDown);
    };
  }, [isMegaMenuOpen, closeMegaMenuImmediate]);

  // Close when keyboard focus leaves the combined Products trigger + Mega Menu container
  const handleProductsBlur = (event: React.FocusEvent<HTMLLIElement>) => {
    const nextFocused = event.relatedTarget as Node | null;
    if (
      productsContainerRef.current &&
      nextFocused &&
      !productsContainerRef.current.contains(nextFocused)
    ) {
      closeMegaMenuImmediate();
    }
  };

  const triggerId = 'poprio-products-trigger';
  const menuId = 'poprio-products-megamenu';

  return (
    <nav aria-label="Main navigation" className=" flex items-center justify-center">
      <ul className="flex items-center gap-8 lg:gap-10 m-0 p-0 list-none">
        {NAV_ITEMS.map((item) => {
          const isActive = activeNavId === item.id;

          if (item.hasMegaMenu) {
            return (
              <li
                key={item.id}
                ref={productsContainerRef}
                className="relative flex items-center"
                onMouseEnter={openMegaMenu}
                onMouseLeave={scheduleCloseMegaMenu}
                onBlur={handleProductsBlur}
              >
                <button
                  ref={productsTriggerRef}
                  id={triggerId}
                  type="button"
                  aria-expanded={isMegaMenuOpen}
                  aria-haspopup="true"
                  aria-controls={menuId}
                  onFocus={openMegaMenu}
                  onClick={() => setIsMegaMenuOpen((prev) => !prev)}
                  className="poprio-nav-item relative inline-flex items-center gap-1.5 py-2 px-1 text-[1.0625rem] leading-none whitespace-nowrap shrink-0 cursor-pointer select-none bg-transparent border-0"
                >
                  <span>{item.label}</span>
                  <ChevronDown
                    aria-hidden="true"
                    className={`w-4 h-4 stroke-[3] text-cocoa-brown transition-transform duration-200 ${
                      isMegaMenuOpen ? 'rotate-180 text-red-orange' : ''
                    }`}
                  />
                  {/* Comic Underline Highlight */}
                  <span
                    aria-hidden="true"
                    className="poprio-nav-highlight absolute left-0 right-0 -bottom-0.5 h-[0.3125rem] rounded-full bg-red-orange border-[0.125rem] border-cocoa-brown pointer-events-none"
                  />
                </button>

                <ProductsMegaMenu
                  isOpen={isMegaMenuOpen}
                  menuId={menuId}
                  triggerId={triggerId}
                  onMouseEnter={openMegaMenu}
                  onMouseLeave={scheduleCloseMegaMenu}
                  onCloseMenu={closeMegaMenuImmediate}
                />
              </li>
            );
          }

          return (
            <li key={item.id} className="relative flex items-center">
              <button
                type="button"
                aria-current={isActive ? 'page' : undefined}
                onClick={() => {
                  closeMegaMenuImmediate();
                  onSelectNav(item.id);
                }}
                className="poprio-nav-item relative inline-flex items-center py-2 px-1 text-[1.0625rem] leading-none whitespace-nowrap shrink-0 cursor-pointer select-none bg-transparent border-0"
              >
                <span>{item.label}</span>
                {/* Comic Underline Highlight */}
                <span
                  aria-hidden="true"
                  className={`poprio-nav-highlight absolute left-0 right-0 -bottom-0.5 h-[0.3125rem] rounded-full bg-red-orange border-[0.125rem] border-cocoa-brown pointer-events-none ${
                    isActive ? '!scale-x-100 !opacity-100' : ''
                  }`}
                />
              </button>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};
