export default function JobCard({ job }) {
  return (
    <div className="bg-gray-800/40 backdrop-blur-md border border-gray-700/50 rounded-xl p-5 shadow-lg hover:border-indigo-500/50 hover:shadow-xl transition-all duration-300 group">
      <div className="flex items-start justify-between mb-3">
        <h4 className="font-semibold text-white group-hover:text-indigo-300 transition-colors">{job.title}</h4>
        <span className="px-2.5 py-1 rounded-full text-xs font-medium bg-green-500/20 text-green-400 border border-green-500/30">
          {job.match}% Match
        </span>
      </div>
      
      <p className="text-gray-400 text-sm mb-4 flex items-center gap-1">
        <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
        </svg>
        {job.company} • {job.location}
      </p>

      <div className="flex items-center justify-between">
        <button className="px-4 py-2 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white text-sm font-medium rounded-lg transition-all transform hover:scale-105">
          View Job
        </button>
        <button className="p-2 rounded-lg hover:bg-white/10 transition-colors">
          <svg className="w-5 h-5 text-gray-500 hover:text-indigo-400 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
          </svg>
        </button>
      </div>
    </div>
  );
}