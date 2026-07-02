import { Helmet } from 'react-helmet-async'
import { NavLink } from 'react-router-dom'
import { motion } from 'framer-motion'
import PricingCard from '../components/PricingCard'
import PageWrapper from '../components/PageWrapper'
import { services } from '../data/services'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, Pagination, Navigation, Keyboard } from 'swiper/modules'
import { ArrowRight } from 'lucide-react'
import { SALE_MODE } from '../data/pricingConfig'
import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/navigation'

const featuredApps = [
  {
    title: "EcoShop E-commerce",
    category: "Retail",
    img: "/images/ecommerce-app.jpg",
    desc: "A full-featured shopping app with real-time inventory and secure checkout."
  },
  {
    title: "FitTrack Pro",
    category: "Health & Fitness",
    img: "/images/fitness-app.jpg",
    desc: "Personalized workout plans and health monitoring with wearable integration."
  },
  {
    title: "QuickFood Delivery",
    category: "On-Demand",
    img: "/images/food-delivery.jpg",
    desc: "Seamless food ordering and real-time delivery tracking for urban areas."
  },
  {
    title: "SecurePay Finance",
    category: "Fintech",
    img: "/images/finance-app.jpg",
    desc: "Secure mobile banking and investment management with biometric auth."
  }
];

const mobileAppStats = [
  { num: '150+', label: 'Apps Launched' },
  { num: '99%', label: 'App Store Approval' },
  { num: '6w', label: 'Avg MVP Time' },
  { num: '50+', label: 'Mobile Tech Stack' }
];

const designProcessSteps = [
  { num: '01', title: 'Discovery', desc: 'Market research & app concept', icon: '🔍' },
  { num: '02', title: 'UI/UX Design', desc: 'Native iOS/Android designs', icon: '🎨' },
  { num: '03', title: 'Development', desc: 'React Native or Native code', icon: '⚙️' },
  { num: '04', title: 'Testing & Launch', desc: 'App stores & post-launch support', icon: '🚀' }
];

const mobileAppPortfolioImages = [
  '/images/ecommerce-app.jpg',
  '/images/fitness-app.jpg',
  '/images/food-delivery.jpg',
  '/images/chat-app.jpg',
  '/images/finance-app.jpg',
  '/images/on-demand.jpg'
];

const mobileTechStack = [
  { name: 'React Native', icon: '⚛️' },
  { name: 'Flutter', icon: '🦋' },
  { name: 'Swift', icon: '🍎' },
  { name: 'Kotlin', icon: '🤖' },
  { name: 'Firebase', icon: '🔥' },
  { name: 'App Stores', icon: '📱' }
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
  },
};

