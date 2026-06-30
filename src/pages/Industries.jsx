import { Helmet } from 'react-helmet-async'

export default function Industries() {
  return (
    <section className="section space-y-16 bg-slate-50 dark:bg-blue-900 container-wide transition-colors duration-300">
      {/* SEO */}
      <Helmet>
        <title>Industries We Serve | IFYWIGATECHZ Global Services</title>
        <meta
          name="description"
          content="Industries served by IFYWIGATECHZ Global Services including startups, healthcare, real estate, education, and e-commerce."
        />
      </Helmet>

      {/* Header */}
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-extrabold text-slate-900 dark:text-brandBlue transition-colors duration-300">Industries We Serve</h1>
        <p className="max-w-2xl mx-auto text-slate-700 dark:text-neutral-200 transition-colors duration-300">
          We build tailored digital solutions for businesses across multiple industries.
        </p>
      </div>

      {/* Industries Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
        {industries.map((item) => (
          <div
            key={item.title}
            className="rounded-2xl border border-slate-200 dark:border-white/10
                       bg-white dark:bg-white/5 p-6 space-y-3
                       shadow-sm dark:shadow-none hover:shadow-lg dark:hover:shadow-xl transition-all duration-300"
          >
            <div className="text-3xl">{item.icon}</div>
            <h3 className="text-xl font-semibold text-slate-900 dark:text-blue-400 transition-colors duration-300">{item.title}</h3>
            <p className="text-sm text-slate-700 dark:text-neutral-300 transition-colors duration-300">
              {item.desc}
            </p>
          </div>
        ))}
      </div>

      {/* CTA */}
      <div className="text-center space-y-4">
        <h2 className="text-2xl font-bold bg-white/60 dark:bg-white/10 text-slate-900 dark:text-white inline-block px-4 py-2 rounded-2xl shadow-sm dark:shadow-none transition-colors duration-300">
          Not sure if we cover your industry?
        </h2>
        <p className="text-slate-700 dark:text-neutral-200 transition-colors duration-300">
          Let’s discuss your project and see how we can help.
        </p>

        <a
          href="https://wa.me/2348113722088"
          target="_blank"
          rel="noreferrer"
          className="inline-block bg-green-500 hover:bg-green-600
                     text-white px-6 py-3 rounded-xl font-semibold shadow-md hover:shadow-lg transition-all duration-300"
        >
          Talk to Us on WhatsApp
        </a>
      </div>
    </section>
  )
}

const industries = [
  {
    title: 'Startups & Entrepreneurs',
    icon: '🚀',
    desc: 'MVPs, landing pages, and scalable platforms to launch fast and grow.',
  },
  {
    title: 'E-commerce',
    icon: '🛒',
    desc: 'Online stores, product catalogs, checkout systems, and integrations.',
  },
  {
    title: 'Healthcare & Pharmacy',
    icon: '💊',
    desc: 'Medical, pharmacy, and health-related platforms with clean UX.',
  },
  {
    title: 'Real Estate',
    icon: '🏡',
    desc: 'Property listings, agent profiles, and lead generation websites.',
  },
  {
    title: 'Education & Training',
    icon: '🎓',
    desc: 'Learning platforms, academies, course pages, and dashboards.',
  },
  {
    title: 'Corporate & Business',
    icon: '🏢',
    desc: 'Professional company websites, internal tools, and branding sites.',
  },
  {
    title: 'Creative & Personal Brands',
    icon: '🎨',
    desc: 'Portfolio websites for designers, creators, and professionals.',
  },
  {
    title: 'NGOs & Communities',
    icon: '🤝',
    desc: 'Awareness platforms, donation pages, and community portals.',
  },
  {
    title: 'Technology & SaaS',
    icon: '💻',
    desc: 'Web apps, dashboards, SaaS landing pages, and admin panels.',
  },
]
