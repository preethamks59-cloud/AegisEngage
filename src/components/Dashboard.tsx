import React, { useState } from 'react';
import { 
  CreditCard, 
  TrendingUp, 
  ShieldCheck, 
  Layers, 
  Bot, 
  Sparkles,
  ArrowRight,
  ShieldAlert,
  ChevronRight,
  Sparkle
} from 'lucide-react';
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
  const [activeTab, setActiveTab] = useState<'financial' | 'architecture'>('financial');

  return (
    <div className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8 space-y-6">
      {/* Top Brand Area */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <a 
          href="https://sbi.bank.in/web/personal-banking/home" 
          target="_blank" 
          rel="noopener noreferrer"
          className="hover:opacity-90 transition-opacity"
        >
          <img src="https://sbi.bank.in/o/SBI-Theme/images/custom/logo.png" alt="SBI Logo" className="h-8 w-auto" />
        </a>

        {/* Dynamic Navigation Pill */}
        <div className="flex bg-slate-100 p-1 rounded-2xl border border-slate-200/40 shrink-0">
          <button
            onClick={() => setActiveTab('financial')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              activeTab === 'financial'
                ? 'bg-white text-[#0051A1] shadow-sm'
                : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            <TrendingUp size={14} />
            Live Financial Console
          </button>
          <button
            onClick={() => setActiveTab('architecture')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              activeTab === 'architecture'
                ? 'bg-white text-slate-800 shadow-sm'
                : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            <Layers size={14} />
            Aegis Architecture Hub
          </button>
        </div>
      </div>

      {/* Main Header / Welcome Panel */}
      <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-slate-100 pb-5">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Namaste, <span className="text-[#0051A1]">Arjun Sharma</span>
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">Manage your corporate wealth and monitor real-time AI security guardrails.</p>
        </div>
        <div className="flex items-center gap-3 shrink-0">
          <div className="bg-[#008a97]/10 border border-[#008a97]/20 rounded-2xl px-4 py-2 flex items-center gap-2">
            <span className="text-[10px] font-bold text-slate-400 uppercase">Tier:</span>
            <span className="text-xs font-extrabold text-[#008a97] uppercase tracking-wider">SBI Wealth</span>
          </div>
          <button
            onClick={onOpenChatbot}
            className="flex items-center gap-2 px-4 py-2 bg-[#0051A1] hover:bg-[#003d7a] text-white text-xs font-bold rounded-2xl shadow-sm hover:shadow transition-all cursor-pointer"
          >
            <Bot size={14} className="animate-pulse" />
            Launch Aegis Assistant
          </button>
        </div>
      </header>

      {/* Scale Optimization Note Banner */}
      <div id="scale-opt-card" className="bg-slate-50 border border-slate-200/60 rounded-3xl p-5 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="flex items-start gap-3">
          <div className="bg-[#0051A1]/10 p-2.5 rounded-2xl text-[#0051A1]">
            <Layers size={18} />
          </div>
          <div>
            <h4 className="font-bold text-slate-800 text-xs sm:text-sm">Aegis Architecture Hub & Scale Matrix</h4>
            <p className="text-[11px] text-slate-500 mt-1 leading-relaxed max-w-4xl">
              <strong>Scale Optimization Note:</strong> Uses a hybrid routing matrix. Light intent classification and localized edge tasks are offloaded to lightweight quantized models, while complex state loops (FinLlama-3-8B / Mistral-7B) are selectively orchestrated via Kubernetes only during high-value financial planning events.
            </p>
          </div>
        </div>
        <div className="text-[10px] bg-emerald-50 text-emerald-700 font-bold px-3 py-1.5 rounded-full border border-emerald-100 uppercase tracking-wide shrink-0">
          500M+ Customers Ready
        </div>
      </div>

      {/* Main Tab Content switcher */}
      {activeTab === 'financial' ? (
        <div className="space-y-6 animate-fadeIn">
          {/* Top Quick Status Overview */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {[
              { title: 'Portfolio Value', amount: '₹12,45,000', icon: TrendingUp, detail: '+14.2% SBI Bluechip Mutual Fund', color: 'text-emerald-500 bg-emerald-50' },
              { title: 'SBI Card Credit Limit', amount: '₹5,00,000', icon: CreditCard, detail: '₹1,45,230 currently utilized', color: 'text-[#0051A1] bg-[#0051A1]/5' },
              { title: 'Security Status', amount: 'Fully Secure', icon: ShieldCheck, detail: 'NeMo Guardrails & PII Masking active', color: 'text-blue-500 bg-blue-50' },
            ].map((item, i) => (
              <div key={i} className="bg-white p-6 rounded-3xl shadow-2xs border border-slate-100 hover:shadow-xs transition-shadow flex flex-col justify-between min-h-[140px]">
                <div className="flex justify-between items-start">
                  <p className="text-xs text-slate-400 font-bold uppercase tracking-wider">{item.title}</p>
                  <div className={`p-2 rounded-xl ${item.color}`}>
                    <item.icon size={16} />
                  </div>
                </div>
                <div className="mt-4">
                  <p className="text-2xl sm:text-3xl font-black tracking-tight text-slate-900">{item.amount}</p>
                  <p className="text-[10px] text-slate-500 font-medium mt-1">{item.detail}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Balanced Two-Column Operations Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            
            {/* Left Column (Main operations area, col-span 7) */}
            <div className="lg:col-span-7 space-y-6">
              
              {/* Recommended Products */}
              <div className="bg-white rounded-3xl border border-slate-100 shadow-2xs overflow-hidden">
                <div className="p-5 border-b border-slate-100 bg-slate-50/20 flex items-center justify-between">
                  <div>
                    <h2 className="font-extrabold text-slate-800 text-sm">SBI Intelligence Recommended Products</h2>
                    <p className="text-[10px] text-slate-400 mt-0.5">Optimized recommendations powered by Financial Growth Agent</p>
                  </div>
                  <Sparkle size={14} className="text-amber-500 animate-spin-slow" />
                </div>
                <div className="p-5 grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <button 
                    onClick={() => onQuickAction("Calculate maturity & returns for SBI Amrit Kalash FD")} 
                    className="border border-slate-100 p-4 rounded-2xl hover:bg-slate-50 text-left transition-all hover:border-slate-200 group cursor-pointer flex flex-col justify-between h-full min-h-[120px]"
                  >
                    <div>
                      <h3 className="font-bold text-slate-900 text-xs sm:text-sm group-hover:text-[#0051A1] transition-colors">SBI Amrit Kalash FD</h3>
                      <p className="text-[11px] text-slate-500 leading-normal mt-1">High-yield short term fixed deposit. 7.10% interest for 400 days.</p>
                    </div>
                    <div className="flex items-center gap-1 text-[10px] text-[#0051A1] font-bold mt-3">
                      Simulate returns with Aegis
                      <ChevronRight size={12} className="group-hover:translate-x-1 transition-transform" />
                    </div>
                  </button>
                  <button 
                    onClick={() => onQuickAction("Apply for SBI Savings Account and start video KYC")} 
                    className="border border-slate-100 p-4 rounded-2xl hover:bg-slate-50 text-left transition-all hover:border-slate-200 group cursor-pointer flex flex-col justify-between h-full min-h-[120px]"
                  >
                    <div>
                      <h3 className="font-bold text-slate-900 text-xs sm:text-sm group-hover:text-[#0051A1] transition-colors">Instant Savings Account</h3>
                      <p className="text-[11px] text-slate-500 leading-normal mt-1">Onboard online with zero hassle. Fully digital, instant salary account opening.</p>
                    </div>
                    <div className="flex items-center gap-1 text-[10px] text-[#0051A1] font-bold mt-3">
                      Start conversational KYC
                      <ChevronRight size={12} className="group-hover:translate-x-1 transition-transform" />
                    </div>
                  </button>
                </div>
              </div>

              {/* Transactions History */}
              <RecentTransactions />

              {/* Monthly Budget Graph */}
              <MonthlyBudget />
            </div>

            {/* Right Column (Intelligent Alerts Sidebar, col-span 5) */}
            <div className="lg:col-span-5">
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
        </div>
      ) : (
        <div className="animate-fadeIn">
          {/* About Aegis / Project Pitch */}
          <ProjectPitch />
        </div>
      )}
    </div>
  );
}

