import { motion, AnimatePresence } from "framer-motion";
import {
  LayoutDashboard,
  Users,
  CreditCard,
  Settings,
  LogOut,
  X,
} from "lucide-react";

export default function Sidebar({
  active,
  setActive,
  isOpen,
  setIsOpen,
}) {
  const menuItems = [
    { name: "overview", label: "Dashboard", icon: LayoutDashboard },
    { name: "referrals", label: "Referrals", icon: Users },
    { name: "payouts", label: "Payouts", icon: CreditCard },
    { name: "settings", label: "Settings", icon: Settings },
  ];

  const handleClick = (tab) => {
    setActive(tab);
    setIsOpen(false); // auto close on mobile
  };

  return (
    <>
      {/* 🔹 DESKTOP SIDEBAR */}
      <aside className="hidden md:flex w-64 h-screen bg-[#0a0d18] border-r border-gray-800 flex-col justify-between">
        <SidebarContent
          active={active}
          handleClick={handleClick}
          menuItems={menuItems}
        />
      </aside>

      {/* 🔹 MOBILE SIDEBAR */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* BACKDROP */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.6 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-black z-40"
            />

            {/* SLIDE MENU */}
            <motion.aside
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "tween" }}
              className="fixed top-0 left-0 w-64 h-screen bg-[#0a0d18] z-50 border-r border-gray-800 flex flex-col justify-between"
            >
              {/* CLOSE BUTTON */}
              <div className="flex justify-end p-4">
                <button onClick={() => setIsOpen(false)}>
                  <X size={24} />
                </button>
              </div>

              <SidebarContent
                active={active}
                handleClick={handleClick}
                menuItems={menuItems}
              />
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
}

/* 🔹 REUSABLE CONTENT */
function SidebarContent({ active, handleClick, menuItems }) {
  return (
    <>
      {/* TOP */}
      <div className="p-6">
        <h1 className="text-2xl font-extrabold text-green-400 mb-10">
          IFYWIGATECHZ
        </h1>

        <nav className="space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = active === item.name;

            return (
              <motion.button
                key={item.name}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => handleClick(item.name)}
                className={`flex items-center gap-3 w-full px-4 py-3 rounded-xl transition ${
                  isActive
                    ? "bg-green-500 text-black font-semibold"
                    : "text-gray-400 hover:bg-gray-800"
                }`}
              >
                <Icon size={20} />
                {item.label}
              </motion.button>
            );
          })}
        </nav>
      </div>

      {/* BOTTOM */}
      <div className="p-6 border-t border-gray-800">
        <button className="flex items-center gap-3 text-red-400 hover:text-red-500 transition">
          <LogOut size={18} />
          Logout
        </button>
      </div>
    </>
  );
}