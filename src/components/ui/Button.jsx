import React from 'react';
import { clsx } from 'clsx';

export function Button({ 
  children, 
  variant = 'default', 
  size = 'default', 
  className = '', 
  disabled = false,
  ...props 
}) {
  const baseStyles = 'inline-flex items-center justify-center rounded-lg font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none';
  
  const variants = {
    default: 'bg-white text-black hover:bg-gray-100',
    outline: 'border border-white/20 text-white hover:bg-white/10',
    ghost: 'text-white hover:bg-white/10',
    link: 'text-white underline-offset-4 hover:underline',
  };
  
  const sizes = {
    default: 'px-4 py-2',
    sm: 'px-3 py-1.5 text-sm',
    lg: 'px-6 py-3 text-lg',
    icon: 'p-2',
  };

  return (
    <button
      className={clsx(baseStyles, variants[variant], sizes[size], className)}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
}
