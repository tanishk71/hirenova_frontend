import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import API from "../api/api";

export default function InterviewTest() {
  const { testId } = useParams();
  const location = useLocation();
  const navigate = useNavigate();

  const questions = location.state?.questions || [];
  const [answers, setAnswers] = useState([]);
  const [timeLeft, setTimeLeft] = useState(600); // 10 min
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          handleSubmit(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const handleSelect = (questionIndex, selectedAnswer) => {
    setAnswers((prev) => {
      const filtered = prev.filter((a) => a.questionIndex !== questionIndex);
      return [...filtered, { questionIndex, selectedAnswer }];
    });
  };

  const handleSubmit = async (isAuto = false) => {
    if (isSubmitting) return;
    setIsSubmitting(true);

    try {
      const res = await API.post("/interview/submit", {
        testId,
        answers,
      });
      navigate("/interview/result", { state: res.data });
    } catch {
      alert("Submission failed. Please try again.");
      setIsSubmitting(false);
    }
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  const isAnswered = (questionIndex) => {
    return answers.some((a) => a.questionIndex === questionIndex);
  };

  return (
    <div className="min-h-screen p-4 md:p-8 text-gray-100 bg-gradient-to-br from-[#0B1120] via-[#1A1F36] to-[#111827]">
      <div className="max-w-4xl mx-auto">
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

        {/* Sticky header with timer and progress */}
        <div className="sticky top-0 z-10 bg-gray-900/80 backdrop-blur-xl border border-gray-700/50 rounded-2xl p-4 mb-8 shadow-xl flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-indigo-600/20 flex items-center justify-center">
              <svg className="w-5 h-5 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
            </div>
            <div>
              <h2 className="text-xl font-bold text-white">Interview Test</h2>
              <p className="text-xs text-gray-400 mt-0.5">
                {answers.length} of {questions.length} questions answered
              </p>
            </div>
          </div>

          <div className={`flex items-center gap-3 px-4 py-2 rounded-xl ${
            timeLeft < 60 ? 'bg-red-900/30 border border-red-800' : 'bg-gray-800/60 border border-gray-700'
          }`}>
            <svg className={`w-5 h-5 ${timeLeft < 60 ? 'text-red-400 animate-pulse' : 'text-gray-400'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span className={`font-mono text-xl font-bold ${timeLeft < 60 ? 'text-red-400' : 'text-indigo-300'}`}>
              {formatTime(timeLeft)}
            </span>
          </div>
        </div>

        {/* Questions list */}
        {questions.length === 0 ? (
          <div className="bg-gray-800/40 backdrop-blur-md border border-gray-700/50 rounded-2xl p-12 text-center">
            <p className="text-gray-400">No questions available. Please go back and try again.</p>
          </div>
        ) : (
          <div className="space-y-6">
            {questions.map((q, index) => {
              const answered = isAnswered(index);
              return (
                <div
                  key={index}
                  className={`bg-gray-800/40 backdrop-blur-md border rounded-2xl p-6 transition-all duration-300 ${
                    answered 
                      ? 'border-indigo-500/40 shadow-lg shadow-indigo-600/10' 
                      : 'border-gray-700/50 hover:border-gray-600'
                  }`}
                >
                  <div className="flex items-start gap-3 mb-4">
                    <div className={`w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 ${
                      answered ? 'bg-indigo-600/20 text-indigo-400' : 'bg-gray-700/50 text-gray-400'
                    }`}>
                      <span className="text-sm font-bold">{index + 1}</span>
                    </div>
                    <div className="flex-1">
                      <p className="text-lg font-medium text-gray-200 leading-relaxed">
                        {q.question}
                      </p>
                      {answered && (
                        <span className="inline-flex items-center gap-1 mt-2 text-xs text-indigo-400">
                          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                          </svg>
                          Answered
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pl-10">
                    {q.options.map((opt, i) => {
                      const isSelected = answers.some(
                        (a) => a.questionIndex === index && a.selectedAnswer === opt
                      );
                      return (
                        <button
                          key={i}
                          onClick={() => handleSelect(index, opt)}
                          className={`
                            text-left px-5 py-4 rounded-xl border transition-all duration-200
                            ${isSelected 
                              ? 'bg-indigo-600/20 border-indigo-500 shadow-md shadow-indigo-600/20' 
                              : 'bg-gray-900/40 border-gray-700 hover:border-indigo-500/50 hover:bg-gray-800/60'
                            }
                          `}
                        >
                          <div className="flex items-center gap-3">
                            <span className={`w-5 h-5 rounded-full border flex items-center justify-center flex-shrink-0 ${
                              isSelected 
                                ? 'border-indigo-400 bg-indigo-500/20' 
                                : 'border-gray-600'
                            }`}>
                              {isSelected && (
                                <svg className="w-3 h-3 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
                                </svg>
                              )}
                            </span>
                            <span className="text-sm text-gray-300">{opt}</span>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Submit button */}
        {questions.length > 0 && (
          <div className="mt-10 sticky bottom-4">
            <div className="bg-gray-800/80 backdrop-blur-xl border border-gray-700/50 rounded-2xl p-4 shadow-2xl">
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-3 text-sm">
                  <div className="w-8 h-8 rounded-full bg-indigo-600/20 flex items-center justify-center">
                    <span className="text-indigo-400 font-bold">{answers.length}</span>
                  </div>
                  <span className="text-gray-400">
                    of <span className="text-white font-medium">{questions.length}</span> questions answered
                  </span>
                  {answers.length < questions.length && (
                    <span className="text-yellow-400 text-xs flex items-center gap-1">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                      </svg>
                      {questions.length - answers.length} unanswered
                    </span>
                  )}
                </div>

                <button
                  onClick={() => handleSubmit(false)}
                  disabled={isSubmitting}
                  className="relative w-full sm:w-auto px-8 py-3 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-500 hover:to-emerald-500 text-white font-semibold rounded-xl shadow-lg shadow-green-600/20 transform transition hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed min-w-[160px]"
                >
                  {isSubmitting ? (
                    <span className="flex items-center justify-center gap-2">
                      <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Submitting...
                    </span>
                  ) : (
                    <span className="flex items-center justify-center gap-2">
                      Submit Test
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </span>
                  )}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}