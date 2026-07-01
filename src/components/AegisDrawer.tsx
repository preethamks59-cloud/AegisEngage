import React, { useState, useEffect, useRef } from 'react';
import ReactMarkdown from 'react-markdown';
import { 
  MessageSquare, 
  Send, 
  X, 
  Bot, 
  Sparkles, 
  ShieldCheck, 
  TrendingUp, 
  UserCheck, 
  ArrowRight 
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  initialMessage?: string | null;
  onMessageProcessed: () => void;
  onOpen?: () => void;
}

const LoadingDots = () => (
    <div className="flex space-x-1.5 p-4 bg-slate-100 rounded-2xl rounded-tl-none items-center w-fit self-start shadow-sm border border-slate-100/50">
        <div className="w-2.5 h-2.5 bg-slate-400 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
        <div className="w-2.5 h-2.5 bg-slate-400 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
        <div className="w-2.5 h-2.5 bg-slate-400 rounded-full animate-bounce"></div>
    </div>
);

const TypingResponse = ({ text }: { text?: string }) => {
    const [displayedText, setDisplayedText] = useState('');
    useEffect(() => {
        const safeText = text || '';
        if (!safeText) return;
        
        let index = 0;
        const interval = setInterval(() => {
            const increment = safeText.length > 500 ? 5 : safeText.length > 200 ? 3 : 1;
            index += increment;
            
            if (index >= safeText.length) {
                setDisplayedText(safeText);
                clearInterval(interval);
            } else {
                setDisplayedText(safeText.slice(0, index));
            }
        }, 8);
        return () => clearInterval(interval);
    }, [text]);
    return <ReactMarkdown>{displayedText}</ReactMarkdown>;
};

