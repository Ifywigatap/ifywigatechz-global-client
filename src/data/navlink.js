import {
  Code,
  Shield,
  BarChart2,
  PenTool,
  Layers,
  Briefcase,
  BookOpen,
  Users,
  LifeBuoy,
  FileText,
  Rocket,
  ShoppingCart,
  Home,
  Cpu,
  Phone,
  MonitorPlay,
  ToolCase,
  Link as LinkIcon,
  Gift,
  Zap,
  Sparkles
} from "lucide-react";

export const navLinks = [
  //////////////////////////////////////////////////////
  // SERVICES
  //////////////////////////////////////////////////////
  {
    name: "Services",
    mega: {
      sections: [
        {
          title: "Core Services",
          links: [
            { label: "All Services", to: "/services", icon: ToolCase, desc: "Explore our full range of solutions" },
            { label: "Web Development", to: "/web-dev", icon: Code, desc: "Custom MERN stack applications", badge: "New" },
            { label: "UI/UX Design", to: "/ui-ux", icon: PenTool, desc: "User-centered design systems" },
            { label: "E-Commerce Store", to: "/ecommerce", icon: ShoppingCart, desc: "Scalable online retail platforms" },
            { label: "Real Estate Platform", to: "/real-estate", icon: Home, desc: "Property listing & CRM systems" },
            { label: "Corporate Training", to: "/corporate-training", icon: Briefcase, desc: "Upskill your workforce today" },
          ],
        },
        {
          title: "Explore",
          links: [
            { label: "Projects & Portfolio", to: "/projects", icon: MonitorPlay, desc: "Browse our latest work" },
            { label: "Case Studies", to: "/case-studies", icon: FileText, desc: "Real results for real clients" },
            { label: "Industries", to: "/industries", icon: Layers, desc: "Specialized sector solutions" },
          ],
        },
      ],

      featured: {
        title: "Build Modern Solutions",
        desc: "We design and develop scalable digital products.",
        cta: "View Services",
        to: "/services",
        icon: Rocket,
      },
      secondaryFeatured: {
        label: "OFFER",
        title: "20% off all UI/UX Audits",
        to: "/start-project",
        icon: Gift,
      },
    },
  },

//////////////////////////////////////////////////////
  // LEARN
  //////////////////////////////////////////////////////
  {
    name: "Learn",
    mega: {
      sections: [
        {
          title: "Programs",
          links: [
            { label: "Graphic Design", to: "/graphic", icon: PenTool, desc: "Master Figma and Adobe suite" },
            { label: "Microsoft Training", to: "/microsoft", icon: Layers, desc: "Azure & Office 365 Mastery" },
            { label: "IT Support", to: "/it", icon: Code, desc: "Fundamentals of IT management" },
            { label: "Cybersecurity", to: "/cybersecurity", icon: Shield, desc: "Beginner to Pro security track", badge: "Hot" },
            { label: "Data Analytics", to: "/data-analytics", icon: BarChart2, desc: "Insight-driven data training" },
            { label: "AI & Machine Learning", to: "/ai", icon: Cpu, desc: "Building the future with AI", badge: "New" },
            { label: "Web3 & Blockchain", to: "/web3", icon: LinkIcon, desc: "Decentralized app development" },
            { label: "PPMVS Training", to: "/ppmvs", icon: BookOpen, desc: "Formal NAPPMED certifications" }
          ],
        },
        {
          title: "Learning Paths",
          links: [
            { label: "Beginner Track", to: "/learn?level=beginner", icon: Rocket, desc: "Start your journey here" },
            { label: "Intermediate Track", to: "/learn?level=intermediate", icon: Rocket, desc: "Level up your skills" },
            { label: "Advanced Track", to: "/learn?level=advanced", icon: Rocket, desc: "Master complex concepts" },
            { label: "Career Path", to: "/learn?path=career", icon: Briefcase, desc: "Job-ready specialized training" },
          ],
        },
      ],

      featured: {
        title: "Upgrade Your Skills",
        desc: "Learn in-demand tech skills with hands-on training.",
        cta: "Start Learning",
        to: "/learn",
        icon: Rocket,
      },
      secondaryFeatured: {
        label: "FREEBIE",
        title: "Download MERN Starter Guide",
        to: "/free-resources",
        icon: Sparkles,
      },
    },
  },

  //////////////////////////////////////////////////////
  // COMPANY
  //////////////////////////////////////////////////////
  {
    name: "Company",
    mega: {
      sections: [
        {
          title: "About Us",
          links: [
            { label: "About", to: "/about", icon: Users, desc: "Our mission and vision" },
            { label: "Team", to: "/team", icon: Users, desc: "Meet the experts behind Ify" },
            { label: "Careers", to: "/careers", icon: Briefcase, desc: "Join our growing team" },
            { label: "Contact Us", to: "/contact", icon: Phone, desc: "Get in touch with support" },
          ],
        },
        {
          title: "Social Proof",
          links: [
            { label: "Success Stories", to: "/success-stories", icon: FileText, desc: "How our students transformed" },
            { label: "Testimonials", to: "/testimonials", icon: FileText, desc: "What our clients are saying" },
          ],
        },
      ],

      featured: {
        title: "Join Our Journey",
        desc: "We’re building the future of tech education.",
        cta: "Contact Us",
        to: "/contact",
        icon: Rocket,
      },
      secondaryFeatured: {
        label: "CAREERS",
        title: "We are hiring developers!",
        to: "/careers",
        icon: Zap,
      },
    },
  },

  //////////////////////////////////////////////////////
  // RESOURCES
  //////////////////////////////////////////////////////
  {
    name: "Resources",
    mega: {
      sections: [
        {
          title: "Content",
          links: [
            { label: "Blog", to: "/blog", icon: FileText, desc: "Latest tech news and tutorials" },
            { label: "Events & Webinars", to: "/events", icon: BookOpen, desc: "Join our live sessions" },
            { label: "Free Resources", to: "/free-resources", icon: Layers, desc: "Ebooks, kits, and checklists" },
          ],
        },
        {
          title: "Support",
          links: [
            { label: "FAQ", to: "/faq", icon: LifeBuoy, desc: "Quick answers to common questions" },
            { label: "Help Center", to: "/help", icon: LifeBuoy, desc: "Get technical assistance" },
            { label: "How It Works", to: "/how-it-works", icon: FileText, desc: "Our process and methodology" },
          ],
        },
      ],

      featured: {
        title: "Explore Resources",
        desc: "Guides, tools, and insights to help you grow.",
        cta: "Browse Resources",
        to: "/free-resources",
        icon: Rocket,
      },
      secondaryFeatured: {
        label: "JOIN",
        title: "Join our student community",
        to: "/community",
        icon: Sparkles,
      },
    },
  },

  //////////////////////////////////////////////////////
  // PRICING
  //////////////////////////////////////////////////////
  {
    name: "Pricing",
    path: "/pricing",
  },
];