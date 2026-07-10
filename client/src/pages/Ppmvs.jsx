import { useEffect, useCallback } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import { COURSE, MODULES, DRUG_LIST, CATEGORIES, OUTCOMES, INSTRUCTOR, TESTIMONIALS, FAQS } from '../data/ppmvsData.js'
import ModuleCard from '../components/ppmvs/ModuleCard.jsx'
import { PRICING_CONFIG, SALE_MODE } from '../data/pricingConfig.js'
import DrugTableAdvanced from '../components/ppmvs/DrugTableAdvanced.jsx'
import CourseProgress from '../components/ppmvs/CourseProgress.jsx'
import InstructorBio from '../components/ppmvs/InstructorBio.jsx'
import TestimonialSlider from '../components/ppmvs/TestimonialSlider.jsx'

function PageMeta() {
  useEffect(() => {
    document.title = 'NAPPMED PPMVS Training - IFYWIGATECHZ GLOBAL SERVICES'

    const description =
      'NAPPMED and PPMVS training for licensed patent medicine dealers and retail pharmacy operators. Gain practical compliance, product knowledge, and customer care skills.'

    let meta = document.querySelector('meta[name="description"]')

    if (!meta) {
      meta = document.createElement('meta')
      meta.name = 'description'
      document.head.appendChild(meta)
    }

    meta.setAttribute('content', description)
  }, [])

  return null
}

export default function Ppmvs() {
  const navigate = useNavigate()
  const { addItem } = useCart()

  const enrollNow = useCallback(() => {
    addItem(COURSE)
    navigate('/checkout')
  }, [addItem, navigate])

  return (
    <>
      <PageMeta />

      <section className="relative overflow-hidden border border-amber-300/20 bg-[radial-gradient(circle_at_top,_rgba(245,158,11,0.16),_transparent_35%),linear-gradient(135deg,_#1f2937_0%,_#111827_45%,_#0f172a_100%)] px-6 py-10 shadow-2xl shadow-slate-950/30 sm:px-8 lg:px-12">
        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(120deg,transparent_0%,rgba(255,255,255,0.05)_35%,transparent_70%)]" />

        <div className="relative grid gap-10 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 rounded-full border border-amber-300/30 bg-amber-300/10 px-4 py-2 text-sm font-medium text-amber-100 backdrop-blur">
              <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-300" />
              NAPPMED / PPMVS training for patent medicine dealers
            </div>

            <div className="space-y-4">
              <h1 className="max-w-3xl font-serif text-4xl font-bold leading-tight text-white sm:text-5xl lg:text-6xl">
                Formal NAPPMED training for patent medicine vendors and retail drug professionals.
              </h1>

              <p className="max-w-2xl text-lg leading-8 text-slate-200">
                Learn compliance with NAPPMED standards, professional dispensing practices, product safety, and customer communication for trusted retail pharmacy operations.
              </p>
            </div>

            <div className="flex flex-col gap-4 sm:flex-row">
              <button
                type="button"
                onClick={enrollNow}
                className="inline-flex items-center justify-center rounded-2xl bg-amber-400 px-6 py-4 text-base font-bold text-slate-950 transition-all duration-300 hover:scale-[1.02] hover:bg-amber-300 active:scale-[0.98]"
              >
                Enroll in NAPPMED training for ₦{PRICING_CONFIG.academy.ppmvs.current.toLocaleString()}
              </button>

              <Link
                to="/checkout"
                className="inline-flex items-center justify-center rounded-2xl border border-white/20 bg-white/8 px-6 py-4 text-base font-semibold text-white transition-all duration-300 hover:bg-white/14 hover:scale-[1.02]"
              >
                View checkout flow
              </Link>
            </div>

            <div className="grid gap-4 sm:grid-cols-3">
              <div className="rounded-2xl border border-white/10 bg-white/10 p-4 backdrop-blur">
                <div className="text-3xl font-bold text-amber-300 flex items-baseline gap-2">
                  {SALE_MODE.enabled && PRICING_CONFIG.academy.ppmvs.original !== PRICING_CONFIG.academy.ppmvs.current && (
                    <span className="text-xl line-through opacity-70">
                      ₦{PRICING_CONFIG.academy.ppmvs.original.toLocaleString()}
                    </span>
                  )}
                  <span>₦{PRICING_CONFIG.academy.ppmvs.current.toLocaleString()}</span>
                </div>
                <p className="mt-1 text-sm text-slate-200">
                  Complete certification package
                </p>
              </div>

              <div className="rounded-2xl border border-white/10 bg-white/10 p-4 backdrop-blur">
                <div className="text-3xl font-bold text-amber-200">
                  {MODULES.length}
                </div>
                <p className="mt-1 text-sm text-slate-200">
                  Practical training modules
                </p>
              </div>

              <div className="rounded-2xl border border-white/10 bg-white/10 p-4 backdrop-blur">
                <div className="text-3xl font-bold text-emerald-300">
                  50+
                </div>
                <p className="mt-1 text-sm text-slate-200">
                  Assessment questions
                </p>
              </div>
            </div>

            <CourseProgress />
          </div>

          <aside className="rounded-[1.75rem] border border-white/10 bg-slate-950/35 p-6 backdrop-blur-xl">
            <p className="text-sm uppercase tracking-[0.25em] text-amber-200/80">
              What you will leave with
            </p>

            <div className="mt-5 space-y-4">
              {OUTCOMES.map((item, index) => (
                <div
                  key={index}
                  className="flex gap-3 rounded-2xl border border-white/8 bg-white/6 p-4 transition hover:bg-white/10"
                >
                  <div className="mt-1 h-2.5 w-2.5 rounded-full bg-emerald-300" />
                  <p className="text-sm leading-7 text-slate-100">
                    {item}
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-6 rounded-2xl border border-amber-300/20 bg-amber-300/10 p-5">
              <p className="text-sm font-semibold text-amber-100">
                Course format
              </p>

              <p className="mt-2 text-sm leading-7 text-slate-100">
                Guided lessons, practical regulatory case studies, and a certification path for patent medicine professionals.
              </p>
            </div>
          </aside>
        </div>
      </section>

      <section className="bg-gradient-to-r from-slate-800 to-slate-900">
        <div className=" mt-1 space-y-6 border border-amber-300/10 bg-slate-900/70">
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="text-sm uppercase tracking-[0.3em] text-amber-200/80">
                Modules
              </p>

              <h2 className="mt-2 text-2xl font-semibold text-white">
                Training roadmap
              </h2>
            </div>

            <span className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-slate-200">
              Module 1 preview open
            </span>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {MODULES.map((module) => (
              <ModuleCard key={module.id} module={module} />
            ))}
          </div>
        </div>
      </section>

      <section className="mt-1 border border-amber-300/10 bg-slate-900/70">
        <DrugTableAdvanced />
      </section>

      <section className="grid grid-cols-1 gap-8 lg:grid-cols-2">
        <InstructorBio />
        <TestimonialSlider />
      </section>

      <section className="card bg-gradient-to-r from-slate-800 to-slate-900">
        <h2 className="mb-1 text-center text-2xl font-bold text-white">
          Frequently Asked Questions
        </h2>

        <div className="mx-auto max-w-2xl space-y-4">
          {FAQS.map((faq, i) => (
            <div
              key={i}
              className="rounded-2xl border border-slate-700 p-6 transition-all duration-300 hover:shadow-xl hover:border-amber-300/30"
            >
              <h3 className="mb-2 font-semibold text-white">
                {faq.q}
              </h3>

              <p className="text-slate-300">
                {faq.a}
              </p>
            </div>
          ))}
        </div>
      </section>
    </>
  )
}
