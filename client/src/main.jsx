import React, { Suspense, lazy } from 'react'
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { HelmetProvider } from 'react-helmet-async'
import './index.css'
import * as Sentry from '@sentry/react';

// Initialize Sentry for error tracking
Sentry.init({
  dsn: import.meta.env.VITE_SENTRY_DSN,
  integrations: [
    Sentry.browserTracingIntegration(),
    Sentry.replayIntegration(),
  ],
  // Performance Monitoring & Session Replay (Optimized for Production)
  tracesSampleRate: import.meta.env.PROD ? 0.1 : 1.0, // Capture 10% in Prod, 100% in Dev
  replaysSessionSampleRate: import.meta.env.PROD ? 0.05 : 0.1, // Sample 5% of normal sessions in Prod
  replaysOnErrorSampleRate: import.meta.env.PROD ? 0.5 : 1.0, // Sample 50% of crash replays in Prod
});

// Pages
const Home = lazy(() => import('./pages/Home.jsx'))
const About = lazy(() => import('./pages/About.jsx'))
const Projects = lazy(() => import('./pages/Projects.jsx'))
const Hireme = lazy(() => import('./pages/Hireme.jsx'))
const Services = lazy(() => import('./pages/Services.jsx'))
const ServiceDetails = lazy(() => import('./pages/ServiceDetails.jsx'))
const Blog = lazy(() => import('./pages/Blog.jsx'))
const BlogPost = lazy(() => import('./pages/BlogPost.jsx'))
const SubmitPost = lazy(() => import('./pages/SubmitPost.jsx'))
const Learn = lazy(() => import('./pages/Learn.jsx'))
const CourseDetails = lazy(() => import('./pages/CourseDetails.jsx'))
const CoursePlayer = lazy(() => import('./pages/CoursePlayer.jsx'))
const Enroll = lazy(() => import('./pages/Enroll.jsx'))
const Resume = lazy(() => import('./pages/Resume.jsx'))
const Contact = lazy(() => import('./pages/Contact.jsx'))
const Testimonials = lazy(() => import('./pages/Testimonials.jsx'))
const Pricing = lazy(() => import('./pages/Pricing.jsx'))
const PricingDetail = lazy(() => import('./pages/PricingDetail.jsx'))
const Privacy = lazy(() => import('./pages/Privacy.jsx'))
const Terms = lazy(() => import('./pages/Terms.jsx'))
const RealEstate = lazy(() => import('./pages/RealEstate.jsx'))
const RealEstateDetails = lazy(() => import('./pages/RealEstateDetails.jsx'))
const PostProperty = lazy(() => import('./pages/PostProperty.jsx'))
const Webdev = lazy(() => import('./pages/Webdev.jsx'))
const Uiux = lazy(() => import('./pages/Uiux.jsx'))
const CaseStudies = lazy(() => import('./pages/CaseStudies.jsx'))
const CaseStudyDetail = lazy(() => import('./pages/CaseStudyDetail.jsx'))
const HowItWorks = lazy(() => import('./pages/HowItWorks.jsx'))
const FAQ = lazy(() => import('./pages/FAQ.jsx'))
const RequestQuote = lazy(() => import('./pages/RequestQuote.jsx'))
const Industries = lazy(() => import('./pages/Industries.jsx'))
const Cart = lazy(() => import('./pages/Cart.jsx'))
const Checkout = lazy(() => import('./pages/Checkout.jsx'))
const PaymentSuccess = lazy(() => import('./pages/PaymentSuccess.jsx'))
const MobileApp = lazy(() => import('./pages/MobileApp.jsx'))
const StartProject = lazy(() => import('./pages/StartProject.jsx'))
const EcommercePage = lazy(() => import('./pages/EcommercePage.jsx'))
const CostCalculator = lazy(() => import('./pages/CostCalculator.jsx'))
const ClientPortal = lazy(() => import('./pages/ClientPortal.jsx'))
const Solutions = lazy(() => import('./pages/Solutions.jsx'))
const GenericPage = lazy(() => import('./pages/GenericPage.jsx'))
const Search = lazy(() => import('./pages/Search.jsx'))

