import { memo } from "react";
import { NavLink } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

//////////////////////////////////////////////////////
// MEGA CONTENT (Compact Desktop Layout)
//////////////////////////////////////////////////////

const MegaContent = memo(({ data }) => (
  <div className="grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-8">
    
    {/* Links Grid */}
    <div className="grid-responsive sm:grid-cols-2 xl:grid-cols-3">
      {data.sections.map((section, i) => (
        <div key={i} className="min-w-0">
          
          {/* Section Title */}
          <h3 className="font-bold mb-4 text-slate-800 dark:text-slate-200 uppercase text-[11px] tracking-widest border-b border-slate-100 dark:border-slate-800/80 pb-2">
            {section.title}
          </h3>

          {/* Links */}
          <div className="space-y-1.5">
            {section.links.map((link, j) => {
              const Icon = link.icon;

              return (
                <NavLink
                  key={j}
                  to={link.to}
                  className="group flex items-start gap-3 rounded-xl px-3 py-2.5 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                >
                  {(link.image || Icon) && (
                    <div className="flex-shrink-0 p-2 rounded-lg bg-blue-50 dark:bg-blue-500/10 group-hover:bg-blue-100 dark:group-hover:bg-blue-500/20 transition-colors shadow-sm">
                      {link.image ? (
                        <img
                          src={link.image}
                          alt={link.label}
                          className="w-4 h-4 object-contain"
                          loading="lazy"
                          onError={(e) => {
                            e.target.onerror = null;
                            e.target.style.display = "none";
                          }}
                        />
                      ) : (
                        <Icon
                          size={16}
                          className="text-blue-600 dark:text-blue-400"
                        />
                      )}
                    </div>
                  )}

                  <div className="min-w-0 flex-1">
                    <div className="flex items-center justify-between gap-2">
                      <p className="font-semibold text-sm text-slate-700 dark:text-slate-200 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-all group-hover:translate-x-0.5 truncate">
                        {link.label}
                      </p>
                      
                      {link.badge && (
                        <span className="flex-shrink-0 px-1.5 py-0.5 rounded-full text-[9px] font-bold bg-blue-500/10 text-blue-500 dark:bg-blue-400/20 dark:text-blue-400 uppercase tracking-tighter">
                          {link.badge}
                        </span>
                      )}
                    </div>

                    {link.desc && (
                      <p className="text-[11px] leading-relaxed text-slate-500 dark:text-slate-400 line-clamp-1 mt-0.5">
                        {link.desc}
                      </p>
                    )}
                  </div>
                </NavLink>
              );
            })}
          </div>
        </div>
      ))}
    </div>

    {/* Featured Panel */}
    <div className="flex flex-col gap-6 h-full">
      {/* Primary Featured Panel */}
      <div className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-600 p-6 shadow-xl shadow-blue-900/20 min-h-[220px] flex flex-col justify-between border border-white/10 shrink-0">
        
        {/* Background Decoration */}
        <div
          className="absolute inset-0 opacity-10 mix-blend-overlay"
          style={{
            backgroundImage: "radial-gradient(circle at 2px 2px, white 1px, transparent 0)",
            backgroundSize: "24px 24px",
          }}
        />
        <div className="absolute -top-12 -right-12 h-32 w-32 rounded-full bg-white/20 blur-2xl transition-transform duration-700 group-hover:scale-150" />
        <div className="absolute -bottom-10 -left-10 h-24 w-24 rounded-full bg-white/10 blur-xl" />

        <div className="relative z-10">
          <h4 className="text-xl font-bold text-white leading-tight mb-2">
            {data.featured.title}
          </h4>
          <p className="text-sm leading-relaxed text-blue-100">
            {data.featured.desc}
          </p>
        </div>

        <div className="relative z-10 mt-6">
          <NavLink
            to={data.featured.to}
            className="inline-flex items-center gap-2 rounded-xl bg-white text-blue-600 px-5 py-2.5 text-sm font-bold shadow-lg transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-white/50"
          >
            {data.featured.cta}
            <svg
              className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 8l4 4m0 0l-4 4m4-4H3"
              />
            </svg>
          </NavLink>
        </div>
      </div>

      {/* Secondary Featured Panel (Small Banner) */}
      {data.secondaryFeatured && (
        <NavLink
          to={data.secondaryFeatured.to}
          className="group relative flex items-center gap-4 overflow-hidden rounded-2xl border border-slate-100 bg-slate-50 p-4 transition-all hover:border-blue-500/30 hover:bg-white dark:border-slate-800 dark:bg-slate-800/40 dark:hover:bg-slate-800/80"
        >
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white text-blue-600 shadow-sm dark:bg-slate-900 dark:text-blue-400 transition-colors group-hover:bg-blue-600 group-hover:text-white dark:group-hover:bg-blue-500">
            {data.secondaryFeatured.icon ? (
              <data.secondaryFeatured.icon size={18} />
            ) : (
              <span className="text-lg">🎁</span>
            )}
          </div>
          <div className="min-w-0 flex-1">
            <h5 className="text-[10px] font-black uppercase tracking-wider text-slate-400 dark:text-slate-500 group-hover:text-blue-500 transition-colors">
              {data.secondaryFeatured.label || "Limited Offer"}
            </h5>
            <p className="text-xs font-bold text-slate-800 dark:text-slate-200 line-clamp-1">
              {data.secondaryFeatured.title}
            </p>
          </div>
          <div className="shrink-0 text-slate-300 transition-transform group-hover:translate-x-1 dark:text-slate-600">
            <svg
              className="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </div>
        </NavLink>
      )}
    </div>
  </div>
));

