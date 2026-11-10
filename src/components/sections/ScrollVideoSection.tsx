import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { VideoPlaceholder } from './VideoPlaceholder';
import { getAssetUrl } from '../../lib/assets';
import { usePoprioContent } from '../../context/PoprioContentContext';

gsap.registerPlugin(ScrollTrigger);

export interface ScrollVideoSectionProps {
  /** Optional video URL when the final promotional video is ready */
  videoSrc?: string;
  /** Optional mobile 9:16 video URL */
  videoSrcMobile?: string;
  /** Optional video poster image URL */
  posterSrc?: string;
}

export const DEFAULT_POPRIO_TRAILER_SRC =
  getAssetUrl('/assets/videos/POPRIO-The-Art-of-The-Pop-15s-Trailer-1920x1080.mp4');

export const DEFAULT_POPRIO_TRAILER_MOBILE_SRC =
  getAssetUrl('/assets/videos/POPRIO-The-Art-of-The-Pop-15s-Trailer-1080x1920-Mobile.mp4');

export const ScrollVideoSection: React.FC<ScrollVideoSectionProps> = ({
  videoSrc,
  videoSrcMobile,
  posterSrc,
}) => {
  const { trailer } = usePoprioContent();
  const effectiveVideoSrc = videoSrc || trailer?.videoSrc || DEFAULT_POPRIO_TRAILER_SRC;
  const effectiveVideoSrcMobile = videoSrcMobile || trailer?.videoSrcMobile || DEFAULT_POPRIO_TRAILER_MOBILE_SRC;
  const effectivePosterSrc = posterSrc || trailer?.posterSrc;

  const sectionRef = useRef<HTMLElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const videoPanelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const stageEl = stageRef.current;
    const panelEl = videoPanelRef.current;
    if (!stageEl || !panelEl) return;

    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');

    const applyReducedMotionState = () => {
      gsap.set(panelEl, {
        width: '85%',
        height: '52vh',
        borderRadius: '2rem',
        rotation: 0,
        y: '2rem',
        transformOrigin: 'center top',
      });
    };

    if (mediaQuery.matches) {
      applyReducedMotionState();
      return;
    }

    const ctx = gsap.context(() => {
      // State A (0% scroll progress): Full-viewport 100vw x 100vh with zero radius, zero rotation
      gsap.set(panelEl, {
        width: '100%',
        height: '100vh',
        borderRadius: '0rem',
        rotation: 0,
        y: '0rem',
        transformOrigin: 'center top',
        force3D: true,
      });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: stageEl,
          start: 'top top',
          end: '+=100%',
          pin: true,
          scrub: 0.5,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

      // 0% -> 25% (State B: Beginning of shrink, small rounded corners appear)
      tl.to(panelEl, {
        width: '96%',
        height: '88vh',
        borderRadius: '0.625rem',
        y: '0.25rem',
        rotation: 0,
        ease: 'none',
        duration: 0.25,
      });

      // 25% -> 50% (State C: Mid-transition ~92vw x 75vh, radius ~1.25rem, rotation 0)
      tl.to(panelEl, {
        width: '92%',
        height: '75vh',
        borderRadius: '1.25rem',
        y: '0.625rem',
        rotation: 0,
        ease: 'none',
        duration: 0.25,
      });

      // 50% -> 65% (Approaching rotation onset at 65% progress)
      tl.to(panelEl, {
        width: '89.5%',
        height: '66vh',
        borderRadius: '1.55rem',
        y: '0.875rem',
        rotation: 0,
        ease: 'none',
        duration: 0.15,
      });

      // 65% -> 100% (State D: Final transformation ~85vw x 52vh, radius 2rem, rotation -1.5deg)
      tl.to(panelEl, {
        width: '85%',
        height: '52vh',
        borderRadius: '2rem',
        y: '1.25rem',
        rotation: -1.5,
        ease: 'none',
        duration: 0.35,
      });
    }, sectionRef);

    const handleMotionChange = (event: MediaQueryListEvent) => {
      if (event.matches) {
        ctx.revert();
        applyReducedMotionState();
      }
    };

    mediaQuery.addEventListener('change', handleMotionChange);

    return () => {
      mediaQuery.removeEventListener('change', handleMotionChange);
      ctx.revert();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      aria-label="POPRIO Promotional Video Preview"
      className="relative z-10 w-full m-0 p-0 bg-transparent overflow-x-hidden pointer-events-none"
    >
      {/* Full-Viewport Pinned Stage */}
      <div
        ref={stageRef}
        className="relative w-full h-screen bg-transparent flex items-start justify-center m-0 p-0 overflow-hidden pointer-events-none"
      >
        {/* Top-Aligned, Horizontally Centred Shrinking Video Container */}
        <div
          ref={videoPanelRef}
          className="relative z-10 w-full h-screen mx-auto overflow-hidden will-change-transform pointer-events-auto"
          style={{
            transformOrigin: 'center top',
          }}
        >
          <VideoPlaceholder
            videoSrc={effectiveVideoSrc}
            videoSrcMobile={effectiveVideoSrcMobile}
            posterSrc={effectivePosterSrc}
          />
        </div>
      </div>
    </section>
  );
};
