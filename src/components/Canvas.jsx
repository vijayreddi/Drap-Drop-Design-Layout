import React, { useState, useRef, useEffect } from 'react';
import Element from './Element';

/**
 * Enhanced Canvas renders all elements and manages drag position updates
 * Custom drag implementation compatible with React 19
 */
export default function Canvas({ elements, setElements, updateElement, selectedId, setSelectedId, mode, canvasBg, canvasSize, setCanvasSize, duplicateElement }) {
  const [dragging, setDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [dragElement, setDragElement] = useState(null);
  const canvasRef = useRef(null);

  const onMouseDown = (e, el) => {
    if (mode === 'preview') return;
    
    e.stopPropagation();
    setSelectedId(el.id);
    
    const rect = canvasRef.current.getBoundingClientRect();
    const offsetX = e.clientX - rect.left - el.x;
    const offsetY = e.clientY - rect.top - el.y;
    
    setDragOffset({ x: offsetX, y: offsetY });
    setDragElement(el);
    setDragging(true);
  };

  const onMouseMove = (e) => {
    if (!dragging || !dragElement || mode === 'preview') return;
    
    const rect = canvasRef.current.getBoundingClientRect();
    const newX = e.clientX - rect.left - dragOffset.x;
    const newY = e.clientY - rect.top - dragOffset.y;
    
    // Snap to grid in design mode
    const gridSize = 10;
    const snappedX = Math.round(newX / gridSize) * gridSize;
    const snappedY = Math.round(newY / gridSize) * gridSize;
    
    // Keep element within canvas bounds
    const maxX = canvasSize.width - (dragElement.width || 100);
    const maxY = canvasSize.height - (dragElement.height || 50);
    
    const boundedX = Math.max(0, Math.min(snappedX, maxX));
    const boundedY = Math.max(0, Math.min(snappedY, maxY));
    
    updateElement(dragElement.id, { x: boundedX, y: boundedY });
  };

  const onMouseUp = () => {
    setDragging(false);
    setDragElement(null);
  };

  const handleCanvasClick = (e) => {
    // Only deselect if clicking directly on canvas, not on elements
    if (e.target === e.currentTarget) {
      setSelectedId(null);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Delete' && selectedId) {
      const element = elements.find(el => el.id === selectedId);
      if (element) {
        const index = elements.indexOf(element);
        setElements(prev => prev.filter(el => el.id !== selectedId));
        setSelectedId(null);
      }
    }
    
    if (e.key === 'd' && e.ctrlKey && selectedId) {
      e.preventDefault();
      duplicateElement(selectedId);
    }
  };

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
    
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };
  }, [selectedId, elements, dragging, dragElement, dragOffset, mode, canvasSize.width, canvasSize.height]);

  return (
    <div className="canvas-container">
      <div 
        ref={canvasRef}
        className="canvas" 
        style={{ 
          backgroundColor: canvasBg,
          width: canvasSize.width,
          height: canvasSize.height,
          position: 'relative',
          border: mode === 'design' ? '2px dashed #ccc' : '1px solid #e5e7eb',
          borderRadius: '8px',
          overflow: 'hidden',
          boxShadow: mode === 'design' ? '0 2px 8px rgba(0,0,0,0.03)' : 'none',
          cursor: dragging ? 'grabbing' : 'default',
          userSelect: dragging ? 'none' : 'auto'
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
          <div
            key={el.id}
            style={{
              position: 'absolute',
              left: el.x,
              top: el.y,
              width: el.width ? el.width : 'auto',
              height: el.height ? el.height : 'auto',
              cursor: mode === 'preview' ? 'default' : (dragging && dragElement?.id === el.id ? 'grabbing' : 'grab'),
              zIndex: selectedId === el.id ? 10 : 1,
              transition: dragging ? 'none' : 'all 0.2s ease'
            }}
            onMouseDown={(e) => onMouseDown(e, el)}
          >
            <Element
              el={el}
              selected={selectedId === el.id}
              updateElement={updateElement}
              mode={mode}
            />
            
            {/* Selection indicator */}
            {selectedId === el.id && mode === 'design' && (
              <div 
                className="selection-indicator"
                style={{
                  position: 'absolute',
                  top: -4,
                  left: -4,
                  right: -4,
                  bottom: -4,
                  border: '2px solid #2563eb',
                  borderRadius: '4px',
                  pointerEvents: 'none',
                  zIndex: 11
                }}
              />
            )}
          </div>
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

      {/* Canvas size indicator */}
      {mode === 'design' && (
        <div 
          className="canvas-info"
          style={{
            position: 'absolute',
            bottom: '-30px',
            right: '0',
            fontSize: '12px',
            color: '#6b7280',
            backgroundColor: '#f9fafb',
            padding: '4px 8px',
            borderRadius: '4px',
            border: '1px solid #e5e7eb'
          }}
        >
          {canvasSize.width} × {canvasSize.height}px
        </div>
      )}
    </div>
  );
}
