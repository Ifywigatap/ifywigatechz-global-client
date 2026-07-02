import { motion } from "framer-motion";
import { Bell, Search, Menu } from "lucide-react";

export default function Header({
  title = "Dashboard",
  user,
  setIsOpen,
}) {
  // Safely extract display name from user object or string
  const displayName = user?.name || user?.firstName || (user?.email ? user.email.split('@')[0] : 'User');
  
  // Avatar URL or fallback initials
  const avatarInitials = user?.name 
    ? user.name.charAt(0).toUpperCase()
    : user?.email 
      ? user.email.charAt(0).toUpperCase()
      : '?';
      
  const avatarSrc = user?.avatar;
  return (
    <header className="sticky top-0 z-30 backdrop-blur bg-[#0a0d18]/80 border-b border-gray-800 mb-6">
      <div className="flex items-center justify-between px-4 md:px-6 py-4">
        
        {/* 🔹 LEFT */}
        <div className="flex items-center gap-3">
          
          {/* MOBILE MENU BUTTON */}
          <button
            onClick={() => setIsOpen(true)}
            className="md:hidden p-2 rounded-lg hover:bg-gray-800 transition"
          >
            <Menu size={22} />
          </button>

          {/* TITLE */}
          <div>
            <h1 className="text-xl md:text-2xl font-bold capitalize leading-tight">
              {title}
            </h1>
            <p className="text-gray-400 text-xs md:text-sm">
              Welcome back, {displayName} 👋
            </p>
          </div>
        </div>

        {/* 🔹 RIGHT */}
        <div className="flex items-center gap-3 md:gap-4">
          
          {/* 🔍 SEARCH */}
          <div className="hidden md:flex items-center bg-gray-900/80 border border-gray-800 px-3 py-2 rounded-xl focus-within:border-green-500 transition">
            <Search size={16} className="text-gray-400 mr-2" />
            <input
              type="text"
              placeholder="Search dashboard..."
              className="bg-transparent outline-none text-sm placeholder-gray-500"
            />
          </div>

          {/* 🔔 NOTIFICATION */}
          <motion.div
            whileHover={{ scale: 1.08 }}
            className="relative cursor-pointer p-2 rounded-lg hover:bg-gray-800 transition"
          >
            <Bell size={20} />
            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />
          </motion.div>

          {/* 👤 USER */}
          <div className="flex items-center gap-2 bg-gray-900/80 px-2 md:px-3 py-2 rounded-xl border border-gray-800">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${user?.avatar ? 'bg-gray-200' : 'bg-green-500 text-black'}`}>
              {avatarSrc ? (
                <img src={avatarSrc} alt={displayName} className="w-full h-full rounded-full object-cover" />
              ) : (
                avatarInitials
              )}
            </div>
            <span className="hidden md:block text-sm">{displayName}</span>
          </div>

          {/* 💰 WITHDRAW */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-green-500 hover:bg-green-600 px-3 md:px-4 py-2 rounded-xl font-semibold text-sm md:text-base"
          >
            Withdraw
          </motion.button>
        </div>
      </div>
    </header>
  );
}