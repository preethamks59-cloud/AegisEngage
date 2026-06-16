import React from 'react';
import { CreditCard, TrendingUp, ShieldCheck, Sun, Moon } from 'lucide-react';
import RecentTransactions from './RecentTransactions';
import MonthlyBudget from './MonthlyBudget';
import ProjectPitch from './ProjectPitch';
import { useTheme } from '../context/ThemeContext';

interface Props {
  onQuickAction: (message: string) => void;
}

export default function Dashboard({ onQuickAction }: Props) {
  const { theme, toggleTheme } = useTheme();
  return (
    <div className="p-6 space-y-6 dark:text-slate-100">
      <header className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold text-slate-800 dark:text-white tracking-tight">Namaste, <span className="text-[#0051A1] dark:text-blue-400">Arjun Sharma</span></h1>
        <div className="flex items-center gap-4">
            <button onClick={toggleTheme} className="p-2 rounded-full hover:bg-slate-200 dark:hover:bg-slate-800">
                {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
            </button>
            <div className="bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-full px-4 py-2 flex items-center gap-2">
              <span className="text-xs font-bold text-slate-400 dark:text-slate-500">Tier:</span>
              <span className="text-xs font-bold text-[#008a97] dark:text-teal-400 uppercase tracking-tighter">SBI Wealth</span>
            </div>
        </div>
      </header>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          { title: 'Portfolio Value', amount: '₹12,45,000', icon: TrendingUp },
          { title: 'Credit Limit', amount: '₹5,00,000', icon: CreditCard },
          { title: 'Security Status', amount: 'Secure', icon: ShieldCheck },
        ].map((item, i) => (
          <div key={i} className="bg-white dark:bg-slate-900 p-6 rounded-3xl shadow-sm border border-slate-100 dark:border-slate-800">
            <div className="flex justify-between items-center mb-2">
              <p className="text-sm text-slate-500 dark:text-slate-400 font-medium">{item.title}</p>
              <item.icon className="text-[#0051A1] dark:text-blue-400 size-5" />
            </div>
            <p className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white">{item.amount}</p>
          </div>
        ))}
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-sm overflow-hidden">
          <div className="p-5 border-b border-slate-100 dark:border-slate-800">
              <h2 className="font-bold text-slate-800 dark:text-white">Recommended Products</h2>
          </div>
          <div className="p-6 grid grid-cols-1 gap-4">
            <button onClick={() => onQuickAction("apply for SBI Amrit Kalash FD")} className="border border-slate-100 dark:border-slate-800 p-4 rounded-2xl hover:bg-slate-50 dark:hover:bg-slate-800 text-left">
              <h3 className="font-bold text-slate-900 dark:text-white">SBI Amrit Kalash FD</h3>
              <p className="text-sm text-slate-500 dark:text-slate-400">7.10% interest for 400 days tenure.</p>
            </button>
            <button onClick={() => onQuickAction("apply for Wealth Mutual Funds")} className="border border-slate-100 dark:border-slate-800 p-4 rounded-2xl hover:bg-slate-50 dark:hover:bg-slate-800 text-left">
              <h3 className="font-bold text-slate-900 dark:text-white">Wealth Mutual Funds</h3>
              <p className="text-sm text-slate-500 dark:text-slate-400">Aggressive schemes for high growth.</p>
            </button>
          </div>
        </div>
        <div className="space-y-6">
            <RecentTransactions />
            <MonthlyBudget />
        </div>
      </div>
      <ProjectPitch />
    </div>
  );
}
