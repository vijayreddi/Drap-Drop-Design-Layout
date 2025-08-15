import React, { useRef, useState } from 'react';

/**
 * MVP Element component that renders only text, image, and button
 * - Text: contentEditable (design mode)
 * - Image: <img>
 * - Button: contentEditable label (design mode)
 */

const Element = ({ el, selected, updateElement, mode }) => {
  const editableRef = useRef();
  const [isEditing, setIsEditing] = useState(false);

  // Handle click to start editing
  const onTextClick = (e) => {
    if (mode === 'design' && !isEditing) {
      e.preventDefault();
      e.stopPropagation();
      setIsEditing(true);
      setTimeout(() => {
        if (editableRef.current) {
          editableRef.current.focus();
        }
      }, 10);
    }
  };

  // Handle blur to stop editing and save content
  const onBlur = (e) => {
    setIsEditing(false);
    const html = e.target.innerHTML;
    updateElement(el.id, { content: html });
  };

  // Handle key press for Enter to stop editing
  const onKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      editableRef.current?.blur();
    }
  };

  const baseElementStyle = {
    minWidth: 80,
    minHeight: 24,
    padding: el.style?.padding || '8px',
    fontSize: el.style?.fontSize || 16,
    color: el.style?.color || '#111',
    textAlign: el.style?.textAlign || 'left',
    background: selected ? 'rgba(37,99,235,0.04)' : (el.style?.backgroundColor || 'transparent'),
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
    fontFamily: 'inherit',
    cursor: mode === 'design' ? 'text' : 'default'
  };

  // Text element
  if (el.type === 'text') {
    return (
      <div
        ref={editableRef}
        className={`element ${selected ? 'selected' : ''}`}
        contentEditable={mode === 'design' && isEditing}
        suppressContentEditableWarning
        onClick={onTextClick}
        onBlur={onBlur}
        onKeyDown={onKeyDown}
        style={baseElementStyle}
        dangerouslySetInnerHTML={{ __html: el.content || '' }}
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
          width: el.width ? el.width : 300,
          height: el.height ? el.height : 'auto',
          objectFit: 'cover',
          display: 'block',
          borderRadius: el.style?.borderRadius || '6px',
          boxShadow: selected ? '0 2px 8px rgba(37,99,235,0.12)' : (el.style?.boxShadow || 'none'),
          border: el.style?.border || 'none'
        }}
      />
    );
  }

  // Button element
  if (el.type === 'button') {
    return (
      <div
        ref={editableRef}
        className={`element ${selected ? 'selected' : ''}`}
        contentEditable={mode === 'design' && isEditing}
        suppressContentEditableWarning
        onClick={onTextClick}
        onBlur={onBlur}
        onKeyDown={onKeyDown}
        style={{
          ...baseElementStyle,
          minWidth: 80,
          padding: el.style?.padding || '8px 16px',
          borderRadius: el.style?.borderRadius || '8px',
          textAlign: 'center',
          cursor: mode === 'design' ? 'text' : 'pointer',
          userSelect: mode === 'design' ? 'text' : 'none',
          backgroundColor: el.style?.backgroundColor || '#2563eb',
          color: el.style?.color || '#fff',
          display: 'inline-block'
        }}
        dangerouslySetInnerHTML={{ __html: el.content || 'Button' }}
      />
    );
  }

  return null;
};

export default Element;
