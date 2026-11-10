import React, { useRef, useState, useEffect } from 'react';
import { Play, Pause, Volume2, VolumeX } from 'lucide-react';

export interface VideoPlaceholderProps {
  /**
   * URL for the POPRIO promotional video (desktop default 16:9).
   * When omitted, renders the dark cocoa-brown cinematic preview placeholder.
   */
  videoSrc?: string;
  /**
   * Optional mobile-optimized video URL (mobile 9:16 ratio).
   */
  videoSrcMobile?: string;
  /** Optional poster image URL when a real video is supplied */
  posterSrc?: string;
}

export const VideoPlaceholder: React.FC<VideoPlaceholderProps> = ({
  videoSrc,
  videoSrcMobile,
  posterSrc,
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const [isMobile, setIsMobile] = useState<boolean>(() => {
    if (typeof window === 'undefined') return false;
    return window.matchMedia('(max-width: 768px)').matches;
  });

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const mql = window.matchMedia('(max-width: 768px)');
    const onChange = (e: MediaQueryListEvent) => {
      setIsMobile(e.matches);
    };
    mql.addEventListener('change', onChange);
    return () => mql.removeEventListener('change', onChange);
  }, []);

  const activeVideoSrc = isMobile && videoSrcMobile ? videoSrcMobile : videoSrc;

  useEffect(() => {
    const videoEl = videoRef.current;
    if (!videoEl || !activeVideoSrc) return;

    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;

    if (prefersReducedMotion) {
      videoEl.pause();
      setIsPlaying(false);
      return;
    }

    videoEl.muted = true;
    const playPromise = videoEl.play();
    if (playPromise !== undefined) {
      playPromise
        .then(() => {
          setIsPlaying(true);
        })
        .catch(() => {
          setIsPlaying(false);
        });
    }
  }, [activeVideoSrc]);

  const handleTogglePlay = () => {
    const videoEl = videoRef.current;
    if (!videoEl) return;

    if (videoEl.paused) {
      void videoEl.play();
      setIsPlaying(true);
    } else {
      videoEl.pause();
      setIsPlaying(false);
    }
  };

  const handleToggleMute = () => {
    const videoEl = videoRef.current;
    if (!videoEl) return;

    videoEl.muted = !videoEl.muted;
    setIsMuted(videoEl.muted);
  };

  // Real Video Mode
  if (activeVideoSrc) {
    return (
      <div className="relative w-full h-full bg-cocoa-brown overflow-hidden select-none">
        <video
          ref={videoRef}
          key={activeVideoSrc}
          src={activeVideoSrc}
          poster={posterSrc}
          autoPlay
          muted={isMuted}
          playsInline
          loop
          preload="auto"
          onPlay={() => setIsPlaying(true)}
          onPause={() => setIsPlaying(false)}
          className="w-full h-full object-cover block"
        >
          {videoSrcMobile && (
            <source
              src={videoSrcMobile}
              media="(max-width: 768px)"
              type="video/mp4"
            />
          )}
          {videoSrc && <source src={videoSrc} type="video/mp4" />}
        </video>

        {/* Accessible playback controls */}
        <div className="absolute bottom-4 right-4 sm:bottom-6 sm:right-6 z-20 flex items-center gap-2 sm:gap-3">
          <button
            type="button"
            onClick={handleTogglePlay}
            aria-label={
              isPlaying
                ? 'Pause promotional video'
                : 'Play promotional video'
            }
            className="w-9 h-9 sm:w-11 sm:h-11 rounded-full bg-warm-cream/90 text-cocoa-brown comic-border-card flex items-center justify-center cursor-pointer transition-transform duration-200 hover:scale-105"
            style={{ boxShadow: 'var(--shadow-hard-xs)' }}
          >
            {isPlaying ? (
              <Pause className="w-4 h-4 sm:w-5 sm:h-5 fill-current" />
            ) : (
              <Play className="w-4 h-4 sm:w-5 sm:h-5 fill-current ml-0.5" />
            )}
          </button>

          <button
            type="button"
            onClick={handleToggleMute}
            aria-label={isMuted ? 'Unmute video' : 'Mute video'}
            className="w-9 h-9 sm:w-11 sm:h-11 rounded-full bg-warm-cream/90 text-cocoa-brown comic-border-card flex items-center justify-center cursor-pointer transition-transform duration-200 hover:scale-105"
            style={{ boxShadow: 'var(--shadow-hard-xs)' }}
          >
            {isMuted ? (
              <VolumeX className="w-4 h-4 sm:w-5 sm:h-5" />
            ) : (
              <Volume2 className="w-4 h-4 sm:w-5 sm:h-5" />
            )}
          </button>
        </div>
      </div>
    );
  }

  // Fallback Placeholder Mode (#4B1F0F Dark Cocoa-Brown Cinematic Preview)
  return (
    <div className="relative w-full h-full bg-cocoa-brown text-warm-cream flex flex-col items-center justify-center px-6 text-center overflow-hidden select-none">
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none opacity-25"
        style={{
          background:
            'radial-gradient(circle at 50% 50%, rgba(255, 199, 44, 0.22) 0%, rgba(75, 31, 15, 0) 70%)',
        }}
      />

      <div className="relative z-10 flex flex-col items-center justify-center max-w-[44rem] mx-auto">
        <div
          aria-hidden="true"
          className="mb-7 w-[4.5rem] h-[4.5rem] rounded-full border-2 border-warm-cream/35 bg-warm-cream/10 flex items-center justify-center"
        >
          <Play className="w-7 h-7 text-butter-yellow fill-butter-yellow ml-1" />
        </div>

        <h2 className="m-0 font-hero text-[clamp(2.25rem,4.2vw,3.75rem)] leading-none tracking-[0.06em] text-warm-cream uppercase">
          POPRIO
        </h2>

        <p className="mt-4 mb-0 font-jakarta text-[clamp(0.9375rem,1.4vw,1.1875rem)] font-bold tracking-[0.22em] text-butter-yellow uppercase">
          SOMETHING DELICIOUS IS COMING.
        </p>
      </div>
    </div>
  );
};
