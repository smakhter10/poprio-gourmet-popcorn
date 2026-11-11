import React, { useState } from 'react';
import { Menu } from 'lucide-react';
import { NavItemConfig, SITE_CONFIG } from '../../config/site';
import { NavLinks } from './NavLinks';
import { WhatsAppButton } from './WhatsAppButton';
import { MobileMenu } from './MobileMenu';
import { usePoprioContent } from '../../context/PoprioContentContext';
import { PoprioEditableElement } from '../editor/PoprioEditableElement';

interface MainNavbarProps {
  navbarRef: React.RefObject<HTMLDivElement | null>;
  logoImgRef: React.RefObject<HTMLImageElement | null>;
  activeNavId: NavItemConfig['id'];
  onSelectNav: (id: NavItemConfig['id']) => void;
  isScrolled: boolean;
}

export const MainNavbar: React.FC<MainNavbarProps> = ({
  navbarRef,
  logoImgRef,
  activeNavId,
  onSelectNav,
  isScrolled,
}) => {
  const { meta } = usePoprioContent();
  const [logoLoadError, setLogoLoadError] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const logoSrc = meta?.logo?.src || SITE_CONFIG.logo.src;
  const logoAlt = meta?.logo?.alt || SITE_CONFIG.logo.alt;

  return (
    <>
      <div
        ref={navbarRef}
        className="w-full max-w-full text-cocoa-brown border-[0.25rem] border-solid px-4 sm:px-6 lg:px-10 py-3 sm:py-4 pointer-events-auto relative z-10"
        style={{
          backgroundColor: 'rgba(255, 243, 224, 0)',
          borderColor: 'rgba(75, 31, 15, 0)',
          borderRadius: '0rem',
          boxShadow: '0rem 0rem 0px rgba(75, 31, 15, 0)',
        }}
      >
        {/* Desktop 3-Column Grid / Mobile 2-Column Flex: Logo on left, Hamburger on right */}
        <div className="max-w-[84rem] mx-auto flex items-center justify-between lg:grid lg:grid-cols-[1fr_auto_1fr] lg:gap-8">
          {/* Column 1 (Far Left): Official POPRIO Logo Asset */}
          <div className="flex items-center justify-start">
            <a
              href="#top"
              onClick={(e) => {
                e.preventDefault();
                onSelectNav('home');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="inline-flex items-center shrink-0 rounded-[0.5rem] transition-transform duration-200 hover:scale-[1.03] active:scale-[0.99]"
              aria-label="POPRIO Home"
            >
              <PoprioEditableElement elementId="meta.logo" type="image" label="POPRIO Logo">
                {!logoLoadError ? (
                  <img
                    ref={logoImgRef}
                    src={logoSrc}
                    alt={logoAlt}
                    width={meta?.logo?.width || SITE_CONFIG.logo.width}
                    height={meta?.logo?.height || SITE_CONFIG.logo.height}
                    onError={() => setLogoLoadError(true)}
                    className="h-[2.5rem] sm:h-[3.25rem] w-auto object-contain select-none origin-left"
                  />
                ) : (
                  /* Temporary clearly marked placeholder only if asset fails to load */
                  <div
                    role="img"
                    aria-label="Temporary Logo Placeholder — Official POPRIO Logo Asset Required"
                    className="px-3 py-1.5 bg-warm-cream comic-border-card rounded-[0.5rem] text-xs font-bold text-cocoa-brown whitespace-nowrap"
                  >
                    [LOGO PLACEHOLDER: OFFICIAL ASSET REQUIRED]
                  </div>
                )}
              </PoprioEditableElement>
            </a>
          </div>

          {/* Column 2 (Centre): Strictly Centred Navigation Items (Desktop Only) */}
          <div className="hidden lg:flex items-center justify-center">
            <NavLinks activeNavId={activeNavId} onSelectNav={onSelectNav} />
          </div>

          {/* Column 3 (Far Right): Desktop WhatsApp CTA */}
          <div className="hidden lg:flex items-center justify-end">
            <WhatsAppButton isScrolled={isScrolled} />
          </div>

          {/* Mobile Only: Comic-Book Hamburger Menu Button */}
          <div className="flex lg:hidden items-center justify-end">
            <button
              type="button"
              onClick={() => setIsMobileMenuOpen(true)}
              aria-label="Open navigation menu"
              className="w-9 h-9 sm:w-10 sm:h-10 rounded-[0.5rem] bg-butter-yellow text-cocoa-brown border-[0.14rem] sm:border-[0.1875rem] border-cocoa-brown shadow-[0.125rem_0.125rem_0_#4B1F0F] flex items-center justify-center cursor-pointer transition-transform duration-150 active:scale-95 hover:-translate-y-0.5"
            >
              <Menu className="w-4.5 h-4.5 sm:w-5 sm:h-5 stroke-[2.5]" />
            </button>
          </div>
        </div>
      </div>

      {/* Fullscreen 100vh Mobile Menu Popup */}
      <MobileMenu
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
        activeNavId={activeNavId}
        onSelectNav={onSelectNav}
      />
    </>
  );
};

