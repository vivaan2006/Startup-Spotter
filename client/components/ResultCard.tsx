import React from "react";

interface ResultCardProps {
  name: string;
  summary: string;
  tags: string[];
  website: string;
  onClick?: () => void;
  selected?: boolean;
}

const ResultCard = ({ name, summary, tags, website, onClick, selected = false }: ResultCardProps) => {
  return (
    <div
      onClick={onClick}
      className={`cursor-pointer p-5 rounded-2xl border transition-shadow duration-300 ${
        selected
          ? "bg-[#024950] text-white shadow-lg border-[#0FA4AF]"
          : "bg-[#003135] text-[#AFDDE5] border-[#024950] hover:shadow-md hover:border-[#0FA4AF]"
      }`}
    >
      <h2 className="text-xl font-bold">{name}</h2>
      <p className="text-sm mt-2">{summary}</p>
      <div className="mt-3 flex flex-wrap gap-2">
        {tags.map((tag, i) => (
          <span key={i} className="bg-[#0FA4AF] text-white text-xs font-medium px-3 py-1 rounded-full">
            {tag}
          </span>
        ))}
      </div>
      <a
        href={website}
        target="_blank"
        rel="noreferrer"
        className="block mt-4 text-sm underline text-[#AFDDE5] hover:text-cyan-300 transition"
      >
        Visit Website ↗
      </a>
    </div>
  );
};

export default ResultCard;
