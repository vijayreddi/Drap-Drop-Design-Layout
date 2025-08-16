# Component Builder

A drag-and-drop WYSIWYG editor for creating web designs with real-time preview.

## What It Does

- **Drag & Drop**: Place text, images, and buttons on a canvas
- **Real-time Editing**: Click text/buttons to edit content directly
- **Styling Controls**: Customize fonts, colors, sizes via properties panel
- **Preview Mode**: Switch between design and preview instantly
- **Auto-save**: Work is automatically saved to localStorage

## How to Use

1. **Add Elements**: Click component buttons in left sidebar
2. **Position**: Drag elements around the canvas
3. **Edit Content**: Click on text/button elements to edit
4. **Style**: Select element → use right panel to customize
5. **Preview**: Toggle preview mode to see final design

## Tech Stack

- **React 19** - UI framework
- **@dnd-kit** - Drag and drop functionality
- **Vite** - Build tool
- **LocalStorage** - Data persistence

## Folder Structure

```
src/
├── components/
│   ├── elements/           # Individual element components
│   │   ├── TextElement.jsx
│   │   ├── ImageElement.jsx
│   │   ├── ButtonElement.jsx
│   │   └── index.js
│   ├── Canvas.jsx          # Main canvas with drag-drop
│   ├── Container.jsx       # Wrapper for draggable elements
│   ├── Element.jsx         # Element type router
│   ├── PropertiesPanel.jsx # Styling controls
│   └── Toolbar.jsx         # Component library
├── utils/
│   ├── constants.js        # App constants & defaults
│   └── storage.js          # LocalStorage utilities
├── App.jsx                 # Main app component
└── main.jsx               # Entry point
```

## Component Usage

### App.jsx
- **State Management**: Elements, selection, mode, canvas background
- **Element Operations**: Add, update, remove elements
- **Data Persistence**: Auto-save to localStorage

### Canvas.jsx
- **Drag & Drop**: Handles element positioning with @dnd-kit
- **Grid Snapping**: 10px grid alignment in design mode
- **Boundary Constraints**: Elements stay within canvas bounds

### Container.jsx
- **Element Wrapper**: Provides drag functionality and selection
- **Visual Feedback**: Shows dotted borders (unselected) / solid borders (selected)
- **Text Editing Coordination**: Disables drag during text editing

### Element.jsx
- **Type Router**: Switch case to render different element types
- **Scalable**: Easy to add new element types

### Element Components (TextElement, ImageElement, ButtonElement)
- **Specialized Rendering**: Each handles its specific functionality
- **Inline Editing**: Text/button elements support contentEditable
- **Styling**: Apply user-defined styles and defaults

### PropertiesPanel.jsx
- **Dynamic Controls**: Shows different options based on selected element
- **Real-time Updates**: Changes apply immediately
- **Constants Usage**: Uses centralized constants for options

### Toolbar.jsx
- **Component Library**: Buttons to add new elements
- **File Upload**: Hidden input for image selection

## Quick Start

```bash
npm install
npm run dev
```

Open `http://localhost:5173` and start building!
