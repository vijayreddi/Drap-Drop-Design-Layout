import React, { useState, useEffect } from 'react';
import { FiEye, FiEdit3, FiTrash2, FiLayers, FiSettings, FiGrid } from 'react-icons/fi';
import Toolbar from './components/Toolbar';
import Canvas from './components/Canvas';
import PropertiesPanel from './components/PropertiesPanel';
import { loadElements, saveElements, loadCanvasBg, saveCanvasBg, clearAllData } from './utils/storage.js';
import { DEFAULTS } from './utils/constants';


const id = () => `${Date.now().toString(36)}-${Math.random().toString(36).slice(2,8)}`;

const initialElements = []; 

const App = () => {
  const [elements, setElements] = useState(() => loadElements());
  const [selectedId, setSelectedId] = useState(null);
  const [mode, setMode] = useState('design'); // design | preview
  const [canvasBg, setCanvasBg] = useState(() => loadCanvasBg());

  useEffect(() => {
    saveElements(elements);
  }, [elements]);

  useEffect(() => {
    saveCanvasBg(canvasBg);
  }, [canvasBg]);

  const addElement = (type, payload) => {
    const newElement = {
      id: Date.now().toString(),
      type,
      x: 50,
      y: 50,
      width: payload?.width ?? (type === 'image' ? 300 : 200),
      height: payload?.height ?? (type === 'button' ? 50 : 60),
      content: payload?.content ?? (type === 'button' ? DEFAULTS.BUTTON_TEXT : 'Text'),
      src: payload?.src ?? 'https://via.placeholder.com/300x200',
      style: payload?.style ?? {}
    };
    setElements(prev => [...prev, newElement]);
    setSelectedId(newElement.id);
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
    clearAllData();
  };

  const switchMode = (newMode) => {
    if (newMode === mode) return;
    setMode(newMode);
  };

  return (
    <div className="app">
      <header className="header">
        <div style={{display:'flex', gap:12, alignItems:'center'}}>
          <div className="header-brand">
            <FiGrid className="brand-icon" />
            <h2 style={{margin:0}}>Component Builder</h2>
          </div>
          <div className="version-badge">MVP</div>
          {mode === 'preview' && <div className="previewBadge">Preview mode</div>}
        </div>

        <div style={{display:'flex', gap:8, alignItems:'center'}}>
          <div className="toggle-switch" data-mode={mode}>
            <div 
              className={`toggle-option ${mode === 'design' ? 'active' : ''}`}
              onClick={() => switchMode('design')}
            >
              <FiEdit3 />
              <span>Design</span>
            </div>
            <div 
              className={`toggle-option ${mode === 'preview' ? 'active' : ''}`}
              onClick={() => switchMode('preview')}
            >
              <FiEye />
              <span>Preview</span>
            </div>
          </div>
          <button 
            onClick={() => { clearAll(); }}
            className="header-btn danger"
          >
            <FiTrash2 />
            <span>Clear</span>
          </button>
        </div>
      </header>

      <div className="container">
        {mode === 'design' && (
          <aside className="sidebar">
            <Toolbar onAdd={addElement} />
          </aside>
        )}

        <main className="main">
          <Canvas
            elements={elements}
            setElements={setElements}
            updateElement={updateElement}
            selectedId={selectedId}
            setSelectedId={setSelectedId}
            mode={mode}
            canvasBg={canvasBg}
          />
        </main>

        {mode === 'design' && (
          <aside className="rightpanel">
            <PropertiesPanel
              selected={elements.find(e => e.id === selectedId)}
              updateElement={updateElement}
              removeElement={removeElement}
              canvasBg={canvasBg}
              setCanvasBg={setCanvasBg}
              mode={mode}
            />
          </aside>
        )}
      </div>
    </div>
  );
};

export default App;
