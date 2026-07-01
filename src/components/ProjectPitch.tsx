import React, { useState } from 'react';
import { 
  Building2, 
  Globe2, 
  Compass, 
  Layers, 
  ShieldAlert, 
  Percent, 
  Briefcase, 
  Award, 
  MapPin, 
  Users2, 
  HelpCircle,
  TrendingUp,
  ShieldCheck,
  Smartphone,
  CheckCircle2
} from 'lucide-react';

export default function ProjectPitch() {
  const [activeTab, setActiveTab] = useState<'profile' | 'network' | 'values' | 'products'>('profile');

  // Subsidiary Data
  const subsidiaries = [
    { name: 'SBI Mutual Fund', description: 'Premier wealth creation and portfolio advisory schemes.' },
    { name: 'SBI Card', description: 'Top-tier lifestyle, travel, and contactless transaction credit cards.' },
    { name: 'SBI Life Insurance', description: 'Comprehensive individual and corporate security coverages.' },
    { name: 'SBI General Insurance', description: 'Robust non-life risk mitigation and assets coverage.' }
  ];

  // S.T.E.P.S. Core Values
  const stepsValues = [
    { letter: 'S', name: 'Service', desc: 'Putting customer satisfaction at the heart of our operations with uncompromised dedication.' },
    { letter: 'T', name: 'Transparency', desc: 'Ensuring honest, ethical communication and absolute clarity in all banking records.' },
    { letter: 'E', name: 'Ethics', desc: 'Upholding strict moral guidelines, institutional fairness, and regulatory adherence.' },
    { letter: 'P', name: 'Politeness', desc: 'Delivering humble, warm, and professional assistance across every public interaction.' },
    { letter: 'S', name: 'Sustainability', desc: 'Pioneering green banking initiatives and eco-conscious financing solutions.' }
  ];

  // Interest rate products
  const productList = [
    'Home Loan', 'Personal Loan', 'Pension Loan', 'SB Account', 
    'Gold Loan', 'NRE SB Account', 'Education Loan', 'Auto Loan', 
    'Fixed Deposit', 'PM Surya Ghar', 'Loan Against MF', 'Agriculture Loans'
  ];

  return (
    <div id="sbi-about-container" className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden p-6 sm:p-8 mt-6">
      {/* Brand Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-slate-100 pb-6 mb-6">
        <div className="flex items-start gap-4">
          <div className="bg-gradient-to-tr from-[#0051A1] to-[#008a97] text-white p-3.5 rounded-2xl shadow-md shadow-[#0051A1]/15 shrink-0">
            <Building2 size={26} />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-black text-[#0051A1] tracking-wider uppercase bg-[#0051A1]/5 px-2.5 py-0.5 rounded-full">
                Fortune 500 Company
              </span>
              <span className="text-[10px] text-slate-500 font-bold bg-slate-100 px-2.5 py-0.5 rounded-full">
                Est. Over 200 Years
              </span>
            </div>
            <h2 className="font-black text-slate-900 text-xl sm:text-2xl mt-1.5">State Bank of India (SBI)</h2>
            <p className="text-xs text-slate-500 mt-1">India's largest multinational, public sector financial services statutory body</p>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-slate-100 pb-px mb-6 overflow-x-auto gap-2 scrollbar-none">
        {[
          { id: 'profile', label: 'Corporate Profile', icon: <Compass size={14} /> },
          { id: 'network', label: 'Network & Scale', icon: <Globe2 size={14} /> },
          { id: 'values', label: 'STEPS Values', icon: <Award size={14} /> },
          { id: 'products', label: 'Products & Interest', icon: <Percent size={14} /> }
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all border cursor-pointer ${
              activeTab === tab.id
                ? 'bg-slate-900 text-white border-slate-900 shadow-sm'
                : 'text-slate-500 border-transparent hover:text-slate-800 hover:bg-slate-50'
            }`}
          >
            {tab.icon}
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab Content Panels */}
      <div className="min-h-[220px]">
        {activeTab === 'profile' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            <div className="lg:col-span-7 space-y-4">
              <h3 className="font-extrabold text-slate-950 text-base">Generational Legacy of Trust</h3>
              <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                As a premier multinational, public sector banking and financial services statutory body headquartered in Mumbai, 
                the <strong>State Bank of India</strong> commands a rich legacy spanning over 200 years. Widely recognized as the most trusted 
                bank by generations of Indian citizens, SBI seamlessly blends traditional stability with modern innovation to secure the 
                financial future of millions.
              </p>
              
              <div className="pt-2">
                <h4 className="font-bold text-xs text-slate-400 uppercase tracking-wider mb-2.5">Key Subsidiaries</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {subsidiaries.map((s, idx) => (
                    <div key={idx} className="p-3 bg-slate-50 rounded-xl border border-slate-100/60">
                      <div className="font-bold text-slate-800 text-xs">{s.name}</div>
                      <div className="text-[10px] text-slate-500 mt-0.5">{s.description}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="lg:col-span-5 bg-gradient-to-br from-[#0051A1]/5 to-[#008a97]/5 border border-[#0051A1]/10 p-5 rounded-2xl space-y-4">
              <div className="flex gap-2 items-center pb-2.5 border-b border-slate-200/50">
                <Building2 className="text-[#0051A1]" size={16} />
                <span className="font-bold text-xs text-slate-800">Corporate Identity</span>
              </div>
              <table className="w-full text-xs">
                <tbody>
                  <tr className="border-b border-slate-100 pb-2">
                    <td className="py-2 text-slate-400 font-medium">Headquarters</td>
                    <td className="py-2 text-slate-800 font-bold text-right">Mumbai, India</td>
                  </tr>
                  <tr className="border-b border-slate-100 pb-2">
                    <td className="py-2 text-slate-400 font-medium">Global Status</td>
                    <td className="py-2 text-slate-800 font-bold text-right text-[#0051A1]">Fortune 500 Listing</td>
                  </tr>
                  <tr className="border-b border-slate-100 pb-2">
                    <td className="py-2 text-slate-400 font-medium">Corporate Form</td>
                    <td className="py-2 text-slate-800 font-bold text-right">Financial Services Statutory Body</td>
                  </tr>
                  <tr>
                    <td className="py-2 text-slate-400 font-medium">Primary Focus</td>
                    <td className="py-2 text-slate-800 font-bold text-right text-emerald-600">Innovation & Customer Centricity</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === 'network' && (
          <div className="space-y-6">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {[
                { label: 'Total Assets Base', value: 'Over Rs. 61tn', icon: <Briefcase className="text-[#0051A1]" size={16} /> },
                { label: 'Active Customer Base', value: 'Over 50 Crore', icon: <Users2 className="text-[#0051A1]" size={16} /> },
                { label: 'Domestic Branches', value: 'Over 23,270', icon: <MapPin className="text-[#0051A1]" size={16} /> },
                { label: 'ATM & ADWM Network', value: 'Over 63,580', icon: <Layers className="text-[#0051A1]" size={16} /> }
              ].map((stat, i) => (
                <div key={i} className="p-4 bg-slate-50 rounded-2xl border border-slate-100 flex flex-col justify-between min-h-[100px]">
                  <div className="flex justify-between items-center text-slate-400">
                    <span className="text-[9px] font-bold uppercase tracking-wider">{stat.label}</span>
                    {stat.icon}
                  </div>
                  <div className="text-slate-900 font-black text-sm sm:text-base mt-2">{stat.value}</div>
                </div>
              ))}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 flex items-start gap-3.5">
                <div className="p-2.5 bg-blue-50 text-[#0051A1] rounded-xl shrink-0">
                  <Globe2 size={18} />
                </div>
                <div>
                  <h4 className="font-bold text-xs sm:text-sm text-slate-800">Global Financial Footprint</h4>
                  <p className="text-[11px] sm:text-xs text-slate-500 leading-relaxed mt-1">
                    Operating continuously across multiple time zones with <strong>241 international offices</strong> spread over <strong>29 foreign countries</strong>, maintaining robust global liquidity parameters.
                  </p>
                </div>
              </div>

              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 flex items-start gap-3.5">
                <div className="p-2.5 bg-[#008a97]/10 text-[#008a97] rounded-xl shrink-0">
                  <Users2 size={18} />
                </div>
                <div>
                  <h4 className="font-bold text-xs sm:text-sm text-slate-800">Business Correspondent (BC) Outlets</h4>
                  <p className="text-[11px] sm:text-xs text-slate-500 leading-relaxed mt-1">
                    Driving uninhibited financial inclusion deep into rural landscapes through a dedicated network of <strong>over 82,900 outlets</strong>.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'values' && (
          <div className="space-y-4">
            <div className="text-xs sm:text-sm text-slate-500 leading-relaxed max-w-2xl">
              Our growth framework is undeterred in offering responsible and sustainable banking solutions guided by the official <strong>S.T.E.P.S. Core Value Pillars</strong>:
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-5 gap-3">
              {stepsValues.map((v, i) => (
                <div key={i} className="p-4 rounded-2xl border border-slate-100 bg-slate-50/40 relative group hover:bg-slate-50 transition-colors">
                  <div className="font-black text-2xl text-[#0051A1]/20 group-hover:text-[#0051A1]/40 transition-colors">{v.letter}</div>
                  <h4 className="font-extrabold text-xs text-slate-800 mt-1">{v.name}</h4>
                  <p className="text-[10px] text-slate-400 mt-1 leading-relaxed">{v.desc}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'products' && (
          <div className="space-y-4">
            {/* Rates Header */}
            <div className="p-4 bg-emerald-50/60 border border-emerald-100/80 rounded-2xl flex flex-col sm:flex-row justify-between sm:items-center gap-2">
              <div className="flex items-center gap-2 text-emerald-800 font-bold text-xs sm:text-sm">
                <TrendingUp size={16} />
                General Interest Rates: Starting from 7.25% p.a. onwards
              </div>
              <span className="text-[9px] font-bold text-emerald-600 bg-white border border-emerald-200/50 px-2.5 py-0.5 rounded-full uppercase">
                Effective April 1, 2026
              </span>
            </div>

            {/* Applicable Products Tags list */}
            <div>
              <span className="text-[10px] font-black text-slate-400 uppercase tracking-wider block mb-3 pl-1">
                Applicable Retail & Agriculture Loans
              </span>
              <div className="flex flex-wrap gap-1.5">
                {productList.map((product, idx) => (
                  <span 
                    key={idx}
                    className="px-3 py-1.5 bg-slate-50 hover:bg-slate-100 text-slate-700 text-xs font-semibold rounded-xl border border-slate-100 transition-colors"
                  >
                    {product}
                  </span>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Critical Security Warning Section */}
      <div className="mt-8 border-t border-slate-100 pt-6">
        <div className="p-5 bg-red-50 border border-red-100/80 rounded-2xl flex flex-col md:flex-row items-start gap-4">
          <div className="bg-red-500 text-white p-2.5 rounded-xl shrink-0 shadow-sm shadow-red-500/10">
            <ShieldAlert size={20} />
          </div>
          <div className="space-y-1.5 flex-1">
            <h4 className="font-extrabold text-red-900 text-xs sm:text-sm">CRITICAL SECURITY POLICY WARNING</h4>
            <p className="text-red-700 text-[11px] sm:text-xs leading-relaxed font-medium">
              State Bank of India absolutely <strong>never asks</strong> for your user ID, password, PIN, or One Time Password (OTP) 
              via phone calls, SMS, or emails. Any such communication is a fraudulent attempt to withdraw money. 
              <strong> Never share these credentials with anyone.</strong> Suspected fraud can be reported directly to our security channels.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
