import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  HelpCircle,
  BookOpen,
  MessageCircle,
  Mail,
  Phone,
  ChevronDown,
} from "lucide-react";

const categories = [
  { id: "start", title: "Getting Started", icon: BookOpen, articles: 12 },
  { id: "billing", title: "Billing", icon: HelpCircle, articles: 8 },
  { id: "courses", title: "Courses", icon: BookOpen, articles: 15 },
  { id: "support", title: "Support", icon: MessageCircle, articles: 10 },
];

const faqsData = [
  {
    id: "enroll",
    q: "How do I enroll in a course?",
    a: "Go to the Learn page, select a course, and click enroll. Payment gives instant access.",
  },
  {
    id: "refund",
    q: "Can I get a refund?",
    a: "Yes, within 7 days if less than 25% is completed.",
  },
  {
    id: "cert",
    q: "Are certificates recognized?",
    a: "Yes, they are verifiable and recognized globally.",
  },
  {
    id: "verify",
    q: "How do I verify a certificate?",
    a: "Use the certificate verify page and enter your ID.",
  },
];

export default function HelpCenter() {
  const [query, setQuery] = useState("");
  const [openId, setOpenId] = useState(null);

  const filtered = query
    ? faqsData.filter(
        (f) =>
          f.q.toLowerCase().includes(query.toLowerCase()) ||
          f.a.toLowerCase().includes(query.toLowerCase())
      )
    : faqsData;

  return (
    <section className="relative bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white overflow-hidden transition-colors duration-300">
      <Helmet>
        <title>Help Center | IFYWIGATECHZ</title>
      </Helmet>

      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-blue-100/50 dark:from-blue-900/20 via-transparent dark:to-black transition-colors duration-300" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[700px] bg-brandGold/10 blur-[120px]" />

      {/* HERO */}
      <header className="relative max-w-4xl mx-auto px-4 py-28 text-center">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}>
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-full text-sm text-brandGold mb-6 transition-colors duration-300">
            <HelpCircle size={16} />
            Support Center
          </div>

          <h1 className="text-5xl font-black text-slate-900 dark:text-white mb-6 leading-tight transition-colors duration-300">
            How can we help you today?
          </h1>

          {/* Premium Search */}
          <div className="relative max-w-xl mx-auto mt-6">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-500" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search articles, FAQs..."
              className="w-full pl-12 pr-4 py-4 rounded-2xl bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 text-slate-900 dark:text-white placeholder-slate-500 dark:placeholder-neutral-500 focus:ring-2 focus:ring-brandGold outline-none transition-colors duration-300"
            />
          </div>
        </motion.div>
      </header>

      {/* CATEGORIES */}
      <section className="max-w-5xl mx-auto px-4 pb-20 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        {categories.map((cat) => {
          const Icon = cat.icon;
          return (
            <motion.div
              key={cat.id}
              whileHover={{ y: -5 }}
              className="bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-xl p-6 text-center cursor-pointer shadow-sm dark:shadow-none transition-colors duration-300"
            >
              <div className="w-12 h-12 mx-auto mb-3 bg-brandGold/20 rounded-xl flex items-center justify-center">
                <Icon size={20} />
              </div>
              <h3 className="font-bold">{cat.title}</h3>
              <p className="text-sm text-slate-500 dark:text-neutral-400">
                {cat.articles} articles
              </p>
            </motion.div>
          );
        })}
      </section>

      {/* FAQ */}
      <section className="max-w-3xl mx-auto px-4 pb-24">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white text-center mb-8 transition-colors duration-300">
          Frequently Asked Questions
        </h2>

        <div className="space-y-3">
          {filtered.map((faq) => (
            <div
              key={faq.id}
              className="bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-xl overflow-hidden shadow-sm dark:shadow-none transition-colors duration-300"
            >
              <button
                onClick={() =>
                  setOpenId(openId === faq.id ? null : faq.id)
                }
                className="w-full flex justify-between items-center p-5 hover:bg-slate-50 dark:hover:bg-white/5 transition-colors duration-300"
              >
                <span className="font-medium text-left">{faq.q}</span>
                <ChevronDown
                  className={`transition-transform duration-300 flex-shrink-0 ${
                    openId === faq.id ? "rotate-180 text-brandGold" : "text-slate-400"
                  }`}
                />
              </button>

              <AnimatePresence>
                {openId === faq.id && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="px-5 pb-5 text-sm text-slate-600 dark:text-neutral-300"
                  >
                    {faq.a}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}

          {filtered.length === 0 && (
            <p className="text-center text-slate-500 dark:text-neutral-400">
              No results found for "{query}"
            </p>
          )}
        </div>
      </section>

      {/* CONTACT */}
      <section className="max-w-4xl mx-auto px-4 pb-28 text-center">
        <div className="bg-white/60 dark:bg-gradient-to-r dark:from-brandGold/20 dark:to-yellow-500/10 border border-slate-200 dark:border-brandGold/20 rounded-3xl p-10 shadow-lg dark:shadow-none transition-colors duration-300">
          <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-4 transition-colors duration-300">
            Still need help?
          </h2>

          <p className="text-slate-600 dark:text-neutral-400 mb-6">
            Our team is ready to assist you.
          </p>

          <div className="flex flex-wrap justify-center gap-4">
            <a
              href="mailto:Wigatech9@gmail.com"
              className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-brandGold to-yellow-400 text-black font-bold rounded-xl shadow-lg hover:shadow-brandGold/25 hover:scale-105 transition-all duration-300"
            >
              <Mail size={18} />
              Email
            </a>

            <a
              href="https://wa.me/2348113722088"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-8 py-4 bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-xl text-slate-900 dark:text-white hover:bg-slate-50 dark:hover:bg-white/10 shadow-sm dark:shadow-none transition-all duration-300"
            >
              <Phone size={18} />
              WhatsApp
            </a>
          </div>
        </div>
      </section>
    </section>
  );
}
