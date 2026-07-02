import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import GlassCard from "../components/GlassCard";
import Button from "../components/Button";
import { optimizeImage } from "../utils/cloudinary";

const CourseCard = ({ course }) => {
  const {
    title,
    desc,
    img,
    tags,
    link,
    level,
    duration,
  } = course;

  return (
    <GlassCard className="!p-0 overflow-hidden flex flex-col h-full" hover={true}>
      
      {/* Image */}
      <div className="relative overflow-hidden">
        <img
          src={optimizeImage(img, { width: 600, height: 400 })}
          alt={title}
          className="h-44 w-full object-cover transform group-hover:scale-110 transition duration-500"
        />

        {/* Overlay Gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-80" />

        {/* Top Tags (optional badge) */}
        {level && (
          <span className="absolute top-3 left-3 text-xs px-2 py-1 rounded-full bg-blue-600/80 backdrop-blur text-white">
            {level}
          </span>
        )}
      </div>

      {/* Content */}
      <div className="p-5 flex flex-col flex-grow space-y-3">

        {/* Title */}
        <h3 className="text-lg md:text-xl font-semibold text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition">
          {title}
        </h3>

        {/* Description */}
        <p className="text-sm text-slate-600 dark:text-neutral-400 flex-grow line-clamp-3">
          {desc}
        </p>

        {/* Meta Info */}
        {(duration) && (
          <div className="text-xs text-slate-500 dark:text-neutral-500">
            {duration && <span>⏱ {duration}</span>}
          </div>
        )}

        {/* Tags */}
        <div className="flex flex-wrap gap-2 pt-1">
          {tags.map((tag, index) => (
            <span
              key={`${tag}-${index}`}
              className="text-xs px-2 py-1 rounded-md bg-slate-200 dark:bg-white/10 text-slate-700 dark:text-neutral-300 hover:bg-slate-300 dark:hover:bg-white/20 transition"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-3 w-full">
          <Link to={link} className="w-full block">
            <Button variant="primary" size="sm" className="w-full py-2.5">
              View Course →
            </Button>
          </Link>
        </div>
      </div>
    </GlassCard>
  );
};

CourseCard.propTypes = {
  course: PropTypes.shape({
    title: PropTypes.string.isRequired,
    desc: PropTypes.string.isRequired,
    img: PropTypes.string,
    tags: PropTypes.arrayOf(PropTypes.string).isRequired,
    link: PropTypes.string.isRequired,
    level: PropTypes.string,
    duration: PropTypes.string,
  }).isRequired,
};

export default CourseCard;