// Learning Modules
const Ppmvs = lazy(() => import('./pages/Ppmvs.jsx'))
const PpmvsModule = lazy(() => import('./pages/PpmvsModule.jsx'))
const PpmvsQuiz = lazy(() => import('./pages/PpmvsQuiz.jsx'))
const IT = lazy(() => import('./pages/IT.jsx'))
const ITModule = lazy(() => import('./pages/ITModule.jsx'))
const MicroSoft = lazy(() => import('./pages/MicroSoft.jsx'))
const MicrosoftModule = lazy(() => import('./pages/MicrosoftModule.jsx'))
const Graphic = lazy(() => import('./pages/Graphic.jsx'))
const GraphicModule = lazy(() => import('./pages/GraphicModule.jsx'))
const AI = lazy(() => import('./pages/AI.jsx'))
const AiModule = lazy(() => import('./pages/AiModule.jsx'))
const Cybersecurity = lazy(() => import('./pages/Cybersecurity.jsx'))
const CybersecurityModule = lazy(() => import('./pages/CybersecurityModule.jsx'))
const DataAnalytics = lazy(() => import('./pages/DataAnalytics.jsx'))
const DataAnalyticsModule = lazy(() => import('./pages/DataAnalyticsModule.jsx'))
const Web3 = lazy(() => import('./pages/Web3.jsx'))
const Web3Module = lazy(() => import('./pages/Web3Module.jsx'))
import ProtectedCourseRoute from './components/ProtectedCourseRoute.jsx'
import ProtectedRoute from './components/ProtectedRoute.jsx'

// Auth & User Account
const LoginPage = lazy(() => import('./pages/LoginPage.jsx'))
const ForgotPassword = lazy(() => import('./pages/ForgotPassword.jsx'))
const Dashboard = lazy(() => import('./pages/Dashboard.jsx'))
const ProductDetails = lazy(() => import('./pages/ProductDetails.jsx'))
const AccountSettings = lazy(() => import('./pages/AccountSettings.jsx'))
const Wishlist = lazy(() => import('./pages/Wishlist.jsx'))
const OrderHistory = lazy(() => import('./pages/OrderHistory.jsx'))

// Admin
const AdminDashboard = lazy(() => import('./pages/AdminDashboard.jsx'))

// Affiliate
const AffiliateProgram = lazy(() => import('./pages/AffiliateProgram.jsx'))
const AffiliateSignup = lazy(() => import('./pages/AffiliateSignup.jsx'))
const AffiliateLogin = lazy(() => import('./pages/AffiliateLogin.jsx'))
const AffiliateDashboard = lazy(() => import('./pages/AffiliateDashboard.jsx'))

// New Pages
const NotFound = lazy(() => import('./pages/NotFound.jsx'))
const Careers = lazy(() => import('./pages/Careers.jsx'))
const TeamPage = lazy(() => import('./pages/TeamPage.jsx'))
const TeamProfile = lazy(() => import('./pages/TeamProfile.jsx'))
const GalleryPage = lazy(() => import('./pages/GalleryPage.jsx'))
const FreeResources = lazy(() => import('./pages/FreeResources.jsx'))
const ResourceDownloadPage = lazy(() => import('./pages/ResourceDownloadPage.jsx'))
const CertificateVerify = lazy(() => import('./pages/CertificateVerify.jsx'))
const RefundPolicy = lazy(() => import('./pages/RefundPolicy.jsx'))
const SuccessStories = lazy(() => import('./pages/SuccessStories.jsx'))
const CorporateTraining = lazy(() => import('./pages/CorporateTraining.jsx'))
const EventsWebinars = lazy(() => import('./pages/EventsWebinars.jsx'))
const HelpCenter = lazy(() => import('./pages/HelpCenter.jsx'))
import ErrorPage from './pages/ErrorPage.jsx'

// Context
import RootLayout from './components/RootLayout.jsx'
import { ThemeProvider } from './context/ThemeContext.jsx'
import { useEffect } from 'react';