export default function MobileApp() {
  const mobileServices = services.filter(s => s.category === 'Mobile App Development');
  
  // Ensure pricingPackages is always an array
  const pricingPackages = [];
  // Use a more robust way to get pricing packages, ensuring we don't exceed available data
  const packagesToExtract = mobileServices.flatMap(service => service.pricing || []).slice(0, 12); // Get up to 12 packages

  packagesToExtract.forEach((pkg, index) => {
    // Only highlight one package, for example, the third one (index 2)
    pricingPackages.push({
      ...pkg,
      highlighted: index === 2
    });
  });

  const serviceGrid = mobileServices.slice(0,6).map(s => ({
    title: s.name,
    desc: s.desc,
    icon: s.icon
  }));
  return (
    <PageWrapper>
      <section className="relative overflow-hidden section space-y-12 bg-gradient-to-br from-emerald-50 via-slate-50 to-teal-50 dark:from-emerald-900 dark:via-blue-900 dark:to-emerald-900 container-wide transition-colors duration-300 selection:bg-brandBlue/30">
        {/* SEO */}
        <Helmet>
          <title>Mobile App Development | React Native, Native iOS/Android | IFYWIGATECHZ</title>
          <meta name="description" content="Custom mobile apps for Android/iOS. Cross-platform React Native, native development, e-commerce, on-demand apps with store deployment." />
          <meta property="og:title" content="Mobile App Development - React Native & Native" />
          <meta property="og:description" content="Launch your app on App Store & Play Store" />
          <meta property="og:image" content="/courses/react-native.jpg" />
        </Helmet>

        {/* SEO */}
        <Helmet>
          <title>Mobile App Development Services | IFYWIGATECHZ</title>
          <meta
            name="description"
            content="Custom mobile app development services for Android and iOS with high performance, scalability, and modern UI."
          />
        </Helmet>

        {/* HERO */}
        <motion.div
          className="text-center space-y-4"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 dark:text-white">Mobile App Development 🚀</h1>
          <p className="max-w-2xl mx-auto text-slate-600 dark:text-neutral-300 text-lg">We build fast, scalable, and user-friendly mobile applications tailored to your business goals.</p>
        </motion.div>

        {/* Stats */}
        <motion.div
          className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {mobileAppStats.map((stat, i) => (
            <motion.div key={i} variants={itemVariants} className="card p-6 bg-white/60 dark:bg-white/10 backdrop-blur-sm border border-slate-200 dark:border-white/10 shadow-sm dark:shadow-none transition-colors duration-300">
              <div className="text-3xl font-black text-brandBlue dark:text-brandGold">{stat.num}</div>
              <div className="text-slate-700 dark:text-neutral-200 mt-2 font-medium">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>

        {/* Design Process */}
        <div className="max-w-6xl mx-auto py-20">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-black text-slate-900 dark:text-white mb-4">Mobile App Development Process</h2>
            <p className="text-xl text-slate-600 dark:text-neutral-300 max-w-2xl mx-auto">From concept to app stores in record time.</p>
          </motion.div>
          <motion.div
            className="grid-responsive md:grid-cols-2 lg:grid-cols-4"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {designProcessSteps.map(({ num, title, desc, icon }, i) => (
              <motion.div key={i} variants={itemVariants} className="group card p-8 bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 shadow-sm dark:shadow-none hover:bg-emerald-50 dark:hover:bg-white/10 transition-all hover:scale-105">
                <div className="text-3xl mb-4">{icon}</div>
                <div className="text-2xl font-bold text-emerald-600 dark:text-emerald-400 mb-2">{num}</div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-4 group-hover:text-emerald-600 dark:group-hover:text-emerald-400">{title}</h3>
                <p className="text-slate-600 dark:text-neutral-300">{desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Our Services */}
        <div className="max-w-7xl mx-auto py-20">
          <motion.div
            className="text-center mb-20"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-black bg-gradient-to-r from-emerald-600 to-teal-600 dark:from-emerald-400 dark:to-teal-400 bg-clip-text text-transparent mb-6">Mobile App Services</h2>
            <p className="text-xl text-slate-600 dark:text-neutral-300 max-w-3xl mx-auto">Native & cross-platform solutions for all platforms.</p>
          </motion.div>
          <motion.div
            className="grid-responsive md:grid-cols-2 lg:grid-cols-3"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {serviceGrid.map(({ title, desc, icon }, i) => (
              <motion.div key={i} variants={itemVariants} className="group card p-8 h-full bg-white dark:bg-white/5 hover:bg-emerald-50 dark:hover:bg-gradient-to-br dark:from-emerald-500/10 border border-slate-200 dark:border-white/10 hover:border-emerald-300 dark:hover:border-emerald-400/50 transition-all duration-500 cursor-pointer shadow-sm dark:shadow-none hover:shadow-xl dark:hover:shadow-2xl">
                <div className="text-4xl mb-6">{icon}</div>
                <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-4 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition">{title}</h3>
                <p className="text-slate-600 dark:text-neutral-300 leading-relaxed mb-6">{desc}</p>
                <NavLink to={`/services/${title.toLowerCase().replace(/ & /g, '-').replace(/[^a-z0-9]/g, '-')}`} className="text-emerald-600 dark:text-emerald-400 font-semibold hover:text-emerald-700 dark:hover:text-emerald-300 transition flex items-center gap-2 group-hover:translate-x-2">
                  Learn More →
                </NavLink>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* PRICING */}
        <div className="max-w-7xl mx-auto py-20">
          <motion.div
            className="space-y-6"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold text-center text-slate-900 dark:text-white">Mobile App Pricing</h2>
            <p className="text-center text-slate-600 dark:text-neutral-400 max-w-xl mx-auto">Flexible pricing plans for startups and businesses.</p>
          </motion.div>
          <motion.div
            className="grid-responsive md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {pricingPackages.map((pkg, i) => (
              <motion.div key={`${pkg.name}-${pkg.price}-${i}`} variants={itemVariants}>
                <PricingCard
                  title={pkg.name} // Corrected: pkg.name is the title
                  price={pkg.price} // pkg.price is now the number (current price)
                  duration="project"
                  features={pkg.features}
                  highlighted={pkg.highlighted}
                  originalPrice={pkg.originalPrice} // Pass the original price
                />
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Featured Apps Slider */}
        <div className="py-20 max-w-7xl mx-auto px-4">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-black text-slate-900 dark:text-white mb-4">Featured Mobile Solutions</h2>
            <p className="text-xl text-slate-600 dark:text-neutral-300 max-w-2xl mx-auto">High-performance apps we've built for industry leaders.</p>
          </motion.div>

          <Swiper
            modules={[Autoplay, Pagination, Navigation, Keyboard]}
            spaceBetween={30}
            slidesPerView={1}
            breakpoints={{
              640: { slidesPerView: 2 },
              1024: { slidesPerView: 3 },
            }}
            autoplay={{ delay: 5000, disableOnInteraction: false }}
            pagination={{ clickable: true }}
            navigation
            keyboard={{ enabled: true }}
            className="pb-12"
          >
            {featuredApps.map((app, i) => (
              <SwiperSlide key={i}>
                <motion.div 
                  className="bg-white dark:bg-slate-900 rounded-3xl overflow-hidden border border-slate-200 dark:border-white/10 shadow-lg h-full flex flex-col"
                  whileHover={{ y: -5 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="relative h-64 overflow-hidden">
                    <img src={app.img} alt={app.title} className="w-full h-full object-cover" />
                    <div className="absolute top-4 left-4">
                      <span className="bg-brandBlue text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                        {app.category}
                      </span>
                    </div>
                  </div>
                  <div className="p-6 flex flex-col flex-grow">
                    <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">{app.title}</h3>
                    <p className="text-slate-600 dark:text-neutral-400 mb-6 flex-grow">{app.desc}</p>
                    <button className="text-brandBlue font-bold flex items-center gap-2 hover:gap-3 transition-all">
                      View Case Study <ArrowRight size={18} />
                    </button>
                  </div>
                </motion.div>
              </SwiperSlide>
            ))}
          </Swiper>
          
          <style>{`
            .swiper-button-next, .swiper-button-prev {
              color: #3b82f6;
              transform: scale(0.7);
            }
            .swiper-pagination-bullet-active {
              background: #3b82f6;
            }
          `}</style>
        </div>

        {/* Portfolio */}
        <div className="py-24 bg-white/60 dark:bg-white/5 backdrop-blur-sm transition-colors duration-300">
          <div className="max-w-7xl mx-auto">
            <motion.div
              className="text-center mb-20"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white mb-6">App Portfolio</h2>
              <p className="text-xl text-slate-600 dark:text-neutral-300 max-w-2xl mx-auto">Live apps on App Store & Play Store</p>
            </motion.div>
            <motion.div
              className="grid-responsive md:grid-cols-2 lg:grid-cols-3"
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              {mobileAppPortfolioImages.map((img, i) => (
                <motion.div key={i} variants={itemVariants} className="group relative overflow-hidden rounded-2xl shadow-2xl hover:scale-105 transition-all duration-500 cursor-pointer">
                  <img src={img} alt="App mockup" className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-700" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition flex items-end p-6">
                    <div>
                      <h3 className="text-white font-bold text-xl mb-1">Food Delivery App</h3>
                      <p className="text-emerald-400 text-sm">React Native - Live on Stores</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>

        {/* Tools */}
        <div className="py-20">
          <div className="max-w-6xl mx-auto">
            <motion.h2
              className="text-4xl font-black text-center mb-16 bg-gradient-to-r from-emerald-600 to-teal-600 dark:from-emerald-400 dark:to-teal-400 bg-clip-text text-transparent"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              Mobile Tech Stack
            </motion.h2>
            <motion.div
              className="grid-responsive md:grid-cols-3 lg:grid-cols-6"
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              {mobileTechStack.map(({ name, icon }, i) => (
                <motion.div key={i} variants={itemVariants} className="text-center p-8 bg-white dark:bg-transparent border border-slate-200 dark:border-transparent rounded-2xl hover:bg-slate-50 dark:hover:bg-white/10 transition group shadow-sm dark:shadow-none">
                  <div className="text-5xl mb-4">{icon}</div>
                  <h3 className="font-bold text-slate-900 dark:text-white group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition">{name}</h3>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>

        {/* CTA */}
        <motion.div
          className="text-center space-y-2 py-12 px-6 bg-gradient-to-r from-emerald-600 to-teal-600 dark:from-emerald-800 dark:to-teal-800 rounded-2xl mx-2 -mb-20 shadow-xl transition-colors duration-300"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-5xl font-black text-white mb-6">Ready for App Store Success?</h2>
          <p className="text-xl text-neutral-200 mb-12 max-w-2xl mx-auto">From prototype to 5-star ratings. We've got you covered.</p>
          <div className="flex-responsive justify-center">
            <NavLink to="/startproject" className="px-12 py-4 bg-white text-black font-black text-lg rounded-2xl shadow-2xl hover:shadow-emerald/50 hover:scale-105 transition-all">
              Launch My App
            </NavLink>
            <NavLink to="/pricing" className="px-12 py-4 border-2 border-white text-white font-bold text-lg rounded-2xl hover:bg-white hover:text-emerald-600 transition-all">
              View Pricing
            </NavLink>
          </div>
        </motion.div>
      </section>
    </PageWrapper>
  )
}
