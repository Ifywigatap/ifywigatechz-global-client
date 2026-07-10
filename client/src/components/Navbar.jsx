import React, { useState, useRef, useEffect, useCallback } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Menu, X, ShoppingCart } from "lucide-react";
import { navLinks } from "../data/navlink";
import NavItem from "./MegaMenu";
import ThemeToggle from "./ThemeToggle";
import { SALE_MODE } from "../data/pricingConfig";
import { useCart } from "../context/CartContext";

const SaleBanner = () => {
  const calculateTimeLeft = useCallback(() => {
    const difference = +new Date(SALE_MODE.endDate) - +new Date();
    if (difference <= 0) return null;

    return {
      d: Math.floor(difference / (1000 * 60 * 60 * 24)),
      h: Math.floor((difference / (1000 * 60 * 60)) % 24),
      m: Math.floor((difference / 1000 / 60) % 60),
      s: Math.floor((difference / 1000) % 60),
    };
  }, []);

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    if (!SALE_MODE.enabled) return;
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);
    return () => clearInterval(timer);
  }, [calculateTimeLeft]);

  if (!SALE_MODE.enabled || !timeLeft) return null;

  return ( // Added sticky, top-0, and z-[60]
    <div className="bg-brandGold text-black py-2 px-4 text-center overflow-hidden sticky top-0 z-[60] group">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-6 relative z-10">
        <p className="text-[11px] sm:text-xs font-black uppercase tracking-widest animate-pulse">
          {SALE_MODE.label}
        </p>
        <div className="flex items-center gap-3 font-mono text-sm font-bold bg-black/10 px-3 py-0.5 rounded-full">
          <span>{timeLeft.d}d</span>
          <span className="opacity-30">:</span>
          <span>{timeLeft.h}h</span>
          <span className="opacity-30">:</span>
          <span>{timeLeft.m}m</span>
          <span className="opacity-30">:</span>
          <span className="text-blue-700">{timeLeft.s}s</span>
        </div>
      </div>
      <div className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 pointer-events-none" />
    </div>
  );
};

