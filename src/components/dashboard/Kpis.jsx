import { useState, useEffect } from "react";
import API from "../../api/api";

export default function Kpis() {
  const [stats, setStats] = useState({
    jobReadiness: 0,
    atsScore: 0,
    interviewReadiness: 0,
    skillGap: { total: 0, completed: 0 },
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await API.get("/user/dashboard-stats");
        setStats(res.data);
      } catch (error) {
        console.error("Failed to fetch KPIs", error);
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  const { jobReadiness, atsScore, interviewReadiness, skillGap } = stats;

  // Safely compute percentage for skill gap
  const skillGapPercentage = skillGap.total > 0
    ? (Number(skillGap.completed) / Number(skillGap.total)) * 100
    : 0;

  if (loading) {
    return <div className="text-gray-400 text-center py-8">Loading your stats...</div>;
  }

  return (
    <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8 place-items-center">
      {/* Job Readiness Card */}
      <div className="w-full bg-gray-800/40 backdrop-blur-md border border-gray-700/50 rounded-2xl p-6 shadow-xl hover:border-indigo-500/50 transition-all duration-300 relative overflow-hidden group">
        <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-indigo-500/20 to-transparent rounded-full -translate-y-1/2 translate-x-1/2 pointer-events-none group-hover:scale-150 transition-transform duration-700" />
        <div className="relative">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 rounded-xl bg-indigo-500/20 flex-shrink-0">
              <svg className="w-6 h-6 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div className="relative w-20 h-20">
              <svg className="w-20 h-20 transform -rotate-90" viewBox="0 0 36 36">
                <path
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  fill="none"
                  stroke="#374151"
                  strokeWidth="3"
                />
                <path
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831"
                  fill="none"
                  stroke="url(#gradient)"
                  strokeWidth="3"
                  strokeDasharray={`${jobReadiness}, 100`}
                  strokeLinecap="round"
                />
                <defs>
                  <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#818cf8" />
                    <stop offset="100%" stopColor="#c084fc" />
                  </linearGradient>
                </defs>
              </svg>
              <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-lg font-bold text-white">
                {jobReadiness}
              </span>
            </div>
          </div>
          <h3 className="text-gray-400 text-sm mb-1 text-center">Your Job Readiness</h3>
          <p className="text-xl font-bold text-white flex items-center justify-center gap-2">
            {jobReadiness >= 70 ? "Hiring Ready" : "Building Skills"}
            {jobReadiness > 0 && (
              <span className="text-xs px-2 py-0.5 bg-green-500/20 text-green-400 rounded-full">
                {jobReadiness > 70 ? "+" : ""}{Math.round(jobReadiness/10)}%
              </span>
            )}
          </p>
        </div>
      </div>

      {/* ATS Resume Score */}
      <div className="w-full bg-gray-800/40 backdrop-blur-md border border-gray-700/50 rounded-2xl p-6 shadow-xl hover:border-indigo-500/50 transition-all duration-300 relative overflow-hidden group">
        <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-purple-500/20 to-transparent rounded-full -translate-y-1/2 translate-x-1/2 pointer-events-none group-hover:scale-150 transition-transform duration-700" />
        <div className="relative">
          <div className="flex items-start justify-between mb-4">
            <div className="p-3 rounded-xl bg-purple-500/20">
              <svg className="w-6 h-6 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            {atsScore > 0 && (
              <span className="text-xs px-2 py-1 bg-green-500/20 text-green-400 rounded-full">
                {atsScore >= 80 ? "+" : ""}{atsScore - 70}%
              </span>
            )}
          </div>
          <h3 className="text-gray-400 text-sm mb-2 text-center">ATS Resume Score</h3>
          <div className="flex items-end justify-center gap-2">
            <p className="text-3xl font-bold text-white">{atsScore || "—"}</p>
            <span className="text-sm text-gray-500 pb-1">/100</span>
          </div>
          <div className="mt-3 w-full h-1.5 bg-gray-700 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full"
              style={{ width: `${atsScore}%` }}
            />
          </div>
        </div>
      </div>

      {/* Interview Readiness Card */}
      <div className="w-full bg-gray-800/40 backdrop-blur-md border border-gray-700/50 rounded-2xl p-6 shadow-xl hover:border-indigo-500/50 transition-all duration-300 relative overflow-hidden group">
        <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-500/20 to-transparent rounded-full -translate-y-1/2 translate-x-1/2 pointer-events-none group-hover:scale-150 transition-transform duration-700" />
        <div className="relative">
          <div className="flex items-start justify-between mb-4">
            <div className="p-3 rounded-xl bg-blue-500/20">
              <svg className="w-6 h-6 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
              </svg>
            </div>
            {interviewReadiness > 0 && (
              <span className="text-xs px-2 py-1 bg-yellow-500/20 text-yellow-400 rounded-full">
                {interviewReadiness >= 70 ? "+" : ""}{Math.round(interviewReadiness/10)}%
              </span>
            )}
          </div>
          <h3 className="text-gray-400 text-sm mb-2 text-center">Interview Readiness</h3>
          <div className="flex items-end justify-center gap-2">
            <p className="text-3xl font-bold text-white">{interviewReadiness || "—"}</p>
            <span className="text-sm text-gray-500 pb-1">/100</span>
          </div>
          <div className="mt-3 w-full h-1.5 bg-gray-700 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full"
              style={{ width: `${interviewReadiness}%` }}
            />
          </div>
        </div>
      </div>

      {/* Skill Gap Card */}
      <div className="w-full bg-gray-800/40 backdrop-blur-md border border-gray-700/50 rounded-2xl p-6 shadow-xl hover:border-indigo-500/50 transition-all duration-300 relative overflow-hidden group">
        <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-amber-500/20 to-transparent rounded-full -translate-y-1/2 translate-x-1/2 pointer-events-none group-hover:scale-150 transition-transform duration-700" />
        <div className="relative">
          <div className="flex items-start justify-between mb-4">
            <div className="p-3 rounded-xl bg-amber-500/20">
              <svg className="w-6 h-6 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
              </svg>
            </div>
            {skillGap.total > 0 && (
              <span className="text-xs px-2 py-1 bg-amber-500/20 text-amber-400 rounded-full">
                {skillGap.total - skillGap.completed} left
              </span>
            )}
          </div>
          <h3 className="text-gray-400 text-sm mb-2 text-center">Skill Gap</h3>
          <div className="flex items-end justify-center gap-2">
            <p className="text-3xl font-bold text-white">{skillGap.total}</p>
            <span className="text-sm text-gray-500 pb-1">topics</span>
          </div>
          <div className="mt-3 w-full h-1.5 bg-gray-700 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-amber-500 to-orange-500 rounded-full"
              style={{
                width: skillGap.total > 0
                  ? `${(Number(skillGap.completed) / Number(skillGap.total)) * 100}%`
                  : '0%'
              }}
            />
          </div>
          <p className="text-xs text-gray-400 mt-2 text-center">
            {skillGap.completed} of {skillGap.total} completed
          </p>
        </div>
      </div>
    </section>
  );
}