import { useState } from 'react'
import PaystackButton from '../components/PaystackButton'
import { motion } from 'framer-motion'
import GlassCard from '../components/GlassCard'
import Button from '../components/Button'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { PRICING_CONFIG } from '../data/pricingConfig'

const offerings = [
  { name: 'Frontend Development Course', price: PRICING_CONFIG.academy.frontend.current, originalPrice: PRICING_CONFIG.academy.frontend.original },
  { name: 'Full-Stack MERN Bootcamp', price: PRICING_CONFIG.academy.mern.current, originalPrice: PRICING_CONFIG.academy.mern.original },
  { name: 'Backend Development Workshop', price: PRICING_CONFIG.academy.backend.current, originalPrice: PRICING_CONFIG.academy.backend.original },
  { name: 'Data Structures & Algorithms', price: PRICING_CONFIG.academy.dsa.current, originalPrice: PRICING_CONFIG.academy.dsa.original },
  { name: 'Python for Beginners', price: PRICING_CONFIG.academy.python.current, originalPrice: PRICING_CONFIG.academy.python.original },
  { name: 'UI/UX Design Masterclass', price: PRICING_CONFIG.academy.uiux.current, originalPrice: PRICING_CONFIG.academy.uiux.original },
  { name: 'Advanced JavaScript Concepts', price: PRICING_CONFIG.academy.advancedJs.current, originalPrice: PRICING_CONFIG.academy.advancedJs.original },
  { name: 'React.js Advanced Patterns', price: PRICING_CONFIG.academy.reactAdvanced.current, originalPrice: PRICING_CONFIG.academy.reactAdvanced.original },
  { name: 'Node.js Masterclass', price: PRICING_CONFIG.academy.nodeMasterclass.current, originalPrice: PRICING_CONFIG.academy.nodeMasterclass.original },
  { name: 'Data Science Fundamentals', price: PRICING_CONFIG.academy.dataScience.current, originalPrice: PRICING_CONFIG.academy.dataScience.original },
  { name: '1-on-1 Coaching Session', price: PRICING_CONFIG.academy.oneOnOne.current, originalPrice: PRICING_CONFIG.academy.oneOnOne.original },
  { name: 'Portfolio Review & Mentorship', price: PRICING_CONFIG.academy.portfolioReview.current, originalPrice: PRICING_CONFIG.academy.portfolioReview.original }
]

const courseDetails = {
  'Frontend Development Course': [
    'HTML & CSS foundations',
    'Modern JavaScript',
    'Responsive UI layouts',
    'React basics',
    'Deployment with Netlify'
  ],
  'Full-Stack MERN Bootcamp': [
    'MongoDB fundamentals',
    'Express API development',
    'React frontend build',
    'Node.js server setup',
    'Authentication & deployment'
  ],
  'Backend Development Workshop': [
    'REST API design',
    'Database modeling',
    'Node.js and Express',
    'Authentication flows',
    'Testing & deployment'
  ],
  'Data Structures & Algorithms': [
    'Algorithm fundamentals',
    'Arrays and linked lists',
    'Searching & sorting',
    'Complexity analysis',
    'Coding interview practice'
  ],
  'Python for Beginners': [
    'Python syntax & variables',
    'Control flow',
    'Functions & modules',
    'File handling',
    'Mini project build'
  ],
  'UI/UX Design Masterclass': [
    'Design thinking',
    'Figma prototyping',
    'Visual hierarchy',
    'Interaction design',
    'Design systems'
  ],
  'Advanced JavaScript Concepts': [
    'Closures & scope',
    'Async patterns',
    'ES modules',
    'Performance tuning',
    'Advanced DOM handling'
  ],
  'React.js Advanced Patterns': [
    'Hooks deep dive',
    'State management',
    'Context API',
    'Performance optimization',
    'Reusable component design'
  ],
  'Node.js Masterclass': [
    'Node core modules',
    'Express middleware',
    'Database integration',
    'Authentication',
    'Production deployment'
  ],
  'Data Science Fundamentals': [
    'Data analysis with Python',
    'Pandas & NumPy',
    'Data visualization',
    'Machine learning basics',
    'Project workflow'
  ],
  '1-on-1 Coaching Session': [
    'Personalized roadmap',
    'Live code review',
    'Career guidance',
    'Portfolio feedback',
    'Action plan'
  ],
  'Portfolio Review & Mentorship': [
    'Portfolio audit',
    'UI/UX feedback',
    'Project improvement plan',
    'Mentorship session',
    'Next-step guidance'
  ]
}

