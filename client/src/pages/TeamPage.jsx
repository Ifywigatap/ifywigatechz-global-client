import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useState, useMemo } from "react";
import { 
  Zap, Target, Heart, Users, BarChart2, TrendingUp, Globe, Star, 
  Lightbulb, Workflow, ShieldCheck, Trophy, Award, Home, Clock, 
  Smile, FlaskConical, Code, CheckCircle, Rocket, DollarSign, 
  CalendarDays, GitBranch, Terminal, Layers, Sun, Briefcase, MessageSquare 
} from "lucide-react";
import { teamMembers } from "../data/aboutData.js";
import TeamGrid from "../components/TeamGrid.jsx";
import CompanyMetrics from "../components/CompanyMetrics.jsx";
import TeamValues from "../components/TeamValues.jsx";
import ProductCulture from "../components/ProductCulture.jsx";
import TeamAchievements from "../components/TeamAchievements.jsx";
import DevelopmentWorkflow from "../components/DevelopmentWorkflow.jsx";
import BenefitsPerks from "../components/BenefitsPerks.jsx";
import HiringProcess from "../components/HiringProcess.jsx";

/**
 * Static Data moved outside component to prevent re-allocation on each render
 */
const values = [
  {
    icon: <Target className="text-brandBlue" size={28} />,
    title: "Mission-Driven",
    desc: "Every SaaS solution we build is aligned with our core mission: to empower businesses and individuals through innovative, scalable technology.",
  },
  {
    icon: <Heart className="text-red-400" size={28} />,
    title: "People First",
    desc: "We prioritize relationships, transparency, and the well-being of our team members and clients above all else.",
  },
  {
    icon: <Zap className="text-brandGold" size={28} />,
    title: "Excellence",
    desc: "We hold ourselves to the highest standards, from cutting-edge product design to robust deployment and ongoing support. Good enough is never enough.",
  },
  {
    icon: <Users className="text-green-400" size={28} />,
    title: "Collaboration",
    desc: "Great SaaS products are built together. We foster an environment where ideas flow freely, cross-functional teamwork thrives, and user-centric solutions emerge.",
  },
];

const companyMetrics = [
  { icon: <BarChart2 size={24} className="text-brandBlue" />, value: "300k+", label: "Active Users" },
  { icon: <TrendingUp size={24} className="text-emerald-500" />, value: "25%", label: "QoQ Growth" },
  { icon: <Globe size={24} className="text-yellow-500" />, value: "40+", label: "Countries Served" },
  { icon: <Star size={24} className="text-purple-500" />, value: "4.8/5", label: "App Rating" },
];

const productCulture = [
  { icon: <Lightbulb size={24} className="text-yellow-500" />, title: "Innovation First", desc: "We're constantly exploring new technologies and ideas to keep our product cutting-edge." },
  { icon: <Workflow size={24} className="text-brandBlue" />, title: "Agile & Iterative", desc: "Our product development is nimble, customer-centric, and focused on continuous delivery." },
  { icon: <Users size={24} className="text-green-500" />, title: "User-Obsessed", desc: "Every feature and design choice starts and ends with a deep understanding of our users' needs." },
  { icon: <ShieldCheck size={24} className="text-red-500" />, title: "Quality Driven", desc: "Rigorous testing and peer reviews ensure our SaaS platform is robust, secure, and reliable." },
];

const teamAchievements = [
  { icon: <Trophy size={28} className="text-brandGold" />, title: "Product of the Year 2023", desc: "Recognized for our innovative features and market impact." },
  { icon: <Users size={28} className="text-brandBlue" />, title: "Exceeded User Growth Target by 150%", desc: "Our marketing and product teams drove unprecedented adoption." },
  { icon: <Zap size={28} className="text-emerald-500" />, title: "Launched 5 Major Features This Year", desc: "Rapid development cycles brought significant value to our users." },
  { icon: <Award size={28} className="text-purple-500" />, title: "Highest Customer Satisfaction Score", desc: "Our support and product teams consistently delight our users." },
];

const globalRemoteStats = [
  { icon: <Globe size={28} className="text-brandBlue" />, value: "10+", label: "Countries Represented" },
  { icon: <Home size={28} className="text-emerald-500" />, value: "85%", label: "Fully Remote" },
  { icon: <Clock size={28} className="text-yellow-500" />, value: "5+", label: "Time Zones" },
  { icon: <Smile size={28} className="text-purple-500" />, value: "High", label: "Autonomy" },
];

