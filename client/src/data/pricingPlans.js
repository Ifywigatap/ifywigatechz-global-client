import { COURSE as aiCourse, OUTCOMES as aiOutcomes } from './aiData.js';
import { COURSE as cyberCourse, OUTCOMES as cyberOutcomes } from './cybersecurityData.js';
import { COURSE as dataCourse, OUTCOMES as dataOutcomes } from './dataAnalyticsData.js';
import { COURSE as graphicCourse, OUTCOMES as graphicOutcomes } from './graphicData.js';
import { COURSE as itCourse, OUTCOMES as itOutcomes } from './itData.js';
import { COURSE as microsoftCourse, OUTCOMES as microsoftOutcomes } from './microsoftData.js';
import { COURSE as ppmvsCourse, OUTCOMES as ppmvsOutcomes } from './ppmvsData.js';
import { COURSE as web3Course, OUTCOMES as web3Outcomes } from './web3Data.js';
import { PRICING_CONFIG } from './pricingConfig.js';

export const pricingPlans = [
  // Core Web Solutions
  { 
    id: 'landing-page',
    name: "Landing Page", 
    monthly: PRICING_CONFIG.plans.landingPage.monthly, 
    yearly: PRICING_CONFIG.plans.landingPage.yearly, 
    lifetime: PRICING_CONFIG.plans.landingPage.lifetime,
    features: ["Single high-converting page", "Mobile optimized", "SEO optimized", "3 revisions", "1 month support"],
    category: 'core',
    popular: false
  },
  { 
    id: 'starter-website',
    name: "Starter Website", 
    monthly: PRICING_CONFIG.plans.starterWebsite.monthly, 
    yearly: PRICING_CONFIG.plans.starterWebsite.yearly, 
    lifetime: PRICING_CONFIG.plans.starterWebsite.lifetime,
    features: ["1–3 professional pages", "Responsive design for all devices", "Basic SEO setup", "Contact forms", "3 month support"],
    category: 'core',
    popular: false
  },
  { 
    id: 'business-website',
    name: "Business Website", 
    monthly: PRICING_CONFIG.plans.businessWebsite.monthly, 
    yearly: PRICING_CONFIG.plans.businessWebsite.yearly, 
    lifetime: PRICING_CONFIG.plans.businessWebsite.lifetime,
    features: ["5–8 data-driven pages", "Professional lead forms", "SEO optimization service", "Blog integration", "4 month priority support"],
    category: 'core',
    popular: true
  },
  { 
    id: 'professional-website',
    name: "Professional Website", 
    monthly: PRICING_CONFIG.plans.professionalWebsite.monthly, 
    yearly: PRICING_CONFIG.plans.professionalWebsite.yearly, 
    lifetime: PRICING_CONFIG.plans.professionalWebsite.lifetime,
    features: ["10+ content pages", "Blog platform included", "Analytics & tracking", "Performance optimization", "6 month support"],
    category: 'core',
    popular: false
  },
  { 
    id: 'ecommerce-store',
    name: "E-Commerce Store", 
    monthly: PRICING_CONFIG.plans.ecommerceStore.monthly, 
    yearly: PRICING_CONFIG.plans.ecommerceStore.yearly, 
    lifetime: PRICING_CONFIG.plans.ecommerceStore.lifetime,
    features: ["Full shopping cart system", "Admin dashboard", "Payment gateway setup", "Inventory management", "6 month full support"],
    category: 'core',
    popular: false
  },
  { 
    id: 'full-web-app',
    name: "Full Web Application", 
    monthly: "Custom", 
    yearly: "Custom", 
    lifetime: "Custom",
    features: ["Custom architecture", "Authentication system", "Database design", "Real-time features", "Ongoing support"],
    category: 'core',
    popular: false,
    custom: true
  },
  // Specialized Services
  { 
    id: 'lms-platform',
    name: "LMS Platform", 
    monthly: PRICING_CONFIG.plans.lmsPlatform.monthly, 
    yearly: PRICING_CONFIG.plans.lmsPlatform.yearly, 
    lifetime: PRICING_CONFIG.plans.lmsPlatform.lifetime,
    features: ["Course management system", "Student dashboard", "Progress tracking", "Certificate generation", "Payment integration"],
    category: 'specialized',
    popular: false
  },
  { 
    id: 'real-estate',
    name: "Real Estate Website", 
    monthly: PRICING_CONFIG.plans.realEstate.monthly, 
    yearly: PRICING_CONFIG.plans.realEstate.yearly, 
    lifetime: PRICING_CONFIG.plans.realEstate.lifetime,
    features: ["Property listings", "Agent dashboard", "Booking system", "Virtual tours support", "Lead management system"],
    category: 'specialized',
    popular: false
  },
  { 
    id: 'api-development',
    name: "API Development", 
    monthly: PRICING_CONFIG.plans.apiDevelopment.monthly, 
    yearly: PRICING_CONFIG.plans.apiDevelopment.yearly, 
    lifetime: PRICING_CONFIG.plans.apiDevelopment.lifetime,
    features: ["RESTful API design", "Payment gateway integration", "Third-party integrations", "Documentation", "1 year support"],
    category: 'specialized',
    popular: false
  },
  { 
    id: 'maintenance',
    name: "Monthly Maintenance", 
    monthly: PRICING_CONFIG.plans.maintenance.monthly, 
    yearly: PRICING_CONFIG.plans.maintenance.yearly, 
    lifetime: PRICING_CONFIG.plans.maintenance.lifetime,
    features: ["Weekly updates & patches", "Security monitoring", "Performance optimization", "Monthly reports", "Priority support"],
    category: 'specialized',
    popular: false
  },
  // New pricing plans added
  { 
    id: 'mobile-app',
    name: "Mobile App Development", 
    monthly: PRICING_CONFIG.plans.mobileApp.monthly, 
    yearly: PRICING_CONFIG.plans.mobileApp.yearly, 
    lifetime: PRICING_CONFIG.plans.mobileApp.lifetime,
    features: ["Cross-platform React Native app", "Push notifications", "User authentication", "App store deployment", "3 month support"],
    category: 'specialized',
    popular: false
  },
  { 
    id: 'uiux-design',
    name: "UI/UX Design Package", 
    monthly: PRICING_CONFIG.plans.uiuxDesign.monthly, 
    yearly: PRICING_CONFIG.plans.uiuxDesign.yearly, 
    lifetime: PRICING_CONFIG.plans.uiuxDesign.lifetime,
    features: ["Complete design system", "Wireframes & prototypes", "User research", "Design handover files", "2 month revisions"],
    category: 'specialized',
    popular: true
  },
  { 
    id: 'digital-marketing',
    name: "Digital Marketing Setup", 
    monthly: PRICING_CONFIG.plans.digitalMarketing.monthly, 
    yearly: PRICING_CONFIG.plans.digitalMarketing.yearly, 
    lifetime: PRICING_CONFIG.plans.digitalMarketing.lifetime,
    features: ["Google/FB ads setup", "SEO technical audit", "Email marketing flows", "Analytics dashboard", "Monthly reporting"],
    category: 'specialized',
    popular: false
  },
  { 
    id: 'enterprise',
    name: "Enterprise Solution", 
    monthly: PRICING_CONFIG.plans.enterprise.monthly, 
    yearly: PRICING_CONFIG.plans.enterprise.yearly, 
    lifetime: PRICING_CONFIG.plans.enterprise.lifetime,
    features: ["Scalable architecture", "Multi-tenant support", "Advanced security", "API & integrations", "12 month enterprise support"],
    category: 'core',
    popular: true
  },
  { 
    id: 'support-pro',
    name: "Annual Support Pro", 
    monthly: PRICING_CONFIG.plans.supportPro.monthly, 
    yearly: PRICING_CONFIG.plans.supportPro.yearly, 
    lifetime: PRICING_CONFIG.plans.supportPro.lifetime,
    features: ["Daily backups", "Security audits", "Performance tuning", "Feature updates", "24/7 priority support"],
    category: 'specialized',
    popular: false
  },
  { 
    id: 'ai-integration',
    name: "Custom AI Integration", 
    monthly: "Custom", 
    yearly: "Custom", 
    lifetime: "Custom",
    features: ["AI chatbot implementation", "Custom ML models", "Workflow automation", "Data pipeline setup", "Ongoing optimization"],
    category: 'specialized',
    popular: false,
    custom: true
  },
  // Academy Courses
  { 
    id: aiCourse.id,
    name: aiCourse.title, 
    monthly: "N/A", 
    yearly: "N/A", 
    lifetime: { original: aiCourse.price, current: PRICING_CONFIG.academy.ai.current },
    features: aiOutcomes.slice(0, 4),
    category: 'academy',
    popular: true,
    link: '/ai'
  },
  { 
    id: microsoftCourse.id,
    name: microsoftCourse.title, 
    monthly: "N/A", 
    yearly: "N/A", 
    lifetime: { original: microsoftCourse.price, current: PRICING_CONFIG.academy.microsoft.current },
    features: microsoftOutcomes.slice(0, 4),
    category: 'academy',
    popular: false,
    link: '/microsoft'
  },
  { 
    id: cyberCourse.id,
    name: cyberCourse.title, 
    monthly: "N/A", 
    yearly: "N/A", 
    lifetime: { original: cyberCourse.price, current: PRICING_CONFIG.academy.cyber.current },
    features: cyberOutcomes.slice(0, 4),
    category: 'academy',
    popular: true,
    link: '/cybersecurity'
  },
  { 
    id: dataCourse.id,
    name: dataCourse.title, 
    monthly: "N/A", 
    yearly: "N/A", 
    lifetime: { original: dataCourse.price, current: PRICING_CONFIG.academy.dataAnalytics.current },
    features: dataOutcomes.slice(0, 4),
    category: 'academy',
    popular: false,
    link: '/data-analytics'
  },
  { 
    id: graphicCourse.id,
    name: graphicCourse.title, 
    monthly: "N/A", 
    yearly: "N/A", 
    lifetime: { original: graphicCourse.price, current: PRICING_CONFIG.academy.graphic.current },
    features: graphicOutcomes.slice(0, 4),
    category: 'academy',
    popular: false,
    link: '/graphic'
  },
  { 
    id: itCourse.id,
    name: itCourse.title, 
    monthly: "N/A", 
    yearly: "N/A", 
    lifetime: { original: itCourse.price, current: PRICING_CONFIG.academy.it.current },
    features: itOutcomes.slice(0, 4),
    category: 'academy',
    popular: false,
    link: '/it'
  },
  { 
    id: ppmvsCourse.id,
    name: ppmvsCourse.title, 
    monthly: "N/A", 
    yearly: "N/A", 
    lifetime: { original: ppmvsCourse.price, current: PRICING_CONFIG.academy.ppmvs.current },
    features: ppmvsOutcomes.slice(0, 4),
    category: 'academy',
    popular: false,
    link: '/ppmvs'
  },
  { 
    id: web3Course.id,
    name: web3Course.title, 
    monthly: "N/A", 
    yearly: "N/A", 
    lifetime: { original: web3Course.price, current: PRICING_CONFIG.academy.web3.current },
    features: web3Outcomes.slice(0, 4),
    category: 'academy',
    popular: false,
    link: '/web3'
  },
];

// Helper to get price with currency formatting
export const getFormattedPrice = (plan, billing) => {
  const priceData = plan[billing];
  if (priceData === 'Custom') return 'Custom';
  if (priceData === 'N/A') return 'N/A';

  // Safely extract the numeric value to handle both simple numbers and price objects { current, original }
  const value = (typeof priceData === 'object' && priceData !== null) ? priceData.current : priceData;
  return value === 'Custom' ? 'Custom' : `₦${Number(value || 0).toLocaleString()}`;
};

// Slugify helper
export const slugify = (str) => {
  return str
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');
};
