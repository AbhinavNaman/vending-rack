import React, { useState, useEffect, useRef } from "react";
import type { Bin } from "../../types";
import BinCard from "./BinCard";

interface Props {
  bins: Bin[];
  onOpen: (binId: string) => void;
}

export default function BinGrid({ bins, onOpen }: Props) {
  const [focusedIndex, setFocusedIndex] = useState(0);
  const refs = useRef<(HTMLDivElement | null)[]>([]);

  // slots (always 20 positions: 4×5)
  const slots: (Bin | null)[] = Array.from({ length: 20 }, (_, i) => {
    const row = Math.floor(i / 5) + 1;
    const col = (i % 5) + 1;
    return bins.find((b) => b.row === row && b.col === col) || null;
  });

  // auto-focus when focusedIndex changes
  useEffect(() => {
    refs.current[focusedIndex]?.focus();
  }, [focusedIndex]);

  function handleKeyDown(e: React.KeyboardEvent, bin: Bin | null) {
    if (e.key === "ArrowRight") {
      e.preventDefault();
      setFocusedIndex((i) => Math.min(19, i + 1));
    }
    if (e.key === "ArrowLeft") {
      e.preventDefault();
      setFocusedIndex((i) => Math.max(0, i - 1));
    }
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setFocusedIndex((i) => Math.min(19, i + 5));
    }
    if (e.key === "ArrowUp") {
      e.preventDefault();
      setFocusedIndex((i) => Math.max(0, i - 5));
    }
    if ((e.key === "Enter" || e.key === " ") && bin) {
      e.preventDefault();
      onOpen(bin.binId);
    }
  }

  return (
    <div
      role="grid"
      aria-label="Vending machine grid"
      className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-5 gap-3"
    >
      {slots.map((bin, idx) =>
        bin ? (
          <div
            key={bin.binId}
            role="gridcell"
            aria-label={`Bin ${bin.binId}, ${bin.skuName || "unassigned"}`}
            tabIndex={idx === focusedIndex ? 0 : -1}
            ref={(el) => {(refs.current[idx] = el)}}
            onKeyDown={(e) => handleKeyDown(e, bin)}
          >
            <BinCard bin={bin} onClick={() => onOpen(bin.binId)} />
          </div>
        ) : (
          <div
            key={idx}
            role="gridcell"
            aria-label={`Empty slot at row ${Math.floor(idx / 5) + 1}, col ${
              (idx % 5) + 1
            }`}
            tabIndex={idx === focusedIndex ? 0 : -1}
            ref={(el) => {(refs.current[idx] = el)}}
            onKeyDown={(e) => handleKeyDown(e, null)}
            className="glass-card rounded-lg p-3 flex items-center justify-center text-gray-500 text-sm"
          >
            Unassigned
          </div>
        )
      )}
    </div>
  );
}
