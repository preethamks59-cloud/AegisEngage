/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */
import React, { useState } from 'react';
import Dashboard from './components/Dashboard';
import AegisDrawer from './components/AegisDrawer';
import { ThemeProvider } from './context/ThemeContext';

export default function App() {
  const [isDrawerOpen, setDrawerOpen] = useState(false);
  const [triggerMessage, setTriggerMessage] = useState<string | null>(null);

  const handleQuickAction = (message: string) => {
    setTriggerMessage(message);
    setDrawerOpen(true);
  };

  return (
    <ThemeProvider>
      <div className="min-h-screen bg-slate-50 dark:bg-slate-950 transition-colors duration-300">
        <Dashboard onQuickAction={handleQuickAction} />
        <AegisDrawer 
          isOpen={isDrawerOpen} 
          onClose={() => setDrawerOpen(false)} 
          initialMessage={triggerMessage} 
          onMessageProcessed={() => setTriggerMessage(null)}
        />
      </div>
    </ThemeProvider>
  );
}
