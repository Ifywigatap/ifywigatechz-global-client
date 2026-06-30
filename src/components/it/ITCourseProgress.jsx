import { useState, useEffect } from 'react';
import { CheckIcon, ClockIcon } from '@heroicons/react/24/solid';

export default function ITCourseProgress() {
  const [progress, setProgress] = useState(25);

  useEffect(() => {
    const saved = localStorage.getItem('itProgress');
    if (saved) setProgress(JSON.parse(saved).percent || 0);
  }, []);

  const saveProgress = (percent) => {
    setProgress(percent);
    localStorage.setItem('itProgress', JSON.stringify({ percent, completed: [1, 2] }));
  };

  const modules = [25, 0, 0, 0];

  return (
    <div className="rounded-2xl border border-slate-700/50 bg-slate-900/50 p-6 shadow-xl">
      <h3 className="mb-4 text-lg font-bold text-white">IT Course Progress</h3>
      <div className="space-y-3">
        {modules.map((p, i) => (
          <div key={i} className="flex items-center gap-3">
            <div className="flex h-2.5 w-2.5 items-center justify-center rounded-full bg-slate-600 font-bold text-xs">
              {p > 0 ? <CheckIcon className="h-3 w-3 text-emerald-400" /> : i + 1}
            </div>
            <div className="flex-1">
              <div className="h-2 w-full rounded-full bg-slate-700">
                <div className="h-2 rounded-full bg-gradient-to-r from-emerald-400 to-teal-400 transition-all" style={{ width: `${p}%` }} />
              </div>
            </div>
            <span className="text-sm font-semibold text-slate-300">{p}%</span>
          </div>
        ))}
      </div>
      <div className="mt-6 rounded-xl bg-emerald-500/10 p-4">
        <div className="flex items-center gap-2 text-sm text-emerald-300">
          <ClockIcon className="h-4 w-4" />
          <span>Overall: {progress}% complete • Next: Module 2</span>
        </div>
      </div>
    </div>
  );
}
