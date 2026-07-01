import React, { useEffect } from 'react';
import { ShieldAlert, TrendingUp, UserCheck, Info, X, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { BankNotification } from '../types';

interface ToastItemProps {
  toast: BankNotification;
  onDismiss: (id: string) => void;
  onAction: (message: string) => void;
}

function ToastItem({ toast, onDismiss, onAction }: ToastItemProps) {
  // Auto dismiss after 6 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      onDismiss(toast.id);
    }, 6500);
    return () => clearTimeout(timer);
  }, [toast.id, onDismiss]);

  const getIcon = (type: string, severity: string) => {
    switch (type) {
      case 'security':
        return (
          <div className="bg-red-500 text-white p-2.5 rounded-xl shrink-0 shadow-sm shadow-red-500/20">
            <ShieldAlert size={18} />
          </div>
        );
      case 'wealth':
        return (
          <div className="bg-emerald-500 text-white p-2.5 rounded-xl shrink-0 shadow-sm shadow-emerald-500/20">
            <TrendingUp size={18} />
          </div>
        );
      case 'onboarding':
        return (
          <div className="bg-sky-500 text-white p-2.5 rounded-xl shrink-0 shadow-sm shadow-sky-500/20">
            <UserCheck size={18} />
          </div>
        );
      default:
        return (
          <div className="bg-slate-500 text-white p-2.5 rounded-xl shrink-0 shadow-sm shadow-slate-500/20">
            <Info size={18} />
          </div>
        );
    }
  };

  const getBorderColor = (severity: string) => {
    switch (severity) {
      case 'critical': return 'border-red-100 bg-red-50/95';
      case 'warning': return 'border-amber-100 bg-amber-50/95';
      case 'success': return 'border-green-100 bg-green-50/95';
      default: return 'border-blue-100 bg-blue-50/95';
    }
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 50, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9, y: 20 }}
      transition={{ type: 'spring', stiffness: 350, damping: 25 }}
      className={`p-4 rounded-2xl border shadow-xl flex gap-3.5 max-w-sm w-full pointer-events-auto backdrop-blur-sm ${getBorderColor(toast.severity)}`}
    >
      {getIcon(toast.type, toast.severity)}
      
      <div className="flex-1 flex flex-col gap-1.5">
        <div className="flex justify-between items-start gap-1">
          <h4 className="font-bold text-slate-900 text-sm">{toast.title}</h4>
          <button 
            onClick={() => onDismiss(toast.id)} 
            className="text-slate-400 hover:text-slate-600 p-0.5 rounded-md hover:bg-slate-200/50 transition-all cursor-pointer"
          >
            <X size={14} />
          </button>
        </div>
        
        <p className="text-xs text-slate-600 leading-normal">{toast.message}</p>
        
        {toast.ctaText && toast.ctaActionMessage && (
          <button
            onClick={() => {
              onAction(toast.ctaActionMessage!);
              onDismiss(toast.id);
            }}
            className="mt-1 self-start flex items-center gap-1 bg-[#0051A1] hover:bg-[#003d7a] text-white px-2.5 py-1 rounded-lg text-[10px] font-bold transition-all shadow-sm cursor-pointer"
          >
            <Sparkles size={10} className="text-amber-300" />
            {toast.ctaText}
          </button>
        )}
      </div>
    </motion.div>
  );
}

interface NotificationToastsProps {
  toasts: BankNotification[];
  onDismiss: (id: string) => void;
  onAction: (message: string) => void;
}

export default function NotificationToasts({ toasts, onDismiss, onAction }: NotificationToastsProps) {
  return (
    <div 
      className="fixed bottom-6 left-6 z-50 flex flex-col gap-3 pointer-events-none w-full max-w-sm select-none"
      style={{ maxWidth: 'min(100vw - 3rem, 24rem)' }}
    >
      <AnimatePresence mode="popLayout">
        {toasts.map(toast => (
          <ToastItem 
            key={toast.id} 
            toast={toast} 
            onDismiss={onDismiss} 
            onAction={onAction} 
          />
        ))}
      </AnimatePresence>
    </div>
  );
}
