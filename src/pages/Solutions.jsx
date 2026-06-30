import { useEffect, useState } from "react";
import { solutionsService } from "../services/solutions";

export default function Solutions() {
  const [solutions, setSolutions] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")

  // Fetch all solutions from backend
  useEffect(() => {
    const fetchSolutions = async () => {
      try {
        setLoading(true)
        setError("")
        const response = await solutionsService.getAllSolutions()
        setSolutions(response.data || [])
      } catch (err) {
        setError(err.message || "Failed to load solutions")
        console.error("Error fetching solutions:", err)
      } finally {
        setLoading(false)
      }
    }

    fetchSolutions()
  }, [])

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white py-16 px-4 transition-colors duration-300">
      <div className="max-w-5xl mx-auto">

        <h1 className="text-4xl font-bold mb-10 text-center text-slate-900 dark:text-white">
          Solutions
        </h1>

        {loading && <p className="text-center text-slate-600 dark:text-slate-400">Loading solutions...</p>}

        {error && <p className="text-center text-red-400">{error}</p>}

        {!loading && !error && (
        <div className="grid-responsive md:grid-cols-3">
          {solutions.map((item) => (
            <div key={item._id || item.title} className="p-6 bg-white dark:bg-white/5 rounded-xl border border-slate-200 dark:border-white/10 shadow-sm transition-colors duration-300">
              <h2 className="text-xl font-semibold text-slate-900 dark:text-white">{item.title}</h2>
              <p className="text-slate-600 dark:text-slate-400 mt-2">{item.description || item.desc}</p>
            </div>
          ))}
        </div>
        )}

        {!loading && !error && solutions.length === 0 && (
          <p className="text-center text-slate-600 dark:text-slate-400">No solutions found.</p>
        )}

      </div>
    </div>
  )
}