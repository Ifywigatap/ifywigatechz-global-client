import { AI_CONCEPTS } from '../data/aiData.js';
import { motion } from 'framer-motion';

export default function AiConceptsTable() {
  return (
    <div className="p-8">
      <h2 className="text-2xl font-semibold text-white mb-6 text-center">Core AI Concepts</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {AI_CONCEPTS.map(([concept, description], index) => (
          <motion.div
            key={concept}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
            className="rounded-2xl border border-slate-700/50 bg-slate-800/30 p-6 transition-all hover:border-teal-400/40 hover:bg-slate-800/60"
          >
            <h3 className="font-bold text-teal-300">{concept}</h3>
            <p className="mt-2 text-sm text-slate-300">{description}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}