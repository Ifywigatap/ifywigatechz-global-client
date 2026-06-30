import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

export default function SubmitPost() {
  const [form, setForm] = useState({
    title: "",
    category: "",
    author: "",
    content: "",
    images: [],
  });

  const [submitted, setSubmitted] = useState(false);

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function handleImageUpload(e) {
    const files = Array.from(e.target.files);
    files.forEach((file) => {
      const reader = new FileReader();
      reader.onload = (event) => {
        setForm((prev) => ({
          ...prev,
          images: [
            ...prev.images,
            {
              name: file.name,
              data: event.target.result,
              size: file.size,
            },
          ],
        }));
      };
      reader.readAsDataURL(file);
    });
  }

  function removeImage(index) {
    setForm((prev) => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index),
    }));
  }

  function handleSubmit(e) {
    e.preventDefault();

    const newPost = {
      title: form.title,
      slug: form.title
        .toLowerCase()
        .replace(/[^\w]+/g, "-")
        .replace(/(^-|-$)+/g, ""),
      excerpt: form.content.slice(0, 140) + "...",
      content: form.content,
      category: form.category,
      author: form.author || "Guest Author",
      date: new Date().toISOString(),
      images: form.images,
      status: "pending",
    };

    console.log("Markdown Post Submitted:", newPost);
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <section className="section max-w-xl text-center space-y-6">
        <Helmet>
          <title>Post Submitted — Ify Wigatap Blog</title>
        </Helmet>

        <div className="rounded-2xl border border-slate-200 dark:border-brandBlue/30 bg-white dark:bg-brandBlue/5 p-8 shadow-sm dark:shadow-none transition-colors duration-300">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-brandBlue transition-colors duration-300">
            🎉 Submission Received!
          </h2>
          <p className="text-slate-600 dark:text-neutral-400 mt-3 transition-colors duration-300">
            Your article has been submitted and is pending review.
          </p>

          <Link
            to="/blog"
            className="inline-block mt-6 rounded-xl bg-brandBlue px-6 py-3
                       text-sm font-medium text-white hover:bg-brandBlue/90 transition"
          >
            Back to Blog
          </Link>
        </div>
      </section>
    );
  }

  return (
    <section className="section max-w-5xl space-y-10 container-wide">
      <Helmet>
        <title>Submit a Guest Post — Ify Wigatap Blog</title>
      </Helmet>

      <header className="space-y-2 max-w-2xl">
        <h2 className="text-3xl font-bold text-slate-900 dark:text-brandBlue transition-colors duration-300">
          Submit a Guest Post
        </h2>
        <p className="text-slate-600 dark:text-neutral-400 text-sm transition-colors duration-300">
          Write your article in Markdown and preview it live before submitting.
        </p>
      </header>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Meta Fields */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <input
            name="title"
            required
            placeholder="Post title"
            value={form.title}
            onChange={handleChange}
            className="rounded-xl bg-white dark:bg-neutral-900 border border-slate-200 dark:border-neutral-800
                       px-4 py-3 text-sm text-slate-900 dark:text-neutral-200 focus:border-brandBlue transition-colors duration-300"
          />

          <input
            name="author"
            placeholder="Author (optional)"
            value={form.author}
            onChange={handleChange}
            className="rounded-xl bg-white dark:bg-neutral-900 border border-slate-200 dark:border-neutral-800
                       px-4 py-3 text-sm text-slate-900 dark:text-neutral-200 focus:border-brandBlue transition-colors duration-300"
          />

          <select
            name="category"
            required
            value={form.category}
            onChange={handleChange}
            className="rounded-xl bg-white dark:bg-neutral-900 border border-slate-200 dark:border-neutral-800
                       px-4 py-3 text-sm text-slate-900 dark:text-neutral-200 focus:border-brandBlue transition-colors duration-300"
          >
            <option value="">Category</option>
            <option>Web Development</option>
            <option>UI/UX Design</option>
            <option>Freelancing</option>
            <option>Digital Skills</option>
          </select>
        </div>



        {/* Image Upload */}
        <div className="space-y-3">
          <label className="text-sm font-medium text-slate-700 dark:text-neutral-300 transition-colors duration-300">
            Upload Images
          </label>
          <input
            type="file"
            multiple
            accept="image/*"
            onChange={handleImageUpload}
            className="w-full rounded-xl bg-white dark:bg-neutral-900 border border-slate-200 dark:border-neutral-800
                       px-4 py-3 text-sm text-slate-900 dark:text-neutral-200 cursor-pointer
                       focus:border-brandBlue file:mr-4 file:py-2 file:px-4
                       file:rounded-lg file:border-0 file:text-sm
                       file:font-medium file:bg-brandBlue file:text-white
                       file:cursor-pointer transition-colors duration-300"
          />
          {form.images.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {form.images.map((img, idx) => (
                <div
                  key={idx}
                  className="rounded-lg border border-slate-200 dark:border-neutral-800 overflow-hidden transition-colors duration-300"
                >
                  <img
                    src={img.data}
                    alt={img.name}
                    className="w-full h-32 object-cover"
                  />
                  <div className="bg-slate-50 dark:bg-neutral-900 p-2 space-y-1 transition-colors duration-300">
                    <p className="text-xs text-slate-600 dark:text-neutral-400 truncate transition-colors duration-300">
                      {img.name}
                    </p>
                    <button
                      type="button"
                      onClick={() => removeImage(idx)}
                      className="w-full text-xs bg-red-900/30 hover:bg-red-900/50
                                 text-red-400 px-2 py-1 rounded transition"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Markdown Editor */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Editor */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-neutral-300">
              Markdown Editor
            </label>
            <textarea
              name="content"
              required
              rows={18}
              placeholder={`## Start writing...\n\nUse **bold**, *italic*, lists, code blocks, etc.`}
              value={form.content}
              onChange={handleChange}
              className="w-full rounded-xl bg-neutral-900 border border-neutral-800
                         px-4 py-3 text-sm text-neutral-200 resize-none
                         focus:border-brandBlue"
            />
          </div>                 



          {/* Live Preview */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-neutral-300">
              Live Preview
            </label>
            <div className="rounded-xl border border-neutral-800
                            bg-neutral-950/60 p-4 backdrop-blur
                            prose prose-invert max-w-none">
              <ReactMarkdown remarkPlugins={[remarkGfm]}>
                {form.content || "*Nothing to preview yet…*"}
              </ReactMarkdown>
            </div>
          </div>
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="rounded-xl bg-brandBlue px-8 py-3
                     text-sm font-medium text-white
                     hover:bg-brandBlue/90 transition"
        >
          Submit for Review
        </button>
      </form>
    </section>
  );
}
