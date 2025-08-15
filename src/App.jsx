import React, { useState, useEffect } from 'react';
import Toolbar from './components/Toolbar';
import Canvas from './components/Canvas';
import PropertiesPanel from './components/PropertiesPanel';


const id = () => `${Date.now().toString(36)}-${Math.random().toString(36).slice(2,8)}`;

const initialElements = []; 

const App = () => {
  const [elements, setElements] = useState(() => {
    try {
      const raw = localStorage.getItem('wysiwyg:elements');
      return raw ? JSON.parse(raw) : initialElements;
    } catch {
      return initialElements;
    }
  });

  const [selectedId, setSelectedId] = useState(null);
  const [mode, setMode] = useState('design'); // design | preview
  const [canvasBg, setCanvasBg] = useState(() => {
    return localStorage.getItem('wysiwyg:canvasBg') || '#ffffff';
  });

  useEffect(() => {
    localStorage.setItem('wysiwyg:elements', JSON.stringify(elements));
  }, [elements]);

  useEffect(() => {
    localStorage.setItem('wysiwyg:canvasBg', canvasBg);
  }, [canvasBg]);

  const addElement = (type, payload) => {
    const el = {
      id: id(),
      type,
      x: payload?.x ?? 40,
      y: payload?.y ?? 40,
      width: payload?.width ?? 200,
      height: payload?.height ?? 60,
      content: payload?.content ?? (type === 'text' ? 'Click to edit text' : type === 'button' ? 'Click to edit button' : ''),
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

  return (
    <div className="app">
      <header className="header">
        <div style={{display:'flex', gap:12, alignItems:'center'}}>
          <h2 style={{margin:0}}>Component Builder</h2>
          <div style={{color:'#666', fontSize:13}}>• MVP</div>
          {mode === 'preview' && <div className="previewBadge">Preview mode</div>}
        </div>

        <div style={{display:'flex', gap:8, alignItems:'center'}}>
          <button onClick={() => setMode(prev => prev === 'design' ? 'preview' : 'design')}>
            {mode === 'design' ? '👁️ Preview' : '✏️ Back to Edit'}
          </button>
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
          />
        </main>

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
      </div>
    </div>
  );
};

export default App;
