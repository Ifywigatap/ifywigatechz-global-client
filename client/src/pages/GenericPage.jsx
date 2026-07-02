import React from 'react';
import { useParams } from 'react-router-dom';

/**
 * GenericPage Component
 * A reusable page component for all 20 new premium navbar pages.
 * Reads the slug from URL and displays the page title dynamically.
 */
export default function GenericPage() {
  const { slug } = useParams();
  
  // Format the slug into a readable title
  const formatTitle = (slug) => {
    if (!slug) return 'Page';
    return slug
      .split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };
  
  const pageTitle = formatTitle(slug);
  
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 transition-colors duration-300">
      {/* Hero Section */}
      <section className="relative py-20 md:py-28 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 via-indigo-600/20 to-purple-600/20"></div>
        <div className="absolute inset-0 opacity-30" style={{
          backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(255,255,255,0.15) 1px, transparent 0)',
          backgroundSize: '32px 32px'
        }}></div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <span className="inline-block px-4 py-1.5 rounded-full text-sm font-medium bg-blue-500/20 text-blue-400 mb-6">
              New
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 dark:text-white mb-6">
              {pageTitle}
            </h1>
            <p className="max-w-2xl mx-auto text-xl text-slate-600 dark:text-slate-300">
              Welcome to the {pageTitle} page. This is a premium section of IFYWIGATECHZ.
            </p>
          </div>
        </div>
      </section>
      
      {/* Content Section */}
      <section className="py-16 bg-white/50 dark:bg-slate-800/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-700/50 p-8 md:p-12 shadow-sm dark:shadow-none">
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">About This Page</h2>
                <p className="text-slate-600 dark:text-slate-300 mb-6">
                  This page is part of our premium navigation experience. 
                  Explore our services and discover how we can help transform your business.
                </p>
                <a 
                  href="/contact" 
                  className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white px-6 py-3 rounded-lg font-medium transition-colors"
                >
                  Contact Us
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </a>
              </div>
              <div>
                <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">Quick Links</h2>
                <ul className="space-y-3">
                  <li>
                    <a href="/services" className="text-blue-400 hover:text-blue-300 transition-colors flex items-center gap-2">
                      <span className="w-1.5 h-1.5 bg-blue-500 rounded-full"></span>
                      View All Services
                    </a>
                  </li>
                  <li>
                    <a href="/pricing" className="text-blue-400 hover:text-blue-300 transition-colors flex items-center gap-2">
                      <span className="w-1.5 h-1.5 bg-blue-500 rounded-full"></span>
                      Pricing Plans
                    </a>
                  </li>
                  <li>
                    <a href="/blog" className="text-blue-400 hover:text-blue-300 transition-colors flex items-center gap-2">
                      <span className="w-1.5 h-1.5 bg-blue-500 rounded-full"></span>
                      Read Our Blog
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
