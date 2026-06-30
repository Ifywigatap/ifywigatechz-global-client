export const galleryProjects = [
  {
    id: "kinglaw-paradise-builders",
    title: "KingLaw Paradise Builders",
    desc: "Corporate construction website deployed on Vercel with clean architecture and mobile-first UI.",
    img: "/Kinglaw.png",
    tags: ["Construction", "Corporate", "Live"],
    link: "https://www.kinglawparadisebuilders.com"
  },
  {
    id: "oluma-stamped-concrete",
    title: "Oluma Stamped Concrete",
    desc: "Brand portfolio with gallery, service pages, and customer conversion CTAs.",
    img: "/Stamped.png",
    tags: ["Portfolio", "Branding"],
    link: "#"
  },
  {
    id: "nwabest-plumbers",
    title: "Nwabest Plumbers",
    desc: "Business website with service pages and customer CTAs.",
    img: "/NwabestPlumbers.png",
    tags: ["Business", "Services"],
    link: "https://nwabest-plumbers.vercel.app/"
  },
  {
    id: "couch-store",
    title: "Couch Store",
    desc: "E-commerce site for furniture with cart and pricing.",
    img: "/couch.jpg",
    tags: ["E-commerce", "Furniture"],
    link: "https://couches-store.vercel.app/"
  },
  {
    id: "sandhub-sand-dumps",
    title: "SandHub Sand Dumps",
    desc: "Sand sales site with ordering and WhatsApp CTAs.",
    img: "/sand.png",
    tags: ["Sales", "Business"],
    link: "https://sand-dumps.vercel.app/"
  }
];

export const teamMembers = [
  {
    id: "ifeanyichukwu-oko-isu",
    name: "Ifeanyichukwu Oko Isu",
    role: "Founder & Full-Stack Developer",
    img: "/Isu.jpg",
    skills: ["React", "Node.js", "MongoDB", "Express.js", "Tailwind CSS", "UI/UX Design", "Cloud Deployment", "API Development"],
    projects: ["kinglaw-paradise-builders", "nwabest-plumbers", "couch-store", "sandhub-sand-dumps"], // Using slugs from galleryProjects
    bio: "Full-Stack Developer, UI/UX Designer, Digital Trainer. Building scalable web solutions and empowering African tech talent.",
    social: {
      whatsapp: { url: "https://wa.me/2348113722088", label: "Chat on WhatsApp" },
      twitter: { url: "https://x.com/OkIfeanyichukwu", label: "Follow on X (Twitter)" }
    }
  },
  {
    id: "chidera-okoro",
    name: "Chidera Okoro",
    role: "UI/UX Designer",
    img: "/images/designer-placeholder.jpg", // Use existing or public placeholder
    skills: ["Figma", "Adobe XD", "User Research", "Prototyping", "Design Systems", "Wireframing"],
    projects: ["oluma-stamped-concrete"],
    bio: "Creative designer specializing in user-centered interfaces and modern design systems.",
    social: { twitter: { url: "#", label: "Follow on X (Twitter)" } }
  },
  {
    id: "emeka-nwosu",
    name: "Emeka Nwosu",
    role: "Backend Engineer",
    img: "/images/backend-placeholder.jpg",
    skills: ["Node.js", "Express.js", "MongoDB", "PostgreSQL", "AWS", "API Development", "Microservices"],
    projects: [], // No specific projects linked for this placeholder
    bio: "Node.js & database expert building robust APIs and scalable architectures.",
    social: { github: { url: "#", label: "View on GitHub" } }
  },
  {
    id: "adaobi-eze",
    name: "Adaobi Eze",
    role: "Frontend Developer",
    img: "/images/frontend-placeholder.jpg",
    skills: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Gatsby", "Performance Optimization"],
    projects: [], // No specific projects linked for this placeholder
    bio: "React specialist creating responsive, performant user interfaces.",
    social: { linkedin: { url: "#", label: "Connect on LinkedIn" } }
  }
];

export const careerJobs = [
  {
    title: "Senior Full-Stack Developer",
    desc: "Lead development of our SaaS platform using React, Node.js, and MongoDB.",
    skills: ["React", "Node.js", "MongoDB", "Tailwind", "AWS"],
    type: "Full-time",
    salary: "₦400,000 - ₦600,000/month",
    apply: "mailto:careers@ifywigatechz.com?subject=Senior Full-Stack Application"
  },
  {
    title: "UI/UX Designer",
    desc: "Design intuitive interfaces for web and mobile applications.",
    skills: ["Figma", "Adobe XD", "User Research", "Prototyping"],
    type: "Full-time",
    salary: "₦250,000 - ₦400,000/month",
    apply: "mailto:careers@ifywigatechz.com?subject=UI/UX Designer Application"
  },
  {
    title: "Frontend Developer (Freelance)",
    desc: "Build responsive React components for client projects.",
    skills: ["React", "Tailwind CSS", "Framer Motion"],
    type: "Freelance",
    salary: "₦3,000 - ₦5,000/hour",
    apply: "https://wa.me/2348113722088?text=Frontend Freelance Application"
  },
  {
    title: "DevOps Engineer",
    desc: "Manage CI/CD pipelines, cloud infrastructure, and deployments.",
    skills: ["Docker", "AWS", "Vercel", "GitHub Actions"],
    type: "Full-time",
    salary: "₦350,000 - ₦550,000/month",
    apply: "mailto:careers@ifywigatechz.com?subject=DevOps Application"
  }
];
