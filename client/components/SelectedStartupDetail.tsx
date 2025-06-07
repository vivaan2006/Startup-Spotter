import React from "react";

interface SelectedStartupDetailProps {
  name: string;
  summary: string;
  tags: string[];
  website: string;
}

const SelectedStartupDetail: React.FC<SelectedStartupDetailProps> = ({
  name,
  summary,
  tags,
  website,
}) => {
  return (
    <div className="max-w-2xl bg-[#1a1a1a] p-8 rounded-2xl shadow-lg border border-[#024950]/30 text-[#AFDDE5]">
      <h2 className="text-3xl font-bold text-[#0FA4AF] mb-4">{name}</h2>
      <p className="text-base mb-4 leading-relaxed">{summary}</p>
      <p className="text-sm mb-4 text-[#AFDDE5]/80">Tags: {tags.join(", ")}</p>
      <a
        href={website}
        target="_blank"
        rel="noreferrer"
        className="inline-block px-6 py-3 bg-[#0FA4AF] text-[#003135] font-medium rounded-lg hover:bg-[#AFDDE5] transition"
      >
        Visit Website
      </a>
    </div>
  );
};

export default SelectedStartupDetail;
