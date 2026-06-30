import { Helmet } from "react-helmet-async";
import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from "framer-motion";
import { TrendingUp, Quote, Star, Briefcase, MapPin, BadgeCheck, UserPlus, Send, XCircle, CheckCircle, ArrowRight, Globe, Users } from "lucide-react";
import Toast from '../components/Toast'; // Assuming Toast component is available

const stories = [
  {
    id: "chidera",
    name: "Chidera Okoro",
    role: "Frontend Developer",
    company: "TechFlow Solutions", // Placeholder
    location: "Lagos, Nigeria",
    prevSalary: "₦80,000",
    newSalary: "₦450,000",
    course: "Full-Stack Web Development",
    quote:
      "IFYWIGATECHZ Academy changed my life. Within 3 months, I landed my dream job.",
    image: "https://randomuser.me/api/portraits/women/44.jpg", // Generic placeholder
  },
  {
    id: "emeka",
    name: "Emeka Nwosu",
    role: "Backend Engineer",
    company: "Global Innovations", // Placeholder
    location: "Abuja, Nigeria",
    prevSalary: "₦120,000",
    newSalary: "₦600,000",
    course: "Node.js & API Development",
    quote: "The practical approach to backend development was exactly what I needed to elevate my skills and career.",
    image: "https://randomuser.me/api/portraits/men/32.jpg", // Generic placeholder
  },
  {
    id: "fatima",
    name: "Fatima Bello",
    role: "UI/UX Designer",
    company: "Creative Minds Agency", // Placeholder
    location: "Accra, Ghana",
    prevSalary: "₦90,000",
    newSalary: "₦500,000",
    course: "UI/UX Design Mastery",
    quote: "I learned to create user-centric designs that truly impact product success. Highly recommend!",
    image: "https://randomuser.me/api/portraits/women/68.jpg", // Generic placeholder
  },
  {
    id: "david",
    name: "David Adebayo",
    role: "DevOps Engineer",
    company: "CloudScale Inc.", // Placeholder
    location: "Cape Town, South Africa",
    prevSalary: "₦150,000",
    newSalary: "₦750,000",
    course: "AWS & DevOps Fundamentals",
    quote: "The hands-on labs prepared me for real-world cloud challenges. My career took off after this course.",
    image: "https://randomuser.me/api/portraits/men/77.jpg", // Generic placeholder
  },
  {
    id: "grace",
    name: "Grace Okoro",
    role: "Digital Marketing Specialist",
    company: "GrowthHackers Ltd.", // Placeholder
    location: "Nairobi, Kenya",
    prevSalary: "₦70,000",
    newSalary: "₦400,000",
    course: "Digital Marketing & SEO",
    quote: "I now understand how to drive traffic and conversions effectively. My clients are thrilled with the results.",
    image: "https://randomuser.me/api/portraits/women/21.jpg", // Generic placeholder
  },
  {
    id: "john",
    name: "John Okafor",
    role: "Mobile App Developer",
    company: "Innovate Mobile", // Placeholder
    location: "Lagos, Nigeria",
    prevSalary: "₦100,000",
    newSalary: "₦550,000",
    course: "React Native Development",
    quote: "Building cross-platform apps is now second nature. The instructors were incredibly supportive.",
    image: "https://randomuser.me/api/portraits/men/55.jpg", // Generic placeholder
  },
  // Add others here...
];

