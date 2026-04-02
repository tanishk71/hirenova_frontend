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
  <div className="max-w-7xl mx-auto px-6 py-8">
    <div className="mb-8">
      <h1 className="text-4xl font-bold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-indigo-200 to-purple-200">
        Interview Test Setup</h1>
    </div>
    <div className="bg-gray-800/40 backdrop-blur-xl border border-gray-700/50 rounded-3xl p-8">
      <form onSubmit={handleStart} className="space-y-6">
        {/* Test Type Selection */}
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">Test Type</label>
          <div className="flex gap-4">
            <label className="flex items-center gap-2" color="white">
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
            <label className="flex items-center gap-2" >
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
);
}