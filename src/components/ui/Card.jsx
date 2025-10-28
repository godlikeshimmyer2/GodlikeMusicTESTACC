import React from 'react';
import { clsx } from 'clsx';

export function Card({ children, className = '', ...props }) {
  return (
    <div
      className={clsx('rounded-lg border border-white/10', className)}
      {...props}
    >
      {children}
    </div>
  );
}