export default function SuccessStories() {
  const [showSubmissionForm, setShowSubmissionForm] = useState(false);
  const [activeCategory, setActiveCategory] = useState("All");
  const [formData, setFormData] = useState({
    name: '', role: '', company: '', location: '', course: '',
    prevSalary: '', newSalary: '', quote: '', image: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null); // 'success', 'error', null
  const [submitMessage, setSubmitMessage] = useState('');
  const [toast, setToast] = useState(null);

  // Filter Logic
  const categories = useMemo(() => {
    const unique = new Set(stories.map(s => s.course));
    return ["All", ...Array.from(unique).sort()];
  }, []);

  const filteredStories = useMemo(() => {
    if (activeCategory === "All") return stories;
    return stories.filter(s => s.course === activeCategory);
  }, [activeCategory]);

  const inputClasses = "w-full p-4 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-slate-900 dark:text-white placeholder-slate-500 focus:ring-2 focus:ring-brandBlue outline-none transition-all";

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);
    setSubmitMessage('');

    // Basic validation
    if (!formData.name || !formData.quote || !formData.course) {
      setSubmitStatus('error');
      setSubmitMessage('Please fill in your Name, Course, and Quote.');
      setToast({ message: 'Please fill required fields.', type: 'error' });
      setIsSubmitting(false);
      return;
    }

    // Simulate API call
    try {
      await new Promise(resolve => setTimeout(resolve, 1500)); // Simulate network delay
      // In a real application, you would send formData to your backend here
      console.log('Testimonial submitted:', formData);
      setSubmitStatus('success');
      setSubmitMessage('Thank you for sharing your success story! We will review it shortly.');
      setToast({ message: 'Story submitted successfully!', type: 'success' });
      setFormData({ name: '', role: '', company: '', location: '', course: '', prevSalary: '', newSalary: '', quote: '', image: '' }); // Reset form
      setShowSubmissionForm(false); // Hide form on success
    } catch (error) {
      setSubmitStatus('error');
      setSubmitMessage('Failed to submit your story. Please try again.');
      setToast({ message: 'Submission failed.', type: 'error' });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="relative bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white overflow-hidden min-h-screen transition-colors duration-300">
      <Helmet>
        <title>Success Stories | IFYWIGATECHZ</title>
      </Helmet>

      {/* Background Glow */}
      <div className="absolute inset-0 bg-gradient-to-b from-blue-100/50 dark:from-blue-900/20 via-transparent dark:to-black transition-colors duration-300" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-brandGold/10 blur-[120px] pointer-events-none" />

      {/* Hero */}
      <div className="relative max-w-6xl mx-auto px-4 py-28 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/60 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-full text-sm text-brandGold mb-6 shadow-sm dark:shadow-none transition-colors duration-300">
            <TrendingUp size={16} />
            Proven Results
          </div>

          <h1 className="text-5xl md:text-6xl font-black leading-tight mb-6">
            Real People. <br />
            <span className="bg-gradient-to-r from-brandGold to-yellow-400 bg-clip-text text-transparent">
              Real Transformations.
            </span>
          </h1>

          <p className="text-slate-600 dark:text-neutral-400 max-w-xl mx-auto text-lg">
            Our students don’t just learn — they launch careers, earn globally,
            and build real-world impact.
          </p>
        </motion.div>
      </div>

      {/* Stats Bar */}
      <div className="max-w-5xl mx-auto px-4 mb-20">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { value: "500+", label: "Students", icon: <Users size={20} className="text-brandBlue" /> },
            { value: "90%", label: "Hired", icon: <Briefcase size={20} className="text-emerald-500" /> },
            { value: "3.5x", label: "Avg. Salary Growth", icon: <TrendingUp size={20} className="text-brandGold" /> },
            { value: "15+", label: "Countries", icon: <Globe size={20} className="text-purple-500" /> },
          ].map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className="bg-white/60 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-2xl p-6 text-center backdrop-blur shadow-sm transition-colors duration-300 group hover:border-brandBlue/30"
            >
              <div className="flex justify-center mb-3 opacity-80 group-hover:scale-110 transition-transform">{stat.icon}</div>
              <div className="text-3xl font-black text-brandGold">
                {stat.value}
              </div>
              <div className="h-1 w-12 bg-brandGold/50 rounded-full mx-auto my-2" />
              <div className="text-xs font-bold uppercase tracking-widest text-slate-500 dark:text-neutral-400">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Filter Bar */}
      <div className="max-w-5xl mx-auto px-4 mb-12 flex flex-wrap justify-center gap-3">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-6 py-2.5 rounded-full text-sm font-bold transition-all duration-300 ${
              activeCategory === cat
                ? "bg-brandBlue text-white shadow-lg shadow-brandBlue/20 scale-105"
                : "bg-white/60 dark:bg-white/5 text-slate-600 dark:text-neutral-300 border border-slate-200 dark:border-white/10 hover:bg-white dark:hover:bg-white/10 shadow-sm"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Stories */}
      <motion.div 
        layout
        className="max-w-6xl mx-auto px-4 pb-24 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        <AnimatePresence mode="popLayout">
        {filteredStories.map((story, i) => (
          <motion.article
            key={story.id}
            layout
            whileHover={{ y: -6 }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ delay: i * 0.05, duration: 0.5 }}
            className="group relative bg-white/60 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-[2rem] p-6 backdrop-blur-xl overflow-hidden shadow-lg dark:shadow-none transition-colors duration-300 hover:border-brandGold/50"
          >
            {/* Glow Hover Effect */}
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition duration-500 bg-gradient-to-br from-brandGold/10 to-transparent" />

            {/* Header */}
            <div className="flex items-center gap-4 mb-4">
              <img
                src={story.image}
                alt={story.name}
                loading="lazy"
                className="w-16 h-16 rounded-full object-cover border-2 border-brandGold/30 shadow-md group-hover:scale-105 transition-transform duration-300"
              />
              <div>
                <h3 className="font-bold text-xl text-slate-900 dark:text-white flex items-center gap-1 group-hover:text-brandGold transition-colors">
                  {story.name}
                  <BadgeCheck size={16} className="text-green-400" />
                </h3>
                <p className="text-sm text-brandBlue dark:text-brandGold">{story.role}</p>
              </div>
            </div>

            {/* Meta */}
            <div className="flex flex-wrap gap-3 text-xs text-slate-500 dark:text-neutral-400 mb-5">
              <span className="flex items-center gap-1">
                <Briefcase size={14} /> {story.company}
              </span>
              <span className="flex items-center gap-1">
                <MapPin size={14} /> {story.location}
              </span>
            </div>

            {/* Salary Upgrade */}
            <div className="flex flex-col gap-2 mb-5">
              <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Salary Transformation</p>
              <div className="flex items-center gap-2 text-sm font-semibold">
                <span className="bg-red-500/10 text-red-500 px-3 py-1 rounded-full line-through">
                  {story.prevSalary}
                </span>
                <ArrowRight size={14} className="text-slate-400" />
                <span className="bg-green-500/10 text-green-500 px-3 py-1 rounded-full font-semibold">
                  {story.newSalary}
                </span>
              </div>
            </div>

            {/* Quote */}
            <div className="relative bg-slate-100 dark:bg-white/5 rounded-2xl p-4 mb-5 transition-colors duration-300">
              <Quote
                size={18}
                className="absolute top-3 left-3 text-brandGold/30"
              />
              <p className="text-sm text-slate-700 dark:text-neutral-300 pl-7 leading-relaxed">
                {story.quote}
              </p>
            </div>

            {/* Footer */}
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium text-slate-600 dark:text-neutral-500">
                {story.course}
              </span>

              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    size={14}
                    className="text-brandGold fill-brandGold group-hover:scale-110 transition-transform"
                  />
                ))}
              </div>
            </div>
          </motion.article>
        ))}
        </AnimatePresence>
      </motion.div>

      {/* Share Your Story CTA */}
      <div className="max-w-4xl mx-auto px-4 pb-16 text-center">
        <motion.button
          onClick={() => setShowSubmissionForm(!showSubmissionForm)}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-3 px-8 py-4 bg-brandBlue text-white font-bold rounded-xl shadow-lg hover:bg-blue-700 hover:scale-105 transition-all duration-300"
        >
          <UserPlus size={20} /> Share Your Success Story
        </motion.button>
      </div>

      {/* Testimonial Submission Form */}
      <AnimatePresence>
        {showSubmissionForm && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            className="max-w-3xl mx-auto px-4 pb-24"
          >
            <form
              onSubmit={handleFormSubmit}
              className="bg-white dark:bg-white/5 backdrop-blur-xl border border-slate-200 dark:border-white/10 rounded-[2.5rem] p-8 md:p-12 shadow-2xl transition-colors duration-300 space-y-6"
            >
              <h2 className="text-3xl font-bold text-slate-900 dark:text-white text-center">Tell Us Your Story!</h2>
              <p className="text-slate-600 dark:text-neutral-400 text-center mb-8">
                We love hearing how IFYWIGATECHZ has impacted your career. Share your journey with our community.
              </p>

              {submitStatus === 'success' && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-center gap-3 p-4 bg-green-500/10 text-green-700 dark:text-green-400 border border-green-500/20 rounded-xl"
                >
                  <CheckCircle size={20} /> {submitMessage}
                </motion.div>
              )}
              {submitStatus === 'error' && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-center gap-3 p-4 bg-red-500/10 text-red-700 dark:text-red-400 border border-red-500/20 rounded-xl"
                >
                  <XCircle size={20} /> {submitMessage}
                </motion.div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                  type="text"
                  name="name"
                  placeholder="Your Full Name *"
                  value={formData.name}
                  onChange={handleFormChange}
                  className={inputClasses}
                  required
                />
                <input
                  type="text"
                  name="role"
                  placeholder="Your Role (e.g., Frontend Developer)"
                  value={formData.role}
                  onChange={handleFormChange}
                  className={inputClasses}
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                  type="text"
                  name="company"
                  placeholder="Your Company (Optional)"
                  value={formData.company}
                  onChange={handleFormChange}
                  className={inputClasses}
                />
                <input
                  type="text"
                  name="location"
                  placeholder="Your Location (e.g., Lagos, Nigeria)"
                  value={formData.location}
                  onChange={handleFormChange}
                  className={inputClasses}
                />
              </div>
              <input
                type="text"
                name="course"
                placeholder="Course Taken (e.g., Full-Stack Web Development) *"
                value={formData.course}
                onChange={handleFormChange}
                className={inputClasses}
                required
              />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                  type="text"
                  name="prevSalary"
                  placeholder="Previous Salary (Optional)"
                  value={formData.prevSalary}
                  onChange={handleFormChange}
                  className={inputClasses}
                />
                <input
                  type="text"
                  name="newSalary"
                  placeholder="New Salary (Optional)"
                  value={formData.newSalary}
                  onChange={handleFormChange}
                  className={inputClasses}
                />
              </div>
              <input
                type="url"
                name="image"
                placeholder="Link to your profile picture (Optional)"
                value={formData.image}
                onChange={handleFormChange}
                className={inputClasses}
              />
              <textarea
                name="quote"
                rows="5"
                placeholder="Your Success Story / Testimonial Quote *"
                value={formData.quote}
                onChange={handleFormChange}
                className={`${inputClasses} resize-none`}
                required
              />
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-4 rounded-xl font-bold flex items-center justify-center gap-2 bg-brandGold text-black hover:bg-yellow-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-lg shadow-brandGold/20"
              >
                {isSubmitting ? 'Submitting...' : <><Send size={18} /> Submit Story</>}
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      {/* CTA */}
      <div className="max-w-4xl mx-auto px-4 pb-28 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.7 }}
          className="bg-white/60 dark:bg-gradient-to-r dark:from-brandGold/20 dark:to-yellow-500/10 border border-slate-200 dark:border-brandGold/20 rounded-[2.5rem] p-10 md:p-16 backdrop-blur shadow-lg dark:shadow-none transition-colors duration-300"
        >
          <h2 className="text-3xl md:text-4xl font-black mb-4">
            You Could Be Next 🚀
          </h2>
          <p className="text-slate-600 dark:text-neutral-400 mb-6">
            Start your journey into tech and join our success stories.
          </p>
          <a
            href="/learn"
            className="inline-block px-8 py-4 bg-gradient-to-r from-brandGold to-yellow-400 text-black font-bold rounded-xl shadow-lg hover:scale-105 transition"
          >
            Get Started Now
          </a>
        </motion.div>
      </div>

      {/* Toast Notification */}
      {toast && (
        <div className="fixed bottom-4 right-4 z-50">
          <Toast message={toast.message} type={toast.type} />
        </div>
      )}
    </section>
  );
}