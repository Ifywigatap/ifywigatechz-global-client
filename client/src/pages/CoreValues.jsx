import { motion } from "framer-motion";
import { Target, Heart, Zap, Users } from "lucide-react";

const values = [
  {
    icon: <Target className="text-brandBlue" size={28} />,
    title: "Mission-Driven",
    desc: "Every project we take on is aligned with our core mission: to empower businesses and individuals through technology.",
  },
  {
    icon: <Heart className="text-red-400" size={28} />,
    title: "People First",
    desc: "We prioritize relationships, transparency, and the well-being of our team members and clients above all else.",
  },
  {
    icon: <Zap className="text-brandGold" size={28} />,
    title: "Excellence",
    desc: "We hold ourselves to the highest standards. Good enough is never enough — we strive for exceptional in everything.",
  },
  {
    icon: <Users className="text-green-400" size={28} />,
    title: "Collaboration",
    desc: "Great things are built together. We foster an environment where ideas flow freely and teamwork thrives.",
  },
];

export default function CoreValues() {
  return (
    <div>
      <div className="text-center mb-16">
        <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white mb-4">Our Core Values</h2>
        <p className="text-slate-600 dark:text-neutral-400 max-w-2xl mx-auto">
          The fundamental principles that guide how we work, collaborate, and deliver value to our clients and community.
        </p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {values.map((v, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="bg-white/60 dark:bg-white/5 backdrop-blur-xl rounded-[2rem] border border-slate-200 dark:border-white/10 p-8 text-center hover:bg-white/80 dark:hover:bg-white/10 hover:-translate-y-2 transition-all duration-300 shadow-sm dark:shadow-none group"
          >
            <div className="w-16 h-16 bg-white dark:bg-slate-800 rounded-2xl flex items-center justify-center mx-auto mb-6 border border-slate-200 dark:border-white/10 shadow-sm transition-transform duration-300 group-hover:scale-110">
              {v.icon}
            </div>
            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3 group-hover:text-brandBlue transition-colors">{v.title}</h3>
            <p className="text-slate-600 dark:text-neutral-300 text-sm leading-relaxed">{v.desc}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}