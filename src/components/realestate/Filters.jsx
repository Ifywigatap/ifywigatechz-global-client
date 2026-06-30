import { useState, useId } from 'react';

export default function Filters({ 
  onFiltersChange, 
  filters = { 
    search: '', 
    category: 'All', 
    minPrice: 0, 
    maxPrice: 500000000, 
    sort: 'newest',
    beds: 0,
    baths: 0 
  } 
}) {
  const [localFilters, setLocalFilters] = useState(filters);
  const id = useId();

  const handleChange = (key, value) => {
    const newFilters = { ...localFilters, [key]: value };
    setLocalFilters(newFilters);
    onFiltersChange?.(newFilters);
  };

  const clearFilters = () => {
    const reset = { search: '', category: 'All', minPrice: 0, maxPrice: 500000000, sort: 'newest', beds: 0, baths: 0 };
    setLocalFilters(reset);
    onFiltersChange?.(reset);
  };

  return (
    <div className="bg-white p-6 rounded-2xl shadow-lg border sticky top-24 z-10">
      <h3 className="font-bold text-xl mb-6">Filters</h3>
      
      {/* SEARCH */}
      <input
        id={`${id}-search`}
        type="text"
        placeholder="Search properties..."
        value={localFilters.search}
        onChange={(e) => handleChange('search', e.target.value)}
        className="w-full p-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent mb-4"
      />

      {/* CATEGORIES */}
      <select
        id={`${id}-category`}
        value={localFilters.category}
        onChange={(e) => handleChange('category', e.target.value)}
        className="w-full p-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 mb-4"
      >
        <option>All</option>
        <option>Rent</option>
        <option>Buy</option>
        <option>Land</option>
      </select>

      {/* PRICE RANGE */}
      <div className="space-y-3 mb-6">
        <label className="font-medium text-sm">Price Range</label>
        <div className="grid grid-cols-2 gap-3">
          <input
            type="number"
            placeholder="Min"
            value={localFilters.minPrice}
            onChange={(e) => handleChange('minPrice', Number(e.target.value) || 0)}
            className="p-3 border rounded-xl text-sm"
          />
          <input
            type="number"
            placeholder="Max"
            value={localFilters.maxPrice}
            onChange={(e) => handleChange('maxPrice', Number(e.target.value) || 500000000)}
            className="p-3 border rounded-xl text-sm"
          />
        </div>
      </div>

      {/* BEDS/BATHS */}
      <div className="grid grid-cols-2 gap-3 mb-6">
        <select onChange={(e) => handleChange('beds', Number(e.target.value))} className="p-3 border rounded-xl">
          <option value={0}>Any beds</option>
          <option value={1}>1+</option>
          <option value={2}>2+</option>
          <option value={3}>3+</option>
          <option value={4}>4+</option>
        </select>
        <select onChange={(e) => handleChange('baths', Number(e.target.value))} className="p-3 border rounded-xl">
          <option value={0}>Any baths</option>
          <option value={1}>1+</option>
          <option value={2}>2+</option>
          <option value={3}>3+</option>
        </select>
      </div>

      {/* SORT */}
      <select
        value={localFilters.sort}
        onChange={(e) => handleChange('sort', e.target.value)}
        className="w-full p-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 mb-6"
      >
        <option value="newest">Newest first</option>
        <option value="oldest">Oldest first</option>
        <option value="price-low">Price: Low-High</option>
        <option value="price-high">Price: High-Low</option>
        <option value="featured">Featured first</option>
      </select>

      {/* ACTIONS */}
      <div className="flex gap-3">
        <button
          onClick={clearFilters}
          className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 py-3 px-6 rounded-xl transition font-medium"
        >
          Clear All
        </button>
        <button
          className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-3 px-6 rounded-xl transition font-semibold"
        >
          Apply Filters
        </button>
      </div>

      {/* ACTIVE FILTERS COUNTER */}
      <div className="text-xs text-gray-500 mt-4 text-center">
        {Object.values(localFilters).filter(Boolean).length - 1} filters active
      </div>
    </div>
  );
}

