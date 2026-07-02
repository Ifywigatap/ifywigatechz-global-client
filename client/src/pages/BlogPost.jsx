import { useParams, Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { useEffect, useState, useMemo } from "react";
import { blogService } from "../services/blog";
import Toast from "../components/Toast";

export default function BlogPost() {
  const { slug } = useParams();
  const [post, setPost] = useState(null);
  const [relatedPosts, setRelatedPosts] = useState([]);
  const [progress, setProgress] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [toast, setToast] = useState(null);

  // Fetch blog post and related posts
  useEffect(() => {
    const fetchPost = async () => {
      try {
        setLoading(true);
        setError("");
        const response = await blogService.getPostBySlug(slug);
        setPost(response.data);

        // Fetch related posts
        if (response.data && response.data.category) {
          const relatedResponse = await blogService.getAllPosts(1, 100);
          const related = (relatedResponse.data || [])
            .filter(
              (p) =>
                p.slug !== slug &&
                p.category === response.data.category
            )
            .slice(0, 3);
          setRelatedPosts(related);
        }
      } catch (err) {
        setError(err.message || "Failed to load article");
        console.error("Error fetching post:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [slug]);

  // Reading progress
  useEffect(() => {
    const handleScroll = () => {
      const totalHeight =
        document.documentElement.scrollHeight -
        document.documentElement.clientHeight;

      const scroll = window.scrollY;
      const percent = (scroll / totalHeight) * 100;

      setProgress(percent);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Fallback
  if (loading) {
    return (
      <section className="section max-w-3xl space-y-4 container-wide text-center">
        <p className="text-neutral-400 text-lg">Loading article...</p>
      </section>
    );
  }

  if (error || !post) {
    return (
      <section className="section max-w-3xl space-y-4 container-wide text-center">
        <p className="text-neutral-400 text-lg">
          {error || "This article does not exist or is not yet published."}
        </p>
        <Link to="/blog" className="text-brandBlue hover:text-brandGold">
          ← Back to Blog
        </Link>
      </section>
    );
  }

  // Reading time
  const words = (post.content || "").trim().split(/\s+/).length;
  const readTime = Math.max(1, Math.ceil(words / 200));

  const currentUrl =
    typeof window !== "undefined" ? window.location.href : "";

  // Generate Table of Contents (simple headings detection)
  const headings = useMemo(() => {
    return (post.content?.match(/^(##|###)\s.+$/gm) || []).map((h) =>
      h.replace(/^##+\s/, "")
    );
  }, [post?.content]);

  // Copy link
  const copyLink = () => {
    navigator.clipboard.writeText(currentUrl);
    setToast({ message: "Link copied to clipboard!", type: "success" });
    setTimeout(() => setToast(null), 3000);
  };

  return (
    <section className="section max-w-4xl space-y-10 container-wide">
      {/* Progress Bar */}
      <div className="fixed top-0 left-0 w-full h-1 bg-neutral-800 z-50">
        <div
          className="h-full bg-brandBlue transition-all"
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* SEO */}
      <Helmet>
        <title>{post.title} — Ifywigatechz</title>
        <meta name="description" content={post.excerpt} />
      </Helmet>

      {/* Back */}
      <Link
        to="/blog"
        className="text-sm text-brandBlue hover:text-brandGold"
      >
        ← Back to Blog
      </Link>

      {/* Header */}
      <header className="space-y-5">
        {post.category && (
          <span className="bg-brandBlue/10 px-3 py-1 text-xs text-brandBlue rounded-full">
            {post.category}
          </span>
        )}

        <h1 className="text-4xl md:text-5xl font-extrabold text-brandBlue">
          {post.title}
        </h1>

        <div className="flex gap-3 text-sm text-neutral-500">
          <span>{new Date(post.date).toDateString()}</span>
          <span>•</span>
          <span>{readTime} min read</span>
          <span>•</span>
          <span>By {post.author || "Guest Author"}</span>
        </div>
      </header>

      {/* TOC */}
      {headings.length > 0 && (
        <div className="p-5 rounded-xl border border-neutral-800 bg-neutral-900">
          <h3 className="text-sm font-semibold text-neutral-300 mb-3">
            Table of Contents
          </h3>
          <ul className="space-y-2 text-sm text-neutral-400">
            {headings.map((h, i) => (
              <li key={i}>• {h}</li>
            ))}
          </ul>
        </div>
      )}

      {/* Article */}
      <article className="prose prose-invert prose-lg max-w-none">
        {post.excerpt && (
          <p className="border-l-4 border-brandBlue pl-4 text-neutral-300">
            {post.excerpt}
          </p>
        )}

        <div className="mt-6 whitespace-pre-line leading-relaxed">
          {post.content}
        </div>
      </article>

      {/* Actions */}
      <div className="flex flex-wrap gap-4 items-center">
        <button
          onClick={copyLink}
          className="px-4 py-2 text-sm bg-neutral-800 rounded-lg hover:bg-neutral-700"
        >
          📋 Copy Link
        </button>

        <a
          href={`https://twitter.com/intent/tweet?text=${post.title}&url=${currentUrl}`}
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm hover:text-brandGold"
        >
          Share on Twitter
        </a>

        <a
          href={`https://www.linkedin.com/sharing/share-offsite/?url=${currentUrl}`}
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm hover:text-brandGold"
        >
          Share on LinkedIn
        </a>
      </div>

      {/* Related Posts */}
      {relatedPosts.length > 0 && (
        <div className="pt-10 border-t border-neutral-800">
          <h3 className="text-xl font-semibold mb-4">Related Articles</h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {relatedPosts.map((p) => (
              <Link
                key={p.slug}
                to={`/blog/${p.slug}`}
                className="p-4 rounded-xl border border-neutral-800 hover:border-brandGold transition"
              >
                <h4 className="font-semibold text-neutral-200">
                  {p.title}
                </h4>
                <p className="text-sm text-neutral-400 line-clamp-2 mt-1">
                  {p.excerpt}
                </p>
              </Link>
            ))}
          </div>
        </div>
      )}

      {toast && <Toast message={toast.message} type={toast.type} />}
    </section>
  );
}