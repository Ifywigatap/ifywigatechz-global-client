import { useState, useEffect, useRef } from 'react'
import { Helmet } from 'react-helmet-async'
import { NavLink } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronLeft, ChevronRight, X, Send, Loader2, CheckCircle } from 'lucide-react'
import PricingCard from '../components/PricingCard'
import PageWrapper from '../components/PageWrapper'
import contactService from '../services/contact'
import { PRICING_CONFIG } from '../data/pricingConfig'

const hireStats = [
  { value: '50+', label: 'Projects Delivered' },
  { value: '20+', label: 'Satisfied Clients' },
  { value: '100%', label: 'Success Rate' },
  { value: '2 Weeks', label: 'Avg Delivery Time' },
  { value: '5.0', label: 'Client Rating' },
  { value: '100%', label: 'Satisfaction Guarantee' }
];

const hirePackages = [
  {
    title: "Freelance Developer",
    price: PRICING_CONFIG.hire.freelance.current,
    originalPrice: PRICING_CONFIG.hire.freelance.original,
    duration: "project",
    highlighted: true,
    features: [
      'Custom web/mobile apps',
      'Full-stack development',
      '1-2 week delivery',
      'Unlimited revisions',
      'Source code handover',
      '3 months support'
    ]
  },
  {
    title: "Monthly Retainer",
    price: PRICING_CONFIG.hire.retainer.current,
    originalPrice: PRICING_CONFIG.hire.retainer.original,
    duration: "month",
    features: [
      '40 hours/month',
      'Priority support',
      'Ongoing maintenance',
      'New features',
      'Performance optimization'
    ]
  },
  {
    title: "Enterprise Partnership",
    price: "Custom",
    duration: "long-term",
    features: [
      'Dedicated developer',
      'SLA & priority',
      'Code reviews',
      'Team collaboration',
      'Ongoing roadmap'
    ]
  }
];

const skillHighlights = [
  { title: 'MERN Stack', icon: '🚀', desc: 'React, Node.js, MongoDB, Express' },
  { title: 'UI/UX Design', icon: '🎨', desc: 'Figma, Prototypes, Design Systems' },
  { title: 'Mobile Apps', icon: '📱', desc: 'React Native, Native Android/iOS' },
  { title: 'Payments', icon: '💳', desc: 'Paystack, Stripe Integration' },
  { title: 'SEO & Performance', icon: '⚡', desc: 'Lighthouse 100%, Core Web Vitals' },
  { title: 'Deployment', icon: '☁️', desc: 'Vercel, Netlify, Custom Servers' }
];

const processSteps = [
  { step: '1', title: 'Discovery Call', desc: '30min call to understand your vision & goals', icon: '📞' },
  { step: '2', title: 'Proposal & Quote', desc: 'Detailed scope, timeline, pricing within 24h', icon: '📋' },
  { step: '3', title: 'Milestone Delivery', desc: 'Weekly updates, 2-week sprints, live demos', icon: '✅' },
  { step: '4', title: 'Deployment & Support', desc: 'Production launch + 30 days free support', icon: '🎉' }
];

const reviews = [
  {
    name: "Kingsley O.",
    role: "CEO, Builders Ltd",
    content: "The web solution delivered was top-notch. Speed and quality were exceptional. My business visibility improved massively after the redesign.",
    rating: 5,
    avatar: "https://res.cloudinary.com/dufcon4jl/image/upload/v1776690565/herosection_zoojoq.png"
  },
  {
    name: "Amina Y.",
    role: "Founder, EduTech",
    content: "Professional MERN developer who understands UX. The transition from Figma to code was pixel-perfect. Highly recommended!",
    rating: 5,
    avatar: "https://res.cloudinary.com/dufcon4jl/image/upload/v1776690565/herosection_zoojoq.png"
  },
  {
    name: "David K.",
    role: "Marketing Manager",
    content: "Building our e-commerce platform was seamless. The attention to detail and responsiveness is rare to find. A true partner.",
    rating: 5,
    avatar: "https://res.cloudinary.com/dufcon4jl/image/upload/v1776690565/herosection_zoojoq.png"
  }
];

