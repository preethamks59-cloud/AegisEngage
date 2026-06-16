import React, { useState, useEffect } from 'react';
import { MessageSquare, Send, Mic, X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  initialMessage?: string | null;
  onMessageProcessed: () => void;
}

export default function AegisDrawer({ isOpen, onClose, initialMessage, onMessageProcessed }: Props) {
  const [messages, setMessages] = useState<{ role: 'user' | 'ai', text: string }[]>([]);
  const [input, setInput] = useState('');

  const send = async (text: string) => {
    if (!text) return;
    setMessages(prev => [...prev, { role: 'user', text: text }]);
    setInput('');

    const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: text })
    });
    const data = await res.json();
    setMessages(prev => [...prev, { role: 'ai', text: data.response }]);
  };

  useEffect(() => {
    if (initialMessage) {
        send(initialMessage);
        onMessageProcessed();
    }
  }, [initialMessage]);

  return (
    <>
      <button 
        onClick={() => { isOpen ? onClose() : null }}
        className={`fixed bottom-6 right-6 bg-[#0051A1] text-white p-4 rounded-2xl shadow-xl transition-all hover:scale-105 ${isOpen ? 'hidden' : 'block'}`}
      >
        <MessageSquare />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ x: 300 }} animate={{ x: 0 }} exit={{ x: 300 }}
            className="fixed inset-y-0 right-0 w-96 bg-white shadow-2xl z-50 flex flex-col border-l border-slate-200"
          >
            <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-slate-50">
              <h2 className="font-bold text-slate-800">AegisEngage AI</h2>
              <button onClick={onClose} className="hover:bg-slate-200 p-1.5 rounded-full"><X size={18} /></button>
            </div>
            
            <div className="flex-1 overflow-y-auto p-6 space-y-4">
              {messages.map((m, i) => (
                <div key={i} className={`p-4 rounded-2xl text-sm ${m.role === 'user' ? 'bg-[#0051A1] text-white ml-auto rounded-tr-none' : 'bg-slate-100 text-slate-800 rounded-tl-none'}`}>
                  {m.text}
                </div>
              ))}
            </div>

            <div className="p-6 border-t border-slate-100 flex gap-2">
              <input 
                value={input} onChange={e => setInput(e.target.value)}
                className="flex-1 border border-slate-200 rounded-2xl p-4 text-sm bg-slate-50 text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#0051A1]" placeholder="Ask about SBI..."
              />
              <button onClick={() => send(input)} className="bg-[#0051A1] text-white p-4 rounded-2xl"><Send size={18} /></button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
