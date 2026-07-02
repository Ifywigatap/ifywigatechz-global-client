export const SALE_MODE = {
  enabled: true, // Set to true to activate site-wide discount
  discount: 0.20, // 20% discount (e.g., 0.20)
  label: "SUMMER SALE: 15% OFF ALL SERVICES & COURSES! 🚀",
  endDate: "2026-07-01T00:00:00" // Target end date for the countdown
};

const BASE_PRICING = {
  // Academy Courses & Sessions
  academy: {
    frontend: 40000,
    mern: 95000,
    backend: 65000,
    dsa: 50000,
    python: 35000,
    uiux: 60000,
    advancedJs: 40000,
    reactAdvanced: 50000,
    nodeMasterclass: 65000,
    dataScience: 75000,
    oneOnOne: 25000,
    portfolioReview: 15000,
    dataAnalytics: 120000,
    ppmvs: 120000,
    ai: 150000,
    microsoft: 120000,
    cyber: 150000,
    graphic: 120000,
    it: 120000,
    web3: 250000,
  },

  // Hiring Packages
  hire: {
    freelance: 150000,
    retainer: 110000,
  },

  // Digital Products (Downloads)
  digitalProducts: {
    uiuxTemplates: 3500,
    resumeTemplates: 2500,
    reactStarter: 3000,
    freelanceEbook: 1500,
    figmaUiKit: 5000,
    nextjsGuide: 2500,
    typescriptSheet: 1500,
    performanceGuide: 3500,
    responsiveGuidelines: 2000,
    jsPatternsEbook: 2500,
  },

  // Service Plans
  plans: {
    landingPage: { monthly: 8000, yearly: 80000, lifetime: 140000 },
    starterWebsite: { monthly: 15000, yearly: 150000, lifetime: 250000 },
    businessWebsite: { monthly: 30000, yearly: 300000, lifetime: 450000 },
    professionalWebsite: { monthly: 45000, yearly: 450000, lifetime: 650000 },
    ecommerceStore: { monthly: 60000, yearly: 600000, lifetime: 900000 },
    lmsPlatform: { monthly: 70000, yearly: 700000, lifetime: 1000000 },
    realEstate: { monthly: 65000, yearly: 650000, lifetime: 950000 },
    apiDevelopment: { monthly: 25000, yearly: 250000, lifetime: 420000 },
    maintenance: { monthly: 12000, yearly: 120000, lifetime: 200000 },
    mobileApp: { monthly: 80000, yearly: 800000, lifetime: 1200000 },
    uiuxDesign: { monthly: 40000, yearly: 400000, lifetime: 600000 },
    digitalMarketing: { monthly: 25000, yearly: 250000, lifetime: 400000 },
    enterprise: { monthly: 120000, yearly: 1200000, lifetime: 1800000 },
    supportPro: { monthly: 20000, yearly: 200000, lifetime: 300000 },
  }
};

/**
 * Recursively processes the pricing object to return a structure where
 * every number is replaced with an object { original, current }.
 * This ensures properties like .current and .original always exist.
 */
const applySale = (obj) => {
  const processed = {};
  for (const [key, value] of Object.entries(obj)) {
    if (typeof value === "number") {
      processed[key] = {
        original: value,
        current: SALE_MODE.enabled ? Math.floor(value * (1 - SALE_MODE.discount)) : value
      };
    } else if (typeof value === "object" && value !== null) {
      processed[key] = applySale(value);
    } else {
      processed[key] = value;
    }
  }
  return processed;
};

export const PRICING_CONFIG = applySale(BASE_PRICING);