const productDevelopmentWorkflow = [
  { step: 1, icon: <Lightbulb size={28} className="text-yellow-500" />, title: "Ideation & Discovery", desc: "Gathering insights, user research, and conceptualizing new features or products." },
  { step: 2, icon: <FlaskConical size={28} className="text-orange-500" />, title: "Design & Prototyping", desc: "Creating wireframes, mockups, and interactive prototypes for user testing." },
  { step: 3, icon: <Code size={28} className="text-blue-500" />, title: "Development Sprints", desc: "Agile development cycles with continuous integration and delivery." },
  { step: 4, icon: <CheckCircle size={28} className="text-green-500" />, title: "Testing & QA", desc: "Rigorous quality assurance, automated testing, and bug fixing." },
  { step: 5, icon: <Rocket size={28} className="text-purple-500" />, title: "Launch & Deployment", desc: "Bringing features live to users, monitoring performance and stability." },
  { step: 6, icon: <BarChart2 size={28} className="text-red-500" />, title: "Feedback & Iteration", desc: "Collecting user feedback, analyzing data, and planning future enhancements." },
];

const benefitsPerks = [
  { icon: <DollarSign size={28} className="text-emerald-500" />, title: "Competitive Compensation", desc: "Attractive salaries and performance bonuses." },
  { icon: <CalendarDays size={28} className="text-brandBlue" />, title: "Flexible Work Hours", desc: "Work-life balance with flexible scheduling and generous PTO." },
  { icon: <GitBranch size={28} className="text-purple-500" />, title: "Growth & Development", desc: "Access to courses, conferences, and mentorship programs." },
  { icon: <Terminal size={28} className="text-yellow-500" />, title: "Latest Tech Stack", desc: "Work with cutting-edge tools and innovative solutions." },
  { icon: <Layers size={28} className="text-orange-500" />, title: "Impactful Work", desc: "Directly contribute to a product used by thousands globally." },
  { icon: <Sun size={28} className="text-red-500" />, title: "Wellness Programs", desc: "Health and wellness initiatives, including mental health support." },
];

const hiringProcess = [
  { step: 1, icon: <Briefcase size={28} className="text-brandBlue" />, title: "Apply Online", desc: "Submit your application through our careers portal with your resume and portfolio." },
  { step: 2, icon: <MessageSquare size={28} className="text-emerald-500" />, title: "Initial Screen", desc: "A 30-minute introductory call with our recruiting team to learn about you." },
  { step: 3, icon: <Code size={28} className="text-yellow-500" />, title: "Technical Review", desc: "Showcase your expertise via a technical interview or a relevant assessment." },
  { step: 4, icon: <Users size={28} className="text-purple-500" />, title: "Team Interview", desc: "Meet the team you'll be working with and explore our collaborative environment." },
  { step: 5, icon: <CheckCircle size={28} className="text-brandBlue" />, title: "The Offer", desc: "Welcome to the team! We'll handle the onboarding and get you started on building the future." },
];

