const features = [
  {
    icon: "🎯",
    title: "Smart Job Matching",
    desc: "AI-powered algorithm that matches your skills with perfect job opportunities",
    details: ["Personalized recommendations", "Skill-based matching", "Real-time alerts"],
    color: "from-indigo-500 to-blue-500"
  },
  {
    icon: "📄",
    title: "ATS Resume Checker",
    desc: "Optimize your resume to pass through Applicant Tracking Systems",
    details: ["Keyword optimization", "Format checking", "Score analysis"],
    color: "from-purple-500 to-pink-500"
  },
  {
    icon: "📊",
    title: "Career Analytics",
    desc: "Track your applications and get insights to improve your success rate",
    details: ["Interview success metrics"],
    color: "from-green-500 to-teal-500"
  },
  {
    icon: "🤖",
    title: "AI Interview Coach",
    desc: "Practice with our AI interviewer and get real-time feedback",
    details: ["Mock interviews", "Performance analysis", "Improvement tips"],
    color: "from-orange-500 to-red-500"
  },
  {
    icon: "📈",
    title: "Skill Gap Analysis",
    desc: "Identify missing skills and get personalized learning recommendations",
    details: ["Skill assessment", "Learning paths", "Course recommendations"],
    color: "from-cyan-500 to-blue-500"
  },
  {
    icon: "🌐",
    title: "Global Job Search",
    desc: "Access opportunities from companies worldwide",
    details: ["Remote jobs"],
    color: "from-yellow-500 to-orange-500"
  },
  // Certification Prep feature removed
];

export default function Features() {
  return (
    <section id="features" className="py-24 px-6 max-w-7xl mx-auto">
      {/* Section header */}
      <div className="text-center mb-16">
        <h2 className="text-4xl md:text-5xl font-extrabold mb-4">
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-white via-indigo-200 to-purple-300">
            Why Choose HireNova?
          </span>
        </h2>
        <p className="text-xl text-gray-400 max-w-2xl mx-auto">
          Comprehensive AI-powered tools to accelerate your career journey
        </p>
      </div>

      {/* Features grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        {features.map((f, i) => (
          <div
            key={i}
            className="group relative bg-gray-800/40 backdrop-blur-md border border-gray-700/50 rounded-2xl p-6 hover:border-indigo-500/50 transition-all duration-300 hover:-translate-y-2 hover:shadow-xl hover:shadow-indigo-600/10"
          >
            {/* Gradient overlay on hover */}
            <div className={`absolute inset-0 bg-gradient-to-br ${f.color} opacity-0 group-hover:opacity-10 rounded-2xl transition-opacity duration-300`}></div>
            
            {/* Icon */}
            <div className="text-4xl mb-4 transform group-hover:scale-110 transition-transform duration-300">
              {f.icon}
            </div>
            
            {/* Title */}
            <h3 className="text-lg font-bold text-white mb-2 group-hover:text-indigo-300 transition-colors">
              {f.title}
            </h3>
            
            {/* Description */}
            <p className="text-gray-400 text-sm mb-4 leading-relaxed">
              {f.desc}
            </p>
            
            {/* Feature details */}
            <ul className="space-y-2">
              {f.details.map((detail, idx) => (
                <li key={idx} className="text-xs text-gray-500 flex items-center gap-2">
                  <span className={`w-1 h-1 rounded-full bg-gradient-to-r ${f.color}`}></span>
                  {detail}
                </li>
              ))}
            </ul>
            
            {/* "Learn more" link removed */}
          </div>
        ))}
      </div>
    </section>
  );
}