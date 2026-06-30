import { useState } from "react";
import { Helmet } from 'react-helmet-async';
import { NavLink } from 'react-router-dom';
import PricingCard from '../components/PricingCard'
import { services } from '../data/services'
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle, Zap, ShieldCheck, Globe, Cpu, BarChart3, Layers, Plus, Minus, ArrowRight, MessageCircle, Paintbrush, Figma, Layout, Search } from "lucide-react";

export default function Uiux() {
  const designServices = services.filter(s => s.category === 'Design & UX');
  const [openFaq, setOpenFaq] = useState(null);
  
  const pricingPackages = [];
  designServices.slice(0,6).forEach(service => {
    service.pricing?.slice(0,2).forEach(pkg => {
      pricingPackages.push({
        ...pkg,
        highlighted: pricingPackages.length === 3 // highlight one
      });
    });
  });

  const serviceGrid = designServices.slice(0,6).map(s => ({
    title: s.name,
    desc: s.desc,
    icon: s.icon
  }));

  const toggleFaq = (i) => setOpenFaq(openFaq === i ? null : i);

  const faqs = [
    { q: "What is your design handoff process?", a: "We provide organized Figma files with full design systems, documentation, and asset exports ready for development." },
    { q: "Do you perform user testing?", a: "Yes, our 'Pro' and 'Enterprise' packages include interactive prototype testing with real users to validate UX flows." },
    { q: "Can you work with our existing brand guidelines?", a: "Absolutely. We specialize in expanding existing brand identities into comprehensive digital design systems." }
  ];

  return (
    <section className="bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white transition-colors duration-300 pb-20 overflow-hidden">
      <Helmet>
        <title>SaaS UI/UX Design | Figma Prototypes & Design Systems | IFYWIGATECHZ</title>
        <meta name="description" content="SaaS-grade UI/UX design services. Figma prototypes, design systems, UX research, and developer handoff for web apps, mobile, dashboards." />
      </Helmet>

      {/* 🔥 SAAS HERO - Product Positioning */}
      <div className="relative pt-24 pb-16 px-4">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(59,130,246,0.15),_transparent_50%)]" />
        <div className="max-w-6xl mx-auto text-center space-y-8 relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brandBlue/10 border border-brandBlue/20 text-brandBlue text-xs font-bold uppercase tracking-widest"
          >
            <Zap size={14} className="animate-pulse" /> Strategic Interface Engineering
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl sm:text-6xl md:text-7xl font-black leading-tight tracking-tight text-slate-900 dark:text-white"
          >
            Design Systems <br />
            <span className="bg-gradient-to-r from-brandBlue to-purple-500 bg-clip-text text-transparent">Built for Retention.</span>
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-lg sm:text-xl text-slate-600 dark:text-neutral-400 max-w-3xl mx-auto"
          >
            We build scalable UI/UX frameworks that bridge the gap between user delight and business goals. Transform your product into a world-class experience.
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-4 justify-center pt-4"
          >
            <NavLink
              to="/startproject"
              className="px-10 py-4 bg-brandBlue text-white rounded-2xl font-bold hover:bg-blue-700 transition shadow-xl shadow-brandBlue/20 hover:scale-105"
            >
              Start Design Project
            </NavLink>
            <NavLink
              to="/pricing"
              className="px-10 py-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/10 rounded-2xl font-bold hover:bg-slate-50 dark:hover:bg-slate-800 transition"
            >
              View Packages
            </NavLink>
          </motion.div>
        </div>
      </div>

      {/* 🏢 CUSTOMER LOGOS */}
      <div className="max-w-7xl mx-auto py-12 border-y border-slate-200 dark:border-white/5 opacity-50 grayscale hover:grayscale-0 transition-all duration-500">
        <p className="text-center text-xs font-bold uppercase tracking-widest text-slate-500 mb-8">Powering interfaces for</p>
        <div className="flex flex-wrap justify-center gap-8 md:gap-16 items-center px-4">
          {["FintechApp", "HealthFlow", "CreativeMinds", "DataViz", "EcoSaaS"].map((brand) => (
            <span key={brand} className="text-xl sm:text-2xl font-black text-slate-400 dark:text-neutral-600">{brand}</span>
          ))}
        </div>
      </div>

      {/* 🖼️ PRODUCT DASHBOARD PREVIEW */}
      <div className="max-w-6xl mx-auto px-4 py-20">
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative group"
        >
          <div className="absolute -inset-4 bg-gradient-to-r from-purple-500/20 to-brandBlue/20 blur-2xl rounded-[2.5rem] opacity-0 group-hover:opacity-100 transition duration-1000"></div>
          <div className="relative rounded-[2rem] overflow-hidden border-8 border-slate-900 shadow-2xl bg-slate-800">
            <div className="bg-slate-900 p-4 flex gap-2">
              <div className="w-3 h-3 rounded-full bg-red-500"></div>
              <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
              <div className="w-3 h-3 rounded-full bg-green-500"></div>
            </div>
            <img
              src="/courses/uiux.jpg"
              alt="SaaS Design Prototype Preview"
              className="w-full h-auto object-cover"
            />
          </div>
        </motion.div>
      </div>

      {/* 📈 LIVE PRODUCT METRICS */}
      <div className="max-w-6xl mx-auto grid grid-cols-2 lg:grid-cols-4 gap-4 px-4 py-12">
        {[
          { value: "95%", label: "Accessibility Score", icon: <ShieldCheck size={20} className="text-emerald-500" /> },
          { value: "<3s", label: "Interaction Delay", icon: <Zap size={20} className="text-brandGold" /> },
          { value: "150+", label: "Design Components", icon: <Layers size={20} className="text-brandBlue" /> },
          { value: "WCAG", label: "2.1 Compliant", icon: <Globe size={20} className="text-blue-400" /> },
        ].map((item, i) => (
          <div key={i} className="p-8 bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-3xl text-center shadow-sm">
            <div className="w-10 h-10 bg-slate-100 dark:bg-white/5 rounded-xl flex items-center justify-center mx-auto mb-4">{item.icon}</div>
            <div className="text-3xl font-black text-slate-900 dark:text-white mb-1">{item.value}</div>
            <p className="text-slate-500 dark:text-neutral-400 text-xs font-bold uppercase tracking-widest">{item.label}</p>
          </div>
        ))}
      </div>

      {/* ⚡ ROI CALCULATOR STYLE STATS */}
      <div className="max-w-6xl mx-auto px-4 py-20">
        <div className="bg-brandBlue text-white rounded-[3rem] p-8 md:p-16 flex flex-col lg:flex-row gap-12 items-center">
          <div className="flex-1 space-y-6">
            <h2 className="text-3xl md:text-4xl font-black leading-tight">Design that converts.</h2>
            <p className="text-blue-100 text-lg">Great UX is more than just visuals—it's a quantifiable asset. We reduce friction and increase user lifetime value.</p>
            <div className="grid grid-cols-2 gap-4 pt-4">
              <div className="p-6 bg-white/10 rounded-2xl backdrop-blur">
                <p className="text-3xl font-black text-white">+40%</p>
                <p className="text-xs text-blue-200 uppercase font-bold">User Retention</p>
              </div>
              <div className="p-6 bg-white/10 rounded-2xl backdrop-blur">
                <p className="text-3xl font-black text-white">-50%</p>
                <p className="text-xs text-blue-200 uppercase font-bold">Dev Friction</p>
              </div>
            </div>
          </div>
          <div className="flex-1 w-full max-w-md bg-white text-slate-900 p-8 rounded-[2rem] shadow-2xl">
            <h3 className="font-bold mb-6 flex items-center gap-2"><BarChart3 size={20} className="text-brandBlue"/> UX Impact Delta</h3>
            <div className="space-y-4">
              {[
                { label: "Unstructured UI", val: 82, color: "bg-red-400" },
                { label: "Strategic UX System", val: 14, color: "bg-emerald-400" }
              ].map((bar, i) => (
                <div key={i} className="space-y-2">
                  <div className="flex justify-between text-xs font-bold uppercase text-slate-500">
                    <span>{bar.label}</span>
                    <span>{bar.val}% task complexity</span>
                  </div>
                  <div className="h-4 bg-slate-100 rounded-full overflow-hidden">
                    <motion.div initial={{ width: 0 }} whileInView={{ width: `${bar.val}%` }} className={`h-full ${bar.color}`} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* 🧩 DESIGN SERVICES GRID */}
      <div className="max-w-7xl mx-auto px-4 py-24">
        <div className="text-center mb-16 space-y-4">
          <h2 className="text-4xl font-black">Strategic Design Capabilities</h2>
          <p className="text-slate-600 dark:text-neutral-400">Comprehensive UI/UX solutions from research to developer handoff.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {serviceGrid.map(({ title, desc, icon }, i) => (
            <div key={i} className="group p-8 bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-[2rem] hover:border-brandBlue transition-all duration-500 shadow-sm hover:shadow-xl">
              <div className="text-4xl mb-6 group-hover:scale-110 transition">{icon}</div>
              <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-4 group-hover:text-brandBlue transition">{title}</h3>
              <p className="text-slate-600 dark:text-neutral-300 leading-relaxed mb-6">{desc}</p>
              <NavLink to={`/services/${title.toLowerCase().replace(/ & /g, '-').replace(/[^a-z0-9]/g, '-')}`} className="text-brandBlue font-semibold flex items-center gap-2 group-hover:translate-x-2 transition">
                View Handoff Process <ArrowRight size={16} />
              </NavLink>
            </div>
          ))}
        </div>
      </div>

      {/* 🛠️ DESIGN STACK */}
      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="bg-slate-100 dark:bg-white/5 rounded-[3rem] p-10 md:p-16 border border-slate-200 dark:border-white/10 text-center space-y-8">
          <h2 className="text-3xl font-black">Industry Standard Tools.</h2>
          <p className="text-slate-600 dark:text-neutral-400 max-w-2xl mx-auto">We use the most powerful design and collaboration tools to ensure seamless execution and handoff.</p>
          <div className="flex flex-wrap justify-center gap-6 opacity-40 grayscale">
            {["Figma", "Framer", "Adobe XD", "Miro", "Zeplin", "Sketch"].map(tool => (
              <span key={tool} className="px-6 py-3 bg-white dark:bg-neutral-800 rounded-xl font-bold border border-slate-200 dark:border-white/5">{tool}</span>
            ))}
          </div>
        </div>
      </div>

      {/* 💰 PRICING */}
      <div className="max-w-7xl mx-auto px-4 py-24">
        <div className="text-center mb-16 space-y-4">
          <h2 className="text-4xl font-black">Tailored Design Packages</h2>
          <p className="text-slate-600 dark:text-neutral-400">User-centered design packages for digital products.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {pricingPackages.slice(0,12).map((pkg, i) => (
            <PricingCard key={i} title={pkg.name} price={pkg.price.replace('₦', '')} duration="project" features={pkg.features} highlighted={pkg.highlighted} />
          ))}
        </div>
      </div>

      {/* 🏢 ENTERPRISE & SECURITY */}
      <div className="max-w-6xl mx-auto px-4 pb-24 grid md:grid-cols-2 gap-8">
        <div className="bg-slate-900 text-white rounded-[3rem] p-10 space-y-6 border border-white/5">
          <h3 className="text-3xl font-bold">Enterprise Needs?</h3>
          <p className="text-slate-400">Custom design systems for multi-product organizations, dedicated designers, and on-site UX consulting.</p>
          <NavLink to="/contact" className="inline-block px-8 py-3 bg-brandGold text-black rounded-xl font-black">Contact Enterprise</NavLink>
        </div>
        <div className="bg-white dark:bg-white/5 rounded-[3rem] p-10 border border-slate-200 dark:border-white/10 flex flex-col justify-center items-center text-center">
          <ShieldCheck size={48} className="text-brandBlue mb-4" />
          <p className="font-bold text-xl">Accessible & Compliant</p>
          <p className="text-sm text-slate-500 mt-2">Every design is audited for WCAG 2.1 compliance and accessibility to ensure an inclusive experience for all users.</p>
        </div>
      </div>

      {/* ❓ FAQ SECTION */}
      <div className="max-w-4xl mx-auto px-4 py-24">
        <h2 className="text-4xl font-black text-center mb-16">Questions About Design</h2>
        <div className="space-y-4">
          {faqs.map((faq, i) => (
            <div key={i} className="bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-3xl overflow-hidden transition-colors">
              <button onClick={() => toggleFaq(i)} className="w-full p-6 text-left flex justify-between items-center">
                <span className="font-bold text-lg text-slate-900 dark:text-white">{faq.q}</span>
                {openFaq === i ? <Minus size={20} className="text-brandBlue" /> : <Plus size={20} className="text-brandBlue" />}
              </button>
              <AnimatePresence>
                {openFaq === i && (
                  <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="px-6 pb-6 text-slate-600 dark:text-neutral-400 leading-relaxed">
                    {faq.a}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>

      {/* 🚀 FINAL CTA */}
      <div className="max-w-6xl mx-auto px-4 py-24 text-center">
        <motion.div initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} className="bg-slate-100 dark:bg-white/5 p-12 md:p-24 rounded-[4rem] border border-slate-200 dark:border-white/10 space-y-8">
          <h2 className="text-4xl md:text-6xl font-black">Ready to elevate your <br /> user experience?</h2>
          <p className="text-slate-600 dark:text-neutral-400 text-lg max-w-2xl mx-auto">Join 150+ teams delivering better results through strategic UI/UX design.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-8">
            <NavLink to="/startproject" className="px-12 py-5 bg-brandBlue text-white rounded-2xl font-black text-xl hover:scale-105 transition shadow-2xl">
              Start Design Project
            </NavLink>
            <a href="https://wa.me/2348113722088" className="px-12 py-5 bg-green-600 text-white rounded-2xl font-black text-xl hover:scale-105 transition shadow-2xl flex items-center justify-center gap-2">
              <MessageCircle size={24} /> Talk to Design Team
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
