// This is a static placeholder for now.
// In a real app, you'd fetch user progress from context or an API.
export default function AiCourseProgress() {
  const progress = 5; // Static progress percentage

  return (
    <div className="mt-4">
      <div className="flex justify-between text-sm text-slate-300 mb-1">
        <span>Course Progress</span>
        <span>{progress}% Complete</span>
      </div>
      <div className="w-full bg-slate-700/50 rounded-full h-2.5">
        <div
          className="bg-gradient-to-r from-teal-400 to-cyan-400 h-2.5 rounded-full"
          style={{ width: `${progress}%` }}
        ></div>
      </div>
    </div>
  );
}