export default function AegisDrawer({ isOpen, onClose, initialMessage, onMessageProcessed, onOpen }: Props) {
  const [messages, setMessages] = useState<{ role: 'user' | 'ai', text: string }[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  const send = async (text: string) => {
    if (!text.trim()) return;
    const userMessage: { role: 'user' | 'ai', text: string } = { role: 'user', text: text };
    const updatedMessages = [...messages, userMessage];
    setMessages(updatedMessages);
    setInput('');
    setIsLoading(true);

    try {
      const res = await fetch('/api/chat', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ messages: updatedMessages })
      });
      const data = await res.json();
      if (res.ok) {
          setMessages(prev => [...prev, { role: 'ai', text: data.response }]);
      } else {
          setMessages(prev => [...prev, { role: 'ai', text: data.error || "Something went wrong. Please try again." }]);
      }
    } catch (err) {
      setMessages(prev => [...prev, { role: 'ai', text: "Unable to connect. Please check your internet connection." }]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (initialMessage) {
        send(initialMessage);
        onMessageProcessed();
    }
  }, [initialMessage]);

  const starterPrompts = [
    { 
      text: "Where should I invest ₹2 Lakhs?", 
      icon: <TrendingUp size={14} className="text-emerald-500" />,
      agent: "Financial Growth Agent" 
    },
    { 
      text: "I want to open a new savings account.", 
      icon: <UserCheck size={14} className="text-sky-500" />,
      agent: "Onboarding Agent" 
    },
    { 
      text: "Why was my recent UPI transaction blocked?", 
      icon: <ShieldCheck size={14} className="text-red-500" />,
      agent: "Fraud Guard Agent" 
    }
  ];

  return (
    <>
      {/* Floating Chat Icon (when drawer is closed) */}
      <button 
        onClick={() => { if (!isOpen) { onOpen?.(); } }}
        className={`fixed bottom-6 right-6 bg-[#0051A1] text-white p-4.5 rounded-2xl shadow-xl transition-all hover:scale-110 active:scale-95 z-40 hover:bg-[#003d7a] cursor-pointer ${isOpen ? 'opacity-0 scale-90 pointer-events-none' : 'opacity-100 scale-100'}`}
      >
        <MessageSquare size={24} className="animate-pulse" />
      </button>

      <AnimatePresence>
        {isOpen && (
          <>
            {/* Soft Backdrop overlay for stability */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.4 }}
              exit={{ opacity: 0 }}
              onClick={onClose}
              className="fixed inset-0 bg-slate-900/40 z-40 backdrop-blur-xs cursor-pointer"
            />

            {/* Sidebar Chat Drawer Container */}
            <motion.div 
              initial={{ x: '100%' }} 
              animate={{ x: 0 }} 
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 26, stiffness: 220 }}
              className="fixed inset-y-0 right-0 w-full max-w-md md:w-[440px] bg-white shadow-2xl z-50 flex flex-col border-l border-slate-100"
            >
              {/* Header */}
              <div className="p-5 border-b border-slate-100 flex justify-between items-center bg-slate-50/80 backdrop-blur-md">
                <div className="flex items-center gap-3">
                  <div className="bg-[#0051A1] text-white p-2 rounded-xl shadow-sm">
                    <Bot size={20} />
                  </div>
                  <div>
                    <h2 className="font-bold text-slate-800 text-base leading-none">AegisEngage AI</h2>
                    <p className="text-[10px] text-slate-500 mt-1 font-medium flex items-center gap-1">
                      <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-ping" />
                      Multi-Agent Guardrails Active
                    </p>
                  </div>
                </div>
                <button 
                  onClick={onClose} 
                  className="hover:bg-slate-200 text-slate-500 hover:text-slate-800 p-2 rounded-full transition-colors cursor-pointer"
                >
                  <X size={18} />
                </button>
              </div>
              
              {/* Messages viewport */}
              <div className="flex-1 overflow-y-auto p-5 space-y-4 flex flex-col scrollbar-thin">
                {messages.length === 0 ? (
                  // Elegant welcome onboarding experience
                  <div className="my-auto flex flex-col space-y-6">
                    <div className="text-center space-y-2">
                      <div className="inline-flex bg-amber-50 p-3 rounded-full text-amber-500 mb-1 border border-amber-100">
                        <Sparkles size={28} className="animate-pulse" />
                      </div>
                      <h3 className="font-extrabold text-slate-800 text-lg">Meet Aegis Assistant</h3>
                      <p className="text-xs text-slate-500 max-w-sm mx-auto px-4">
                        Your autonomous financial guardian powered by SBI Multi-Agent Intelligence and real-time guardrails.
                      </p>
                    </div>

                    {/* Agent Role Cards */}
                    <div className="grid grid-cols-1 gap-2.5 px-2">
                      <div className="p-3.5 bg-slate-50/50 rounded-2xl border border-slate-100 flex items-start gap-3">
                        <div className="p-2 bg-emerald-50 text-emerald-600 rounded-lg">
                          <TrendingUp size={16} />
                        </div>
                        <div>
                          <h4 className="font-bold text-xs text-slate-800">Financial Growth Agent</h4>
                          <p className="text-[10px] text-slate-500 mt-0.5">Explains premium investment schemes and simulates custom high-yield returns.</p>
                        </div>
                      </div>
                      <div className="p-3.5 bg-slate-50/50 rounded-2xl border border-slate-100 flex items-start gap-3">
                        <div className="p-2 bg-sky-50 text-sky-600 rounded-lg">
                          <UserCheck size={16} />
                        </div>
                        <div>
                          <h4 className="font-bold text-xs text-slate-800">Conversational Onboarding</h4>
                          <p className="text-[10px] text-slate-500 mt-0.5">Guides you step-by-step through Video KYC and salary account opening.</p>
                        </div>
                      </div>
                      <div className="p-3.5 bg-slate-50/50 rounded-2xl border border-slate-100 flex items-start gap-3">
                        <div className="p-2 bg-red-50 text-red-600 rounded-lg">
                          <ShieldCheck size={16} />
                        </div>
                        <div>
                          <h4 className="font-bold text-xs text-slate-800">Fraud Guard Sentinel</h4>
                          <p className="text-[10px] text-slate-500 mt-0.5">Proactively details suspicious account locks and shields personal PII.</p>
                        </div>
                      </div>
                    </div>

                    {/* Starter Prompts */}
                    <div className="space-y-2 px-2">
                      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider pl-1">Suggested Inquiries</p>
                      <div className="flex flex-col gap-2">
                        {starterPrompts.map((prompt, pIdx) => (
                          <button
                            key={pIdx}
                            onClick={() => send(prompt.text)}
                            className="w-full text-left p-3 bg-white hover:bg-slate-50 rounded-xl border border-slate-100 flex items-center justify-between transition-all hover:border-slate-200 group cursor-pointer shadow-sm"
                          >
                            <div className="flex items-center gap-2.5">
                              {prompt.icon}
                              <span className="text-xs font-semibold text-slate-700 group-hover:text-[#0051A1] transition-colors">
                                {prompt.text}
                              </span>
                            </div>
                            <ArrowRight size={12} className="text-slate-400 group-hover:translate-x-1 transition-transform" />
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                ) : (
                  // Active conversation log
                  messages.map((m, i) => (
                    <div 
                      key={i} 
                      className={`p-4 rounded-2xl text-xs sm:text-sm leading-relaxed max-w-[85%] whitespace-pre-wrap transition-all shadow-sm ${
                        m.role === 'user' 
                          ? 'bg-[#0051A1] text-white self-end rounded-tr-none' 
                          : 'bg-slate-100 text-slate-800 self-start rounded-tl-none border border-slate-200/40'
                      }`}
                    >
                      {m.role === 'ai' ? (
                        <div className="space-y-2 [&_ul]:list-disc [&_ul]:ml-4 [&_ol]:list-decimal [&_ol]:ml-4 [&_code]:bg-slate-200 [&_code]:px-1 [&_code]:rounded [&_code]:text-xs [&_a]:text-[#0051A1] [&_a]:underline whitespace-normal">
                          {i === messages.length - 1 ? (
                            <TypingResponse text={m.text} />
                          ) : (
                            <ReactMarkdown>{m.text}</ReactMarkdown>
                          )}
                        </div>
                      ) : (
                        m.text
                      )}
                    </div>
                  ))
                )}
                {isLoading && <LoadingDots />}
                <div ref={messagesEndRef} />
              </div>

              {/* Chat Input Area */}
              <div className="p-5 border-t border-slate-100 flex gap-2 bg-slate-5/50">
                <input 
                  value={input} 
                  onChange={e => setInput(e.target.value)}
                  onKeyPress={e => e.key === 'Enter' && send(input)}
                  className="flex-1 border border-slate-200 rounded-2xl px-4 py-3 text-xs sm:text-sm bg-slate-50 text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#0051A1] placeholder-slate-400 transition-all shadow-inner" 
                  placeholder="Ask about SBI accounts, FDs, alerts..."
                  disabled={isLoading}
                />
                <button 
                  disabled={isLoading || !input.trim()} 
                  onClick={() => send(input)} 
                  className="bg-[#0051A1] hover:bg-[#003d7a] disabled:bg-slate-200 text-white p-3.5 rounded-2xl transition-all hover:scale-105 active:scale-95 shadow-md flex items-center justify-center shrink-0 cursor-pointer"
                >
                  <Send size={16} />
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
