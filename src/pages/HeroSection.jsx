import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Code2,
  Palette,
  GraduationCap,
  ShoppingCart,
  Building2,
  Sparkles,
  ArrowRight,
} from "lucide-react";

const services = [
  {
    icon: Code2,
    title: "Web Development",
  },
  {
    icon: Palette,
    title: "UI/UX Design",
  },
  {
    icon: GraduationCap,
    title: "Tech Academy",
  },
  {
    icon: ShoppingCart,
    title: "E-Commerce",
  },
  {
    icon: Building2,
    title: "Real Estate",
  },
];

const stats = [
  {
    value: "50+",
    label: "Projects",
  },
  {
    value: "500+",
    label: "Students",
  },
  {
    value: "5+",
    label: "Services",
  },
  {
    value: "24/7",
    label: "Support",
  },
];

export default function HeroSection() {
  return (
    <section className="relative min-h-screen overflow-hidden bg-slate-50 dark:bg-slate-950 flex items-center transition-colors duration-300">

      {/* Background */}
      <div className="absolute inset-0">

        <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-blue-600/10 dark:bg-blue-600/30 blur-[160px]" />

        <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-purple-600/10 dark:bg-purple-600/20 blur-[180px]" />

        <div className="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,.03)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,.03)_1px,transparent_1px)] dark:bg-[linear-gradient(rgba(255,255,255,.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.03)_1px,transparent_1px)] bg-[size:50px_50px]" />

      </div>

      <div className="container mx-auto px-6 lg:px-12 relative z-10">

        <div className="grid lg:grid-cols-2 gap-16 items-center">

          {/* LEFT */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            {/* Badge */}

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-600 dark:text-blue-400 mb-8 shadow-sm dark:shadow-none transition-colors"
            >
              <Sparkles size={16} />
              Ifywigatechz Global Services
            </motion.div>

            {/* Heading */}

            <h1 className="text-4xl sm:text-5xl lg:text-7xl font-black leading-tight text-slate-900 dark:text-white transition-colors">

              Building

              <span className="block bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent">
                Digital Experiences
              </span>

              That Inspire Growth
            </h1>

            {/* Description */}

            <p className="mt-8 text-lg sm:text-xl text-slate-700 dark:text-slate-300 max-w-xl leading-relaxed transition-colors">
              We build modern web applications, create beautiful user
              experiences, deliver innovative business solutions, and train the
              next generation of technology professionals through
              Ifywigatechz Academy.
            </p>

            {/* Buttons */}

            <div className="flex flex-wrap gap-4 mt-10">

              <Link
                to="/contact"
                className="group px-8 py-4 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white font-semibold flex items-center gap-2 transition"
              >
                Start Your Project
                <ArrowRight
                  size={18}
                  className="group-hover:translate-x-1 transition"
                />
              </Link>

              <Link
                to="/services"
                className="px-8 py-4 rounded-2xl border border-slate-200 dark:border-white/10 bg-white dark:bg-white/5 backdrop-blur-lg text-slate-700 dark:text-white hover:bg-slate-50 dark:hover:bg-white/10 transition shadow-sm dark:shadow-none"
              >
                Explore Services
              </Link>

            </div>

            {/* Trust Badges */}

            <div className="flex flex-wrap gap-3 mt-10">

              {[
                "MERN Development",
                "UI/UX Design",
                "AI Solutions",
                "Tech Training",
              ].map((item) => (
                <span
                  key={item}
                  className="px-4 py-2 rounded-full bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 text-sm text-slate-700 dark:text-slate-300 shadow-sm dark:shadow-none transition-colors"
                >
                  ✓ {item}
                </span>
              ))}

            </div>

            {/* Stats */}

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-12">

              {stats.map((stat) => (
                <div
                  key={stat.label}
                  className="bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 backdrop-blur-lg rounded-2xl p-5 shadow-sm dark:shadow-none transition-colors"
                >
                  <h3 className="text-2xl font-bold text-slate-900 dark:text-white transition-colors">
                    {stat.value}
                  </h3>

                  <p className="text-slate-600 dark:text-slate-400 text-xs sm:text-sm transition-colors">
                    {stat.label}
                  </p>
                </div>
              ))}

            </div>

          </motion.div>

          {/* RIGHT */}

          <div className="relative flex justify-center mt-12 lg:mt-0">

            {/* Glow */}

            <div className="absolute w-[450px] h-[450px] bg-blue-500/20 blur-[120px] rounded-full" />

            {/* Main Card */}

            <motion.div
              animate={{
                y: [0, -15, 0],
              }}
              transition={{
                duration: 6,
                repeat: Infinity,
              }}
              className="relative w-full max-w-lg rounded-[32px] border border-slate-200 dark:border-white/10 bg-white/60 dark:bg-white/5 backdrop-blur-xl p-8 shadow-2xl transition-colors"
            >
              <img
                src="/heroimage.png"
                alt="IfyWigaTechz"
                className="w-full object-contain"
              />
            </motion.div>

            {/* Floating Cards */}

            {services.map((service, index) => {
              const Icon = service.icon;

              return (
                <motion.div
                  key={service.title}
                  animate={{
                    y: [0, -15, 0],
                  }}
                  transition={{
                    duration: 4 + index,
                    repeat: Infinity,
                  }}
                  className={`hidden sm:flex
                    absolute
                    bg-white/80 dark:bg-white/10
                    backdrop-blur-xl
                    border border-slate-200 dark:border-white/10
                    rounded-2xl
                    px-4 py-3
                    items-center gap-3
                    text-slate-800 dark:text-white
                    shadow-xl
                    transition-colors
                  `}
                  style={{
                    top: `${15 + index * 15}%`,
                    left: index % 2 === 0 ? "-40px" : "80%",
                  }}
                >
                  <Icon size={20} />
                  <span className="text-sm font-medium">
                    {service.title}
                  </span>
                </motion.div>
              );
            })}
          </div>

        </div>

      </div>
    </section>
  );
}