import { motion } from "framer-motion";
import { Calendar, Clock, MapPin, Users, ArrowRight, UserCheck, Star } from "lucide-react";
import { eventIcons } from "../data/eventsData";
import { Link } from "react-router-dom";

export default function EventCard({ event }) {
  const isPast = new Date(event.date) < new Date();
  const EventIcon = eventIcons[event.type] || eventIcons.Default;
  const seatsRemaining = event.capacity - event.attendees;
  const isSoldOut = seatsRemaining <= 0;
  const isLowSeats = !isSoldOut && seatsRemaining <= 20;

  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -20, scale: 0.95 }}
      transition={{ duration: 0.3 }}
      className={`group relative bg-white/60 dark:bg-white/5 border rounded-2xl p-6 backdrop-blur-xl shadow-lg dark:shadow-none transition-all duration-300 ${
        event.featured 
          ? 'border-brandGold/50 dark:border-brandGold/70 ring-2 ring-brandGold/20' 
          : 'border-slate-200 dark:border-white/10 hover:border-brandGold/50'
      }`}
    >
      <div className="flex justify-between items-start mb-4">
        <div className="flex items-center gap-2">
          <span
            className={`text-xs px-3 py-1 rounded-full font-semibold ${
              isPast
                ? "bg-slate-200 dark:bg-neutral-700 text-slate-600 dark:text-neutral-300"
                : isSoldOut
                ? "bg-red-100 dark:bg-red-500/20 text-red-600 dark:text-red-400"
                : "bg-green-100 dark:bg-green-500/20 text-green-600 dark:text-green-300"
            }`}
          >
            {isPast ? "Archived" : isSoldOut ? "Sold Out" : "Upcoming"}
          </span>
          {!isPast && !isSoldOut && (
            <span className={`flex items-center gap-1 text-xs font-semibold ${
              isLowSeats ? 'text-orange-500' : 'text-slate-500 dark:text-neutral-400'
            }`}>
              <UserCheck size={14} /> {seatsRemaining} seats left
            </span>
          )}
          {event.featured && !isPast && (
            <span className="flex items-center gap-1 text-xs font-bold text-brandGold bg-brandGold/10 px-2 py-1 rounded-full border border-brandGold/20">
              <Star size={14} /> Featured
            </span>
          )}
        </div>
        <div
          title={event.type}
          className="w-12 h-12 bg-brandGold/10 text-brandGold flex items-center justify-center rounded-lg border border-brandGold/20"
        >
          <EventIcon size={24} />
        </div>
      </div>

      <h3 className="text-xl font-bold mb-2 text-slate-900 dark:text-white">{event.title}</h3>
      <p className="text-sm text-slate-600 dark:text-neutral-400 mb-6 flex-grow">{event.desc}</p>

      <div className="grid grid-cols-2 gap-3 text-sm text-slate-700 dark:text-neutral-300 mb-6">
        <span className="flex items-center gap-2"><Calendar size={14} /> {new Date(event.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
        <span className="flex items-center gap-2"><Clock size={14} /> {event.time}</span>
        <span className="flex items-center gap-2"><MapPin size={14} /> {event.mode}</span>
        <span className="flex items-center gap-2"><Users size={14} /> {event.attendees}+ attendees</span>
      </div>

      <div className="flex justify-between items-center border-t border-slate-200 dark:border-white/10 pt-4">
        <span className="text-xs text-slate-500 dark:text-neutral-500 font-medium">
          Host: {event.speaker}
        </span>

        {isPast ? (
          <span className="text-slate-500 dark:text-neutral-500 text-sm font-medium">Recording Soon</span>
        ) : isSoldOut ? (
          <span className="flex items-center justify-center gap-1.5 text-sm font-bold text-red-500 dark:text-red-400 min-w-[120px]">
            Sold Out
          </span>
        ) : (
          <Link
            to={`/register/${event.id}`}
            className="flex items-center gap-1.5 text-sm font-bold text-brandBlue dark:text-brandGold hover:text-blue-700 dark:hover:text-yellow-400 transition-colors"
          >
            Register Now
            <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        )}
      </div>
    </motion.article>
  );
}