/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */
import React, { useState } from 'react';
import Dashboard from './components/Dashboard';
import AegisDrawer from './components/AegisDrawer';
import NotificationToasts from './components/NotificationToasts';
import { ThemeProvider } from './context/ThemeContext';
import { BankNotification } from './types';

const INITIAL_NOTIFICATIONS: BankNotification[] = [
  {
    id: 'notif-1',
    type: 'security',
    severity: 'critical',
    title: 'Suspicious UPI Attempt Shielded',
    message: 'A real-time mandate of ₹45,000 to "Dinesh Retailers" in Mumbai was declined. Your current physical location was detected in Delhi.',
    time: '5m ago',
    read: false,
    ctaText: 'Investigate with Fraud Guard',
    ctaActionMessage: 'Explain why my UPI transfer of ₹45,000 to Dinesh Retailers was blocked.'
  },
  {
    id: 'notif-2',
    type: 'onboarding',
    severity: 'warning',
    title: 'Aegis Conversational Onboarding',
    message: 'We noticed your online salary account setup is 85% ready. Complete a brief Video KYC check with Aegis Agent to lift limits.',
    time: '2h ago',
    read: false,
    ctaText: 'Complete KYC with Aegis AI',
    ctaActionMessage: 'I would like to complete my account onboarding and start Video KYC.'
  },
  {
    id: 'notif-3',
    type: 'wealth',
    severity: 'info',
    title: 'SBI Wealth Optimizer Alert',
    message: 'Your savings account balance of ₹2,50,000 is earning basic interest. Move ₹1,50,000 into the high-yield SBI Amrit Kalash FD (400 Days @ 7.10%) to earn extra returns.',
    time: '1d ago',
    read: true,
    ctaText: 'Simulate Returns Now',
    ctaActionMessage: 'Can you show me how much returns I will get if I invest ₹1,50,000 in SBI Amrit Kalash FD?'
  },
  {
    id: 'notif-4',
    type: 'system',
    severity: 'success',
    title: 'SBI Guardrails Active',
    message: 'Your banking session is fully protected by NeMo compliance guardrails. All PII (Aadhaar, PAN, IFSC) is safely masked, and hallucination protection filters are active.',
    time: '3d ago',
    read: true
  }
];

const SIMULATION_TEMPLATES: Omit<BankNotification, 'id' | 'time' | 'read'>[] = [
  {
    type: 'security',
    severity: 'critical',
    title: 'Foreign Login Attempt Blocked',
    message: 'A secure login attempt was blocked from IP 194.22.109.5 (London, UK) using your online banking ID. Your password has been shielded.',
    ctaText: 'Verify details with Aegis',
    ctaActionMessage: 'Explain the foreign login warning from London IP 194.22.109.5.'
  },
  {
    type: 'wealth',
    severity: 'warning',
    title: 'SBI Mutual Fund Growth Advisory',
    message: 'The SBI Bluechip Mutual Fund has recorded an performance of +14.2% CAGR this quarter. Get a tailored rebalancing analysis.',
    ctaText: 'Get Wealth Rebalance Plan',
    ctaActionMessage: 'Analyze the performance of SBI Bluechip Mutual Fund and suggest investment rebalancing.'
  },
  {
    type: 'security',
    severity: 'warning',
    title: 'New Beneficiary Added',
    message: 'A new fund transfer beneficiary "Shyam Sunder" was successfully added to your UPI profile. Transfer limits will take 2 hours to activate.',
    ctaText: 'Report Unrecognized Activity',
    ctaActionMessage: 'I did not add the beneficiary Shyam Sunder. Please lock my transfers and investigate.'
  },
  {
    type: 'onboarding',
    severity: 'info',
    title: 'Platinum Debit Card Pre-Approved',
    message: 'Based on your SBI Wealth status, you are pre-approved for a zero-annual-fee SBI Platinum Contactless Card with free airport lounge access.',
    ctaText: 'Apply with 1-Click',
    ctaActionMessage: 'I want to apply for the pre-approved zero-annual-fee SBI Platinum Contactless Debit Card.'
  }
];

export default function App() {
  const [isDrawerOpen, setDrawerOpen] = useState(false);
  const [triggerMessage, setTriggerMessage] = useState<string | null>(null);
  
  // State for all alerts (displayed on dashboard feed)
  const [notifications, setNotifications] = useState<BankNotification[]>(INITIAL_NOTIFICATIONS);
  
  // State for active floating toasts (disappear after timer)
  const [toasts, setToasts] = useState<BankNotification[]>([]);

  const handleQuickAction = (message: string) => {
    setTriggerMessage(message);
    setDrawerOpen(true);
  };

  const handleMarkRead = (id: string) => {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));
  };

  const handleMarkAllRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  };

  const handleClear = (id: string) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
    setToasts(prev => prev.filter(t => t.id !== id));
  };

  const handleSimulateAlert = () => {
    // Pick a random template
    const templateIndex = Math.floor(Math.random() * SIMULATION_TEMPLATES.length);
    const template = SIMULATION_TEMPLATES[templateIndex];
    
    const newId = `notif-sim-${Date.now()}`;
    const newNotification: BankNotification = {
      ...template,
      id: newId,
      time: 'Just now',
      read: false
    };

    // Add to main notifications list
    setNotifications(prev => [newNotification, ...prev]);
    
    // Add to toasts list
    setToasts(prev => [...prev, newNotification]);
  };

  const handleDismissToast = (id: string) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  };

  return (
    <ThemeProvider>
      <div className="min-h-screen bg-slate-50 transition-colors duration-300">
        <Dashboard 
          onQuickAction={handleQuickAction} 
          onOpenChatbot={() => setDrawerOpen(true)} 
          notifications={notifications}
          onMarkRead={handleMarkRead}
          onMarkAllRead={handleMarkAllRead}
          onClear={handleClear}
          onSimulateAlert={handleSimulateAlert}
        />
        
        <AegisDrawer 
          isOpen={isDrawerOpen} 
          onClose={() => setDrawerOpen(false)} 
          initialMessage={triggerMessage} 
          onMessageProcessed={() => setTriggerMessage(null)}
          onOpen={() => setDrawerOpen(true)}
        />

        {/* Global Toast Overlay */}
        <NotificationToasts 
          toasts={toasts}
          onDismiss={handleDismissToast}
          onAction={handleQuickAction}
        />
      </div>
    </ThemeProvider>
  );
}
