// src/utils/validation.ts
import type { Bin } from "../types";

export function validateBin(bin: Bin) {
  const errors: Partial<Record<keyof Bin, string>> = {};

  if (bin.capacity < 0) errors.capacity = "Capacity must be ≥ 0";
  if (bin.stock < 0) errors.stock = "Stock must be ≥ 0";
  if (bin.stock > bin.capacity) errors.stock = "Stock cannot exceed capacity";
  if (bin.threshold !== undefined && bin.threshold < 0) errors.threshold = "Threshold must be ≥ 0";
  if (bin.threshold !== undefined && bin.threshold > bin.capacity) errors.threshold = "Threshold cannot exceed capacity";

  return errors;
}
