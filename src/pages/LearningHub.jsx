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
            <h1 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-200 to-purple-200">
              Learning Hub
            </h1>
            <div className="w-20"></div>
          </div>
        </div>
      </div>

      {/* Hero / Tagline */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-indigo-600/20 to-purple-600/20 blur-3xl -z-10"></div>
        <div className="max-w-7xl mx-auto px-6 py-12 text-center">
          <h2 className="text-4xl md:text-5xl font-extrabold mb-4">
            Expand Your Horizons
          </h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Discover curated courses, tutorials, and resources to accelerate your career. Search from thousands of free and premium materials.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 pb-12">
        {/* Simple Search Bar */}
        <div className="mb-12">
          <form onSubmit={handleSearch} className="flex max-w-xl mx-auto">
            <div className="relative flex-1">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search for courses, topics, or skills..."
                className="w-full px-6 py-4 pl-14 bg-gray-800/60 border border-gray-700 rounded-l-xl text-white placeholder-gray-400 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none transition text-lg"
              />
              <svg className="w-6 h-6 absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <button
              type="submit"
              className="px-8 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-semibold rounded-r-xl transition transform hover:scale-[1.02]"
            >
              Search
            </button>
          </form>
        </div>

        {/* Saved Courses Section */}
        {savedCourses.length > 0 && (
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
              <span className="w-2 h-2 bg-indigo-400 rounded-full"></span>
              Your Saved Courses
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {savedCourses.slice(0, 3).map(course => (
                <div
                  key={`${course.source}-${course.externalId}`}
                  className="group bg-gray-800/40 backdrop-blur-md border border-gray-700/50 rounded-xl p-6 hover:border-indigo-500/50 hover:shadow-xl transition-all duration-300"
                >
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
                      className="text-yellow-400 hover:text-yellow-300"
                    >
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
                      </svg>
                    </button>
                  </div>
                  <p className="text-gray-400 text-sm mb-4 line-clamp-2">{course.description}</p>
                  <a
                    href={course.externalUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => handleViewCourse(course)}
                    className="inline-block w-full py-2.5 bg-indigo-600 hover:bg-indigo-500 rounded-lg text-white font-medium transition text-center"
                  >
                    View Course
                  </a>
                </div>
              ))}
              {savedCourses.length > 3 && (
                <div className="col-span-full text-center">
                  <button className="text-indigo-400 hover:text-indigo-300 font-medium">
                    See all saved courses →
                  </button>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Recently Viewed Section */}
        {recentlyViewed.length > 0 && (
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
              <span className="w-2 h-2 bg-indigo-400 rounded-full"></span>
              Recently Viewed
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {recentlyViewed.slice(0, 3).map(course => (
                <div
                  key={`${course.source}-${course.externalId}`}
                  className="group bg-gray-800/40 backdrop-blur-md border border-gray-700/50 rounded-xl p-6 hover:border-indigo-500/50 hover:shadow-xl transition-all duration-300"
                >
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
                      className={`${savedCourses.some(c => c.externalId === course.externalId && c.source === course.source) ? 'text-yellow-400' : 'text-gray-500'} hover:text-yellow-400`}
                    >
                      <svg className="w-5 h-5" fill={savedCourses.some(c => c.externalId === course.externalId && c.source === course.source) ? 'currentColor' : 'none'} stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
                      </svg>
                    </button>
                  </div>
                  <p className="text-gray-400 text-sm mb-4 line-clamp-2">{course.description}</p>
                  <a
                    href={course.externalUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => handleViewCourse(course)}
                    className="inline-block w-full py-2.5 bg-indigo-600 hover:bg-indigo-500 rounded-lg text-white font-medium transition text-center"
                  >
                    View Course
                  </a>
                </div>
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
              <div className="text-center py-12">
                <div className="animate-spin w-12 h-12 border-4 border-indigo-500 border-t-transparent rounded-full mx-auto mb-4"></div>
                <p className="text-gray-400">Searching courses...</p>
              </div>
            ) : courses.length === 0 ? (
              <div className="text-center py-16 bg-gray-800/40 backdrop-blur-md border border-gray-700/50 rounded-xl">
                <div className="w-24 h-24 mx-auto mb-4 rounded-full bg-gray-700/50 flex items-center justify-center">
                  <svg className="w-12 h-12 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-semibold text-white mb-2">No courses found</h3>
                <p className="text-gray-400">Try a different search term.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {courses.map(course => (
                  <div
                    key={`${course.source}-${course.externalId || course.id}`}
                    className="group bg-gray-800/40 backdrop-blur-md border border-gray-700/50 rounded-xl p-6 hover:border-indigo-500/50 hover:shadow-xl transition-all duration-300"
                  >
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
                        className={`${savedCourses.some(c => c.externalId === course.externalId && c.source === course.source) ? 'text-yellow-400' : 'text-gray-500'} hover:text-yellow-400`}
                      >
                        <svg className="w-5 h-5" fill={savedCourses.some(c => c.externalId === course.externalId && c.source === course.source) ? 'currentColor' : 'none'} stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
                        </svg>
                      </button>
                    </div>

                    <p className="text-gray-400 text-sm mb-4 line-clamp-2">{course.description}</p>

                    {course.source && (
                      <span className="inline-flex items-center gap-1 text-xs text-gray-500 mb-2">
                        <span>{getProviderIcon(course.source)}</span>
                        Provider: {getProviderName(course.source)}
                      </span>
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
                      className="mt-2 inline-block w-full py-2.5 bg-indigo-600 hover:bg-indigo-500 rounded-lg text-white font-medium transition text-center"
                    >
                      View Course
                    </a>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}