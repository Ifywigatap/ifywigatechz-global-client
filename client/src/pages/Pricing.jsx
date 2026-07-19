import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { NavLink } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { pricingPlans, slugify } from "../data/pricingPlans";

export default function Pricing() {
  const [billing, setBilling] = useState("yearly");
  const [activeCategory, setActiveCategory] = useState("All");

  const tiers = pricingPlans.map(plan => {
    const processPrice = (val) => {
      // Handle strings like "Custom" or "N/A"
      if (typeof val === 'string') return { display: val, original: null };
      
      // Extract numbers from the pricing object { original, current }
      const current = val?.current ?? 0;
      const original = val?.original ?? 0;
      
      return {
        display: `₦${Number(current).toLocaleString()}`,
        original: original !== current ? `₦${Number(original).toLocaleString()}` : null
      };
    };

    const monthlyData = processPrice(plan.monthly);
    const yearlyData = processPrice(plan.yearly);
    const lifetimeData = processPrice(plan.lifetime);

    return {
      ...plan,
      category: plan.category || "General",
      monthly: monthlyData.display,
      monthlyOriginal: monthlyData.original,
      yearly: yearlyData.display,
      yearlyOriginal: yearlyData.original,
      lifetime: lifetimeData.display,
      lifetimeOriginal: lifetimeData.original,
      link: plan.link || null
    };
  });

  const categories = [
    "All", 
    ...Array.from(new Set(tiers.map((t) => t.category)))
      .filter(c => c !== 'All')
      .sort((a, b) => (a === 'core' ? -1 : b === 'core' ? 1 : a.localeCompare(b)))
  ];

  const filteredTiers =
    activeCategory === "All"
      ? tiers
      : tiers.filter((t) => t.category === activeCategory);

  const groupedTiers = filteredTiers.reduce((acc, tier) => {
    const cat = tier.category;
    if (!acc[cat]) acc[cat] = [];
    acc[cat].push(tier);
    return acc;
  }, {});

  return (
    <>
      <Helmet>
        <title>Pricing & Packages | Web Development Services | IFYWIGATECHZ</title>
        <meta name="description" content="Transparent, flexible pricing for web development, e-commerce, and digital solutions. Choose from starter to enterprise packages." />
      </Helmet>

      <main className="min-h-screen bg-gradient-to-br from-slate-50 via-slate-100 to-slate-200 dark:from-blue-950 dark:via-blue-900 dark:to-slate-900 transition-colors duration-300">
        <section className="section space-y-12 container-wide py-8 transition-colors duration-300">
          {/* Hero Section */}
          <div className="text-center space-y-4 max-w-4xl mx-auto px-4 sm:px-6 pt-8">
            <div className="inline-flex items-center justify-center gap-2 rounded-full bg-white/60 dark:bg-white/5 px-4 py-2 text-sm text-slate-700 dark:text-neutral-300 border border-slate-300 dark:border-white/10 shadow-sm backdrop-blur">
              Designed for startups, agencies, and growing teams
            </div>
            <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white">
              Simple, Transparent Pricing for Ambitious Projects
            </h1>
            <p className="mx-auto max-w-2xl text-sm sm:text-lg text-slate-600 dark:text-neutral-300 leading-7">
              Pick the right plan for your digital growth. Every package comes with professional support, fast delivery, and scalable architecture.
            </p>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3 mt-6">
              <div className="rounded-3xl border border-slate-200 dark:border-brandBlue/20 bg-white/60 dark:bg-white/5 p-4 text-left backdrop-blur transition-colors duration-300">
                <p className="text-sm text-slate-500 dark:text-neutral-400 uppercase tracking-[0.2em]">Fast Delivery</p>
                <p className="mt-2 text-lg font-semibold text-slate-900 dark:text-white">Launch quickly, stay ahead</p>
              </div>
              <div className="rounded-3xl border border-slate-200 dark:border-brandBlue/20 bg-white/60 dark:bg-white/5 p-4 text-left backdrop-blur transition-colors duration-300">
                <p className="text-sm text-slate-500 dark:text-neutral-400 uppercase tracking-[0.2em]">Expert Support</p>
                <p className="mt-2 text-lg font-semibold text-slate-900 dark:text-white">Trusted engineering guidance</p>
              </div>
              <div className="rounded-3xl border border-slate-200 dark:border-brandBlue/20 bg-white/60 dark:bg-white/5 p-4 text-left backdrop-blur transition-colors duration-300">
                <p className="text-sm text-slate-500 dark:text-neutral-400 uppercase tracking-[0.2em]">Flexible Options</p>
                <p className="mt-2 text-lg font-semibold text-slate-900 dark:text-white">Monthly, yearly, lifetime</p>
              </div>
            </div>
          </div>

          {/* Breadcrumb */}
          <div className="flex justify-center text-sm text-slate-500 dark:text-neutral-400 space-x-2 px-4 sm:px-6">
            <NavLink to="/" className="hover:text-brandBlue transition">Home</NavLink>
            <span>/</span>
            <NavLink to="/services" className="hover:text-brandBlue transition">Services</NavLink>
            <span>/</span>
            <span className="text-brandBlue font-semibold">Pricing</span>
          </div>

          {/* Category Filter Tabs */}
          <div className="flex flex-wrap justify-center gap-3 max-w-4xl mx-auto px-4 mt-6">
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
                {cat === 'core' ? 'Core Solutions' 
                 : cat === 'specialized' ? 'Specialized Services' 
                 : cat === 'academy' ? 'Academy Courses'
                 : cat}
              </button>
            ))}
          </div>

          {/* Billing Toggle */}
          <div className="flex justify-center overflow-x-auto px-4 sm:px-0 mt-6">
            <div className="bg-white dark:bg-neutral-800/90 rounded-full p-1 flex items-center gap-1 border border-slate-200 dark:border-brandBlue/20 shadow-inner transition-colors duration-300">
              {["monthly", "yearly", "lifetime"].map((mode) => (
                <button
                  key={mode}
                  onClick={() => setBilling(mode)}
                  className={`px-4 sm:px-6 py-2 rounded-full text-xs sm:text-sm font-semibold transition-all whitespace-nowrap ${
                    billing === mode
                      ? "bg-brandBlue text-white shadow-xl"
                      : "text-slate-600 dark:text-neutral-300 hover:text-slate-900 dark:hover:text-white"
                  }`}
                >
                  {mode === "monthly" && "Monthly"}
                  {mode === "yearly" && "Yearly"}
                  {mode === "lifetime" && "Lifetime"}
                  {mode === "yearly" && (
                    <span className="ml-2 inline-flex items-center rounded-full bg-brandGold text-black px-2 py-0.5 text-[10px] font-bold uppercase">
                      Save 20%
                    </span>
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Pricing Grid */}
          <motion.div layout className="grid gap-8">
            <AnimatePresence mode="popLayout">
              {Object.entries(groupedTiers).map(([category, categoryTiers]) => (
                <motion.div 
                  key={category} 
                  layout
                  initial={{ opacity: 0, y: 30, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -30, scale: 0.95 }}
                  transition={{ duration: 0.4 }}
                  className="rounded-[2rem] border border-slate-200 dark:border-brandBlue/20 bg-white/60 dark:bg-neutral-900/60 p-6 shadow-2xl shadow-brandBlue/10 backdrop-blur transition-colors duration-300"
                >
                  <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between mb-8">
                    <div>
                      <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white capitalize">
                        {category === 'core' ? 'Core Web Solutions' : category === 'specialized' ? 'Specialized Services' : category}
                      </h2>
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
                    {categoryTiers.map((tier) => (
                      <PricingTierCard key={tier.id} tier={tier} billing={billing} />
                    ))}
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>

          {/* CTA */}
          <div className="max-w-3xl mx-auto rounded-[2rem] border border-slate-200 dark:border-brandBlue/30 bg-white/60 dark:bg-transparent dark:bg-gradient-to-r dark:from-brandBlue/10 dark:via-transparent dark:to-brandGold/10 p-8 text-center shadow-2xl shadow-brandBlue/5 backdrop-blur transition-colors duration-300">
            <h3 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white mb-3">Need a custom solution?</h3>
            <p className="text-slate-600 dark:text-neutral-300 mb-6 leading-7">
              If your project needs more than a template, our team can craft a high-performance solution tailored to your business goals.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <NavLink to="/requestquote" className="inline-flex items-center justify-center rounded-3xl bg-brandBlue dark:bg-brandGold px-8 py-3 text-sm font-semibold text-white dark:text-black transition hover:bg-blue-700 dark:hover:bg-yellow-500">
                Request Custom Quote
              </NavLink>
              <NavLink to="/contact" className="inline-flex items-center justify-center rounded-3xl border border-brandBlue bg-transparent px-8 py-3 text-sm font-semibold text-brandBlue dark:text-white transition hover:border-blue-400 hover:bg-brandBlue/5 dark:hover:bg-white/5">
                Get in Touch
              </NavLink>
            </div>
          </div>

          {/* Quick Links */}
          <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
            <NavLink to="/services" className="group rounded-3xl border border-slate-200 dark:border-neutral-700 bg-white dark:bg-neutral-900/70 p-6  hover:border-brandBlue dark:hover:border-brandBlue hover:bg-slate-50 dark:hover:bg-neutral-900 shadow-sm transition-colors duration-300">
              <h4 className="text-lg font-semibold text-slate-900 dark:text-white mb-2 group-hover:text-brandBlue">← Explore Services</h4>
              <p className="text-slate-600 dark:text-neutral-400 text-sm">See all our web development and digital solutions.</p>
            </NavLink>
            <NavLink to="/learn" className="group rounded-3xl border border-slate-200 dark:border-neutral-700 bg-white dark:bg-neutral-900/70 p-6  hover:border-brandBlue dark:hover:border-brandBlue hover:bg-slate-50 dark:hover:bg-neutral-900 shadow-sm transition-colors duration-300">
              <h4 className="text-lg font-semibold text-slate-900 dark:text-white mb-2 group-hover:text-brandBlue">📚 Academy Courses</h4>
              <p className="text-slate-600 dark:text-neutral-400 text-sm">Learn web development with our specialized courses.</p>
            </NavLink>
            <NavLink to="/contact" className="group rounded-3xl border border-slate-200 dark:border-neutral-700 bg-white dark:bg-neutral-900/70 p-6 hover:border-brandBlue dark:hover:border-brandBlue hover:bg-slate-50 dark:hover:bg-neutral-900 shadow-sm transition-colors duration-300">
              <h4 className="text-lg font-semibold text-slate-900 dark:text-white mb-2 group-hover:text-brandBlue">💬 Still Have Questions?</h4>
              <p className="text-slate-600 dark:text-neutral-400 text-sm">Our team is ready to answer your questions.</p>
            </NavLink>
          </div>
        </section>
      </main>
    </>
  );
}

// PricingTierCard Component
function PricingTierCard({ tier, billing }) {
  return (
    <div className={`relative rounded-xl border transition-all duration-300 overflow-hidden group ${
      tier.popular
        ? 'border-brandBlue dark:border-brandGold bg-gradient-to-br from-blue-50 to-white dark:from-neutral-900 dark:to-neutral-800 shadow-2xl ring-2 ring-brandBlue/30 dark:ring-brandGold/30'
        : 'border-slate-200 dark:border-neutral-700 bg-white dark:bg-neutral-900/60 hover:border-brandBlue dark:hover:border-brandBlue hover:shadow-lg'
    }`}>
      {tier.popular && (
        <div className="absolute top-0 left-0 right-0 bg-gradient-to-r from-brandBlue to-blue-500 dark:from-brandGold dark:to-yellow-500 text-white dark:text-black py-2 text-center font-bold text-sm">
          ⭐ Most Popular
        </div>
      )}
      <div className={`px-6 pb-6 ${tier.popular ? 'pt-8' : 'pt-6'}`}>
        <h3 className="text-xl font-bold text-slate-900 dark:text-white">{tier.name}</h3>
        <div className="mt-4">
          <div className="flex flex-col">
            {/* Original Price (Strike-through) */}
            {(tier.category === 'academy' ? tier.lifetimeOriginal : tier[`${billing}Original`]) && (
              <span className="text-sm line-through text-slate-400 dark:text-slate-500 font-medium">
                {tier.category === 'academy' ? tier.lifetimeOriginal : tier[`${billing}Original`]}
              </span>
            )}

            {/* Current Price */}
            <div className="flex items-baseline gap-1">
              <span className="text-4xl font-extrabold text-brandBlue">
                {tier.category === 'academy' ? tier.lifetime : tier[billing]}
              </span>
              {tier.category === 'academy' 
                ? <span className="text-slate-500 dark:text-neutral-400">/course</span>
                : tier[billing] !== "Custom" && 
                  tier[billing] !== "N/A" && (
                  <span className="text-slate-500 dark:text-neutral-400">/{billing}</span>
                )}
            </div>
          </div>
        </div>
        <div className="h-px bg-gradient-to-r from-brandBlue/20 via-brandBlue/50 to-transparent my-6"></div>
        <ul className="space-y-3 mb-8">
          {tier.features.map((f, ix) => (
            <li key={ix} className="flex items-start gap-3">
              <span className="text-brandBlue font-bold text-lg leading-none mt-0.5">✓</span>
              <span className="text-slate-700 dark:text-neutral-200">{f}</span>
            </li>
          ))}
        </ul>
        {tier.category === 'academy' ? (
          <NavLink
            to={tier.link}
            className={`w-full block py-3 px-4 rounded-lg font-semibold text-center transition-all duration-300 ${
              tier.popular
                ? 'bg-brandBlue dark:bg-brandGold hover:bg-blue-700 dark:hover:bg-yellow-500 text-white dark:text-black shadow-lg hover:shadow-xl'
                : 'bg-brandBlue hover:bg-blue-700 text-white border border-brandBlue hover:border-blue-600'
            }`}
          >
            View Course
          </NavLink>
        ) : tier[billing] !== "Custom" ? (
          <NavLink
            to={`/pricing/${tier.id}`}
            className={`w-full block py-3 px-4 rounded-lg font-semibold text-center transition-all duration-300 ${
              tier.popular
                ? 'bg-brandBlue dark:bg-brandGold hover:bg-blue-700 dark:hover:bg-yellow-500 text-white dark:text-black shadow-lg hover:shadow-xl'
                : 'bg-brandBlue hover:bg-blue-700 text-white border border-brandBlue hover:border-blue-600'
            }`}
          >
            Pay with Paystack
          </NavLink>
        ) : (
          <a href="/contact" className="block w-full py-3 px-4 rounded-lg font-semibold text-center bg-slate-200 dark:bg-neutral-700 hover:bg-slate-300 dark:hover:bg-neutral-600 text-slate-900 dark:text-white transition-colors">
            Contact Sales
          </a>
        )}
      </div>
    </div>
  );
}
