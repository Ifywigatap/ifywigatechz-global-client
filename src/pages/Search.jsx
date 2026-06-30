import { useState, useEffect, useCallback, useMemo } from 'react';
import { useSearchParams, useNavigate, Link } from 'react-router-dom';
import { searchService } from '../services/search';
import PageWrapper from '../components/PageWrapper';
import { useCart } from '../context/CartContext';
import { navLinks } from '../data/navlink';

export default function Search() {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialQuery = searchParams.get('q') || '';
  const [query, setQuery] = useState(initialQuery);
  const [results, setResults] = useState({ courses: [], products: [], pages: [] });
  const [loading, setLoading] = useState(!!initialQuery);
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [filters, setFilters] = useState({
    type: 'all',
    category: '',
    priceMin: 0,
    priceMax: 100000
  });
  const [page, setPage] = useState(1);
  const [sortBy, setSortBy] = useState('relevant');

  useEffect(() => {
    if (initialQuery) {
      performSearch(initialQuery, 1);
    }
  }, []);

  const performSearch = async (searchQuery, pageNum = 1) => {
    if (!searchQuery.trim()) {
      setResults({ courses: [], products: [] });
      return;
    }

    setLoading(true);

    try {
      console.log('[Search] Searching for:', searchQuery);

      const response = await searchService.search(
        searchQuery,
        filters,
        pageNum,
        10
      );

      if (response.ok) {
        setResults(response.data || { courses: [], products: [] });
        setSearchParams({ q: searchQuery });
      }

      setLoading(false);
    } catch (error) {
      console.error('[Search] Error:', error);
      setResults({ courses: [], products: [] });
      setLoading(false);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    setPage(1);
    performSearch(query, 1);
  };

  const handleSuggestionClick = async (suggestion) => {
    setQuery(suggestion);
    setShowSuggestions(false);
    setPage(1);
    performSearch(suggestion, 1);
  };

  const handleQueryChange = useCallback(async (value) => {
    setQuery(value);

    if (value.length > 2) {
      const localSugs = new Set();
      const q = value.toLowerCase();
      
      if (navLinks && Array.isArray(navLinks)) {
        navLinks.forEach(nav => {
           if (nav.name.toLowerCase().includes(q)) localSugs.add(nav.name);
           if (nav.mega) {
              nav.mega.sections?.forEach(sec => {
                 sec.links?.forEach(l => {
                    if (l.label.toLowerCase().includes(q)) localSugs.add(l.label);
                 });
              });
           }
        });
      }

      try {
        const response = await searchService.getSuggestions(value, 'all');
        if (response.ok) {
          const apiSugs = response.data || [];
          setSuggestions([...new Set([...Array.from(localSugs), ...apiSugs])]);
        } else {
          setSuggestions(Array.from(localSugs));
        }
      } catch (error) {
        console.error('[Search] Suggestions error:', error);
        setSuggestions(Array.from(localSugs));
      }
    } else {
      setSuggestions([]);
    }
  }, []);

  const getSortedResults = (items) => {
    const sorted = [...items];
    switch (sortBy) {
      case 'price-low':
        return sorted.sort((a, b) => a.price - b.price);
      case 'price-high':
        return sorted.sort((a, b) => b.price - a.price);
      case 'rating':
        return sorted.sort((a, b) => (b.rating || 0) - (a.rating || 0));
      case 'newest':
        return sorted.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      default:
        return sorted;
    }
  };

  const filterResults = (items) => {
    return items.filter(item => {
      const meetsPrice = item.price >= filters.priceMin && item.price <= filters.priceMax;
      const meetsCategory = !filters.category || item.category === filters.category;
      return meetsPrice && meetsCategory;
    });
  };

  const filteredCourses = filterResults(results.courses || []);
  const filteredProducts = filterResults(results.products || []);
  const pages = results.pages || [];
  const courses = getSortedResults(filteredCourses);
  const products = getSortedResults(filteredProducts);
  const totalResults = courses.length + products.length + pages.length;

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 py-12 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4">
        {/* Search Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-slate-900 dark:text-white mb-6">Search</h1>

          {/* Search Bar */}
          <form onSubmit={handleSearch} className="relative mb-6">
            <div className="relative">
              <input
                type="text"
                value={query}
                onChange={(e) => handleQueryChange(e.target.value)}
                onFocus={() => setShowSuggestions(true)}
                onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
                placeholder="Search courses, products, and more..."
                className="w-full px-6 py-4 text-lg border-2 border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white rounded-lg focus:outline-none focus:border-brandBlue dark:focus:border-brandBlue placeholder-slate-400 dark:placeholder-slate-500 transition-colors duration-300"
              />
              <button
                type="submit"
                className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-brandBlue hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-lg transition-colors"
              >
                Search
              </button>

              {/* Suggestions Dropdown */}
              {showSuggestions && suggestions.length > 0 && (
                <div className="absolute top-full left-0 right-0 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg mt-2 shadow-lg z-10 overflow-hidden">
                  {suggestions.slice(0, 8).map((suggestion, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleSuggestionClick(suggestion)}
                      className="w-full text-left px-6 py-3 hover:bg-slate-50 dark:hover:bg-slate-700 border-b border-slate-100 dark:border-slate-700 last:border-b-0 transition-colors"
                    >
                      <p className="text-slate-900 dark:text-white">
                        <span className="text-slate-500 dark:text-slate-400">Search for </span>
                        {suggestion}
                      </p>
                    </button>
                  ))}
                </div>
              )}
            </div>
          </form>
        </div>

        {/* Results */}
        {loading ? (
          <div className="text-center py-12">
            <div className="w-16 h-16 border-4 border-brandBlue border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-slate-600 dark:text-slate-400">Searching...</p>
          </div>
        ) : query ? (
          <div>
            {/* Results Summary */}
            <div className="mb-8">
              <p className="text-slate-600 dark:text-slate-300">
                Found <span className="font-bold">{totalResults}</span> result{totalResults !== 1 ? 's' : ''} for "{query}"
              </p>
            </div>

            {totalResults === 0 ? (
              <div className="bg-white dark:bg-slate-900 rounded-xl shadow-sm border border-slate-200 dark:border-slate-800 p-12 text-center transition-colors duration-300">
                <p className="text-slate-900 dark:text-white text-lg mb-4 font-semibold">No results found</p>
                <p className="text-slate-500 dark:text-slate-400 mb-6">Try different keywords or check spelling</p>
              </div>
            ) : (
              <div>
                {/* Sort Options */}
                <div className="mb-6 flex gap-4">
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="px-4 py-2 bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-brandBlue transition-colors"
                  >
                    <option value="relevant">Most Relevant</option>
                    <option value="price-low">Price: Low to High</option>
                    <option value="price-high">Price: High to Low</option>
                    <option value="rating">Highest Rated</option>
                    <option value="newest">Newest</option>
                  </select>
                </div>

                {/* Pages & Services Section */}
                {pages.length > 0 && (
                  <div className="mb-12">
                    <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">
                      📄 Pages & Services ({pages.length})
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {pages.map((page, idx) => (
                        <Link to={page.link} key={idx} className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl shadow-sm hover:shadow-md dark:hover:shadow-lg transition-all duration-300 p-6 flex flex-col h-full group">
                          <div className="flex justify-between items-start mb-3">
                            <h3 className="text-lg font-semibold text-slate-900 dark:text-white group-hover:text-brandBlue transition-colors">{page.title}</h3>
                            <span className="text-xs font-medium px-2.5 py-1 bg-brandBlue/10 text-brandBlue rounded-full">{page.category}</span>
                          </div>
                          <p className="text-sm text-slate-600 dark:text-slate-400 mt-auto">{page.desc}</p>
                        </Link>
                      ))}
                    </div>
                  </div>
                )}

                {/* Courses Section */}
                {courses.length > 0 && (
                  <div className="mb-12">
                    <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">
                      📚 Courses ({courses.length})
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {courses.map(course => (
                        <div key={course._id} className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-md dark:hover:shadow-lg transition-all duration-300 overflow-hidden flex flex-col group">
                          <div className="h-40 bg-slate-200 dark:bg-slate-800 bg-gradient-to-r from-brandBlue to-blue-600 opacity-90 group-hover:opacity-100 transition-opacity"></div>
                          <div className="p-6 flex flex-col flex-grow">
                            <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-2 line-clamp-2 group-hover:text-brandBlue transition-colors">
                              {course.name}
                            </h3>
                            {course.instructor && (
                              <p className="text-sm text-slate-600 dark:text-slate-400 mb-3">
                                by {course.instructor}
                              </p>
                            )}
                            <div className="flex justify-between items-end mt-auto pt-4">
                              <div>
                                <p className="text-slate-500 dark:text-slate-400 text-sm">Price</p>
                                <p className="text-2xl font-bold text-brandBlue dark:text-brandGold">
                                  ₦{course.price?.toLocaleString()}
                                </p>
                              </div>
                              <button className="bg-brandBlue hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg transition-colors">
                                Learn More
                              </button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Products Section */}
                {products.length > 0 && (
                  <div>
                    <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">
                      🛍️ Products ({products.length})
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {products.map(product => (
                        <div key={product._id} className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-md dark:hover:shadow-lg transition-all duration-300 overflow-hidden flex flex-col group">
                          {product.image && (
                            <div className="h-40 bg-slate-200 dark:bg-slate-800 overflow-hidden">
                              <img
                                src={product.image}
                                alt={product.name}
                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                              />
                            </div>
                          )}
                          <div className="p-6 flex flex-col flex-grow">
                            <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-2 line-clamp-2 group-hover:text-brandBlue transition-colors">
                              {product.name}
                            </h3>
                            {product.description && (
                              <p className="text-sm text-slate-600 dark:text-slate-400 mb-3 line-clamp-2 flex-grow">
                                {product.description}
                              </p>
                            )}
                            <div className="flex justify-between items-end mt-auto pt-4">
                              <div>
                                <p className="text-slate-500 dark:text-slate-400 text-sm">Price</p>
                                <p className="text-2xl font-bold text-brandBlue dark:text-brandGold">
                                  ₦{product.price?.toLocaleString()}
                                </p>
                              </div>
                              <button className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-2 px-4 rounded-lg transition-colors">
                                Add Cart
                              </button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        ) : (
          <div className="bg-white dark:bg-slate-900 rounded-xl shadow-sm border border-slate-200 dark:border-slate-800 p-12 text-center transition-colors duration-300">
            <p className="text-slate-900 dark:text-white text-lg mb-4 font-semibold">Start typing to search</p>
            <p className="text-slate-500 dark:text-slate-400">Search for courses, products, and more</p>
          </div>
        )}
      </div>
    </div>
  );
}
