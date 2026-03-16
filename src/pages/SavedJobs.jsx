import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function SavedJobs() {
  const navigate = useNavigate();
  const [savedJobs, setSavedJobs] = useState([]);

  useEffect(() => {
    const jobs = localStorage.getItem("savedJobs");
    if (jobs) {
      try {
        setSavedJobs(JSON.parse(jobs));
      } catch (e) {
        console.error("Failed to parse saved jobs", e);
      }
    }
  }, []);

  const removeJob = (jobId) => {
    const updated = savedJobs.filter(job => job.id !== jobId);
    setSavedJobs(updated);
    localStorage.setItem("savedJobs", JSON.stringify(updated));
  };

  const getInitials = (company) => {
    if (!company) return "💼";
    return company.charAt(0).toUpperCase();
  };

  const formatSalary = (job) => {
    if (job.salary) {
      if (typeof job.salary === 'object' && job.salary.min && job.salary.max) {
        return `$${job.salary.min.toLocaleString()} - $${job.salary.max.toLocaleString()}`;
      }
      if (typeof job.salary === 'string') return job.salary;
    }
    return null;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0B1120] via-[#1A1F36] to-[#111827] text-white">
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <button
              onClick={() => navigate("/jobs")}
              className="flex items-center gap-2 text-gray-400 hover:text-indigo-400 transition-colors"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Back to Jobs
            </button>
            <h1 className="text-3xl font-bold">Saved Jobs</h1>
          </div>
          <span className="text-gray-400 text-sm">
            {savedJobs.length} {savedJobs.length === 1 ? 'job' : 'jobs'} saved
          </span>
        </div>

        {savedJobs.length === 0 ? (
          <div className="text-center py-20 bg-gray-800/40 backdrop-blur-md border border-gray-700/50 rounded-2xl">
            <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-gray-700/50 flex items-center justify-center">
              <svg className="w-10 h-10 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">No saved jobs yet</h3>
            <p className="text-gray-400 mb-6">Save interesting jobs while browsing to come back later.</p>
            <button
              onClick={() => navigate("/jobs")}
              className="px-6 py-3 bg-indigo-600 hover:bg-indigo-500 rounded-lg font-medium transition"
            >
              Browse Jobs
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {savedJobs.map((job, index) => {
              const salaryText = formatSalary(job);
              return (
                <div
                  key={job.id || `job-${index}`} // 👈 fallback key added
                  className="bg-gray-800/40 backdrop-blur-md border border-gray-700/50 rounded-xl p-6 hover:border-indigo-500/50 transition-all group"
                >
                  <div className="flex items-start gap-4 mb-4">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-indigo-500/20 to-purple-500/20 border border-gray-600 flex items-center justify-center text-xl font-bold text-indigo-400 flex-shrink-0">
                      {job.logo || getInitials(job.company)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-white group-hover:text-indigo-300 transition-colors truncate">
                        {job.title || "Untitled Position"}
                      </h3>
                      <p className="text-sm text-gray-400 truncate">
                        {job.company || "Unknown Company"} • {job.location || "Location not specified"}
                      </p>
                    </div>
                  </div>

                  {job.type && (
                    <div className="flex flex-wrap gap-3 mb-4 text-sm">
                      <span className="px-3 py-1 rounded-full bg-gray-700/50 text-gray-300 border border-gray-600">
                        {job.type}
                      </span>
                      {salaryText && (
                        <span className="text-green-400 font-medium">{salaryText}</span>
                      )}
                    </div>
                  )}

                  <div className="flex gap-3">
                    <a
                      href={job.applyLink || job.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 py-2.5 bg-indigo-600 hover:bg-indigo-500 rounded-lg text-white font-medium transition text-center"
                    >
                      Apply
                    </a>
                    <button
                      onClick={() => removeJob(job.id)}
                      className="px-4 py-2.5 bg-red-600/20 hover:bg-red-600/30 text-red-400 rounded-lg font-medium transition"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}