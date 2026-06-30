import { useParams, Link } from "react-router-dom"
import { useState, useEffect } from "react"
import { courseService } from "../services/courses";
import { userService } from "../services/user";
import { useAuth } from "../context/AuthContext";


export default function CoursePlayer() {

  const { id } = useParams()
  const [course, setCourse] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const [video, setVideo] = useState("")
  const { user } = useAuth()

  // Fetch course by ID
  useEffect(() => {
    const fetchCourse = async () => {
      try {
        setLoading(true)
        setError("")
        const response = await courseService.getCourseById(id)
        const courseData = response.data
        setCourse(courseData)
        setVideo(courseData.freeLesson || "")
      } catch (err) {
        setError(err.message || "Failed to load course")
        console.error("Error fetching course:", err)
      } finally {
        setLoading(false)
      }
    }

    if (id) {
      fetchCourse()
    }
  }, [id])

  const [userHasPurchased, setUserHasPurchased] = useState(false);

  // Check if user has purchased the course
  useEffect(() => {
    const checkEnrollment = async () => {
      if (user) {
        try {
          const response = await userService.getEnrollments();
          if (response.ok) {
            const enrollments = response.data || [];
            const isEnrolled = enrollments.some(e => String(e.courseId) === String(id));
            setUserHasPurchased(isEnrolled);
          }
        } catch (error) {
          console.error("Error checking enrollment:", error);
        }
      }
    };
    checkEnrollment();
  }, [user, id]);

  // Loading state
  if (loading) {
    return <div className="flex items-center justify-center min-h-screen bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white transition-colors duration-300">Loading course player...</div>
  }

  // Error state
  if (error || !course) {
    return <div className="flex items-center justify-center min-h-screen bg-slate-50 dark:bg-slate-900 text-red-600 dark:text-red-400 transition-colors duration-300">{error || "Course not found"}</div>
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 min-h-screen bg-slate-50 dark:bg-slate-900 transition-colors duration-300">

      {/* SIDEBAR LESSONS */}
      <div className="bg-white dark:bg-slate-950 text-slate-900 dark:text-white p-6 border-r border-slate-200 dark:border-slate-800 overflow-y-auto transition-colors duration-300">
        <Link to={`/courses/${id}`} className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 text-sm mb-6 inline-block font-medium transition-colors">
          ← Back to Course Details
        </Link>

        <h2 className="font-bold text-xl mb-6 text-slate-900 dark:text-white">
          {course.title}
        </h2>

        <button
          onClick={() => setVideo(course.freeLesson)}
          className={`w-full text-left px-4 py-3 rounded-lg mb-3 transition-colors ${video === course.freeLesson ? 'bg-blue-600 text-white' : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'}`}
        >
          ▶ Free Lesson
        </button>

        {course.lessons?.map((lesson, i) => (
          <button
            key={lesson.id || i}
            onClick={() => userHasPurchased && setVideo(lesson.video)}
            className={`w-full text-left px-4 py-3 rounded-lg mb-3 transition-colors flex items-center justify-between ${video === lesson.video ? 'bg-blue-600 text-white' : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'} ${!userHasPurchased ? 'opacity-70 cursor-not-allowed' : ''}`}
          >
            <span className="truncate pr-2">{userHasPurchased ? "▶" : "🔒"} {lesson.title}</span>
            <span className="text-xs opacity-60 dark:opacity-70 whitespace-nowrap">{lesson.duration}</span>
          </button>
        ))}

      </div>

      {/* VIDEO PLAYER */}
      <div className="col-span-1 md:col-span-3 p-4 md:p-8 bg-slate-50 dark:bg-slate-900 transition-colors duration-300">

        {video ? (
          <div className="max-w-5xl mx-auto">
            {video.endsWith('.mp4') ? (
              <video
                src={video}
                controls
                autoPlay
                className="w-full aspect-video rounded-xl bg-black shadow-xl dark:shadow-2xl border border-slate-200 dark:border-slate-800"
              />
            ) : (
              <iframe
                src={video}
                className="w-full aspect-video rounded-xl shadow-xl dark:shadow-2xl border border-slate-200 dark:border-slate-800"
                allowFullScreen
              />
            )}
            <div className="mt-6">
              <h3 className="text-2xl font-bold text-slate-900 dark:text-white">Now Playing</h3>
              <p className="text-slate-600 dark:text-slate-400 mt-2">Make sure to take notes and practice along with the instructor.</p>
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center h-full min-h-[400px] bg-white dark:bg-slate-800/50 rounded-2xl border border-slate-200 dark:border-slate-700/50 max-w-4xl mx-auto shadow-sm transition-colors duration-300">
            <h2 className="text-3xl font-bold text-slate-900 dark:text-white">
              🔒 Premium Lesson
            </h2>
            <p className="text-slate-600 dark:text-slate-400 mt-4 text-lg">
              Buy the course to unlock lessons
            </p>
            <Link to={`/courses/${id}`} className="mt-8 px-8 py-3 bg-brandGold hover:bg-yellow-500 text-black rounded-lg transition-colors font-bold shadow-lg hover:shadow-brandGold/30">
              Enroll Now to Unlock
            </Link>
          </div>
        )}

      </div>

    </div>
  )
}