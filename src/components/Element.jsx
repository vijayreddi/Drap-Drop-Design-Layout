import React, { useRef } from 'react';

/**
 * Enhanced Element component that renders different element types
 * - Text: contentEditable (design mode)
 * - Heading: contentEditable with larger font
 * - Image: <img>
 * - Button: contentEditable label (design mode)
 * - Container: Div with background and border
 * - Divider: Horizontal line
 * - Spacer: Empty space
 * - Video: HTML5 video element
 * - Icon: Large emoji or text
 * - Input: Form input field
 * - Textarea: Form textarea field
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
    alignItems: el.style?.alignItems || 'flex-start',
    justifyContent: el.style?.justifyContent || 'flex-start',
    resize: el.style?.resize || 'none',
    outline: 'none'
  };

  // Text element
  if (el.type === 'text') {
    return (
      <div
        className={`element ${selected ? 'selected' : ''}`}
        contentEditable={mode === 'design'}
        suppressContentEditableWarning
        onInput={onTextInput}
        dangerouslySetInnerHTML={{ __html: el.content || '' }}
        style={baseElementStyle}
      />
    );
  }

  // Heading element
  if (el.type === 'heading') {
    return (
      <div
        className={`element ${selected ? 'selected' : ''}`}
        contentEditable={mode === 'design'}
        suppressContentEditableWarning
        onInput={onTextInput}
        dangerouslySetInnerHTML={{ __html: el.content || '' }}
        style={{
          ...baseElementStyle,
          fontSize: el.style?.fontSize || 32,
          fontWeight: el.style?.fontWeight || 'bold',
          marginBottom: '16px'
        }}
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
      <div style={{ display:'inline-block' }}>
        <div
          className={`element ${selected ? 'selected' : ''}`}
          contentEditable={mode === 'design'}
          suppressContentEditableWarning
          onInput={onButtonInput}
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

  // Container element
  if (el.type === 'container') {
    return (
      <div
        className={`element ${selected ? 'selected' : ''}`}
        style={{
          ...baseElementStyle,
          width: el.width || 300,
          height: el.height || 200,
          backgroundColor: el.style?.backgroundColor || '#f8f9fa',
          border: el.style?.border || '1px solid #e9ecef',
          borderRadius: el.style?.borderRadius || '8px',
          padding: el.style?.padding || '16px'
        }}
      >
        {mode === 'design' && (
          <div style={{ color: '#6c757d', fontSize: '12px', textAlign: 'center', marginTop: '50px' }}>
            Container - Add elements inside
          </div>
        )}
      </div>
    );
  }

  // Divider element
  if (el.type === 'divider') {
    return (
      <div
        className={`element ${selected ? 'selected' : ''}`}
        style={{
          ...baseElementStyle,
          width: el.width || 300,
          height: el.height || 2,
          backgroundColor: el.style?.backgroundColor || '#e9ecef',
          border: 'none',
          padding: 0,
          margin: '16px 0'
        }}
      />
    );
  }

  // Spacer element
  if (el.type === 'spacer') {
    return (
      <div
        className={`element ${selected ? 'selected' : ''}`}
        style={{
          ...baseElementStyle,
          width: el.width || 300,
          height: el.height || 40,
          backgroundColor: 'transparent',
          border: selected ? '1px dashed #2563eb' : 'none',
          padding: 0
        }}
      >
        {mode === 'design' && (
          <div style={{ color: '#6c757d', fontSize: '12px', textAlign: 'center', marginTop: '10px' }}>
            Spacer
          </div>
        )}
      </div>
    );
  }

  // Video element
  if (el.type === 'video') {
    return (
      <video
        src={el.src}
        controls={mode === 'preview'}
        style={{
          width: el.width || 400,
          height: el.height || 225,
          borderRadius: el.style?.borderRadius || '8px',
          boxShadow: selected ? '0 2px 8px rgba(37,99,235,0.12)' : (el.style?.boxShadow || 'none')
        }}
      />
    );
  }

  // Icon element
  if (el.type === 'icon') {
    return (
      <div
        className={`element ${selected ? 'selected' : ''}`}
        contentEditable={mode === 'design'}
        suppressContentEditableWarning
        onInput={onTextInput}
        style={{
          ...baseElementStyle,
          width: el.width || 48,
          height: el.height || 48,
          fontSize: el.style?.fontSize || 32,
          textAlign: 'center',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: 0,
          backgroundColor: 'transparent'
        }}
      >
        {el.content || '⭐'}
      </div>
    );
  }

  // Input element
  if (el.type === 'input') {
    return (
      <input
        type="text"
        placeholder={el.content || 'Enter text...'}
        disabled={mode === 'design'}
        style={{
          width: el.width || 200,
          height: el.height || 40,
          border: el.style?.border || '1px solid #d1d5db',
          borderRadius: el.style?.borderRadius || '6px',
          padding: el.style?.padding || '8px 12px',
          fontSize: el.style?.fontSize || 14,
          backgroundColor: el.style?.backgroundColor || '#fff',
          color: el.style?.color || '#111',
          outline: selected ? '2px solid #2563eb' : 'none'
        }}
      />
    );
  }

  // Textarea element
  if (el.type === 'textarea') {
    return (
      <textarea
        placeholder={el.content || 'Enter your message...'}
        disabled={mode === 'design'}
        style={{
          width: el.width || 300,
          height: el.height || 100,
          border: el.style?.border || '1px solid #d1d5db',
          borderRadius: el.style?.borderRadius || '6px',
          padding: el.style?.padding || '8px 12px',
          fontSize: el.style?.fontSize || 14,
          backgroundColor: el.style?.backgroundColor || '#fff',
          color: el.style?.color || '#111',
          resize: el.style?.resize || 'vertical',
          outline: selected ? '2px solid #2563eb' : 'none',
          fontFamily: 'inherit'
        }}
      />
    );
  }

  return null;
}
