import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/api";

export default function ResumeHistory() {
  const navigate = useNavigate();
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const res = await API.get("/resume/history");
        setHistory(res.data.history || []);
      } catch (err) {
        console.error("Failed to fetch history");
      } finally {
        setLoading(false);
      }
    };

    fetchHistory();
  }, []);

  return (
    <div className="min-h-screen p-6 md:p-10 text-gray-100 bg-gradient-to-br from-[#0B1120] via-[#1A1F36] to-[#111827]">
      <div className="max-w-6xl mx-auto">
        {/* Back button */}
        <button
          onClick={() => navigate("/dashboard")}
          className="flex items-center gap-2 text-gray-400 hover:text-indigo-400 transition-colors mb-6"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Back to Dashboard
        </button>

        <h1 className="text-4xl font-bold mb-8 bg-clip-text text-transparent bg-gradient-to-r from-indigo-200 to-purple-200">
          Resume Analysis History
        </h1>

        {loading ? (
          <p className="text-gray-400">Loading history...</p>
        ) : history.length === 0 ? (
          <p className="text-gray-400">No resume analyses found.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {history.map((item) => (
              <div
                key={item._id}
                className="bg-gray-800/40 border border-gray-700/50 rounded-2xl p-6 backdrop-blur-md"
              >
                <p className="text-sm text-gray-400">
                  {new Date(item.createdAt).toLocaleDateString()}
                </p>
                <div className="mt-4">
                  <p className="text-lg font-semibold">
                    ATS Score: {item.atsScore}/100
                  </p>
                  <p className="text-sm text-gray-400 mt-2">
                    Rejection Probability: {item.rejectionProbability}%
                  </p>
                  <div className="mt-3 h-3 bg-gray-700 rounded-full overflow-hidden">
                    <div
                      className={`h-full ${
                        item.rejectionProbability > 70
                          ? "bg-red-500"
                          : item.rejectionProbability > 40
                          ? "bg-yellow-500"
                          : "bg-green-500"
                      }`}
                      style={{ width: `${item.rejectionProbability}%` }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}