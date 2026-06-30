import { useState, useMemo } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { Link } from 'react-router-dom'

export default function Projects() {
  const [imageLoading, setImageLoading] = useState({});
  const [visibleCount, setVisibleCount] = useState(6);
  const [activeCategory, setActiveCategory] = useState("All");

  const categories = ["All", "Web", "Design", "Mobile", "Education"];

  const items = [
    {
      title: "IFYWIGATECHZ Academy",
      desc: "A modern educational platform featuring landing pages, course structure, and UI/UX improvements.",
      link: "#",
      tags: ["Education", "Web App", "UI/UX"],
      img: "https://res.cloudinary.com/dufcon4jl/image/upload/q_auto/f_auto/v1776697596/Ifywigatechz_wndsok.png"
    },
    {
      title: "KingLaw Paradise Builders",
      desc: "Corporate construction website deployed on Vercel with clean architecture and mobile-first UI.",
      link: "https://www.kinglawparadisebuilders.com",
      tags: ["Construction", "Corporate", "In Production"],
      img: "https://res.cloudinary.com/dufcon4jl/image/upload/v1776697606/Kinglaw_jy72j6.png"
    },
    {
      title: "Oluma Stamped Concrete",
      desc: "Brand portfolio with gallery, service pages, and customer conversion CTAs.",
      link: "#",
      tags: ["Branding", "Portfolio", "UI/UX"],
      img: "https://res.cloudinary.com/dufcon4jl/image/upload/q_auto/f_auto/v1776697626/Stamped_djlba7.png"
    },
    {
       title: "Nwabest Plumbers",
      desc: "Business website with gallery, service pages, and customer conversion CTAs.",
      link: "https://nwabest-plumbers.vercel.app/",
      tags: ["Branding", "Business", "UI/UX"],
      img: "https://res.cloudinary.com/dufcon4jl/image/upload/v1776697611/NwabestPlumbers_vdevoj.png"
    },
    {
      title: "Couch Store",
      desc: "A funiture site for couches with Add Cart, gallery, pricing, Shop and Customer CTAs",
      link: "https://couches-store.vercel.app/",
      tags: ["Couch", "Carpentery", "Responsiveness"],
      img: "https://res.cloudinary.com/dufcon4jl/image/upload/q_auto/f_auto/v1776697587/couch_fzo7yp.png"
    },
    {
      title: "SandHub Sand Dumps",
      desc: " Sand Dumps website with Sand Type, WhatsApp as CTAs and Ordering",
      link: "https://sand-dumps.vercel.app/",
      tags: ["Sharp Sand", "Plaster Sand", "Pricing and Order Placing"],
      img: "https://res.cloudinary.com/dufcon4jl/image/upload/v1776697617/sand_besexa.png",
    },
    {
      title: "TechFlow Solutions",
      desc: "Full-stack web application for tech consulting with client dashboard and analytics.",
      link: "#",
      tags: ["React", "Node.js", "Dashboard"],
      img: "https://res.cloudinary.com/dufcon4jl/image/upload/q_auto/f_auto/v1776699387/3a2b90e6-9225-41df-b183-fed6e0db7983_i83skg.png"
    },
    {
      title: "FinanceHub Mobile",
      desc: "Financial management app with real-time tracking, budgeting tools, and secure authentication.",
      link: "#",
      tags: ["React Native", "Finance", "Mobile"],
      img: "https://res.cloudinary.com/dufcon4jl/image/upload/q_auto/f_auto/v1776701196/original-477e9aca00296612b8b7641f87579ce8_f3jyfx.webp"
    },
    {
      title: "HealthPlus Clinic",
      desc: "Healthcare booking platform with appointment scheduling and patient management system.",
      link: "#",
      tags: ["Healthcare", "Booking System", "React"],
      img: "https://res.cloudinary.com/dufcon4jl/image/upload/q_auto/f_auto/v1776703836/HealthPlus_xizt7e.png"
    },
    {
      title: "CreativeHub Design Studio",
      desc: "Portfolio website for design agency showcasing projects, team, and service offerings.",
      link: "#",
      tags: ["Portfolio", "Design", "Creative"],
      img: "https://res.cloudinary.com/dufcon4jl/image/upload/q_auto/f_auto/v1776704148/CreativeHub_s1nd8g.png"
    },
    {
      title: "PetCare Veterinary",
      desc: "Veterinary clinic management system with appointment booking, medical records, and pet profiles.",
      link: "#",
      tags: ["Healthcare", "Veterinary", "Booking"],
      img: "https://res.cloudinary.com/dufcon4jl/image/upload/q_auto/f_auto/v1776704658/PetCare_ub2xp8.png"
    },
    {
      title: "MusicStream Platform",
      desc: "Music streaming service with playlist creation, recommendations, and artist profiles.",
      link: "#",
      tags: ["Music", "Streaming", "Social"],
      img: "https://res.cloudinary.com/dufcon4jl/image/upload/q_auto/f_auto/v1776704665/MusicStream_bdtqoj.png"
    },
    {
      title: "GreenEnergy Solutions",
      desc: "Energy efficiency platform with consumption tracking, solar calculator, and carbon footprint analysis.",
      link: "#",
      tags: ["Sustainability", "Energy", "Analytics"],
      img: "https://res.cloudinary.com/dufcon4jl/image/upload/q_auto/f_auto/v1776704138/Green_gcxnut.png"
    }
  ];

  // Parallax Effect
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);

  // Grouping logic for more intuitive filtering
  const filteredItems = useMemo(() => {
    if (activeCategory === "All") return items;
    return items.filter(p => {
      const tags = p.tags.map(t => t.toLowerCase());
      if (activeCategory === "Web") {
        return tags.some(t => t.includes("web") || t.includes("react") || t.includes("node") || t.includes("dashboard") || t.includes("business") || t.includes("production") || t.includes("responsiveness"));
      }
      if (activeCategory === "Design") return tags.some(t => t.includes("design") || t.includes("ui") || t.includes("ux") || t.includes("branding") || t.includes("portfolio"));
      if (activeCategory === "Mobile") return tags.some(t => t.includes("mobile") || t.includes("react native"));
      if (activeCategory === "Education") return tags.some(t => t.includes("education"));
      return false;
    });
  }, [activeCategory, items]);

  return (
    <section className="section relative overflow-hidden bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white py-16 container-wide transition-colors duration-300">
      {/* Hero Background Image */}
      <motion.div className="absolute inset-0" style={{ y }}>
        <img 
          src="/instructors/herosection.png" 
          alt="About Hero" 
          className="w-full h-[120%] object-cover"
        />
        <div className="absolute inset-0 bg-white/80 dark:bg-black/60 backdrop-blur-sm transition-colors duration-300"></div>
      </motion.div>

      <div className="absolute right-0 top-0 h-72 w-72 rounded-full bg-brandBlue/10 blur-3xl" />
      <div className="absolute left-0 bottom-0 h-72 w-72 rounded-full bg-brandGold/10 blur-3xl" />

      <div className="relative z-10 space-y-12">
        <header className="max-w-5xl mx-auto text-center px-4 sm:px-6">
          <div className="inline-flex items-center justify-center rounded-full border border-slate-300 dark:border-white/10 bg-white/60 dark:bg-white/5 px-4 py-2 text-sm uppercase tracking-[0.3em] text-slate-700 dark:text-neutral-300 shadow-sm backdrop-blur">
            Portfolio Showcase
          </div>
          <h1 className="mt-6 text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white sm:text-5xl lg:text-6xl">
            Projects Built for Growth, Conversion, and Scale
          </h1>
          <p className="mx-auto mt-5 max-w-3xl text-base text-slate-700 dark:text-neutral-300 sm:text-lg leading-relaxed">
            Browse a curated collection of past work demonstrating modern web applications, conversion-driven landing pages, and robust business platforms.
          </p>
        </header>

      <div className="mx-auto max-w-6xl grid-responsive sm:grid-cols-3">
          {[
            { value: '100+', label: 'Projects Captured' },
            { value: '50+', label: 'Satisfied Clients' },
            { value: '4.9★', label: 'Average Rating' }
          ].map((stat) => (
            <div key={stat.label} className="rounded-[2rem] border border-slate-200 dark:border-white/10 bg-white/80 dark:bg-slate-900/80 p-6 text-center shadow-lg shadow-brandBlue/10 backdrop-blur-sm">
              <div className="text-4xl font-extrabold text-brandGold">{stat.value}</div>
              <p className="mt-3 text-sm uppercase tracking-[0.24em] text-slate-600 dark:text-neutral-400">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* ---------------- FILTERS ---------------- */}
        <div className="flex flex-wrap justify-center gap-3 max-w-4xl mx-auto px-4">
          {categories.map((cat) => (
            <button
              key={cat} 
              onClick={() => {
                setActiveCategory(cat);
                setVisibleCount(6);
              }}
              className={`px-6 py-2 rounded-full text-sm font-bold transition-all duration-300 shadow-sm ${
                activeCategory === cat
                  ? "bg-brandBlue text-white scale-105 shadow-brandBlue/20"
                  : "bg-white/60 dark:bg-neutral-800/60 text-slate-700 dark:text-neutral-300 border border-slate-200 dark:border-white/10 hover:bg-white dark:hover:bg-neutral-700 backdrop-blur-sm"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="grid-responsive md:grid-cols-2 xl:grid-cols-3">
            {filteredItems.slice(0, visibleCount).map((p, i) => (
              <motion.div
                key={i}
                className="group flex h-full flex-col overflow-hidden rounded-[2rem] border border-slate-200 dark:border-white/10 bg-white/80 dark:bg-slate-900/80 shadow-2xl shadow-brandBlue/10 transition-all duration-300 hover:-translate-y-1 hover:border-brandGold/30"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
              >
                <div className="relative overflow-hidden bg-slate-200 dark:bg-neutral-800 h-56">
                  {imageLoading[i] && <div className="absolute inset-0 animate-pulse bg-slate-300 dark:bg-neutral-700" />}
                  <img
                    src={p.img}
                    alt={p.title}
                    loading="lazy"
                    onLoadStart={() => setImageLoading({ ...imageLoading, [i]: true })}
                    onLoad={() => setImageLoading({ ...imageLoading, [i]: false })}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>

                <div className="flex flex-1 flex-col p-6">
                  <div className="flex items-center justify-between gap-4">
                    <h3 className="text-lg font-semibold text-slate-900 dark:text-white transition-colors group-hover:text-brandGold md:text-xl">
                      {p.title}
                    </h3>
                    <span className="rounded-full border border-brandBlue/20 bg-brandBlue/10 px-3 py-1 text-xs uppercase tracking-[0.24em] text-brandBlue">
                      {p.tags[0]}
                    </span>
                  </div>

                  <p className="mt-4 text-sm leading-6 text-slate-700 dark:text-neutral-300 flex-grow line-clamp-3">
                    {p.desc}
                  </p>

                  <div className="mt-5 flex flex-wrap gap-2">
                    {p.tags.map((tag, t) => (
                      <span key={t} className="rounded-full bg-slate-100 dark:bg-white/5 px-3 py-1 text-xs text-slate-700 dark:text-neutral-300 shadow-inner">
                        {tag}
                      </span>
                    ))}
                  </div>

                  <div className="mt-6 flex items-center justify-between gap-2 border-t border-slate-200 dark:border-white/5 pt-5 transition-colors duration-300">
                    <a 
                      href={p.link} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="group/link flex items-center gap-2 text-sm font-semibold text-brandGold hover:text-yellow-500 transition-colors"
                    >
                      <span>View Project</span>
                      <span className="inline-block transition-transform duration-300 group-hover/link:translate-x-1">→</span>
                    </a>
                    <Link 
                      to="/testimonials" 
                      className="px-3 py-1.5 rounded-lg bg-brandBlue/10 dark:bg-blue-400/10 text-xs font-bold text-brandBlue dark:text-blue-400 hover:bg-brandBlue hover:text-white dark:hover:bg-blue-400 dark:hover:text-slate-900 transition-all duration-300 shadow-sm hover:shadow-md"
                    >
                      Client Review
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {visibleCount < filteredItems.length && (
            <div className="mt-12 text-center">
              <button
                onClick={() => setVisibleCount(prev => prev + 6)}
                className="px-10 py-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white rounded-2xl font-bold shadow-xl hover:shadow-brandBlue/10 hover:-translate-y-1 transition-all duration-300"
              >
                Load More Projects
              </button>
            </div>
          )}
        </div>

        <div className="mx-auto max-w-5xl px-4 sm:px-6 text-center">
          <a
            href="https://wa.me/2348113722088"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Discuss Your Project on WhatsApp"
            className="inline-flex items-center justify-center rounded-full bg-brandGold px-8 py-3 text-sm font-semibold text-black shadow-xl shadow-brandGold/20 transition hover:bg-yellow-400"
          >
            Discuss Your Project on WhatsApp
          </a>
        </div>
      </div>
    </section>
  );
}