function Navbar({ open, setOpen }) {
  const [activeMenu, setActiveMenu] = useState(null);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const timeoutRef = useRef();
  const location = useLocation();
  const searchInputRef = useRef(null);
  const { cartCount } = useCart();

  // Close menus on route change
  useEffect(() => {
    setActiveMenu(null);
    setOpen(false);
  }, [location.pathname, setOpen]);

  // ESC key support
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape") {
        setActiveMenu(null);
        setIsSearchOpen(false);
        setOpen(false);
      }
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [setOpen]);

  // Focus search input when opened
  useEffect(() => {
    if (isSearchOpen && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [isSearchOpen]);

  // Close active mega menu on scroll
  useEffect(() => {
    if (!activeMenu) return;

    const handleScroll = () => {
      setActiveMenu(null);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [activeMenu]);

  // Smooth hover menu control
  const openMenu = useCallback((menu) => {
    clearTimeout(timeoutRef.current);
    setActiveMenu(menu.toLowerCase());
  }, []);

  const closeMenu = useCallback(() => {
    timeoutRef.current = setTimeout(() => {
      setActiveMenu(null);
    }, 150);
  }, []);

  const toggleMobileMenu = useCallback(() => {
    setOpen((prev) => !prev);
  }, [setOpen]);

  const toggleSearch = useCallback(() => {
    setIsSearchOpen((prev) => {
      const isOpening = !prev;
      if (isOpening) {
      setTimeout(() => {
        searchInputRef.current?.focus();
      }, 100);
    }
      return isOpening;
    });
  }, []);

  return (
    <>
      <header className="sticky top-0 z-50 bg-white dark:bg-slate-900 dark:bg-gradient-to-r dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 text-slate-800 dark:text-white shadow-lg transition-colors duration-300">
        {/* Sale Countdown Banner */}
        <SaleBanner />

        {/* Top Bar - subtle info strip */}
        <div className="hidden lg:block bg-slate-100 dark:bg-slate-950/50 text-xs py-1.5 transition-colors duration-300">
          <div className="max-w-7xl mx-auto px-4 flex items-center justify-between">
            <div className="flex items-center gap-4 text-slate-500 dark:text-slate-400">
              <span className="flex items-center gap-1.5">
                <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                Available 24/7
              </span>
              <span className="flex items-center gap-1.5">
                📞 +234 811 372 2088
              </span>
              <span className="flex items-center gap-1.5">
                ✉️ info@ifywigatechz.com
              </span>
            </div>
            <div className="flex items-center gap-4 text-slate-500 dark:text-slate-400">
              <a href="/login" className="hover:text-slate-900 dark:hover:text-white transition-colors">Login</a>
              <a href="/register" className="hover:text-slate-900 dark:hover:text-white transition-colors">Register</a>
            </div>
          </div>
        </div>

        {/* Main Navigation */}
        <div className="relative max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between h-16 md:h-18">
            
            {/* Logo Section */}
            <NavLink to="/" className="flex items-center gap-2 group">
              <div className="relative">
                <img
                  src="/Ifyglobal.png"
                  alt="IFYWIGATECHZ"
                  className="h-10 w-10 rounded-full border-2 border-blue-500/30 group-hover:border-blue-500 transition-colors"
                />
                <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-blue-500 rounded-full border-2 border-white dark:border-slate-900"></div>
              </div>
              <div className="hidden sm:block">
                <span className="font-bold text-lg tracking-tight bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                  IFYWIGATECHZ
                </span>
                <p className="text-[10px] text-slate-500 dark:text-slate-400 -mt-0.5 tracking-wider">
                  GLOBAL SERVICES
                </p>
              </div>
            </NavLink>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-1">
              {navLinks.map((item, i) =>
                item.mega ? (
                  <NavItem
                    key={i}
                    label={item.name}
                    data={item.mega}
                    name={item.name}
                    openMenu={openMenu}
                    closeMenu={closeMenu}
                    activeMenu={activeMenu}
                  />
                ) : (
                  <NavLink
                    key={i}
                    to={item.path}
                    className={({ isActive }) =>
                      `px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                        isActive
                          ? "text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-500/10"
                          : "text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/5"
                      }`
                    }
                  >
                    {item.name}
                  </NavLink>
                )
              )}
            </nav>

            {/* Right Side Actions */}
            <div className="flex items-center gap-2 md:gap-4">
              {/* Search */}
              <div className="relative">
                <AnimatePresence mode="wait">
                  {isSearchOpen ? (
                    <motion.div
                      initial={{ width: 0, opacity: 0 }}
                      animate={{ width: 200, opacity: 1 }}
                      exit={{ width: 0, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="flex items-center"
                    >
                      <input
                        ref={searchInputRef}
                        type="text"
                        placeholder="Search..."
                        className="w-full bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-600 rounded-lg px-3 py-1.5 text-sm text-slate-900 dark:text-white placeholder-slate-500 dark:placeholder-slate-400 focus:outline-none focus:border-blue-500"
                        onBlur={(e) => {
                          if (!e.currentTarget.contains(e.relatedTarget)) { setIsSearchOpen(false); }}}
                      />
                    </motion.div>
                  ) : (
                    <motion.button
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      exit={{ scale: 0.8, opacity: 0 }}
                      onClick={toggleSearch}
                      className="p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-white/10 transition-colors"
                      aria-label="Search"
                    >
                      <Search size={18} />
                    </motion.button>
                  )}
                </AnimatePresence>
              </div>

              {/* Theme Toggle */}
              <ThemeToggle />

              {/* Cart Icon */}
              <NavLink
                to="/cart"
                className="relative p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-white/10 transition-colors"
                aria-label={`View cart with ${cartCount} items`}
              >
                <ShoppingCart size={18} />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-white text-[10px] font-bold ring-2 ring-white dark:ring-slate-900">
                    {cartCount}
                  </span>
                )}
              </NavLink>

              {/* WhatsApp CTA */}
              <a
                href="https://wa.me/2348113722088"
                target="_blank"
                rel="noopener noreferrer"
                className="hidden sm:flex items-center gap-2 bg-gradient-to-r from-green-500 to-green-600 px-4 py-2 rounded-full text-sm font-medium hover:from-green-400 hover:to-green-500 transition-all duration-200 shadow-lg hover:shadow-green-500/25"
              >
                <svg viewBox="0 0 24 24" className="w-4 h-4" fill="currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
                Chat
              </a>

              {/* Mobile Menu Toggle */}
              <button
                onClick={toggleMobileMenu}
                className="md:hidden p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-white/10 transition-colors"
                aria-label={open ? "Close menu" : "Open menu"}
              >
                {open ? <X size={22} /> : <Menu size={22} />}
              </button>
            </div>
          </div>
        </div>
      </header>
    </>
  );
}

export default Navbar;
