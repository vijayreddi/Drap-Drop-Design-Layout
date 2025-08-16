import { STORAGE_KEYS } from './constants';

// LocalStorage utility functions for Component Builder

// Load elements from localStorage
export const loadElements = () => {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.ELEMENTS);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
};

// Save elements to localStorage
export const saveElements = (elements) => {
  localStorage.setItem(STORAGE_KEYS.ELEMENTS, JSON.stringify(elements));
};

// Load canvas background from localStorage
export const loadCanvasBg = () => {
  return localStorage.getItem(STORAGE_KEYS.CANVAS_BG) || '#ffffff';
};

// Save canvas background to localStorage
export const saveCanvasBg = (canvasBg) => {
  localStorage.setItem(STORAGE_KEYS.CANVAS_BG, canvasBg);
};

// Clear all data from localStorage
export const clearAllData = () => {
  localStorage.removeItem(STORAGE_KEYS.ELEMENTS);
  localStorage.removeItem(STORAGE_KEYS.CANVAS_BG);
};