// Plausible Analytics Integration (Moved from index.html)
const PlausibleAnalytics = () => {
  useEffect(() => {
    // Define the plausible function queue for custom event tracking
    window.plausible = window.plausible || function() { (window.plausible.q = window.plausible.q || []).push(arguments); };

    if (import.meta.env.VITE_PLAUSIBLE_DOMAIN) {
      const plausibleScript = document.createElement('script');
      plausibleScript.defer = true;
      plausibleScript.dataset.domain = import.meta.env.VITE_PLAUSIBLE_DOMAIN;
      plausibleScript.src = 'https://plausible.io/js/script.manual.js';
      document.head.appendChild(plausibleScript);
    }
  }, []);
  return null; // This component doesn't render anything
};

// Import globally configured Axios
import './axios.js';

/** -----------------------------
 * Route Definitions
 * ----------------------------- */

// Helper arrays for DRY routes
const genericPageRoutes = [
  // Services
  "/enterprise", "/startup-packages", "/api-development", "/cloud-solutions", "/security-audit",
  // Learn
  "/bootcamps", "/workshops", "/certifications", "/mentoring", "/upskilling",
  // Company
  "/partners", "/press", "/awards", "/manifesto", "/community",
  // Resources
  "/knowledge-base", "/tools", "/templates", "/podcast", "/newsletter"
].map(path => ({ path, element: <GenericPage /> }));

const protectedCourseRoutes = [
  { path: "/it/module/:moduleId", course: "it", element: <ITModule /> },
  { path: "/microsoft/module/:moduleId", course: "microsoft", element: <MicrosoftModule /> },
  { path: "/graphic/module/:moduleId", course: "graphic", element: <GraphicModule /> },
  { path: "/ai/module/:moduleId", course: "ai", element: <AiModule /> },
  { path: "/cybersecurity/module/:moduleId", course: "cybersecurity", element: <CybersecurityModule /> },
  { path: "/data-analytics/module/:moduleId", course: "dataAnalytics", element: <DataAnalyticsModule /> },
  { path: "/web3/module/:moduleId", course: "web3", element: <Web3Module /> },
].map(({ path, course, element }) => ({
  path,
  element: <ProtectedCourseRoute course={course}>{element}</ProtectedCourseRoute>
}));


/** -----------------------------
 * Router Configuration
 * ----------------------------- */
