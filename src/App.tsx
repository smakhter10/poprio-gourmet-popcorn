import { useState, useEffect, useCallback } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SiteHeader } from './components/header/SiteHeader';
import { HeroSection } from './components/hero/HeroSection';
import { ScrollVideoSection } from './components/sections/ScrollVideoSection';
import { FlavourverseSection } from './components/sections/FlavourverseSection';
import { OriginStorySection } from './components/origin-story/OriginStorySection';
import { HowToOrderSection } from './components/sections/HowToOrderSection';
import { AboutStorySection } from './components/sections/AboutStorySection';
import { ContactPageSection } from './components/sections/ContactPageSection';
import { FinaleFooter } from './components/sections/FinaleFooter';
import { PoprioContentProvider } from './context/PoprioContentContext';
import { ProductModalProvider } from './context/ProductModalContext';
import { NavItemConfig } from './config/site';
import { InteractiveGrid } from '@/components/ui/interactive-grid';

gsap.registerPlugin(ScrollTrigger);

function getInitialPage(): 'home' | 'about' | 'contact' {
  if (typeof window === 'undefined') return 'home';

  // 1. WordPress injected runtime page
  const wpInitial = (window as any).POPRIO_INITIAL_PAGE || (window as any).POPRIO_DATA?.initialPage;
  if (wpInitial === 'about' || wpInitial === 'contact' || wpInitial === 'home') {
    return wpInitial;
  }

  // 2. Query param ?page=about / ?page=contact
  const searchParams = new URLSearchParams(window.location.search);
  const queryPage = searchParams.get('page');
  if (queryPage === 'about' || queryPage === 'contact') {
    return queryPage;
  }

  // 3. Pathname /about or /contact
  const pathname = window.location.pathname.toLowerCase().replace(/\/+$/, '');
  if (pathname.endsWith('/about') || pathname === '/about') {
    return 'about';
  }
  if (pathname.endsWith('/contact') || pathname === '/contact') {
    return 'contact';
  }

  // 4. Hash fallback
  const hash = window.location.hash.toLowerCase();
  if (hash === '#about') return 'about';
  if (hash === '#contact') return 'contact';

  return 'home';
}

function updateBrowserUrl(page: 'home' | 'about' | 'contact') {
  if (typeof window === 'undefined') return;

  const siteUrl = (window as any).POPRIO_DATA?.siteUrl;
  let targetUrl = page === 'home' ? '/' : `/${page}`;

  if (siteUrl) {
    try {
      const parsedSite = new URL(siteUrl);
      const basePath = parsedSite.pathname.replace(/\/+$/, '');
      targetUrl = page === 'home' ? (basePath || '/') : `${basePath}/${page}`;
    } catch {
      targetUrl = page === 'home' ? '/' : `/${page}`;
    }
  }

  if (window.location.pathname !== targetUrl && !window.location.pathname.endsWith(`/${page}`)) {
    window.history.pushState({ page }, '', targetUrl);
  }
}

