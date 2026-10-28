# Project Plan

**Status**: Awaiting Integration
**Created**: 2026-10-28
**Mode**: NEW

---

## 1. Project Overview

**Goal**: Build an accessible, responsive waste-segregation and community-monitoring app for Dr. D.Y. Patil College of Engineering & Innovation in Varale-Talegaon, Pune. Use Supabase for anonymous survey and issue persistence when configured, an optional image-storage path, and a modular TensorFlow/Keras inference adapter; until real services are configured, show honest unconfigured, empty, or demo states and never invent classifications, confidence scores, or community analytics. Every module is independently testable.

**App Type**: SPA + API

**API Login**: No

**Mode**: NEW

**Deployment Plan**: No deployment plan found

---

## 2. Backend — Supabase Managed Data Services

Supabase is the planned managed data backend; no custom server or Azure Functions service is included. Browser access uses only the public Supabase URL and anon key, with RLS policies enforcing anonymous write/read boundaries. The service-role key and database password must never enter frontend code. If configuration is absent, dependent workflows remain visibly unavailable while static guidance remains usable.

| Component | Technology |
|-----------|-----------|
| **Database** | Supabase PostgreSQL with reviewed SQL migrations and Row Level Security |
| **File Storage** | Supabase Storage bucket with restricted policies and explicit image-upload consent |
| **Authentication** | No user sign-in; anonymous public access governed by RLS |
| **Inference** | Pluggable TensorFlow/Keras API adapter; no endpoint or model is assumed configured |

---

## 3. Frontend — Web App

| Component | Technology |
|-----------|-----------|
| **Language** | TypeScript |
| **Framework** | React + Vite |
| **Package Manager** | npm |
| **Test Runner** | vitest |
| **Mocking Library** | vi.mock |
| **Test Command** | npm test |

---

## 4. Services Required

| Azure Service | Role in App | Environment Variable | Default Value (Local) | Classification |
|---------------|------------|---------------------|----------------------|----------------|
| Azure Static Web Apps | Host the built React SPA | — | Run locally with Vite | Essential |
| Supabase PostgreSQL | Persist validated anonymous survey and issue reports under RLS; without configuration show an unavailable/empty state | `VITE_SUPABASE_URL`, `VITE_SUPABASE_ANON_KEY` | Unset; backend-dependent forms are visibly unconfigured | Essential for submissions |
| Supabase Storage | Optional issue-image storage using the same Supabase client configuration and explicit consent | `VITE_SUPABASE_URL`, `VITE_SUPABASE_ANON_KEY` | Unset; hide or disable image persistence | Enhancement |

The form's Blob Storage selection is satisfied by the explicitly requested Supabase Storage provider; do not silently substitute Azure Blob Storage. The inference API is an optional external integration and has no configured endpoint in this plan.

---

## 5. Prerequisites

The app has a React/Vite frontend and uses Supabase migrations and optional local Supabase services. Versions below reflect a local command scan; unknown means the executable could not be confirmed on PATH.

### Run

| Tool | Service(s) | Installed | Version |
|------|------------|-----------|---------|
| Node.js | * | ✅ | 24.13.1 |
| npm | * | ✅ | 11.8.0 |
| Supabase CLI | Supabase data services | ❓ | Not confirmed on PATH |

### Debug

| Tool | Service(s) | Installed | Version |
|------|------------|-----------|---------|
| Docker Desktop / Docker Engine | Supabase local services | ❓ | Not confirmed on PATH |
| Chrome or Edge | web-app | ❓ | Not confirmed on PATH |
| JavaScript Debugger | web-app | ✅ | Bundled with VS Code; version not separately reported |

Double-check all ❓ tools before running local Supabase services or browser debugging. Hosted Supabase configuration is not required to run the static UI.

---

## 6. Design System & UI

