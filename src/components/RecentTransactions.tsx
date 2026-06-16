import React from 'react';

const TRANSACTIONS = [
  { id: 1, desc: 'ATM Withdrawal', amount: '-₹5,000', status: 'Completed', date: 'Jun 16' },
  { id: 2, desc: 'Online Purchase - Flipkart', amount: '-₹1,299', status: 'Pending', date: 'Jun 15' },
  { id: 3, desc: 'Salary Credit', amount: '+₹75,000', status: 'Completed', date: 'Jun 01' },
];

export default function RecentTransactions() {
  return (
    <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-sm overflow-hidden mt-6">
      <div className="p-5 border-b border-slate-100 dark:border-slate-800">
        <h2 className="font-bold text-slate-800 dark:text-white">Recent Transactions</h2>
      </div>
      <div className="divide-y divide-slate-100 dark:divide-slate-800">
        {TRANSACTIONS.map(tx => (
          <div key={tx.id} className="p-4 flex items-center justify-between hover:bg-slate-50 dark:hover:bg-slate-800">
            <div>
              <p className="font-semibold text-slate-900 dark:text-white">{tx.desc}</p>
              <p className="text-sm text-slate-500 dark:text-slate-400">{tx.date}</p>
            </div>
            <div className="text-right">
              <p className={`font-bold ${tx.amount.startsWith('+') ? 'text-green-600 dark:text-green-400' : 'text-slate-900 dark:text-white'}`}>{tx.amount}</p>
              <span className={`text-[10px] font-bold uppercase ${tx.status === 'Completed' ? 'text-green-600 bg-green-50 dark:text-green-400 dark:bg-green-900/30 px-2 py-0.5 rounded-md' : 'text-amber-600 bg-amber-50 dark:text-amber-400 dark:bg-amber-900/30 px-2 py-0.5 rounded-md'}`}>
                {tx.status}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
