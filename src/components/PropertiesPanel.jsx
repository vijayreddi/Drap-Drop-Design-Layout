import React, { useState } from 'react';

/**
 * Enhanced Properties panel with comprehensive styling options
 * - If selected element: show type-specific controls
 * - Otherwise show canvas background control
 */
export default function PropertiesPanel({ selected, updateElement, removeElement, duplicateElement, canvasBg, setCanvasBg, canvasSize, setCanvasSize, mode }) {
  const [activeTab, setActiveTab] = useState('layout');

  if (!selected) {
    return (
      <div className="properties">
        <h3 style={{margin:0}}>Canvas Settings</h3>
        
        <div className="property-group">
          <label>Background color</label>
          <input type="color" value={canvasBg} onChange={(e)=>setCanvasBg(e.target.value)} className="small" />
        </div>

        <div className="property-group">
          <label>Canvas width (px)</label>
          <input 
            type="number" 
            value={canvasSize.width} 
            onChange={(e)=>setCanvasSize(prev => ({...prev, width: Number(e.target.value)}))} 
          />
        </div>

        <div className="property-group">
          <label>Canvas height (px)</label>
          <input 
            type="number" 
            value={canvasSize.height} 
            onChange={(e)=>setCanvasSize(prev => ({...prev, height: Number(e.target.value)}))} 
          />
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

  const tabs = [
    { id: 'layout', label: 'Layout', icon: '📐' },
    { id: 'typography', label: 'Typography', icon: '📝' },
    { id: 'colors', label: 'Colors', icon: '🎨' },
    { id: 'effects', label: 'Effects', icon: '✨' }
  ];

  return (
    <div className="properties">
      <div className="properties-header">
        <h3 style={{margin:0}}>Properties</h3>
        <div className="element-type">{selected.type}</div>
      </div>

      {/* Action Buttons */}
      <div className="action-buttons">
        <button onClick={()=>duplicateElement(selected.id)} className="action-btn">
          📋 Duplicate
        </button>
        <button onClick={()=>removeElement(selected.id)} className="action-btn danger">
          🗑️ Delete
        </button>
      </div>

      {/* Tab Navigation */}
      <div className="property-tabs">
        {tabs.map(tab => (
          <button
            key={tab.id}
            className={`property-tab ${activeTab === tab.id ? 'active' : ''}`}
            onClick={() => setActiveTab(tab.id)}
          >
            {tab.icon} {tab.label}
          </button>
        ))}
      </div>

      {/* Layout Tab */}
      {activeTab === 'layout' && (
        <div className="property-content">
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

          <div className="property-group">
            <label>Padding (px)</label>
            <input 
              type="text" 
              value={selected.style?.padding || '8px'} 
              onChange={(e)=>updateStyle({ padding: e.target.value })} 
              placeholder="8px 16px"
            />
          </div>

          <div className="property-group">
            <label>Margin (px)</label>
            <input 
              type="text" 
              value={selected.style?.margin || '0px'} 
              onChange={(e)=>updateStyle({ margin: e.target.value })} 
              placeholder="0px"
            />
          </div>

          <div className="property-group">
            <label>Border radius (px)</label>
            <input 
              type="text" 
              value={selected.style?.borderRadius || '0px'} 
              onChange={(e)=>updateStyle({ borderRadius: e.target.value })} 
              placeholder="8px"
            />
          </div>

          <div className="property-group">
            <label>Border</label>
            <input 
              type="text" 
              value={selected.style?.border || 'none'} 
              onChange={(e)=>updateStyle({ border: e.target.value })} 
              placeholder="1px solid #ccc"
            />
          </div>
        </div>
      )}

      {/* Typography Tab */}
      {activeTab === 'typography' && (
        <div className="property-content">
          {(selected.type === 'text' || selected.type === 'heading' || selected.type === 'button') && (
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
                <label>Font weight</label>
                <select 
                  value={selected.style?.fontWeight || 'normal'} 
                  onChange={(e)=>updateStyle({ fontWeight: e.target.value })}
                >
                  <option value="normal">Normal</option>
                  <option value="bold">Bold</option>
                  <option value="lighter">Light</option>
                </select>
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
                  <option value="justify">Justify</option>
                </select>
              </div>
            </>
          )}

          {(selected.type === 'input' || selected.type === 'textarea') && (
            <div className="property-group">
              <label>Placeholder text</label>
              <input 
                type="text" 
                value={selected.content || ''} 
                onChange={(e)=>updateElement(selected.id, { content: e.target.value })} 
                placeholder="Enter placeholder text"
              />
            </div>
          )}
        </div>
      )}

      {/* Colors Tab */}
      {activeTab === 'colors' && (
        <div className="property-content">
          <div className="property-group">
            <label>Text color</label>
            <input 
              type="color" 
              value={selected.style?.color || '#111'} 
              onChange={(e)=>updateStyle({ color: e.target.value })} 
            />
          </div>

          <div className="property-group">
            <label>Background color</label>
            <input 
              type="color" 
              value={selected.style?.backgroundColor || 'transparent'} 
              onChange={(e)=>updateStyle({ backgroundColor: e.target.value })} 
            />
          </div>

          <div className="property-group">
            <label>Border color</label>
            <input 
              type="color" 
              value={selected.style?.borderColor || '#ccc'} 
              onChange={(e)=>updateStyle({ borderColor: e.target.value })} 
            />
          </div>
        </div>
      )}

      {/* Effects Tab */}
      {activeTab === 'effects' && (
        <div className="property-content">
          <div className="property-group">
            <label>Box shadow</label>
            <select 
              value={selected.style?.boxShadow || 'none'} 
              onChange={(e)=>updateStyle({ boxShadow: e.target.value })}
            >
              <option value="none">None</option>
              <option value="0 2px 4px rgba(0,0,0,0.1)">Light</option>
              <option value="0 4px 8px rgba(0,0,0,0.15)">Medium</option>
              <option value="0 8px 16px rgba(0,0,0,0.2)">Heavy</option>
            </select>
          </div>

          <div className="property-group">
            <label>Opacity</label>
            <input 
              type="range" 
              min="0" 
              max="1" 
              step="0.1" 
              value={selected.style?.opacity || 1} 
              onChange={(e)=>updateStyle({ opacity: Number(e.target.value) })} 
            />
            <span style={{fontSize: '12px', color: '#666'}}>
              {Math.round((selected.style?.opacity || 1) * 100)}%
            </span>
          </div>

          <div className="property-group">
            <label>Transform</label>
            <select 
              value={selected.style?.transform || 'none'} 
              onChange={(e)=>updateStyle({ transform: e.target.value })}
            >
              <option value="none">None</option>
              <option value="rotate(5deg)">Rotate 5°</option>
              <option value="rotate(-5deg)">Rotate -5°</option>
              <option value="scale(1.1)">Scale 110%</option>
              <option value="scale(0.9)">Scale 90%</option>
            </select>
          </div>
        </div>
      )}

      {/* Special controls for specific element types */}
      {selected.type === 'image' && (
        <div className="property-content">
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
        </div>
      )}

      {selected.type === 'video' && (
        <div className="property-content">
          <div className="property-group">
            <label>Video URL</label>
            <input 
              type="text" 
              value={selected.src || ''} 
              onChange={(e)=>updateElement(selected.id, { src: e.target.value })} 
              placeholder="https://example.com/video.mp4"
            />
          </div>
        </div>
      )}

      {mode === 'preview' && (
        <div style={{marginTop:12, fontSize:13, color:'#666', padding: '8px', backgroundColor: '#f0f6ff', borderRadius: '4px'}}>
          Preview mode: editing disabled
        </div>
      )}
    </div>
  );
}
