import { useParams, Link } from 'react-router-dom';
import { useState, useEffect, useMemo, useCallback } from 'react';
import { MODULES } from '../data/itData.js';
import { PlayIcon, ArrowLeftIcon } from '@heroicons/react/24/outline';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/solid';

export default function ITModule() {
  const { moduleId } = useParams();

  const module = useMemo(
    () => MODULES.find((m) => String(m.id) === String(moduleId)),
    [moduleId]
  );

  const [currentSlide, setCurrentSlide] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);

  useEffect(() => {
    setCurrentSlide(0);
  }, [moduleId]);

  if (!module) {
    return (
      <div className="p-8 text-center text-slate-300">
        Module not found
      </div>
    );
  }

  // ✅ Safer slide split
  const slides = useMemo(() => {
    if (!module.content) return [];
    return module.content
      .split(/(?<=\.)\s+/) // better sentence split
      .map((s) => s.trim());
  }, [module.content]);

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) =>
      Math.min(prev + 1, slides.length - 1)
    );
  }, [slides.length]);

  const prevSlide = useCallback(() => {
    setCurrentSlide((prev) => Math.max(prev - 1, 0));
  }, []);

  const markComplete = useCallback(() => {
    setIsCompleted(true);
  }, []);

  const currentIndex = Number(module.id) || 0;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-950 to-slate-900">
      <div className="container mx-auto px-6 py-12">

        {/* Back Button */}
        <Link
          to="/it"
          className="mb-8 inline-flex items-center gap-2 rounded-xl bg-slate-800 px-4 py-2 text-slate-300 transition hover:bg-slate-700 hover:scale-[1.03]"
        >
          <ArrowLeftIcon className="h-4 w-4" />
          Back to IT Course
        </Link>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">

          {/* LEFT */}
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
                <div className="flex h-full items-center justify-center bg-gradient-to-r from-emerald-700 to-teal-600">
                  <PlayIcon className="h-16 w-16 text-slate-400 animate-pulse" />
                </div>
              )}
            </div>

            {/* Content */}
            <div className="space-y-6">
              <h1 className="text-4xl font-bold text-white">
                {module.title}
              </h1>

              <div className="relative">
                <div className="rounded-2xl border border-slate-700 bg-slate-800/50 p-8 backdrop-blur-xl">
                  <p className="text-lg leading-relaxed text-slate-200">
                    {slides[currentSlide] || "No content available"}
                  </p>
                </div>

                {slides.length > 1 && (
                  <div className="absolute -bottom-4 left-1/2 flex -translate-x-1/2 gap-3 rounded-full bg-slate-900/80 px-4 py-2 backdrop-blur">
                    
                    <button
                      onClick={prevSlide}
                      disabled={currentSlide === 0}
                      className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-800 text-slate-400 hover:bg-slate-700 disabled:opacity-40"
                    >
                      <ChevronLeftIcon className="h-5 w-5" />
                    </button>

                    <span className="text-sm text-slate-400">
                      {currentSlide + 1} / {slides.length}
                    </span>

                    <button
                      onClick={nextSlide}
                      disabled={currentSlide === slides.length - 1}
                      className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-800 text-slate-400 hover:bg-slate-700 disabled:opacity-40"
                    >
                      <ChevronRightIcon className="h-5 w-5" />
                    </button>

                  </div>
                )}
              </div>

              {/* Actions */}
              <div className="flex gap-4">
                <button
                  onClick={markComplete}
                  disabled={isCompleted}
                  className="flex-1 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-500 px-8 py-4 font-bold text-white shadow-xl hover:scale-[1.02] active:scale-[0.98]"
                >
                  {isCompleted ? '✓ Module Complete!' : 'Mark Complete'}
                </button>

                <Link
                  to="/it"
                  className="flex-1 rounded-2xl border border-slate-700 bg-slate-800 px-8 py-4 text-center font-semibold text-slate-200 hover:bg-slate-700"
                >
                  Back to Overview
                </Link>
              </div>
            </div>
          </div>

          {/* RIGHT */}
          <div className="space-y-6">

            {/* Overview */}
            <div className="rounded-[2rem] border border-slate-700 bg-slate-900/70 p-6 backdrop-blur-xl">
              <h2 className="text-2xl font-semibold text-white">
                Module {module.id}
              </h2>
              <p className="mt-4 text-sm text-slate-300">
                {module.description}
              </p>
            </div>

            {/* Next Lessons */}
            <div className="rounded-[2rem] border border-slate-700 bg-slate-900/70 p-6 backdrop-blur-xl">
              <h3 className="text-lg font-semibold text-white mb-4">
                Next Lessons
              </h3>

              {MODULES.slice(currentIndex).map((m) => (
                <Link
                  key={m.id}
                  to={`/it/module/${m.id}`}
                  className="block rounded-xl p-4 hover:bg-slate-800"
                >
                  <p className="text-white">{m.title}</p>

                  {/* ✅ FIXED CLASSNAME */}
                  <span
                    className={`mt-2 inline-block rounded-full px-2 py-1 text-xs ${
                      m.locked
                        ? 'bg-amber-400/10 text-amber-300'
                        : 'bg-emerald-400/10 text-emerald-300'
                    }`}
                  >
                    {m.locked ? 'Locked' : 'Open'}
                  </span>
                </Link>
              ))}
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}