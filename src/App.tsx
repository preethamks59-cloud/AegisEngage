/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */
import React, { useState } from 'react';
import Dashboard from './components/Dashboard';
import AegisDrawer from './components/AegisDrawer';

export default function App() {
  const [isDrawerOpen, setDrawerOpen] = useState(false);
  const [triggerMessage, setTriggerMessage] = useState<string | null>(null);

  const handleQuickAction = (message: string) => {
    setTriggerMessage(message);
    setDrawerOpen(true);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Dashboard onQuickAction={handleQuickAction} />
      <AegisDrawer 
        isOpen={isDrawerOpen} 
        onClose={() => setDrawerOpen(false)} 
        initialMessage={triggerMessage} 
        onMessageProcessed={() => setTriggerMessage(null)}
      />
    </div>
  );
}
