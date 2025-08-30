import { useState } from "react";
import type { Rack, Status, Bin } from "./types";
import sampleRack from "./data/sampleRack.json";
import RackHeader from "./components/RackHeader/RackHeader";
import FiltersBar from "./components/FiltersBar/FiltersBar";
import BinGrid from "./components/BinGrid/BinGrid";
import DetailsPanel from "./components/DetailsPanel/DetailsPanel";
import { computeStatus } from "./utils/status";

export default function App() {
  const [rack, setRack] = useState<Rack>(sampleRack);
  const [query, setQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<Status | "All">("All");
  const [selectedBinId, setSelectedBinId] = useState<string | null>(null);

  

  const visibleBins = rack.bins.filter((b) => {
    //1. filter by search query
    const matchQuery =
      query === "" ||
      b.skuName?.toLowerCase().includes(query.toLowerCase()) ||
      b.skuCode?.toLowerCase().includes(query.toLowerCase());

      //2. filter by status
    const matchStatus =
      statusFilter === "All" ||
      computeStatus(b.stock, b.capacity) === statusFilter;
    return matchQuery && matchStatus;
  });

  const selectedBin: Bin | null =
    rack.bins.find((b) => b.binId === selectedBinId) || null;

function handleSave(updated: Bin) {
  setRack((prev) => {
    const exists = prev.bins.find((b) => b.binId === updated.binId);
    let newBins;
    if (exists) {
      newBins = prev.bins.map((b) =>
        b.binId === updated.binId ? updated : b
      );
    } else {
      // in case of swapped partner, update by row/col
      newBins = prev.bins.map((b) =>
        b.row === updated.row && b.col === updated.col ? updated : b
      );
    }
    return { ...prev, bins: newBins };
  });
  setSelectedBinId(null);
}


  return (
    <div className="min-h-screen bg-gradient-to-b from-vmMetal to-black text-white p-6">
      <div className="max-w-6xl mx-auto">
        <RackHeader rack={rack} />
        <FiltersBar
          query={query}
          setQuery={setQuery}
          statusFilter={statusFilter}
          setStatusFilter={setStatusFilter}
        />
        <BinGrid bins={visibleBins} onOpen={(id) => setSelectedBinId(id)} />
      </div>

      <DetailsPanel
        rack={rack}
        bin={selectedBin}
        onSave={handleSave}
        onClose={() => setSelectedBinId(null)}
      />
    </div>
  );
}
