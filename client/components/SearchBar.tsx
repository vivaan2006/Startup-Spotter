import React, { useState } from "react";
import { Search } from "lucide-react";

interface SearchBarProps {
  placeholder?: string;
  onSearch?: (query: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ placeholder = "Search startups...", onSearch }) => {
  const [query, setQuery] = useState("");

  const handleKeyDown = async (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && onSearch) {
      onSearch(query);
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto mb-6">
      <div className="flex items-center bg-[#024950] border border-[#0FA4AF] rounded-full px-4 py-2 shadow-sm">
        <Search className="text-cyan-300 w-5 h-5 mr-2" />
        <input
          type="text"
          className="bg-transparent flex-1 text-[#AFDDE5] placeholder-cyan-300 text-sm focus:outline-none"
          placeholder={placeholder}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={handleKeyDown}
        />
      </div>
    </div>
  );
};

export default SearchBar;
