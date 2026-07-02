import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Shield, CheckCircle, XCircle, Award, Calendar, User, BookOpen } from "lucide-react";
import axios from "../axios.js";

export default function CertificateVerify() {
  const [certId, setCertId] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleVerify = async (e) => {
    e.preventDefault();
    const idToVerify = certId.trim().toUpperCase();
    if (!idToVerify) return;

    setLoading(true);
    setResult(null);

    try {
      const response = await axios.get(`/api/certificates/verify/${idToVerify}`);
      
      if (response.data?.ok && response.data?.data) {
        const cert = response.data.data;
        setResult({ 
          found: true, 
          name: cert.studentName,
          course: cert.courseName,
          date: new Date(cert.issueDate).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }),
          status: cert.status || 'valid',
          grade: cert.grade,
          instructor: cert.instructor
        });
      } else {
        setResult({ found: false });
      }
    } catch (error) {
      console.error("Verification error:", error);
      setResult({ found: false });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="min-h-screen bg-slate-50 dark:bg-gradient-to-b dark:from-slate-950 dark:via-slate-900 dark:to-blue-950 transition-colors duration-300">
      <Helmet>
        <title>Verify Certificate | IFYWIGATECHZ Academy</title>
        <meta name="description" content="Verify the authenticity of IFYWIGATECHZ Academy certificates. Enter certificate ID to confirm." />
      </Helmet>

      {/* Hero */}
      <div className="relative overflow-hidden py-24 sm:py-32">
        <div className="absolute inset-0 bg-gradient-to-r from-brandBlue/5 via-transparent to-brandGold/5 dark:from-brandBlue/10 dark:via-transparent dark:to-brandGold/10 transition-colors duration-300" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-brandGold/10 rounded-full blur-3xl" />

        <div className="relative max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/60 dark:bg-brandGold/10 border border-slate-200 dark:border-brandGold/20 text-brandGold text-sm font-medium mb-6 shadow-sm dark:shadow-none transition-colors duration-300">
              <Shield size={16} />
              Certificate Verification
            </div>
            <h1 className="text-4xl sm:text-5xl font-black text-slate-900 dark:text-white mb-6 leading-tight transition-colors duration-300">
              Verify a <span className="text-brandGold">Certificate</span>
            </h1>
            <p className="text-xl text-slate-600 dark:text-neutral-400 max-w-xl mx-auto transition-colors duration-300">
              Employers and institutions can verify the authenticity of IFYWIGATECHZ Academy certificates instantly.
            </p>
          </motion.div>
        </div>
      </div>

      {/* Verification Form */}
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        <div className="bg-white/60 dark:bg-white/5 backdrop-blur-2xl rounded-3xl border border-slate-200 dark:border-white/10 p-8 sm:p-10 shadow-lg dark:shadow-2xl transition-colors duration-300">
          <form onSubmit={handleVerify} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-neutral-300 mb-2 transition-colors duration-300">
                Certificate ID
              </label>
              <div className="relative">
                <Award className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 dark:text-neutral-500 transition-colors duration-300" size={18} />
                <input
                  type="text"
                  value={certId}
                  onChange={(e) => setCertId(e.target.value)}
                  placeholder="e.g., IFY-2024-001"
                  className="w-full pl-12 pr-4 py-4 rounded-xl bg-white dark:bg-white/5 text-slate-900 dark:text-white border border-slate-300 dark:border-white/10 placeholder-slate-400 dark:placeholder-neutral-500 focus:ring-2 focus:ring-brandGold outline-none uppercase tracking-wider transition-colors duration-300 shadow-sm dark:shadow-none"
                />
              </div>
              <p className="text-slate-500 dark:text-neutral-500 text-xs mt-2 transition-colors duration-300">
                Enter the certificate ID found on the certificate document.
              </p>
            </div>

            <button
              type="submit"
              disabled={loading || !certId.trim()}
              className="w-full py-4 rounded-xl bg-gradient-to-r from-brandGold to-yellow-500 text-black font-bold shadow-lg hover:shadow-brandGold/25 hover:scale-[1.02] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <div className="w-5 h-5 border-2 border-black/30 border-t-black rounded-full animate-spin" />
                  Verifying...
                </>
              ) : (
                <>
                  <Search size={18} />
                  Verify Certificate
                </>
              )}
            </button>
          </form>

          {/* Result */}
          <AnimatePresence>
            {result && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="mt-6"
              >
                {result.found ? (
                  <div className="bg-green-50 dark:bg-green-500/10 border border-green-200 dark:border-green-500/30 rounded-2xl p-6 transition-colors duration-300 shadow-sm dark:shadow-none">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-12 h-12 bg-green-100 dark:bg-green-500/20 rounded-full flex items-center justify-center transition-colors duration-300">
                        <CheckCircle className="text-green-600 dark:text-green-400 transition-colors duration-300" size={24} />
                      </div>
                      <div>
                        <h3 className="text-lg font-bold text-green-700 dark:text-green-400 transition-colors duration-300">Certificate Verified</h3>
                        <p className="text-green-600 dark:text-green-400/70 text-sm transition-colors duration-300">This certificate is authentic and valid.</p>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4 pt-4 border-t border-green-200 dark:border-green-500/20 transition-colors duration-300">
                      <div className="flex items-center gap-3">
                        <User className="text-slate-400 dark:text-neutral-400 transition-colors duration-300" size={16} />
                        <div>
                          <p className="text-xs text-slate-500 dark:text-neutral-500 transition-colors duration-300">Recipient</p>
                          <p className="text-slate-900 dark:text-white font-medium transition-colors duration-300">{result.name}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <BookOpen className="text-slate-400 dark:text-neutral-400 transition-colors duration-300" size={16} />
                        <div>
                          <p className="text-xs text-slate-500 dark:text-neutral-500 transition-colors duration-300">Course</p>
                          <p className="text-slate-900 dark:text-white font-medium transition-colors duration-300">{result.course}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <Calendar className="text-slate-400 dark:text-neutral-400 transition-colors duration-300" size={16} />
                        <div>
                          <p className="text-xs text-slate-500 dark:text-neutral-500 transition-colors duration-300">Issue Date</p>
                          <p className="text-slate-900 dark:text-white font-medium transition-colors duration-300">{result.date}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <Award className="text-slate-400 dark:text-neutral-400 transition-colors duration-300" size={16} />
                        <div>
                          <p className="text-xs text-slate-500 dark:text-neutral-500 transition-colors duration-300">Grade</p>
                          <p className="text-slate-900 dark:text-white font-medium transition-colors duration-300">{result.grade}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="bg-red-50 dark:bg-red-500/10 border border-red-200 dark:border-red-500/30 rounded-2xl p-6 transition-colors duration-300 shadow-sm dark:shadow-none">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-red-100 dark:bg-red-500/20 rounded-full flex items-center justify-center transition-colors duration-300">
                        <XCircle className="text-red-600 dark:text-red-400 transition-colors duration-300" size={24} />
                      </div>
                      <div>
                        <h3 className="text-lg font-bold text-red-700 dark:text-red-400 transition-colors duration-300">Certificate Not Found</h3>
                        <p className="text-red-600 dark:text-red-400/70 text-sm transition-colors duration-300">
                          No certificate found with ID "{certId}". Please check the ID and try again.
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Info */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-24">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {[
            { icon: <Shield size={24} />, title: "Secure", desc: "All certificates are digitally signed and tamper-proof." },
            { icon: <Search size={24} />, title: "Instant", desc: "Verify certificates in seconds, 24/7." },
            { icon: <Award size={24} />, title: "Trusted", desc: "Recognized by employers across Africa and beyond." },
          ].map((item, i) => (
            <div key={i} className="bg-white/60 dark:bg-white/5 backdrop-blur-xl rounded-2xl border border-slate-200 dark:border-white/10 p-6 text-center shadow-sm dark:shadow-none transition-colors duration-300">
              <div className="w-12 h-12 bg-brandBlue/10 dark:bg-brandBlue/20 rounded-xl flex items-center justify-center mx-auto mb-4 text-brandBlue transition-colors duration-300">
                {item.icon}
              </div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2 transition-colors duration-300">{item.title}</h3>
              <p className="text-slate-600 dark:text-neutral-400 text-sm transition-colors duration-300">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
