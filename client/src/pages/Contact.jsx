import { useState, useRef } from 'react'
import { Helmet } from 'react-helmet-async'
import { Mail, MapPin, Phone, Calculator, Plus, Minus } from 'lucide-react'
import ReCAPTCHA from "react-google-recaptcha";
import { motion, AnimatePresence } from 'framer-motion';
import { useLocation, Link } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import GoogleMapEmbed from '../components/GoogleMapEmbed';
import { useToast } from './ToastContext';

/* --- Constants --- */
const companyName = "IFYWIGATECHZ Global Services";
const companyAddress = "N0 2 Ohioigbo by Waterside Road Ayama Ndoki Oyigbo LGA, Rivers State Nigeria.";
const defaultPhoneNumber = "+234 811 372 2088";
const defaultEmail = "Wigatech9@gmail.com";

const faqs = [
  {
    q: "What is the typical response time?",
    a: "We strive to respond to all inquiries within 24 business hours. For urgent matters, please contact us via WhatsApp for a faster response.",
  },
  {
    q: "Do you offer free consultations?",
    a: "Yes, we offer a free 30-minute discovery call to discuss your project, understand your goals, and determine if we're a good fit. You can request one through this contact form or by emailing us directly.",
  },
  {
    q: "What services do you specialize in?",
    a: "We specialize in full-stack web development (MERN stack), UI/UX design, mobile app development, and custom SaaS solutions. We also offer corporate training and tech education through our academy.",
  },
];

