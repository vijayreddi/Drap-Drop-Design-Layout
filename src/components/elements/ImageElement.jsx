import React from 'react';
import { DEFAULTS } from '../../utils/constants';

const ImageElement = ({ el, selected, updateElement, mode, onEditingStart, onEditingEnd }) => {
  return (
    <img
      src={el.src}
      alt=""
      draggable={false}
      style={{
        width: el.width ? '100%' : 300,
        height: el.height ? '100%' : 'auto',
        objectFit: 'cover',
        display: 'block',
        borderRadius: el.style?.borderRadius || DEFAULTS.IMAGE_BORDER_RADIUS,
        boxShadow: el.style?.boxShadow || 'none',
        border: el.style?.border || 'none',
        boxSizing: 'border-box'
      }}
    />
  );
};

export default ImageElement;
