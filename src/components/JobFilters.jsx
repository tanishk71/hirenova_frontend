import { useState, useEffect } from "react";

export default function JobFilters({ filters, setFilters }) {
  // Local state for form inputs (syncs with parent)
  const [localFilters, setLocalFilters] = useState({
    search: filters.search || "",
    type: filters.type || "all",
    location: filters.location || "",
    experience: filters.experience || "all",
    salary: filters.salary || "all"
  });

  // Update local filters when parent filters change
  useEffect(() => {
    setLocalFilters({
      search: filters.search || "",
      type: filters.type || "all",
      location: filters.location || "",
      experience: filters.experience || "all",
      salary: filters.salary || "all"
    });
  }, [filters]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLocalFilters(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const applyFilters = () => {
    // Update parent filters
    setFilters(localFilters);
  };

  const clearFilters = () => {
    const cleared = {
      search: "",
      type: "all",
      location: "",
      experience: "all",
      salary: "all"
    };
    setLocalFilters(cleared);
    setFilters(cleared);
  };

  return (
    <div className="bg-gray-800/40 backdrop-blur-md border border-gray-700/50 rounded-2xl p-6 space-y-6 text-white shadow-xl">
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-semibold text-white flex items-center gap-2">
          <span className="w-2 h-2 bg-indigo-400 rounded-full"></span>
          Filter Jobs
        </h3>
        {(filters.search || filters.type !== "all" || filters.location || 
          filters.experience !== "all" || filters.salary !== "all") && (
          <button
            onClick={clearFilters}
            className="text-sm text-indigo-400 hover:text-indigo-300 transition-colors"
          >
            Clear all
          </button>
        )}
      </div>

      {/* Search / Job Title */}
      <div className="space-y-2">
        <label className="text-sm text-gray-400 flex items-center gap-2">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          Job Title / Keywords
        </label>
        <input
          type="text"
          name="search"
          placeholder="e.g. Java Developer, React, Python"
          value={localFilters.search}
          onChange={handleChange}
          className="w-full px-4 py-3 rounded-xl bg-gray-900/60 border border-gray-700 text-white
                     placeholder-gray-500 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 
                     outline-none transition"
        />
      </div>

      {/* Job Type */}
      <div className="space-y-2">
        <label className="text-sm text-gray-400 flex items-center gap-2">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
          Job Type
        </label>
        <select
          name="type"
          value={localFilters.type}
          onChange={handleChange}
          className="w-full appearance-none rounded-xl bg-gray-900/60 border border-gray-700 text-white
                     px-4 py-3 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 outline-none
                     cursor-pointer"
        >
          <option value="all" className="bg-gray-800">All Types</option>
          <option value="Full-time" className="bg-gray-800">Full Time</option>
          <option value="Part-time" className="bg-gray-800">Part Time</option>
          <option value="Contract" className="bg-gray-800">Contract</option>
          <option value="Internship" className="bg-gray-800">Internship</option>
          <option value="Remote" className="bg-gray-800">Remote</option>
        </select>
      </div>

      {/* Location */}
      <div className="space-y-2">
        <label className="text-sm text-gray-400 flex items-center gap-2">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          Location
        </label>
        <input
          type="text"
          name="location"
          placeholder="Mumbai, Bangalore, Remote"
          value={localFilters.location}
          onChange={handleChange}
          className="w-full px-4 py-3 rounded-xl bg-gray-900/60 border border-gray-700 text-white
                     placeholder-gray-500 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 
                     outline-none transition"
        />
      </div>

      {/* Experience */}
      <div className="space-y-2">
        <label className="text-sm text-gray-400 flex items-center gap-2">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
          Experience Level
        </label>
        <select
          name="experience"
          value={localFilters.experience}
          onChange={handleChange}
          className="w-full appearance-none rounded-xl bg-gray-900/60 border border-gray-700 text-white
                     px-4 py-3 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 outline-none
                     cursor-pointer"
        >
          <option value="all" className="bg-gray-800">Any Experience</option>
          <option value="0-1" className="bg-gray-800">Fresher (0-1 years)</option>
          <option value="1-3" className="bg-gray-800">1-3 years</option>
          <option value="3-5" className="bg-gray-800">3-5 years</option>
          <option value="5-8" className="bg-gray-800">5-8 years</option>
          <option value="8+" className="bg-gray-800">8+ years</option>
        </select>
      </div>

      {/* Salary Range */}
      <div className="space-y-2">
        <label className="text-sm text-gray-400 flex items-center gap-2">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          Salary Range
        </label>
        <select
          name="salary"
          value={localFilters.salary}
          onChange={handleChange}
          className="w-full appearance-none rounded-xl bg-gray-900/60 border border-gray-700 text-white
                     px-4 py-3 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 outline-none
                     cursor-pointer"
        >
          <option value="all" className="bg-gray-800">Any Salary</option>
          <option value="0-300000" className="bg-gray-800">₹0 - ₹3 Lakhs</option>
          <option value="300000-600000" className="bg-gray-800">₹3 - ₹6 Lakhs</option>
          <option value="600000-1000000" className="bg-gray-800">₹6 - ₹10 Lakhs</option>
          <option value="1000000-1500000" className="bg-gray-800">₹10 - ₹15 Lakhs</option>
          <option value="1500000-2000000" className="bg-gray-800">₹15 - ₹20 Lakhs</option>
          <option value="2000000+" className="bg-gray-800">₹20+ Lakhs</option>
        </select>
      </div>

      {/* Apply Button */}
      <button
        onClick={applyFilters}
        className="w-full py-3 bg-gradient-to-r from-indigo-600 to-purple-600 
                   hover:from-indigo-500 hover:to-purple-500 text-white font-semibold 
                   rounded-xl transition-all transform hover:scale-[1.02] 
                   shadow-lg shadow-indigo-600/20"
      >
        Apply Filters
      </button>

      {/* Quick Filters */}
      <div className="pt-4 border-t border-gray-700/50">
        <p className="text-xs text-gray-500 mb-3">Quick filters:</p>
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => {
              setLocalFilters(prev => ({ ...prev, type: "Remote" }));
              setFilters({ ...localFilters, type: "Remote" });
            }}
            className="px-3 py-1.5 rounded-full text-xs bg-gray-700/50 text-gray-300 
                       border border-gray-600 hover:border-indigo-500 hover:bg-indigo-500/10 
                       transition-all"
          >
            🏠 Remote
          </button>
          <button
            onClick={() => {
              setLocalFilters(prev => ({ ...prev, type: "Internship" }));
              setFilters({ ...localFilters, type: "Internship" });
            }}
            className="px-3 py-1.5 rounded-full text-xs bg-gray-700/50 text-gray-300 
                       border border-gray-600 hover:border-indigo-500 hover:bg-indigo-500/10 
                       transition-all"
          >
            🎓 Internship
          </button>
          <button
            onClick={() => {
              setLocalFilters(prev => ({ ...prev, experience: "0-1" }));
              setFilters({ ...localFilters, experience: "0-1" });
            }}
            className="px-3 py-1.5 rounded-full text-xs bg-gray-700/50 text-gray-300 
                       border border-gray-600 hover:border-indigo-500 hover:bg-indigo-500/10 
                       transition-all"
          >
            🌱 Fresher
          </button>
        </div>
      </div>
    </div>
  );
}