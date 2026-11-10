import React from 'react';
import { ORIGIN_STORY_SCENES } from '../../data/originStoryData';

interface StoryProgressProps {
  activeSceneIndex: number; // 0 to 4
}

export const StoryProgress: React.FC<StoryProgressProps> = ({
  activeSceneIndex,
}) => {
  const currentScene =
    ORIGIN_STORY_SCENES[activeSceneIndex] ?? ORIGIN_STORY_SCENES[0];

  return (
    <div
      aria-label={`Story progress: Chapter ${currentScene.chapterCode} of 05`}
      className="relative z-40 w-full px-3 sm:px-6 lg:px-9 py-2 sm:py-3.5 border-b-[0.25rem] border-solid border-cocoa-brown bg-warm-cream text-cocoa-brown flex items-center justify-between gap-2 sm:gap-4 select-none shrink-0"
    >
      {/* Left: Comic Issue / Active Scene Identity Badge */}
      <div className="flex items-center gap-2 sm:gap-3">
        <span
          className="inline-flex items-center px-2 sm:px-3 py-0.5 sm:py-1 rounded-[0.5rem] border-[0.125rem] sm:border-[0.15rem] border-solid border-cocoa-brown font-hero text-[0.6875rem] sm:text-[0.75rem] tracking-[0.06em] sm:tracking-[0.08em] uppercase"
          style={{
            backgroundColor: currentScene.badgeBgColor,
            color: currentScene.badgeTextColor,
            boxShadow: '0.125rem 0.125rem 0 #4B1F0F',
          }}
        >
          {currentScene.identityLabel}
        </span>

        <span className="hidden sm:inline-block font-jakarta text-[0.8125rem] font-extrabold tracking-[0.08em] text-cocoa-brown/75 uppercase">
          POPRIO COMICS · ORIGIN ISSUE #01
        </span>
      </div>

      {/* Right: Persistent Chapter Counter + 5 Segmented Progress Bars */}
      <div className="flex items-center gap-2 sm:gap-4">
        <span className="font-hero text-[0.6875rem] sm:text-[0.8125rem] tracking-[0.06em] sm:tracking-[0.08em] text-cocoa-brown uppercase whitespace-nowrap">
          CH {currentScene.chapterCode} / 05
        </span>

        <div
          aria-hidden="true"
          className="flex items-center gap-1 sm:gap-1.5"
        >
          {ORIGIN_STORY_SCENES.map((scene, idx) => {
            const isCompletedOrActive = idx <= activeSceneIndex;
            const isCurrent = idx === activeSceneIndex;

            return (
              <span
                key={scene.sceneNumber}
                className={`h-2 sm:h-3 rounded-[0.25rem] border-[0.1rem] sm:border-[0.125rem] border-solid border-cocoa-brown transition-all duration-300 ${
                  isCurrent ? 'w-5 sm:w-8' : 'w-3 sm:w-5'
                }`}
                style={{
                  backgroundColor: isCurrent
                    ? '#E0351B'
                    : isCompletedOrActive
                      ? '#FFC72C'
                      : '#EADFCB',
                  boxShadow: isCurrent ? '0.1rem 0.1rem 0 #4B1F0F' : 'none',
                }}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};
