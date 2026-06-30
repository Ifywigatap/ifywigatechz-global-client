import { useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { authService } from "../services/auth";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  CartesianGrid,
  Legend,
} from "recharts";
import { Copy, Check, DollarSign, Users, MousePointerClick, CreditCard, Settings as SettingsIcon } from "lucide-react";

// Sample Data
const analyticsData = [
  { name: "Mon", clicks: 40, conversions: 10, earnings: 100 },
  { name: "Tue", clicks: 60, conversions: 20, earnings: 200 },
  { name: "Wed", clicks: 30, conversions: 15, earnings: 150 },
  { name: "Thu", clicks: 80, conversions: 30, earnings: 300 },
  { name: "Fri", clicks: 50, conversions: 25, earnings: 250 },
  { name: "Sat", clicks: 90, conversions: 35, earnings: 350 },
  { name: "Sun", clicks: 70, conversions: 20, earnings: 200 },
];

const referralsData = [
  { id: 1, name: "John Doe", service: "Web Development", status: "Paid", amount: 150, date: "2024-05-10" },
  { id: 2, name: "Jane Smith", service: "UI/UX Design", status: "Pending", amount: 120, date: "2024-05-11" },
  { id: 3, name: "Michael Johnson", service: "Data Analytics Course", status: "Paid", amount: 45, date: "2024-05-09" },
];

const payoutsData = [
  { id: "PAY-1029", amount: 350, status: "Completed", date: "2024-05-01", method: "Bank Transfer" },
  { id: "PAY-1030", amount: 195, status: "Processing", date: "2024-05-15", method: "Crypto (USDT)" },
];

