import React from 'react';
import { TextElement, ImageElement, ButtonElement } from './elements';

const Element = ({ el, selected, updateElement, mode, onEditingStart, onEditingEnd }) => {
  // Switch case for rendering different element types
  switch (el.type) {
    case 'text':
      return (
        <TextElement
          el={el}
          selected={selected}
          updateElement={updateElement}
          mode={mode}
          onEditingStart={onEditingStart}
          onEditingEnd={onEditingEnd}
        />
      );

    case 'image':
      return (
        <ImageElement
          el={el}
          selected={selected}
          updateElement={updateElement}
          mode={mode}
          onEditingStart={onEditingStart}
          onEditingEnd={onEditingEnd}
        />
      );

    case 'button':
      return (
        <ButtonElement
          el={el}
          selected={selected}
          updateElement={updateElement}
          mode={mode}
          onEditingStart={onEditingStart}
          onEditingEnd={onEditingEnd}
        />
      );

    default:
      console.warn(`Unknown element type: ${el.type}`);
      return null;
  }
};

export default Element;
