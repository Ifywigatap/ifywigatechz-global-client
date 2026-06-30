import React, { useState, useEffect } from 'react';
import { Search, Loader2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const CourseSearch = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [courses, setCourses] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (!searchTerm.trim()) {
      setCourses([]);
      return;
    }

    const delayDebounceFn = setTimeout(async () => {
      setIsLoading(true);
      setError(null);

      try {
        // Using axios ensures your global baseURL is applied
        const response = await axios.get('/api/courses', {
          params: { search: searchTerm }
        });

        if (response.data.ok) {
          setCourses(response.data.data);
        } else {
          setError(response.data.message || 'Failed to fetch courses');
        }
      } catch (err) {
        setError(err.response?.data?.message || 'Network error occurred while searching.');
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    }, 500);

    return () => clearTimeout(delayDebounceFn);
  }, [searchTerm]);

  return (
    <div className="w-full max-w-2xl mx-auto p-4 relative z-50">
      <div className="relative flex items-center w-full h-12 rounded-lg bg-white overflow-hidden border border-gray-200 focus-within:ring-2 focus-within:ring-blue-500 transition-all shadow-sm">
        <div className="grid place-items-center h-full w-12 text-gray-400">
          <Search size={20} />
        </div>

        <input
          className="peer h-full w-full outline-none text-sm text-gray-700 pr-2"
          type="text"
          placeholder="Search courses by title, description, or topic..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        
        {isLoading && (
          <div className="absolute right-4 animate-spin text-blue-500">
            <Loader2 size={20} />
          </div>
        )}
      </div>

      {error && <p className="text-red-500 text-sm mt-4 text-center">{error}</p>}

      {courses.length > 0 && (
        <div className="absolute top-16 left-4 right-4 mt-2 bg-white border border-gray-100 rounded-lg shadow-xl overflow-hidden z-50">
          <ul className="max-h-96 overflow-y-auto">
            {courses.map((course) => (
              <li 
                key={course._id} 
                onClick={() => navigate(`/courses/${course.slug}`)}
                className="p-4 border-b border-gray-50 hover:bg-gray-50 cursor-pointer transition-colors flex items-start gap-4"
              >
                <div className="flex-1">
                  <h4 className="font-semibold text-gray-900">{course.title}</h4>
                  <p className="text-sm text-gray-500 line-clamp-2 mt-1">
                    {course.excerpt || course.description}
                  </p>
                  <div className="mt-2 flex items-center gap-3 text-xs font-medium text-gray-500">
                    <span className="bg-blue-50 text-blue-700 px-2 py-1 rounded">
                      {course.category}
                    </span>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default CourseSearch;