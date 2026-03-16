import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

export default function Hero() {
  const navigate = useNavigate();
  const [animatedText, setAnimatedText] = useState("");
  const fullText = "Find Your Dream Career";

  useEffect(() => {
    let i = 0;
    const timer = setInterval(() => {
      if (i < fullText.length) {
        setAnimatedText(fullText.substring(0, i + 1));
        i++;
      } else {
        clearInterval(timer);
      }
    }, 100);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative min-h-[90vh] flex items-center justify-center px-6 overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-indigo-500/30 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-500/30 rounded-full blur-3xl animate-pulse animation-delay-2000"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-indigo-600/10 to-purple-600/10 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-4xl mx-auto text-center relative z-10">
        {/* Animated badge */}
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-500/10 border border-indigo-500/30 mb-8 animate-fade-in">
          <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
          <span className="text-sm text-indigo-300">AI-Powered Career Platform</span>
        </div>

        {/* Main heading with animation */}
        <h1 className="text-5xl md:text-7xl font-extrabold mb-6">
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-white via-indigo-200 to-purple-300">
            {animatedText}
            <span className="animate-pulse">|</span>
          </span>
        </h1>

        {/* Description with floating elements */}
        <p className="text-xl text-gray-300 mb-10 max-w-2xl mx-auto leading-relaxed">
          Connect with top companies, optimize your resume with 
          <span className="text-indigo-400 font-semibold"> AI-powered ATS analysis</span>, 
          and land your dream job faster with personalized career guidance.
        </p>



        {/* CTA Buttons */}
        <div className="flex justify-center gap-4 flex-wrap">
          <button 
            onClick={() => navigate("/register")}
            className="group relative px-8 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-semibold rounded-xl transition-all transform hover:scale-105 shadow-xl shadow-indigo-600/30 overflow-hidden"
          >
            <span className="relative z-10">Get Started Free</span>
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
          </button>

          <button 
            onClick={() => navigate("/jobs")}
            className="px-8 py-4 rounded-xl border border-gray-600 bg-gray-800/50 backdrop-blur-sm text-white font-semibold hover:bg-gray-700/50 transition-all transform hover:scale-105 flex items-center gap-2 group"
          >
            <span>Browse Jobs</span>
            <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </button>
        </div>

        {/* Trust badges */}
        <div className="mt-12 flex items-center justify-center gap-6 text-gray-500 text-sm">
          <span>🔒 Secure & Private</span>
          <span>⚡ Real-time updates</span>
        </div>
      </div>
    </section>
  );
}