export default function AffiliateDashboard() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("overview");
  const [loading, setLoading] = useState(true);
  const [userProfile, setUserProfile] = useState(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    // Check if user is logged in
    if (!authService.isAuthenticated()) {
      navigate('/affiliate/login');
      return;
    }

    const fetchProfile = async () => {
      try {
        const user = authService.getCurrentUserData()?.user || JSON.parse(localStorage.getItem('user')) || { firstName: 'Affiliate', email: 'affiliate@example.com', affiliateCode: 'REF-IFY-2024' };
        setUserProfile(user);
      } catch (error) {
        console.error("Failed to load profile", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [navigate]);

  const affiliateLink = `https://ifywigatechz.com/?ref=${userProfile?.affiliateCode || 'REF-IFY-2024'}`;

  const copyToClipboard = () => {
    navigator.clipboard.writeText(affiliateLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const stats = useMemo(() => {
    return {
      totalEarnings: analyticsData.reduce((s, d) => s + d.earnings, 0),
      totalClicks: analyticsData.reduce((s, d) => s + d.clicks, 0),
      totalConversions: analyticsData.reduce((s, d) => s + d.conversions, 0),
    };
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 dark:bg-slate-950 py-12 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-green-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-slate-600 dark:text-slate-400">Loading your affiliate dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 py-12 text-slate-900 dark:text-white transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* HEADER */}
        <div className="mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold mb-2">
              Welcome back, {userProfile?.firstName || 'Partner'}! 🚀
            </h1>
            <p className="text-slate-600 dark:text-slate-400">
              Here's what's happening with your affiliate links today.
            </p>
          </div>
          
          <div className="bg-white dark:bg-slate-900/60 p-4 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm dark:shadow-none flex items-center gap-4 transition-colors duration-300">
            <div>
              <p className="text-xs text-slate-500 dark:text-slate-400 uppercase font-semibold">Your Referral Link</p>
              <p className="font-mono text-sm text-green-600 dark:text-green-400 truncate max-w-[200px] sm:max-w-[300px]">
                {affiliateLink}
              </p>
            </div>
            <button 
              onClick={copyToClipboard}
              className="p-2 bg-green-50 dark:bg-green-500/10 text-green-600 dark:text-green-400 rounded-lg hover:bg-green-100 dark:hover:bg-green-500/20 transition-colors duration-300"
              title="Copy Link"
            >
              {copied ? <Check size={20} /> : <Copy size={20} />}
            </button>
          </div>
        </div>

        {/* STATS */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
          <div className="bg-white dark:bg-slate-900/60 p-6 rounded-2xl shadow-sm dark:shadow-none border border-slate-200 dark:border-slate-800 transition-colors duration-300">
            <div className="flex items-center gap-4 mb-4">
              <div className="p-3 bg-green-100 dark:bg-green-500/20 text-green-600 dark:text-green-400 rounded-xl">
                <DollarSign size={24} />
              </div>
              <p className="text-slate-500 dark:text-slate-400 font-medium">Total Earnings</p>
            </div>
            <h2 className="text-3xl font-bold">${stats.totalEarnings.toLocaleString()}</h2>
          </div>
          
          <div className="bg-white dark:bg-slate-900/60 p-6 rounded-2xl shadow-sm dark:shadow-none border border-slate-200 dark:border-slate-800 transition-colors duration-300">
            <div className="flex items-center gap-4 mb-4">
              <div className="p-3 bg-blue-100 dark:bg-blue-500/20 text-blue-600 dark:text-blue-400 rounded-xl">
                <MousePointerClick size={24} />
              </div>
              <p className="text-slate-500 dark:text-slate-400 font-medium">Total Clicks</p>
            </div>
            <h2 className="text-3xl font-bold">{stats.totalClicks.toLocaleString()}</h2>
          </div>

          <div className="bg-white dark:bg-slate-900/60 p-6 rounded-2xl shadow-sm dark:shadow-none border border-slate-200 dark:border-slate-800 transition-colors duration-300">
            <div className="flex items-center gap-4 mb-4">
              <div className="p-3 bg-purple-100 dark:bg-purple-500/20 text-purple-600 dark:text-purple-400 rounded-xl">
                <Users size={24} />
              </div>
              <p className="text-slate-500 dark:text-slate-400 font-medium">Conversions</p>
            </div>
            <h2 className="text-3xl font-bold">{stats.totalConversions.toLocaleString()}</h2>
          </div>
        </div>

        {/* TABS */}
        <div className="bg-white dark:bg-slate-900/60 rounded-2xl shadow-sm dark:shadow-none border border-slate-200 dark:border-slate-800 overflow-hidden mb-8 transition-colors duration-300">
          <div className="flex border-b border-slate-200 dark:border-slate-800 overflow-x-auto transition-colors duration-300">
            {['overview', 'referrals', 'payouts', 'settings'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`flex-1 min-w-[120px] py-4 px-6 font-semibold capitalize transition-colors whitespace-nowrap ${
                  activeTab === tab
                    ? 'bg-green-50 dark:bg-green-500/10 text-green-600 dark:text-green-400 border-b-2 border-green-500'
                    : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          <div className="p-6 md:p-8">
            {/* OVERVIEW TAB */}
            {activeTab === 'overview' && (
              <div className="grid lg:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-lg font-bold mb-6">Earnings Overview</h3>
                  <div className="h-72">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={analyticsData}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#374151" opacity={0.2} />
                        <XAxis dataKey="name" stroke="#6B7280" />
                        <YAxis stroke="#6B7280" />
                        <Tooltip 
                          contentStyle={{ backgroundColor: '#1F2937', borderColor: '#374151', color: '#fff' }}
                          itemStyle={{ color: '#10B981' }}
                        />
                        <Line type="monotone" dataKey="earnings" stroke="#10B981" strokeWidth={3} dot={{ r: 4 }} activeDot={{ r: 6 }} />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-bold mb-6">Clicks vs Conversions</h3>
                  <div className="h-72">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={analyticsData}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#374151" opacity={0.2} />
                        <XAxis dataKey="name" stroke="#6B7280" />
                        <YAxis stroke="#6B7280" />
                        <Tooltip 
                          contentStyle={{ backgroundColor: '#1F2937', borderColor: '#374151', color: '#fff' }}
                        />
                        <Legend />
                        <Bar dataKey="clicks" fill="#3B82F6" radius={[4, 4, 0, 0]} />
                        <Bar dataKey="conversions" fill="#8B5CF6" radius={[4, 4, 0, 0]} />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </div>
            )}

            {/* REFERRALS TAB */}
            {activeTab === 'referrals' && (
              <div>
                <h3 className="text-lg font-bold mb-6">Recent Referrals</h3>
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse min-w-[600px]">
                    <thead>
                      <tr className="border-b border-slate-200 dark:border-slate-800 text-slate-500 dark:text-slate-400 text-sm transition-colors duration-300">
                        <th className="pb-3 pr-4 font-semibold">Client Name</th>
                        <th className="pb-3 pr-4 font-semibold">Service Purchased</th>
                        <th className="pb-3 pr-4 font-semibold">Date</th>
                        <th className="pb-3 pr-4 font-semibold">Commission</th>
                        <th className="pb-3 font-semibold">Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {referralsData.map((r) => (
                        <tr key={r.id} className="border-b border-slate-100 dark:border-slate-800/50 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors duration-300">
                          <td className="py-4 pr-4 font-medium">{r.name}</td>
                          <td className="py-4 pr-4 text-slate-600 dark:text-slate-300">{r.service}</td>
                          <td className="py-4 pr-4 text-slate-500 dark:text-slate-400">{r.date}</td>
                          <td className="py-4 pr-4 font-bold text-green-600 dark:text-green-400">${r.amount}</td>
                          <td className="py-4">
                            <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                              r.status === 'Paid' ? 'bg-green-100 dark:bg-green-500/20 text-green-700 dark:text-green-400' : 'bg-yellow-100 dark:bg-yellow-500/20 text-yellow-700 dark:text-yellow-400'
                            }`}>
                              {r.status}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* PAYOUTS TAB */}
            {activeTab === 'payouts' && (
              <div>
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
                  <h3 className="text-lg font-bold">Payout History</h3>
                  <button className="px-6 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg font-semibold transition-colors shadow-md">
                    Request Payout
                  </button>
                </div>
                
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse min-w-[600px]">
                    <thead>
                      <tr className="border-b border-slate-200 dark:border-slate-800 text-slate-500 dark:text-slate-400 text-sm transition-colors duration-300">
                        <th className="pb-3 pr-4 font-semibold">Transaction ID</th>
                        <th className="pb-3 pr-4 font-semibold">Method</th>
                        <th className="pb-3 pr-4 font-semibold">Date</th>
                        <th className="pb-3 pr-4 font-semibold">Amount</th>
                        <th className="pb-3 font-semibold">Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {payoutsData.map((p) => (
                        <tr key={p.id} className="border-b border-slate-100 dark:border-slate-800/50 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors duration-300">
                          <td className="py-4 pr-4 font-mono text-sm">{p.id}</td>
                          <td className="py-4 pr-4 flex items-center gap-2">
                            <CreditCard size={16} className="text-slate-400" />
                            {p.method}
                          </td>
                          <td className="py-4 pr-4 text-slate-500 dark:text-slate-400">{p.date}</td>
                          <td className="py-4 pr-4 font-bold">${p.amount}</td>
                          <td className="py-4">
                            <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                              p.status === 'Completed' ? 'bg-blue-100 dark:bg-blue-500/20 text-blue-700 dark:text-blue-400' : 'bg-slate-100 dark:bg-slate-800/50 text-slate-700 dark:text-slate-300'
                            }`}>
                              {p.status}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* SETTINGS TAB */}
            {activeTab === 'settings' && (
              <div className="max-w-2xl">
                <h3 className="text-lg font-bold mb-6 flex items-center gap-2">
                  <SettingsIcon size={20} />
                  Affiliate Settings
                </h3>
                
                <form className="space-y-6" onSubmit={e => e.preventDefault()}>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Payout Method</label>
                    <select className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg px-4 py-3 text-slate-900 dark:text-white focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition-colors duration-300">
                      <option>Bank Transfer (NGN)</option>
                      <option>Cryptocurrency (USDT/BTC)</option>
                      <option>PayPal</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Account Details</label>
                    <textarea 
                      rows="3" 
                      className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg px-4 py-3 text-slate-900 dark:text-white focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition-colors duration-300"
                      placeholder="Enter Bank Account Number / Crypto Wallet Address..."
                    ></textarea>
                  </div>

                  <div className="pt-4">
                    <button type="submit" className="px-6 py-3 bg-green-500 hover:bg-green-600 text-white rounded-lg font-bold shadow-md transition-colors">
                      Save Changes
                    </button>
                  </div>
                </form>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}