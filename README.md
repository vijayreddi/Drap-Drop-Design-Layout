# Component Builder - Drag & Drop Web Editor

A modern, feature-rich drag and drop component editor for creating web designs with real-time preview and comprehensive styling options.

## 🚀 Features

### Core Functionality
- **Drag & Drop Interface**: Intuitive component placement and positioning
- **Real-time Preview**: Switch between design and preview modes instantly
- **Undo/Redo**: Full history management with keyboard shortcuts
- **Export/Import**: Save and load your designs as JSON files
- **Responsive Design**: Works on desktop and mobile devices

### Component Library
- **Basic Elements**: Text, Headings, Buttons, Images
- **Layout Components**: Containers, Dividers, Spacers
- **Media Elements**: Videos, Icons
- **Form Elements**: Input fields, Textareas

### Styling Options
- **Typography**: Font size, weight, alignment, color
- **Layout**: Width, height, padding, margin, border radius
- **Colors**: Text, background, and border colors
- **Effects**: Box shadows, opacity, transforms
- **Canvas Settings**: Background color and size customization

### Advanced Features
- **Grid Snapping**: Precise positioning with 10px grid
- **Component Duplication**: Quick copy with Ctrl+D
- **Keyboard Shortcuts**: Delete, Undo, Redo, Duplicate
- **Selection Indicators**: Visual feedback for selected elements
- **Empty State**: Helpful guidance for new users

## 🎯 Getting Started

### Prerequisites
- Node.js (version 16 or higher)
- npm or yarn package manager

### Installation

1. **Clone or download the project**
   ```bash
   git clone <repository-url>
   cd my-react-app
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:5173` to start using the editor

## 🎨 How to Use

### Adding Components
1. **Browse the component library** on the left sidebar
2. **Select a category** (Basic, Layout, Media, Form)
3. **Click on any component** to add it to your canvas
4. **Drag the component** to position it where you want

### Editing Components
1. **Select a component** by clicking on it
2. **Use the properties panel** on the right to customize:
   - **Layout**: Adjust size, padding, margins
   - **Typography**: Change fonts, colors, alignment
   - **Colors**: Modify text, background, and border colors
   - **Effects**: Add shadows, opacity, transforms
3. **Double-click text elements** to edit content directly

### Canvas Management
- **Change canvas size** in the properties panel when no element is selected
- **Modify background color** using the color picker
- **Switch to preview mode** to see your design without editing controls

### Keyboard Shortcuts
- `Ctrl + Z` - Undo
- `Ctrl + Y` - Redo
- `Delete` - Remove selected element
- `Ctrl + D` - Duplicate selected element
- `Escape` - Deselect current element

### Saving and Loading
- **Export**: Click the "💾 Export" button to download your design as JSON
- **Import**: Click "📁 Import" to load a previously saved design
- **Auto-save**: Your work is automatically saved to local storage

## 🛠️ Technical Details

### Built With
- **React 19** - Modern React with hooks
- **Vite** - Fast build tool and dev server
- **react-draggable** - Drag and drop functionality
- **CSS Grid & Flexbox** - Modern layout system
- **Local Storage** - Persistent data storage

### Project Structure
```
src/
├── components/
│   ├── Canvas.jsx          # Main canvas with drag functionality
│   ├── Element.jsx         # Individual component renderer
│   ├── PropertiesPanel.jsx # Styling controls
│   └── Toolbar.jsx         # Component library
├── App.jsx                 # Main application component
├── index.css              # Global styles and variables
└── main.jsx               # Application entry point
```

### Component Types Supported
- **Text**: Editable text with rich styling
- **Heading**: Large, bold text elements
- **Button**: Interactive button components
- **Image**: Image display with file upload
- **Container**: Background containers for grouping
- **Divider**: Horizontal line separators
- **Spacer**: Empty space elements
- **Video**: HTML5 video players
- **Icon**: Large emoji or text icons
- **Input**: Form input fields
- **Textarea**: Multi-line text areas

## 🎨 Design System

### Color Palette
- **Primary**: #2563eb (Blue)
- **Danger**: #ef4444 (Red)
- **Success**: #10b981 (Green)
- **Warning**: #f59e0b (Orange)
- **Neutral**: Various grays for text and borders

### Typography
- **Font Family**: Inter, system fonts
- **Font Sizes**: 12px to 48px range
- **Font Weights**: Normal, Bold, Light

### Spacing
- **Grid**: 10px snap grid for precise positioning
- **Padding**: Configurable per component
- **Margins**: Adjustable spacing between elements

## 🔧 Customization

### Adding New Components
1. **Define the component** in `Toolbar.jsx`
2. **Add rendering logic** in `Element.jsx`
3. **Include styling options** in `PropertiesPanel.jsx`

### Modifying Styles
- **CSS Variables**: Edit `src/index.css` for theme changes
- **Component Styles**: Modify individual component styling
- **Responsive Design**: Adjust breakpoints for different screen sizes

## 🚀 Deployment

### Build for Production
```bash
npm run build
```

### Preview Production Build
```bash
npm run preview
```

### Deploy Options
- **Netlify**: Drag and drop the `dist` folder
- **Vercel**: Connect your repository for automatic deployment
- **GitHub Pages**: Configure for static hosting
- **Any static host**: Upload the `dist` folder contents

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📝 License

This project is open source and available under the [MIT License](LICENSE).

## 🆘 Support

If you encounter any issues or have questions:
1. Check the browser console for errors
2. Ensure all dependencies are installed
3. Try clearing your browser's local storage
4. Create an issue with detailed steps to reproduce

## 🎯 Roadmap

### Planned Features
- **Templates**: Pre-built design templates
- **Collaboration**: Real-time multi-user editing
- **Advanced Animations**: CSS animations and transitions
- **Component Library**: More pre-built components
- **Code Export**: Generate HTML/CSS code
- **Image Editor**: Basic image cropping and filters
- **Responsive Preview**: Test different screen sizes
- **Version History**: Track design iterations

---

**Happy Designing! 🎨✨**
