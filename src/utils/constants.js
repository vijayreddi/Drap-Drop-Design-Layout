// Constants for Component Builder

// Font Family Options
export const FONT_FAMILIES = [
  { value: 'inherit', label: 'System Default' },
  { value: 'Arial, sans-serif', label: 'Arial' },
  { value: 'Helvetica, sans-serif', label: 'Helvetica' },
  { value: 'Georgia, serif', label: 'Georgia' },
  { value: 'Times New Roman, serif', label: 'Times New Roman' },
  { value: 'Verdana, sans-serif', label: 'Verdana' },
  { value: 'Courier New, monospace', label: 'Courier New' },
  { value: 'Impact, sans-serif', label: 'Impact' },
  { value: 'Comic Sans MS, cursive', label: 'Comic Sans MS' },
  { value: 'Trebuchet MS, sans-serif', label: 'Trebuchet MS' },
  { value: 'Lucida Console, monospace', label: 'Lucida Console' }
];

// Font Weight Options
export const FONT_WEIGHTS = [
  { value: 'normal', label: 'Normal (400)' },
  { value: 'bold', label: 'Bold (700)' },
  { value: '100', label: 'Thin (100)' },
  { value: '200', label: 'Extra Light (200)' },
  { value: '300', label: 'Light (300)' },
  { value: '400', label: 'Regular (400)' },
  { value: '500', label: 'Medium (500)' },
  { value: '600', label: 'Semi Bold (600)' },
  { value: '700', label: 'Bold (700)' },
  { value: '800', label: 'Extra Bold (800)' },
  { value: '900', label: 'Black (900)' }
];

// Text Alignment Options
export const TEXT_ALIGNMENTS = [
  { value: 'left', label: 'Left' },
  { value: 'center', label: 'Center' },
  { value: 'right', label: 'Right' }
];

// Default Values
export const DEFAULTS = {
  FONT_SIZE: 16,
  FONT_FAMILY: 'inherit',
  FONT_WEIGHT: 'normal',
  TEXT_COLOR: '#111',
  TEXT_ALIGN: 'left',
  BACKGROUND_COLOR: 'transparent',
  BORDER_RADIUS: 4,
  BUTTON_BACKGROUND: '#2563eb',
  BUTTON_COLOR: '#fff',
  BUTTON_BORDER_RADIUS: 8,
  BUTTON_PADDING: '12px 24px',
  IMAGE_BORDER_RADIUS: 6
};

// Element Types
export const ELEMENT_TYPES = {
  TEXT: 'text',
  IMAGE: 'image',
  BUTTON: 'button'
};

// Modes
export const MODES = {
  DESIGN: 'design',
  PREVIEW: 'preview'
};

// Storage Keys
export const STORAGE_KEYS = {
  ELEMENTS: 'wysiwyg:elements',
  CANVAS_BG: 'wysiwyg:canvasBg'
};

// Canvas Settings
export const CANVAS = {
  WIDTH: 900,
  HEIGHT: 640,
  GRID_SIZE: 10
};

// Container Settings
export const CONTAINER = {
  PADDING: 4,
  BORDER_RADIUS: 4
};

// Element Settings
export const ELEMENT = {
  MIN_WIDTH: 80,
  MIN_HEIGHT: 24,
  DEFAULT_PADDING: '8px'
};
