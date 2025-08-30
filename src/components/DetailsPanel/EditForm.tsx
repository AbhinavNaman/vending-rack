import React, { useState } from "react";
import type { Bin, Rack } from "../../types";
import { computeStatus, pctLevel } from "../../utils/status";
import { validateBin } from "../../utils/validation";
import { useUnsavedGuard } from "../../hooks/useUnsavedGaurd";

interface Props {
  bin: Bin;
  onSave: (b: Bin) => void;
  onCancel: () => void;
  allBins?: Bin[]; // we need to know other bins to swap with
}

export default function EditForm({ bin, onSave, onCancel, allBins = [] }: Props) {
  const [form, setForm] = useState<Bin>({ ...bin });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [dirty, setDirty] = useState(false);

  useUnsavedGuard(dirty);

  const status = computeStatus(form.stock, form.capacity);
  const pct = pctLevel(form.stock, form.capacity);

  function update<K extends keyof Bin>(key: K, value: Bin[K]) {
    setForm((f) => ({ ...f, [key]: value }));
    setDirty(true);
  }

  function handleSave() {
    const errs = validateBin(form);
    if (Object.keys(errs).length > 0) {
      setErrors(errs as Record<string, string>);
      return;
    }
    onSave(form);
    setDirty(false);
  }

  // Handle swap with another position
  function handlePositionClick(row: number, col: number) {
    // if clicked same position → ignore
    if (row === form.row && col === form.col) return;

    // find the bin currently at that position
    const target = allBins.find((b) => b.row === row && b.col === col);
    if (!target) return; // safety

    // swap positions
    const updatedForm = { ...form, row, col };
    const swappedTarget = { ...target, row: form.row, col: form.col };
    setForm(updatedForm);

    // save both bins back (we'll delegate final save to parent)
    // Strategy: call onSave for edited bin only, parent will update rack
    // but we need to ensure target is also updated
    // We can extend onSave to handle swap OR fire two saves
    onSave(updatedForm);
    onSave(swappedTarget);
    setDirty(false);
  }

  console.log("Editing bin", form.binId, form.row, form.col);


  return (
    <form
      className="space-y-3"
      onSubmit={(e) => {
        e.preventDefault();
        handleSave();
      }}
    >
      {/* Regular form fields */}
      <Field label="SKU Name" error={errors.skuName}>
        <input
          value={form.skuName || ""}
          onChange={(e) => update("skuName", e.target.value)}
          className="w-full bg-gray-800 px-2 py-1 rounded"
        />
      </Field>

      <Field label="SKU Code">
        <input
          value={form.skuCode || ""}
          onChange={(e) => update("skuCode", e.target.value)}
          className="w-full bg-gray-800 px-2 py-1 rounded"
        />
      </Field>

      <Field label="Stock" error={errors.stock}>
        <input
          type="number"
          value={form.stock}
          onChange={(e) => update("stock", Number(e.target.value))}
          className="w-full bg-gray-800 px-2 py-1 rounded"
        />
      </Field>

      <Field label="Capacity" error={errors.capacity}>
        <input
          type="number"
          value={form.capacity}
          onChange={(e) => update("capacity", Number(e.target.value))}
          className="w-full bg-gray-800 px-2 py-1 rounded"
        />
      </Field>

       <Field label="Threshold" error={errors.threshold}>
        <input
          type="number"
          value={form.threshold ?? ""}
          onChange={(e) => update("threshold", Number(e.target.value))}
          className="w-full bg-gray-800 px-2 py-1 rounded"
        />
      </Field>

      <Field label="UoM">
        <input
          value={form.uom || ""}
          onChange={(e) => update("uom", e.target.value)}
          className="w-full bg-gray-800 px-2 py-1 rounded"
        />
      </Field>

      <Field label="Min Pack">
        <input
          type="number"
          value={form.minPack ?? ""}
          onChange={(e) => update("minPack", Number(e.target.value))}
          className="w-full bg-gray-800 px-2 py-1 rounded"
        />
      </Field>

      <Field label="Sensor">
        <select
          value={form.sensor || ""}
          onChange={(e) => update("sensor", e.target.value)}
          className="w-full bg-gray-800 px-2 py-1 rounded"
        >
          <option value="">-</option>
          <option value="IR">IR</option>
          <option value="Scale">Scale</option>
          <option value="RFID">RFID</option>
          <option value="None">None</option>
        </select>
      </Field>

      <Field label="Photo URL">
        <input
          value={form.photoUrl || ""}
          onChange={(e) => update("photoUrl", e.target.value)}
          className="w-full bg-gray-800 px-2 py-1 rounded"
        />
      </Field>

      <div>
        <label className="block text-sm text-gray-400 mb-2">Swap Position</label>
        <div className="grid grid-cols-5 gap-2">
          {Array.from({ length: 20 }, (_, i) => {
            const row = Math.floor(i / 5) + 1;
            const col = (i % 5) + 1;
            const isCurrent = row === form.row && col === form.col;
            return (
              <button
                key={`${row}-${col}`}
                type="button"
                onClick={() => handlePositionClick(row, col)}
                className={`h-12 text-xs rounded flex items-center justify-center
                  ${
                    isCurrent
                      ? "bg-green-600 text-white !important"
                      : "bg-gray-700 text-gray-300 hover:bg-gray-600"
                  }`}
              >
                R{row}C{col}
              </button>
            );
          })}
        </div>
        <p className="text-xs text-gray-400 mt-1">
          Green = current position. Click another button to swap positions.
        </p>
      </div>

      <div className="mt-3 p-2 bg-gray-900 rounded">
        <p>Status: {status}</p>
        <p>Level: {pct}%</p>
      </div>

      <div className="flex gap-2 mt-4">
        <button
          type="submit"
          className="flex-1 bg-green-600 hover:bg-green-500 text-white py-2 rounded"
        >
          Save
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="flex-1 bg-gray-600 hover:bg-gray-500 text-white py-2 rounded"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}

function Field({
  label,
  children,
  error,
}: {
  label: string;
  children: React.ReactNode;
  error?: string;
}) {
  return (
    <div>
      <label className="block text-sm text-gray-400 mb-1">{label}</label>
      {children}
      {error && <p className="text-red-400 text-xs mt-1">{error}</p>}
    </div>
  );
}
