import React from 'react';

/**
 * MVP Properties panel with basic styling options
 * - If selected element: show type-specific controls
 * - Otherwise show canvas background control
 */
const PropertiesPanel = ({ selected, updateElement, removeElement, canvasBg, setCanvasBg, mode }) => {
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
              <label>Font family</label>
              <select 
                value={selected.style?.fontFamily || 'inherit'} 
                onChange={(e)=>updateStyle({ fontFamily: e.target.value })}
              >
                <option value="inherit">System Default</option>
                <option value="Arial, sans-serif">Arial</option>
                <option value="Helvetica, sans-serif">Helvetica</option>
                <option value="Georgia, serif">Georgia</option>
                <option value="Times New Roman, serif">Times New Roman</option>
                <option value="Verdana, sans-serif">Verdana</option>
                <option value="Courier New, monospace">Courier New</option>
                <option value="Impact, sans-serif">Impact</option>
                <option value="Comic Sans MS, cursive">Comic Sans MS</option>
                <option value="Trebuchet MS, sans-serif">Trebuchet MS</option>
                <option value="Lucida Console, monospace">Lucida Console</option>
              </select>
            </div>

            <div className="property-group">
              <label>Font weight</label>
              <select 
                value={selected.style?.fontWeight || 'normal'} 
                onChange={(e)=>updateStyle({ fontWeight: e.target.value })}
              >
                <option value="normal">Normal (400)</option>
                <option value="bold">Bold (700)</option>
                <option value="100">Thin (100)</option>
                <option value="200">Extra Light (200)</option>
                <option value="300">Light (300)</option>
                <option value="400">Regular (400)</option>
                <option value="500">Medium (500)</option>
                <option value="600">Semi Bold (600)</option>
                <option value="700">Bold (700)</option>
                <option value="800">Extra Bold (800)</option>
                <option value="900">Black (900)</option>
              </select>
            </div>

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
          <>
            <div className="property-group">
              <label>Background color</label>
              <input 
                type="color" 
                value={selected.style?.backgroundColor || '#2563eb'} 
                onChange={(e)=>updateStyle({ backgroundColor: e.target.value })} 
              />
            </div>
            
            <div className="property-group">
              <label>Border radius (px)</label>
              <input 
                type="number" 
                value={selected.style?.borderRadius || 8} 
                onChange={(e)=>updateStyle({ borderRadius: Number(e.target.value) })} 
              />
            </div>
            
            <div className="property-group">
              <label>Padding</label>
              <input 
                type="text" 
                value={selected.style?.padding || '8px 16px'} 
                onChange={(e)=>updateStyle({ padding: e.target.value })} 
                placeholder="8px 16px"
              />
            </div>
          </>
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
};

export default PropertiesPanel;
