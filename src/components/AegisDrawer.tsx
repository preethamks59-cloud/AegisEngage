import React, { useState, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import { MessageSquare, Send, X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  initialMessage?: string | null;
  onMessageProcessed: () => void;
}

const LoadingDots = () => (
    <div className="flex space-x-1 p-4 bg-slate-100 rounded-2xl rounded-tl-none items-center w-fit">
        <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
        <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
        <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce"></div>
    </div>
);

export default function AegisDrawer({ isOpen, onClose, initialMessage, onMessageProcessed }: Props) {
  const [messages, setMessages] = useState<{ role: 'user' | 'ai', text: string }[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const send = async (text: string) => {
    if (!text) return;
    const userMessage: { role: 'user' | 'ai', text: string } = { role: 'user', text: text };
    const updatedMessages = [...messages, userMessage];
    setMessages(updatedMessages);
    setInput('');
    setIsLoading(true);

    const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: updatedMessages })
    });
    const data = await res.json();
    setMessages(prev => [...prev, { role: 'ai', text: data.response }]);
    setIsLoading(false);
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
                <div key={i} className={`p-4 rounded-2xl text-sm whitespace-pre-line ${m.role === 'user' ? 'bg-[#0051A1] text-white ml-auto rounded-tr-none' : 'bg-slate-100 text-slate-800 rounded-tl-none'}`}>
                  {m.role === 'ai' ? (
                    <div className="space-y-2 [&_ul]:list-disc [&_ul]:ml-4 [&_ol]:list-decimal [&_ol]:ml-4 [&_code]:bg-slate-200 [&_code]:px-1 [&_code]:rounded whitespace-normal">
                      <ReactMarkdown>{m.text}</ReactMarkdown>
                    </div>
                  ) : (
                    m.text
                  )}
                </div>
              ))}
              {isLoading && <LoadingDots />}
            </div>

            <div className="p-6 border-t border-slate-100 flex gap-2">
              <input 
                value={input} onChange={e => setInput(e.target.value)}
                onKeyPress={e => e.key === 'Enter' && send(input)}
                className="flex-1 border border-slate-200 rounded-2xl p-4 text-sm bg-slate-50 text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#0051A1]" placeholder="Ask about SBI..."
              />
              <button disabled={isLoading} onClick={() => send(input)} className="bg-[#0051A1] disabled:bg-slate-300 text-white p-4 rounded-2xl"><Send size={18} /></button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