export default function Enroll() {
  const navigate = useNavigate()
  const { user } = useAuth()
  const [email, setEmail] = useState('')
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [selected, setSelected] = useState(null)
  const [amount, setAmount] = useState(0)
  const [coupon, setCoupon] = useState('')

  const handleSelect = (item) => {
    setSelected(item)
    setAmount(item.price * 100) // Paystack uses kobo
  }

  const applyDiscount = () => {
    if (coupon.toLowerCase() === 'tech10') {
      setAmount((prev) => prev * 0.9)
    }
  }

  return (
    <section className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white px-4 py-12 flex items-center justify-center transition-colors duration-300">
      <div className="w-full max-w-4xl">

        <motion.h2 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-3xl sm:text-4xl font-bold mb-2 text-center text-slate-900 dark:text-white transition-colors duration-300"
        >
          Enroll / Book a Session 🚀
        </motion.h2>

        <p className="text-center text-slate-600 dark:text-neutral-400 mb-10 transition-colors duration-300">
          Choose a program or session and complete your payment securely.
        </p>

        <div className="grid md:grid-cols-2 gap-8">

          {/* LEFT: FORM */}
          <GlassCard className="space-y-5 !p-6 sm:!p-8 bg-white/60 dark:bg-white/5 border border-slate-200 dark:border-white/10 shadow-lg dark:shadow-none transition-colors duration-300" hover={false}>

            {/* Personal Info */}
            <div>
              <label className="text-sm font-medium text-slate-700 dark:text-slate-300 transition-colors duration-300">Full Name</label>
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Ify WigaTechz"
                className="w-full mt-1 px-4 py-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-300 dark:border-white/10 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:border-brandBlue focus:ring-1 focus:ring-brandBlue transition-colors duration-300 shadow-sm dark:shadow-none"
              />
            </div>

            <div>
              <label className="text-sm font-medium text-slate-700 dark:text-slate-300 transition-colors duration-300">Email</label>
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Ify@example.com"
                className="w-full mt-1 px-4 py-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-300 dark:border-white/10 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:border-brandBlue focus:ring-1 focus:ring-brandBlue transition-colors duration-300 shadow-sm dark:shadow-none"
              />
            </div>

            <div>
              <label className="text-sm font-medium text-slate-700 dark:text-slate-300 transition-colors duration-300">Phone</label>
              <input
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="+234..."
                className="w-full mt-1 px-4 py-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-300 dark:border-white/10 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:border-brandBlue focus:ring-1 focus:ring-brandBlue transition-colors duration-300 shadow-sm dark:shadow-none"
              />
            </div>

            {/* Offerings */}
            <div>
              <label className="text-sm mb-3 block font-medium text-slate-700 dark:text-neutral-300 transition-colors duration-300">Select Program</label>
              <div className="grid grid-cols-1 gap-3">
                {offerings.map((item, i) => (
                  <button
                    key={i}
                    onClick={() => handleSelect(item)}
                    className={`rounded-3xl border px-4 py-4 text-left transition-all duration-200 shadow-sm backdrop-blur-sm ${
                      selected?.name === item.name
                        ? 'border-brandBlue/70 bg-blue-50 dark:bg-brandBlue/20 shadow-brandBlue/20'
                        : 'bg-white dark:bg-slate-800/70 border-slate-200 dark:border-white/10 hover:border-slate-300 dark:hover:border-white/30 hover:bg-slate-50 dark:hover:bg-slate-700/80'
                    }`}
                  >
                    <div className="flex items-center justify-between gap-4">
                      <span className="font-medium text-slate-900 dark:text-white transition-colors duration-300">{item.name}</span>
                      <span className="text-sm font-semibold text-brandBlue dark:text-brandGold transition-colors duration-300">₦{item.price.toLocaleString()}</span>
                    </div>
                  </button>
                ))}
              </div>
              {selected && selected.originalPrice && selected.originalPrice !== selected.price && (
                <p className="text-right text-sm text-slate-500 dark:text-neutral-400 mt-2">
                  Original Price: <span className="line-through">₦{selected.originalPrice.toLocaleString()}</span>
                </p>
              )}
            </div>


            {/* Program Course Table */}
            <div className="mt-6 rounded-3xl border border-slate-200 dark:border-white/10 bg-white/80 dark:bg-slate-900/80 p-5 shadow-md dark:shadow-lg dark:shadow-black/20 transition-colors duration-300">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <p className="text-xs uppercase tracking-[0.3em] text-slate-500 dark:text-neutral-400 transition-colors duration-300">Course outline</p>
                  <h3 className="text-xl font-semibold text-slate-900 dark:text-white transition-colors duration-300">Matched Courses</h3>
                </div>
                <span className="rounded-full bg-emerald-100 dark:bg-emerald-500/10 px-3 py-1 text-sm text-emerald-700 dark:text-emerald-300 transition-colors duration-300">
                  {selected ? 'Updated' : 'Select a program'}
                </span>
              </div>

              <div className="overflow-hidden rounded-3xl border border-slate-200 dark:border-white/10 transition-colors duration-300">
                <table className="min-w-full divide-y divide-slate-200 dark:divide-neutral-800 text-sm text-left transition-colors duration-300">
                  <thead className="bg-slate-50 dark:bg-slate-950 transition-colors duration-300">
                    <tr>
                      <th className="px-4 py-3 font-semibold text-slate-600 dark:text-neutral-400">Module</th>
                      <th className="px-4 py-3 font-semibold text-slate-600 dark:text-neutral-400">Description</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200 dark:divide-neutral-800 bg-white dark:bg-slate-900 transition-colors duration-300">
                    {(selected ? courseDetails[selected.name] : ['Choose a program to see matching course modules']).map((module, idx) => (
                      <tr key={idx} className="hover:bg-slate-50 dark:hover:bg-slate-800/80 transition-colors">
                        <td className="px-4 py-3 text-slate-900 dark:text-white align-top transition-colors duration-300">{idx + 1}</td>
                        <td className="px-4 py-3 text-slate-700 dark:text-neutral-300 transition-colors duration-300">{module}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Coupon */}
            <div className="flex flex-col gap-3 sm:flex-row">
              <input
                value={coupon}
                onChange={(e) => setCoupon(e.target.value)}
                placeholder="Coupon code"
                className="flex-1 rounded-xl bg-white dark:bg-slate-900 border border-slate-300 dark:border-white/10 text-slate-900 dark:text-white px-4 py-3 placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:border-brandBlue transition-colors duration-300 shadow-sm dark:shadow-none"
              />
              <Button
                variant="primary"
                onClick={applyDiscount}
              >
                Apply
              </Button>
            </div>
          </GlassCard>

          {/* RIGHT: SUMMARY */}
          <GlassCard className="flex flex-col justify-between sticky top-24 h-fit !p-6 sm:!p-8 bg-white/60 dark:bg-white/5 border border-slate-200 dark:border-white/10 shadow-lg dark:shadow-none transition-colors duration-300" hover={false}>

            <div>
              <h3 className="text-xl font-semibold mb-4 text-slate-900 dark:text-white transition-colors duration-300">Payment Summary</h3>

              <div className="space-y-3 text-sm text-slate-700 dark:text-neutral-300 transition-colors duration-300">
                <div className="flex justify-between">
                  <span>Program</span>
                  <span className="font-medium text-slate-900 dark:text-white transition-colors duration-300">{selected?.name || '—'}</span>
                </div>

                <div className="flex justify-between">
                  <span>Email</span>
                  <span className="font-medium text-slate-900 dark:text-white transition-colors duration-300">{email || '—'}</span>
                </div>

                <div className="flex justify-between">
                  <span>Phone</span>
                  <span className="font-medium text-slate-900 dark:text-white transition-colors duration-300">{phone || '—'}</span>
                </div>

                <hr className="border-slate-200 dark:border-neutral-700 transition-colors duration-300" />

                <div className="flex justify-between text-lg font-bold text-slate-900 dark:text-white transition-colors duration-300">
                  <span>Total</span>
                  <span>₦{(amount / 100).toLocaleString()}</span>
                </div>
              </div>
            </div>

            {/* PAYSTACK */}
            <div className="mt-6">
              <PaystackButton
                email={email}
                amount={amount}
                metadata={{ name, phone, course: selected?.name }}
                label="Purchase Now"
                onSuccess={(res) => {
                  alert("Payment successful! Our team will contact you shortly.");
                  navigate(user ? '/dashboard' : '/');
                }}
                className="w-full rounded-xl bg-brandGold px-6 py-4 text-base font-bold text-black shadow-lg shadow-brandGold/20 transition hover:bg-yellow-500 hover:-translate-y-0.5"
              />

              <p className="text-xs text-slate-500 dark:text-neutral-400 mt-3 text-center transition-colors duration-300">
                Secure payments powered by Paystack.
              </p>
            </div>
          </GlassCard>

        </div>
      </div>
    </section>
  )
}