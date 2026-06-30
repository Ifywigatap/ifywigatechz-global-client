import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const ProtectedCourseRoute = ({ children, course }) => {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return <div>Loading...</div>; // you can replace with spinner
  }

  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // Course access check
  const accessMap = {
    it: user?.itCoursePaid,
    graphic: user?.graphicCoursePaid,
    microsoft: user?.microsoftCoursePaid,
    ai: user?.aiCoursePaid,
    cybersecurity: user?.cybersecurityCoursePaid
  };

  if (!accessMap[course]) {
    return <Navigate to="/pricing" replace />;
  }

  return children;
};

export default ProtectedCourseRoute;