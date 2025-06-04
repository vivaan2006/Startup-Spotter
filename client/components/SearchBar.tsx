import React, { useState } from "react";
import { Search } from "lucide-react"; 

interface SearchBarProps {
    placeholder?: string;
    onSearch?: (query: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ placeholder = "Enter Prompt Here", onSearch}) => {
    const [query, setQuery] = useState("")

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setQuery(e.target.value);
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter" && onSearch) {
        onSearch(query);
        }
    };

    return (
        <div className="w-full max-w-xl mx-auto">
        <div className="flex items-center bg-white border border-gray-300 rounded-2xl shadow-sm px-4 py-2 transition focus-within:border-black focus-within:ring-1 focus-within:ring-black">
            <Search className="w-5 h-5 text-gray-400 mr-2" />
            <input
            type="text"
            value={query}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            placeholder={placeholder}
            className="flex-1 bg-transparent focus:outline-none text-sm placeholder-gray-400"
            />
        </div>
        </div>
    );
};

export default SearchBar;