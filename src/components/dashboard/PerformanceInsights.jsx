import { useNavigate } from "react-router-dom";

export default function PerformanceInsights() {
  const navigate = useNavigate();

  return (
    <div className="bg-gray-800/40 backdrop-blur-md border border-gray-700/50 rounded-2xl p-6 shadow-xl">
      <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
        <span className="w-2 h-2 bg-indigo-400 rounded-full"></span>
        Performance Insights
      </h3>
      
      <ul className="space-y-3">
        <li className="flex items-center gap-3 text-sm text-gray-300">
          <span className="w-1.5 h-1.5 bg-green-400 rounded-full"></span>
          <span className="flex-1">Strong in React & Node.js</span>
          <span className="text-xs px-2 py-0.5 bg-green-500/20 text-green-400 rounded-full">+24%</span>
        </li>
        <li className="flex items-center gap-3 text-sm text-gray-300">
          <span className="w-1.5 h-1.5 bg-yellow-400 rounded-full"></span>
          <span className="flex-1">Improve DSA fundamentals</span>
          <span className="text-xs px-2 py-0.5 bg-yellow-500/20 text-yellow-400 rounded-full">Action</span>
        </li>
        <li className="flex items-center gap-3 text-sm text-gray-300">
          <span className="w-1.5 h-1.5 bg-red-400 rounded-full"></span>
          <span className="flex-1">ATS keyword density low</span>
          <span className="text-xs px-2 py-0.5 bg-red-500/20 text-red-400 rounded-full">Fix now</span>
        </li>
      </ul>
      
      <button
        onClick={() => navigate("/performance-insights")}
        className="mt-4 w-full py-2.5 text-sm text-indigo-400 hover:text-indigo-300 border border-indigo-500/30 rounded-lg hover:bg-indigo-500/10 transition-all"
      >
        View Detailed Analysis
      </button>
    </div>
  );
}