export default function Hireme() {
  const [current, setCurrent] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formLoading, setFormLoading] = useState(false);
  const [formSuccess, setFormSuccess] = useState(false);
  const [formError, setFormError] = useState('');
  const [collaborationForm, setCollaborationForm] = useState({
    name: '',
    email: '',
    category: '',
    message: ''
  });

  const touchStartX = useRef(0);
  const touchEndX = useRef(0);
  const swipeThreshold = 50; // Pixels to consider a swipe

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % reviews.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const nextReview = () => setCurrent((prev) => (prev + 1) % reviews.length);
  const prevReview = () => setCurrent((prev) => (prev - 1 + reviews.length) % reviews.length);

  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e) => {
    // Optional: could add logic here to prevent vertical scrolling if horizontal swipe is dominant
  };

  const handleTouchEnd = (e) => {
    touchEndX.current = e.changedTouches[0].clientX;
    const distance = touchStartX.current - touchEndX.current;

    if (distance > swipeThreshold) {
      nextReview(); // Swiped left
    } else if (distance < -swipeThreshold) {
      prevReview(); // Swiped right
    }
  };

  const handleCollabChange = (e) => {
    const { name, value } = e.target;
    setCollaborationForm(prev => ({ ...prev, [name]: value }));
  };

  const handleCollaborationSubmit = async (e) => {
    e.preventDefault();
    setFormError('');

    // 1. Email validation regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(collaborationForm.email)) {
      setFormError('Please enter a valid email address.');
      return;
    }

    setFormLoading(true);

    try {
      await contactService.submitContact({
        name: collaborationForm.name,
        email: collaborationForm.email,
        subject: `New Collaboration Inquiry: ${collaborationForm.category}`,
        message: collaborationForm.message,
        category: 'hiring' // Tagging this as a hiring lead
      });

      setFormSuccess(true);
      setCollaborationForm({ name: '', email: '', category: '', message: '' }); // Reset
      setTimeout(() => {
        setIsModalOpen(false);
        setFormSuccess(false);
      }, 2500);
    } catch (err) {
      setFormError(err.message || "Failed to send inquiry. Please try again.");
    } finally {
      setFormLoading(false);
    }
  };

  // Clear errors when modal closes
  useEffect(() => {
    if (!isModalOpen) setFormError('');
  }, [isModalOpen]);

  return (
    <PageWrapper>
      <section className="relative overflow-hidden min-h-screen bg-gradient-to-br from-slate-50 via-purple-50 to-blue-50 dark:from-slate-950 dark:via-purple-950 dark:to-blue-950 transition-colors duration-300 container-wide py-20 selection:bg-brandBlue/30">
        {/* SEO */}
        <Helmet>
          <title>Hire Me | IFYWIGATECHZ | MERN Developer & UI/UX Designer</title>
          <meta name="description" content="Hire professional MERN stack developer & UI/UX designer for your next project. Web apps, mobile apps, custom SaaS solutions." />
        </Helmet>

        {/* HERO SECTION */}
        <div className="mx-auto grid grid-cols-1 w-full max-w-7xl gap-12 lg:grid-cols-[1.2fr_0.8fr] items-center mb-24 px-4 sm:px-6">
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-8"
          >
            <div className="inline-flex items-center gap-3 rounded-full border border-slate-300 dark:border-white/10 bg-white/60 dark:bg-white/5 px-4 py-2 text-sm text-slate-700 dark:text-neutral-300 shadow-sm backdrop-blur transition-colors duration-300">
              <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-brandGold/20 text-brandGold">✨</span>
              Available for new projects
            </div>

            <div>
              <h1 className="text-4xl font-black tracking-tight text-slate-900 dark:text-white sm:text-6xl lg:text-7xl leading-tight">
                Hire a MERN Developer & UI/UX Designer Who Delivers Impactful Products.
              </h1>
              <p className="mt-6 max-w-3xl text-lg text-slate-700 dark:text-neutral-300 leading-relaxed sm:text-xl">
                I build fast, polished web apps, SaaS solutions, and user-centered interfaces that help your brand convert more customers and scale smoothly.
              </p>
            </div>

            <div className="grid-responsive sm:grid-cols-2 xl:grid-cols-3">
              {[
                { label: 'Web Apps', value: 'React + Node.js' },
                { label: 'Design', value: 'Figma + UX systems' },
                { label: 'Launch', value: 'Fast deployment' }
              ].map((item, idx) => (
                <div key={idx} className="rounded-3xl border border-slate-200 dark:border-white/10 bg-white/60 dark:bg-white/5 px-6 py-5 shadow-xl shadow-brandBlue/10 transition-colors duration-300">
                  <p className="text-sm uppercase tracking-[0.2em] text-slate-500 dark:text-neutral-400">{item.label}</p>
                  <p className="mt-3 text-xl font-semibold text-slate-900 dark:text-white">{item.value}</p>
                </div>
              ))}
            </div>

            <div className="flex-responsive items-center sm:items-start">
              <NavLink to="/start-project" className="btn btn-primary px-12 py-4 text-xl shadow-2xl transition-transform duration-300 hover:-translate-y-1">
                Start My Project →
              </NavLink>
              <a href="mailto:ifywigatech9@gmail.com?subject=Project%20Inquiry&body=Hi%20IFYWIGATECHZ%2C%0AI%27m%20interested%20in%20hiring%20you%20for..." className="inline-flex items-center justify-center rounded-3xl border border-brandBlue/30 dark:border-white/20 bg-white/50 dark:bg-white/10 px-12 py-4 text-base font-semibold text-brandBlue dark:text-white transition hover:bg-white/80 dark:hover:bg-white/20">
                Email Me 📧
              </a>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="relative rounded-[2rem] border border-slate-300 dark:border-white/10 bg-gradient-to-br from-white/40 via-white/20 dark:from-white/5 dark:via-white/5 to-transparent p-6 shadow-2xl shadow-brandBlue/20 backdrop-blur-xl ring-1 ring-slate-200 dark:ring-white/10 transition-colors duration-300"
          >
            <div className="absolute inset-x-0 top-0 h-1 rounded-full bg-brandGold/80 blur-xl" />
            <img src="https://res.cloudinary.com/dufcon4jl/image/upload/v1776683007/hireme_vfxrva.png" alt="IFYWIGATECHZ" className="h-full min-h-[40px] w-full rounded-[0.75rem] object-cover shadow-2xl" />
          </motion.div>
        </div>

        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="grid-responsive sm:grid-cols-2 md:grid-cols-3 rounded-[2rem] border border-slate-200 dark:border-white/10 bg-white/80 dark:bg-white/5 p-6 shadow-2xl shadow-brandBlue/10 backdrop-blur-md transition-colors duration-300">
            {hireStats.map((item, idx) => (
              <div key={idx} className="rounded-3xl bg-slate-100 dark:bg-neutral-950/70 p-6 text-center">
                <p className="text-5xl font-extrabold text-slate-900 dark:text-white">{item.value}</p>
                <p className="mt-3 text-sm uppercase tracking-[0.24em] text-slate-500 dark:text-neutral-400">{item.label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* HIRE PACKAGES */}
        <div className="max-w-6xl mx-auto mb-24 px-4 sm:px-6">
          <div className="mb-12 mt-24 rounded-[2rem] border border-slate-200 dark:border-brandBlue/20 bg-white/80 dark:bg-neutral-950/70 p-8 text-center shadow-2xl shadow-brandBlue/15 transition-colors duration-300">
            <h2 className="text-4xl font-black text-slate-900 dark:text-white sm:text-5xl">Hire Packages</h2>
            <p className="mt-4 text-lg text-slate-600 dark:text-neutral-300 max-w-2xl mx-auto">
              Flexible pricing options for one-off projects, monthly retainers, or enterprise partnerships with premium support.
            </p>
          </div>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {hirePackages.map((pkg, idx) => (
              <div key={idx} className="rounded-[2rem] border border-slate-200 dark:border-white/10 bg-white/80 dark:bg-neutral-900/80 p-4 shadow-xl shadow-brandBlue/10 transition hover:-translate-y-1 hover:border-brandBlue/30">
                <PricingCard
                  title={pkg.title}
                  price={pkg.price}
                  duration={pkg.duration}
                  highlighted={pkg.highlighted}
                  originalPrice={pkg.originalPrice}
                  features={pkg.features}
                />
              </div>
            ))}
          </div>
        </div>

        {/* SKILLS HIGHLIGHTS */}
        <div className="max-w-6xl mx-auto mb-24 px-4 sm:px-6">
          <div className="grid-responsive sm:grid-cols-2 lg:grid-cols-3">
            {skillHighlights.map(({ title, icon, desc }, i) => (
              <motion.div 
                key={i} 
                whileInView={{ opacity: 1, y: 0 }}
                initial={{ opacity: 0, y: 20 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="group rounded-[2rem] border border-slate-200 dark:border-white/10 bg-white/80 dark:bg-neutral-900/80 p-8 text-center transition hover:-translate-y-1 hover:border-brandBlue dark:hover:border-brandGold/30 hover:bg-slate-50 dark:hover:bg-white/5"
              >
                <div className="mx-auto mb-6 inline-flex h-20 w-20 items-center justify-center rounded-3xl bg-brandBlue/10 text-5xl text-brandBlue">
                  {icon}
                </div>
                <h3 className="text-2xl font-semibold text-slate-900 dark:text-white mb-4 group-hover:text-brandBlue dark:group-hover:text-brandGold transition-colors">{title}</h3>
                <p className="text-slate-600 dark:text-neutral-400">{desc}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* REVIEWS SLIDER */}
        <div className="max-w-4xl mx-auto mb-24 px-4 sm:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-black text-slate-900 dark:text-white sm:text-4xl">Client Success Stories</h2>
          </div>
          <div className="relative flex flex-col items-center group/slider">
            <div className="relative w-full">
              {/* Arrow Left */}
              <button 
                onClick={prevReview}
                className="absolute -left-4 sm:-left-16 top-1/2 -translate-y-1/2 z-20 p-3 rounded-full bg-white/80 dark:bg-slate-800/80 border border-slate-200 dark:border-white/10 shadow-xl opacity-0 group-hover/slider:opacity-100 transition-all hover:bg-white dark:hover:bg-slate-700 active:scale-95"
                aria-label="Previous review"
              >
                <ChevronLeft size={24} className="text-slate-700 dark:text-white" />
              </button>

              {/* Arrow Right */}
              <button 
                onClick={nextReview}
                className="absolute -right-4 sm:-right-16 top-1/2 -translate-y-1/2 z-20 p-3 rounded-full bg-white/80 dark:bg-slate-800/80 border border-slate-200 dark:border-white/10 shadow-xl opacity-0 group-hover/slider:opacity-100 transition-all hover:bg-white dark:hover:bg-slate-700 active:scale-95"
                aria-label="Next review"
              >
                <ChevronRight size={24} className="text-slate-700 dark:text-white" />
              </button>

              <AnimatePresence mode="wait">
                <motion.div
                  key={current}
                  initial={{ opacity: 0, scale: 0.95, y: 10 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95, y: -10 }}
                  transition={{ duration: 0.4 }}
                  onTouchStart={handleTouchStart}
                  onTouchMove={handleTouchMove}
                  onTouchEnd={handleTouchEnd}
                  className="w-full bg-white dark:bg-neutral-900/80 p-8 sm:p-12 rounded-[2.5rem] border border-slate-200 dark:border-white/10 shadow-2xl shadow-brandBlue/5 text-center backdrop-blur-xl"
                >
                  <div className="flex justify-center gap-1 mb-6">
                    {[...Array(reviews[current].rating)].map((_, i) => (
                      <span key={i} className="text-brandGold text-xl">⭐</span>
                    ))}
                  </div>
                  <p className="text-xl sm:text-2xl italic font-medium text-slate-700 dark:text-neutral-200 mb-8 leading-relaxed">
                    "{reviews[current].content}"
                  </p>
                  <div className="flex items-center justify-center gap-4">
                    <img src={reviews[current].avatar} alt={reviews[current].name} className="w-14 h-14 rounded-full object-cover border-2 border-brandBlue shadow-lg" />
                    <div className="text-left">
                      <p className="font-bold text-slate-900 dark:text-white text-lg">{reviews[current].name}</p>
                      <p className="text-sm text-slate-500 dark:text-neutral-400 font-medium tracking-wide">{reviews[current].role}</p>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
            
            <div className="flex gap-3 mt-10">
              {reviews.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrent(i)}
                  className={`h-2 rounded-full transition-all duration-300 ${current === i ? 'w-10 bg-brandBlue' : 'w-2 bg-slate-300 dark:bg-slate-700'}`}
                  aria-label={`Go to review ${i + 1}`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* PROCESS */}
        <div className="max-w-6xl mx-auto mb-24 px-4 sm:px-6">
          <div className="mb-12 rounded-[2rem] border border-slate-200 dark:border-brandBlue/20 bg-white/80 dark:bg-neutral-950/70 p-10 text-center shadow-2xl shadow-brandBlue/10 transition-colors duration-300">
            <h2 className="text-4xl font-black text-slate-900 dark:text-white sm:text-5xl">How We Work Together</h2>
            <p className="mt-4 text-lg text-slate-600 dark:text-neutral-300 max-w-3xl mx-auto">
              A clear, collaborative process that keeps you informed at every stage and delivers on schedule.
            </p>
          </div>

          <div className="grid-responsive md:grid-cols-4">
            {processSteps.map(({ step, title, desc, icon }, i) => (
              <motion.div 
                key={i} 
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                className="group rounded-[2rem] border border-slate-200 dark:border-white/10 bg-white/80 dark:bg-neutral-900/80 p-8 text-center transition hover:-translate-y-1 hover:border-emerald-400/40 hover:bg-emerald-50 dark:hover:bg-emerald-500/5"
              >
                <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-3xl bg-emerald-500/15 text-3xl text-emerald-300 mb-5">
                  {icon}
                </div>
                <div className="mb-4 text-3xl font-black text-emerald-400">{step}</div>
                <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-4">{title}</h3>
                <p className="text-slate-600 dark:text-neutral-300">{desc}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* CTA SECTION */}
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="rounded-[2.5rem] border border-emerald-200 dark:border-white/10 bg-gradient-to-r from-emerald-600/95 to-teal-600/95 p-10 shadow-2xl shadow-brandBlue/20 backdrop-blur-xl transition-colors duration-300">
            <div className="text-center space-y-8">
              <h2 className="text-4xl font-black text-white sm:text-5xl">Let's Build Something Amazing</h2>
              <p className="mx-auto max-w-3xl text-xl text-white/90">
                Join 50+ happy clients who trusted me with their digital transformation.
              </p>

              <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-center">
                <button 
                  onClick={() => setIsModalOpen(true)} 
                  className="btn btn-primary px-16 py-5 text-xl shadow-2xl transition hover:-translate-y-1"
                >
                  Start Collaboration
                </button>
                <div className="flex flex-wrap gap-4 justify-center text-white/90">
                  <a href="https://wa.me/2348113722088?text=Hi%20IFYWIGATECHZ%2C%20I'm%20ready%20to%20hire%20you!" className="rounded-3xl border border-white/20 bg-white/10 px-6 py-4 transition hover:bg-white/20">
                    WhatsApp
                  </a>
                  <a href="mailto:ifywigatech9@gmail.com?subject=Hiring%20Inquiry" className="rounded-3xl border border-white/20 bg-white/10 px-6 py-4 transition hover:bg-white/20">
                    Email
                  </a>
                  <a href="/resume.pdf" className="rounded-3xl border border-white/20 bg-white/10 px-6 py-4 transition hover:bg-white/20">
                    Resume
                  </a>
                </div>
              </div>

              <div className="mt-12 flex flex-wrap justify-center gap-8 border-t border-white/20 pt-8 text-white/90">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">⭐⭐⭐⭐⭐</span>
                  <span>5.0 (50+ Reviews)</span>
                </div>
                <div className="flex items-center gap-3">
                  <span>⏱️</span>
                  <span>Avg 2-Week Delivery</span>
                </div>
                <div className="flex items-center gap-3">
                  <span>💻</span>
                  <span>100% Satisfaction</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* COLLABORATION MODAL */}
        <AnimatePresence>
          {isModalOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[1000] flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm"
              onClick={() => !formLoading && setIsModalOpen(false)}
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0, y: 20 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.9, opacity: 0, y: 20 }}
                className="bg-white dark:bg-slate-900 w-full max-w-lg rounded-[2.5rem] overflow-hidden shadow-2xl border border-slate-200 dark:border-white/10"
                onClick={(e) => e.stopPropagation()}
              >
                {/* Header */}
                <div className="flex items-center justify-between p-6 border-b border-slate-100 dark:border-white/5">
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white px-2">Project Inquiry</h3>
                  <button 
                    onClick={() => setIsModalOpen(false)}
                    className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-white/10 transition-colors text-slate-500"
                  >
                    <X size={20} />
                  </button>
                </div>

                <div className="p-8">
                  {!formSuccess ? (
                    <form onSubmit={handleCollaborationSubmit} className="space-y-5">
                      {formError && (
                        <div className="p-3 bg-red-500/10 border border-red-500/30 text-red-500 dark:text-red-400 rounded-xl text-xs text-center font-medium">
                          {formError}
                        </div>
                      )}
                      <div className="space-y-4">
                        <input
                          type="text"
                          name="name"
                          required
                          value={collaborationForm.name}
                          onChange={handleCollabChange}
                          placeholder="Your Name"
                          className="w-full px-4 py-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-white/10 text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-brandBlue transition-all"
                        />
                        <input
                          type="email"
                          name="email"
                          required
                          value={collaborationForm.email}
                          onChange={handleCollabChange}
                          placeholder="Email Address"
                          className="w-full px-4 py-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-white/10 text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-brandBlue transition-all"
                        />
                        <select 
                          name="category"
                          required
                          value={collaborationForm.category}
                          onChange={handleCollabChange}
                          className="w-full px-4 py-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-white/10 text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-brandBlue transition-all"
                        >
                          <option value="">Project Category</option>
                          <option value="Web Development">Web Development</option>
                          <option value="UI/UX Design">UI/UX Design</option>
                          <option value="Mobile App">Mobile App</option>
                          <option value="SaaS Development">SaaS Development</option>
                        </select>
                        <textarea
                          name="message"
                          placeholder="What can I help you build?"
                          rows={4}
                          required
                          value={collaborationForm.message}
                          onChange={handleCollabChange}
                          className="w-full px-4 py-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-white/10 text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-brandBlue resize-none transition-all"
                        ></textarea>
                      </div>

                      <button
                        type="submit"
                        disabled={formLoading}
                        className="w-full py-4 bg-brandBlue text-white font-bold rounded-2xl shadow-lg hover:shadow-brandBlue/30 transition-all flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
                      >
                        {formLoading ? (
                          <>
                            <Loader2 className="animate-spin" size={20} />
                            Sending...
                          </>
                        ) : (
                          <>
                            <Send size={18} />
                            Send Inquiry
                          </>
                        )}
                      </button>
                    </form>
                  ) : (
                    <motion.div 
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="py-12 text-center space-y-4"
                    >
                      <CheckCircle className="mx-auto text-green-500" size={64} />
                      <h4 className="text-2xl font-bold text-slate-900 dark:text-white">Message Sent!</h4>
                      <p className="text-slate-600 dark:text-slate-400">I'll get back to you personally within 24 hours.</p>
                    </motion.div>
                  )}
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </section>
    </PageWrapper>
  )
}
