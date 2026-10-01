# Construction Materials E-Commerce & Management Platform (CMEMP)
## Vendor-Neutral Feature Requirement & Comparison Document (RFP & Bid Evaluation Matrix)

**Document Version:** 1.0  
**Date:** October 2026  
**Document Purpose:** Baseline technical and functional specification for vendor evaluation, proposal comparison, and development contract benchmarking.

---

## 1. Executive Summary & Project Purpose

The **Construction Materials E-Commerce & Management Platform (CMEMP)** is a specialized B2B & B2C multi-stakeholder procurement and operations ecosystem designed for the building and construction materials industry (cement, TMT steel, plumbing/pipes, sanitaryware, electricals, aggregates, finishes, etc.).

Unlike conventional retail e-commerce, construction procurement entails:
- High average order values (AOV) and variable bulk pricing.
- Multi-brand comparative quotations and technical specification matching.
- Offline-to-online assisted sales (WhatsApp, phone consultation, expert advisory).
- Heavy operational fulfillment: Purchase Orders (PO), Supplier Assignment, Delivery Challans, Logistics/Trucking logistics, and payment terms.
- Multi-stakeholder directory (Architects, Contractors, Skilled Workmen, Expert Advisors).

This document serves as the **Vendor-Neutral Baseline Requirement** to evaluate software vendors, agencies, or internal product development teams on an objective, feature-by-feature basis.

---

## 2. Vendor Response Guidelines

Vendors are required to respond to every line item in the Feature Matrix (Section 4) using the following standardized statuses:

| Status Code | Status Name | Description |
| :--- | :--- | :--- |
| **INC** | **Included** | Out-of-the-box in proposed base scope/off-the-shelf solution with standard configuration. Zero additional cost. |
| **PAR** | **Partial / Configurable** | Partially supported out-of-the-box; requires minor configuration or workflow adaptation within base scope. |
| **EXT** | **Extra / Custom Dev** | Not standard in base scope; requires bespoke custom development, 3rd-party licensing, or additional billable hours. Specify cost and timeline. |
| **N/A** | **Not Available** | Vendor cannot deliver this capability in the proposed architecture or timeline. |

### Evaluation Scoring Rubric (100 Points Total)

| Evaluation Pillar | Weight | Description |
| :--- | :--- | :--- |
| **Functional Completeness** | **35%** | Percentage of "Included" (Full) vs "Extra" / "N/A" across all 9 operational modules. |
| **Architecture & Scalability** | **20%** | Cloud readiness, relational data integrity, API-first architecture, mobile responsiveness, and security standards. |
| **Industry Specificity** | **15%** | Experience with B2B quotation workflows, construction units (bags, tonnes, bundles, meters), logistics dispatch, and challan tracking. |
| **Commercials & TCO** | **20%** | Base pricing, milestone terms, third-party API recurring costs (WhatsApp, SMS OTP, Maps), and maintenance SLAs. |
| **Delivery Timeline & Team** | **10%** | Feasible phased delivery schedule, post-launch hypercare warranty, and dedicated project management. |

---

## 3. High-Level Architecture & Stakeholder Ecosystem

```
+-----------------------------------------------------------------------------------+
|                           CUSTOMER TOUCHPOINTS                                    |
|   Responsive Web / Mobile Web  |  WhatsApp Bot & Chat  |  Phone Consultation     |
+-----------------------------------------------------------------------------------+
                                         |
                                         v
+-----------------------------------------------------------------------------------+
|                           CORE APPLICATION LAYER                                  |
|   Catalog & Comparison Engine  |  Quotation Engine  |  Order & Operations Hub     |
|   Directory (Services/Experts) |  Rewards & Points  |  Content & Liaisoning       |
+-----------------------------------------------------------------------------------+
                                         |
                                         v
+-----------------------------------------------------------------------------------+
|                        ADMIN & SUPPLIER CONTROL PANEL                             |
|   Central Administration  |  Supplier Assignment  |  PO & Dispatch Management     |
+-----------------------------------------------------------------------------------+
                                         |
                                         v
+-----------------------------------------------------------------------------------+
|                         THIRD-PARTY INTEGRATIONS                                  |
|   WhatsApp Business API  |  SMS OTP Gateway  |  Google Maps  |  Payment Gateway   |
+-----------------------------------------------------------------------------------+
```

