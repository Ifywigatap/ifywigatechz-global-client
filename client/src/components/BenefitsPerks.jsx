import React from 'react';

export default function BenefitsPerks({ benefits }) {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
      <div className="text-center mb-16">
        <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white mb-4">Why Join Us?</h2>
        <p className="text-slate-600 dark:text-neutral-400">Our benefits are designed to support your professional and personal life.</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {benefits.map((bp, i) => (
          <div key={i} className="p-8 bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-[2rem] hover:shadow-xl transition-all duration-300">
            <div className="mb-6">{bp.icon}</div>
            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">{bp.title}</h3>
            <p className="text-slate-600 dark:text-neutral-400 text-sm leading-relaxed">{bp.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
}