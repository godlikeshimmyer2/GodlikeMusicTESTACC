import React from 'react';
import { clsx } from 'clsx';

export function Input({ className = '', ...props }) {
  return (
    <input
      className={clsx(
        'w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-godlike-green',
        className
      )}
      {...props}
    />
  );
}
