import React from 'react';
import { usePoprioEditor } from '../../context/PoprioEditorContext';
import { Pencil } from 'lucide-react';

export const PoprioAdminLauncher: React.FC = () => {
  const { isEditorActive, toggleEditor } = usePoprioEditor();

  // Determine if launcher should be visible
  const wpData = typeof window !== 'undefined' ? (window as any).POPRIO_DATA : undefined;
  const isAllowed = wpData ? Boolean(wpData.isAdmin) : true; // In standalone/dev mode, always allow

  if (isEditorActive || !isAllowed) {
    return null;
  }

  return (
    <aside aria-label="Editor controls" className="fixed bottom-6 left-6 z-[99990]">
      <button
        onClick={() => toggleEditor(true)}
        className="flex items-center gap-2.5 px-4 py-2.5 bg-[#FFC72C] text-[#4B1F0F] font-heading text-sm font-black uppercase tracking-wider rounded-xl border-3 border-[#4B1F0F] shadow-[4px_4px_0px_#4B1F0F] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_#4B1F0F] active:translate-x-[4px] active:translate-y-[4px] active:shadow-none transition-all cursor-pointer"
        title="Open POPRIO Visual Editor"
      >
        <Pencil className="w-4 h-4 text-[#4B1F0F]" />
        <span>Edit Page</span>
      </button>
    </aside>
  );
};

