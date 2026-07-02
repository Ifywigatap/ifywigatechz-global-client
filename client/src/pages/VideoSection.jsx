import React from 'react';

const VideoSection = () => (
  <section className="relative bg-gradient-to-br from-slate-200 via-slate-100 to-slate-200 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 py-12 md:py-16 transition-colors duration-300">
    <div className="container-wide">
      <div className="mb-8 text-center md:text-left">
        <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white">
          Watch Our Intro
        </h2>
        <p className="text-slate-600 dark:text-slate-400 mt-2 max-w-2xl">
          A short introduction to IFYWIGATECHZ Global Services — our mission, outcomes and how to locate us physically.
        </p>
      </div>

      <div className="max-w-5xl mx-auto">
        <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-slate-300 dark:border-white/10 bg-white/40 dark:bg-white/5 backdrop-blur-lg hover:scale-[1.01] transition duration-300">
          <div className="relative w-full" style={{ paddingBottom: "56.25%" }}>
            <iframe
              className="absolute inset-0 w-full h-full"
              src="https://www.youtube.com/embed/dQw4w9WgXcQ"
              title="IFYWIGATECHZ Intro"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
        </div>
      </div>
    </div>
  </section>
);

export default VideoSection;