import { useState } from "react";

interface Startup {
  _id?: string;
  name: string;
  summary?: string;
  tags?: string[];
  website?: string;
}

interface Props {
  onAdd: (startup: Startup) => void;
}

const CreateStartupForm = ({ onAdd }: Props) => {
  const [name, setName] = useState("");
  const [website, setWebsite] = useState("");
  const [budget, setBudget] = useState("");
  const [location, setLocation] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const payload: Record<string, string> = { name };
    if (website) payload.website = website;
    if (budget) payload.budget = budget;
    if (location) payload.location = location;

    try {
      const res = await fetch("/api/startups", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const created = await res.json();
      onAdd(created);
      setName("");
      setWebsite("");
      setBudget("");
      setLocation("");
    } catch (err) {
      console.error("Failed to create startup", err);
    }
  };

  return (
    <form className="space-y-2" onSubmit={handleSubmit}>
      <input
        className="border p-2 w-full"
        placeholder="Business Idea"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />
      <input
        className="border p-2 w-full"
        placeholder="Website (optional)"
        value={website}
        onChange={(e) => setWebsite(e.target.value)}
      />
      <input
        className="border p-2 w-full"
        placeholder="Budget (optional)"
        value={budget}
        onChange={(e) => setBudget(e.target.value)}
      />
      <input
        className="border p-2 w-full"
        placeholder="Location (optional)"
        value={location}
        onChange={(e) => setLocation(e.target.value)}
      />
      <button className="bg-blue-500 text-white px-4 py-2" type="submit">
        Create Startup
      </button>
    </form>
  );
};

export default CreateStartupForm;
