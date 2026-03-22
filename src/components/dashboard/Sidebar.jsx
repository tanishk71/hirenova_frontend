import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import AIChatAssistant from "./AIChatAssistant";

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(true);
  const [chatOpen, setChatOpen] = useState(false);
  const user = JSON.parse(localStorage.getItem("user")) || { username: "Alex Kumar" };
  const initials = user?.username?.split(" ").map((n) => n[0]).join("").slice(0, 2).toUpperCase() || "AK";

  useEffect(() => {
    const handleOpenChat = () => {
      setChatOpen(true);
      if (!isOpen) setIsOpen(true);
    };
    window.addEventListener("openAIChat", handleOpenChat);
    return () => window.removeEventListener("openAIChat", handleOpenChat);
  }, [isOpen]);

  const navItems = [
    { path: "/dashboard", label: "Dashboard", icon: "M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" },
    { path: "/jobs", label: "Smart Job Search", icon: "M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" },
    { path: "/dashboard/ats", label: "Resume ATS Analysis", icon: "M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" },
    { path: "/resume-history", label: "Resume History", icon: "M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" },
    { path: "/interview/setup", label: "Interview Tests", icon: "M8 12h.01M12 12h.01M16 12h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" },
    { path: "/learning", label: "Learning Hub", icon: "M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" },
    { path: "/latest-jobs", label: "Latest Jobs", icon: "M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" },
  ];

  return (
    <aside
      className={`flex-shrink-0 border-r border-gray-700/50 flex flex-col bg-gray-900/95 backdrop-blur-xl transition-all duration-300 ease-in-out ${
        isOpen ? "w-72" : "w-20"
      }`}
    >
      {/* Logo and Toggle Section */}
      <div className="p-4 pb-8 border-b border-gray-700/50 flex items-center justify-between">
        {isOpen ? (
          <div className="flex items-center gap-3">
            {/* Custom Logo */}
            <div className="w-10 h-10 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 flex items-center justify-center shadow-lg shadow-indigo-600/20 flex-shrink-0">
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <div>
              <h1 className="text-xl font-bold text-white">HireNova</h1>
              <p className="text-xs text-gray-400">AI Career Platform</p>
            </div>
          </div>
        ) : (
          <div className="w-full flex justify-center">
            {/* Compact logo when closed */}
            <div className="w-10 h-10 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 flex items-center justify-center shadow-lg shadow-indigo-600/20">
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
          </div>
        )}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="p-2 rounded-lg hover:bg-white/5 transition-colors text-gray-400 hover:text-white"
          aria-label={isOpen ? "Collapse sidebar" : "Expand sidebar"}
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {isOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 19l-7-7 7-7m8 14l-7-7 7-7" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 5l7 7-7 7M5 5l7 7-7 7" />
            )}
          </svg>
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
        {navItems.map((item) => (
          <NavLink
            key={item.label}
            to={item.path}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-2.5 rounded-xl transition-all duration-200 group ${
                isActive
                  ? "bg-gradient-to-r from-indigo-600/20 to-purple-600/20 text-indigo-300 border border-indigo-500/30"
                  : "text-gray-400 hover:bg-white/5 hover:text-white"
              }`
            }
          >
            <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={item.icon} />
            </svg>
            {isOpen && (
              <>
                <span className="text-sm font-medium flex-1">{item.label}</span>
                {item.badge && (
                  <span
                    className={`text-xs px-2 py-0.5 rounded-full font-semibold ${
                      item.badge === "AI"
                        ? "bg-gradient-to-r from-indigo-600 to-purple-600 text-white"
                        : "bg-red-500 text-white"
                    }`}
                  >
                    {item.badge}
                  </span>
                )}
              </>
            )}
          </NavLink>
        ))}
      </nav>

      {/* AI Chat Assistant */}
      {isOpen && (
        <div className="mb-4 px-4">
          <AIChatAssistant />
        </div>
      )}

      {/* User Profile */}
      <div className="p-6 pt-4 border-t border-gray-700/50">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center font-semibold text-sm text-white shadow-lg flex-shrink-0">
            {initials}
          </div>
          {isOpen && (
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-white truncate">{user.username}</p>
            </div>
          )}
        </div>

        <button
          onClick={() => {
            localStorage.removeItem("token");
            localStorage.removeItem("user");
            window.location.href = "/";
          }}
          className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 hover:bg-red-500/20 hover:text-red-300 transition-all text-sm font-medium"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
          </svg>
          {isOpen && <span>Logout</span>}
        </button>
      </div>
    </aside>
  );
}