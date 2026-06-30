import React from 'react';

export default function TeamAchievements({ achievements }) {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
      <div className="text-center mb-16">
        <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white mb-4">Milestones & Achievements</h2>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
        {achievements.map((ta, i) => (
          <div key={i} className="flex gap-6 p-8 bg-white dark:bg-white/5 rounded-3xl border border-slate-200 dark:border-white/10 items-start">
            <div className="shrink-0">{ta.icon}</div>
            <div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">{ta.title}</h3>
              <p className="text-slate-600 dark:text-neutral-400">{ta.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}