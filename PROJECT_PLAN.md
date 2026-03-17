Perfect. You’ve answered enough to stop discovery and start building.

## Straight answer

You do **not** need more questions right now.

You have enough to hand Claude Code a solid build brief for a **polished demo dashboard** whose whole purpose is:

> **show that a custom AI-built dashboard can be stood up fast and can do things the current Grafana approach is making awkward — especially pie ↔ bar switching and hierarchy-aware drill-down.**

Below is the project plan I’d give Claude Code.

---

# Project Plan for Claude Code

## Demo: Multi-Org / Multi-Tenant / Multi-Cloud Cost Dashboard

## 1) Objective

Build a polished **frontend-only demo dashboard** for cloud costs that uses **mock data** and demonstrates flexibility beyond Grafana.

The key proof points are:

1. **Pie chart ↔ bar chart toggle** on the main distribution view
2. **Click-to-drill-down** into the next level of the hierarchy
3. **Multi-cloud support** for AWS and Azure
4. **Multi-organization / multi-tenant structure**
5. **AI-native mock features** that make the dashboard feel like a modern operational product, not just a chart page

This is **not** a production system.
No auth, no backend, no real APIs, no persistent data model, no RBAC.

---

## 2) Demo Story

The target audience is a **FinOps lead** who is trying to build dashboards and is running into display limitations with Grafana.

The dashboard should make the viewer immediately think:

* “This is more flexible than Grafana”
* “We could tailor views to our cost model instead of forcing our model into the tool”
* “The chart switching and drill-down behavior is straightforward”
* “This could be extended quickly”

---

## 3) Scope

## In scope

* Frontend-only dashboard
* Mock data with realistic-looking organizations, tenants, cloud providers, accounts, and spend
* Static month-to-date snapshot
* Main chart that can switch between **pie** and **bar**
* Drill-down through hierarchy
* A handful of supporting widgets
* Mock AI insights panel/cards
* Clean visual design
* Maintainable component structure

## Out of scope

* Authentication
* Real cloud billing ingestion
* Database
* API server
* User management
* Export/reporting
* Alerts
* Full service-level detail unless it falls out naturally
* Heavy filtering complexity
* Production hardening

---

## 4) Recommended Tech Stack

Use this stack unless there’s a very strong reason not to:

* **Next.js**
* **TypeScript**
* **Tailwind CSS**
* **Recharts**
* **shadcn/ui** for UI primitives
* **Lucide icons**
* Local mock data in TypeScript/JSON

## Why this stack

* Fast for AI agents to build and refactor
* Easy to keep maintainable
* Recharts makes the **pie/bar toggle** simple
* Next.js is familiar, organized, and demo-friendly
* Tailwind + shadcn/ui gets to “looks polished” quickly

---

## 5) Hierarchy Model

Use this hierarchy for the demo:

**Major Org → Tenant → Provider → Account**

Notes:

* “Tenant” here means a cloud-using subdivision or team under a major org
* Providers are **AWS** and **Azure**
* Account is the lowest required drill level for the demo
* Service-level detail is optional and should only be added if trivial

Example:

* Engineering

  * Platform Shared

    * AWS

      * prod-core
      * dev-sandbox
      * shared-services
    * Azure

      * ent-apps
      * data-lab
* Product

  * Customer Apps

    * AWS
    * Azure

Use **7 major orgs** at the top level.

---

## 6) UX Behavior

## Main interaction pattern

The primary dashboard view should show spend distribution at the current level.
Users can:

* switch the chart between **pie** and **bar**
* click a segment/bar to drill into the next level
* use breadcrumb navigation to go back up

## Required behavior

### Chart toggle

* A visible, obvious control that switches the main chart between:

  * **Pie**
  * **Bar**
* This toggle must work at every drill level

### Drill-down

Use **in-place drill-down** with breadcrumb navigation.

Example flow:

* Top level: Major Orgs
* Click “Engineering”
* View changes to Tenants for Engineering
* Click “Platform Shared”
* View changes to Providers for that tenant
* Click “AWS”
* View changes to Accounts for AWS under that tenant

This is the cleanest and fastest demo behavior.

---

## 7) Screens / Layout

Keep this to **one main dashboard page**.

## Suggested layout

### Top bar

* Title: “Cloud Cost Dashboard”
* Subtitle: “Month-to-date snapshot”
* Small note: “Demo data”
* Major org / provider context from breadcrumbs

### Filter strip

Keep it light and mostly presentational:

* Static time badge: **Month to Date**
* Optional provider filter:

  * All
  * AWS
  * Azure
* Optional major org quick filter at top level only if easy

### KPI cards

Include 4 cards:

* Total MTD Spend
* AWS Spend
* Azure Spend
* Largest Cost Driver

Optional 5th:

* Month-over-month change (mocked)

### Main visualization area

Large hero card containing:

