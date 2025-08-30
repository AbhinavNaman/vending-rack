import type { Status } from "../../types";

interface Props {
  query: string;
  setQuery: (q: string) => void;
  statusFilter: Status | "All";
  setStatusFilter: (s: Status | "All") => void;
}

const statuses: (Status | "All")[] = ["All", "Full", "Half", "Low", "Empty"];

export default function FiltersBar({
  query,
  setQuery,
  statusFilter,
  setStatusFilter,
}: Props) {
  return (
    <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-4 gap-3">
      {/* Search box */}
      <input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search by name or code..."
        className="px-3 py-2 rounded-lg bg-black/30 border border-gray-700 text-white w-full md:w-72"
      />

      {/* Status filters */}
      <div className="flex gap-2 flex-wrap">
        {statuses.map((s) => (
          <button
            key={s}
            onClick={() => setStatusFilter(s)}
            className={`px-3 py-1 rounded-full text-sm ${
              statusFilter === s
                ? "bg-green-600 text-white"
                : "bg-gray-700 text-gray-200"
            }`}
          >
            {s}
          </button>
        ))}
      </div>
    </div>
  );
}
