export const COURSE = {
  id: 'data-analytics',
  title: 'Data Analytics Training',
  price: 120000,
  duration: '12 Weeks',
  level: 'Beginner to Advanced',
  badge: 'High Demand'
};

export const MODULES = [
  {
    id: "01",
    icon: "01",
    title: "Excel & Advanced Spreadsheets",
    description: "Master formulas, pivot tables, and data cleaning techniques.",
    duration: "2 Weeks",
    badge: "Free preview",
    locked: false,
    videoId: "dQw4w9WgXcQ",
    content: "Learn the foundational skills of data analytics using Microsoft Excel. We will cover data cleaning, Pivot Tables, VLOOKUP, and complex nested formulas to analyze real-world datasets."
  },
  {
    id: "02",
    icon: "02",
    title: "SQL & Databases",
    description: "Learn to query databases, join tables, and manage data efficiently.",
    duration: "3 Weeks",
    badge: "Core module",
    locked: true,
    videoId: "",
    content: "Master Structured Query Language (SQL). You will learn how to write complex queries, perform joins, aggregate data, and manage relational databases using PostgreSQL and MySQL."
  },
  {
    id: "03",
    icon: "03",
    title: "Python for Data Science",
    description: "Analyze data using Pandas, NumPy, and Matplotlib.",
    duration: "4 Weeks",
    badge: "Core module",
    locked: true,
    videoId: "",
    content: "Dive into Python programming tailored for data analysis. Utilize powerful libraries like Pandas for data manipulation, NumPy for numerical operations, and Matplotlib/Seaborn for creating insightful visualizations."
  },
  {
    id: "04",
    icon: "04",
    title: "Data Visualization",
    description: "Create interactive dashboards using PowerBI and Tableau.",
    duration: "3 Weeks",
    badge: "Core module",
    locked: true,
    videoId: "",
    content: "Translate data into compelling visual stories. Learn how to design and build interactive business intelligence dashboards using industry-standard tools like Power BI and Tableau."
  },
];

export const getModules = (user) => {
  const paid = user?.dataAnalyticsCoursePaid;
  return MODULES.map(module => ({
    ...module,
    locked: paid ? false : module.locked
  }));
};

export const OUTCOMES = [
  "Real-world datasets and case studies",
  "Portfolio-building capstone projects",
  "Expert mentorship and code reviews",
  "Career guidance and interview prep",
  "Globally recognized certification upon completion",
  "Lifetime access to community and resources",
];

export const FAQS = [
  { q: "Do I need prior coding experience?", a: "No prior coding experience is required. We start from the basics of Excel and gradually introduce SQL and Python." },
  { q: "What tools will I learn?", a: "You will master Excel, SQL, Python (Pandas, NumPy), and data visualization tools like PowerBI and Tableau." },
  { q: "Is there a capstone project?", a: "Yes, you will complete a real-world capstone project to include in your portfolio and demonstrate your skills to employers." },
  { q: "Do I get a certificate upon completion?", a: "Absolutely! You will receive a verifiable certificate of completion that you can share on LinkedIn and with prospective employers." }
];