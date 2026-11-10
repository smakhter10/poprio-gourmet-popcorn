import React, { ReactNode } from 'react';
import { usePoprioEditor } from '../../context/PoprioEditorContext';
import { Pencil } from 'lucide-react';

interface PoprioEditableSectionProps {
  sectionId: string;
  title: string;
  children: ReactNode;
  className?: string;
}

export const PoprioEditableSection: React.FC<PoprioEditableSectionProps> = ({
  sectionId,
  title,
  children,
  className = '',
}) => {
  const { isEditorActive, isEditMode, selectedSectionId, selectSection } = usePoprioEditor();

  // If editor is not active or user is in Preview Mode, render children with zero overhead
  if (!isEditorActive || !isEditMode) {
    return <>{children}</>;
  }

  const isSelected = selectedSectionId === sectionId;

  return (
    <section
      aria-label={title}
      data-poprio-editable={sectionId}
      onClick={(e) => {
        // Select this section on click
        e.stopPropagation();
        selectSection(sectionId);
      }}
      className={`relative group transition-all duration-150 cursor-pointer ${
        isSelected
          ? 'outline-4 outline-[#4B1F0F] outline-offset-[-4px] shadow-[inset_0_0_0_2px_#FFC72C]'
          : 'hover:outline-2 hover:outline-dashed hover:outline-[#FFC72C] hover:outline-offset-[-2px]'
      } ${className}`}
    >
      {/* Floating Section Edit Badge */}
      <div
        className={`absolute top-3 left-4 z-30 transition-opacity duration-150 ${
          isSelected
            ? 'opacity-100'
            : 'opacity-0 group-hover:opacity-100 pointer-events-none group-hover:pointer-events-auto'
        }`}
      >
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            selectSection(sectionId);
          }}
          className={`flex items-center gap-1.5 px-3 py-1 rounded-lg border-2 border-[#4B1F0F] font-heading text-xs font-black uppercase tracking-wider shadow-[2px_2px_0px_#4B1F0F] transition-all cursor-pointer ${
            isSelected
              ? 'bg-[#4B1F0F] text-[#FFC72C] ring-2 ring-[#FFC72C]'
              : 'bg-[#FFC72C] text-[#4B1F0F] hover:bg-white'
          }`}
          title={`Click to edit ${title}`}
        >
          <Pencil className="w-3.5 h-3.5" />
          <span>{title}</span>
          {isSelected && (
            <span className="w-2 h-2 rounded-full bg-[#FFC72C] ml-1 animate-ping" />
          )}
        </button>
      </div>

      {children}
    </section>
  );
};