---

## 4. Detailed Feature Requirement & Comparison Matrix

*Vendors must fill out the **Vendor Status**, **Additional Cost (if any)**, and **Vendor Notes / Technical Approach** columns.*

### Module 1: Customer-Facing Website

#### 1.1 Homepage
| # | Feature / Requirement | Mandatory / Desirable | Vendor Status (INC / PAR / EXT / N/A) | Additional Cost | Vendor Notes / Technical Approach |
| :--- | :--- | :--- | :--- | :--- | :--- |
| 1.1.1 | **Hero / Banner Section**: High-impact responsive visual slider with promotional banners, CTAs, and announcement ribbons | Mandatory | | | |
| 1.1.2 | **Product Categories & Featured Materials**: Dynamic category grid (Cement, Steel, Plumbing, Paints, etc.) with thumbnail navigation | Mandatory | | | |
| 1.1.3 | **Product Highlights & Customer Benefits**: Value-proposition blocks (Guaranteed Grade, Timely Site Delivery, Genuine Invoices, Direct Brand Pricing) | Mandatory | | | |
| 1.1.4 | **Quotation Request Call-To-Action (CTA)**: Prominent quick-rfp form triggering guided material estimation or immediate quote request | Mandatory | | | |
| 1.1.5 | **Service Provider / Expert Sections**: Preview carousel for verified contractors, plumbers, electricians, and consulting structural engineers | Desirable | | | |
| 1.1.6 | **FAQs and Contact / Enquiry Options**: Interactive collapsible FAQ accordion and quick enquiry forms | Mandatory | | | |
| 1.1.7 | **WhatsApp Enquiry Integration**: Floating WhatsApp click-to-chat action pre-populating page context / material SKU | Mandatory | | | |

#### 1.2 Product Catalogue & Search
| # | Feature / Requirement | Mandatory / Desirable | Vendor Status (INC / PAR / EXT / N/A) | Additional Cost | Vendor Notes / Technical Approach |
| :--- | :--- | :--- | :--- | :--- | :--- |
| 1.2.1 | **Category & Sub-Category Hierarchy**: Multi-level hierarchical taxonomy (e.g., Structural > Cement > OPC 53 Grade) | Mandatory | | | |
| 1.2.2 | **Product Images & Media**: High-res multi-angle image gallery, downloadable tech brochures/datasheets, and dimension schematics | Mandatory | | | |
| 1.2.3 | **Brand / Manufacturer Information**: Brand profile pages, authorized distributor badges, and brand warranty guarantees | Mandatory | | | |
| 1.2.4 | **Unique SKU Management**: System SKU, Manufacturer Part Number (MPN), barcode support, and variant matrix | Mandatory | | | |
| 1.2.5 | **Product / Company Internal Codes**: Cross-referencing internal ERP/accounting ledger codes with customer-facing catalogue codes | Mandatory | | | |
| 1.2.6 | **Material & Technical Specifications**: Structured technical attribute tables (Compressive strength, ISI/BIS standards, yield stress, thickness, grade) | Mandatory | | | |
| 1.2.7 | **Search and Filtering**: Instant faceted search (by Brand, Grade, Diameter, Application, Availability, Price band) with typeahead | Mandatory | | | |
| 1.2.8 | **Structured Product Categorisation**: Dynamic attribute tagging per category (e.g. TMT steel requires Diameter/Length; Cement requires Grade/Packaging) | Mandatory | | | |

