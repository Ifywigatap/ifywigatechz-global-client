import { useState } from "react";

export default function CodeBlock({ children }) {
  const [copied, setCopied] = useState(false);

  const code = String(children).trim();

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Copy failed", err);
    }
  };

  return (
    <div className="relative group my-6">
      {/* Copy Button */}
      <button
        onClick={handleCopy}
        className="absolute top-3 right-3 text-xs px-3 py-1.5 rounded-md
                   bg-neutral-800 text-neutral-300
                   opacity-0 group-hover:opacity-100
                   transition"
      >
        {copied ? "Copied ✓" : "Copy"}
      </button>

      {/* Code */}
      <pre className="bg-neutral-950 border border-neutral-800 p-4 rounded-xl overflow-x-auto">
        <code className="text-sm text-neutral-200">{code}</code>
      </pre>
    </div>
  );
}