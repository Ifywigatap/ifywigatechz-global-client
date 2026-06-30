import { useState } from "react";
import { CheckCircle, Mail, Loader2 } from "lucide-react";

export default function NewsletterSignup() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubscribe = async (e) => {
    e.preventDefault();

    const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

    if (!isValidEmail) {
      setError("Please enter a valid email address");
      return;
    }

    setLoading(true);
    setError("");
    
    // Simulate API call delay
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setLoading(false);

    setSubscribed(true);
    setEmail("");
    setError("");
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
      <div className="bg-white/60 dark:bg-gradient-to-r dark:from-brandBlue/20 dark:via-brandGold/10 dark:to-brandBlue/20 rounded-2xl border border-slate-200 dark:border-brandBlue/20 p-6 sm:p-8 shadow-sm dark:shadow-none transition-colors duration-300">
        {!subscribed ? (
          <div className="flex flex-col sm:flex-row items-center gap-4">
            <div className="flex-1">
              <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-1">
                Get notified of new resources
              </h3>
              <p className="text-slate-600 dark:text-neutral-400 text-sm">
                Join 5,000+ developers receiving weekly freebies.
              </p>
            </div>

            <form
              onSubmit={handleSubscribe}
              className="flex gap-2 w-full sm:w-auto"
            >
              <div className="relative flex-1 sm:w-64">
                <Mail
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-500"
                  size={16}
                />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Your email"
                  disabled={loading}
                  className="w-full pl-10 pr-4 py-3 rounded-xl bg-white/80 dark:bg-white/5 border border-slate-300 dark:border-white/10 text-slate-900 dark:text-white placeholder-slate-500 dark:placeholder-neutral-500 focus:ring-2 focus:ring-brandBlue outline-none text-sm transition-colors duration-300"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="inline-flex items-center justify-center gap-2 px-5 py-3 bg-brandGold text-black font-bold rounded-xl hover:bg-yellow-400 transition-all text-sm whitespace-nowrap disabled:opacity-70 disabled:cursor-not-allowed min-w-[110px]"
              >
                {loading ? <Loader2 size={18} className="animate-spin" /> : "Subscribe"}
              </button>
            </form>
          </div>
        ) : (
          <div className="flex items-center gap-3 text-green-400">
            <CheckCircle size={20} />
            <span className="font-medium">
              You're subscribed! Check your inbox for a welcome email.
            </span>
          </div>
        )}

        {error && (
          <p className="text-red-400 text-sm mt-3">{error}</p>
        )}
      </div>
    </div>
  );
}