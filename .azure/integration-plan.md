# Integration Plan

## Backend
- Managed service: Supabase; no custom backend project, local run command, port, or health endpoint is defined.
- Supabase CLI and Docker availability were not confirmed. The static UI runs without Supabase configuration.
- Database: Supabase PostgreSQL. Create reviewed SQL migrations under `supabase/migrations/`; add RLS for anonymous access and NO seed data.
- Public frontend environment variables: `VITE_SUPABASE_URL`, `VITE_SUPABASE_ANON_KEY`. Never use service-role keys or database passwords in the frontend.
- Optional storage: Supabase Storage for issue images, only after explicit user consent and restricted policies.

## Frontend
- Project folder: repository root.
- Build: `npm run build`; dev: `npm run dev`.
- Live-data seam to swap: `src/api/index.ts` (`mockClient` to configured Supabase client).
- Mock-only files to remove during wiring: `src/api/mockClient.ts`, `src/api/previewState.ts`, `src/components/StateSwitcher.tsx`. No `src/mocks/` directory exists; the current mock layer contains no fabricated records.
- Preserve the `ApiClient` method contract in `src/api/types.ts` and keep UI consumers on the `api` seam.

## Client Routes
These are browser routes, not HTTP API endpoints:
- `GET /` — home
- `GET /classify` — upload validation and unavailable state until a model endpoint is configured
- `GET /dashboard` — genuine community records or empty/unconfigured state
- `GET /survey` — validate and submit anonymous survey responses
- `GET /report` — validate and submit issue report; optional consented image
- `GET /awareness` — static segregation guidance
- `GET /about` — project information and limitations

Supabase operations are managed-client calls, not custom HTTP routes: list community records, submit survey, submit issue, optional image storage. Classification has no configured endpoint and must not invent predictions or confidence values. Only confirm persistence after a successful configured Supabase operation.

## Types and Services
- Shared types package/import alias: none currently; typed frontend contract is `src/api/types.ts`.
- Essential: Supabase PostgreSQL persistence for survey and issue submissions; Azure Static Web Apps is the planned hosting target, but no deployment plan is present.
- Enhancement: Supabase Storage for consented issue images; external TensorFlow/Keras inference adapter remains optional and unconfigured.
- No analytics or demo records. Do not mix synthetic data into live views.
