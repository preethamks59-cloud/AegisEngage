import React, { useState } from 'react';
import { 
  Bell, 
  ShieldAlert, 
  TrendingUp, 
  UserCheck, 
  Info, 
  CheckCircle, 
  X, 
  Check, 
  Zap, 
  Sparkles,
  Inbox,
  Clock
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { BankNotification } from '../types';

interface NotificationFeedProps {
  notifications: BankNotification[];
  onMarkRead: (id: string) => void;
  onMarkAllRead: () => void;
  onClear: (id: string) => void;
  onSimulateAlert: () => void;
  onAskAegis: (message: string) => void;
}

export default function NotificationFeed({
  notifications,
  onMarkRead,
  onMarkAllRead,
  onClear,
  onSimulateAlert,
  onAskAegis
}: NotificationFeedProps) {
  const [activeTab, setActiveTab] = useState<'all' | 'security' | 'wealth' | 'onboarding'>('all');

  const filteredNotifications = notifications.filter(n => {
    if (activeTab === 'all') return true;
    return n.type === activeTab;
  });

  const getIcon = (type: string, severity: string) => {
    switch (type) {
      case 'security':
        return <ShieldAlert className="text-red-500 shrink-0" size={18} />;
      case 'wealth':
        return <TrendingUp className="text-emerald-500 shrink-0" size={18} />;
      case 'onboarding':
        return <UserCheck className="text-sky-500 shrink-0" size={18} />;
      default:
        return <Info className="text-slate-500 shrink-0" size={18} />;
    }
  };

  const getSeverityStyles = (severity: string, read: boolean) => {
    if (read) return 'border-slate-100 bg-white dark:bg-slate-900';
    switch (severity) {
      case 'critical':
        return 'border-l-4 border-l-red-500 bg-red-50/60 hover:bg-red-50/80 transition-colors';
      case 'warning':
        return 'border-l-4 border-l-amber-500 bg-amber-50/60 hover:bg-amber-50/80 transition-colors';
      case 'success':
        return 'border-l-4 border-l-green-500 bg-green-50/60 hover:bg-green-50/80 transition-colors';
      default:
        return 'border-l-4 border-l-blue-500 bg-blue-50/60 hover:bg-blue-50/80 transition-colors';
    }
  };

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <div id="notification-feed-container" className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden flex flex-col h-full">
      {/* Header */}
      <div className="p-5 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
        <div className="flex items-center gap-2.5">
          <div className="relative bg-[#0051A1]/10 p-2 rounded-xl text-[#0051A1]">
            <Bell size={20} className="animate-pulse" />
            {unreadCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] font-black w-5 h-5 rounded-full flex items-center justify-center border-2 border-white animate-bounce">
                {unreadCount}
              </span>
            )}
          </div>
          <div>
            <h2 className="font-bold text-slate-800 text-base leading-none">Security & Updates Hub</h2>
            <p className="text-xs text-slate-500 mt-1">Guardrails & wealth advisories in real-time</p>
          </div>
        </div>

        <div className="flex gap-2">
          <button 
            id="simulate-alert-btn"
            onClick={onSimulateAlert}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-[#0051A1]/5 hover:bg-[#0051A1]/10 text-[#0051A1] rounded-xl text-xs font-bold transition-all border border-[#0051A1]/10"
            title="Simulate active security or wealth event"
          >
            <Zap size={14} className="text-amber-500" />
            Simulate Event
          </button>
          
          {unreadCount > 0 && (
            <button 
              id="mark-all-read-btn"
              onClick={onMarkAllRead}
              className="px-3 py-1.5 text-xs text-slate-500 hover:text-slate-800 font-semibold hover:bg-slate-100 rounded-xl transition-colors"
            >
              Mark all read
            </button>
          )}
        </div>
      </div>

      {/* Tabs */}
      <div className="px-5 py-2.5 border-b border-slate-100 bg-slate-50/20 flex gap-1 overflow-x-auto scrollbar-none">
        {[
          { id: 'all', label: 'All Alerts' },
          { id: 'security', label: 'Security 🛡️' },
          { id: 'wealth', label: 'Growth 📈' },
          { id: 'onboarding', label: 'KYC 📝' }
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
              activeTab === tab.id 
                ? 'bg-[#0051A1] text-white shadow-sm shadow-[#0051A1]/20' 
                : 'text-slate-500 hover:text-slate-800 hover:bg-slate-100'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Alerts List */}
      <div className="flex-1 overflow-y-auto max-h-[380px] p-5 space-y-3.5 min-h-[220px]">
        <AnimatePresence initial={false}>
          {filteredNotifications.length === 0 ? (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="h-full flex flex-col items-center justify-center text-center py-10"
            >
              <div className="p-4 bg-slate-50 rounded-full mb-3 text-slate-300">
                <Inbox size={32} />
              </div>
              <p className="text-sm font-semibold text-slate-700">All clear!</p>
              <p className="text-xs text-slate-400 max-w-[200px] mt-1">
                No alerts in this category. Click "Simulate Event" above to trigger a test warning.
              </p>
            </motion.div>
          ) : (
            filteredNotifications.map(notification => (
              <motion.div
                key={notification.id}
                layoutId={`notif-${notification.id}`}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, x: -50 }}
                className={`p-4 rounded-2xl border ${getSeverityStyles(notification.severity, notification.read)} relative group shadow-sm flex flex-col gap-2.5`}
              >
                {/* Header of alert */}
                <div className="flex justify-between items-start gap-2">
                  <div className="flex gap-2.5 items-start">
                    {getIcon(notification.type, notification.severity)}
                    <div>
                      <div className="flex items-center gap-1.5">
                        <span className={`font-bold text-sm ${notification.read ? 'text-slate-600 font-medium' : 'text-slate-950 font-extrabold'}`}>
                          {notification.title}
                        </span>
                        {!notification.read && (
                          <span className="w-2 h-2 bg-[#0051A1] rounded-full shrink-0" />
                        )}
                      </div>
                      <div className="flex items-center gap-1 text-[10px] text-slate-400 mt-0.5">
                        <Clock size={10} />
                        <span>{notification.time}</span>
                      </div>
                    </div>
                  </div>

                  {/* Actions on hover/right corner */}
                  <div className="flex items-center gap-1">
                    {!notification.read && (
                      <button
                        onClick={() => onMarkRead(notification.id)}
                        className="p-1 hover:bg-slate-200/60 text-slate-500 hover:text-[#0051A1] rounded-lg transition-colors"
                        title="Mark as read"
                      >
                        <Check size={14} />
                      </button>
                    )}
                    <button
                      onClick={() => onClear(notification.id)}
                      className="p-1 hover:bg-slate-200/60 text-slate-500 hover:text-red-500 rounded-lg transition-colors"
                      title="Clear alert"
                    >
                      <X size={14} />
                    </button>
                  </div>
                </div>

                {/* Message */}
                <p className={`text-xs pl-7 leading-relaxed ${notification.read ? 'text-slate-500' : 'text-slate-700'}`}>
                  {notification.message}
                </p>

                {/* CTA Action - Discuss with Aegis */}
                {notification.ctaText && notification.ctaActionMessage && (
                  <div className="pl-7 mt-1.5 flex">
                    <button
                      onClick={() => onAskAegis(notification.ctaActionMessage!)}
                      className="flex items-center gap-1.5 px-3 py-1.5 bg-[#0051A1] hover:bg-[#003d7a] text-white rounded-xl text-[11px] font-bold transition-all shadow-sm hover:shadow-md cursor-pointer"
                    >
                      <Sparkles size={12} className="text-amber-300 fill-amber-300 animate-spin-slow" />
                      {notification.ctaText}
                    </button>
                  </div>
                )}
              </motion.div>
            ))
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
