import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/api";

export default function NotificationsPage() {
  const navigate = useNavigate();
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    type: "all",
    read: "all"
  });
  const [stats, setStats] = useState({
    total: 0,
    unread: 0
  });

  useEffect(() => {
    fetchNotifications();
  }, [filters]);

  const fetchNotifications = async () => {
    try {
      const params = new URLSearchParams();
      if (filters.type !== "all") params.append("type", filters.type);
      if (filters.read !== "all") params.append("read", filters.read === "unread");

      const res = await API.get(`/notifications?${params}&limit=50`);
      setNotifications(res.data.notifications);
      setStats({
        total: res.data.total,
        unread: res.data.unreadCount
      });
    } catch (error) {
      console.error("Failed to fetch notifications:", error);
    } finally {
      setLoading(false);
    }
  };

  const markAsRead = async (id) => {
    try {
      await API.patch(`/notifications/${id}/read`);
      fetchNotifications();
    } catch (error) {
      console.error("Failed to mark as read:", error);
    }
  };

  const markAllAsRead = async () => {
    try {
      await API.post("/notifications/read-all");
      fetchNotifications();
    } catch (error) {
      console.error("Failed to mark all as read:", error);
    }
  };

  const deleteNotification = async (id) => {
    if (confirm("Are you sure you want to delete this notification?")) {
      try {
        await API.delete(`/notifications/${id}`);
        fetchNotifications();
      } catch (error) {
        console.error("Failed to delete notification:", error);
      }
    }
  };

  const clearAll = async () => {
    if (confirm("Are you sure you want to clear all notifications?")) {
      try {
        await API.delete("/notifications");
        fetchNotifications();
      } catch (error) {
        console.error("Failed to clear notifications:", error);
      }
    }
  };

  const getNotificationIcon = (type) => {
    const icons = {
      job_alert: "💼",
      application_update: "📝",
      interview_reminder: "🎯",
      course_recommendation: "📚",
      certificate_earned: "🏆",
      skill_gap_alert: "📊",
      resume_tip: "📄",
      message: "💬",
      system: "⚙️"
    };
    return icons[type] || "📌";
  };

  const getNotificationColor = (type) => {
    const colors = {
      job_alert: "bg-blue-500/20 text-blue-400 border-blue-500/30",
      application_update: "bg-green-500/20 text-green-400 border-green-500/30",
      interview_reminder: "bg-yellow-500/20 text-yellow-400 border-yellow-500/30",
      course_recommendation: "bg-purple-500/20 text-purple-400 border-purple-500/30",
      certificate_earned: "bg-orange-500/20 text-orange-400 border-orange-500/30",
      skill_gap_alert: "bg-red-500/20 text-red-400 border-red-500/30",
      resume_tip: "bg-indigo-500/20 text-indigo-400 border-indigo-500/30",
      message: "bg-pink-500/20 text-pink-400 border-pink-500/30",
      system: "bg-gray-500/20 text-gray-400 border-gray-500/30"
    };
    return colors[type] || "bg-gray-500/20 text-gray-400 border-gray-500/30";
  };

  const getPriorityColor = (priority) => {
    const colors = {
      high: "bg-red-500/20 text-red-400",
      medium: "bg-yellow-500/20 text-yellow-400",
      low: "bg-green-500/20 text-green-400"
    };
    return colors[priority] || colors.medium;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0B1120] via-[#1A1F36] to-[#111827] text-white">
      {/* Header */}
      <div className="border-b border-gray-700/50 bg-gray-900/40 backdrop-blur-md sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <button
              onClick={() => navigate("/dashboard")}
              className="flex items-center gap-2 text-gray-400 hover:text-indigo-400 transition-colors"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Back to Dashboard
            </button>
            <h1 className="text-xl font-bold text-white">Notifications</h1>
            <div className="flex items-center gap-2">
              {stats.unread > 0 && (
                <button
                  onClick={markAllAsRead}
                  className="px-4 py-2 text-sm bg-indigo-600 hover:bg-indigo-500 rounded-lg text-white transition"
                >
                  Mark all as read
                </button>
              )}
              <button
                onClick={clearAll}
                className="px-4 py-2 text-sm bg-red-600/20 hover:bg-red-600/30 text-red-400 rounded-lg transition"
              >
                Clear all
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-gray-800/40 backdrop-blur-md border border-gray-700/50 rounded-xl p-6">
            <p className="text-gray-400 text-sm mb-1">Total Notifications</p>
            <p className="text-3xl font-bold text-white">{stats.total}</p>
          </div>
          <div className="bg-gray-800/40 backdrop-blur-md border border-gray-700/50 rounded-xl p-6">
            <p className="text-gray-400 text-sm mb-1">Unread</p>
            <p className="text-3xl font-bold text-yellow-400">{stats.unread}</p>
          </div>
          <div className="bg-gray-800/40 backdrop-blur-md border border-gray-700/50 rounded-xl p-6">
            <p className="text-gray-400 text-sm mb-1">Read</p>
            <p className="text-3xl font-bold text-green-400">{stats.total - stats.unread}</p>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-gray-800/40 backdrop-blur-md border border-gray-700/50 rounded-xl p-4 mb-8">
          <div className="flex flex-wrap gap-4">
            <select
              value={filters.type}
              onChange={(e) => setFilters({ ...filters, type: e.target.value })}
              className="px-4 py-2 bg-gray-900/60 border border-gray-700 rounded-lg text-gray-300 focus:border-indigo-500 outline-none"
            >
              <option value="all">All Types</option>
              <option value="job_alert">Job Alerts</option>
              <option value="application_update">Application Updates</option>
              <option value="interview_reminder">Interview Reminders</option>
              <option value="course_recommendation">Course Recommendations</option>
              <option value="certificate_earned">Certificates</option>
              <option value="skill_gap_alert">Skill Gap Alerts</option>
              <option value="resume_tip">Resume Tips</option>
              <option value="message">Messages</option>
              <option value="system">System</option>
            </select>
            <select
              value={filters.read}
              onChange={(e) => setFilters({ ...filters, read: e.target.value })}
              className="px-4 py-2 bg-gray-900/60 border border-gray-700 rounded-lg text-gray-300 focus:border-indigo-500 outline-none"
            >
              <option value="all">All Status</option>
              <option value="unread">Unread</option>
              <option value="read">Read</option>
            </select>
          </div>
        </div>

        {/* Notifications List */}
        {loading ? (
          <div className="text-center py-12">
            <div className="animate-spin w-10 h-10 border-4 border-indigo-500 border-t-transparent rounded-full mx-auto mb-4"></div>
            <p className="text-gray-400">Loading notifications...</p>
          </div>
        ) : notifications.length === 0 ? (
          <div className="bg-gray-800/40 backdrop-blur-md border border-gray-700/50 rounded-2xl p-12 text-center">
            <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-gray-700/50 flex items-center justify-center">
              <svg className="w-10 h-10 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">No notifications</h3>
            <p className="text-gray-400">You're all caught up!</p>
          </div>
        ) : (
          <div className="space-y-4">
            {notifications.map(notification => (
              <div
                key={notification._id}
                className={`bg-gray-800/40 backdrop-blur-md border border-gray-700/50 rounded-xl p-6 hover:border-indigo-500/50 transition-all ${
                  !notification.read ? 'border-l-4 border-l-indigo-500' : ''
                }`}
              >
                <div className="flex items-start gap-4">
                  {/* Icon */}
                  <div className={`w-12 h-12 rounded-xl ${getNotificationColor(notification.type)} flex items-center justify-center text-2xl flex-shrink-0`}>
                    {getNotificationIcon(notification.type)}
                  </div>

                  {/* Content */}
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h3 className="text-lg font-semibold text-white">{notification.title}</h3>
                        <p className="text-sm text-gray-400 mt-1">{notification.message}</p>
                      </div>
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${getPriorityColor(notification.priority)}`}>
                        {notification.priority}
                      </span>
                    </div>

                    {/* Metadata */}
                    <div className="flex flex-wrap items-center gap-3 mt-3 text-xs">
                      <span className="text-gray-500 flex items-center gap-1">
                        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        {new Date(notification.createdAt).toLocaleDateString('en-US', {
                          hour: '2-digit',
                          minute: '2-digit',
                          month: 'short',
                          day: 'numeric'
                        })}
                      </span>
                      <span className={`px-2 py-0.5 rounded-full text-xs ${getNotificationColor(notification.type)}`}>
                        {notification.type.replace('_', ' ')}
                      </span>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-3 mt-4 pt-4 border-t border-gray-700/50">
                      {!notification.read && (
                        <button
                          onClick={() => markAsRead(notification._id)}
                          className="text-xs text-indigo-400 hover:text-indigo-300 flex items-center gap-1"
                        >
                          <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                          </svg>
                          Mark as read
                        </button>
                      )}
                      {notification.actionUrl && (
                        <button
                          onClick={() => navigate(notification.actionUrl)}
                          className="text-xs text-indigo-400 hover:text-indigo-300 flex items-center gap-1"
                        >
                          <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                          </svg>
                          View details
                        </button>
                      )}
                      <button
                        onClick={() => deleteNotification(notification._id)}
                        className="text-xs text-red-400 hover:text-red-300 flex items-center gap-1 ml-auto"
                      >
                        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}