#### 1.3 Customer Registration & Login
| # | Feature / Requirement | Mandatory / Desirable | Vendor Status (INC / PAR / EXT / N/A) | Additional Cost | Vendor Notes / Technical Approach |
| :--- | :--- | :--- | :--- | :--- | :--- |
| 1.3.1 | **Customer Registration & Onboarding**: Simplified signup for Individual Home Builders (IHB), Contractors, Architects, and Corporate Buyers | Mandatory | | | |
| 1.3.2 | **Mobile Number Authentication**: Primary authentication via verified Indian/Global mobile numbers | Mandatory | | | |
| 1.3.3 | **OTP-Based Login (Passwordless)**: SMS/WhatsApp OTP login flow with rate limiting and secure session tokens (JWT) | Mandatory | | | |
| 1.3.4 | **Customer Profile Management**: Manage multiple site delivery addresses, GSTIN numbers, business entity names, and contact persons | Mandatory | | | |
| 1.3.5 | **Order History**: Historical log of all orders with printable invoices, challans, and delivery status | Mandatory | | | |
| 1.3.6 | **Quotation History**: Archival view of all requested, pending, generated, and accepted material quotes | Mandatory | | | |
| 1.3.7 | **Customer Dashboard Hub**: Centralized portal landing page displaying recent activities, active deliveries, and quick actions | Mandatory | | | |

#### 1.4 Customer Dashboard
| # | Feature / Requirement | Mandatory / Desirable | Vendor Status (INC / PAR / EXT / N/A) | Additional Cost | Vendor Notes / Technical Approach |
| :--- | :--- | :--- | :--- | :--- | :--- |
| 1.4.1 | **Live Quotation Status**: Real-time status tracker (Received > Collecting Supplier Bids > Comparison Ready > Confirmed > Expired) | Mandatory | | | |
| 1.4.2 | **Comparative Quotations Viewer**: Side-by-side brand quote comparison matrix with instant approval or request-revision actions | Mandatory | | | |
| 1.4.3 | **Order Lifecycle Tracking**: Step-by-step dispatch tracking (PO Issued > Loading at Yard > In Transit > Delivered at Site) | Mandatory | | | |
| 1.4.4 | **Customer Points & Loyalty Visibility**: E-wallet / rewards balance, accrual history, and eligible milestone perks | Desirable | | | |
| 1.4.5 | **Communication & Alert Updates**: Central notification feed for price changes, quotation readiness, and vehicle dispatch alerts | Mandatory | | | |

---

### Module 2: Quotation & Comparison Engine

#### 2.1 Quotation Management
| # | Feature / Requirement | Mandatory / Desirable | Vendor Status (INC / PAR / EXT / N/A) | Additional Cost | Vendor Notes / Technical Approach |
| :--- | :--- | :--- | :--- | :--- | :--- |
| 2.1.1 | **Customer Quotation Request**: Multi-item Bill of Materials (BOM) creator allowing custom quantities and site delivery pincodes | Mandatory | | | |
| 2.1.2 | **Material Requirement Submission**: Ability to upload CAD drawings, PDF estimates, or freeform text requirements | Mandatory | | | |
| 2.1.3 | **WhatsApp Quotation Enquiry**: Direct conversion of WhatsApp product shares into backend draft quotation inquiries | Mandatory | | | |
| 2.1.4 | **Backend Quotation Management**: Admin workbench to aggregate items, set target margins, and curate multi-supplier packages | Mandatory | | | |
| 2.1.5 | **Supplier Quotation Collection**: Admin RFQ module to request rates from multiple localized wholesale stockists/mills | Mandatory | | | |
| 2.1.6 | **Comparative Quotation Generation**: Automated generation of branded PDF and interactive digital comparison sheets for the client | Mandatory | | | |
| 2.1.7 | **Multi-Brand Comparison (2–3+ Brands)**: Standardized side-by-side comparison (e.g. UltraTech vs ACC vs Dalmia or Tata Tiscon vs Jindal Panther) | Mandatory | | | |
| 2.1.8 | **Technical Comparison Support**: Auto-filling IS standard adherence, chemical composition, test certificate availability | Mandatory | | | |
| 2.1.9 | **Quotation Confirmation Workflow**: Digital acceptance/signing of quote with pricing validity timers (e.g. 24–48hr validity due to steel price volatility) | Mandatory | | | |
| 2.1.10| **1-Click Convert Quote to Order**: Instant transition of confirmed quote into live Sales Order and purchase requisition | Mandatory | | | |

