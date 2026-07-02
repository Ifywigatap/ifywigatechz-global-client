export const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

export const cardVariants = {
  hidden: { opacity: 0, y: 10 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export const categories = [
  {
    title: 'Web Development',
    desc: 'Modern websites & full-stack applications',
    link: '/web-dev',
    img: 'https://res.cloudinary.com/dufcon4jl/image/upload/v1776683262/WEBD_buv4lb.png',
  },
  {
    title: 'UI / UX Design',
    desc: 'User-centered digital experiences',
    link: '/ui-ux',
    img: 'https://res.cloudinary.com/dufcon4jl/image/upload/v1776683256/UIUX_qlwhqs.png',
  },
  {
    title: 'Real Estate Solutions',
    desc: 'Property platforms & listings',
    link: '/real-estate',
    img: 'https://res.cloudinary.com/dufcon4jl/image/upload/v1776684577/4-bedrm-dupx5_l5ekzo.jpg',
  },
  {
    title: 'E-commerce Stores',
    desc: 'Online retail platforms & payment solutions',
    link: '/ecommerce',
    img: 'https://res.cloudinary.com/dufcon4jl/image/upload/v1776683230/e-commerce_ncwjvy.jpg',
  },
  {
    title: 'Academy & Learning',
    desc: 'Courses, mentorship & roadmaps',
    link: '/learn',
    img: 'https://res.cloudinary.com/dufcon4jl/image/upload/v1776683238/learn_pjj1mu.png',
  },
  {
    title: 'Projects & Portfolio',
    desc: 'Real-world solutions & case studies',
    link: '/projects',
    img: 'https://res.cloudinary.com/dufcon4jl/image/upload/v1776683248/projects_wvchdt.png',
  },
];

export const heroActions = [
  { label: 'View Projects', href: '/projects', style: 'bg-blue-600 hover:bg-blue-700' },
  { label: 'Join Academy', href: '/learn', style: 'bg-purple-600 hover:bg-purple-700' },
  { label: 'E-Commerce Store', href: '/ecommerce', style: 'bg-indigo-600 hover:bg-indigo-700' },
  { label: 'Real Estate', href: '/real-estate', style: 'bg-slate-700 hover:bg-slate-800' },
];

export const stats = [
  { title: '20+', desc: 'Projects' },
  { title: 'MERN', desc: 'Stack' },
  { title: 'UI/UX', desc: 'Design' },
  { title: 'SEO', desc: 'Marketing' },
];

export const whyChoose = [
  {
    icon: '🚀',
    title: 'Hands-on Projects',
    desc: 'Build real, production-ready applications from day one. Every course includes capstone projects.',
  },
  {
    icon: '👨‍🏫',
    title: 'Expert Mentors',
    desc: 'Learn from industry professionals with 5+ years of experience building products at scale.',
  },
  {
    icon: '💼',
    title: 'Career Support',
    desc: 'Resume review, interview prep, and direct introductions to hiring partners.',
  },
  {
    icon: '⏱️',
    title: 'Flexible Learning',
    desc: 'Learn at your own pace with lifetime access to course materials and updates.',
  },
];

export const courses = [
  {
    title: 'Full-Stack Web Development (MERN)',
    desc: 'Build modern web apps using MongoDB, Express, React, and Node.js.',
    img: 'https://res.cloudinary.com/dufcon4jl/image/upload/q_auto/f_auto/v1776686710/fullstack_bolceo.png',
    tags: ['Beginner - Advanced', '12 Weeks'],
    link: '/learn',
  },
  {
    title: 'SEO & Digital Marketing',
    desc: 'Learn how to optimize websites for search engines and run effective digital marketing campaigns.',
    img: 'https://res.cloudinary.com/dufcon4jl/image/upload/q_auto/f_auto/v1776686587/digital_marketing_zyok1m.png',
    tags: ['Beginner - Intermediate', '8 Weeks'],
    link: '/learn',
  },
  {
    title: 'Mobile App UI/UX Design with Figma',
    desc: 'Design intuitive mobile interfaces and user experiences.',
    img: 'https://res.cloudinary.com/dufcon4jl/image/upload/q_auto/f_auto/v1776686665/figma-ui_nudlay.png',
    tags: ['Beginner - Advanced', '6 Weeks'],
    link: '/learn',
  },
  {
    title:'JavaScript Mastery',
    desc: 'Master JavaScript fundamentals and advanced concepts for web development.',
    img: 'https://res.cloudinary.com/dufcon4jl/image/upload/q_auto/f_auto/v1776686797/javascript_mml1lw.png',
    tags: ['Beginner - Advanced', '6 Weeks'],
    link: '/learn',
  },
  {
    title: 'AI & Machine Learning',
    desc: 'Learn the basics of AI, machine learning, and how to build intelligent applications.',
    img: 'https://res.cloudinary.com/dufcon4jl/image/upload/q_auto/f_auto/v1776686828/machine-learning_o3b9s3.png',
    tags: ['Beginner - Intermediate', '10 Weeks'],
    link: '/learn',
  },
  {
    title: 'Ethical Hacking & Penetration Testing',
    desc: 'Learn how to identify and exploit security vulnerabilities ethically.',
    img: 'https://res.cloudinary.com/dufcon4jl/image/upload/q_auto/f_auto/v1776686654/ethical-hacking_jbs5qz.png',
    tags: ['Intermediate - Advanced', '8 Weeks'],
    link: '/learn',
  },
];