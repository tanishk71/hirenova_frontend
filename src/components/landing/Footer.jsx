import { useNavigate } from "react-router-dom";

export default function Footer() {
  const navigate = useNavigate();
  const currentYear = new Date().getFullYear();

  return (
    <footer id="contact" className="border-t border-gray-700/50 bg-gray-900/40 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* Main footer content */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Brand column */}
          <div className="col-span-1 md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-r from-indigo-500 to-purple-600 flex items-center justify-center text-white font-bold text-sm">
                H
              </div>
              <span className="text-lg font-bold text-white">HireNova</span>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed">
              AI-powered career platform helping professionals land their dream jobs through smart matching and personalized guidance.
            </p>
            <div className="flex gap-3 mt-4">
              {["🐦", "💼", "📘", "📸"].map((social, i) => (
                <button key={i} className="w-8 h-8 rounded-lg bg-gray-800/60 border border-gray-700 hover:border-indigo-500 hover:bg-indigo-500/10 transition-all flex items-center justify-center text-gray-400 hover:text-indigo-400">
                  <span>{social}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Solutions column */}
          <div>
            <h4 className="text-white font-semibold mb-4">Solutions</h4>
            <ul className="space-y-2 text-sm">
              {["Resume Optimization", "Interview Prep", "Job Matching", "Career Analytics", "Skill Assessment"].map((item) => (
                <li key={item}>
                  <button className="text-gray-400 hover:text-indigo-400 transition-colors flex items-center gap-2 group">
                    <span className="w-1 h-1 bg-gray-600 rounded-full group-hover:bg-indigo-400 transition-colors"></span>
                    {item}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Company column */}
          <div>
            <h4 className="text-white font-semibold mb-4">Company</h4>
            <ul className="space-y-2 text-sm">
              {["About Us", "Careers", "Press", "Blog", "Partners"].map((item) => (
                <li key={item}>
                  <button className="text-gray-400 hover:text-indigo-400 transition-colors flex items-center gap-2 group">
                    <span className="w-1 h-1 bg-gray-600 rounded-full group-hover:bg-indigo-400 transition-colors"></span>
                    {item}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact column */}
          <div>
            <h4 className="text-white font-semibold mb-4">Contact Us</h4>
            <ul className="space-y-3 text-sm">
              <li className="flex items-center gap-3 text-gray-400">
                <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <span>support@hirenova.com</span>
              </li>
              <li className="flex items-center gap-3 text-gray-400">
                <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                <span>+91 98765 43210</span>
              </li>
              <li className="flex items-center gap-3 text-gray-400">
                <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <span>Navi Mumbai</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-gray-700/50 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-500 text-sm">
            © {currentYear} HireNova. All rights reserved.
          </p>
          <div className="flex gap-6 text-xs text-gray-500">
            <button className="hover:text-indigo-400 transition-colors">Privacy Policy</button>
            <button className="hover:text-indigo-400 transition-colors">Terms of Service</button>
            <button className="hover:text-indigo-400 transition-colors">Cookie Policy</button>
          </div>
        </div>
      </div>
    </footer>
  );
}