import React from 'react';

/**
 * MVP Properties panel with basic styling options
 * - If selected element: show type-specific controls
 * - Otherwise show canvas background control
 */
export default function PropertiesPanel({ selected, updateElement, removeElement, canvasBg, setCanvasBg, mode }) {
  if (!selected) {
    return (
      <div className="properties">
        <h3 style={{margin:0}}>Canvas Settings</h3>
        
        <div className="property-group">
          <label>Background color</label>
          <input type="color" value={canvasBg} onChange={(e)=>setCanvasBg(e.target.value)} className="small" />
        </div>

        <div style={{marginTop:12, fontSize:13, color:'#555'}}>
          Select an element to customize its properties
        </div>
      </div>
    );
  }

  const updateStyle = (patch) => {
    updateElement(selected.id, { style: { ...selected.style, ...patch } });
  };

  return (
    <div className="properties">
      <div className="properties-header">
        <h3 style={{margin:0}}>Properties</h3>
        <div className="element-type">{selected.type}</div>
      </div>

      {/* Action Buttons */}
      <div className="action-buttons">
        <button onClick={()=>removeElement(selected.id)} className="action-btn danger">
          🗑️ Delete
        </button>
      </div>

      {/* Basic Styling Options */}
      <div className="property-content">
        {(selected.type === 'text' || selected.type === 'button') && (
          <>
            <div className="property-group">
              <label>Font size (px)</label>
              <input 
                type="number" 
                value={selected.style?.fontSize || 16} 
                onChange={(e)=>updateStyle({ fontSize: Number(e.target.value) })} 
              />
            </div>

            <div className="property-group">
              <label>Text color</label>
              <input 
                type="color" 
                value={selected.style?.color || '#111'} 
                onChange={(e)=>updateStyle({ color: e.target.value })} 
              />
            </div>

            <div className="property-group">
              <label>Text align</label>
              <select 
                value={selected.style?.textAlign || 'left'} 
                onChange={(e)=>updateStyle({ textAlign: e.target.value })}
              >
                <option value="left">Left</option>
                <option value="center">Center</option>
                <option value="right">Right</option>
              </select>
            </div>
          </>
        )}

        {selected.type === 'button' && (
          <div className="property-group">
            <label>Background color</label>
            <input 
              type="color" 
              value={selected.style?.backgroundColor || '#2563eb'} 
              onChange={(e)=>updateStyle({ backgroundColor: e.target.value })} 
            />
          </div>
        )}

        {selected.type === 'image' && (
          <div className="property-group">
            <label>Replace image</label>
            <input 
              type="file" 
              accept="image/*" 
              onChange={(e)=> {
                const f = e.target.files && e.target.files[0];
                if (!f) return;
                const url = URL.createObjectURL(f);
                updateElement(selected.id, { src: url });
              }} 
            />
          </div>
        )}

        <div className="property-group">
          <label>Width (px)</label>
          <input 
            type="number" 
            value={selected.width || ''} 
            onChange={(e)=>updateElement(selected.id, { width: Number(e.target.value) })} 
          />
        </div>

        <div className="property-group">
          <label>Height (px)</label>
          <input 
            type="number" 
            value={selected.height || ''} 
            onChange={(e)=>updateElement(selected.id, { height: Number(e.target.value) })} 
          />
        </div>
      </div>

      {mode === 'preview' && (
        <div style={{marginTop:12, fontSize:13, color:'#666', padding: '8px', backgroundColor: '#f0f6ff', borderRadius: '4px'}}>
          Preview mode: editing disabled
        </div>
      )}
    </div>
  );
}
