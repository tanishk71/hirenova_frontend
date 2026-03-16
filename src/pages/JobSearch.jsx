import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import JobFilters from "../components/JobFilters";
import JobCard from "../components/JobCard";
import jobApi from "../api/jobApi";

export default function JobSearch() {
  const navigate = useNavigate();
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState({
    search: "",
    type: "all",
    location: "",
    experience: "all",
    salary: "all"
  });
  
  const [savedJobs, setSavedJobs] = useState([]);
  const [viewMode, setViewMode] = useState("grid");
  const [sortBy, setSortBy] = useState("relevance");

  // Load saved jobs from localStorage
  useEffect(() => {
    const saved = localStorage.getItem("savedJobs");
    if (saved) {
      try {
        setSavedJobs(JSON.parse(saved));
      } catch (e) {
        console.error("Failed to parse saved jobs", e);
      }
    }
  }, []);

  // Fetch jobs when filters change
  useEffect(() => {
    const fetchJobs = async () => {
      if (!filters.search && filters.type === 'all' && !filters.location) {
        setJobs([]);
        return;
      }

      setLoading(true);
      setError(null);
      
      try {
        const params = {};
        if (filters.search) params.query = filters.search;
        if (filters.type !== 'all') params.type = filters.type;
        if (filters.location) params.location = filters.location;

        if (!params.query) {
          if (filters.type === 'internship') params.query = 'internship';
          else if (filters.type === 'remote') params.query = 'remote';
          else params.query = 'software developer';
        }

        const data = await jobApi.searchJobs(params);
        
        const transformedJobs = data.jobs.map(job => ({
          id: job.id,
          title: job.title,
          company: job.company,
          location: job.location,
          type: job.type || filters.type,
          salary: job.salary_range || extractSalary(job.description),
          experience: extractExperience(job.description),
          posted: formatPostedDate(job.postedAt),
          postedDate: job.postedAt,
          skills: extractSkills(job.description),
          logo: job.source === 'adzuna' ? '🏢' : '💼',
          description: job.description,
          applyLink: job.applyLink,
          source: job.source,
          matchScore: calculateMatchScore(job, filters.search)
        }));
        
        setJobs(transformedJobs);
      } catch (err) {
        setError(err.message || 'Failed to fetch jobs');
        console.error('Error fetching jobs:', err);
      } finally {
        setLoading(false);
      }
    };

    const timeoutId = setTimeout(fetchJobs, 500);
    return () => clearTimeout(timeoutId);
  }, [filters.search, filters.type, filters.location]);

  const extractSalary = (description) => {
    const salaryMatch = description?.match(/\$\d+k?\s*-\s*\$\d+k?/i);
    return salaryMatch ? salaryMatch[0] : "Competitive";
  };

  const extractExperience = (description) => {
    const expMatch = description?.match(/(\d+)[\+\s]*years?/i);
    return expMatch ? expMatch[1] : "Not specified";
  };

  const extractSkills = (description) => {
    const commonSkills = ['React', 'Node.js', 'Python', 'Java', 'JavaScript', 'TypeScript', 'AWS', 'Docker', 'MongoDB', 'SQL'];
    const foundSkills = commonSkills.filter(skill => 
      description?.toLowerCase().includes(skill.toLowerCase())
    );
    return foundSkills.length ? foundSkills : ['Various technologies'];
  };

  const formatPostedDate = (dateString) => {
    if (!dateString) return 'Recently';
    const days = Math.floor((new Date() - new Date(dateString)) / (1000 * 60 * 60 * 24));
    if (days === 0) return 'Today';
    if (days === 1) return 'Yesterday';
    if (days < 7) return `${days} days ago`;
    if (days < 30) return `${Math.floor(days / 7)} weeks ago`;
    return `${Math.floor(days / 30)} months ago`;
  };

  const calculateMatchScore = (job, searchQuery) => {
    if (!searchQuery) return 85 + Math.floor(Math.random() * 15);
    const titleMatch = job.title?.toLowerCase().includes(searchQuery.toLowerCase()) ? 40 : 0;
    const companyMatch = job.company?.toLowerCase().includes(searchQuery.toLowerCase()) ? 20 : 0;
    const descMatch = job.description?.toLowerCase().includes(searchQuery.toLowerCase()) ? 30 : 0;
    return Math.min(98, 10 + titleMatch + companyMatch + descMatch);
  };

  const filteredJobs = jobs
    .filter(job => {
      if (filters.experience !== "all" && job.experience && job.experience !== 'Not specified') {
        const expNum = parseInt(job.experience);
        if (!isNaN(expNum)) {
          const expRange = filters.experience.split("-").map(Number);
          if (expRange.length === 2) {
            if (expNum < expRange[0] || expNum > expRange[1]) return false;
          } else if (filters.experience === "5+" && expNum < 5) return false;
        }
      }
      return true;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case "newest":
          return new Date(b.postedDate || 0) - new Date(a.postedDate || 0);
        case "salary-high":
          const aSalary = a.salary ? parseInt(a.salary.replace(/[^0-9]/g, '')) || 0 : 0;
          const bSalary = b.salary ? parseInt(b.salary.replace(/[^0-9]/g, '')) || 0 : 0;
          return bSalary - aSalary;
        case "salary-low":
          const aSalaryLow = a.salary ? parseInt(a.salary.replace(/[^0-9]/g, '')) || 0 : 0;
          const bSalaryLow = b.salary ? parseInt(b.salary.replace(/[^0-9]/g, '')) || 0 : 0;
          return aSalaryLow - bSalaryLow;
        default:
          return (b.matchScore || 0) - (a.matchScore || 0);
      }
    });

  const toggleSaveJob = (job) => {
    const saved = JSON.parse(localStorage.getItem("savedJobs") || "[]");
    const exists = saved.some(j => j.id === job.id);
    let updated;
    if (exists) {
      updated = saved.filter(j => j.id !== job.id);
    } else {
      const jobData = {
        id: job.id,
        title: job.title,
        company: job.company,
        location: job.location,
        type: job.type,
        salary: job.salary,
        logo: job.logo,
        applyLink: job.applyLink || job.url,
        posted: job.posted,
        skills: job.skills,
        description: job.description
      };
      updated = [...saved, jobData];
    }
    localStorage.setItem("savedJobs", JSON.stringify(updated));
    setSavedJobs(updated);
  };

  const handleApply = (job) => {
    if (job.applyLink) {
      window.open(job.applyLink, '_blank', 'noopener,noreferrer');
    } else {
      alert('Application link not available. Please visit company website.');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0B1120] via-[#1A1F36] to-[#111827] text-white">
      {/* Header */}
      <div className="border-b border-gray-700/50 bg-gray-900/40 backdrop-blur-md sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <button
              onClick={() => navigate("/")}
              className="flex items-center gap-2 text-gray-400 hover:text-indigo-400 transition-colors"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Back to Landing Page
            </button>
            <h1 className="text-xl font-bold text-white">Job Search</h1>
            <button
              onClick={() => navigate("/saved-jobs")}
              className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 rounded-lg text-white font-medium transition flex items-center gap-2"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
              </svg>
              Saved Jobs ({savedJobs.length})
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Search Stats and View Toggle */}
        <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            {loading ? (
              <div className="px-3 py-1.5 bg-indigo-500/20 border border-indigo-500/30 rounded-lg">
                <div className="flex items-center gap-2">
                  <div className="animate-spin w-4 h-4 border-2 border-indigo-400 border-t-transparent rounded-full"></div>
                  <span className="text-indigo-300">Searching...</span>
                </div>
              </div>
            ) : (
              <div className="px-3 py-1.5 bg-indigo-500/20 border border-indigo-500/30 rounded-lg">
                <span className="text-indigo-300 font-medium">{filteredJobs.length}</span>
                <span className="text-gray-400 text-sm ml-1">jobs found</span>
              </div>
            )}
          </div>

          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1 p-1 bg-gray-800/60 border border-gray-700 rounded-lg">
              <button
                onClick={() => setViewMode("grid")}
                className={`p-2 rounded-md transition-colors ${
                  viewMode === "grid" 
                    ? "bg-indigo-500/20 text-indigo-400" 
                    : "text-gray-400 hover:text-white"
                }`}
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                </svg>
              </button>
              <button
                onClick={() => setViewMode("list")}
                className={`p-2 rounded-md transition-colors ${
                  viewMode === "list" 
                    ? "bg-indigo-500/20 text-indigo-400" 
                    : "text-gray-400 hover:text-white"
                }`}
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
            </div>

            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-4 py-2 bg-gray-800/60 border border-gray-700 rounded-lg text-sm text-gray-300 focus:border-indigo-500 outline-none"
            >
              <option value="relevance">Sort by: Relevance</option>
              <option value="newest">Sort by: Newest</option>
              <option value="salary-high">Sort by: Salary (High to Low)</option>
              <option value="salary-low">Sort by: Salary (Low to High)</option>
            </select>
          </div>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-500/10 border border-red-500/30 rounded-lg text-red-400">
            {error}
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-[320px_1fr] gap-8">
          <div>
            <JobFilters filters={filters} setFilters={setFilters} />
          </div>

          <div>
            {loading ? (
              <div className="text-center py-12">
                <div className="animate-spin w-10 h-10 border-4 border-indigo-500 border-t-transparent rounded-full mx-auto mb-4"></div>
                <p className="text-gray-400">Searching for jobs...</p>
              </div>
            ) : filteredJobs.length === 0 ? (
              <div className="bg-gray-800/40 backdrop-blur-md border border-gray-700/50 rounded-2xl p-12 text-center">
                <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-gray-700/50 flex items-center justify-center">
                  <svg className="w-10 h-10 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">No jobs found</h3>
                <p className="text-gray-400 mb-4">Try adjusting your filters or search criteria</p>
                <button
                  onClick={() => setFilters({ search: "", type: "all", location: "", experience: "all", salary: "all" })}
                  className="px-6 py-2 bg-indigo-600 hover:bg-indigo-500 rounded-lg text-white transition"
                >
                  Clear Filters
                </button>
              </div>
            ) : (
              <div className={viewMode === "grid" 
                ? "grid grid-cols-1 md:grid-cols-2 gap-6" 
                : "space-y-4"
              }>
                {filteredJobs.map(job => (
                  <JobCard
                    key={job.id}
                    job={job}
                    viewMode={viewMode}
                    isSaved={savedJobs.some(j => j.id === job.id)}
                    onSave={() => toggleSaveJob(job)}
                    onApply={() => handleApply(job)}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}