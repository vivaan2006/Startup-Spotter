import { useEffect, useState } from "react";

const API_BASE_URL = import.meta.env.VITE_API_URL;

// Proper TypeScript interfaces
interface SearchBarProps {
  placeholder?: string;
  onSearch?: (value: string) => void;
  value?: string;
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

interface TrendingOpportunity {
  title: string;
  growth: number;
  category: string;
  description: string;
  potential: 'High' | 'Medium' | 'Low';
}

interface MarketInsight {
  metric: string;
  value: string;
  change: number;
  icon: string;
}

// Built-in SearchBar Component with proper types
const SearchBar: React.FC<SearchBarProps> = ({ placeholder = "Search...", onSearch, value = "" }) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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

  const [agentResponse, setAgentResponse] = useState<string>("");
  const [sessionId, setSessionId] = useState<string | null>(null);

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [pastQueries, setPastQueries] = useState<string[]>([]);
  
  const [searchInput, setSearchInput] = useState<string>("");  // for prompt
  const [filterInput, setFilterInput] = useState<string>("");  // for filtering

  // New state for right panel
  const [activeTab, setActiveTab] = useState<'insights' | 'trends' | 'analytics'>('insights');
  const [marketInsights, setMarketInsights] = useState<MarketInsight[]>([]);
  const [trendingOpportunities, setTrendingOpportunities] = useState<TrendingOpportunity[]>([]);

  useEffect(() => {
    // Simulate loading animation
    setTimeout(() => setIsLoaded(true), 500);
    
    // Initialize market insights
    setMarketInsights([
      { metric: "Market Size", value: "$2.3T", change: 12.5, icon: "📈" },
      { metric: "New Startups", value: "1,247", change: 8.2, icon: "🚀" },
      { metric: "Funding Volume", value: "$89.2B", change: -3.1, icon: "💰" },
      { metric: "Success Rate", value: "23.4%", change: 5.7, icon: "🎯" }
    ]);

    // Initialize trending opportunities
    setTrendingOpportunities([
      {
        title: "AI-Powered Healthcare",
        growth: 89.5,
        category: "HealthTech",
        description: "AI diagnostics and personalized medicine solutions",
        potential: "High"
      },
      {
        title: "Sustainable Energy",
        growth: 67.3,
        category: "CleanTech",
        description: "Solar and wind energy optimization platforms",
        potential: "High"
      },
      {
        title: "EdTech Platforms",
        growth: 45.2,
        category: "Education",
        description: "Interactive learning and remote education tools",
        potential: "Medium"
      },
      {
        title: "FinTech Solutions",
        growth: 34.8,
        category: "Finance",
        description: "Digital banking and cryptocurrency services",
        potential: "Medium"
      }
    ]);
    
    fetch(`${API_BASE_URL}/api/start_session`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ user_id: "vivaan" })
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("✅ Got session:", data);
        setSessionId(data.session_id);
      })
      .catch((err) => console.error("❌ Failed to start session:", err));

  }, []);

const handleAgentRequest = async () => {
  if (!sessionId) return alert("❌ No session ID. Try refreshing.");
  if (!searchInput.trim()) return;

  setIsLoading(true);
  setAgentResponse("");

const currentPrompt = searchInput;

  try {
    const res = await fetch(`${API_BASE_URL}/api/run_agent`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        session_id: sessionId,
        user_input: currentPrompt,
      }),
    });

    const data = await res.json();

    setTimeout(() => {
      setAgentResponse(data.response);
      setPastQueries((prev) => [currentPrompt, ...prev]); // Push latest to top
      setSearchInput("");
      setIsLoading(false);
    }, 1800);
  } catch (err) {
    console.error("❌ Agent error:", err);
    alert("Failed to reach agent.");
    setIsLoading(false);
  }
};

