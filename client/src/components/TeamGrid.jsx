import { Link, useNavigate } from "react-router-dom";
import { teamMembers } from "../data/aboutData.js";
import { motion } from "framer-motion";

export default function Team({ members = teamMembers, title = "Meet Our Team", subtitle = "Passionate professionals dedicated to delivering exceptional digital experiences" }) {
  const navigate = useNavigate();

  // Variants for the grid container to trigger staggering
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.1,
      },
    },
  };

  // Variants for individual member cards
  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
  };

  return (
    <section className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-brandBlue via-blue-600 to-brandGold dark:from-brandBlue dark:via-white dark:to-brandGold bg-clip-text text-transparent mb-4">
            {title}
          </h2>
          <p className="text-xl text-slate-600 dark:text-neutral-300 max-w-2xl mx-auto">
            {subtitle}
          </p>
        </div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.1 }}
          className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8"
        >
          {members.map((member, index) => (
            <motion.div
              key={index}
              variants={cardVariants}
              onClick={() => navigate(`/team/${member.id}`)}
              className="group relative bg-white/60 dark:bg-white/5 backdrop-blur-xl rounded-2xl border border-slate-200 dark:border-white/10 p-8 text-center hover:bg-white/80 dark:hover:bg-white/10 hover:-translate-y-3 transition-all duration-500 shadow-lg dark:shadow-xl hover:shadow-2xl cursor-pointer"
            >
              <div className="relative mx-auto mb-6">
                <img
                  src={member.img}
                  alt={member.name}
                  className="w-32 h-32 rounded-2xl object-cover border-4 border-brandBlue/20 dark:border-brandGold/30 group-hover:border-brandBlue/50 dark:group-hover:border-brandGold/70 shadow-xl dark:shadow-2xl group-hover:scale-110 transition-all duration-500 mx-auto"
                />
                <div className="absolute -inset-2 bg-gradient-to-r from-brandBlue via-brandGold/50 to-purple-400 rounded-2xl blur opacity-0 group-hover:opacity-100 transition duration-700 animate-pulse" />
              </div>

              <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-2 group-hover:text-brandBlue dark:group-hover:text-brandGold transition-colors">
                {member.name}
              </h3>
              
              <p className="text-brandBlue dark:text-blue-400 text-lg font-semibold mb-4 bg-brandBlue/10 px-4 py-2 rounded-xl backdrop-blur">
                {member.role}
              </p>

              <p className="text-slate-600 dark:text-neutral-300 mb-6 leading-relaxed px-2">
                {member.bio}
              </p>

              <div 
                className="flex gap-3 justify-center relative z-10" 
                onClick={(e) => e.stopPropagation()}
              >
                {member.social?.whatsapp && (
                  <Link
                    to={member.social.whatsapp.url || member.social.whatsapp}
                    target="_blank"
                    className="w-12 h-12 bg-green-100 dark:bg-green-500/20 hover:bg-green-500 text-green-600 dark:text-green-400 hover:text-white rounded-xl flex items-center justify-center border border-green-200 dark:border-green-400/30 backdrop-blur hover:scale-110 transition-all duration-300"
                  >
                    💬
                  </Link>
                )}
                {member.social?.twitter && (
                  <Link
                    to={member.social.twitter.url || member.social.twitter}
                    target="_blank"
                    className="w-12 h-12 bg-blue-100 dark:bg-blue-500/20 hover:bg-blue-500 text-blue-600 dark:text-blue-400 hover:text-white rounded-xl flex items-center justify-center border border-blue-200 dark:border-blue-400/30 backdrop-blur hover:scale-110 transition-all duration-300"
                  >
                    🐦
                  </Link>
                )}
                {member.social?.github && (
                  <Link
                    to={member.social.github.url || member.social.github}
                    target="_blank"
                    className="w-12 h-12 bg-slate-100 dark:bg-gray-700 hover:bg-slate-200 dark:hover:bg-gray-600 text-slate-700 dark:text-gray-300 hover:text-slate-900 dark:hover:text-white rounded-xl flex items-center justify-center border border-slate-200 dark:border-transparent backdrop-blur hover:scale-110 transition-all duration-300"
                  >
                    💻
                  </Link>
                )}
                {member.social?.linkedin && (
                  <Link
                    to={member.social.linkedin.url || member.social.linkedin}
                    target="_blank"
                    className="w-12 h-12 bg-blue-100 dark:bg-blue-800/20 hover:bg-blue-600 text-blue-600 dark:text-blue-400 hover:text-white rounded-xl flex items-center justify-center border border-blue-200 dark:border-blue-700/30 backdrop-blur hover:scale-110 transition-all duration-300"
                  >
                    🔗
                  </Link>
                )}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