#### 2.2 Product & Brand Comparison
| # | Feature / Requirement | Mandatory / Desirable | Vendor Status (INC / PAR / EXT / N/A) | Additional Cost | Vendor Notes / Technical Approach |
| :--- | :--- | :--- | :--- | :--- | :--- |
| 2.2.1 | **Multi-Brand Comparison Engine**: Customer-facing side-by-side product selector comparing up to 4 brand alternatives | Mandatory | | | |
| 2.2.2 | **Transparent Pricing Comparison**: Base price, freight/unloading estimate, GST, and net landing rate per unit comparison | Mandatory | | | |
| 2.2.3 | **Technical Parameter & Spec Matrix**: Metric-by-metric differential highlight (e.g. Fe 550D elongation % vs Fe 500) | Mandatory | | | |
| 2.2.4 | **Customer-Friendly Presentation**: Mobile-optimized comparison view with "Recommended for Coastal", "Best Value", etc. tags | Mandatory | | | |

---

### Module 3: Communication & Automated Follow-Up

#### 3.1 Automated Follow-Up Workflows
| # | Feature / Requirement | Mandatory / Desirable | Vendor Status (INC / PAR / EXT / N/A) | Additional Cost | Vendor Notes / Technical Approach |
| :--- | :--- | :--- | :--- | :--- | :--- |
| 3.1.1 | **Enquiry Automated Follow-Up**: Drip triggers (at 2h, 24h, 48h) if an enquiry is submitted without quotation acceptance | Mandatory | | | |
| 3.1.2 | **Quotation Expiry & Reminder Notifications**: Timed alerts warning buyers of expiring price locks due to raw material market changes | Mandatory | | | |
| 3.1.3 | **Order Lifecycle Notifications**: Automated SMS/WhatsApp at order confirmation, truck dispatch, and driver assignment | Mandatory | | | |
| 3.1.4 | **Multi-Channel Delivery (Email + WhatsApp)**: Parallel dispatch of rich HTML emails and WhatsApp template messages via official API | Mandatory | | | |

#### 3.2 Operations Communication
| # | Feature / Requirement | Mandatory / Desirable | Vendor Status (INC / PAR / EXT / N/A) | Additional Cost | Vendor Notes / Technical Approach |
| :--- | :--- | :--- | :--- | :--- | :--- |
| 3.2.1 | **Unified Customer Enquiry Communication**: CRM ticket thread linked to the customer account and quotation ID | Mandatory | | | |
| 3.2.2 | **Internal Sales Liaisoning Alerts**: Slack/Email/Dashboard notifications to sales coordinators when quotes are viewed | Desirable | | | |

---

### Module 4: Order & Operations Management

#### 4.1 Order Management
| # | Feature / Requirement | Mandatory / Desirable | Vendor Status (INC / PAR / EXT / N/A) | Additional Cost | Vendor Notes / Technical Approach |
| :--- | :--- | :--- | :--- | :--- | :--- |
| 4.1.1 | **Order Status Lifecycle**: Configurable state machine (Draft > Confirmed > PO Issued > Sourced > Dispatched > Delivered > Closed) | Mandatory | | | |
| 4.1.2 | **Customer & Site Details**: Granular site access notes (e.g., Narrow road, 10-wheel truck restriction, crane required for unloading) | Mandatory | | | |
| 4.1.3 | **Supplier Assignment Engine**: Routing line items or full orders to specific fulfillment suppliers based on proximity and margin | Mandatory | | | |
| 4.1.4 | **Material Details & Batch Numbering**: Detailed record of manufacturer heat number, batch number, and test certificate attachment | Mandatory | | | |
| 4.1.5 | **Purchase Order (PO) Workflow**: Automated splitting of customer order into vendor-specific Purchase Orders | Mandatory | | | |

