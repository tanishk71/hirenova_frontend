import { useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Rocket logo SVG (same as in Sidebar)
  const LogoIcon = () => (
    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
      />
    </svg>
  );

  return (
    <nav className="backdrop-blur-xl bg-gray-900/80 border-b border-gray-700/50 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        
        {/* Logo */}
        <div 
          className="flex items-center gap-3 cursor-pointer group"
          onClick={() => navigate("/")}
        >
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center font-bold text-white shadow-lg shadow-indigo-600/20 group-hover:scale-110 transition-transform">
            <LogoIcon />
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