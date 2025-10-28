import React from 'react';
import { clsx } from 'clsx';

export function Slider({ value = [50], onValueChange, max = 100, className = '', ...props }) {
  const handleChange = (e) => {
    onValueChange?.([parseInt(e.target.value)]);
  };

  return (
    <input
      type="range"
      min="0"
      max={max}
      value={value[0]}
      onChange={handleChange}
      className={clsx('w-full h-2 bg-gray-600 rounded-lg appearance-none cursor-pointer slider', className)}
      {...props}
    />
  );
}
