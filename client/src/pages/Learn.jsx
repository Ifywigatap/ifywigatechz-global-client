import { Helmet } from "react-helmet-async";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useState, useCallback, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import PaystackButton from "../components/PaystackButton";
import { PRICING_CONFIG } from "../data/pricingConfig";
import { courseService } from "../services/courses";
import { digitalProductsData } from "../data/digitalProducts";
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import { Check, Copy, X, Bookmark, BookmarkCheck, ShoppingCart, Eye, Plus, Minus } from "lucide-react";

export default function Learn() {
  const featuredVideoUrl = "https://www.youtube.com/watch?v=2-cT4vH-4a0";
  // FREE MINI–LESSONS
  const freeLessons = [
    { title: "HTML & CSS for Beginners", level: "Beginner", duration: "11.5h", url: "https://www.youtube.com/watch?v=G3e-cpL7ofc", featured: true, instructor: "freeCodeCamp.org" },
    { title: "JavaScript Full Course", level: "Beginner → Intermediate", duration: "12h", url: "https://www.youtube.com/watch?v=jS4aFq5-91M", instructor: "freeCodeCamp.org" },
    { title: "React JS Full Course", level: "Intermediate", duration: "9h", url: "https://www.youtube.com/watch?v=bMknfKXIFA8", instructor: "freeCodeCamp.org" },
    { title: "Node.js and Express.js", level: "Intermediate", duration: "9h", url: "https://www.youtube.com/watch?v=Oe421EPjeBE", instructor: "freeCodeCamp.org" },
    { title: "Deploying to Vercel", level: "Intermediate", duration: "25m", url: "https://www.youtube.com/watch?v=1-A4s3t3D50", instructor: "freeCodeCamp.org" },
    { title: "React Hooks Course", level: "Advanced", duration: "6.5h", url: "https://www.youtube.com/watch?v=LDB4uaJ87e0", instructor: "freeCodeCamp.org" },
    { title: "TypeScript Full Course", level: "Intermediate → Advanced", duration: "8.5h", url: "https://www.youtube.com/watch?v=gp5H0L76L-A", instructor: "freeCodeCamp.org" },
    { title: "JavaScript Unit Testing", level: "Intermediate", duration: "4h", url: "https://www.youtube.com/watch?v=ubcyYe_4g4g", instructor: "freeCodeCamp.org" },
    { title: "GraphQL Full Course", level: "Intermediate → Advanced", duration: "6h", url: "https://www.youtube.com/watch?v=ed8SzALpx1Q", instructor: "freeCodeCamp.org" },
    { title: "Docker Tutorial for Beginners", level: "Intermediate", duration: "4.5h", url: "https://www.youtube.com/watch?v=gAkwW2tuIqE", instructor: "freeCodeCamp.org" },
  ];

  // PREMIUM COURSES (MONETIZED)
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [freeLessonsSearch, setFreeLessonsSearch] = useState("");
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [quickViewQuantity, setQuickViewQuantity] = useState(1);
  const [quickViewProduct, setQuickViewProduct] = useState(null);
  const [addedProduct, setAddedProduct] = useState(null);
  const [watchLater, setWatchLater] = useState(() => {
    try {
      const saved = localStorage.getItem('watchLater');
      return saved ? JSON.parse(saved) : [];
    } catch (error) {
      console.error("Failed to parse watchLater from localStorage", error);
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem('watchLater', JSON.stringify(watchLater));
  }, [watchLater]);

  const toggleWatchLater = (videoUrl) => {
    setWatchLater(prev => {
        if (prev.includes(videoUrl)) {
            return prev.filter(url => url !== videoUrl);
        } else {
            return [...prev, videoUrl];
        }
    });
  };
  const { user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const { addToCart } = useCart();

  // Fetch courses from backend using TanStack Query
  const { data: courses = [], isLoading: loading, isError, error } = useQuery({
    queryKey: ['courses'],
    queryFn: () => courseService.getAllCourses(1, 100).then(res => res.data || []),
    staleTime: 1000 * 60 * 5, // Cache for 5 minutes
  });

  const handleAddToCart = (product, quantity = 1) => {
    addToCart({ ...product, qty: quantity });
    setAddedProduct(product.id);
    setTimeout(() => {
      setAddedProduct(null);
    }, 2000);
  };

  const getEmbedUrl = (url) => {
    if (!url) return '';
    try {
      const videoUrl = new URL(url);
      const videoId = videoUrl.searchParams.get('v');
      return `https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0`;
    } catch (error) {
      console.error("Invalid video URL:", url);
      return '';
    }
  };

  const filteredFreeLessons = freeLessons.filter((lesson) =>
    lesson.title.toLowerCase().includes(freeLessonsSearch.toLowerCase())
  );

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

  const digitalProducts = digitalProductsData;

  // Centralized Affiliate ID Configuration
  const AFFILIATE_IDS = {
    udemyCoupon: 'YOUR_CODE',
    hostingerCoupon: 'YOUR_CODE',
    canvaRef: 'your-ref-id',
    setappLink: 'your-setapp-link',
    namecheapId: 'YOUR_ID',
    adobeRef: 'YOUR_REF',
    jasperRef: 'your-ref',
    trafeeRef: '69c77af283fdd',
    whogohostRef: 'isui'
  };

  // AFFILIATE TOOLS
  const affiliateTools = [
    { title: "Udemy Courses (Discount Links)", url: `https://www.udemy.com/?couponCode=${AFFILIATE_IDS.udemyCoupon}` },
    { title: "Hostinger Web Hosting", url: `https://www.hostinger.com/ifywigatechz?coupon=${AFFILIATE_IDS.hostingerCoupon}` },
    { title: "Canva Pro 30 Days Trial", url: `https://partner.canva.com/${AFFILIATE_IDS.canvaRef}` },
    { title: "Setapp for Developers", url: `https://impact.com/${AFFILIATE_IDS.setappLink}` },
    { title: "Namecheap Domains & Hosting", url: `https://www.namecheap.com/?affid=${AFFILIATE_IDS.namecheapId}` },
    { title: "Adobe Creative Cloud", url: `https://adobe.prf.hn/click/camref:${AFFILIATE_IDS.adobeRef}` },
    { title: "Jasper AI Content Generator", url: `https://jasper.ai/?fpr=${AFFILIATE_IDS.jasperRef}` },
    { title: "Trafee Platforms 18+", url: `https://trafee.com/publisher/register?ref=${AFFILIATE_IDS.trafeeRef}` },
    { title: "Whogohost | GO54", url: `https://app.go54.com/signup?aff=${AFFILIATE_IDS.whogohostRef}` }
  ];

  const [copiedLink, setCopiedLink] = useState(null);

  const handleCopy = useCallback((url, index) => {
    navigator.clipboard.writeText(url).then(() => {
      setCopiedLink(index);
      setTimeout(() => {
        setCopiedLink(null);
      }, 2000); // Reset after 2 seconds
    }).catch(err => {
      console.error('Failed to copy text: ', err);
      // You could add user feedback here for the error case
    });
  }, []);

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
              <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 mb-8">
                <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
                  <span>📺</span> What is Web Development?
                </h2>
                <button
                  onClick={() => toggleWatchLater(featuredVideoUrl)}
                  className="flex items-center gap-2 px-4 py-2 rounded-lg bg-slate-100 dark:bg-white/10 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-white/20 transition-colors self-start sm:self-center"
                >
                  {watchLater.includes(featuredVideoUrl) ? <BookmarkCheck size={18} className="text-green-500" /> : <Bookmark size={18} />}
                  <span className="text-sm font-medium">
                    {watchLater.includes(featuredVideoUrl) ? 'Saved' : 'Watch Later'}
                  </span>
                </button>
              </div>
              <div className="max-w-4xl mx-auto">
                <div className="relative w-full bg-black rounded-xl overflow-hidden shadow-lg" style={{ paddingBottom: "56.25%" }}>
                  <iframe
                    className="absolute inset-0 w-full h-full"
                    src="https://www.youtube.com/embed/2-cT4vH-4a0"
                    title="What is Web Development? Explained for Beginners"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  ></iframe>
                </div>
                <p className="text-slate-700 dark:text-neutral-200 mt-8 text-center leading-relaxed text-lg">
                  <strong className="text-brandGold">A perfect starting point for beginners.</strong> This video explains the fundamentals of web development, what web developers do, and the core technologies they use every day.
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
            <div className="mb-10 max-w-md relative">
              <input
                type="text"
                placeholder="🔍 Search free lessons..."
                value={freeLessonsSearch}
                onChange={(e) => setFreeLessonsSearch(e.target.value)}
                className="w-full px-5 py-3 pr-12 rounded-lg bg-white dark:bg-slate-700/50 border-2 border-slate-200 dark:border-slate-600 text-slate-900 dark:text-white placeholder-slate-500 dark:placeholder-neutral-400 focus:outline-none focus:border-brandBlue focus:bg-white dark:focus:bg-slate-700 transition-all duration-300 shadow-sm dark:shadow-md"
              />
              {freeLessonsSearch && (
                <button
                  onClick={() => setFreeLessonsSearch('')}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors"
                  aria-label="Clear search"
                >
                  <X size={20} />
                </button>
              )}
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredFreeLessons.length > 0 ? (
                filteredFreeLessons.map((l, i) => (
                  <button
                    type="button"
                    key={i}
                    onClick={() => setSelectedVideo(l.url)}
                    className="group relative card hover:border-brandGold transition-all duration-300 hover:shadow-xl hover:shadow-brandGold/25 bg-white dark:bg-slate-800/50 backdrop-blur-sm border-slate-200 dark:border-slate-700 hover:-translate-y-2 shadow-sm dark:shadow-none text-left"
                  >
                    {l.featured && (
                      <span className="absolute top-0 right-0 px-3 py-1 bg-brandGold text-black text-xs font-bold rounded-tr-2xl rounded-bl-lg shadow-md z-10">
                        Featured
                      </span>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-br from-brandBlue/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg pointer-events-none"></div>
                    <div className="relative z-10">
                      <div className="flex items-start justify-between mb-4">
                        <h3 className="text-lg font-semibold text-slate-900 dark:text-white group-hover:text-brandBlue dark:group-hover:text-brandGold transition-colors duration-200">{l.title}</h3>
                        <span className="text-3xl group-hover:scale-110 transition-transform duration-300">📚</span>
                      </div>
                      <p className="text-slate-600 dark:text-neutral-300 text-sm mb-4 space-y-1">
                        <span className="block"><span className="text-brandBlue font-semibold">Level:</span> {l.level}</span>
                        <span className="block"><span className="text-brandGold dark:text-brandGold font-semibold">⏱️ Duration:</span> {l.duration}</span>
                        <span className="block"><span className="text-green-500 font-semibold">Instructor:</span> {l.instructor}</span>
                      </p>
                      <div className="mt-4 flex items-center justify-between">
                        <p className="text-brandBlue dark:text-blue-300 group-hover:text-blue-700 dark:group-hover:text-white transition-colors duration-200 font-medium inline-flex items-center gap-2">
                          Watch Lesson <span className="group-hover:translate-x-1 transition-transform">→</span>
                        </p>
                        <button
                          onClick={(e) => { e.stopPropagation(); toggleWatchLater(l.url); }}
                          className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-white/10 transition-colors z-20"
                          aria-label={watchLater.includes(l.url) ? 'Remove from Watch Later' : 'Add to Watch Later'}
                        >
                          {watchLater.includes(l.url) ? <BookmarkCheck size={18} className="text-green-500" /> : <Bookmark size={18} className="text-slate-500 dark:text-slate-400 group-hover:text-brandGold" />}
                        </button>
                      </div>
                    </div>
                  </button>
                ))
              ) : (
                <div className="col-span-full text-center py-16">
                  <p className="text-slate-500 dark:text-neutral-400 text-lg">No lessons found. Try a different search term.</p>
                </div>
              )}
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
              <div className="max-w-md relative">
                <input
                  type="text"
                  placeholder="🔍 Search courses by name or topic..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full px-5 py-3 pr-12 rounded-lg bg-white dark:bg-slate-700/50 border-2 border-slate-200 dark:border-slate-600 text-slate-900 dark:text-white placeholder-slate-500 dark:placeholder-neutral-400 focus:outline-none focus:border-brandBlue focus:bg-white dark:focus:bg-slate-700 transition-all duration-300 shadow-sm dark:shadow-md"
                />
                {search && (
                  <button
                    onClick={() => setSearch('')}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors"
                    aria-label="Clear search"
                  >
                    <X size={20} />
                  </button>
                )}
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
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {digitalProducts.map((p, i) => (
                <div
                  key={i}
                  className="group relative card hover:border-brandGold transition-all duration-300 hover:shadow-xl hover:shadow-brandGold/25 bg-white dark:bg-slate-800/50 backdrop-blur-sm border-slate-200 dark:border-slate-700 hover:-translate-y-2 shadow-sm dark:shadow-none flex flex-col"
                >
                  <button
                    onClick={() => {
                      setQuickViewProduct(p);
                      setQuickViewQuantity(1);
                    }}
                    className="absolute top-2 right-2 z-20 p-2 bg-white/50 dark:bg-slate-900/50 rounded-full text-slate-600 dark:text-slate-300 opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:scale-110"
                    aria-label="Quick view"
                  >
                    <Eye size={16} />
                  </button>

                  <div className="absolute inset-0 bg-gradient-to-br from-brandGold/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg pointer-events-none"></div>
                  <div className="relative z-10 flex-grow">
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
                  </div>
                  <div className="relative z-10 mt-auto">
                    {!user ? (
                      <button
                        onClick={() => navigate('/login', { state: { from: location } })}
                        className="w-full px-4 py-2.5 bg-brandGold text-black font-semibold rounded-lg transition-all duration-300 hover:shadow-lg hover:shadow-brandGold/50 transform hover:scale-105"
                      >
                        Login to Buy
                      </button>
                    ) : (
                      <button
                        onClick={() => handleAddToCart(p)}
                        disabled={addedProduct === p.id}
                        className="w-full px-4 py-2.5 bg-brandGold text-black font-semibold rounded-lg transition-all duration-300 hover:shadow-lg hover:shadow-brandGold/50 transform hover:scale-105 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                      >
                        {addedProduct === p.id ? (
                          <><Check size={18} /> Added!</>
                        ) : (
                          <><ShoppingCart size={18} /> Add to Cart</>
                        )}
                      </button>
                    )}
                  </div>
                </div>
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
                <div
                  key={i}
                  className="group relative card hover:border-brandBlue transition-all duration-300 hover:shadow-xl hover:shadow-brandBlue/25 bg-white dark:bg-slate-800/50 backdrop-blur-sm border-slate-200 dark:border-slate-700 hover:-translate-y-2 shadow-sm dark:shadow-none flex flex-col"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-brandBlue/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg pointer-events-none"></div>
                  <div className="relative z-10 flex-grow">
                    <div className="flex items-start justify-between mb-4">
                      <h3 className="text-lg font-bold text-slate-900 dark:text-white group-hover:text-brandBlue transition-colors duration-200">{t.title}</h3>
                      <span className="text-3xl group-hover:scale-110 transition-transform duration-300">🔗</span>
                    </div>
                  </div>
                  <div className="relative z-10 mt-4 flex items-center gap-2 border-t border-slate-200 dark:border-white/10 pt-4">
                    <a href={t.url} target="_blank" rel="noopener noreferrer" className="text-brandBlue dark:text-blue-300 group-hover:text-blue-700 dark:group-hover:text-blue-200 transition-colors duration-200 font-medium inline-flex items-center gap-2 flex-grow">
                      Explore Tool <span className="group-hover:translate-x-1 transition-transform">→</span>
                    </a>
                    <div className="relative group/tooltip">
                      <button onClick={() => handleCopy(t.url, i)} className="px-3 py-2 rounded-lg bg-slate-100 dark:bg-white/10 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-white/20 transition-colors">
                        {copiedLink === i ? (
                          <Check size={16} className="text-green-500" />
                        ) : (
                          <Copy size={16} />
                        )}
                      </button>
                      <div className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 whitespace-nowrap px-2 py-1 bg-slate-800 text-white text-xs rounded-md opacity-0 group-hover/tooltip:opacity-100 transition-opacity pointer-events-none">
                        {copiedLink === i ? "Copied!" : "Copy to clipboard"}
                      </div>
                    </div>
                  </div>
                </div>
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

      {/* QUICK VIEW MODAL */}
      <AnimatePresence>
        {quickViewProduct && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setQuickViewProduct(null)}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[1000] flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-2xl bg-white dark:bg-slate-800 rounded-2xl shadow-2xl overflow-hidden"
            >
              <button
                onClick={() => setQuickViewProduct(null)}
                className="absolute top-3 right-3 z-20 p-2 bg-black/50 text-white rounded-full hover:bg-black/80 transition-colors"
                aria-label="Close quick view"
              >
                <X size={20} />
              </button>
              
              <div className="grid md:grid-cols-2">
                <div className="bg-slate-100 dark:bg-slate-700 flex items-center justify-center p-8">
                  <span className="text-8xl">💾</span>
                </div>

                <div className="p-8 flex flex-col">
                  <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">{quickViewProduct.title}</h3>
                  
                  <div className="flex items-baseline gap-2 mb-4">
                    {quickViewProduct.originalPrice && quickViewProduct.originalPrice !== quickViewProduct.price && (
                      <span className="text-lg line-through text-slate-500 dark:text-neutral-400">₦{quickViewProduct.originalPrice.toLocaleString()}</span>
                    )}
                    <p className="text-brandBlue dark:text-brandGold font-bold text-3xl">₦{quickViewProduct.price.toLocaleString()}</p>
                  </div>

                  <p className="text-slate-600 dark:text-neutral-300 text-sm mb-6 flex-grow">
                    A brief description of this amazing digital product would go here. It highlights the key benefits and what the user will get upon purchase.
                  </p>

                  {/* QUANTITY SELECTOR */}
                  <div className="flex items-center gap-4 mb-6">
                    <p className="text-sm font-medium text-slate-700 dark:text-neutral-300">Quantity:</p>
                    <div className="flex items-center border border-slate-300 dark:border-slate-600 rounded-lg">
                      <button
                        onClick={() => setQuickViewQuantity(q => Math.max(1, q - 1))}
                        className="px-3 py-2 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-l-lg transition-colors"
                        aria-label="Decrease quantity"
                      >
                        <Minus size={16} />
                      </button>
                      <span className="px-4 py-2 font-semibold text-slate-900 dark:text-white">{quickViewQuantity}</span>
                      <button
                        onClick={() => setQuickViewQuantity(q => q + 1)}
                        className="px-3 py-2 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-r-lg transition-colors"
                        aria-label="Increase quantity"
                      >
                        <Plus size={16} />
                      </button>
                    </div>
                  </div>

                  <div className="mt-auto">
                    {!user ? (
                      <button onClick={() => { setQuickViewProduct(null); navigate('/login', { state: { from: location } }); }} className="w-full px-4 py-3 bg-brandGold text-black font-semibold rounded-lg transition-all duration-300 hover:shadow-lg hover:shadow-brandGold/50 transform hover:scale-105">
                        Login to Buy
                      </button>
                    ) : (
                      <button onClick={() => handleAddToCart(quickViewProduct, quickViewQuantity)} disabled={addedProduct === quickViewProduct.id} className="w-full px-4 py-3 bg-brandGold text-black font-semibold rounded-lg transition-all duration-300 hover:shadow-lg hover:shadow-brandGold/50 transform hover:scale-105 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2">
                        {addedProduct === quickViewProduct.id ? ( <><Check size={20} /> Added!</> ) : ( <><ShoppingCart size={20} /> Add to Cart</> )}
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* VIDEO MODAL */}
      <AnimatePresence>
        {selectedVideo && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedVideo(null)}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[1000] flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-4xl aspect-video bg-black rounded-2xl shadow-2xl overflow-hidden"
            >
              <button
                onClick={() => setSelectedVideo(null)}
                className="absolute top-2 right-2 z-20 p-2 bg-black/50 text-white rounded-full hover:bg-black/80 transition-colors"
                aria-label="Close video"
              >
                <X size={24} />
              </button>
              <iframe src={getEmbedUrl(selectedVideo)} title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen className="absolute inset-0 w-full h-full"></iframe>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}