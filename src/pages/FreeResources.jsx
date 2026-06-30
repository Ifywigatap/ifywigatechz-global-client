import { useState, useMemo, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { motion, AnimatePresence } from "framer-motion";
import { Search, X, Download } from "lucide-react";
import { Link } from "react-router-dom";
import { resources } from "../data/resourcesData";
import NewsletterSignup from "../components/NewsletterSignup";
import FilterBar from "../components/FilterBar";
import ResourceCard from "../components/ResourceCard";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.06,
      delayChildren: 0.1,
    },
  },
};

export default function FreeResources() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("newest"); // Default sort by newest
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  // Reset to page 1 whenever search or filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, activeCategory, sortBy]);

  // Dynamically derive categories from the data
  const categories = useMemo(() => {
    const uniqueCategories = new Set(resources.map((r) => r.category));
    // Convert Set to Array, sort alphabetically, and prepend "All"
    return ["All", ...Array.from(uniqueCategories).sort()];
  }, []);

  // Calculate counts for each category for better UX
  const categoryCounts = useMemo(() => {
    const counts = { All: resources.length };
    resources.forEach((r) => {
      counts[r.category] = (counts[r.category] || 0) + 1;
    });
    return counts;
  }, []);

  const filtered = useMemo(() => {
    let currentResources = resources.filter((r) => {
      const matchesCategory =
        activeCategory === "All" ||
        r.category.toLowerCase() === activeCategory.toLowerCase();
      const matchesSearch = r.title.toLowerCase().includes(searchTerm.toLowerCase());
      return matchesCategory && matchesSearch;
    });

    // Apply sorting
    switch (sortBy) {
      case "newest":
        currentResources.sort((a, b) => new Date(b.postedAt) - new Date(a.postedAt));
        break;
      case "oldest":
        currentResources.sort((a, b) => new Date(a.postedAt) - new Date(b.postedAt));
        break;
      case "downloadsHigh":
        currentResources.sort((a, b) => b.downloads - a.downloads);
        break;
      case "downloadsLow":
        currentResources.sort((a, b) => a.downloads - b.downloads);
        break;
    }
    return currentResources;
  }, [activeCategory, searchTerm, sortBy]);

  // Pagination Logic
  const totalPages = Math.ceil(filtered.length / itemsPerPage);
  const paginatedItems = filtered.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <section className="min-h-screen bg-slate-50 dark:bg-gradient-to-b dark:from-slate-950 dark:via-slate-900 dark:to-blue-950 transition-colors duration-300">
      <Helmet>
        <title>Free Resources | IFYWIGATECHZ Downloads</title>
        <meta
          name="description"
          content="Free ebooks, templates, code snippets, and guides for developers and designers. Download now."
        />
      </Helmet>

      {/* Hero */}
      <div className="relative overflow-hidden py-24 sm:py-32">
        <div className="absolute inset-0 bg-gradient-to-r from-brandBlue/10 via-transparent to-brandGold/10" />
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-brandGold/10 rounded-full blur-3xl" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brandGold/10 border border-brandGold/20 text-brandGold text-sm font-medium mb-6">
              <Download size={16} />
              Free Downloads
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-slate-900 dark:text-white mb-6 leading-tight">
              Free <span className="text-brandGold">Resources</span> for Creators
            </h1>

            <p className="text-xl text-slate-600 dark:text-neutral-400 max-w-2xl mx-auto mb-10">
              Curated ebooks, templates, code snippets, and guides to help you level up your skills — completely free.
            </p>
          </motion.div>
        </div>
      </div>

      {/* Newsletter */}
      <NewsletterSignup />

      {/* Controls: Search, Sort, Categories */}
      <div className="pb-8 mb-8 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 space-y-6">
          <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-6">
            {/* Search Bar */}
            <div className="flex-1 max-w-xl relative group">
              <Search
                className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-brandBlue transition-colors duration-300"
                size={18}
              />
              <input
                type="text"
                placeholder="Search resources by title..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-10 py-3.5 rounded-2xl bg-white/60 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-slate-900 dark:text-white placeholder-slate-500 focus:ring-2 focus:ring-brandBlue focus:border-transparent outline-none transition-all shadow-sm"
              />
              {searchTerm && (
                <button
                  onClick={() => setSearchTerm("")}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors duration-300"
                  title="Clear search"
                >
                  <X size={18} />
                </button>
              )}
            </div>

            {/* Sort Dropdown */}
            <div className="flex-shrink-0 w-full md:w-64">
              <label htmlFor="sort" className="sr-only">
                Sort by
              </label>
              <select
                id="sort"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-full pl-4 pr-10 py-3.5 rounded-2xl bg-white/60 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-slate-900 dark:text-white focus:ring-2 focus:ring-brandBlue focus:border-transparent outline-none transition-all shadow-sm"
              >
                <option value="newest">Sort by: Newest</option>
                <option value="oldest">Sort by: Oldest</option>
                <option value="downloadsHigh">Sort by: Most Downloads</option>
                <option value="downloadsLow">Sort by: Fewest Downloads</option>
              </select>
            </div>
          </div>

          {/* Category Pills */}
          <div className="flex flex-wrap items-center justify-center gap-2">
            <span className="text-xs font-bold uppercase tracking-widest text-slate-400 mr-2 hidden sm:block">
              Filter:
            </span>
            {categories.map((cat) => (
              <button
                type="button"
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-5 py-2 rounded-xl text-sm font-medium transition-all duration-300 ${
                  activeCategory === cat
                    ? "bg-brandBlue text-white shadow-lg shadow-brandBlue/20 scale-105"
                    : "bg-white/60 dark:bg-white/5 text-slate-600 dark:text-neutral-300 border border-slate-200 dark:border-white/10 hover:bg-white/80 dark:hover:bg-white/10 hover:border-slate-300 dark:hover:border-white/20 shadow-sm dark:shadow-none"
                }`}
              >
                {cat}
                <span
                  className={`ml-2 text-[10px] px-1.5 py-0.5 rounded-md ${
                    activeCategory === cat
                      ? "bg-white/20 text-white"
                      : "bg-slate-100 dark:bg-white/10 text-slate-500"
                  }`}
                >
                  {categoryCounts[cat] || 0}
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>


      {/* Resources Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-24">
        <AnimatePresence mode="popLayout">
        {filtered.length === 0 ? (
          <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
              exit={{ opacity: 0 }}
              key="empty"
              className="text-center py-32 space-y-4"
          >
            <div className="w-20 h-20 bg-slate-100 dark:bg-white/5 rounded-full flex items-center justify-center mx-auto text-slate-400">
              <Search size={32} />
            </div>
            <p className="text-slate-600 dark:text-neutral-400 text-lg">
              No resources found matching your search.
            </p>
            <button 
              onClick={() => {
                setActiveCategory("All");
                setSearchTerm("");
              }}
              className="text-brandBlue hover:underline font-medium"
            >
              Clear all filters
            </button>
          </motion.div>
        ) : (
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
              key="grid"
            viewport={{ once: true, amount: 0.1 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
          >
            {paginatedItems.map((resource) => (
              <ResourceCard key={resource.id} resource={resource} />
            ))}
          </motion.div>
        )}
        </AnimatePresence>

        {/* Pagination Controls */}
        {totalPages > 1 && (
          <div className="flex flex-wrap items-center justify-center gap-2 mt-12">
            <button
              disabled={currentPage === 1}
              onClick={() => {
                setCurrentPage(p => p - 1);
                document.getElementById('resource-controls')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="px-4 py-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800 disabled:opacity-50 disabled:cursor-not-allowed transition text-slate-700 dark:text-neutral-300 shadow-sm"
            >
              Previous
            </button>
            
            {Array.from({ length: totalPages }, (_, i) => i + 1).map(pageNumber => (
              <button
                key={pageNumber}
                onClick={() => {
                  setCurrentPage(pageNumber);
                  document.getElementById('resource-controls')?.scrollIntoView({ behavior: 'smooth' });
                }}
                className={`w-10 h-10 flex items-center justify-center rounded-xl font-bold transition-all duration-300 ${
                  currentPage === pageNumber
                    ? 'bg-brandBlue text-white shadow-lg shadow-brandBlue/20 scale-110'
                    : 'bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-neutral-300 hover:bg-slate-50 dark:hover:bg-slate-800'
                }`}
              >
                {pageNumber}
              </button>
            ))}

            <button
              disabled={currentPage === totalPages}
              onClick={() => {
                setCurrentPage(p => p + 1);
                document.getElementById('resource-controls')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="px-4 py-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800 disabled:opacity-50 disabled:cursor-not-allowed transition text-slate-700 dark:text-neutral-300 shadow-sm"
            >
              Next
            </button>
          </div>
        )}
      </div>

      {/* CTA */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-24">
        <div className="bg-white/60 dark:bg-gradient-to-r dark:from-brandGold/20 dark:via-yellow-500/10 dark:to-brandGold/20 rounded-3xl border border-slate-200 dark:border-brandGold/20 p-8 sm:p-12 text-center shadow-lg dark:shadow-none transition-colors duration-300">
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white mb-4">
            Want More In-Depth Learning?
          </h2>

          <p className="text-slate-600 dark:text-neutral-400 mb-8 max-w-lg mx-auto">
            Our premium courses include video lessons, mentorship, and certificates.
          </p>

          <Link
            to="/learn"
            className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-brandGold to-yellow-500 text-black font-bold rounded-xl shadow-lg hover:shadow-brandGold/25 hover:scale-105 transition-all duration-300"
          >
            Explore Courses
          </Link>
        </div>
      </div>
    </section>
  );
}