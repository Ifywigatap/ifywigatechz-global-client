import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { authService } from '../services/auth';
import { userService } from '../services/user';
import Toast from '../components/Toast';
import AvatarUpload from '../components/AvatarUpload';

export default function AccountSettings() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [toast, setToast] = useState(null);
  const [activeTab, setActiveTab] = useState('profile');
  const [avatarUrl, setAvatarUrl] = useState(null);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    bio: ''
  });
  const [addressData, setAddressData] = useState({
    street: '',
    city: '',
    state: '',
    zipCode: '',
    country: 'Nigeria'
  });
  const [passwordData, setPasswordData] = useState({
    oldPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [preferences, setPreferences] = useState({
    emailNotifications: true,
    smsNotifications: false,
    marketingEmails: true,
    orderUpdates: true
  });

  useEffect(() => {
    if (!authService.isAuthenticated()) {
      navigate('/login');
      return;
    }

    fetchUserProfile();
  }, [navigate]);

  const fetchUserProfile = async () => {
    try {
      console.log('[AccountSettings] Fetching user profile');
      const response = await userService.getProfile();

      if (response.ok) {
        const user = response.data;
        setFormData({
          firstName: user.firstName || '',
          lastName: user.lastName || '',
          email: user.email || '',
          phone: user.phone || '',
          bio: user.bio || ''
        });

        if (user.billingAddress) {
          setAddressData(user.billingAddress);
        }

        if (user.preferences) {
          setPreferences(user.preferences);
        }

        if (user.avatar) {
          setAvatarUrl(user.avatar);
        }
      }

      setLoading(false);
    } catch (error) {
      console.error('[AccountSettings] Error:', error);
      showToast('Failed to load profile', 'error');
      setLoading(false);
    }
  };

  const showToast = (message, type = 'success') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  const handleProfileChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleAddressChange = (e) => {
    const { name, value } = e.target;
    setAddressData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswordData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleProfileSubmit = async (e) => {
    e.preventDefault();

    try {
      console.log('[AccountSettings] Updating profile');
      const response = await userService.updateProfile(formData);

      if (response.ok) {
        showToast('Profile updated successfully', 'success');
      } else {
        showToast(response.message || 'Failed to update profile', 'error');
      }
    } catch (error) {
      console.error('[AccountSettings] Error:', error);
      showToast(error.message || 'Failed to update profile', 'error');
    }
  };

  const handleAddressSubmit = async (e) => {
    e.preventDefault();

    try {
      console.log('[AccountSettings] Updating address');
      const response = await userService.updateBillingAddress(addressData);

      if (response.ok) {
        showToast('Address updated successfully', 'success');
      } else {
        showToast(response.message || 'Failed to update address', 'error');
      }
    } catch (error) {
      console.error('[AccountSettings] Error:', error);
      showToast(error.message || 'Failed to update address', 'error');
    }
  };

  const handlePasswordSubmit = async (e) => {
    e.preventDefault();

    if (passwordData.newPassword !== passwordData.confirmPassword) {
      showToast('Passwords do not match', 'error');
      return;
    }

    if (passwordData.newPassword.length < 8) {
      showToast('Password must be at least 8 characters', 'error');
      return;
    }

    try {
      console.log('[AccountSettings] Changing password');
      const response = await userService.changePassword(
        passwordData.oldPassword,
        passwordData.newPassword
      );

      if (response.ok) {
        showToast('Password changed successfully', 'success');
        setPasswordData({
          oldPassword: '',
          newPassword: '',
          confirmPassword: ''
        });
      } else {
        showToast(response.message || 'Failed to change password', 'error');
      }
    } catch (error) {
      console.error('[AccountSettings] Error:', error);
      showToast(error.message || 'Failed to change password', 'error');
    }
  };

  const handlePreferencesSubmit = async (e) => {
    e.preventDefault();

    try {
      console.log('[AccountSettings] Updating preferences');
      const response = await userService.updatePreferences(preferences);

      if (response.ok) {
        showToast('Preferences updated successfully', 'success');
      } else {
        showToast(response.message || 'Failed to update preferences', 'error');
      }
    } catch (error) {
      console.error('[AccountSettings] Error:', error);
      showToast(error.message || 'Failed to update preferences', 'error');
    }
  };

if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 dark:bg-slate-950 py-12 transition-colors duration-300">
        <div className="max-w-4xl mx-auto px-4">
          <div className="text-center">
            <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-slate-600 dark:text-slate-400">Loading settings...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 py-12 transition-colors duration-300">
      <div className="max-w-4xl mx-auto px-4">
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-8 transition-colors duration-300">Account Settings</h1>

        <div className="bg-white dark:bg-slate-900 rounded-xl shadow-sm dark:shadow-none border border-slate-200 dark:border-slate-800 overflow-hidden transition-colors duration-300">
          {/* Tabs */}
          <div className="border-b border-slate-200 dark:border-slate-800 divide-x divide-slate-200 dark:divide-slate-800 flex overflow-x-auto transition-colors duration-300">
            {['profile', 'address', 'password', 'preferences'].map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`flex-1 py-4 font-semibold capitalize transition-colors duration-300 whitespace-nowrap ${
                  activeTab === tab
                    ? 'bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 border-b-2 border-blue-600'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-50 dark:hover:bg-slate-800/50'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          <div className="p-8">
            {/* Profile Tab */}
            {activeTab === 'profile' && (
              <form onSubmit={handleProfileSubmit} className="max-w-2xl">
<h2 className="text-2xl font-semibold mb-6 text-slate-900 dark:text-white transition-colors duration-300">Profile Information</h2>

                {/* Avatar Upload Section */}
                <div className="mb-8">
                  <AvatarUpload 
                    currentAvatar={avatarUrl} 
                    onUploadSuccess={(newAvatarUrl) => {
                      setAvatarUrl(newAvatarUrl);
                      showToast('Avatar updated successfully!', 'success');
                    }} 
                  />
                </div>

                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2 transition-colors duration-300">
                        First Name
                      </label>
                      <input
                        type="text"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleProfileChange}
                        className="w-full px-4 py-2 border border-slate-300 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-300"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2 transition-colors duration-300">
                        Last Name
                      </label>
                      <input
                        type="text"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleProfileChange}
                        className="w-full px-4 py-2 border border-slate-300 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-300"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2 transition-colors duration-300">
                      Email Address
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      disabled
                      className="w-full px-4 py-2 border border-slate-300 dark:border-slate-700 rounded-lg bg-slate-50 dark:bg-slate-800/50 text-slate-500 dark:text-slate-500 transition-colors duration-300 cursor-not-allowed"
                    />
                    <p className="text-xs text-slate-500 dark:text-slate-500 mt-2 transition-colors duration-300">Email cannot be changed</p>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2 transition-colors duration-300">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleProfileChange}
                      placeholder="+234..."
                      className="w-full px-4 py-2 border border-slate-300 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-300"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2 transition-colors duration-300">
                      Bio
                    </label>
                    <textarea
                      name="bio"
                      value={formData.bio}
                      onChange={handleProfileChange}
                      rows="4"
                      placeholder="Tell us about yourself"
                      className="w-full px-4 py-2 border border-slate-300 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-300"
                    />
                  </div>

                  <button
                    type="submit"
                    className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-8 rounded-lg transition-colors duration-300 shadow-md"
                  >
                    Save Changes
                  </button>
                </div>
              </form>
            )}

            {/* Address Tab */}
            {activeTab === 'address' && (
              <form onSubmit={handleAddressSubmit} className="max-w-2xl">
<h2 className="text-2xl font-semibold mb-6 text-slate-900 dark:text-white transition-colors duration-300">Billing Address</h2>

                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2 transition-colors duration-300">
                      Street Address
                    </label>
                    <input
                      type="text"
                      name="street"
                      value={addressData.street}
                      onChange={handleAddressChange}
                      className="w-full px-4 py-2 border border-slate-300 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-300"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2 transition-colors duration-300">
                        City
                      </label>
                      <input
                        type="text"
                        name="city"
                        value={addressData.city}
                        onChange={handleAddressChange}
                        className="w-full px-4 py-2 border border-slate-300 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-300"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2 transition-colors duration-300">
                        State
                      </label>
                      <input
                        type="text"
                        name="state"
                        value={addressData.state}
                        onChange={handleAddressChange}
                        className="w-full px-4 py-2 border border-slate-300 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-300"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2 transition-colors duration-300">
                        ZIP Code
                      </label>
                      <input
                        type="text"
                        name="zipCode"
                        value={addressData.zipCode}
                        onChange={handleAddressChange}
                        className="w-full px-4 py-2 border border-slate-300 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-300"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2 transition-colors duration-300">
                        Country
                      </label>
                      <select
                        name="country"
                        value={addressData.country}
                        onChange={handleAddressChange}
                        className="w-full px-4 py-2 border border-slate-300 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-300"
                      >
                        <option>Nigeria</option>
                        <option>Ghana</option>
                        <option>Kenya</option>
                        <option>South Africa</option>
                        <option>Other</option>
                      </select>
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-8 rounded-lg transition-colors duration-300 shadow-md"
                  >
                    Save Address
                  </button>
                </div>
              </form>
            )}

            {/* Password Tab */}
            {activeTab === 'password' && (
              <form onSubmit={handlePasswordSubmit} className="max-w-2xl">
<h2 className="text-2xl font-semibold mb-6 text-slate-900 dark:text-white transition-colors duration-300">Change Password</h2>

                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2 transition-colors duration-300">
                      Current Password
                    </label>
                    <input
                      type="password"
                      name="oldPassword"
                      value={passwordData.oldPassword}
                      onChange={handlePasswordChange}
                      required
                      className="w-full px-4 py-2 border border-slate-300 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-300"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2 transition-colors duration-300">
                      New Password
                    </label>
                    <input
                      type="password"
                      name="newPassword"
                      value={passwordData.newPassword}
                      onChange={handlePasswordChange}
                      required
                      className="w-full px-4 py-2 border border-slate-300 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-300"
                    />
                    <p className="text-xs text-slate-600 dark:text-slate-400 mt-2 transition-colors duration-300">Minimum 8 characters</p>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2 transition-colors duration-300">
                      Confirm Password
                    </label>
                    <input
                      type="password"
                      name="confirmPassword"
                      value={passwordData.confirmPassword}
                      onChange={handlePasswordChange}
                      required
                      className="w-full px-4 py-2 border border-slate-300 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-300"
                    />
                  </div>

                  <button
                    type="submit"
                    className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-8 rounded-lg transition-colors duration-300 shadow-md"
                  >
                    Change Password
                  </button>
                </div>
              </form>
            )}

            {/* Preferences Tab */}
            {activeTab === 'preferences' && (
              <form onSubmit={handlePreferencesSubmit} className="max-w-2xl">
<h2 className="text-2xl font-semibold mb-6 text-slate-900 dark:text-white transition-colors duration-300">Notification Preferences</h2>

                <div className="space-y-4">
                  {[
                    { key: 'emailNotifications', label: 'Email Notifications', description: 'Receive important updates via email' },
                    { key: 'smsNotifications', label: 'SMS Notifications', description: 'Receive SMS alerts for orders' },
                    { key: 'marketingEmails', label: 'Marketing Emails', description: 'Receive promotional offers and news' },
                    { key: 'orderUpdates', label: 'Order Updates', description: 'Get notified about your order status' }
                  ].map(pref => (
                    <label key={pref.key} className="flex items-center p-4 border border-slate-200 dark:border-slate-700 rounded-lg cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors duration-300">
                      <input
                        type="checkbox"
                        checked={preferences[pref.key]}
                        onChange={(e) => setPreferences(prev => ({
                          ...prev,
                          [pref.key]: e.target.checked
                        }))}
                        className="w-5 h-5 rounded border-slate-300 dark:border-slate-600 text-blue-600 focus:ring-blue-500 dark:bg-slate-700"
                      />
                      <div className="ml-4">
                        <p className="font-semibold text-slate-900 dark:text-white transition-colors duration-300">{pref.label}</p>
                        <p className="text-sm text-slate-600 dark:text-slate-400 transition-colors duration-300">{pref.description}</p>
                      </div>
                    </label>
                  ))}
                </div>

                <button
                  type="submit"
                  className="mt-8 bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-8 rounded-lg transition-colors duration-300 shadow-md"
                >
                  Save Preferences
                </button>
              </form>
            )}
          </div>
        </div>
      </div>

      {toast && <Toast message={toast.message} type={toast.type} />}
    </div>
  );
}
