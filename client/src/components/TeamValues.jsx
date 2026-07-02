import React from 'react';
import { motion } from "framer-motion";

export default function TeamValues({ values }) {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
      <div className="text-center mb-16">
        <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white mb-4">Our Values</h2>
        <p className="text-slate-600 dark:text-neutral-400 max-w-2xl mx-auto"> 
          The principles that drive our innovation, collaboration, and delivery of exceptional SaaS products.
        </p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {values.map((v, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="bg-white/60 dark:bg-white/5 backdrop-blur-xl rounded-2xl border border-slate-200 dark:border-white/10 p-6 text-center hover:bg-white/80 dark:hover:bg-white/10 hover:-translate-y-1 transition-all duration-300 shadow-sm dark:shadow-none"
          >
            <div className="w-14 h-14 bg-white/80 dark:bg-white/5 rounded-2xl flex items-center justify-center mx-auto mb-4 border border-slate-200 dark:border-white/10 shadow-sm dark:shadow-none transition-colors duration-300">
              {v.icon}
            </div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">{v.title}</h3>
            <p className="text-slate-600 dark:text-neutral-400 text-sm leading-relaxed">{v.desc}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}