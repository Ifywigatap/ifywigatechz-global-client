import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Helmet } from "react-helmet-async";
import { teamMembers, galleryProjects } from "../data/aboutData"; // Import galleryProjects
import { ArrowLeft, MessageSquare, Twitter, Github, Linkedin, Code, Layout, ExternalLink, Users } from "lucide-react"; // Added Code, Layout, ExternalLink, Users icons

export default function TeamProfile() {
  const { id } = useParams();
  const member = teamMembers.find((m) => m.id === id);

  if (!member) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50 dark:bg-slate-950 px-4">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">Team Member Not Found</h2>
        <Link to="/team" className="text-brandBlue hover:underline flex items-center gap-2">
          <ArrowLeft size={18} /> Back to Team
        </Link>
      </div>
    );
  }

  // Filter projects related to this team member
  const memberProjects = galleryProjects.filter(project => 
    member.projects && member.projects.includes(project.id || project.link.split('/').pop()) // Assuming project.id or slug is used
  );

  // Filter other team members to display at the bottom (limit to 3)
  const relatedMembers = teamMembers.filter((m) => m.id !== id).slice(0, 3);

  // Animation Variants for skills
  const skillsContainerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.1
      }
    }
  };

  const skillItemVariants = {
    hidden: { opacity: 0, scale: 0.8, y: 15 },
    visible: { 
      opacity: 1, 
      scale: 1, 
      y: 0,
      transition: { type: "spring", stiffness: 260, damping: 20 }
    }
  };

  return (
    <section className="min-h-screen bg-slate-50 dark:bg-slate-950 py-20 px-4 transition-colors duration-300">
      <Helmet>
        <title>{member.name} | Team Profile | IFYWIGATECHZ</title>
      </Helmet>

      <div className="max-w-4xl mx-auto">
        <Link 
          to="/team" 
          className="inline-flex items-center gap-2 text-slate-500 dark:text-neutral-400 hover:text-brandBlue transition-colors mb-12"
        >
          <ArrowLeft size={18} /> Back to Team
        </Link>

        <div className="grid md:grid-cols-3 gap-12 items-start">
          {/* Profile Image Area */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="md:col-span-1 mb-8 md:mb-0" // Added mb-8 for spacing on mobile
          >
            <div className="relative rounded-[2rem] overflow-hidden border-4 border-white dark:border-white/10 shadow-2xl">
              <img 
                src={member.img} 
                alt={member.name} 
                className="w-full aspect-square object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-brandBlue/20 to-transparent" />
            </div>

            {/* Social Links Overlay */}
            <div className="flex justify-center gap-4 mt-8">
              {member.social?.whatsapp && (
                <a href={member.social.whatsapp.url} target="_blank" rel="noreferrer" className="p-3 bg-white dark:bg-white/5 rounded-xl border border-slate-200 dark:border-white/10 text-green-500 hover:scale-110 transition-transform shadow-md">
                  <MessageSquare size={20} />
                </a>
              )}
              {member.social?.twitter && (
                <a href={member.social.twitter.url} target="_blank" rel="noreferrer" className="p-3 bg-white dark:bg-white/5 rounded-xl border border-slate-200 dark:border-white/10 text-blue-400 hover:scale-110 transition-transform shadow-md">
                  <Twitter size={20} />
                </a>
              )}
              {member.social?.github && (
                <a href={member.social.github.url} target="_blank" rel="noreferrer" className="p-3 bg-white dark:bg-white/5 rounded-xl border border-slate-200 dark:border-white/10 text-slate-900 dark:text-white hover:scale-110 transition-transform shadow-md">
                  <Github size={20} />
                </a>
              )}
              {member.social?.linkedin && (
                <a href={member.social.linkedin.url} target="_blank" rel="noreferrer" className="p-3 bg-white dark:bg-white/5 rounded-xl border border-slate-200 dark:border-white/10 text-blue-600 hover:scale-110 transition-transform shadow-md">
                  <Linkedin size={20} />
                </a>
              )}
            </div>
          </motion.div>

          {/* Content Area */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="md:col-span-2 space-y-6"
          >
            <header>
              <h1 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white mb-2">{member.name}</h1> {/* Adjusted h1 size for mobile */}
              <p className="text-lg sm:text-xl font-bold text-brandBlue dark:text-brandGold">{member.role}</p> {/* Adjusted role size for mobile */}
            </header>

            <div className="prose dark:prose-invert max-w-none">
              <h3 className="text-xl font-bold text-slate-900 dark:text-white">Biography</h3>
              <p className="text-slate-600 dark:text-neutral-300 leading-relaxed">
                {member.bio}
              </p>
            </div>

            {/* Skills Section */}
            {member.skills && member.skills.length > 0 && (
              <div className="space-y-4">
                <h3 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white">Skills</h3> {/* Adjusted h3 size for mobile */}
                <motion.div 
                  variants={skillsContainerVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: "-50px" }}
                  className="flex flex-wrap gap-2"
                >
                  {member.skills.map((skill, index) => (
                    <motion.span 
                      key={index} 
                      variants={skillItemVariants}
                      whileHover={{ scale: 1.08, backgroundColor: "rgba(59, 130, 246, 0.2)" }}
                      className="px-4 py-2 rounded-full bg-brandBlue/10 border border-brandBlue/20 text-brandBlue text-sm font-medium cursor-default transition-colors"
                    >
                      {skill}
                    </motion.span>
                  ))}
                </motion.div>
              </div>
            )}

            {/* Projects Section */}
            {memberProjects.length > 0 && (
              <div className="space-y-4">
                <h3 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white">Featured Projects</h3> {/* Adjusted h3 size for mobile */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {memberProjects.map((project, index) => (
                    <a
                      key={index}
                      href={project.link}
                      target="_blank"
                      rel="noreferrer"
                      className="group relative overflow-hidden rounded-xl bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 shadow-sm hover:shadow-md transition-all duration-300 hover:border-brandGold"
                    >
                      <img
                        src={project.img}
                        alt={project.title}
                        className="w-full h-32 object-cover"
                      />
                      <div className="p-4">
                        <h4 className="font-semibold text-slate-900 dark:text-white group-hover:text-brandGold transition-colors">
                          {project.title}
                        </h4>
                        <p className="text-xs text-slate-500 dark:text-neutral-400 mt-1 line-clamp-2">
                          {project.desc}
                        </p>
                        <span className="inline-flex items-center gap-1 text-brandBlue text-sm mt-2 group-hover:underline">
                          View <ExternalLink size={14} />
                        </span>
                      </div>
                    </a>
                  ))}
                </div>
              </div>
            )}

            <div className="pt-8">
              <Link 
                to="/contact" 
                className="inline-flex items-center gap-2 px-8 py-4 bg-brandBlue text-white font-bold rounded-xl shadow-lg shadow-brandBlue/20 hover:bg-blue-700 transition-all hover:scale-105"
              >
                Work with {member.name.split(' ')[0]}
              </Link>
            </div>
          </motion.div>
        </div>

        {/* Related Team Members Section */}
        {relatedMembers.length > 0 && (
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-24 pt-12 border-t border-slate-200 dark:border-white/10"
          >
            <div className="flex items-center gap-3 mb-8">
              <div className="p-2 bg-brandBlue/10 rounded-lg text-brandBlue">
                <Users size={20} />
              </div>
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Other Team Members</h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {relatedMembers.map((m) => (
                <Link 
                  key={m.id} 
                  to={`/team/${m.id}`}
                  className="group block bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-2xl p-4 transition-all duration-300 hover:border-brandBlue hover:shadow-lg dark:hover:shadow-brandBlue/5"
                >
                  <div className="flex items-center gap-4">
                    <img 
                      src={m.img} 
                      alt={m.name} 
                      className="w-16 h-16 rounded-xl object-cover border-2 border-transparent group-hover:border-brandBlue transition-colors"
                    />
                    <div className="min-w-0">
                      <h4 className="font-bold text-slate-900 dark:text-white truncate group-hover:text-brandBlue transition-colors">
                        {m.name}
                      </h4>
                      <p className="text-xs text-slate-500 dark:text-neutral-400 truncate">
                        {m.role}
                      </p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </section>
  );
}