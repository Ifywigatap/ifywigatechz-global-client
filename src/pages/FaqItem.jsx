import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

export default function FaqItem({ faq, index, openIndex, toggle, theme = 'default' }) {
  const isOpen = index === openIndex;

  const themes = {
    default: {
      border: 'dark:hover:border-brandBlue',
      text: 'text-brandBlue',
    },
    graphic: {
      border: 'hover:border-purple-400/30',
      text: 'text-purple-400',
    },
    it: {
      border: 'hover:border-emerald-400/30',
      text: 'text-emerald-400',
    },
    microsoft: {
      border: 'hover:border-blue-400/30',
      text: 'text-blue-400',
    },
    ai: {
      border: 'hover:border-teal-400/30',
      text: 'text-teal-400',
    },
    cybersecurity: {
      border: 'hover:border-red-400/30',
      text: 'text-red-400',
    }
  };

  const currentTheme = themes[theme] || themes.default;

  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 10 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.3 } }
      }}
    >
      <div className={`rounded-lg border border-slate-700 bg-slate-800/50 overflow-hidden transition-all duration-300 ${currentTheme.border}`}>
        <button
          onClick={() => toggle(index)}
          aria-expanded={isOpen}
          aria-controls={`faq-answer-${faq.id || index}`}
          className="w-full flex justify-between items-center p-5 text-left hover:bg-slate-700/50 transition"
        >
          <span className="font-semibold text-gray-900 dark:text-white pr-4">{faq.q}</span>
          <motion.div animate={{ rotate: isOpen ? 180 : 0 }} transition={{ duration: 0.2 }} className="flex-shrink-0">
            <ChevronDown className={`w-5 h-5 ${currentTheme.text}`} />
          </motion.div>
        </button>

        <AnimatePresence>
          {isOpen && (
            <motion.div
              id={`faq-answer-${faq.id || index}`}
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="border-t border-slate-700"
            >
              <div className="px-5 py-4 text-slate-300 leading-relaxed">{faq.a}</div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}