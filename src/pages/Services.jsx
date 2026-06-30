import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { NavLink, Link } from "react-router-dom";
import { services } from "../data/services"; // adjust path if needed

export default function Services() {
  // Categories (with "All")
  const categories = ["All", ...new Set(services.map((s) => s.category))];

  // Active filter
  const [activeCategory, setActiveCategory] = useState("All");

  // Filter logic
  const filteredServices =
    activeCategory === "All"
      ? services
      : services.filter((s) => s.category === activeCategory);

  return (
    <section className="section space-y-16 bg-slate-50 dark:bg-blue-900 container-wide transition-colors duration-300">
      {/* SEO */}
      <Helmet>
        <title>Web Development & Digital Services | IFYWIGATECHZ</title>
        <meta
          name="description"
          content="Comprehensive web development, UI/UX design, SEO, mobile apps, cloud infrastructure, and digital consulting services."
        />
      </Helmet>

      {/* HERO */}
      <div className="text-center space-y-4 max-w-3xl mx-auto">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-brandBlue dark:text-blue-400">
          Comprehensive Digital Solutions
        </h1>
        <p className="text-sm sm:text-base md:text-lg text-slate-700 dark:text-neutral-200">
          From concept to deployment, we deliver end-to-end services across web
          development, design, marketing, and infrastructure.
        </p>
      </div>

      {/* FILTER TABS */}
      <div className="flex flex-wrap justify-center gap-3 max-w-4xl mx-auto">
        {categories.map((cat, i) => (
          <button
            key={i}
            onClick={() => setActiveCategory(cat)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
              activeCategory === cat
                ? "bg-brandBlue dark:bg-brandGold text-white dark:text-black shadow-lg"
                : "bg-slate-200 dark:bg-neutral-800 text-slate-700 dark:text-neutral-300 hover:bg-slate-300 dark:hover:bg-neutral-700"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* SERVICES GRID */}
      <div className="space-y-8 sm:space-y-10">
        <h2 className="text-xl sm:text-3xl font-bold text-slate-900 dark:text-white text-center">
          {activeCategory === "All" ? "All Services" : activeCategory}
        </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filteredServices.map((s, i) => (
            <Link to={`/services/${s.slug}`} key={i} className="block">
              <div className="relative group rounded-xl p-[2px]">
                
                {/* 🔄 Animated Gradient Border */}
                <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-brandBlue via-brandGold to-brandBlue bg-[length:200%_200%] animate-gradientMove opacity-70 group-hover:opacity-100 blur-sm transition duration-500"></div>

                {/* CARD */}
                <div className="relative rounded-xl bg-white dark:bg-neutral-900/90 overflow-hidden flex flex-col h-full transition-all duration-500 shadow-lg group-hover:scale-[1.04] group-hover:shadow-[0_20px_40px_rgba(59,130,246,0.35),0_10px_15px_rgba(250,204,21,0.25)]">

                  {/* IMAGE */}
                  <div className="relative h-40 overflow-hidden">
                    <img
                      src={s.image}
                      alt={s.name}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent dark:from-black/70 dark:via-black/30 dark:to-transparent"></div>

                    {/* ICON */}
                    <div className="absolute bottom-2 left-3 text-3xl">
                      {s.icon}
                    </div>
                  </div>

                  {/* CONTENT */}
                  <div className="p-5 flex flex-col flex-grow">
                    <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white group-hover:text-brandBlue transition-colors">
                      {s.name}
                    </h3>

                    <p className="text-slate-600 dark:text-neutral-300 text-xs sm:text-sm mt-2 flex-grow">
                      {s.desc}
                    </p>

                    {/* CTA */}
                    <div className="pt-3 text-brandBlue opacity-0 group-hover:opacity-100 transition-all text-sm flex items-center gap-1">
                      <span>View Details</span>
                      <span className="transform translate-x-[-5px] group-hover:translate-x-0 transition">
                        →
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* DIVIDER */}
      <div className="h-px bg-gradient-to-r from-transparent via-brandBlue/50 to-transparent my-12"></div>

      {/* CTA SECTION */}
      <div className="max-w-3xl mx-auto p-6 sm:p-10 bg-gradient-to-r from-blue-50 via-white to-blue-50 dark:from-brandBlue/20 dark:via-brandGold/10 dark:to-brandBlue/20 border border-slate-200 dark:border-brandBlue/30 rounded-xl text-center space-y-5 sm:space-y-6 transition-colors duration-300 shadow-sm dark:shadow-none">
        <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white">
          Ready to Get Started?
        </h2>
        <p className="text-sm sm:text-base md:text-lg text-slate-700 dark:text-neutral-200">
          Let's discuss which services best fit your business goals.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
          <NavLink
            to="/pricing"
            className="px-6 sm:px-8 py-3 bg-brandBlue dark:bg-brandGold hover:bg-blue-700 dark:hover:bg-yellow-500 text-white dark:text-black font-semibold rounded-lg transition-all shadow-lg hover:shadow-brandGold/50"
          >
            View Pricing
          </NavLink>

          <NavLink
            to="/contact"
            className="px-6 sm:px-8 py-3 bg-white dark:bg-brandBlue hover:bg-slate-50 dark:hover:bg-blue-700 text-brandBlue dark:text-white border border-brandBlue font-semibold rounded-lg transition-all shadow-lg hover:shadow-brandBlue/50"
          >
            Free Consultation
          </NavLink>

          <a
            href="https://wa.me/2348113722088"
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 sm:px-8 py-3 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-lg transition-all shadow-lg hover:shadow-green-500/50"
          >
            WhatsApp
          </a>
        </div>
      </div>

      {/* STATS */}
      <div className="max-w-4xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8 py-10">
        {[
          { value: "15+", label: "Service Categories" },
          { value: "100+", label: "Projects Completed" },
          { value: "5+ Years", label: "Experience" },
        ].map((stat, i) => (
          <div key={i} className="text-center space-y-1">
            <div className="text-3xl sm:text-4xl font-bold text-brandGold">
              {stat.value}
            </div>
            <p className="text-slate-600 dark:text-neutral-300 text-sm">{stat.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
}