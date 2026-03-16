import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

export default function TopHeader() {
  const [user, setUser] = useState({ username: "Alex Kumar", email: "" });
  const [showMenu, setShowMenu] = useState(false);
  const menuRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Load user from localStorage
    const storedUser = JSON.parse(localStorage.getItem("user")) || { username: "Alex Kumar", email: "" };
    setUser(storedUser);
  }, []);

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setShowMenu(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const firstName = user?.username?.split(" ")[0] || "Alex";
  const initials =
    user?.username?.split(" ").map((n) => n[0]).join("").slice(0, 2).toUpperCase() || "AK";

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <header className="flex items-center justify-between mb-8">
      <div className="flex-1">
        <h2 className="text-2xl font-bold text-white mb-1 flex items-center gap-2">
          Welcome back,
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-200 to-purple-200">
            {firstName}
          </span>
          <span className="text-2xl">👋</span>
        </h2>
        <p className="text-gray-400 text-sm flex items-center gap-2">
          <span className="w-1.5 h-1.5 bg-indigo-400 rounded-full"></span>
          Let's boost your hiring readiness today.
        </p>
      </div>

      <div className="flex items-center gap-4 flex-shrink-0">
        {/* Notifications */}
        {/* <button
          onClick={() => navigate("/notifications")}
          className="relative p-3 rounded-xl bg-gray-800/60 border border-gray-700 hover:border-indigo-500/50 hover:bg-gray-700/60 transition-all group"
        >
          <svg className="w-5 h-5 text-gray-400 group-hover:text-indigo-400 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
          </svg>
          <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full text-xs flex items-center justify-center font-semibold text-white border-2 border-gray-900">
          </span>
        </button> */}

        {/* User Menu */}
        <div className="relative" ref={menuRef}>
          <button
            onClick={() => setShowMenu(!showMenu)}
            className="flex items-center gap-3 p-2 pr-4 rounded-xl bg-gray-800/60 border border-gray-700 hover:border-indigo-500/50 hover:bg-gray-700/60 transition-all group"
          >
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center font-semibold text-sm text-white shadow-lg">
              {initials}
            </div>
            <div className="hidden sm:block text-left">
              <p className="text-sm font-medium text-white">{user.username}</p>
            </div>
            <svg className="w-4 h-4 text-gray-500 group-hover:text-indigo-400 transition-colors hidden sm:block" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
            </svg>
          </button>

          {/* Dropdown Menu */}
          {showMenu && (
            <div className="absolute right-0 mt-2 w-64 bg-gray-800 border border-gray-700 rounded-xl shadow-2xl overflow-hidden z-50">
              <div className="p-4 border-b border-gray-700">
                <p className="text-sm font-medium text-white">{user.username}</p>
                <p className="text-xs text-gray-400 mt-1">{user.email}</p>
              </div>
              <button
                onClick={() => navigate("/")}
                className="w-full text-left px-4 py-3 text-sm text-red-400 hover:bg-red-500/10 transition-colors flex items-center gap-2"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                </svg>
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}