import { useState, useMemo, useEffect } from "react";
import { productService } from "../services/products";
import { Helmet } from "react-helmet-async";
import { useCart } from "../context/CartContext";
import CartDrawer from "../components/CartDrawer";
import Toast from "../components/Toast";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Heart } from "lucide-react";

export default function EcommercePage() {
  const [products, setProducts] = useState([])
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [subCategory, setSubCategory] = useState("All");
  const [sort, setSort] = useState("default");
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [isMobileFilterOpen, setMobileFilterOpen] = useState(false);
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")

  const { addToCart } = useCart();
  const [wishlist, setWishlist] = useState([]);

  const toggleWishlist = (id) => {
    setWishlist(prev => 
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  // Fetch products from backend
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true)
        setError("")
        const response = await productService.getAllProducts(1, 100)
        setProducts(response.data || [])
      } catch (err) {
        setError(err.message || "Failed to load products")
        console.error("Error fetching products:", err)
      } finally {
        setLoading(false)
      }
    }

    fetchProducts()
  }, [])

  const categories = ["All", "Cosmetics", "Medicine"];

  const subCategories = useMemo(() => {
    const subs = products
      .filter((p) => category === "All" || p.mainCategory === category)
      .map((p) => p.subCategory);
    return ["All", ...new Set(subs)];
  }, [category, products]);

  const filtered = useMemo(() => {
    let result = products.filter((p) => {
      const matchSearch = (p.name || "").toLowerCase().includes(search.toLowerCase());
      const matchCategory = category === "All" || p.mainCategory === category;
      const matchSub = subCategory === "All" || p.subCategory === subCategory;
      return matchSearch && matchCategory && matchSub;
    });

    if (sort === "priceLow") result.sort((a, b) => a.price - b.price);
    if (sort === "priceHigh") result.sort((a, b) => b.price - a.price);
    if (sort === "ratingHigh") result.sort((a, b) => (b.rating || 0) - (a.rating || 0));

    return result;
  }, [search, category, subCategory, sort]);

  const handleAddToCart = (product) => {
    addToCart({ ...product, qty: 1 });
    setShowToast(true);
    setTimeout(() => setShowToast(false), 2000);
    setIsCartOpen(true);
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white transition-colors duration-300">
      <Helmet>
        <title>Shop | IFYWIGATECHZ GLOBAL SERVICES</title>
      </Helmet>

      {/* HEADER */}
      <div className="bg-white/80 dark:bg-slate-950/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 sticky top-0 z-50 transition-colors duration-300">
        <div className="max-w-7xl mx-auto flex items-center gap-4 p-4">
          <h1 className="font-bold text-lg sm:text-xl text-slate-900 dark:text-white transition-colors duration-300 whitespace-nowrap">IFYWIGATECHZ</h1>

          <input
            type="text"
            placeholder="Search for products..."
            value={search}
            aria-label="Search for products"
            onChange={(e) => setSearch(e.target.value)}
            className="flex-1 px-4 py-2 bg-slate-100 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white focus:outline-none focus:border-brandBlue focus:ring-1 focus:ring-brandBlue placeholder-slate-500 dark:placeholder-neutral-500 transition-colors duration-300"
          />

          <button onClick={() => setIsCartOpen(true)} className="bg-brandBlue hover:bg-blue-600 transition text-white px-5 py-2 rounded-lg font-medium">
            Cart
          </button>
        </div>
      </div>

      {/* MAIN */}
      <div className="max-w-7xl mx-auto flex gap-6 py-6 px-4">

        {/* DESKTOP SIDEBAR */}
        <aside className="w-64 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-5 rounded-2xl hidden md:block lg:block sm:w-72 shadow-sm dark:shadow-none transition-colors duration-300">
          <h3 className="font-semibold mb-3 text-slate-900 dark:text-white transition-colors duration-300">Categories</h3>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => {
                setCategory(cat);
                setSubCategory("All");
              }}
              className={`block w-full text-left px-3 py-2 rounded-lg transition-colors duration-300 mb-1 ${category === cat ? "bg-blue-50 dark:bg-brandBlue/20 text-brandBlue font-medium" : "text-slate-600 dark:text-neutral-400 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white"}`}
            >
              {cat}
            </button>
          ))}

          <h3 className="font-semibold mt-6 mb-3 text-slate-900 dark:text-white transition-colors duration-300">Sub Categories</h3>
          {subCategories.map((sub) => (
            <button
              key={sub}
              onClick={() => setSubCategory(sub)}
              className={`block w-full text-left px-3 py-2 rounded-lg transition-colors duration-300 mb-1 ${subCategory === sub ? "bg-blue-50 dark:bg-brandBlue/20 text-brandBlue font-medium" : "text-slate-600 dark:text-neutral-400 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white"}`}
            >
              {sub}
            </button>
          ))}
        </aside>

        {/* PRODUCTS & MOBILE FILTER BUTTON */}
        <main className="flex-1">

          {/* MOBILE FILTER BUTTON */}
          <div className="flex justify-between items-center mb-4 md:hidden">
            <h2 className="font-bold text-lg text-slate-900 dark:text-white transition-colors duration-300">Products</h2>
            <button
              onClick={() => setMobileFilterOpen(true)}
              className="px-4 py-2 bg-brandBlue text-white rounded-lg shadow hover:bg-blue-600 transition font-medium"
            >
              Filters
            </button>
          </div>

          {/* SORT SELECT */}
          <div className="flex justify-between mb-4  md:flex">
            <h2 className="font-bold text-lg text-slate-900 dark:text-white transition-colors duration-300">Products</h2>
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value)}
              className="bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 px-3 py-2 rounded-lg text-slate-900 dark:text-white focus:outline-none focus:border-brandBlue transition-colors duration-300"
            >
              <option value="default">Sort</option>
              <option value="priceLow">Price Low → High</option>
              <option value="priceHigh">Price High → Low</option>
              <option value="ratingHigh">Top Rated</option>
            </select>
          </div>

          {/* PRODUCT GRID */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {filtered.map((p, i) => (
              <motion.div
                key={p.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.03 }}
                className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-sm hover:shadow-md dark:shadow-none hover:dark:shadow-brandBlue/10 hover:border-brandBlue dark:hover:border-slate-700 transition-all duration-300 overflow-hidden group flex flex-col"
              >
                <Link to={`/products/${p.id}`}>
                  <img src={p.image} alt={p.name} className="h-40 w-full object-cover" />
                </Link>

                <div className="p-4 flex flex-col flex-grow">
                  <h3 className="text-sm font-semibold line-clamp-2 text-slate-900 dark:text-white group-hover:text-brandBlue dark:group-hover:text-brandBlue transition-colors duration-300">{p.name}</h3>
                  <p className="text-brandBlue dark:text-brandGold font-bold mt-1 text-lg transition-colors duration-300">₦{p.price.toLocaleString()}</p>
                  <p className="text-xs text-slate-500 dark:text-neutral-400 mt-1 mb-3 transition-colors duration-300">⭐ {p.rating || 0}</p>

                  <div className="flex items-center justify-between mt-auto pt-2 border-t border-slate-200 dark:border-slate-800 transition-colors duration-300">
                    <button
                      onClick={() => handleAddToCart(p)}
                      className="bg-brandBlue hover:bg-blue-600 text-white text-sm px-4 py-2 rounded-lg font-medium transition-colors"
                    >
                      Add
                    </button>

                    <button onClick={() => toggleWishlist(p.id)}>
                      <Heart
                        className={`w-5 h-5 transition-colors ${wishlist?.includes(p.id) ? "fill-red-500 text-red-500" : "text-slate-400 dark:text-neutral-500 hover:text-red-500 dark:hover:text-red-400"}`}
                      />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </main>

      </div>

      {/* MOBILE FILTER DRAWER */}
      {isMobileFilterOpen && (
        <div className="fixed inset-0 z-50 flex">
          {/* Overlay */}
          <div
            className="absolute inset-0 bg-slate-900/60 dark:bg-black/60 backdrop-blur-sm transition-opacity duration-300"
            onClick={() => setMobileFilterOpen(false)}
          />

          {/* Drawer */}
          <div className="relative ml-auto w-80 max-w-full h-full bg-white dark:bg-slate-950 border-l border-slate-200 dark:border-slate-800 shadow-2xl flex flex-col animate-slideIn transition-colors duration-300">

            {/* Header */}
            <div className="flex justify-between items-center px-5 py-4 border-b border-slate-200 dark:border-slate-800 transition-colors duration-300">
              <h3 className="font-semibold text-lg text-slate-900 dark:text-white transition-colors duration-300">Filters</h3>
              <button
                onClick={() => setMobileFilterOpen(false)}
                className="text-slate-500 hover:text-slate-900 dark:text-neutral-400 dark:hover:text-white text-xl transition-colors duration-300"
              >
                ✕
              </button>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto px-5 py-4">

              {/* Categories */}
              <h4 className="font-semibold mb-2 text-slate-900 dark:text-white transition-colors duration-300">Categories</h4>
              <div className="space-y-1">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => {
                      setCategory(cat);
                      setSubCategory("All");
                    }}
                    className={`w-full text-left px-3 py-2 rounded-lg transition-colors duration-300 ${
                      category === cat
                        ? "bg-blue-50 dark:bg-brandBlue/20 text-brandBlue font-medium"
                        : "text-slate-600 dark:text-neutral-400 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white"
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>

              {/* Subcategories */}
              <h4 className="font-semibold mt-6 mb-2 text-slate-900 dark:text-white transition-colors duration-300">
                Sub Categories
              </h4>
              <div className="space-y-1">
                {subCategories.map((sub) => (
                  <button
                    key={sub}
                    onClick={() => setSubCategory(sub)}
                    className={`w-full text-left px-3 py-2 rounded-lg transition-colors duration-300 ${
                      subCategory === sub
                        ? "bg-blue-50 dark:bg-brandBlue/20 text-brandBlue font-medium"
                        : "text-slate-600 dark:text-neutral-400 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white"
                    }`}
                  >
                    {sub}
                  </button>
                ))}
              </div>

            </div>

            {/* Footer Actions */}
            <div className="p-4 border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 transition-colors duration-300">
              <button
                onClick={() => {
                  setCategory("All");
                  setSubCategory("All");
                }}
                className="w-full mb-2 py-2 rounded-lg border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-neutral-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors duration-300"
              >
                Clear Filters
              </button>
              <button
                onClick={() => setMobileFilterOpen(false)}
                className="w-full py-3 rounded-lg bg-brandBlue text-white font-semibold shadow hover:bg-blue-600 transition"
              >
                Apply Filters
              </button>
            </div>
          </div>
        </div>
      )}

      <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
      <Toast message="Added to cart" show={showToast} />
    </div>
  );
}