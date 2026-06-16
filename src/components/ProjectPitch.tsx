import React from 'react';

export default function ProjectPitch() {
  return (
    <div className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden p-6 mt-6">
      <h2 className="font-bold text-slate-800 text-lg mb-4">About AegisEngage</h2>
      <p className="text-slate-600 text-sm mb-4">
        AegisEngage is a next-generation, context-aware Agentic AI companion designed to revolutionize digital banking engagement for SBI customers. 
        It leverages autonomous agents to provide personalized financial guidance, gamified onboarding, and proactive security, acting as a financial guardian and growth partner.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs text-slate-500">
        <div>
            <h3 className="font-bold text-slate-800 mb-1">Business Value</h3>
            <p>Increased conversion through hyper-personalized recommendations, reduced churn via proactive engagement, and operational cost savings through autonomous query handling.</p>
        </div>
        <div>
            <h3 className="font-bold text-slate-800 mb-1">Architecture</h3>
            <p>Multi-agent orchestration (LangChain/LangGraph), RAG system using vector databases for banking knowledge, guarded by NeMo for compliance.</p>
        </div>
      </div>
    </div>
  );
}