* title reflecting current drill level
* pie/bar toggle
* main chart
* clickable bars/slices
* hover tooltips with spend and % of parent

### Secondary widgets

Add 2–3 simple supporting widgets:

1. **Trend chart**
   Small 6-month mocked spend trend for the currently selected context

2. **Top cost drivers table**
   Top 5 rows at current level with:

   * name
   * provider
   * MTD cost
   * % of parent

3. **Mock AI insight panel**
   A card titled something like “AI Summary” or “Suggested Insight” with generated-looking text based on the selected node

This is enough to make it feel richer than Grafana without becoming a full app.

---

## 8) Data Design

Use mock data only.

## Major orgs

Create 7 plausible orgs, for example:

* Engineering
* Product
* Operations
* Business Systems
* Data & Analytics
* Security & Compliance
* Corporate Services

## Example tenants

Under each org, create 2–4 tenants with believable names, for example:

* Platform Shared
* Customer Apps
* Internal Tools
* Data Science
* Finance Ops
* Security Engineering

## Providers

* AWS
* Azure

## Accounts

Per provider, create 2–4 plausible accounts/subscriptions, such as:

### AWS

* prod-core
* dev-sandbox
* shared-services
* analytics-prod

### Azure

* enterprise-apps
* data-lab
* corp-it
* ai-experiments

## Spend values

Make the spend values realistic enough to feel real:

* enough spread for pie and bar to both look meaningful
* some close values so the bar view clearly shows its usefulness over pie
* some tenant/provider imbalance so drill-down tells a story

Important: the data should be structured so that:

* totals roll up cleanly
* each level can be grouped from children
* breadcrumbs can drive chart content

---

## 9) AI-Native Mock Features

These are mock features, not real LLM integrations.

Add one or two of these:

### A) AI Summary card

Given the current node, render a short generated-style summary such as:

* biggest cost driver
* AWS vs Azure split
* notable concentration risk
* simple recommendation

Example:

> Engineering month-to-date spend is concentrated in Platform Shared, with AWS representing 68% of the selected view. The largest visible driver is prod-core, suggesting shared infrastructure concentration rather than broad tenant distribution.

### B) Suggested questions panel

Small clickable chips:

* “Why is AWS higher here?”
* “What changed month over month?”
* “Where is spend concentrated?”
* “Which tenant should we optimize first?”

These can simply swap the summary text.

### C) Mock anomaly callout

Optional subtle badge:

* “Potential concentration risk”
* “Azure spend unusually concentrated in one tenant”

This helps reinforce “AI-native dashboard” without requiring real AI.

---

## 10) Visual Design Guidance

The design goal is **clean, modern, credible, not flashy**.

## Design principles

* white or very light neutral background
* clear card layout
* lots of breathing room
* rounded cards
* simple shadows
* obvious interactive states
* visible breadcrumbs
* obvious chart toggle

## Most important visual requirement

The **pie ↔ bar switch** should be highly visible and satisfying.
That is the centerpiece of the demo.

---

## 11) Implementation Phases

## Phase 1 — Foundation

* scaffold Next.js + TypeScript + Tailwind app
* set up component structure
* create mock data file
* define hierarchy helpers and aggregation utilities

## Phase 2 — Core dashboard

* KPI cards
* main chart card
* chart toggle
* breadcrumb navigation
* click-to-drill-down behavior

## Phase 3 — Supporting widgets

* trend chart
* top drivers table
* tooltips
* provider split indicators

## Phase 4 — AI-native mock layer

* AI summary card
* optional prompt chips / anomaly badges

## Phase 5 — Polish

* empty-state handling
* hover states
* label cleanup
* responsive behavior
* demo-ready wording

---

## 12) Component Suggestions

Suggested component structure:

* 
* 
* 
* 
* 
* 
* 
* 
* 
* 
* 
* 

---

## 13) Data / Logic Requirements

Claude Code should implement:

### Aggregation helpers

Functions to aggregate child nodes into chart-ready data for:

* major org
* tenant
* provider
* account

### Drill state

Maintain current path:

* selected major org
* selected tenant
* selected provider

### Chart mode state

* 
* 

### Context-aware titles

Examples:

* “Spend by Major Org”
* “Engineering: Spend by Tenant”
* “Platform Shared: Spend by Provider”
* “AWS: Spend by Account”

### Reusable chart data adapter

The chart component should accept normalized data so the same component can render either pie or bar cleanly.

---

## 14) Acceptance Criteria

The demo is successful when all of this works:

1. Dashboard opens to **Spend by Major Org**
2. There are **7 major orgs**
3. User can switch between **pie** and **bar**
4. Clicking a slice/bar drills down to the next level
5. Breadcrumbs allow moving back up
6. AWS and Azure are both represented
7. KPI cards update based on the current selected context
8. Trend chart updates based on selected context
9. Top drivers table updates based on selected context
10. AI summary updates based on selected context
11. UI looks polished enough to show to a stakeholder
12. No backend or auth is present