const router = createBrowserRouter([
  {
    element: <RootLayout />,
    errorElement: <ErrorPage />, // ✅ Set a top-level error boundary
    children: [
      { path: "/", element: <Home /> },
      
      // Static Pages
      { path: "/about", element: <About /> },
      { path: "/projects", element: <Projects /> },
      { path: "/resume", element: <Resume /> },
      { path: "/contact", element: <Contact /> },
      { path: "/testimonials", element: <Testimonials /> },
      { path: "/how-it-works", element: <HowItWorks /> },
      { path: "/faq", element: <FAQ /> },
      { path: "/requestquote", element: <RequestQuote /> },
      { path: "/industries", element: <Industries /> },
      { path: "/mobile-app", element: <MobileApp /> },
      { path: "/start-project", element: <StartProject /> },
      { path: "/ecommerce", element: <EcommercePage /> },
      { path: "/cost-calculator", element: <CostCalculator /> },
      { path: "/client-portal", element: <ClientPortal /> },
      { path: "/solutions", element: <Solutions /> },
      { path: "/hireme", element: <Hireme /> },
      { path: "/web-dev", element: <Webdev /> },
      { path: "/ui-ux", element: <Uiux /> },

      // Legal
      { path: "/privacy", element: <Privacy /> },
      { path: "/terms", element: <Terms /> },
      { path: "/refund-policy", element: <RefundPolicy /> },

      // Services
      { path: "/services", element: <Services /> },
      { path: "/services/:slug", element: <ServiceDetails /> },

      // Blog
      { path: "/blog", element: <Blog /> },
      { path: "/blog/:slug", element: <BlogPost /> },
      { path: "/blog/submit", element: <SubmitPost /> },

      // Learning / Courses
      { path: "/learn", element: <Learn /> },
      { path: "/learn/:id", element: <CoursePlayer /> },
      { path: "/courses/:id", element: <CourseDetails /> },
      { path: "/enroll", element: <Enroll /> },
      { path: "/ppmvs", element: <Ppmvs /> },
      { path: "/ppmvs/module/:moduleId", element: <PpmvsModule /> },
      { path: "/ppmvs/quiz", element: <PpmvsQuiz /> },
      { path: "/it", element: <IT /> },
      { path: "/microsoft", element: <MicroSoft /> },
      { path: "/graphic", element: <Graphic /> },
      { path: "/ai", element: <AI /> },
      { path: "/cybersecurity", element: <Cybersecurity /> },
      { path: "/data-analytics", element: <DataAnalytics /> },
      { path: "/web3", element: <Web3 /> },
      { path: "/corporate-training", element: <CorporateTraining /> },
      { path: "/events", element: <EventsWebinars /> },
    
      // Protected Course Module Routes
      ...protectedCourseRoutes,

      // Pricing
      { path: "/pricing", element: <Pricing /> },
      { path: "/pricing/:planId", element: <PricingDetail /> },

      // Real Estate
      { path: "/real-estate", element: <RealEstate /> },
      { path: "/real-estate/:id", element: <RealEstateDetails /> }, // Note: This uses :id, not :slug
      { path: "/post-property", element: <PostProperty /> },

      // Case Studies
      { path: "/case-studies", element: <CaseStudies /> },
      { path: "/case-studies/:slug", element: <CaseStudyDetail /> },

      // E-commerce & User Account
      { path: "/cart", element: <Cart /> },
      { path: "/checkout", element: <Checkout /> },
      { path: "/payment-success", element: <PaymentSuccess /> },
      { path: "/products/:id", element: <ProductDetails /> },
      { path: "/dashboard", element: <ProtectedRoute><Dashboard /></ProtectedRoute> },
      { path: "/account-settings", element: <ProtectedRoute><AccountSettings /></ProtectedRoute> },
      { path: "/wishlist", element: <ProtectedRoute><Wishlist /></ProtectedRoute> },
      { path: "/order-history", element: <ProtectedRoute><OrderHistory /></ProtectedRoute> },
      { path: "/search", element: <Search /> },

      // Auth & Affiliate
      { path: "/login", element: <LoginPage /> },
      { path: "/forgot-password", element: <ForgotPassword /> },
      {
        path: "affiliate",
        children: [
          { path: "program", element: <AffiliateProgram /> },
          { path: "signup", element: <AffiliateSignup /> },
          { path: "login", element: <AffiliateLogin /> },
          { path: "dashboard", element: <ProtectedRoute><AffiliateDashboard /></ProtectedRoute> },
        ]
      },
      { path: "/admin-dashboard", element: <ProtectedRoute requireAdmin={true}><AdminDashboard /></ProtectedRoute> },

      // Company Pages
      { path: "/careers", element: <Careers /> },
      { path: "/team", element: <TeamPage /> },
      { path: "/team/:id", element: <TeamProfile /> },
      { path: "/gallery", element: <GalleryPage /> },
      { path: "/success-stories", element: <SuccessStories /> },

      // Resource Pages
      { path: "/free-resources", element: <FreeResources /> },
      { path: "/resources/:slug", element: <ResourceDownloadPage /> },
      { path: "/verify-certificate", element: <CertificateVerify /> },
      { path: "/help", element: <HelpCenter /> },

      // Refactored Generic Pages
      ...genericPageRoutes,

      // 404 Catch-
      { path: "*", element: <NotFound /> }
    ]
  }
])

/** -----------------------------
 * Render App.
 * ----------------------------- */
createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <HelmetProvider>
      <ThemeProvider>
        <PlausibleAnalytics /> {/* Add Plausible Analytics */}
        <RouterProvider router={router} />
      </ThemeProvider>
    </HelmetProvider>
  </React.StrictMode>
)
