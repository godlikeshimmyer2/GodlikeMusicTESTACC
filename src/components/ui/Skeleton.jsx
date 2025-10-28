import React from 'react';
import { clsx } from 'clsx';

export function Skeleton({ className = '' }) {
  return (
    <div
      className={clsx('animate-pulse bg-white/10 rounded', className)}
    />
  );
}