#### 4.2 Supplier Management & Lookup
| # | Feature / Requirement | Mandatory / Desirable | Vendor Status (INC / PAR / EXT / N/A) | Additional Cost | Vendor Notes / Technical Approach |
| :--- | :--- | :--- | :--- | :--- | :--- |
| 4.2.1 | **Supplier Onboarding & Profile**: GST verification, warehouse/yard coordinates, bank details, authorized brand certifications | Mandatory | | | |
| 4.2.2 | **Pincode / Location-Based Supplier Lookup**: Proximity matching engine finding nearest yards to customer delivery pincode | Mandatory | | | |
| 4.2.3 | **Supplier Rating & Reliability Score**: Internal score based on on-time loading, material quality, and pricing consistency | Desirable | | | |
| 4.2.4 | **Supplier Catalog & Stock Indication**: Indicative lead times and stock availability per supplier | Desirable | | | |

#### 4.3 Supplier Payment Management
| # | Feature / Requirement | Mandatory / Desirable | Vendor Status (INC / PAR / EXT / N/A) | Additional Cost | Vendor Notes / Technical Approach |
| :--- | :--- | :--- | :--- | :--- | :--- |
| 4.3.1 | **Agreed Payment Terms Management**: Support for Advance, Against Delivery (CAD), 7/15/30-day credit lines, and LC terms | Mandatory | | | |
| 4.3.2 | **Supplier Payment Status Tracker**: Unpaid, Partially Paid, Paid records mapped against Purchase Order and delivery confirmation | Mandatory | | | |
| 4.3.3 | **Payment Confirmation Workflow**: Finance team approval workflow before releasing payments to supplier | Mandatory | | | |

#### 4.4 Purchase Order (PO) Management
| # | Feature / Requirement | Mandatory / Desirable | Vendor Status (INC / PAR / EXT / N/A) | Additional Cost | Vendor Notes / Technical Approach |
| :--- | :--- | :--- | :--- | :--- | :--- |
| 4.4.1 | **Automated PO Generation**: System-generated branded PO PDF with line items, rates, taxes, delivery site address, and dispatch dates | Mandatory | | | |
| 4.4.2 | **Direct Supplier PO Transmission**: 1-click email/WhatsApp dispatch of Purchase Orders to supplier contact persons | Mandatory | | | |
| 4.4.3 | **PO Fulfillment Status Tracking**: Track supplier acceptance, loading confirmation, and gate pass generation | Mandatory | | | |

#### 4.5 Packing List & Delivery Challan
| # | Feature / Requirement | Mandatory / Desirable | Vendor Status (INC / PAR / EXT / N/A) | Additional Cost | Vendor Notes / Technical Approach |
| :--- | :--- | :--- | :--- | :--- | :--- |
| 4.5.1 | **Standard Delivery Challan Generation**: Triplicate delivery challan creation (Customer copy, Transporter copy, Accounts copy) | Mandatory | | | |
| 4.5.2 | **Packing List & Weight Slips**: Integration of weighbridge slip details, bundle counts, and piece-to-weight conversions | Mandatory | | | |
| 4.5.3 | **Proof of Delivery (POD) Capture**: Mobile/web upload of signed customer challan and site delivery photographs | Mandatory | | | |

#### 4.6 Transportation & Logistics Management
| # | Feature / Requirement | Mandatory / Desirable | Vendor Status (INC / PAR / EXT / N/A) | Additional Cost | Vendor Notes / Technical Approach |
| :--- | :--- | :--- | :--- | :--- | :--- |
| 4.6.1 | **Transportation Requirement Identification**: Auto-calculation of vehicle type (Pickup 1.5T, 6-wheeler 9T, 10-wheeler 16T, Trailer 25T) based on volume/weight | Mandatory | | | |
| 4.6.2 | **Vehicle & Driver Allocation**: Driver name, contact number, vehicle registration number, and e-way bill reference storage | Mandatory | | | |
| 4.6.3 | **Transporter Cost & Rate Tracking**: Vehicle freight rates, demurrage charges, and toll/unloading allowance tracking | Desirable | | | |

