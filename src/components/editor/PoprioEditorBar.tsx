import React, { useState } from 'react';
import { usePoprioEditor } from '../../context/PoprioEditorContext';
import {
  Monitor,
  Tablet,
  Smartphone,
  Pencil,
  Eye,
  Undo2,
  Redo2,
  History,
  RotateCcw,
  Save,
  UploadCloud,
  X,
  Loader2,
  Check,
} from 'lucide-react';

export const PoprioEditorBar: React.FC = () => {
  const {
    isEditorActive,
    isEditMode,
    previewDevice,
    canUndo,
    canRedo,
    saveStatus,
    hasPendingDraft,
    toggleEditor,
    setEditMode,
    setPreviewDevice,
    undo,
    redo,
    saveDraft,
    publish,
    reset,
    openRevisions,
  } = usePoprioEditor();

  const [isResetMenuOpen, setIsResetMenuOpen] = useState(false);

  if (!isEditorActive) return null;

  return (
    <header
      role="banner"
      className="fixed top-0 left-0 right-0 h-16 bg-[#4B1F0F] text-[#FFF3E0] z-[99998] border-b-3 border-[#FFC72C] shadow-lg flex items-center justify-between px-4 sm:px-6 select-none font-sans"
    >
      {/* Left: Brand & Status */}
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-2">
          <span className="font-heading text-lg font-black tracking-wider text-[#FFC72C]">
            POPRIO
          </span>
          <span className="text-[10px] font-black uppercase tracking-widest bg-[#FFC72C] text-[#4B1F0F] px-2 py-0.5 rounded border border-[#FFC72C]">
            Visual Editor
          </span>
        </div>

        {/* State Pill */}
        {hasPendingDraft ? (
          <span className="hidden md:inline-flex items-center gap-1.5 text-xs font-bold text-amber-300 bg-amber-950/60 border border-amber-500/40 px-2.5 py-0.5 rounded-full">
            <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
            Draft Active
          </span>
        ) : (
          <span className="hidden md:inline-flex items-center gap-1.5 text-xs font-bold text-emerald-300 bg-emerald-950/60 border border-emerald-500/40 px-2.5 py-0.5 rounded-full">
            <span className="w-2 h-2 rounded-full bg-emerald-400" />
            Live Synced
          </span>
        )}
      </div>

      {/* Center: Device Switcher & Edit Mode & Undo/Redo */}
      <div className="flex items-center gap-2 sm:gap-4">
        {/* Device Switcher */}
        <div className="flex items-center bg-black/30 rounded-lg p-1 border border-white/10">
          <button
            onClick={() => setPreviewDevice('desktop')}
            className={`p-1.5 rounded transition-colors ${
              previewDevice === 'desktop'
                ? 'bg-[#FFC72C] text-[#4B1F0F] font-bold shadow-sm'
                : 'text-[#FFF3E0]/70 hover:text-white'
            }`}
            title="Desktop View (100%)"
          >
            <Monitor className="w-4 h-4" />
          </button>
          <button
            onClick={() => setPreviewDevice('tablet')}
            className={`p-1.5 rounded transition-colors ${
              previewDevice === 'tablet'
                ? 'bg-[#FFC72C] text-[#4B1F0F] font-bold shadow-sm'
                : 'text-[#FFF3E0]/70 hover:text-white'
            }`}
            title="Tablet View (768px)"
          >
            <Tablet className="w-4 h-4" />
          </button>
          <button
            onClick={() => setPreviewDevice('mobile')}
            className={`p-1.5 rounded transition-colors ${
              previewDevice === 'mobile'
                ? 'bg-[#FFC72C] text-[#4B1F0F] font-bold shadow-sm'
                : 'text-[#FFF3E0]/70 hover:text-white'
            }`}
            title="Mobile View (375px)"
          >
            <Smartphone className="w-4 h-4" />
          </button>
        </div>

        {/* Edit / Preview Toggle */}
        <div className="flex items-center bg-black/30 rounded-lg p-1 border border-white/10">
          <button
            onClick={() => setEditMode(true)}
            className={`flex items-center gap-1.5 px-2.5 py-1 rounded text-xs font-bold transition-colors ${
              isEditMode
                ? 'bg-[#FFC72C] text-[#4B1F0F] shadow-sm'
                : 'text-[#FFF3E0]/70 hover:text-white'
            }`}
            title="Edit Mode (Show click-to-edit boundaries)"
          >
            <Pencil className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Edit</span>
          </button>
          <button
            onClick={() => setEditMode(false)}
            className={`flex items-center gap-1.5 px-2.5 py-1 rounded text-xs font-bold transition-colors ${
              !isEditMode
                ? 'bg-[#FFC72C] text-[#4B1F0F] shadow-sm'
                : 'text-[#FFF3E0]/70 hover:text-white'
            }`}
            title="Preview Mode (Clean visitor view)"
          >
            <Eye className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Preview</span>
          </button>
        </div>

        {/* Undo / Redo */}
        <div className="hidden lg:flex items-center bg-black/30 rounded-lg p-1 border border-white/10">
          <button
            onClick={undo}
            disabled={!canUndo}
            className="p-1.5 rounded text-[#FFF3E0]/70 hover:text-white disabled:opacity-30 disabled:hover:text-[#FFF3E0]/70"
            title="Undo (Ctrl+Z)"
          >
            <Undo2 className="w-4 h-4" />
          </button>
          <button
            onClick={redo}
            disabled={!canRedo}
            className="p-1.5 rounded text-[#FFF3E0]/70 hover:text-white disabled:opacity-30 disabled:hover:text-[#FFF3E0]/70"
            title="Redo (Ctrl+Y)"
          >
            <Redo2 className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Right: Actions */}
      <div className="flex items-center gap-2 sm:gap-3">
        {/* Revisions History */}
        <button
          onClick={openRevisions}
          className="flex items-center gap-1.5 px-2.5 py-1.5 bg-black/30 hover:bg-black/50 text-[#FFF3E0] rounded-lg border border-white/15 text-xs font-bold transition-colors"
          title="Open Revisions History (10 rolling snapshots)"
        >
          <History className="w-3.5 h-3.5 text-[#FFC72C]" />
          <span className="hidden sm:inline">History</span>
        </button>

        {/* Reset / Discard Menu */}
        <div className="relative">
          <button
            onClick={() => setIsResetMenuOpen((prev) => !prev)}
            className="flex items-center gap-1.5 px-2.5 py-1.5 bg-black/30 hover:bg-black/50 text-[#FFF3E0]/80 hover:text-white rounded-lg border border-white/15 text-xs font-bold transition-colors"
            title="Reset Options"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>

          {isResetMenuOpen && (
            <div className="absolute right-0 mt-2 w-56 bg-[#FFF3E0] text-[#4B1F0F] rounded-xl border-3 border-[#4B1F0F] shadow-[4px_4px_0px_#4B1F0F] p-2 z-50 text-xs font-bold">
              <button
                onClick={() => {
                  setIsResetMenuOpen(false);
                  if (confirm('Discard pending draft and reload published version?')) {
                    reset('draft');
                  }
                }}
                className="w-full text-left px-3 py-2 rounded-lg hover:bg-black/10 transition-colors"
              >
                Discard Current Draft
              </button>
              <button
                onClick={() => {
                  setIsResetMenuOpen(false);
                  if (
                    confirm(
                      'Are you sure you want to restore all fields to initial factory defaults?'
                    )
                  ) {
                    reset('defaults');
                  }
                }}
                className="w-full text-left px-3 py-2 rounded-lg text-[#E0351B] hover:bg-red-500/10 transition-colors"
              >
                Reset to Factory Defaults
              </button>
            </div>
          )}
        </div>

        {/* Save Draft Button */}
        <button
          onClick={saveDraft}
          disabled={saveStatus === 'saving'}
          className="flex items-center gap-1.5 px-3 py-1.5 bg-[#FFF3E0] text-[#4B1F0F] hover:bg-white rounded-lg border-2 border-[#4B1F0F] text-xs font-black uppercase tracking-wider transition-all disabled:opacity-50"
          title="Save as Draft (Ctrl+S)"
        >
          {saveStatus === 'saving' ? (
            <Loader2 className="w-3.5 h-3.5 animate-spin" />
          ) : (
            <Save className="w-3.5 h-3.5 text-[#4B1F0F]" />
          )}
          <span className="hidden sm:inline">Save Draft</span>
        </button>

        {/* Publish Button */}
        <button
          onClick={() => {
            if (confirm('Publish these changes live to all visitors?')) {
              publish();
            }
          }}
          disabled={saveStatus === 'publishing'}
          className="flex items-center gap-1.5 px-3.5 py-1.5 bg-[#E0351B] hover:bg-[#c92f17] text-white rounded-lg border-2 border-[#4B1F0F] shadow-[2px_2px_0px_#4B1F0F] active:translate-x-[1px] active:translate-y-[1px] text-xs font-black uppercase tracking-wider transition-all disabled:opacity-50"
          title="Publish Live"
        >
          {saveStatus === 'publishing' ? (
            <Loader2 className="w-3.5 h-3.5 animate-spin" />
          ) : (
            <UploadCloud className="w-3.5 h-3.5" />
          )}
          <span>Publish</span>
        </button>

        {/* Exit Editor */}
        <button
          onClick={() => toggleEditor(false)}
          className="p-1.5 text-[#FFF3E0]/60 hover:text-white rounded transition-colors"
          title="Close Visual Editor"
        >
          <X className="w-5 h-5" />
        </button>
      </div>
    </header>
  );
};

