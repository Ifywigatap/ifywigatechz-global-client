import { useParams, Link } from 'react-router-dom';
import { useState, useEffect, useMemo, useCallback } from 'react';
import { MODULES } from '../data/ppmvsData.js';
import { PlayIcon, ArrowLeftIcon } from '@heroicons/react/24/outline';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/solid';

export default function PpmvsModule() {
  const { moduleId } = useParams();

  const module = useMemo(
    () => MODULES.find((m) => m.id === moduleId),
    [moduleId]
  );

  const [currentSlide, setCurrentSlide] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);

  useEffect(() => {
    setCurrentSlide(0);
  }, [moduleId]);

  if (!module)
    return (
      <div className="p-8 text-center text-slate-300">
        Module not found
      </div>
    );

  const slides = useMemo(
    () => module.content.split('. ').map((s) => s.trim() + '.'),
    [module.content]
  );

  const nextSlide = useCallback(
    () =>
      setCurrentSlide((prev) =>
        Math.min(prev + 1, slides.length - 1)
      ),
    [slides.length]
  );

  const prevSlide = useCallback(
    () =>
      setCurrentSlide((prev) => Math.max(prev - 1, 0)),
    []
  );

  const markComplete = useCallback(() => {
    setIsCompleted(true);
    // Sim progress update
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-950 to-slate-900">
      <div className="container mx-auto px-6 py-12">
        <Link
          to="/ppmvs"
          className="mb-8 inline-flex items-center gap-2 rounded-xl bg-slate-800 px-4 py-2 text-slate-300 transition-all duration-300 hover:bg-slate-700 hover:scale-[1.03]"
        >
          <ArrowLeftIcon className="h-4 w-4" />
          Back to course
        </Link>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          <div className="lg:col-span-2">
            {/* Video */}
            <div className="relative mb-8 aspect-video overflow-hidden rounded-2xl bg-slate-800 shadow-2xl">
              {module.videoId ? (
                <iframe
                  className="h-full w-full"
                  src={`https://www.youtube.com/embed/${module.videoId}?rel=0`}
                  title={module.title}
                  allowFullScreen
                  loading="lazy"
                />
              ) : (
                <div className="flex h-full items-center justify-center bg-gradient-to-r from-slate-700 to-slate-600">
                  <PlayIcon className="h-16 w-16 text-slate-400 animate-pulse" />
                </div>
              )}
            </div>

            {/* Content Slides */}
            <div className="space-y-6">
              <h1 className="text-4xl font-bold text-white">
                {module.title}
              </h1>

              <div className="relative">
                <div className="rounded-2xl border border-slate-700 bg-slate-800/50 p-8 backdrop-blur-xl transition-all duration-300 hover:border-cyan-400/30">
                  <p className="text-lg leading-relaxed text-slate-200">
                    {slides[currentSlide]}
                  </p>
                </div>

                {slides.length > 1 && (
                  <div className="absolute -bottom-4 left-1/2 flex -translate-x-1/2 transform items-center gap-3 rounded-full bg-slate-900/80 px-4 py-2 backdrop-blur">
                    <button
                      onClick={prevSlide}
                      disabled={currentSlide === 0}
                      className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-800 text-slate-400 transition hover:bg-slate-700 disabled:opacity-40"
                    >
                      <ChevronLeftIcon className="h-5 w-5" />
                    </button>

                    <span className="text-sm text-slate-400">
                      {currentSlide + 1} / {slides.length}
                    </span>

                    <button
                      onClick={nextSlide}
                      disabled={currentSlide === slides.length - 1}
                      className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-800 text-slate-400 transition hover:bg-slate-700 disabled:opacity-40"
                    >
                      <ChevronRightIcon className="h-5 w-5" />
                    </button>
                  </div>
                )}
              </div>

              <div className="flex gap-4">
                <button
                  onClick={markComplete}
                  className="flex-1 rounded-2xl bg-gradient-to-r from-emerald-500 to-cyan-500 px-8 py-4 font-bold text-white shadow-xl transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl active:scale-[0.98]"
                  disabled={isCompleted}
                >
                  {isCompleted
                    ? '✓ Module Complete!'
                    : 'Mark Complete'}
                </button>

                <Link
                  to="/ppmvs"
                  className="flex-1 rounded-2xl border border-slate-700 bg-slate-800 px-8 py-4 text-center font-semibold text-slate-200 transition-all duration-300 hover:bg-slate-700 hover:scale-[1.02]"
                >
                  Back to Overview
                </Link>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="rounded-[2rem] border border-slate-700/50 bg-slate-900/70 p-6 shadow-2xl shadow-cyan-500/10 backdrop-blur-xl">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="text-sm uppercase tracking-[0.24em] text-cyan-300/80">
                    Lesson overview
                  </p>
                  <h2 className="mt-3 text-3xl font-semibold text-white">
                    Module {module.id}
                  </h2>
                </div>
                <span className="rounded-2xl bg-cyan-500/10 px-3 py-1 text-xs font-semibold text-cyan-200">
                  {module.badge}
                </span>
              </div>

              <p className="mt-4 text-sm leading-6 text-slate-300">
                {module.description}
              </p>

              <div className="mt-6 grid gap-3 rounded-3xl border border-slate-700/50 bg-slate-950/70 p-4">
                <div className="flex items-center justify-between text-sm text-slate-400">
                  <span>Duration</span>
                  <span>{module.duration}</span>
                </div>
                <div className="flex items-center justify-between text-sm text-slate-400">
                  <span>Status</span>
                  <span className={module.locked ? 'text-amber-300' : 'text-emerald-300'}>
                    {module.locked ? 'Locked' : 'Unlocked'}
                  </span>
                </div>
              </div>
            </div>

            <div className="rounded-[2rem] border border-slate-700/50 bg-slate-900/70 p-6 shadow-2xl shadow-slate-950/20 backdrop-blur-xl">
              <div className="mb-5 flex items-center justify-between">
                <h3 className="text-lg font-semibold text-white">Next lessons</h3>
                <span className="text-sm text-slate-400">
                  {MODULES.length - parseInt(module.id)} remaining
                </span>
              </div>

              <div className="space-y-3">
                {MODULES.slice(parseInt(module.id)).map((m) => (
                  <Link
                    key={m.id}
                    to={`/ppmvs/module/${m.id}`}
                    className="group block rounded-3xl border border-slate-800/70 bg-slate-950/60 p-4 transition hover:border-cyan-400/40 hover:bg-slate-900/80"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <p className="text-sm font-semibold text-white">
                          {m.icon}. {m.title}
                        </p>
                        <p className="mt-2 text-xs leading-5 text-slate-500">
                          {m.description}
                        </p>
                      </div>
                      <span
                        className={`mt-1 rounded-full px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] ${
                          m.locked
                            ? 'bg-amber-400/10 text-amber-300'
                            : 'bg-emerald-400/10 text-emerald-300'
                        }`}
                      >
                        {m.locked ? 'Locked' : 'Open'}
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
