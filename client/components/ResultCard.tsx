interface ResultCardProps {
  name: string;
  summary: string;
  tags: string[];
  website: string;
}

const ResultCard = ({ name, summary, tags, website }: ResultCardProps) => {
  return (
    <div className="p-4 border rounded shadow bg-white space-y-2">
      <h2 className="text-xl font-semibold">{name}</h2>
      <p className="text-gray-700">{summary}</p>
      <p className="text-sm text-gray-500">Tags: {tags.join(", ")}</p>
      <a href={website} target="_blank" rel="noreferrer" className="text-blue-500 underline">
        Visit Website
      </a>
    </div>
  );
};

export default ResultCard;
