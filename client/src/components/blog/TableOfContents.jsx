import { useEffect, useState } from "react";

export default function TableOfContent({ content }) {
  const [headings, setHeadings] = useState([]);
  const [active, setActive] = useState("");

  // Extract headings from markdown
  useEffect(() => {
    const lines = content.split("\n");

    const extracted = lines
      .filter((line) => line.startsWith("##") || line.startsWith("###"))
      .map((line) => {
        const level = line.startsWith("###") ? 3 : 2;
        const text = line.replace(/^###?\s/, "").trim();
        const id = text.toLowerCase().replace(/\s+/g, "-");

        return { id, text, level };
      });

    setHeadings(extracted);
  }, [content]);

  // Track scroll position
  useEffect(() => {
    const handleScroll = () => {
      let current = "";

      headings.forEach((h) => {
        const el = document.getElementById(h.id);
        if (el) {
          const top = el.getBoundingClientRect().top;
          if (top < 120) current = h.id;
        }
      });

      setActive(current);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [headings]);

  if (headings.length === 0) return null;

  return (
    <aside className="hidden lg:block sticky top-24 h-fit w-64">
      <div className="border border-neutral-800 rounded-xl p-4 bg-neutral-950">
        <h4 className="text-sm font-semibold text-neutral-400 mb-3">
          On this page
        </h4>

        <ul className="space-y-2 text-sm">
          {headings.map((h) => (
            <li
              key={h.id}
              className={`transition ${
                active === h.id
                  ? "text-brandGold"
                  : "text-neutral-400 hover:text-white"
              } ${h.level === 3 ? "ml-4" : ""}`}
            >
              <a href={`#${h.id}`}>{h.text}</a>
            </li>
          ))}
        </ul>
      </div>
    </aside>
  );
}