import { useParams, Link } from 'react-router-dom';
import { useState, useEffect, useMemo, useCallback } from 'react';
import { MODULES } from '../data/web3Data.js';
import { PlayIcon, ArrowLeftIcon } from '@heroicons/react/24/outline';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/solid';
import axios from '../axios.js';

export default function Web3Module() {
  const { moduleId } = useParams();
  const module = useMemo(() => MODULES.find((m) => m.id === moduleId), [moduleId]);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);

  useEffect(() => {
    setCurrentSlide(0);
    
    // Fetch progress from the secure backend
    const fetchProgress = async () => {
      try {
        const res = await axios.get('/api/courses/web3/progress');
        if (res.data?.ok) {
          const completedModules = res.data.data.completedModules || [];
          setIsCompleted(completedModules.includes(moduleId));
        }
      } catch (err) {
        console.error("Failed to fetch module progress", err);
      }
    };
    fetchProgress();
  }, [moduleId]);

  if (!module) return <div className="p-8 text-center text-slate-300">Module not found</div>;

  const slides = useMemo(() => module.content.split('. ').map((s) => s.trim() + '.'), [module.content]);
  const nextSlide = useCallback(() => setCurrentSlide((prev) => Math.min(prev + 1, slides.length - 1)), [slides.length]);
  const prevSlide = useCallback(() => setCurrentSlide((prev) => Math.max(prev - 1, 0)), []);
  
  const markComplete = useCallback(async () => {
    setIsCompleted(true);
    
    try {
      await axios.post('/api/courses/progress', {
        courseId: 'web3',
        moduleId: moduleId
      });
    } catch (err) {
      console.error("Failed to save module progress to the database", err);
    }
  }, [moduleId]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-950 to-slate-900 py-12 px-6">
      <Link to="/web3" className="mb-8 inline-flex items-center gap-2 rounded-xl bg-slate-800 px-4 py-2 text-slate-300 hover:bg-slate-700">
        <ArrowLeftIcon className="h-4 w-4" /> Back to Web3 Course
      </Link>
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3 max-w-7xl mx-auto">
        <div className="lg:col-span-2 space-y-6">
          <div className="relative aspect-video rounded-2xl bg-slate-800 shadow-2xl overflow-hidden">
            {module.videoId ? (
              <iframe className="h-full w-full" src={`https://www.youtube.com/embed/${module.videoId}?rel=0`} title={module.title} allowFullScreen loading="lazy" />
            ) : (
              <div className="flex h-full items-center justify-center bg-gradient-to-r from-violet-700 to-fuchsia-600">
                <PlayIcon className="h-16 w-16 text-slate-400 animate-pulse" />
              </div>
            )}
          </div>
          <h1 className="text-4xl font-bold text-white">{module.title}</h1>
          <div className="relative">
            <div className="rounded-2xl border border-slate-700 bg-slate-800/50 p-8 backdrop-blur-xl">
              <p className="text-lg leading-relaxed text-slate-200">{slides[currentSlide]}</p>
            </div>
            {slides.length > 1 && (
              <div className="absolute -bottom-4 left-1/2 flex -translate-x-1/2 items-center gap-3 rounded-full bg-slate-900/80 px-4 py-2 backdrop-blur">
                <button onClick={prevSlide} disabled={currentSlide === 0} className="w-10 h-10 flex items-center justify-center rounded-full bg-slate-800 text-slate-400 hover:bg-slate-700 disabled:opacity-40"><ChevronLeftIcon className="h-5 w-5" /></button>
                <span className="text-sm text-slate-400">{currentSlide + 1} / {slides.length}</span>
                <button onClick={nextSlide} disabled={currentSlide === slides.length - 1} className="w-10 h-10 flex items-center justify-center rounded-full bg-slate-800 text-slate-400 hover:bg-slate-700 disabled:opacity-40"><ChevronRightIcon className="h-5 w-5" /></button>
              </div>
            )}
          </div>
          <div className="flex gap-4">
            <button onClick={markComplete} className="flex-1 rounded-2xl bg-gradient-to-r from-violet-600 to-fuchsia-600 px-8 py-4 font-bold text-white hover:scale-[1.02] transition-all" disabled={isCompleted}>
              {isCompleted ? '✓ Module Complete!' : 'Mark Complete'}
            </button>
            <Link to="/web3" className="flex-1 rounded-2xl border border-slate-700 bg-slate-800 px-8 py-4 text-center font-semibold text-slate-200 transition-all hover:bg-slate-700">
              Back to Overview
            </Link>
          </div>
        </div>
        <div className="space-y-6">
          <div className="rounded-[2rem] border border-slate-700/50 bg-slate-900/70 p-6 shadow-2xl backdrop-blur-xl">
            <h2 className="mt-3 text-3xl font-semibold text-white">Module {module.id}</h2>
            <p className="mt-4 text-sm leading-6 text-slate-300">{module.description}</p>
          </div>
          <div className="rounded-[2rem] border border-slate-700/50 bg-slate-900/70 p-6 shadow-2xl backdrop-blur-xl">
            <h3 className="text-lg font-semibold text-white mb-4">Next lessons</h3>
            <div className="space-y-3">
              {MODULES.slice(parseInt(module.id)).map((m) => (
                <Link key={m.id} to={`/web3/module/${m.id}`} className="block rounded-3xl border border-slate-800/70 bg-slate-950/60 p-4 hover:border-violet-400/40">
                  <p className="text-sm font-semibold text-white">{m.icon}. {m.title}</p>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}