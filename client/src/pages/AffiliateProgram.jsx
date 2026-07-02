import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { 
  CheckCircle2, 
  Globe, 
  Rocket, 
  UserPlus, 
  Share2, 
  DollarSign,
  TrendingUp,
  Calculator
} from "lucide-react";
import FaqItem from "./FaqItem";

export default function AffiliateProgram() {
  const [openFAQ, setOpenFAQ] = useState(null);

  const toggleFAQ = (i) => setOpenFAQ(openFAQ === i ? null : i);

  const faqs = [
    {
      q: "How do I earn commissions?",
      a: "You earn commissions by referring clients using your unique affiliate link. When they purchase any service, you get paid.",
    },
    {
      q: "When do I get paid?",
      a: "Payments are processed weekly via bank transfer or crypto.",
    },
    {
      q: "Is there a minimum payout?",
      a: "Yes, minimum payout is $20.",
    },
    {
      q: "Who can join?",
      a: "Anyone! Developers, designers, influencers, students, or marketers.",
    },
  ];

  const benefits = [
    { title: "High Commissions", desc: "Earn up to 30% on every successful referral.", icon: "💰" },
    { title: "Zero Entry Fee", desc: "Joining our program is 100% free, forever.", icon: "🆓" },
    { title: "Live Tracking", desc: "Monitor your clicks and earnings in real-time.", icon: "📊" },
    { title: "Marketing Assets", desc: "Access high-converting banners and copy.", icon: "🎨" },
    { title: "Weekly Payouts", desc: "Get paid every Friday via bank or crypto.", icon: "📅" },
    { title: "Priority Support", desc: "Dedicated manager for our top performers.", icon: "🤝" },
  ];

  const steps = [
    { title: "Sign up for free", icon: UserPlus },
    { title: "Share your unique link", icon: Share2 },
    { title: "Earn commissions on every sale", icon: DollarSign },
  ];

  // Multi-tier commission structure
  const commissionTiers = useMemo(() => [
    { min: 1, max: 10, commission: 35000 }, // ₦35,000 per referral for 1-10 referrals
    { min: 11, max: 25, commission: 40000 }, // ₦40,000 per referral for 11-25 referrals
    { min: 26, max: 50, commission: 45000 }, // ₦45,000 per referral for 26-50 referrals
  ], []);

  const [referralsPerMonth, setReferralsPerMonth] = useState(5);

  // Calculate estimated earnings based on tiers
  const estimatedEarnings = useMemo(() => {
    let totalEarnings = 0;
    let processedReferrals = 0;

    for (const tier of commissionTiers) {
      if (referralsPerMonth <= processedReferrals) break;

      const referralsInCurrentTier = Math.min(referralsPerMonth - processedReferrals, tier.max - tier.min + 1);
      totalEarnings += referralsInCurrentTier * tier.commission;
      processedReferrals += referralsInCurrentTier;
    }
    return totalEarnings;
  }, [referralsPerMonth, commissionTiers]);

  // Animation variants for staggered lists
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <div className="bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white min-h-screen font-sans selection:bg-green-500/30 transition-colors duration-300 relative overflow-hidden">

      {/* Subtle Mesh Gradient Background */}
      <div className="absolute inset-0 pointer-events-none opacity-40 dark:opacity-30">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,_rgba(34,197,94,0.1),_transparent_40%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_80%,_rgba(59,130,246,0.05),_transparent_40%)]" />
      </div>

      {/* HERO SECTION */}
      <section className="text-center py-24 px-6 relative z-10 transition-colors duration-300">
        <div className="max-w-4xl mx-auto relative z-10">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="text-4xl md:text-6xl font-extrabold mb-6 leading-tight tracking-tight"
          >
            Earn With <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-emerald-300">IFYWIGATECHZ</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
            className="text-slate-600 dark:text-slate-300 max-w-2xl mx-auto mb-10 text-lg md:text-xl transition-colors duration-300"
          >
            Turn your network into income. Promote our tech services and earn passive commissions with every successful referral.
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex justify-center gap-4 flex-wrap"
          >
            <Link 
              to="/affiliate/signup" 
              className="bg-green-500 hover:bg-green-400 px-8 py-3.5 rounded-xl font-semibold text-slate-950 shadow-[0_0_20px_rgba(34,197,94,0.3)] hover:shadow-[0_0_25px_rgba(34,197,94,0.5)] transition-all duration-300 focus:ring-2 focus:ring-green-400 focus:ring-offset-2 focus:ring-offset-slate-950"
            >
              Join Now
            </Link>
            <a
              href="#how-it-works"
              className="border border-slate-300 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200 px-8 py-3.5 rounded-xl font-medium bg-white/50 dark:bg-transparent shadow-sm dark:shadow-none transition-all duration-300 focus:ring-2 focus:ring-slate-400 dark:focus:ring-slate-600 focus:ring-offset-2 focus:ring-offset-white dark:focus:ring-offset-slate-950"
            >
              Learn More
            </a>
          </motion.div>
        </div>
      </section>

      {/* SOCIAL PROOF */}
      <section className="py-8 text-center border-y border-slate-200 dark:border-slate-800/50 bg-white/50 dark:bg-slate-900/30 transition-colors duration-300 relative z-10">
        <p className="text-slate-400 font-medium flex items-center justify-center gap-2 text-sm md:text-base">
          <Globe className="w-5 h-5 text-slate-500" />
          Trusted by developers, creators & freelancers worldwide
        </p>
      </section>

      {/* HOW IT WORKS */}
      <section id="how-it-works" className="py-24 px-6 max-w-6xl mx-auto scroll-mt-10 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-16 text-slate-900 dark:text-slate-100 transition-colors duration-300">
            How It Works
          </h2>
        </motion.div>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 relative"
        >
          {steps.map((step, i) => {
            const Icon = step.icon;
            return (
              <motion.div
                key={i}
                variants={itemVariants}
                whileHover={{ y: -5 }}
                className="bg-white/60 dark:bg-slate-900/50 backdrop-blur-sm p-8 rounded-2xl text-center border border-slate-200 dark:border-slate-800 hover:border-green-500/30 dark:hover:border-green-500/30 transition-all shadow-lg dark:shadow-none group"
              >
                <div className="w-14 h-14 mx-auto bg-slate-100 dark:bg-slate-800 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <Icon className="w-7 h-7 text-green-400" />
                </div>
                <h3 className="text-xl font-semibold mb-3 text-slate-900 dark:text-slate-200 transition-colors duration-300">
                  Step {i + 1}
                </h3>
                <p className="text-slate-600 dark:text-slate-400 leading-relaxed transition-colors duration-300">{step.title}</p>
              </motion.div>
            );
          })}
        </motion.div>
      </section>

      {/* BENEFITS */}
      <section className="py-24 px-6 relative overflow-hidden bg-slate-50/50 dark:bg-slate-900/20 border-y border-slate-200 dark:border-slate-800/50 transition-colors duration-300 z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-16 text-slate-900 dark:text-slate-100 transition-colors duration-300">
            Why Join Our Affiliate Program?
          </h2>
        </motion.div>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto"
        >
          {benefits.map((item, i) => (
            <motion.div
              key={i}
              variants={itemVariants}
              whileHover={{ y: -5 }}
              className="bg-white dark:bg-slate-900/60 backdrop-blur-sm p-6 rounded-2xl border border-slate-200 dark:border-slate-800 transition-all shadow-sm hover:shadow-xl dark:shadow-none group hover:border-green-500/20"
            >
              <div className="text-3xl mb-4 group-hover:scale-110 transition-transform">{item.icon}</div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">{item.title}</h3>
              <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">{item.desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* EARNINGS CALCULATOR */}
      <section className="py-24 px-6 relative z-10">
        <div className="max-w-4xl mx-auto bg-white dark:bg-slate-900 rounded-[2.5rem] p-8 md:p-12 border border-slate-200 dark:border-slate-800 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 p-8 opacity-5">
            <Calculator size={120} />
          </div>
          
          <div className="relative z-10 text-center md:text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 text-blue-500 text-xs font-bold uppercase tracking-widest mb-6">
              <TrendingUp size={14} /> Revenue Estimator
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Calculate Your Earnings</h2>
            <p className="text-slate-600 dark:text-slate-400 mb-10 max-w-xl">
              See how much you could earn by referring clients to our premium tech services.
            </p>

            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="space-y-8">
                <div>
                  <div className="flex justify-between mb-4">
                    <label className="font-bold text-slate-700 dark:text-slate-200">Successful Referrals / Month</label>
                    <span className="text-green-500 font-black text-xl">{referralsPerMonth}</span>
                  </div>
                  <input 
                    type="range" 
                    min="1" 
                    max="50" 
                    value={referralsPerMonth}
                    onChange={(e) => setReferralsPerMonth(parseInt(e.target.value))}
                    className="w-full h-2 bg-slate-200 dark:bg-slate-800 rounded-lg appearance-none cursor-pointer accent-green-500"
                  />
                  <div className="flex justify-between mt-2 text-xs text-slate-500 uppercase font-bold tracking-tighter">
                    <span>1 Project</span>
                    <span>50 Projects</span>
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 text-sm">
                  <p className="text-slate-500 italic">
                    *Based on a multi-tier commission structure. Actual earnings vary by project value and tier.
                  </p>
                </div>
              </div>

              <div className="text-center md:text-right">
                <p className="text-slate-500 dark:text-slate-400 uppercase text-xs font-bold tracking-[0.2em] mb-2">Estimated Monthly Income</p>
                <motion.div 
                  key={referralsPerMonth}
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="text-5xl md:text-6xl font-black text-green-500 mb-4" // ₦{(referralsPerMonth * 35000).toLocaleString()}
                >
                  ₦{(referralsPerMonth * 35000).toLocaleString()}
                </motion.div>
                <Link to="/affiliate/signup" className="text-blue-500 hover:text-blue-600 font-bold flex items-center justify-center md:justify-end gap-2 group">
                  Start building this income <Share2 size={18} className="group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* COMMISSION */}
      <section className="text-center py-24 px-6 relative overflow-hidden z-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="max-w-2xl mx-auto"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-slate-900 dark:text-slate-100 transition-colors duration-300">
            Commission Structure
          </h2>
          <p className="text-slate-600 dark:text-slate-400 mb-12 text-lg transition-colors duration-300">
            The more you promote, the more you earn. Scale your income with performance-based rewards.
          </p>

          <motion.div
            whileHover={{ scale: 1.05 }}
            className="bg-gradient-to-br from-green-500 to-emerald-700 inline-flex flex-col items-center justify-center px-16 py-10 rounded-3xl shadow-[0_20px_50px_rgba(34,197,94,0.2)]"
          >
            <h3 className="text-6xl font-extrabold text-white tracking-tight">
              30%
            </h3>
            <p className="mt-3 text-green-100 font-medium text-lg uppercase tracking-wider">
              per successful sale
            </p>
          </motion.div>
        </motion.div>
      </section>

      {/* FAQ */}
      <section className="py-24 px-6 relative overflow-hidden max-w-3xl mx-auto z-10">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-3xl md:text-4xl font-bold text-center mb-12 text-slate-900 dark:text-slate-100 transition-colors duration-300"
        >
          Frequently Asked Questions
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

      {/* FINAL CTA */}
      <section className="text-center py-24 px-6 relative overflow-hidden border-t border-slate-200 dark:border-slate-800/50 transition-colors duration-300 z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-2xl mx-auto"
        >
          <Rocket className="w-12 h-12 text-green-400 mx-auto mb-6" />
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-slate-900 dark:text-slate-100 transition-colors duration-300">
            Start Earning Today
          </h2>
          <p className="text-slate-600 dark:text-slate-400 mb-10 text-lg transition-colors duration-300">
            Join thousands of affiliates growing their income with IFYWIGATECHZ
          </p>

          <Link 
            to="/affiliate/signup"
            className="inline-flex items-center justify-center gap-2 bg-green-500 hover:bg-green-400 text-slate-950 px-10 py-4 rounded-xl font-bold shadow-[0_0_20px_rgba(34,197,94,0.2)] hover:shadow-[0_0_30px_rgba(34,197,94,0.4)] transition-all duration-300 focus:ring-2 focus:ring-green-400 focus:ring-offset-2 focus:ring-offset-slate-950"
          >
            Become an Affiliate
          </Link>
        </motion.div>
      </section>

    </div>
  );
}