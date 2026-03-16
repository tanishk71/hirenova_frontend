import { useLocation, useNavigate } from "react-router-dom";

export default function InterviewResult() {
  const location = useLocation();
  const navigate = useNavigate();

  const { score, total, percentage, topicBreakdown, hiringReadiness } = location.state || {};

  // Helper to determine color based on percentage
  const getScoreColor = (value) => {
    if (value >= 80) return "text-green-400";
    if (value >= 60) return "text-yellow-400";
    if (value >= 40) return "text-orange-400";
    return "text-red-400";
  };

  const getProgressColor = (value) => {
    if (value >= 80) return "bg-green-500";
    if (value >= 60) return "bg-yellow-500";
    if (value >= 40) return "bg-orange-500";
    return "bg-red-500";
  };

  return (
    <div className="min-h-screen p-4 md:p-8 text-gray-100 bg-gradient-to-br from-[#0B1120] via-[#1A1F36] to-[#111827]">
      <div className="max-4xl mx-auto">

        {/* Main result card with premium glass effect */}
        <div className="bg-gray-800/40 backdrop-blur-xl border border-gray-700/50 rounded-3xl shadow-2xl p-6 md:p-10 transition-all duration-300 hover:border-indigo-500/30">

          {/* Header with animated checkmark or icon */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-indigo-500/20 to-purple-500/20 border border-indigo-500/30 mb-4">
              <svg className="w-10 h-10 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h1 className="text-4xl md:text-5xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-indigo-200 to-purple-200 drop-shadow-lg">
              Interview Complete
            </h1>
            <p className="text-gray-400 mt-2">Here's how you performed</p>
          </div>

          {/* Score cards grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            {/* Score card */}
            <div className="bg-gray-900/40 rounded-2xl border border-gray-700/50 p-6 text-center">
              <p className="text-sm uppercase tracking-wider text-gray-400 mb-2">Your Score</p>
              <div className="flex items-baseline justify-center gap-1">
                <span className={`text-5xl font-bold ${getScoreColor(percentage)}`}>{score}</span>
                <span className="text-2xl text-gray-500">/</span>
                <span className="text-3xl text-gray-400">{total}</span>
              </div>
              <div className="mt-3 flex items-center justify-center gap-2">
                <div className={`w-2 h-2 rounded-full ${getProgressColor(percentage)}`}></div>
                <p className={`text-lg font-semibold ${getScoreColor(percentage)}`}>
                  {percentage}%
                </p>
              </div>
            </div>

            {/* Hiring Readiness card */}
            <div className="bg-gray-900/40 rounded-2xl border border-gray-700/50 p-6">
              <p className="text-sm uppercase tracking-wider text-gray-400 mb-3">Hiring Readiness</p>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-gray-300">Readiness level</span>
                <span className={`text-lg font-bold ${getScoreColor(hiringReadiness)}`}>
                  {hiringReadiness}%
                </span>
              </div>
              <div className="w-full h-4 bg-gray-700 rounded-full overflow-hidden">
                <div
                  className={`h-full rounded-full transition-all duration-1000 ${getProgressColor(hiringReadiness)}`}
                  style={{ width: `${hiringReadiness}%` }}
                />
              </div>
              <p className="text-xs text-gray-500 mt-3">
                {hiringReadiness >= 80 && "Excellent — You're ready for interviews!"}
                {hiringReadiness >= 60 && hiringReadiness < 80 && "Good — Keep practicing"}
                {hiringReadiness >= 40 && hiringReadiness < 60 && "Fair — Review weak topics"}
                {hiringReadiness < 40 && "Needs improvement — Focus on fundamentals"}
              </p>
            </div>
          </div>

          {/* Topic Breakdown - if available */}
          {topicBreakdown && Object.keys(topicBreakdown).length > 0 && (
            <div className="mb-8 bg-gray-900/40 rounded-2xl border border-gray-700/50 p-6">
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <span className="w-2 h-2 bg-indigo-400 rounded-full"></span>
                Topic Breakdown
              </h3>
              <div className="space-y-5">
                {Object.entries(topicBreakdown).map(([topic, stats]) => {
                  const topicPercentage = Math.round((stats.correct / stats.total) * 100);
                  return (
                    <div key={topic}>
                      <div className="flex justify-between items-center mb-1 text-sm">
                        <span className="text-gray-300 capitalize">{topic.replace(/_/g, ' ')}</span>
                        <span className="text-indigo-300 font-mono">
                          {stats.correct}/{stats.total} ({topicPercentage}%)
                        </span>
                      </div>
                      <div className="w-full h-2.5 bg-gray-700 rounded-full overflow-hidden">
                        <div
                          className={`h-full rounded-full ${getProgressColor(topicPercentage)}`}
                          style={{ width: `${topicPercentage}%` }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Performance message */}
          <div className="text-center mb-8 p-4 bg-indigo-900/20 border border-indigo-500/30 rounded-xl">
            <p className="text-gray-300">
              {percentage >= 70
                ? "🎉 Great job! Your performance is strong."
                : percentage >= 50
                ? "📈 Good effort! Focus on improving weaker areas."
                : "💪 Keep practicing! Review the topics below to level up."}
            </p>
          </div>

          {/* Action buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => navigate("/dashboard")}
              className="px-8 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-semibold rounded-xl shadow-lg shadow-indigo-600/20 transform transition hover:scale-[1.02] flex items-center justify-center gap-2"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
              Dashboard
            </button>
            <button
              onClick={() => navigate("/interview/setup")}
              className="px-8 py-3 bg-gray-700 hover:bg-gray-600 text-white font-semibold rounded-xl shadow-lg transform transition hover:scale-[1.02] flex items-center justify-center gap-2"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
              New Interview
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}