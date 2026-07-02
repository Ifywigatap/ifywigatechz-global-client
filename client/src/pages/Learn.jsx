import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import PaystackButton from "../components/PaystackButton";
import { PRICING_CONFIG } from "../data/pricingConfig";
import { courseService } from "../services/courses";

export default function Learn() {
  // FREE MINI–LESSONS
  const freeLessons = [
    { title: "HTML & CSS Basics", level: "Beginner", duration: "2h", url: "https://www.youtube.com/watch?v=VooG7LMBMak" },
    { title: "JavaScript Essentials", level: "Beginner → Intermediate", duration: "3h", url: "#" },
    { title: "React with Vite + Tailwind", level: "Intermediate", duration: "3h", url: "#" },
    { title: "Node & Express API Basics", level: "Intermediate", duration: "2.5h", url: "#" },
    { title: "Deploying to Vercel + Domains", level: "Intermediate", duration: "1.5h", url: "#" },
    { title: "Advanced React Patterns & Hooks", level: "Advanced", duration: "2.5h", url: "#" },
    { title: "TypeScript for JavaScript Developers", level: "Intermediate → Advanced", duration: "2h", url: "#" },
    { title: "Testing JavaScript Applications", level: "Intermediate", duration: "2h", url: "#" },
    { title: "GraphQL APIs Essentials", level: "Intermediate → Advanced", duration: "2.5h", url: "#" },
    { title: "Docker & Containerization Basics", level: "Intermediate", duration: "1.5h", url: "#" },
  ];

  // PREMIUM COURSES (MONETIZED)
  const [courses, setCourses] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Fetch courses from backend
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        setLoading(true);
        setError("");
        const response = await courseService.getAllCourses(1, 100);
        setCourses(response.data || []);
      } catch (err) {
        setError(err.message || "Failed to load courses");
        console.error("Error fetching courses:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  const categories = [
    "All",
    "Web Development",
    "Design",
    "Marketing",
    "Business",
    "Mobile Development",
    "Cloud Computing",
    "Artificial Intelligence",
    "Cybersecurity",
  ];

  const filteredCourses = courses.filter((course) => {
    const matchCategory = category === "All" || course.category === category;
    const matchSearch = course.title.toLowerCase().includes(search.toLowerCase());
    return matchCategory && matchSearch;
  });

  // DIGITAL DOWNLOADS
  const digitalProducts = [
    { title: "UI/UX Templates Pack", price: PRICING_CONFIG.digitalProducts.uiuxTemplates.current, originalPrice: PRICING_CONFIG.digitalProducts.uiuxTemplates.original, url: "#" },
    { title: "Developer Resume Templates", price: PRICING_CONFIG.digitalProducts.resumeTemplates.current, originalPrice: PRICING_CONFIG.digitalProducts.resumeTemplates.original, url: "#" },
    { title: "React Starter Kits + Components", price: PRICING_CONFIG.digitalProducts.reactStarter.current, originalPrice: PRICING_CONFIG.digitalProducts.reactStarter.original, url: "#" },
    { title: "Tech Freelancing Ebook", price: PRICING_CONFIG.digitalProducts.freelanceEbook.current, originalPrice: PRICING_CONFIG.digitalProducts.freelanceEbook.original, url: "#" },
    { title: "Figma UI Kit Pro", price: PRICING_CONFIG.digitalProducts.figmaUiKit.current, originalPrice: PRICING_CONFIG.digitalProducts.figmaUiKit.original, url: "#" },
    { title: "Next.js Advanced Patterns Guide", price: PRICING_CONFIG.digitalProducts.nextjsGuide.current, originalPrice: PRICING_CONFIG.digitalProducts.nextjsGuide.original, url: "#" },
    { title: "TypeScript Cheat Sheets Bundle", price: PRICING_CONFIG.digitalProducts.typescriptSheet.current, originalPrice: PRICING_CONFIG.digitalProducts.typescriptSheet.original, url: "#" },
    { title: "Web Performance Optimization Guide", price: PRICING_CONFIG.digitalProducts.performanceGuide.current, originalPrice: PRICING_CONFIG.digitalProducts.performanceGuide.original, url: "#" },
    { title: "Responsive Design Guidelines", price: PRICING_CONFIG.digitalProducts.responsiveGuidelines.current, originalPrice: PRICING_CONFIG.digitalProducts.responsiveGuidelines.original, url: "#" },
    { title: "JavaScript Design Patterns eBook", price: PRICING_CONFIG.digitalProducts.jsPatternsEbook.current, originalPrice: PRICING_CONFIG.digitalProducts.jsPatternsEbook.original, url: "#" },
  ];

  // AFFILIATE TOOLS
  const affiliateTools = [
    { title: "Udemy Courses (Discount Links)", url: "#" },
    { title: "Hostinger Web Hosting", url: "#" },
    { title: "Canva Pro 30 Days Trial", url: "#" },
    { title: "VS Code Extensions Bundle", url: "#" },
    { title: "Font Awesome Pro Icons", url: "#" },
    { title: "Adobe Creative Cloud", url: "#" },
    { title: "MongoDB Atlas Database", url: "#" },
    { title: "Trafee Platforms 18+", url: "https://trafee.com/publisher/register?ref=69c77af283fdd" },
    { title: "Whogohost | GO54", url: "https://app.go54.com/signup?aff=isui" },
  ];

  return (
    <>
      {/* SEO SAFE */}
      <Helmet>
        <title>IFYWIGATECHZ Academy — Learn Web Development, Design & Tech</title>
        <meta name="description" content="Free and premium web development courses, UI/UX design, mentorship, and digital resources from IFYWIGATECHZ Academy. Learn with industry experts." />
        <meta property="og:image" content="/logo.jpg" />
        <meta name="keywords" content="web development courses, UI/UX design, coding tutorials, tech mentorship, online learning" />
      </Helmet>

      <main className="min-h-screen bg-slate-50 dark:bg-gradient-to-br dark:from-slate-800 dark:via-slate-700 dark:to-slate-900 transition-colors duration-300">
        <section className="section container-wide px-4 sm:px-6 lg:px-8">
          {/* HERO SECTION */}
          <div className="text-center space-y-6 mb-16 py-12 md:py-16">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-slate-900 dark:text-white leading-tight">
              Learn from <span className="bg-gradient-to-r from-brandBlue to-brandGold bg-clip-text text-transparent">Industry Experts</span>
            </h1>
            <p className="text-lg sm:text-xl text-slate-700 dark:text-neutral-300 max-w-3xl mx-auto leading-relaxed">
              Master web development, UI/UX design, and digital skills through hands-on courses, mentorship, and practical projects. Start free, level up with premium content.
            </p>
            <div className="flex flex-wrap gap-4 justify-center pt-6">
              <a href="#free-lessons" className="px-8 py-3 bg-brandBlue hover:bg-blue-700 text-white font-semibold rounded-lg transition-all duration-300 hover:shadow-lg hover:shadow-brandBlue/50 transform hover:scale-105">
                Browse Free Lessons
              </a>
              <a href="#premium-courses" className="px-8 py-3 bg-brandGold hover:bg-yellow-500 text-black font-semibold rounded-lg transition-all duration-300 hover:shadow-lg hover:shadow-brandGold/50 transform hover:scale-105">
                Explore Premium Courses
              </a>
            </div>
          </div>

          {/* FEATURED VIDEO SECTION */}
          <section className="mt-12 bg-white dark:bg-gradient-to-r dark:from-slate-700 dark:via-slate-700 dark:to-slate-800 rounded-2xl border border-slate-200 dark:border-brandBlue/30 overflow-hidden shadow-xl dark:shadow-2xl mb-20 transition-colors duration-300">
            <div className="p-6 sm:p-10">
              <h2 className="text-2xl sm:text-3xl font-bold mb-8 text-slate-900 dark:text-white flex items-center gap-2">
                <span>📺</span> Featured Introduction
              </h2>
              <div className="max-w-4xl mx-auto">
                <div className="relative w-full bg-black rounded-xl overflow-hidden shadow-lg" style={{ paddingBottom: "56.25%" }}>
                  <iframe
                    className="absolute inset-0 w-full h-full"
                    src="https://www.youtube.com/embed/dQw4w9WgXcQ"
                    title="IFYWIGATECHZ Intro"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  ></iframe>
                </div>
                <p className="text-slate-700 dark:text-neutral-200 mt-8 text-center leading-relaxed text-lg">
                  <strong className="text-brandGold">Get Started with IFYWIGATECHZ Academy</strong> — Discover our mission, learning outcomes, and how to access premium courses. Join our growing community of web developers and designers.
                </p>
              </div>
            </div>
          </section>

          {/* FREE LESSONS */}
          <section id="free-lessons" className="mb-20">
            <div className="mb-10">
              <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white mb-3 flex items-center gap-2">
                <span>🎓</span> Free Mini-Lessons
              </h2>
              <p className="text-slate-600 dark:text-neutral-300 text-lg">Start learning immediately with no credit card required. Perfect for beginners exploring new topics.</p>
              <div className="h-1 w-20 bg-gradient-to-r from-brandBlue to-brandGold rounded-full mt-4"></div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {freeLessons.map((l, i) => (
                <a
                  key={i}
                  href={l.url}
                  className="group relative card hover:border-brandGold transition-all duration-300 hover:shadow-xl hover:shadow-brandGold/25 bg-white dark:bg-slate-800/50 backdrop-blur-sm border-slate-200 dark:border-slate-700 hover:-translate-y-2 shadow-sm dark:shadow-none"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-brandBlue/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg pointer-events-none"></div>
                  <div className="relative z-10">
                    <div className="flex items-start justify-between mb-4">
                      <h3 className="text-lg font-semibold text-slate-900 dark:text-white group-hover:text-brandBlue dark:group-hover:text-brandGold transition-colors duration-200">{l.title}</h3>
                      <span className="text-3xl group-hover:scale-110 transition-transform duration-300">📚</span>
                    </div>
                    <p className="text-slate-600 dark:text-neutral-300 text-sm mb-4 space-y-1">
                      <span className="block"><span className="text-brandBlue font-semibold">Level:</span> {l.level}</span>
                      <span className="block"><span className="text-brandGold dark:text-brandGold font-semibold">⏱️ Duration:</span> {l.duration}</span>
                    </p>
                    <p className="text-brandBlue dark:text-blue-300 mt-4 group-hover:text-blue-700 dark:group-hover:text-white transition-colors duration-200 font-medium inline-flex items-center gap-2">
                      Watch Lesson <span className="group-hover:translate-x-1 transition-transform">→</span>
                    </p>
                  </div>
                </a>
              ))}
            </div>
          </section>

          {/* PREMIUM COURSES */}
          <section id="premium-courses" className="mb-20">
            <div className="mb-10">
              <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white mb-3 flex items-center gap-2">
                <span>💎</span> Premium Courses
              </h2>
              <p className="text-slate-600 dark:text-neutral-300 text-lg">Structured learning paths with hands-on projects. First lesson is always free — see if the course is right for you.</p>
              <div className="h-1 w-20 bg-gradient-to-r from-brandBlue to-brandGold rounded-full mt-4"></div>
            </div>

            {/* SEARCH & FILTERS */}
            <div className="mb-10 space-y-6">
              <div className="max-w-md">
                <input
                  type="text"
                  placeholder="🔍 Search courses by name or topic..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full px-5 py-3 rounded-lg bg-white dark:bg-slate-700/50 border-2 border-slate-200 dark:border-slate-600 text-slate-900 dark:text-white placeholder-slate-500 dark:placeholder-neutral-400 focus:outline-none focus:border-brandBlue focus:bg-white dark:focus:bg-slate-700 transition-all duration-300 shadow-sm dark:shadow-md"
                />
              </div>

              {/* CATEGORY FILTERS */}
              <div className="flex flex-wrap gap-3">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setCategory(cat)}
                    className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300 ${
                      category === cat
                        ? "bg-brandBlue dark:bg-gradient-to-r dark:from-brandBlue dark:to-blue-600 text-white shadow-lg shadow-brandBlue/50 scale-105"
                        : "bg-white dark:bg-slate-700/50 text-slate-700 dark:text-neutral-300 hover:bg-slate-50 dark:hover:bg-slate-600/70 border border-slate-200 dark:border-slate-600 hover:border-brandBlue/50"
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            {/* COURSE GRID */}
            {loading && (
              <div className="col-span-full text-center py-16">
                <p className="text-slate-500 dark:text-neutral-400 text-lg">Loading courses...</p>
              </div>
            )}

            {!loading && (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filteredCourses.length > 0 ? (
                  filteredCourses.map((course) => (
                    <div
                      key={course._id}
                      className="group bg-white dark:bg-slate-800/50 backdrop-blur-sm rounded-xl overflow-hidden shadow-md dark:shadow-lg hover:shadow-xl dark:hover:shadow-2xl transition-all duration-300 hover:border-brandBlue dark:hover:border-brandGold/50 border border-slate-200 dark:border-slate-700 hover:-translate-y-2 flex flex-col h-full"
                    >
                      {/* COURSE IMAGE */}
                      <Link to={`/courses/${course._id}`} className="block overflow-hidden relative h-40 bg-slate-200 dark:bg-gradient-to-br dark:from-slate-700 dark:to-slate-800">
                        <img
                          src={course.thumbnail}
                          alt={course.title}
                          loading="lazy"
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                          <span className="text-white font-semibold">View Course</span>
                        </div>
                      </Link>

                      <div className="p-5 flex flex-col flex-grow">
                        {/* BADGE */}
                        {course.badge && (
                          <span className="inline-block mb-3 text-xs bg-gradient-to-r from-yellow-500 to-yellow-600 text-white px-3 py-1 rounded-full font-semibold shadow-md w-fit">
                            {course.badge}
                          </span>
                        )}

                        {/* TITLE */}
                        <Link to={`/courses/${course._id}`} className="text-lg font-semibold text-slate-900 dark:text-white group-hover:text-brandBlue dark:group-hover:text-brandGold transition-colors duration-200 mb-2 line-clamp-2">
                          {course.title}
                        </Link>

                        {/* CATEGORY + LEVEL */}
                        <p className="text-xs text-slate-500 dark:text-neutral-400 mb-3 space-x-2">
                          <span className="text-brandBlue">{course.category}</span>
                          <span>•</span>
                          <span className="text-brandGold">{course.level}</span>
                        </p>

                        {/* RATING */}
                        <p className="text-yellow-500 dark:text-yellow-400 text-sm mb-3 font-medium">
                          ⭐ {(course.ratings?.average || 0).toFixed(1)} <span className="text-slate-500 dark:text-neutral-400">({course.ratings?.count || 0} students)</span>
                        </p>

                        {/* PRICE & DURATION */}
                        <div className="flex items-center justify-between mb-4 pb-4 border-b border-slate-200 dark:border-slate-700/50">
                          <p className="text-emerald-600 dark:text-green-400 font-bold text-lg">₦{(course.price || 0).toLocaleString()}</p>
                          <p className="text-slate-600 dark:text-neutral-300 text-sm font-medium">{course.duration}</p>
                        </div>

                        {/* ACTIONS */}
                        <div className="mt-auto flex flex-col gap-3">
                          <Link
                            to={`/courses/${course._id}`}
                            className="w-full px-4 py-2.5 bg-gradient-to-r from-brandBlue to-blue-600 text-white text-center font-semibold rounded-lg transition-all duration-300 hover:shadow-lg hover:shadow-brandBlue/50 transform hover:scale-105"
                          >
                            View Course
                          </Link>
                          <Link to={`/learn/${course._id}`} className="text-center text-brandBlue dark:text-blue-300 hover:text-blue-700 dark:hover:text-blue-200 font-medium transition-colors duration-200 text-sm">
                            First Lesson Free →
                          </Link>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="col-span-full text-center py-16">
                    <p className="text-slate-500 dark:text-neutral-400 text-lg">No courses found. Try adjusting your filters.</p>
                  </div>
                )}
              </div>
            )}
          </section>

          {/* DIGITAL PRODUCTS */}
          <section className="mb-20">
            <div className="mb-10">
              <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white mb-3 flex items-center gap-2">
                <span>💾</span> Digital Products
              </h2>
              <p className="text-slate-600 dark:text-neutral-300 text-lg">Exclusive templates, guides, and resources to accelerate your growth.</p>
              <div className="h-1 w-20 bg-gradient-to-r from-brandBlue to-brandGold rounded-full mt-4"></div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {digitalProducts.map((p, i) => (
                <a
                  key={i}
                  href={p.url}
                  className="group relative card hover:border-brandGold transition-all duration-300 hover:shadow-xl hover:shadow-brandGold/25 bg-white dark:bg-slate-800/50 backdrop-blur-sm border-slate-200 dark:border-slate-700 hover:-translate-y-2 shadow-sm dark:shadow-none"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-brandGold/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg pointer-events-none"></div>
                  <div className="relative z-10">
                    <div className="flex items-start justify-between mb-4">
                      <h3 className="text-lg font-bold text-slate-900 dark:text-white group-hover:text-brandGold transition-colors duration-200">{p.title}</h3>
                      <span className="text-3xl group-hover:scale-110 transition-transform duration-300">💾</span>
                    </div>
                    <div className="flex items-baseline gap-2 mb-4">
                      {p.originalPrice && p.originalPrice !== p.price && (
                        <span className="text-sm line-through text-slate-500 dark:text-neutral-400">₦{p.originalPrice.toLocaleString()}</span>
                      )}
                      <p className="text-brandBlue dark:text-brandGold font-bold text-xl">₦{p.price.toLocaleString()}</p>
                    </div>
                    <p className="text-brandBlue dark:text-blue-300 group-hover:text-blue-700 dark:group-hover:text-blue-200 transition-colors duration-200 font-medium inline-flex items-center gap-2">
                      Get Resource <span className="group-hover:translate-x-1 transition-transform">→</span>
                    </p>
                  </div>
                </a>
              ))}
            </div>
          </section>

          {/* AFFILIATE TOOLS */}
          <section className="mb-20">
            <div className="mb-10">
              <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white mb-3 flex items-center gap-2">
                <span>🛠️</span> Recommended Tools & Platforms
              </h2>
              <p className="text-slate-600 dark:text-neutral-300 text-lg">Tools, hosting, and services we recommend to streamline your development workflow.</p>
              <div className="h-1 w-20 bg-gradient-to-r from-brandBlue to-brandGold rounded-full mt-4"></div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {affiliateTools.map((t, i) => (
                <a
                  key={i}
                  href={t.url}
                  className="group relative card hover:border-brandBlue transition-all duration-300 hover:shadow-xl hover:shadow-brandBlue/25 bg-white dark:bg-slate-800/50 backdrop-blur-sm border-slate-200 dark:border-slate-700 hover:-translate-y-2 shadow-sm dark:shadow-none"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-brandBlue/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg pointer-events-none"></div>
                  <div className="relative z-10">
                    <div className="flex items-start justify-between mb-4">
                      <h3 className="text-lg font-bold text-slate-900 dark:text-white group-hover:text-brandBlue transition-colors duration-200">{t.title}</h3>
                      <span className="text-3xl group-hover:scale-110 transition-transform duration-300">🔗</span>
                    </div>
                    <p className="text-brandBlue dark:text-blue-300 group-hover:text-blue-700 dark:group-hover:text-blue-200 transition-colors duration-200 font-medium inline-flex items-center gap-2">
                      Explore Tool <span className="group-hover:translate-x-1 transition-transform">→</span>
                    </p>
                  </div>
                </a>
              ))}
            </div>
          </section>

          {/* MENTORSHIP */}
          <section className="mb-20">
            <div className="mb-10">
              <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white mb-3 flex items-center gap-2">
                <span>👨‍🏫</span> 1-on-1 Mentorship & Coaching
              </h2>
              <p className="text-slate-600 dark:text-neutral-300 text-lg">Get personalized guidance from experienced professionals to accelerate your career.</p>
              <div className="h-1 w-20 bg-gradient-to-r from-brandBlue to-brandGold rounded-full mt-4"></div>
            </div>
            <div className="group relative card hover:border-brandGold hover:shadow-2xl hover:shadow-brandGold/30 transition-all duration-300 max-w-4xl mx-auto bg-white dark:bg-gradient-to-br dark:from-slate-700 dark:via-slate-750 dark:to-slate-800 border border-slate-200 dark:border-brandGold/50 hover:-translate-y-2 shadow-lg dark:shadow-none">
              <div className="absolute inset-0 bg-gradient-to-br from-brandGold/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg pointer-events-none"></div>
              <div className="relative z-10 p-8 md:p-12">
                <h3 className="text-3xl font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
                  <span>💬</span> Monthly 1-on-1 Sessions
                </h3>
                <p className="text-slate-700 dark:text-neutral-200 mb-6 leading-relaxed text-lg">
                  Get personalized weekly mentorship sessions focused on your unique goals. Topics include:
                </p>

                <div className="flex flex-wrap gap-3 mb-8">
                  <span className="px-4 py-2 bg-brandBlue/20 text-brandBlue rounded-full font-medium">Web Development</span>
                  <span className="px-4 py-2 bg-brandBlue/20 text-brandBlue rounded-full font-medium">UI/UX Design</span>
                  <span className="px-4 py-2 bg-brandBlue/20 text-brandBlue rounded-full font-medium">Digital Marketing</span>
                  <span className="px-4 py-2 bg-brandBlue/20 text-brandBlue rounded-full font-medium">Freelancing</span>
                  <span className="px-4 py-2 bg-brandBlue/20 text-brandBlue rounded-full font-medium">Career Growth</span>
                </div>

                <div className="bg-slate-50 dark:bg-slate-900/70 rounded-lg p-6 mb-8 border border-slate-200 dark:border-slate-600 backdrop-blur-sm space-y-3">
                  <p className="text-slate-800 dark:text-neutral-200 font-medium flex items-center gap-3">
                    <span className="text-brandBlue dark:text-brandGold text-lg">✓</span> Personalized learning roadmap
                  </p>
                  <p className="text-slate-800 dark:text-neutral-200 font-medium flex items-center gap-3">
                    <span className="text-brandBlue dark:text-brandGold text-lg">✓</span> Code review & feedback
                  </p>
                  <p className="text-slate-800 dark:text-neutral-200 font-medium flex items-center gap-3">
                    <span className="text-brandBlue dark:text-brandGold text-lg">✓</span> Portfolio guidance
                  </p>
                  <p className="text-slate-800 dark:text-neutral-200 font-medium flex items-center gap-3">
                    <span className="text-brandBlue dark:text-brandGold text-lg">✓</span> Industry insights & advice
                  </p>
                </div>

                <div className="flex flex-wrap gap-4">
                  <a
                    href="https://meet.google.com/qvm-cgje-iuj"
                    className="px-8 py-3 bg-gradient-to-r from-brandGold to-yellow-500 hover:shadow-lg hover:shadow-brandGold/50 text-black font-semibold rounded-lg transition-all duration-300 transform hover:scale-105"
                  >
                    Schedule Mentorship Call
                  </a>
                  <a
                    href="#"
                    className="px-8 py-3 bg-gradient-to-r from-brandBlue to-blue-600 hover:shadow-lg hover:shadow-brandBlue/50 text-white font-semibold rounded-lg transition-all duration-300 transform hover:scale-105"
                  >
                    Learn More Details
                  </a>
                  <a
                    href="/affiliateprogram"
                    className="px-8 py-3 bg-gradient-to-r from-green-500 to-green-600 hover:shadow-lg hover:shadow-green-500/50 text-white font-semibold rounded-lg transition-all duration-300 transform hover:scale-105"
                  >
                    Join Affiliate Marketing
                  </a>
                </div>
              </div>
            </div>
          </section>

          {/* STATISTICS */}
          <section className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-slate-800 dark:to-slate-900 rounded-2xl p-8 md:p-12 shadow-sm dark:shadow-xl transition-colors duration-300 border border-transparent dark:border-slate-700">
            <h2 className="text-3xl md:text-4xl font-bold text-blue-900 dark:text-white mb-12 text-center">Our Statistics So Far...</h2>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 md:gap-8">
              <div className="text-center p-6 bg-white dark:bg-slate-800/80 rounded-xl shadow-sm dark:shadow-md hover:shadow-md dark:hover:shadow-lg transition-shadow duration-300 border border-slate-100 dark:border-slate-700">
                <div className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-brandBlue to-brandGold bg-clip-text text-transparent mb-2">1000+</div>
                <p className="text-blue-600 dark:text-blue-400 font-medium">Tech Topics Covered</p>
              </div>
              <div className="text-center p-6 bg-white dark:bg-slate-800/80 rounded-xl shadow-sm dark:shadow-md hover:shadow-md dark:hover:shadow-lg transition-shadow duration-300 border border-slate-100 dark:border-slate-700">
                <div className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-brandBlue to-brandGold bg-clip-text text-transparent mb-2">150+</div>
                <p className="text-blue-600 dark:text-blue-400 font-medium">Courses Completed</p>
              </div>
              <div className="text-center p-6 bg-white dark:bg-slate-800/80 rounded-xl shadow-sm dark:shadow-md hover:shadow-md dark:hover:shadow-lg transition-shadow duration-300 border border-slate-100 dark:border-slate-700">
                <div className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-brandBlue to-brandGold bg-clip-text text-transparent mb-2">92%</div>
                <p className="text-blue-600 dark:text-blue-400 font-medium">Job Placement Rate</p>
              </div>
              <div className="text-center p-6 bg-white dark:bg-slate-800/80 rounded-xl shadow-sm dark:shadow-md hover:shadow-md dark:hover:shadow-lg transition-shadow duration-300 border border-slate-100 dark:border-slate-700">
                <div className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-brandBlue to-brandGold bg-clip-text text-transparent mb-2">4.9/5</div>
                <p className="text-blue-600 dark:text-blue-400 font-medium">Student Satisfaction</p>
              </div>
            </div>
          </section>
        </section>
      </main>
    </>
  );
}