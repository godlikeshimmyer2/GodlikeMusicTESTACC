import React, { createContext, useContext, useState } from 'react';
import { clsx } from 'clsx';

const TabsContext = createContext();

export function Tabs({ children, defaultValue, className = '' }) {
  const [activeTab, setActiveTab] = useState(defaultValue);

  return (
    <TabsContext.Provider value={{ activeTab, setActiveTab }}>
      <div className={className}>{children}</div>
    </TabsContext.Provider>
  );
}

export function TabsList({ children, className = '' }) {
  return (
    <div className={clsx('inline-flex bg-white/5 rounded-lg p-1', className)}>
      {children}
    </div>
  );
}

export function TabsTrigger({ children, value, className = '' }) {
  const { activeTab, setActiveTab } = useContext(TabsContext);
  const isActive = activeTab === value;

  return (
    <button
      onClick={() => setActiveTab(value)}
      className={clsx(
        'px-4 py-2 rounded-md font-medium transition-colors',
        isActive ? 'bg-white text-black' : 'text-gray-400 hover:text-white',
        className
      )}
    >
      {children}
    </button>
  );
}

export function TabsContent({ children, value }) {
  const { activeTab } = useContext(TabsContext);
  
  if (activeTab !== value) return null;
  
  return <div>{children}</div>;
}
