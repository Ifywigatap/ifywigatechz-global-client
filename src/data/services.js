/* COMPLETE enhanced services data - ALL original categories/services from project + required fields */

export const services = [
  // Web Development - 12 services (original)
  {
    category: 'Web Development',
    name: 'Web Development (MERN Stack)',
    desc: 'Modern, responsive, SEO-optimized websites and custom web applications built using React, Node.js, Express, and MongoDB.',
    slug: 'web-development-mern-stack',
    icon: '🌐',
    image: '/services/web.png',
    fullDesc: 'End-to-end MERN stack development for high-performance web apps. Scalable architecture, modern UI, secure APIs, and SEO best practices included.',
    features: ['React frontend', 'Node/Express backend', 'MongoDB NoSQL', 'Responsive design', 'Authentication', 'Admin panel', 'SEO', 'PWA support'],
    benefits: ['Fast development', 'Scalable', 'Cost-effective', 'SEO ready', 'Secure', 'Modern stack'],
    pricing: [
      {name: 'Basic', price: '₦500,000', popular: false, features: ['5 pages', 'Responsive', 'Contact']},
      {name: 'Pro', price: '₦1,200,000', popular: true, features: ['15 pages', 'Admin', 'Payments']},
      {name: 'Enterprise', price: 'Custom', popular: false, features: ['Unlimited', 'API', 'Support']}
    ],
    metrics: [
      { value: "99.99%", label: "Platform Uptime", type: "uptime" },
      { value: "180ms", label: "Avg. Response", type: "speed" },
      { value: "25k+", label: "Active Deployments", type: "growth" },
      { value: "100%", label: "Data Privacy", type: "security" },
    ],
    roi: {
      stats: [
        { value: "-50%", label: "Server Costs" },
        { value: "+200%", label: "Dev Velocity" }
      ],
      roadmap: [
        { label: "Legacy Monolith", val: 90, color: "bg-red-400" },
        { label: "MERN Microservices", val: 15, color: "bg-emerald-400" }
      ]
    },
    integrations: ["AWS", "GitHub", "Vercel", "Docker", "Sentry", "Postman"],
    faqs: [
      { 
        q: "What makes the MERN stack better for my business?", 
        a: "MERN provides a unified JavaScript environment, allowing for faster development cycles and easier scaling compared to traditional stacks." 
      },
      { 
        q: "Is the database secure?", 
        a: "Yes, we implement MongoDB Atlas with VPC peering and end-to-end encryption for maximum data security." 
      },
      { 
        q: "How do you handle high traffic?", 
        a: "We utilize Node.js non-blocking I/O and horizontal scaling strategies to ensure your app stays fast under heavy load." 
      }
    ]
  },
  {
  category: 'Web Development',
  name: 'Landing Page Development',
  desc: 'High-converting landing pages designed for marketing campaigns and lead generation.',
  slug: 'landing-page-development',
  icon: '🚀',
  image: '/images/landing.jpg',
  fullDesc: 'Optimized landing pages focused on conversions, fast loading, and responsive design for ads and campaigns.',
  features: ['Single page', 'Fast loading', 'SEO', 'Responsive', 'CTA sections'],
  benefits: ['High conversion', 'Fast deployment', 'Marketing ready'],
  pricing: [
    {name: 'Basic', price: '₦200,000', popular: false, features: ['1 page', 'Responsive']},
    {name: 'Pro', price: '₦400,000', popular: true, features: ['Advanced UI', 'SEO']},
    {name: 'Enterprise', price: 'Custom', popular: false, features: ['A/B testing']}
  ]
},
{
  category: 'Web Development',
  name: 'Website Maintenance & Support',
  desc: 'Ongoing website updates, bug fixes, and performance optimization services.',
  slug: 'website-maintenance-support',
  icon: '🛠️',
  image: '/images/maintenance.jpg',
  fullDesc: 'Keep your website secure, updated, and optimized with continuous monitoring and maintenance.',
  features: ['Bug fixes', 'Updates', 'Backup', 'Monitoring'],
  benefits: ['Peace of mind', 'Security', 'Performance'],
  pricing: [
    {name: 'Basic', price: '₦100,000/month', popular: false, features: ['Basic updates']},
    {name: 'Pro', price: '₦250,000/month', popular: true, features: ['Priority fixes']},
    {name: 'Enterprise', price: 'Custom', popular: false, features: ['24/7 support']}
  ]
},
  {
    category: 'Web Development',
    name: 'E-commerce Solutions',
    desc: 'Complete e-commerce development with secure payment integration, inventory management, and conversion optimization strategies.',
    slug: 'e-commerce-solutions',
    icon: '🛒',
    image: '/images/ecommerce.jpg',
    fullDesc: 'Full-featured online store with Paystack integration, inventory, orders, customer management, and marketing tools.',
    features: ['Product catalog', 'Cart & checkout', 'Payments', 'Inventory', 'Orders', 'SEO', 'Admin', 'Mobile'],
    benefits: ['Ready to sell', 'Secure', 'Scalable', 'High conversions', 'Management dashboard'],
    pricing: [
      {name: 'Starter', price: '₦800,000', popular: false, features: ['50 products', 'Basic cart']},
      {name: 'Pro', price: '₦2,000,000', popular: true, features: ['500 products', 'Advanced']},
      {name: 'Enterprise', price: 'Custom', popular: false, features: ['Unlimited']}
    ],
    metrics: [
      { value: "0.8s", label: "Checkout Speed", type: "speed" },
      { value: "98%", label: "Payment Success", type: "growth" },
      { value: "15k+", label: "Monthly Orders", type: "growth" },
      { value: "PCI", label: "Level 1 Compliant", type: "security" },
    ],
    roi: {
      stats: [
        { value: "+65%", label: "Conversion Rate" },
        { value: "-30%", label: "Cart Abandonment" }
      ],
      roadmap: [
        { label: "Standard Store", val: 75, color: "bg-orange-400" },
        { label: "Optimized Checkout", val: 12, color: "bg-emerald-400" }
      ]
    },
    integrations: ["Paystack", "Stripe", "Mailchimp", "Shiprocket", "Google Analytics", "Facebook Pixel"],
    faqs: [
      { 
        q: "Can I manage inventory from my phone?", 
        a: "Yes, our custom admin panels are mobile-responsive, allowing you to track orders and update stock on the go." 
      },
      { 
        q: "Do you support international payments?", 
        a: "Absolutely. We integrate multi-currency support via Stripe and other global payment gateways." 
      },
      { 
        q: "How do you handle SEO for thousands of products?", 
        a: "We implement dynamic SSR (Server Side Rendering) and automated meta-tag generation to ensure every product page ranks well." 
      }
    ]
  },
  {
  category: 'Web Development',
  name: 'Custom Web Application Development',
  desc: 'Build scalable and secure custom web applications tailored to business needs.',
  slug: 'custom-web-application-development',
  icon: '⚙️',
  image: '/images/webapp.jpg',
  fullDesc: 'Fully customized web applications with advanced functionality, scalable architecture, and secure backend systems.',
  features: ['Custom features', 'Secure backend', 'Scalable', 'API integration'],
  benefits: ['Tailored solution', 'Scalable', 'High performance'],
  pricing: [
    {name: 'Basic', price: '₦700,000', popular: false, features: ['Core features']},
    {name: 'Pro', price: '₦1,800,000', popular: true, features: ['Advanced features']},
    {name: 'Enterprise', price: 'Custom', popular: false, features: ['Full system']}
  ]
},
{
  category: 'Web Development',
  name: 'Portfolio Website Development',
  desc: 'Personal and professional portfolio websites to showcase skills and projects.',
  slug: 'portfolio-website-development',
  icon: '🧑‍💻',
  image: '/images/portfolio.jpg',
  fullDesc: 'Modern portfolio websites designed to highlight your work and attract clients or employers.',
  features: ['Responsive', 'Projects section', 'Contact form'],
  benefits: ['Personal branding', 'Online presence'],
  pricing: [
    {name: 'Basic', price: '₦150,000', popular: false, features: ['3 pages']},
    {name: 'Pro', price: '₦350,000', popular: true, features: ['5 pages']},
    {name: 'Enterprise', price: 'Custom', popular: false, features: ['Custom']}
  ]
},
{
  category: 'Web Development',
  name: 'Corporate Website Development',
  desc: 'Professional websites for businesses and organizations.',
  slug: 'corporate-website-development',
  icon: '🏢',
  image: '/images/corporate.jpg',
  fullDesc: 'Corporate websites with modern UI, service pages, and brand-focused design.',
  features: ['Company pages', 'Contact', 'SEO'],
  benefits: ['Professional image', 'Brand visibility'],
  pricing: [
    {name: 'Basic', price: '₦400,000', popular: false, features: ['5 pages']},
    {name: 'Pro', price: '₦900,000', popular: true, features: ['10 pages']},
    {name: 'Enterprise', price: 'Custom', popular: false, features: ['Unlimited']}
  ]
},
{
  category: 'Web Development',
  name: 'Blog & CMS Development',
  desc: 'Content management systems and blogs with easy publishing tools.',
  slug: 'blog-cms-development',
  icon: '✍️',
  image: '/images/blog.jpg',
  fullDesc: 'Custom CMS solutions for blogs, news platforms, and content-driven websites.',
  features: ['CMS', 'Editor', 'SEO', 'Categories'],
  benefits: ['Easy content updates', 'SEO ready'],
  pricing: [
    {name: 'Basic', price: '₦250,000', popular: false, features: ['Basic CMS']},
    {name: 'Pro', price: '₦600,000', popular: true, features: ['Advanced CMS']},
    {name: 'Enterprise', price: 'Custom', popular: false, features: ['Custom CMS']}
  ]
},
{
  category: 'Web Development',
  name: 'SaaS Platform Development',
  desc: 'Build scalable SaaS platforms with subscriptions and dashboards.',
  slug: 'saas-platform-development',
  icon: '☁️',
  image: '/images/saas.jpg',
  fullDesc: 'End-to-end SaaS platforms with authentication, billing, dashboards, and APIs.',
  features: ['Subscriptions', 'Dashboard', 'API', 'Auth'],
  benefits: ['Recurring revenue', 'Scalable'],
  pricing: [
    {name: 'Basic', price: '₦1,500,000', popular: false, features: ['Core SaaS']},
    {name: 'Pro', price: '₦3,500,000', popular: true, features: ['Advanced SaaS']},
    {name: 'Enterprise', price: 'Custom', popular: false, features: ['Full system']}
  ]
},
{
  category: 'Web Development',
  name: 'API Development & Integration',
  desc: 'Build and integrate REST APIs for web and mobile applications.',
  slug: 'api-development-integration',
  icon: '🔗',
  image: '/images/api.jpg',
  fullDesc: 'Secure and scalable API development for seamless integration between systems.',
  features: ['REST API', 'Integration', 'Security'],
  benefits: ['System connectivity', 'Automation'],
  pricing: [
    {name: 'Basic', price: '₦200,000', popular: false, features: ['Basic API']},
    {name: 'Pro', price: '₦600,000', popular: true, features: ['Advanced API']},
    {name: 'Enterprise', price: 'Custom', popular: false, features: ['Full integration']}
  ]
},
{
  category: 'Web Development',
  name: 'Progressive Web App (PWA) Development',
  desc: 'Build fast, installable web apps with offline support.',
  slug: 'pwa-development',
  icon: '📲',
  image: '/images/pwa.jpg',
  fullDesc: 'PWAs that behave like mobile apps with offline functionality and fast performance.',
  features: ['Offline mode', 'Installable', 'Fast'],
  benefits: ['App-like experience', 'Performance'],
  pricing: [
    {name: 'Basic', price: '₦300,000', popular: false, features: ['Basic PWA']},
    {name: 'Pro', price: '₦800,000', popular: true, features: ['Advanced PWA']},
    {name: 'Enterprise', price: 'Custom', popular: false, features: ['Full PWA']}
  ]
},
{
  category: 'Web Development',
  name: 'Website Redesign Services',
  desc: 'Upgrade outdated websites with modern UI/UX and performance.',
  slug: 'website-redesign-services',
  icon: '🔄',
  image: '/images/redesign.jpg',
  fullDesc: 'Transform your old website into a modern, fast, and responsive platform.',
  features: ['UI redesign', 'Performance', 'SEO'],
  benefits: ['Better UX', 'Modern look'],
  pricing: [
    {name: 'Basic', price: '₦200,000', popular: false, features: ['UI refresh']},
    {name: 'Pro', price: '₦600,000', popular: true, features: ['Full redesign']},
    {name: 'Enterprise', price: 'Custom', popular: false, features: ['Complete rebuild']}
  ]
},
{
  category: 'Web Development',
  name: 'Website Speed Optimization',
  desc: 'Improve website loading speed and performance.',
  slug: 'website-speed-optimization',
  icon: '⚡',
  image: '/images/speed.jpg',
  fullDesc: 'Optimize code, images, and server performance for faster loading websites.',
  features: ['Performance audit', 'Optimization', 'Caching'],
  benefits: ['Faster load', 'Better SEO'],
  pricing: [
    {name: 'Basic', price: '₦100,000', popular: false, features: ['Audit']},
    {name: 'Pro', price: '₦300,000', popular: true, features: ['Full optimization']},
    {name: 'Enterprise', price: 'Custom', popular: false, features: ['Advanced']}
  ]
},
{
  category: 'Web Development',
  name: 'Web Hosting & Deployment',
  desc: 'Deploy and manage websites on secure hosting platforms.',
  slug: 'web-hosting-deployment',
  icon: '🌍',
  image: '/images/hosting.jpg',
  fullDesc: 'Reliable hosting setup, domain configuration, and deployment services.',
  features: ['Hosting setup', 'Domain', 'SSL'],
  benefits: ['Online presence', 'Security'],
  pricing: [
    {name: 'Basic', price: '₦50,000', popular: false, features: ['Setup']},
    {name: 'Pro', price: '₦150,000', popular: true, features: ['Managed hosting']},
    {name: 'Enterprise', price: 'Custom', popular: false, features: ['Full infra']}
  ]
},
{
  category: 'Web Development',
  name: 'Web Accessibility Optimization',
  desc: 'Make your website accessible to all users including disabled users.',
  slug: 'web-accessibility-optimization',
  icon: '♿',
  image: '/images/accessibility.jpg',
  fullDesc: 'Improve accessibility following WCAG standards for inclusive user experience.',
  features: ['Accessibility audit', 'Fixes', 'Compliance'],
  benefits: ['Inclusive', 'Legal compliance'],
  pricing: [
    {name: 'Basic', price: '₦120,000', popular: false, features: ['Audit']},
    {name: 'Pro', price: '₦350,000', popular: true, features: ['Fixes']},
    {name: 'Enterprise', price: 'Custom', popular: false, features: ['Full compliance']}
  ]
},
{
  category: 'Web Development',
  name: 'Real-Time Web App Development',
  desc: 'Build real-time apps like chat systems and live dashboards.',
  slug: 'real-time-web-app-development',
  icon: '📡',
  image: '/images/realtime.jpg',
  fullDesc: 'Real-time applications using WebSockets for chat, notifications, and live updates.',
  features: ['WebSockets', 'Live updates', 'Notifications'],
  benefits: ['Instant data', 'Interactive UX'],
  pricing: [
    {name: 'Basic', price: '₦500,000', popular: false, features: ['Basic real-time']},
    {name: 'Pro', price: '₦1,500,000', popular: true, features: ['Advanced system']},
    {name: 'Enterprise', price: 'Custom', popular: false, features: ['Full solution']}
  ]
},

// =========================
// DESIGN & UX 
// =========================
  {
    category: 'Design & UX',
    name: 'UI/UX Design',
    desc: 'Professional wireframes, modern interfaces, user-focused design systems, and high-fidelity prototypes built in Figma.',
    slug: 'ui-ux-design',
    icon: '🎨',
    image: '/images/uiux.jpg',
    fullDesc: 'User-centered design process with research, wireframes, prototypes, and Figma design systems for digital products.',
    features: ['Research', 'Wireframes', 'Prototypes', 'Figma', 'Design system', 'Accessibility', 'Testing'],
    benefits: ['User delight', 'Higher retention', 'Brand consistency', 'Source files'],
    pricing: [
      {name: 'Basic', price: '₦300,000', popular: false, features: ['5 screens']},
      {name: 'Pro', price: '₦700,000', popular: true, features: ['20 screens']},
      {name: 'Enterprise', price: 'Custom', popular: false, features: ['Unlimited']}
    ]
  },
{
  category: 'Design & UX',
  name: 'Wireframing & Prototyping',
  desc: 'Create low and high-fidelity wireframes and interactive prototypes.',
  slug: 'wireframing-prototyping',
  icon: '🧱',
  image: '/images/wireframe.jpg',
  fullDesc: 'Design structured wireframes and clickable prototypes to visualize user flows and product structure.',
  features: ['Wireframes', 'Prototypes', 'User flows'],
  benefits: ['Clear structure', 'Better planning'],
  pricing: [
    {name: 'Basic', price: '₦200,000', popular: false, features: ['Low fidelity']},
    {name: 'Pro', price: '₦500,000', popular: true, features: ['High fidelity']},
    {name: 'Enterprise', price: 'Custom', popular: false, features: ['Advanced']}
  ]
},
{
  category: 'Design & UX',
  name: 'UX Research & Analysis',
  desc: 'Understand user behavior through research and usability testing.',
  slug: 'ux-research-analysis',
  icon: '🔍',
  image: '/images/research.jpg',
  fullDesc: 'Conduct user research, surveys, and usability testing to improve product experience.',
  features: ['User research', 'Surveys', 'Testing'],
  benefits: ['Better decisions', 'User insights'],
  pricing: [
    {name: 'Basic', price: '₦150,000', popular: false, features: ['Basic research']},
    {name: 'Pro', price: '₦400,000', popular: true, features: ['Full analysis']},
    {name: 'Enterprise', price: 'Custom', popular: false, features: ['Advanced']}
  ]
},
{
  category: 'Design & UX',
  name: 'Design System Creation',
  desc: 'Build scalable design systems for consistent UI across products.',
  slug: 'design-system-creation',
  icon: '📐',
  image: '/images/design-system.jpg',
  fullDesc: 'Create reusable components, typography, colors, and guidelines for scalable design.',
  features: ['Components', 'Typography', 'Colors'],
  benefits: ['Consistency', 'Faster design'],
  pricing: [
    {name: 'Basic', price: '₦300,000', popular: false, features: ['Basic system']},
    {name: 'Pro', price: '₦800,000', popular: true, features: ['Full system']},
    {name: 'Enterprise', price: 'Custom', popular: false, features: ['Enterprise']}
  ]
},
{
  category: 'Design & UX',
  name: 'Website UI Design',
  desc: 'Modern and responsive UI design for websites.',
  slug: 'website-ui-design',
  icon: '🖥️',
  image: '/images/web-ui.jpg',
  fullDesc: 'Design clean and modern website interfaces focused on usability and branding.',
  features: ['Layouts', 'Responsive UI', 'Figma'],
  benefits: ['Modern look', 'Better UX'],
  pricing: [
    {name: 'Basic', price: '₦250,000', popular: false, features: ['5 pages']},
    {name: 'Pro', price: '₦600,000', popular: true, features: ['15 pages']},
    {name: 'Enterprise', price: 'Custom', popular: false, features: ['Unlimited']}
  ]
},
{
  category: 'Design & UX',
  name: 'Mobile App UI Design',
  desc: 'Design user-friendly interfaces for mobile applications.',
  slug: 'mobile-app-ui-design',
  icon: '📱',
  image: '/images/mobile-ui.jpg',
  fullDesc: 'Create intuitive and modern mobile app designs for Android and iOS platforms.',
  features: ['Mobile UI', 'User flow', 'Prototypes'],
  benefits: ['Better usability', 'High engagement'],
  pricing: [
    {name: 'Basic', price: '₦250,000', popular: false, features: ['5 screens']},
    {name: 'Pro', price: '₦700,000', popular: true, features: ['20 screens']},
    {name: 'Enterprise', price: 'Custom', popular: false, features: ['Full app']}
  ]
},
{
  category: 'Design & UX',
  name: 'Dashboard & Admin UI Design',
  desc: 'Design clean dashboards and admin panels for web applications.',
  slug: 'dashboard-admin-ui-design',
  icon: '📊',
  image: '/images/dashboard.jpg',
  fullDesc: 'Modern dashboards with charts, tables, and user-friendly layouts.',
  features: ['Charts', 'Tables', 'Components'],
  benefits: ['Easy management', 'Clean UI'],
  pricing: [
    {name: 'Basic', price: '₦300,000', popular: false, features: ['Basic dashboard']},
    {name: 'Pro', price: '₦900,000', popular: true, features: ['Advanced dashboard']},
    {name: 'Enterprise', price: 'Custom', popular: false, features: ['Full system']}
  ]
},
{
  category: 'Design & UX',
  name: 'Landing Page UI Design',
  desc: 'Design high-converting landing pages for campaigns.',
  slug: 'landing-page-ui-design',
  icon: '🚀',
  image: '/images/landing-ui.jpg',
  fullDesc: 'Conversion-focused landing page designs with modern UI and strong CTA sections.',
  features: ['Hero section', 'CTA', 'Responsive'],
  benefits: ['High conversion', 'Attractive UI'],
  pricing: [
    {name: 'Basic', price: '₦150,000', popular: false, features: ['Single page']},
    {name: 'Pro', price: '₦400,000', popular: true, features: ['Advanced design']},
    {name: 'Enterprise', price: 'Custom', popular: false, features: ['A/B testing']}
  ]
},
{
  category: 'Design & UX',
  name: 'UX Audit & Improvement',
  desc: 'Analyze and improve user experience of existing products.',
  slug: 'ux-audit-improvement',
  icon: '🧠',
  image: '/images/ux-audit.jpg',
  fullDesc: 'Evaluate usability issues and recommend improvements for better user experience.',
  features: ['Audit', 'Recommendations', 'Fixes'],
  benefits: ['Better UX', 'Higher retention'],
  pricing: [
    {name: 'Basic', price: '₦150,000', popular: false, features: ['Audit']},
    {name: 'Pro', price: '₦400,000', popular: true, features: ['Audit + fixes']},
    {name: 'Enterprise', price: 'Custom', popular: false, features: ['Full redesign']}
  ]
},
{
  category: 'Design & UX',
  name: 'Interaction Design',
  desc: 'Design animations and interactions for better user experience.',
  slug: 'interaction-design',
  icon: '✨',
  image: '/images/interaction.jpg',
  fullDesc: 'Create engaging animations and micro-interactions for digital products.',
  features: ['Animations', 'Transitions', 'Micro-interactions'],
  benefits: ['Engaging UI', 'Better UX'],
  pricing: [
    {name: 'Basic', price: '₦200,000', popular: false, features: ['Basic animations']},
    {name: 'Pro', price: '₦500,000', popular: true, features: ['Advanced interactions']},
    {name: 'Enterprise', price: 'Custom', popular: false, features: ['Full system']}
  ]
},
{
  category: 'Design & UX',
  name: 'Usability Testing',
  desc: 'Test your product with real users to identify usability issues.',
  slug: 'usability-testing',
  icon: '🧪',
  image: '/images/testing.jpg',
  fullDesc: 'Conduct usability tests and gather feedback to improve user experience.',
  features: ['User testing', 'Feedback', 'Reports'],
  benefits: ['Better product', 'User insights'],
  pricing: [
    {name: 'Basic', price: '₦120,000', popular: false, features: ['Basic testing']},
    {name: 'Pro', price: '₦350,000', popular: true, features: ['Detailed report']},
    {name: 'Enterprise', price: 'Custom', popular: false, features: ['Advanced']}
  ]
},
{
  category: 'Design & UX',
  name: 'Prototype Testing & Validation',
  desc: 'Validate product ideas with interactive prototypes before development.',
  slug: 'prototype-testing-validation',
  icon: '✅',
  image: '/images/prototype.jpg',
  fullDesc: 'Test prototypes with users to validate ideas and improve before development.',
  features: ['Prototype testing', 'Validation', 'Feedback'],
  benefits: ['Reduce risk', 'Better product'],
  pricing: [
    {name: 'Basic', price: '₦150,000', popular: false, features: ['Basic validation']},
    {name: 'Pro', price: '₦400,000', popular: true, features: ['Advanced testing']},
    {name: 'Enterprise', price: 'Custom', popular: false, features: ['Full validation']}
  ]
},
{
  category: 'Design & UX',
  name: 'Brand Identity Design',
  desc: 'Complete brand identity including logo, colors, typography, and guidelines.',
  slug: 'brand-identity-design',
  icon: '🧩',
  image: '/images/branding.jpg',
  fullDesc: 'Build a strong brand identity with professional logo design and brand guidelines.',
  features: ['Logo', 'Color palette', 'Typography', 'Brand guide'],
  benefits: ['Strong identity', 'Consistency', 'Professional look'],
  pricing: [
    {name: 'Basic', price: '₦150,000', popular: false, features: ['Logo']},
    {name: 'Pro', price: '₦400,000', popular: true, features: ['Full brand kit']},
    {name: 'Enterprise', price: 'Custom', popular: false, features: ['Full identity']}
  ]
},
{
  category: 'Design & UX',
  name: 'Product UI Design',
  desc: 'Modern UI design for SaaS platforms and digital products.',
  slug: 'product-ui-design',
  icon: '💻',
  image: '/images/product-ui.jpg',
  fullDesc: 'Design beautiful and functional interfaces for SaaS dashboards and apps.',
  features: ['Dashboards', 'Components', 'Figma'],
  benefits: ['Better UX', 'Clean UI'],
  pricing: [
    {name: 'Basic', price: '₦300,000', popular: false, features: ['10 screens']},
    {name: 'Pro', price: '₦800,000', popular: true, features: ['30 screens']},
    {name: 'Enterprise', price: 'Custom', popular: false, features: ['Unlimited']}
  ]
},

// =========================
// MOBILE DEVELOPMENT
// =========================
{
  category: 'Mobile App Development',
  name: 'App UI/UX Design',
  desc: 'Mobile-first UI/UX design for Android and iOS apps.',
  slug: 'app-ui-ux-design',
  icon: '📲',
  image: '/images/app-ui.jpg',
  fullDesc: 'Design intuitive mobile app interfaces with smooth user experience.',
  features: ['Mobile UI', 'Prototypes', 'User flow'],
  benefits: ['User-friendly', 'High retention'],
  pricing: [
    {name: 'Basic', price: '₦250,000', popular: false, features: ['5 screens']},
    {name: 'Pro', price: '₦600,000', popular: true, features: ['20 screens']},
    {name: 'Enterprise', price: 'Custom', popular: false, features: ['Full app']}
  ]
},
{
  category: 'Mobile App Development',
  name: 'App Maintenance & Updates',
  desc: 'Regular updates, bug fixes, and improvements for mobile apps.',
  slug: 'app-maintenance-updates',
  icon: '🔄',
  image: '/images/app-maintenance.jpg',
  fullDesc: 'Keep your mobile app updated with new features and security fixes.',
  features: ['Bug fixes', 'Updates', 'Monitoring'],
  benefits: ['Stable app', 'Improved UX'],
  pricing: [
    {name: 'Basic', price: '₦150,000/month', popular: false, features: ['Minor updates']},
    {name: 'Pro', price: '₦350,000/month', popular: true, features: ['Major updates']},
    {name: 'Enterprise', price: 'Custom', popular: false, features: ['Full support']}
  ]
},
{
  category: 'Mobile App Development',
  name: 'Cross-Platform App Development',
  desc: 'Build apps for Android and iOS using a single codebase.',
  slug: 'cross-platform-app-development',
  icon: '📱',
  image: '/images/cross-platform.jpg',
  fullDesc: 'Develop cost-effective cross-platform apps using React Native and modern frameworks.',
  features: ['React Native', 'iOS/Android', 'Single codebase'],
  benefits: ['Cost-effective', 'Faster development'],
  pricing: [
    {name: 'Basic', price: '₦1,200,000', popular: false, features: ['Core features']},
    {name: 'Pro', price: '₦3,000,000', popular: true, features: ['Advanced features']},
    {name: 'Enterprise', price: 'Custom', popular: false, features: ['Full app']}
  ]
},
{
  category: 'Mobile App Development',
  name: 'Native App Development',
  desc: 'Develop high-performance native mobile applications.',
  slug: 'native-app-development',
  icon: '⚡',
  image: '/images/native.jpg',
  fullDesc: 'Build fast and reliable native apps for Android and iOS with optimized performance.',
  features: ['Native performance', 'Platform-specific', 'Optimized'],
  benefits: ['High performance', 'Better UX'],
  pricing: [
    {name: 'Basic', price: '₦1,500,000', popular: false, features: ['Single platform']},
    {name: 'Pro', price: '₦4,000,000', popular: true, features: ['Both platforms']},
    {name: 'Enterprise', price: 'Custom', popular: false, features: ['Full system']}
  ]
},
{
  category: 'Mobile App Development',
  name: 'E-commerce Mobile App Development',
  desc: 'Create mobile shopping apps with secure payments and product management.',
  slug: 'ecommerce-mobile-app-development',
  icon: '🛒',
  image: '/images/mobile-ecommerce.jpg',
  fullDesc: 'Develop feature-rich e-commerce mobile apps with cart, checkout, and payment integration.',
  features: ['Product catalog', 'Cart', 'Payments'],
  benefits: ['Mobile sales', 'User convenience'],
  pricing: [
    {name: 'Basic', price: '₦1,800,000', popular: false, features: ['Basic store']},
    {name: 'Pro', price: '₦4,500,000', popular: true, features: ['Advanced store']},
    {name: 'Enterprise', price: 'Custom', popular: false, features: ['Full system']}
  ]
},
{
  category: 'Mobile App Development',
  name: 'On-Demand App Development',
  desc: 'Build apps like Uber, Bolt, or delivery platforms.',
  slug: 'on-demand-app-development',
  icon: '🚗',
  image: '/images/on-demand.jpg',
  fullDesc: 'Create on-demand apps with real-time tracking, bookings, and payments.',
  features: ['Real-time tracking', 'Booking system', 'Payments'],
  benefits: ['Business growth', 'Automation'],
  pricing: [
    {name: 'Basic', price: '₦2,500,000', popular: false, features: ['Basic features']},
    {name: 'Pro', price: '₦6,000,000', popular: true, features: ['Advanced system']},
    {name: 'Enterprise', price: 'Custom', popular: false, features: ['Full platform']}
  ]
},
{
  category: 'Mobile App Development',
  name: 'Chat & Messaging App Development',
  desc: 'Build real-time chat and messaging mobile applications.',
  slug: 'chat-messaging-app-development',
  icon: '💬',
  image: '/images/chat-app.jpg',
  fullDesc: 'Develop messaging apps with real-time communication and notifications.',
  features: ['Real-time chat', 'Notifications', 'Media sharing'],
  benefits: ['User engagement', 'Instant communication'],
  pricing: [
    {name: 'Basic', price: '₦1,500,000', popular: false, features: ['Basic chat']},
    {name: 'Pro', price: '₦3,800,000', popular: true, features: ['Advanced chat']},
    {name: 'Enterprise', price: 'Custom', popular: false, features: ['Full system']}
  ]
},
{
  category: 'Mobile App Development',
  name: 'Mobile App API Integration',
  desc: 'Integrate third-party APIs into mobile applications.',
  slug: 'mobile-app-api-integration',
  icon: '🔗',
  image: '/images/mobile-api.jpg',
  fullDesc: 'Connect apps to external services like payment gateways, maps, and analytics.',
  features: ['API integration', 'Third-party services', 'Secure'],
  benefits: ['Extended functionality', 'Automation'],
  pricing: [
    {name: 'Basic', price: '₦300,000', popular: false, features: ['Single API']},
    {name: 'Pro', price: '₦800,000', popular: true, features: ['Multiple APIs']},
    {name: 'Enterprise', price: 'Custom', popular: false, features: ['Full integration']}
  ]
},
{
  category: 'Mobile App Development',
  name: 'App Testing & QA',
  desc: 'Ensure mobile app quality through testing and debugging.',
  slug: 'app-testing-qa',
  icon: '🧪',
  image: '/images/app-testing.jpg',
  fullDesc: 'Comprehensive testing for performance, usability, and bug detection.',
  features: ['Manual testing', 'Bug reports', 'Performance testing'],
  benefits: ['Stable app', 'Better UX'],
  pricing: [
    {name: 'Basic', price: '₦200,000', popular: false, features: ['Basic testing']},
    {name: 'Pro', price: '₦600,000', popular: true, features: ['Full QA']},
    {name: 'Enterprise', price: 'Custom', popular: false, features: ['Advanced QA']}
  ]
},
{
  category: 'Mobile App Development',
  name: 'App Deployment & Publishing',
  desc: 'Publish apps to Google Play Store and Apple App Store.',
  slug: 'app-deployment-publishing',
  icon: '🚀',
  image: '/images/app-deploy.jpg',
  fullDesc: 'Handle app submission, optimization, and deployment to app stores.',
  features: ['Play Store', 'App Store', 'Optimization'],
  benefits: ['Go live', 'Visibility'],
  pricing: [
    {name: 'Basic', price: '₦100,000', popular: false, features: ['Single platform']},
    {name: 'Pro', price: '₦250,000', popular: true, features: ['Both platforms']},
    {name: 'Enterprise', price: 'Custom', popular: false, features: ['Full service']}
  ]
},
{
  category: 'Mobile App Development',
  name: 'App Performance Optimization',
  desc: 'Improve app speed, responsiveness, and efficiency.',
  slug: 'app-performance-optimization',
  icon: '⚡',
  image: '/images/app-performance.jpg',
  fullDesc: 'Optimize mobile apps for faster loading, smooth animations, and better performance.',
  features: ['Speed optimization', 'Bug fixes', 'Performance tuning'],
  benefits: ['Better UX', 'Higher retention'],
  pricing: [
    {name: 'Basic', price: '₦150,000', popular: false, features: ['Audit']},
    {name: 'Pro', price: '₦500,000', popular: true, features: ['Full optimization']},
    {name: 'Enterprise', price: 'Custom', popular: false, features: ['Advanced']}
  ]
},
{
  category: 'Mobile App Development',
  name: 'Push Notification Integration',
  desc: 'Enable real-time notifications in mobile apps.',
  slug: 'push-notification-integration',
  icon: '🔔',
  image: '/images/notifications.jpg',
  fullDesc: 'Integrate push notifications for engagement and real-time updates.',
  features: ['Push notifications', 'Real-time alerts', 'Firebase'],
  benefits: ['User engagement', 'Retention'],
  pricing: [
    {name: 'Basic', price: '₦120,000', popular: false, features: ['Basic setup']},
    {name: 'Pro', price: '₦400,000', popular: true, features: ['Advanced setup']},
    {name: 'Enterprise', price: 'Custom', popular: false, features: ['Full integration']}
  ]
},

// =========================
// MARKETING
// =========================
{
  category: 'Marketing',
  name: 'SEO Optimization',
  desc: 'Improve website ranking on Google with on-page and technical SEO.',
  slug: 'seo-optimization',
  icon: '📈',
  image: '/images/seo.jpg',
  fullDesc: 'Comprehensive SEO strategy to boost traffic and visibility.',
  features: ['Keywords', 'On-page SEO', 'Technical SEO'],
  benefits: ['More traffic', 'Better ranking'],
  pricing: [
    {name: 'Basic', price: '₦200,000', popular: false, features: ['Audit']},
    {name: 'Pro', price: '₦500,000', popular: true, features: ['Full SEO']},
    {name: 'Enterprise', price: 'Custom', popular: false, features: ['Advanced']}
  ]
},
{
  category: 'Marketing',
  name: 'Social Media Management',
  desc: 'Manage and grow your brand on social media platforms.',
  slug: 'social-media-management',
  icon: '📱',
  image: '/images/social.jpg',
  fullDesc: 'Content creation, posting, and analytics for social media growth.',
  features: ['Content', 'Posting', 'Analytics'],
  benefits: ['Brand growth', 'Engagement'],
  pricing: [
    {name: 'Basic', price: '₦150,000/month', popular: false, features: ['2 platforms']},
    {name: 'Pro', price: '₦400,000/month', popular: true, features: ['5 platforms']},
    {name: 'Enterprise', price: 'Custom', popular: false, features: ['Unlimited']}
  ]
},
{
  category: 'Marketing',
  name: 'Content Marketing',
  desc: 'Create and distribute valuable content to attract and engage your audience.',
  slug: 'content-marketing',
  icon: '📝',
  image: '/images/content.jpg',
  fullDesc: 'Strategic content creation including blogs, articles, and marketing copy to grow your brand.',
  features: ['Blog writing', 'Content strategy', 'SEO content'],
  benefits: ['Audience growth', 'Brand authority'],
  pricing: [
    {name: 'Basic', price: '₦120,000', popular: false, features: ['5 articles']},
    {name: 'Pro', price: '₦350,000', popular: true, features: ['15 articles']},
    {name: 'Enterprise', price: 'Custom', popular: false, features: ['Unlimited']}
  ]
},
{
  category: 'Marketing',
  name: 'Email Marketing Campaigns',
  desc: 'Build and manage email campaigns to engage customers and drive sales.',
  slug: 'email-marketing-campaigns',
  icon: '📧',
  image: '/images/email.jpg',
  fullDesc: 'Design and automate email campaigns with newsletters, promotions, and customer engagement strategies.',
  features: ['Email templates', 'Automation', 'Analytics'],
  benefits: ['Customer retention', 'Higher conversions'],
  pricing: [
    {name: 'Basic', price: '₦100,000', popular: false, features: ['1 campaign']},
    {name: 'Pro', price: '₦300,000', popular: true, features: ['5 campaigns']},
    {name: 'Enterprise', price: 'Custom', popular: false, features: ['Unlimited']}
  ]
},
{
  category: 'Marketing',
  name: 'Pay-Per-Click Advertising (PPC)',
  desc: 'Run targeted ad campaigns on Google and social platforms.',
  slug: 'ppc-advertising',
  icon: '💰',
  image: '/images/ppc.jpg',
  fullDesc: 'Manage paid advertising campaigns to generate leads and maximize ROI.',
  features: ['Google Ads', 'Facebook Ads', 'Optimization'],
  benefits: ['Instant traffic', 'High ROI'],
  pricing: [
    {name: 'Basic', price: '₦150,000', popular: false, features: ['Setup']},
    {name: 'Pro', price: '₦400,000', popular: true, features: ['Management']},
    {name: 'Enterprise', price: 'Custom', popular: false, features: ['Full ads system']}
  ]
},
{
  category: 'Marketing',
  name: 'Conversion Rate Optimization (CRO)',
  desc: 'Improve website conversions through data-driven strategies.',
  slug: 'conversion-rate-optimization',
  icon: '📊',
  image: '/images/cro.jpg',
  fullDesc: 'Analyze user behavior and optimize pages to increase conversions and sales.',
  features: ['Analytics', 'A/B testing', 'Optimization'],
  benefits: ['More sales', 'Better performance'],
  pricing: [
    {name: 'Basic', price: '₦150,000', popular: false, features: ['Audit']},
    {name: 'Pro', price: '₦500,000', popular: true, features: ['Optimization']},
    {name: 'Enterprise', price: 'Custom', popular: false, features: ['Advanced']}
  ]
},
{
  category: 'Marketing',
  name: 'Influencer Marketing',
  desc: 'Promote your brand through influencers and content creators.',
  slug: 'influencer-marketing',
  icon: '🤝',
  image: '/images/influencer.jpg',
  fullDesc: 'Collaborate with influencers to reach a wider audience and boost brand trust.',
  features: ['Influencer outreach', 'Campaigns', 'Tracking'],
  benefits: ['Brand awareness', 'Trust'],
  pricing: [
    {name: 'Basic', price: '₦200,000', popular: false, features: ['1 influencer']},
    {name: 'Pro', price: '₦600,000', popular: true, features: ['Multiple influencers']},
    {name: 'Enterprise', price: 'Custom', popular: false, features: ['Full campaign']}
  ]
},
{
  category: 'Marketing',
  name: 'Affiliate Marketing Setup',
  desc: 'Create and manage affiliate programs to grow your sales.',
  slug: 'affiliate-marketing-setup',
  icon: '🔗',
  image: '/images/affiliate.jpg',
  fullDesc: 'Set up affiliate systems that allow partners to promote your business and earn commissions.',
  features: ['Tracking', 'Commission system', 'Dashboard'],
  benefits: ['More sales', 'Low cost marketing'],
  pricing: [
    {name: 'Basic', price: '₦250,000', popular: false, features: ['Basic setup']},
    {name: 'Pro', price: '₦700,000', popular: true, features: ['Advanced system']},
    {name: 'Enterprise', price: 'Custom', popular: false, features: ['Full platform']}
  ]
},
{
  category: 'Marketing',
  name: 'Brand Strategy & Positioning',
  desc: 'Define your brand identity and market positioning.',
  slug: 'brand-strategy-positioning',
  icon: '🎯',
  image: '/images/brand-strategy.jpg',
  fullDesc: 'Develop a clear brand strategy that differentiates your business in the market.',
  features: ['Brand strategy', 'Positioning', 'Messaging'],
  benefits: ['Clear identity', 'Competitive advantage'],
  pricing: [
    {name: 'Basic', price: '₦200,000', popular: false, features: ['Basic strategy']},
    {name: 'Pro', price: '₦600,000', popular: true, features: ['Full strategy']},
    {name: 'Enterprise', price: 'Custom', popular: false, features: ['Advanced']}
  ]
},
{
  category: 'Marketing',
  name: 'Video Marketing',
  desc: 'Create and promote video content for your brand.',
  slug: 'video-marketing',
  icon: '🎥',
  image: '/images/video.jpg',
  fullDesc: 'Produce engaging video content for social media, ads, and branding.',
  features: ['Video production', 'Editing', 'Promotion'],
  benefits: ['High engagement', 'Brand awareness'],
  pricing: [
    {name: 'Basic', price: '₦150,000', popular: false, features: ['1 video']},
    {name: 'Pro', price: '₦500,000', popular: true, features: ['5 videos']},
    {name: 'Enterprise', price: 'Custom', popular: false, features: ['Full campaign']}
  ]
},
{
  category: 'Marketing',
  name: 'Local SEO Services',
  desc: 'Optimize your business for local search visibility.',
  slug: 'local-seo-services',
  icon: '📍',
  image: '/images/local-seo.jpg',
  fullDesc: 'Improve your presence in local search results and Google Maps.',
  features: ['Google My Business', 'Local keywords', 'Listings'],
  benefits: ['Local traffic', 'More customers'],
  pricing: [
    {name: 'Basic', price: '₦120,000', popular: false, features: ['Basic setup']},
    {name: 'Pro', price: '₦400,000', popular: true, features: ['Optimization']},
    {name: 'Enterprise', price: 'Custom', popular: false, features: ['Full service']}
  ]
},
{
  category: 'Marketing',
  name: 'Marketing Analytics & Reporting',
  desc: 'Track and analyze marketing performance with detailed reports.',
  slug: 'marketing-analytics-reporting',
  icon: '📊',
  image: '/images/analytics.jpg',
  fullDesc: 'Set up dashboards and reports to measure marketing success and ROI.',
  features: ['Dashboards', 'Reports', 'Insights'],
  benefits: ['Data-driven decisions', 'Better ROI'],
  pricing: [
    {name: 'Basic', price: '₦100,000', popular: false, features: ['Basic report']},
    {name: 'Pro', price: '₦300,000', popular: true, features: ['Advanced analytics']},
    {name: 'Enterprise', price: 'Custom', popular: false, features: ['Full tracking']}
  ]
},

// =========================
// SECURITY
// =========================
{
  category: 'Security',
  name: 'Website Security Audit',
  desc: 'Identify and fix vulnerabilities in your website.',
  slug: 'website-security-audit',
  icon: '🔒',
  image: '/images/security.jpg',
  fullDesc: 'Comprehensive security audit to protect your website from attacks.',
  features: ['Scan', 'Fixes', 'Report'],
  benefits: ['Protection', 'Compliance'],
  pricing: [
    {name: 'Basic', price: '₦150,000', popular: false, features: ['Scan only']},
    {name: 'Pro', price: '₦400,000', popular: true, features: ['Fix + report']},
    {name: 'Enterprise', price: 'Custom', popular: false, features: ['Full security']}
  ]
},
{
  category: 'Security',
  name: 'API Security Implementation',
  desc: 'Secure your backend APIs with authentication and protection.',
  slug: 'api-security-implementation',
  icon: '🛡️',
  image: '/images/api-security.jpg',
  fullDesc: 'Implement JWT, rate limiting, and security best practices.',
  features: ['JWT', 'Rate limiting', 'Encryption'],
  benefits: ['Secure APIs', 'Data protection'],
  pricing: [
    {name: 'Basic', price: '₦200,000', popular: false, features: ['Auth setup']},
    {name: 'Pro', price: '₦600,000', popular: true, features: ['Full security']},
    {name: 'Enterprise', price: 'Custom', popular: false, features: ['Advanced']}
  ]
},
{
  category: 'Security',
  name: 'Web Application Firewall Setup',
  desc: 'Protect your website with advanced firewall configurations.',
  slug: 'web-application-firewall-setup',
  icon: '🔥',
  image: '/images/waf.jpg',
  fullDesc: 'Configure and deploy web application firewalls to block malicious traffic and attacks.',
  features: ['Firewall setup', 'Traffic filtering', 'Protection'],
  benefits: ['Attack prevention', 'Enhanced security'],
  pricing: [
    {name: 'Basic', price: '₦120,000', popular: false, features: ['Basic setup']},
    {name: 'Pro', price: '₦350,000', popular: true, features: ['Advanced rules']},
    {name: 'Enterprise', price: 'Custom', popular: false, features: ['Full protection']}
  ]
},
{
  category: 'Security',
  name: 'Penetration Testing',
  desc: 'Simulate cyber attacks to identify vulnerabilities.',
  slug: 'penetration-testing',
  icon: '🧑‍💻',
  image: '/images/pentest.jpg',
  fullDesc: 'Ethical hacking and penetration testing to uncover weaknesses in your system.',
  features: ['Vulnerability scan', 'Exploit testing', 'Report'],
  benefits: ['Risk reduction', 'Security insights'],
  pricing: [
    {name: 'Basic', price: '₦200,000', popular: false, features: ['Basic test']},
    {name: 'Pro', price: '₦600,000', popular: true, features: ['Full pentest']},
    {name: 'Enterprise', price: 'Custom', popular: false, features: ['Advanced testing']}
  ]
},
{
  category: 'Security',
  name: 'SSL Certificate Installation',
  desc: 'Secure your website with HTTPS encryption.',
  slug: 'ssl-certificate-installation',
  icon: '🔐',
  image: '/images/ssl.jpg',
  fullDesc: 'Install and configure SSL certificates to ensure encrypted communication.',
  features: ['SSL setup', 'HTTPS', 'Encryption'],
  benefits: ['Secure data', 'Trust'],
  pricing: [
    {name: 'Basic', price: '₦50,000', popular: false, features: ['Single domain']},
    {name: 'Pro', price: '₦120,000', popular: true, features: ['Multiple domains']},
    {name: 'Enterprise', price: 'Custom', popular: false, features: ['Enterprise setup']}
  ]
},
{
  category: 'Security',
  name: 'Database Security & Backup',
  desc: 'Protect and backup your database against data loss and breaches.',
  slug: 'database-security-backup',
  icon: '💾',
  image: '/images/database-security.jpg',
  fullDesc: 'Secure databases with encryption, access control, and automated backups.',
  features: ['Encryption', 'Backup', 'Access control'],
  benefits: ['Data safety', 'Recovery'],
  pricing: [
    {name: 'Basic', price: '₦150,000', popular: false, features: ['Basic backup']},
    {name: 'Pro', price: '₦400,000', popular: true, features: ['Advanced security']},
    {name: 'Enterprise', price: 'Custom', popular: false, features: ['Full system']}
  ]
},
{
  category: 'Security',
  name: 'Two-Factor Authentication (2FA) Setup',
  desc: 'Add an extra layer of security with two-factor authentication.',
  slug: 'two-factor-authentication-setup',
  icon: '📲',
  image: '/images/2fa.jpg',
  fullDesc: 'Implement 2FA systems to enhance user account security.',
  features: ['2FA setup', 'OTP', 'Security'],
  benefits: ['Account protection', 'Reduced risk'],
  pricing: [
    {name: 'Basic', price: '₦80,000', popular: false, features: ['Basic 2FA']},
    {name: 'Pro', price: '₦250,000', popular: true, features: ['Advanced 2FA']},
    {name: 'Enterprise', price: 'Custom', popular: false, features: ['Full system']}
  ]
},
{
  category: 'Security',
  name: 'Cybersecurity Monitoring',
  desc: 'Continuous monitoring of your systems for threats and attacks.',
  slug: 'cybersecurity-monitoring',
  icon: '👁️',
  image: '/images/monitoring.jpg',
  fullDesc: 'Real-time monitoring and alerts for suspicious activities and vulnerabilities.',
  features: ['Monitoring', 'Alerts', 'Threat detection'],
  benefits: ['Early detection', 'Security'],
  pricing: [
    {name: 'Basic', price: '₦100,000/month', popular: false, features: ['Basic monitoring']},
    {name: 'Pro', price: '₦300,000/month', popular: true, features: ['Advanced monitoring']},
    {name: 'Enterprise', price: 'Custom', popular: false, features: ['24/7 monitoring']}
  ]
},
{
  category: 'Security',
  name: 'Malware Removal & Cleanup',
  desc: 'Remove malicious code and restore your website security.',
  slug: 'malware-removal-cleanup',
  icon: '🧹',
  image: '/images/malware.jpg',
  fullDesc: 'Detect and remove malware, viruses, and security threats from your system.',
  features: ['Malware scan', 'Removal', 'Cleanup'],
  benefits: ['Clean system', 'Secure'],
  pricing: [
    {name: 'Basic', price: '₦100,000', popular: false, features: ['Basic cleanup']},
    {name: 'Pro', price: '₦300,000', popular: true, features: ['Deep cleanup']},
    {name: 'Enterprise', price: 'Custom', popular: false, features: ['Full recovery']}
  ]
},
{
  category: 'Security',
  name: 'Access Control & Role Management',
  desc: 'Manage user roles and permissions securely.',
  slug: 'access-control-role-management',
  icon: '👥',
  image: '/images/access-control.jpg',
  fullDesc: 'Implement secure access control systems with roles and permissions.',
  features: ['Role-based access', 'Permissions', 'Security'],
  benefits: ['Controlled access', 'Data protection'],
  pricing: [
    {name: 'Basic', price: '₦120,000', popular: false, features: ['Basic roles']},
    {name: 'Pro', price: '₦350,000', popular: true, features: ['Advanced roles']},
    {name: 'Enterprise', price: 'Custom', popular: false, features: ['Full system']}
  ]
},
{
  category: 'Security',
  name: 'Security Compliance Setup',
  desc: 'Ensure your system meets industry security standards.',
  slug: 'security-compliance-setup',
  icon: '📜',
  image: '/images/compliance.jpg',
  fullDesc: 'Set up systems to comply with standards like GDPR and best practices.',
  features: ['Compliance setup', 'Policies', 'Audit'],
  benefits: ['Legal safety', 'Trust'],
  pricing: [
    {name: 'Basic', price: '₦200,000', popular: false, features: ['Basic compliance']},
    {name: 'Pro', price: '₦500,000', popular: true, features: ['Full compliance']},
    {name: 'Enterprise', price: 'Custom', popular: false, features: ['Advanced']}
  ]
},
{
  category: 'Security',
  name: 'Cloud Security Setup',
  desc: 'Secure your cloud infrastructure and applications.',
  slug: 'cloud-security-setup',
  icon: '☁️',
  image: '/images/cloud-security.jpg',
  fullDesc: 'Implement security best practices for cloud platforms and services.',
  features: ['Cloud security', 'Access control', 'Monitoring'],
  benefits: ['Secure cloud', 'Data protection'],
  pricing: [
    {name: 'Basic', price: '₦250,000', popular: false, features: ['Basic setup']},
    {name: 'Pro', price: '₦700,000', popular: true, features: ['Advanced setup']},
    {name: 'Enterprise', price: 'Custom', popular: false, features: ['Full security']}
  ]
},

// =========================
// TRAINING
// =========================
{
  category: 'Training',
  name: 'Web Development Training',
  desc: 'Learn full-stack web development from beginner to advanced.',
  slug: 'web-development-training',
  icon: '🎓',
  image: '/images/training.jpg',
  fullDesc: 'Hands-on training covering frontend, backend, and real projects.',
  features: ['HTML', 'CSS', 'JS', 'React', 'Node'],
  benefits: ['Job-ready skills', 'Portfolio'],
  pricing: [
    {name: 'Basic', price: '₦100,000', popular: false, features: ['Beginner']},
    {name: 'Pro', price: '₦300,000', popular: true, features: ['Full course']},
    {name: 'Enterprise', price: 'Custom', popular: false, features: ['Mentorship']}
  ]
},
{
  category: 'Training',
  name: 'UI/UX Design Training',
  desc: 'Learn UI/UX design using Figma and real-world projects.',
  slug: 'ui-ux-design-training',
  icon: '🧠',
  image: '/images/uiux-training.jpg',
  fullDesc: 'Master UI/UX design principles, tools, and portfolio building.',
  features: ['Figma', 'Design systems', 'Projects'],
  benefits: ['Creative skills', 'Portfolio'],
  pricing: [
    {name: 'Basic', price: '₦80,000', popular: false, features: ['Intro']},
    {name: 'Pro', price: '₦250,000', popular: true, features: ['Full training']},
    {name: 'Enterprise', price: 'Custom', popular: false, features: ['1-on-1']}
  ]
},
{
  category: 'Training',
  name: 'Mobile App Development Training',
  desc: 'Learn how to build mobile apps using React Native.',
  slug: 'mobile-app-development-training',
  icon: '📱',
  image: '/images/mobile-training.jpg',
  fullDesc: 'Hands-on training for building cross-platform mobile apps with real projects.',
  features: ['React Native', 'APIs', 'Deployment'],
  benefits: ['App skills', 'Portfolio'],
  pricing: [
    {name: 'Basic', price: '₦120,000', popular: false, features: ['Beginner']},
    {name: 'Pro', price: '₦350,000', popular: true, features: ['Full training']},
    {name: 'Enterprise', price: 'Custom', popular: false, features: ['Mentorship']}
  ]
},
{
  category: 'Training',
  name: 'Backend Development Training',
  desc: 'Master backend development with Node.js and databases.',
  slug: 'backend-development-training',
  icon: '🗄️',
  image: '/images/backend-training.jpg',
  fullDesc: 'Learn how to build APIs, manage databases, and create secure backend systems.',
  features: ['Node.js', 'MongoDB', 'APIs'],
  benefits: ['Backend skills', 'Job ready'],
  pricing: [
    {name: 'Basic', price: '₦120,000', popular: false, features: ['Basics']},
    {name: 'Pro', price: '₦350,000', popular: true, features: ['Full backend']},
    {name: 'Enterprise', price: 'Custom', popular: false, features: ['Advanced']}
  ]
},
{
  category: 'Training',
  name: 'Frontend Development Training',
  desc: 'Learn modern frontend development with React and Tailwind.',
  slug: 'frontend-development-training',
  icon: '🎨',
  image: '/images/frontend-training.jpg',
  fullDesc: 'Master HTML, CSS, JavaScript, and React for building modern user interfaces.',
  features: ['HTML', 'CSS', 'React'],
  benefits: ['UI skills', 'Portfolio'],
  pricing: [
    {name: 'Basic', price: '₦100,000', popular: false, features: ['Basics']},
    {name: 'Pro', price: '₦300,000', popular: true, features: ['Advanced']},
    {name: 'Enterprise', price: 'Custom', popular: false, features: ['Mentorship']}
  ]
},
{
  category: 'Training',
  name: 'Full-Stack Development Bootcamp',
  desc: 'Become a full-stack developer with intensive training.',
  slug: 'fullstack-development-bootcamp',
  icon: '🚀',
  image: '/images/fullstack.jpg',
  fullDesc: 'Comprehensive bootcamp covering frontend, backend, and real-world projects.',
  features: ['Frontend', 'Backend', 'Projects'],
  benefits: ['Job ready', 'Full skills'],
  pricing: [
    {name: 'Basic', price: '₦200,000', popular: false, features: ['Starter']},
    {name: 'Pro', price: '₦500,000', popular: true, features: ['Complete']},
    {name: 'Enterprise', price: 'Custom', popular: false, features: ['Mentorship']}
  ]
},
{
  category: 'Training',
  name: 'JavaScript Mastery Training',
  desc: 'Master JavaScript from basics to advanced concepts.',
  slug: 'javascript-mastery-training',
  icon: '🟨',
  image: '/images/js.jpg',
  fullDesc: 'Deep dive into JavaScript, ES6+, async programming, and real-world usage.',
  features: ['ES6+', 'Async', 'Projects'],
  benefits: ['Strong JS skills', 'Confidence'],
  pricing: [
    {name: 'Basic', price: '₦80,000', popular: false, features: ['Basics']},
    {name: 'Pro', price: '₦250,000', popular: true, features: ['Advanced']},
    {name: 'Enterprise', price: 'Custom', popular: false, features: ['Mentorship']}
  ]
},
{
  category: 'Training',
  name: 'React Development Training',
  desc: 'Learn how to build modern apps with React.',
  slug: 'react-development-training',
  icon: '⚛️',
  image: '/images/react.jpg',
  fullDesc: 'Master React hooks, components, routing, and state management.',
  features: ['Hooks', 'Components', 'Routing'],
  benefits: ['Modern skills', 'Job ready'],
  pricing: [
    {name: 'Basic', price: '₦100,000', popular: false, features: ['Basics']},
    {name: 'Pro', price: '₦300,000', popular: true, features: ['Advanced']},
    {name: 'Enterprise', price: 'Custom', popular: false, features: ['Mentorship']}
  ]
},
{
  category: 'Training',
  name: 'Node.js & API Development Training',
  desc: 'Learn to build backend APIs with Node.js.',
  slug: 'node-api-training',
  icon: '🌐',
  image: '/images/node.jpg',
  fullDesc: 'Build REST APIs, authentication systems, and backend logic.',
  features: ['Node.js', 'APIs', 'Auth'],
  benefits: ['Backend skills', 'Real projects'],
  pricing: [
    {name: 'Basic', price: '₦120,000', popular: false, features: ['Basics']},
    {name: 'Pro', price: '₦350,000', popular: true, features: ['Advanced']},
    {name: 'Enterprise', price: 'Custom', popular: false, features: ['Mentorship']}
  ]
},
{
  category: 'Training',
  name: 'Database & MongoDB Training',
  desc: 'Learn how to design and manage databases.',
  slug: 'database-mongodb-training',
  icon: '🍃',
  image: '/images/mongodb.jpg',
  fullDesc: 'Master MongoDB, database design, and data management.',
  features: ['MongoDB', 'Schemas', 'Queries'],
  benefits: ['Data skills', 'Backend support'],
  pricing: [
    {name: 'Basic', price: '₦80,000', popular: false, features: ['Basics']},
    {name: 'Pro', price: '₦250,000', popular: true, features: ['Advanced']},
    {name: 'Enterprise', price: 'Custom', popular: false, features: ['Mentorship']}
  ]
},
{
  category: 'Training',
  name: 'Git & Version Control Training',
  desc: 'Learn Git, GitHub, and version control workflows.',
  slug: 'git-version-control-training',
  icon: '🔧',
  image: '/images/git.jpg',
  fullDesc: 'Understand version control, collaboration, and project management with Git.',
  features: ['Git', 'GitHub', 'Collaboration'],
  benefits: ['Team skills', 'Project tracking'],
  pricing: [
    {name: 'Basic', price: '₦50,000', popular: false, features: ['Basics']},
    {name: 'Pro', price: '₦150,000', popular: true, features: ['Advanced']},
    {name: 'Enterprise', price: 'Custom', popular: false, features: ['Team training']}
  ]
},
{
  category: 'Training',
  name: 'DevOps & Deployment Training',
  desc: 'Learn deployment, CI/CD, and DevOps basics.',
  slug: 'devops-deployment-training',
  icon: '⚙️',
  image: '/images/devops.jpg',
  fullDesc: 'Understand deployment pipelines, hosting, and DevOps tools.',
  features: ['CI/CD', 'Hosting', 'Docker'],
  benefits: ['Deployment skills', 'Automation'],
  pricing: [
    {name: 'Basic', price: '₦120,000', popular: false, features: ['Basics']},
    {name: 'Pro', price: '₦350,000', popular: true, features: ['Advanced']},
    {name: 'Enterprise', price: 'Custom', popular: false, features: ['Full DevOps']}
  ]
},
{
  category: 'Training',
  name: 'Freelancing & Tech Career Training',
  desc: 'Learn how to start and grow a tech career or freelance business.',
  slug: 'freelancing-tech-career-training',
  icon: '💼',
  image: '/images/freelance.jpg',
  fullDesc: 'Guidance on freelancing platforms, portfolio building, and client acquisition.',
  features: ['Freelancing', 'Portfolio', 'Clients'],
  benefits: ['Income skills', 'Career growth'],
  pricing: [
    {name: 'Basic', price: '₦70,000', popular: false, features: ['Intro']},
    {name: 'Pro', price: '₦200,000', popular: true, features: ['Full guide']},
    {name: 'Enterprise', price: 'Custom', popular: false, features: ['Mentorship']}
  ]
},
{
  category: 'Training',
  name: 'UI Animation & Interaction Training',
  desc: 'Learn how to create animations and interactions in UI design.',
  slug: 'ui-animation-training',
  icon: '✨',
  image: '/images/animation.jpg',
  fullDesc: 'Master micro-interactions and animations for modern UI/UX.',
  features: ['Animations', 'Transitions', 'Figma'],
  benefits: ['Modern UI skills', 'Better UX'],
  pricing: [
    {name: 'Basic', price: '₦80,000', popular: false, features: ['Basics']},
    {name: 'Pro', price: '₦250,000', popular: true, features: ['Advanced']},
    {name: 'Enterprise', price: 'Custom', popular: false, features: ['Mentorship']}
  ]
},
{
  category: 'Training',
  name: 'E-commerce Development Training',
  desc: 'Learn how to build and manage online stores.',
  slug: 'ecommerce-development-training',
  icon: '🛒',
  image: '/images/ecommerce-training.jpg',
  fullDesc: 'Build e-commerce platforms with payments, products, and management systems.',
  features: ['Cart', 'Payments', 'Products'],
  benefits: ['Business skills', 'Real projects'],
  pricing: [
    {name: 'Basic', price: '₦120,000', popular: false, features: ['Basics']},
    {name: 'Pro', price: '₦350,000', popular: true, features: ['Full store']},
    {name: 'Enterprise', price: 'Custom', popular: false, features: ['Mentorship']}
  ]
},
{
  category: 'Training',
  name: 'API & Integration Training',
  desc: 'Learn how to connect apps with APIs and services.',
  slug: 'api-integration-training',
  icon: '🔗',
  image: '/images/api-training.jpg',
  fullDesc: 'Understand APIs, integrations, and real-world use cases.',
  features: ['APIs', 'Integration', 'Projects'],
  benefits: ['Automation skills', 'Backend knowledge'],
  pricing: [
    {name: 'Basic', price: '₦80,000', popular: false, features: ['Basics']},
    {name: 'Pro', price: '₦250,000', popular: true, features: ['Advanced']},
    {name: 'Enterprise', price: 'Custom', popular: false, features: ['Mentorship']}
  ]
},
{
  category: 'Training',
  name: 'Tech Content Creation Training',
  desc: 'Learn how to create content for tech, coding, and tutorials.',
  slug: 'tech-content-creation-training',
  icon: '🎥',
  image: '/images/content-training.jpg',
  fullDesc: 'Create YouTube videos, tutorials, and tech content professionally.',
  features: ['Video creation', 'Editing', 'Publishing'],
  benefits: ['Personal brand', 'Monetization'],
  pricing: [
    {name: 'Basic', price: '₦60,000', popular: false, features: ['Intro']},
    {name: 'Pro', price: '₦200,000', popular: true, features: ['Full training']},
    {name: 'Enterprise', price: 'Custom', popular: false, features: ['Mentorship']}
  ]
},

// =========================
// IT & CLOUD SOLUTIONS
// =========================
{
  category: 'IT & Cloud Solutions',
  name: 'Cloud Infrastructure Setup',
  desc: 'Setup and configuration of AWS, Azure, or Google Cloud infrastructure.',
  slug: 'cloud-infrastructure-setup',
  icon: '☁️',
  image: '/images/cloud.jpg',
  fullDesc: 'Design and deploy scalable, secure, and cost-effective cloud architectures.',
  features: ['AWS/Azure/GCP', 'Architecture design', 'Migration'],
  benefits: ['Scalable', 'High availability', 'Cost-effective'],
  pricing: [
    {name: 'Basic', price: '₦300,000', popular: false, features: ['Basic setup']},
    {name: 'Pro', price: '₦800,000', popular: true, features: ['Advanced architecture']},
    {name: 'Enterprise', price: 'Custom', popular: false, features: ['Full migration']}
  ]
},
{
  category: 'IT & Cloud Solutions',
  name: 'IT Support & Maintenance',
  desc: 'Ongoing IT support for businesses to ensure smooth operations.',
  slug: 'it-support-maintenance',
  icon: '🖥️',
  image: '/images/it-support.jpg',
  fullDesc: 'Comprehensive IT support including troubleshooting, network management, and software updates.',
  features: ['24/7 Support', 'Network monitoring', 'Troubleshooting'],
  benefits: ['Reduced downtime', 'Smooth operations', 'Expert help'],
  pricing: [
    {name: 'Basic', price: '₦100,000/mo', popular: false, features: ['Email support']},
    {name: 'Pro', price: '₦250,000/mo', popular: true, features: ['Priority support']},
    {name: 'Enterprise', price: 'Custom', popular: false, features: ['Dedicated team']}
  ]
},
{
  category: 'IT & Cloud Solutions',
  name: 'Data Backup & Disaster Recovery',
  desc: 'Secure data backup solutions and disaster recovery planning.',
  slug: 'data-backup-disaster-recovery',
  icon: '💾',
  image: '/images/data-backup.jpg',
  fullDesc: 'Automated data backup strategies and comprehensive disaster recovery plans to protect business continuity.',
  features: ['Automated backups', 'Recovery planning', 'Encryption'],
  benefits: ['Data safety', 'Business continuity', 'Peace of mind'],
  pricing: [
    {name: 'Basic', price: '₦150,000', popular: false, features: ['Daily backups']},
    {name: 'Pro', price: '₦400,000', popular: true, features: ['Real-time backups']},
    {name: 'Enterprise', price: 'Custom', popular: false, features: ['Full failover']}
  ]
}
];
