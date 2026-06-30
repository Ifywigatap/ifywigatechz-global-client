import { motion } from "framer-motion";
import PropTypes from 'prop-types';

export default function IntroVideo({ videoId }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, amount: 0.5 }}
      transition={{ duration: 0.5 }}
      className="max-w-4xl mx-auto mt-16 mb-20"
    >
      <div className="relative rounded-2xl overflow-hidden border border-slate-200 dark:border-white/10 shadow-lg dark:shadow-2xl backdrop-blur-xl bg-white/60 dark:bg-white/5 group hover:scale-[1.02] transition-all duration-300">
        <div className="absolute -inset-2 bg-blue-500/30 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        <iframe
          className="relative w-full h-[220px] sm:h-[350px] md:h-[450px] rounded-2xl"
          src={`https://www.youtube.com/embed/${videoId}`}
          title="Intro Video"
          loading="lazy"
          allowFullScreen
        />
      </div>
      <p className="text-center text-slate-600 dark:text-neutral-400 text-sm mt-4 transition-colors duration-300">
        Watch a quick introduction about IFYWIGATECHZ 🚀
      </p>
    </motion.div>
  );
}

IntroVideo.propTypes = {
    videoId: PropTypes.string.isRequired,
};