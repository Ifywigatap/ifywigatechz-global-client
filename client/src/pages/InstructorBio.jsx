const themes = {
  graphic: {
    shadow: 'hover:shadow-purple-500/20',
    gradient: 'from-purple-500/5 via-transparent to-pink-500/5',
    roleText: 'text-purple-300',
    ratingText: 'text-purple-400',
  },
  it: {
    shadow: 'hover:shadow-emerald-500/20',
    gradient: 'from-emerald-500/5 via-transparent to-teal-500/5',
    roleText: 'text-emerald-300',
    ratingText: 'text-emerald-400',
  },
  microsoft: {
    shadow: 'hover:shadow-blue-500/20',
    gradient: 'from-blue-500/5 via-transparent to-cyan-500/5',
    roleText: 'text-blue-300',
    ratingText: 'text-blue-400',
  },
  ai: {
    shadow: 'hover:shadow-teal-500/20',
    gradient: 'from-teal-500/5 via-transparent to-cyan-500/5',
    roleText: 'text-teal-300',
    ratingText: 'text-teal-400',
  },
  cybersecurity: {
    shadow: 'hover:shadow-red-500/20',
    gradient: 'from-red-500/5 via-transparent to-orange-500/5',
    roleText: 'text-red-300',
    ratingText: 'text-red-400',
  },
  default: {
    shadow: 'hover:shadow-slate-500/20',
    gradient: 'from-slate-500/5 via-transparent to-slate-500/5',
    roleText: 'text-slate-300',
    ratingText: 'text-slate-400',
  }
};

export default function InstructorBio({ instructor, theme = 'default' }) {
  const currentTheme = themes[theme] || themes.default;

  return (
    <div className={`group relative rounded-2xl border border-slate-700/50 bg-gradient-to-br from-slate-900 to-slate-950 p-8 shadow-2xl ${currentTheme.shadow} transition-all hover:-translate-y-1`}>
      <div className={`absolute inset-0 bg-gradient-to-r ${currentTheme.gradient} opacity-0 group-hover:opacity-100 transition`} />
      <div className="relative flex items-start gap-6">
        <div className="relative h-24 w-24 flex-shrink-0 overflow-hidden rounded-2xl border-2 border-white/20 shadow-2xl">
          <img src={instructor.avatar} alt={instructor.name} className="h-full w-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
        </div>
        <div className="flex-1 pt-2">
          <h3 className="text-2xl font-bold text-white">{instructor.name}</h3>
          <p className={`mt-1 text-sm ${currentTheme.roleText}`}>{instructor.role}</p>
          {instructor.rating && <div className={`mt-3 flex items-center gap-1 text-sm ${currentTheme.ratingText}`}>
            ★ {instructor.rating} ({instructor.students})
          </div>}
          {instructor.bio && <p className="mt-4 max-w-md text-sm leading-relaxed text-slate-300">{instructor.bio}</p>}
        </div>
      </div>
    </div>
  );
}