import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { GlyphSwell } from '@/components/ui/glyph-swell';
import { StoryProgress } from './StoryProgress';
import { OriginStoryScene } from './OriginStoryScene';

gsap.registerPlugin(ScrollTrigger);

/**
 * POPRIO brand-aligned [background, ink, crest] palettes for each of the 5 comic scenes.
 */
const SCENE_GLYPH_PALETTES: readonly [string, string, string][] = [
  ['transparent', '#4B1F0F', '#D78A24'], // Scene 01 (#EADFCB): Cocoa Brown ink + Caramel crest
  ['transparent', '#4B1F0F', '#E0351B'], // Scene 02 (#FFC72C): Cocoa Brown ink + Red Orange crest
  ['transparent', '#FFF3E0', '#FFC72C'], // Scene 03 (#E0351B): Warm Cream ink + Butter Yellow crest
  ['transparent', '#4B1F0F', '#E0351B'], // Scene 04 (#F5A7BE): Cocoa Brown ink + Red Orange crest
  ['transparent', '#FFF3E0', '#FFC72C'], // Scene 05 (#7A3DA6): Warm Cream ink + Butter Yellow crest
];

export const OriginStoryStage: React.FC = () => {
  const pinWrapperRef = useRef<HTMLDivElement>(null);
  const comicStageRef = useRef<HTMLDivElement>(null);
  const [activeSceneIndex, setActiveSceneIndex] = useState<number>(0);
  const activeSceneIndexRef = useRef<number>(0);

  useEffect(() => {
    const pinWrapperEl = pinWrapperRef.current;
    const stageEl = comicStageRef.current;
    if (!pinWrapperEl || !stageEl) return;

    const ctx = gsap.context(() => {
      const scene1El = stageEl.querySelector<HTMLElement>(
        '[data-origin-scene="1"]'
      );
      const scene2El = stageEl.querySelector<HTMLElement>(
        '[data-origin-scene="2"]'
      );
      const scene3El = stageEl.querySelector<HTMLElement>(
        '[data-origin-scene="3"]'
      );
      const scene4El = stageEl.querySelector<HTMLElement>(
        '[data-origin-scene="4"]'
      );
      const scene5El = stageEl.querySelector<HTMLElement>(
        '[data-origin-scene="5"]'
      );

      const bgWipe2 = stageEl.querySelector<HTMLElement>('[data-bg-wipe="2"]');
      const bgWipe3 = stageEl.querySelector<HTMLElement>('[data-bg-wipe="3"]');
      const bgWipe4 = stageEl.querySelector<HTMLElement>('[data-bg-wipe="4"]');
      const bgWipe5 = stageEl.querySelector<HTMLElement>('[data-bg-wipe="5"]');

      // Scene 01 Elements
      const s1Texts = stageEl.querySelectorAll<HTMLElement>('[data-scene1-text]');
      const s1Char = stageEl.querySelector<HTMLElement>('[data-scene1-char]');
      const s1Bubble = stageEl.querySelector<HTMLElement>(
        '[data-scene1-bubble]'
      );
      const s1Frame = stageEl.querySelector<HTMLElement>('[data-scene1-frame]');

      // Scene 02 Elements
      const s2Texts = stageEl.querySelectorAll<HTMLElement>('[data-scene2-text]');
      const s2Burst = stageEl.querySelector<HTMLElement>('[data-scene2-burst]');
      const s2Thinking = stageEl.querySelector<HTMLElement>(
        '[data-scene2-thinking]'
      );
      const s2Thought = stageEl.querySelector<HTMLElement>(
        '[data-scene2-thought]'
      );
      const s2Eureka = stageEl.querySelector<HTMLElement>(
        '[data-scene2-eureka]'
      );
      const s2Aha = stageEl.querySelector<HTMLElement>('[data-scene2-aha]');

      // Scene 03 Elements
      const s3Texts = stageEl.querySelectorAll<HTMLElement>('[data-scene3-text]');
      const s3Stickers = stageEl.querySelector<HTMLElement>(
        '[data-scene3-stickers]'
      );
      const s3Radial = stageEl.querySelector<HTMLElement>(
        '[data-scene3-radial]'
      );
      const s3Explosion = stageEl.querySelector<HTMLElement>(
        '[data-scene3-explosion]'
      );
      const s3Pop = stageEl.querySelector<HTMLElement>('[data-scene3-pop]');
      const s3Crunch = stageEl.querySelector<HTMLElement>(
        '[data-scene3-crunch]'
      );

      // Scene 04 Elements
      const s4Texts = stageEl.querySelectorAll<HTMLElement>('[data-scene4-text]');
      const s4Burst = stageEl.querySelector<HTMLElement>('[data-scene4-burst]');
      const s4Mascot = stageEl.querySelector<HTMLElement>(
        '[data-scene4-mascot]'
      );
      const s4Packages =
        stageEl.querySelectorAll<HTMLElement>('[data-scene4-pkg]');
      const s4Boom = stageEl.querySelector<HTMLElement>('[data-scene4-boom]');

      // Scene 05 Elements
      const s5Texts = stageEl.querySelectorAll<HTMLElement>('[data-scene5-text]');
      const s5Burst = stageEl.querySelector<HTMLElement>('[data-scene5-burst]');
      const s5Mascot = stageEl.querySelector<HTMLElement>(
        '[data-scene5-mascot]'
      );
      const s5Bubble = stageEl.querySelector<HTMLElement>(
        '[data-scene5-bubble]'
      );
      const s5Cta = stageEl.querySelector<HTMLElement>('[data-scene5-cta]');

      // Initial States
      gsap.set(scene1El, { autoAlpha: 1 });
      gsap.set([scene2El, scene3El, scene4El, scene5El], { autoAlpha: 0 });

      // Background Transition Wipes Initial States
      gsap.set(bgWipe2, { xPercent: -108, skewX: -8 });
      gsap.set(bgWipe3, { scale: 0, autoAlpha: 0, transformOrigin: '68% 50%' });
      gsap.set(bgWipe4, { yPercent: 105 });
      gsap.set(bgWipe5, { xPercent: 105 });

      // Scene 1 Initial State (Visible immediately as stage pins, with subtle entrance polish)
      gsap.set(s1Texts, { autoAlpha: 1, y: 0 });
      gsap.set(s1Frame, { autoAlpha: 1, scale: 1 });
      gsap.set(s1Char, { autoAlpha: 1, y: 0, scale: 1 });
      gsap.set(s1Bubble, { autoAlpha: 0, scale: 0.4, y: 12 });

      // Scene 2 Initial States
      gsap.set(s2Texts, { autoAlpha: 0, y: 24 });
      gsap.set(s2Burst, { autoAlpha: 0, scale: 0.45 });
      gsap.set(s2Thinking, { autoAlpha: 0, y: 28, scale: 0.9 });
      gsap.set(s2Thought, { autoAlpha: 0, scale: 0.35, y: 14 });
      gsap.set(s2Eureka, { autoAlpha: 0, y: 24, scale: 0.82 });
      gsap.set(s2Aha, { autoAlpha: 0, scale: 0.25 });

      // Scene 3 Initial States
      gsap.set(s3Texts, { autoAlpha: 0, y: 24 });
      gsap.set(s3Stickers, { autoAlpha: 0, y: 28, scale: 0.92 });
      gsap.set(s3Radial, { autoAlpha: 0, scale: 0.5 });
      gsap.set(s3Explosion, { autoAlpha: 0, scale: 0.78, rotation: -6 });
      gsap.set(s3Pop, { autoAlpha: 0, scale: 0.25 });
      gsap.set(s3Crunch, { autoAlpha: 0, scale: 0.25 });

      // Scene 4 Initial States
      gsap.set(s4Texts, { autoAlpha: 0, y: 24 });
      gsap.set(s4Burst, { autoAlpha: 0, scale: 0.45 });
      gsap.set(s4Mascot, { autoAlpha: 0, y: 32, scale: 0.82 });
      gsap.set(s4Packages, { autoAlpha: 0, scale: 0.4, y: 30 });
      gsap.set(s4Boom, { autoAlpha: 0, scale: 0.25 });

      // Scene 5 Initial States
      gsap.set(s5Texts, { autoAlpha: 0, y: 24 });
      gsap.set(s5Burst, { autoAlpha: 0, scale: 0.5 });
      gsap.set(s5Mascot, { autoAlpha: 0, x: -36, scale: 0.9 });
      gsap.set(s5Bubble, { autoAlpha: 0, scale: 0.35, y: 12 });
      gsap.set(s5Cta, { autoAlpha: 0, y: 20, scale: 0.88 });

      // Master Pinned Timeline (~480vh scroll distance)
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: pinWrapperEl,
          start: 'top top',
          end: '+=480%',
          pin: true,
          scrub: 0.55,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            const p = self.progress;
            const nextIdx =
              p < 0.17 ? 0 : p < 0.44 ? 1 : p < 0.64 ? 2 : p < 0.83 ? 3 : 4;
            if (nextIdx !== activeSceneIndexRef.current) {
              activeSceneIndexRef.current = nextIdx;
              setActiveSceneIndex(nextIdx);
            }
          },
        },
      });

      /* =====================================================================
         SCENE 01: THE BORING BEGINNING
         ===================================================================== */
      tl.addLabel('scene-01-start')
        .to(s1Bubble, {
          autoAlpha: 1,
          scale: 1,
          y: 0,
          duration: 0.4,
          ease: 'back.out(1.8)',
        })
        // Reading hold for Scene 01
        .to({}, { duration: 0.95 });

      /* =====================================================================
         TRANSITION 01 -> 02 (Diagonal Butter Yellow Comic Wipe)
         ===================================================================== */
      tl.addLabel('transition-01-02')
        .to(
          [s1Texts, s1Char, s1Bubble, s1Frame],
          {
            autoAlpha: 0,
            y: -22,
            duration: 0.38,
            ease: 'power2.in',
          },
          'transition-01-02'
        )
        .to(
          bgWipe2,
          {
            xPercent: 0,
            skewX: 0,
            duration: 0.52,
            ease: 'power2.inOut',
          },
          'transition-01-02+=0.08'
        )
        .set(scene1El, { autoAlpha: 0 })
        .set(scene2El, { autoAlpha: 1 });

      /* =====================================================================
         SCENE 02: THE BIG IDEA (Phase 2A Thinking -> Phase 2B Eureka)
         ===================================================================== */
      tl.addLabel('scene-02-thinking')
        .to(s2Texts, {
          autoAlpha: 1,
          y: 0,
          duration: 0.45,
          stagger: 0.08,
          ease: 'power3.out',
        })
        .to(
          s2Thinking,
          {
            autoAlpha: 1,
            y: 0,
            scale: 1,
            duration: 0.48,
            ease: 'back.out(1.4)',
          },
          '-=0.32'
        )
        .to(
          s2Thought,
          {
            autoAlpha: 1,
            scale: 1,
            y: 0,
            duration: 0.4,
            ease: 'back.out(1.9)',
          },
          '-=0.2'
        )
        // Brief pause on Thinking Mascot
        .to({}, { duration: 0.72 })

        // Transition inside Scene 02: Thinking -> Eureka + AHA!
        .addLabel('scene-02-eureka')
        .to([s2Thinking, s2Thought], {
          autoAlpha: 0,
          scale: 0.88,
          duration: 0.32,
          ease: 'power2.in',
        })
        .to(
          s2Burst,
          {
            autoAlpha: 1,
            scale: 1,
            duration: 0.45,
            ease: 'back.out(1.5)',
          },
          '-=0.12'
        )
        .to(
          s2Eureka,
          {
            autoAlpha: 1,
            y: 0,
            scale: 1,
            duration: 0.5,
            ease: 'back.out(1.65)',
          },
          '-=0.35'
        )
        .to(
          s2Aha,
          {
            autoAlpha: 1,
            scale: 1,
            duration: 0.42,
            ease: 'back.out(2.1)',
          },
          '-=0.28'
        )
        // Reading hold for Eureka moment
        .to({}, { duration: 0.9 });

      /* =====================================================================
         TRANSITION 02 -> 03 (Expanding Red Orange Burst)
         ===================================================================== */
      tl.addLabel('transition-02-03')
        .to(
          [s2Texts, s2Eureka, s2Aha, s2Burst],
          {
            autoAlpha: 0,
            scale: 1.06,
            duration: 0.36,
            ease: 'power2.in',
          },
          'transition-02-03'
        )
        .to(
          bgWipe3,
          {
            autoAlpha: 1,
            scale: 1,
            duration: 0.5,
            ease: 'power2.inOut',
          },
          'transition-02-03+=0.06'
        )
        .set(scene2El, { autoAlpha: 0 })
        .set(scene3El, { autoAlpha: 1 });

      /* =====================================================================
         SCENE 03: THE FLAVOUR EXPERIMENT
         ===================================================================== */
      tl.addLabel('scene-03-enter')
        .to(s3Radial, {
          autoAlpha: 1,
          scale: 1,
          duration: 0.45,
          ease: 'back.out(1.4)',
        })
        .to(
          s3Explosion,
          {
            autoAlpha: 1,
            scale: 1,
            rotation: -2,
            duration: 0.55,
            ease: 'back.out(1.5)',
          },
          '-=0.32'
        )
        .to(
          s3Texts,
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.45,
            stagger: 0.08,
            ease: 'power3.out',
          },
          '-=0.4'
        )
        .to(
          s3Pop,
          {
            autoAlpha: 1,
            scale: 1,
            duration: 0.38,
            ease: 'back.out(2.1)',
          },
          '-=0.22'
        )
        .to(
          s3Crunch,
          {
            autoAlpha: 1,
            scale: 1,
            duration: 0.38,
            ease: 'back.out(2.1)',
          },
          '-=0.2'
        )
        .to(
          s3Stickers,
          {
            autoAlpha: 1,
            y: 0,
            scale: 1,
            duration: 0.45,
            ease: 'back.out(1.4)',
          },
          '-=0.25'
        )
        // Reading hold for Scene 03
        .to({}, { duration: 1.0 });

      /* =====================================================================
         TRANSITION 03 -> 04 (Strawberry Pink Stage Reveal)
         ===================================================================== */
      tl.addLabel('transition-03-04')
        .to(
          [s3Texts, s3Stickers, s3Radial, s3Explosion, s3Pop, s3Crunch],
          {
            autoAlpha: 0,
            scale: 0.92,
            duration: 0.38,
            ease: 'power2.in',
          },
          'transition-03-04'
        )
        .to(
          bgWipe4,
          {
            yPercent: 0,
            duration: 0.5,
            ease: 'power2.inOut',
          },
          'transition-03-04+=0.08'
        )
        .set(scene3El, { autoAlpha: 0 })
        .set(scene4El, { autoAlpha: 1 });

      /* =====================================================================
         SCENE 04: POPRIO IS BORN (Climax Reveal + 5 Packages Halo + BOOM!)
         ===================================================================== */
      tl.addLabel('scene-04-enter')
        .to(s4Burst, {
          autoAlpha: 1,
          scale: 1,
          duration: 0.45,
          ease: 'back.out(1.4)',
        })
        .to(
          s4Mascot,
          {
            autoAlpha: 1,
            y: 0,
            scale: 1,
            duration: 0.52,
            ease: 'back.out(1.6)',
          },
          '-=0.3'
        )
        .to(
          s4Packages,
          {
            autoAlpha: 1,
            scale: 1,
            y: 0,
            duration: 0.46,
            stagger: 0.09,
            ease: 'back.out(1.55)',
          },
          '-=0.28'
        )
        .to(
          s4Boom,
          {
            autoAlpha: 1,
            scale: 1,
            duration: 0.42,
            ease: 'back.out(2.1)',
          },
          '-=0.28'
        )
        .to(
          s4Texts,
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.45,
            stagger: 0.08,
            ease: 'power3.out',
          },
          '-=0.38'
        )
        // Reading hold for Scene 04 Climax
        .to({}, { duration: 1.0 });

      /* =====================================================================
         TRANSITION 04 -> 05 (Warm Purple Invitation Stage)
         ===================================================================== */
      tl.addLabel('transition-04-05')
        .to(
          [s4Texts, s4Burst, s4Mascot, s4Packages, s4Boom],
          {
            autoAlpha: 0,
            x: -28,
            duration: 0.38,
            ease: 'power2.in',
          },
          'transition-04-05'
        )
        .to(
          bgWipe5,
          {
            xPercent: 0,
            duration: 0.5,
            ease: 'power2.inOut',
          },
          'transition-04-05+=0.08'
        )
        .set(scene4El, { autoAlpha: 0 })
        .set(scene5El, { autoAlpha: 1 });

      /* =====================================================================
         SCENE 05: YOUR TURN (Pointing Mascot + Speech Bubble + CHAT & ORDER CTA)
         ===================================================================== */
      tl.addLabel('scene-05-enter')
        .to(s5Burst, {
          autoAlpha: 1,
          scale: 1,
          duration: 0.42,
          ease: 'back.out(1.4)',
        })
        .to(
          s5Mascot,
          {
            autoAlpha: 1,
            x: 0,
            scale: 1,
            duration: 0.5,
            ease: 'back.out(1.5)',
          },
          '-=0.28'
        )
        .to(
          s5Bubble,
          {
            autoAlpha: 1,
            scale: 1,
            y: 0,
            duration: 0.4,
            ease: 'back.out(1.9)',
          },
          '-=0.22'
        )
        .to(
          s5Texts,
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.45,
            stagger: 0.09,
            ease: 'power3.out',
          },
          '-=0.28'
        )
        .to(
          s5Cta,
          {
            autoAlpha: 1,
            y: 0,
            scale: 1,
            duration: 0.45,
            ease: 'back.out(1.6)',
          },
          '-=0.18'
        )
        // Final reading & interaction hold before natural unpin release
        .to({}, { duration: 1.25 });
    }, pinWrapperRef);

    const refreshTimer = window.setTimeout(() => {
      ScrollTrigger.refresh();
    }, 90);

    return () => {
      window.clearTimeout(refreshTimer);
      ctx.revert();
    };
  }, []);

  return (
    <div
      ref={pinWrapperRef}
      className="relative w-full h-[100dvh] min-h-[560px] pt-14 sm:pt-20 lg:pt-[5.25rem] pb-3 sm:pb-6 px-3 sm:px-6 lg:px-10 flex items-center justify-center overflow-hidden"
    >
      {/* Large Centered Comic-Book Stage Frame */}
      <div
        ref={comicStageRef}
        role="region"
        aria-label="Interactive POPRIO Origin Comic Book"
        className="relative w-full max-w-[84rem] h-full border-[0.2rem] sm:border-[0.25rem] lg:border-[0.3125rem] border-solid border-cocoa-brown rounded-2xl lg:rounded-[1.5rem] bg-[#EADFCB] flex flex-col overflow-hidden shadow-[0.35rem_0.35rem_0_#4B1F0F] lg:shadow-[0.625rem_0.625rem_0_#4B1F0F]"
      >
        {/* Persistent Top Comic Header & Progress Bar */}
        <StoryProgress activeSceneIndex={activeSceneIndex} />

        {/* Main Comic Viewport Stage */}
        <div className="relative flex-1 w-full overflow-hidden">
          {/* =================================================================
              ANIMATED SCENE BACKGROUND WIPES
              ================================================================= */}
          {/* Scene 01 Base Background (#EADFCB Muted Warm Beige) */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 z-0 bg-[#EADFCB]"
          />

          {/* Scene 02 Diagonal Comic Wipe (#FFC72C Butter Yellow) */}
          <div
            data-bg-wipe="2"
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 z-0 bg-butter-yellow border-l-[0.25rem] border-cocoa-brown"
          />

          {/* Scene 03 Expanding Action Stage (#E0351B Red Orange) */}
          <div
            data-bg-wipe="3"
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 z-0 bg-red-orange"
          />

          {/* Scene 04 Climax Reveal Stage (#F5A7BE Strawberry Pink) */}
          <div
            data-bg-wipe="4"
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 z-0 bg-accent-pink border-t-[0.25rem] border-cocoa-brown"
          />

          {/* Scene 05 Invitation Stage (#7A3DA6 Warm Purple) */}
          <div
            data-bg-wipe="5"
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 z-0 bg-warm-purple border-l-[0.25rem] border-cocoa-brown"
          />

          {/* Interactive POPRIO Brand Glyph Swell Background Field */}
          <GlyphSwell
            colors={
              SCENE_GLYPH_PALETTES[activeSceneIndex] ?? SCENE_GLYPH_PALETTES[0]
            }
            cell={18}
            className="pointer-events-none absolute inset-0 z-0 h-full w-full opacity-35"
          />

          {/* Decorative Comic Corner Registration Marks */}
          <span
            aria-hidden="true"
            className="pointer-events-none absolute top-4 left-4 z-30 w-4 h-4 border-t-[0.18rem] border-l-[0.18rem] border-cocoa-brown/45 rounded-tl-[0.25rem]"
          />
          <span
            aria-hidden="true"
            className="pointer-events-none absolute top-4 right-4 z-30 w-4 h-4 border-t-[0.18rem] border-r-[0.18rem] border-cocoa-brown/45 rounded-tr-[0.25rem]"
          />
          <span
            aria-hidden="true"
            className="pointer-events-none absolute bottom-4 left-4 z-30 w-4 h-4 border-b-[0.18rem] border-l-[0.18rem] border-cocoa-brown/45 rounded-bl-[0.25rem]"
          />
          <span
            aria-hidden="true"
            className="pointer-events-none absolute bottom-4 right-4 z-30 w-4 h-4 border-b-[0.18rem] border-r-[0.18rem] border-cocoa-brown/45 rounded-br-[0.25rem]"
          />

          {/* =================================================================
              FIVE STORY SCENE LAYERS
              ================================================================= */}
          <OriginStoryScene sceneNumber={1} />
          <OriginStoryScene sceneNumber={2} />
          <OriginStoryScene sceneNumber={3} />
          <OriginStoryScene sceneNumber={4} />
          <OriginStoryScene
            sceneNumber={5}
            isInteractiveActive={activeSceneIndex === 4}
          />
        </div>
      </div>
    </div>
  );
};
