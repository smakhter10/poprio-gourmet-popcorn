import React, { useState } from 'react';
import { usePoprioEditor } from '../../context/PoprioEditorContext';
import { usePoprioContent } from '../../context/PoprioContentContext';
import {
  X,
  Sliders,
  Type,
  FileText,
  Phone,
  Sparkles,
  Layers,
  HelpCircle,
  Plus,
  Trash2,
  BookOpen,
  ShoppingBag,
} from 'lucide-react';

export const PoprioInspectorPanel: React.FC = () => {
  const { isInspectorOpen, closeInspector, selectedSectionId, updateContentWithHistory } =
    usePoprioEditor();
  const { content } = usePoprioContent();

  // Internal tab state for sub-item editors (flavours, scenes, steps)
  const [activeFlavourIdx, setActiveFlavourIdx] = useState<number>(0);
  const [activeSceneIdx, setActiveSceneIdx] = useState<number>(0);
  const [activeStepIdx, setActiveStepIdx] = useState<number>(0);

  if (!isInspectorOpen || !selectedSectionId) {
    return null;
  }

  // Section titles mapping
  const sectionTitles: Record<string, string> = {
    header: 'Header & Announcement',
    hero: 'Hero Section',
    trailer: 'Cinematic Trailer',
    flavourverse: 'Flavourverse Grid',
    'origin-story': 'Origin Story',
    'how-to-order': 'How to Order',
    about: 'About Page',
    contact: 'Contact & FAQs',
    footer: 'Finale & Footer',
  };

  return (
    <aside
      aria-label="Section Inspector"
      className="fixed top-16 right-0 bottom-0 w-full sm:w-[420px] bg-[#FFF3E0] text-[#4B1F0F] z-[99997] border-l-4 border-[#4B1F0F] shadow-[-6px_0px_0px_#4B1F0F] flex flex-col font-sans animate-in slide-in-from-right duration-200 select-none"
    >
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b-3 border-[#4B1F0F] bg-[#FFC72C]">
        <div className="flex items-center gap-2">
          <Sliders className="w-5 h-5 text-[#4B1F0F]" />
          <div>
            <h2 className="font-heading text-sm font-black uppercase tracking-wider text-[#4B1F0F]">
              {sectionTitles[selectedSectionId] || 'Section Inspector'}
            </h2>
            <span className="text-[10px] font-bold text-[#4B1F0F]/80 uppercase">
              ID: {selectedSectionId}
            </span>
          </div>
        </div>
        <button
          onClick={closeInspector}
          aria-label="Close Inspector"
          className="p-1 rounded-lg hover:bg-black/10 transition-colors"
        >
          <X className="w-5 h-5 text-[#4B1F0F]" />
        </button>
      </div>

      {/* Live Notice */}
      <div className="px-4 py-2 bg-amber-100/70 border-b-2 border-[#4B1F0F]/15 flex items-center justify-between text-[11px] font-bold text-[#4B1F0F]/80">
        <span className="flex items-center gap-1.5">
          <Sparkles className="w-3.5 h-3.5 text-amber-600" />
          Live Two-Way Preview Active
        </span>
        <span className="text-[10px] text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded border border-emerald-300">
          Syncs On Input
        </span>
      </div>

      {/* Inspector Body */}
      <div className="flex-1 overflow-y-auto p-4 space-y-5">
        {/* ======================================================== */}
        {/* SECTION: HEADER                                          */}
        {/* ======================================================== */}
        {selectedSectionId === 'header' && (
          <div className="space-y-4">
            <div>
              <label className="block text-xs font-black uppercase tracking-wider mb-1">
                WhatsApp Hotline Number
              </label>
              <input
                type="text"
                value={content.meta?.whatsappNumber || ''}
                onChange={(e) =>
                  updateContentWithHistory({
                    meta: { ...content.meta, whatsappNumber: e.target.value },
                  })
                }
                className="w-full px-3 py-2 bg-white rounded-lg border-2 border-[#4B1F0F] text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-[#FFC72C]"
                placeholder="8801705117793"
              />
              <p className="text-[10px] text-[#4B1F0F]/70 mt-1">
                Used across all WhatsApp order buttons and links.
              </p>
            </div>

            <div>
              <label className="block text-xs font-black uppercase tracking-wider mb-1">
                WhatsApp Default Greeting
              </label>
              <textarea
                rows={2}
                value={content.meta?.whatsappGreeting || ''}
                onChange={(e) =>
                  updateContentWithHistory({
                    meta: { ...content.meta, whatsappGreeting: e.target.value },
                  })
                }
                className="w-full px-3 py-2 bg-white rounded-lg border-2 border-[#4B1F0F] text-sm font-medium focus:outline-none focus:ring-2 focus:ring-[#FFC72C]"
                placeholder="Hi POPRIO! I'd like to order..."
              />
            </div>
          </div>
        )}

        {/* ======================================================== */}
        {/* SECTION: HERO                                            */}
        {/* ======================================================== */}
        {selectedSectionId === 'hero' && (
          <div className="space-y-4">
            <div>
              <label className="block text-xs font-black uppercase tracking-wider mb-1">
                Eyebrow Line 1
              </label>
              <input
                type="text"
                value={content.hero?.eyebrow1 || ''}
                onChange={(e) =>
                  updateContentWithHistory({
                    hero: { ...content.hero, eyebrow1: e.target.value },
                  })
                }
                className="w-full px-3 py-2 bg-white rounded-lg border-2 border-[#4B1F0F] text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-[#FFC72C]"
                placeholder="Not Your Ordinary"
              />
            </div>

            <div>
              <label className="block text-xs font-black uppercase tracking-wider mb-1">
                Eyebrow Line 2
              </label>
              <input
                type="text"
                value={content.hero?.eyebrow2 || ''}
                onChange={(e) =>
                  updateContentWithHistory({
                    hero: { ...content.hero, eyebrow2: e.target.value },
                  })
                }
                className="w-full px-3 py-2 bg-white rounded-lg border-2 border-[#4B1F0F] text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-[#FFC72C]"
                placeholder="Your Next Obsession?"
              />
            </div>

            <div>
              <label className="block text-xs font-black uppercase tracking-wider mb-1">
                Subtitle
              </label>
              <textarea
                rows={3}
                value={content.hero?.subtitle || ''}
                onChange={(e) =>
                  updateContentWithHistory({
                    hero: { ...content.hero, subtitle: e.target.value },
                  })
                }
                className="w-full px-3 py-2 bg-white rounded-lg border-2 border-[#4B1F0F] text-sm font-medium focus:outline-none focus:ring-2 focus:ring-[#FFC72C]"
              />
            </div>

            <div>
              <label className="block text-xs font-black uppercase tracking-wider mb-1">
                CTA Button Text
              </label>
              <input
                type="text"
                value={content.hero?.ctaText || ''}
                onChange={(e) =>
                  updateContentWithHistory({
                    hero: { ...content.hero, ctaText: e.target.value },
                  })
                }
                className="w-full px-3 py-2 bg-white rounded-lg border-2 border-[#4B1F0F] text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-[#FFC72C]"
                placeholder="Explore Flavours"
              />
            </div>

            {/* Rotating Words Management */}
            <div className="pt-2 border-t-2 border-[#4B1F0F]/15">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-black uppercase tracking-wider">
                  Primary Rotating Words ({content.hero?.primaryWords?.length || 0})
                </span>
                <button
                  type="button"
                  onClick={() => {
                    const current = [...(content.hero?.primaryWords || [])];
                    current.push({
                      text: 'Crunch',
                      color: '#FFFFFF',
                      pillBg: 'var(--color-warm-cream)',
                      badgeBg: 'var(--color-red-orange)',
                      strokeColor: '#180904',
                      strokeWidth: '0.24rem',
                    });
                    updateContentWithHistory({
                      hero: { ...content.hero, primaryWords: current },
                    });
                  }}
                  className="flex items-center gap-1 text-[11px] font-bold text-[#4B1F0F] bg-[#FFC72C] hover:bg-white px-2 py-1 rounded border border-[#4B1F0F] transition-colors"
                >
                  <Plus className="w-3 h-3" />
                  <span>Add Word</span>
                </button>
              </div>

              <div className="space-y-2">
                {(content.hero?.primaryWords || []).map((w, idx) => (
                  <div
                    key={idx}
                    className="flex items-center gap-2 p-2 bg-white rounded-lg border-2 border-[#4B1F0F]/30"
                  >
                    <input
                      type="text"
                      value={w.text}
                      onChange={(e) => {
                        const copy = [...content.hero.primaryWords];
                        copy[idx] = { ...copy[idx], text: e.target.value };
                        updateContentWithHistory({
                          hero: { ...content.hero, primaryWords: copy },
                        });
                      }}
                      className="flex-1 px-2 py-1 bg-amber-50 rounded border border-[#4B1F0F]/20 text-xs font-bold"
                    />
                    <button
                      type="button"
                      disabled={content.hero.primaryWords.length <= 1}
                      onClick={() => {
                        const copy = content.hero.primaryWords.filter((_, i) => i !== idx);
                        updateContentWithHistory({
                          hero: { ...content.hero, primaryWords: copy },
                        });
                      }}
                      className="p-1 text-red-600 hover:bg-red-50 rounded disabled:opacity-30"
                      title="Remove word"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ======================================================== */}
        {/* SECTION: TRAILER                                         */}
        {/* ======================================================== */}
        {selectedSectionId === 'trailer' && (
          <div className="space-y-4">
            <div>
              <label className="block text-xs font-black uppercase tracking-wider mb-1">
                Badge Text
              </label>
              <input
                type="text"
                value={content.trailer?.badge || ''}
                onChange={(e) =>
                  updateContentWithHistory({
                    trailer: { ...content.trailer, badge: e.target.value },
                  })
                }
                className="w-full px-3 py-2 bg-white rounded-lg border-2 border-[#4B1F0F] text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-[#FFC72C]"
                placeholder="THE SOUND OF THE POP"
              />
            </div>

            <div>
              <label className="block text-xs font-black uppercase tracking-wider mb-1">
                Section Heading
              </label>
              <textarea
                rows={2}
                value={content.trailer?.heading || ''}
                onChange={(e) =>
                  updateContentWithHistory({
                    trailer: { ...content.trailer, heading: e.target.value },
                  })
                }
                className="w-full px-3 py-2 bg-white rounded-lg border-2 border-[#4B1F0F] text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-[#FFC72C]"
                placeholder="Experience the Crunch"
              />
            </div>
          </div>
        )}

        {/* ======================================================== */}
        {/* SECTION: FLAVOURVERSE                                    */}
        {/* ======================================================== */}
        {selectedSectionId === 'flavourverse' && (
          <div className="space-y-4">
            <div>
              <label className="block text-xs font-black uppercase tracking-wider mb-1">
                Eyebrow
              </label>
              <input
                type="text"
                value={content.flavourverse?.eyebrow || ''}
                onChange={(e) =>
                  updateContentWithHistory({
                    flavourverse: { ...content.flavourverse, eyebrow: e.target.value },
                  })
                }
                className="w-full px-3 py-2 bg-white rounded-lg border-2 border-[#4B1F0F] text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-[#FFC72C]"
              />
            </div>

            <div>
              <label className="block text-xs font-black uppercase tracking-wider mb-1">
                Title
              </label>
              <input
                type="text"
                value={content.flavourverse?.title || ''}
                onChange={(e) =>
                  updateContentWithHistory({
                    flavourverse: { ...content.flavourverse, title: e.target.value },
                  })
                }
                className="w-full px-3 py-2 bg-white rounded-lg border-2 border-[#4B1F0F] text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-[#FFC72C]"
              />
            </div>

            <div>
              <label className="block text-xs font-black uppercase tracking-wider mb-1">
                Subtitle
              </label>
              <textarea
                rows={2}
                value={content.flavourverse?.subtitle || ''}
                onChange={(e) =>
                  updateContentWithHistory({
                    flavourverse: { ...content.flavourverse, subtitle: e.target.value },
                  })
                }
                className="w-full px-3 py-2 bg-white rounded-lg border-2 border-[#4B1F0F] text-sm font-medium focus:outline-none focus:ring-2 focus:ring-[#FFC72C]"
              />
            </div>

            {/* Product Cards Selector Tabs */}
            <div className="pt-2 border-t-2 border-[#4B1F0F]/15">
              <label className="block text-xs font-black uppercase tracking-wider mb-2">
                Edit Signature Flavour Card
              </label>
              <div className="grid grid-cols-5 gap-1 mb-3">
                {(content.flavourverse?.cards || []).map((card, idx) => (
                  <button
                    key={card.id || idx}
                    type="button"
                    onClick={() => setActiveFlavourIdx(idx)}
                    className={`py-1.5 text-[10px] font-black uppercase rounded-lg border-2 transition-all ${
                      activeFlavourIdx === idx
                        ? 'bg-[#4B1F0F] text-[#FFC72C] border-[#4B1F0F] shadow-sm'
                        : 'bg-white text-[#4B1F0F] border-[#4B1F0F]/30 hover:bg-amber-100'
                    }`}
                  >
                    #{card.flavourNumber}
                  </button>
                ))}
              </div>

              {/* Active Flavour Form */}
              {content.flavourverse?.cards?.[activeFlavourIdx] && (
                <div className="p-3 bg-white rounded-xl border-2 border-[#4B1F0F] space-y-3">
                  <div>
                    <label className="block text-[11px] font-bold text-[#4B1F0F]/80 uppercase mb-0.5">
                      Card Title
                    </label>
                    <input
                      type="text"
                      value={content.flavourverse.cards[activeFlavourIdx].title}
                      onChange={(e) => {
                        const copy = [...content.flavourverse.cards];
                        copy[activeFlavourIdx] = {
                          ...copy[activeFlavourIdx],
                          title: e.target.value,
                        };
                        updateContentWithHistory({
                          flavourverse: { ...content.flavourverse, cards: copy },
                        });
                      }}
                      className="w-full px-2.5 py-1.5 bg-amber-50 rounded border border-[#4B1F0F]/20 text-xs font-bold"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-[#4B1F0F]/80 uppercase mb-0.5">
                      Flavour Tagline
                    </label>
                    <input
                      type="text"
                      value={content.flavourverse.cards[activeFlavourIdx].label}
                      onChange={(e) => {
                        const copy = [...content.flavourverse.cards];
                        copy[activeFlavourIdx] = {
                          ...copy[activeFlavourIdx],
                          label: e.target.value,
                        };
                        updateContentWithHistory({
                          flavourverse: { ...content.flavourverse, cards: copy },
                        });
                      }}
                      className="w-full px-2.5 py-1.5 bg-amber-50 rounded border border-[#4B1F0F]/20 text-xs font-medium"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-[#4B1F0F]/80 uppercase mb-0.5">
                      Description
                    </label>
                    <textarea
                      rows={2}
                      value={content.flavourverse.cards[activeFlavourIdx].description}
                      onChange={(e) => {
                        const copy = [...content.flavourverse.cards];
                        copy[activeFlavourIdx] = {
                          ...copy[activeFlavourIdx],
                          description: e.target.value,
                        };
                        updateContentWithHistory({
                          flavourverse: { ...content.flavourverse, cards: copy },
                        });
                      }}
                      className="w-full px-2.5 py-1.5 bg-amber-50 rounded border border-[#4B1F0F]/20 text-xs font-medium"
                    />
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* ======================================================== */}
        {/* SECTION: ORIGIN STORY                                    */}
        {/* ======================================================== */}
        {selectedSectionId === 'origin-story' && (
          <div className="space-y-4">
            <div>
              <label className="block text-xs font-black uppercase tracking-wider mb-1">
                Intro Heading
              </label>
              <input
                type="text"
                value={content.originStory?.intro?.heading || ''}
                onChange={(e) =>
                  updateContentWithHistory({
                    originStory: {
                      ...content.originStory,
                      intro: { ...content.originStory.intro, heading: e.target.value },
                    },
                  })
                }
                className="w-full px-3 py-2 bg-white rounded-lg border-2 border-[#4B1F0F] text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-[#FFC72C]"
              />
            </div>

            <div>
              <label className="block text-xs font-black uppercase tracking-wider mb-1">
                Intro Description
              </label>
              <textarea
                rows={2}
                value={content.originStory?.intro?.description || ''}
                onChange={(e) =>
                  updateContentWithHistory({
                    originStory: {
                      ...content.originStory,
                      intro: { ...content.originStory.intro, description: e.target.value },
                    },
                  })
                }
                className="w-full px-3 py-2 bg-white rounded-lg border-2 border-[#4B1F0F] text-sm font-medium focus:outline-none focus:ring-2 focus:ring-[#FFC72C]"
              />
            </div>

            {/* Comic Scenes Selector Tabs */}
            <div className="pt-2 border-t-2 border-[#4B1F0F]/15">
              <label className="block text-xs font-black uppercase tracking-wider mb-2">
                Edit Comic Scene (1–5)
              </label>
              <div className="grid grid-cols-5 gap-1 mb-3">
                {(content.originStory?.scenes || []).map((scene, idx) => (
                  <button
                    key={scene.sceneNumber || idx}
                    type="button"
                    onClick={() => setActiveSceneIdx(idx)}
                    className={`py-1.5 text-[10px] font-black uppercase rounded-lg border-2 transition-all ${
                      activeSceneIdx === idx
                        ? 'bg-[#4B1F0F] text-[#FFC72C] border-[#4B1F0F] shadow-sm'
                        : 'bg-white text-[#4B1F0F] border-[#4B1F0F]/30 hover:bg-amber-100'
                    }`}
                  >
                    Scene {scene.chapterCode || idx + 1}
                  </button>
                ))}
              </div>

              {content.originStory?.scenes?.[activeSceneIdx] && (
                <div className="p-3 bg-white rounded-xl border-2 border-[#4B1F0F] space-y-3">
                  <div>
                    <label className="block text-[11px] font-bold text-[#4B1F0F]/80 uppercase mb-0.5">
                      Scene Title
                    </label>
                    <input
                      type="text"
                      value={content.originStory.scenes[activeSceneIdx].title}
                      onChange={(e) => {
                        const copy = [...content.originStory.scenes];
                        copy[activeSceneIdx] = {
                          ...copy[activeSceneIdx],
                          title: e.target.value,
                        };
                        updateContentWithHistory({
                          originStory: { ...content.originStory, scenes: copy },
                        });
                      }}
                      className="w-full px-2.5 py-1.5 bg-amber-50 rounded border border-[#4B1F0F]/20 text-xs font-bold"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-[#4B1F0F]/80 uppercase mb-0.5">
                      Identity Label / Audio Cue
                    </label>
                    <input
                      type="text"
                      value={content.originStory.scenes[activeSceneIdx].identityLabel}
                      onChange={(e) => {
                        const copy = [...content.originStory.scenes];
                        copy[activeSceneIdx] = {
                          ...copy[activeSceneIdx],
                          identityLabel: e.target.value,
                        };
                        updateContentWithHistory({
                          originStory: { ...content.originStory, scenes: copy },
                        });
                      }}
                      className="w-full px-2.5 py-1.5 bg-amber-50 rounded border border-[#4B1F0F]/20 text-xs font-black uppercase tracking-wider text-[#E0351B]"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-[#4B1F0F]/80 uppercase mb-0.5">
                      Narrative Description
                    </label>
                    <textarea
                      rows={3}
                      value={content.originStory.scenes[activeSceneIdx].description}
                      onChange={(e) => {
                        const copy = [...content.originStory.scenes];
                        copy[activeSceneIdx] = {
                          ...copy[activeSceneIdx],
                          description: e.target.value,
                        };
                        updateContentWithHistory({
                          originStory: { ...content.originStory, scenes: copy },
                        });
                      }}
                      className="w-full px-2.5 py-1.5 bg-amber-50 rounded border border-[#4B1F0F]/20 text-xs font-medium"
                    />
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* ======================================================== */}
        {/* SECTION: HOW TO ORDER                                    */}
        {/* ======================================================== */}
        {selectedSectionId === 'how-to-order' && (
          <div className="space-y-4">
            <div>
              <label className="block text-xs font-black uppercase tracking-wider mb-1">
                Section Title
              </label>
              <input
                type="text"
                value={content.howToOrder?.title || ''}
                onChange={(e) =>
                  updateContentWithHistory({
                    howToOrder: { ...content.howToOrder, title: e.target.value },
                  })
                }
                className="w-full px-3 py-2 bg-white rounded-lg border-2 border-[#4B1F0F] text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-[#FFC72C]"
              />
            </div>

            <div>
              <label className="block text-xs font-black uppercase tracking-wider mb-1">
                Subtitle
              </label>
              <textarea
                rows={2}
                value={content.howToOrder?.subtitle || ''}
                onChange={(e) =>
                  updateContentWithHistory({
                    howToOrder: { ...content.howToOrder, subtitle: e.target.value },
                  })
                }
                className="w-full px-3 py-2 bg-white rounded-lg border-2 border-[#4B1F0F] text-sm font-medium focus:outline-none focus:ring-2 focus:ring-[#FFC72C]"
              />
            </div>

            {/* Step Selector Tabs */}
            <div className="pt-2 border-t-2 border-[#4B1F0F]/15">
              <label className="block text-xs font-black uppercase tracking-wider mb-2">
                Edit Ordering Steps (1–4)
              </label>
              <div className="grid grid-cols-4 gap-1 mb-3">
                {(content.howToOrder?.steps || []).map((step, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setActiveStepIdx(idx)}
                    className={`py-1.5 text-[10px] font-black uppercase rounded-lg border-2 transition-all ${
                      activeStepIdx === idx
                        ? 'bg-[#4B1F0F] text-[#FFC72C] border-[#4B1F0F] shadow-sm'
                        : 'bg-white text-[#4B1F0F] border-[#4B1F0F]/30 hover:bg-amber-100'
                    }`}
                  >
                    Step {step.stepNumber}
                  </button>
                ))}
              </div>

              {content.howToOrder?.steps?.[activeStepIdx] && (
                <div className="p-3 bg-white rounded-xl border-2 border-[#4B1F0F] space-y-3">
                  <div>
                    <label className="block text-[11px] font-bold text-[#4B1F0F]/80 uppercase mb-0.5">
                      Step Title
                    </label>
                    <input
                      type="text"
                      value={content.howToOrder.steps[activeStepIdx].title}
                      onChange={(e) => {
                        const copy = [...content.howToOrder.steps];
                        copy[activeStepIdx] = {
                          ...copy[activeStepIdx],
                          title: e.target.value,
                        };
                        updateContentWithHistory({
                          howToOrder: { ...content.howToOrder, steps: copy },
                        });
                      }}
                      className="w-full px-2.5 py-1.5 bg-amber-50 rounded border border-[#4B1F0F]/20 text-xs font-bold"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-[#4B1F0F]/80 uppercase mb-0.5">
                      Step Description
                    </label>
                    <textarea
                      rows={2}
                      value={content.howToOrder.steps[activeStepIdx].description}
                      onChange={(e) => {
                        const copy = [...content.howToOrder.steps];
                        copy[activeStepIdx] = {
                          ...copy[activeStepIdx],
                          description: e.target.value,
                        };
                        updateContentWithHistory({
                          howToOrder: { ...content.howToOrder, steps: copy },
                        });
                      }}
                      className="w-full px-2.5 py-1.5 bg-amber-50 rounded border border-[#4B1F0F]/20 text-xs font-medium"
                    />
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* ======================================================== */}
        {/* SECTION: ABOUT                                           */}
        {/* ======================================================== */}
        {selectedSectionId === 'about' && (
          <div className="space-y-4">
            <div>
              <label className="block text-xs font-black uppercase tracking-wider mb-1">
                Heading
              </label>
              <input
                type="text"
                value={content.about?.heading || ''}
                onChange={(e) =>
                  updateContentWithHistory({
                    about: { ...content.about, heading: e.target.value },
                  })
                }
                className="w-full px-3 py-2 bg-white rounded-lg border-2 border-[#4B1F0F] text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-[#FFC72C]"
              />
            </div>

            <div>
              <label className="block text-xs font-black uppercase tracking-wider mb-1">
                Paragraph 1
              </label>
              <textarea
                rows={3}
                value={content.about?.paragraphs?.[0] || ''}
                onChange={(e) => {
                  const copy = [...(content.about?.paragraphs || [])];
                  copy[0] = e.target.value;
                  updateContentWithHistory({
                    about: { ...content.about, paragraphs: copy },
                  });
                }}
                className="w-full px-3 py-2 bg-white rounded-lg border-2 border-[#4B1F0F] text-sm font-medium focus:outline-none focus:ring-2 focus:ring-[#FFC72C]"
              />
            </div>

            <div>
              <label className="block text-xs font-black uppercase tracking-wider mb-1">
                Paragraph 2
              </label>
              <textarea
                rows={3}
                value={content.about?.paragraphs?.[1] || ''}
                onChange={(e) => {
                  const copy = [...(content.about?.paragraphs || [])];
                  copy[1] = e.target.value;
                  updateContentWithHistory({
                    about: { ...content.about, paragraphs: copy },
                  });
                }}
                className="w-full px-3 py-2 bg-white rounded-lg border-2 border-[#4B1F0F] text-sm font-medium focus:outline-none focus:ring-2 focus:ring-[#FFC72C]"
              />
            </div>
          </div>
        )}

        {/* ======================================================== */}
        {/* SECTION: CONTACT                                         */}
        {/* ======================================================== */}
        {selectedSectionId === 'contact' && (
          <div className="space-y-4">
            <div>
              <label className="block text-xs font-black uppercase tracking-wider mb-1">
                Headline
              </label>
              <input
                type="text"
                value={content.contact?.headline || ''}
                onChange={(e) =>
                  updateContentWithHistory({
                    contact: { ...content.contact, headline: e.target.value },
                  })
                }
                className="w-full px-3 py-2 bg-white rounded-lg border-2 border-[#4B1F0F] text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-[#FFC72C]"
              />
            </div>

            <div>
              <label className="block text-xs font-black uppercase tracking-wider mb-1">
                Subtitle
              </label>
              <input
                type="text"
                value={content.contact?.subtitle || ''}
                onChange={(e) =>
                  updateContentWithHistory({
                    contact: { ...content.contact, subtitle: e.target.value },
                  })
                }
                className="w-full px-3 py-2 bg-white rounded-lg border-2 border-[#4B1F0F] text-sm font-medium focus:outline-none focus:ring-2 focus:ring-[#FFC72C]"
              />
            </div>

            <div>
              <label className="block text-xs font-black uppercase tracking-wider mb-1">
                Display Phone Number
              </label>
              <input
                type="text"
                value={content.contact?.phone || ''}
                onChange={(e) =>
                  updateContentWithHistory({
                    contact: { ...content.contact, phone: e.target.value },
                  })
                }
                className="w-full px-3 py-2 bg-white rounded-lg border-2 border-[#4B1F0F] text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-[#FFC72C]"
              />
            </div>

            <div>
              <label className="block text-xs font-black uppercase tracking-wider mb-1">
                Email Address
              </label>
              <input
                type="email"
                value={content.contact?.email || ''}
                onChange={(e) =>
                  updateContentWithHistory({
                    contact: { ...content.contact, email: e.target.value },
                  })
                }
                className="w-full px-3 py-2 bg-white rounded-lg border-2 border-[#4B1F0F] text-sm font-medium focus:outline-none focus:ring-2 focus:ring-[#FFC72C]"
              />
            </div>

            <div>
              <label className="block text-xs font-black uppercase tracking-wider mb-1">
                Location
              </label>
              <input
                type="text"
                value={content.contact?.location || ''}
                onChange={(e) =>
                  updateContentWithHistory({
                    contact: { ...content.contact, location: e.target.value },
                  })
                }
                className="w-full px-3 py-2 bg-white rounded-lg border-2 border-[#4B1F0F] text-sm font-medium focus:outline-none focus:ring-2 focus:ring-[#FFC72C]"
              />
            </div>

            <div>
              <label className="block text-xs font-black uppercase tracking-wider mb-1">
                Opening Hours
              </label>
              <input
                type="text"
                value={content.contact?.hours || ''}
                onChange={(e) =>
                  updateContentWithHistory({
                    contact: { ...content.contact, hours: e.target.value },
                  })
                }
                className="w-full px-3 py-2 bg-white rounded-lg border-2 border-[#4B1F0F] text-sm font-medium focus:outline-none focus:ring-2 focus:ring-[#FFC72C]"
              />
            </div>
          </div>
        )}

        {/* ======================================================== */}
        {/* SECTION: FOOTER                                          */}
        {/* ======================================================== */}
        {selectedSectionId === 'footer' && (
          <div className="space-y-4">
            <div>
              <label className="block text-xs font-black uppercase tracking-wider mb-1">
                Statement
              </label>
              <input
                type="text"
                value={content.footer?.statement || ''}
                onChange={(e) =>
                  updateContentWithHistory({
                    footer: { ...content.footer, statement: e.target.value },
                  })
                }
                className="w-full px-3 py-2 bg-white rounded-lg border-2 border-[#4B1F0F] text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-[#FFC72C]"
              />
            </div>

            <div>
              <label className="block text-xs font-black uppercase tracking-wider mb-1">
                Headline
              </label>
              <input
                type="text"
                value={content.footer?.headline || ''}
                onChange={(e) =>
                  updateContentWithHistory({
                    footer: { ...content.footer, headline: e.target.value },
                  })
                }
                className="w-full px-3 py-2 bg-white rounded-lg border-2 border-[#4B1F0F] text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-[#FFC72C]"
              />
            </div>

            <div>
              <label className="block text-xs font-black uppercase tracking-wider mb-1">
                Copy
              </label>
              <textarea
                rows={3}
                value={content.footer?.copy || ''}
                onChange={(e) =>
                  updateContentWithHistory({
                    footer: { ...content.footer, copy: e.target.value },
                  })
                }
                className="w-full px-3 py-2 bg-white rounded-lg border-2 border-[#4B1F0F] text-sm font-medium focus:outline-none focus:ring-2 focus:ring-[#FFC72C]"
              />
            </div>

            <div>
              <label className="block text-xs font-black uppercase tracking-wider mb-1">
                Copyright Line
              </label>
              <input
                type="text"
                value={content.footer?.copyrightText || ''}
                onChange={(e) =>
                  updateContentWithHistory({
                    footer: { ...content.footer, copyrightText: e.target.value },
                  })
                }
                className="w-full px-3 py-2 bg-white rounded-lg border-2 border-[#4B1F0F] text-sm font-medium focus:outline-none focus:ring-2 focus:ring-[#FFC72C]"
              />
            </div>
          </div>
        )}
      </div>

      {/* Done Button */}
      <div className="p-4 border-t-3 border-[#4B1F0F] bg-white">
        <button
          type="button"
          onClick={closeInspector}
          className="w-full py-2.5 bg-[#FFC72C] hover:bg-[#ffbf11] text-[#4B1F0F] font-heading text-xs font-black uppercase tracking-wider rounded-xl border-3 border-[#4B1F0F] shadow-[3px_3px_0px_#4B1F0F] active:translate-x-[1px] active:translate-y-[1px] transition-all cursor-pointer"
        >
          Done Editing Section
        </button>
      </div>
    </aside>
  );
};
