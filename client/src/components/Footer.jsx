import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import FooterLogoMarquee from "./FooterLogoMarquee";

export default function Footer() {
  // Data for footer links
  const serviceLinks = [
    { to: "/services", label: "All Services" },
    { to: "/web-dev", label: "Web Development" },
    { to: "/ui-ux", label: "UI/UX Design" },
    { to: "/mobile-app", label: "Mobile Apps" },
    { to: "/ecommerce", label: "E-commerce" },
    { to: "/start-project", label: "Start a Project" },
  ];

  const learnLinks = [
    { to: "/learn", label: "Academy" },
    { to: "/blog", label: "Blog" },
    { to: "/corporate-training", label: "Corporate Training" },
    { to: "/events", label: "Events & Webinars" },
    { to: "/free-resources", label: "Free Resources" },
    { to: "/success-stories", label: "Success Stories" },
  ];

  const companyLinks = [
    { to: "/about", label: "About Us" },
    { to: "/careers", label: "Careers" },
    { to: "/team", label: "Our Team" },
    { to: "/gallery", label: "Gallery" },
    { to: "/contact", label: "Contact" },
    { to: "/testimonials", label: "Testimonials" },
  ];

  const resourceLinks = [
    { to: "/help", label: "Help Center" },
    { to: "/faq", label: "FAQ" },
    { to: "/affiliate/program", label: "Affiliate Program" },
    { to: "/pricing", label: "Pricing" },
    { to: "/refund-policy", label: "Refund Policy" },
    { to: "/verify-certificate", label: "Verify Certificate" },
  ];

  const socialLinks = [
    { name: 'Facebook', href: 'https://www.facebook.com/share/1MbgZWskdZ/', path: 'M13.135 6H15V3h-1.865a4.147 4.147 0 0 0-4.142 4.142V9H7v3h2v9.938h3V12h2.021l.592-3H12V6.591A.6.6 0 0 1 12.592 6h.543Z', fillRule: 'evenodd' },
    { name: 'WhatsApp', href: 'https://wa.me/2348113722088', paths: ['M12 4a8 8 0 0 0-6.895 12.06l.569.718-.697 2.359 2.32-.648.379.243A8 8 0 1 0 12 4ZM2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10a9.96 9.96 0 0 1-5.016-1.347l-4.948 1.382 1.426-4.829-.006-.007-.033-.055A9.958 9.958 0 0 1 2 12Z', 'M16.735 13.492c-.038-.018-1.497-.736-1.756-.83a1.008 1.008 0 0 0-.34-.075c-.196 0-.362.098-.49.291-.146.217-.587.732-.723.886-.018.02-.042.045-.057.045-.013 0-.239-.093-.307-.123-1.564-.68-2.751-2.313-2.914-2.589-.023-.04-.024-.057-.024-.057.005-.021.058-.074.085-.101.08-.079.166-.182.249-.283l.117-.14c.121-.14.175-.25.237-.375l.033-.066a.68.68 0 0 0-.02-.64c-.034-.069-.65-1.555-.715-1.711-.158-.377-.366-.552-.655-.552-.027 0 0 0-.112.005-.137.005-.883.104-1.213.311-.35.22-.94.924-.94 2.16 0 1.112.705 2.162 1.008 2.561l.041.06c1.161 1.695 2.608 2.951 4.074 3.537 1.412.564 2.081.63 2.461.63.16 0 .288-.013.4-.024l.072-.007c.488-.043 1.56-.599 1.804-1.276.192-.534.243-1.117.115-1.329-.088-.144-.239-.216-.43-.308Z'] },
    { name: 'Twitter', href: 'https://x.com/OkIfeanyichukwu', path: 'M13.795 10.533 20.68 2h-3.073l-5.255 6.517L7.69 2H1l7.806 10.91L1.47 22h3.074l5.705-7.07L15.31 22H22l-8.205-11.467Zm-2.38 2.95L9.97 11.464 4.36 3.627h2.31l4.528 6.317 1.443 2.02 6.018 8.409h-2.31l-4.934-6.89Z' },
    { name: 'YouTube', href: 'https://youtube.com/@ifywigatechz-k3n', path: 'M21.7 8.037a4.26 4.26 0 0 0-.789-1.964 2.84 2.84 0 0 0-1.984-.839c-2.767-.2-6.926-.2-6.926-.2s-4.157 0-6.928.2a2.836 2.836 0 0 0-1.983.839 4.225 4.225 0 0 0-.79 1.965 30.146 30.146 0 0 0-.2 3.206v1.5a30.12 30.12 0 0 0 .2 3.206c.094.712.364 1.39.784 1.972.604.536 1.38.837 2.187.848 1.583.151 6.731.2 6.731.2s4.161 0 6.928-.2a2.844 2.844 0 0 0 1.985-.84 4.27 4.27 0 0 0 .787-1.965 30.12 30.12 0 0 0 .2-3.206v-1.516a30.672 30.672 0 0 0-.202-3.206Zm-11.692 6.554v-5.62l5.4 2.819-5.4 2.801Z', fillRule: 'evenodd' }
  ];

  // Animation variants for Framer Motion
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.2 },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { type: "spring", stiffness: 100 } },
  };

  return (
    <>
      <FooterLogoMarquee />

      <footer className="border-t border-slate-200 dark:border-white/10 bg-white/80 dark:bg-slate-900/80 backdrop-blur-lg text-slate-800 dark:text-neutral-100 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">

          {/* NEWSLETTER SECTION */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.7 }}
            className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center border-b border-slate-200 dark:border-neutral-700 pb-10 mb-10"
          >
            <div className="lg:col-span-2">
              <h3 className="font-bold text-2xl text-slate-900 dark:text-white mb-2">
                Join Our Tech Community
              </h3>
              <p className="text-slate-600 dark:text-neutral-300 leading-relaxed">
                Get weekly insights on tech, career growth, and exclusive access to our events and courses. No spam, just value.
              </p>
            </div>
            <form className="flex flex-col sm:flex-row gap-3 w-full">
              <input
                type="email"
                placeholder="you@email.com"
                required
                className="w-full px-4 py-3 rounded-xl bg-slate-100 dark:bg-neutral-800/60 border border-slate-300 dark:border-neutral-700 text-slate-900 dark:text-white placeholder-slate-500 dark:placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-brandGold transition-all duration-300"
              />
              <button
                type="submit"
                className="bg-brandGold text-black font-bold px-6 py-3 rounded-xl hover:bg-yellow-400 transition-colors whitespace-nowrap"
              >
                Subscribe
              </button>
            </form>
          </motion.div>

          {/* MAIN GRID */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            className="grid grid-cols-2 md:grid-cols-6 gap-8"
          >

            {/* BRAND */}
            <motion.div className="col-span-2" variants={itemVariants}>
              <h3 className="font-bold text-xl text-slate-900 dark:text-white mb-3">
                IFYWIGATECHZ-
                <span className="text-brandGold"> Global Services</span>
              </h3>

              <p className="text-sm text-slate-600 dark:text-neutral-300 leading-relaxed">
                🚀 Unlocking Potential Through Technology and Innovation
              </p>
            </motion.div>

            {/* SERVICES LINKS */}
            <motion.div variants={itemVariants}>
              <h4 className="font-semibold text-slate-900 dark:text-white mb-4 tracking-wide">Services</h4>
              <ul className="space-y-3 text-sm">
                {serviceLinks.map((link) => (
                  <li key={link.to}><Link to={link.to} className="text-slate-600 dark:text-neutral-300 hover:text-brandBlue dark:hover:text-brandGold transition">{link.label}</Link></li>
                ))}
              </ul>
            </motion.div>

            {/* LEARN LINKS */}
            <motion.div variants={itemVariants}>
              <h4 className="font-semibold text-slate-900 dark:text-white mb-4 tracking-wide">Learn</h4>
              <ul className="space-y-3 text-sm">
                {learnLinks.map((link) => (
                  <li key={link.to}><Link to={link.to} className="text-slate-600 dark:text-neutral-300 hover:text-brandBlue dark:hover:text-brandGold transition">{link.label}</Link></li>
                ))}
              </ul>
            </motion.div>

            {/* COMPANY LINKS */}
            <motion.div variants={itemVariants}>
              <h4 className="font-semibold text-slate-900 dark:text-white mb-4 tracking-wide">Company</h4>
              <ul className="space-y-3 text-sm">
                {companyLinks.map((link) => (
                  <li key={link.to}><Link to={link.to} className="text-slate-600 dark:text-neutral-300 hover:text-brandBlue dark:hover:text-brandGold transition">{link.label}</Link></li>
                ))}
              </ul>
            </motion.div>

            {/* RESOURCES & LEGAL LINKS */}
            <motion.div variants={itemVariants}>
              <h4 className="font-semibold text-slate-900 dark:text-white mb-4 tracking-wide">Resources & Legal</h4>
              <ul className="space-y-3 text-sm">
                {resourceLinks.map((link) => (
                  <li key={link.to}><Link to={link.to} className="text-slate-600 dark:text-neutral-300 hover:text-brandBlue dark:hover:text-brandGold transition">{link.label}</Link></li>
                ))}
              </ul>
            </motion.div>
          </motion.div>

          {/* BOTTOM BAR */}
          <div className="mt-16 pt-8 border-t border-slate-200 dark:border-neutral-700 flex flex-col sm:flex-row items-center justify-between text-sm">
            <p className="text-slate-500 dark:text-neutral-400 order-2 sm:order-1 mt-4 sm:mt-0">
              © {new Date().getFullYear()} IFYWIGATECHZ Global Services. All rights reserved.
            </p>
            <div className="flex gap-4 order-1 sm:order-2">
              {socialLinks.map((link) => (
                <a key={link.name} href={link.href} target="_blank" rel="noopener noreferrer" aria-label={link.name} className="text-slate-500 dark:text-neutral-400 hover:text-brandBlue dark:hover:text-brandGold hover:scale-110 transition-all duration-300">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    {link.paths ? (
                      <>
                        <path fillRule="evenodd" d={link.paths[0]} clipRule="evenodd" />
                        <path d={link.paths[1]} />
                      </>
                    ) : (
                      <path fillRule={link.fillRule} d={link.path} clipRule={link.fillRule} />
                    )}
                  </svg>
                </a>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