---

### Module 5: Service & Advisory Directory

#### 5.1 Service Providers & Skilled Workmen
| # | Feature / Requirement | Mandatory / Desirable | Vendor Status (INC / PAR / EXT / N/A) | Additional Cost | Vendor Notes / Technical Approach |
| :--- | :--- | :--- | :--- | :--- | :--- |
| 5.1.1 | **Workmen / Professional Directory**: Public directory categorized by trade (Masons, Barbenders, Plumbers, Electricians, Painters, Waterproofing contractors) | Mandatory | | | |
| 5.1.2 | **Profile Pages & Experience**: Contact details, service area pincodes, years of experience, portfolio photos, and rate cards | Mandatory | | | |
| 5.1.3 | **Direct Enquiry Routing**: Customer lead submission routed directly to verified workman with admin oversight | Mandatory | | | |

#### 5.2 Expert Advisors
| # | Feature / Requirement | Mandatory / Desirable | Vendor Status (INC / PAR / EXT / N/A) | Additional Cost | Vendor Notes / Technical Approach |
| :--- | :--- | :--- | :--- | :--- | :--- |
| 5.2.1 | **Expert Listing**: Structural engineers, architects, interior designers, soil testers, and green building consultants | Mandatory | | | |
| 5.2.2 | **Consultation Booking / Enquiry**: Form to request site visits, structural drawing vetting, or material estimation | Mandatory | | | |

---

### Module 6: Commercial & Customer Engagement

#### 6.1 Customer Points & Rewards Program
| # | Feature / Requirement | Mandatory / Desirable | Vendor Status (INC / PAR / EXT / N/A) | Additional Cost | Vendor Notes / Technical Approach |
| :--- | :--- | :--- | :--- | :--- | :--- |
| 6.1.1 | **Points Earning Engine**: Rule-based rewards based on spend threshold, repeat orders, or referral milestones | Desirable | | | |
| 6.1.2 | **Points Visibility in Dashboard**: Real-time balance display and redemption against future invoice discounts | Desirable | | | |
| 6.1.3 | **Configurable Rules Engine**: Admin controls for point expiration dates, point conversion value (e.g. 1 point = ₹1), and exclusions | Desirable | | | |

#### 6.2 Category-Wise Discount Management
| # | Feature / Requirement | Mandatory / Desirable | Vendor Status (INC / PAR / EXT / N/A) | Additional Cost | Vendor Notes / Technical Approach |
| :--- | :--- | :--- | :--- | :--- | :--- |
| 6.2.1 | **Centralized Discount Manager**: Percentage-based or flat rupee discounts per category, brand, or SKU | Mandatory | | | |
| 6.2.2 | **Tiered Volume Discounts**: Quantity slab pricing (e.g. 100–500 bags vs 500+ bags) | Mandatory | | | |
| 6.2.3 | **Scheduled Promotions**: Start/end timestamps for festive or seasonal promotional campaigns | Desirable | | | |

#### 6.3 Order Liaisoning & Internal Ops Notes
| # | Feature / Requirement | Mandatory / Desirable | Vendor Status (INC / PAR / EXT / N/A) | Additional Cost | Vendor Notes / Technical Approach |
| :--- | :--- | :--- | :--- | :--- | :--- |
| 6.3.1 | **Internal Order Notes**: Operational notes visible only to internal sales and dispatch staff (supplier quirks, gate timings) | Mandatory | | | |
| 6.3.2 | **Audit Trail**: Timestamped activity logs of who updated price, dispatched order, or approved supplier payment | Mandatory | | | |

---

### Module 7: Content Management System (CMS)

