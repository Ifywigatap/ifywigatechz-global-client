import { Link } from "react-router-dom";
import { useEffect, useState, useCallback, useMemo } from "react";
import PropertyCard from "../components/realestate/PropertyCard";
import Filters from "../components/realestate/Filters";
import { getProperties, toggleSave, getSavedProperties } from "../services/realestate";

export default function RealEstate() {
  const [properties, setProperties] = useState([]);
  const [savedIds, setSavedIds] = useState([]);
  const [filters, setFilters] = useState({ 
    search: '', 
    category: 'All', 
    minPrice: 0, 
    maxPrice: 500000000, 
    sort: 'newest',
    beds: 0,
    baths: 0 
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const perPage = 12;

  const loadData = useCallback(async () => {
    setLoading(true);
    try {
      const allProps = getProperties();
      const saved = getSavedProperties();
      setProperties(allProps);
      setSavedIds(saved.map(p => p.id));
    } catch (error) {
      console.error('Error loading properties:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadData();
  }, [loadData]);

  const handleToggleSave = useCallback(async (id) => {
    const newSavedState = await toggleSave(id);
    setSavedIds(prev => newSavedState ? [...prev, id] : prev.filter(s => s !== id));
    return newSavedState;
  }, []);

  const handleFiltersChange = useCallback((newFilters) => {
    setFilters(newFilters);
    setCurrentPage(1); // Reset page on filter
  }, []);

  const filteredProperties = useMemo(() => {
    let result = properties.filter(p => {
      const matchesSearch = !filters.search || 
        p.title?.toLowerCase().includes(filters.search.toLowerCase()) ||
        p.location?.toLowerCase().includes(filters.search.toLowerCase()) ||
        p.description?.toLowerCase().includes(filters.search.toLowerCase());
      const matchesCategory = filters.category === 'All' || p.category === filters.category || p.type === filters.category;
      const matchesPrice = (filters.minPrice <= (p.price || 0)) && ((p.price || 0) <= filters.maxPrice);
      const matchesBeds = filters.beds === 0 || (p.beds || 0) >= filters.beds;
      const matchesBaths = filters.baths === 0 || (p.baths || 0) >= filters.baths;
      return matchesSearch && matchesCategory && matchesPrice && matchesBeds && matchesBaths;
    });

    // Sort
    switch (filters.sort) {
      case 'oldest':
        result.sort((a, b) => new Date(a.postedAt) - new Date(b.postedAt));
        break;
      case 'price-low':
        result.sort((a, b) => (a.price || 0) - (b.price || 0));
        break;
      case 'price-high':
        result.sort((a, b) => (b.price || 0) - (a.price || 0));
        break;
      case 'featured':
        result.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
        break;
      default: // newest
        result.sort((a, b) => new Date(b.postedAt) - new Date(a.postedAt));
    }

    return result;
  }, [properties, filters]);

  const totalPages = Math.ceil(filteredProperties.length / perPage);
  const paginatedProperties = filteredProperties.slice(
    (currentPage - 1) * perPage,
    currentPage * perPage
  );

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50 dark:bg-slate-950 transition-colors duration-300">
        <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        <p className="mt-4 text-slate-600 dark:text-slate-400">Loading properties...</p>
      </div>
    );
  }

  return (
    <section className="min-h-screen bg-slate-50 dark:bg-slate-950 py-12 text-slate-900 dark:text-white transition-colors duration-300">
      <div className="container mx-auto px-4 max-w-7xl">
        {/* HERO STATS */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-brandBlue to-brandGold bg-clip-text text-transparent mb-4">
            Find Your Dream Property
          </h1>
          <p className="text-xl text-slate-600 dark:text-neutral-400 mb-8 max-w-2xl mx-auto">
            Discover 100+ verified listings across Nigeria. Rent, buy, or invest with confidence.
          </p>
          <div className="flex flex-wrap justify-center gap-8 text-sm md:text-base">
            <div className="bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 px-4 py-2 rounded-lg shadow-sm dark:shadow-none transition-colors duration-300">Total Properties: <span className="font-bold text-brandGold">{properties.length.toLocaleString()}</span></div>
            <div className="bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 px-4 py-2 rounded-lg shadow-sm dark:shadow-none transition-colors duration-300">Filtered: <span className="font-bold text-brandBlue">{filteredProperties.length.toLocaleString()}</span></div>
            <div className="bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 px-4 py-2 rounded-lg shadow-sm dark:shadow-none transition-colors duration-300">Saved: <span className="font-bold text-emerald-500 dark:text-emerald-400">{savedIds.length}</span></div>
          </div>
          <Link
            to="/post-property"
            className="mt-8 inline-block bg-gradient-to-r from-brandBlue to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white px-8 py-4 rounded-2xl font-semibold text-lg shadow-xl hover:shadow-brandBlue/30 transition-all duration-300 transform hover:-translate-y-1"
          >
            + Post Your Property
          </Link>
        </div>

        {/* FILTERS + GRID LAYOUT */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* STICKY FILTERS */}
          <Filters 
            filters={filters} 
            onFiltersChange={handleFiltersChange}
          />

          {/* PROPERTIES GRID */}
          <div className="lg:col-span-3 space-y-8">
            {filteredProperties.length === 0 ? (
              <div className="text-center py-20">
                <div className="w-32 h-32 mx-auto mb-6 bg-slate-100 dark:bg-slate-800 rounded-full flex items-center justify-center border border-slate-200 dark:border-white/10 transition-colors duration-300">
                  <span className="text-3xl">🏠</span>
                </div>
                <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">No properties match your filters</h3>
                <p className="text-slate-600 dark:text-neutral-400 mb-8">Try adjusting your search criteria</p>
                <button
                  onClick={() => setFilters({ search: '', category: 'All', minPrice: 0, maxPrice: 500000000, sort: 'newest', beds: 0, baths: 0 })}
                  className="bg-brandBlue hover:bg-blue-600 text-white px-6 py-3 rounded-xl font-semibold transition shadow-lg"
                >
                  Clear All Filters
                </button>
              </div>
            ) : (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                  {paginatedProperties.map((property) => (
                    <PropertyCard
                      key={property.id}
                      property={property}
                      isSaved={savedIds.includes(property.id)}
                      onToggleSave={handleToggleSave}
                    />
                  ))}
                </div>

                {/* PAGINATION */}
                {totalPages > 1 && (
                  <div className="flex flex-wrap items-center justify-center gap-2 mt-12">
                    <button
                      disabled={currentPage === 1}
                      onClick={() => setCurrentPage(p => p - 1)}
                      className="px-4 py-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/10 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800 disabled:opacity-50 disabled:cursor-not-allowed transition text-slate-700 dark:text-neutral-300 shadow-sm dark:shadow-none"
                    >
                      Previous
                    </button>
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                      <button
                        key={page}
                        onClick={() => setCurrentPage(page)}
                        className={`px-4 py-2 rounded-lg font-medium transition ${
                          currentPage === page
                            ? 'bg-brandBlue text-white shadow-md border-brandBlue'
                            : 'bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/10 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-700 dark:text-neutral-300 shadow-sm dark:shadow-none'
                        }`}
                      >
                        {page}
                      </button>
                    ))}
                    <button
                      disabled={currentPage === totalPages}
                      onClick={() => setCurrentPage(p => p + 1)}
                      className="px-4 py-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/10 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800 disabled:opacity-50 disabled:cursor-not-allowed transition text-slate-700 dark:text-neutral-300 shadow-sm dark:shadow-none"
                    >
                      Next
                    </button>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
