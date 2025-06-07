import { useEffect, useState } from "react";

// Proper TypeScript interfaces
interface SearchBarProps {
  placeholder?: string;
  onSearch?: (value: string) => void;
}

interface Startup {
  _id: string;
  name: string;
  summary: string;
  tags: string[];
  website: string;
}

interface ResultCardProps {
  name: string;
  summary: string;
  tags: string[];
  website: string;
}

// Built-in SearchBar Component with proper types
const SearchBar: React.FC<SearchBarProps> = ({ placeholder = "Search...", onSearch }) => {
  const [value, setValue] = useState<string>("");
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
    if (onSearch) {
      onSearch(e.target.value);
    }
  };

  return (
    <div className="relative group">
      <input
        type="text"
        value={value}
        onChange={handleChange}
        placeholder={placeholder}
        className="w-full px-5 py-4 bg-white/5 border border-white/10 rounded-2xl text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-teal-400/50 focus:border-teal-400/50 transition-all duration-300 backdrop-blur-xl hover:bg-white/10"
      />
      <div className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white/60 group-focus-within:text-teal-400 transition-colors duration-300">
        🔍
      </div>
    </div>
  );
};

// Built-in ResultCard Component with proper types
const ResultCard: React.FC<ResultCardProps> = ({ name, summary, tags, website }) => {
  return (
    <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-5 hover:border-teal-400/30 hover:bg-white/10 transition-all duration-500 hover:scale-[1.02] hover:shadow-2xl hover:shadow-teal-500/10 group cursor-pointer">
      <div className="flex items-start justify-between mb-3">
        <h3 className="font-bold text-white group-hover:text-teal-200 transition-colors duration-300 text-lg">
          {name}
        </h3>
        {website && (
          <a
            href={website}
            target="_blank"
            rel="noopener noreferrer"
            className="text-teal-400 hover:text-teal-300 transition-all duration-300 hover:scale-110 text-lg"
            onClick={(e) => e.stopPropagation()}
          >
            🔗
          </a>
        )}
      </div>
      <p className="text-sm text-white/70 mb-4 leading-relaxed line-clamp-3">{summary}</p>
      <div className="flex flex-wrap gap-2">
        {tags.map((tag: string, index: number) => (
          <span
            key={index}
            className="px-3 py-1 bg-teal-500/20 text-teal-200 text-xs font-medium rounded-full border border-teal-500/30 hover:bg-teal-500/30 transition-colors duration-300"
          >
            {tag}
          </span>
        ))}
      </div>
    </div>
  );
};

