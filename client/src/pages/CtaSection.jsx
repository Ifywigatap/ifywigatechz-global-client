import React from 'react';
import { Link } from 'react-router-dom';

const CtaSection = () => (
  <section className="section bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900 dark:to-indigo-900 border border-slate-200 dark:border-transparent text-blue-900 dark:text-white rounded-2xl mt-8 text-center p-10 container-wide relative overflow-hidden transition-colors duration-300">
    <div className="absolute inset-0 opacity-10 blur-3xl bg-white pointer-events-none"></div>

    <h2 className="text-3xl md:text-4xl font-bold mb-2">
      Turn Your Idea Into a Scalable Product 🚀
    </h2>
    <p className="text-blue-800 dark:text-blue-100 mb-6 max-w-2xl mx-auto">
      Launch faster with IFYWIGATECHZ. From concept to deployment, we help you build, manage, and scale your digital products with ease.
    </p>

    <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
      <Link
        to="/start-project"
        className="btn bg-white dark:bg-brandBlue text-primary dark:text-white font-semibold px-4 sm:px-6 py-2 sm:py-3 text-sm sm:text-base shadow-lg hover:scale-105 transition"
      >
        Start a Project
      </Link>
      <Link
        to="/dashboard"
        className="btn bg-blue-900/10 dark:bg-white/20 border border-blue-900/20 dark:border-white text-blue-900 dark:text-white hover:bg-blue-900/20 dark:hover:bg-white/30 font-semibold px-4 sm:px-6 py-2 sm:py-3 text-sm sm:text-base backdrop-blur transition-colors duration-300"
      >
        Go to Dashboard
      </Link>
      <Link
        to="/learn"
        className="btn bg-blue-900/10 dark:bg-white/20 border border-blue-900/20 dark:border-white text-blue-900 dark:text-white hover:bg-blue-900/20 dark:hover:bg-white/30 font-semibold px-4 sm:px-6 py-2 sm:py-3 text-sm sm:text-base backdrop-blur transition-colors duration-300"
      >
        Join Academy
      </Link>
      <Link
        to="/hireme"
        className="btn bg-blue-900/10 dark:bg-white/20 border border-blue-900/20 dark:border-white text-blue-900 dark:text-white hover:bg-blue-900/20 dark:hover:bg-white/30 font-semibold px-4 sm:px-6 py-2 sm:py-3 text-sm sm:text-base backdrop-blur transition-colors duration-300"
      >
        Hire Me
      </Link>
    </div>

    <div className="mt-6 text-sm text-blue-800 dark:text-blue-200">
      <p>⚡ Fast Delivery • 🔒 Secure Systems • 🌍 Built for Global Clients</p>
    </div>
  </section>
);

export default CtaSection;