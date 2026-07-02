import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import {
  Building2,
  Users,
  GraduationCap,
  Award,
  ArrowRight,
  CheckCircle,
  Mail,
} from "lucide-react";

const programs = [
  {
    id: "digital",
    title: "Digital Transformation",
    desc: "Equip your teams with modern tools and workflows to drive innovation.",
    icon: Building2,
    duration: "4–8 weeks",
    mode: "On-site / Virtual",
  },
  {
    id: "leadership",
    title: "Leadership & Management",
    desc: "Build high-performing leaders for agile and tech-driven teams.",
    icon: Users,
    duration: "2–4 weeks",
    mode: "Workshops",
  },
  {
    id: "technical",
    title: "Technical Upskilling",
    desc: "Full-Stack, Cloud, AI, Cybersecurity, and more.",
    icon: GraduationCap,
    duration: "6–12 weeks",
    mode: "Bootcamps",
  },
  {
    id: "cert",
    title: "Certification Prep",
    desc: "Prepare teams for globally recognized certifications.",
    icon: Award,
    duration: "3–6 weeks",
    mode: "Intensive",
  },
];

const clients = [
  "TechFlow Solutions",
  "AfriPay",
  "HealthBridge",
  "EduGlobal",
  "AgroTech NG",
  "GreenEnergy Corp",
];

export default function CorporateTraining() {
  return (
    <section className="relative bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white overflow-hidden transition-colors duration-300">
      <Helmet>
        <title>Corporate Training | IFYWIGATECHZ</title>
        <meta
          name="description"
          content="Upskill your workforce with IFYWIGATECHZ corporate training programs."
        />
      </Helmet>

      {/* Background Glow */}
      <div className="absolute inset-0 bg-gradient-to-b from-blue-100/50 dark:from-blue-900/20 via-transparent dark:to-black transition-colors duration-300" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-brandGold/10 blur-[120px]" />

      {/* HERO */}
      <header className="relative max-w-6xl mx-auto px-4 py-28 text-center">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}>
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/60 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-full text-sm text-brandGold mb-6 shadow-sm dark:shadow-none transition-colors duration-300">
            <Building2 size={16} />
            Enterprise Training
          </div>

          <h1 className="text-5xl md:text-6xl font-black leading-tight mb-6">
            Upskill Teams. <br />
            <span className="bg-gradient-to-r from-brandGold to-yellow-400 bg-clip-text text-transparent">
              Drive Real Business Growth.
            </span>
          </h1>

          <p className="text-slate-600 dark:text-neutral-400 max-w-xl mx-auto text-lg mb-10">
            Tailored training programs designed to increase productivity,
            accelerate innovation, and future-proof your organization.
          </p>

          <div className="flex flex-wrap justify-center gap-4">
            <a
              href="/request-quote"
              className="px-8 py-4 bg-gradient-to-r from-brandGold to-yellow-400 text-black font-bold rounded-xl shadow-lg hover:scale-105 transition"
            >
              Request Proposal
            </a>

            <a
              href="#programs"
              className="px-8 py-4 bg-white dark:bg-white/5 border border-slate-200 dark:border-white/20 rounded-xl hover:bg-slate-50 dark:hover:bg-white/10 transition-colors shadow-sm dark:shadow-none"
            >
              View Programs
            </a>
          </div>
        </motion.div>
      </header>

      {/* PROGRAMS */}
      <section id="programs" className="max-w-6xl mx-auto px-4 pb-24">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold mb-4">Programs Built for Impact</h2>
          <p className="text-slate-600 dark:text-neutral-400 max-w-xl mx-auto">
            Flexible, scalable, and tailored to your business needs.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {programs.map((p) => {
            const Icon = p.icon;
            return (
              <motion.article
                key={p.id}
                whileHover={{ y: -6 }}
                className="group bg-white/60 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-2xl p-6 backdrop-blur-xl shadow-lg dark:shadow-none transition-colors duration-300"
              >
                <div className="w-14 h-14 bg-brandGold/20 rounded-xl flex items-center justify-center text-brandGold mb-4 border border-brandGold/30">
                  <Icon size={26} />
                </div>

                <h3 className="font-bold text-lg mb-2">{p.title}</h3>
                <p className="text-sm text-slate-600 dark:text-neutral-400 mb-4">{p.desc}</p>

                <div className="flex justify-between text-xs text-slate-500 dark:text-neutral-500 border-t border-slate-200 dark:border-white/10 pt-4 transition-colors duration-300">
                  <span>{p.duration}</span>
                  <span>{p.mode}</span>
                </div>
              </motion.article>
            );
          })}
        </div>
      </section>

      {/* WHY US */}
      <section className="max-w-5xl mx-auto px-4 pb-24">
        <div className="bg-white/60 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-3xl p-10 backdrop-blur shadow-lg dark:shadow-none transition-colors duration-300">
          <h2 className="text-3xl font-bold text-center mb-10">
            Why Companies Choose Us
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              "Custom curriculum aligned with business goals",
              "Industry-experienced instructors",
              "Flexible delivery (on-site, virtual, hybrid)",
              "Post-training support & analytics",
              "Globally recognized certifications",
              "Scalable for teams of any size",
            ].map((item, i) => (
              <div key={i} className="flex gap-3">
                <CheckCircle className="text-brandGold mt-1" size={18} />
                <p className="text-slate-700 dark:text-neutral-300">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CLIENTS */}
      <section className="max-w-5xl mx-auto px-4 pb-24 text-center">
        <p className="text-slate-500 dark:text-neutral-500 text-sm uppercase mb-6 tracking-wider">
          Trusted by forward-thinking teams
        </p>

        <div className="flex flex-wrap justify-center gap-4">
          {clients.map((c) => (
            <div
              key={c}
              className="px-5 py-2 bg-white/60 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-lg text-sm text-slate-700 dark:text-neutral-300 shadow-sm dark:shadow-none transition-colors duration-300"
            >
              {c}
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-4xl mx-auto px-4 pb-28 text-center">
        <div className="bg-white/60 dark:bg-gradient-to-r dark:from-brandGold/20 dark:to-yellow-500/10 border border-slate-200 dark:border-brandGold/20 rounded-3xl p-10 backdrop-blur shadow-lg dark:shadow-none transition-colors duration-300">
          <h2 className="text-3xl font-bold mb-4">
            Ready to Transform Your Workforce?
          </h2>

          <p className="text-slate-600 dark:text-neutral-400 mb-8">
            Let’s build a program tailored to your company’s goals.
          </p>

          <div className="flex flex-wrap justify-center gap-4">
            <a
              href="/request-quote"
              className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-brandGold to-yellow-400 text-black font-bold rounded-xl hover:scale-105 transition"
            >
              Request Quote
              <ArrowRight size={18} />
            </a>

            <a
              href="mailto:Wigatech9@gmail.com"
              className="inline-flex items-center gap-2 px-8 py-4 bg-white dark:bg-white/5 border border-slate-200 dark:border-white/20 rounded-xl text-slate-900 dark:text-white hover:bg-slate-50 dark:hover:bg-white/10 transition-colors shadow-sm dark:shadow-none"
            >
              <Mail size={18} />
              Contact Us
            </a>
          </div>
        </div>
      </section>
    </section>
  );
}