const Dashboard: React.FC = () => {
  const [startups, setStartups] = useState<Startup[]>([]);
  const [search, setSearch] = useState<string>("");
  const [isLoaded, setIsLoaded] = useState<boolean>(false);

  useEffect(() => {
    // Simulate loading animation
    setTimeout(() => setIsLoaded(true), 500);
    
    fetch("/api/startups")
      .then((res) => res.json())
      .then((data: Startup[]) => setStartups(data))
      .catch((err) => console.error("❌ Failed to fetch startups:", err));
  }, []);

  const filtered = startups.filter((s) =>
    s.name.toLowerCase().includes(search.toLowerCase()) ||
    s.tags.some((tag) => tag.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-gray-900 to-teal-900 text-white font-sans overflow-hidden">
      
      {/* Animated background elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-10 -left-10 w-80 h-80 bg-teal-500/10 rounded-full blur-3xl animate-pulse animate-float"></div>
        <div className="absolute top-1/2 -right-20 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse animate-float-delay"></div>
        <div className="absolute -bottom-20 left-1/3 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl animate-pulse animate-float-slow"></div>
      </div>

      {/* Main container */}
      <div className="relative flex min-h-screen overflow-hidden">
        
        {/* Left Panel - Brand & Info */}
        <div className={`w-80 flex-shrink-0 p-8 flex flex-col justify-center relative z-20 transition-all duration-1000 ${isLoaded ? 'translate-x-0 opacity-100' : '-translate-x-full opacity-0'}`}>
          <div className="absolute inset-0 bg-gradient-to-b from-white/5 to-transparent backdrop-blur-sm border-r border-white/10"></div>
          
          <div className="relative z-10 space-y-8">
            {/* Logo */}
            <div className="flex items-center space-x-4">
              <div className="text-3xl font-black bg-gradient-to-r from-white via-teal-200 to-blue-200 bg-clip-text text-transparent">
                StartupSpotter
              </div>
              <div className="text-3xl animate-bounce">🚀</div>
            </div>
            
            {/* Description */}
            <div className="space-y-4">
              <p className="text-white/80 leading-relaxed text-lg">
                Discover small business ideas tailored to your strengths, passions, and local demand.
              </p>
              <p className="text-white/60 leading-relaxed">
                Our AI tools and curated database make launching your next venture simpler than ever.
              </p>
            </div>
            
            {/* Feature indicators */}
            <div className="space-y-4">
              <div className="flex items-center space-x-3 text-white/70">
                <div className="w-3 h-3 bg-teal-400 rounded-full animate-ping"></div>
                <span className="text-sm font-medium">AI-Powered Market Analysis</span>
              </div>
              <div className="flex items-center space-x-3 text-white/70">
                <div className="w-3 h-3 bg-blue-400 rounded-full animate-ping animate-delay-300"></div>
                <span className="text-sm font-medium">Curated Startup Database</span>
              </div>
              <div className="flex items-center space-x-3 text-white/70">
                <div className="w-3 h-3 bg-purple-400 rounded-full animate-ping animate-delay-500"></div>
                <span className="text-sm font-medium">Local Opportunity Detection</span>
              </div>
            </div>
          </div>
        </div>

        {/* Center Panel - AI Agent */}
          <div className={`flex-1 flex items-center justify-center p-8 relative z-10 transition-all duration-1000 delay-300 ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
            
          <div className="w-full max-w-3xl mx-auto">
            <div className="bg-white/5 backdrop-blur-2xl border border-white/20 rounded-3xl p-12 hover:bg-white/10 transition-all duration-700 hover:scale-[1.02] hover:shadow-2xl hover:shadow-teal-500/20 group">
              
              {/* Header */}
              <div className="text-center mb-10 space-y-6">
                <div className="flex items-center justify-center space-x-4">
                  <div className="text-5xl animate-spin-slow">🤖</div>
                  <h2 className="text-5xl font-black bg-gradient-to-r from-teal-300 via-blue-300 to-purple-300 bg-clip-text text-transparent">
                    AI Startup Agent
                  </h2>
                </div>
                
                <p className="text-xl text-white/80 leading-relaxed max-w-2xl mx-auto">
                  Enter your startup vision and we'll help you create the perfect, most profitable business strategy.
                </p>
              </div>
              
              {/* Search Input */}
              <div className="space-y-8">
                <SearchBar placeholder="✨ Describe your startup idea and watch the magic unfold..." />
                
                {/* Action Buttons */}
                <div className="flex justify-center space-x-6">
                  <button className="px-8 py-4 bg-gradient-to-r from-teal-500 to-teal-600 hover:from-teal-400 hover:to-teal-500 rounded-2xl font-bold transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-teal-500/25 flex items-center space-x-2">
                    <span>🎯</span>
                    <span>Analyze Market</span>
                  </button>
                  <button className="px-8 py-4 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-400 hover:to-blue-500 rounded-2xl font-bold transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-blue-500/25 flex items-center space-x-2">
                    <span>💡</span>
                    <span>Generate Ideas</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Panel - Startup Discovery */}
        <div className={`w-96 flex-shrink-0 p-6 space-y-6 overflow-y-auto relative z-20 transition-all duration-1000 delay-500 ${isLoaded ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'}`}>
          <div className="absolute inset-0 bg-gradient-to-b from-white/5 to-transparent backdrop-blur-sm border-l border-white/10"></div>
          
          <div className="relative z-10 space-y-6">
            {/* Header */}
            <div className="text-center">
              <div className="flex items-center justify-center space-x-3 mb-4">
                <span className="text-2xl">🔍</span>
                <h3 className="text-2xl font-bold text-white">Discover Startups</h3>
              </div>
              <SearchBar placeholder="Search amazing startups..." onSearch={setSearch} />
            </div>
            
            {/* Results */}
            <div className="space-y-4">
              {filtered.length > 0 ? (
                filtered.map((startup, index) => (
                  <div
                    key={startup._id}
                    className="animate-slide-in"
                    style={{
                      animationDelay: `${index * 100}ms`,
                      animationFillMode: 'both'
                    }}
                  >
                    <ResultCard {...startup} />
                  </div>
                ))
              ) : (
                <div className="text-center py-16 space-y-4">
                  <div className="text-6xl opacity-50">🌟</div>
                  <div className="space-y-2">
                    <p className="text-white/60 font-medium">Ready to explore?</p>
                    <p className="text-white/40 text-sm">Start searching to discover incredible startups!</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Custom styles */}
      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          33% { transform: translateY(-30px) rotate(1deg); }
          66% { transform: translateY(-20px) rotate(-1deg); }
        }
        
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        
        @keyframes slide-in {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
        
        .animate-float-delay {
          animation: float 8s ease-in-out infinite 2s;
        }
        
        .animate-float-slow {
          animation: float 10s ease-in-out infinite 4s;
        }
        
        .animate-spin-slow {
          animation: spin-slow 8s linear infinite;
        }
        
        .animate-slide-in {
          animation: slide-in 0.6s ease-out;
        }
        
        .animate-delay-300 {
          animation-delay: 300ms;
        }
        
        .animate-delay-500 {
          animation-delay: 500ms;
        }
        
        .line-clamp-3 {
          overflow: hidden;
          display: -webkit-box;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 3;
        }
        
        /* Custom scrollbar */
        ::-webkit-scrollbar {
          width: 8px;
        }
        
        ::-webkit-scrollbar-track {
          background: rgba(255, 255, 255, 0.05);
          border-radius: 4px;
        }
        
        ::-webkit-scrollbar-thumb {
          background: rgba(20, 184, 166, 0.3);
          border-radius: 4px;
        }
        
        ::-webkit-scrollbar-thumb:hover {
          background: rgba(20, 184, 166, 0.5);
        }
      `}</style>
    </div>
  );
};

export default Dashboard;