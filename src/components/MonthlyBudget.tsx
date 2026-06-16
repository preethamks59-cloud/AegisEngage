import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';

const DATA = [
  { name: 'Utilities', value: 400 },
  { name: 'Groceries', value: 300 },
  { name: 'Entertainment', value: 300 },
  { name: 'Savings', value: 200 },
];

const COLORS = ['#0051A1', '#008a97', '#F59E0B', '#10B981'];

export default function MonthlyBudget() {
  return (
    <div className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden mt-6 p-6">
      <h2 className="font-bold text-slate-800 text-lg mb-4">Monthly Budget Overview</h2>
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie data={DATA} innerRadius={60} outerRadius={80} paddingAngle={5} dataKey="value">
              {DATA.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </div>
      <div className="grid grid-cols-2 gap-2 mt-4">
        {DATA.map((item, index) => (
            <div key={item.name} className="flex items-center gap-2 text-xs">
                <div className="w-3 h-3 rounded-full" style={{ background: COLORS[index] }}></div>
                <span className="text-slate-600">{item.name}</span>
            </div>
        ))}
      </div>
    </div>
  );
}
