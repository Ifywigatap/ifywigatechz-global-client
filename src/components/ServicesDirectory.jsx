import React, { useState, useMemo } from 'react';
import { services } from '../data/services'; // Adjust this path if needed

const ServicesDirectory = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');

  // 1. Extract unique categories dynamically from the data
  const categories = useMemo(() => {
    const uniqueCategories = new Set(services.map(service => service.category));
    return ['All', ...Array.from(uniqueCategories)];
  }, []);

  // 2. Filter services based on both search query and selected category
  const filteredServices = useMemo(() => {
    return services.filter((service) => {
      // Category check
      const matchesCategory = activeCategory === 'All' || service.category === activeCategory;
      
      // Search check (checks both name and description)
      const searchLower = searchQuery.toLowerCase();
      const matchesSearch = 
        service.name.toLowerCase().includes(searchLower) ||
        service.desc.toLowerCase().includes(searchLower);

      return matchesCategory && matchesSearch;
    });
  }, [searchQuery, activeCategory]);

  return (
    <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
      
      {/* Header & Controls Section */}
      <div className="mb-10 space-y-6">
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white transition-colors duration-300">Our Services</h1>
        
        <div className="flex flex-col lg:flex-row gap-6 justify-between items-start lg:items-center">
          
          {/* Category Filter Pills */}
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors duration-300 ${
                  activeCategory === category
                    ? 'bg-blue-600 dark:bg-blue-500 text-white shadow-md'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          {/* Search Bar */}
          <div className="w-full lg:w-96 relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              {/* Optional: Add a search icon here like Lucide's <Search size={18} /> */}
              <span className="text-slate-400 dark:text-slate-500 transition-colors duration-300">🔍</span>
            </div>
            <input
              type="text"
              placeholder="Search services (e.g. API, Figma)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-colors duration-300 shadow-sm dark:shadow-none"
            />
          </div>
        </div>
      </div>

      {/* Results Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredServices.length > 0 ? (
          filteredServices.map((service) => (
            <div 
              key={service.slug} 
              className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-2xl p-6 shadow-sm dark:shadow-none hover:shadow-xl dark:hover:shadow-2xl transition-all duration-300 flex flex-col h-full"
            >
              <div className="text-4xl mb-4">{service.icon}</div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2 transition-colors duration-300">{service.name}</h3>
              <p className="text-slate-600 dark:text-slate-400 mb-6 flex-grow transition-colors duration-300">{service.desc}</p>
              
              <div className="mt-auto flex items-center justify-between">
                <span className="inline-block bg-blue-50 dark:bg-blue-500/10 text-blue-700 dark:text-blue-400 text-xs font-semibold px-3 py-1 rounded-full transition-colors duration-300">
                  {service.category}
                </span>
                <button className="text-sm font-medium text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 transition-colors duration-300">
                  View Details →
                </button>
              </div>
            </div>
          ))
        ) : (
          /* Empty State */
          <div className="col-span-full py-20 text-center">
            <p className="text-slate-500 dark:text-slate-400 text-lg transition-colors duration-300">No services found matching "{searchQuery}".</p>
            <button 
              onClick={() => { setSearchQuery(''); setActiveCategory('All'); }}
              className="mt-4 text-blue-600 dark:text-blue-400 hover:underline transition-colors duration-300"
            >
              Clear all filters
            </button>
          </div>
        )}
      </div>
      
    </div>
  );
};
