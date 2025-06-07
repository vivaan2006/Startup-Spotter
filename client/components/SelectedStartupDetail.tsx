import React from "react";

interface Props {
  name: string;
  summary: string;
  tags: string[];
  website: string;
}

const SelectedStartupDetail = ({ name, summary, tags, website }: Props) => {
  return (
    <div className="bg-[#024950] text-[#AFDDE5] p-8 rounded-2xl shadow-xl max-w-3xl w-full">
      <h2 className="text-3xl font-bold mb-3">{name}</h2>
      <p className="mb-6 leading-relaxed">{summary}</p>
      <div className="flex flex-wrap gap-2 mb-6">
        {tags.map((tag, idx) => (
          <span key={idx} className="bg-[#0FA4AF] text-white text-xs font-semibold px-3 py-1 rounded-full">
            {tag}
          </span>
        ))}
      </div>
      <a
        href={website}
        target="_blank"
        rel="noreferrer"
        className="inline-block bg-[#0FA4AF] text-white px-6 py-3 rounded-lg hover:bg-cyan-400 transition"
      >
        Visit Website
      </a>
    </div>
  );
};

export default SelectedStartupDetail;
