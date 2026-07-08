import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { XCircle, ShoppingCart, RefreshCcw } from 'lucide-react';

export default function PaymentFailed() {
  const location = useLocation();
  const message = location.state?.message || "Your payment could not be processed. Please try again or use a different payment method.";

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex flex-col items-center justify-center p-4 text-center transition-colors duration-300">
      <div className="bg-white dark:bg-slate-900 p-8 rounded-3xl shadow-xl dark:shadow-2xl max-w-md w-full border border-slate-200 dark:border-slate-800 transition-colors duration-300">
        <div className="w-20 h-20 bg-red-50 dark:bg-red-500/20 text-red-600 dark:text-red-400 rounded-full flex items-center justify-center mx-auto mb-6 shadow-inner transition-colors duration-300">
          <XCircle size={36} strokeWidth={2.5} />
        </div>
        <h1 className="text-2xl font-bold text-slate-900 dark:text-white mb-4 transition-colors duration-300">Payment Failed</h1>
        <p className="text-slate-600 dark:text-slate-400 mb-8 text-sm leading-relaxed transition-colors duration-300">{message}</p>
        
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link 
            to="/checkout"
            className="flex items-center justify-center gap-2 px-6 py-3 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-semibold rounded-xl hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors duration-200"
          >
            <RefreshCcw size={18} /> Try Again
          </Link>
          <Link 
            to="/ecommerce"
            className="flex items-center justify-center gap-2 px-6 py-3 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 transition-colors duration-200 shadow-md shadow-blue-200 dark:shadow-none"
          >
            <ShoppingCart size={18} /> Continue Shopping
          </Link>
        </div>
      </div>
    </div>
  );
}