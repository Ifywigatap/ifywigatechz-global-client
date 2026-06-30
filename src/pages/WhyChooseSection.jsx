import React from 'react';
import { whyChoose } from '../data/homeData'; // Import data

const WhyChooseSection = () => (
  <section className="relative py-16 md:py-20 bg-gradient-to-br from-slate-100 via-slate-200 to-slate-100 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 overflow-hidden transition-colors duration-300">
    <div className="absolute inset-0 opacity-20 pointer-events-none">
      <div className="absolute w-72 h-72 bg-blue-500 blur-3xl rounded-full top-10 left-10"></div>
      <div className="absolute w-72 h-72 bg-purple-500 blur-3xl rounded-full bottom-10 right-10"></div>
    </div>

    <div className="container-wide relative z-10">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-extrabold text-blue-600 dark:text-blue-200">
          Why Choose IFYWIGATECHZ?
        </h2>
        <p className="text-slate-700 dark:text-slate-100 mt-3 max-w-2xl mx-auto">
          We focus on real-world impact, practical skills, and career growth — not just theory.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
        {whyChoose.map((item) => (
          <div
            key={item.title}
            className="group relative rounded-2xl p-[1px] bg-gradient-to-br from-slate-300 to-slate-200 dark:from-white/10 dark:to-white/5 hover:from-blue-500/40 hover:to-purple-500/40 transition duration-300"
          >
            <div className="h-full rounded-2xl bg-white/60 dark:bg-white/5 backdrop-blur-xl border border-slate-200 dark:border-white/10 p-6 text-center hover:scale-[1.03] transition duration-300">
              <div className="w-25 h-25 mx-auto flex items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 text-white text-2xl shadow-lg mb-4 group-hover:scale-110 transition">
                {item.icon}
              </div>

              <h3 className="text-lg font-semibold text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition">
                {item.title}
              </h3>

              <p className="text-sm text-slate-700 dark:text-white mt-2">
                {item.desc}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default WhyChooseSection;