import React from "react";
import { NavLink } from "react-router-dom";

const Dropdown = ({
  title,
  items = [],
  isOpen,
  onToggle,
  onLinkClick,
}) => {
  return (
    <div className="select-none">
      {/* HEADER */}
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between px-4 py-3 rounded-xl text-slate-600 dark:text-neutral-300 hover:bg-slate-100 dark:hover:bg-neutral-800 active:scale-[0.98] transition-all duration-200"
      >
        <span className="font-medium tracking-wide">{title}</span>

        {/* CHEVRON ICON */}
        <svg
          className={`w-4 h-4 transition-transform duration-300 ${
            isOpen ? "rotate-180 text-blue-500" : "rotate-0 text-neutral-500"
          }`}
          viewBox="0 0 20 20"
          fill="none"
        >
          <path
            d="M5 7l5 5 5-5"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </svg>
      </button>

      {/* CONTENT */}
      <div
        className={`grid transition-all duration-300 ease-in-out ${
          isOpen
            ? "grid-rows-[1fr] opacity-100 mt-2"
            : "grid-rows-[0fr] opacity-0"
        }`}
      >
        <div className="overflow-hidden">
          <div className="ml-3 pl-3 border-l border-slate-200 dark:border-neutral-800 space-y-1">
            {items.map((item, index) => (
              <NavLink
                key={index}
                to={item.path}
                onClick={onLinkClick}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-all duration-200 ${
                    isActive
                      ? "bg-blue-600 text-white shadow-md"
                      : "text-slate-500 dark:text-neutral-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-neutral-800"
                  }`
                }
              >
                {item.icon && <span className="shrink-0 opacity-70 dark:opacity-80">{item.icon}</span>}
                {item.name}
              </NavLink>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dropdown;