export default function Contact() {
  const location = useLocation();
  const { addToast } = useToast();
  // State management can be simplified for async form submission
  const [openFaq, setOpenFaq] = useState(null);
  const [captchaToken, setCaptchaToken] = useState(null);
  const recaptchaRef = useRef();
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    subject: location.state?.subject || '',
    message: '',
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm(prev => ({ ...prev, [name]: value }))
  }

  const toggleFaq = (index) => setOpenFaq(openFaq === index ? null : index);

  const contactMutation = useMutation({
    mutationFn: async (formData) => {
      const payload = {
        ...formData,
        access_key: import.meta.env.VITE_WEB3FORMS_ACCESS_KEY,
        "g-recaptcha-response": captchaToken,
      };
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(payload),
      });
      const result = await response.json();
      if (!result.success) {
        throw new Error(result.message || "An error occurred during submission.");
      }
      return result;
    },
    onSuccess: () => {
      // You can use your global toast here if you have one, e.g., addToast(...)
      alert("Message sent successfully! We'll be in touch shortly.");
      addToast("Message sent successfully! We'll be in touch shortly.", 'success');
      setForm({ ...form, name: '', email: '', phone: '', subject: '', message: '' });
      recaptchaRef.current.reset();
      setCaptchaToken(null);
    },
    onError: (error) => {
      alert(error.message);
      addToast(error.message, 'error');
      recaptchaRef.current.reset();
      setCaptchaToken(null);
    }
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!import.meta.env.VITE_WEB3FORMS_ACCESS_KEY || import.meta.env.VITE_WEB3FORMS_ACCESS_KEY === 'YOUR_ACCESS_KEY_HERE') {
      alert('Web3Forms access key is not configured. Please set it up in your environment variables.');
      addToast('Contact form is not configured correctly.', 'error');
      return;
    }
    if (!captchaToken) {
      alert("Please complete the reCAPTCHA challenge.");
      addToast("Please complete the reCAPTCHA challenge.", 'error');
      return;
    }
    contactMutation.mutate(form);
  }
  return (
    <main>
      <Helmet>
        <title>Contact Us | {companyName}</title>
        <meta name="description" content={`Get in touch with ${companyName}. We're here to answer your questions about our construction services, projects, and material supplies.`} />
        <meta name="keywords" content={`contact ${companyName}, construction company Nigeria, get a quote, Kinglaw builders contact`} />
      </Helmet>
      <section className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white py-16 px-4 transition-colors duration-300">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 dark:text-white mb-4">Get in Touch</h1>
            <p className="text-lg text-slate-600 dark:text-neutral-400 max-w-2xl mx-auto">
              Have a project in mind or just want to say hello? We'd love to hear from you.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-start">
            {/* Contact Form */}
            <div className="bg-white dark:bg-slate-900 p-8 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-lg dark:shadow-none">
              <h2 className="text-2xl font-bold mb-6">Send us a Message</h2>
              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium mb-2 text-slate-700 dark:text-slate-300">
                    Name <span className="text-red-500">*</span>
                  </label>
                  <input id="name" name="name" type="text" value={form.name} onChange={handleChange} className="w-full rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-brandBlue transition" placeholder="Your full name" required disabled={contactMutation.isLoading}/>
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium mb-2 text-slate-700 dark:text-slate-300">
                    Email <span className="text-red-500">*</span>
                  </label>
                  <input id="email" name="email" type="email" value={form.email} onChange={handleChange} className="w-full rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-brandBlue transition" placeholder="your.email@example.com" required disabled={contactMutation.isLoading}/>
                </div>
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium mb-2 text-slate-700 dark:text-slate-300">
                    Phone <span className="text-gray-400 text-xs">(optional)</span>
                  </label>
                  <input id="phone" name="phone" type="tel" value={form.phone} onChange={handleChange} className="w-full rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-brandBlue transition" placeholder="+234 811 372 2088" disabled={contactMutation.isLoading}/>
                </div>
                <div>
                  <label htmlFor="subject" className="block text-sm font-medium mb-2 text-slate-700 dark:text-slate-300">
                    Subject <span className="text-gray-400 text-xs">(optional)</span>
                  </label>
                  <input id="subject" name="subject" type="text" value={form.subject} onChange={handleChange} className="w-full rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-brandBlue transition" placeholder="What is this about?" disabled={contactMutation.isLoading}/>
                </div>
                <div>
                  <label htmlFor="message" className="block text-sm font-medium mb-2 text-slate-700 dark:text-slate-300">
                    Message <span className="text-red-500">*</span>
                  </label>
                  <textarea id="message" name="message" value={form.message} onChange={handleChange} className="w-full rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-brandBlue transition" rows="5" placeholder="Tell us more..." required disabled={contactMutation.isLoading}></textarea>
                </div>

                <ReCAPTCHA
                  ref={recaptchaRef}
                  sitekey={import.meta.env.VITE_RECAPTCHA_SITE_KEY}
                  onChange={(token) => setCaptchaToken(token)}
                  onExpired={() => setCaptchaToken(null)}
                  theme={document.documentElement.classList.contains('dark') ? 'dark' : 'light'}
                />

                <button className="w-full py-3 bg-brandBlue hover:bg-blue-700 text-white font-bold rounded-xl transition-colors disabled:opacity-50" type="submit" disabled={contactMutation.isLoading}>
                  {contactMutation.isLoading ? 'Sending…' : 'Send Message'}
                </button>
              </form>
            </div>

            {/* Contact Info & Map */}
            <div className="space-y-8">
              <div className="space-y-4">
                <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 flex items-center gap-4 shadow-sm">
                  <div className="w-12 h-12 bg-blue-100 dark:bg-blue-500/20 text-brandBlue rounded-lg flex items-center justify-center">
                    <Mail size={24} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg">Email</h3>
                    <a href="mailto:Wigatech9@gmail.com" className="text-slate-600 dark:text-neutral-300 hover:text-brandBlue dark:hover:text-brandBlue transition">Wigatech9@gmail.com</a>
                  </div>
                </div>
                <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 flex items-center gap-4 shadow-sm">
                  <div className="w-12 h-12 bg-green-100 dark:bg-green-500/20 text-green-600 dark:text-green-400 rounded-lg flex items-center justify-center">
                    <Phone size={24} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg">WhatsApp</h3>
                    <a href="https://wa.me/2348113722088" target="_blank" rel="noopener noreferrer" className="text-slate-600 dark:text-neutral-300 hover:text-green-600 dark:hover:text-green-500 transition">+234 811 372 2088</a>
                  </div>
                </div>
                <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 flex items-center gap-4 shadow-sm">
                  <div className="w-12 h-12 bg-purple-100 dark:bg-purple-500/20 text-purple-600 dark:text-purple-400 rounded-lg flex items-center justify-center">
                    <MapPin size={24} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg">Location</h3>
                    <p className="text-slate-600 dark:text-neutral-300">N0 2 Ohioigbo by Waterside Road Ayama Ndoki Oyigbo LGA, Rivers State Nigeria.</p>
                  </div>
                </div>
              </div>

              <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.7, ease: "easeOut", delay: 0.2 }} className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
                <h3 className="text-xl font-bold mb-4">Business Hours</h3>
                <div className="space-y-2 text-slate-600 dark:text-neutral-400">
                  <p><strong>Monday - Friday:</strong> 9:00 AM - 5:00 PM</p>
                  <p><strong>Saturday:</strong> 10:00 AM - 2:00 PM</p>
                  <p><strong>Sunday:</strong> Closed</p>
                </div>
              </motion.div>

              <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.7, ease: "easeOut", delay: 0.3 }} className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
                <h3 className="text-xl font-bold mb-4">Need a Project Estimate?</h3>
                <p className="text-slate-600 dark:text-neutral-400 mb-5 text-sm">
                  For detailed project pricing and consultation, please use our quote request form.
                </p>
                <Link to="/request-quote" className="inline-flex items-center justify-center gap-2 w-full sm:w-auto px-6 py-3 bg-brandBlue hover:bg-blue-700 text-white font-semibold rounded-xl transition-colors duration-200 shadow-md shadow-blue-200 dark:shadow-none">
                  <Calculator size={18} className="mr-2" />
                  Request a Quote
                </Link>
              </motion.div>
            </div>
          </div>

          {/* Map Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="mt-16 sm:mt-20 lg:mt-24"
          >
            <div className="text-center mb-12">
              <p className="font-semibold text-brandBlue mb-2">Our Location</p>
              <h2 className="text-3xl font-bold text-slate-900 dark:text-white">Find Us On The Map</h2>
              <p className="text-lg text-slate-600 dark:text-neutral-400 mt-2 max-w-2xl mx-auto">Visit our office for a face-to-face consultation. We are located in the heart of Benin City.</p>
            </div>
            <div className="mt-8 sm:mt-12 aspect-video w-full rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800 shadow-lg hover:shadow-xl">
              <GoogleMapEmbed
                apiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY}
                center={{ lat: 4.779444, lng: 7.133270 }} // Coordinates for Oyigbo, Rivers State
                zoom={14}
                theme="silver"
                markerIconUrl="/location-pin.png"
                scrollZoomEnabled={true}
              />
            </div>
          </motion.div>

          {/* FAQ Section */}
          <div className="mt-24 max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-slate-900 dark:text-white">Common Questions</h2>
              <p className="text-lg text-slate-600 dark:text-neutral-400 mt-2">
                Find quick answers to common inquiries below.
              </p>
            </div>
            <div className="space-y-4">
              {faqs.map((faq, i) => (
                <div key={i} className="bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-2xl overflow-hidden transition-colors duration-300">
                  <button
                    onClick={() => toggleFaq(i)}
                    className="w-full p-6 text-left flex justify-between items-center gap-4"
                  >
                    <span className="font-semibold text-slate-900 dark:text-white">{faq.q}</span>
                    {openFaq === i ? <Minus size={20} className="text-brandBlue flex-shrink-0" /> : <Plus size={20} className="text-slate-500 flex-shrink-0" />}
                  </button>
                  <AnimatePresence>
                    {openFaq === i && (
                      <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
                        <p className="px-6 pb-6 text-slate-600 dark:text-neutral-300 leading-relaxed">
                          {faq.a}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-16 text-center text-sm text-slate-600 dark:text-gray-400 max-w-xl mx-auto">
            By sending information, you agree to our{' '}
            <a href="/terms" className="text-brandBlue hover:underline">
              Terms & Conditions
            </a>{' '}
            and{' '}
            <a href="/privacy" className="text-brandBlue hover:underline">
              Privacy Policy
            </a>
            .
          </div>
        </div>
      </section>
    </main>
  )
}
