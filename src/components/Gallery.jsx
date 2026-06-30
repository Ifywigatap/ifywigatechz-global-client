import { Link } from "react-router-dom";
import { galleryProjects } from "../data/aboutData.js";
import { motion } from "framer-motion";

export default function Gallery({ projects = galleryProjects, onImageClick }) {
  return (
    <section className="py-20 bg-slate-50 dark:bg-gradient-to-b dark:from-slate-900/50 dark:to-transparent transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-brandBlue via-blue-600 to-brandGold dark:from-brandBlue dark:via-white dark:to-brandGold bg-clip-text text-transparent mb-4">
            Gallery Showcase
          </h2>
          <p className="text-xl text-slate-600 dark:text-neutral-300 max-w-2xl mx-auto">
            Explore our portfolio of stunning projects that blend creativity with functionality
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((project, index) => (
            <motion.div // Use motion.div for the card to allow whileHover animation
              key={index}
              whileHover={{ y: -6 }}
              transition={{ type: "spring", stiffness: 200 }}
              className="group relative overflow-hidden rounded-2xl bg-white/60 dark:bg-white/5 backdrop-blur-xl border border-slate-200 dark:border-white/10 shadow-lg dark:shadow-xl hover:shadow-2xl transition-all duration-500 hover:border-brandBlue/50 dark:hover:border-brandGold/50"
            >
              {/* Image area - now clickable for lightbox */}
              <div className="relative h-56 overflow-hidden bg-slate-200 dark:bg-neutral-800 cursor-pointer" onClick={() => onImageClick(index)}>
                <img
                  src={project.img}
                  alt={project.title}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>

              <div className="p-6">
                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2 group-hover:text-brandBlue dark:group-hover:text-brandGold transition-colors">
                  {project.title}
                </h3>
                <p className="text-slate-600 dark:text-neutral-400 text-sm mb-4 line-clamp-2">
                  {project.desc}
                </p>
                
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tags.map((tag, t) => (
                    <span
                      key={t}
                      className="px-3 py-1 bg-brandBlue/20 text-brandBlue text-xs rounded-full backdrop-blur-sm border border-brandBlue/30"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* "View Project" link remains for external navigation */}
                <Link to={project.link} target="_blank" rel="noreferrer" className="flex items-center justify-between text-sm font-semibold text-brandBlue dark:text-brandGold">
                  <span>View Project</span>
                  <span className="group-hover:translate-x-1 transition-transform">→</span>
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
