# Vending Rack Frontend

A vending-machine style UI for managing rack bins (React + TypeScript + Tailwind).

## Features
- 4×5 Bin Grid with SKU info, stock/capacity, progress bar, status chip
- Rack header: ID, location, utilization %, counts by status
- Filters: search + status filter
- Details Panel: view and edit mode with validation
- Keyboard navigation (arrow keys across grid, Enter to open bin)
- Accessibility (ARIA labels, focus management)
- Export rack as JSON
- Unsaved changes guard
- Tooltips, smooth animations

## Setup
```bash
npm install
npm run dev


Build
npm run build
npm run preview



---

## 4. Final Submission Checklist ✅

**Core Requirements**
- [x] 4×5 grid, responsive, always 20 slots  
- [x] BinCard shows name, stock/capacity, progress bar, status chip  
- [x] Status thresholds: Full ≥80%, Half ≥40%, Low <40% >0, Empty = 0 or capacity ≤0  
- [x] RackHeader shows rack ID, location, utilization %, counts  
- [x] Search + status filters work  
- [x] DetailsPanel with View + Edit mode, validation, computed status  
- [x] State updates in memory only  

**Accessibility & UX**
- [x] Arrow key navigation (grid, focus ring, Enter/Space to open)  
- [x] ARIA labels for bins  
- [x] Unsaved changes guard  
- [x] Tooltips on BinCards  

**Polish**
- [x] Smooth progress bar + drawer animations  
- [x] Export JSON button  
- [x] README with setup + notes  

---

🎯 That’s it — your assignment is now **feature-complete, accessible, polished, and submission-ready**.  

Do you want me to also provide a **zip-ready folder structure** (with all files laid out) so you can directly copy-paste into your project before submitting?
