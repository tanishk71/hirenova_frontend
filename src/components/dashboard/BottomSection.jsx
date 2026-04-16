import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import API from "../../api/api";

export default function BottomSection() {
  const navigate = useNavigate();
  const [weeklyActivity, setWeeklyActivity] = useState([]);
  const [skillImprovement, setSkillImprovement] = useState([]);
  const [loading, setLoading] = useState(true);
  const [timeRange, setTimeRange] = useState("week"); // "week", "month", "year"

  // Generate dynamic day labels for the last 7 days
  const today = new Date();
  const days = [];
  for (let i = 6; i >= 0; i--) {
    const d = new Date(today);
    d.setDate(d.getDate() - i);
    days.push(d);
  }
  const dayLabels = days.map(d => d.toLocaleDateString('en-US', { weekday: 'short' }));

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const [activityRes, skillsRes] = await Promise.all([
          API.get(`/user/weekly-activity?range=${timeRange}`),
          API.get(`/user/skill-improvement?range=${timeRange}`),
        ]);
        setWeeklyActivity(activityRes.data || []);
        setSkillImprovement(skillsRes.data || []);
      } catch (error) {
        console.error("Failed to fetch performance data", error);
        setWeeklyActivity([]);
        setSkillImprovement([]);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [timeRange]);

  const handleRangeChange = (e) => {
    setTimeRange(e.target.value);
  };

  if (loading) {
    return (
      <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-gray-800/40 backdrop-blur-md border border-gray-700/50 rounded-2xl p-6">
          <div className="animate-pulse space-y-4">
            <div className="h-6 bg-gray-700 rounded w-48"></div>
            <div className="h-40 bg-gray-700 rounded"></div>
          </div>
        </div>
        <div className="bg-gray-800/40 backdrop-blur-md border border-gray-700/50 rounded-2xl p-6">
          <div className="animate-pulse space-y-4">
            <div className="h-6 bg-gray-700 rounded w-32"></div>
            <div className="h-24 bg-gray-700 rounded"></div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Performance Insights - spans 2 columns */}
      <div className="lg:col-span-2 bg-gray-800/40 backdrop-blur-md border border-gray-700/50 rounded-2xl p-6 shadow-xl hover:border-indigo-500/30 transition-all duration-300">
        <div className="flex items-center justify-between mb-6 flex-wrap gap-4">
          <h3 className="text-lg font-semibold text-white flex items-center gap-2">
            <span className="w-2 h-2 bg-indigo-400 rounded-full"></span>
            Your Performance Insights
          </h3>
          <select
            value={timeRange}
            onChange={handleRangeChange}
            className="bg-gray-900/60 border border-gray-700 rounded-lg px-4 py-2.5 text-sm text-gray-300 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 cursor-pointer appearance-none"
          >
            <option value="week" className="bg-gray-800">This Week</option>
            <option value="month" className="bg-gray-800">This Month</option>
            <option value="year" className="bg-gray-800">This Year</option>
          </select>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Weekly Activity Chart */}
          <div>
            <h4 className="text-gray-400 text-sm mb-4 font-medium flex items-center gap-2">
              <span className="w-1.5 h-1.5 bg-indigo-400 rounded-full"></span>
              Weekly Activity
            </h4>
            {weeklyActivity.length > 0 ? (
              <div className="flex items-end justify-between h-40 gap-2">
                {dayLabels.map((day, index) => {
                  const value = weeklyActivity[index] || 0;
                  return (
                    <div key={day} className="flex-1 flex flex-col items-center gap-2 group">
                      <div className="relative w-full h-40">
                        <div
                          className="absolute bottom-0 w-full bg-gradient-to-t from-indigo-500 to-purple-500 rounded-t-lg transition-all duration-300 group-hover:from-indigo-400 group-hover:to-purple-400"
                          style={{ height: `${value}%`, minHeight: '4px' }}
                        />
                        <div className="absolute -top-6 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity bg-gray-900 text-indigo-300 text-xs px-2 py-1 rounded">
                          {value}%
                        </div>
                      </div>
                      <span className="text-xs text-gray-500 font-medium">{day}</span>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="h-40 flex items-center justify-center text-gray-500 text-sm border border-dashed border-gray-700 rounded-lg">
                No activity data for this period
              </div>
            )}
          </div>

          {/* Skill Improvement */}
          <div>
            <h4 className="text-gray-400 text-sm mb-4 font-medium flex items-center gap-2">
              <span className="w-1.5 h-1.5 bg-purple-400 rounded-full"></span>
              Skill Improvement
            </h4>
            {skillImprovement.length > 0 ? (
              skillImprovement.map((item) => {
                const percentage = Math.min(item.percentage, 100);
                return (
                  <div key={item.name} className="mb-5">
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-gray-400">{item.name}</span>
                      <span className="text-indigo-300 font-semibold">{percentage}%</span>
                    </div>
                    <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full transition-all duration-700"
                        style={{ width: `${percentage}%` }}
                      />
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="text-gray-500 text-sm text-center py-8 border border-dashed border-gray-700 rounded-lg">
                No skill data available
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-gray-800/40 backdrop-blur-md border border-gray-700/50 rounded-2xl p-6 shadow-xl hover:border-indigo-500/30 transition-all duration-300">
        <h3 className="text-lg font-semibold text-white mb-6 flex items-center gap-2">
          <span className="w-2 h-2 bg-indigo-400 rounded-full"></span>
          Quick Actions
        </h3>

        <div className="space-y-3">
          <button
            onClick={() => navigate("/dashboard/ats")}
            className="w-full flex items-center gap-4 p-4 rounded-xl bg-gray-900/40 border border-gray-700/50 hover:border-indigo-500/50 hover:bg-gray-800/60 transition-all group"
          >
            <div className="p-2.5 rounded-lg bg-indigo-500/20 group-hover:scale-110 transition-transform">
              <svg className="w-5 h-5 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <span className="font-medium text-sm text-gray-300 group-hover:text-white transition-colors text-left">
              Check Resume ATS Score
            </span>
          </button>

          <button
            onClick={() => navigate("/interview/setup")}
            className="w-full flex items-center gap-4 p-4 rounded-xl bg-gray-900/40 border border-gray-700/50 hover:border-indigo-500/50 hover:bg-gray-800/60 transition-all group"
          >
            <div className="p-2.5 rounded-lg bg-purple-500/20 group-hover:scale-110 transition-transform">
              <svg className="w-5 h-5 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <span className="font-medium text-sm text-gray-300 group-hover:text-white transition-colors text-left">
              Take Mock Interview Test
            </span>
          </button>

          <button
            onClick={() => navigate("/jobs")}
            className="w-full flex items-center gap-4 p-4 rounded-xl bg-gray-900/40 border border-gray-700/50 hover:border-indigo-500/50 hover:bg-gray-800/60 transition-all group"
          >
            <div className="p-2.5 rounded-lg bg-green-500/20 group-hover:scale-110 transition-transform">
              <svg className="w-5 h-5 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <span className="font-medium text-sm text-gray-300 group-hover:text-white transition-colors text-left">
              Search Jobs
            </span>
          </button>

          <button
            onClick={() => navigate("/learning")}
            className="w-full flex items-center gap-4 p-4 rounded-xl bg-gray-900/40 border border-gray-700/50 hover:border-indigo-500/50 hover:bg-gray-800/60 transition-all group"
          >
            <div className="p-2.5 rounded-lg bg-yellow-500/20 group-hover:scale-110 transition-transform">
              <svg className="w-5 h-5 text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
              </svg>
            </div>
            <span className="font-medium text-sm text-gray-300 group-hover:text-white transition-colors text-left">
              Improve Skill Gaps
            </span>
          </button>
        </div>
      </div>
    </section>
  );
}