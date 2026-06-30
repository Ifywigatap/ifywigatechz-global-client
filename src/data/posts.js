export const posts = [
  {
    slug: "how-i-built-a-fast-portfolio-with-vite-tailwind",
    title: "How I Built a Fast Portfolio with Vite + Tailwind",
    date: "2025-09-05",
    updatedAt: "2025-09-06",
    excerpt: "Why Vite + Tailwind for speed and DX.",
    content: `
## Why I Chose Vite + Tailwind

Vite + Tailwind keeps development **fast** and production **lean**.

### Key Reasons
- ⚡ Instant dev server
- 🎨 Utility-first styling
- 📦 Optimized builds

### Deployment
The project was deployed on **Vercel** with proper SPA rewrites, ensuring:
- Fast global CDN delivery
- Smooth client-side routing
- Zero-config scaling

\`\`\`bash
npm run build
vercel --prod
\`\`\`
    `,
    category: "Web Development",
    tags: ["Vite", "Tailwind", "Frontend", "Performance"],
    author: "Ify Wigatap",
    coverImage: "/images/blog/vite-tailwind.jpg",
    featured: true,
    status: "published",
  },

  {
    slug: "getting-started-with-mern-in-2025",
    title: "Getting Started with MERN in 2025",
    date: "2025-08-18",
    excerpt: "Roadmap from zero to MERN.",
    content: `
## MERN Roadmap (2025 Edition)

If you're starting today, **clarity matters more than tools**.

### Step-by-Step Path
1. HTML & CSS fundamentals
2. Modern JavaScript (ES6+)
3. React (Hooks, Router, State)
4. Node.js & Express
5. MongoDB & APIs

### Build, Ship, Iterate
> Learning sticks when you **build real projects** and deploy them.

\`\`\`js
const stack = ["MongoDB", "Express", "React", "Node"];
console.log(stack.join(" + "));
\`\`\`
    `,
    category: "Web Development",
    tags: ["MERN", "Backend", "React"],
    author: "Ify Wigatap",
    coverImage: "/images/blog/mern.jpg",
    featured: false,
    status: "published",
  },

  {
    slug: "ui-ux-checklist-for-small-business-websites",
    title: "UI/UX Checklist for Small Business Websites",
    date: "2025-07-30",
    excerpt: "High-impact UI/UX items.",
    content: `
## UI/UX Checklist That Converts

Great design is about **clarity**, not decoration.

### Must-Have Elements
- Clear value proposition
- Strong call-to-action (CTA)
- Mobile-first layout
- Fast loading speed
- Social proof & testimonials
- Easy contact access

### Pro Tip
> If users think too much, they **leave**.

Design for **speed, trust, and simplicity**.
    `,
    category: "UI/UX Design",
    tags: ["UX", "Design", "Conversion"],
    author: "Ify Wigatap",
    coverImage: "/images/blog/uiux.jpg",
    featured: false,
    status: "published",
  },
];