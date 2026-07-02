import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { authService } from '../services/auth';
import { orderService as ordersService } from '../services/orders';
import { userService } from '../services/user';
import axios from '../axios.js';
import { COURSE as aiCourse, MODULES as aiModules } from '../data/aiData.js';
import { COURSE as cyberCourse, MODULES as cyberModules } from '../data/cybersecurityData.js';
import { COURSE as dataCourse, MODULES as dataModules } from '../data/dataAnalyticsData.js';
import { COURSE as graphicCourse, MODULES as graphicModules } from '../data/graphicData.js';
import { COURSE as itCourse, MODULES as itModules } from '../data/itData.js';
import { COURSE as msCourse, MODULES as msModules } from '../data/microsoftData.js';
import { COURSE as ppmvsCourse, MODULES as ppmvsModules } from '../data/ppmvsData.js';
import { COURSE as web3Course, MODULES as web3Modules } from '../data/web3Data.js';
import { useAuth } from '../context/AuthContext.jsx';

export default function Dashboard() {
  const navigate = useNavigate();
  const { logout } = useAuth();
  const [activeTab, setActiveTab] = useState('orders');
  const [orders, setOrders] = useState([]);
  const [enrollments, setEnrollments] = useState([]);
  const [userProfile, setUserProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true);

        // Check if user is logged in
        if (!authService.isAuthenticated()) {
          navigate('/login');
          return;
        }

        console.log('[Dashboard] Fetching user data');

        // Fetch user profile
        const profileResponse = await userService.getProfile();
        let userProf = null;
        if (profileResponse.ok) {
          setUserProfile(profileResponse.data);
          userProf = profileResponse.data;
        }

        // Fetch orders
        const ordersResponse = await ordersService.getUserOrders(1, 10);
        if (ordersResponse.ok) {
          setOrders(ordersResponse.data.orders || []);
        }

        // Fetch enrollments (course progress)
        const enrollmentsResponse = await userService.getEnrollments();
        let dbEnrollments = [];
        if (enrollmentsResponse.ok) {
          dbEnrollments = await Promise.all((enrollmentsResponse.data || []).map(async (enr) => {
            try {
              const progRes = await axios.get(`/api/courses/${enr.courseId || enr._id}/progress`);
              const completed = progRes.data?.data?.completedModules?.length || 0;
              const total = enr.totalModules || enr.lessons?.length || 10;
              const progressPercentage = Math.min(Math.round((completed / total) * 100), 100);
              return { ...enr, courseId: enr.courseId || enr._id, progress: progressPercentage, isAcademy: false };
            } catch (e) {
              return { ...enr, courseId: enr.courseId || enr._id, progress: 0, isAcademy: false };
            }
          }));
        }

        // Gather Academy Courses user is enrolled in
        const activeAcademyCourses = [];
        if (userProf) {
          const academySources = [
            { key: 'aiCoursePaid', id: 'ai', name: aiCourse.title, total: aiModules.length, path: '/ai' },
            { key: 'cybersecurityCoursePaid', id: 'cybersecurity', name: cyberCourse.title, total: cyberModules.length, path: '/cybersecurity' },
            { key: 'dataAnalyticsCoursePaid', id: 'data-analytics', name: dataCourse.title, total: dataModules.length, path: '/data-analytics' },
            { key: 'graphicCoursePaid', id: 'graphic', name: graphicCourse.title, total: graphicModules.length, path: '/graphic' },
            { key: 'itCoursePaid', id: 'it', name: itCourse.title, total: itModules.length, path: '/it' },
            { key: 'microsoftCoursePaid', id: 'microsoft', name: msCourse.title, total: msModules.length, path: '/microsoft' },
            { key: 'ppmvsCoursePaid', id: 'ppmvs', name: ppmvsCourse.title, total: ppmvsModules.length, path: '/ppmvs' },
            { key: 'web3CoursePaid', id: 'web3', name: web3Course.title, total: web3Modules.length, path: '/web3' },
          ];

          for (const course of academySources) {
            if (userProf[course.key]) {
              try {
                const progRes = await axios.get(`/api/courses/${course.id}/progress`);
                const completedCount = progRes.data?.data?.completedModules?.length || 0;
                const progressPercentage = Math.min(Math.round((completedCount / course.total) * 100), 100);
                
                activeAcademyCourses.push({
                  _id: course.id,
                  courseId: course.id,
                  courseName: course.name,
                  progress: progressPercentage,
                  isAcademy: true,
                  path: course.path
                });
              } catch (e) {
                activeAcademyCourses.push({
                  _id: course.id,
                  courseId: course.id,
                  courseName: course.name,
                  progress: 0,
                  isAcademy: true,
                  path: course.path
                });
              }
            }
          }
        }

        setEnrollments([...activeAcademyCourses, ...dbEnrollments]);

        setLoading(false);
      } catch (error) {
        console.error('[Dashboard] Error:', error);
        setError(error.message || 'Failed to load dashboard');
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, [navigate]);

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 dark:bg-slate-950 py-12 transition-colors duration-300">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center">
            <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-gray-600">Loading your dashboard...</p>
            <p className="text-slate-600 dark:text-slate-400">Loading your dashboard...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-slate-50 dark:bg-slate-950 py-12 transition-colors duration-300">
        <div className="max-w-6xl mx-auto px-4">
          <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800/30 p-6 rounded-xl transition-colors duration-300">
            <p className="text-red-700 dark:text-red-400">{error}</p>
            <button
              onClick={() => window.location.reload()}
              className="mt-4 bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-lg transition-colors duration-300 shadow-md"
            >
              Try Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 py-12 transition-colors duration-300">
      <div className="max-w-6xl mx-auto px-4">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-2 transition-colors duration-300">
            Welcome back, {userProfile?.firstName || 'User'}!
          </h1>
          <p className="text-slate-600 dark:text-slate-400 transition-colors duration-300">{userProfile?.email}</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white dark:bg-slate-900 rounded-xl shadow-sm dark:shadow-none border border-slate-200 dark:border-slate-800 p-6 transition-colors duration-300">
            <p className="text-slate-600 dark:text-slate-400 text-sm transition-colors duration-300">Total Orders</p>
            <p className="text-3xl font-bold text-slate-900 dark:text-white transition-colors duration-300">{orders.length}</p>
          </div>
          <div className="bg-white dark:bg-slate-900 rounded-xl shadow-sm dark:shadow-none border border-slate-200 dark:border-slate-800 p-6 transition-colors duration-300">
            <p className="text-slate-600 dark:text-slate-400 text-sm transition-colors duration-300">Total Spent</p>
            <p className="text-3xl font-bold text-slate-900 dark:text-white transition-colors duration-300">
              ₦{orders.reduce((sum, o) => sum + (o.totalAmount || 0), 0).toLocaleString()}
            </p>
          </div>
          <div className="bg-white dark:bg-slate-900 rounded-xl shadow-sm dark:shadow-none border border-slate-200 dark:border-slate-800 p-6 transition-colors duration-300">
            <p className="text-slate-600 dark:text-slate-400 text-sm transition-colors duration-300">Active Enrollments</p>
            <p className="text-3xl font-bold text-slate-900 dark:text-white transition-colors duration-300">{enrollments.length}</p>
          </div>
          <div className="bg-white dark:bg-slate-900 rounded-xl shadow-sm dark:shadow-none border border-slate-200 dark:border-slate-800 p-6 transition-colors duration-300">
            <p className="text-slate-600 dark:text-slate-400 text-sm transition-colors duration-300">Account Status</p>
            <p className="text-3xl font-bold text-green-600 dark:text-green-400 transition-colors duration-300">Active</p>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white dark:bg-slate-900 rounded-xl shadow-sm dark:shadow-none border border-slate-200 dark:border-slate-800 overflow-hidden transition-colors duration-300">
          <div className="border-b border-slate-200 dark:border-slate-800 divide-x divide-slate-200 dark:divide-slate-800 flex transition-colors duration-300">
            <button
              onClick={() => setActiveTab('orders')}
              className={`flex-1 py-4 font-semibold transition-colors duration-300 whitespace-nowrap ${
                activeTab === 'orders'
                  ? 'bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 border-b-2 border-blue-600'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-50 dark:hover:bg-slate-800/50'
              }`}
            >
              📦 Orders
            </button>
            <button
              onClick={() => setActiveTab('enrollments')}
              className={`flex-1 py-4 font-semibold transition-colors duration-300 whitespace-nowrap ${
                activeTab === 'enrollments'
                  ? 'bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 border-b-2 border-blue-600'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-50 dark:hover:bg-slate-800/50'
              }`}
            >
              📚 My Courses
            </button>
            <button
              onClick={() => setActiveTab('profile')}
              className={`flex-1 py-4 font-semibold transition-colors duration-300 whitespace-nowrap ${
                activeTab === 'profile'
                  ? 'bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 border-b-2 border-blue-600'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-50 dark:hover:bg-slate-800/50'
              }`}
            >
              👤 Profile
            </button>
          </div>

          <div className="p-8">
            {/* Orders Tab */}
            {activeTab === 'orders' && (
              <div>
                {orders.length === 0 ? (
                  <div className="text-center py-12">
                    <p className="text-slate-600 dark:text-slate-400 mb-4 transition-colors duration-300">No orders yet</p>
                    <button
                      onClick={() => navigate('/ecommerce')}
                      className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-lg transition-colors duration-300 shadow-md"
                    >
                      Start Shopping
                    </button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {orders.map(order => (
                      <div key={order._id} className="border border-slate-200 dark:border-slate-800 rounded-xl p-4 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors duration-300">
                        <div className="flex justify-between items-start mb-3">
                          <div>
                            <p className="font-semibold text-slate-900 dark:text-white transition-colors duration-300">Order #{order.orderNumber || order._id}</p>
                            <p className="text-sm text-slate-600 dark:text-slate-400 transition-colors duration-300">
                              {new Date(order.createdAt).toLocaleDateString()}
                            </p>
                          </div>
                          <span className="px-3 py-1 bg-green-100 dark:bg-green-500/20 text-green-800 dark:text-green-400 rounded-full text-sm font-semibold transition-colors duration-300">
                            {order.status}
                          </span>
                        </div>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                          <div>
                            <p className="text-slate-600 dark:text-slate-400 transition-colors duration-300">Items</p>
                            <p className="font-semibold text-slate-900 dark:text-white transition-colors duration-300">{order.items?.length || 0}</p>
                          </div>
                          <div>
                            <p className="text-slate-600 dark:text-slate-400 transition-colors duration-300">Total</p>
                            <p className="font-semibold text-slate-900 dark:text-white transition-colors duration-300">₦{(order.totalAmount || 0).toLocaleString()}</p>
                          </div>
                          <div>
                            <p className="text-slate-600 dark:text-slate-400 transition-colors duration-300">Payment Status</p>
                            <p className="font-semibold text-green-600 dark:text-green-400 transition-colors duration-300">{order.paymentStatus || 'Completed'}</p>
                          </div>
                          <div className="text-right">
                          <button
                            onClick={() => navigate(`/order-history`)}
                              className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 font-semibold transition-colors duration-300"
                            >
                              View Details →
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* Enrollments Tab */}
            {activeTab === 'enrollments' && (
              <div>
                {enrollments.length === 0 ? (
                  <div className="text-center py-12">
                    <p className="text-slate-600 dark:text-slate-400 mb-4 transition-colors duration-300">No active course enrollments</p>
                    <button
                      onClick={() => navigate('/learn')}
                      className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-lg transition-colors duration-300 shadow-md"
                    >
                      Browse Courses
                    </button>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {enrollments.map(enrollment => (
                      <div key={enrollment._id} className="border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden hover:shadow-md dark:hover:shadow-lg transition-all duration-300">
                        <div className="bg-gradient-to-r from-blue-500 to-blue-600 h-32"></div>
                        <div className="p-4">
                          <h3 className="font-semibold text-slate-900 dark:text-white mb-2 transition-colors duration-300">{enrollment.courseName}</h3>
                          <div className="mb-4">
                            <p className="text-sm text-slate-600 dark:text-slate-400 mb-2 transition-colors duration-300">Progress</p>
                            <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-2 transition-colors duration-300">
                              <div
                                className="bg-blue-600 h-2 rounded-full transition-all duration-500"
                                style={{ width: `${enrollment.progress || 0}%` }}
                              ></div>
                            </div>
                            <p className="text-xs text-slate-600 dark:text-slate-400 mt-1 transition-colors duration-300">{enrollment.progress || 0}% Complete</p>
                          </div>
                          
                          <div className="space-y-2">
                            {enrollment.progress === 100 && (
                              <a
                                href={`/api/certificates/download/${enrollment.courseId}?courseName=${encodeURIComponent(enrollment.courseName || enrollment.title || 'Course')}`}
                                className="flex items-center justify-center gap-2 w-full bg-gradient-to-r from-yellow-400 to-yellow-500 hover:from-yellow-500 hover:to-yellow-600 text-black font-bold py-2 rounded-lg transition-all shadow-sm hover:shadow-md"
                              >
                                🏆 Download Certificate
                              </a>
                            )}
                            <button
                              onClick={() => navigate(enrollment.isAcademy ? enrollment.path : `/learn/${enrollment.courseId}`)}
                              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 rounded-lg transition-colors duration-300 shadow-md"
                            >
                              {enrollment.progress === 100 ? 'Review Course' : 'Continue Learning'}
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* Profile Tab */}
            {activeTab === 'profile' && (
              <div>
                <div className="max-w-2xl">
                  <div className="mb-6">
                    <h3 className="text-lg font-semibold mb-4 text-slate-900 dark:text-white transition-colors duration-300">Personal Information</h3>
                    <div className="space-y-3">
                      <div>
                        <p className="text-sm text-slate-600 dark:text-slate-400 transition-colors duration-300">Full Name</p>
                        <p className="font-semibold text-slate-900 dark:text-white transition-colors duration-300">
                          {userProfile?.firstName} {userProfile?.lastName}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-slate-600 dark:text-slate-400 transition-colors duration-300">Email</p>
                        <p className="font-semibold text-slate-900 dark:text-white transition-colors duration-300">{userProfile?.email}</p>
                      </div>
                      <div>
                        <p className="text-sm text-slate-600 dark:text-slate-400 transition-colors duration-300">Phone</p>
                        <p className="font-semibold text-slate-900 dark:text-white transition-colors duration-300">{userProfile?.phone || 'Not provided'}</p>
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <button
                      onClick={() => navigate('/account-settings')}
                      className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-lg transition-colors duration-300 shadow-md"
                    >
                      Edit Profile
                    </button>
                    <button
                      onClick={async () => {
                        await logout();
                        navigate('/login');
                      }}
                      className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-6 rounded-lg transition-colors duration-300 shadow-md"
                    >
                      Logout
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
