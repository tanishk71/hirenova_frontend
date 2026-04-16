import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import AIChatAssistant from "./AIChatAssistant";

export default function Sidebar({ alwaysExpanded = false }) {
  const [isOpen, setIsOpen] = useState(true);
  const [chatDrawerOpen, setChatDrawerOpen] = useState(false);
  const user = JSON.parse(localStorage.getItem("user") || "{}");
  const username = user?.username || "Alex Kumar";
  const initials = username.split(" ").map((n) => n[0]).join("").slice(0, 2).toUpperCase() || "AK";

  const expanded = alwaysExpanded ? true : isOpen;

  // Store original body overflow value
  useEffect(() => {
    const originalOverflow = document.body.style.overflow;
    if (chatDrawerOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = originalOverflow || "unset";
    }
    return () => {
      document.body.style.overflow = originalOverflow || "unset";
    };
  }, [chatDrawerOpen]);

  // Close drawer on ESC
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape") setChatDrawerOpen(false);
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, []);

  const navItems = [
    { path: "/dashboard", label: "Dashboard", icon: "M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" },
    { path: "/jobs", label: "Smart Job Search", icon: "M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" },
    { path: "/dashboard/ats", label: "Resume ATS Analysis", icon: "M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" },
    { path: "/resume-history", label: "Resume History", icon: "M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" },
    { path: "/interview/setup", label: "Interview Tests", icon: "M8 12h.01M12 12h.01M16 12h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" },
    { path: "/learning", label: "Learning Hub", icon: "M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" },
    { path: "/latest-jobs", label: "Latest Jobs", icon: "M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" },
  ];

  const LogoIcon = () => (
    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  );

  return (
    <>
      <aside
        className={`flex-shrink-0 border-r border-gray-700/50 flex flex-col bg-gray-900/95 backdrop-blur-xl transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] ${
          expanded ? "w-72" : "w-20"
        }`}
      >
        {/* Logo and toggle */}
        <div className="p-4 pb-8 border-b border-gray-700/50 flex items-center justify-between relative">
          <div className={`overflow-hidden transition-all duration-500 ${expanded ? "opacity-100 translate-x-0" : "opacity-0 translate-x-4 w-0"}`}>
            {expanded && (
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 flex items-center justify-center shadow-lg shadow-indigo-600/20 animate-pulse-slow">
                  <LogoIcon />
                </div>
                <div>
                  <h1 className="text-xl font-bold text-white">HireNova</h1>
                  <p className="text-xs text-gray-400">AI Career Platform</p>
                </div>
              </div>
            )}
          </div>
          {!expanded && (
            <div className="absolute left-1/2 -translate-x-1/2">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 flex items-center justify-center shadow-lg shadow-indigo-600/20">
                <LogoIcon />
              </div>
            </div>
          )}
          {!alwaysExpanded && (
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-lg hover:bg-white/10 transition-all duration-300 hover:scale-110 active:scale-95 text-gray-400 hover:text-white z-10"
              aria-label={isOpen ? "Collapse sidebar" : "Expand sidebar"}
            >
              <svg className={`w-5 h-5 transition-transform duration-500 ease-out ${isOpen ? "rotate-0" : "rotate-180"}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {isOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 19l-7-7 7-7m8 14l-7-7 7-7" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 5l7 7-7 7M5 5l7 7-7 7" />
                )}
              </svg>
            </button>
          )}
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-700">
          {navItems.map((item, idx) => (
            <NavLink
              key={item.label}
              to={item.path}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-2.5 rounded-xl transition-all duration-300 group relative overflow-hidden ${
                  isActive
                    ? "bg-gradient-to-r from-indigo-600/20 to-purple-600/20 text-indigo-300 border border-indigo-500/30 shadow-[0_0_12px_rgba(99,102,241,0.15)]"
                    : "text-gray-400 hover:bg-white/5 hover:text-white"
                }`
              }
              style={{ transitionDelay: expanded ? `${idx * 30}ms` : "0ms" }}
            >
              <svg className="w-5 h-5 flex-shrink-0 transition-transform duration-300 group-hover:translate-x-1 group-hover:scale-110" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={item.icon} />
              </svg>
              {expanded && <span className="text-sm font-medium flex-1 transition-all duration-300 group-hover:translate-x-1">{item.label}</span>}
            </NavLink>
          ))}
        </nav>

        {/* Chat button in collapsed mode */}
        {!expanded && (
          <div className="px-3 py-2">
            <button
              onClick={() => setChatDrawerOpen(true)}
              className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-indigo-500/10 border border-indigo-500/30 text-indigo-400 hover:bg-indigo-500/20 hover:text-indigo-300 transition-all duration-300 hover:scale-105 active:scale-95 group"
              title="Open AI Assistant"
              aria-label="Open AI Chat Assistant"
            >
              <svg className="w-5 h-5 transition-transform duration-300 group-hover:rotate-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
            </button>
          </div>
        )}

        {/* User profile and logout */}
        <div className="p-4 pt-4 border-t border-gray-700/50">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center font-semibold text-sm text-white shadow-lg flex-shrink-0 transition-all duration-300 hover:scale-105">
              {initials}
            </div>
            {expanded && (
              <div className="flex-1 min-w-0 transition-all duration-500">
                <p className="text-sm font-medium text-white truncate">{username}</p>
                <p className="text-xs text-gray-400">Ready to advance</p>
              </div>
            )}
          </div>

          <button
            onClick={() => {
              localStorage.removeItem("token");
              localStorage.removeItem("user");
              window.location.href = "/";
            }}
            className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 hover:bg-red-500/20 hover:text-red-300 transition-all duration-300 hover:scale-[1.02] active:scale-95 group"
          >
            <svg className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
            {expanded && <span>Logout</span>}
          </button>
        </div>
      </aside>

      {/* Chat Drawer (only opens on demand, no duplicate AIChatAssistant in sidebar) */}
      {chatDrawerOpen && (
        <div className="fixed inset-0 z-50 flex justify-end">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity duration-300 animate-fadeIn" onClick={() => setChatDrawerOpen(false)} />
          <div
            className="relative w-full max-w-md h-full bg-gray-900/95 backdrop-blur-xl border-l border-gray-700/50 shadow-2xl animate-slideInRight flex flex-col"
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
            aria-label="AI Career Assistant"
          >
            <div className="flex items-center justify-between p-4 border-b border-gray-700/50">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-r from-indigo-600 to-purple-600 flex items-center justify-center">
                  <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-white">AI Career Assistant</h3>
              </div>
              <button
                onClick={() => setChatDrawerOpen(false)}
                className="p-2 rounded-lg hover:bg-white/10 transition-all duration-200 text-gray-400 hover:text-white"
                aria-label="Close chat"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="flex-1 overflow-y-auto">
              <AIChatAssistant />
            </div>
          </div>
        </div>
      )}

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes slideInRight {
          from { transform: translateX(100%); }
          to { transform: translateX(0); }
        }
        @keyframes pulse-slow {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.9; transform: scale(1.02); }
        }
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out forwards;
        }
        .animate-slideInRight {
          animation: slideInRight 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
        .animate-pulse-slow {
          animation: pulse-slow 3s infinite;
        }
        .scrollbar-thin::-webkit-scrollbar {
          width: 4px;
        }
        .scrollbar-thin::-webkit-scrollbar-track {
          background: rgba(55, 65, 81, 0.5);
          border-radius: 10px;
        }
        .scrollbar-thin::-webkit-scrollbar-thumb {
          background: rgba(139, 92, 246, 0.5);
          border-radius: 10px;
        }
        .scrollbar-thin::-webkit-scrollbar-thumb:hover {
          background: rgba(139, 92, 246, 0.8);
        }
      `}</style>
    </>
  );
}