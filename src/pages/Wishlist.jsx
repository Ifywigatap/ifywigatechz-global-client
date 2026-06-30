import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { authService } from '../services/auth';
import { wishlistService } from '../services/wishlist';
import { cartService } from '../services/cart';
import Toast from '../components/Toast';

const normalizeImageUrl = (src) => {
  if (!src) return "/images/placeholder.jpg";
  if (typeof src !== "string") return "/images/placeholder.jpg";
  if (src.startsWith("http://") || src.startsWith("https://")) return src;
  const path = src.startsWith("/") ? src : `/${src}`;
  return encodeURI(path);
};

export default function Wishlist() {
  const navigate = useNavigate();
  const [wishlistItems, setWishlistItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [toast, setToast] = useState(null);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    if (!authService.isAuthenticated()) {
      navigate('/login');
      return;
    }

    fetchWishlist();
  }, [navigate]);

  const fetchWishlist = async () => {
    try {
      setLoading(true);
      console.log('[Wishlist] Fetching wishlist');

      const response = await wishlistService.getWishlist();

      if (response.ok) {
        setWishlistItems(response.data.items || []);
        setError(null);
      } else {
        setError(response.message || 'Failed to fetch wishlist');
      }

      setLoading(false);
    } catch (error) {
      console.error('[Wishlist] Error:', error);
      setError(error.message || 'Failed to load wishlist');
      setLoading(false);
    }
  };

  const handleRemoveFromWishlist = async (itemId) => {
    try {
      console.log('[Wishlist] Removing item:', itemId);

      const response = await wishlistService.removeFromWishlist(itemId);

      if (response.ok) {
        setWishlistItems(wishlistItems.filter(item => item._id !== itemId));
        showToast('Removed from wishlist', 'success');
      } else {
        showToast(response.message || 'Failed to remove item', 'error');
      }
    } catch (error) {
      console.error('[Wishlist] Error:', error);
      showToast(error.message || 'Failed to remove item', 'error');
    }
  };

  const handleAddToCart = async (item) => {
    try {
      console.log('[Wishlist] Adding to cart:', item._id);

      const cartItem = {
        id: item._id,
        name: item.name,
        price: item.price,
        quantity: 1,
        image: item.image
      };

      const response = await cartService.addToCart(cartItem);

      if (response.ok) {
        showToast('Added to cart!', 'success');
        await handleRemoveFromWishlist(item._id);
      } else {
        showToast('Failed to add to cart', 'error');
      }
    } catch (error) {
      console.error('[Wishlist] Error:', error);
      showToast(error.message || 'Failed to add to cart', 'error');
    }
  };

  const handleBuyNow = async (item) => {
    await handleAddToCart(item);
    setTimeout(() => navigate('/checkout'), 500);
  };

  const showToast = (message, type = 'success') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  const getFilteredItems = () => {
    if (filter === 'all') return wishlistItems;
    return wishlistItems.filter(item => item.type === filter);
  };

  const filteredItems = getFilteredItems();

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 dark:bg-slate-950 py-12 transition-colors duration-300">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center">
            <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-slate-600 dark:text-slate-400">Loading your wishlist...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 py-12 transition-colors duration-300">
      <div className="max-w-6xl mx-auto px-4">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-slate-900 dark:text-white mb-2 transition-colors duration-300">My Wishlist</h1>
          <p className="text-slate-600 dark:text-slate-400 transition-colors duration-300">{filteredItems.length} item{filteredItems.length !== 1 ? 's' : ''} saved</p>
        </div>

        {error && (
          <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800/30 rounded-lg p-4 mb-6 transition-colors duration-300">
            <p className="text-red-700 dark:text-red-400">{error}</p>
          </div>
        )}

        {/* Filter Tabs */}
        <div className="mb-8 border-b border-slate-200 dark:border-slate-800 transition-colors duration-300">
          <div className="flex gap-4 overflow-x-auto">
            {['all', 'product', 'course'].map(filterOption => (
              <button
                key={filterOption}
                onClick={() => setFilter(filterOption)}
                className={`py-4 px-6 font-semibold whitespace-nowrap border-b-2 transition-colors duration-300 ${
                  filter === filterOption
                    ? 'border-blue-600 text-blue-600 dark:text-blue-400'
                    : 'border-transparent text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                {filterOption.charAt(0).toUpperCase() + filterOption.slice(1)}
              </button>
            ))}
          </div>
        </div>

        {filteredItems.length === 0 ? (
          <div className="bg-white dark:bg-slate-900 rounded-xl shadow-sm dark:shadow-none border border-slate-200 dark:border-slate-800 p-12 text-center transition-colors duration-300">
            <div className="text-6xl mb-4">💔</div>
            <p className="text-slate-600 dark:text-slate-300 mb-4 text-lg font-medium transition-colors duration-300">Your wishlist is empty</p>
            <p className="text-slate-500 dark:text-slate-400 mb-6 transition-colors duration-300">Start adding items you love!</p>
            <button
              onClick={() => navigate('/ecommerce')}
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-lg transition-colors duration-300 shadow-md"
            >
              Continue Shopping
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredItems.map(item => (
              <div key={item._id} className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-md dark:hover:shadow-lg transition-all duration-300 overflow-hidden flex flex-col group">
                {/* Item Image */}
                {item.image && (
                  <div className="w-full h-48 bg-slate-200 dark:bg-slate-800 overflow-hidden">
                    <img
                      src={normalizeImageUrl(item.image)}
                      alt={item.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                )}

                {/* Item Details */}
                <div className="p-6 flex flex-col flex-grow">
                  <div className="mb-4">
                    <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-2 line-clamp-2 group-hover:text-brandBlue transition-colors duration-300">
                      {item.name}
                    </h3>
                    {item.description && (
                      <p className="text-sm text-slate-600 dark:text-slate-400 line-clamp-2 transition-colors duration-300">{item.description}</p>
                    )}
                  </div>

                  {/* Price */}
                  <div className="mb-4">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-2xl font-bold text-slate-900 dark:text-white transition-colors duration-300">
                        ₦{item.price?.toLocaleString()}
                      </span>
                      {item.originalPrice && (
                        <span className="text-sm text-slate-500 dark:text-slate-500 line-through transition-colors duration-300">
                          ₦{item.originalPrice?.toLocaleString()}
                        </span>
                      )}
                    </div>

                    {/* Rating (if available) */}
                    {item.rating && (
                      <div className="flex items-center gap-1">
                        <span className="text-yellow-400">★</span>
                        <span className="text-sm text-slate-600 dark:text-slate-400 transition-colors duration-300">
                          {item.rating} ({item.reviews || 0} reviews)
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Item Type Badge */}
                  <div className="mb-6 mt-auto pt-4">
                    <span className="inline-block px-3 py-1 bg-blue-100 dark:bg-blue-500/20 text-blue-800 dark:text-blue-400 text-xs font-semibold rounded-full transition-colors duration-300">
                      {item.type === 'course' ? '📚 Course' : '🛍️ Product'}
                    </span>
                  </div>

                  {/* Actions */}
                  <div className="space-y-3">
                    <button
                      onClick={() => handleBuyNow(item)}
                      className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 rounded-lg transition-colors duration-300"
                    >
                      Buy Now
                    </button>
                    <button
                      onClick={() => handleAddToCart(item)}
                      className="w-full bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-900 dark:text-white font-bold py-2 rounded-lg transition-colors duration-300"
                    >
                      Add to Cart
                    </button>
                    <button
                      onClick={() => handleRemoveFromWishlist(item._id)}
                      className="w-full bg-red-50 dark:bg-red-500/10 hover:bg-red-100 dark:hover:bg-red-500/20 text-red-600 dark:text-red-400 font-bold py-2 rounded-lg transition-colors duration-300"
                    >
                      Remove from Wishlist
                    </button>
                  </div>

                  {/* View Details */}
                  <button
                    onClick={() => {
                      if (item.type === 'course') {
                      navigate(`/courses/${item._id}`);
                      } else {
                      navigate(`/products/${item._id}`);
                      }
                    }}
                    className="w-full mt-3 text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 font-semibold text-center py-2 transition-colors duration-300"
                  >
                    View Details →
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Wishlist Actions */}
        {filteredItems.length > 0 && (
          <div className="mt-12 bg-white dark:bg-slate-900 rounded-xl shadow-sm dark:shadow-none border border-slate-200 dark:border-slate-800 p-6 transition-colors duration-300">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div>
                <p className="font-semibold text-slate-900 dark:text-white transition-colors duration-300">
                  Total value: ₦{filteredItems.reduce((sum, item) => sum + item.price, 0).toLocaleString()}
                </p>
              </div>
              <div className="flex gap-3">
                <button
                  onClick={() => navigate('/ecommerce')}
                  className="bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-900 dark:text-white font-bold py-2 px-6 rounded-lg transition-colors duration-300"
                >
                  Continue Shopping
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {toast && <Toast message={toast.message} type={toast.type} />}
    </div>
  );
}
