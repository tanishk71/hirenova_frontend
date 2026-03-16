import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/api";

export default function Certificates() {
  const navigate = useNavigate();
  const [certificates, setCertificates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCert, setSelectedCert] = useState(null);

  useEffect(() => {
    fetchCertificates();
  }, []);

  const fetchCertificates = async () => {
    try {
      const res = await API.get("/certificates");
      setCertificates(res.data);
    } catch (error) {
      console.error("Failed to fetch certificates:", error);
    } finally {
      setLoading(false);
    }
  };

  const generateCertificate = async (courseId, grade, score) => {
    try {
      const res = await API.post("/certificates/generate", {
        courseId,
        grade,
        score
      });
      fetchCertificates();
      setSelectedCert(res.data);
    } catch (error) {
      console.error("Failed to generate certificate:", error);
    }
  };

  const downloadCertificate = async (certId) => {
    try {
      const res = await API.get(`/certificates/${certId}/download`);
      // Handle PDF download
      window.open(res.data.downloadUrl, '_blank');
    } catch (error) {
      console.error("Failed to download certificate:", error);
    }
  };

  const shareCertificate = (cert) => {
    // Copy shareable link to clipboard
    navigator.clipboard.writeText(cert.shareableUrl);
    alert("Certificate link copied to clipboard!");
  };

  const getGradeColor = (grade) => {
    const colors = {
      "Pass": "bg-blue-500/20 text-blue-400 border-blue-500/30",
      "Merit": "bg-purple-500/20 text-purple-400 border-purple-500/30",
      "Distinction": "bg-yellow-500/20 text-yellow-400 border-yellow-500/30"
    };
    return colors[grade] || colors["Pass"];
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0B1120] via-[#1A1F36] to-[#111827] text-white">
      {/* Header */}
      <div className="border-b border-gray-700/50 bg-gray-900/40 backdrop-blur-md sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <button
              onClick={() => navigate("/dashboard")}
              className="flex items-center gap-2 text-gray-400 hover:text-indigo-400 transition-colors"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Back to Dashboard
            </button>
            <h1 className="text-xl font-bold text-white">My Certificates</h1>
            <div className="w-20"></div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-gray-800/40 backdrop-blur-md border border-gray-700/50 rounded-xl p-6">
            <p className="text-gray-400 text-sm mb-1">Total Certificates</p>
            <p className="text-3xl font-bold text-white">{certificates.length}</p>
          </div>
          <div className="bg-gray-800/40 backdrop-blur-md border border-gray-700/50 rounded-xl p-6">
            <p className="text-gray-400 text-sm mb-1">Distinctions</p>
            <p className="text-3xl font-bold text-yellow-400">
              {certificates.filter(c => c.grade === 'Distinction').length}
            </p>
          </div>
          <div className="bg-gray-800/40 backdrop-blur-md border border-gray-700/50 rounded-xl p-6">
            <p className="text-gray-400 text-sm mb-1">Skills Earned</p>
            <p className="text-3xl font-bold text-green-400">
              {certificates.reduce((acc, cert) => acc + (cert.skills?.length || 0), 0)}
            </p>
          </div>
        </div>

        {/* Certificates Grid */}
        {loading ? (
          <div className="text-center py-12">
            <div className="animate-spin w-10 h-10 border-4 border-indigo-500 border-t-transparent rounded-full mx-auto mb-4"></div>
            <p className="text-gray-400">Loading certificates...</p>
          </div>
        ) : certificates.length === 0 ? (
          <div className="bg-gray-800/40 backdrop-blur-md border border-gray-700/50 rounded-2xl p-12 text-center">
            <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-gray-700/50 flex items-center justify-center">
              <svg className="w-10 h-10 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">No certificates yet</h3>
            <p className="text-gray-400 mb-4">Complete courses to earn certificates</p>
            <button
              onClick={() => navigate("/learning")}
              className="px-6 py-2 bg-indigo-600 hover:bg-indigo-500 rounded-lg text-white transition"
            >
              Browse Courses
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {certificates.map(cert => (
              <div
                key={cert._id}
                className="bg-gray-800/40 backdrop-blur-md border border-gray-700/50 rounded-xl p-6 hover:border-indigo-500/50 transition-all group"
              >
                {/* Certificate Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-yellow-500/20 to-orange-500/20 border border-yellow-500/30 flex items-center justify-center">
                      <svg className="w-6 h-6 text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-semibold text-white group-hover:text-indigo-300 transition-colors">
                        {cert.metadata.courseName}
                      </h3>
                      <p className="text-xs text-gray-400">{cert.metadata.courseCategory}</p>
                    </div>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getGradeColor(cert.grade)}`}>
                    {cert.grade}
                  </span>
                </div>

                {/* Certificate Details */}
                <div className="space-y-2 mb-4">
                  <p className="text-sm text-gray-300">
                    <span className="text-gray-400">Certificate #:</span>{' '}
                    <span className="font-mono text-xs">{cert.certificateNumber}</span>
                  </p>
                  <p className="text-sm text-gray-300">
                    <span className="text-gray-400">Issued:</span>{' '}
                    {new Date(cert.issueDate).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </p>
                  {cert.score && (
                    <p className="text-sm text-gray-300">
                      <span className="text-gray-400">Score:</span>{' '}
                      <span className="text-indigo-400 font-semibold">{cert.score}%</span>
                    </p>
                  )}
                </div>

                {/* Skills */}
                {cert.skills && cert.skills.length > 0 && (
                  <div className="mb-4">
                    <p className="text-xs text-gray-500 mb-2">Skills Acquired:</p>
                    <div className="flex flex-wrap gap-1">
                      {cert.skills.slice(0, 3).map(skill => (
                        <span key={skill} className="px-2 py-0.5 rounded-full text-xs bg-gray-700/50 text-gray-300 border border-gray-600">
                          {skill}
                        </span>
                      ))}
                      {cert.skills.length > 3 && (
                        <span className="px-2 py-0.5 rounded-full text-xs bg-gray-700/50 text-gray-300 border border-gray-600">
                          +{cert.skills.length - 3}
                        </span>
                      )}
                    </div>
                  </div>
                )}

                {/* Actions */}
                <div className="flex gap-2 mt-4 pt-4 border-t border-gray-700/50">
                  <button
                    onClick={() => downloadCertificate(cert._id)}
                    className="flex-1 py-2 bg-indigo-600 hover:bg-indigo-500 rounded-lg text-white text-sm font-medium transition flex items-center justify-center gap-1"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                    </svg>
                    Download
                  </button>
                  <button
                    onClick={() => shareCertificate(cert)}
                    className="px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg text-white text-sm font-medium transition flex items-center justify-center"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                    </svg>
                  </button>
                </div>

                {/* Verification Badge */}
                <div className="mt-3 text-xs text-center text-gray-500 flex items-center justify-center gap-1">
                  <span className="w-1.5 h-1.5 bg-green-400 rounded-full"></span>
                  Verified Certificate
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Certificate Detail Modal */}
      {selectedCert && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-gray-800 rounded-2xl p-8 max-w-2xl w-full border border-gray-700">
            <div className="text-center mb-6">
              <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-gradient-to-r from-yellow-500 to-orange-500 flex items-center justify-center">
                <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-white mb-2">Certificate of Achievement</h2>
              <p className="text-gray-400">Presented to</p>
              <p className="text-3xl font-bold text-white mt-2">{selectedCert.user?.username}</p>
            </div>

            <div className="border-t border-b border-gray-700 py-6 my-6">
              <p className="text-center text-lg text-gray-300 mb-2">
                For successfully completing
              </p>
              <p className="text-center text-2xl font-bold text-indigo-400">
                {selectedCert.metadata.courseName}
              </p>
              <p className="text-center text-gray-400 mt-2">
                with grade <span className="text-yellow-400 font-semibold">{selectedCert.grade}</span>
                {selectedCert.score && ` • Score: ${selectedCert.score}%`}
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4 text-center mb-6">
              <div>
                <p className="text-gray-400 text-sm">Issue Date</p>
                <p className="text-white">{new Date(selectedCert.issueDate).toLocaleDateString()}</p>
              </div>
              <div>
                <p className="text-gray-400 text-sm">Certificate ID</p>
                <p className="text-white font-mono text-sm">{selectedCert.certificateNumber}</p>
              </div>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => downloadCertificate(selectedCert._id)}
                className="flex-1 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-lg text-white font-medium hover:from-indigo-500 hover:to-purple-500 transition"
              >
                Download PDF
              </button>
              <button
                onClick={() => setSelectedCert(null)}
                className="px-6 py-3 bg-gray-700 rounded-lg text-white font-medium hover:bg-gray-600 transition"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}