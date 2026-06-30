import React from 'react';

export default function ProductCulture({ culture }) {
  return (
    <div className="bg-slate-100 dark:bg-white/5 py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white mb-4">Our Product Culture</h2>
          <p className="text-slate-600 dark:text-neutral-400 max-w-2xl mx-auto">How we build products that define industries.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {culture.map((pc, i) => (
            <div key={i} className="space-y-4">
              <div className="w-12 h-12 bg-white dark:bg-white/10 rounded-xl flex items-center justify-center shadow-sm">
                {pc.icon}
              </div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white">{pc.title}</h3>
              <p className="text-slate-600 dark:text-neutral-400 text-sm">{pc.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}