//////////////////////////////////////////////////////
// MEGA MENU (Desktop Optimized)
//////////////////////////////////////////////////////

const MegaMenu = ({ children, id }) => (
  <motion.div
    id={id}
    initial={{ opacity: 0, y: 12, scale: 0.98 }}
    animate={{ opacity: 1, y: 0, scale: 1 }}
    exit={{ opacity: 0, y: 8, scale: 0.98 }}
    transition={{ duration: 0.2, ease: "easeOut" }}
    // High Z-index and centering relative to the Navbar container (configured in Navbar.jsx)
    className="absolute left-0 right-0 top-full z-[100] pt-4 cursor-default mx-auto max-w-6xl"
  >
    <div className="max-h-[calc(100dvh-120px)] overflow-y-auto rounded-2xl border border-slate-200/80 bg-white/95 shadow-2xl backdrop-blur-xl transition-colors duration-300 dark:border-slate-700/50 dark:bg-slate-900/95 scrollbar-thin scrollbar-thumb-slate-200 dark:scrollbar-thumb-slate-800">
      <div className="p-6 lg:p-8">
        {children}
      </div>
    </div>
  </motion.div>
);

//////////////////////////////////////////////////////
// NAV ITEM (Dropdown Trigger)
//////////////////////////////////////////////////////

const NavItem = ({
  label,
  data,
  name,
  activeMenu,
  openMenu,
  closeMenu,
}) => {
  const isActive = activeMenu === name.toLowerCase();
  const menuId = `mega-menu-${name.toLowerCase()}`;

  const handleKeyDown = (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      isActive ? closeMenu() : openMenu(name);
    } else if (e.key === "Escape" && isActive) {
      closeMenu();
    }
  };

  return (
    <div
      className="static" // Changed from relative to static
      onMouseEnter={() => openMenu(name)}
      onMouseLeave={closeMenu}
      // Delay closing slightly on blur to allow clicking inside the menu
      onBlur={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget)) {
          closeMenu();
        }
      }}
    >
      {/* Trigger */}
      <button
        className={`flex items-center gap-1.5 rounded-lg px-4 py-2 text-[13px] font-bold transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500/50 ${
          isActive 
            ? "bg-slate-100 text-slate-900 dark:bg-white/10 dark:text-white" 
            : "text-slate-600 hover:bg-slate-100 hover:text-slate-900 dark:text-slate-300 dark:hover:bg-white/5 dark:hover:text-white"
        }`}
        aria-expanded={isActive}
        aria-haspopup="true"
        aria-controls={isActive ? menuId : undefined}
        onKeyDown={handleKeyDown}
      >
        {label}

        <svg
          className={`h-4 w-4 transition-transform duration-300 ${
            isActive ? "rotate-180 text-blue-500 dark:text-blue-400" : "text-slate-400"
          }`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>

      {/* Dropdown */}
      <AnimatePresence>
        {isActive && ( // Only render if the menu is active
          <>
            {/* Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 dark:bg-slate-900/60 z-40"
              onClick={closeMenu} // Close menu when clicking the overlay
            />
            <MegaMenu id={menuId}>
              <MegaContent data={data} />
            </MegaMenu>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

export default NavItem;