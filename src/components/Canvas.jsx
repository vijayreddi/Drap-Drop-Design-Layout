import React, { useState, useRef } from 'react';
import { DndContext, useDraggable, useDroppable } from '@dnd-kit/core';
import { restrictToWindowEdges } from '@dnd-kit/modifiers';
import Element from './Element';


const DraggableElement = ({ el, selected, updateElement, mode, onSelect }) => {
  const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({
    id: el.id,
    data: el,
  });

  const style = transform ? {
    transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
  } : undefined;

  return (
    <div
      ref={setNodeRef}
      style={{
        position: 'absolute',
        left: el.x,
        top: el.y,
        width: el.width ? el.width : 'auto',
        height: el.height ? el.height : 'auto',
        cursor: mode === 'preview' ? 'default' : (isDragging ? 'grabbing' : 'grab'),
        zIndex: selected ? 10 : 1,
        transition: isDragging ? 'none' : 'all 0.2s ease',
        ...style,
      }}
      onMouseDown={(e) => {
        if (mode !== 'preview') {
          e.stopPropagation();
          onSelect(el.id);
        }
      }}
      {...attributes}
      {...listeners}
    >
      <Element
        el={el}
        selected={selected}
        updateElement={updateElement}
        mode={mode}
      />
      
      {/* Selection indicator */}
      {selected && mode === 'design' && (
        <div 
          className="selection-indicator"
          style={{
            position: 'absolute',
            top: -2,
            left: -2,
            right: -2,
            bottom: -2,
            border: '1px solid #2563eb',
            borderRadius: '2px',
            pointerEvents: 'none',
            zIndex: 11
          }}
        />
      )}
    </div>
  );
};


const Canvas = ({ elements, setElements, updateElement, selectedId, setSelectedId, mode, canvasBg }) => {
  const canvasRef = useRef(null);
  
  const { setNodeRef } = useDroppable({
    id: 'canvas',
  });

  const handleDragEnd = (event) => {
    const { active, delta } = event;
    const elementId = active.id;
    
    if (mode === 'preview') return;
    
    const element = elements.find(el => el.id === elementId);
    if (!element) return;
    
    // Calculate new position
    let newX = element.x + delta.x;
    let newY = element.y + delta.y;
    
    // Snap to grid in design mode
    if (mode === 'design') {
      const gridSize = 10;
      newX = Math.round(newX / gridSize) * gridSize;
      newY = Math.round(newY / gridSize) * gridSize;
    }
    
    // Keep element within canvas bounds
    const maxX = 900 - (element.width || 100);
    const maxY = 640 - (element.height || 50);
    
    const boundedX = Math.max(0, Math.min(newX, maxX));
    const boundedY = Math.max(0, Math.min(newY, maxY));
    
    updateElement(elementId, { x: boundedX, y: boundedY });
  };

  const handleCanvasClick = (e) => {
    // Only deselect if clicking directly on canvas, not on elements
    if (e.target === e.currentTarget) {
      setSelectedId(null);
    }
  };

  return (
    <div className="canvas-container">
      <DndContext 
        onDragEnd={handleDragEnd}
        modifiers={[restrictToWindowEdges]}
      >
        <div 
          ref={(node) => {
            setNodeRef(node);
            canvasRef.current = node;
          }}
          className="canvas" 
          style={{ 
            backgroundColor: canvasBg,
            width: 900,
            height: 640,
            position: 'relative',
            border: mode === 'design' ? '2px dashed #ccc' : '1px solid #e5e7eb',
            borderRadius: '8px',
            overflow: 'hidden',
            boxShadow: mode === 'design' ? '0 2px 8px rgba(0,0,0,0.03)' : 'none',
            cursor: 'default',
            userSelect: 'auto'
          }}
          onClick={handleCanvasClick}
        >
          {/* Grid overlay for design mode */}
          {mode === 'design' && (
            <div 
              className="canvas-grid"
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                backgroundImage: `
                  linear-gradient(rgba(0,0,0,0.05) 1px, transparent 1px),
                  linear-gradient(90deg, rgba(0,0,0,0.05) 1px, transparent 1px)
                `,
                backgroundSize: '20px 20px',
                pointerEvents: 'none',
                zIndex: 0
              }}
            />
          )}

          {/* Elements */}
          {elements.map(el => (
            <DraggableElement
              key={el.id}
              el={el}
              selected={selectedId === el.id}
              updateElement={updateElement}
              mode={mode}
              onSelect={setSelectedId}
            />
          ))}

          {/* Empty state */}
          {elements.length === 0 && mode === 'design' && (
            <div 
              className="empty-state"
              style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                textAlign: 'center',
                color: '#9ca3af',
                pointerEvents: 'none'
              }}
            >
              <div style={{ fontSize: '48px', marginBottom: '16px' }}>🎨</div>
              <div style={{ fontSize: '18px', fontWeight: '500', marginBottom: '8px' }}>
                Start building your design
              </div>
              <div style={{ fontSize: '14px' }}>
                Add components from the left panel
              </div>
            </div>
          )}
        </div>
      </DndContext>
    </div>
  );
};

export default Canvas;
