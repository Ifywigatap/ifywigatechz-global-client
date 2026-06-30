import { motion, AnimatePresence } from "framer-motion";
import { useCart } from "../context/CartContext";
import { X, Trash2, Minus, Plus } from "lucide-react";
import { Link } from "react-router-dom";

const normalizeImageUrl = (src) => {
  if (!src || typeof src !== "string") return "/images/placeholder.jpg";
  if (src.startsWith("http://") || src.startsWith("https://")) return src;
  const path = src.startsWith("/") ? src : `/${src}`;
  return encodeURI(path);
};

const formatPrice = (value) => `₦${Number(value || 0).toLocaleString("en-NG")}`;

export default function CartDrawer({ isOpen, onClose }) {
  const { cart, cartCount, cartTotal, increaseQty, decreaseQty, removeFromCart } = useCart();

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            aria-hidden="true"
            className="fixed inset-0 bg-black/40 z-40"
          />

          <motion.aside
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", stiffness: 260, damping: 25 }}
            className="fixed right-0 top-0 h-full w-full sm:w-[420px] bg-white dark:bg-slate-900 z-50 shadow-2xl flex flex-col transition-colors duration-300"
          >
            <header className="flex items-center justify-between gap-4 p-5 border-b border-gray-200 dark:border-slate-800 transition-colors duration-300">
              <div>
                <h2 className="text-lg font-semibold text-gray-900 dark:text-white transition-colors duration-300">Your cart</h2>
                <p className="text-sm text-gray-500 dark:text-slate-400 mt-1 transition-colors duration-300">
                  {cartCount} {cartCount === 1 ? "item" : "items"}
                </p>
              </div>

              <button
                type="button"
                onClick={onClose}
                aria-label="Close cart drawer"
                className="p-2 rounded-full text-gray-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors duration-300"
              >
                <X size={20} />
              </button>
            </header>

            <section className="flex-1 overflow-y-auto p-5 space-y-4">
              {cart.length === 0 ? (
                <div className="mt-12 text-center">
                  <p className="text-base font-medium text-gray-900 dark:text-white transition-colors duration-300">Your cart is empty</p>
                  <p className="mt-2 text-sm text-gray-500 dark:text-slate-400 transition-colors duration-300">Add products to review them here before checkout.</p>
                  <Link
to="/ecommerce"
                    onClick={onClose}
                    className="inline-flex items-center justify-center mt-4 rounded-full px-4 py-2 text-sm font-semibold text-orange-600 dark:text-orange-400 border border-orange-200 dark:border-orange-500/30 hover:bg-orange-50 dark:hover:bg-orange-500/10 transition-colors duration-300"
                  >
                    Start shopping
                  </Link>
                </div>
              ) : (
                cart.map((item) => (
                  <article key={item.id} className="flex gap-4 border-b border-gray-200 dark:border-slate-800 pb-4 transition-colors duration-300">
                    <img
                      src={normalizeImageUrl(item.image)}
                      alt={item.name}
                      className="h-20 w-20 min-w-[80px] rounded-xl object-cover"
                    />

                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-3">
                        <div className="min-w-0">
                          <p className="text-sm font-semibold text-gray-900 dark:text-white line-clamp-2 transition-colors duration-300">{item.name}</p>
                          <p className="text-sm text-gray-500 dark:text-slate-400 mt-1 transition-colors duration-300">{formatPrice(item.price)} each</p>
                        </div>

                        <button
                          type="button"
                          onClick={() => removeFromCart(item.id)}
                          aria-label={`Remove ${item.name} from cart`}
                          className="text-red-500 dark:text-red-400 hover:text-red-600 dark:hover:text-red-300 transition-colors duration-300"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>

                      <div className="mt-4 flex flex-wrap items-center gap-2">
                        <div className="inline-flex items-center rounded-full border border-gray-200 dark:border-slate-700 overflow-hidden transition-colors duration-300">
                          <button
                            type="button"
                            onClick={() => decreaseQty(item.id)}
                            aria-label={`Decrease quantity of ${item.name}`}
                            className="h-9 w-9 flex items-center justify-center text-gray-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors duration-300"
                          >
                            <Minus size={16} />
                          </button>

                          <span className="h-9 w-12 flex items-center justify-center text-sm font-semibold text-gray-900 dark:text-white transition-colors duration-300">
                            {item.qty}
                          </span>

                          <button
                            type="button"
                            onClick={() => increaseQty(item.id)}
                            aria-label={`Increase quantity of ${item.name}`}
                            className="h-9 w-9 flex items-center justify-center text-gray-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors duration-300"
                          >
                            <Plus size={16} />
                          </button>
                        </div>

                        <p className="ml-auto text-sm font-semibold text-gray-900 dark:text-white transition-colors duration-300">
                          {formatPrice(item.price * item.qty)}
                        </p>
                      </div>
                    </div>
                  </article>
                ))
              )}
            </section>

            {cart.length > 0 && (
              <footer className="p-5 border-t border-gray-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50 transition-colors duration-300">
                <div className="flex items-center justify-between text-sm text-gray-600 dark:text-slate-400 transition-colors duration-300">
                  <span>Subtotal</span>
                  <span className="font-semibold text-gray-900 dark:text-white transition-colors duration-300">{formatPrice(cartTotal)}</span>
                </div>

                <Link
                  to="/checkout"
                  onClick={onClose}
                  className="mt-4 inline-flex w-full items-center justify-center rounded-2xl bg-gradient-to-r from-orange-500 to-orange-600 px-4 py-3 text-sm font-semibold text-white shadow-lg shadow-orange-200/40 transition hover:brightness-105"
                >
                  Proceed to checkout
                </Link>
              </footer>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