---

## 15) What to optimize for

Claude Code should optimize for:

* **demo clarity**
* **maintainability**
* **fast build**
* **obvious flexibility beyond Grafana**

Not for:

* enterprise architecture
* future-proof perfection
* overbuilt abstractions

---

## 16) Risks / Guardrails

## Biggest risk

Claude Code may try to overbuild this into a product skeleton.

## Guardrails

Tell it explicitly:

* do not add backend code
* do not add auth
* do not build API routes unless absolutely necessary for organization
* do not invent unnecessary filters
* do not add service-level drill-down unless it is trivial after account-level is done
* do not spend time on persistence
* prioritize working interactions and polish over architectural completeness

---

# Claude Code Prompt

You can paste this directly into Claude Code.

Build a polished frontend-only demo dashboard for cloud costs.

Goal:
This is a demo to show a FinOps lead that a custom AI-built dashboard can be stood up quickly and can be more flexible than Grafana for their needs. The key proof point is that the main chart can switch between pie and bar and still support click-to-drill-down.

Requirements:
- Use a strong, maintainable stack
- Frontend only
- Mock data only
- No auth
- No backend
- No real APIs
- No database
- No persistence
- No overbuilding

Recommended stack:
- Next.js
- TypeScript
- Tailwind CSS
- Recharts
- shadcn/ui where useful

Hierarchy:
Major Org -> Tenant -> Provider -> Account

Definitions:
- Major Org = high-level org within one company
- Tenant = cloud-using subdivision/team under a major org
- Provider = AWS or Azure
- Account = named cloud account/subscription

Top-level requirements:
1. Landing view should show "Spend by Major Org"
2. There should be 7 major orgs
3. Main chart must support an obvious toggle between Pie and Bar
4. The toggle must work at every drill level
5. Clicking a slice or bar drills into the next level
6. Breadcrumbs let the user move back up
7. Use static month-to-date data only
8. Include AWS and Azure
9. UI should look polished and demo-ready

Supporting widgets:
- KPI cards:
  - Total MTD Spend
  - AWS Spend
  - Azure Spend
  - Largest Cost Driver
- Small 6-month trend chart for the current context
- Top cost drivers table for current context
- Mock AI summary card that updates based on the selected node

Data:
- Entirely mock data
- Use plausible org, tenant, provider, and account names
- Build the data so values roll up cleanly through the hierarchy
- Make the values realistic enough that both pie and bar charts look meaningful
- Include some close-value comparisons so bar view clearly shows an advantage over pie

UX guidance:
- Single main dashboard page
- In-place drill-down
- Large hero chart card
- Very visible pie/bar toggle
- Clean breadcrumbs
- Clean, modern card layout
- Avoid clutter
- Keep filters minimal
- Static time range badge: Month to Date
- Optional provider filter only if easy

AI-native mock behavior:
- Add a card titled something like "AI Summary"
- It should generate context-sensitive explanatory text for the selected node
- This is mock logic, not a real LLM integration
- Optional: add clickable prompt chips like "Why is AWS higher here?" or "Where is spend concentrated?"

Implementation guardrails:
- Do not add auth
- Do not add API routes unless there is a very strong reason
- Do not add a backend
- Do not add a real data model
- Do not overengineer
- Optimize for demo quality and maintainability
- Prioritize getting the core interactions working cleanly

Suggested implementation phases:
1. Scaffold app and data model
2. Implement aggregation utilities and drill state
3. Build main chart with pie/bar toggle
4. Add drill-down and breadcrumbs
5. Add KPI cards, trend chart, and top drivers table
6. Add mock AI summary
7. Polish layout and interaction states

Acceptance criteria:
- Working pie/bar toggle at every level
- Working drill-down and breadcrumb navigation
- Clear multi-org / multi-tenant / multi-cloud story
- Polished enough to demo
- Obviously more flexible than a constrained Grafana setup

Please start by:
1. Proposing the file/component structure
2. Defining the mock data shape
3. Building the dashboard incrementally
4. Keeping the implementation simple and clean
---

## Devil’s-advocate take

This is a good demo idea, but only if you keep the message tight.

Do **not** let the demo become “look, we made another dashboard.”

The message should be:

* Grafana is good for standard dashboards
* but once the stakeholder wants **business-specific hierarchy + chart-mode switching + tailored drill behavior + AI explanation**, custom UI gets attractive very quickly
* and AI agents make that custom UI fast enough that the old “Grafana is quicker” assumption is no longer automatically true

That’s the real argument.

## My recommendation on next move

Paste the Claude Code prompt as-is, let it scaffold the first pass, then bring me the output or screenshots and I’ll help you tighten the demo story and cut anything that smells like overengineering.

