import React, { useState, useEffect, useCallback } from "react";
import { NavLink } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  X, MessageCircle, Home, Tag, LayoutDashboard, Briefcase, GraduationCap, Building2, Library, Scale, Link as LinkIcon,
  User, Shield, Heart, History, ShoppingCart, CreditCard, CheckCircle, Search, Settings, Download,
  Folder, FileText, ShoppingBag, Code, PenTool, Rocket, Smartphone, Factory, FileSignature,
  BookOpen, UserPlus, Brain, ShieldCheck, Monitor, Palette, Users, BadgeCheck, Stethoscope, Calendar,
  Info, Image, Award, MessageSquare, PhoneCall, Gift, HelpCircle, LifeBuoy, Share2, RefreshCcw, CheckSquare
} from "lucide-react";
import Dropdown from "../components/Dropdown";

// Animation Variants for a native, fluid feel
const overlayVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.3 } },
};

const drawerVariants = {
  hidden: { x: "100%" },
  visible: {
    x: 0,
    transition: {
      type: "spring",
      damping: 25,
      stiffness: 200,
      staggerChildren: 0.05, // Cascading effect for nav items
      delayChildren: 0.1,
    },
  },
  exit: { x: "100%", transition: { ease: "easeInOut", duration: 0.3 } },
};

const itemVariants = {
  hidden: { opacity: 0, x: 20 },
  visible: { 
    opacity: 1, 
    x: 0,
    transition: { type: "spring", stiffness: 300, damping: 24 }
  },
};

