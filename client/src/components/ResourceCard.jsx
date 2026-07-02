import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Download } from "lucide-react";

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

/**
 * Icon hover variant to create a scale and tilt effect
 */
const iconVariants = {
  hover: { scale: 1.15, rotate: 12, transition: { type: "spring", stiffness: 400, damping: 10 } },
};

export default function ResourceCard({ resource }) {
  const Icon = resource.icon;

  return (
    <Link to={`/resources/${resource.slug}`} className="h-full block">
      <motion.div
        variants={itemVariants}
        whileHover="hover"
        layout
        className={`group relative bg-white/60 dark:bg-white/5 backdrop-blur-xl rounded-2xl border p-6 hover:bg-white/80 dark:hover:bg-white/10 hover:-translate-y-2 transition-all duration-500 h-full flex flex-col shadow-sm dark:shadow-none ${
          resource.featured
            ? "border-brandBlue/40 dark:border-brandBlue/30 ring-1 ring-brandBlue/20"
            : "border-slate-200 dark:border-white/10"
        }`}
      >
        {resource.featured && (
          <span className="absolute top-0 right-0 px-3 py-1 bg-brandGold text-black text-xs font-bold rounded-tr-2xl rounded-bl-lg shadow-md z-10">
            Featured
          </span>
        )}

        <motion.div
          variants={iconVariants}
          className={`w-12 h-12 rounded-xl bg-gradient-to-r ${resource.color} flex items-center justify-center text-white mb-4 shadow-lg`}
        >
          <Icon size={24} />
        </motion.div>

        <div className="flex items-center gap-2 mb-2">
          <span className="px-2 py-1 bg-green-500/20 text-green-400 text-xs rounded-full border border-green-500/30">
            {resource.tag}
          </span>
          <span className="text-slate-500 dark:text-neutral-500 text-xs">
            {resource.fileSize}
          </span>
        </div>

        <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2 group-hover:text-brandBlue dark:group-hover:text-brandGold transition-colors">
          {resource.title}
        </h3>

        <p className="text-slate-600 dark:text-neutral-400 text-sm mb-4 line-clamp-2 flex-grow">
          {resource.desc}
        </p>

        <div className="flex items-center justify-between mt-auto">
          <span className="text-slate-500 dark:text-neutral-500 text-xs">
            {resource.downloads} downloads
          </span>

          <div className="flex items-center gap-1 text-brandBlue dark:text-brandGold group-hover:gap-2 transition-all text-sm font-bold">
            <Download size={14} />
            View Resource
          </div>
        </div>
      </motion.div>
    </Link>
  );
}