#### 7.1 Blog & Technical Guides
| # | Feature / Requirement | Mandatory / Desirable | Vendor Status (INC / PAR / EXT / N/A) | Additional Cost | Vendor Notes / Technical Approach |
| :--- | :--- | :--- | :--- | :--- | :--- |
| 7.1.1 | **Technical & Industry Blog CMS**: WYSIWYG editor for publishing construction guides (e.g. "How to test cement freshness on site") | Mandatory | | | |
| 7.1.2 | **SEO Metadata Management**: Custom meta titles, descriptions, canonical URLs, and OpenGraph tags per post | Mandatory | | | |
| 7.1.3 | **Category & Tag Taxonomy**: Categorized by structural tips, cost estimation guides, material news, and trends | Mandatory | | | |

#### 7.2 FAQ & Static Page Management
| # | Feature / Requirement | Mandatory / Desirable | Vendor Status (INC / PAR / EXT / N/A) | Additional Cost | Vendor Notes / Technical Approach |
| :--- | :--- | :--- | :--- | :--- | :--- |
| 7.2.1 | **FAQ Manager**: Category-wise FAQs with instant accordion display | Mandatory | | | |
| 7.2.2 | **Static Policy Pages**: Admin-editable About Us, Contact Us, Privacy Policy, Terms & Conditions, Return/Refund Policy | Mandatory | | | |

---

### Module 8: Unified Admin Panel

| # | Feature / Requirement | Mandatory / Desirable | Vendor Status (INC / PAR / EXT / N/A) | Additional Cost | Vendor Notes / Technical Approach |
| :--- | :--- | :--- | :--- | :--- | :--- |
| 8.1 | **Executive Dashboard & KPIs**: Daily GMV, pending quotations count, orders in transit, low stock alerts, revenue summaries | Mandatory | | | |
| 8.2 | **Role-Based Access Control (RBAC)**: Distinct permissions for Super Admin, Sales Executive, Operations Coordinator, and Accounts Manager | Mandatory | | | |
| 8.3 | **Product, SKU & Category Manager**: Bulk CSV upload/download, image uploader, attribute configurator | Mandatory | | | |
| 8.4 | **Quotation Desk**: Dedicated interface to prepare, adjust margins, and dispatch multi-brand comparative quotes | Mandatory | | | |
| 8.5 | **Master Supplier & Yard Directory**: Complete supplier KYC, location coordinates, contact rosters, and credit limits | Mandatory | | | |
| 8.6 | **Logistics & Dispatch Board**: Unified view of daily trucks required, assigned drivers, and pending deliveries | Mandatory | | | |
| 8.7 | **Accounts & Payments Hub**: Ledger of receivables from customers and payables to suppliers | Mandatory | | | |
| 8.8 | **Directory Moderation**: Review and approve/reject listings for workmen and expert advisors | Mandatory | | | |

---

### Module 9: Integrations, Security & Technical Architecture

| # | Feature / Requirement | Mandatory / Desirable | Vendor Status (INC / PAR / EXT / N/A) | Additional Cost | Vendor Notes / Technical Approach |
| :--- | :--- | :--- | :--- | :--- | :--- |
| 9.1 | **WhatsApp Business API**: Direct integration with Gupshup, Twilio, or Meta Cloud API for automated notifications and customer inquiries | Mandatory | | | |
| 9.2 | **Transactional SMS & OTP Gateway**: Integration with Fast2SMS, MSG91, or Twilio for instant OTP delivery | Mandatory | | | |
| 9.3 | **Email Service Integration**: SendGrid, AWS SES, or Postmark for transactional POs, invoices, and alerts | Mandatory | | | |
| 9.4 | **Location & Pincode Services**: Google Maps / OpenStreetMap API for supplier yard-to-site distance and delivery radius checks | Mandatory | | | |
| 9.5 | **Payment Gateway**: Razorpay, Cashfree, or Stripe supporting UPI, NetBanking, NEFT/RTGS virtual accounts, and Corporate Cards | Mandatory | | | |
| 9.6 | **Modern Responsive Web Frontend**: Fast load times (<2s LCP), mobile-first responsive layout (React/Next.js/Vite or equivalent) | Mandatory | | | |
| 9.7 | **Robust Backend & Relational Database**: PostgreSQL/MySQL with ACID transaction support for financial and inventory consistency | Mandatory | | | |
| 9.8 | **Cloud / Linux Hosting Architecture**: Containerized deployment (Docker, AWS/GCP/DigitalOcean) with automated daily backups | Mandatory | | | |
| 9.9 | **Security & Compliance**: SSL/TLS encryption, CSRF protection, SQL injection prevention, rate limiting, and GDPR/data protection compliance | Mandatory | | | |

