import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Download } from 'lucide-react';
import { optimizeImage } from '../utils/cloudinary';

const stats = [
    { value: "120+", label: "Projects" },
    { value: "500+", label: "Students" },
    { value: "6+", label: "Years" },
    { value: "15+", label: "Industries" }
];

const highlights = [
    {
        title: "💡 My Mission",
        text: "Empower individuals and businesses through technology."
    },
    {
        title: "🚀 What I Do",
        text: "Build web apps, design experiences, and train developers."
    }
];

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: { staggerChildren: 0.1, delayChildren: 0.2 }
    }
};

const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.5 } }
};

export default function AboutGrid() {
    return (
        <motion.div 
            className="grid grid-cols-1 md:grid-cols-3 gap-10 items-start mt-16"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
        >

            {/* LEFT CONTENT */}
            <motion.div className="md:col-span-2 space-y-6" variants={itemVariants}>

                <h2 className="text-2xl sm:text-3xl font-bold text-brandBlue dark:text-blue-400">
                    About IFYWIGATECHZ Global Services
                </h2>

                <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
                    My name is{" "}
                    <span className="text-brandGold dark:text-brandGold font-semibold">
                        Ifeanyichukwu Oko Isu
                    </span>{" "}
                    — widely known as{" "}
                    <span className="text-brandGold dark:text-brandGold font-semibold">
                        Ify Wigatechz
                    </span>.
                    I am a Full-Stack Web Developer, UI/UX Designer, and a Consumate Digital Skills Trainer
                    based in Nigeria.
                </p>

                <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
                    My mission is simple:{" "}
                    <span className="text-brandGold dark:text-brandGold font-semibold">
                        build powerful digital solutions
                    </span>{" "}
                    that help businesses grow and individuals succeed seemlessly.
                </p>

                <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
                    I specialize in modern technologies like React, TailwindCSS, MERN Stack,
                    and scalable deployments — building products that are{" "}
                    <span className="text-brandGold dark:text-brandGold font-semibold">
                        fast, secure, and visually stunning.
                    </span>
                </p>

                {/* HIGHLIGHT CARDS */}
                <div className="grid-responsive sm:grid-cols-2 mt-6">
                    {highlights.map((item, i) => (
                        <div
                            key={i}
                            className="bg-white/40 dark:bg-white/5 backdrop-blur-xl p-5 rounded-2xl border border-slate-200 dark:border-white/10 hover:bg-white/60 dark:hover:bg-white/10 transition-all duration-300 shadow-sm"
                        >
                            <h4 className="font-semibold text-brandBlue dark:text-blue-400">
                                {item.title}
                            </h4>
                            <p className="text-sm text-slate-600 dark:text-slate-400 mt-2">
                                {item.text}
                            </p>
                        </div>
                    ))}
                </div>

                <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
                    As the founder of{" "}
                    <span className="text-brandGold dark:text-brandGold font-semibold">
                        Ifywigatechz Academy
                    </span>,
                    I train aspiring developers through hands-on learning.
                </p>

                <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
                    I’ve worked across industries including real estate, construction,
                    e-commerce, and branding — delivering results-driven solutions.
                </p>

                <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
                    My vision is to empower young Africans with digital skills and
                    create global opportunities through technology.
                </p>

                {/* MANTRA */}
                <div className="bg-brandGold/10 border border-brandGold/20 p-5 rounded-2xl backdrop-blur-md">
                    <p className="text-brandGold font-bold text-center italic">
                        Unlocking Potential Through Technology and Innovation.
                    </p>
                </div>

                {/* STATS */}
                <div className="mt-10 grid grid-cols-2 lg:grid-cols-4 gap-4">
                    {stats.map((stat, i) => (
                        <div key={i} className="bg-white/40 dark:bg-white/5 backdrop-blur-xl p-5 rounded-2xl border border-slate-200 dark:border-white/10 text-center hover:scale-105 transition-all duration-300 shadow-sm">
                            <p className="text-3xl font-black text-brandGold">{stat.value}</p>
                            <p className="text-xs uppercase tracking-widest text-slate-500 dark:text-slate-400 mt-2 font-bold">{stat.label}</p>
                        </div>
                    ))}
                </div>

                {/* CTA */}
                <div className="flex flex-wrap gap-4 mt-12">
                    <Link to="/startproject" className="px-8 py-3 bg-green-500 hover:bg-green-600 text-white rounded-xl hover:scale-105 transition shadow-lg font-bold">
                        Start Project →
                    </Link>
                    <Link to="/learn" className="px-8 py-3 bg-brandBlue text-white rounded-xl hover:scale-105 transition shadow-lg font-bold">
                        Explore Courses →
                    </Link>
                    <Link to="/services" className="px-8 py-3 bg-white/60 dark:bg-white/10 border border-slate-200 dark:border-white/20 text-slate-900 dark:text-white rounded-xl hover:scale-105 hover:bg-white/80 dark:hover:bg-white/20 transition shadow-md font-bold">
                        Services →
                    </Link>
                    <Link to="/resume" className="px-8 py-3 bg-white/60 dark:bg-white/10 border border-slate-200 dark:border-white/20 text-slate-900 dark:text-white rounded-xl hover:scale-105 hover:bg-white/80 dark:hover:bg-white/20 transition shadow-md font-bold">
                        Resume →
                    </Link>
                </div>

            </motion.div>

            {/* RIGHT SIDEBAR */}
            <motion.div className="space-y-8 md:mt-0 mt-12" variants={itemVariants}>

                {/* FOUNDER CARD */}
                <div className="bg-white/40 dark:bg-white/5 backdrop-blur-xl p-8 rounded-3xl border border-slate-200 dark:border-white/10 text-center hover:scale-[1.02] transition-all duration-500 shadow-xl relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-brandBlue to-brandGold"></div>
                    <img
                        src={optimizeImage("/Isu.jpg")}
                        alt="Founder"
                        loading="lazy"
                        className="h-28 w-28 mx-auto rounded-2xl object-cover border-2 border-brandGold shadow-lg mb-4"
                    />
                    <h3 className="text-xl font-black text-slate-900 dark:text-white leading-tight">Ifeanyichukwu Oko Isu</h3>
                    <p className="text-xs font-bold text-brandBlue dark:text-blue-400 uppercase tracking-tighter mt-1">Founder — Ifywigatechz Global Services</p>
                    <p className="text-sm text-slate-600 dark:text-slate-400 mt-4 leading-relaxed">Full-Stack Developer, UI/UX Designer, and Digital Skills Trainer with a passion for African tech growth.</p>
                </div>

                {/* TECH STACK */}
                <div className="bg-white/40 dark:bg-white/5 backdrop-blur-xl p-8 rounded-3xl border border-slate-200 dark:border-white/10 shadow-xl">
                    <h3 className="font-bold text-lg mb-6 text-brandBlue dark:text-blue-400 flex items-center gap-2">
                        <span className="w-8 h-8 rounded-lg bg-brandBlue/10 flex items-center justify-center">🛠</span>
                        Core Tech Stack
                    </h3>
                    <ul className="space-y-4">
                        {[
                            { name: "React, Vite, Tailwind CSS", icon: "⚡" },
                            { name: "Node.js, Express", icon: "⚙️" },
                            { name: "MongoDB, PostgreSQL", icon: "🗄" },
                            { name: "AWS, Vercel", icon: "☁️" },
                            { name: "Figma", icon: "🎨" }
                        ].map((tech, idx) => (
                            <li key={idx} className="flex items-center gap-3 text-sm font-medium text-slate-700 dark:text-slate-300 group">
                                <span className="w-6 h-6 flex items-center justify-center grayscale group-hover:grayscale-0 transition-all">{tech.icon}</span>
                                {tech.name}
                            </li>
                        ))}
                    </ul>
                </div>

                {/* BUSINESS PROFILE */}
                <div className="bg-white/40 dark:bg-white/5 backdrop-blur-xl p-8 rounded-3xl border border-slate-200 dark:border-white/10 shadow-xl relative overflow-hidden">
                    <h3 className="font-bold text-lg mb-4 text-brandBlue dark:text-blue-400 flex items-center gap-2">
                        <span className="w-8 h-8 rounded-lg bg-brandBlue/10 flex items-center justify-center">📄</span>
                        Company Profile
                    </h3>
                    <p className="text-sm text-slate-600 dark:text-slate-400 mb-6 leading-relaxed">
                        Get a detailed overview of our service architecture, past work, and how we deliver value.
                    </p>
                    <a 
                        href="/business-profile.pdf" 
                        download
                        className="flex items-center justify-center gap-2 w-full py-3 bg-brandBlue text-white font-bold rounded-xl hover:bg-blue-700 transition-all duration-300 shadow-lg shadow-brandBlue/20"
                    >
                        <Download size={18} />
                        Download Profile
                    </a>
                </div>

            </motion.div>
        </motion.div>
    );
}