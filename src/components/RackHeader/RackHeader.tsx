import type { Rack } from "../../types";
import { rackUtilization, statusCounts } from "../../utils/status";

interface Props {
  rack: Rack;
}

export default function RackHeader({ rack }: Props) {
  const util = rackUtilization(rack);
  const counts = statusCounts(rack);

  function exportRack() {
    const blob = new Blob([JSON.stringify(rack, null, 2)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${rack.rackId}.json`;
    a.click();
    URL.revokeObjectURL(url);
  }

  return (
    <div className="bg-black/40 rounded-xl p-4 mb-4 flex flex-col md:flex-row md:items-center md:justify-between">
      <div>
        <h2 className="text-xl font-semibold">
          Rack <span className="text-green-400">{rack.rackId}</span>
        </h2>
        {rack.location && (
          <p className="text-sm text-gray-400">Location: {rack.location}</p>
        )}
      </div>

      <div className="flex gap-4 mt-3 md:mt-0 items-center">
        <span className="text-gray-300">Utilization: {util}%</span>
        <div className="flex gap-2">
          <StatusBadge label="Full" value={counts.Full} color="bg-green-500" />
          <StatusBadge label="Half" value={counts.Half} color="bg-blue-500" />
          <StatusBadge label="Low" value={counts.Low} color="bg-amber-500" />
          <StatusBadge label="Empty" value={counts.Empty} color="bg-gray-500" />
        </div>
        <button
          onClick={exportRack}
          className="ml-4 px-3 py-1 bg-gray-700 hover:bg-gray-600 text-white rounded text-sm"
        >
          Export JSON
        </button>
      </div>
    </div>
  );
}

function StatusBadge({
  label,
  value,
  color,
}: {
  label: string;
  value: number;
  color: string;
}) {
  return (
    <span
      className={`px-2 py-1 text-xs rounded-full ${color} text-white font-medium`}
    >
      {label}: {value}
    </span>
  );
}
