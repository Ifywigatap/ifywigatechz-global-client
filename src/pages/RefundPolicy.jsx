import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import { Shield, RefreshCw, Clock, AlertCircle, CheckCircle, Mail } from "lucide-react";

export default function RefundPolicy() {
  return (
    <section className="min-h-screen bg-slate-50 dark:bg-gradient-to-b dark:from-slate-950 dark:via-slate-900 dark:to-blue-950 transition-colors duration-300">
      <Helmet>
        <title>Refund & Returns Policy | IFYWIGATECHZ</title>
        <meta name="description" content="Read IFYWIGATECHZ refund policy for courses, services, and digital products. 7-day money-back guarantee on select offerings." />
      </Helmet>

      {/* Hero */}
      <div className="relative overflow-hidden py-20 sm:py-28">
        <div className="absolute inset-0 bg-gradient-to-r from-brandBlue/10 via-transparent to-brandGold/10" />
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brandGold/10 border border-brandGold/20 text-brandGold text-sm font-medium mb-6">
              <Shield size={16} />
              Policies
            </div>
            <h1 className="text-4xl sm:text-5xl font-black text-slate-900 dark:text-white mb-6">
              Refund & <span className="text-brandGold">Returns</span> Policy
            </h1>
            <p className="text-xl text-slate-600 dark:text-neutral-400 max-w-2xl mx-auto">
              Transparent, fair, and simple. We want you to be completely satisfied with your investment.
            </p>
          </motion.div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-24">
        <div className="space-y-12">
          {/* Overview */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-white/60 dark:bg-white/5 backdrop-blur-xl rounded-2xl border border-slate-200 dark:border-white/10 p-8 shadow-sm dark:shadow-none transition-colors duration-300"
          >
            <div className="flex items-center gap-3 mb-4">
              <RefreshCw className="text-brandBlue" size={24} />
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Our Commitment</h2>
            </div>
            <p className="text-slate-700 dark:text-neutral-300 leading-relaxed">
              At IFYWIGATECHZ, we stand behind the quality of our courses, services, and digital products. 
              If you're not satisfied with your purchase, we offer a straightforward refund process. 
              Please read the specific terms below for each category.
            </p>
          </motion.div>

          {/* Course Refunds */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-white/60 dark:bg-white/5 backdrop-blur-xl rounded-2xl border border-slate-200 dark:border-white/10 p-8 shadow-sm dark:shadow-none transition-colors duration-300"
          >
            <div className="flex items-center gap-3 mb-6">
              <Clock className="text-brandGold" size={24} />
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Course Refunds</h2>
            </div>
            <div className="space-y-4 text-slate-700 dark:text-neutral-300">
              <div className="flex gap-3">
                <CheckCircle className="text-green-400 flex-shrink-0 mt-1" size={18} />
                <p><strong className="text-slate-900 dark:text-white">7-Day Money-Back Guarantee:</strong> Full refund available within 7 days of purchase if less than 25% of the course content has been accessed.</p>
              </div>
              <div className="flex gap-3">
                <CheckCircle className="text-green-400 flex-shrink-0 mt-1" size={18} />
                <p><strong className="text-slate-900 dark:text-white">Partial Refund:</strong> If 25-50% of content is accessed, a 50% refund may be granted at our discretion.</p>
              </div>
              <div className="flex gap-3">
                <AlertCircle className="text-red-400 flex-shrink-0 mt-1" size={18} />
                <p><strong className="text-slate-900 dark:text-white">No Refund:</strong> No refunds if more than 50% of course content has been accessed or after 7 days from purchase.</p>
              </div>
              <div className="flex gap-3">
                <CheckCircle className="text-green-400 flex-shrink-0 mt-1" size={18} />
                <p><strong className="text-slate-900 dark:text-white">Special Circumstances:</strong> Medical emergencies, technical issues, or other extenuating circumstances will be reviewed on a case-by-case basis.</p>
              </div>
            </div>
          </motion.div>

          {/* Services Refunds */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-white/60 dark:bg-white/5 backdrop-blur-xl rounded-2xl border border-slate-200 dark:border-white/10 p-8 shadow-sm dark:shadow-none transition-colors duration-300"
          >
            <div className="flex items-center gap-3 mb-6">
              <Shield className="text-green-400" size={24} />
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Services & Development</h2>
            </div>
            <div className="space-y-4 text-slate-700 dark:text-neutral-300">
              <div className="flex gap-3">
                <CheckCircle className="text-green-400 flex-shrink-0 mt-1" size={18} />
                <p><strong className="text-slate-900 dark:text-white">Deposit Policy:</strong> Project deposits (typically 30-50%) are non-refundable once work has commenced.</p>
              </div>
              <div className="flex gap-3">
                <CheckCircle className="text-green-400 flex-shrink-0 mt-1" size={18} />
                <p><strong className="text-slate-900 dark:text-white">Milestone-Based:</strong> Payments for completed milestones are non-refundable. Disputes handled via mutual agreement.</p>
              </div>
              <div className="flex gap-3">
                <CheckCircle className="text-green-400 flex-shrink-0 mt-1" size={18} />
                <p><strong className="text-slate-900 dark:text-white">Cancellation:</strong> Projects may be paused or cancelled with 14 days written notice. Unused prepaid funds returned minus deposit.</p>
              </div>
            </div>
          </motion.div>

          {/* Digital Products */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-white/60 dark:bg-white/5 backdrop-blur-xl rounded-2xl border border-slate-200 dark:border-white/10 p-8 shadow-sm dark:shadow-none transition-colors duration-300"
          >
            <div className="flex items-center gap-3 mb-6">
              <AlertCircle className="text-orange-400" size={24} />
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Digital Products & Downloads</h2>
            </div>
            <div className="space-y-4 text-slate-700 dark:text-neutral-300">
              <div className="flex gap-3">
                <AlertCircle className="text-orange-400 flex-shrink-0 mt-1" size={18} />
                <p>Due to the nature of digital downloads, all template, ebook, and code purchases are <strong className="text-slate-900 dark:text-white">final and non-refundable</strong> once downloaded.</p>
              </div>
              <div className="flex gap-3">
                <CheckCircle className="text-green-400 flex-shrink-0 mt-1" size={18} />
                <p>If a file is corrupted or inaccessible, contact support within 48 hours for a replacement.</p>
              </div>
            </div>
          </motion.div>

          {/* Process */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-white/60 dark:bg-gradient-to-r dark:from-brandBlue/20 dark:via-brandGold/10 dark:to-brandBlue/20 rounded-2xl border border-slate-200 dark:border-brandBlue/20 p-8 shadow-sm dark:shadow-none transition-colors duration-300"
          >
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">How to Request a Refund</h2>
            <div className="grid sm:grid-cols-3 gap-6">
              {[
                { step: "1", title: "Contact Us", desc: "Email support@ifywigatechz.com within the eligible period." },
                { step: "2", title: "Review", desc: "Our team reviews your request within 3-5 business days." },
                { step: "3", title: "Refund", desc: "Approved refunds processed to original payment method within 7-14 days." },
              ].map((item, i) => (
                <div key={i} className="text-center">
                  <div className="w-10 h-10 bg-brandGold text-black font-bold rounded-full flex items-center justify-center mx-auto mb-3 shadow-sm">
                    {item.step}
                  </div>
                  <h3 className="text-slate-900 dark:text-white font-bold mb-1">{item.title}</h3>
                  <p className="text-slate-600 dark:text-neutral-400 text-sm">{item.desc}</p>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Contact */}
          <div className="text-center py-8">
            <p className="text-slate-600 dark:text-neutral-400 mb-4">Questions about our refund policy?</p>
            <a
              href="mailto:support@ifywigatechz.com"
              className="inline-flex items-center gap-2 px-6 py-3 bg-white dark:bg-white/5 border border-slate-300 dark:border-white/20 text-slate-900 dark:text-white rounded-xl hover:bg-slate-50 dark:hover:bg-white/10 transition-all shadow-sm dark:shadow-none"
            >
              <Mail size={18} />
              Contact Support
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
