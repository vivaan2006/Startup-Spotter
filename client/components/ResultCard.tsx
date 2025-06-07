import React from 'react';

interface ResultCardProps {
  name: string;
  summary: string;
  tags: string[];
  website: string;
}

const ResultCard: React.FC<ResultCardProps> = ({
  name,
  summary,
  tags,
  website,
}) => {
  return (
    <div className="p-6 rounded-2xl shadow-md bg-tan text-slate space-y-3">
      <h2 className="text-2xl font-semibold text-teal">{name}</h2>
      <p className="text-slate leading-relaxed">{summary}</p>
      <p className="text-sm text-slate/70">Tags: {tags.join(', ')}</p>
      <a
        href={website}
        target="_blank"
        rel="noreferrer"
        className="inline-block mt-2 px-4 py-2 rounded-lg font-medium bg-teal text-white hover:bg-teal/90 transition"
      >
        Visit Website
      </a>
    </div>
  );
};

export default ResultCard;
