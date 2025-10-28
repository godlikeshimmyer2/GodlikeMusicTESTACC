import React from 'react';
import { clsx } from 'clsx';

export function Label({ children, className = '', ...props }) {
  return (
    <label
      className={clsx('block text-sm font-medium text-white mb-2', className)}
      {...props}
    >
      {children}
    </label>
  );
}
