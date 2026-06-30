import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import { Home, ArrowLeft, Search } from "lucide-react";

export default function NotFound() {
  const suggestions = [
    { label: "Homepage", path: "/", icon: <Home size={18} /> },
    { label: "Services", path: "/services", icon: null },
    { label: "Academy", path: "/learn", icon: null },
    { label: "Pricing", path: "/pricing", icon: null },
    { label: "Contact", path: "/contact", icon: null },
  ];

  return (
    <section className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-blue-950 flex items-center justify-center px-4 py-20">
      <Helmet>
        <title>Page Not Found | IFYWIGATECHZ</title>
        <meta name="description" content="The page you are looking for does not exist. Browse our services, academy, or contact us." />
      </Helmet>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-2xl w-full text-center"
      >
        {/* Animated 404 */}
        <div className="relative mb-8">
          <motion.h1
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 200, damping: 15 }}
            className="text-[8rem] sm:text-[10rem] font-black leading-none bg-gradient-to-r from-brandBlue via-brandGold to-brandBlue bg-clip-text text-transparent select-none"
          >
            404
          </motion.h1>
          <div className="absolute inset-0 bg-brandBlue/10 blur-3xl rounded-full -z-10" />
        </div>

        <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">
          Page Not Found
        </h2>
        <p className="text-neutral-400 text-lg mb-8 max-w-md mx-auto">
          The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
        </p>

        {/* Search suggestion */}
        <div className="flex items-center justify-center gap-2 mb-10">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-500" size={18} />
            <input
              type="text"
              placeholder="Search our site..."
              className="pl-10 pr-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-neutral-500 focus:ring-2 focus:ring-brandBlue outline-none w-64 sm:w-80"
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  window.location.href = `/search?q=${encodeURIComponent(e.target.value)}`;
                }
              }}
            />
          </div>
        </div>

        {/* Quick links */}
        <div className="flex flex-wrap justify-center gap-3 mb-10">
          {suggestions.map((item, i) => (
            <Link
              key={i}
              to={item.path}
              className="flex items-center gap-2 px-5 py-3 rounded-xl bg-white/5 border border-white/10 text-neutral-300 hover:bg-brandBlue/20 hover:border-brandBlue/40 hover:text-white transition-all duration-300"
            >
              {item.icon}
              <span>{item.label}</span>
            </Link>
          ))}
        </div>

        {/* Back button */}
        <button
          onClick={() => window.history.back()}
          className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-brandGold to-yellow-500 text-black font-bold rounded-xl shadow-lg hover:shadow-brandGold/25 hover:scale-105 transition-all duration-300"
        >
          <ArrowLeft size={18} />
          Go Back
        </button>
      </motion.div>
    </section>
  );
}

