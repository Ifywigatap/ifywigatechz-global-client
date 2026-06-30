import { useEffect, useState } from "react";

export default function BlogLayout({ children, content }) {
  const [progress, setProgress] = useState(0);
  const [headings, setHeadings] = useState([]);
  const [activeId, setActiveId] = useState("");

  // 📊 Reading Progress
  useEffect(() => {
    const handleScroll = () => {
      const totalHeight =
        document.documentElement.scrollHeight -
        document.documentElement.clientHeight;

      const scroll = window.scrollY;
      setProgress((scroll / totalHeight) * 100);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // 📑 Extract Headings (for TOC)
  useEffect(() => {
    const elements = Array.from(
      document.querySelectorAll("article h2, article h3")
    );

    const mapped = elements.map((el) => ({
      id: el.id,
      text: el.innerText,
      level: el.tagName,
    }));

    setHeadings(mapped);
  }, [content]);

  // 🎯 Scroll Spy
  useEffect(() => {
    const elements = document.querySelectorAll("article h2, article h3");

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { rootMargin: "-40% 0px -50% 0px" }
    );

    elements.forEach((el) => observer.observe(el));

    return () => elements.forEach((el) => observer.unobserve(el));
  }, [headings]);

  return (
    <section className="relative">
      {/* 🔥 Progress Bar */}
      <div className="fixed top-0 left-0 w-full h-1 bg-neutral-800 z-50">
        <div
          className="h-full bg-brandBlue transition-all"
          style={{ width: `${progress}%` }}
        />
      </div>

      <div className="container-wide grid grid-cols-1 lg:grid-cols-4 gap-10">
        
        {/* 📑 Sidebar TOC */}
        <aside className="hidden lg:block lg:col-span-1">
          <div className="sticky top-24 space-y-4">
            <h3 className="text-sm font-semibold text-neutral-400 uppercase tracking-wider">
              Contents
            </h3>

            <ul className="space-y-2 text-sm">
              {headings.map((h) => (
                <li
                  key={h.id}
                  className={`transition ${
                    activeId === h.id
                      ? "text-brandGold font-semibold"
                      : "text-neutral-500"
                  }`}
                  style={{
                    paddingLeft: h.level === "H3" ? "12px" : "0px",
                  }}
                >
                  <a href={`#${h.id}`} className="hover:text-brandGold">
                    {h.text}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </aside>

        {/* 📝 Main Article */}
        <div className="lg:col-span-3 max-w-3xl w-full mx-auto">
          {children}
        </div>
      </div>
    </section>
  );
}