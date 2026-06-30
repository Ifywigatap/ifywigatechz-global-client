import { useState, useEffect } from 'react';
import axios from '../../axios.js';
import { Award, Users, Search } from 'lucide-react';

export default function AcademyManager() {
  const [activeTab, setActiveTab] = useState('certificates');
  const [certificates, setCertificates] = useState([]);
  const [enrollments, setEnrollments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const [certsRes, enrollsRes] = await Promise.all([
          axios.get('/api/certificates'),
          axios.get('/api/courses/admin/enrollments')
        ]);
        
        if (certsRes.data?.ok) setCertificates(certsRes.data.data);
        if (enrollsRes.data?.ok) setEnrollments(enrollsRes.data.data);
      } catch (error) {
        console.error('Failed to fetch academy data:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const filteredCertificates = certificates.filter(c => 
    c.certId.toLowerCase().includes(search.toLowerCase()) || 
    c.studentName.toLowerCase().includes(search.toLowerCase())
  );

  const filteredEnrollments = enrollments.filter(e => 
    e.student?.name.toLowerCase().includes(search.toLowerCase()) || 
    e.courseTitle.toLowerCase().includes(search.toLowerCase())
  );

  if (loading) {
    return <div className="p-8 text-center text-slate-500">Loading Academy Data...</div>;
  }

  return (
    <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800 overflow-hidden">
      {/* TABS & SEARCH */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-6 border-b border-slate-200 dark:border-slate-800 gap-4">
        <div className="flex gap-4">
          <button
            onClick={() => setActiveTab('certificates')}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg font-semibold transition-colors ${
              activeTab === 'certificates' ? 'bg-brandGold text-black' : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
            }`}
          >
            <Award size={18} />
            Certificates ({certificates.length})
          </button>
          <button
            onClick={() => setActiveTab('enrollments')}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg font-semibold transition-colors ${
              activeTab === 'enrollments' ? 'bg-brandBlue text-white' : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
            }`}
          >
            <Users size={18} />
            Enrolled Students ({enrollments.length})
          </button>
        </div>

        <div className="relative w-full sm:w-64">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
          <input
            type="text"
            placeholder="Search..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-brandBlue"
          />
        </div>
      </div>

      {/* CONTENT */}
      <div className="p-0 overflow-x-auto">
        <table className="w-full text-left border-collapse min-w-[800px]">
          <thead className="bg-slate-50 dark:bg-slate-800/50">
            <tr className="border-b border-slate-200 dark:border-slate-800 text-slate-500 dark:text-slate-400 text-sm">
              {activeTab === 'certificates' ? (
                <>
                  <th className="p-4 font-semibold">Certificate ID</th>
                  <th className="p-4 font-semibold">Student Name</th>
                  <th className="p-4 font-semibold">Course Name</th>
                  <th className="p-4 font-semibold">Issue Date</th>
                  <th className="p-4 font-semibold">Status</th>
                </>
              ) : (
                <>
                  <th className="p-4 font-semibold">Student</th>
                  <th className="p-4 font-semibold">Email</th>
                  <th className="p-4 font-semibold">Course Enrolled</th>
                  <th className="p-4 font-semibold">Category</th>
                </>
              )}
            </tr>
          </thead>
          <tbody>
            {activeTab === 'certificates' ? (
              filteredCertificates.map((cert) => (
                <tr key={cert._id} className="border-b border-slate-100 dark:border-slate-800/50 hover:bg-slate-50 dark:hover:bg-slate-800/20 transition">
                  <td className="p-4 font-mono text-sm text-brandBlue">{cert.certId}</td>
                  <td className="p-4 font-medium text-slate-900 dark:text-white">{cert.studentName}</td>
                  <td className="p-4 text-slate-600 dark:text-slate-300">{cert.courseName}</td>
                  <td className="p-4 text-slate-500 dark:text-slate-400">
                    {new Date(cert.issueDate).toLocaleDateString()}
                  </td>
                  <td className="p-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      cert.status === 'valid' 
                        ? 'bg-green-100 dark:bg-green-500/20 text-green-700 dark:text-green-400' 
                        : 'bg-red-100 dark:bg-red-500/20 text-red-700 dark:text-red-400'
                    }`}>
                      {cert.status}
                    </span>
                  </td>
                </tr>
              ))
            ) : (
              filteredEnrollments.map((enr, idx) => (
                <tr key={idx} className="border-b border-slate-100 dark:border-slate-800/50 hover:bg-slate-50 dark:hover:bg-slate-800/20 transition">
                  <td className="p-4 font-medium text-slate-900 dark:text-white flex items-center gap-3">
                    <img src={enr.student?.avatar || '/placeholder.jpg'} alt="" className="w-8 h-8 rounded-full object-cover" />
                    {enr.student?.name}
                  </td>
                  <td className="p-4 text-slate-500 dark:text-slate-400">{enr.student?.email}</td>
                  <td className="p-4 text-slate-900 dark:text-white">{enr.courseTitle}</td>
                  <td className="p-4">
                    <span className="px-3 py-1 rounded-full text-xs font-semibold bg-brandBlue/10 text-brandBlue">
                      {enr.courseCategory}
                    </span>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
        {(activeTab === 'certificates' ? filteredCertificates : filteredEnrollments).length === 0 && (
          <div className="p-8 text-center text-slate-500">No records found.</div>
        )}
      </div>
    </div>
  );
}