const filtered = startups.filter((s) =>
  s.name.toLowerCase().includes(filterInput.toLowerCase()) ||
  s.tags.some((tag) => tag.toLowerCase().includes(filterInput.toLowerCase()))
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
<SearchBar
  placeholder="✨ Describe your startup idea and watch the magic unfold..."
  value={searchInput}
  onSearch={setSearchInput}
/>

{isLoading ? (
  <div className="flex flex-col items-center justify-center mt-6 space-y-4">
    <div className="w-12 h-12 border-4 border-teal-400 border-t-transparent rounded-full animate-spin"></div>
    <p className="text-white/70 text-sm">Analyzing your idea… hang tight ✨</p>
  </div>
) : (
  agentResponse && (
    <div className="bg-white/10 text-white p-6 rounded-xl border border-teal-500/20 shadow-md mt-6">
      <h4 className="text-lg font-bold mb-2 text-teal-300">📬 Agent Response</h4>
      <p className="whitespace-pre-line leading-relaxed text-white/80">{agentResponse}</p>
    </div>
  )
)}

                {/* Action Buttons */}
<div className="flex justify-center">
  <button
    onClick={handleAgentRequest}
    className="px-8 py-4 bg-gradient-to-r from-teal-500 to-teal-600 hover:from-teal-400 hover:to-teal-500 rounded-2xl font-bold transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-teal-500/25 flex items-center space-x-2"
  >
    <span>🚀</span>
    <span>Enter</span>
  </button>
</div>

              </div>
            </div>
          </div>
        </div>

        {/* Right Panel - Enhanced Analytics Dashboard */}
        <div className={`w-[28rem] flex-shrink-0 p-6 space-y-6 overflow-hidden relative z-20 transition-all duration-1000 delay-500 ${isLoaded ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'}`}>
          <div className="absolute inset-0 bg-gradient-to-b from-white/5 to-transparent backdrop-blur-sm border-l border-white/10"></div>
          
          <div className="relative z-10 space-y-6">
            {/* Tab Navigation */}
            <div className="flex space-x-2 bg-white/5 rounded-2xl p-2 border border-white/10">
              {[
                { id: 'insights', label: 'Insights', icon: '📊' },
                { id: 'trends', label: 'Trends', icon: '📈' },
                { id: 'analytics', label: 'Analytics', icon: '🎯' }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`flex-1 flex items-center justify-center space-x-2 py-3 px-4 rounded-xl font-medium transition-all duration-300 ${
                    activeTab === tab.id
                      ? 'bg-gradient-to-r from-teal-500 to-blue-500 text-white shadow-lg'
                      : 'text-white/60 hover:text-white hover:bg-white/10'
                  }`}
                >
                  <span>{tab.icon}</span>
                  <span className="text-sm">{tab.label}</span>
                </button>
              ))}
            </div>

            {/* Market Insights Tab */}
            {activeTab === 'insights' && (
              <div className="space-y-4 animate-slide-in">
                <h3 className="text-xl font-bold text-white flex items-center space-x-2">
                  <span>📊</span>
                  <span>Market Insights</span>
                </h3>
                
                {marketInsights.map((insight, index) => (
                  <div
                    key={index}
                    className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-4 hover:bg-white/10 transition-all duration-300 group"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center space-x-2">
                        <span className="text-lg">{insight.icon}</span>
                        <span className="text-white/70 text-sm font-medium">{insight.metric}</span>
                      </div>
                      <div className={`text-xs px-2 py-1 rounded-full ${
                        insight.change > 0
                          ? 'bg-green-500/20 text-green-300'
                          : 'bg-red-500/20 text-red-300'
                      }`}>
                        {insight.change > 0 ? '+' : ''}{insight.change}%
                      </div>
                    </div>
                    <div className="text-2xl font-bold text-white">{insight.value}</div>
                  </div>
                ))}

                {/* Quick Actions */}
                <div className="bg-gradient-to-br from-purple-500/20 to-pink-500/20 border border-purple-500/30 rounded-2xl p-4">
                  <h4 className="text-white font-semibold mb-3 flex items-center space-x-2">
                    <span>⚡</span>
                    <span>Quick Actions</span>
                  </h4>
                  <div className="space-y-2">
                    <button className="w-full text-left bg-white/10 hover:bg-white/20 rounded-xl p-3 text-sm text-white/80 transition-all duration-300 hover:scale-105">
                      🔍 Analyze Market Opportunity
                    </button>
                    <button className="w-full text-left bg-white/10 hover:bg-white/20 rounded-xl p-3 text-sm text-white/80 transition-all duration-300 hover:scale-105">
                      💡 Generate Business Ideas
                    </button>
                    <button className="w-full text-left bg-white/10 hover:bg-white/20 rounded-xl p-3 text-sm text-white/80 transition-all duration-300 hover:scale-105">
                      🎯 Find Target Audience
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Trending Opportunities Tab */}
            {activeTab === 'trends' && (
              <div className="space-y-4 animate-slide-in">
                <h3 className="text-xl font-bold text-white flex items-center space-x-2">
                  <span>📈</span>
                  <span>Hot Opportunities</span>
                </h3>
                
                {trendingOpportunities.map((opportunity, index) => (
                  <div
                    key={index}
                    className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-4 hover:bg-white/10 transition-all duration-500 hover:scale-[1.02] group cursor-pointer"
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h4 className="text-white font-semibold text-sm">{opportunity.title}</h4>
                        <span className="text-xs text-teal-300 bg-teal-500/20 px-2 py-1 rounded-full mt-1 inline-block">
                          {opportunity.category}
                        </span>
                      </div>
                      <div className={`text-xs px-2 py-1 rounded-full ${
                        opportunity.potential === 'High' ? 'bg-green-500/20 text-green-300' :
                        opportunity.potential === 'Medium' ? 'bg-yellow-500/20 text-yellow-300' :
                        'bg-gray-500/20 text-gray-300'
                      }`}>
                        {opportunity.potential}
                      </div>
                    </div>
                    
                    <p className="text-white/60 text-xs mb-3 leading-relaxed">
                      {opportunity.description}
                    </p>
                    
                    <div className="flex items-center justify-between">
                      <span className="text-white/50 text-xs">Growth Rate</span>
                      <div className="flex items-center space-x-2">
                        <div className="w-16 h-2 bg-white/10 rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-gradient-to-r from-teal-400 to-blue-400 rounded-full transition-all duration-1000"
                            style={{ width: `${Math.min(opportunity.growth, 100)}%` }}
                          ></div>
                        </div>
                        <span className="text-teal-300 text-xs font-semibold">+{opportunity.growth}%</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Analytics Tab */}
            {activeTab === 'analytics' && (
              <div className="space-y-4 animate-slide-in">
                <h3 className="text-xl font-bold text-white flex items-center space-x-2">
                  <span>🎯</span>
                  <span>Success Analytics</span>
                </h3>
                
                {/* Success Rate Visualization */}
                <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-4">
                  <h4 className="text-white font-semibold mb-4 flex items-center space-x-2">
                    <span>📊</span>
                    <span>Startup Success by Category</span>
                  </h4>
                  
                  <div className="space-y-3">
                    {[
                      { category: 'AI/ML', success: 78, color: 'from-purple-400 to-purple-600' },
                      { category: 'FinTech', success: 65, color: 'from-green-400 to-green-600' },
                      { category: 'HealthTech', success: 71, color: 'from-blue-400 to-blue-600' },
                      { category: 'EdTech', success: 58, color: 'from-yellow-400 to-yellow-600' },
                      { category: 'E-commerce', success: 45, color: 'from-red-400 to-red-600' }
                    ].map((item, index) => (
                      <div key={index} className="flex items-center justify-between">
                        <span className="text-white/70 text-sm w-20">{item.category}</span>
                        <div className="flex-1 mx-3">
                          <div className="w-full h-3 bg-white/10 rounded-full overflow-hidden">
                            <div 
                              className={`h-full bg-gradient-to-r ${item.color} rounded-full transition-all duration-1000`}
                              style={{ width: `${item.success}%` }}
                            ></div>
                          </div>
                        </div>
                        <span className="text-white text-sm font-semibold w-12 text-right">{item.success}%</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Live Stats */}
                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-gradient-to-br from-teal-500/20 to-cyan-500/20 border border-teal-500/30 rounded-xl p-3 text-center">
                    <div className="text-2xl font-bold text-white">2.4M</div>
                    <div className="text-xs text-teal-200">Active Users</div>
                  </div>
                  <div className="bg-gradient-to-br from-purple-500/20 to-pink-500/20 border border-purple-500/30 rounded-xl p-3 text-center">
                    <div className="text-2xl font-bold text-white">847</div>
                    <div className="text-xs text-purple-200">Ideas Generated</div>
                  </div>
                  <div className="bg-gradient-to-br from-green-500/20 to-emerald-500/20 border border-green-500/30 rounded-xl p-3 text-center">
                    <div className="text-2xl font-bold text-white">156</div>
                    <div className="text-xs text-green-200">Launched Today</div>
                  </div>
                  <div className="bg-gradient-to-br from-orange-500/20 to-red-500/20 border border-orange-500/30 rounded-xl p-3 text-center">
                    <div className="text-2xl font-bold text-white">92%</div>
                    <div className="text-xs text-orange-200">Satisfaction</div>
                  </div>
                </div>

                {/* Performance Metrics */}
                <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-4">
                  <h4 className="text-white font-semibold mb-3 flex items-center space-x-2">
                    <span>⚡</span>
                    <span>Real-time Performance</span>
                  </h4>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-white/70">Response Time</span>
                      <span className="text-green-300">1.2s</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-white/70">AI Accuracy</span>
                      <span className="text-blue-300">94.7%</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-white/70">Database Coverage</span>
                      <span className="text-purple-300">2.8M+ Companies</span>
                    </div>
                  </div>
                </div>
              </div>
            )}
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