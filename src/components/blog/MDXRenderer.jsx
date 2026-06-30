import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";
import CodeBlock from "./CodeBlock";

// Code Block with Copy
function CodeBlock({ children }) {
  const code = String(children).trim();

  const copy = () => {
    navigator.clipboard.writeText(code);
  };

  return (
    <div className="relative group my-6">
      <button
        onClick={copy}
        className="absolute top-2 right-2 text-xs bg-neutral-700 px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition"
      >
        Copy
      </button>

      <pre className="bg-neutral-900 p-4 rounded-xl overflow-x-auto">
        <code>{code}</code>
      </pre>
    </div>
  );
}

export default function MDXRenderer({ content }) {
  return (
    <article className="prose prose-invert max-w-none">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeHighlight]}
        components={{
          h2: ({ children }) => {
            const id = children.toString().toLowerCase().replace(/\s+/g, "-");
            return (
              <h2 id={id} className="scroll-mt-24 text-2xl font-bold mt-10">
                {children}
              </h2>
            );
          },

          h3: ({ children }) => {
            const id = children.toString().toLowerCase().replace(/\s+/g, "-");
            return (
              <h3 id={id} className="scroll-mt-24 text-xl font-semibold mt-6">
                {children}
              </h3>
            );
          },

          p: (props) => (
            <p className="text-neutral-300 leading-relaxed mt-4" {...props} />
          ),

          ul: (props) => (
            <ul className="list-disc pl-6 mt-4 space-y-2" {...props} />
          ),

          ol: (props) => (
            <ol className="list-decimal pl-6 mt-4 space-y-2" {...props} />
          ),

          blockquote: (props) => (
            <blockquote className="border-l-4 border-brandBlue pl-4 italic text-neutral-400 mt-4" {...props} />
          ),

          code({ inline, children }) {
            return inline ? (
              <code className="bg-neutral-800 px-1 rounded">
                {children}
              </code>
            ) : (
              <CodeBlock>{children}</CodeBlock>
            );
          },
        }}
      >
        {content}
      </ReactMarkdown>
    </article>
  );
}