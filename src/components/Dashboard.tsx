import React from 'react';
import { CreditCard, TrendingUp, ShieldCheck } from 'lucide-react';
import RecentTransactions from './RecentTransactions';
import NotificationFeed from './NotificationFeed';
import MonthlyBudget from './MonthlyBudget';
import ProjectPitch from './ProjectPitch';
import { useTheme } from '../context/ThemeContext';
import { BankNotification } from '../types';

interface Props {
  onQuickAction: (message: string) => void;
  onOpenChatbot: () => void;
  notifications: BankNotification[];
  onMarkRead: (id: string) => void;
  onMarkAllRead: () => void;
  onClear: (id: string) => void;
  onSimulateAlert: () => void;
}

export default function Dashboard({ 
  onQuickAction, 
  onOpenChatbot,
  notifications,
  onMarkRead,
  onMarkAllRead,
  onClear,
  onSimulateAlert
}: Props) {
  return (
    <div className="p-6 space-y-6">
      <div className="mb-2">
        <a 
          href="https://sbi.bank.in/web/personal-banking/home" 
          target="_blank" 
          rel="noopener noreferrer"
        >
          <img src="https://sbi.bank.in/o/SBI-Theme/images/custom/logo.png" alt="SBI Logo" className="h-8 w-auto" />
        </a>
      </div>
      <header className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold text-slate-800 dark:text-white tracking-tight">Namaste, <span className="text-[#0051A1] dark:text-blue-400">Arjun Sharma</span></h1>
        <div className="flex items-center gap-4">
            <div className="bg-slate-50 border border-slate-200 rounded-full px-4 py-2 flex items-center gap-2">
              <span className="text-xs font-bold text-slate-400">Tier:</span>
              <span className="text-xs font-bold text-[#008a97] uppercase tracking-tighter">SBI Wealth</span>
            </div>
        </div>
      </header>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          { title: 'Portfolio Value', amount: '₹12,45,000', icon: TrendingUp },
          { title: 'Credit Limit', amount: '₹5,00,000', icon: CreditCard },
          { title: 'Security Status', amount: 'Secure', icon: ShieldCheck },
        ].map((item, i) => (
          <div key={i} className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100">
            <div className="flex justify-between items-center mb-2">
              <p className="text-sm text-slate-500 font-medium">{item.title}</p>
              <item.icon className="text-[#0051A1] size-5" />
            </div>
            <p className="text-3xl font-bold tracking-tight text-slate-900">{item.amount}</p>
          </div>
        ))}
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden">
          <div className="p-5 border-b border-slate-100">
              <h2 className="font-bold text-slate-800">Recommended Products</h2>
          </div>
          <div className="p-6 grid grid-cols-1 gap-4">
            <button onClick={() => onQuickAction("apply for SBI Amrit Kalash FD")} className="border border-slate-100 p-4 rounded-2xl hover:bg-slate-50 text-left">
              <h3 className="font-bold text-slate-900">SBI Amrit Kalash FD</h3>
              <p className="text-sm text-slate-500">7.10% interest for 400 days tenure.</p>
            </button>
            <button onClick={() => onQuickAction("apply for Wealth Mutual Funds")} className="border border-slate-100 p-4 rounded-2xl hover:bg-slate-50 text-left">
              <h3 className="font-bold text-slate-900">Wealth Mutual Funds</h3>
              <p className="text-sm text-slate-500">Aggressive schemes for high growth.</p>
            </button>
          </div>
        </div>
        <div className="space-y-6">
            <RecentTransactions />
            <MonthlyBudget />
            <NotificationFeed 
              notifications={notifications}
              onMarkRead={onMarkRead}
              onMarkAllRead={onMarkAllRead}
              onClear={onClear}
              onSimulateAlert={onSimulateAlert}
              onAskAegis={onQuickAction}
            />
        </div>
      </div>
      <ProjectPitch />
      <button 
        onClick={onOpenChatbot}
        className="w-full bg-[#0051A1] text-white p-4 rounded-3xl font-bold hover:bg-[#003d7a] transition-colors"
      >
        Chat with Aegis
      </button>
    </div>
  );
}
