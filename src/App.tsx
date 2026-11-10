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
import { PoprioEditorProvider, usePoprioEditor } from './context/PoprioEditorContext';
import { PoprioEditorBar } from './components/editor/PoprioEditorBar';
import { PoprioInspectorPanel } from './components/editor/PoprioInspectorPanel';
import { PoprioRevisionsDrawer } from './components/editor/PoprioRevisionsDrawer';
import { PoprioAdminLauncher } from './components/editor/PoprioAdminLauncher';
import { PoprioToast } from './components/editor/PoprioToast';
import { PoprioEditableSection } from './components/editor/PoprioEditableSection';
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

function AppContent() {
  const [currentPage, setCurrentPage] = useState<'home' | 'about' | 'contact'>(getInitialPage);
  const [activeNavId, setActiveNavId] = useState<NavItemConfig['id']>(() => getInitialPage());

  const { isEditorActive, previewDevice } = usePoprioEditor();

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

  // Refresh GSAP ScrollTriggers whenever the active page view or device preview switches
  useEffect(() => {
    const timer = window.setTimeout(() => {
      ScrollTrigger.refresh();
    }, 150);
    return () => window.clearTimeout(timer);
  }, [currentPage, previewDevice]);

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

  // Responsive device frame wrapper classes
  const isConstrainedDevice = isEditorActive && previewDevice !== 'desktop';
  const deviceContainerClass =
    previewDevice === 'tablet'
      ? 'max-w-[768px] mx-auto my-6 rounded-[2rem] border-8 border-[#4B1F0F] shadow-[0_25px_50px_-12px_rgba(0,0,0,0.5)] overflow-hidden transition-all duration-300'
      : previewDevice === 'mobile'
      ? 'max-w-[390px] mx-auto my-6 rounded-[2.5rem] border-8 border-[#4B1F0F] shadow-[0_25px_50px_-12px_rgba(0,0,0,0.5)] overflow-hidden transition-all duration-300'
      : '';

  return (
    <div
      className={`min-h-screen ${
        isEditorActive ? 'pt-16 bg-[#2d1209]' : ''
      } transition-colors duration-200`}
    >
      {/* Editor Top Navigation Bar */}
      <PoprioEditorBar />

      {/* Editor Slide-Over Panels */}
      <PoprioInspectorPanel />
      <PoprioRevisionsDrawer />
      <PoprioToast />
      <PoprioAdminLauncher />

      {/* Main Viewport Container (Applies phone/tablet frame if device mode selected) */}
      <div className={deviceContainerClass}>
        <div
          id="top"
          className={`min-h-screen text-cocoa-brown ${
            currentPage === 'home' ? 'bg-butter-yellow' : 'bg-warm-cream'
          }`}
        >
          {/* Comic-Book Header & Interactive Navigation System */}
          <PoprioEditableSection sectionId="header" title="Header & WhatsApp">
            <SiteHeader activeNavId={activeNavId} onSelectNav={handleNavigate} />
          </PoprioEditableSection>

          {/* Main Content */}
          {currentPage === 'home' && (
            <main key="page-home" className="m-0 p-0">
              {/* Section 01: Hero Section with Animated Headings, Floating Corns & 5-Package Fan */}
              <PoprioEditableSection sectionId="hero" title="Hero Section">
                <HeroSection />
              </PoprioEditableSection>

              {/* Shared Warm Cream & Continuous Interactive Grid Canvas for Video + Flavourverse + Origin Story */}
              <div className="relative w-full bg-warm-cream overflow-x-hidden">
                <InteractiveGrid cellSize={44} className="z-0 text-cocoa-brown/55" />

                {/* Section 02: Sticky Scroll-Shrink Video Section */}
                <PoprioEditableSection sectionId="trailer" title="Trailer Video">
                  <ScrollVideoSection key="home-video" />
                </PoprioEditableSection>

                {/* Section 03: The Flavourverse Connected Comic-Book Showcase */}
                <PoprioEditableSection sectionId="flavourverse" title="Flavourverse Grid">
                  <FlavourverseSection />
                </PoprioEditableSection>

                {/* Section 04: The Origin of the Pop — Sticky Scroll-Driven Interactive Comic Book */}
                <PoprioEditableSection sectionId="origin-story" title="Origin Story">
                  <OriginStorySection key="home-origin" />
                </PoprioEditableSection>
              </div>

              {/* Section 05: How To Order — Solid Butter Yellow Section */}
              <PoprioEditableSection sectionId="how-to-order" title="How to Order">
                <HowToOrderSection />
              </PoprioEditableSection>
            </main>
          )}

          {currentPage === 'about' && (
            <main key="page-about" className="m-0 p-0">
              {/* Shared Warm Cream & Continuous Interactive Grid Canvas for the About Us Page */}
              <div className="relative w-full bg-warm-cream pt-[6.75rem] lg:pt-[8rem] overflow-x-hidden">
                <InteractiveGrid cellSize={44} className="z-0 text-cocoa-brown/55" />

                {/* About Section 01: Promotional Video Section */}
                <PoprioEditableSection sectionId="trailer" title="Trailer Video">
                  <ScrollVideoSection key="about-video" />
                </PoprioEditableSection>

                {/* About Section 02: Brand Story */}
                <PoprioEditableSection sectionId="about" title="About Page Story">
                  <AboutStorySection />
                </PoprioEditableSection>

                {/* About Section 03: The Origin of the Pop Section */}
                <PoprioEditableSection sectionId="origin-story" title="Origin Story">
                  <OriginStorySection key="about-origin" />
                </PoprioEditableSection>
              </div>
            </main>
          )}

          {currentPage === 'contact' && (
            <main key="page-contact" className="m-0 p-0">
              {/* Shared Warm Cream & Continuous Interactive Grid Canvas for the Contact Page */}
              <div className="relative w-full bg-warm-cream pt-[6.75rem] lg:pt-[8rem] overflow-x-hidden">
                <InteractiveGrid cellSize={44} className="z-0 text-cocoa-brown/55" />

                {/* Contact Section: Comic Dispatch Hotline & FAQs */}
                <PoprioEditableSection sectionId="contact" title="Contact & FAQs">
                  <ContactPageSection />
                </PoprioEditableSection>
              </div>
            </main>
          )}

          {/* Final Section + Integrated Footer */}
          <PoprioEditableSection sectionId="footer" title="Finale & Footer">
            <FinaleFooter key={`footer-${currentPage}`} onNavigate={handleNavigate} />
          </PoprioEditableSection>
        </div>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <PoprioContentProvider>
      <ProductModalProvider>
        <PoprioEditorProvider>
          <AppContent />
        </PoprioEditorProvider>
      </ProductModalProvider>
    </PoprioContentProvider>
  );
}
