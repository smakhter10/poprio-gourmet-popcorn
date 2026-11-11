import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  useRef,
  ReactNode,
} from 'react';
import { PoprioContentSchema, PoprioCustomElementStyle } from '../types/content';
import { usePoprioContent } from './PoprioContentContext';
import {
  apiFetchContent,
  apiSaveDraft,
  apiPublishContent,
  apiResetContent,
  apiFetchRevisions,
  apiRestoreRevision,
  RevisionMeta,
} from '../lib/editorApi';

export type PreviewDevice = 'desktop' | 'tablet' | 'mobile';

export type SaveStatus =
  | 'clean'
  | 'unsaved'
  | 'saving'
  | 'saved_draft'
  | 'publishing'
  | 'published'
  | 'error';

export interface PoprioToastData {
  message: string;
  type: 'success' | 'error' | 'info';
}

export type EditableElementType = 'text' | 'image' | 'video' | 'button' | 'card' | 'box';

export interface PoprioEditorContextValue {
  isEditorActive: boolean;
  isEditMode: boolean;
  previewDevice: PreviewDevice;
  selectedSectionId: string | null;
  selectedElementId: string | null;
  selectedElementType: EditableElementType | null;
  selectedElementLabel: string | null;
  activeInspectorTab: 'content' | 'typography' | 'style';
  isInspectorOpen: boolean;
  isRevisionsOpen: boolean;
  canUndo: boolean;
  canRedo: boolean;
  saveStatus: SaveStatus;
  hasPendingDraft: boolean;
  toast: PoprioToastData | null;
  revisions: RevisionMeta[];
  toggleEditor: (active?: boolean) => void;
  setEditMode: (edit: boolean) => void;
  setPreviewDevice: (device: PreviewDevice) => void;
  selectSection: (sectionId: string | null) => void;
  selectElement: (
    elementId: string | null,
    type?: EditableElementType,
    label?: string
  ) => void;
  setActiveInspectorTab: (tab: 'content' | 'typography' | 'style') => void;
  updateElementStyle: (elementId: string, stylePatch: Partial<PoprioCustomElementStyle>) => void;
  getElementStyle: (elementId: string) => PoprioCustomElementStyle;
  openMediaLibrary: (onSelect: (url: string) => void) => void;
  openInspector: () => void;
  closeInspector: () => void;
  openRevisions: () => void;
  closeRevisions: () => void;
  undo: () => void;
  redo: () => void;
  saveDraft: () => Promise<void>;
  publish: (summary?: string) => Promise<void>;
  reset: (target: 'draft' | 'defaults') => Promise<void>;
  restoreRevision: (revisionId: string) => Promise<void>;
  showToast: (message: string, type?: 'success' | 'error' | 'info') => void;
  hideToast: () => void;
  updateContentWithHistory: (patch: Partial<PoprioContentSchema>) => void;
}

const PoprioEditorContext = createContext<PoprioEditorContextValue | null>(null);

function detectInitialEditorActive(): boolean {
  if (typeof window === 'undefined') return false;

  // 1. Check URL query params: ?poprio_edit=1 or ?edit=1
  const searchParams = new URLSearchParams(window.location.search);
  if (searchParams.get('poprio_edit') === '1' || searchParams.get('edit') === '1') {
    return true;
  }

  // 2. Check WordPress injected runtime flag
  const wpData = (window as any).POPRIO_DATA;
  if (wpData?.isAdmin && wpData?.canEdit) {
    return true;
  }

  // 3. Check sessionStorage flag
  if (sessionStorage.getItem('poprio_visual_editor_active') === '1') {
    return true;
  }

  return false;
}

