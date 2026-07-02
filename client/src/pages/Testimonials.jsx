import { Helmet } from 'react-helmet-async';
import { NavLink } from 'react-router-dom';

export default function Testimonials() {
  const testimonials = [
    {
      name: "Kingsley — Builder",
      role: "Construction Business Owner",
      caption: "Professional web solution delivered with speed and quality. Their attention to detail transformed our online presence completely.",
      video: "/videos/kingsley.mp4",
      rating: 5,
      company: "Kingsley Constructions"
    },
    {
      name: "Oluma — Concrete CEO",
      role: "CEO, Concrete Solutions Ltd",
      caption: "Our business visibility improved massively after the redesign. We saw a 200% increase in inquiries within the first month.",
      video: "/videos/oluma.mp4",
      rating: 5,
      company: "Concrete Solutions"
    },
    {
      name: "Academy Student",
      role: "React Developer Graduate",
      caption: "I went from beginner to React developer faster than expected. The teaching is structured, practical, and incredibly supportive.",
      video: "/videos/student.mp4",
      rating: 5,
      company: "IFYWIGATECHZ Academy"
    },
    {
      name: "Tunde — E-Commerce Owner",
      role: "Founder, Fashion Store Online",
      caption: "Building our e-commerce platform was seamless. The team understood our needs and delivered beyond expectations.",
      video: "/videos/tunde.mp4",
      rating: 5,
      company: "Fashion Store Nigeria"
    },
    {
      name: "Chioma — Agency Manager",
      role: "Marketing Director, Creative Minds",
      caption: "Their custom API integrations saved us thousands of naira on external services. Highly recommended for technical excellence.",
      video: "/videos/chioma.mp4",
      rating: 5,
      company: "Creative Minds Agency"
    },
    {
      name: "Emmanuel — Tech Startup",
      role: "Co-founder, FinTech Startup",
      caption: "The scalability and security they built into our application has been crucial as we've grown to 50,000+ users.",
      video: "/videos/emmanuel.mp4",
      rating: 5,
      company: "FinTech Innovations"
    },
  ];

  return (
    <section className="section relative overflow-hidden bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white py-20 container-wide transition-colors duration-300">
      <div className="absolute inset-x-0 top-0 h-56 bg-gradient-to-b from-brandBlue/10 to-transparent" />
      <div className="absolute -right-24 top-24 h-72 w-72 rounded-full bg-brandGold/10 blur-3xl" />
      <div className="absolute -left-20 bottom-20 h-80 w-80 rounded-full bg-brandBlue/10 blur-3xl" />

      {/* SEO */}
      <Helmet>
        <title>Client Testimonials & Reviews | IFYWIGATECHZ</title>
        <meta
          name="description"
          content="See what our clients say about our web development, training, and digital solutions. Real success stories from satisfied customers."
        />
      </Helmet>

      {/* Hero Section */}
      <div className="relative z-10 text-center mx-auto max-w-4xl space-y-5 px-4 sm:px-6">
        <p className="inline-flex items-center justify-center rounded-full border border-slate-300 dark:border-white/10 bg-white/60 dark:bg-white/5 backdrop-blur px-5 py-2 text-sm uppercase tracking-[0.28em] text-slate-700 dark:text-neutral-300">
          Success stories & proven results
        </p>
        <h1 className="text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white sm:text-5xl lg:text-6xl">
          Trusted by 100+ businesses across industries
        </h1>
        <p className="mx-auto max-w-2xl text-base text-slate-700 dark:text-neutral-300 sm:text-lg leading-8">
          Discover genuine client reviews, video testimonials, and real outcomes from projects delivered with speed, quality, and care.
        </p>
      </div>

      {/* Stats Section */}
      <div className="relative z-10 mx-auto mt-12 grid max-w-4xl grid-cols-1 gap-6 sm:grid-cols-3 px-4 sm:px-6">
        {[
          { value: '100+', label: 'Happy Clients' },
          { value: '150+', label: 'Projects Delivered' },
          { value: '4.9★', label: 'Average Rating' }
        ].map((stat, index) => (
          <div key={index} className="rounded-[2rem] border border-slate-200 dark:border-white/10 bg-white/80 dark:bg-slate-900/80 p-6 text-center shadow-xl shadow-brandBlue/5 backdrop-blur-sm transition-colors duration-300">
            <p className="text-4xl font-extrabold text-brandGold">{stat.value}</p>
            <p className="mt-3 text-sm uppercase tracking-[0.24em] text-slate-600 dark:text-neutral-400">{stat.label}</p>
          </div>
        ))}
      </div>

      {/* Testimonials Grid */}
      <div className="relative z-10 mx-auto mt-16 grid grid-cols-1 gap-6 lg:gap-8 px-4 sm:px-6 lg:grid-cols-3">
        {testimonials.map((item, i) => (
          <div
            key={i}
            className="group flex h-full flex-col overflow-hidden rounded-[2rem] border border-slate-200 dark:border-white/10 bg-white/80 dark:bg-slate-900/80 shadow-2xl shadow-brandBlue/10 transition-all duration-300 hover:-translate-y-1 hover:border-brandBlue/40"
          >
            <div className="relative overflow-hidden bg-slate-200 dark:bg-slate-900/90">
              <video
                className="h-60 w-full object-cover transition-transform duration-300 group-hover:scale-105"
                controls
                preload="metadata"
              >
                <source src={item.video} type="video/mp4" />
              </video>
              <div className="absolute inset-x-0 top-0 flex items-center justify-between p-4">
                <span className="rounded-2xl bg-black/50 px-3 py-1 text-xs uppercase tracking-[0.24em] text-white/80">Video Review</span>
                <span className="rounded-full bg-white/10 px-3 py-1 text-xs text-brandGold">{item.rating} / 5</span>
              </div>
            </div>

            <div className="flex flex-col flex-1 p-6 space-y-5">
              <div>
                <h3 className="text-xl font-semibold text-slate-900 dark:text-white">{item.name}</h3>
                <p className="mt-2 text-sm text-slate-700 dark:text-neutral-400">{item.role}</p>
                <p className="mt-1 text-xs uppercase tracking-[0.24em] text-slate-600 dark:text-neutral-400 font-medium">{item.company}</p>
              </div>

              <p className="text-slate-700 dark:text-neutral-200 text-sm leading-7 italic">“{item.caption}”</p>

              <div className="mt-auto rounded-3xl border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-white/5 p-4 text-xs text-slate-700 dark:text-neutral-300">
                Verified client feedback from a real project delivery.
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Social Proof Section */}
      <div className="relative z-10 mx-auto mt-16 max-w-4xl rounded-[2rem] border border-brandBlue/25 bg-gradient-to-r from-brandBlue/10 to-brandGold/10 p-10 shadow-2xl shadow-brandBlue/10">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 items-center">
          <div>
            <h3 className="text-3xl font-bold text-slate-900 dark:text-white sm:text-4xl">Join 100+ satisfied clients</h3>
            <p className="mt-4 text-slate-700 dark:text-neutral-200 leading-7">
              Start your transformation today with a team that delivers secure, scalable web solutions and measurable business results.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <NavLink to="/contact" className="inline-flex min-w-[180px] items-center justify-center rounded-3xl bg-brandBlue px-8 py-4 text-sm font-semibold text-white transition hover:bg-blue-700">
              Start Your Project Today
            </NavLink>
            <NavLink to="/pricing" className="inline-flex min-w-[180px] items-center justify-center rounded-3xl border border-slate-300 dark:border-white/10 bg-white/60 dark:bg-white/5 px-8 py-4 text-sm font-semibold text-slate-900 dark:text-white transition hover:border-brandGold hover:bg-brandGold/10">
              View Pricing
            </NavLink>
          </div>
        </div>
      </div>

      {/* FAQ / Support */}
      <div className="relative z-10 mx-auto mt-12 max-w-2xl rounded-[2rem] border border-slate-200 dark:border-white/10 bg-white/80 dark:bg-slate-900/80 p-10 text-center shadow-2xl shadow-brandBlue/5 transition-colors duration-300">
        <h3 className="text-2xl font-bold text-slate-900 dark:text-white">Ready to get started?</h3>
        <p className="mt-3 text-slate-700 dark:text-neutral-300 leading-7">
          Have questions about our services? Let’s discuss your project requirements and craft the right solution.
        </p>
        <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:justify-center">
          <NavLink to="/contact" className="inline-flex items-center justify-center rounded-3xl bg-brandBlue px-6 py-3 text-sm font-semibold text-white transition hover:bg-blue-700">
            Contact Us
          </NavLink>
          <NavLink to="/pricing" className="inline-flex items-center justify-center rounded-3xl border border-brandBlue bg-transparent px-6 py-3 text-sm font-semibold text-brandBlue transition hover:bg-brandBlue/10">
            View Pricing
          </NavLink>
        </div>
      </div>
    </section>
  );
}
