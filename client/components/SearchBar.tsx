import React, { useState } from 'react';
import { Search } from 'lucide-react';

interface SearchBarProps {
  placeholder?: string;
  onSearch?: (query: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({
  placeholder = 'Search startups…',
  onSearch,
}) => {
  const [query, setQuery] = useState('');

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && onSearch) {
      onSearch(query.trim());
    }
  };

  return (
    <div className="w-full max-w-xl mx-auto mb-6">
      <div className="flex items-center bg-peach border border-tan rounded-2xl shadow-sm px-4 py-2 focus-within:ring-2 focus-within:ring-teal transition">
        <Search className="w-5 h-5 text-slate/70 mr-2" />
        <input
          type="text"
          value={query}
          onChange={e => setQuery(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          className="flex-1 bg-transparent focus:outline-none text-slate placeholder-slate/70"
        />
      </div>
    </div>
  );
};

export default SearchBar;