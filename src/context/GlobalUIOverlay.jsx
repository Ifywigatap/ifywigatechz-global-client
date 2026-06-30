import React from 'react';
import { useUI } from '../../context/UIContext';
import { Loader2, AlertCircle, X } from 'lucide-react';

const GlobalUIOverlay = () => {
  const { loading, error, clearError } = useUI();

  if (!loading && !error) return null;

  return (
    <>
      {/* Loading Overlay */}
      {loading && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-slate-900/40 backdrop-blur-[2px] transition-all">
          <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-2xl flex flex-col items-center gap-4 border border-slate-200 dark:border-slate-700">
            <Loader2 className="w-10 h-10 text-brandBlue animate-spin" />
            <p className="text-slate-600 dark:text-slate-300 font-bold tracking-tight">Loading...</p>
          </div>
        </div>
      )}

      {/* Global Error Modal */}
      {error && (
        <div className="fixed inset-0 z-[10000] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-300">
          <div className="bg-white dark:bg-slate-900 w-full max-w-md rounded-2xl shadow-2xl overflow-hidden border border-red-100 dark:border-red-900/30">
            <div className="p-8">
              <div className="flex items-center gap-4 text-red-600 mb-6">
                <div className="p-3 bg-red-100 dark:bg-red-900/20 rounded-full">
                  <AlertCircle className="w-8 h-8" />
                </div>
                <div>
                  <h3 className="text-xl font-black uppercase tracking-tight">Error</h3>
                  <p className="text-xs text-red-400 font-bold">API_REQUEST_FAILED</p>
                </div>
              </div>
              
              <p className="text-slate-600 dark:text-slate-300 mb-8 leading-relaxed font-medium">
                {error}
              </p>

              <button
                onClick={clearError}
                className="w-full py-4 bg-red-600 hover:bg-red-700 text-white font-black rounded-xl transition-all shadow-lg shadow-red-600/20 flex items-center justify-center gap-2"
              >
                <X className="w-5 h-5" />
                Dismiss Error
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default GlobalUIOverlay;