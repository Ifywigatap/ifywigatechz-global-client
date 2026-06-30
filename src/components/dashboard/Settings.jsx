import { useState } from "react";
import { motion } from "framer-motion";

export default function Settings() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    payoutMethod: "bank",
    accountDetails: "",
  });

  const [saved, setSaved] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setSaved(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // 👉 later connect to backend API
    console.log("Saved Settings:", form);

    setSaved(true);

    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="max-w-2xl">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gray-900 p-8 rounded-2xl border border-gray-800 shadow-lg"
      >
        <h2 className="text-2xl font-bold mb-6">Account Settings</h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          
          {/* FULL NAME */}
          <div>
            <label className="block text-sm mb-2 text-gray-400">
              Full Name
            </label>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="John Doe"
              className="w-full bg-transparent border border-gray-700 px-4 py-3 rounded-xl focus:outline-none focus:border-green-500"
            />
          </div>

          {/* EMAIL */}
          <div>
            <label className="block text-sm mb-2 text-gray-400">
              Email Address
            </label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="example@email.com"
              className="w-full bg-transparent border border-gray-700 px-4 py-3 rounded-xl focus:outline-none focus:border-green-500"
            />
          </div>

          {/* PASSWORD */}
          <div>
            <label className="block text-sm mb-2 text-gray-400">
              New Password
            </label>
            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              placeholder="********"
              className="w-full bg-transparent border border-gray-700 px-4 py-3 rounded-xl focus:outline-none focus:border-green-500"
            />
          </div>

          {/* PAYOUT METHOD */}
          <div>
            <label className="block text-sm mb-2 text-gray-400">
              Payout Method
            </label>
            <select
              name="payoutMethod"
              value={form.payoutMethod}
              onChange={handleChange}
              className="w-full bg-transparent border border-gray-700 px-4 py-3 rounded-xl focus:outline-none focus:border-green-500"
            >
              <option value="bank">Bank Transfer</option>
              <option value="crypto">Crypto (USDT/BTC)</option>
            </select>
          </div>

          {/* ACCOUNT DETAILS */}
          <div>
            <label className="block text-sm mb-2 text-gray-400">
              Account / Wallet Details
            </label>
            <textarea
              name="accountDetails"
              value={form.accountDetails}
              onChange={handleChange}
              placeholder="Enter your bank details or wallet address..."
              rows="3"
              className="w-full bg-transparent border border-gray-700 px-4 py-3 rounded-xl focus:outline-none focus:border-green-500"
            />
          </div>

          {/* SAVE BUTTON */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            type="submit"
            className="bg-green-500 hover:bg-green-600 px-6 py-3 rounded-xl font-semibold w-full"
          >
            Save Changes
          </motion.button>

          {/* SUCCESS MESSAGE */}
          {saved && (
            <p className="text-green-400 text-sm text-center mt-3">
              ✅ Settings saved successfully!
            </p>
          )}
        </form>
      </motion.div>
    </div>
  );
}