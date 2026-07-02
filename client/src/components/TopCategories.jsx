import { useState } from "react";
import { NavLink } from "react-router-dom";
import { motion } from "framer-motion";
import { categories } from "../data/categories";

const filters = ["all", "popular", "trending", "business"];

export default function TopCategories() {
  const [active, setActive] = useState("all");

  const filtered =
    active === "all"
      ? categories
      : categories.filter((c) => c.tag === active);

  return (
    <section className="relative py-16 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 overflow-hidden">

      {/* HEADER */}
      <div className="container-wide text-center space-y-4 mb-10">
        <h2 className="text-3xl md:text-4xl font-extrabold text-white">
          Our Top Categories
        </h2>
        <p className="text-slate-400 max-w-xl mx-auto">
          Explore our core services and solutions designed to help you grow digitally.
        </p>

        {/* FILTERS */}
        <div className="flex justify-center flex-wrap gap-3 pt-4">
          {filters.map((f) => (
            <button
              key={f}
              onClick={() => setActive(f)}
              className={`px-4 py-2 rounded-full text-sm capitalize transition ${
                active === f
                  ? "bg-blue-600 text-white"
                  : "bg-white/10 text-slate-300 hover:bg-white/20"
              }`}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      {/* GRID */}
      <div className="container-wide grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">

        {filtered.map((item, index) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
          >
            <NavLink
              to={item.link}
              className="group block rounded-2xl p-[1px] bg-gradient-to-br from-white/10 to-white/5 hover:from-blue-500/40 hover:to-purple-500/40 transition"
            >
              <div className="h-full rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 p-6 hover:scale-[1.02] transition">

                {/* TOP */}
                <div className="flex justify-between items-center mb-4">
                  <div className="w-12 h-12 flex items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 text-white text-xl">
                    {item.icon}
                  </div>

                  <div className="w-12 h-12 flex items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 shadow-lg group-hover:scale-110 transition duration-300">
  <img 
    src={item.icon}
    alt={item.title}
    className="w-7 h-7 object-contain group-hover:rotate-6 transition"
  />
</div>

                  {/* TAG */}
                  <span className="text-xs bg-white/10 px-2 py-1 rounded-full text-slate-300 capitalize">
                    {item.tag}
                  </span>
                </div>

                {/* TEXT */}
                <h3 className="text-lg font-semibold text-white group-hover:text-blue-400 transition">
                  {item.title}
                </h3>
                <p className="text-sm text-slate-400 mt-1">
                  {item.desc}
                </p>

              </div>
            </NavLink>
          </motion.div>
        ))}

      </div>
    </section>
  );
}