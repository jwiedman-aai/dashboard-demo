---
name: Dashboard Demo Project Context
description: Throwaway FinOps demo dashboard - Vite+React, mock data, no backend, demonstrates pie/bar toggle and drill-down vs Grafana
type: project
---

Building a frontend-only demo dashboard for cloud costs to show a FinOps lead that custom AI-built dashboards are more flexible than Grafana.

**Key decisions:**
- Vite + React instead of Next.js (simpler for single-page demo)
- Provider is a filter, not a drill level (more FinOps-natural). Hierarchy: Org → Tenant → Account
- Mock data generated programmatically (~126 leaf nodes)
- Commit straight to main, no branches/PRs/reviews

**Why:** Throwaway demo, not a product. Optimize for demo clarity and speed.

**How to apply:** Keep everything simple, don't overbuild, prioritize working interactions and polish.
