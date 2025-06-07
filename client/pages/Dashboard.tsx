// import React, { useEffect, useState } from 'react';
// import ResultCard from '../components/ResultCard';
// import SearchBar from '../components/SearchBar';

// interface Startup {
//   _id: string;
//   name: string;
//   summary: string;
//   tags: string[];
//   website: string;
// }

// export default function Dashboard() {
//   const [startups, setStartups] = useState<Startup[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);
//   const [search, setSearch] = useState('');

//   useEffect(() => {
//     fetch('/api/startups')
//       .then(res => {
//         if (!res.ok) throw new Error(`HTTP ${res.status}`);
//         return res.json() as Promise<Startup[]>;
//       })
//       .then(setStartups)
//       .catch(err => setError(err.message))
//       .finally(() => setLoading(false));
//   }, []);

//   const filtered = startups.filter(s =>
//     s.name.toLowerCase().includes(search.toLowerCase()) ||
//     s.tags.some(t => t.toLowerCase().includes(search.toLowerCase()))
//   );

//   return (
//     <div className="bg-mint min-h-screen font-sans">
//       <div className="max-w-4xl mx-auto p-6">
//         <h1 className="text-4xl font-bold text-slate mb-6 flex items-center">
//           <span className="text-peach">Startup</span> Spotter<span className="ml-2">🚀</span>
//         </h1>

//         <SearchBar
//           placeholder="Search startups..."
//           onSearch={q => setSearch(q)}
//         />

//         <div className="space-y-6">
//           {loading && <p className="text-slate">Loading startups…</p>}
//           {error && <p className="text-peach">Error: {error}</p>}
//           {!loading && !filtered.length && (
//             <p className="text-slate">No startups match your search.</p>
//           )}
//           {filtered.map(s => (
//             <ResultCard
//               key={s._id}
//               name={s.name}
//               summary={s.summary}
//               tags={s.tags}
//               website={s.website}
//             />
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// }
import { useEffect, useState } from "react";
import ResultCard from "../components/ResultCard";
import SearchBar from "../components/SearchBar";

interface Startup {
  _id: string;
  name: string;
  summary: string;
  tags: string[];
  website: string;
}

const Dashboard = () => {
  const [startups, setStartups] = useState<Startup[]>([]);
  const [selected, setSelected] = useState<Startup | null>(null);

  useEffect(() => {
    fetch("/api/startups")
      .then((res) => res.json())
      .then(setStartups)
      .catch((err) => console.error("❌ Failed to fetch startups:", err));
  }, []);

  return (
    <div className="flex h-screen bg-[#1B1B1B] text-[#D1E8E2] font-sans">
      {/* Sidebar */}
      <aside className="w-96 bg-[#2C3531] border-r border-gray-700 flex flex-col">
        <header className="p-6">
          <h1 className="text-3xl font-bold text-white flex items-center justify-between">
            StartupSpotter <span className="text-2xl">🚀</span>
          </h1>
        </header>

        <div className="px-4 pb-4">
          <SearchBar placeholder="Search startups..." />
        </div>

        <div className="flex-1 overflow-y-auto space-y-4 px-4 pb-6">
          {startups.map((startup) => (
            <button
              key={startup._id}
              onClick={() => setSelected(startup)}
              className={`w-full text-left rounded-xl p-4 bg-[#1B1B1B] text-[#D1E8E2] hover:bg-[#116466]/20 transition shadow ${
                selected?._id === startup._id ? "ring-2 ring-[#116466]" : ""
              }`}
            >
              <h2 className="text-lg font-semibold">{startup.name}</h2>
              <p className="text-sm text-[#D1E8E2]/80">{startup.tags.join(", ")}</p>
              <a
                href={startup.website}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#FFCB9A] text-sm mt-1 inline-block hover:underline"
              >
                Visit Website
              </a>
            </button>
          ))}
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex items-center justify-center px-12">
        {selected ? (
          <div className="max-w-2xl bg-[#2C3531] text-[#D1E8E2] p-8 rounded-xl shadow-lg space-y-4">
            <h2 className="text-3xl font-bold">{selected.name}</h2>
            <p className="text-base">{selected.summary || "No description available."}</p>
            <p className="text-sm text-[#FFCB9A]">Tags: {selected.tags.join(", ")}</p>
            <a
              href={selected.website}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block mt-4 bg-[#116466] text-white px-6 py-2 rounded-lg hover:bg-[#0e4e4e] transition"
            >
              Visit Website
            </a>
          </div>
        ) : (
          <div className="text-center">
            <h2 className="text-3xl font-bold mb-2">🚀 Discover Microbusiness Ideas</h2>
            <p className="text-[#FFCB9A] text-lg max-w-xl">
              Select a startup from the sidebar or search for an idea that fits your goals. We’ll help you explore next steps, startup costs, and more.
            </p>
          </div>
        )}
      </main>
    </div>
  );
};

export default Dashboard;
