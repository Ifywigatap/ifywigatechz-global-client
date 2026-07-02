import React from 'react';

export default function HiringProcess({ process }) {
  return (
    <div className="bg-slate-900 text-white py-24">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">Join The Journey</h2>
          <p className="text-neutral-400">Our straightforward hiring process to find the perfect fit.</p>
        </div>
        <div className="space-y-4">
          {process.map((step, i) => (
            <div key={i} className="flex gap-8 items-center bg-white/5 p-6 rounded-3xl border border-white/10 hover:bg-white/10 transition-colors">
              <div className="w-16 h-16 shrink-0 bg-brandBlue/20 rounded-2xl flex items-center justify-center text-brandBlue">
                {step.icon}
              </div>
              <div>
                <div className="text-xs font-bold text-brandGold uppercase mb-1">Step 0{step.step}</div>
                <h3 className="text-xl font-bold mb-1">{step.title}</h3>
                <p className="text-neutral-400 text-sm">{step.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}