import React from 'react';
import { motion } from "framer-motion";

export default function CompanyMetrics({ metrics }) {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
        {metrics.map((m, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="bg-white/40 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-3xl p-8 text-center"
          >
            <div className="flex justify-center mb-4">{m.icon}</div>
            <div className="text-4xl font-black text-slate-900 dark:text-white mb-2">{m.value}</div>
            <div className="text-sm font-bold uppercase tracking-widest text-slate-500 dark:text-neutral-400">{m.label}</div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}