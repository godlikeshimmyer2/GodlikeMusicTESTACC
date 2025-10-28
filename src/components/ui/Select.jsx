import React, { createContext, useContext, useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { clsx } from 'clsx';

const SelectContext = createContext();

export function Select({ children, value, onValueChange }) {
  const [open, setOpen] = useState(false);

  return (
    <SelectContext.Provider value={{ value, onValueChange, open, setOpen }}>
      <div className="relative">{children}</div>
    </SelectContext.Provider>
  );
}

export function SelectTrigger({ children, className = '' }) {
  const { open, setOpen } = useContext(SelectContext);

  return (
    <button
      type="button"
      onClick={() => setOpen(!open)}
      className={clsx(
        'w-full flex items-center justify-between px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-godlike-green',
        className
      )}
    >
      {children}
      <ChevronDown className="w-4 h-4 ml-2" />
    </button>
  );
}

export function SelectValue({ placeholder }) {
  const { value } = useContext(SelectContext);
  return <span>{value || placeholder}</span>;
}

export function SelectContent({ children }) {
  const { open, setOpen } = useContext(SelectContext);

  if (!open) return null;

  return (
    <>
      <div
        className="fixed inset-0 z-40"
        onClick={() => setOpen(false)}
      />
      <div className="absolute top-full left-0 right-0 mt-1 bg-gray-800 border border-white/20 rounded-lg shadow-lg z-50 max-h-60 overflow-y-auto">
        {children}
      </div>
    </>
  );
}

export function SelectItem({ children, value }) {
  const { onValueChange, setOpen } = useContext(SelectContext);

  return (
    <button
      type="button"
      onClick={() => {
        onValueChange(value);
        setOpen(false);
      }}
      className="w-full px-3 py-2 text-left text-white hover:bg-white/10 transition-colors"
    >
      {children}
    </button>
  );
}
