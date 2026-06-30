import React from 'react';
import CourseCard from './CourseCard';
import { courses } from '../data/homeData'; // Import data

const CoursePreviewSection = () => (
  <section className="bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white py-16 md:py-24 transition-colors duration-300">
    <div className="container-wide space-y-10">
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <h2 className="text-3xl md:text-4xl font-bold">
          Explore Practical Tech Courses
        </h2>
        <p className="text-slate-600 dark:text-neutral-400">
          Learn real-world skills in Web Development, UI/UX Design, and modern digital technologies through Ifywigatechz Academy.
        </p>
      </div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {courses.map((course) => (
          <CourseCard key={course.title} course={course} />
        ))}
      </div>
    </div>
  </section>
);

export default CoursePreviewSection;