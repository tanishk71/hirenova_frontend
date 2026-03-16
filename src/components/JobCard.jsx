export default function JobCard({ job, viewMode, isSaved, onSave, onApply }) {
  return (
    <div className="bg-gray-800/40 backdrop-blur-md border border-gray-700/50 rounded-2xl p-6 hover:border-indigo-500/50 hover:shadow-xl transition-all duration-300 group">
      <div className="flex gap-4">
        {/* Logo/Avatar */}
        <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-indigo-500/20 to-purple-500/20 border border-gray-600 flex items-center justify-center text-2xl font-bold text-indigo-400 flex-shrink-0">
          {job.logo || job.company?.charAt(0) || '💼'}
        </div>

        <div className="flex-1">
          {/* Title and Company */}
          <div className="flex items-start justify-between">
            <div>
              <h3 className="text-xl font-bold text-white group-hover:text-indigo-300 transition-colors">
                {job.title}
              </h3>
              <p className="text-gray-400 text-sm mt-1">{job.company}</p>
            </div>
            {/* Save button */}
            <button
              onClick={onSave}
              className={`p-2 rounded-lg transition-colors ${
                isSaved 
                  ? "text-yellow-400 hover:text-yellow-300" 
                  : "text-gray-500 hover:text-indigo-400"
              }`}
            >
              <svg className="w-5 h-5" fill={isSaved ? "currentColor" : "none"} stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
              </svg>
            </button>
          </div>

          {/* Job details: location, type, salary */}
          <div className="flex flex-wrap gap-4 text-sm mt-3">
            <span className="flex items-center gap-1 text-gray-400">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              {job.location}
            </span>
            <span className="flex items-center gap-1 text-gray-400">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              {job.type}
            </span>
            <span className="flex items-center gap-1 text-green-400 font-semibold">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              {job.salary}
            </span>
          </div>

          {/* Skills/Tags */}
          {job.skills && job.skills.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-4">
              {job.skills.slice(0, 4).map(skill => (
                <span
                  key={skill}
                  className="px-3 py-1 text-xs rounded-full bg-gray-700/50 text-gray-300 border border-gray-600"
                >
                  {skill}
                </span>
              ))}
              {job.skills.length > 4 && (
                <span className="px-3 py-1 text-xs rounded-full bg-gray-700/50 text-gray-300 border border-gray-600">
                  +{job.skills.length - 4}
                </span>
              )}
            </div>
          )}

          {/* Posted date and source */}
          <div className="flex items-center gap-3 mt-4 text-xs text-gray-500">
            <span className="flex items-center gap-1">
              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              {job.posted || 'Recently'}
            </span>
            {job.source && (
              <>
                <span className="w-1 h-1 bg-gray-600 rounded-full"></span>
                <span className="flex items-center gap-1">
                  <span>via {job.source}</span>
                </span>
              </>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 mt-4">
            <button
              onClick={onApply}
              className="flex-1 py-2.5 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white text-sm font-medium transition-all transform hover:scale-105 shadow-lg shadow-indigo-600/20"
            >
              Apply Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}