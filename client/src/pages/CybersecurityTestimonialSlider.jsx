import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
import { TESTIMONIALS } from '../data/cybersecurityData.js';
import 'swiper/css';
import 'swiper/css/pagination';

export default function CybersecurityTestimonialSlider() {
  return (
    <div className="relative rounded-2xl border border-slate-700/50 bg-slate-900 p-8 shadow-2xl">
      <h3 className="text-lg font-semibold text-white mb-6">What Students Are Saying</h3>
      <Swiper
        modules={[Autoplay, Pagination]}
        spaceBetween={30}
        slidesPerView={1}
        autoplay={{ delay: 5000, disableOnInteraction: false }}
        pagination={{ clickable: true }}
        loop={true}
        className="testimonial-swiper pb-8" // Add padding bottom for pagination
        style={{
          '--swiper-pagination-color': '#f87171', // red-400
          '--swiper-pagination-bullet-inactive-color': '#52525b', // zinc-600
          '--swiper-pagination-bullet-inactive-opacity': '1',
        }}
      >
        {TESTIMONIALS.map((testimonial, index) => (
          <SwiperSlide key={index}>
            <div className="space-y-4">
              <p className="text-slate-300 italic">"{testimonial.quote}"</p>
              <div className="flex items-center justify-between">
                <p className="font-semibold text-red-300">{testimonial.author}</p>
                <div className="flex">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <span key={i} className="text-yellow-400">★</span>
                  ))}
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}