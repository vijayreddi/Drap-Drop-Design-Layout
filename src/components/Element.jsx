import React, { useRef, useEffect } from 'react';

/**
 * MVP Element component that renders only text, image, and button
 * - Text: contentEditable (design mode)
 * - Image: <img>
 * - Button: contentEditable label (design mode)
 */

export default function Element({ el, selected, updateElement, mode }) {
  const editableRef = useRef();

  const onTextInput = (e) => {
    const html = e.target.innerHTML;
    updateElement(el.id, { content: html });
  };

  const onButtonInput = (e) => {
    const text = e.target.innerText;
    updateElement(el.id, { content: text });
  };

  // Handle focus to set cursor position
  const onFocus = (e) => {
    if (mode === 'design' && editableRef.current) {
      // Small delay to ensure the element is properly focused
      setTimeout(() => {
        const range = document.createRange();
        const selection = window.getSelection();
        range.selectNodeContents(editableRef.current);
        range.collapse(false);
        selection.removeAllRanges();
        selection.addRange(range);
      }, 10);
    }
  };

  // Update content when element changes
  useEffect(() => {
    if (editableRef.current && mode === 'design') {
      editableRef.current.innerHTML = el.content || '';
    }
  }, [el.content, mode]);

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
    margin: el.style?.margin || '0px',
    boxShadow: el.style?.boxShadow || 'none',
    fontWeight: el.style?.fontWeight || 'normal',
    display: el.style?.display || 'block',
    outline: 'none',
    whiteSpace: 'pre-wrap',
    wordWrap: 'break-word'
  };

  // Text element
  if (el.type === 'text') {
    return (
      <div
        ref={editableRef}
        className={`element ${selected ? 'selected' : ''}`}
        contentEditable={mode === 'design'}
        suppressContentEditableWarning
        onInput={onTextInput}
        onFocus={onFocus}
        style={baseElementStyle}
      >
        {el.content || ''}
      </div>
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
      <div style={{ display:'inline-block' }}>
        <div
          ref={editableRef}
          className={`element ${selected ? 'selected' : ''}`}
          contentEditable={mode === 'design'}
          suppressContentEditableWarning
          onInput={onButtonInput}
          onFocus={onFocus}
          style={{
            ...baseElementStyle,
            minWidth: 80,
            padding: el.style?.padding || '8px 16px',
            borderRadius: el.style?.borderRadius || '8px',
            textAlign: 'center',
            cursor: mode === 'design' ? 'text' : 'pointer',
            userSelect: mode === 'design' ? 'text' : 'none',
            backgroundColor: el.style?.backgroundColor || '#2563eb',
            color: el.style?.color || '#fff'
          }}
        >
          {el.content || 'Button'}
        </div>
      </div>
    );
  }

  return null;
}
