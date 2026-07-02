import { Helmet } from "react-helmet-async";
import { motion, AnimatePresence } from "framer-motion";
import { Images, ExternalLink } from "lucide-react";
import Gallery from "../components/Gallery.jsx";
import { Link } from "react-router-dom";
import { useState, useMemo } from "react";
import { galleryProjects } from "../data/aboutData.js"; // Import galleryProjects

const allTags = [
  "All",
  ...new Set(galleryProjects.flatMap((project) => project.tags)),
];

export default function GalleryPage() {
  const [activeTag, setActiveTag] = useState("All");

  const filteredProjects = useMemo(() => {
    if (activeTag === "All") {
      return galleryProjects;
    }
    return galleryProjects.filter((project) =>
      project.tags.includes(activeTag)
    );
  }, [activeTag]);

  return ( 
    <section className="min-h-screen bg-slate-50 dark:bg-slate-950 transition-colors duration-300">
      <Helmet>
        <title>Project Gallery | IFYWIGATECHZ Portfolio</title>
        <meta name="description" content="Browse our portfolio of web development, UI/UX design, and digital solutions projects." />
      </Helmet>

      {/* Hero */}
      <div className="relative overflow-hidden py-24 sm:py-32">
        {/* Background Decorative Elements */}
        <div className="absolute inset-0 bg-gradient-to-r from-brandBlue/10 via-transparent to-brandGold/10 pointer-events-none" />
        <div className="absolute top-0 right-0 w-96 h-96 bg-brandGold/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-brandBlue/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/60 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-brandGold text-sm font-medium mb-6 shadow-sm dark:shadow-none transition-colors duration-300">
              <Images size={16} />
              Portfolio Showcase
            </div>
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.6 }}
              className="text-4xl sm:text-5xl lg:text-6xl font-black text-slate-900 dark:text-white mb-6 leading-tight"
            >
              Our <span className="text-brandGold">Work</span> in Action
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="text-xl text-slate-600 dark:text-neutral-400 max-w-2xl mx-auto mb-10"
            >
              A curated collection of projects that demonstrate our expertise in web development, design, and digital transformation.
            </motion.p>
            <div className="flex flex-wrap justify-center gap-4">
              <a
                href="/projects"
                className="inline-flex items-center gap-2 px-8 py-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/10 text-slate-900 dark:text-white font-bold rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800 transition-all duration-300 shadow-lg dark:shadow-none"
              >
                <ExternalLink size={18} />
                Detailed Case Studies
              </a>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Filter Buttons */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
        <div className="flex flex-wrap justify-center gap-3">
          {allTags.map((tag) => (
            <motion.button
              key={tag}
              onClick={() => setActiveTag(tag)}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className={`px-6 py-2 rounded-full text-sm font-bold transition-all duration-300 shadow-sm ${
                activeTag === tag
                  ? "bg-brandBlue text-white scale-105 shadow-brandBlue/20"
                  : "bg-white/60 dark:bg-neutral-800/60 text-slate-700 dark:text-neutral-300 border border-slate-200 dark:border-white/10 hover:bg-white dark:hover:bg-neutral-700 backdrop-blur-sm"
              }`}
            >
              {tag}
            </motion.button>
          ))}
        </div>
      </div>

      {/* Gallery */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-24">
        <Gallery projects={filteredProjects} />
      </div>

      {/* No Projects Found Message */}
      <AnimatePresence>
        {filteredProjects.length === 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="text-center text-slate-600 dark:text-neutral-400 text-lg py-10"
          >
            No projects found for "{activeTag}".
          </motion.div>
        )}
      </AnimatePresence>

      {/* CTA */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-24"> 
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.7 }}
          className="bg-white/60 dark:bg-gradient-to-r dark:from-brandBlue/20 dark:via-brandGold/10 dark:to-brandBlue/20 rounded-[2.5rem] border border-slate-200 dark:border-brandBlue/20 p-8 sm:p-12 text-center shadow-lg dark:shadow-none transition-colors duration-300"
        >
          {/* Ribbon */}
          <div className="absolute top-0 left-0 -mt-4 -ml-4 bg-brandGold text-black text-xs font-bold uppercase px-4 py-1.5 rounded-br-lg rounded-tl-lg shadow-md transform -rotate-3 origin-bottom-left">
            New Opportunities!
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white mb-4">
            Have a Project in Mind?
          </h2>
          <p className="text-slate-600 dark:text-neutral-400 mb-8 max-w-lg mx-auto">
            Let's discuss how we can bring your vision to life with our expertise.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              to="/start-project"
              className="px-8 py-4 bg-gradient-to-r from-brandGold to-yellow-500 text-black font-bold rounded-xl shadow-lg hover:shadow-brandGold/25 hover:scale-105 transition-all duration-300" // Primary button
            >
              Start a Project
            </Link>
            <Link
              to="/request-quote"
              className="px-8 py-4 bg-brandBlue text-white font-bold rounded-xl shadow-lg hover:shadow-brandBlue/25 hover:scale-105 transition-all duration-300" // Secondary button
            >
              Request a Quote
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
