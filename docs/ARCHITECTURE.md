# Architecture

## Technology choice

TypeScript covers the browser and HTTP API with shared domain types, helping keep quotation, request and order contracts consistent. React manages interactive forms and role-aware screens; Vite handles local development and frontend builds. Express keeps HTTP routing explicit and small.

SQLite provides a real relational database with transactions, foreign keys and unique constraints, while keeping this MVP runnable without Docker or a database service. Node's built-in SQLite module removes a native add-on dependency. Synchronous database calls are suitable for a small local or single-instance MVP. PostgreSQL and an asynchronous data layer are recommended when concurrent writes, multiple application instances, managed backups or larger workloads become requirements.

## Request flow

Browser → same-origin `/api` → JSON validation with Zod → session and role checks → SQL transaction → JSON response. In development Vite proxies `/api` to the API server. In the built app Express serves `dist/web` and the API from one origin.

Data is relational: `users`, `sessions`, `otps`, `products`, `suppliers`, `requests`, `request_items`, `quotes`, `orders`, `order_events`, `notifications`. Quote line items are immutable JSON snapshots referencing the originating relational request items; this preserves the accepted commercial record when catalogue prices change. Product specifications use JSON because technical attributes vary by category.

Versioned SQL migrations live in `apps/api/src/db/migrations`. Applied versions are tracked in `schema_migrations`; startup seeds catalogue/supplier data using `INSERT OR IGNORE`, so existing values are preserved.

## Commercial integrity

- API prices are **integer paise**. UI inputs display rupees.
- Item amount is rounded to paise, then GST is rounded per item. The server computes totals and ignores client-supplied totals.
- Request quantities must be positive and bounded; quotes must contain exactly one rate per requested material.
- The chosen quote is immutable. A unique order constraint on `requestId` and a transaction prevent duplicate orders.
- Expired quotations cannot be accepted. Publishing new offers is blocked once the request is ordered.
- Orders can remain at the current stage or advance one stage. Backwards movement and skipping stages are rejected.
- Dispatch requires a vehicle and driver. Paid/part-paid supplier records require a reference. These are manual records, not gateway transactions or an accounting ledger.
- Delivery rewards are granted inside the state transition transaction, so repeated saves do not grant duplicate points.

## Authentication and privacy

Customer OTP is explicitly a local test adapter, enabled only by `DEMO_AUTH=true`. It returns a cryptographically random six-digit code to the UI, stores a hash, expires it in five minutes, limits verification to five attempts and applies an issuance cooldown. A coarse per-IP login limiter is also applied. This is **not production phone verification**. Without the test flag, customer authentication returns a provider-not-configured error.

Admin accounts use a separately configured password hashed with scrypt and a random salt. Customer OTP cannot log in as an admin. Session tokens are random 256-bit secrets; only their SHA-256 hashes are stored. Cookies are HttpOnly, SameSite=Strict, and optionally Secure. Sessions expire after seven days and are invalidated on logout.

Mutations require a custom request header; cross-origin API requests are rejected. No CORS permission is granted. Customer queries are filtered by server session identity and internal liaison notes are excluded from customer responses. Browser rendering uses React escaping. API JSON responses are not cached and static serving is limited to the built frontend directory.

## Configuration and operation

Use `.env.example` as the reference. `WEB_ORIGIN` can be set for a custom frontend origin. `COOKIE_SECURE=true` is required when using HTTPS. `ADMIN_PHONE` is reserved for operations; it cannot reuse a customer number. Admin provisioning fails if the password is under 12 characters. Changing an existing admin password is not implemented in the UI yet.

The server binds to `127.0.0.1` and shuts down cleanly on SIGINT/SIGTERM. For public deployment, use a process supervisor and HTTPS reverse proxy, disable local OTP mode, configure a real SMS adapter, verify rates/taxes/supplier data, add password recovery and admin MFA, configure trusted proxy/rate-limit storage deliberately, restrict backups and secrets, and complete operational and security review. The current in-memory rate limiter is intended for a single local process.

Use SQLite's backup API or stop the app before copying the database; WAL files may contain recent writes. Do not copy only the main SQLite file while the app is writing. No automatic backup or public hosting has been configured.

## Test strategy

API tests exercise actual HTTP requests with independent session cookies and an isolated database. They cover ownership, role protection, CSRF/origin rejection, OTP reuse, quote validation, one-time acceptance, quote expiry, transport validation, private notes, point accrual, immutable accepted prices and reopen persistence.

A Playwright test exercises the customer and admin forms through the complete lifecycle and checks desktop/mobile overflow and browser errors. It captures screenshots of the catalogue, operations view and challan.
