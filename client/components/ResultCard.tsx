import React from "react";

interface ResultCardProps {
  name: string;
  summary?: string;
  tags?: string[];
  website: string;
}

const ResultCard: React.FC<ResultCardProps> = ({ name, summary, tags = [], website }) => {
  return (
    <div className="p-4 rounded-xl shadow-md bg-[#1a1a1a] hover:shadow-lg transition-all border border-[#024950]/30">
      <h2 className="text-lg font-semibold text-[#AFDDE5]">{name}</h2>
      {summary && <p className="text-sm text-gray-400 mt-1">{summary}</p>}
      {tags.length > 0 && (
        <p className="text-xs text-[#0FA4AF] mt-1">Tags: {tags.join(", ")}</p>
      )}
      <a
        href={website}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-block mt-2 text-[#AFDDE5] text-sm underline hover:text-[#0FA4AF] transition"
      >
        Visit Website
      </a>
    </div>
  );
};

export default ResultCard;