**Component Library**: shadcn/ui + Radix UI
**Style Direction**: A campus sustainability workspace with a clear editorial hierarchy, restrained forest-green navigation, and warm coral highlights for action and safety guidance. Keep the interface calm and practical; label demo/unconfigured states at the point of use and never style sample content as live analytics.
**Typography**: system-ui, Segoe UI, sans-serif

### Color Palette

| Token | Hex | Usage |
|-------|-----|-------|
| `primary` | `#176B5B` | Campus green for primary actions and active navigation |
| `accent` | `#C96549` | Coral emphasis for safety notes and image/report actions |
| `surface` | `#F4F7F5` | Cool, low-glare background for campus guidance |
| `text` | `#19362F` | High-contrast headings, instructions, and form labels |
| `muted` | `#62736D` | Secondary labels and configuration explanations |
| `border` | `#D7E2DC` | Dividers around forms, tables, and guidance panels |

### Pages

| Page | Route | Purpose | Layout |
|------|-------|---------|--------|
| Home | `/` | Introduce the campus project and provide direct entry points to its workflows | `header, nav, hero, main, grid, footer` |
| Classify Waste | `/classify` | Upload or drop an image, inspect it, and show only a configured model response or an explicit unavailable state | `header, nav, main, form, actions, footer` |
| Community Dashboard | `/dashboard` | Present only genuine configured community records; otherwise show a clear empty state without charts or totals | `header, nav, main, tabs, table, footer` |
| Community Survey | `/survey` | Collect eight validated, anonymous campus waste-segregation responses | `header, nav, main, form, actions, footer` |
| Report an Issue | `/report` | Submit a location and description with optional consented image evidence | `header, nav, main, form, actions, footer` |
| Awareness Center | `/awareness` | Give practical segregation guidance with explicit local-rule caveats and safety warnings | `header, nav, main, tabs, grid, footer` |
| About Project | `/about` | Explain the academic project, team, technology, limitations, and responsible-use boundary | `header, nav, main, two-column(main+card-list), footer` |

### Sample Content

Dashboard data is not seeded: show no totals, charts, fabricated locations, or sample activity as live. If sample records are ever supplied, identify them conspicuously as **DEMO DATA** and do not mix them into live metrics. The preview depicts an empty dashboard and a loading skeleton only as separate interface states.

Home — project and workflow:
| Content | Value |
|---------|-------|
| Institution | Dr. D.Y. Patil College of Engineering & Innovation, Varale-Talegaon, Pune |
| Department | Artificial Intelligence and Data Science |
| Team | Krishna Sankeshwari and Durgesh Upasani |
| Academic year | 2026-2027 |
| Primary actions | Classify Waste · Community Dashboard · Community Survey · Report an Issue |

Classify Waste — configured state:
| State | Visible content |
|-------|-----------------|
| Model unavailable | DEMO MODE · No model endpoint configured · No prediction or confidence displayed |
| Upload control | Choose image · accepted image types and size validation · preview and reset |
| Manual correction | Available only to correct an actual model response; never presented as inferred output |
| Safety notice | Hazardous, biomedical, chemical, sanitary, electronic, or unidentified dangerous waste: do not rely on this tool; follow qualified local guidance |

Community Dashboard — live record: no sample records, totals, charts, or activity values are bundled. Empty state: “No community records available yet”; loading state uses neutral skeleton rows while a configured data request is pending.

Community Survey — eight anonymous prompts:
| # | Prompt |
|---|--------|
| 1 | Which waste categories do you separate at home or on campus? |
| 2 | How often do you separate waste before disposal? |
| 3 | Are separate wet- and dry-waste bins available where you live or study? |
| 4 | How are food scraps usually disposed of? |
| 5 | Which materials are hardest for you to sort? |
| 6 | Have you used a campus or community recycling drop-off? |
| 7 | What would help improve waste segregation in your community? |
| 8 | What additional suggestion would you like to share? (optional) |

