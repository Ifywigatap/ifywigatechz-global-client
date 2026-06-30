import { useState } from 'react';
import { Link } from "react-router-dom";
import { careerJobs } from "../data/aboutData.js";

export default function Career() {
  const [filter, setFilter] = useState('all');

  const filteredJobs = filter === 'all' 
    ? careerJobs 
    : careerJobs.filter(job => job.type.toLowerCase() === filter);

  return (
    <section className="py-20 bg-slate-50 dark:bg-gradient-to-b dark:from-slate-900 dark:to-[#0B1220] transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-brandGold via-yellow-400 to-orange-400 bg-clip-text text-transparent mb-4">
            Join Our Team 🚀
          </h2>
          <p className="text-xl text-slate-600 dark:text-neutral-300 max-w-2xl mx-auto mb-8">
            Grow your career with a forward-thinking tech company building innovative solutions
          </p>
          
          {/* Filter Buttons */}
          <div className="flex flex-wrap justify-center gap-3 max-w-md mx-auto mb-12">
            {['all', 'Full-time', 'Freelance'].map((type) => (
              <button
                key={type}
                onClick={() => setFilter(type.toLowerCase())}
                className={`px-6 py-3 rounded-xl text-sm font-semibold transition-all duration-300 backdrop-blur-sm border ${
                  filter === type.toLowerCase()
                    ? 'bg-brandGold text-black shadow-lg shadow-brandGold/25 scale-105'
                    : 'bg-white/60 dark:bg-white/5 border-slate-200 dark:border-white/20 text-slate-700 dark:text-white hover:bg-white/80 dark:hover:bg-white/10 hover:border-slate-300 dark:hover:border-white/40 hover:scale-105 shadow-sm dark:shadow-none'
                }`}
              >
                {type}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredJobs.map((job, index) => (
            <div
              key={index}
              className="group bg-white/60 dark:bg-white/5 backdrop-blur-xl rounded-2xl border border-slate-200 dark:border-white/10 p-8 hover:bg-white/80 dark:hover:bg-white/10 hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 shadow-lg dark:shadow-xl"
            >
              {/* Job Header */}
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-2 group-hover:text-brandBlue dark:group-hover:text-brandGold transition-colors">
                    {job.title}
                  </h3>
                  <span className={`px-4 py-2 rounded-full text-xs font-semibold ${
                    job.type === 'Full-time' 
                      ? 'bg-green-500/20 text-green-400 border-green-400/30' 
                      : 'bg-purple-500/20 text-purple-400 border-purple-400/30'
                  } border backdrop-blur-sm`}>
                    {job.type}
                  </span>
                </div>
                <div className="text-3xl">💼</div>
              </div>

              {/* Description */}
              <p className="text-slate-600 dark:text-neutral-300 mb-6 leading-relaxed line-clamp-3">
                {job.desc}
              </p>

              {/* Salary */}
              <div className="bg-gradient-to-r from-emerald-500/10 to-green-500/10 border border-emerald-400/30 p-4 rounded-xl mb-6 backdrop-blur">
                <p className="text-lg font-bold text-emerald-400">{job.salary}</p>
              </div>

              {/* Skills */}
              <div className="mb-6">
                <h4 className="font-semibold text-slate-800 dark:text-neutral-200 mb-3">Required Skills</h4>
                <div className="flex flex-wrap gap-2">
                  {job.skills.map((skill, s) => (
                    <span
                      key={s}
                      className="px-3 py-1 bg-brandBlue/20 text-brandBlue text-xs rounded-full border border-brandBlue/30 backdrop-blur"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              {/* Apply Button */}
              <Link
                to={job.apply}
                className="w-full block text-center py-4 px-6 bg-gradient-to-r from-brandGold to-yellow-500 hover:from-yellow-400 hover:to-orange-500 text-black font-bold rounded-xl shadow-lg hover:shadow-xl hover:scale-[1.02] transition-all duration-300 backdrop-blur-sm border-2 border-brandGold/20"
              >
                Apply Now →
              </Link>
            </div>
          ))}
        </div>

        {filteredJobs.length === 0 && (
          <div className="text-center py-20">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">No positions match this filter</h3>
            <p className="text-slate-600 dark:text-neutral-400 mb-8">Try another filter or check back later for new opportunities</p>
            <button
              onClick={() => setFilter('all')}
              className="px-8 py-4 bg-brandBlue text-white font-bold rounded-xl hover:bg-blue-600 transition-all duration-300"
            >
              Show All Jobs
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