export default function TeamPage() {
  const [activeDepartment, setActiveDepartment] = useState('All');

  // Get unique departments from team members data
  const departments = useMemo(() => {
    const uniqueDepartments = new Set(teamMembers.map(member => member.department).filter(Boolean));
    return ['All', ...Array.from(uniqueDepartments)];
  }, []);

  // Filter members based on active department
  const filteredMembers = useMemo(() => {
    if (activeDepartment === 'All') {
      return teamMembers;
    }
    return teamMembers.filter(member => member.department === activeDepartment);
  }, [activeDepartment]);

  const leadershipMembers = filteredMembers.filter(m => m.department === 'Leadership');
  const coreTeamMembers = filteredMembers.filter(m => m.department !== 'Leadership');

  // Shared animation variant for a premium scroll experience
  const fadeInUp = {
    initial: { opacity: 0, y: 40 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, amount: 0.15 },
    transition: { duration: 0.8, ease: "easeOut" }
  };

  return (
    <section className="min-h-screen bg-slate-50 dark:bg-gradient-to-b dark:from-slate-950 dark:via-slate-900 dark:to-blue-950 transition-colors duration-300">
      <Helmet>
        <title>Our Product Team | IFYWIGATECHZ SaaS Innovators</title>
        <meta name="description" content="Meet the talented product team behind IFYWIGATECHZ. Developers, designers, and strategists building cutting-edge SaaS solutions." />
      </Helmet>

      {/* Hero */}
      <div className="relative overflow-hidden py-24 sm:py-32">
        <div className="absolute inset-0 bg-gradient-to-r from-brandBlue/10 via-transparent to-brandGold/10" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-brandBlue/10 rounded-full blur-3xl" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brandBlue/10 border border-brandBlue/20 text-brandBlue text-sm font-medium mb-6">
              <Zap size={16} />
              Innovating the Future of SaaS
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-slate-900 dark:text-white mb-6 leading-tight">
              Meet the Visionaries Behind Our <span className="text-brandGold">SaaS</span> Platform
            </h1>
            <p className="text-xl text-slate-600 dark:text-neutral-400 max-w-2xl mx-auto">
              A diverse group of thinkers, creators, and problem-solvers united by a passion for building transformative SaaS solutions.
            </p>
          </motion.div>
        </div>
      </div>

      {/* Company Metrics */}
      <motion.div {...fadeInUp}>
        <CompanyMetrics metrics={companyMetrics} />
      </motion.div>

      {/* Values */}
      <motion.div {...fadeInUp}>
        <TeamValues values={values} />
      </motion.div>

      {/* Department Filter */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
        <div className="flex flex-wrap justify-center gap-3">
          {departments.map((dept) => (
            <motion.button
              key={dept}
              onClick={() => setActiveDepartment(dept)}
              className={`px-6 py-2 rounded-full text-sm font-bold transition-all duration-300 shadow-sm ${
                activeDepartment === dept
                  ? "bg-brandBlue text-white scale-105 shadow-brandBlue/20"
                  : "bg-white/60 dark:bg-neutral-800/60 text-slate-700 dark:text-neutral-300 border border-slate-200 dark:border-white/10 hover:bg-white dark:hover:bg-neutral-700 backdrop-blur-sm"
              }`}
            >
              {dept}
            </motion.button>
          ))}
        </div>
      </div>

      {/* Product Culture */}
      <motion.div {...fadeInUp}>
        <ProductCulture culture={productCulture} />
      </motion.div>

      {/* Leadership Team Grid */}
      {leadershipMembers.length > 0 && (
        <motion.div {...fadeInUp}>
          <TeamGrid 
            members={leadershipMembers} 
            title="Our SaaS Product Leadership" 
            subtitle="Guiding our vision with expertise and innovation to shape the future of our platform." 
          />
        </motion.div>
      )}

      {/* Achievements */}
      <motion.div {...fadeInUp}>
        <TeamAchievements achievements={teamAchievements} />
      </motion.div>

      {/* Workflow */}
      <motion.div {...fadeInUp}>
        <DevelopmentWorkflow workflow={productDevelopmentWorkflow} />
      </motion.div>

      {/* Core Team Grid (the rest of the team) */}
      {coreTeamMembers.length > 0 && (
        <motion.div {...fadeInUp}>
          <TeamGrid 
            members={coreTeamMembers} 
            title="Our Dedicated Core Team" 
            subtitle="The brilliant minds and hands-on builders who bring our SaaS solutions to life every day." 
          />
        </motion.div>
      )}

      {/* Benefits */}
      <motion.div {...fadeInUp}>
        <BenefitsPerks benefits={benefitsPerks} />
      </motion.div>

      {/* Hiring */}
      <motion.div {...fadeInUp}>
        <HiringProcess process={hiringProcess} />
      </motion.div>

      {/* Enhanced CTA Section */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="bg-white/60 dark:bg-gradient-to-r dark:from-brandGold/20 dark:via-yellow-500/10 dark:to-brandGold/20 rounded-3xl border border-slate-200 dark:border-brandGold/20 p-8 sm:p-12 text-center shadow-lg dark:shadow-none transition-colors duration-300">
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white mb-4"> 
            Ready to Build the Next Big SaaS?
          </h2>
          <p className="text-slate-600 dark:text-neutral-400 mb-8 max-w-lg mx-auto">
            We're always looking for passionate engineers, designers, and product leaders to elevate our SaaS platform.
          </p>
          <Link
            to="/careers"
            className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-brandGold to-yellow-500 text-black font-bold rounded-xl shadow-lg hover:shadow-brandGold/40 transition-all duration-300 hover:-translate-y-1"
          >
            View Open Positions
          </Link>
        </div>
      </div>
    </section>
  );
}
