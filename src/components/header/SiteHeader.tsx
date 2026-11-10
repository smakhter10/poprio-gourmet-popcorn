import React, { useRef, useState, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { NavItemConfig, SITE_CONFIG } from '../../config/site';
import { PopcornParade } from './PopcornParade';
import { MainNavbar } from './MainNavbar';

gsap.registerPlugin(ScrollTrigger);

export interface SiteHeaderProps {
  activeNavId?: NavItemConfig['id'];
  onSelectNav?: (id: NavItemConfig['id']) => void;
}

export const SiteHeader: React.FC<SiteHeaderProps> = ({
  activeNavId: controlledNavId,
  onSelectNav: controlledOnSelectNav,
}) => {
  const headerRef = useRef<HTMLElement>(null);
  const paradeRef = useRef<HTMLDivElement>(null);
  const navbarRef = useRef<HTMLDivElement>(null);
  const logoImgRef = useRef<HTMLImageElement>(null);

  const [internalNavId, setInternalNavId] = useState<NavItemConfig['id']>('home');
  const [isScrolled, setIsScrolled] = useState(false);

  const activeNavId = controlledNavId ?? internalNavId;
  const handleSelectNav = (id: NavItemConfig['id']) => {
    setInternalNavId(id);
    controlledOnSelectNav?.(id);
  };

  useEffect(() => {
    const paradeEl = paradeRef.current;
    const navbarEl = navbarRef.current;
    const logoEl = logoImgRef.current;

    if (!paradeEl || !navbarEl) return;

    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;

    const duration = prefersReducedMotion ? 0 : 0.55;
    const ease = 'power3.out';

    // Convert 6rem scroll threshold into pixels based on root font size
    const rootFontSize =
      parseFloat(getComputedStyle(document.documentElement).fontSize) || 16;
    const thresholdPx = SITE_CONFIG.scrollShrinkThresholdRem * rootFontSize;

    const applyScrolledState = () => {
      setIsScrolled(true);

      gsap.to(paradeEl, {
        height: 0,
        opacity: 0,
        y: -10,
        borderBottomColor: 'rgba(75, 31, 15, 0)',
        pointerEvents: 'none',
        duration: duration * 0.75,
        ease,
        overwrite: 'auto',
      });

      gsap.to(navbarEl, {
        width: '90%',
        maxWidth: '80rem',
        marginTop: '1rem',
        paddingTop: '0.6875rem',
        paddingBottom: '0.6875rem',
        borderRadius: '1.125rem',
        backgroundColor: 'rgba(255, 243, 224, 1)', // Warm Cream #FFF3E0
        borderColor: 'rgba(75, 31, 15, 1)', // Cocoa Brown #4B1F0F
        boxShadow: '0.3125rem 0.3125rem 0px rgba(75, 31, 15, 1)',
        duration,
        ease,
        overwrite: 'auto',
      });

      if (logoEl) {
        gsap.to(logoEl, {
          scale: 0.9,
          duration,
          ease,
          overwrite: 'auto',
        });
      }
    };

    const applyInitialState = () => {
      setIsScrolled(false);

      gsap.to(paradeEl, {
        height: '2.75rem',
        opacity: 1,
        y: 0,
        borderBottomColor: 'rgba(75, 31, 15, 1)',
        pointerEvents: 'auto',
        duration: duration * 0.85,
        ease,
        overwrite: 'auto',
      });

      // Geometry expansion
      gsap.to(navbarEl, {
        width: '100%',
        maxWidth: '100%',
        marginTop: '0rem',
        paddingTop: '1rem',
        paddingBottom: '1rem',
        borderRadius: '0rem',
        duration,
        ease,
        overwrite: 'auto',
      });

      // Fade out surface, border, and shadow faster so no 1px border outline lingers at full width
      gsap.to(navbarEl, {
        backgroundColor: 'rgba(255, 243, 224, 0)',
        borderColor: 'rgba(75, 31, 15, 0)',
        boxShadow: '0rem 0rem 0px rgba(75, 31, 15, 0)',
        duration: duration * 0.4,
        ease: 'power2.out',
      });

      if (logoEl) {
        gsap.to(logoEl, {
          scale: 1,
          duration,
          ease,
          overwrite: 'auto',
        });
      }
    };

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        start: `${thresholdPx}px top`,
        onEnter: () => applyScrolledState(),
        onLeaveBack: () => applyInitialState(),
      });

      // Ensure correct state if page reloads while already scrolled down
      if (window.scrollY >= thresholdPx) {
        applyScrolledState();
      }
    }, headerRef);

    return () => {
      ctx.revert();
    };
  }, []);

  return (
    <header
      ref={headerRef}
      className="fixed top-0 left-0 right-0 z-50 w-full flex flex-col items-center pointer-events-none"
    >
      {/* 1. Decorative Popcorn Parade & Comic Social Bar */}
      <PopcornParade paradeRef={paradeRef} />

      {/* 2. Main Navigation Bar */}
      <MainNavbar
        navbarRef={navbarRef}
        logoImgRef={logoImgRef}
        activeNavId={activeNavId}
        onSelectNav={handleSelectNav}
        isScrolled={isScrolled}
      />
    </header>
  );
};