Report an Issue — form fields: issue category (mixed/overflowing bin, missed collection, unsafe waste, other) · campus/community location · description · optional image · explicit image consent. Do not promise reference IDs or tracking until backend support exists.

Awareness Center — guidance examples:
| Item or situation | General guidance | Caveat |
|-------------------|------------------|--------|
| Clean corrugated cardboard | Keep dry and flatten where accepted | Confirm local collection rules |
| Empty aluminum drink can | Empty and rinse if required locally | Check campus bin labels |
| Glass food jar | Empty; check lid and glass acceptance rules | Local systems differ |
| Food scraps | Use a designated organics stream where available | Do not assume compost acceptance |
| Batteries or electronic waste | Keep separate and use an authorized collection point | Never place in ordinary recycling |

About Project — institution: Dr. D.Y. Patil College of Engineering & Innovation · location: Varale-Talegaon, Pune · department: Artificial Intelligence and Data Science · team: Krishna Sankeshwari and Durgesh Upasani · academic year: 2026-2027. State that the model, Supabase project, and analytics are not operational until configured with real services and data.

---

## 7. Project Structure

```text
project-root/
├── .azure/
│   ├── project-plan.md
│   └── .preview-temp/
├── .env.example                  # Public Supabase URL/anon key placeholders only
├── .gitignore
├── package.json
├── supabase/
│   ├── config.toml
│   └── migrations/                # Reviewed schema, indexes, and RLS policies; no seed data
└── src/
    ├── app/                       # Router and app shell
    ├── components/                # shadcn/ui primitives and accessible shared UI
    ├── features/
    │   ├── classification/        # Upload validation and inference adapter contract
    │   ├── community/             # Dashboard queries and empty/loading/error states
    │   ├── survey/                # Eight-question form and validation schema
    │   ├── reports/               # Issue form and optional consented image upload
    │   └── awareness/             # Static guidance with local-rule caveats
    ├── lib/
    │   ├── supabase.ts            # Public client; no privileged credentials
    │   └── validation/            # React Hook Form + Zod schemas
    ├── pages/                     # Seven route-level page components
    └── tests/                     # Unit and component tests; no fabricated live-data fixtures
```

---

## 8. Route Definitions

These are client-side routes. Supabase client calls are managed service operations, not custom HTTP endpoints. No application API route or model endpoint is assumed to exist.

| # | Method | Path | Description | Request Body | Response Body | Status Codes |
|---|--------|------|-------------|-------------|--------------|--------------|
| 1 | Client-side | `/` | Project home and workflow entry points | — | Home view | N/A — browser route |
| 2 | Client-side | `/classify` | Image upload, configured inference adapter, and honest unavailable state | Image selected by user | Configured model response only; otherwise no prediction | N/A — browser route |
| 3 | Client-side | `/dashboard` | Genuine community records or explicit empty/unconfigured state | — | Dashboard view; no seeded metrics | N/A — browser route |
| 4 | Client-side | `/survey` | Validated anonymous eight-question survey | Survey answers | Submission confirmation only when Supabase succeeds | N/A — browser route |
| 5 | Client-side | `/report` | Issue report with optional consented image | Category, location, description, optional image and consent | Confirmation only when configured service succeeds | N/A — browser route |
| 6 | Client-side | `/awareness` | General sorting and safety guidance | — | Awareness Center view | N/A — browser route |
| 7 | Client-side | `/about` | Academic project and limitation details | — | About Project view | N/A — browser route |

---

## 9. Next Steps

1. Run **azure-project-scaffold** to build the React/Vite UI and Supabase integration boundaries from this plan.
2. Run **azure-project-integrate** to prepare and validate Supabase migrations, RLS, storage policies, and live-data wiring when project credentials are available.
3. Run **azure-debug-plan** → **azure-debug-generate** for optional local Supabase emulation and VS Code debugging.
4. Run the **azure-deploy** agent when ready; review Azure hosting and external Supabase connectivity before deployment.
