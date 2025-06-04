// main dashboard with search + result cards.
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

useEffect(() => {
  fetch("/api/startups")
    .then((res) => {
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      return res.json();
    })
    .then((data) => setStartups(data))
    .catch((err) => console.error("❌ Failed to fetch startups:", err));
}, []);

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-4">Startup Spotter 🚀</h1>
      {startups.length === 0 ? (
        <p className="text-gray-500">No startups yet.</p>
      ) : (
        <div className="space-y-4">
          {startups.map((startup) => (
            <ResultCard
              key={startup._id}
              name={startup.name}
              summary={startup.summary}
              tags={startup.tags}
              website={startup.website}
            />
          ))}
        </div>
      )}
      <SearchBar />
    </div>
  );
};

export default Dashboard;
