import { useState, useMemo } from 'react';
import { Helmet } from "react-helmet-async";
import { motion, AnimatePresence } from "framer-motion";
import {
  Calendar,
  ArrowRight,
  Archive, 
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { eventsData } from "../data/eventsData.js";
import EventCard from "../components/EventCard.jsx";

const EVENTS_PER_PAGE = 4;

export default function EventsWebinars() {
  const [filter, setFilter] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);

  // Dynamically generate categories from the data
  const categories = useMemo(() => {
    const allTypes = eventsData.map(e => e.type);
    return ["All", ...Array.from(new Set(allTypes))];
  }, []);
  
  // Filter events into upcoming and past
  const upcomingEvents = useMemo(() => {
    const now = new Date();
    return eventsData
      .filter(e => new Date(e.date) >= now)
      .filter(e => filter === "All" || e.type === filter)
      .sort((a, b) => {
        // Prioritize featured events, then sort by date
        if (a.featured && !b.featured) return -1;
        if (!a.featured && b.featured) return 1;
        return new Date(a.date) - new Date(b.date);
      });
  }, [filter]);
  
  const pastEvents = useMemo(() => {
    const now = new Date();
    return eventsData
      .filter(e => new Date(e.date) < now)
      .filter(e => filter === "All" || e.type === filter)
      .sort((a, b) => new Date(b.date) - new Date(a.date));
  }, [filter]);

  // Reset to page 1 when filter changes
  useMemo(() => {
    setCurrentPage(1);
  }, [filter]);

  const paginatedPastEvents = useMemo(() => {
    const startIndex = (currentPage - 1) * EVENTS_PER_PAGE;
    return pastEvents.slice(startIndex, startIndex + EVENTS_PER_PAGE);
  }, [pastEvents, currentPage]);

  const totalPages = Math.ceil(pastEvents.length / EVENTS_PER_PAGE);

  
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
      <section className="max-w-5xl mx-auto px-4 pb-16">
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
      <section id="events" className="max-w-6xl mx-auto px-4 pb-24 space-y-16">
        {/* Upcoming Events */}
        <div>
          <h2 className="text-3xl font-bold mb-8 text-slate-900 dark:text-white">Upcoming Events</h2>
          <motion.div layout className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <AnimatePresence>
              {upcomingEvents.length > 0 ? (
                upcomingEvents.map((event) => <EventCard key={event.id} event={event} />)
              ) : (
                <motion.p layout initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="md:col-span-2 text-center text-slate-500 dark:text-neutral-400 py-10">
                  No upcoming events match your filter. Check back soon!
                </motion.p>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
        
        {/* Past Events */}
        <div>
          <h2 className="text-3xl font-bold mb-8 text-slate-900 dark:text-white flex items-center gap-3">
            <Archive /> Past Events
          </h2>
          <motion.div layout className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <AnimatePresence>
              {paginatedPastEvents.length > 0 ? (
                paginatedPastEvents.map((event) => <EventCard key={event.id} event={event} />)
              ) : (
                <motion.p layout initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="md:col-span-2 text-center text-slate-500 dark:text-neutral-400 py-10">
                  No past events match your filter.
                </motion.p>
              )}
            </AnimatePresence>
          </motion.div>

          {/* Pagination Controls */}
          {totalPages > 1 && (
            <div className="mt-12 flex justify-center items-center gap-2">
              <button
                onClick={() => setCurrentPage(p => Math.max(p - 1, 1))}
                disabled={currentPage === 1}
                className="p-2 rounded-lg bg-white/60 dark:bg-white/5 border border-slate-200 dark:border-white/10 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <ChevronLeft size={20} />
              </button>

              {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                <button
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  className={`w-10 h-10 rounded-lg text-sm font-bold transition-colors ${
                    currentPage === page 
                      ? 'bg-brandBlue text-white' 
                      : 'bg-white/60 dark:bg-white/5 border border-slate-200 dark:border-white/10'
                  }`}
                >
                  {page}
                </button>
              ))}

              <button
                onClick={() => setCurrentPage(p => Math.min(p + 1, totalPages))}
                disabled={currentPage === totalPages}
                className="p-2 rounded-lg bg-white/60 dark:bg-white/5 border border-slate-200 dark:border-white/10 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <ChevronRight size={20} />
              </button>
            </div>
          )}
        </div>
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