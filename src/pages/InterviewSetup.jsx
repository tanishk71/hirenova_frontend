import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/api";

export default function InterviewSetup() {
  const navigate = useNavigate();

  const [role, setRole] = useState("");
  const [company, setCompany] = useState("");
  const [location, setLocation] = useState("");
  const [difficulty, setDifficulty] = useState("Medium");
  const [count, setCount] = useState(10);
  const [type, setType] = useState("technical");
  const [loading, setLoading] = useState(false);

  const handleStart = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await API.post("/interview/create", {
        role,
        company,
        location,
        difficulty,
        count,
        type,
      });

      navigate(`/interview/test/${res.data.testId}`, {
        state: { questions: res.data.questions },
      });
    } catch (err) {
      alert("Failed to create test");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen p-6 md:p-10 text-gray-100 bg-gradient-to-br from-[#0B1120] via-[#1A1F36] to-[#111827]">
      <div className="max-w-3xl mx-auto">
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

        <h1 className="text-4xl font-bold mb-8 text-center">Interview Test Setup</h1>
        <div className="bg-gray-800/40 backdrop-blur-xl border border-gray-700/50 rounded-3xl p-8">
          <form onSubmit={handleStart} className="space-y-6">
            {/* Test Type Selection */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Test Type</label>
              <div className="flex gap-4">
                <label className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="type"
                    value="technical"
                    checked={type === "technical"}
                    onChange={(e) => setType(e.target.value)}
                    className="text-indigo-600"
                  />
                  <span>Technical</span>
                </label>
                <label className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="type"
                    value="aptitude"
                    checked={type === "aptitude"}
                    onChange={(e) => setType(e.target.value)}
                    className="text-indigo-600"
                  />
                  <span>Aptitude</span>
                </label>
              </div>
            </div>

            <input
              type="text"
              placeholder="Job Role (e.g. Frontend Developer)"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              required
              className="w-full px-5 py-4 bg-gray-900/60 border border-gray-700 rounded-xl text-gray-200 placeholder-gray-500 focus:border-indigo-500 outline-none"
            />

            <input
              type="text"
              placeholder="Company (e.g. Google)"
              value={company}
              onChange={(e) => setCompany(e.target.value)}
              required
              className="w-full px-5 py-4 bg-gray-900/60 border border-gray-700 rounded-xl text-gray-200 placeholder-gray-500 focus:border-indigo-500 outline-none"
            />

            <input
              type="text"
              placeholder="Location"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="w-full px-5 py-4 bg-gray-900/60 border border-gray-700 rounded-xl text-gray-200 placeholder-gray-500 focus:border-indigo-500 outline-none"
            />

            <select
              value={difficulty}
              onChange={(e) => setDifficulty(e.target.value)}
              className="w-full px-5 py-4 bg-gray-900/60 border border-gray-700 rounded-xl text-gray-200 focus:border-indigo-500 outline-none"
            >
              <option>Easy</option>
              <option>Medium</option>
              <option>Hard</option>
            </select>

            <input
              type="number"
              min="5"
              max="25"
              value={count}
              onChange={(e) => setCount(Number(e.target.value))}
              className="w-full px-5 py-4 bg-gray-900/60 border border-gray-700 rounded-xl text-gray-200 focus:border-indigo-500 outline-none"
            />

            <button
              type="submit"
              disabled={loading}
              className="w-full py-4 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-semibold rounded-xl transition disabled:opacity-50"
            >
              {loading ? "Generating Test..." : "Start Interview"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}