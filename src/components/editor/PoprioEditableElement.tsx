import React, { ReactNode, CSSProperties } from 'react';
import { usePoprioEditor, EditableElementType } from '../../context/PoprioEditorContext';
import { usePoprioContent } from '../../context/PoprioContentContext';
import { Pencil } from 'lucide-react';

interface PoprioEditableElementProps {
  elementId: string;
  type?: EditableElementType;
  label?: string;
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
  as?: any;
}

export const PoprioEditableElement: React.FC<PoprioEditableElementProps> = ({
  elementId,
  type = 'text',
  label = 'Element',
  children,
  className = '',
  style = {},
  as: Component = 'div',
}) => {
  const { isEditorActive, isEditMode, selectedElementId, selectElement } = usePoprioEditor();
  const { content } = usePoprioContent();

  // Retrieve custom CSS overrides for this element from content schema
  const custom = content.styles?.[elementId] || {};

  // Construct merged inline CSS style object
  const mergedStyle: CSSProperties = {
    ...style,
  };

  if (custom.fontSize) mergedStyle.fontSize = custom.fontSize;
  if (custom.fontWeight) mergedStyle.fontWeight = custom.fontWeight;
  if (custom.fontFamily) mergedStyle.fontFamily = custom.fontFamily;
  if (custom.color) mergedStyle.color = custom.color;
  if (custom.textAlign) mergedStyle.textAlign = custom.textAlign;
  if (custom.lineHeight) mergedStyle.lineHeight = custom.lineHeight;
  if (custom.letterSpacing) mergedStyle.letterSpacing = custom.letterSpacing;
  if (custom.textTransform) mergedStyle.textTransform = custom.textTransform;

  if (custom.paddingTop) mergedStyle.paddingTop = custom.paddingTop;
  if (custom.paddingRight) mergedStyle.paddingRight = custom.paddingRight;
  if (custom.paddingBottom) mergedStyle.paddingBottom = custom.paddingBottom;
  if (custom.paddingLeft) mergedStyle.paddingLeft = custom.paddingLeft;

  if (custom.marginTop) mergedStyle.marginTop = custom.marginTop;
  if (custom.marginRight) mergedStyle.marginRight = custom.marginRight;
  if (custom.marginBottom) mergedStyle.marginBottom = custom.marginBottom;
  if (custom.marginLeft) mergedStyle.marginLeft = custom.marginLeft;

  if (custom.backgroundColor) mergedStyle.backgroundColor = custom.backgroundColor;
  if (custom.borderColor) mergedStyle.borderColor = custom.borderColor;
  if (custom.borderWidth) mergedStyle.borderWidth = custom.borderWidth;
  if (custom.borderStyle) mergedStyle.borderStyle = custom.borderStyle;
  if (custom.borderRadius) mergedStyle.borderRadius = custom.borderRadius;
  if (custom.boxShadow) mergedStyle.boxShadow = custom.boxShadow;

  if (custom.opacity !== undefined) mergedStyle.opacity = custom.opacity;

  // Handle transforms (rotation + scale)
  if (custom.rotation !== undefined || custom.scale !== undefined) {
    const rot = custom.rotation !== undefined ? `rotate(${custom.rotation}deg)` : '';
    const scl = custom.scale !== undefined ? `scale(${custom.scale})` : '';
    const existingTransform = style.transform ? `${style.transform} ` : '';
    mergedStyle.transform = `${existingTransform}${rot} ${scl}`.trim();
  }

  // If editor is inactive or in preview mode, render cleanly with custom styles applied
  if (!isEditorActive || !isEditMode) {
    return (
      <Component className={className} style={mergedStyle}>
        {children}
      </Component>
    );
  }

  const isSelected = selectedElementId === elementId;

  return (
    <Component
      data-poprio-element-id={elementId}
      onClick={(e: React.MouseEvent) => {
        e.stopPropagation();
        selectElement(elementId, type, label);
      }}
      className={`relative group/elem transition-all duration-150 cursor-pointer ${
        isSelected
          ? 'outline-3 outline-[#7A3DA6] outline-offset-1 shadow-[0_0_0_2px_#FFC72C] z-30'
          : 'hover:outline-2 hover:outline-dashed hover:outline-[#7A3DA6] hover:outline-offset-1'
      } ${className}`}
      style={mergedStyle}
    >
      {/* Floating mini badge when selected or hovered */}
      {isSelected && (
        <span
          onClick={(e) => {
            e.stopPropagation();
            selectElement(elementId, type, label);
          }}
          className="absolute -top-6 left-0 z-40 flex items-center gap-1 px-2 py-0.5 bg-[#7A3DA6] text-white text-[10px] font-heading font-black uppercase tracking-wider rounded border border-white shadow-sm pointer-events-auto"
        >
          <Pencil className="w-2.5 h-2.5 text-[#FFC72C]" />
          <span>{label}</span>
        </span>
      )}
      {children}
    </Component>
  );
};

