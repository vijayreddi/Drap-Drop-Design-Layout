import React, { useState, useEffect, useCallback } from 'react';
import Toolbar from './components/Toolbar';
import Canvas from './components/Canvas';
import PropertiesPanel from './components/PropertiesPanel';

/**
 * Simple id generator for MVP
 */
const id = () => `${Date.now().toString(36)}-${Math.random().toString(36).slice(2,8)}`;

const initialElements = []; // start empty

// Undo/Redo functionality
const useUndoRedo = (initialState) => {
  const [state, setState] = useState(initialState);
  const [history, setHistory] = useState([initialState]);
  const [currentIndex, setCurrentIndex] = useState(0);

  const updateState = useCallback((newState) => {
    setState(newState);
    setHistory(prev => [...prev.slice(0, currentIndex + 1), newState]);
    setCurrentIndex(prev => prev + 1);
  }, [currentIndex]);

  const undo = useCallback(() => {
    if (currentIndex > 0) {
      setCurrentIndex(prev => prev - 1);
      setState(history[currentIndex - 1]);
    }
  }, [currentIndex, history]);

  const redo = useCallback(() => {
    if (currentIndex < history.length - 1) {
      setCurrentIndex(prev => prev + 1);
      setState(history[currentIndex + 1]);
    }
  }, [currentIndex, history]);

  return [state, updateState, undo, redo, currentIndex > 0, currentIndex < history.length - 1];
};

export default function App(){
  const [elementsState, setElementsState] = useState(() => {
    try {
      const raw = localStorage.getItem('wysiwyg:elements');
      return raw ? JSON.parse(raw) : initialElements;
    } catch {
      return initialElements;
    }
  });

  const [elements, setElements, undo, redo, canUndo, canRedo] = useUndoRedo(elementsState);

  // Update elementsState when elements change from undo/redo
  useEffect(() => {
    setElementsState(elements);
  }, [elements]);

  const [selectedId, setSelectedId] = useState(null);
  const [mode, setMode] = useState('design'); // design | preview
  const [canvasBg, setCanvasBg] = useState(() => {
    return localStorage.getItem('wysiwyg:canvasBg') || '#ffffff';
  });
  const [canvasSize, setCanvasSize] = useState(() => {
    try {
      const saved = localStorage.getItem('wysiwyg:canvasSize');
      return saved ? JSON.parse(saved) : { width: 900, height: 640 };
    } catch {
      return { width: 900, height: 640 };
    }
  });

  useEffect(() => {
    localStorage.setItem('wysiwyg:elements', JSON.stringify(elements));
  }, [elements]);

  useEffect(() => {
    localStorage.setItem('wysiwyg:canvasBg', canvasBg);
  }, [canvasBg]);

  useEffect(() => {
    localStorage.setItem('wysiwyg:canvasSize', JSON.stringify(canvasSize));
  }, [canvasSize]);

  const addElement = (type, payload) => {
    const el = {
      id: id(),
      type,
      x: payload?.x ?? 40,
      y: payload?.y ?? 40,
      width: payload?.width ?? 200,
      height: payload?.height ?? 60,
      content: payload?.content ?? (type === 'text' ? 'Double-click to edit' : type === 'button' ? 'Click me' : ''),
      src: payload?.src || '',
      style: payload?.style || { 
        fontSize: 16, 
        color: '#111',
        backgroundColor: type === 'button' ? '#2563eb' : 'transparent',
        border: 'none',
        borderRadius: type === 'button' ? '8px' : '0px',
        padding: type === 'button' ? '8px 16px' : '8px',
        margin: '0px',
        boxShadow: 'none',
        textAlign: 'left'
      }
    };
    setElements(prev => [...prev, el]);
    setSelectedId(el.id);
  };

  const updateElement = (idToUpdate, patch) => {
    setElements(prev => prev.map(e => e.id === idToUpdate ? {...e, ...patch, style: {...e.style, ...(patch.style||{})}} : e));
  };

  const removeElement = (idToRemove) => {
    setElements(prev => prev.filter(e => e.id !== idToRemove));
    if (selectedId === idToRemove) setSelectedId(null);
  };

  const clearAll = () => {
    setElements([]);
    setSelectedId(null);
  };

  const duplicateElement = (idToDuplicate) => {
    const element = elements.find(e => e.id === idToDuplicate);
    if (element) {
      const newElement = {
        ...element,
        id: id(),
        x: element.x + 20,
        y: element.y + 20
      };
      setElements(prev => [...prev, newElement]);
      setSelectedId(newElement.id);
    }
  };

  const exportDesign = () => {
    const design = {
      elements,
      canvasBg,
      canvasSize,
      exportDate: new Date().toISOString()
    };
    const blob = new Blob([JSON.stringify(design, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `design-${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const importDesign = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const design = JSON.parse(e.target.result);
          setElements(design.elements || []);
          setCanvasBg(design.canvasBg || '#ffffff');
          setCanvasSize(design.canvasSize || { width: 900, height: 640 });
          setSelectedId(null);
        } catch (error) {
          alert('Invalid design file');
        }
      };
      reader.readAsText(file);
    }
    event.target.value = '';
  };

  return (
    <div className="app">
      <header className="header">
        <div style={{display:'flex', gap:12, alignItems:'center'}}>
          <h2 style={{margin:0}}>Component Builder</h2>
          <div style={{color:'#666', fontSize:13}}>• Drag & Drop Editor</div>
          {mode === 'preview' && <div className="previewBadge">Preview mode</div>}
        </div>

        <div style={{display:'flex', gap:8, alignItems:'center'}}>
          <button 
            onClick={undo} 
            disabled={!canUndo}
            className="header-btn"
            title="Undo (Ctrl+Z)"
          >
            ↶ Undo
          </button>
          <button 
            onClick={redo} 
            disabled={!canRedo}
            className="header-btn"
            title="Redo (Ctrl+Y)"
          >
            ↷ Redo
          </button>
          <button onClick={() => setMode(prev => prev === 'design' ? 'preview' : 'design')}>
            {mode === 'design' ? '👁️ Preview' : '✏️ Back to Edit'}
          </button>
          <button onClick={exportDesign} className="header-btn">
            💾 Export
          </button>
          <label className="header-btn" style={{cursor: 'pointer'}}>
            📁 Import
            <input 
              type="file" 
              accept=".json" 
              onChange={importDesign} 
              style={{display: 'none'}} 
            />
          </label>
          <button 
            onClick={() => { clearAll(); localStorage.removeItem('wysiwyg:elements'); }}
            className="header-btn danger"
          >
            🗑️ Clear
          </button>
        </div>
      </header>

      <div className="container">
        <aside className="sidebar">
          <Toolbar onAdd={addElement} />
        </aside>

        <main className="main">
          <Canvas
            elements={elements}
            setElements={setElements}
            updateElement={updateElement}
            selectedId={selectedId}
            setSelectedId={setSelectedId}
            mode={mode}
            canvasBg={canvasBg}
            canvasSize={canvasSize}
            setCanvasSize={setCanvasSize}
            duplicateElement={duplicateElement}
          />
        </main>

        <aside className="rightpanel">
          <PropertiesPanel
            selected={elements.find(e => e.id === selectedId)}
            updateElement={updateElement}
            removeElement={removeElement}
            duplicateElement={duplicateElement}
            canvasBg={canvasBg}
            setCanvasBg={setCanvasBg}
            canvasSize={canvasSize}
            setCanvasSize={setCanvasSize}
            mode={mode}
          />
        </aside>
      </div>
    </div>
  );
}
