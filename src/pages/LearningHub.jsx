import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/api";

export default function LearningHub() {
  const navigate = useNavigate();
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchTrigger, setSearchTrigger] = useState(0);
  const [savedCourses, setSavedCourses] = useState([]);
  const [recentlyViewed, setRecentlyViewed] = useState([]);

  // Load saved & recent from localStorage
  useEffect(() => {
    const saved = localStorage.getItem("savedCourses");
    if (saved) setSavedCourses(JSON.parse(saved));
    const recent = localStorage.getItem("recentlyViewed");
    if (recent) setRecentlyViewed(JSON.parse(recent));
  }, []);

  useEffect(() => {
    localStorage.setItem("savedCourses", JSON.stringify(savedCourses));
  }, [savedCourses]);

  useEffect(() => {
    localStorage.setItem("recentlyViewed", JSON.stringify(recentlyViewed));
  }, [recentlyViewed]);

  useEffect(() => {
    if (searchTrigger > 0) {
      fetchCourses();
    }
  }, [searchTrigger]);

  const fetchCourses = async () => {
    if (!searchQuery.trim()) {
      setCourses([]);
      return;
    }
    setLoading(true);
    try {
      const params = new URLSearchParams();
      params.append("q", searchQuery);
      const res = await API.get(`/courses/search?${params}`);
      setCourses(res.data.courses || []);
    } catch (error) {
      console.error("Failed to fetch courses:", error);
      setCourses([]);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    setSearchTrigger(prev => prev + 1);
  };

  const toggleSave = (course) => {
    const isSaved = savedCourses.some(c => c.externalId === course.externalId && c.source === course.source);
    if (isSaved) {
      setSavedCourses(savedCourses.filter(c => !(c.externalId === course.externalId && c.source === course.source)));
    } else {
      setSavedCourses([...savedCourses, course]);
    }
  };

  const handleViewCourse = (course) => {
    setRecentlyViewed(prev => {
      const filtered = prev.filter(c => !(c.externalId === course.externalId && c.source === course.source));
      return [course, ...filtered].slice(0, 10);
    });
  };

  const getCourseCategoryGroup = (course) => {
    if (course.category === 'Technical') return 'Technical';
    if (['Soft Skills', 'Interview Prep', 'Resume Writing', 'Career Development'].includes(course.category)) {
      return 'Non Technical';
    }
    return null;
  };

  const getLevelColor = (level) => {
    const colors = {
      "Beginner": "bg-green-500/20 text-green-400 border-green-500/30",
      "Intermediate": "bg-yellow-500/20 text-yellow-400 border-yellow-500/30",
      "Advanced": "bg-red-500/20 text-red-400 border-red-500/30"
    };
    return colors[level] || colors["Beginner"];
  };

  const getCategoryIcon = (course) => {
    const group = getCourseCategoryGroup(course);
    if (group === 'Technical') return '💻';
    if (group === 'Non Technical') return '📚';
    return '📌';
  };

  const getProviderName = (source) => {
    const providers = {
      'microsoft-learn': 'Microsoft Learn',
      'youtube': 'YouTube',
      'kaggle': 'Kaggle',
      'vimeo': 'Vimeo', 
      'apivideo': 'api.video',  
      'other': 'Other'
    };
    return providers[source] || source;
  };

  const getProviderIcon = (source) => {
    const icons = {
      'microsoft-learn': '🟦',
      'vimeo': '🎓',
      'apivideo': '📚',
      'youtube': '▶️',
      'kaggle': '🏆',
      'other': '📌'
    };
    return icons[source] || '📌';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0B1120] via-[#1A1F36] to-[#111827] text-white">
      {/* Header */}
      <div className="border-b border-gray-700/50 bg-gray-900/40 backdrop-blur-md sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <button
              onClick={() => navigate("/dashboard")}
              className="flex items-center gap-2 text-gray-400 hover:text-indigo-400 transition-colors group"
            >
              <svg className="w-5 h-5 group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Back to Dashboard
            </button>
            <h1 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-200 to-purple-200">
              Learning Hub
            </h1>
            <div className="w-20"></div>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-indigo-600/20 to-purple-600/20 blur-3xl -z-10 animate-pulse-slow"></div>
        <div className="max-w-7xl mx-auto px-6 py-16 text-center">
          <div className="inline-block mb-4 px-4 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/30 text-indigo-300 text-sm font-medium">
            🚀 Expand Your Skills
          </div>
          <h2 className="text-5xl md:text-6xl font-extrabold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-300">
            Discover & Learn
          </h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Curated courses, tutorials, and resources to accelerate your career. Search from thousands of free and premium materials.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 pb-16">
        {/* Search Bar */}
        <div className="mb-16">
          <form onSubmit={handleSearch} className="flex max-w-3xl mx-auto">
            <div className="relative flex-1">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search for courses, topics, or skills..."
                className="w-full px-6 py-4 pl-14 bg-gray-800/60 border border-gray-700 rounded-l-xl text-white placeholder-gray-400 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/30 outline-none transition text-lg"
              />
              <svg className="w-6 h-6 absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <button
              type="submit"
              className="px-8 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-semibold rounded-r-xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-indigo-500/25"
            >
              Search
            </button>
          </form>
        </div>

        {/* Saved Courses Section */}
        {savedCourses.length > 0 && (
          <div className="mb-16">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-white flex items-center gap-2">
                <span className="w-2 h-2 bg-indigo-400 rounded-full"></span>
                Your Saved Courses
              </h2>
              {savedCourses.length > 3 && (
                <button className="text-indigo-400 hover:text-indigo-300 text-sm font-medium transition-colors">
                  See all →
                </button>
              )}
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {savedCourses.slice(0, 3).map(course => (
                <CourseCard
                  key={`${course.source}-${course.externalId}`}
                  course={course}
                  isSaved={true}
                  toggleSave={toggleSave}
                  handleViewCourse={handleViewCourse}
                  getCategoryIcon={getCategoryIcon}
                  getProviderIcon={getProviderIcon}
                  getProviderName={getProviderName}
                />
              ))}
            </div>
          </div>
        )}

        {/* Recently Viewed Section */}
        {recentlyViewed.length > 0 && (
          <div className="mb-16">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-white flex items-center gap-2">
                <span className="w-2 h-2 bg-indigo-400 rounded-full"></span>
                Recently Viewed
              </h2>
              {recentlyViewed.length > 3 && (
                <button className="text-indigo-400 hover:text-indigo-300 text-sm font-medium transition-colors">
                  See all →
                </button>
              )}
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {recentlyViewed.slice(0, 3).map(course => (
                <CourseCard
                  key={`${course.source}-${course.externalId}`}
                  course={course}
                  isSaved={savedCourses.some(c => c.externalId === course.externalId && c.source === course.source)}
                  toggleSave={toggleSave}
                  handleViewCourse={handleViewCourse}
                  getCategoryIcon={getCategoryIcon}
                  getProviderIcon={getProviderIcon}
                  getProviderName={getProviderName}
                />
              ))}
            </div>
          </div>
        )}

        {/* Search Results */}
        {searchQuery && (
          <div>
            <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
              <span className="w-2 h-2 bg-indigo-400 rounded-full"></span>
              Search Results
            </h2>
            {loading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[...Array(6)].map((_, i) => (
                  <div key={i} className="bg-gray-800/40 backdrop-blur-md border border-gray-700/50 rounded-xl p-6 animate-pulse">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-gray-700 rounded-full"></div>
                        <div>
                          <div className="h-5 w-32 bg-gray-700 rounded mb-2"></div>
                          <div className="h-3 w-20 bg-gray-700 rounded"></div>
                        </div>
                      </div>
                      <div className="w-5 h-5 bg-gray-700 rounded"></div>
                    </div>
                    <div className="h-4 w-full bg-gray-700 rounded mb-2"></div>
                    <div className="h-4 w-3/4 bg-gray-700 rounded mb-4"></div>
                    <div className="h-10 w-full bg-gray-700 rounded-lg"></div>
                  </div>
                ))}
              </div>
            ) : courses.length === 0 ? (
              <div className="text-center py-20 bg-gray-800/40 backdrop-blur-md border border-gray-700/50 rounded-xl">
                <div className="w-32 h-32 mx-auto mb-6 rounded-full bg-gray-700/50 flex items-center justify-center">
                  <svg className="w-16 h-16 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-semibold text-white mb-2">No courses found</h3>
                <p className="text-gray-400">Try a different search term.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {courses.map(course => (
                  <CourseCard
                    key={`${course.source}-${course.externalId || course.id}`}
                    course={course}
                    isSaved={savedCourses.some(c => c.externalId === course.externalId && c.source === course.source)}
                    toggleSave={toggleSave}
                    handleViewCourse={handleViewCourse}
                    getCategoryIcon={getCategoryIcon}
                    getProviderIcon={getProviderIcon}
                    getProviderName={getProviderName}
                  />
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

// Reusable Course Card Component
const CourseCard = ({ course, isSaved, toggleSave, handleViewCourse, getCategoryIcon, getProviderIcon, getProviderName }) => (
  <div className="group bg-gray-800/40 backdrop-blur-md border border-gray-700/50 rounded-xl p-6 hover:border-indigo-500/50 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 animate-fadeIn">
    <div className="flex items-start justify-between mb-4">
      <div className="flex items-center gap-3">
        <div className="text-3xl">{getCategoryIcon(course)}</div>
        <div>
          <h3 className="font-semibold text-white group-hover:text-indigo-300 transition-colors line-clamp-1">
            {course.title}
          </h3>
          <p className="text-xs text-gray-400">{course.category}</p>
        </div>
      </div>
      <button
        onClick={(e) => { e.preventDefault(); toggleSave(course); }}
        className={`${isSaved ? 'text-yellow-400' : 'text-gray-500'} hover:text-yellow-400 transition-colors`}
        aria-label={isSaved ? "Remove from saved" : "Save course"}
      >
        <svg className="w-5 h-5" fill={isSaved ? 'currentColor' : 'none'} stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
        </svg>
      </button>
    </div>

    <p className="text-gray-400 text-sm mb-4 line-clamp-2">{course.description}</p>

    {course.source && (
      <div className="inline-flex items-center gap-1 text-xs text-gray-500 mb-3 px-2 py-1 rounded-full bg-gray-700/30">
        <span>{getProviderIcon(course.source)}</span>
        <span>{getProviderName(course.source)}</span>
      </div>
    )}

    {course.skills?.length > 0 && (
      <div className="flex flex-wrap gap-2 mb-4">
        {course.skills.slice(0, 3).map(skill => (
          <span key={skill} className="px-2 py-1 rounded-full text-xs bg-gray-700/50 text-gray-300 border border-gray-600">
            {skill}
          </span>
        ))}
      </div>
    )}

    <a
      href={course.externalUrl}
      target="_blank"
      rel="noopener noreferrer"
      onClick={() => handleViewCourse(course)}
      className="mt-2 inline-block w-full py-2.5 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 rounded-lg text-white font-medium transition-all text-center shadow-md hover:shadow-lg"
    >
      View Course →
    </a>
  </div>
);