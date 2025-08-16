import React, { useRef, useState } from 'react';
import { DEFAULTS, ELEMENT } from '../../utils/constants';

const ButtonElement = ({ el, selected, updateElement, mode, onEditingStart, onEditingEnd }) => {
  const editableRef = useRef();
  const [isEditing, setIsEditing] = useState(false);

  // Handle click to start editing
  const onTextClick = (e) => {
    if (mode === 'design') {
      e.preventDefault();
      e.stopPropagation();
      setIsEditing(true);
      onEditingStart?.();
      setTimeout(() => {
        if (editableRef.current) {
          editableRef.current.focus();
          // Place cursor at the end of text
          const range = document.createRange();
          const selection = window.getSelection();
          range.selectNodeContents(editableRef.current);
          range.collapse(false);
          selection.removeAllRanges();
          selection.addRange(range);
        }
      }, 10);
    }
  };

  // Handle blur to stop editing and save content
  const onBlur = (e) => {
    setIsEditing(false);
    onEditingEnd?.();
    
    let html = e.target.innerHTML.trim();
    
    // Handle empty content - use placeholder text
    if (!html || html === '<br>' || html === '<div><br></div>') {
      html = 'Button';
    }
    
    updateElement(el.id, { content: html });
  };

  // Handle key press for Enter to stop editing
  const onKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      editableRef.current?.blur();
    }
  };

  // Handle focus to start editing
  const onFocus = (e) => {
    if (mode === 'design') {
      setIsEditing(true);
      onEditingStart?.();
    }
  };

  // Helper function to get display content
  const getDisplayContent = () => {
    const content = el.content || '';
    if (!content || content === '<br>' || content === '<div><br></div>') {
      return 'Button';
    }
    return content;
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
      dangerouslySetInnerHTML={{ __html: getDisplayContent() }}
    />
  );
};

export default ButtonElement;
