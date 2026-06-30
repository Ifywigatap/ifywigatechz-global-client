import { useState } from 'react';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/solid';

export default function TestimonialSlider({ testimonials, themeColor = 'blue' }) {
  const [current, setCurrent] = useState(0);

  const nextSlide = () => setCurrent((current + 1) % testimonials.length);
  const prevSlide = () => setCurrent((current - 1 + testimonials.length) % testimonials.length);

  const testimonial = testimonials[current];
  const colorClass = `from-${themeColor}-400 to-${themeColor}-600`;
  const ratingColorClass = `bg-${themeColor}-400`;

  return (
    <div className="relative rounded-2xl border border-slate-700/50 bg-slate-900/70 p-8 backdrop-blur-xl shadow-2xl">
      <div className="mb-6 text-center">
        <div className="mx-auto mb-4 inline-flex h-3 w-20 items-center rounded-full bg-slate-600">
          <div className={`h-3 flex-1 rounded-full bg-gradient-to-r ${colorClass} animate-pulse`} />
        </div>
        <div className="flex items-center justify-center gap-2">
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className={`h-1.5 w-1.5 rounded-full ${i < testimonial.rating ? ratingColorClass : 'bg-slate-600'}`} />
          ))}
        </div>
      </div>
      <blockquote className="text-lg font-medium text-white/90">{testimonial.text || testimonial.quote}</blockquote>
      <p className="mt-6 text-right text-sm font-semibold text-slate-300">- {testimonial.name || testimonial.author}</p>
      <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 transform">
        <button onClick={prevSlide} className="h-8 w-8 rounded-full bg-slate-800 text-slate-400 hover:bg-slate-700 hover:text-white transition" aria-label="Previous testimonial">
          <ChevronLeftIcon className="h-4 w-4" />
        </button>
        <button onClick={nextSlide} className="ml-2 h-8 w-8 rounded-full bg-slate-800 text-slate-400 hover:bg-slate-700 hover:text-white transition" aria-label="Next testimonial">
          <ChevronRightIcon className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}