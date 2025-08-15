# Component Builder - MVP

A simple drag and drop component editor for creating web designs with real-time preview.

## 🚀 Features

### Core Functionality
- **Drag & Drop Interface**: Intuitive component placement and positioning
- **Real-time Preview**: Switch between design and preview modes instantly
- **Auto-save**: Your work is automatically saved to local storage
- **Simple Interface**: Clean and focused user experience

### Component Library
- **Text**: Editable text elements with styling options
- **Image**: Image display with file upload
- **Button**: Interactive button components

### Styling Options
- **Typography**: Font size, color, alignment
- **Layout**: Width and height customization
- **Colors**: Text and background colors
- **Canvas Settings**: Background color customization

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
2. **Click on any component** to add it to your canvas
3. **Drag the component** to position it where you want

### Editing Components
1. **Select a component** by clicking on it
2. **Use the properties panel** on the right to customize:
   - **Font size**: Adjust text size
   - **Colors**: Change text and background colors
   - **Alignment**: Set text alignment
   - **Dimensions**: Modify width and height
3. **Click text elements** to edit content directly

### Canvas Management
- **Change background color** in the properties panel when no element is selected
- **Switch to preview mode** to see your design without editing controls

### Saving and Loading
- **Auto-save**: Your work is automatically saved to local storage
- **Clear**: Use the "Clear" button to reset your design

## 🛠️ Technical Details

### Built With
- **React 19** - Modern React with hooks
- **Vite** - Fast build tool and dev server
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
- **Image**: Image display with file upload
- **Button**: Interactive button components

## 🎨 Design System

### Color Palette
- **Primary**: #2563eb (Blue)
- **Danger**: #ef4444 (Red)
- **Neutral**: Various grays for text and borders

### Typography
- **Font Family**: Inter, system fonts
- **Font Sizes**: Configurable range
- **Font Colors**: Customizable

### Spacing
- **Grid**: 10px snap grid for precise positioning
- **Canvas**: Fixed 900x640px canvas size

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

## 📝 License

This project is open source and available under the [MIT License](LICENSE).

## 🆘 Support

If you encounter any issues or have questions:
1. Check the browser console for errors
2. Ensure all dependencies are installed
3. Try clearing your browser's local storage
4. Create an issue with detailed steps to reproduce

---

**Happy Designing! 🎨✨**
