import React, { useRef, useState, useEffect } from 'react';

/**
 * MVP Element component that renders only text, image, and button
 * - Text: contentEditable (design mode)
 * - Image: <img>
 * - Button: contentEditable label (design mode)
 */

const Element = ({ el, selected, updateElement, mode, onEditingStart, onEditingEnd }) => {
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
    
    // Handle empty content - use placeholder text based on element type
    if (!html || html === '<br>' || html === '<div><br></div>') {
      if (el.type === 'text') {
        html = 'Text';
      } else if (el.type === 'button') {
        html = 'Button';
      }
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
      if (el.type === 'text') {
        return 'Text';
      } else if (el.type === 'button') {
        return 'Button';
      }
    }
    return content;
  };

  const baseElementStyle = {
    minWidth: 80,
    minHeight: 24,
    padding: el.style?.padding || '8px',
    fontSize: el.style?.fontSize || 16,
    color: el.style?.color || '#111',
    textAlign: el.style?.textAlign || 'left',
    background: el.style?.backgroundColor || 'transparent',
    borderRadius: el.style?.borderRadius || '4px',
    border: el.style?.border || 'none',
    margin: 0,
    boxShadow: el.style?.boxShadow || 'none',
    fontWeight: el.style?.fontWeight || 'normal',
    display: el.style?.display || 'block',
    outline: 'none',
    whiteSpace: 'pre-wrap',
    wordWrap: 'break-word',
    direction: 'ltr',
    unicodeBidi: 'normal',
    textRendering: 'auto',
    fontFamily: el.style?.fontFamily || 'inherit',
    cursor: mode === 'design' ? 'text' : 'default',
    // Add overflow handling when user sets height
    overflow: el.height ? 'hidden' : 'visible',
    textOverflow: el.height ? 'ellipsis' : 'clip',
    maxHeight: el.height ? el.height : 'none'
  };

  // Text element
  if (el.type === 'text') {
    return (
      <div
        ref={editableRef}
        className="element"
        contentEditable={mode === 'design'}
        suppressContentEditableWarning
        onClick={onTextClick}
        onFocus={onFocus}
        onBlur={onBlur}
        onKeyDown={onKeyDown}
        style={{
          ...baseElementStyle,
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
            WebkitLineClamp: Math.floor((el.height - 16) / 20), // Account for padding
            WebkitBoxOrient: 'vertical'
          })
        }}
        dangerouslySetInnerHTML={{ __html: getDisplayContent() }}
      />
    );
  }

  // Image element
  if (el.type === 'image') {
    return (
      <img
        src={el.src}
        alt=""
        draggable={false}
        style={{
          width: el.width ? '100%' : 300,
          height: el.height ? '100%' : 'auto',
          objectFit: 'cover',
          display: 'block',
          borderRadius: el.style?.borderRadius || '6px',
          boxShadow: el.style?.boxShadow || 'none',
          border: el.style?.border || 'none',
          boxSizing: 'border-box'
        }}
      />
      );
  }

  // Button element
  if (el.type === 'button') {
    return (
      <div
        ref={editableRef}
        className="element"
        contentEditable={mode === 'design'}
        suppressContentEditableWarning
        onClick={onTextClick}
        onFocus={onFocus}
        onBlur={onBlur}
        onKeyDown={onKeyDown}
        style={{
          ...baseElementStyle,
          minWidth: 80,
          padding: '12px 24px', // Default good padding for buttons
          borderRadius: el.style?.borderRadius || '8px',
          textAlign: 'center',
          cursor: mode === 'design' ? 'text' : 'pointer',
          backgroundColor: el.style?.backgroundColor || '#2563eb',
          color: el.style?.color || '#fff',
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
  }

  return null;
};

export default Element;
