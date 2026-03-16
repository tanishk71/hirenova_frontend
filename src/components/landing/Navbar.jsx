import { useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav className="backdrop-blur-xl bg-gray-900/80 border-b border-gray-700/50 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        
        {/* Logo */}
        <div 
          className="flex items-center gap-3 cursor-pointer group"
          onClick={() => navigate("/")}
        >
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center font-bold text-white shadow-lg shadow-indigo-600/20 group-hover:scale-110 transition-transform">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </div>
          <span className="text-lg font-bold text-white">HireNova</span>
        </div>

        {/* Navigation Links */}
        <div className="hidden md:flex gap-8 text-sm">
          <button 
            onClick={() => scrollToSection("features")}
            className="text-gray-300 hover:text-white transition-colors relative group"
          >
            Features
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-indigo-400 to-purple-400 group-hover:w-full transition-all duration-300"></span>
          </button>
          <button 
            onClick={() => scrollToSection("contact")}
            className="text-gray-300 hover:text-white transition-colors relative group"
          >
            Solutions
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-indigo-400 to-purple-400 group-hover:w-full transition-all duration-300"></span>
          </button>
          <button 
            onClick={() => scrollToSection("contact")}
            className="text-gray-300 hover:text-white transition-colors relative group"
          >
            Contact
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-indigo-400 to-purple-400 group-hover:w-full transition-all duration-300"></span>
          </button>
        </div>

        {/* Auth Buttons */}
        <div className="flex items-center gap-3">
          <button 
            onClick={() => navigate("/login")}
            className="px-4 py-2 text-sm text-gray-300 hover:text-white transition-colors"
          >
            Log in
          </button>
          <button 
            onClick={() => navigate("/register")}
            className="px-4 py-2 text-sm bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white rounded-lg font-medium transition-all transform hover:scale-105 shadow-lg shadow-indigo-600/20"
          >
            Sign Up Free
          </button>
        </div>
      </div>
    </nav>
  );
}