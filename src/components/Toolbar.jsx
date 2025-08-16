import React, { useRef } from 'react';
import { FiType, FiImage, FiSquare, FiInfo } from 'react-icons/fi';

/**
 * MVP Toolbar: Add text, image, button only
 * props: onAdd(type, payload)
 */
const Toolbar = ({ onAdd }) => {
  const fileRef = useRef();

  const addText = () => onAdd('text', { 
    x: 40, y: 40, 
    content: 'Click to edit text', 
    style: { fontSize: 18, color: '#111', textAlign: 'left' }
  });

  const addButton = () => onAdd('button', { 
    x: 60, y: 60, 
    content: 'Click to edit button', 
    style: { fontSize: 16, color: '#fff', backgroundColor:'#2563eb', borderRadius: '8px', padding: '8px 16px' }
  });

  const onAddImageClick = () => {
    fileRef.current && fileRef.current.click();
  };

  const onFile = (e) => {
    const f = e.target.files && e.target.files[0];
    if (!f) return;
    const url = URL.createObjectURL(f);
    onAdd('image', { x: 80, y: 80, src: url, width: 300, height: 180 });
    e.target.value = '';
  };

  return (
    <div className="toolbar">
      <div className="toolbar-header">
        <h3>Add Components</h3>
        <p className="toolbar-subtitle">Click to add components</p>
      </div>

      <div className="component-grid">
        <button className="component-item" onClick={addText} title="Text">
          <FiType className="component-icon" />
          <span className="component-name">Text</span>
        </button>
        
        <button className="component-item" onClick={onAddImageClick} title="Image">
          <FiImage className="component-icon" />
          <span className="component-name">Image</span>
        </button>
        
        <button className="component-item" onClick={addButton} title="Button">
          <FiSquare className="component-icon" />
          <span className="component-name">Button</span>
        </button>
      </div>

      <input ref={fileRef} type="file" accept="image/*" style={{display:'none'}} onChange={onFile} />

      <div className="toolbar-tips">
        <h4><FiInfo /> Quick Tips</h4>
        <ul>
          <li>Click text elements to edit</li>
          <li>Drag elements to reposition</li>
          <li>Select elements to customize styles</li>
        </ul>
      </div>
    </div>
  );
};

export default Toolbar;
