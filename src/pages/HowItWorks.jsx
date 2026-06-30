import { Helmet } from 'react-helmet-async'
import { NavLink, Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react'
import { 
  Search, Target, Paintbrush, Code2, Rocket, 
  MessageSquare, ShieldCheck, TrendingUp, Settings, ChevronDown,
  Zap, Users, CheckCircle, ArrowRight, BarChart3, Globe, Layers, Clock,
} from 'lucide-react'
import FaqItem from './FaqItem'
import { trackEvent } from '../utils/analytics'
import TestimonialSlider from './TestimonialSlider'

export default function HowItWorks() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  const [openFAQ, setOpenFAQ] = useState(null);
  const toggleFAQ = (i) => setOpenFAQ(openFAQ === i ? null : i);

  const faqs = [
    {
      q: "How do you ensure project success?",
      a: "Our process involves detailed discovery, strategic planning, agile development, rigorous QA, and continuous communication to ensure your project meets and exceeds expectations.",
    },
    {
      q: "What technologies do you specialize in?",
      a: "We primarily work with modern web technologies including the MERN stack (MongoDB, Express.js, React, Node.js), Tailwind CSS, Next.js, and various cloud platforms like Vercel and AWS.",
    },
    {
      q: "Can you integrate with our existing systems?",
      a: "Yes, our solutions are built with flexibility in mind. We can integrate with a wide range of third-party APIs, CRMs, payment gateways, and other existing business tools.",
    },
    {
      q: "What kind of support do you offer after launch?",
      a: "We provide comprehensive post-launch support including bug fixes, performance monitoring, security updates, and ongoing maintenance plans to ensure your application runs smoothly.",
    },
  ];


  return (
    <section className="min-h-screen bg-slate-50 dark:bg-slate-950 py-20 px-4 transition-colors duration-300 overflow-hidden relative">
      {/* SEO */}
      <Helmet>
        <title>How It Works | IFYWIGATECHZ Global Services</title>
        <meta
          name="description"
          content="Learn how IFYWIGATECHZ Global Services works — from discovery and design to development, launch, and ongoing support."
        />
      </Helmet>

      {/* Background Decorative Elements */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-96 bg-brandBlue/10 blur-[120px] pointer-events-none" />

      {/* Hero */}
      <header className="text-center space-y-6 max-w-4xl mx-auto relative z-10 mb-20">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brandBlue/10 border border-brandBlue/20 text-brandBlue text-xs font-bold uppercase tracking-widest mx-auto"
        >
          <Zap size={14} className="animate-pulse" /> Precision Execution Model
        </motion.div>
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl md:text-6xl font-black text-slate-900 dark:text-white leading-tight"
        >
          Our <span className="text-brandBlue">Proven</span> Process
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-lg text-slate-600 dark:text-neutral-400 max-w-2xl mx-auto leading-relaxed"
        >
          From conception to deployment and beyond, we follow a transparent, systematic approach to ensure your project succeeds with precision and quality.
        </motion.p>
      </header>

      {/* Process Timeline */}
      <div className="max-w-6xl mx-auto space-y-12 relative z-10 mb-32">
        <h2 className="text-3xl font-black text-slate-900 dark:text-white text-center">Architectural Roadmap</h2>

        <div className="relative">
          {/* Timeline Line */}
          <div className="hidden lg:block absolute top-24 left-0 right-0 h-1 bg-gradient-to-r from-brandBlue/5 via-brandBlue/40 to-brandBlue/5" />

          <motion.div 
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 relative z-10"
          >
            {steps.map((step, index) => {
              const Icon = step.icon;
              return (
                <motion.div
                  key={step.title}
                  variants={itemVariants}
                  className="group flex flex-col items-center lg:items-start"
                >
                  {/* Step Number Circle */}
                  <div className="relative w-20 h-20 mb-8 flex-shrink-0">
                    <div className="absolute inset-0 rounded-3xl bg-white dark:bg-slate-900 border-2 border-slate-200 dark:border-white/10 group-hover:border-brandBlue transition-colors duration-500 shadow-xl flex items-center justify-center">
                      <Icon size={28} className="text-brandBlue group-hover:scale-110 transition-transform duration-500" />
                    </div>
                    <div className="absolute -top-3 -right-3 w-8 h-8 rounded-full bg-brandBlue text-white font-bold text-sm flex items-center justify-center shadow-lg">
                      {index + 1}
                    </div>
                  </div>

                  {/* Card Content */}
                  <div className="space-y-3 text-center lg:text-left">
                    <h3 className="text-xl font-bold text-slate-900 dark:text-white group-hover:text-brandBlue transition-colors">
                      {step.title}
                    </h3>
                    <p className="text-slate-600 dark:text-neutral-400 text-sm leading-relaxed">
                      {step.desc}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </div>

      {/* Process Benefits */}
      <div className="max-w-6xl mx-auto space-y-12 mb-32 relative z-10">
        <h2 className="text-3xl font-black text-slate-900 dark:text-white text-center">The Competitive Advantage</h2>
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {benefits.map((item) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.title}
                variants={itemVariants}
                className="group p-8 bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-[2.5rem] hover:border-brandBlue transition-all duration-500 shadow-sm dark:shadow-none hover:shadow-xl dark:hover:shadow-brandBlue/5"
              >
                <div className="w-12 h-12 bg-brandBlue/10 text-brandBlue rounded-2xl flex items-center justify-center mb-6 group-hover:bg-brandBlue group-hover:text-white transition-colors duration-500">
                  <Icon size={24} />
                </div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">
                  {item.title}
                </h3>
                <p className="text-slate-600 dark:text-neutral-400 text-sm leading-relaxed">
                  {item.desc}
                </p>
              </motion.div>
            );
          })}
        </motion.div>
      </div>

      {/* Stats Section */}
      <section className="py-24 bg-white dark:bg-white/5 border-y border-slate-200 dark:border-white/5 transition-colors duration-300 mb-32 relative z-10">
        <h2 className="text-3xl font-black mb-16 text-slate-900 dark:text-white text-center">Global Performance Impact</h2>
        <div className="max-w-7xl mx-auto grid grid-cols-2 lg:grid-cols-4 gap-8 px-4 text-center">
          {[
            { val: '1000+', label: 'Tech Topics', icon: <Layers size={24} className="text-brandBlue" /> },
            { val: '150+', label: 'Courses', icon: <Globe size={24} className="text-emerald-500" /> },
            { val: '92%', label: 'Job Placement', icon: <Users size={24} className="text-brandGold" /> },
            { val: '4.9/5', label: 'Satisfaction', icon: <CheckCircle size={24} className="text-blue-400" /> }
          ].map((stat, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="space-y-3"
            >
              <div className="w-12 h-12 bg-slate-50 dark:bg-white/5 rounded-xl flex items-center justify-center mx-auto mb-4 shadow-sm border border-slate-100 dark:border-white/10">
                {stat.icon}
              </div>
              <div className="text-3xl md:text-4xl font-black text-slate-900 dark:text-white">{stat.val}</div>
              <p className="text-slate-500 dark:text-neutral-400 text-xs font-bold uppercase tracking-widest">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-24 px-6 relative z-10 max-w-4xl mx-auto overflow-visible">
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-black text-slate-900 dark:text-white mb-4"
          >
            Voices of Success
          </motion.h2>
          <p className="text-slate-600 dark:text-neutral-400">Hear from partners who have scaled through our architectural roadmap.</p>
        </div>
        <TestimonialSlider testimonials={processTestimonials} themeColor="blue" />
        <div className="text-center mt-12">
          <a
            href="https://wa.me/2348113722088?text=Hello%20IFYWIGATECHZ%2C%20I'd%20like%20to%20schedule%20a%20call%20to%20discuss%20a%20project."
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => trackEvent('WhatsApp Click', { location: 'Testimonial Section' })}
            className="inline-flex items-center gap-2 px-8 py-4 bg-brandBlue text-white font-bold rounded-xl shadow-lg shadow-brandBlue/20 hover:bg-blue-700 transition-all hover:scale-105"
          >
            Schedule a Call
            <ArrowRight size={18} />
          </a>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-24 px-6 relative overflow-hidden max-w-3xl mx-auto z-10">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-3xl md:text-4xl font-bold text-center mb-12 text-slate-900 dark:text-slate-100 transition-colors duration-300"
        >
          Common Questions About Our Process
        </motion.h2>

        <div className="space-y-4">
          {faqs.map((faq, i) => (
            <FaqItem 
              key={i} 
              faq={faq} 
              index={i} 
              openIndex={openFAQ} 
              toggle={toggleFAQ} 
              theme="it" 
            />
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <div className="max-w-6xl mx-auto mb-32 relative z-10 px-4">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="bg-brandBlue text-white rounded-[3rem] p-12 md:p-24 text-center space-y-8 shadow-2xl shadow-brandBlue/20 relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 blur-[100px] -mr-48 -mt-48" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-black/10 blur-[80px] -ml-32 -mb-32" />
          
          <div className="relative z-10">
            <h2 className="text-4xl md:text-6xl font-black mb-6 leading-tight">
              Ready to Scale Your <br /> Digital Vision?
            </h2>
            <p className="text-blue-100 text-xl max-w-2xl mx-auto mb-10">
              Let's work together to transform your vision into a high-performance digital solution. Our team is ready to architect your roadmap.
            </p>

            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <NavLink
                to="/contact"
                className="px-12 py-5 bg-white text-brandBlue font-black text-xl rounded-2xl shadow-2xl hover:scale-105 transition-all duration-300"
              >
                Book Consultation
              </NavLink>

              <a
                href="https://wa.me/2348113722088"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackEvent('WhatsApp Click', { location: 'Final CTA' })}
                className="px-12 py-5 bg-green-500 text-white font-black text-xl rounded-2xl shadow-2xl hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2"
              >
                <MessageSquare size={24} /> WhatsApp Us
              </a>
            </div>
          </div>
        </motion.div>

        {/* Next Steps Info */}
        <div className="text-center space-y-4 py-12">
          <h3 className="text-xl font-bold text-slate-900 dark:text-neutral-200 flex items-center justify-center gap-2">
            <Clock size={20} className="text-brandBlue" /> What Happens Next?
          </h3>
          <p className="text-slate-600 dark:text-neutral-400 max-w-xl mx-auto">
            After reaching out, we'll schedule a 30-minute discovery call to discuss your project scope, budget, and timeline. No pressure, just engineering expertise.
          </p>
        </div>
      </div>
    </section>
  )
}

const steps = [
  {
    title: 'Discovery',
    desc: 'We understand your business goals, audience, and project requirements through detailed consultation.',
    icon: Search
  },
  {
    title: 'Planning & Strategy',
    desc: 'We define scope, timelines, tools, and the best technical approach for sustainable success.',
    icon: Target
  },
  {
    title: 'Design',
    desc: 'Beautiful, user-centered UI/UX designs with usability, branding, and conversion in mind.',
    icon: Paintbrush
  },
  {
    title: 'Development',
    desc: 'We build secure, responsive, and scalable solutions using modern technologies and best practices.',
    icon: Code2
  },
  {
    title: 'Launch & Support',
    desc: 'Smooth deployment, testing, and ongoing support with updates and continuous improvements.',
    icon: Rocket
  },
]

const benefits = [
  {
    title: 'Clear Communication',
    desc: 'Transparent updates at every stage with regular check-ins and progress reports.',
    icon: MessageSquare,
  },
  {
    title: 'Quality Assurance',
    desc: 'Rigorous testing for performance, security, usability, and cross-device compatibility.',
    icon: ShieldCheck,
  },
  {
    title: 'Business Focused',
    desc: 'We prioritize results that align with your business goals and ROI targets.',
    icon: TrendingUp,
  },
  {
    title: 'Scalability',
    desc: 'Solutions built to grow with your business from launch to enterprise level.',
    icon: BarChart3,
  },
  {
    title: 'Technical Excellence',
    desc: 'Clean, maintainable code with industry best practices and modern frameworks.',
    icon: Settings,
  },
  {
    title: 'Ongoing Support',
    desc: 'Long-term partnership with maintenance, updates, and continuous optimization.',
    icon: CheckCircle,
  },
]

const processTestimonials = [
  {
    quote: "The discovery phase was an eye-opener. IFYWIGATECHZ didn't just build what we asked for; they built what we actually needed to scale.",
    author: "Sarah Jenkins, Fintech Founder",
    rating: 5
  },
  {
    quote: "The transparency during the development stage was refreshing. Weekly demos and clear roadmaps kept our team perfectly aligned.",
    author: "Marcus Chen, Creative Director",
    rating: 5
  },
  {
    quote: "Post-launch support has been exceptional. They treat our product like their own, ensuring performance is always peak.",
    author: "Amina Yusuf, EduTech CEO",
    rating: 5
  }
];
