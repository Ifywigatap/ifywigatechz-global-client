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
  Atom,
  Database,
  Server,
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
    title: "Business Solutions",
  },
];

const stats = [
  {
    value: "10+",
    label: "Projects Completed",
  },
  {
    value: "100%",
    label: "Responsive Design",
  },
  {
    value: "MERN",
    label: "Stack Expertise",
  },
  {
    value: "24/7",
    label: "Support",
  },
];

export default function HeroSection() {
  return (
    <section className="relative min-h-screen overflow-hidden bg-slate-50 dark:bg-slate-950 flex items-center">

    {/* Premium Tech Background */}
<div className="absolute inset-0 overflow-hidden">

  {/* Aurora */}
  <div className="absolute top-[-10%] left-[-10%] w-[700px] h-[700px] rounded-full bg-cyan-500/20 blur-[180px]" />

  <div className="absolute bottom-[-20%] right-[-10%] w-[700px] h-[700px] rounded-full bg-blue-600/20 blur-[200px]" />

  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-sky-400/10 blur-[150px]" />

  <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:60px_60px]" />

  <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_20%,#020617_100%)]" />

</div> {/* <-- THIS CLOSING DIV IS IMPORTANT */}

<div className="container mx-auto px-6 lg:px-12 relative z-10">



          {/* LEFT CONTENT */}

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >

            {/* Badge */}

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-600 dark:text-blue-400 mb-8"
            >
              <Sparkles size={16} />
              Unlocking Potential Through Technology & Innovation
            </motion.div>

            {/* Main Heading */}

            <h1 className="text-4xl sm:text-5xl lg:text-7xl font-black leading-tight text-slate-900 dark:text-white">

              IFYWIGATECHZ

              <span className="block bg-gradient-to-r from-blue-500 via-cyan-400 to-green-400 bg-clip-text text-transparent">
                GLOBAL SERVICES
              </span>

            </h1>

            {/* Sub Heading */}

            <h2 className="mt-6 text-2xl sm:text-3xl font-bold text-slate-800 dark:text-slate-200">

              Building Modern Websites,
              Web Applications & Digital Solutions

            </h2>

            {/* Description */}

            <p className="mt-8 text-lg text-slate-700 dark:text-slate-300 max-w-xl leading-relaxed">

              Helping businesses establish a powerful online presence through
              custom websites, web applications, UI/UX design, digital
              solutions, and technology-driven innovation tailored for growth.

            </p>

            {/* CTA Buttons */}

            <div className="flex flex-wrap gap-4 mt-10">

              <Link
                to="/contact"
                className="group px-8 py-4 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white font-semibold flex items-center gap-2 transition"
              >
                Get A Free Consultation

                <ArrowRight
                  size={18}
                  className="group-hover:translate-x-1 transition"
                />
              </Link>

              <Link
                to="/projects"
                className="px-8 py-4 rounded-2xl border border-slate-200 dark:border-white/10 bg-white dark:bg-white/5 backdrop-blur-lg text-slate-700 dark:text-white hover:bg-slate-50 dark:hover:bg-white/10 transition"
              >
                View Projects
              </Link>

            </div>

            {/* Tech Stack */}

            <div className="flex flex-wrap gap-4 mt-10">

              <span className="flex items-center gap-2 px-4 py-2 rounded-full bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10">
                <Atom size={16} />
                React
              </span>

              <span className="flex items-center gap-2 px-4 py-2 rounded-full bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10">
                <Server size={16} />
                Node.js
              </span>

              <span className="flex items-center gap-2 px-4 py-2 rounded-full bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10">
                <Database size={16} />
                MongoDB
              </span>

            </div>

            {/* Service Tags */}

            <div className="flex flex-wrap gap-3 mt-8">

              {[
                "Web Development",
                "UI/UX Design",
                "MERN Development",
                "Tech Academy",
              ].map((item) => (
                <span
                  key={item}
                  className="px-4 py-2 rounded-full bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 text-sm"
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
                  className="bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 backdrop-blur-lg rounded-2xl p-5"
                >
                  <h3 className="text-2xl font-bold text-slate-900 dark:text-white">
                    {stat.value}
                  </h3>

                  <p className="text-slate-600 dark:text-slate-400 text-sm">
                    {stat.label}
                  </p>
                </div>
              ))}

            </div>

          </motion.div>

          {/* RIGHT SIDE */}

          <div className="relative flex justify-center mt-12 lg:mt-0">

            <div className="absolute w-[450px] h-[450px] bg-blue-500/20 blur-[120px] rounded-full" />

            <motion.div
              animate={{
                y: [0, -15, 0],
              }}
              transition={{
                duration: 6,
                repeat: Infinity,
              }}
              className="relative w-full max-w-lg rounded-[32px] border border-slate-200 dark:border-white/10 bg-white/60 dark:bg-white/5 backdrop-blur-xl p-8 shadow-2xl"
            >
              <img
                src="/favlogo.png"
                alt="Ifywigatechz Global Services"
                className="w-full object-contain"
              />
            </motion.div>

            {/* Floating Service Cards */}

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
                  className="hidden sm:flex absolute bg-white/80 dark:bg-white/10 backdrop-blur-xl border border-slate-200 dark:border-white/10 rounded-2xl px-4 py-3 items-center gap-3 text-slate-800 dark:text-white shadow-xl"
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

      

    </section>
  );
}