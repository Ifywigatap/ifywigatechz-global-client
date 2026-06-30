import { motion } from "framer-motion";

export default function AboutHero() {
  return (
    <motion.header
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      className="text-center max-w-4xl mx-auto space-y-6"
    >
      <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black bg-gradient-to-r from-brandBlue via-blue-600 to-brandGold dark:from-white dark:via-blue-100 dark:to-blue-300 bg-clip-text text-transparent leading-tight transition-colors duration-300">
        About IFYWIGATECHZ 🚀
      </h1>
      <p className="text-slate-800 dark:text-neutral-200 text-lg sm:text-xl md:text-2xl max-w-2xl mx-auto leading-relaxed opacity-95 transition-colors duration-300">
        Building modern digital solutions, training future tech leaders, and empowering Africa through technology.
      </p>
    </motion.header>
  );
}