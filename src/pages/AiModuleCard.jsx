import { Link } from 'react-router-dom';
import { LockClosedIcon, SparklesIcon } from '@heroicons/react/24/solid';

export default function AiModuleCard({ module }) {
  const isLocked = module.locked;

  const content = (
    <div
      className={`group relative flex h-full flex-col justify-between rounded-2xl border p-6 transition-all duration-300 ${
        isLocked
          ? 'border-slate-700 bg-slate-800/50'
          : 'border-teal-500/30 bg-gradient-to-br from-teal-500/10 to-cyan-500/10 hover:border-teal-400/60 hover:shadow-2xl hover:shadow-teal-500/10'
      }`}
    >
      <div className="relative z-10">
        <div className="flex items-center justify-between">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-slate-700 text-xl font-bold text-teal-300">
            {module.icon}
          </div>
          {isLocked ? (
            <LockClosedIcon className="h-5 w-5 text-slate-500" />
          ) : (
            <SparklesIcon className="h-5 w-5 text-cyan-400" />
          )}
        </div>
        <h3 className="mt-4 text-lg font-semibold text-white">{module.title}</h3>
        <p className="mt-2 text-sm text-slate-400">{module.description}</p>
      </div>
      <div className="relative z-10 mt-4 flex items-center justify-between text-xs">
        <span
          className={`rounded-full px-3 py-1 font-medium ${
            isLocked ? 'bg-slate-700 text-slate-400' : 'bg-teal-500/20 text-teal-300'
          }`}
        >
          {module.duration}
        </span>
        <span className={`font-semibold ${isLocked ? 'text-slate-500' : 'text-cyan-300'}`}>
          {module.badge}
        </span>
      </div>
    </div>
  );

  return isLocked ? <div className="cursor-not-allowed">{content}</div> : <Link to={`/ai/module/${module.id}`}>{content}</Link>;
}