---

## 5. Commercial Proposal & Cost Breakdown Template

Vendors must provide a detailed breakdown of costs in the table below:

### 5.1 One-Time Development & Setup Costs

| Component | In-Scope Details | Cost (INR / USD) | Estimated Timeline |
| :--- | :--- | :--- | :--- |
| **Phase 1: Discovery & UI/UX Design** | Design system, mobile/desktop wireframes, prototype approvals | | |
| **Phase 2: Customer Web App & Catalogue** | Homepage, catalogue, filters, comparisons, user accounts, OTP | | |
| **Phase 3: Quotation & CRM Engine** | Multi-brand RFQ, admin margin setter, customer PDF generation, WhatsApp triggers | | |
| **Phase 4: Operations, PO & Logistics** | Supplier allocation, PO generator, challan & dispatch tracking, payment status | | |
| **Phase 5: Directories, CMS & Loyalty** | Workmen/Expert directory, Blog, FAQs, discounts & points | | |
| **Phase 6: QA, Integrations & Launch** | Security auditing, payment gateway, WhatsApp API, load testing, cloud deployment | | |
| **Total One-Time Implementation Cost** | **Comprehensive Full-Stack Delivery** | | |

### 5.2 Recurring / Ongoing Costs (Annual / Monthly)

| Item | Billed Frequency | Estimated Cost | Paid To (Vendor / 3rd Party) |
| :--- | :--- | :--- | :--- |
| **Cloud Hosting & Server Infrastructure** | Monthly / Annual | | AWS / GCP / DigitalOcean |
| **WhatsApp Business API Messages** | Usage-based | | Meta / Provider |
| **SMS OTP Service** | Usage-based | | MSG91 / Fast2SMS |
| **Google Maps API** | Usage-based | | Google Cloud |
| **Software Maintenance & SLA Support** | Monthly / Annual | | Vendor |
| **Total Estimated Annual Operating Cost** | | | |

---

## 6. Vendor Evaluation Comparison Scorecard (Procurement Sheet)

*Used by the evaluation committee to compare Vendor proposals side-by-side:*

| Evaluation Criterion | Max Score | Vendor A: _________ | Vendor B: _________ | Vendor C: _________ |
| :--- | :---: | :---: | :---: | :---: |
| **Functional Match Score (Module 1 - 9)** | 35 | | | |
| **Architecture, Tech Stack & Security** | 20 | | | |
| **B2B Construction Domain Fit & Workflows** | 15 | | | |
| **Total Cost of Ownership (Capex + Opex)** | 20 | | | |
| **Delivery Timeline & Team Credentials** | 10 | | | |
| **Total Composite Score** | **100** | | | |
| **Recommendation Status** | — | [ ] Shortlisted [ ] Rejected | [ ] Shortlisted [ ] Rejected | [ ] Shortlisted [ ] Rejected |

---

## 7. Submission Checklist for Vendors

Proposals must include:
1. [ ] Completed Feature Matrix (Columns: Status, Cost, Notes) with zero blanks.
2. [ ] Proposed Technology Stack (Frontend, Backend, Database, Hosting, Cache).
3. [ ] Milestone schedule with sprint deliverables.
4. [ ] Team composition (Lead Architect, Frontend, Backend, UI/UX, QA, PM).
5. [ ] Portfolio of 2–3 relevant e-commerce, B2B procurement, or marketplace platforms.
6. [ ] Post-launch warranty and bug-fix SLA terms (minimum 90 days hypercare).