export default function App() {
  const [currentPage, setCurrentPage] = useState<'home' | 'about' | 'contact'>(getInitialPage);
  const [activeNavId, setActiveNavId] = useState<NavItemConfig['id']>(() => getInitialPage());

  // Listen for browser Back/Forward popstate events
  useEffect(() => {
    const handlePopState = () => {
      const page = getInitialPage();
      setCurrentPage(page);
      setActiveNavId(page);
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  // Refresh GSAP ScrollTriggers whenever the active page view switches
  useEffect(() => {
    const timer = window.setTimeout(() => {
      ScrollTrigger.refresh();
    }, 120);
    return () => window.clearTimeout(timer);
  }, [currentPage]);

  const handleNavigate = useCallback(
    (id: NavItemConfig['id']) => {
      setActiveNavId(id);

      if (id === 'about') {
        updateBrowserUrl('about');
        if (currentPage !== 'about') {
          setCurrentPage('about');
          window.scrollTo({ top: 0, behavior: 'auto' });
        } else {
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }
        return;
      }

      if (id === 'contact') {
        updateBrowserUrl('contact');
        if (currentPage !== 'contact') {
          setCurrentPage('contact');
          window.scrollTo({ top: 0, behavior: 'auto' });
        } else {
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }
        return;
      }

      if (id === 'home') {
        updateBrowserUrl('home');
        if (currentPage !== 'home') {
          setCurrentPage('home');
          window.scrollTo({ top: 0, behavior: 'auto' });
        } else {
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }
        return;
      }

      if (id === 'products') {
        updateBrowserUrl('home');
        if (currentPage !== 'home') {
          setCurrentPage('home');
          window.scrollTo({ top: 0, behavior: 'auto' });
          window.setTimeout(() => {
            const el = document.getElementById('flavourverse');
            el?.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }, 140);
        } else {
          const el = document.getElementById('flavourverse');
          el?.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
        return;
      }
    },
    [currentPage]
  );

  return (
    <PoprioContentProvider>
      <ProductModalProvider>
        <div
          id="top"
          className={`min-h-screen text-cocoa-brown ${
            currentPage === 'home' ? 'bg-butter-yellow' : 'bg-warm-cream'
          }`}
        >
          {/* Comic-Book Header & Interactive Navigation System */}
          <SiteHeader
            activeNavId={activeNavId}
            onSelectNav={handleNavigate}
          />

          {/* Main Content */}
          {currentPage === 'home' && (
            <main key="page-home" className="m-0 p-0">
              {/* Section 01: Hero Section with Animated Headings, Floating Corns & 5-Package Fan */}
              <HeroSection />

              {/* Shared Warm Cream & Continuous Interactive Grid Canvas for Video + Flavourverse + Origin Story */}
              <div className="relative w-full bg-warm-cream overflow-x-hidden">
                <InteractiveGrid
                  cellSize={44}
                  className="z-0 text-cocoa-brown/55"
                />

                {/* Section 02: Sticky Scroll-Shrink Video Section (begins immediately after Hero with zero gap) */}
                <ScrollVideoSection key="home-video" />

                {/* Section 03: The Flavourverse Connected Comic-Book Showcase */}
                <FlavourverseSection />

                {/* Section 04: The Origin of the Pop — Sticky Scroll-Driven Interactive Comic Book */}
                <OriginStorySection key="home-origin" />
              </div>

              {/* Section 05: How To Order — Solid Butter Yellow (#FFC72C) Section with Looping Animation */}
              <HowToOrderSection />
            </main>
          )}

          {currentPage === 'about' && (
            <main key="page-about" className="m-0 p-0">
              {/* Shared Warm Cream & Continuous Interactive Grid Canvas for the About Us Page */}
              <div className="relative w-full bg-warm-cream pt-[6.75rem] lg:pt-[8rem] overflow-x-hidden">
                <InteractiveGrid
                  cellSize={44}
                  className="z-0 text-cocoa-brown/55"
                />

                {/* About Section 01: Reused Sticky Scroll-Shrink Promotional Video Section */}
                <ScrollVideoSection key="about-video" />

                {/* About Section 02: Auto-Transitioning Mascot Showcase (Left) + Brand Story (Right) */}
                <AboutStorySection />

                {/* About Section 03: Reused The Origin of the Pop Section */}
                <OriginStorySection key="about-origin" />
              </div>
            </main>
          )}

          {currentPage === 'contact' && (
            <main key="page-contact" className="m-0 p-0">
              {/* Shared Warm Cream & Continuous Interactive Grid Canvas for the Contact Page */}
              <div className="relative w-full bg-warm-cream pt-[6.75rem] lg:pt-[8rem] overflow-x-hidden">
                <InteractiveGrid
                  cellSize={44}
                  className="z-0 text-cocoa-brown/55"
                />

                {/* Contact Section: Comic Dispatch Hotline, Interactive Crunch Gram Form & FAQs */}
                <ContactPageSection />
              </div>
            </main>
          )}

          {/* Final Section + Integrated Footer — Dark Cocoa Brown (#4B1F0F) Comic Finale */}
          <FinaleFooter key={`footer-${currentPage}`} onNavigate={handleNavigate} />
        </div>
      </ProductModalProvider>
    </PoprioContentProvider>
  );
}

