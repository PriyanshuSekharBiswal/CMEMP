# MVP coverage against the requirements PDF

The source PDF is a broad vendor-neutral platform checklist, not a claim that all features have been delivered. This MVP implements the central procurement workflow. Existing prototype assertions that all features were “Included” are archived and are not used as implementation evidence.

| Requirement area | Implemented in this MVP | Remaining work |
| --- | --- | --- |
| Customer website | Responsive catalogue, category/search/sort, brand/specification comparison, material list, customer profile, request/order history | Full category/brand/product CRUD, production photography, static policy/contact pages |
| Authentication | Server sessions, role separation, customer local OTP test flow, admin password login | Real SMS OTP delivery, account recovery, admin MFA |
| Quotation & comparison | Persisted material requests, multiple supplier offers, item pricing/GST/freight/terms, validity, quote acceptance and order creation | Alternate-brand substitutions within an RFQ, supplier portal, attachments, downloadable quotation PDF |
| Communication & follow-up | Customer in-app request/quote/order notifications | Email/WhatsApp APIs, delivery receipts, automated reminders and retry queues |
| Orders & operations | Order status workflow, accepted supplier assignment, transport details, private liaison notes | Partial fulfilment, split suppliers, inventory allocation, cancellation/refund handling |
| Suppliers | Create supplier, contact/location/terms/rating records, name/location/pincode lookup | Supplier self-service, verification, editing/deactivation, distance ranking |
| Supplier payments | Manual unpaid/part-paid/paid status with reference and terms | Payment gateway, reconciled ledger, instalment amounts, proof attachments, approval separation |
| Purchase orders & delivery | Order-specific printable PO and challan with material/quantity details and transport assignment | Statutory tax invoices/e-way bills, document numbering policy, signed receipt and attachment storage |
| Services & advisors | Deferred | Workmen and advisor directory, profile management, enquiries and booking workflows |
| Commercial engagement | Basic delivered-order point accrual, visible balance, per-product pricing/discount configuration | Configurable reward earning/redemption/expiry, category-wide discount rules |
| Content | Deferred | CMS for blogs/FAQs, SEO routing, content review and publishing |
| Admin | Scoped operations dashboard with real counts/order totals; quote, order, supplier and pricing operations | Customer/role management, complete catalogue CRUD, CMS and directory administration, audit trail for all edits |
| Technical platform | TypeScript web frontend/API, relational SQLite, validation, session cookies, transactional state changes, tests | Production SMS/email/WhatsApp/maps/payments, PostgreSQL at scale, Linux deployment, HTTPS, backups, monitoring |

## Defined MVP business rules

- One confirmed order and one accepted supplier offer per material request. Each offer covers the entire requested basket; source multiple suppliers as separate requests for now.
- The customer accepts an offer; an admin cannot accept on their behalf.
- A quote's expiry applies to acceptance, not to fulfilment after it has been accepted.
- Published quote rates, supplier name, payment terms and line items are snapshots.
- No money is collected. Admin payment status describes a manually recorded supplier payment.
- Reward points are informational and cannot be redeemed in this release.
- Tracking means recorded operational milestones, not live GPS location.
- All catalogue and supplier seed records are examples requiring business verification.

## Suggested delivery sequence after local MVP validation

1. Confirm real catalogue, supplier data, tax policy, freight and quotation rules; implement product/supplier edit workflows and quote amendments.
2. Select SMS, WhatsApp, email and payment providers; add adapters, webhook verification, secret management and failure handling.
3. Add attachment storage, supplier self-service, operational approvals, reporting and an audit log.
4. Build CMS and service/advisor directories; add category discounts and reward redemption after rules are agreed.
5. Prepare deployment, backups, recovery, monitoring, security/accessibility/load reviews and a supervised pilot.
