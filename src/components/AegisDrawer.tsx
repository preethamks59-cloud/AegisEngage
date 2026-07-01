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
  ArrowRight,
  Play,
  Terminal,
  CheckCircle2,
  RefreshCw,
  Cpu,
  Layers,
  ShieldAlert,
  Lock,
  Check,
  Activity
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
  const [drawerTab, setDrawerTab] = useState<'simulator' | 'generalChat'>('simulator');
  const [messages, setMessages] = useState<{ role: 'user' | 'ai', text: string }[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Simulator State Machine
  const [simStep, setSimStep] = useState<number>(0);
  const [simRunning, setSimRunning] = useState<boolean>(false);
  const [simChoice, setSimChoice] = useState<'fd' | 'sip' | null>(null);
  const [simLogs, setSimLogs] = useState<string[]>([]);

  const startSimulation = () => {
    setSimChoice(null);
    setSimStep(1);
    setSimRunning(true);
    setSimLogs(["$ Initializing agentic supervisor loop...", "$ [System Event] Account trigger detected: IDLE_FUNDS_ALERT"]);
    
    // Step 2 timer
    setTimeout(() => {
      setSimStep(2);
      setSimLogs(prev => [
        ...prev,
        "-> LangGraph Supervisor routing to [Wealth Catalyst Agent]...",
        "-> [Wealth Catalyst Agent] executing RAG lookup on current SBI FD/RD interest rates...",
        "-> Fetching: 7.25% p.a. effective April 1, 2026."
      ]);
    }, 1200);

    // Step 3 timer
    setTimeout(() => {
      setSimStep(3);
      setSimRunning(false);
    }, 2800);
  };

  const handleSimChoice = (choice: 'fd' | 'sip') => {
    setSimChoice(choice);
    setSimStep(4);
  };

  const resetSimulation = () => {
    setSimStep(0);
    setSimRunning(false);
    setSimChoice(null);
    setSimLogs([]);
  };

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
        setDrawerTab('generalChat');
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

              {/* Tab Selector inside Drawer */}
              <div className="flex border-b border-slate-100 p-2 bg-slate-50/50 shrink-0">
                <button
                  onClick={() => setDrawerTab('simulator')}
                  className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    drawerTab === 'simulator'
                      ? 'bg-[#0051A1] text-white shadow-sm'
                      : 'text-slate-500 hover:text-slate-800'
                  }`}
                >
                  <Activity size={13} />
                  Agent Simulation
                </button>
                <button
                  onClick={() => setDrawerTab('generalChat')}
                  className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    drawerTab === 'generalChat'
                      ? 'bg-[#0051A1] text-white shadow-sm'
                      : 'text-slate-500 hover:text-slate-800'
                  }`}
                >
                  <MessageSquare size={13} />
                  General AI Chat
                </button>
              </div>
              
              {/* Messages viewport */}
              <div className="flex-1 overflow-y-auto p-5 space-y-4 flex flex-col scrollbar-thin">
                {drawerTab === 'simulator' ? (
                  <div className="flex flex-col space-y-5 h-full">
                    {/* Welcome / Header of Simulator */}
                    {simStep === 0 && (
                      <div className="my-auto space-y-5 text-center px-2">
                        <div className="inline-flex bg-gradient-to-tr from-[#0051A1] to-[#008a97] text-white p-4 rounded-3xl shadow-lg shadow-[#0051A1]/10">
                          <Cpu size={32} className="animate-spin-slow" />
                        </div>
                        <div className="space-y-2">
                          <h3 className="font-extrabold text-slate-800 text-base">Golden Demo Agentic Loop</h3>
                          <p className="text-xs text-slate-500 leading-relaxed max-w-sm mx-auto">
                            Witness real-time, proactive event-driven Multi-Agent coordination. 
                            Watch the pipeline trigger an idle balance signal, invoke LangGraph routing, 
                            execute RAG checks, and prepare a personalized financial strategy.
                          </p>
                        </div>

                        <div className="bg-slate-50 border border-slate-100 rounded-2xl p-4 text-left space-y-2 text-[11px] text-slate-500 leading-normal">
                          <div className="flex items-center gap-1.5 font-bold text-slate-700">
                            <Layers size={13} className="text-[#0051A1]" />
                            What's happening behind the scenes?
                          </div>
                          <div>
                            <strong>Step 1:</strong> System monitors accounts and fires a balance alert.<br />
                            <strong>Step 2:</strong> LangGraph Supervisor dynamically matches high-yield investment options via RAG search.<br />
                            <strong>Step 3:</strong> Proactive suggestion & instant setup CTAs are built.
                          </div>
                        </div>

                        <button
                          onClick={startSimulation}
                          className="w-full flex items-center justify-center gap-2 py-3.5 bg-[#0051A1] hover:bg-[#003d7a] text-white rounded-2xl font-bold text-xs shadow-md transition-all cursor-pointer hover:scale-[1.01]"
                        >
                          <Play size={14} fill="currentColor" />
                          Run Live Agentic Loop Simulation
                        </button>
                      </div>
                    )}

                    {/* Simulation Running / Completed States */}
                    {simStep > 0 && (
                      <div className="space-y-4 animate-fadeIn">
                        {/* Status bar */}
                        <div className="flex items-center justify-between bg-slate-50 p-3 rounded-2xl border border-slate-100">
                          <div className="flex items-center gap-2">
                            <Activity size={14} className="text-[#0051A1] animate-pulse" />
                            <span className="text-[11px] font-bold text-slate-700">Live Agent Pipeline State</span>
                          </div>
                          <span className={`text-[10px] font-extrabold px-2.5 py-0.5 rounded-full uppercase ${
                            simStep === 4 
                              ? 'bg-emerald-50 text-emerald-700 border border-emerald-100'
                              : 'bg-blue-50 text-blue-700 border border-blue-100 animate-pulse'
                          }`}>
                            {simStep === 1 && "Triggering Alert"}
                            {simStep === 2 && "Routing & RAG"}
                            {simStep === 3 && "Awaiting Arjun's Action"}
                            {simStep === 4 && "Completed"}
                          </span>
                        </div>

                        {/* Step 1 Component: System Event Trigger */}
                        <div className={`p-4 rounded-2xl border transition-all ${
                          simStep >= 1 ? 'border-red-100 bg-red-50/50' : 'border-slate-100 bg-slate-50/20 opacity-40'
                        }`}>
                          <div className="flex items-center justify-between">
                            <span className="text-[10px] font-extrabold text-red-600 uppercase tracking-wider">Step 1: Event Signal</span>
                            <span className="text-[10px] text-slate-400 font-bold">Triggered</span>
                          </div>
                          <h4 className="font-extrabold text-slate-900 text-xs sm:text-sm mt-1.5 flex items-center gap-1.5">
                            <ShieldAlert size={14} className="text-red-500 animate-bounce" />
                            Idle Balance Signal: INR 50,000 Detected
                          </h4>
                          <p className="text-[11px] text-slate-600 leading-normal mt-1">
                            System signal triggered: INR 50,000 has remained completely static in Savings Account (Acc: ***3849) for over 45 days.
                          </p>
                        </div>

                        {/* Step 2 Component: Terminal Output */}
                        <div className={`p-4 rounded-2xl border transition-all ${
                          simStep >= 2 ? 'border-slate-800 bg-slate-950 text-slate-300' : 'border-slate-100 bg-slate-50/20 opacity-40 text-slate-400'
                        }`}>
                          <div className="flex items-center justify-between pb-2 border-b border-slate-800/40">
                            <span className="text-[10px] font-extrabold text-[#008a97] uppercase tracking-wider flex items-center gap-1">
                              <Terminal size={12} />
                              Step 2: LangGraph Orchestrator Log
                            </span>
                            {simStep === 2 && <span className="w-1.5 h-1.5 bg-[#008a97] rounded-full animate-ping" />}
                          </div>
                          <div className="font-mono text-[10px] space-y-1.5 mt-2 leading-relaxed">
                            {simLogs.map((log, lIdx) => (
                              <div key={lIdx} className={log.startsWith('$') ? 'text-slate-400 font-bold' : log.startsWith('-> LangGraph') ? 'text-amber-400' : 'text-emerald-400'}>
                                {log}
                              </div>
                            ))}
                            {simStep === 1 && <div className="text-slate-500 animate-pulse">Waiting for pipeline trigger...</div>}
                            {simRunning && simStep === 2 && (
                              <div className="flex items-center gap-1.5 text-[#008a97] font-bold animate-pulse">
                                <RefreshCw size={10} className="animate-spin" />
                                Processing RAG embeddings on corporate index...
                              </div>
                            )}
                          </div>
                        </div>

                        {/* Step 3 Component: Personalized Recommendation Widget */}
                        <div className={`p-4 rounded-2xl border transition-all ${
                          simStep >= 3 ? 'border-[#0051A1]/20 bg-gradient-to-tr from-[#0051A1]/5 to-[#008a97]/5' : 'border-slate-100 bg-slate-50/20 opacity-40'
                        }`}>
                          <div className="flex items-center justify-between">
                            <span className="text-[10px] font-extrabold text-[#0051A1] uppercase tracking-wider">Step 3: Aegis Proactive Action</span>
                            <span className="text-[10px] font-bold text-slate-500">Live Yield Match</span>
                          </div>
                          
                          <div className="mt-3 flex items-start gap-2.5">
                            <div className="bg-[#0051A1] text-white p-1.5 rounded-lg shrink-0 mt-0.5">
                              <Bot size={14} />
                            </div>
                            <div>
                              <p className="text-xs text-slate-800 font-bold leading-normal">
                                Namaste Arjun, we noticed an idle balance of ₹50,000. Instead of letting it sit, would you like to instantly ladder this into a 7.25% Fixed Deposit or set up a Micro-SIP?
                              </p>
                            </div>
                          </div>

                          {/* CTAs */}
                          {simStep === 3 && (
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-4 animate-fadeIn">
                              <button
                                onClick={() => handleSimChoice('fd')}
                                className="py-2.5 px-3 bg-[#0051A1] hover:bg-[#003d7a] text-white rounded-xl text-[11px] font-extrabold shadow-sm transition-all text-center cursor-pointer hover:scale-[1.02]"
                              >
                                Build 7.25% FD Ladder Now
                              </button>
                              <button
                                onClick={() => handleSimChoice('sip')}
                                className="py-2.5 px-3 bg-[#008a97] hover:bg-[#006e78] text-white rounded-xl text-[11px] font-extrabold shadow-sm transition-all text-center cursor-pointer hover:scale-[1.02]"
                              >
                                Explore Micro-SIP
                              </button>
                            </div>
                          )}

                          {simChoice && (
                            <div className="mt-2 text-[11px] font-semibold text-slate-500">
                              Selected Action: <span className="text-[#0051A1] font-bold uppercase">{simChoice === 'fd' ? "7.25% FD Ladder Setup" : "Micro-SIP Exploration"}</span>
                            </div>
                          )}
                        </div>

                        {/* Step 4 Component: Success Response Payload */}
                        {simStep === 4 && (
                          <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-2xl space-y-2.5 animate-scaleIn">
                            <div className="flex items-center gap-2 text-emerald-800 font-extrabold text-xs">
                              <CheckCircle2 size={16} className="text-emerald-600 animate-bounce" />
                              Transaction simulated successfully via secure tokenized API pipeline.
                            </div>
                            <div className="font-mono text-[9px] bg-white border border-emerald-100 p-2.5 rounded-lg text-slate-600 leading-normal space-y-1">
                              <div className="font-bold text-slate-700">API ROUTE INTEGRATION CONFIRMED:</div>
                              <div>STATUS: 200 OK | METHOD: POST | ENDPOINT: /api/wealth/simulate</div>
                              <div>PAYLOAD: {"{"} client_id: "arjun_sharma_001", action: "{simChoice}", amount: 50000, rate: "7.25%" {"}"}</div>
                              <div className="truncate">AUTH_HASH: sbi_aegis_token_902914a8f342bc48d90e21a8d</div>
                            </div>

                            <button
                              onClick={resetSimulation}
                              className="w-full py-2.5 bg-slate-800 hover:bg-slate-900 text-white rounded-xl text-xs font-bold transition-all mt-2 cursor-pointer flex items-center justify-center gap-1.5"
                            >
                              <RefreshCw size={12} />
                              Run Another Simulation
                            </button>
                          </div>
                        )}

                        {/* Controls for resetting simulation when not finished */}
                        {simStep > 0 && simStep < 4 && (
                          <div className="flex justify-end pt-2">
                            <button
                              onClick={resetSimulation}
                              disabled={simRunning}
                              className="text-[10px] text-slate-400 font-bold hover:text-slate-600 transition-colors cursor-pointer flex items-center gap-1 disabled:opacity-40"
                            >
                              <RefreshCw size={10} />
                              Reset Simulation
                            </button>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                ) : (
                  messages.length === 0 ? (
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
                  )
                )}
                {isLoading && <LoadingDots />}
                <div ref={messagesEndRef} />
              </div>

              {/* Chat Input Area */}
              <div className="p-5 border-t border-slate-100 flex gap-2 bg-slate-5/50">
                <input 
                  value={input} 
                  onChange={e => setInput(e.target.value)}
                  onKeyPress={e => {
                    if (e.key === 'Enter') {
                      if (drawerTab !== 'generalChat') {
                        setDrawerTab('generalChat');
                      }
                      send(input);
                    }
                  }}
                  className="flex-1 border border-slate-200 rounded-2xl px-4 py-3 text-xs sm:text-sm bg-slate-50 text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#0051A1] placeholder-slate-400 transition-all shadow-inner" 
                  placeholder={drawerTab === 'simulator' ? "Type here to auto-switch & ask General AI..." : "Ask about SBI accounts, FDs, alerts..."}
                  disabled={isLoading}
                />
                <button 
                  disabled={isLoading || !input.trim()} 
                  onClick={() => {
                    if (drawerTab !== 'generalChat') setDrawerTab('generalChat');
                    send(input);
                  }} 
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
