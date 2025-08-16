import React, { useRef, useState } from 'react';
import { DEFAULTS, ELEMENT, MODES } from '../../utils/constants';

const ButtonElement = ({ el, selected, updateElement, mode, onEditingStart, onEditingEnd }) => {
  const editableRef = useRef(null);
  const [isEditing, setIsEditing] = useState(false);

  const onTextClick = (e) => {
    if (mode !== 'design') return;
    e.preventDefault();
    e.stopPropagation();
  };

  const onFocus = () => {
    if (mode !== 'design') return;
    setIsEditing(true);
    onEditingStart?.();
  };

  const onBlur = () => {
    if (mode !== 'design') return;
    setIsEditing(false);
    onEditingEnd?.();
  };

  const onKeyDown = (e) => {
    if (mode !== 'design') return;
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      editableRef.current?.blur();
    }
  };

  // Helper function to get display content
  const getDisplayContent = () => {
    console.log('Button content:', el.content, 'Type:', typeof el.content);
    // Only show default if content property doesn't exist (new button)
    // If content exists but is empty, show empty (user's choice)
    if (el.content === undefined || el.content === null) {
      return DEFAULTS.BUTTON_TEXT;
    }
    return el.content;
  };

  const baseElementStyle = {
    minWidth: ELEMENT.MIN_WIDTH,
    minHeight: ELEMENT.MIN_HEIGHT,
    padding: el.style?.padding || ELEMENT.DEFAULT_PADDING,
    fontSize: el.style?.fontSize || DEFAULTS.FONT_SIZE,
    color: el.style?.color || DEFAULTS.TEXT_COLOR,
    textAlign: el.style?.textAlign || DEFAULTS.TEXT_ALIGN,
    background: el.style?.backgroundColor || DEFAULTS.BACKGROUND_COLOR,
    borderRadius: el.style?.borderRadius || DEFAULTS.BORDER_RADIUS,
    border: el.style?.border || 'none',
    margin: 0,
    boxShadow: el.style?.boxShadow || 'none',
    fontWeight: el.style?.fontWeight || DEFAULTS.FONT_WEIGHT,
    display: el.style?.display || 'block',
    outline: 'none',
    whiteSpace: 'pre-wrap',
    wordWrap: 'break-word',
    direction: 'ltr',
    unicodeBidi: 'normal',
    textRendering: 'auto',
    fontFamily: el.style?.fontFamily || DEFAULTS.FONT_FAMILY,
    cursor: mode === 'design' ? 'text' : 'default',
    overflow: el.height ? 'hidden' : 'visible',
    textOverflow: el.height ? 'ellipsis' : 'clip',
    maxHeight: el.height ? el.height : 'none'
  };

  return (
    <div
      ref={editableRef}
      className="element"
      contentEditable={false} // Disable direct editing to prevent confusion
      suppressContentEditableWarning
      onClick={onTextClick}
      onFocus={onFocus}
      onBlur={onBlur}
      onKeyDown={onKeyDown}
      style={{
        ...baseElementStyle,
        minWidth: ELEMENT.MIN_WIDTH,
        padding: DEFAULTS.BUTTON_PADDING, // Default good padding for buttons
        borderRadius: el.style?.borderRadius || DEFAULTS.BUTTON_BORDER_RADIUS,
        textAlign: 'center',
        cursor: mode === 'design' ? 'default' : 'pointer', // Changed from 'text' to 'default'
        backgroundColor: el.style?.backgroundColor || DEFAULTS.BUTTON_BACKGROUND,
        color: el.style?.color || DEFAULTS.BUTTON_COLOR,
        display: 'inline-block',
        // Fit within user-defined dimensions
        width: el.width ? '100%' : 'auto',
        height: el.height ? '100%' : 'auto',
        boxSizing: 'border-box',
        // In preview mode, ensure proper overflow handling
        ...(mode === 'preview' && el.height && {
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          maxHeight: '100%',
          display: '-webkit-box',
          WebkitLineClamp: Math.floor((el.height - 24) / 20), // Account for padding
          WebkitBoxOrient: 'vertical'
        })
      }}
    >
      {getDisplayContent()}
    </div>
  );
};

export default ButtonElement;
