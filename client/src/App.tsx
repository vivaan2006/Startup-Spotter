import { useEffect, useState } from "react";

type Startup = {
  _id?: string;
  name: string;
  website?: string;
  tags?: string[];
  summary?: string;
  source?: string;
};

function App() {
  const [startups, setStartups] = useState<Startup[]>([]);
  const [formData, setFormData] = useState<Startup>({
    name: "",
    website: "",
    tags: [],
    summary: "",
    source: "manual",
  });

  useEffect(() => {
    fetch("http://localhost:5000/api/startups")
      .then((res) => res.json())
      .then((data) => setStartups(data))
      .catch((err) => console.error("Failed to fetch startups:", err));
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:5000/api/startups", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const newStartup = await res.json();
      setStartups((prev) => [...prev, newStartup]);
      setFormData({
        name: "",
        website: "",
        tags: [],
        summary: "",
        source: "manual",
      });
    } catch (err) {
      console.error("Failed to add startup:", err);
    }
  };

  return (
    <div style={{ padding: "2rem" }}>
      <h1>Startup Spotter 🚀</h1>

      <form onSubmit={handleSubmit} style={{ marginBottom: "2rem" }}>
        <input
          placeholder="Name"
          value={formData.name}
          onChange={(e) =>
            setFormData({ ...formData, name: e.target.value })
          }
          required
        />
        <input
          placeholder="Website"
          value={formData.website}
          onChange={(e) =>
            setFormData({ ...formData, website: e.target.value })
          }
        />
        <input
          placeholder="Tags (comma separated)"
          value={formData.tags?.join(", ")}
          onChange={(e) =>
            setFormData({
              ...formData,
              tags: e.target.value.split(",").map((tag) => tag.trim()),
            })
          }
        />
        <textarea
          placeholder="Summary"
          value={formData.summary}
          onChange={(e) =>
            setFormData({ ...formData, summary: e.target.value })
          }
        />
        <button type="submit">Add Startup</button>
      </form>

      {startups.map((startup) => (
        <div key={startup._id} style={{ marginBottom: "1.5rem" }}>
          <strong>{startup.name}</strong>
          {startup.website && (
            <div>
              <a href={startup.website} target="_blank" rel="noreferrer">
                {startup.website}
              </a>
            </div>
          )}
          {startup.summary && <p>{startup.summary}</p>}
          {startup.tags && <p>Tags: {startup.tags.join(", ")}</p>}
        </div>
      ))}
    </div>
  );
}

export default App;