function MobileMenu({ open, setOpen }) {
  const [openDropdown, setOpenDropdown] = useState(null);

  const toggleDropdown = useCallback((menu) => {
    setOpenDropdown((prev) => (prev === menu ? null : menu));
  }, []);

  // ✅ Lock scroll when menu is open & cleanup on unmount to prevent bugs
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <div className="md:hidden">
      <AnimatePresence>
        {open && (
          <motion.div
            initial="hidden"
            animate="visible"
            exit="hidden"
            className="fixed inset-0 z-[999]"
            role="dialog"
            aria-modal="true"
          >
            {/* OVERLAY */}
            <motion.div
              variants={overlayVariants}
              className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
              onClick={() => setOpen(false)}
              aria-hidden="true"
            />

            {/* DRAWER */}
            <motion.div
              variants={drawerVariants}
              className="absolute right-0 top-0 h-[100dvh] w-full flex flex-col 
              bg-white dark:bg-slate-950/95 backdrop-blur-2xl 
              shadow-2xl transition-colors duration-300"
            >
              {/* HEADER */}
              <div className="flex items-center justify-between p-5 border-b border-slate-200 dark:border-white/10 shrink-0 transition-colors duration-300">
                <div>
                  <h1 className="font-extrabold text-lg tracking-wide bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-500 dark:from-blue-400 dark:to-indigo-300">
                    IFYWIGATECHZ
                  </h1>
                  <p className="text-xs text-slate-500 dark:text-blue-200/70 font-medium">Global Services</p>
                </div>

                <button
                  onClick={() => setOpen(false)}
                  className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-white/10 transition-colors text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white active:scale-95"
                  aria-label="Close menu"
                >
                  <X size={20} />
                </button>
              </div>

              {/* NAV ITEMS */}
              <nav className="flex flex-col gap-1.5 px-4 py-6 text-sm font-medium flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-slate-200 dark:scrollbar-thumb-white/10 scroll-smooth transition-colors duration-300">
                
                <motion.div variants={itemVariants}>
                  <NavLink
                    to="/"
                    onClick={() => setOpen(false)}
                    className={({ isActive }) =>
                      `flex items-center gap-3 px-4 py-3.5 rounded-xl transition-all duration-300 ${
                        isActive
                          ? "bg-blue-50 dark:bg-blue-600/10 text-blue-600 dark:text-blue-400 border border-blue-100 dark:border-blue-500/20 shadow-sm"
                          : "text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-white/5 hover:text-slate-900 dark:hover:text-white"
                      }`
                    }
                  >
                    <Home size={18} />
                    Home
                  </NavLink>
                </motion.div>

                <motion.div variants={itemVariants}>
                  <Dropdown
                    title={
                      <span className="flex items-center gap-3">
                        <LayoutDashboard size={18} />
                        Dashboard
                      </span>
                    }
                    isOpen={openDropdown === "dashboard"}
                    onToggle={() => toggleDropdown("dashboard")}
                    onLinkClick={() => setOpen(false)}
                    items={[
                      { name: "User Dashboard", path: "/dashboard", icon: <User size={16} /> },
                      { name: "My Downloads", path: "/account/downloads", icon: <Download size={16} /> },
                      { name: "Admin Dashboard", path: "/admin-dashboard", icon: <Shield size={16} /> },
                      { name: "Wishlist", path: "/wishlist", icon: <Heart size={16} /> },
                      { name: "Order History", path: "/order-history", icon: <History size={16} /> },
                      { name: "Cart", path: "/cart", icon: <ShoppingCart size={16} /> },
                      { name: "Checkout", path: "/checkout", icon: <CreditCard size={16} /> },
                      { name: "Payment Success", path: "/payment-success", icon: <CheckCircle size={16} /> },
                      { name: "Search", path: "/search", icon: <Search size={16} /> },
                      { name: "Account Settings", path: "/account-settings", icon: <Settings size={16} /> },
                    ]}
                  />
                </motion.div>

                <motion.div variants={itemVariants}>
                  <Dropdown
                    title={
                      <span className="flex items-center gap-3">
                        <Briefcase size={18} />
                        Services
                      </span>
                    }
                    isOpen={openDropdown === "services"}
                    onToggle={() => toggleDropdown("services")}
                    onLinkClick={() => setOpen(false)}
                    items={[
                      { name: "All Services", path: "/services", icon: <Briefcase size={16} /> },
                      { name: "Projects", path: "/projects", icon: <Folder size={16} /> },
                      { name: "Case Studies", path: "/case-studies", icon: <FileText size={16} /> },
                      { name: "Real Estate", path: "/real-estate", icon: <Home size={16} /> },
                      { name: "E-commerce Store", path: "/ecommerce", icon: <ShoppingBag size={16} /> },
                      { name: "Web Development", path: "/web-dev", icon: <Code size={16} /> },
                      { name: "UI / UX Design", path: "/ui-ux", icon: <PenTool size={16} /> },
                      { name: "Start a Project", path: "/start-project", icon: <Rocket size={16} /> },
                      { name: "Mobile App Development", path: "/mobile-app", icon: <Smartphone size={16} /> },
                      { name: "Industries", path: "/industries", icon: <Factory size={16} /> },
                      { name: "Request a Quote", path: "/requestquote", icon: <FileSignature size={16} /> },
                    ]}
                  />
                </motion.div>

                <motion.div variants={itemVariants}>
                  <NavLink
                    to="/pricing"
                    onClick={() => setOpen(false)}
                    className={({ isActive }) =>
                      `flex items-center gap-3 px-4 py-3.5 rounded-xl transition-all duration-300 ${
                        isActive
                          ? "bg-blue-50 dark:bg-blue-600/10 text-blue-600 dark:text-blue-400 border border-blue-100 dark:border-blue-500/20 shadow-sm"
                          : "text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-white/5 hover:text-slate-900 dark:hover:text-white"
                      }`
                    }
                  >
                    <Tag size={18} />
                    Pricing
                  </NavLink>
                </motion.div>

                <motion.div variants={itemVariants}>
                  <Dropdown
                    title={
                      <span className="flex items-center gap-3">
                        <GraduationCap size={18} />
                        Learn
                      </span>
                    }
                    isOpen={openDropdown === "learn"}
                    onToggle={() => toggleDropdown("learn")}
                    onLinkClick={() => setOpen(false)}
                    items={[
                      { name: "Academy", path: "/learn", icon: <GraduationCap size={16} /> },
                      { name: "Blog", path: "/blog", icon: <BookOpen size={16} /> },
                      { name: "Enroll", path: "/enroll", icon: <UserPlus size={16} /> },
                      { name: "AI & Machine Learning", path: "/ai", icon: <Brain size={16} /> },
                      { name: "Cybersecurity", path: "/cybersecurity", icon: <ShieldCheck size={16} /> },
                      { name: "IT Training", path: "/it", icon: <Monitor size={16} /> },
                      { name: "Graphic Design", path: "/graphic", icon: <Palette size={16} /> },
                      { name: "Web3 & Blockchain", path: "/web3", icon: <LinkIcon size={16} /> },
                      { name: "Corporate Training", path: "/corporate-training", icon: <Users size={16} /> },
                      { name: "Microsoft Certifications", path: "/microsoft", icon: <BadgeCheck size={16} /> },
                      { name: "PPMVS Training", path: "/ppmvs", icon: <Stethoscope size={16} /> },
                      { name: "Events & Webinars", path: "/events", icon: <Calendar size={16} /> },
                    ]}
                  />
                </motion.div>

                <motion.div variants={itemVariants}>
                  <Dropdown
                    title={
                      <span className="flex items-center gap-3">
                        <Building2 size={18} />
                        Company
                      </span>
                    }
                    isOpen={openDropdown === "company"}
                    onToggle={() => toggleDropdown("company")}
                    onLinkClick={() => setOpen(false)}
                    items={[
                      { name: "About Us", path: "/about", icon: <Info size={16} /> },
                      { name: "Our Team", path: "/team", icon: <Users size={16} /> },
                      { name: "Careers", path: "/careers", icon: <Briefcase size={16} /> },
                      { name: "Gallery", path: "/gallery", icon: <Image size={16} /> },
                      { name: "Success Stories", path: "/success-stories", icon: <Award size={16} /> },
                      { name: "Testimonials", path: "/testimonials", icon: <MessageSquare size={16} /> },
                      { name: "Contact", path: "/contact", icon: <PhoneCall size={16} /> },
                    ]}
                  />
                </motion.div>

                <motion.div variants={itemVariants}>
                  <Dropdown
                    title={
                      <span className="flex items-center gap-3">
                        <Library size={18} />
                        Resources
                      </span>
                    }
                    isOpen={openDropdown === "resources"}
                    onToggle={() => toggleDropdown("resources")}
                    onLinkClick={() => setOpen(false)}
                    items={[
                      { name: "Free Resources", path: "/free-resources", icon: <Gift size={16} /> },
                      { name: "How It Works", path: "/how-it-works", icon: <HelpCircle size={16} /> },
                      { name: "FAQ", path: "/faq", icon: <HelpCircle size={16} /> },
                      { name: "Help Center", path: "/help", icon: <LifeBuoy size={16} /> },
                      { name: "Affiliate Program", path: "/affiliate/program", icon: <Share2 size={16} /> },
                      { name: "Resume", path: "/resume", icon: <FileText size={16} /> },
                    ]}
                  />
                </motion.div>

                <motion.div variants={itemVariants}>
                  <Dropdown
                    title={
                      <span className="flex items-center gap-3">
                        <Scale size={18} />
                        Legal
                      </span>
                    }
                    isOpen={openDropdown === "legal"}
                    onToggle={() => toggleDropdown("legal")}
                    onLinkClick={() => setOpen(false)}
                    items={[
                      { name: "Terms", path: "/terms", icon: <FileText size={16} /> },
                      { name: "Privacy", path: "/privacy", icon: <Shield size={16} /> },
                      { name: "Refund Policy", path: "/refund-policy", icon: <RefreshCcw size={16} /> },
                      { name: "Verify Certificate", path: "/verify-certificate", icon: <CheckSquare size={16} /> },
                    ]}
                  />
                </motion.div>
              </nav>

              {/* FOOTER CTA */}
              <div className="p-5 bg-slate-50 dark:bg-white/5 border-t border-slate-200 dark:border-white/10 shrink-0 transition-colors duration-300">
                <a
                  href="https://wa.me/2348113722088"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2.5 w-full 
                  bg-blue-600 text-white py-3.5 rounded-xl font-semibold shadow-lg shadow-blue-900/20
                  hover:bg-blue-500 active:scale-95 transition-all duration-300 group"
                >
                  <MessageCircle size={20} className="group-hover:animate-pulse" />
                  Chat on WhatsApp
                </a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default MobileMenu;