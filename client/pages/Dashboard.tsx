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
  const [search, setSearch] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch("/api/startups")
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.json();
      })
      .then((data: Startup[]) => {
        setStartups(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("❌ Failed to fetch startups:", err);
        setError("Failed to load startups.");
        setLoading(false);
      });
  }, []);

  const filtered = startups.filter((s) =>
    s.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="flex h-screen font-sans bg-[#121212] text-[#D1E8E2]">
      {/* Sidebar */}
      <aside className="w-96 bg-[#2C3531] text-white p-6 overflow-y-auto">
        <h1 className="text-4xl font-bold mb-6 flex items-center justify-between">
          StartupSpotter <span>🚀</span>
        </h1>

        <SearchBar
          placeholder="Search startups..."
          onSearch={(q: string) => setSearch(q)}
        />

        {loading && <p className="text-[#116466] mt-4">Loading startups...</p>}
        {error && <p className="text-[#FFCB9A] mt-4">Error: {error}</p>}

        <div className="space-y-4 mt-6">
          {filtered.map((s) => (
            <ResultCard
              key={s._id}
              name={s.name}
              summary={s.summary}
              tags={s.tags}
              website={s.website}
            />
          ))}
        </div>
      </aside>

      {/* Right Panel */}
      <main className="flex-1 flex flex-col items-center justify-center text-[#D1E8E2] px-12">
        <h2 className="text-4xl font-bold mb-4">🚀 Discover Microbusiness Ideas</h2>
        <p className="text-lg text-[#FFCB9A] max-w-xl text-center">
          Select a startup from the sidebar or search for an idea that fits your goals. We’ll help you
          explore next steps, startup costs, and more.
        </p>
      </main>
    </div>
  );
};

export default Dashboard;
