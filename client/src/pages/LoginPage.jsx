import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { useNavigate, useLocation } from "react-router-dom";
import { Eye, EyeOff, Mail, Lock, User } from "lucide-react";
import { authService } from "../services/auth";

// Google SVG Icon
const GoogleIcon = () => (
  <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
  </svg>
);

// ================= LOGIN =================
export function LoginPage({ onSwitch }) {
  const navigate = useNavigate();
  const location = useLocation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      await authService.login(email, password);
      const from = location.state?.from?.pathname || "/";
      navigate(from, { replace: true });
    } catch (err) {
      setError(err.message || "Login failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleAuth = async () => {
    setLoading(true);
    setError("");
    try {
      await authService.loginWithGoogle();
      const from = location.state?.from?.pathname || "/";
      navigate(from, { replace: true });
    } catch (err) {
      setError(err.message || "Google Login failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout title="Welcome Back" subtitle="Login to your account">
      {error && (
        <div className="p-3 bg-red-500/20 border border-red-500 text-red-400 rounded-lg text-sm">
          {error}
        </div>
      )}
      <form onSubmit={handleLogin} className="space-y-4">
        <Input icon={<Mail size={18} />} placeholder="Email" value={email} onChange={setEmail} />
        <PasswordInput value={password} setValue={setPassword} show={showPassword} setShow={setShowPassword} />

        <div className="flex justify-end text-sm text-slate-500 dark:text-gray-400 -mt-2">
          <button type="button" onClick={() => onSwitch("forgot")} className="hover:underline">Forgot password?</button>
        </div>

        <button type="submit" className="btn-primary w-full" disabled={loading}>
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>

      <div className="relative my-6">
        <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-slate-200 dark:border-white/10"></div></div>
        <div className="relative flex justify-center text-sm"><span className="px-2 bg-white dark:bg-slate-800 text-slate-500 dark:text-gray-400 transition-colors duration-300">Or continue with</span></div>
      </div>
      <button type="button" onClick={handleGoogleAuth} disabled={loading} className="w-full py-3 rounded-xl bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-slate-700 dark:text-white font-semibold hover:bg-slate-200 dark:hover:bg-white/10 transition-colors duration-300 flex items-center justify-center">
        <GoogleIcon /> Google
      </button>

      <p className="text-center text-slate-500 dark:text-gray-400 text-sm mt-6">
        Don’t have an account?{' '}
        <span onClick={() => onSwitch("signup")} className="text-blue-500 dark:text-blue-400 cursor-pointer hover:underline">
          Sign up
        </span>
      </p>
    </AuthLayout>
  );
}

const PasswordStrengthMeter = ({ password }) => {
  const strength = useMemo(() => {
    let score = 0;
    if (!password) return 0;
    if (password.length >= 8) score++;
    if (/[a-z]/.test(password) && /[A-Z]/.test(password)) score++;
    if (/[0-9]/.test(password)) score++;
    if (/[^a-zA-Z0-9]/.test(password)) score++;
    return score;
  }, [password]);

  const strengthLabels = ["Very Weak", "Weak", "Medium", "Strong", "Very Strong"];
  const strengthColors = ["bg-red-500", "bg-orange-500", "bg-yellow-500", "bg-blue-500", "bg-green-500"];

  return (
    <div className="space-y-2">
      <div className="h-2 w-full bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
        <motion.div
          className={`h-full rounded-full ${strengthColors[strength] || 'bg-red-500'} transition-all duration-300`}
          initial={{ width: 0 }}
          animate={{ width: `${(strength / 4) * 100}%` }}
        />
      </div>
      <p className={`text-xs font-medium ${
        strength === 0 ? 'text-red-500' :
        strength === 1 ? 'text-orange-500' :
        strength === 2 ? 'text-yellow-500' :
        strength === 3 ? 'text-blue-500' : 'text-green-500'
      }`}>
        Strength: {strengthLabels[strength]}
      </p>
    </div>
  );
};

// ================= SIGNUP =================
export function SignupPage({ onSwitch }) {
  const navigate = useNavigate();
  const location = useLocation();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSignup = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      setLoading(false);
      return;
    }

    try {
      await authService.register(name, email, password);
      const from = location.state?.from?.pathname || "/";
      navigate(from, { replace: true });
    } catch (err) {
      setError(err.message || "Signup failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleAuth = async () => {
    setLoading(true);
    setError("");
    try {
      await authService.loginWithGoogle();
      const from = location.state?.from?.pathname || "/";
      navigate(from, { replace: true });
    } catch (err) {
      setError(err.message || "Google Signup failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout title="Create Account" subtitle="Join us today">
      {error && (
        <div className="p-3 bg-red-500/20 border border-red-500 text-red-400 rounded-lg text-sm">
          {error}
        </div>
      )}
      <form onSubmit={handleSignup} className="space-y-4">
        <Input icon={<User size={18} />} placeholder="Full Name" value={name} onChange={setName} />
        <Input icon={<Mail size={18} />} placeholder="Email" value={email} onChange={setEmail} />
        <PasswordInput value={password} setValue={setPassword} show={showPassword} setShow={setShowPassword} />
        {password && <PasswordStrengthMeter password={password} />}
        <PasswordInput value={confirmPassword} setValue={setConfirmPassword} show={showPassword} setShow={setShowPassword} placeholder="Confirm Password" />

        <button type="submit" className="btn-primary w-full" disabled={loading}>
          {loading ? "Creating Account..." : "Sign Up"}
        </button>
      </form>

      <div className="relative my-6">
        <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-slate-200 dark:border-white/10"></div></div>
        <div className="relative flex justify-center text-sm"><span className="px-2 bg-white dark:bg-slate-800 text-slate-500 dark:text-gray-400 transition-colors duration-300">Or continue with</span></div>
      </div>
      <button type="button" onClick={handleGoogleAuth} disabled={loading} className="w-full py-3 rounded-xl bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-slate-700 dark:text-white font-semibold hover:bg-slate-200 dark:hover:bg-white/10 transition-colors duration-300 flex items-center justify-center">
        <GoogleIcon /> Google
      </button>

      <p className="text-center text-slate-500 dark:text-gray-400 text-sm mt-6">
        Already have an account?{' '}
        <span onClick={() => onSwitch("login")} className="text-blue-500 dark:text-blue-400 cursor-pointer hover:underline">
          Login
        </span>
      </p>
    </AuthLayout>
  );
}

// ================= FORGOT PASSWORD =================
export function ForgotPasswordPage({ onSwitch }) {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);

  return (
    <AuthLayout title="Reset Password" subtitle="We’ll send you a reset link">
      {!sent ? (
        <>
          <Input icon={<Mail size={18} />} placeholder="Email" value={email} onChange={setEmail} />
          <button onClick={() => setSent(true)} className="btn-primary">Send Reset Link</button>
        </>
      ) : (
        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-green-400 text-center">
          Reset link sent! Check your email.
        </motion.p>
      )}

      <p className="text-center text-slate-500 dark:text-gray-400 text-sm mt-6">
        Back to{' '}
        <span onClick={() => onSwitch("login")} className="text-blue-500 dark:text-blue-400 cursor-pointer hover:underline">
          Login
        </span>
      </p>
    </AuthLayout>
  );
}

// ================= MAIN WRAPPER =================
export default function AuthContainer() {
  const [view, setView] = useState("login");

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-[radial-gradient(circle_at_top,_#1f2937,_#020617)] px-4 transition-colors duration-300">
      {view === "login" && <LoginPage onSwitch={setView} />}
      {view === "signup" && <SignupPage onSwitch={setView} />}
      {view === "forgot" && <ForgotPasswordPage onSwitch={setView} />}
    </div>
  );
}

// ================= REUSABLE COMPONENTS =================
function AuthLayout({ title, subtitle, children }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="w-full max-w-md bg-white dark:bg-white/10 backdrop-blur-2xl rounded-3xl p-8 border border-slate-200 dark:border-white/20 shadow-2xl transition-colors duration-300"
    >
      <div className="text-center mb-6">
        <h2 className="text-3xl font-bold text-slate-900 dark:text-white">{title}</h2>
        <p className="text-slate-500 dark:text-gray-400 text-sm">{subtitle}</p>
      </div>

      <div className="space-y-4">{children}</div>
    </motion.div>
  );
}

function Input({ icon, placeholder, value, onChange }) {
  return (
    <div className="relative">
      <div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 dark:text-gray-400">{icon}</div>
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full pl-10 pr-4 py-3 rounded-xl bg-slate-100 dark:bg-white/5 text-slate-900 dark:text-white border border-slate-200 dark:border-white/10 focus:ring-2 focus:ring-blue-500 outline-none transition-colors duration-300"
      />
    </div>
  );
}

function PasswordInput({ value, setValue, show, setShow, placeholder = "Password" }) {
  return (
    <div className="relative">
      <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 dark:text-gray-400" size={18} />
      <input
        type={show ? "text" : "password"}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Password"
        className="w-full pl-10 pr-10 py-3 rounded-xl bg-slate-100 dark:bg-white/5 text-slate-900 dark:text-white border border-slate-200 dark:border-white/10 focus:ring-2 focus:ring-blue-500 outline-none transition-colors duration-300"
      />
      <button type="button" onClick={() => setShow(!show)} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 dark:text-gray-400 hover:text-slate-600 dark:hover:text-gray-300 transition-colors">
        {show ? <EyeOff size={18} /> : <Eye size={18} />}
      </button>
    </div>
  );
}

// ================= DASHBOARD =================

export function Dashboard() {

  const handleLogout = async () => {
    await authService.logout();
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-gray-950 text-slate-900 dark:text-white flex transition-colors duration-300">
      {/* Sidebar */}
      <aside className="w-64 bg-white dark:bg-white/5 backdrop-blur-xl border-r border-slate-200 dark:border-white/10 p-6 hidden md:block transition-colors duration-300">
        <h2 className="text-xl font-bold mb-8">My App</h2>
        <nav className="space-y-4 text-slate-600 dark:text-gray-300">
          <p className="hover:text-slate-900 dark:hover:text-white cursor-pointer">Dashboard</p>
          <p className="hover:text-slate-900 dark:hover:text-white cursor-pointer">Analytics</p>
          <p className="hover:text-slate-900 dark:hover:text-white cursor-pointer">Settings</p>
        </nav>
      </aside>

      {/* Main */}
      <div className="flex-1 p-6">
        {/* Topbar */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-semibold">Dashboard</h1>
          <button
            onClick={handleLogout}
            className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
          >
            Logout
          </button>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {["Users", "Revenue", "Performance"].map((item, i) => (
            <div
              key={i}
              className="p-6 rounded-2xl bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 backdrop-blur-xl shadow-lg transition-colors duration-300"
            >
              <h3 className="text-lg font-semibold mb-2">{item}</h3>
              <p className="text-slate-500 dark:text-gray-400 text-sm">Sample data here</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// Tailwind helper
const styles = `
.btn-primary {
  @apply w-full py-3 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold hover:opacity-90 transition;
}
`;
