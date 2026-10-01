# CMEMP — Construction Materials Procurement MVP

A working customer and operations application based on the construction materials requirements PDF and the original frontend prototype. Built with **TypeScript, React, Express, and SQLite**.

## Run locally

Requires **Node.js 22.13+** (Node 24 LTS recommended) and npm. Node's built-in SQLite module may print an experimental warning on older supported Node versions.

```sh
npm ci
cp .env.example .env
# Set ADMIN_PASSWORD to a unique password of at least 12 characters.
# DEMO_AUTH=true enables clearly labelled local OTP testing, without sending SMS.
npm run dev
```

- Website: http://127.0.0.1:5184
- API: http://127.0.0.1:3104/api/health
- Customer: click **Sign in**, use a 10-digit Indian mobile number and a name. The local test code appears in the form. Each number has an isolated account.
- Operations: choose **Operations** in the sign-in dialog. Use `ADMIN_PHONE` (default `9000000000`) and the password from `.env`.
- `.env` is ignored by Git. The admin account is created once, on an empty database. Changing the environment password does not reset an existing account.
- To try both roles together, use separate browser profiles or a private window; sessions are shared within one browser profile.

The API binds to loopback. Local OTP testing intentionally exposes the code to the requester and **does not prove phone ownership**. Keep this mode local. An SMS provider and additional production hardening are required before public launch.

## Try the full workflow

1. Add catalogue materials to **Material list**, enter quantities, and sign in as a customer.
2. Add a project, delivery address, pincode, and notes, then submit the request.
3. Sign in to operations in a separate browser session. Open the request and **Add supplier quote**. Enter actual supplier rates, inclusive freight, validity, lead time and payment terms. Add multiple offers to compare.
4. In the customer workspace, refresh, compare quotations and accept one. The database permits exactly one order per request.
5. In operations, advance the order through **Confirmed → Sourcing → Dispatched → Delivered**. Dispatch requires vehicle and driver details.
6. Record supplier payment status and a reference manually, add internal notes, and print a purchase order or delivery challan.
7. The customer sees order progress and in-app updates. Delivery awards one reward point per ₹100 of order value once. Redemption is deferred.

New requests, quotes, orders, users, pricing and supplier records survive server restarts in `storage/cmemp.sqlite`. Cart selections remain in the browser. Seeded materials, rates, tax rates, supplier identities and ratings are sample data from the original prototype and must be reviewed before business use.

## Structure

```text
apps/
  api/src/
    app.ts                 Express app composition and HTTP policies
    index.ts               Environment loading and server lifecycle
    db/
      database.ts          SQLite connection, schema migrations and seed
      migrations/          Versioned SQL schema
      seed.json            Original sample materials and suppliers
    middleware/auth.ts     Session authentication and role guards
    routes/auth.ts         Customer test OTP, admin login, profile, logout
    routes/procurement.ts  Catalogue, requests, quotations and operations APIs
    services/procurement.ts Monetary calculations, transactions and read models
  web/
    index.html
    src/
      App.tsx              Navigation, session, cart and app shell
      pages/               Catalogue and role-aware procurement workspace
      components/          Reusable controls, forms and printable documents
      lib/api.ts           Typed HTTP client and display formatting
      styles.css           Responsive visual system
packages/shared/src/       Shared domain contracts
tests/                     API/domain tests and Playwright browser tests
docs/                      Architecture, scope and original requirement material
legacy/prototype/          Original prototype preserved for reference
storage/                   Local database, ignored by Git
```

The project uses one npm manifest and lockfile to keep this MVP easy to install. The app boundaries are explicit without introducing monorepo orchestration tooling prematurely.

## Commands

```sh
npm run dev          # API + Vite, with reload
npm run typecheck    # Strict TypeScript checks
npm test             # Real HTTP API integration and domain tests
npm run test:e2e     # Headless Chrome customer/admin journey, desktop/mobile
npm run build        # Type-check and compile frontend to dist/web
npm start            # Serve built frontend and API on 127.0.0.1:3104
npm run format       # Apply consistent source formatting
npm run format:check
```

Browser tests use the installed Google Chrome (`channel: chrome`), isolated in-memory SQLite, and test-only admin credentials. Install Chrome, or change the Playwright browser configuration for your environment. Browser screenshots are written to `tmp/qa/`; failing traces go to `test-results/`.

## Important boundaries

- **Working locally:** session login, customer profiles, product search and specification comparison, saved requests, supplier quotations and acceptance, order transitions, internal notes, supplier creation/lookup, material pricing/discount updates, in-app notifications, reward accrual, printable purchase orders/challans.
- **Not connected:** SMS, WhatsApp Business, email delivery, Google Maps, payment gateways. The app sends no messages and moves no money.
- **Not yet implemented:** file attachments, supplier self-service, blog/FAQ/admin CMS, workmen/advisor directories, automated follow-ups, configurable reward redemption, category-wide discount rules, inventory allocation, cancellations/refunds, and partial/multi-supplier fulfilment.
- Printed documents are operational records, **not tax invoices**. Freight is entered as a final tax-inclusive amount; item GST rates are editable sample configuration.

See [scope](docs/MVP_SCOPE.md) for coverage and [architecture](docs/ARCHITECTURE.md) for implementation decisions and deployment considerations.
