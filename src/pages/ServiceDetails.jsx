import { useState } from "react";
import { useParams, NavLink, Link } from "react-router-dom";
import { services } from "../data/services";
import { Helmet } from "react-helmet-async";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle, Zap, ShieldCheck, Globe, Cpu, BarChart3, Layers, Plus, Minus, ArrowRight, MessageCircle } from "lucide-react";

export default function ServiceDetails() {
  const { slug } = useParams();
  const service = services.find((s) => s.slug === slug);
  const [openFaq, setOpenFaq] = useState(null);

  if (!service) {
    return <div className="section text-slate-900 dark:text-white text-center transition-colors duration-300">Service not found</div>;
  }

  const toggleFaq = (i) => setOpenFaq(openFaq === i ? null : i);

  const faqs = service.faqs || [
    { q: `How secure is ${service.name}?`, a: "We use bank-grade encryption and follow industry standard compliance protocols (SOC2, GDPR) to ensure your data is always safe." },
    { q: "Can we integrate with our existing tools?", a: "Yes, our platform features a robust API and pre-built integrations for Slack, Google Workspace, and 100+ other enterprise tools." },
    { q: "Is there a limit on user growth?", a: "No, our architecture is built to scale elastically. Whether you have 10 users or 10,000, we handle the load seamlessly." }
  ];

  const metrics = service.metrics || [
    { value: "99.99%", label: "Platform Uptime", type: "uptime" },
    { value: "250ms", label: "Avg. Response", type: "speed" },
    { value: "125k+", label: "Active Users", type: "growth" },
    { value: "100%", label: "Data Security", type: "security" },
  ];

  const roiStats = service.roi?.stats || [
    { value: "-45%", label: "Operational Cost" },
    { value: "+120%", label: "Team Output" }
  ];

  const roiRoadmap = service.roi?.roadmap || [
    { label: "Legacy Workflow", val: 85, color: "bg-red-400" },
    { label: "Our Optimization", val: 20, color: "bg-emerald-400" }
  ];

  const integrations = service.integrations || ["Slack", "Google", "Dropbox", "Notion", "Airtable", "Stripe"];

  const getMetricIcon = (type) => {
    switch (type) {
      case 'uptime':
        return <Globe size={20} className="text-emerald-500" />;
      case 'speed':
        return <Zap size={20} className="text-brandGold" />;
      case 'growth':
        return <BarChart3 size={20} className="text-brandBlue" />;
      case 'security':
        return <ShieldCheck size={20} className="text-blue-400" />;
      default:
        return <Layers size={20} className="text-brandBlue" />;
    }
  };

  return (
    <section className="bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white transition-colors duration-300 pb-20 overflow-hidden">
      <Helmet>
        <title>{service.name} | IFYWIGATECHZ</title>
        <meta name="description" content={service.desc} />
      </Helmet>

      {/* 🔥 SAAS HERO - Product Positioning */}
      <div className="relative pt-24 pb-16 px-4">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(59,130,246,0.1),_transparent_50%)]" />
        <div className="max-w-6xl mx-auto text-center space-y-8 relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brandBlue/10 border border-brandBlue/20 text-brandBlue text-xs font-bold uppercase tracking-widest"
          >
            <Zap size={14} className="animate-pulse" /> Streamlining {service.category}
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl sm:text-6xl md:text-7xl font-black leading-tight tracking-tight text-slate-900 dark:text-white"
          >
            Master Your <span className="text-brandBlue">{service.name}</span> <br />
            <span className="bg-gradient-to-r from-brandBlue to-cyan-400 bg-clip-text text-transparent">At Scale.</span>
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-lg sm:text-xl text-slate-600 dark:text-neutral-400 max-w-3xl mx-auto"
          >
            {service.fullDesc || "Enterprise-grade solutions designed to accelerate your workflow and maximize efficiency."}
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-4 justify-center pt-4"
          >
            <NavLink
              to="/contact"
              className="px-10 py-4 bg-brandBlue text-white rounded-2xl font-bold hover:bg-blue-700 transition shadow-xl shadow-brandBlue/20 hover:scale-105"
            >
              Start Free Trial
            </NavLink>
            <NavLink
              to="/request-quote"
              className="px-10 py-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/10 rounded-2xl font-bold hover:bg-slate-50 dark:hover:bg-slate-800 transition"
            >
              Request Demo
            </NavLink>
          </motion.div>
        </div>
      </div>

      {/* 🏢 CUSTOMER LOGOS */}
      <div className="max-w-7xl mx-auto py-12 border-y border-slate-200 dark:border-white/5 opacity-50 grayscale hover:grayscale-0 transition-all duration-500">
        <p className="text-center text-xs font-bold uppercase tracking-widest text-slate-500 mb-8">Trusted by teams at</p>
        <div className="flex flex-wrap justify-center gap-8 md:gap-16 items-center px-4">
          {["TechFlow", "GlobalCloud", "InnovateX", "DataCorp", "EcoSystem"].map((brand) => (
            <span key={brand} className="text-xl sm:text-2xl font-black text-slate-400 dark:text-neutral-600">{brand}</span>
          ))}
        </div>
      </div>

      {/* 🖼️ PRODUCT DASHBOARD PREVIEW & SCREENSHOTS */}
      <div className="max-w-6xl mx-auto px-4 py-20">
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative group"
        >
          <div className="absolute -inset-4 bg-gradient-to-r from-brandBlue/20 to-cyan-400/20 blur-2xl rounded-[2.5rem] opacity-0 group-hover:opacity-100 transition duration-1000"></div>
          <div className="relative rounded-[2rem] overflow-hidden border-8 border-slate-900 shadow-2xl bg-slate-800">
            {/* Fake Browser Top Bar */}
            <div className="bg-slate-900 p-4 flex gap-2">
              <div className="w-3 h-3 rounded-full bg-red-500"></div>
              <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
              <div className="w-3 h-3 rounded-full bg-green-500"></div>
            </div>
            <img
              src={service.image || "/images/dashboard-preview.jpg"}
              alt="Product Dashboard Preview"
              className="w-full h-auto object-cover"
            />
          </div>
        </motion.div>
      </div>

      {/* 📈 LIVE PRODUCT METRICS & USER GROWTH */}
      <div className="max-w-6xl mx-auto grid grid-cols-2 lg:grid-cols-4 gap-4 px-4 py-12">
        {metrics.map((item, i) => (
          <div key={i} className="p-8 bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-3xl text-center hover:border-brandBlue/30 transition shadow-sm">
            <div className="w-10 h-10 bg-slate-100 dark:bg-white/5 rounded-xl flex items-center justify-center mx-auto mb-4">
              {getMetricIcon(item.type)}
            </div>
            <div className="text-3xl font-black text-slate-900 dark:text-white mb-1">
              {item.value}
            </div>
            <p className="text-slate-500 dark:text-neutral-400 text-xs font-bold uppercase tracking-widest">{item.label}</p>
          </div>
        ))}
      </div>

      {/* ⚡ ROI CALCULATOR STYLE STATS */}
      <div className="max-w-6xl mx-auto px-4 py-20">
        <div className="bg-brandBlue text-white rounded-[3rem] p-8 md:p-16 flex flex-col lg:flex-row gap-12 items-center">
          <div className="flex-1 space-y-6">
            <h2 className="text-3xl md:text-4xl font-black leading-tight">Quantifiable ROI for your business.</h2>
            <p className="text-blue-100 text-lg">Stop guessing. Our {service.name} solution provides measurable impact from day one.</p>
            <div className="grid grid-cols-2 gap-4 pt-4">
              {roiStats.map((stat, idx) => (
                <div key={idx} className="p-6 bg-white/10 rounded-2xl backdrop-blur">
                  <p className="text-3xl font-black text-white">{stat.value}</p>
                  <p className="text-xs text-blue-200 uppercase font-bold">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="flex-1 w-full max-w-md bg-white text-slate-900 p-8 rounded-[2rem] shadow-2xl">
            <h3 className="font-bold mb-6 flex items-center gap-2"><BarChart3 size={20} className="text-brandBlue"/> Efficiency Roadmap</h3>
            <div className="space-y-4">
              {roiRoadmap.map((bar, i) => (
                <div key={i} className="space-y-2">
                  <div className="flex justify-between text-xs font-bold uppercase text-slate-500">
                    <span>{bar.label}</span>
                    <span>{bar.val}% friction</span>
                  </div>
                  <div className="h-4 bg-slate-100 rounded-full overflow-hidden">
                    <motion.div 
                      initial={{ width: 0 }}
                      whileInView={{ width: `${bar.val}%` }}
                      className={`h-full ${bar.color}`}
                    />
                  </div>
                </div>
              ))}
              <p className="text-xs text-slate-500 mt-6 italic">*Based on aggregate data from over 50 client implementations.</p>
            </div>
          </div>
        </div>
      </div>

      {/* 🧩 SAAS FEATURES GRID */}
      <div className="max-w-6xl mx-auto px-4 py-24">
        <div className="text-center mb-16 space-y-4">
          <h2 className="text-4xl font-black">Built for the modern enterprise.</h2>
          <p className="text-slate-600 dark:text-neutral-400">Advanced capabilities to help your team move faster.</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {service.features?.map((f, i) => (
            <div key={i} className="group p-4 bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-[2rem] hover:border-brandBlue transition-all duration-300">
              <div className="w-12 h-12 bg-brandBlue/10 text-brandBlue rounded-2xl flex items-center justify-center mb-6 group-hover:bg-brandBlue group-hover:text-white transition-colors">
                <Cpu size={24} />
              </div>
              <h3 className="text-xl font-bold mb-3">{f}</h3>
              <p className="text-sm text-slate-600 dark:text-neutral-400 leading-relaxed">
                Optimized {f.toLowerCase()} architecture designed for high-concurrency environments and data integrity.
              </p>
            </div>
          ))}
        </div>
      </div>

      {/*  INTEGRATIONS SECTION */}
      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="bg-slate-100 dark:bg-white/5 rounded-[3rem] p-10 md:p-16 border border-slate-200 dark:border-white/10 text-center space-y-8">
          <h2 className="text-3xl font-black">Sync with your tech stack.</h2>
          <p className="text-slate-600 dark:text-neutral-400 max-w-2xl mx-auto">Pre-built connectors for your favorite tools. API-first architecture for everything else.</p>
          <div className="flex flex-wrap justify-center gap-6 opacity-40 grayscale">
            {integrations.map(tool => (
              <span key={tool} className="px-6 py-3 bg-white dark:bg-neutral-800 rounded-xl font-bold border border-slate-200 dark:border-white/5">{tool}</span>
            ))}
          </div>
        </div>
      </div>

      {/* 💰 SUBSCRIPTION PRICING */}
      <div className="max-w-7xl mx-auto px-4 py-24">
        <div className="text-center mb-16 space-y-4">
          <h2 className="text-4xl font-black">Transparent Subscription Plans</h2>
          <p className="text-slate-600 dark:text-neutral-400">Choose the plan that matches your current scale.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {service.pricing?.map((plan, i) => (
            <div key={i} className={`relative flex flex-col p-8 rounded-[2.5rem] bg-white dark:bg-neutral-900 border-2 transition-all duration-300 ${plan.popular ? 'border-brandBlue shadow-2xl scale-105 z-10' : 'border-slate-100 dark:border-white/5'}`}>
              {plan.popular && (
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-brandBlue text-white px-4 py-1 rounded-full text-xs font-bold uppercase tracking-widest">Most Popular</div>
              )}
              <div className="mb-8">
                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">{plan.name}</h3>
                <div className="flex items-baseline gap-1">
                  <span className="text-4xl font-black text-slate-900 dark:text-white">{plan.price}</span>
                  <span className="text-slate-500 text-sm">/mo</span>
                </div>
              </div>
              <ul className="space-y-4 mb-10 flex-grow">
                {plan.features.map((f, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-sm text-slate-600 dark:text-neutral-300">
                    <CheckCircle size={18} className="text-brandBlue flex-shrink-0" /> {f}
                  </li>
                ))}
              </ul>
              <NavLink
                to="/contact"
                className={`w-full py-4 rounded-2xl font-bold text-center transition ${plan.popular ? 'bg-brandBlue text-white hover:bg-blue-700' : 'bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white hover:bg-slate-200 dark:hover:bg-slate-700'}`}
              >
                Get Started
              </NavLink>
            </div>
          ))}
        </div>
      </div>

      {/* 🏢 ENTERPRISE SECTION */}
      <div className="max-w-6xl mx-auto px-4 pb-24">
        <div className="bg-slate-900 dark:bg-brandBlue/20 text-white rounded-[3rem] p-10 md:p-16 flex flex-col md:flex-row justify-between items-center gap-8 border border-white/5">
          <div className="space-y-4 text-center md:text-left">
            <h2 className="text-3xl font-bold">Looking for Enterprise?</h2>
            <p className="text-slate-400 max-w-md">Custom security, white-label options, and dedicated account management for large organizations.</p>
          </div>
          <NavLink to="/contact" className="px-10 py-4 bg-brandGold text-black rounded-2xl font-black hover:scale-105 transition shadow-xl">
            Contact Enterprise
          </NavLink>
        </div>
      </div>

      {/* 🛡️ SECURITY & COMPLIANCE */}
      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="flex flex-wrap justify-center items-center gap-8 p-8 border border-slate-200 dark:border-white/10 rounded-3xl bg-white dark:bg-white/5 shadow-sm transition-colors duration-300">
          <div className="flex items-center gap-3">
            <ShieldCheck className="text-emerald-500" size={32} />
            <div>
              <p className="font-bold text-slate-900 dark:text-white">Bank-Grade Security</p>
              <p className="text-xs text-slate-500">AES-256 Bit Encryption</p>
            </div>
          </div>
          <div className="h-10 w-px bg-slate-200 dark:bg-white/10 hidden md:block" />
          <div className="flex gap-4 opacity-50 font-black text-slate-400">
            <span>GDPR</span>
            <span>SOC2</span>
            <span>PCI-DSS</span>
            <span>HIPAA</span>
          </div>
        </div>
      </div>

      {/* ❓ FAQ SECTION */}
      <div className="max-w-4xl mx-auto px-4 py-24">
        <h2 className="text-4xl font-black text-center mb-16">Common Questions</h2>
        <div className="space-y-4">
          {faqs.map((faq, i) => (
            <div key={i} className="bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-3xl overflow-hidden transition-colors duration-300">
              <button 
                onClick={() => toggleFaq(i)}
                className="w-full p-6 text-left flex justify-between items-center"
              >
                <span className="font-bold text-lg text-slate-900 dark:text-white">{faq.q}</span>
                {openFaq === i ? <Minus size={20} className="text-brandBlue" /> : <Plus size={20} className="text-brandBlue" />}
              </button>
              <AnimatePresence>
                {openFaq === i && (
                  <motion.div 
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="px-6 pb-6 text-slate-600 dark:text-neutral-400 leading-relaxed"
                  >
                    {faq.a}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>

      {/* 🚀 FINAL CTA FUNNEL */}
      <div className="max-w-6xl mx-auto px-4 py-24 text-center">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="bg-slate-100 dark:bg-white/5 p-12 md:p-24 rounded-[4rem] border border-slate-200 dark:border-white/10 space-y-8"
        >
          <h2 className="text-4xl md:text-6xl font-black">Ready to scale your <br /> <span className="text-brandBlue">{service.name}</span> project?</h2>
          <p className="text-slate-600 dark:text-neutral-400 text-lg max-w-2xl mx-auto">Join 1,000+ businesses delivering better results with our platform.</p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-8">
            <NavLink to="/contact" className="px-12 py-5 bg-brandBlue text-white rounded-2xl font-black text-xl hover:scale-105 transition shadow-2xl shadow-brandBlue/30">
              Start Your Free Trial
            </NavLink>
            <a href="https://wa.me/2348113722088" className="px-12 py-5 bg-green-600 text-white rounded-2xl font-black text-xl hover:scale-105 transition shadow-2xl flex items-center justify-center gap-2">
              <MessageCircle size={24} /> Talk to Sales
            </a>
          </div>
          <p className="text-sm text-slate-500 font-bold uppercase tracking-widest pt-4">Free migration assistance • Cancel anytime</p>
        </motion.div>
      </div>
    </section>
  );
}