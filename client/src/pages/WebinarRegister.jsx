import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { eventsData } from '../data/eventsData';
import { Calendar, Clock, User, Mail, ArrowLeft, Loader2, CheckCircle, Users } from 'lucide-react';
import Countdown from '../components/Countdown.jsx';

export default function WebinarRegister() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [event, setEvent] = useState(null);
  const [formData, setFormData] = useState({ name: '', email: '', reason: '' });
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [validationErrors, setValidationErrors] = useState({});
  const [error, setError] = useState('');

  useEffect(() => {
    const foundEvent = eventsData.find(e => e.id === slug);
    if (foundEvent) {
      setEvent(foundEvent);
    } else {
      navigate('/404'); // Or some other error handling
    }
  }, [slug, navigate]);

  const validateField = (name, value) => {
    let fieldError = '';
    if (name === 'name' && !value.trim()) {
      fieldError = 'Full Name is required.';
    }
    if (name === 'email') {
      if (!value.trim()) {
        fieldError = 'Email Address is required.';
      } else if (!/\S+@\S+\.\S+/.test(value)) {
        fieldError = 'Please enter a valid email address.';
      }
    }
    setValidationErrors(prev => ({ ...prev, [name]: fieldError }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    if (validationErrors[name]) {
      validateField(name, value); // Re-validate on change to clear error
    }
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    validateField(name, value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    // Perform a full validation before submitting
    validateField('name', formData.name);
    validateField('email', formData.email);
    if (!formData.name.trim() || !formData.email.trim() || !/\S+@\S+\.\S+/.test(formData.email)) {
      return;
    }

    setLoading(true);

    const web3formData = new FormData();
    web3formData.append("access_key", import.meta.env.VITE_WEB3FORMS_ACCESS_KEY);
    web3formData.append("subject", `New Webinar Registration: ${event.title}`);
    web3formData.append("from_name", "IFYWIGATECHZ Registrations");
    web3formData.append("Event Title", event.title);
    web3formData.append("Name", formData.name);
    web3formData.append("Email", formData.email);
    web3formData.append("Reason to Join", formData.reason || "Not provided");

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: web3formData,
      });

      const result = await response.json();

      if (result.success) {
        setSubmitted(true);
      } else {
        setError(result.message || "An error occurred while submitting the form.");
      }
    } catch (error) {
      setError("An error occurred. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  if (!event) {
    return <div className="min-h-screen bg-slate-950 flex items-center justify-center text-white">Loading event...</div>;
  }

  return (
    <section className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-blue-950 py-20 px-4">
      <Helmet>
        <title>Register for {event.title}</title>
      </Helmet>

      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Link to="/events" className="inline-flex items-center gap-2 text-neutral-400 hover:text-white transition-colors text-sm mb-6">
            <ArrowLeft size={16} />
            Back to Events
          </Link>

          <div className="bg-white/5 backdrop-blur-2xl rounded-3xl border border-white/10 shadow-2xl grid md:grid-cols-2 overflow-hidden">
            {/* Left Side: Event Info */}
            <div className="p-8 sm:p-10 border-b md:border-b-0 md:border-r border-white/10 flex flex-col">
              <span className="text-xs px-3 py-1 rounded-full font-semibold bg-brandGold/10 text-brandGold border border-brandGold/20 w-fit mb-4">
                {event.type}
              </span>
              <h1 className="text-3xl sm:text-4xl font-bold text-white mb-4">{event.title}</h1>
              <p className="text-neutral-300 leading-relaxed mb-6 flex-grow">{event.desc}</p>
              
              <Countdown targetDate={event.date} />

              <div className="space-y-3 text-sm text-neutral-300 border-t border-white/10 pt-6">
                <p className="flex items-center gap-3"><Calendar size={16} className="text-brandGold" /> {new Date(event.date).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
                <p className="flex items-center gap-3"><Clock size={16} className="text-brandGold" /> {event.time}</p>
                <p className="flex items-center gap-3"><Users size={16} className="text-brandGold" /> Hosted by {event.speaker}</p>
              </div>
            </div>

            {/* Right Side: Form */}
            <div className="p-8 sm:p-10">
              {submitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center flex flex-col items-center justify-center h-full"
                >
                  <div className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center mx-auto border border-green-500/30 mb-5">
                    <CheckCircle className="text-green-400" size={36} />
                  </div>
                  <h2 className="text-2xl font-bold text-white mb-2">Registration Confirmed!</h2>
                  <p className="text-neutral-300">Thank you, {formData.name}. A confirmation has been sent to <span className="font-semibold text-white">{formData.email}</span>.</p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <h2 className="text-2xl font-bold text-white mb-1">Register Now</h2>
                  <p className="text-sm text-neutral-400 -mt-4 mb-6">Seats are limited. Secure your spot!</p>
                  
                  {error && <div className="p-3 bg-red-500/10 border border-red-500/30 text-red-400 rounded-xl text-sm">{error}</div>}

                  <div className="relative">
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-500" size={18} />
                    <input type="text" name="name" value={formData.name} onChange={handleChange} onBlur={handleBlur} placeholder="Full Name" required className={`w-full pl-12 pr-4 py-3.5 rounded-xl bg-white/5 text-white border placeholder-neutral-500 focus:ring-2 focus:ring-brandGold outline-none transition-all ${validationErrors.name ? 'border-red-500/50' : 'border-white/10'}`} />
                  </div>
                  {validationErrors.name && <motion.p initial={{ opacity: 0, y: -5 }} animate={{ opacity: 1, y: 0 }} className="text-red-400 text-xs -mt-3 ml-2">{validationErrors.name}</motion.p>}

                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-500" size={18} />
                    <input type="email" name="email" value={formData.email} onChange={handleChange} onBlur={handleBlur} placeholder="Email Address" required className={`w-full pl-12 pr-4 py-3.5 rounded-xl bg-white/5 text-white border placeholder-neutral-500 focus:ring-2 focus:ring-brandGold outline-none transition-all ${validationErrors.email ? 'border-red-500/50' : 'border-white/10'}`} />
                  </div>
                  {validationErrors.email && <motion.p initial={{ opacity: 0, y: -5 }} animate={{ opacity: 1, y: 0 }} className="text-red-400 text-xs -mt-3 ml-2">{validationErrors.email}</motion.p>}

                  <div>
                    <textarea 
                      name="reason" 
                      value={formData.reason} 
                      onChange={handleChange} 
                      placeholder="Why do you want to join this masterclass? (Optional)" 
                      rows="3" 
                      className="w-full px-4 py-3.5 rounded-xl bg-white/5 text-white border border-white/10 placeholder-neutral-500 focus:ring-2 focus:ring-brandGold outline-none transition-all resize-none"></textarea>
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-4 rounded-xl bg-gradient-to-r from-brandGold to-yellow-500 text-black font-bold shadow-lg hover:shadow-brandGold/30 hover:scale-[1.02] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  >
                    {loading ? <><Loader2 size={18} className="animate-spin" /> Securing Spot...</> : 'Complete Registration'}
                  </button>
                </form>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}