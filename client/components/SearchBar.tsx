import React, { useState } from "react";
import { Search } from "lucide-react";

interface SearchBarProps {
  placeholder?: string;
  onSearch?: (query: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({
  placeholder = "Search startups...",
  onSearch,
}) => {
  const [query, setQuery] = useState("");

  const handleKeyDown = async (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && onSearch) {
      onSearch(query);
    }
  };

  return (
    <div className="relative w-full">
      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#AFDDE5] opacity-60" size={18} />
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder={placeholder}
        className="w-full pl-10 pr-4 py-2 rounded-lg border border-[#0FA4AF] bg-[#003135] text-[#AFDDE5] placeholder-[#AFDDE5]/50 focus:outline-none focus:ring-2 focus:ring-[#0FA4AF] transition-all"
      />
    </div>
  );
};

export default SearchBar;
