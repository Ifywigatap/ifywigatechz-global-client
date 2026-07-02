import { useCart } from "../context/CartContext";
import { Helmet } from "react-helmet-async";
import { Link, useNavigate } from "react-router-dom";
import { Trash2, ShoppingCart, ArrowLeft } from "lucide-react";
import PageWrapper from "../components/PageWrapper";
import { optimizeImage } from "../utils/cloudinary";

export default function Cart() {
  const navigate = useNavigate();
  const {
    cart,
    removeFromCart,
    increaseQty,
    decreaseQty,
    cartTotal,
    clearCart,
    cartCount,
  } = useCart();

  if (cart.length === 0) {
    return (
      <PageWrapper>
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-950 transition-colors duration-300">
          <Helmet>
            <title>Cart | IFYWIGATECHZ</title>
          </Helmet>
          <div className="text-center">
            <ShoppingCart className="w-16 h-16 mx-auto text-gray-300 dark:text-gray-600 mb-4" />
            <h2 className="text-3xl font-bold text-gray-800 dark:text-gray-100">Your cart is empty</h2>
            <p className="text-gray-500 dark:text-gray-400 mt-2 text-lg">
              Add some products to get started
            </p>
            <Link
to="/ecommerce"
              className="mt-6 inline-flex items-center gap-2 px-6 py-3 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors font-semibold"
            >
              <ShoppingCart size={20} />
              Start Shopping
            </Link>
          </div>
        </div>
      </PageWrapper>
    );
  }

  return (
    <PageWrapper>
      <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-950 transition-colors duration-300">
        <Helmet>
          <title>Cart | IFYWIGATECHZ</title>
        </Helmet>

        {/* HEADER */}
        <section className="py-10 text-center border-b border-gray-200 dark:border-gray-800 bg-white dark:bg-slate-900 transition-colors duration-300">
          <div className="max-w-7xl mx-auto px-4">
            <Link to="/" className="inline-flex items-center gap-2 text-orange-500 hover:text-orange-600 mb-4 font-semibold">
              <ArrowLeft size={18} />
              Back to Shop
            </Link>
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white">Shopping Cart</h1>
            <p className="text-gray-500 dark:text-gray-400 mt-2">
              {cartCount} {cartCount === 1 ? 'item' : 'items'} • Review your items before checkout
            </p>
          </div>
        </section>

        {/* CONTENT */}
        <section className="max-w-7xl mx-auto px-4 py-8 pb-16 grid grid-cols-1 lg:grid-cols-3 gap-8">

          {/* CART ITEMS */}
          <div className="lg:col-span-2 space-y-4">
            {cart.map((item) => (
              <div
                key={item.id}
                className="flex gap-4 p-5 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow border border-gray-100"
              >
                {/* IMAGE */}
                <div className="flex-shrink-0">
                  <img
                    src={optimizeImage(item.image, { width: 300, height: 300 })}
                    alt={item.name}
                    className="w-28 h-28 object-cover rounded-lg bg-gray-100"
                  />
                </div>

                {/* DETAILS */}
                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="font-semibold text-base md:text-lg line-clamp-2 text-gray-900">
                      {item.name}
                    </h3>
                    {item.description && (
                      <p className="text-sm text-gray-500 mt-1 line-clamp-1">
                        {item.description}
                      </p>
                    )}
                    <p className="text-orange-600 font-bold text-lg mt-2">
                      ₦{(item.price * item.qty).toLocaleString()}
                    </p>
                    <p className="text-sm text-gray-500">
                      ₦{item.price.toLocaleString()} each
                    </p>
                  </div>

                  {/* QTY CONTROLS */}
                  <div className="flex items-center gap-3 mt-3">
                    <span className="text-sm text-gray-600 font-medium">Qty:</span>
                    <div className="flex items-center gap-1 bg-gray-100 rounded-lg p-1">
                      <button
                        onClick={() => decreaseQty(item.id)}
                        className="px-3 py-1 text-gray-600 hover:bg-gray-200 rounded transition-colors font-bold"
                        aria-label="Decrease quantity"
                      >
                        −
                      </button>

                      <span className="px-4 py-1 font-semibold text-gray-900 text-center w-12">
                        {item.qty}
                      </span>

                      <button
                        onClick={() => increaseQty(item.id)}
                        className="px-3 py-1 text-gray-600 hover:bg-gray-200 rounded transition-colors font-bold"
                        aria-label="Increase quantity"
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>

                {/* REMOVE */}
                <button
                  onClick={() => removeFromCart(item.id)}
                  className="text-red-400 hover:text-red-600 hover:bg-red-50 p-2 rounded-lg transition-colors"
                  aria-label="Remove from cart"
                >
                  <Trash2 size={20} />
                </button>
              </div>
            ))}
          </div>

          {/* SUMMARY SIDEBAR */}
          <div className="lg:col-span-1">
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 h-fit sticky top-4">
              <h2 className="text-xl font-bold mb-6 text-gray-900">Order Summary</h2>

              <div className="space-y-3 mb-4 pb-4 border-b border-gray-200">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal</span>
                  <span className="font-semibold">₦{cartTotal.toLocaleString()}</span>
                </div>

                <div className="flex justify-between text-gray-600">
                  <span>Items ({cartCount})</span>
                  <span className="font-semibold">{cartCount}</span>
                </div>

                <div className="flex justify-between text-gray-600">
                  <span>Shipping</span>
                  <span className="font-semibold text-sm">Calculated at checkout</span>
                </div>
              </div>

              <div className="mb-6 pt-4 border-t border-gray-200 dark:border-gray-700">
                <div className="flex justify-between items-center">
                  <span className="text-lg font-bold text-gray-900 dark:text-white">Total</span>
                  <span className="text-2xl font-bold text-orange-600 dark:text-orange-500">
                    ₦{cartTotal.toLocaleString()}
                  </span>
                </div>
              </div>


              <Link 
                to="/learn" 
                className="block w-full mb-3 px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white text-center rounded-lg shadow-md hover:scale-[1.02] transition-all font-bold"
              >
                Join Academy
              </Link>

              <button
                type="button"
                onClick={() => navigate('/checkout')}
                className="block w-full bg-gradient-to-r from-orange-500 to-orange-600 text-white py-3 rounded-lg hover:shadow-md transition-all text-center font-bold mb-3"
              >
                Proceed to Checkout
              </button>

              <button
                onClick={clearCart}
                className="w-full py-2 text-sm border border-red-200 text-red-600 hover:bg-red-50 rounded-lg transition-colors font-medium"
              >
                Clear Cart
              </button>

              <p className="text-xs text-gray-400 mt-4 text-center">
                Secure checkout powered by Paystack
              </p>
            </div>
          </div>
        </section>
      </div>
    </PageWrapper>
  );
}
