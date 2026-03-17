# Cloud Cost Dashboard Demo

A demonstration of what's possible when AI handles both the planning and development of a custom cloud cost dashboard.

- **Planning & design brief**: ChatGPT
- **Software design & development**: Claude Code
- **Direction & review**: A human with a keyboard

**All data in this application is synthetic and for demonstration purposes only.** No real cloud billing data is used.

## What this demonstrates

This project explores whether AI-assisted development can produce a custom FinOps dashboard faster than configuring one in traditional tools like Grafana — especially when the requirements include things that are awkward in off-the-shelf dashboards:

- Pie/bar chart toggle at every drill level
- Click-to-drill-down through a business hierarchy (Org > Tenant > Account)
- Context-aware AI summary panel
- Provider filtering across the entire view

## Running locally

```bash
npm install
npm run dev
```

Then open http://localhost:5173/

## Tech stack

- React + TypeScript + Vite
- Recharts
- Tailwind CSS
- Lucide icons

## License

MIT