export const PoprioEditorProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const { content, updateContent } = usePoprioContent();

  const [isEditorActive, setIsEditorActive] = useState<boolean>(detectInitialEditorActive);
  const [isEditMode, setIsEditMode] = useState<boolean>(true);
  const [previewDevice, setPreviewDevice] = useState<PreviewDevice>('desktop');
  const [selectedSectionId, setSelectedSectionId] = useState<string | null>(null);
  const [selectedElementId, setSelectedElementId] = useState<string | null>(null);
  const [selectedElementType, setSelectedElementType] = useState<EditableElementType | null>(null);
  const [selectedElementLabel, setSelectedElementLabel] = useState<string | null>(null);
  const [activeInspectorTab, setActiveInspectorTab] = useState<'content' | 'typography' | 'style'>('content');
  const [isInspectorOpen, setIsInspectorOpen] = useState<boolean>(false);
  const [isRevisionsOpen, setIsRevisionsOpen] = useState<boolean>(false);
  const [saveStatus, setSaveStatus] = useState<SaveStatus>('clean');
  const [hasPendingDraft, setHasPendingDraft] = useState<boolean>(false);
  const [toast, setToast] = useState<PoprioToastData | null>(null);
  const [revisions, setRevisions] = useState<RevisionMeta[]>([]);

  // Undo / Redo history stacks (capped at 25)
  const undoStackRef = useRef<PoprioContentSchema[]>([]);
  const redoStackRef = useRef<PoprioContentSchema[]>([]);
  const [undoCount, setUndoCount] = useState<number>(0);
  const [redoCount, setRedoCount] = useState<number>(0);

  const toastTimerRef = useRef<number | null>(null);

  const showToast = useCallback(
    (message: string, type: 'success' | 'error' | 'info' = 'info') => {
      if (toastTimerRef.current) {
        window.clearTimeout(toastTimerRef.current);
      }
      setToast({ message, type });
      toastTimerRef.current = window.setTimeout(() => {
        setToast(null);
      }, 4000);
    },
    []
  );

  const hideToast = useCallback(() => {
    if (toastTimerRef.current) {
      window.clearTimeout(toastTimerRef.current);
    }
    setToast(null);
  }, []);

  // Check for existing draft on initial load
  useEffect(() => {
    let isMounted = true;
    apiFetchContent()
      .then((res) => {
        if (!isMounted) return;
        if (res.has_draft && res.draft) {
          setHasPendingDraft(true);
          updateContent(res.draft);
          showToast('Loaded pending draft for visual editing.', 'info');
        }
      })
      .catch((err) => {
        console.warn('Could not check draft status:', err);
      });

    return () => {
      isMounted = false;
    };
  }, [updateContent, showToast]);

  const toggleEditor = useCallback((active?: boolean) => {
    setIsEditorActive((prev) => {
      const next = active !== undefined ? active : !prev;
      if (typeof window !== 'undefined') {
        if (next) {
          sessionStorage.setItem('poprio_visual_editor_active', '1');
        } else {
          sessionStorage.removeItem('poprio_visual_editor_active');
        }
      }
      return next;
    });
  }, []);

  const selectSection = useCallback((sectionId: string | null) => {
    setSelectedSectionId(sectionId);
    setSelectedElementId(null);
    setSelectedElementType(null);
    setSelectedElementLabel(null);
    if (sectionId) {
      setIsInspectorOpen(true);
      setIsRevisionsOpen(false);
      setActiveInspectorTab('content');
    }
  }, []);

  const selectElement = useCallback(
    (
      elementId: string | null,
      type: EditableElementType = 'text',
      label: string = 'Element'
    ) => {
      setSelectedElementId(elementId);
      setSelectedElementType(type);
      setSelectedElementLabel(label);
      if (elementId) {
        setIsInspectorOpen(true);
        setIsRevisionsOpen(false);
        // Default to typography for text/button, content for image/video
        if (type === 'text' || type === 'button') {
          setActiveInspectorTab('typography');
        } else {
          setActiveInspectorTab('content');
        }
      }
    },
    []
  );

  const openInspector = useCallback(() => {
    setIsInspectorOpen(true);
    setIsRevisionsOpen(false);
  }, []);

  const closeInspector = useCallback(() => {
    setIsInspectorOpen(false);
    setSelectedElementId(null);
  }, []);

  const openRevisions = useCallback(async () => {
    setIsRevisionsOpen(true);
    setIsInspectorOpen(false);
    try {
      const revs = await apiFetchRevisions();
      setRevisions(revs);
    } catch (err) {
      console.warn('Failed to load revisions:', err);
    }
  }, []);

  const closeRevisions = useCallback(() => {
    setIsRevisionsOpen(false);
  }, []);

  const updateContentWithHistory = useCallback(
    (patch: Partial<PoprioContentSchema>) => {
      // Push snapshot to undo stack
      undoStackRef.current.push(JSON.parse(JSON.stringify(content)));
      if (undoStackRef.current.length > 25) {
        undoStackRef.current.shift();
      }
      setUndoCount(undoStackRef.current.length);

      // Clear redo stack on new change
      redoStackRef.current = [];
      setRedoCount(0);

      // Mark unsaved
      setSaveStatus('unsaved');

      updateContent(patch);
    },
    [content, updateContent]
  );

  const updateElementStyle = useCallback(
    (elementId: string, stylePatch: Partial<PoprioCustomElementStyle>) => {
      const existing = content.styles?.[elementId] || {};
      const updated = {
        ...existing,
        ...stylePatch,
      };
      const allStyles = {
        ...(content.styles || {}),
        [elementId]: updated,
      };
      updateContentWithHistory({ styles: allStyles });
    },
    [content, updateContentWithHistory]
  );

  const getElementStyle = useCallback(
    (elementId: string): PoprioCustomElementStyle => {
      return content.styles?.[elementId] || {};
    },
    [content]
  );

  const openMediaLibrary = useCallback(
    (onSelect: (url: string) => void) => {
      if (typeof window !== 'undefined' && (window as any).wp && (window as any).wp.media) {
        const frame = (window as any).wp.media({
          title: 'Select or Upload Media for POPRIO',
          button: { text: 'Use this media' },
          multiple: false,
        });
        frame.on('select', () => {
          const attachment = frame.state().get('selection').first().toJSON();
          if (attachment && attachment.url) {
            onSelect(attachment.url);
            showToast('Media selected from WordPress Library', 'success');
          }
        });
        frame.open();
      } else {
        const url = prompt('Enter Image or Video URL:');
        if (url && url.trim()) {
          onSelect(url.trim());
          showToast('Media URL updated', 'success');
        }
      }
    },
    [showToast]
  );

  const undo = useCallback(() => {
    if (undoStackRef.current.length === 0) return;

    const previous = undoStackRef.current.pop()!;
    redoStackRef.current.push(JSON.parse(JSON.stringify(content)));

    setUndoCount(undoStackRef.current.length);
    setRedoCount(redoStackRef.current.length);
    setSaveStatus('unsaved');

    updateContent(previous);
    showToast('Undo change', 'info');
  }, [content, updateContent, showToast]);

  const redo = useCallback(() => {
    if (redoStackRef.current.length === 0) return;

    const next = redoStackRef.current.pop()!;
    undoStackRef.current.push(JSON.parse(JSON.stringify(content)));

    setUndoCount(undoStackRef.current.length);
    setRedoCount(redoStackRef.current.length);
    setSaveStatus('unsaved');

    updateContent(next);
    showToast('Redo change', 'info');
  }, [content, updateContent, showToast]);

  // Keyboard shortcuts for Undo / Redo (Ctrl+Z / Ctrl+Y / Ctrl+Shift+Z)
  useEffect(() => {
    if (!isEditorActive) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      // Don't intercept if user is typing inside an input/textarea
      const target = e.target as HTMLElement;
      if (
        target &&
        (target.tagName === 'INPUT' ||
          target.tagName === 'TEXTAREA' ||
          target.isContentEditable)
      ) {
        return;
      }

      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'z') {
        if (e.shiftKey) {
          e.preventDefault();
          redo();
        } else {
          e.preventDefault();
          undo();
        }
      } else if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'y') {
        e.preventDefault();
        redo();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isEditorActive, undo, redo]);

  const saveDraft = useCallback(async () => {
    setSaveStatus('saving');
    try {
      const res = await apiSaveDraft(content);
      setSaveStatus('saved_draft');
      setHasPendingDraft(true);
      showToast(res.message || 'Draft saved successfully.', 'success');
    } catch (err: any) {
      setSaveStatus('error');
      showToast(err.message || 'Failed to save draft.', 'error');
    }
  }, [content, showToast]);

  const publish = useCallback(
    async (summary?: string) => {
      setSaveStatus('publishing');
      try {
        const res = await apiPublishContent(content, summary || 'Visual editor live publish');
        setSaveStatus('published');
        setHasPendingDraft(false);
        showToast(res.message || 'Published successfully to live site!', 'success');
      } catch (err: any) {
        setSaveStatus('error');
        showToast(err.message || 'Failed to publish changes.', 'error');
      }
    },
    [content, showToast]
  );

  const reset = useCallback(
    async (target: 'draft' | 'defaults') => {
      try {
        const res = await apiResetContent(target);
        updateContent(res.content);
        setSaveStatus('clean');
        if (target === 'draft') {
          setHasPendingDraft(false);
          showToast('Draft discarded. Restored live version.', 'info');
        } else {
          showToast('Restored all sections to factory defaults.', 'info');
        }
      } catch (err: any) {
        showToast(err.message || 'Failed to reset content.', 'error');
      }
    },
    [updateContent, showToast]
  );

  const restoreRevision = useCallback(
    async (revisionId: string) => {
      try {
        const res = await apiRestoreRevision(revisionId);
        if (res.status === 'success') {
          updateContent(res.published);
          setSaveStatus('published');
          setHasPendingDraft(false);
          setIsRevisionsOpen(false);
          showToast(`Restored revision ${revisionId}.`, 'success');
        } else {
          showToast(res.message || 'Could not restore revision.', 'error');
        }
      } catch (err: any) {
        showToast(err.message || 'Failed to restore revision.', 'error');
      }
    },
    [updateContent, showToast]
  );

  const value: PoprioEditorContextValue = {
    isEditorActive,
    isEditMode,
    previewDevice,
    selectedSectionId,
    selectedElementId,
    selectedElementType,
    selectedElementLabel,
    activeInspectorTab,
    isInspectorOpen,
    isRevisionsOpen,
    canUndo: undoCount > 0,
    canRedo: redoCount > 0,
    saveStatus,
    hasPendingDraft,
    toast,
    revisions,
    toggleEditor,
    setEditMode: setIsEditMode,
    setPreviewDevice,
    selectSection,
    selectElement,
    setActiveInspectorTab,
    updateElementStyle,
    getElementStyle,
    openMediaLibrary,
    openInspector,
    closeInspector,
    openRevisions,
    closeRevisions,
    undo,
    redo,
    saveDraft,
    publish,
    reset,
    restoreRevision,
    showToast,
    hideToast,
    updateContentWithHistory,
  };

  return (
    <PoprioEditorContext.Provider value={value}>
      {children}
    </PoprioEditorContext.Provider>
  );
};

export function usePoprioEditor(): PoprioEditorContextValue {
  const ctx = useContext(PoprioEditorContext);
  if (!ctx) {
    throw new Error('usePoprioEditor must be used within a PoprioEditorProvider');
  }
  return ctx;
}
