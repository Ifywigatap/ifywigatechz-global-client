import { INSTRUCTOR } from '../../data/ppmvsData.js';

export default function InstructorBio() {
  return (
    <div className="group relative rounded-2xl border border-slate-700/50 bg-gradient-to-br from-slate-900 to-slate-950 p-8 shadow-2xl hover:shadow-cyan-500/20 transition-all hover:-translate-y-1">
      <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/5 via-transparent to-blue-500/5 opacity-0 group-hover:opacity-100 transition" />
      <div className="relative flex items-start gap-6">
        <div className="relative h-24 w-24 flex-shrink-0 overflow-hidden rounded-2xl border-2 border-white/20 shadow-2xl">
          <img src={INSTRUCTOR.image} alt={INSTRUCTOR.name} className="h-full w-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
        </div>
        <div className="flex-1 pt-2">
          <h3 className="text-2xl font-bold text-white">{INSTRUCTOR.name}</h3>
          <p className="mt-1 text-sm text-cyan-300">{INSTRUCTOR.role}</p>
          <div className="mt-3 flex items-center gap-1 text-sm text-emerald-400">
            ★ {INSTRUCTOR.rating} (127 reviews)
          </div>
          <p className="mt-4 max-w-md text-sm leading-relaxed text-slate-300">{INSTRUCTOR.bio}</p>
        </div>
      </div>
    </div>
  );
}

