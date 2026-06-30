import React from "react";
import { Search, X } from "lucide-react";

export default function FilterBar({
  id,
  searchTerm,
  setSearchTerm,
  sortBy,
  setSortBy,
  activeCategory,
  setActiveCategory,
  categories,
  categoryCounts,
}) {
  return (
    <div id={id} className="pb-8 mb-8 transition-colors duration-300">
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
              <span className={`ml-2 text-[10px] px-1.5 py-0.5 rounded-md ${activeCategory === cat ? 'bg-white/20 text-white' : 'bg-slate-100 dark:bg-white/10 text-slate-500'}`}>
                {categoryCounts[cat] || 0}
              </span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}