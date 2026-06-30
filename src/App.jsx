import { Outlet, useLocation } from 'react-router-dom'
import "highlight.js/styles/github-dark.css";
import { useState, Suspense, useEffect } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Helmet } from 'react-helmet-async'
import Navbar from './components/Navbar'
import { trackEvent, trackPageView } from './utils/analytics'
import ChatifyWidget from "./components/ChatifyWidget"
import Footer from "./components/Footer"
import MobileMenu from "./components/MobileMenu"

const PageLoader = () => (
  <div className="w-full h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-900 transition-colors duration-300">
    <div className="w-16 h-16 border-4 border-brandBlue border-t-transparent rounded-full animate-spin"></div>
  </div>
);

export default function App() {
  const location = useLocation();
  const [open, setOpen] = useState(false) // control mobile menu

  // Scroll to top on route change for smooth production UX
  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "instant"
    });

    // Manually track page view on every route change
    trackPageView();
  }, [location.pathname]);

  return (
    <>
      <Helmet>
        {/* Security Headers */}
        <meta httpEquiv="Content-Security-Policy" content="default-src 'self'; script-src 'self' 'unsafe-inline' https://js.paystack.co; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com; img-src 'self' data: https: http:; connect-src 'self' https: wss:; frame-src 'self' https://checkout.paystack.com;" />
        <meta httpEquiv="X-Content-Type-Options" content="nosniff" />
        <meta httpEquiv="Referrer-Policy" content="strict-origin-when-cross-origin" />
        <meta httpEquiv="Permissions-Policy" content="camera=(), microphone=(), geolocation=(self)" />
      </Helmet>

      <Navbar open={open} setOpen={setOpen} />

      {/* ✅ Mobile Menu (NOW INSIDE COMPONENT) */}
      <AnimatePresence>
        {open && <MobileMenu open={open} setOpen={setOpen} />}
      </AnimatePresence>

      <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-neutral-900 dark:text-neutral-100 transition-colors duration-300">
        
        <ChatifyWidget />


        {/* ✅ Animate Pages Properly */}
        
        <AnimatePresence mode="wait">
          <motion.div
            key={location.pathname}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
          >
            <main>
              <Suspense fallback={<PageLoader />}>
                <Outlet />
              </Suspense>
            </main>
          </motion.div>
        </AnimatePresence>

        {/* WhatsApp Button */}
        <a
          href="https://wa.me/2348113722088"
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => trackEvent('WhatsApp Click', { location: 'Floating Global Button' })}
          aria-label="Chat with us on WhatsApp"
          className="fixed bottom-24 right-4 sm:right-6 z-50 flex items-center justify-center
                     w-14 h-14 bg-green-500 rounded-full shadow-lg
                     hover:bg-green-600 transition animate-bounce"
        >
          <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="currentColor" viewBox="0 0 24 24">
                      <path fillRule="evenodd" d="M12 4a8 8 0 0 0-6.895 12.06l.569.718-.697 2.359 2.32-.648.379.243A8 8 0 1 0 12 4ZM2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10a9.96 9.96 0 0 1-5.016-1.347l-4.948 1.382 1.426-4.829-.006-.007-.033-.055A9.958 9.958 0 0 1 2 12Z" clipRule="evenodd"/>
                      <path fill="currentColor" d="M16.735 13.492c-.038-.018-1.497-.736-1.756-.83a1.008 1.008 0 0 0-.34-.075c-.196 0-.362.098-.49.291-.146.217-.587.732-.723.886-.018.02-.042.045-.057.045-.013 0-.239-.093-.307-.123-1.564-.68-2.751-2.313-2.914-2.589-.023-.04-.024-.057-.024-.057.005-.021.058-.074.085-.101.08-.079.166-.182.249-.283l.117-.14c.121-.14.175-.25.237-.375l.033-.066a.68.68 0 0 0-.02-.64c-.034-.069-.65-1.555-.715-1.711-.158-.377-.366-.552-.655-.552-.027 0 0 0-.112.005-.137.005-.883.104-1.213.311-.35.22-.94.924-.94 2.16 0 1.112.705 2.162 1.008 2.561l.041.06c1.161 1.695 2.608 2.951 4.074 3.537 1.412.564 2.081.63 2.461.63.16 0 .288-.013.4-.024l.072-.007c.488-.043 1.56-.599 1.804-1.276.192-.534.243-1.117.115-1.329-.088-.144-.239-.216-.43-.308Z"/>
                    </svg>
        </a>

        <Footer />
      </div>
    </>
  )
}
