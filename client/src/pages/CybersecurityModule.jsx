import { useParams, Link } from 'react-router-dom';
import { useState, useEffect, useMemo, useCallback } from 'react';
import { MODULES } from '../data/cybersecurityData.js';
import { PlayIcon, ArrowLeftIcon } from '@heroicons/react/24/outline';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/solid';

export default function CybersecurityModule() {
  const { moduleId } = useParams();
  const module = useMemo(() => MODULES.find((m) => m.id === moduleId), [moduleId]);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);

  useEffect(() => {
    setCurrentSlide(0);
  }, [moduleId]);

  if (!module) return <div className="p-8 text-center text-slate-300">Module not found</div>;

  const slides = useMemo(() => module.content.split('. ').map((s) => s.trim() + '.'), [module.content]);
  const nextSlide = useCallback(() => setCurrentSlide((prev) => Math.min(prev + 1, slides.length - 1)), [slides.length]);
  const prevSlide = useCallback(() => setCurrentSlide((prev) => Math.max(prev - 1, 0)), []);
  const markComplete = useCallback(() => setIsCompleted(true), []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-950 to-slate-900">
      <div className="container mx-auto px-6 py-12">
        <Link to="/cybersecurity" className="mb-8 inline-flex items-center gap-2 rounded-xl bg-slate-800 px-4 py-2 text-slate-300 transition-all hover:bg-slate-700">
          <ArrowLeftIcon className="h-4 w-4" />
          Back to Cybersecurity Course
        </Link>
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <div className="relative mb-8 aspect-video overflow-hidden rounded-2xl bg-slate-800 shadow-2xl">
              {module.videoId ? (
                <iframe className="h-full w-full" src={`https://www.youtube.com/embed/${module.videoId}?rel=0`} title={module.title} allowFullScreen loading="lazy" />
              ) : (
                <div className="flex h-full items-center justify-center bg-gradient-to-r from-red-700 to-orange-600">
                  <PlayIcon className="h-16 w-16 text-slate-400 animate-pulse" />
                </div>
              )}
            </div>
            <div className="space-y-6">
              <h1 className="text-4xl font-bold text-white">{module.title}</h1>
              <div className="relative">
                <div className="rounded-2xl border border-slate-700 bg-slate-800/50 p-8 backdrop-blur-xl transition-all hover:border-red-400/30">
                  <p className="text-lg leading-relaxed text-slate-200">{slides[currentSlide]}</p>
                </div>
                {slides.length > 1 && (
                  <div className="absolute -bottom-4 left-1/2 flex -translate-x-1/2 transform items-center gap-3 rounded-full bg-slate-900/80 px-4 py-2 backdrop-blur">
                    <button onClick={prevSlide} disabled={currentSlide === 0} className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-800 text-slate-400 transition hover:bg-slate-700 disabled:opacity-40">
                      <ChevronLeftIcon className="h-5 w-5" />
                    </button>
                    <span className="text-sm text-slate-400">{currentSlide + 1} / {slides.length}</span>
                    <button onClick={nextSlide} disabled={currentSlide === slides.length - 1} className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-800 text-slate-400 transition hover:bg-slate-700 disabled:opacity-40">
                      <ChevronRightIcon className="h-5 w-5" />
                    </button>
                  </div>
                )}
              </div>
              <div className="flex gap-4">
                <button onClick={markComplete} className="flex-1 rounded-2xl bg-gradient-to-r from-red-600 to-orange-500 px-8 py-4 font-bold text-white shadow-xl transition-all hover:scale-[1.02]" disabled={isCompleted}>
                  {isCompleted ? '✓ Module Complete!' : 'Mark Complete'}
                </button>
                <Link to="/cybersecurity" className="flex-1 rounded-2xl border border-slate-700 bg-slate-800 px-8 py-4 text-center font-semibold text-slate-200 transition-all hover:bg-slate-700">
                  Back to Overview
                </Link>
              </div>
            </div>
          </div>
          <div className="space-y-6">
            <div className="rounded-[2rem] border border-slate-700/50 bg-slate-900/70 p-6 shadow-2xl shadow-red-500/10 backdrop-blur-xl">
              <h2 className="mt-3 text-3xl font-semibold text-white">Module {module.id}</h2>
              <p className="mt-4 text-sm leading-6 text-slate-300">{module.description}</p>
            </div>
            <div className="rounded-[2rem] border border-slate-700/50 bg-slate-900/70 p-6 shadow-2xl backdrop-blur-xl">
              <h3 className="text-lg font-semibold text-white mb-4">Next lessons</h3>
              <div className="space-y-3">
                {MODULES.slice(parseInt(module.id)).map((m) => (
                  <Link key={m.id} to={`/cybersecurity/module/${m.id}`} className="group block rounded-3xl border border-slate-800/70 bg-slate-950/60 p-4 transition hover:border-red-400/40">
                    <p className="text-sm font-semibold text-white">{m.icon}. {m.title}</p>
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