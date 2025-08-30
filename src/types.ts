// src/types.ts

export type Status = "Full" | "Half" | "Low" | "Empty";

export interface Bin {
  binId: string;          // e.g. R1C1
  row: number;            // grid row (1..4)
  col: number;            // grid col (1..5)
  skuName?: string;       // e.g. "Chips"
  skuCode?: string;       // e.g. "CHP-01"
  photoUrl?: string;      // image URL
  stock: number;          // current stock
  capacity: number;       // max capacity
  threshold?: number;     // optional reorder threshold
  uom?: string;           // unit of measure (pcs, bottles, etc.)
  minPack?: number;       // minimum pack quantity
  sensor?: string;        // e.g. "IR", "Scale", "RFID"
  lastRestocked?: string; // ISO date string
  nextEta?: string;       // ISO date string (next refill ETA)
}

export interface Rack {
  rackId: string;        // Rack identifier
  location?: string;     // e.g. "Floor 1 - Lobby"
  bins: Bin[];
}
