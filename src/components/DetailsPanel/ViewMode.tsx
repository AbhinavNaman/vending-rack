import React from "react";
import type { Bin } from "../../types";
import { computeStatus, pctLevel } from "../../utils/status";

interface Props {
  bin: Bin;
  onEdit: () => void;
}

export default function ViewMode({ bin, onEdit }: Props) {
  const status = computeStatus(bin.stock, bin.capacity);
  const pct = pctLevel(bin.stock, bin.capacity);

  return (
    <div>
      <div className="flex justify-center mb-4">
        {bin.photoUrl ? (
          <img src={bin.photoUrl} alt={bin.skuName} className="h-28" />
        ) : (
          <div className="w-28 h-28 bg-gray-700 rounded" />
        )}
      </div>

      <dl className="space-y-2 text-sm">
        <Info label="SKU Name" value={bin.skuName || "Unassigned"} />
        <Info label="SKU Code" value={bin.skuCode || "-"} />
        <Info label="Stock" value={`${bin.stock}`} />
        <Info label="Capacity" value={`${bin.capacity}`} />
        <Info label="UoM" value={bin.uom || "-"} />
        <Info label="Min Pack" value={bin.minPack?.toString() || "-"} />
        <Info label="Sensor" value={bin.sensor || "-"} />
        <Info label="Last Restocked" value={bin.lastRestocked || "-"} />
        <Info label="Next ETA" value={bin.nextEta || "-"} />
        <Info label="Status" value={status} />
        <Info label="% Level" value={`${pct}%`} />
      </dl>

      <button
        onClick={onEdit}
        className="mt-4 w-full bg-green-600 hover:bg-green-500 text-white py-2 rounded"
      >
        Edit
      </button>
    </div>
  );
}

function Info({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between border-b border-gray-800 pb-1">
      <dt className="text-gray-400">{label}</dt>
      <dd className="font-medium">{value}</dd>
    </div>
  );
}
