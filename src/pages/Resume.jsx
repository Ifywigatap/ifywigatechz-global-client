

import { NavLink } from "react-router-dom";

export default function Resume() {
  return (
    <section className="section bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white space-y-12 container-wide transition-colors duration-300">
      {/* HEADER */}
      <div className="text-center mb-10 animate-fade-in">
        <h2 className="text-4xl font-extrabold text-brandBlue tracking-tight">
          Resume
        </h2>
        <p className="text-slate-600 dark:text-neutral-300 mt-2 transition-colors duration-300">
          A quick overview of my professional experience, skills, and education.
        </p>

        <div className="flex justify-center gap-4 mt-6">
          <a
            className="btn btn-primary px-6"
            href="/resume.pdf"
            download
          >
            Download PDF
          </a>
          <a
            className="btn btn-outline px-6"
            href="/resume.pdf"
            target="_blank"
          >
            View Online
          </a>
        </div>
      </div>

      {/* 2-COLUMN PRO LAYOUT */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-start">

        {/* LEFT COLUMN */}
        <div className="space-y-4">

          {/* SUMMARY */}
          <div className="card bg-white/60 dark:bg-white/5 border border-slate-200 dark:border-white/10 shadow-sm dark:shadow-none p-6 rounded-2xl transition-colors duration-300 animate-slide-up">
            <h3 className="text-2xl font-semibold mb-3 text-slate-900 dark:text-brandGold transition-colors duration-300">
              Profile Summary
            </h3>
            <p className="text-slate-700 dark:text-neutral-300 leading-relaxed transition-colors duration-300">
              I am a passionate MERN Stack Developer and UI/UX Designer focused on
              creating visually appealing, fast, secure, and user-focused digital
              experiences. I build responsive websites, dashboards, and modern
              web applications while delivering clean design and strong SEO.
            </p>
          </div>

          {/* SKILLS */}
          <div className="card bg-white/60 dark:bg-white/5 border border-slate-200 dark:border-white/10 shadow-sm dark:shadow-none p-6 rounded-2xl transition-colors duration-300 animate-slide-up delay-100">
            <h3 className="text-2xl font-semibold mb-3 text-slate-900 dark:text-brandGold transition-colors duration-300">
              Technical Skills
            </h3>
            <div className="grid grid-cols-2 gap-3 text-slate-800 dark:text-blue-100 transition-colors duration-300">
              <span className="brand-chip">React / Vite</span>
              <span className="brand-chip">React Native</span>
              <span className="brand-chip">Node.js</span>
              <span className="brand-chip">Express.js</span>
              <span className="brand-chip">MongoDB</span>
              <span className="brand-chip">Tailwind CSS</span>
              <span className="brand-chip">UI/UX – Figma</span>
              <span className="brand-chip">Payment Integration</span>
              <span className="brand-chip">API Integration</span>
              <span className="brand-chip">Git & GitHub</span>
            </div>
          </div>

          {/* PROJECT HIGHLIGHTS */}
          <div className="card bg-white/60 dark:bg-white/5 border border-slate-200 dark:border-white/10 shadow-sm dark:shadow-none p-6 rounded-2xl transition-colors duration-300 animate-slide-up delay-200">
            <h3 className="text-2xl font-semibold mb-3 text-slate-900 dark:text-brandGold transition-colors duration-300">
              Highlights
            </h3>

            <ul className="space-y-2 text-slate-700 dark:text-neutral-300 transition-colors duration-300">
              <li>✔ MERN Stack web applications with authentication</li>
              <li>✔ SEO-optimized, high-performance websites</li>
              <li>✔ Custom admin dashboards & API endpoints</li>
              <li>✔ UI/UX design systems, wireframes & prototypes</li>
              <li>✔ Paystack Payment Integration</li>
              <li>✔ Deployments on Vercel with CI/CD</li>
            </ul>
          </div>
        </div>

        {/* RIGHT COLUMN */}
        <div className="space-y-8">

          {/* EXPERIENCE */}
          <div className="card bg-white/60 dark:bg-white/5 border border-slate-200 dark:border-white/10 shadow-sm dark:shadow-none p-6 rounded-2xl transition-colors duration-300 animate-slide-up">
            <h3 className="text-2xl font-semibold mb-6 text-slate-900 dark:text-brandGold transition-colors duration-300">
              Experience
            </h3>

            <div className="relative border-l border-slate-300 dark:border-slate-700 pl-6 space-y-8 transition-colors duration-300">

              {/* ITEM 1 */}
              <div className="relative">
                <h4 className="text-lg font-semibold text-brandBlue">
                  Freelance MERN Developer – IfyWigaTechz
                </h4>
                <p className="text-slate-500 dark:text-neutral-400 text-sm mb-2 transition-colors duration-300">2024 — Present</p>
                <p className="text-slate-700 dark:text-neutral-300 transition-colors duration-300">
                  Built responsive business websites, dashboards, custom APIs,
                  and UI/UX prototypes. Integrated Paystack, forms, and SEO.
                </p>
              </div>

              {/* ITEM 2 */}
              <div className="relative">
                <h4 className="text-lg font-semibold text-brandBlue">
                  UI/UX Designer (Freelance)
                </h4>
                <p className="text-slate-500 dark:text-neutral-400 text-sm mb-2 transition-colors duration-300">2024 — Present</p>
                <p className="text-slate-700 dark:text-neutral-300 transition-colors duration-300">
                  Designed modern web/mobile interfaces, user flows,
                  wireframes, and clickable prototypes using Figma.
                </p>
              </div>

              {/* ITEM 2 */}
              <div className="relative">
                <h4 className="text-lg font-semibold text-brandBlue">
                  Real-Estate Agent (Asa/Ndoki )
                </h4>
                <p className="text-slate-500 dark:text-neutral-400 text-sm mb-2 transition-colors duration-300">2023 — Present</p>
                <p className="text-slate-700 dark:text-neutral-300 transition-colors duration-300">
                   Single-family homes, apartments, townhouses, and condos for rentage.
                   Lands for sale, Flats, shops for rent and investment.
                </p>
              </div>

              {/* ITEM 4 */}
              <div className="relative">
                <h4 className="text-lg font-semibold text-brandBlue">
                  Patent Medicine Dealer (NAPPMED)
                </h4>
                <p className="text-slate-500 dark:text-neutral-400 text-sm mb-2 transition-colors duration-300">2020 — Present</p>
                <p className="text-slate-700 dark:text-neutral-300 transition-colors duration-300">
                  Deals on all kinds patent medicine,
                  analgesics, Non-Steriod Anti-Inflammatory Drugs, and Over The Counter
                </p>
              </div>

            </div>
          </div>

          {/* EDUCATION */}
          <div className="card bg-white/60 dark:bg-white/5 border border-slate-200 dark:border-white/10 shadow-sm dark:shadow-none p-6 rounded-2xl transition-colors duration-300 animate-slide-up delay-100">
            <h3 className="text-2xl font-semibold mb-3 text-slate-900 dark:text-brandGold transition-colors duration-300">
              Education
            </h3>

            <ul className="space-y-3 text-slate-700 dark:text-neutral-300 transition-colors duration-300">
              <li>
                <span className="font-semibold text-brandBlue">
                  Full-Stack Web Development
                </span>{" "}
                – Udemy (Angela Yu & MERN Bootcamps)
              </li>

              <li>
                <span className="font-semibold text-brandBlue">
                  UI/UX Design Mastery
                </span>{" "}
                – Figma Courses & Design Systems (Daniel Walter Scott)
              </li>

              <li>
                <span className="font-semibold text-brandBlue">
                  SEO & Digital Marketing
                </span>{" "}
                – Online Certifications
              </li>
            </ul>
          </div>

        </div>
      </div>

      {/* CTA */}
      <div className="text-center mt-12 animate-fade-in">
        <NavLink to="/hireme" className="btn btn-primary px-8 py-3 text-lg shadow-2xl">
          <img src="/ifywigatap.jpg" alt="IFYWIGATECHZ Logo" className="h-20 w-20 rounded-full object-cover animate-bounce"/>
          Hire Me
        </NavLink>
      </div>
    </section>
  );
}
