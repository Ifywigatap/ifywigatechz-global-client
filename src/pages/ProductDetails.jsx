import { useParams, Link } from "react-router-dom";
import { useState, useMemo, useEffect } from "react";
import { productService } from "../services/products";
import { useCart } from "../context/CartContext";
import { Helmet } from "react-helmet-async";
import CartDrawer from "../components/CartDrawer";
import Toast from "../components/Toast";
import { motion } from "framer-motion";
import { Heart, Star } from "lucide-react";

export default function ProductDetails() {
  const { id } = useParams();
  const { addToCart, wishlist, toggleWishlist } = useCart();

  const [product, setProduct] = useState(null)
  const [relatedProducts, setRelatedProducts] = useState([])
  const [activeTab, setActiveTab] = useState("description");
  const [qty, setQty] = useState(1);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [activeImage, setActiveImage] = useState(0);
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")

  // Fetch product by ID
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true)
        setError("")
        const response = await productService.getProductById(id)
        setProduct(response.data)

        // Fetch related products
        if (response.data) {
          const relatedResponse = await productService.getRelatedProducts(id, 6)
          setRelatedProducts(relatedResponse.data || [])
        }
      } catch (err) {
        setError(err.message || "Failed to load product")
        console.error("Error fetching product:", err)
      } finally {
        setLoading(false)
      }
    }

    if (id) {
      fetchProduct()
    }
  }, [id])

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex flex-col items-center justify-center transition-colors duration-300">
        <div className="w-12 h-12 border-4 border-orange-500 border-t-transparent rounded-full animate-spin mb-4"></div>
        <p className="text-slate-600 dark:text-slate-400">Loading product details...</p>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex flex-col items-center justify-center transition-colors duration-300">
        <div className="text-center p-8 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl shadow-sm dark:shadow-none">
          <p className="text-red-600 dark:text-red-400 text-lg mb-4">{error || "Product not found"}</p>
          <Link to="/ecommerce" className="text-brandBlue hover:underline">
            ← Back to Shop
          </Link>
        </div>
      </div>
    );
  }

  const images = [product.image, product.image, product.image];

  const handleAddToCart = () => {
    addToCart({ ...product, qty });
    setShowToast(true);
    setIsCartOpen(true);
    setTimeout(() => setShowToast(false), 2000);
  };

  return (
    <div className="bg-slate-100 dark:bg-slate-950 min-h-screen text-slate-900 dark:text-white transition-colors duration-300">
      <Helmet>
        <title>{product.name} | Shop</title>
      </Helmet>

      {/* MAIN */}
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-8 p-6">

        {/* IMAGE GALLERY */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          <div className="bg-white dark:bg-slate-900 rounded-xl p-4 border border-slate-200 dark:border-slate-800 shadow-sm dark:shadow-none transition-colors duration-300">
            <img
              src={images[activeImage]}
              alt={product.name}
              className="w-full h-64 sm:h-72 md:h-80 object-cover rounded-lg"
            />

            <div className="flex gap-2 mt-3">
              {images.map((img, i) => (
                <img
                  key={i}
                  src={img}
                  onClick={() => setActiveImage(i)}
                  className={`h-12 sm:h-16 w-12 sm:w-16 object-cover rounded cursor-pointer border transition-colors duration-300 ${
                    activeImage === i ? "border-orange-500 ring-2 ring-orange-500/20" : "border-slate-200 dark:border-slate-700 hover:border-orange-300 dark:hover:border-orange-700"
                  }`}
                />
              ))}
            </div>
          </div>
        </motion.div>

        {/* DETAILS */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
          <div className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm dark:shadow-none space-y-4 transition-colors duration-300">

            <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-slate-900 dark:text-white transition-colors duration-300">{product.name}</h1>

            <div className="flex items-center gap-4">
              <p className="text-orange-500 text-2xl font-bold">
                ₦{Number(product.price).toLocaleString()}
              </p>

              <div className="flex items-center text-sm text-slate-600 dark:text-slate-300">
                <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                {product.rating || 0}
              </div>
            </div>

            <p className="text-slate-600 dark:text-slate-300">{product.description}</p>

            {/* QUANTITY */}
            <div className="flex items-center gap-3">
              <button
                onClick={() => setQty((q) => Math.max(1, q - 1))}
                className="px-3 py-1 border border-slate-300 dark:border-slate-700 rounded hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              >
                -
              </button>
              <span>{qty}</span>
              <button
                onClick={() => setQty((q) => q + 1)}
                className="px-3 py-1 border border-slate-300 dark:border-slate-700 rounded hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              >
                +
              </button>
            </div>

            {/* ACTIONS */}
            <div className="flex gap-3">
              <button
                onClick={handleAddToCart}
                className="flex-1 bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 rounded-lg transition-colors duration-300 shadow-md hover:shadow-lg"
              >
                Add to Cart
              </button>

              <button onClick={() => toggleWishlist(product.id)}>
                <Heart
                  className={`w-6 h-6 ${wishlist?.includes(product.id)
                    ? "fill-red-500 text-red-500"
                    : "text-slate-400 dark:text-slate-500 hover:text-red-500 dark:hover:text-red-400 transition-colors"
                  }`}
                />
              </button>
            </div>
          </div>

          {/* TABS */}
          <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm dark:shadow-none overflow-hidden transition-colors duration-300">

            <div className="flex border-b border-slate-200 dark:border-slate-800 overflow-x-auto">
              {["description", "specs", "reviews"].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`flex-1 py-3 px-3 text-xs sm:text-sm font-medium capitalize transition-colors duration-300 whitespace-nowrap ${
                    activeTab === tab
                      ? "border-b-2 border-orange-500 text-orange-500"
                      : "text-slate-500 dark:text-slate-400 hover:text-orange-500 dark:hover:text-orange-400 bg-slate-50 dark:bg-slate-800/50 hover:bg-white dark:hover:bg-slate-800"
                  }`}
                >
                  {tab === "specs" ? "Specs" : tab}
                </button>
              ))}
            </div>

            <div className="p-5">

              {activeTab === "description" && (
                <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed">
                  {product.description || "No description available"}
                </p>
              )}

              {activeTab === "specs" && (
                product.features && product.features.length > 0 ? (
                  <ul className="text-sm text-slate-600 dark:text-slate-300 space-y-2">
                    {product.features.map((f, i) => (
                      <li key={i}>• {f}</li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-slate-400 dark:text-slate-500 text-sm">No specifications available</p>
                )
              )}

              {activeTab === "reviews" && (
                <div className="text-sm text-slate-500 dark:text-slate-400">
                  <p>No reviews yet ⭐</p>
                  <p className="mt-2">Be the first to review this product!</p>
                </div>
              )}

            </div>
          </div>

        </motion.div>
      </div>

      {/* RELATED PRODUCTS */}
      <div className="max-w-7xl mx-auto px-6 pb-10">
        <h2 className="font-bold text-lg mb-4 text-slate-900 dark:text-white transition-colors duration-300">Related Products</h2>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {relatedProducts.map((p) => (
            <Link key={p.id} to={`/products/${p.id}`}>
              <div className="bg-white dark:bg-slate-900 p-3 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm dark:shadow-none hover:shadow-md dark:hover:shadow-lg transition-all duration-300 h-full flex flex-col group">
                <div className="overflow-hidden rounded-lg mb-2">
                  <img src={p.image} className="h-28 w-full object-cover group-hover:scale-105 transition-transform duration-300" />
                </div>
                <p className="text-sm mt-2 line-clamp-2 text-slate-900 dark:text-white group-hover:text-brandBlue dark:group-hover:text-brandGold transition-colors duration-300 flex-grow">{p.name}</p>
                <p className="text-orange-500 text-sm font-bold mt-2 transition-colors duration-300">
                  ₦{Number(p.price).toLocaleString()}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>

      <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
      <Toast message="Added to cart" show={showToast} />
    </div>
  );
}
