import React, { useState } from 'react';
import { useDraggable } from '@dnd-kit/core';

// Container component for all elements
const Container = ({ el, selected, updateElement, mode, onSelect, children }) => {
  const [isTextEditing, setIsTextEditing] = useState(false);
  
  const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({
    id: el.id,
    data: el,
    disabled: mode === 'preview' || isTextEditing,
  });

  const style = transform ? {
    transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
  } : undefined;

  const handleMouseDown = (e) => {
    if (mode !== 'preview') {
      onSelect(el.id);
    }
  };

  const handleTextEditingStart = () => {
    setIsTextEditing(true);
  };

  const handleTextEditingEnd = () => {
    setIsTextEditing(false);
  };

  // Calculate container size: user-defined size + padding
  const containerPadding = 4;
  const containerWidth = el.width ? el.width + (containerPadding * 2) : 'auto';
  const containerHeight = el.height ? el.height + (containerPadding * 2) : 'auto';

  return (
    <div
      ref={setNodeRef}
      style={{
        position: 'absolute',
        left: el.x,
        top: el.y,
        width: containerWidth,
        height: containerHeight,
        cursor: mode === 'preview' ? 'default' : (isDragging ? 'grabbing' : 'grab'),
        zIndex: selected ? 10 : 1,
        transition: isDragging ? 'none' : 'all 0.2s ease',
        padding: `${containerPadding}px`,
        border: mode === 'design' ? (selected ? '2px solid #2563eb' : '2px dotted #9ca3af') : 'none',
        borderRadius: '4px',
        background: mode === 'design' ? 'rgba(255, 255, 255, 0.02)' : 'transparent',
        ...style,
      }}
      onMouseDown={handleMouseDown}
      {...(isTextEditing ? {} : attributes)}
      {...(isTextEditing ? {} : listeners)}
    >
      {React.cloneElement(children, {
        selected,
        updateElement,
        mode,
        onEditingStart: handleTextEditingStart,
        onEditingEnd: handleTextEditingEnd,
      })}
    </div>
  );
};

export default Container;
