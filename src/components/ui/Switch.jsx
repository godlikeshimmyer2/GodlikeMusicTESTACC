import React from 'react';
import { clsx } from 'clsx';

export function Switch({ checked, onCheckedChange, className = '', ...props }) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      onClick={() => onCheckedChange?.(!checked)}
      className={clsx(
        'relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-godlike-green focus:ring-offset-2',
        checked ? 'bg-godlike-green' : 'bg-gray-600',
        className
      )}
      {...props}
    >
      <span
        className={clsx(
          'inline-block h-4 w-4 transform rounded-full bg-white transition-transform',
          checked ? 'translate-x-6' : 'translate-x-1'
        )}
      />
    </button>
  );
}
