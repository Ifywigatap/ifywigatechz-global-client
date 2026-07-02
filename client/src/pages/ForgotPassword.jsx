import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Mail, ArrowLeft, CheckCircle, Loader2 } from "lucide-react";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!email || !email.includes("@")) {
      setError("Please enter a valid email address.");
      return;
    }

    setLoading(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setLoading(false);
    setSent(true);
  };

  return (
    <section className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-blue-950 flex items-center justify-center px-4 py-20">
      <Helmet>
        <title>Reset Password | IFYWIGATECHZ</title>
        <meta name="description" content="Reset your IFYWIGATECHZ account password." />
      </Helmet>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        <div className="bg-white/5 backdrop-blur-2xl rounded-3xl p-8 sm:p-10 border border-white/10 shadow-2xl">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-brandBlue/20 rounded-2xl flex items-center justify-center mx-auto mb-4 border border-brandBlue/30">
              <Mail className="text-brandBlue" size={28} />
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2">
              {sent ? "Check Your Email" : "Reset Password"}
            </h1>
            <p className="text-neutral-400 text-sm">
              {sent
                ? "We've sent a password reset link to your email."
                : "Enter your email and we'll send you a link to reset your password."}
            </p>
          </div>

          {!sent ? (
            <form onSubmit={handleSubmit} className="space-y-5">
              {error && (
                <div className="p-3 bg-red-500/10 border border-red-500/30 text-red-400 rounded-xl text-sm">
                  {error}
                </div>
              )}

              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-500" size={18} />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="w-full pl-12 pr-4 py-4 rounded-xl bg-white/5 text-white border border-white/10 placeholder-neutral-500 focus:ring-2 focus:ring-brandBlue outline-none transition-all"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-4 rounded-xl bg-gradient-to-r from-brandBlue to-blue-600 text-white font-bold shadow-lg hover:shadow-brandBlue/30 hover:scale-[1.02] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {loading ? (
                  <>
                    <Loader2 size={18} className="animate-spin" />
                    Sending...
                  </>
                ) : (
                  "Send Reset Link"
                )}
              </button>
            </form>
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center space-y-5"
            >
              <div className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center mx-auto border border-green-500/30">
                <CheckCircle className="text-green-400" size={36} />
              </div>
              <p className="text-neutral-300">
                If an account exists for <span className="text-white font-semibold">{email}</span>, you will receive an email with instructions to reset your password.
              </p>
              <button
                onClick={() => { setSent(false); setEmail(""); }}
                className="text-brandBlue hover:text-brandGold transition-colors text-sm"
              >
                Didn't receive it? Try again
              </button>
            </motion.div>
          )}

          {/* Back to login */}
          <div className="mt-8 pt-6 border-t border-white/10 text-center">
            <Link
              to="/login"
              className="inline-flex items-center gap-2 text-neutral-400 hover:text-white transition-colors text-sm"
            >
              <ArrowLeft size={16} />
              Back to Login
            </Link>
          </div>
        </div>
      </motion.div>
    </section>
  );
}

