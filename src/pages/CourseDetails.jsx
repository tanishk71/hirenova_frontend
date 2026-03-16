import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import API from "../api/api";

export default function CourseDetails() {
  const { courseId } = useParams();
  const navigate = useNavigate();
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [userProgress, setUserProgress] = useState(null);
  const [selectedContent, setSelectedContent] = useState(null);
  const [enrolled, setEnrolled] = useState(false);

  useEffect(() => {
    fetchCourse();
  }, [courseId]);

  const fetchCourse = async () => {
    try {
      const res = await API.get(`/learning/courses/${courseId}`);
      setCourse(res.data);

      if (res.data.userProgress) {
        setUserProgress(res.data.userProgress);
        setEnrolled(true);
        if (!selectedContent && res.data.content?.length > 0) {
          setSelectedContent(res.data.content[0]);
        }
      }
    } catch (error) {
      console.error("Failed to fetch course:", error);
    } finally {
      setLoading(false);
    }
  };

  const enrollInCourse = async () => {
    try {
      await API.post(`/learning/courses/${courseId}/enroll`);
      setEnrolled(true);
      setUserProgress({ completedContent: [], progress: 0 });
      fetchCourse();
    } catch (error) {
      if (error.response?.status === 400) {
        setEnrolled(true);
        setUserProgress({ completedContent: [], progress: 0 });
        fetchCourse();
      } else {
        console.error("Failed to enroll:", error);
        alert("Failed to enroll. Please try again.");
      }
    }
  };

  const markContentComplete = async (contentId) => {
    const wasCompleted = userProgress?.completedContent?.some(c => c.contentId === contentId);
    if (!wasCompleted) {
      const newCompleted = [
        ...(userProgress?.completedContent || []),
        { contentId, completedAt: new Date().toISOString() }
      ];
      const newProgress = {
        ...userProgress,
        completedContent: newCompleted,
        progress: Math.round((newCompleted.length / course.content.length) * 100)
      };
      setUserProgress(newProgress);
    }

    try {
      await API.post(`/learning/courses/${courseId}/progress`, {
        contentId,
        completed: true
      });
      fetchCourse();
    } catch (error) {
      console.error("Failed to update progress:", error);
      fetchCourse();
    }
  };

  const isContentCompleted = (contentId) => {
    return userProgress?.completedContent?.some(c => c.contentId === contentId);
  };

  if (loading) return <div className="text-center py-12">Loading course...</div>;
  if (!course) return <div className="text-center py-12">Course not found</div>;

  // --- External course with embed (Khan Academy) ---
  if (course.embedUrl) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#0B1120] via-[#1A1F36] to-[#111827] text-white">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <button
            onClick={() => navigate("/learning")}
            className="flex items-center gap-2 text-gray-400 hover:text-indigo-400 mb-6"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to Learning Hub
          </button>
          <div className="bg-gray-800/40 backdrop-blur-md border border-gray-700/50 rounded-xl p-8">
            <h1 className="text-3xl font-bold mb-4">{course.title}</h1>
            <p className="text-gray-400 mb-6">{course.description}</p>
            <div className="aspect-w-16 aspect-h-9">
              <iframe
                src={course.embedUrl}
                title={course.title}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full h-96 rounded-lg"
              ></iframe>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // --- External course with link (MIT, NPTEL, Coursera, Microsoft Learn) ---
  if (course.externalUrl) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#0B1120] via-[#1A1F36] to-[#111827] text-white">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <button
            onClick={() => navigate("/learning")}
            className="flex items-center gap-2 text-gray-400 hover:text-indigo-400 mb-6"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to Learning Hub
          </button>
          <div className="bg-gray-800/40 backdrop-blur-md border border-gray-700/50 rounded-xl p-8 text-center">
            <h1 className="text-3xl font-bold mb-4">{course.title}</h1>
            <p className="text-gray-400 mb-6">{course.description}</p>
            <a
              href={course.externalUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block px-8 py-3 bg-indigo-600 hover:bg-indigo-500 rounded-lg font-semibold transition"
            >
              Go to Course on {course.source || 'External Platform'}
            </a>
          </div>
        </div>
      </div>
    );
  }

  // --- Internal course (with content and progress) ---
  const progress = userProgress?.progress || 0;
  const completedCount = userProgress?.completedContent?.length || 0;
  const totalContent = course.content?.length || 0;

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0B1120] via-[#1A1F36] to-[#111827] text-white">
      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Back button */}
        <button
          onClick={() => navigate("/learning")}
          className="flex items-center gap-2 text-gray-400 hover:text-indigo-400 mb-6"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Back to Learning Hub
        </button>

        {/* Course header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">{course.title}</h1>
          <p className="text-gray-400 mb-4">{course.description}</p>

          <div className="flex flex-wrap gap-4 mb-6 text-sm">
            <span className="px-3 py-1 rounded-full bg-indigo-500/20 text-indigo-400 border border-indigo-500/30">
              {course.level}
            </span>
            <span className="px-3 py-1 rounded-full bg-purple-500/20 text-purple-400 border border-purple-500/30">
              {course.category}
            </span>
            <span className="text-gray-400 flex items-center gap-1">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              {Math.floor(course.duration / 60)}h {course.duration % 60}m
            </span>
          </div>

          {/* Skills */}
          <div className="mb-4">
            <h2 className="text-lg font-semibold mb-3">What you'll learn</h2>
            <div className="flex flex-wrap gap-2">
              {course.skills?.map(skill => (
                <span key={skill} className="px-3 py-1 rounded-full bg-gray-700/50 text-gray-300 border border-gray-600">
                  {skill}
                </span>
              ))}
            </div>
          </div>

          {/* Enrollment / Progress */}
          {!enrolled ? (
            <button
              onClick={enrollInCourse}
              className="w-full py-3 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-lg font-semibold hover:from-indigo-500 hover:to-purple-500 transition"
            >
              Enroll Now
            </button>
          ) : (
            <div className="mb-6">
              <div className="flex justify-between text-sm mb-2">
                <span className="text-gray-400">Your progress</span>
                <span className="text-indigo-400">{Math.round(progress)}% ({completedCount}/{totalContent})</span>
              </div>
              <div className="w-full h-3 bg-gray-700 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>
          )}
        </div>

        {/* Main content area: two columns (only if enrolled) */}
        {enrolled && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left sidebar – chapter list */}
            <div className="lg:col-span-1 bg-gray-800/40 backdrop-blur-md border border-gray-700/50 rounded-xl p-4">
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <span className="w-2 h-2 bg-indigo-400 rounded-full"></span>
                Course Content
              </h3>
              <div className="space-y-2">
                {course.content?.map((item) => {
                  const completed = isContentCompleted(item._id);
                  return (
                    <button
                      key={item._id}
                      onClick={() => setSelectedContent(item)}
                      className={`w-full text-left p-3 rounded-lg transition-colors ${
                        selectedContent?._id === item._id
                          ? "bg-indigo-600/20 border border-indigo-500/30"
                          : "hover:bg-white/5 border border-transparent"
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className="text-xl">
                            {item.type === 'video' ? '🎥' : item.type === 'quiz' ? '📝' : '📄'}
                          </span>
                          <div>
                            <p className="text-sm font-medium">{item.title}</p>
                            <p className="text-xs text-gray-400">{item.duration} min</p>
                          </div>
                        </div>
                        {completed && (
                          <span className="text-green-400">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                            </svg>
                          </span>
                        )}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Right column – content viewer */}
            <div className="lg:col-span-2 bg-gray-800/40 backdrop-blur-md border border-gray-700/50 rounded-xl p-6">
              {selectedContent ? (
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-2xl font-bold">{selectedContent.title}</h2>
                    {!isContentCompleted(selectedContent._id) && (
                      <button
                        onClick={() => markContentComplete(selectedContent._id)}
                        className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 rounded-lg text-sm transition"
                      >
                        Mark Complete
                      </button>
                    )}
                  </div>

                  {/* Content display based on type */}
                  <div className="prose prose-invert max-w-none">
                    {selectedContent.type === 'article' && (
                      <div className="text-gray-300 whitespace-pre-wrap">
                        {selectedContent.content || "No content available for this lesson."}
                      </div>
                    )}
                    {selectedContent.type === 'video' && selectedContent.url && (
                      <div className="aspect-w-16 aspect-h-9">
                        <iframe
                          src={selectedContent.url.includes('youtube.com/watch')
                            ? selectedContent.url.replace("watch?v=", "embed/")
                            : selectedContent.url}
                          title={selectedContent.title}
                          frameBorder="0"
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                          allowFullScreen
                          className="w-full h-64 rounded-lg"
                        ></iframe>
                      </div>
                    )}
                    {selectedContent.type === 'quiz' && (
                      <div className="bg-gray-700/50 p-4 rounded-lg">
                        <p className="text-gray-400">Quiz content would appear here.</p>
                      </div>
                    )}
                  </div>
                </div>
              ) : (
                <div className="text-center py-12 text-gray-400">
                  Select a chapter to start learning
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}