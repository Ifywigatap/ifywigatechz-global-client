import { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate, Link } from "react-router-dom";
import { authService } from "../services/auth";

export default function AffiliateLogin() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      await authService.login(form.email, form.password);
      navigate("/affiliate/dashboard");
    } catch (err) {
      setError(err.message || "Login failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-[#050816] text-slate-900 dark:text-white px-4 transition-colors duration-300">
      <motion.form
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        onSubmit={handleSubmit}
        className="bg-white dark:bg-gray-900 p-8 rounded-2xl border border-slate-200 dark:border-gray-800 w-full max-w-md space-y-5 shadow-xl dark:shadow-none transition-colors duration-300"
      >
        <h2 className="text-2xl font-bold text-center">
          Affiliate Login
        </h2>

        {error && (
          <div className="p-3 bg-red-500/20 border border-red-500 text-red-400 rounded-lg text-sm">
            {error}
          </div>
        )}

        <input
          type="email"
          placeholder="Email"
          className="w-full bg-slate-50 dark:bg-gray-800 border border-slate-200 dark:border-gray-700 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-green-500 transition-colors duration-300"
          value={form.email}
          onChange={(e) =>
            setForm({ ...form, email: e.target.value })
          }
          required
          disabled={loading}
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full bg-slate-50 dark:bg-gray-800 border border-slate-200 dark:border-gray-700 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-green-500 transition-colors duration-300"
          value={form.password}
          onChange={(e) =>
            setForm({ ...form, password: e.target.value })
          }
          required
          disabled={loading}
        />

        <button type="submit" className="w-full bg-green-500 py-3 rounded-xl font-semibold hover:bg-green-600 disabled:opacity-50 disabled:cursor-not-allowed" disabled={loading}>
          {loading ? "Logging in..." : "Login"}
        </button>

        <p className="text-sm text-slate-600 dark:text-gray-400 text-center transition-colors duration-300">
          No account?{" "}
          <Link to="/affiliate/signup" className="text-green-600 dark:text-green-400 hover:underline">
            Sign up
          </Link>
        </p>
      </motion.form>
    </div>
  );
}