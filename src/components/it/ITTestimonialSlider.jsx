import { useState } from 'react';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/solid';

const TESTIMONIALS = [
  { text: 'David made complex networking concepts simple. Now running my own IT support business!', name: 'Blessing Okoro, IT Tech', rating: 5 },
  { text: 'Perfect for career changers. Landed junior IT role immediately after.', name: 'Grace Adebayo', rating: 5 },
  { text: 'Practical labs helped me pass CompTIA A+ first try!', name: 'Emeka Nwosu', rating: 5 },
];

export default function ITTestimonialSlider() {
  const [current, setCurrent] = useState(0);

  const nextSlide = () => setCurrent((current + 1) % TESTIMONIALS.length);
  const prevSlide = () => setCurrent((current - 1 + TESTIMONIALS.length) % TESTIMONIALS.length);

  const testimonial = TESTIMONIALS[current];

  return (
    <div className="relative rounded-2xl border border-slate-700/50 bg-slate-900/70 p-8 backdrop-blur-xl shadow-2xl">
      <div className="mb-6 text-center">
        <div className="mx-auto mb-4 inline-flex h-3 w-20 items-center rounded-full bg-slate-600">
          <div className="h-3 flex-1 rounded-full bg-gradient-to-r from-emerald-400 to-teal-400 animate-pulse" />
        </div>
        <div className="flex items-center justify-center gap-2">
          {Array.from({length: 5}).map((_, i) => (
            <div key={i} className={`h-1.5 w-1.5 rounded-full ${i < testimonial.rating ? 'bg-emerald-400' : 'bg-slate-600'}`} />
          ))}
        </div>
      </div>
      <blockquote className="text-lg font-medium text-white/90">{testimonial.text}</blockquote>
      <p className="mt-6 text-right text-sm font-semibold text-slate-300">- {testimonial.name}</p>
      <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 transform">
        <button onClick={prevSlide} className="h-8 w-8 rounded-full bg-slate-800 text-slate-400 hover:bg-slate-700 hover:text-white transition">
          <ChevronLeftIcon className="h-4 w-4" />
        </button>
        <button onClick={nextSlide} className="ml-2 h-8 w-8 rounded-full bg-slate-800 text-slate-400 hover:bg-slate-700 hover:text-white transition">
          <ChevronRightIcon className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}
