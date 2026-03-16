import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import API from "../../api/api"; // ✅ Corrected path

export default function RecommendedJobs() {
  const navigate = useNavigate();
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRecommendations = async () => {
      try {
        const res = await API.get("/recommendations/jobs");
        setJobs(res.data);
      } catch (error) {
        console.error("Failed to fetch job recommendations", error);
      } finally {
        setLoading(false);
      }
    };
    fetchRecommendations();
  }, []);

  if (loading) {
    return <div className="text-gray-400 text-center py-8">Finding jobs for you...</div>;
  }

  if (jobs.length === 0) {
    return null; // Hide section if no jobs
  }

  return (
    <section className="mb-10">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <h3 className="text-xl font-bold text-white flex items-center gap-2">
            <span className="w-2 h-2 bg-indigo-400 rounded-full"></span>
            Recommended Jobs for You
          </h3>
          <span className="px-3 py-1 rounded-full text-xs bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-medium shadow-lg shadow-indigo-600/20">
            Based on your searches
          </span>
        </div>
        {/* <button
          onClick={() => navigate("/jobs")}
          className="text-indigo-400 hover:text-indigo-300 transition-colors text-sm font-medium flex items-center gap-1 group"
        >
          View All
          <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
          </svg>
        </button> */}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {jobs.map((job) => (
          <div key={job.id} className="bg-gray-800/40 backdrop-blur-md border border-gray-700/50 rounded-2xl p-6 shadow-xl hover:border-indigo-500/50 hover:shadow-2xl transition-all duration-300 group">
            <div className="flex items-start gap-4 mb-4">
              <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-indigo-500/20 to-purple-500/20 flex items-center justify-center text-xl font-bold flex-shrink-0 group-hover:scale-110 transition-transform shadow-lg">
                {job.logo ? (
                  <img src={job.logo} alt={job.company} className="w-10 h-10 rounded-lg object-contain" />
                ) : (
                  job.company?.charAt(0) || '💼'
                )}
              </div>

              <div className="flex-1 min-w-0">
                <h4 className="font-semibold text-white mb-1 group-hover:text-indigo-300 transition-colors line-clamp-1">
                  {job.title}
                </h4>
                <p className="text-gray-400 text-sm truncate flex items-center gap-1">
                  <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                  {job.company} • {job.location}
                </p>
              </div>
            </div>

            {job.type && (
              <div className="flex flex-wrap gap-2 mb-4">
                <span className="px-3 py-1 rounded-full text-xs bg-gray-700/50 text-gray-300 border border-gray-600">
                  {job.type}
                </span>
                {job.salary && (
                  <span className="px-3 py-1 rounded-full text-xs bg-green-500/20 text-green-400 border border-green-500/30">
                    {job.salary}
                  </span>
                )}
              </div>
            )}

            <p className="text-gray-400 text-sm mb-4 line-clamp-2">{job.description}</p>

            <div className="flex gap-2 mt-auto">
              <a
                href={job.applyLink}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 py-2.5 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white text-sm font-medium transition-all transform hover:scale-105 shadow-lg shadow-indigo-600/20 text-center"
              >
                Apply Now
              </a>
              {/* <button
                onClick={() => {"/"}}
                className="px-4 py-2.5 rounded-xl bg-gray-700/50 hover:bg-gray-600/50 text-white text-sm font-medium transition-all border border-gray-600"
              >
                Save
              </button> */}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}