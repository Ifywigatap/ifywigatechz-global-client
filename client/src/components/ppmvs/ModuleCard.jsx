import { Link } from 'react-router-dom';
import { PlayIcon, LockClosedIcon } from '@heroicons/react/24/outline';
import { useMemo } from 'react';

export default function ModuleCard({ module }) {
  const isUnlocked = useMemo(() => !module.locked, [module.locked]);

  return (
    <article
      className={`group relative overflow-hidden rounded-[1.75rem] border p-6 transition-all duration-300 ${
        isUnlocked
          ? 'border-cyan-400/30 bg-slate-950/70 shadow-2xl shadow-cyan-500/10'
          : 'border-slate-700/40 bg-slate-900/60'
      }`}
    >
      <div className="pointer-events-none absolute inset-0 rounded-[1.75rem] bg-[radial-gradient(circle_at_top_right,_rgba(34,211,238,0.18),_transparent_30%)] opacity-0 transition duration-500 group-hover:opacity-100" />

      <div className="relative flex items-center justify-between gap-3">
        <div className="flex h-12 w-12 items-center justify-center rounded-3xl bg-slate-800 text-lg font-black text-cyan-300 shadow-inner shadow-cyan-500/10">
          {module.icon}
        </div>

        <span
          className={`rounded-full px-3 py-1 text-xs font-bold uppercase tracking-wide ${
            isUnlocked
              ? 'bg-emerald-400/20 text-emerald-300'
              : 'bg-amber-400/20 text-amber-300'
          }`}
        >
          {module.badge}
        </span>
      </div>

      <h3 className="relative mt-6 text-xl font-bold text-white transition group-hover:text-cyan-300">
        {module.title}
      </h3>

      <p className="relative mt-3 text-sm leading-relaxed text-slate-300">
        {module.description}
      </p>

      <div className="mt-5 flex flex-wrap gap-2 text-xs text-slate-400">
        <span className="inline-flex items-center gap-2 rounded-full border border-slate-700/60 bg-slate-950/70 px-3 py-1">
          <PlayIcon className="h-3.5 w-3.5 text-cyan-300" />
          {module.duration}
        </span>
        {!module.locked && (
          <span className="inline-flex items-center rounded-full bg-cyan-500/10 px-3 py-1 text-cyan-200">
            Available now
          </span>
        )}
      </div>

      {isUnlocked ? (
        <Link
          to={`/ppmvs/module/${module.id}`}
          className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-500 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-cyan-500/20 transition-transform duration-300 hover:-translate-y-0.5 hover:scale-[1.01] active:scale-[0.97]"
        >
          <PlayIcon className="h-4 w-4" />
          Continue learning
        </Link>
      ) : (
        <div className="mt-6 flex h-12 items-center justify-center rounded-2xl border border-slate-700/60 bg-slate-900/70 text-sm font-semibold text-slate-400">
          <LockClosedIcon className="h-4 w-4 text-amber-300" />
          <span className="ml-2">Locked module</span>
        </div>
      )}
    </article>
  );
}