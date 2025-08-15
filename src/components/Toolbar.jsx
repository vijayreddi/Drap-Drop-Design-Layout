import React, { useRef, useState } from 'react';

/**
 * Enhanced Toolbar: Add various components with categories
 * props: onAdd(type, payload)
 */
export default function Toolbar({ onAdd }){
  const fileRef = useRef();
  const [activeCategory, setActiveCategory] = useState('basic');

  const componentCategories = {
    basic: [
      {
        name: 'Text',
        icon: '📝',
        action: () => onAdd('text', { 
          x: 40, y: 40, 
          content: 'Double-click to edit', 
          style: { fontSize: 18, color: '#111', textAlign: 'left' }
        })
      },
      {
        name: 'Heading',
        icon: '📋',
        action: () => onAdd('heading', { 
          x: 40, y: 40, 
          content: 'Heading Text', 
          style: { fontSize: 32, color: '#111', fontWeight: 'bold', textAlign: 'left' }
        })
      },
      {
        name: 'Button',
        icon: '🔘',
        action: () => onAdd('button', { 
          x: 60, y: 60, 
          content: 'Click me', 
          style: { fontSize: 16, color: '#fff', backgroundColor:'#2563eb', borderRadius: '8px', padding: '8px 16px' }
        })
      },
      {
        name: 'Image',
        icon: '🖼️',
        action: () => {
          fileRef.current && fileRef.current.click();
        }
      }
    ],
    layout: [
      {
        name: 'Container',
        icon: '📦',
        action: () => onAdd('container', { 
          x: 40, y: 40, 
          width: 300, height: 200,
          style: { backgroundColor: '#f8f9fa', border: '1px solid #e9ecef', borderRadius: '8px', padding: '16px' }
        })
      },
      {
        name: 'Divider',
        icon: '➖',
        action: () => onAdd('divider', { 
          x: 40, y: 40, 
          width: 300, height: 2,
          style: { backgroundColor: '#e9ecef', border: 'none' }
        })
      },
      {
        name: 'Spacer',
        icon: '⬜',
        action: () => onAdd('spacer', { 
          x: 40, y: 40, 
          width: 300, height: 40,
          style: { backgroundColor: 'transparent' }
        })
      }
    ],
    media: [
      {
        name: 'Video',
        icon: '🎥',
        action: () => onAdd('video', { 
          x: 40, y: 40, 
          width: 400, height: 225,
          src: 'https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_1mb.mp4',
          style: { borderRadius: '8px' }
        })
      },
      {
        name: 'Icon',
        icon: '⭐',
        action: () => onAdd('icon', { 
          x: 40, y: 40, 
          width: 48, height: 48,
          content: '⭐',
          style: { fontSize: 32, textAlign: 'center', display: 'flex', alignItems: 'center', justifyContent: 'center' }
        })
      }
    ],
    form: [
      {
        name: 'Input',
        icon: '📝',
        action: () => onAdd('input', { 
          x: 40, y: 40, 
          width: 200, height: 40,
          content: 'Enter text...',
          style: { 
            border: '1px solid #d1d5db', 
            borderRadius: '6px', 
            padding: '8px 12px',
            fontSize: 14,
            backgroundColor: '#fff'
          }
        })
      },
      {
        name: 'Textarea',
        icon: '📄',
        action: () => onAdd('textarea', { 
          x: 40, y: 40, 
          width: 300, height: 100,
          content: 'Enter your message...',
          style: { 
            border: '1px solid #d1d5db', 
            borderRadius: '6px', 
            padding: '8px 12px',
            fontSize: 14,
            backgroundColor: '#fff',
            resize: 'vertical'
          }
        })
      }
    ]
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
        <h3>Component Library</h3>
        <p className="toolbar-subtitle">Drag or click to add components</p>
      </div>

      {/* Category Tabs */}
      <div className="category-tabs">
        {Object.keys(componentCategories).map(category => (
          <button
            key={category}
            className={`category-tab ${activeCategory === category ? 'active' : ''}`}
            onClick={() => setActiveCategory(category)}
          >
            {category.charAt(0).toUpperCase() + category.slice(1)}
          </button>
        ))}
      </div>

      {/* Component Grid */}
      <div className="component-grid">
        {componentCategories[activeCategory].map((component, index) => (
          <button
            key={index}
            className="component-item"
            onClick={component.action}
            title={component.name}
          >
            <span className="component-icon">{component.icon}</span>
            <span className="component-name">{component.name}</span>
          </button>
        ))}
      </div>

      <input ref={fileRef} type="file" accept="image/*" style={{display:'none'}} onChange={onFile} />

      {/* Quick Tips */}
      <div className="toolbar-tips">
        <h4>💡 Quick Tips</h4>
        <ul>
          <li>Double-click text elements to edit</li>
          <li>Drag elements to reposition</li>
          <li>Use Ctrl+Z to undo changes</li>
          <li>Select elements to customize styles</li>
        </ul>
      </div>
    </div>
  );
}
