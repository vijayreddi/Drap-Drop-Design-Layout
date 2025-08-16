import React from 'react';
import { 
  FONT_FAMILIES, 
  FONT_WEIGHTS, 
  TEXT_ALIGNMENTS, 
  DEFAULTS 
} from '../utils/constants';

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
                value={selected.style?.fontFamily || DEFAULTS.FONT_FAMILY} 
                onChange={(e)=>updateStyle({ fontFamily: e.target.value })}
              >
                {FONT_FAMILIES.map(font => (
                  <option key={font.value} value={font.value}>
                    {font.label}
                  </option>
                ))}
              </select>
            </div>

            <div className="property-group">
              <label>Font weight</label>
              <select 
                value={selected.style?.fontWeight || DEFAULTS.FONT_WEIGHT} 
                onChange={(e)=>updateStyle({ fontWeight: e.target.value })}
              >
                {FONT_WEIGHTS.map(weight => (
                  <option key={weight.value} value={weight.value}>
                    {weight.label}
                  </option>
                ))}
              </select>
            </div>

            <div className="property-group">
              <label>Font size (px)</label>
              <input 
                type="number" 
                value={selected.style?.fontSize || DEFAULTS.FONT_SIZE} 
                onChange={(e)=>updateStyle({ fontSize: Number(e.target.value) })} 
              />
            </div>

            <div className="property-group">
              <label>Text color</label>
              <input 
                type="color" 
                value={selected.style?.color || DEFAULTS.TEXT_COLOR} 
                onChange={(e)=>updateStyle({ color: e.target.value })} 
              />
            </div>

            <div className="property-group">
              <label>Text align</label>
              <select 
                value={selected.style?.textAlign || DEFAULTS.TEXT_ALIGN} 
                onChange={(e)=>updateStyle({ textAlign: e.target.value })}
              >
                {TEXT_ALIGNMENTS.map(alignment => (
                  <option key={alignment.value} value={alignment.value}>
                    {alignment.label}
                  </option>
                ))}
              </select>
            </div>
          </>
        )}

        {selected.type === 'button' && (
          <>
            <div className="property-group">
              <label>Button text</label>
              <input 
                type="text" 
                value={selected.content || ''} 
                onChange={(e) => {
                  console.log('Button text input:', e.target.value);
                  // Always set the content, even if empty
                  updateElement(selected.id, { content: e.target.value });
                }}
                placeholder={DEFAULTS.BUTTON_TEXT}
              />
            </div>

            <div className="property-group">
              <label>Background color</label>
              <input 
                type="color" 
                value={selected.style?.backgroundColor || DEFAULTS.BUTTON_BACKGROUND} 
                onChange={(e)=>updateStyle({ backgroundColor: e.target.value })} 
              />
            </div>
            
            <div className="property-group">
              <label>Border radius (px)</label>
              <input 
                type="number" 
                min="0"
                value={selected.style?.borderRadius || DEFAULTS.BUTTON_BORDER_RADIUS} 
                onChange={(e) => {
                  const value = e.target.value === '' ? DEFAULTS.BUTTON_BORDER_RADIUS : Number(e.target.value);
                  updateStyle({ borderRadius: value });
                }}
              />
            </div>
            
            <div className="property-group">
              <label>Padding</label>
              <input 
                type="text" 
                value={selected.style?.padding || DEFAULTS.BUTTON_PADDING} 
                onChange={(e)=>updateStyle({ padding: e.target.value })} 
                placeholder={DEFAULTS.BUTTON_PADDING}
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
