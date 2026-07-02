import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import {
  Calendar,
  Clock,
  Video,
  MapPin,
  Users,
  ArrowRight,
  CheckCircle,
} from "lucide-react";

const categories = ["All", "Webinar", "Workshop", "Bootcamp", "Conference"];

const eventsData = [
  {
    id: "fs-masterclass",
    title: "Full-Stack Development Masterclass",
    type: "Webinar",
    date: "Jan 25, 2025",
    time: "2:00 PM WAT",
    mode: "Online",
    attendees: 350,
    status: "Upcoming",
    desc: "Build production-ready MERN stack apps with live coding.",
    speaker: "Isu Ifeanyichukwu Oko",
  },
  {
    id: "uiux-sprint",
    title: "UI/UX Design Sprint Workshop",
    type: "Workshop",
    date: "Feb 8, 2025",
    time: "10:00 AM WAT",
    mode: "Online",
    attendees: 120,
    status: "Upcoming",
    desc: "Hands-on Figma, prototyping, and user testing.",
    speaker: "Design Team Lead",
  },
  {
    id: "freelance-10k",
    title: "Freelancing to $10K/Month",
    type: "Webinar",
    date: "Feb 20, 2025",
    time: "4:00 PM WAT",
    mode: "Online",
    attendees: 500,
    status: "Upcoming",
    desc: "Frameworks to scale your freelance income.",
    speaker: "Isu Ifeanyichukwu Oko",
  },
];

export default function EventsWebinars() {
  const [filter, setFilter] = useState("All");

  const filtered =
    filter === "All"
      ? eventsData
      : eventsData.filter((e) => e.type === filter);

  return (
    <section className="relative bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white overflow-hidden transition-colors duration-300">
      <Helmet>
        <title>Events & Webinars | IFYWIGATECHZ</title>
      </Helmet>

      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-blue-100/50 dark:from-blue-900/20 via-transparent dark:to-black transition-colors duration-300" />
      <div className="absolute top-0 right-0 w-[700px] h-[700px] bg-brandGold/10 blur-[120px]" />

      {/* HERO */}
      <header className="relative max-w-6xl mx-auto px-4 py-28 text-center">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}>
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/60 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-full text-sm text-brandGold mb-6 shadow-sm dark:shadow-none transition-colors duration-300">
            <Calendar size={16} />
            Live Learning
          </div>

          <h1 className="text-5xl md:text-6xl font-black mb-6 leading-tight">
            Events &{" "}
            <span className="bg-gradient-to-r from-brandGold to-yellow-400 bg-clip-text text-transparent">
              Webinars
            </span>
          </h1>

          <p className="text-slate-600 dark:text-neutral-400 max-w-xl mx-auto text-lg mb-10">
            Join live sessions, workshops, and expert-led trainings designed to
            accelerate your tech journey.
          </p>

          <a
            href="#events"
            className="px-8 py-4 bg-gradient-to-r from-brandGold to-yellow-400 text-black font-bold rounded-xl hover:scale-105 transition"
          >
            Explore Events
          </a>
        </motion.div>
      </header>

      {/* FILTERS */}
      <section className="max-w-5xl mx-auto px-4 pb-10">
        <div className="flex flex-wrap justify-center gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-5 py-2 rounded-xl text-sm transition-all duration-300 ${
                filter === cat
                  ? "bg-brandGold text-black shadow-md"
                  : "bg-white/60 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-slate-600 dark:text-neutral-300 hover:bg-white/80 dark:hover:bg-white/10 shadow-sm dark:shadow-none"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </section>

      {/* EVENTS */}
      <section
        id="events"
        className="max-w-6xl mx-auto px-4 pb-24 grid grid-cols-1 md:grid-cols-2 gap-6"
      >
        {filtered.map((event) => (
          <motion.article
            key={event.id}
            whileHover={{ y: -6 }}
            className="group bg-white/60 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-2xl p-6 backdrop-blur-xl shadow-lg dark:shadow-none transition-colors duration-300"
          >
            {/* Top */}
            <div className="flex justify-between mb-4">
              <span
                className={`text-xs px-3 py-1 rounded-full ${
                  event.status === "Upcoming"
                    ? "bg-green-100 dark:bg-green-500/20 text-green-600 dark:text-green-400"
                    : "bg-slate-200 dark:bg-neutral-500/20 text-slate-600 dark:text-neutral-400"
                }`}
              >
                {event.status}
              </span>

              <div className="w-10 h-10 bg-brandBlue/10 dark:bg-brandBlue/20 text-brandBlue flex items-center justify-center rounded-lg">
                <Video size={18} />
              </div>
            </div>

            <h3 className="text-xl font-bold mb-2">{event.title}</h3>
            <p className="text-sm text-slate-600 dark:text-neutral-400 mb-4">{event.desc}</p>

            {/* Details */}
            <div className="grid grid-cols-2 gap-3 text-sm text-slate-700 dark:text-neutral-300 mb-4">
              <span className="flex items-center gap-2">
                <Calendar size={14} /> {event.date}
              </span>
              <span className="flex items-center gap-2">
                <Clock size={14} /> {event.time}
              </span>
              <span className="flex items-center gap-2">
                <MapPin size={14} /> {event.mode}
              </span>
              <span className="flex items-center gap-2">
                <Users size={14} /> {event.attendees}
              </span>
            </div>

            {/* Footer */}
            <div className="flex justify-between items-center border-t border-slate-200 dark:border-white/10 pt-4 transition-colors duration-300">
              <span className="text-xs text-slate-500 dark:text-neutral-500">
                {event.speaker}
              </span>

              {event.status === "Upcoming" ? (
                <button className="flex items-center gap-1 text-brandBlue dark:text-brandGold text-sm font-medium hover:text-blue-700 dark:hover:text-yellow-400 transition-colors">
                  Register
                  <ArrowRight size={14} />
                </button>
              ) : (
                <span className="text-slate-500 dark:text-neutral-500 text-sm">Replay Soon</span>
              )}
            </div>
          </motion.article>
        ))}
      </section>

      {/* CTA */}
      <section className="max-w-4xl mx-auto px-4 pb-28 text-center">
        <div className="bg-white/60 dark:bg-gradient-to-r dark:from-brandGold/20 dark:to-yellow-500/10 border border-slate-200 dark:border-brandGold/20 rounded-3xl p-10 shadow-lg dark:shadow-none transition-colors duration-300">
          <h2 className="text-3xl font-bold mb-4">
            Want to Partner or Speak?
          </h2>

          <p className="text-slate-600 dark:text-neutral-400 mb-6">
            Collaborate with us to reach thousands of learners globally.
          </p>

          <a
            href="/contact"
            className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-brandGold to-yellow-400 text-black font-bold rounded-xl hover:scale-105 transition"
          >
            Get in Touch
            <ArrowRight size={18} />
          </a>
        </div>
      </section>
    </section>
  );
}