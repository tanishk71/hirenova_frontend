import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/api";

export default function ResumeATS() {
  const navigate = useNavigate();
  const [file, setFile] = useState(null);
  const [jobDescription, setJobDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [analysis, setAnalysis] = useState(null);
  const [error, setError] = useState("");

  const handleAnalyze = async (e) => {
    e.preventDefault();
    setError("");
    setAnalysis(null);

    if (!file) return setError("Please upload a resume file (PDF/DOCX).");

    setLoading(true);
    try {
      const form = new FormData();
      form.append("resume", file);
      form.append("jobDescription", jobDescription.trim());

      const res = await API.post("/resume/analyze", form, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      setAnalysis(res.data.analysis);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to analyze resume");
    } finally {
      setLoading(false);
    }
  };

  // Helper to determine color based on score
  const getScoreColor = (score) => {
    if (score >= 80) return "text-green-400";
    if (score >= 60) return "text-yellow-400";
    if (score >= 40) return "text-orange-400";
    return "text-red-400";
  };

  const getProgressColor = (score) => {
    if (score >= 80) return "bg-green-500";
    if (score >= 60) return "bg-yellow-500";
    if (score >= 40) return "bg-orange-500";
    return "bg-red-500";
  };

  const getRiskBadge = (probability) => {
    if (probability < 30) return { text: "Low Risk", color: "bg-green-500/20 text-green-400 border-green-500/30" };
    if (probability < 60) return { text: "Medium Risk", color: "bg-yellow-500/20 text-yellow-400 border-yellow-500/30" };
    return { text: "High Risk", color: "bg-red-500/20 text-red-400 border-red-500/30" };
  };

  return (
    <div className="min-h-screen p-6 md:p-10 text-gray-100 bg-gradient-to-br from-[#0B1120] via-[#1A1F36] to-[#111827]">
      <div className="max-w-6xl mx-auto">

        {/* Header */}
        <div className="mb-10">
          <h1 className="text-4xl font-bold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-indigo-200 to-purple-200">
            Resume ATS Checker
          </h1>
          <p className="text-gray-400">
            Upload your resume and compare it against job descriptions using AI-powered analysis.
          </p>
        </div>

        {/* Upload Card */}
        <form
          onSubmit={handleAnalyze}
          className="bg-gray-800/40 backdrop-blur-xl border border-gray-700/50 rounded-3xl p-8 space-y-6"
        >
          {/* Drag Upload Box */}
          <div className="border-2 border-dashed border-gray-600 rounded-2xl p-8 text-center hover:border-indigo-500 transition">
            <input
              type="file"
              accept=".pdf,.doc,.docx"
              onChange={(e) => setFile(e.target.files?.[0] || null)}
              className="hidden"
              id="resumeUpload"
            />
            <label htmlFor="resumeUpload" className="cursor-pointer">
              <p className="text-lg font-semibold">
                {file ? file.name : "Click to upload your Resume"}
              </p>
              <p className="text-sm text-gray-400 mt-1">
                PDF or DOCX format supported
              </p>
            </label>
          </div>

          {/* Job Description */}
          <div>
            <label className="text-sm text-gray-400">Job Description (Optional)</label>
            <textarea
              value={jobDescription}
              onChange={(e) => setJobDescription(e.target.value)}
              placeholder="Paste job description here..."
              rows={5}
              className="w-full mt-2 px-4 py-3 bg-gray-900/60 border border-gray-700 rounded-xl text-gray-200 placeholder-gray-500 focus:border-indigo-500 outline-none resize-none"
            />
          </div>

          {error && (
            <p className="text-red-400 text-sm">{error}</p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="px-8 py-3 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 font-semibold transition disabled:opacity-50"
          >
            {loading ? "Analyzing Resume..." : "Analyze Resume"}
          </button>
        </form>

        {/* Results Section */}
        {analysis && (
          <div className="mt-12 space-y-8">
            {/* Score Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* ATS Score */}
              <div className="bg-gray-800/40 backdrop-blur-md border border-gray-700/50 rounded-2xl p-6">
                <p className="text-gray-400 text-sm mb-2">ATS Score</p>
                <div className="flex items-end gap-2">
                  <span className={`text-5xl font-bold ${getScoreColor(analysis.atsScore)}`}>
                    {analysis.atsScore}
                  </span>
                  <span className="text-gray-500 pb-1">/100</span>
                </div>
                <div className="mt-4 w-full h-2 bg-gray-700 rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full ${getProgressColor(analysis.atsScore)}`}
                    style={{ width: `${analysis.atsScore}%` }}
                  />
                </div>
                <p className="text-xs text-gray-400 mt-3">
                  {analysis.benchmark || "Industry standard: 60+"}
                </p>
              </div>

              {/* Keyword Match */}
              <div className="bg-gray-800/40 backdrop-blur-md border border-gray-700/50 rounded-2xl p-6">
                <p className="text-gray-400 text-sm mb-2">Keyword Match</p>
                <div className="flex items-end gap-2">
                  <span className={`text-5xl font-bold ${getScoreColor(analysis.keywordMatchPercent)}`}>
                    {analysis.keywordMatchPercent}
                  </span>
                  <span className="text-gray-500 pb-1">%</span>
                </div>
                <div className="mt-4 w-full h-2 bg-gray-700 rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full ${getProgressColor(analysis.keywordMatchPercent)}`}
                    style={{ width: `${analysis.keywordMatchPercent}%` }}
                  />
                </div>
                <p className="text-xs text-gray-400 mt-3">
                  {analysis.matchedKeywords?.length || 0} keywords matched
                </p>
              </div>

              {/* Rejection Probability */}
              <div className="bg-gray-800/40 backdrop-blur-md border border-gray-700/50 rounded-2xl p-6">
                <p className="text-gray-400 text-sm mb-2">Rejection Risk</p>
                <div className="flex items-end gap-2">
                  <span className={`text-5xl font-bold ${
                    analysis.rejectionProbability < 30 ? 'text-green-400' :
                    analysis.rejectionProbability < 60 ? 'text-yellow-400' : 'text-red-400'
                  }`}>
                    {analysis.rejectionProbability}
                  </span>
                  <span className="text-gray-500 pb-1">%</span>
                </div>
                <div className="mt-4 w-full h-2 bg-gray-700 rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full ${
                      analysis.rejectionProbability < 30 ? 'bg-green-500' :
                      analysis.rejectionProbability < 60 ? 'bg-yellow-500' : 'bg-red-500'
                    }`}
                    style={{ width: `${analysis.rejectionProbability}%` }}
                  />
                </div>
                <p className="text-xs text-gray-400 mt-3">
                  {getRiskBadge(analysis.rejectionProbability).text}
                </p>
              </div>
            </div>

            {/* Strengths & Weaknesses */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Strengths */}
              <div className="bg-gray-800/40 backdrop-blur-md border border-gray-700/50 rounded-2xl p-6">
                <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                  <span className="w-2 h-2 bg-green-400 rounded-full"></span>
                  Strengths
                </h3>
                {analysis.strengths && analysis.strengths.length > 0 ? (
                  <ul className="space-y-2">
                    {analysis.strengths.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-sm text-gray-300">
                        <span className="text-green-400 mt-1">✓</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-gray-500 text-sm">No specific strengths identified.</p>
                )}
              </div>

              {/* Weaknesses */}
              <div className="bg-gray-800/40 backdrop-blur-md border border-gray-700/50 rounded-2xl p-6">
                <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                  <span className="w-2 h-2 bg-red-400 rounded-full"></span>
                  Areas to Improve
                </h3>
                {analysis.weaknesses && analysis.weaknesses.length > 0 ? (
                  <ul className="space-y-2">
                    {analysis.weaknesses.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-sm text-gray-300">
                        <span className="text-red-400 mt-1">⚠</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-gray-500 text-sm">No major weaknesses detected.</p>
                )}
              </div>
            </div>

            {/* Missing Keywords */}
            {analysis.missingKeywords && analysis.missingKeywords.length > 0 && (
              <div className="bg-gray-800/40 backdrop-blur-md border border-gray-700/50 rounded-2xl p-6">
                <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                  <span className="w-2 h-2 bg-yellow-400 rounded-full"></span>
                  Missing Keywords
                </h3>
                <div className="flex flex-wrap gap-2">
                  {analysis.missingKeywords.slice(0, 40).map((kw) => (
                    <span
                      key={kw}
                      className="px-3 py-1.5 rounded-full text-xs bg-gray-700/80 text-gray-300 border border-gray-600"
                    >
                      {kw}
                    </span>
                  ))}
                </div>
                <p className="text-xs text-gray-500 mt-3">
                  Try incorporating these keywords to improve your match score.
                </p>
              </div>
            )}

            {/* Improvement Tips */}
            {analysis.tips && analysis.tips.length > 0 && (
              <div className="bg-gray-800/40 backdrop-blur-md border border-gray-700/50 rounded-2xl p-6">
                <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                  <span className="w-2 h-2 bg-blue-400 rounded-full"></span>
                  Improvement Tips
                </h3>
                <ul className="space-y-2">
                  {analysis.tips.map((tip, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-sm text-gray-300">
                      <span className="text-blue-400 mt-1">•</span>
                      <span>{tip}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* AI Summary */}
            {analysis.aiSummary && (
              <div className="bg-gradient-to-br from-indigo-600/10 to-purple-600/10 border border-indigo-500/30 rounded-2xl p-6">
                <h3 className="text-lg font-semibold text-white mb-2 flex items-center gap-2">
                  <span className="w-2 h-2 bg-indigo-400 rounded-full"></span>
                  AI Summary
                </h3>
                <p className="text-gray-300 text-sm leading-relaxed">{analysis.aiSummary}</p>
              </div>
            )}

            {/* Optional: Rewritten Bullets */}
            {analysis.rewrittenBullets && analysis.rewrittenBullets.length > 0 && (
              <div className="bg-gray-800/40 backdrop-blur-md border border-gray-700/50 rounded-2xl p-6">
                <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                  <span className="w-2 h-2 bg-purple-400 rounded-full"></span>
                  Optimized Bullet Points
                </h3>
                <ul className="space-y-2">
                  {analysis.rewrittenBullets.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-sm text-gray-300">
                      <span className="text-purple-400 mt-1">✨</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}