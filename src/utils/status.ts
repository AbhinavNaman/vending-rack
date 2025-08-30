// src/utils/status.ts
import type { Status, Rack } from "../types";


//Single place of truth for status calculation. Changing thresholds in one place updates UI everywhere.
export function computeStatus(stock: number, capacity: number): Status {
  if (capacity <= 0 || stock === 0) return "Empty";
  const pct = stock / capacity;
  if (pct >= 0.8) return "Full";
  if (pct >= 0.4) return "Half";
  return "Low";
}

//Used to determine the progress-bar width.
export function pctLevel(stock: number, capacity: number) {
  if (capacity <= 0) return 0;
  return Math.max(0, Math.min(100, Math.round(100 * (stock / capacity))));
}

//Used by RackHeader to show overall utilization.
export function rackUtilization(rack: Rack) {
  const totalStock = rack.bins.reduce((sum, b) => sum + b.stock, 0);
  const totalCap = rack.bins.reduce((sum, b) => sum + Math.max(0, b.capacity), 0);
  if (totalCap === 0) return 0;
  return Math.round((totalStock / totalCap) * 100);
}

//Used by header badges and any reporting
export function statusCounts(rack: Rack) {
  const counts: Record<Status, number> = { Full: 0, Half: 0, Low: 0, Empty: 0 };
  for (const bin of rack.bins) {
    const s = computeStatus(bin.stock, bin.capacity);
    counts[s]++;
  }
  return counts;
}
