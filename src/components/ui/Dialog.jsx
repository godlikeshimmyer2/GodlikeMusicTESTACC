import React, { createContext, useContext, useState } from 'react';
import { clsx } from 'clsx';

const DropdownContext = createContext();

export function DropdownMenu({ children }) {
  const [open, setOpen] = useState(false);

  return (
    <DropdownContext.Provider value={{ open, setOpen }}>
      <div className="relative">{children}</div>
    </DropdownContext.Provider>
  );
}

export function DropdownMenuTrigger({ children, asChild }) {
  const { open, setOpen } = useContext(DropdownContext);

  if (asChild) {
    return React.cloneElement(children, {
      onClick: () => setOpen(!open),
    });
  }

  return (
    <button onClick={() => setOpen(!open)}>
      {children}
    </button>
  );
}

export function DropdownMenuContent({ children }) {
  const { open, setOpen } = useContext(DropdownContext);

  if (!open) return null;

  return (
    <>
      <div
        className="fixed inset-0 z-40"
        onClick={() => setOpen(false)}
      />
      <div className="absolute right-0 mt-2 bg-gray-800 border border-white/20 rounded-lg shadow-lg z-50 min-w-[200px]">
        {children}
      </div>
    </>
  );
}

export function DropdownMenuItem({ children, onClick, className = '' }) {
  const { setOpen } = useContext(DropdownContext);

  return (
    <button
      onClick={() => {
        onClick?.();
        setOpen(false);
      }}
      className={clsx(
        'w-full px-4 py-2 text-left text-white hover:bg-white/10 transition-colors flex items-center',
        className
      )}
    >
      {children}
    </button>
  );
}
