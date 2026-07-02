import { useMemo, useEffect, useState } from "react";
import { useParams, Link, useNavigate, useLocation } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import PaystackButton from "../components/PaystackButton";
import { courseService } from "../services/courses";
import { courses as fallbackCourses } from "../data/courses";
import { optimizeImage } from "../utils/cloudinary";
import { useAuth } from "../context/AuthContext";

const CourseDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useAuth();
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [activeTab, setActiveTab] = useState("overview");

  // Helper function to get lessons from API course or fallback data
  const getLessons = (apiCourse) => {
    if (apiCourse.lessons && Array.isArray(apiCourse.lessons) && apiCourse.lessons.length > 0) {
      return apiCourse.lessons;
    }

    if (apiCourse.modules && Array.isArray(apiCourse.modules) && apiCourse.modules.length > 0) {
      return apiCourse.modules.flatMap(mod => mod.lessons || []);
    }

    const fallbackCourse = fallbackCourses.find(c => c.id === parseInt(id));
    if (fallbackCourse && fallbackCourse.lessons) {
      return fallbackCourse.lessons;
    }

    return [];
  };

  // Fetch course by ID
  useEffect(() => {
    const fetchCourse = async () => {
      try {
        setLoading(true);
        setError("");
        const response = await courseService.getCourseById(id);
        const courseData = response.data;

        const lessons = getLessons(courseData);
        if (lessons.length > 0 && !courseData.lessons) {
          courseData.lessons = lessons;
        }

        setCourse(courseData);
      } catch (err) {
        setError(err.message || "Failed to load course");
        console.error("Error fetching course:", err);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchCourse();
    }
  }, [id]);

  // Memoize payment reference
  const paymentReference = useMemo(
    () => `IFY-${Date.now()}`,
    [id]
  );

  // Loading state
  if (loading) {
    return (
      <section className="min-h-screen bg-slate-50 dark:bg-gradient-to-br dark:from-slate-800 dark:via-slate-700 dark:to-slate-900 py-12 transition-colors duration-300">
        <div className="container-wide mx-auto px-4 sm:px-6 lg:px-8 text-slate-900 dark:text-white">
          <div className="flex items-center justify-center py-20">
            <div className="text-center">
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-brandBlue mb-4"></div>
              <p className="text-white text-lg font-medium">Loading course...</p>
            </div>
          </div>
        </div>
      </section>
    );
  }

  // Error state
  if (error || !course) {
    return (
      <section className="min-h-screen bg-slate-50 dark:bg-gradient-to-br dark:from-slate-800 dark:via-slate-700 dark:to-slate-900 py-12 transition-colors duration-300">
        <div className="container-wide mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center py-16">
            <div className="mb-6 text-5xl">⚠️</div>
            <p className="text-red-600 dark:text-red-400 text-lg mb-6 font-medium">{error || "Course not found."}</p>
            <Link to="/learn" className="inline-flex items-center gap-2 px-6 py-3 bg-brandBlue hover:bg-blue-700 text-white font-semibold rounded-lg transition-all duration-300 shadow-lg hover:shadow-brandBlue/50">
              ← Back to Courses
            </Link>
          </div>
        </div>
      </section>
    );
  }

  return (
    <>
      <Helmet>
        <title>{course.title} | IFYWIGATECHZ Academy</title>
        <meta name="description" content={course.description} />
        <meta property="og:image" content={course.thumbnail} />
      </Helmet>

      <section className="min-h-screen bg-slate-50 dark:bg-gradient-to-br dark:from-slate-800 dark:via-slate-700 dark:to-slate-900 py-12 transition-colors duration-300">
        <div className="container-wide mx-auto px-4 sm:px-6 lg:px-8 text-slate-900 dark:text-white">

          {/* BREADCRUMB */}
          <div className="mb-8 flex items-center gap-2 text-sm">
            <Link to="/learn" className="text-slate-600 dark:text-neutral-400 hover:text-brandBlue transition-colors">Courses</Link>
            <span className="text-slate-500 dark:text-neutral-500">/</span>
            <span className="text-slate-700 dark:text-neutral-300 font-medium">{course.title}</span>
          </div>

          {/* MAIN GRID */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

            {/* LEFT COLUMN - COURSE CONTENT */}
            <div className="lg:col-span-2 space-y-8">

              {/* COURSE HEADER */}
              <div className="space-y-4">
                <div className="flex flex-wrap gap-3 items-center">
                  <span className="px-4 py-2 bg-brandBlue/20 text-brandBlue rounded-full text-sm font-semibold">
                    {course.category}
                  </span>
                  <span className="px-4 py-2 bg-brandGold/20 text-brandGold rounded-full text-sm font-semibold">
                    {course.level}
                  </span>
                </div>

                <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900 dark:text-white leading-tight">
                  {course.title}
                </h1>

                <div className="flex flex-wrap gap-6 items-center pt-4">
                  <p className="text-yellow-500 dark:text-yellow-400 font-semibold text-lg">
                    ⭐ {(course.ratings?.average || 0).toFixed(1)} <span className="text-slate-500 dark:text-neutral-400 font-normal">({course.ratings?.count || 0} students)</span>
                  </p>
                  <p className="text-emerald-600 dark:text-green-400 font-bold text-xl">
                    ₦{(course.price || 0).toLocaleString()}
                  </p>
                </div>
              </div>

              {/* COURSE IMAGE */}
              <div className="relative group overflow-hidden rounded-2xl shadow-2xl bg-black">
                <div className="absolute inset-0 bg-slate-200 dark:bg-black"></div> {/* Added light mode background */}
                <img
                  src={optimizeImage(course.thumbnail, { width: 1200, height: 800 })}
                  alt={course.title}
                  className="w-full h-80 sm:h-96 object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                  width="800"
                  height="384"
                  decoding="async"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent dark:from-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>

              {/* INSTRUCTOR CARD */}
                <p className="text-sm text-slate-500 dark:text-neutral-400 mb-4 uppercase tracking-wider mt-8">Your Instructor</p>
                <div className="flex items-center gap-4">
                  <img
                    src={optimizeImage(course.instructor.avatar, { width: 160, height: 160 })}
                    alt={course.instructor.name}
                    className="w-20 h-20 rounded-full object-cover border-3 border-brandBlue/50 flex-shrink-0"
                    width="80"
                    height="80"
                    loading="lazy"
                    decoding="async"
                  />
                  <div>
                    <h4 className="font-bold text-slate-900 dark:text-white text-lg">
                      {course.instructor.name}
                    </h4>
                    <p className="text-sm text-slate-600 dark:text-neutral-400 mt-1">
                      {course.instructor.title}
                    </p>
                  </div>
                </div>

              {/* TABS */}
              <div className="border-b border-slate-200 dark:border-slate-600/50 mt-10">
                <div className="flex gap-6 md:gap-8 overflow-x-auto">
                  {["overview", "curriculum", "requirements"].map((tab) => (
                    <button
                      key={tab}
                      onClick={() => setActiveTab(tab)}
                      className={`pb-4 px-2 font-semibold whitespace-nowrap transition-all duration-300 capitalize ${
                        activeTab === tab
                          ? "text-brandBlue border-b-2 border-brandBlue"
                          : "text-slate-500 dark:text-neutral-400 hover:text-slate-900 dark:hover:text-white border-b-2 border-transparent"
                      }`}
                    >
                      {tab}
                    </button>
                  ))}
                </div>
              </div>

              {/* TAB CONTENT */}
              <div className="space-y-8">

                {/* OVERVIEW TAB */}
                {activeTab === "overview" && (
                  <div className="space-y-8 animate-fadeIn">

                    {/* DESCRIPTION */}
                    <div>
                      <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">About This Course</h3>
                      <p className="text-slate-700 dark:text-neutral-300 leading-relaxed text-lg">
                        {course.description}
                      </p>
                    </div>

                    {/* SKILLS YOU WILL LEARN */}
                    {course.skills && course.skills.length > 0 && (
                      <div>
                        <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">What You'll Learn</h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          {course.skills.map((skill) => (
                            <div key={skill} className="flex items-start gap-3 p-3 bg-white dark:bg-slate-800/50 border border-slate-200 dark:border-transparent rounded-lg hover:bg-slate-50 dark:hover:bg-slate-700/70 transition-colors duration-300">
                              <span className="text-green-400 font-bold text-xl mt-0.5 flex-shrink-0">✓</span>
                              <span className="text-slate-700 dark:text-neutral-200 font-medium">{skill}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* COURSE INCLUDES */}
                    {course.includes && course.includes.length > 0 && (
                      <div className="bg-white dark:bg-gradient-to-br dark:from-slate-700/50 dark:to-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-slate-200 dark:border-slate-600/50">
                        <h3 className="font-bold text-slate-900 dark:text-white mb-6 text-lg">This Course Includes</h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          {course.includes.map((item) => (
                            <p key={item} className="flex items-center gap-3 text-slate-700 dark:text-neutral-300">
                              <span className="text-brandGold text-lg">📌</span>
                              {item}
                            </p>
                          ))}
                        </div>
                      </div>
                    )}

                  </div>
                )}

                {/* REQUIREMENTS TAB */}
                {activeTab === "requirements" && (
                  <div className="space-y-6 animate-fadeIn">
                    <h3 className="text-2xl font-bold text-slate-900 dark:text-white">Requirements</h3>
                    {course.requirements && course.requirements.length > 0 ? (
                      <div className="space-y-3">
                        {course.requirements.map((req) => (
                          <div key={req} className="flex gap-4 p-4 bg-white dark:bg-slate-800/50 border border-slate-200 dark:border-transparent rounded-lg hover:bg-slate-50 dark:hover:bg-slate-700/70 transition-colors duration-300">
                            <span className="text-brandBlue font-bold flex-shrink-0">→</span>
                            <span className="text-slate-700 dark:text-neutral-300">{req}</span>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="text-slate-600 dark:text-neutral-400">No specific requirements listed.</p>
                    )}
                  </div>
                )}

                {/* CURRICULUM TAB */}
                {activeTab === "curriculum" && course.lessons && (
                  <div className="space-y-6 animate-fadeIn">
                    <h3 className="text-2xl font-bold text-slate-900 dark:text-white">Course Curriculum</h3>
                    <p className="text-slate-600 dark:text-neutral-400">{course.lessons.length} lessons</p>
                    <div className="space-y-3">
                      {course.lessons.map((lesson, idx) => (
                        <div
                          key={lesson.id || lesson.title}
                          className="flex items-center justify-between p-4 bg-white dark:bg-slate-800/50 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-700/70 transition-all duration-300 hover:translate-x-1 group cursor-pointer border border-slate-200 dark:border-slate-700/50 hover:border-brandBlue dark:hover:border-brandBlue/50"
                        >
                          <div className="flex items-center gap-4 flex-grow">
                            <span className="font-bold text-brandBlue bg-slate-100 dark:bg-slate-700 px-3 py-1 rounded-lg text-sm flex-shrink-0">
                              {idx + 1}
                            </span>
                            <span className="text-slate-800 dark:text-white font-medium group-hover:text-brandBlue transition-colors">
                              {lesson.title}
                            </span>
                          </div>
                          <span className="text-slate-500 dark:text-neutral-400 text-sm flex-shrink-0 ml-4 font-medium">
                            {lesson.duration || "N/A"}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

              </div>

            </div>

            {/* RIGHT COLUMN - SIDEBAR */}
            <div className="lg:col-span-1">

              {/* STICKY CARD */}
              <div className="sticky top-24 space-y-4">

                {/* PRICE & ENROLL CARD */}
                <div className="bg-white dark:bg-gradient-to-br dark:from-slate-700/70 dark:to-slate-800/70 backdrop-blur-sm rounded-2xl p-8 border border-slate-200 dark:border-brandGold/30 shadow-2xl hover:shadow-brandGold/20 transition-all duration-300 space-y-6">

                  {/* PRICE */}
                  <div className="space-y-2">
                    <p className="text-slate-500 dark:text-neutral-400 text-sm uppercase tracking-wider">Course Price</p>
                    <p className="text-4xl font-extrabold text-emerald-600 dark:text-green-400">
                      ₦{(course.price || 0).toLocaleString()}
                    </p>
                  </div>

                  {/* STATS */}
                  <div className="grid grid-cols-2 gap-4 pb-6 border-b border-slate-200 dark:border-slate-600/50">
                    <div>
                      <p className="text-xs text-slate-500 dark:text-neutral-400 mb-1 uppercase">Students</p>
                      <p className="text-lg font-bold text-slate-900 dark:text-white">{course.ratings?.count || 0}</p>
                    </div>
                    <div>
                      <p className="text-xs text-slate-500 dark:text-neutral-400 mb-1 uppercase">Rating</p>
                      <p className="text-lg font-bold text-yellow-500 dark:text-yellow-400">⭐ {(course.ratings?.average || 0).toFixed(1)}</p>
                    </div>
                  </div>

                  {/* ENROLL BUTTON */}
                  {!user ? (
                    <button
                      onClick={() => navigate('/login', { state: { from: location } })}
                      className="w-full py-4 bg-gradient-to-r from-brandGold to-yellow-500 hover:shadow-lg hover:shadow-brandGold/50 text-black font-bold rounded-lg transition-all duration-300 transform hover:scale-105"
                    >
                      Login to Enroll
                    </button>
                  ) : (
                    <PaystackButton
                      email={user.email}
                      amount={course.price || 0}
                      reference={paymentReference}
                      metadata={{
                        courseId: course._id,
                        courseName: course.title,
                        userId: user._id || user.id
                      }}
                      onSuccess={(response) => {
                        alert('🎉 Payment successful! You are now enrolled.');
                        navigate(`/learn/${course._id}`);
                      }}
                      className="w-full py-4 bg-gradient-to-r from-brandGold to-yellow-500 hover:shadow-lg hover:shadow-brandGold/50 text-black font-bold rounded-lg transition-all duration-300 transform hover:scale-105"
                    />
                  )}

                  {/* FREE PREVIEW */}
                  <Link
                    to={`/learn/${course._id}`}
                    className="block w-full py-3 text-center border-2 border-brandBlue text-brandBlue hover:bg-brandBlue/10 font-semibold rounded-lg transition-all duration-300 hover:border-blue-400"
                  >
                    👁️ Watch Free Preview
                  </Link>

                </div>

                {/* COURSE INFO */}
                <div className="bg-white dark:bg-gradient-to-br dark:from-slate-700/50 dark:to-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-slate-200 dark:border-slate-600/50 space-y-4">

                  <div className="flex items-center gap-3">
                    <span className="text-2xl">📚</span>
                    <div>
                      <p className="text-xs text-slate-500 dark:text-neutral-400 uppercase">Lessons</p>
                      <p className="text-lg font-bold text-slate-900 dark:text-white">{course.lessons?.length || 0}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 pt-2">
                    <span className="text-2xl">⏱️</span>
                    <div>
                      <p className="text-xs text-slate-500 dark:text-neutral-400 uppercase">Duration</p>
                      <p className="text-lg font-bold text-slate-900 dark:text-white">{course.duration || "Self-paced"}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 pt-2">
                    <span className="text-2xl">🎯</span>
                    <div>
                      <p className="text-xs text-slate-500 dark:text-neutral-400 uppercase">Level</p>
                      <p className="text-lg font-bold text-slate-900 dark:text-white">{course.level}</p>
                    </div>
                  </div>

                </div>

                {/* MONEY BACK */}
                <div className="bg-green-50 dark:bg-gradient-to-br dark:from-green-900/30 dark:to-green-800/30 backdrop-blur-sm rounded-xl p-4 border border-green-200 dark:border-green-500/30 text-center">
                  <p className="text-sm text-green-800 dark:text-green-300">
                    <span className="font-bold">✓ 30-Day</span> Money-Back Guarantee
                  </p>
                </div>

              </div>

            </div>

          </div>

        </div>
      </section>
    </>
  );
};

export default CourseDetails;