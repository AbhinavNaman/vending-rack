import type { Bin } from "../../types";
import { computeStatus, pctLevel } from "../../utils/status";

interface Props {
  bin: Bin;
  onClick: () => void;
}

export default function BinCard({ bin, onClick }: Props) {
  const status = computeStatus(bin.stock, bin.capacity);
  const pct = pctLevel(bin.stock, bin.capacity);

  const statusColors: Record<string, string> = {
    Full: "bg-green-500",
    Half: "bg-blue-500",
    Low: "bg-amber-500",
    Empty: "bg-gray-500",
  };

  return (
    <div
      role="gridcell"
      tabIndex={0}
      onClick={onClick}
      title={`SKU: ${bin.skuCode || "-"} | Threshold: ${
        bin.threshold ?? "-"
      } | Last restocked: ${bin.lastRestocked || "-"}`}
      className="glass-card relative rounded-lg p-3 flex flex-col justify-between cursor-pointer 
                 hover:ring-2 hover:ring-green-500 focus:outline-none focus:ring-2 focus:ring-green-400 
                 transition-all duration-200"
    >
      {/* Bin label */}
      <span className="absolute top-1 left-2 text-xs text-gray-400 font-mono">
        {bin.binId}
      </span>

      {/* Thumbnail */}
      <div className="flex justify-center items-center h-12">
        {bin.photoUrl ? (
          <img src={bin.photoUrl} alt={bin.skuName} className="h-12" />
        ) : (
          <div className="w-10 h-10 rounded bg-gray-700" />
        )}
      </div>

      {/* Info */}
      <div className="mt-2">
        <p className="font-semibold text-sm text-white truncate">
          {bin.skuName || "Unassigned"}
        </p>
        <p className="text-xs text-gray-400">
          {bin.stock} / {bin.capacity}
        </p>

        {/* Progress bar */}
        <div className="w-full bg-gray-800 rounded-full h-2 mt-1">
          <div
            className={`h-2 rounded-full ${statusColors[status]} transition-all duration-300`}
            style={{ width: `${pct}%` }}
          />
        </div>
      </div>

      {/* Status chip */}
      <span
        className={`absolute top-1 right-2 text-[10px] px-2 py-0.5 rounded-full text-white ${statusColors[status]}`}
      >
        {status}
      </span>
    </div>
  );
}
