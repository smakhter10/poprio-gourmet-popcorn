import React, { useState } from 'react';
import { usePoprioEditor } from '../../context/PoprioEditorContext';
import { usePoprioContent, getDefaultContentSchema } from '../../context/PoprioContentContext';
import {
  X,
  Sliders,
  Type,
  FileText,
  Sparkles,
  Layers,
  Image as ImageIcon,
  Video as VideoIcon,
  RotateCcw,
  AlignLeft,
  AlignCenter,
  AlignRight,
  AlignJustify,
  Palette,
  Upload,
  Plus,
  Trash2,
} from 'lucide-react';

export const PoprioInspectorPanel: React.FC = () => {
  const {
    isInspectorOpen,
    closeInspector,
    selectedSectionId,
    selectedElementId,
    selectedElementType,
    selectedElementLabel,
    activeInspectorTab,
    setActiveInspectorTab,
    updateContentWithHistory,
    updateElementStyle,
    getElementStyle,
    openMediaLibrary,
  } = usePoprioEditor();

  const { content } = usePoprioContent();

  // Internal tab state for sub-item editors (flavours, scenes, steps, hero packages)
  const [activeFlavourIdx, setActiveFlavourIdx] = useState<number>(0);
  const [activeSceneIdx, setActiveSceneIdx] = useState<number>(0);
  const [activeStepIdx, setActiveStepIdx] = useState<number>(0);
  const [activeHeroPackageIdx, setActiveHeroPackageIdx] = useState<number>(0);

  // Section human-readable titles mapping
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

  if (!isInspectorOpen) {
    return null;
  }

  // Active element custom style
  const currentStyle = selectedElementId ? getElementStyle(selectedElementId) : {};

  // Active element media URL (if image or video)
  let currentMediaUrl = '';
  if (selectedElementId === 'meta.logo') {
    currentMediaUrl = content.meta?.logo?.src || '';
  } else if (selectedElementId?.startsWith('hero.package.')) {
    const targetId = selectedElementId.replace('hero.package.', '');
    const pkg = content.hero?.packages?.find((p, idx) => p.id === targetId || String(idx) === targetId);
    currentMediaUrl = pkg?.imagePath || '';
  } else if (selectedElementId === 'trailer.video') {
    currentMediaUrl = content.trailer?.videoSrc || '';
  } else if (selectedElementId === 'trailer.poster') {
    currentMediaUrl = content.trailer?.posterSrc || '';
  } else if (selectedElementId === 'howToOrder.video') {
    currentMediaUrl = content.howToOrder?.videoSrc || '';
  } else if (selectedElementId?.startsWith('flavourverse.card.')) {
    const cardId = selectedElementId.replace('flavourverse.card.', '');
    const card = content.flavourverse?.cards?.find((c, idx) => c.id === cardId || String(idx) === cardId);
    currentMediaUrl = card?.packageImage || '';
  }

  // Color palette presets
  const brandPalette = [
    { name: 'Butter Yellow', hex: '#FFC72C' },
    { name: 'Cocoa Brown', hex: '#4B1F0F' },
    { name: 'Red Orange', hex: '#E0351B' },
    { name: 'Warm Cream', hex: '#FFF3E0' },
    { name: 'Purple', hex: '#7A3DA6' },
    { name: 'Accent Pink', hex: '#F5A7BE' },
    { name: 'Caramel', hex: '#D78A24' },
    { name: 'Pure White', hex: '#FFFFFF' },
    { name: 'Dark Ink', hex: '#180904' },
  ];

  // Font families
  const fontFamilies = [
    { label: 'Archivo Black (POPRIO Heading)', value: "'Archivo Black', sans-serif" },
    { label: 'Plus Jakarta Sans (POPRIO Body)', value: "'Plus Jakarta Sans', sans-serif" },
    { label: 'Bangers (POPRIO Comic Lettering)', value: "'Bangers', cursive" },
    { label: 'Space Grotesk', value: "'Space Grotesk', sans-serif" },
    { label: 'Nunito Sans', value: "'Nunito Sans', sans-serif" },
    { label: 'Titan One', value: "'Titan One', cursive" },
  ];

  return (
    <aside
      aria-label="Editorial Styling Box"
      className="fixed top-16 right-0 bottom-0 w-full sm:w-[420px] bg-[#FFF3E0] text-[#4B1F0F] z-[99997] border-l-4 border-[#4B1F0F] shadow-[-6px_0px_0px_#4B1F0F] flex flex-col font-sans animate-in slide-in-from-right duration-200 select-none"
    >
      {/* Header */}
      <div className="p-4 border-b-3 border-[#4B1F0F] bg-[#FFC72C]">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Sliders className="w-5 h-5 text-[#4B1F0F]" />
            <div>
              <h2 className="font-heading text-sm font-black uppercase tracking-wider text-[#4B1F0F]">
                {selectedElementLabel || (selectedSectionId ? (sectionTitles[selectedSectionId] || `Section: ${selectedSectionId}`) : 'Editorial Box')}
              </h2>
              <span className="text-[10px] font-bold text-[#4B1F0F]/80 uppercase">
                {selectedElementId ? `Element ID: ${selectedElementId}` : `Section: ${selectedSectionId || 'General'}`}
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

        {/* 3 Core Editorial Tabs */}
        {selectedElementId && (
          <div className="flex items-center gap-1 mt-3 bg-black/10 p-1 rounded-lg border border-[#4B1F0F]/20">
            <button
              onClick={() => setActiveInspectorTab('content')}
              className={`flex-1 flex items-center justify-center gap-1 py-1.5 rounded-md text-[11px] font-black uppercase transition-all ${
                activeInspectorTab === 'content'
                  ? 'bg-[#4B1F0F] text-[#FFC72C] shadow-sm'
                  : 'text-[#4B1F0F]/80 hover:text-[#4B1F0F] hover:bg-black/5'
              }`}
            >
              <FileText className="w-3.5 h-3.5" />
              <span>Content</span>
            </button>
            <button
              onClick={() => setActiveInspectorTab('typography')}
              className={`flex-1 flex items-center justify-center gap-1 py-1.5 rounded-md text-[11px] font-black uppercase transition-all ${
                activeInspectorTab === 'typography'
                  ? 'bg-[#4B1F0F] text-[#FFC72C] shadow-sm'
                  : 'text-[#4B1F0F]/80 hover:text-[#4B1F0F] hover:bg-black/5'
              }`}
            >
              <Type className="w-3.5 h-3.5" />
              <span>Typography</span>
            </button>
            <button
              onClick={() => setActiveInspectorTab('style')}
              className={`flex-1 flex items-center justify-center gap-1 py-1.5 rounded-md text-[11px] font-black uppercase transition-all ${
                activeInspectorTab === 'style'
                  ? 'bg-[#4B1F0F] text-[#FFC72C] shadow-sm'
                  : 'text-[#4B1F0F]/80 hover:text-[#4B1F0F] hover:bg-black/5'
              }`}
            >
              <Palette className="w-3.5 h-3.5" />
              <span>CSS Styles</span>
            </button>
          </div>
        )}
      </div>

      {/* Live Two-Way Notice */}
      <div className="px-4 py-2 bg-amber-100/70 border-b-2 border-[#4B1F0F]/15 flex items-center justify-between text-[11px] font-bold text-[#4B1F0F]/80">
        <span className="flex items-center gap-1.5">
          <Sparkles className="w-3.5 h-3.5 text-amber-600" />
          Live Two-Way Preview
        </span>
        <span className="text-[10px] text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded border border-emerald-300">
          Syncs On Input
        </span>
      </div>

      {/* Inspector Body */}
      <div className="flex-1 overflow-y-auto p-4 space-y-5">
        {/* ======================================================== */}
        {/* ELEMENT-SPECIFIC EDITORIAL BOX (ACTIVE ELEMENT SELECTED) */}
        {/* ======================================================== */}
        {selectedElementId ? (
          <>
            {/* ----------------- TAB: CONTENT & MEDIA ----------------- */}
            {activeInspectorTab === 'content' && (
              <div className="space-y-4">
                {/* Media Replacement (Image or Video) */}
                {(selectedElementType === 'image' || selectedElementType === 'video') && (
                  <div className="p-3.5 bg-white rounded-xl border-2 border-[#4B1F0F] shadow-[3px_3px_0px_#4B1F0F] space-y-3">
                    <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#4B1F0F]">
                      {selectedElementType === 'image' ? (
                        <ImageIcon className="w-4 h-4 text-[#7A3DA6]" />
                      ) : (
                        <VideoIcon className="w-4 h-4 text-[#E0351B]" />
                      )}
                      <span>Update Media Source</span>
                    </div>

                    {/* Live Media Preview & Quick Reset */}
                    {currentMediaUrl && (
                      <div className="flex items-center gap-3 p-2 bg-amber-50 rounded-lg border border-[#4B1F0F]/20">
                        {selectedElementType === 'image' && (
                          <img
                            src={currentMediaUrl}
                            alt="Current asset preview"
                            className="w-12 h-12 object-contain bg-white rounded border border-[#4B1F0F]/20 shrink-0"
                          />
                        )}
                        <div className="flex-1 min-w-0">
                          <span className="text-[10px] font-bold text-[#4B1F0F]/70 block truncate">
                            Active: {currentMediaUrl.split('/').pop() || currentMediaUrl}
                          </span>
                          <button
                            type="button"
                            onClick={() => {
                              if (selectedElementId === 'meta.logo') {
                                updateContentWithHistory({
                                  meta: { ...content.meta, logo: { ...content.meta.logo, src: '/assets/brand/poprio-logo.webp' } },
                                });
                              } else if (selectedElementId?.startsWith('hero.package.')) {
                                const targetId = selectedElementId.replace('hero.package.', '');
                                const defaults = getDefaultContentSchema();
                                const defPkg = defaults.hero.packages.find((p, idx) => p.id === targetId || String(idx) === targetId);
                                if (defPkg) {
                                  const updated = content.hero.packages.map((p, idx) =>
                                    (p.id === targetId || String(idx) === targetId) ? { ...p, imagePath: defPkg.imagePath } : p
                                  );
                                  updateContentWithHistory({ hero: { ...content.hero, packages: updated } });
                                }
                              } else if (selectedElementId === 'trailer.video') {
                                updateContentWithHistory({
                                  trailer: { ...content.trailer, videoSrc: '/assets/videos/POPRIO-The-Art-of-The-Pop-15s-Trailer-1920x1080.mp4' },
                                });
                              } else if (selectedElementId === 'howToOrder.video') {
                                updateContentWithHistory({
                                  howToOrder: { ...content.howToOrder, videoSrc: '/assets/videos/how-it-works.mp4' },
                                });
                              }
                            }}
                            className="text-[10px] text-red-600 font-bold hover:underline flex items-center gap-1 mt-1 cursor-pointer"
                          >
                            <RotateCcw className="w-3 h-3" />
                            <span>Reset to Brand Default Media</span>
                          </button>
                        </div>
                      </div>
                    )}

                    {/* WordPress Media Library 1-Click Button */}
                    <button
                      type="button"
                      onClick={() => {
                        openMediaLibrary((url) => {
                          if (selectedElementId === 'meta.logo') {
                            updateContentWithHistory({
                              meta: { ...content.meta, logo: { ...content.meta.logo, src: url } },
                            });
                          } else if (selectedElementId?.startsWith('hero.package.')) {
                            const targetId = selectedElementId.replace('hero.package.', '');
                            const updated = content.hero.packages.map((p, idx) =>
                              (p.id === targetId || String(idx) === targetId) ? { ...p, imagePath: url } : p
                            );
                            updateContentWithHistory({ hero: { ...content.hero, packages: updated } });
                          } else if (selectedElementId === 'trailer.video') {
                            updateContentWithHistory({
                              trailer: { ...content.trailer, videoSrc: url },
                            });
                          } else if (selectedElementId === 'trailer.poster') {
                            updateContentWithHistory({
                              trailer: { ...content.trailer, posterSrc: url },
                            });
                          } else if (selectedElementId === 'howToOrder.video') {
                            updateContentWithHistory({
                              howToOrder: { ...content.howToOrder, videoSrc: url },
                            });
                          } else if (selectedElementId?.startsWith('flavourverse.card.')) {
                            const cardId = selectedElementId.replace('flavourverse.card.', '');
                            const copy = content.flavourverse.cards.map((c, idx) =>
                              (c.id === cardId || String(idx) === cardId) ? { ...c, packageImage: url } : c
                            );
                            updateContentWithHistory({ flavourverse: { ...content.flavourverse, cards: copy } });
                          } else {
                            updateElementStyle(selectedElementId, {
                              backgroundColor: `url('${url}') center/cover no-repeat`,
                            });
                          }
                        });
                      }}
                      className="flex items-center justify-center gap-2 w-full py-2 bg-[#FFC72C] hover:bg-[#ffbf11] text-[#4B1F0F] font-heading text-xs font-black uppercase tracking-wider rounded-lg border-2 border-[#4B1F0F] shadow-[2px_2px_0px_#4B1F0F] active:translate-x-[1px] active:translate-y-[1px] transition-all cursor-pointer"
                    >
                      <Upload className="w-4 h-4" />
                      <span>Choose / Upload from WP Media Library</span>
                    </button>

                    <div className="text-[10px] text-[#4B1F0F]/70 text-center font-bold">
                      Or paste an asset URL directly below:
                    </div>

                    {/* Direct URL input */}
                    <div>
                      <label className="block text-[11px] font-bold text-[#4B1F0F]/80 uppercase mb-1">
                        Media URL
                      </label>
                      <input
                        type="text"
                        placeholder="https://... or /assets/..."
                        value={currentMediaUrl}
                        onChange={(e) => {
                          const url = e.target.value;
                          if (selectedElementId === 'meta.logo') {
                            updateContentWithHistory({
                              meta: { ...content.meta, logo: { ...content.meta.logo, src: url } },
                            });
                          } else if (selectedElementId?.startsWith('hero.package.')) {
                            const targetId = selectedElementId.replace('hero.package.', '');
                            const updated = content.hero.packages.map((p, idx) =>
                              (p.id === targetId || String(idx) === targetId) ? { ...p, imagePath: url } : p
                            );
                            updateContentWithHistory({ hero: { ...content.hero, packages: updated } });
                          } else if (selectedElementId === 'trailer.video') {
                            updateContentWithHistory({
                              trailer: { ...content.trailer, videoSrc: url },
                            });
                          } else if (selectedElementId === 'howToOrder.video') {
                            updateContentWithHistory({
                              howToOrder: { ...content.howToOrder, videoSrc: url },
                            });
                          } else if (selectedElementId?.startsWith('flavourverse.card.')) {
                            const cardId = selectedElementId.replace('flavourverse.card.', '');
                            const copy = content.flavourverse.cards.map((c, idx) =>
                              (c.id === cardId || String(idx) === cardId) ? { ...c, packageImage: url } : c
                            );
                            updateContentWithHistory({ flavourverse: { ...content.flavourverse, cards: copy } });
                          }
                        }}
                        className="w-full px-2.5 py-1.5 bg-amber-50 rounded border border-[#4B1F0F]/20 text-xs font-medium"
                      />
                    </div>
                  </div>
                )}

                {/* Text Content Editor */}
                {selectedElementType !== 'image' && selectedElementType !== 'video' && (
                  <div className="p-3.5 bg-white rounded-xl border-2 border-[#4B1F0F] shadow-[3px_3px_0px_#4B1F0F] space-y-3">
                    <label className="block text-xs font-black uppercase tracking-wider text-[#4B1F0F]">
                      Text Content
                    </label>

                    {selectedElementId === 'hero.eyebrow1' && (
                      <input
                        type="text"
                        value={content.hero.eyebrow1}
                        onChange={(e) =>
                          updateContentWithHistory({ hero: { ...content.hero, eyebrow1: e.target.value } })
                        }
                        className="w-full px-3 py-2 bg-amber-50 rounded-lg border-2 border-[#4B1F0F] text-sm font-bold"
                      />
                    )}

                    {selectedElementId === 'hero.eyebrow2' && (
                      <input
                        type="text"
                        value={content.hero.eyebrow2}
                        onChange={(e) =>
                          updateContentWithHistory({ hero: { ...content.hero, eyebrow2: e.target.value } })
                        }
                        className="w-full px-3 py-2 bg-amber-50 rounded-lg border-2 border-[#4B1F0F] text-sm font-bold"
                      />
                    )}

                    {selectedElementId === 'hero.subtitle' && (
                      <textarea
                        rows={3}
                        value={content.hero.subtitle}
                        onChange={(e) =>
                          updateContentWithHistory({ hero: { ...content.hero, subtitle: e.target.value } })
                        }
                        className="w-full px-3 py-2 bg-amber-50 rounded-lg border-2 border-[#4B1F0F] text-sm font-medium"
                      />
                    )}

                    {selectedElementId === 'hero.cta' && (
                      <input
                        type="text"
                        value={content.hero.ctaText}
                        onChange={(e) =>
                          updateContentWithHistory({ hero: { ...content.hero, ctaText: e.target.value } })
                        }
                        className="w-full px-3 py-2 bg-amber-50 rounded-lg border-2 border-[#4B1F0F] text-sm font-bold"
                      />
                    )}

                    {selectedElementId === 'flavourverse.eyebrow' && (
                      <input
                        type="text"
                        value={content.flavourverse.eyebrow}
                        onChange={(e) =>
                          updateContentWithHistory({ flavourverse: { ...content.flavourverse, eyebrow: e.target.value } })
                        }
                        className="w-full px-3 py-2 bg-amber-50 rounded-lg border-2 border-[#4B1F0F] text-sm font-bold"
                      />
                    )}

                    {selectedElementId === 'flavourverse.title' && (
                      <input
                        type="text"
                        value={content.flavourverse.title}
                        onChange={(e) =>
                          updateContentWithHistory({ flavourverse: { ...content.flavourverse, title: e.target.value } })
                        }
                        className="w-full px-3 py-2 bg-amber-50 rounded-lg border-2 border-[#4B1F0F] text-sm font-bold"
                      />
                    )}

                    {selectedElementId === 'flavourverse.subtitle' && (
                      <textarea
                        rows={3}
                        value={content.flavourverse.subtitle}
                        onChange={(e) =>
                          updateContentWithHistory({ flavourverse: { ...content.flavourverse, subtitle: e.target.value } })
                        }
                        className="w-full px-3 py-2 bg-amber-50 rounded-lg border-2 border-[#4B1F0F] text-sm font-medium"
                      />
                    )}

                    {selectedElementId === 'originStory.eyebrow' && (
                      <input
                        type="text"
                        value={content.originStory.intro.eyebrow}
                        onChange={(e) =>
                          updateContentWithHistory({
                            originStory: {
                              ...content.originStory,
                              intro: { ...content.originStory.intro, eyebrow: e.target.value },
                            },
                          })
                        }
                        className="w-full px-3 py-2 bg-amber-50 rounded-lg border-2 border-[#4B1F0F] text-sm font-bold"
                      />
                    )}

                    {selectedElementId === 'originStory.heading' && (
                      <input
                        type="text"
                        value={content.originStory.intro.heading}
                        onChange={(e) =>
                          updateContentWithHistory({
                            originStory: {
                              ...content.originStory,
                              intro: { ...content.originStory.intro, heading: e.target.value },
                            },
                          })
                        }
                        className="w-full px-3 py-2 bg-amber-50 rounded-lg border-2 border-[#4B1F0F] text-sm font-bold"
                      />
                    )}

                    {selectedElementId === 'originStory.description' && (
                      <textarea
                        rows={3}
                        value={content.originStory.intro.description}
                        onChange={(e) =>
                          updateContentWithHistory({
                            originStory: {
                              ...content.originStory,
                              intro: { ...content.originStory.intro, description: e.target.value },
                            },
                          })
                        }
                        className="w-full px-3 py-2 bg-amber-50 rounded-lg border-2 border-[#4B1F0F] text-sm font-medium"
                      />
                    )}

                    {selectedElementId === 'howToOrder.eyebrow' && (
                      <input
                        type="text"
                        value={content.howToOrder.eyebrow}
                        onChange={(e) =>
                          updateContentWithHistory({ howToOrder: { ...content.howToOrder, eyebrow: e.target.value } })
                        }
                        className="w-full px-3 py-2 bg-amber-50 rounded-lg border-2 border-[#4B1F0F] text-sm font-bold"
                      />
                    )}

                    {selectedElementId === 'howToOrder.title' && (
                      <input
                        type="text"
                        value={content.howToOrder.title}
                        onChange={(e) =>
                          updateContentWithHistory({ howToOrder: { ...content.howToOrder, title: e.target.value } })
                        }
                        className="w-full px-3 py-2 bg-amber-50 rounded-lg border-2 border-[#4B1F0F] text-sm font-bold"
                      />
                    )}

                    {selectedElementId === 'howToOrder.subtitle' && (
                      <textarea
                        rows={3}
                        value={content.howToOrder.subtitle}
                        onChange={(e) =>
                          updateContentWithHistory({ howToOrder: { ...content.howToOrder, subtitle: e.target.value } })
                        }
                        className="w-full px-3 py-2 bg-amber-50 rounded-lg border-2 border-[#4B1F0F] text-sm font-medium"
                      />
                    )}

                    {selectedElementId === 'howToOrder.cta' && (
                      <input
                        type="text"
                        value={content.howToOrder.whatsappMessage}
                        onChange={(e) =>
                          updateContentWithHistory({ howToOrder: { ...content.howToOrder, whatsappMessage: e.target.value } })
                        }
                        className="w-full px-3 py-2 bg-amber-50 rounded-lg border-2 border-[#4B1F0F] text-sm font-bold"
                      />
                    )}

                    {selectedElementId === 'footer.statement' && (
                      <input
                        type="text"
                        value={content.footer.statement}
                        onChange={(e) =>
                          updateContentWithHistory({ footer: { ...content.footer, statement: e.target.value } })
                        }
                        className="w-full px-3 py-2 bg-amber-50 rounded-lg border-2 border-[#4B1F0F] text-sm font-bold"
                      />
                    )}

                    {selectedElementId === 'footer.headline' && (
                      <input
                        type="text"
                        value={content.footer.headline}
                        onChange={(e) =>
                          updateContentWithHistory({ footer: { ...content.footer, headline: e.target.value } })
                        }
                        className="w-full px-3 py-2 bg-amber-50 rounded-lg border-2 border-[#4B1F0F] text-sm font-bold"
                      />
                    )}

                    {selectedElementId === 'footer.copy' && (
                      <textarea
                        rows={3}
                        value={content.footer.copy}
                        onChange={(e) =>
                          updateContentWithHistory({ footer: { ...content.footer, copy: e.target.value } })
                        }
                        className="w-full px-3 py-2 bg-amber-50 rounded-lg border-2 border-[#4B1F0F] text-sm font-medium"
                      />
                    )}

                    {selectedElementId === 'footer.ctaWhatsApp' && (
                      <input
                        type="text"
                        value={content.footer.ctaWhatsAppText}
                        onChange={(e) =>
                          updateContentWithHistory({ footer: { ...content.footer, ctaWhatsAppText: e.target.value } })
                        }
                        className="w-full px-3 py-2 bg-amber-50 rounded-lg border-2 border-[#4B1F0F] text-sm font-bold"
                      />
                    )}

                    {selectedElementId === 'footer.ctaFlavours' && (
                      <input
                        type="text"
                        value={content.footer.ctaFlavoursText}
                        onChange={(e) =>
                          updateContentWithHistory({ footer: { ...content.footer, ctaFlavoursText: e.target.value } })
                        }
                        className="w-full px-3 py-2 bg-amber-50 rounded-lg border-2 border-[#4B1F0F] text-sm font-bold"
                      />
                    )}

                    <p className="text-[10px] text-[#4B1F0F]/70">
                      Switch to the <strong>Typography</strong> or <strong>CSS Styles</strong> tab to customize font size, weight, colors, padding, and shadows!
                    </p>
                  </div>
                )}
              </div>
            )}

            {/* ----------------- TAB: TYPOGRAPHY ----------------- */}
            {activeInspectorTab === 'typography' && (
              <div className="space-y-4">
                {/* Font Family */}
                <div>
                  <label className="block text-xs font-black uppercase tracking-wider mb-1">
                    Font Family
                  </label>
                  <select
                    value={currentStyle.fontFamily || ''}
                    onChange={(e) => updateElementStyle(selectedElementId, { fontFamily: e.target.value })}
                    className="w-full px-3 py-2 bg-white rounded-lg border-2 border-[#4B1F0F] text-xs font-bold focus:outline-none focus:ring-2 focus:ring-[#FFC72C]"
                  >
                    <option value="">Default Brand Font</option>
                    {fontFamilies.map((f) => (
                      <option key={f.value} value={f.value}>
                        {f.label}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Font Size Slider & Input */}
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label className="text-xs font-black uppercase tracking-wider">Font Size</label>
                    <span className="text-xs font-bold bg-[#FFC72C] px-2 py-0.5 rounded border border-[#4B1F0F]">
                      {currentStyle.fontSize || 'Default'}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <input
                      type="range"
                      min="12"
                      max="96"
                      step="1"
                      value={parseInt(currentStyle.fontSize || '24', 10) || 24}
                      onChange={(e) =>
                        updateElementStyle(selectedElementId, { fontSize: `${e.target.value}px` })
                      }
                      className="flex-1 accent-[#4B1F0F] cursor-pointer"
                    />
                    <input
                      type="text"
                      value={currentStyle.fontSize || ''}
                      placeholder="e.g. 32px"
                      onChange={(e) =>
                        updateElementStyle(selectedElementId, { fontSize: e.target.value })
                      }
                      className="w-20 px-2 py-1 bg-white rounded border border-[#4B1F0F] text-xs font-bold text-center"
                    />
                  </div>
                </div>

                {/* Font Weight */}
                <div>
                  <label className="block text-xs font-black uppercase tracking-wider mb-1.5">
                    Font Weight
                  </label>
                  <div className="grid grid-cols-3 gap-1.5">
                    {[
                      { label: '400 Regular', val: '400' },
                      { label: '500 Medium', val: '500' },
                      { label: '600 Semi', val: '600' },
                      { label: '700 Bold', val: '700' },
                      { label: '800 Extra', val: '800' },
                      { label: '900 Black', val: '900' },
                    ].map((w) => (
                      <button
                        key={w.val}
                        type="button"
                        onClick={() =>
                          updateElementStyle(selectedElementId, { fontWeight: w.val })
                        }
                        className={`py-1.5 text-[11px] font-bold rounded-lg border-2 transition-all ${
                          currentStyle.fontWeight === w.val
                            ? 'bg-[#4B1F0F] text-[#FFC72C] border-[#4B1F0F] shadow-sm'
                            : 'bg-white text-[#4B1F0F] border-[#4B1F0F]/30 hover:bg-amber-100'
                        }`}
                      >
                        {w.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Text Alignment */}
                <div>
                  <label className="block text-xs font-black uppercase tracking-wider mb-1">
                    Text Alignment
                  </label>
                  <div className="flex items-center gap-1 bg-black/10 p-1 rounded-lg border border-[#4B1F0F]/20">
                    {[
                      { icon: AlignLeft, val: 'left', label: 'Left' },
                      { icon: AlignCenter, val: 'center', label: 'Center' },
                      { icon: AlignRight, val: 'right', label: 'Right' },
                      { icon: AlignJustify, val: 'justify', label: 'Justify' },
                    ].map((a) => {
                      const Icon = a.icon;
                      return (
                        <button
                          key={a.val}
                          type="button"
                          onClick={() =>
                            updateElementStyle(selectedElementId, {
                              textAlign: a.val as any,
                            })
                          }
                          className={`flex-1 py-1.5 flex items-center justify-center rounded transition-all ${
                            currentStyle.textAlign === a.val
                              ? 'bg-[#4B1F0F] text-[#FFC72C] shadow-sm'
                              : 'text-[#4B1F0F] hover:bg-black/5'
                          }`}
                          title={`Align ${a.label}`}
                        >
                          <Icon className="w-4 h-4" />
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Text Color (Brand Palette + Custom Picker) */}
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <label className="text-xs font-black uppercase tracking-wider">Text Color</label>
                    <span className="text-xs font-mono font-bold">{currentStyle.color || 'Default'}</span>
                  </div>
                  <div className="flex items-center flex-wrap gap-1.5 mb-2">
                    {brandPalette.map((p) => (
                      <button
                        key={p.hex}
                        type="button"
                        onClick={() => updateElementStyle(selectedElementId, { color: p.hex })}
                        className={`w-7 h-7 rounded-full border-2 border-[#4B1F0F] shadow-sm transition-transform hover:scale-110 ${
                          currentStyle.color === p.hex ? 'ring-2 ring-[#7A3DA6] scale-110' : ''
                        }`}
                        style={{ backgroundColor: p.hex }}
                        title={p.name}
                      />
                    ))}
                  </div>
                  <div className="flex items-center gap-2">
                    <input
                      type="color"
                      value={currentStyle.color || '#4B1F0F'}
                      onChange={(e) => updateElementStyle(selectedElementId, { color: e.target.value })}
                      className="w-10 h-8 rounded border border-[#4B1F0F] cursor-pointer p-0 bg-transparent"
                    />
                    <input
                      type="text"
                      placeholder="Custom Hex (#...)"
                      value={currentStyle.color || ''}
                      onChange={(e) => updateElementStyle(selectedElementId, { color: e.target.value })}
                      className="flex-1 px-2.5 py-1.5 bg-white rounded border border-[#4B1F0F] text-xs font-mono"
                    />
                  </div>
                </div>

                {/* Line Height & Letter Spacing */}
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] font-bold text-[#4B1F0F]/80 uppercase mb-1">
                      Line Height
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. 1.2"
                      value={currentStyle.lineHeight || ''}
                      onChange={(e) =>
                        updateElementStyle(selectedElementId, { lineHeight: e.target.value })
                      }
                      className="w-full px-2.5 py-1.5 bg-white rounded border border-[#4B1F0F] text-xs font-bold"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold text-[#4B1F0F]/80 uppercase mb-1">
                      Letter Spacing
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. 0.05em"
                      value={currentStyle.letterSpacing || ''}
                      onChange={(e) =>
                        updateElementStyle(selectedElementId, { letterSpacing: e.target.value })
                      }
                      className="w-full px-2.5 py-1.5 bg-white rounded border border-[#4B1F0F] text-xs font-bold"
                    />
                  </div>
                </div>

                {/* Text Transform */}
                <div>
                  <label className="block text-xs font-black uppercase tracking-wider mb-1">
                    Text Transform
                  </label>
                  <div className="grid grid-cols-4 gap-1">
                    {[
                      { label: 'None', val: 'none' },
                      { label: 'UPPER', val: 'uppercase' },
                      { label: 'lower', val: 'lowercase' },
                      { label: 'Capital', val: 'capitalize' },
                    ].map((t) => (
                      <button
                        key={t.val}
                        type="button"
                        onClick={() =>
                          updateElementStyle(selectedElementId, {
                            textTransform: t.val as any,
                          })
                        }
                        className={`py-1 text-[11px] font-bold rounded border transition-all ${
                          currentStyle.textTransform === t.val
                            ? 'bg-[#4B1F0F] text-[#FFC72C] border-[#4B1F0F]'
                            : 'bg-white text-[#4B1F0F] border-[#4B1F0F]/20 hover:bg-amber-100'
                        }`}
                      >
                        {t.label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* ----------------- TAB: CSS STYLES & BOX MODEL ----------------- */}
            {activeInspectorTab === 'style' && (
              <div className="space-y-4">
                {/* Spacing: Padding & Margin */}
                <div className="p-3 bg-white rounded-xl border-2 border-[#4B1F0F] space-y-2">
                  <label className="block text-xs font-black uppercase tracking-wider text-[#4B1F0F]">
                    Padding (Inside Spacing)
                  </label>
                  <div className="grid grid-cols-4 gap-1.5 text-center">
                    <div>
                      <span className="text-[10px] font-bold opacity-60">Top</span>
                      <input
                        type="text"
                        placeholder="0px"
                        value={currentStyle.paddingTop || ''}
                        onChange={(e) =>
                          updateElementStyle(selectedElementId, { paddingTop: e.target.value })
                        }
                        className="w-full px-1 py-1 bg-amber-50 rounded border border-[#4B1F0F]/20 text-xs font-bold text-center"
                      />
                    </div>
                    <div>
                      <span className="text-[10px] font-bold opacity-60">Right</span>
                      <input
                        type="text"
                        placeholder="0px"
                        value={currentStyle.paddingRight || ''}
                        onChange={(e) =>
                          updateElementStyle(selectedElementId, { paddingRight: e.target.value })
                        }
                        className="w-full px-1 py-1 bg-amber-50 rounded border border-[#4B1F0F]/20 text-xs font-bold text-center"
                      />
                    </div>
                    <div>
                      <span className="text-[10px] font-bold opacity-60">Bottom</span>
                      <input
                        type="text"
                        placeholder="0px"
                        value={currentStyle.paddingBottom || ''}
                        onChange={(e) =>
                          updateElementStyle(selectedElementId, { paddingBottom: e.target.value })
                        }
                        className="w-full px-1 py-1 bg-amber-50 rounded border border-[#4B1F0F]/20 text-xs font-bold text-center"
                      />
                    </div>
                    <div>
                      <span className="text-[10px] font-bold opacity-60">Left</span>
                      <input
                        type="text"
                        placeholder="0px"
                        value={currentStyle.paddingLeft || ''}
                        onChange={(e) =>
                          updateElementStyle(selectedElementId, { paddingLeft: e.target.value })
                        }
                        className="w-full px-1 py-1 bg-amber-50 rounded border border-[#4B1F0F]/20 text-xs font-bold text-center"
                      />
                    </div>
                  </div>
                </div>

                {/* Background Color */}
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <label className="text-xs font-black uppercase tracking-wider">
                      Background Color
                    </label>
                    <span className="text-xs font-mono font-bold">
                      {currentStyle.backgroundColor || 'Default'}
                    </span>
                  </div>
                  <div className="flex items-center flex-wrap gap-1.5 mb-2">
                    {brandPalette.map((p) => (
                      <button
                        key={p.hex}
                        type="button"
                        onClick={() =>
                          updateElementStyle(selectedElementId, { backgroundColor: p.hex })
                        }
                        className={`w-7 h-7 rounded-full border-2 border-[#4B1F0F] shadow-sm transition-transform hover:scale-110 ${
                          currentStyle.backgroundColor === p.hex
                            ? 'ring-2 ring-[#7A3DA6] scale-110'
                            : ''
                        }`}
                        style={{ backgroundColor: p.hex }}
                        title={p.name}
                      />
                    ))}
                  </div>
                  <div className="flex items-center gap-2">
                    <input
                      type="color"
                      value={currentStyle.backgroundColor || '#FFC72C'}
                      onChange={(e) =>
                        updateElementStyle(selectedElementId, { backgroundColor: e.target.value })
                      }
                      className="w-10 h-8 rounded border border-[#4B1F0F] cursor-pointer p-0 bg-transparent"
                    />
                    <input
                      type="text"
                      placeholder="Custom Hex (#...)"
                      value={currentStyle.backgroundColor || ''}
                      onChange={(e) =>
                        updateElementStyle(selectedElementId, { backgroundColor: e.target.value })
                      }
                      className="flex-1 px-2.5 py-1.5 bg-white rounded border border-[#4B1F0F] text-xs font-mono"
                    />
                  </div>
                </div>

                {/* Border Width & Style */}
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-black uppercase tracking-wider mb-1">
                      Border Width
                    </label>
                    <select
                      value={currentStyle.borderWidth || ''}
                      onChange={(e) =>
                        updateElementStyle(selectedElementId, { borderWidth: e.target.value })
                      }
                      className="w-full px-2.5 py-1.5 bg-white rounded border-2 border-[#4B1F0F] text-xs font-bold"
                    >
                      <option value="">Default</option>
                      <option value="0px">None (0px)</option>
                      <option value="2px">2px</option>
                      <option value="3px">3px</option>
                      <option value="4px">4px (Comic)</option>
                      <option value="6px">6px (Heavy)</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-black uppercase tracking-wider mb-1">
                      Border Style
                    </label>
                    <select
                      value={currentStyle.borderStyle || 'solid'}
                      onChange={(e) =>
                        updateElementStyle(selectedElementId, {
                          borderStyle: e.target.value as any,
                        })
                      }
                      className="w-full px-2.5 py-1.5 bg-white rounded border-2 border-[#4B1F0F] text-xs font-bold"
                    >
                      <option value="solid">Solid</option>
                      <option value="dashed">Dashed</option>
                      <option value="dotted">Dotted</option>
                      <option value="none">None</option>
                    </select>
                  </div>
                </div>

                {/* Border Radius (Corner Roundness) */}
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label className="text-xs font-black uppercase tracking-wider">
                      Border Radius (Corners)
                    </label>
                    <span className="text-xs font-bold">{currentStyle.borderRadius || 'Default'}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <input
                      type="range"
                      min="0"
                      max="48"
                      step="2"
                      value={parseInt(currentStyle.borderRadius || '0', 10) || 0}
                      onChange={(e) =>
                        updateElementStyle(selectedElementId, { borderRadius: `${e.target.value}px` })
                      }
                      className="flex-1 accent-[#4B1F0F] cursor-pointer"
                    />
                    <button
                      type="button"
                      onClick={() =>
                        updateElementStyle(selectedElementId, { borderRadius: '9999px' })
                      }
                      className="px-2 py-1 bg-white hover:bg-amber-100 rounded border border-[#4B1F0F] text-[10px] font-black uppercase"
                    >
                      Pill
                    </button>
                  </div>
                </div>

                {/* Neo-Brutalist Box Shadow */}
                <div>
                  <label className="block text-xs font-black uppercase tracking-wider mb-1">
                    Neo-Brutalist Shadow Presets
                  </label>
                  <div className="grid grid-cols-4 gap-1.5">
                    {[
                      { label: 'None', shadow: 'none' },
                      { label: '2px', shadow: '2px 2px 0px #4B1F0F' },
                      { label: '4px', shadow: '4px 4px 0px #4B1F0F' },
                      { label: '6px', shadow: '6px 6px 0px #4B1F0F' },
                    ].map((s) => (
                      <button
                        key={s.label}
                        type="button"
                        onClick={() =>
                          updateElementStyle(selectedElementId, { boxShadow: s.shadow })
                        }
                        className={`py-1.5 text-[11px] font-bold rounded border transition-all ${
                          currentStyle.boxShadow === s.shadow
                            ? 'bg-[#4B1F0F] text-[#FFC72C] border-[#4B1F0F]'
                            : 'bg-white text-[#4B1F0F] border-[#4B1F0F]/30 hover:bg-amber-100'
                        }`}
                      >
                        {s.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Transform: Comic Tilt Rotation */}
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label className="text-xs font-black uppercase tracking-wider">
                      Comic Tilt (Rotation)
                    </label>
                    <span className="text-xs font-bold">
                      {currentStyle.rotation !== undefined ? `${currentStyle.rotation}°` : '0°'}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <input
                      type="range"
                      min="-15"
                      max="15"
                      step="0.5"
                      value={currentStyle.rotation !== undefined ? currentStyle.rotation : 0}
                      onChange={(e) =>
                        updateElementStyle(selectedElementId, {
                          rotation: parseFloat(e.target.value),
                        })
                      }
                      className="flex-1 accent-[#4B1F0F] cursor-pointer"
                    />
                    <button
                      type="button"
                      onClick={() => updateElementStyle(selectedElementId, { rotation: 0 })}
                      className="p-1 hover:bg-black/10 rounded"
                      title="Reset rotation to 0"
                    >
                      <RotateCcw className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                {/* Opacity Slider */}
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label className="text-xs font-black uppercase tracking-wider">Opacity</label>
                    <span className="text-xs font-bold">
                      {Math.round((currentStyle.opacity !== undefined ? currentStyle.opacity : 1) * 100)}%
                    </span>
                  </div>
                  <input
                    type="range"
                    min="0.1"
                    max="1.0"
                    step="0.05"
                    value={currentStyle.opacity !== undefined ? currentStyle.opacity : 1}
                    onChange={(e) =>
                      updateElementStyle(selectedElementId, { opacity: parseFloat(e.target.value) })
                    }
                    className="w-full accent-[#4B1F0F] cursor-pointer"
                  />
                </div>

                {/* Clear Custom Styles */}
                <button
                  type="button"
                  onClick={() => {
                    const all = { ...(content.styles || {}) };
                    delete all[selectedElementId];
                    updateContentWithHistory({ styles: all });
                  }}
                  className="w-full py-2 bg-white hover:bg-red-50 text-red-600 font-heading text-xs font-bold rounded-lg border border-red-300 transition-colors flex items-center justify-center gap-1.5"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Restore Brand Default Styles</span>
                </button>
              </div>
            )}
          </>
        ) : (
          /* ======================================================== */
          /* SECTION-LEVEL FORM VIEW (WHEN WHOLE SECTION IS SELECTED) */
          /* ======================================================== */
          <div className="space-y-4">
            <div className="p-3 bg-white rounded-xl border-2 border-[#4B1F0F]/30 text-xs font-medium text-[#4B1F0F]/80">
              💡 <strong>Pro-Tip:</strong> Click on any individual headline, button, or package image directly on the page to open its granular <strong>Typography & CSS Editorial Box</strong>!
            </div>

            {/* ======================================================== */}
            {/* SECTION: HEADER                                          */}
            {/* ======================================================== */}
            {selectedSectionId === 'header' && (
              <div className="space-y-4">
                {/* Logo Uploader */}
                <div className="p-3 bg-white rounded-xl border-2 border-[#4B1F0F] space-y-2">
                  <label className="block text-xs font-black uppercase tracking-wider">
                    POPRIO Logo Asset
                  </label>
                  {content.meta?.logo?.src && (
                    <div className="flex items-center gap-3 p-2 bg-amber-50 rounded-lg border border-[#4B1F0F]/20">
                      <img
                        src={content.meta.logo.src}
                        alt="Logo Preview"
                        className="w-12 h-12 object-contain bg-white rounded border border-[#4B1F0F]/20 shrink-0"
                      />
                      <div className="flex-1 min-w-0">
                        <span className="text-[10px] font-bold text-[#4B1F0F]/70 block truncate">
                          {content.meta.logo.src.split('/').pop() || content.meta.logo.src}
                        </span>
                        <button
                          type="button"
                          onClick={() => {
                            const defaults = getDefaultContentSchema();
                            updateContentWithHistory({
                              meta: { ...content.meta, logo: { ...content.meta.logo, src: defaults.meta.logo.src } },
                            });
                          }}
                          className="text-[10px] text-red-600 font-bold hover:underline flex items-center gap-1 mt-1 cursor-pointer"
                        >
                          <RotateCcw className="w-3 h-3" />
                          <span>Reset to Default Logo</span>
                        </button>
                      </div>
                    </div>
                  )}
                  <button
                    type="button"
                    onClick={() => {
                      openMediaLibrary((url) => {
                        updateContentWithHistory({
                          meta: { ...content.meta, logo: { ...content.meta.logo, src: url } },
                        });
                      });
                    }}
                    className="flex items-center justify-center gap-2 w-full py-2 bg-[#FFC72C] hover:bg-[#ffbf11] text-[#4B1F0F] font-heading text-xs font-black uppercase tracking-wider rounded-lg border-2 border-[#4B1F0F] shadow-[2px_2px_0px_#4B1F0F] active:translate-x-[1px] active:translate-y-[1px] transition-all cursor-pointer"
                  >
                    <Upload className="w-4 h-4" />
                    <span>Choose / Upload Logo (WP Media)</span>
                  </button>
                  <input
                    type="text"
                    placeholder="Logo URL"
                    value={content.meta?.logo?.src || ''}
                    onChange={(e) =>
                      updateContentWithHistory({
                        meta: { ...content.meta, logo: { ...content.meta.logo, src: e.target.value } },
                      })
                    }
                    className="w-full px-2.5 py-1.5 bg-amber-50 rounded border border-[#4B1F0F]/20 text-xs font-medium"
                  />
                </div>

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
                  />
                </div>

                {/* Rotating Words Management */}
                <div className="pt-2 border-t-2 border-[#4B1F0F]/15">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-black uppercase tracking-wider">
                      Rotating Words ({content.hero?.primaryWords?.length || 0})
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
                      className="flex items-center gap-1 text-[11px] font-bold text-[#4B1F0F] bg-[#FFC72C] hover:bg-white px-2 py-1 rounded border border-[#4B1F0F] transition-colors cursor-pointer"
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
                          className="p-1 text-red-600 hover:bg-red-50 rounded disabled:opacity-30 cursor-pointer"
                          title="Remove word"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Hero Showcase Packages Management */}
                <div className="pt-2 border-t-2 border-[#4B1F0F]/15">
                  <label className="block text-xs font-black uppercase tracking-wider mb-2">
                    Hero Showcase Packages
                  </label>
                  <div className="grid grid-cols-5 gap-1 mb-3">
                    {(content.hero?.packages || []).map((pkg, idx) => (
                      <button
                        key={pkg.id || idx}
                        type="button"
                        onClick={() => setActiveHeroPackageIdx(idx)}
                        className={`py-1.5 text-[10px] font-black uppercase rounded-lg border-2 transition-all cursor-pointer ${
                          activeHeroPackageIdx === idx
                            ? 'bg-[#4B1F0F] text-[#FFC72C] border-[#4B1F0F] shadow-sm'
                            : 'bg-white text-[#4B1F0F] border-[#4B1F0F]/30 hover:bg-amber-100'
                        }`}
                      >
                        #{idx + 1}
                      </button>
                    ))}
                  </div>

                  {content.hero?.packages?.[activeHeroPackageIdx] && (
                    <div className="p-3 bg-white rounded-xl border-2 border-[#4B1F0F] space-y-3">
                      <div>
                        <label className="block text-[11px] font-bold text-[#4B1F0F]/80 uppercase mb-0.5">
                          Flavour Name
                        </label>
                        <input
                          type="text"
                          value={content.hero.packages[activeHeroPackageIdx].flavourName}
                          onChange={(e) => {
                            const copy = [...content.hero.packages];
                            copy[activeHeroPackageIdx] = {
                              ...copy[activeHeroPackageIdx],
                              flavourName: e.target.value,
                            };
                            updateContentWithHistory({
                              hero: { ...content.hero, packages: copy },
                            });
                          }}
                          className="w-full px-2.5 py-1.5 bg-amber-50 rounded border border-[#4B1F0F]/20 text-xs font-bold"
                        />
                      </div>

                      {/* Package Image */}
                      <div>
                        <label className="block text-[11px] font-bold text-[#4B1F0F]/80 uppercase mb-1">
                          Package Image
                        </label>
                        <div className="flex items-center gap-3 p-2 bg-amber-50 rounded-lg border border-[#4B1F0F]/20 mb-2">
                          <img
                            src={content.hero.packages[activeHeroPackageIdx].imagePath}
                            alt="Package Preview"
                            className="w-12 h-12 object-contain bg-white rounded border border-[#4B1F0F]/20 shrink-0"
                          />
                          <div className="flex-1 min-w-0">
                            <span className="text-[10px] font-bold text-[#4B1F0F]/70 block truncate">
                              {content.hero.packages[activeHeroPackageIdx].imagePath.split('/').pop()}
                            </span>
                            <button
                              type="button"
                              onClick={() => {
                                const defaults = getDefaultContentSchema();
                                const defPkg = defaults.hero.packages[activeHeroPackageIdx];
                                if (defPkg) {
                                  const copy = [...content.hero.packages];
                                  copy[activeHeroPackageIdx] = {
                                    ...copy[activeHeroPackageIdx],
                                    imagePath: defPkg.imagePath,
                                  };
                                  updateContentWithHistory({
                                    hero: { ...content.hero, packages: copy },
                                  });
                                }
                              }}
                              className="text-[10px] text-red-600 font-bold hover:underline flex items-center gap-1 mt-1 cursor-pointer"
                            >
                              <RotateCcw className="w-3 h-3" />
                              <span>Reset to Default Image</span>
                            </button>
                          </div>
                        </div>

                        <button
                          type="button"
                          onClick={() => {
                            openMediaLibrary((url) => {
                              const copy = [...content.hero.packages];
                              copy[activeHeroPackageIdx] = {
                                ...copy[activeHeroPackageIdx],
                                imagePath: url,
                              };
                              updateContentWithHistory({
                                hero: { ...content.hero, packages: copy },
                              });
                            });
                          }}
                          className="flex items-center justify-center gap-2 w-full py-2 bg-[#FFC72C] hover:bg-[#ffbf11] text-[#4B1F0F] font-heading text-xs font-black uppercase tracking-wider rounded-lg border-2 border-[#4B1F0F] shadow-[2px_2px_0px_#4B1F0F] active:translate-x-[1px] active:translate-y-[1px] transition-all cursor-pointer mb-2"
                        >
                          <Upload className="w-4 h-4" />
                          <span>Choose / Upload Package Image (WP Media)</span>
                        </button>

                        <input
                          type="text"
                          placeholder="Image URL"
                          value={content.hero.packages[activeHeroPackageIdx].imagePath}
                          onChange={(e) => {
                            const copy = [...content.hero.packages];
                            copy[activeHeroPackageIdx] = {
                              ...copy[activeHeroPackageIdx],
                              imagePath: e.target.value,
                            };
                            updateContentWithHistory({
                              hero: { ...content.hero, packages: copy },
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

                {/* Video Source (Desktop MP4) */}
                <div className="p-3 bg-white rounded-xl border-2 border-[#4B1F0F] space-y-2">
                  <div className="flex items-center gap-1.5">
                    <VideoIcon className="w-4 h-4 text-[#4B1F0F]" />
                    <label className="block text-xs font-black uppercase tracking-wider">
                      Trailer Video (Desktop 16:9 MP4)
                    </label>
                  </div>

                  <div className="text-[10px] font-bold text-[#4B1F0F]/70 truncate p-2 bg-amber-50 rounded border border-[#4B1F0F]/20">
                    Active: {content.trailer?.videoSrc?.split('/').pop() || 'No video configured'}
                  </div>

                  <button
                    type="button"
                    onClick={() => {
                      openMediaLibrary((url) => {
                        updateContentWithHistory({
                          trailer: { ...content.trailer, videoSrc: url },
                        });
                      });
                    }}
                    className="flex items-center justify-center gap-2 w-full py-2 bg-[#FFC72C] hover:bg-[#ffbf11] text-[#4B1F0F] font-heading text-xs font-black uppercase tracking-wider rounded-lg border-2 border-[#4B1F0F] shadow-[2px_2px_0px_#4B1F0F] active:translate-x-[1px] active:translate-y-[1px] transition-all cursor-pointer"
                  >
                    <Upload className="w-4 h-4" />
                    <span>Choose / Upload Video (WP Media Library)</span>
                  </button>

                  <input
                    type="text"
                    placeholder="Direct Video URL (.mp4)"
                    value={content.trailer?.videoSrc || ''}
                    onChange={(e) =>
                      updateContentWithHistory({
                        trailer: { ...content.trailer, videoSrc: e.target.value },
                      })
                    }
                    className="w-full px-2.5 py-1.5 bg-amber-50 rounded border border-[#4B1F0F]/20 text-xs font-medium"
                  />

                  <button
                    type="button"
                    onClick={() => {
                      const defaults = getDefaultContentSchema();
                      updateContentWithHistory({
                        trailer: { ...content.trailer, videoSrc: defaults.trailer.videoSrc },
                      });
                    }}
                    className="text-[10px] text-red-600 font-bold hover:underline flex items-center gap-1 cursor-pointer pt-1"
                  >
                    <RotateCcw className="w-3 h-3" />
                    <span>Reset to Default Trailer Video</span>
                  </button>
                </div>

                {/* Mobile Video Source (Optional 9:16 MP4) */}
                <div className="p-3 bg-white rounded-xl border-2 border-[#4B1F0F] space-y-2">
                  <div className="flex items-center gap-1.5">
                    <VideoIcon className="w-4 h-4 text-[#4B1F0F]" />
                    <label className="block text-xs font-black uppercase tracking-wider">
                      Mobile Video (Optional 9:16 MP4)
                    </label>
                  </div>

                  <button
                    type="button"
                    onClick={() => {
                      openMediaLibrary((url) => {
                        updateContentWithHistory({
                          trailer: { ...content.trailer, videoSrcMobile: url },
                        });
                      });
                    }}
                    className="flex items-center justify-center gap-2 w-full py-1.5 bg-amber-100 hover:bg-amber-200 text-[#4B1F0F] font-heading text-[11px] font-black uppercase tracking-wider rounded-lg border border-[#4B1F0F] transition-all cursor-pointer"
                  >
                    <Upload className="w-3.5 h-3.5" />
                    <span>Choose Mobile Video (WP Media)</span>
                  </button>

                  <input
                    type="text"
                    placeholder="Mobile Video URL (.mp4)"
                    value={content.trailer?.videoSrcMobile || ''}
                    onChange={(e) =>
                      updateContentWithHistory({
                        trailer: { ...content.trailer, videoSrcMobile: e.target.value },
                      })
                    }
                    className="w-full px-2.5 py-1.5 bg-amber-50 rounded border border-[#4B1F0F]/20 text-xs font-medium"
                  />
                </div>

                {/* Poster Image */}
                <div className="p-3 bg-white rounded-xl border-2 border-[#4B1F0F] space-y-2">
                  <label className="block text-xs font-black uppercase tracking-wider">
                    Video Poster Image (Optional)
                  </label>
                  <button
                    type="button"
                    onClick={() => {
                      openMediaLibrary((url) => {
                        updateContentWithHistory({
                          trailer: { ...content.trailer, posterSrc: url },
                        });
                      });
                    }}
                    className="flex items-center justify-center gap-2 w-full py-1.5 bg-amber-100 hover:bg-amber-200 text-[#4B1F0F] font-heading text-[11px] font-black uppercase tracking-wider rounded-lg border border-[#4B1F0F] transition-all cursor-pointer"
                  >
                    <Upload className="w-3.5 h-3.5" />
                    <span>Choose Poster Image (WP Media)</span>
                  </button>
                  <input
                    type="text"
                    placeholder="Poster Image URL"
                    value={content.trailer?.posterSrc || ''}
                    onChange={(e) =>
                      updateContentWithHistory({
                        trailer: { ...content.trailer, posterSrc: e.target.value },
                      })
                    }
                    className="w-full px-2.5 py-1.5 bg-amber-50 rounded border border-[#4B1F0F]/20 text-xs font-medium"
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
                    Edit Signature Flavour Cards (1–5)
                  </label>
                  <div className="grid grid-cols-5 gap-1 mb-3">
                    {(content.flavourverse?.cards || []).map((card, idx) => (
                      <button
                        key={card.id || idx}
                        type="button"
                        onClick={() => setActiveFlavourIdx(idx)}
                        className={`py-1.5 text-[10px] font-black uppercase rounded-lg border-2 transition-all cursor-pointer ${
                          activeFlavourIdx === idx
                            ? 'bg-[#4B1F0F] text-[#FFC72C] border-[#4B1F0F] shadow-sm'
                            : 'bg-white text-[#4B1F0F] border-[#4B1F0F]/30 hover:bg-amber-100'
                        }`}
                      >
                        #{card.flavourNumber || idx + 1}
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

                      {/* Package Image Uploader */}
                      <div>
                        <label className="block text-[11px] font-bold text-[#4B1F0F]/80 uppercase mb-1">
                          Package Image
                        </label>
                        <div className="flex items-center gap-3 p-2 bg-amber-50 rounded-lg border border-[#4B1F0F]/20 mb-2">
                          <img
                            src={content.flavourverse.cards[activeFlavourIdx].packageImage}
                            alt="Package Preview"
                            className="w-12 h-12 object-contain bg-white rounded border border-[#4B1F0F]/20 shrink-0"
                          />
                          <div className="flex-1 min-w-0">
                            <span className="text-[10px] font-bold text-[#4B1F0F]/70 block truncate">
                              {content.flavourverse.cards[activeFlavourIdx].packageImage.split('/').pop()}
                            </span>
                            <button
                              type="button"
                              onClick={() => {
                                const defaults = getDefaultContentSchema();
                                const defCard = defaults.flavourverse.cards[activeFlavourIdx];
                                if (defCard) {
                                  const copy = [...content.flavourverse.cards];
                                  copy[activeFlavourIdx] = {
                                    ...copy[activeFlavourIdx],
                                    packageImage: defCard.packageImage,
                                  };
                                  updateContentWithHistory({
                                    flavourverse: { ...content.flavourverse, cards: copy },
                                  });
                                }
                              }}
                              className="text-[10px] text-red-600 font-bold hover:underline flex items-center gap-1 mt-1 cursor-pointer"
                            >
                              <RotateCcw className="w-3 h-3" />
                              <span>Reset to Default Image</span>
                            </button>
                          </div>
                        </div>

                        <button
                          type="button"
                          onClick={() => {
                            openMediaLibrary((url) => {
                              const copy = [...content.flavourverse.cards];
                              copy[activeFlavourIdx] = {
                                ...copy[activeFlavourIdx],
                                packageImage: url,
                              };
                              updateContentWithHistory({
                                flavourverse: { ...content.flavourverse, cards: copy },
                              });
                            });
                          }}
                          className="flex items-center justify-center gap-2 w-full py-2 bg-[#FFC72C] hover:bg-[#ffbf11] text-[#4B1F0F] font-heading text-xs font-black uppercase tracking-wider rounded-lg border-2 border-[#4B1F0F] shadow-[2px_2px_0px_#4B1F0F] active:translate-x-[1px] active:translate-y-[1px] transition-all cursor-pointer mb-2"
                        >
                          <Upload className="w-4 h-4" />
                          <span>Choose / Upload Package Image (WP Media)</span>
                        </button>

                        <input
                          type="text"
                          placeholder="Image URL"
                          value={content.flavourverse.cards[activeFlavourIdx].packageImage}
                          onChange={(e) => {
                            const copy = [...content.flavourverse.cards];
                            copy[activeFlavourIdx] = {
                              ...copy[activeFlavourIdx],
                              packageImage: e.target.value,
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
                    Intro Eyebrow
                  </label>
                  <input
                    type="text"
                    value={content.originStory?.intro?.eyebrow || ''}
                    onChange={(e) =>
                      updateContentWithHistory({
                        originStory: {
                          ...content.originStory,
                          intro: { ...content.originStory.intro, eyebrow: e.target.value },
                        },
                      })
                    }
                    className="w-full px-3 py-2 bg-white rounded-lg border-2 border-[#4B1F0F] text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-[#FFC72C]"
                  />
                </div>

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
                        className={`py-1.5 text-[10px] font-black uppercase rounded-lg border-2 transition-all cursor-pointer ${
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
                    Section Eyebrow
                  </label>
                  <input
                    type="text"
                    value={content.howToOrder?.eyebrow || ''}
                    onChange={(e) =>
                      updateContentWithHistory({
                        howToOrder: { ...content.howToOrder, eyebrow: e.target.value },
                      })
                    }
                    className="w-full px-3 py-2 bg-white rounded-lg border-2 border-[#4B1F0F] text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-[#FFC72C]"
                  />
                </div>

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

                {/* Looping How-To Video */}
                <div className="p-3 bg-white rounded-xl border-2 border-[#4B1F0F] space-y-2">
                  <div className="flex items-center gap-1.5">
                    <VideoIcon className="w-4 h-4 text-[#4B1F0F]" />
                    <label className="block text-xs font-black uppercase tracking-wider">
                      Looping Demo Video (Desktop MP4)
                    </label>
                  </div>

                  <div className="text-[10px] font-bold text-[#4B1F0F]/70 truncate p-2 bg-amber-50 rounded border border-[#4B1F0F]/20">
                    Active: {content.howToOrder?.videoSrc?.split('/').pop() || 'No video configured'}
                  </div>

                  <button
                    type="button"
                    onClick={() => {
                      openMediaLibrary((url) => {
                        updateContentWithHistory({
                          howToOrder: { ...content.howToOrder, videoSrc: url },
                        });
                      });
                    }}
                    className="flex items-center justify-center gap-2 w-full py-2 bg-[#FFC72C] hover:bg-[#ffbf11] text-[#4B1F0F] font-heading text-xs font-black uppercase tracking-wider rounded-lg border-2 border-[#4B1F0F] shadow-[2px_2px_0px_#4B1F0F] active:translate-x-[1px] active:translate-y-[1px] transition-all cursor-pointer"
                  >
                    <Upload className="w-4 h-4" />
                    <span>Choose / Upload Video (WP Media Library)</span>
                  </button>

                  <input
                    type="text"
                    placeholder="Direct Video URL (.mp4)"
                    value={content.howToOrder?.videoSrc || ''}
                    onChange={(e) =>
                      updateContentWithHistory({
                        howToOrder: { ...content.howToOrder, videoSrc: e.target.value },
                      })
                    }
                    className="w-full px-2.5 py-1.5 bg-amber-50 rounded border border-[#4B1F0F]/20 text-xs font-medium"
                  />

                  <button
                    type="button"
                    onClick={() => {
                      const defaults = getDefaultContentSchema();
                      updateContentWithHistory({
                        howToOrder: { ...content.howToOrder, videoSrc: defaults.howToOrder.videoSrc },
                      });
                    }}
                    className="text-[10px] text-red-600 font-bold hover:underline flex items-center gap-1 cursor-pointer pt-1"
                  >
                    <RotateCcw className="w-3 h-3" />
                    <span>Reset to Default Video</span>
                  </button>
                </div>

                {/* Looping Mobile Video */}
                <div className="p-3 bg-white rounded-xl border-2 border-[#4B1F0F] space-y-2">
                  <div className="flex items-center gap-1.5">
                    <VideoIcon className="w-4 h-4 text-[#4B1F0F]" />
                    <label className="block text-xs font-black uppercase tracking-wider">
                      Mobile Video (Optional 9:16 MP4)
                    </label>
                  </div>

                  <button
                    type="button"
                    onClick={() => {
                      openMediaLibrary((url) => {
                        updateContentWithHistory({
                          howToOrder: { ...content.howToOrder, videoSrcMobile: url },
                        });
                      });
                    }}
                    className="flex items-center justify-center gap-2 w-full py-1.5 bg-amber-100 hover:bg-amber-200 text-[#4B1F0F] font-heading text-[11px] font-black uppercase tracking-wider rounded-lg border border-[#4B1F0F] transition-all cursor-pointer"
                  >
                    <Upload className="w-3.5 h-3.5" />
                    <span>Choose Mobile Video (WP Media)</span>
                  </button>

                  <input
                    type="text"
                    placeholder="Mobile Video URL (.mp4)"
                    value={content.howToOrder?.videoSrcMobile || ''}
                    onChange={(e) =>
                      updateContentWithHistory({
                        howToOrder: { ...content.howToOrder, videoSrcMobile: e.target.value },
                      })
                    }
                    className="w-full px-2.5 py-1.5 bg-amber-50 rounded border border-[#4B1F0F]/20 text-xs font-medium"
                  />
                </div>

                <div>
                  <label className="block text-xs font-black uppercase tracking-wider mb-1">
                    WhatsApp Order Message
                  </label>
                  <input
                    type="text"
                    value={content.howToOrder?.whatsappMessage || ''}
                    onChange={(e) =>
                      updateContentWithHistory({
                        howToOrder: { ...content.howToOrder, whatsappMessage: e.target.value },
                      })
                    }
                    className="w-full px-3 py-2 bg-white rounded-lg border-2 border-[#4B1F0F] text-sm font-medium focus:outline-none focus:ring-2 focus:ring-[#FFC72C]"
                  />
                </div>

                {/* Step Selector Tabs */}
                <div className="pt-2 border-t-2 border-[#4B1F0F]/15">
                  <label className="block text-xs font-black uppercase tracking-wider mb-2">
                    Edit Ordering Steps (1–3)
                  </label>
                  <div className="grid grid-cols-3 gap-1 mb-3">
                    {(content.howToOrder?.steps || []).map((step, idx) => (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => setActiveStepIdx(idx)}
                        className={`py-1.5 text-[10px] font-black uppercase rounded-lg border-2 transition-all cursor-pointer ${
                          activeStepIdx === idx
                            ? 'bg-[#4B1F0F] text-[#FFC72C] border-[#4B1F0F] shadow-sm'
                            : 'bg-white text-[#4B1F0F] border-[#4B1F0F]/30 hover:bg-amber-100'
                        }`}
                      >
                        Step {step.stepNumber || idx + 1}
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
                    Eyebrow
                  </label>
                  <input
                    type="text"
                    value={content.about?.eyebrow || ''}
                    onChange={(e) =>
                      updateContentWithHistory({
                        about: { ...content.about, eyebrow: e.target.value },
                      })
                    }
                    className="w-full px-3 py-2 bg-white rounded-lg border-2 border-[#4B1F0F] text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-[#FFC72C]"
                  />
                </div>

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
        )}
      </div>

      {/* Done Button */}
      <div className="p-4 border-t-3 border-[#4B1F0F] bg-white">
        <button
          type="button"
          onClick={closeInspector}
          className="w-full py-2.5 bg-[#FFC72C] hover:bg-[#ffbf11] text-[#4B1F0F] font-heading text-xs font-black uppercase tracking-wider rounded-xl border-3 border-[#4B1F0F] shadow-[3px_3px_0px_#4B1F0F] active:translate-x-[1px] active:translate-y-[1px] transition-all cursor-pointer"
        >
          Done Editing
        </button>
      </div>
    </aside>
  );
};
