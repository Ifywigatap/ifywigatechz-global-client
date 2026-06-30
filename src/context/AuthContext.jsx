import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
  useMemo
} from 'react';
import authService from '../services/auth.js';
import { paymentService } from '../services/payments.js';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
};

const COURSE_KEYS = {
  it: 'itCoursePaid',
  graphic: 'graphicCoursePaid',
  microsoft: 'microsoftCoursePaid',
  ai: 'aiCoursePaid',
  cybersecurity: 'cybersecurityCoursePaid',
  dataAnalytics: 'dataAnalyticsCoursePaid',
  web3: 'web3CoursePaid'
};

const COURSE_PATHS = {
  it: '/it/module/01',
  graphic: '/graphic/module/01',
  microsoft: '/microsoft/module/01',
  ai: '/ai/module/01',
  cybersecurity: '/cybersecurity/module/01',
  dataAnalytics: '/data-analytics/module/01',
  web3: '/web3/module/01'
};

const DEFAULT_COURSE_STATE = {
  itCoursePaid: false,
  graphicCoursePaid: false,
  microsoftCoursePaid: false,
  aiCoursePaid: false,
  cybersecurityCoursePaid: false,
  dataAnalyticsCoursePaid: false,
  web3CoursePaid: false
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const navigate = useNavigate();

  /** -----------------------------
   * Local Storage Helpers
   * ----------------------------- */
  const loadCourseStates = useCallback(() => {
    try {
      const stored = JSON.parse(localStorage.getItem('courseUnlocks'));
      return { ...DEFAULT_COURSE_STATE, ...stored };
    } catch {
      return DEFAULT_COURSE_STATE;
    }
  }, []);

  const saveCourseStates = useCallback((states) => {
    try {
      localStorage.setItem('courseUnlocks', JSON.stringify(states));
    } catch (err) {
      console.error('[Auth] Failed saving course states:', err);
    }
  }, []);

  /** -----------------------------
   * Merge User + Course Access
   * ----------------------------- */
  const mergeUserWithCourses = useCallback((userData = {}, courseStates) => {
    return {
      ...userData,
      ...courseStates
    };
  }, []);

  /** -----------------------------
   * Initialize Auth
   * ----------------------------- */
  useEffect(() => {
    const initAuth = async () => {
      try {
        const storedUser = authService.getCurrentUserData();
        const courseStates = loadCourseStates();

        if (storedUser) {
          setUser(mergeUserWithCourses(storedUser, courseStates));
        } else {
          setUser(courseStates); // guest preview
        }
      } catch (error) {
        console.error('[Auth] Initialization error:', error);
      } finally {
        setLoading(false);
      }
    };

    initAuth();

    const unsubscribe = authService.subscribe(({ event, data }) => {
      const courseStates = loadCourseStates();

      switch (event) {
        case 'login':
        case 'profileUpdated':
          setUser(mergeUserWithCourses(data, courseStates));
          break;

        case 'logout':
          setUser(null);
          localStorage.removeItem('courseUnlocks');
          break;

        default:
          break;
      }
    });

    return unsubscribe;
  }, [loadCourseStates, mergeUserWithCourses]);

  /** -----------------------------
   * Course Unlock Logic
   * ----------------------------- */
  const unlockCourse = useCallback(
    async (courseKey, reference) => {
      if (!COURSE_KEYS[courseKey]) {
        throw new Error(`Invalid course key: ${courseKey}`);
      }

      const key = COURSE_KEYS[courseKey];
      const path = COURSE_PATHS[courseKey];

      const previousStates = loadCourseStates();
      const updatedStates = { ...previousStates, [key]: true };

      try {
        // Optimistic update
        saveCourseStates(updatedStates);
        setUser((prev) =>
          mergeUserWithCourses(prev || {}, updatedStates)
        );

        await paymentService.verifyPayment(reference);

        navigate(path);
      } catch (error) {
        console.error(`[Auth] Unlock failed (${courseKey}):`, error);

        // rollback
        saveCourseStates(previousStates);
        setUser((prev) =>
          mergeUserWithCourses(prev || {}, previousStates)
        );

        throw error;
      }
    },
    [loadCourseStates, saveCourseStates, mergeUserWithCourses, navigate]
  );

  /** -----------------------------
   * Auth Actions
   * ----------------------------- */
  const login = useCallback(
    async (email, password) => {
      const data = await authService.login(email, password);
      const courseStates = loadCourseStates();

      setUser(mergeUserWithCourses(data.user, courseStates));
      return data;
    },
    [loadCourseStates, mergeUserWithCourses]
  );

  const logout = useCallback(async () => {
    try {
      await authService.logout();
    } finally {
      setUser(null);
      localStorage.removeItem('courseUnlocks');
    }
  }, []);

  const refreshAccessToken = useCallback(async () => {
    if (refreshing) return false;

    setRefreshing(true);
    try {
      authService.getAuthToken(); // assumed refresh internally
      return true;
    } catch {
      await logout();
      return false;
    } finally {
      setRefreshing(false);
    }
  }, [refreshing, logout]);

  /** -----------------------------
   * Derived State
   * ----------------------------- */
  const value = useMemo(() => ({
    user,
    loading,

    login,
    logout,
    refreshAccessToken,

    unlockItCourse: (ref) => unlockCourse('it', ref),
    unlockGraphicCourse: (ref) => unlockCourse('graphic', ref),
    unlockMicrosoftCourse: (ref) => unlockCourse('microsoft', ref),
    unlockAiCourse: (ref) => unlockCourse('ai', ref),
    unlockCybersecurityCourse: (ref) => unlockCourse('cybersecurity', ref),
    unlockDataAnalyticsCourse: (ref) => unlockCourse('dataAnalytics', ref),
    unlockWeb3Course: (ref) => unlockCourse('web3', ref),

    isAuthenticated: !!user,
    isAdmin: user?.role === 'admin',
    isSubscriber: user?.role === 'subscriber',

    // Helper to check enrollment status for hardcoded courses
    isEnrolledIn: (courseKey) => {
      const key = COURSE_KEYS[courseKey];
      return !!user?.[key];
    },

    // Legacy support for existing components
    itCoursePaid: !!user?.itCoursePaid,
    aiCoursePaid: !!user?.aiCoursePaid,
  }), [user, loading, login, logout, refreshAccessToken, unlockCourse]);

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};