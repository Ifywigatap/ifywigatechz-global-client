import React from 'react';
import { NavLink } from 'react-router-dom';
import { motion } from 'framer-motion';
import { categories, containerVariants, cardVariants } from '../data/homeData'; // Import data and variants

const TopCategoriesSection = () => (
  <section className="relative py-16 md:py-24 bg-gradient-to-br from-slate-100 via-slate-50 to-blue-100 dark:from-slate-800 dark:via-gray-800 dark:to-blue-900 overflow-hidden transition-colors duration-300">
    <div className="absolute inset-0 pointer-events-none">
      <motion.div
        animate={{ x: [0, 40, 0], y: [0, 30, 0] }}
        transition={{ duration: 10, repeat: Infinity }}
        className="absolute w-72 h-72 bg-blue-500/20 blur-3xl rounded-full top-10 left-10"
      />
      <motion.div
        animate={{ x: [0, -40, 0], y: [0, -20, 0] }}
        transition={{ duration: 12, repeat: Infinity }}
        className="absolute w-72 h-72 bg-purple-500/20 blur-3xl rounded-full bottom-10 right-10"
      />
    </div>

    <div className="container-wide relative z-10 space-y-14">
      <motion.div
        initial={{ opacity: 0, y: 25 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="text-center space-y-4"
      >
        <h2 className="text-4xl md:text-5xl font-extrabold text-slate-900 dark:text-white">
          Our Top Categories
        </h2>
        <p className="text-slate-700 dark:text-slate-300 max-w-2xl mx-auto">
          Explore powerful services crafted to elevate your digital presence and business growth.
        </p>
      </motion.div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8"
      >
        {categories.map((item) => (
          <motion.div key={item.title} variants={cardVariants}>
            <NavLink to={item.link} className="group block">
              <motion.div
                whileHover={{
                  y: -10,
                  scale: 1.04,
                }}
                transition={{ type: "spring", stiffness: 200, damping: 15 }}
                className="relative h-full rounded-2xl bg-white/60 dark:bg-white/5 backdrop-blur-xl border border-slate-200 dark:border-white/10 p-6 flex flex-col justify-between overflow-hidden group"
              >
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition duration-500 bg-gradient-to-br from-blue-500/10 to-purple-500/10"></div>

                <div className="flex items-center justify-between">
                  <div className="w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 rounded-xl overflow-hidden border border-slate-200 dark:border-white/10 shadow-lg">
                    <img
                      src={item.img}
                      alt={item.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition duration-500"
                    />
                  </div>
                  <span className="text-slate-400 dark:text-white/60 group-hover:text-slate-900 dark:group-hover:text-white text-xl transform group-hover:translate-x-1 transition">
                    →
                  </span>
                </div>

                <div className="mt-6">
                  <h3 className="text-lg font-semibold text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition">
                    {item.title}
                  </h3>
                  <p className="text-sm text-slate-700 dark:text-slate-300 mt-2">{item.desc}</p>
                </div>

                <div className="absolute bottom-0 left-0 h-[2px] w-0 group-hover:w-full bg-gradient-to-r from-blue-500 to-purple-500 transition-all duration-500"></div>
              </motion.div>
            </NavLink>
          </motion.div>
        ))}
      </motion.div>
    </div>
  </section>
);

export default TopCategoriesSection;