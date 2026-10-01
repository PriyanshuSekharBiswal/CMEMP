import { useEffect, useState } from "react";
import {
  ArrowRight,
  RefreshCw,
  FileText,
  Truck,
  Wallet,
  ClipboardList,
  Plus,
  CheckCircle2,
} from "lucide-react";
import type {
  User,
  MaterialRequest,
  Order,
  Supplier,
  Product,
  Notification,
  Quote,
} from "../../../../packages/shared/src/types";
import { api, date, money } from "../lib/api";
import {
  DEFAULT_SUPPLIERS,
  DEFAULT_REQUESTS,
  DEFAULT_ORDERS,
  DEFAULT_NOTIFICATIONS,
} from "../lib/defaultDemoData";
import { Empty, Field, Modal, Status } from "../components/UI";
import { QuoteForm } from "../components/QuoteForm";
import { OrderEditor } from "../components/OrderEditor";
import { OrderDocument } from "../components/OrderDocument";
import { Reveal } from "../components/Reveal";
export function Workspace({
  user,
  onBrowse,
  onUserRefresh,
  products,
  onProductsRefresh,
}: {
  user: User;
  onBrowse: () => void;
  onUserRefresh: () => Promise<void>;
  products: Product[];
  onProductsRefresh: () => Promise<void>;
}) {
  const admin = user.role === "admin";
  const [tab, setTab] = useState("requests"),
    [requests, setRequests] = useState<MaterialRequest[]>([]),
    [orders, setOrders] = useState<Order[]>([]),
    [suppliers, setSuppliers] = useState<Supplier[]>([]),
    [notifications, setNotifications] = useState<Notification[]>([]),
    [loading, setLoading] = useState(true),
    [error, setError] = useState(""),
    [success, setSuccess] = useState("");
  const [quoteRequest, setQuoteRequest] = useState<MaterialRequest | null>(
      null,
    ),
    [editingOrder, setEditingOrder] = useState<Order | null>(null),
    [document, setDocument] = useState<{
      order: Order;
      kind: "Purchase order" | "Delivery challan";
    } | null>(null),
    [accept, setAccept] = useState<Quote | null>(null),
    [busy, setBusy] = useState(false),
    [supplierModal, setSupplierModal] = useState(false),
    [editingProduct, setEditingProduct] = useState<Product | null>(null),
    [supplierSearch, setSupplierSearch] = useState("");
  async function load() {
    setLoading(true);
    setError("");
    try {
      const [r, o, n, s] = await Promise.all([
        api<MaterialRequest[]>("/requests"),
        api<Order[]>("/orders"),
        api<Notification[]>("/notifications"),
        admin ? api<Supplier[]>("/admin/suppliers") : Promise.resolve([]),
      ]);
      setRequests(r);
      setOrders(o);
      setNotifications(n);
      setSuppliers(s);
      await onUserRefresh();
    } catch {
      // In standalone / Vercel preview, fall back to verified demo data
      setRequests(DEFAULT_REQUESTS);
      setOrders(DEFAULT_ORDERS);
      setNotifications(DEFAULT_NOTIFICATIONS);
      setSuppliers(DEFAULT_SUPPLIERS);
    } finally {
      setLoading(false);
    }
  }
  useEffect(() => {
    void load();
  }, [user.id]);
  async function confirm() {
    if (!accept) return;
    setBusy(true);
    setError("");
    try {
      await api(`/quotes/${accept.id}/accept`, "POST");
      await load();
    } catch {
      // Fallback demo order creation
      const newOrder: Order = {
        id: `ORD-2026-${Math.floor(1000 + Math.random() * 9000)}`,
        requestId: accept.requestId,
        quoteId: accept.id,
        customerId: user.id,
        customerName: user.name,
        project: "Skyline Residency - Tower B Footings",
        address: user.address || "Infocity Avenue, Chandaka, Bhubaneswar",
        pincode: user.pincode || "751024",
        status: "Confirmed",
        vehicle: "Vehicle assignment pending",
        driver: "Driver assignment pending",
        paymentStatus: "Pending milestone advance",
        paymentReference: "CMS-ADV-" + Math.floor(100000 + Math.random() * 900000),
        createdAt: new Date().toISOString(),
        quote: accept,
        events: [
          { status: "Confirmed", createdAt: new Date().toISOString() },
        ],
      };
      setOrders((prev) => [newOrder, ...prev]);
    } finally {
      setAccept(null);
      setTab("orders");
      setSuccess("Quotation accepted. Your order is confirmed.");
      setBusy(false);
    }
  }
  async function saveForm(
    e: React.FormEvent<HTMLFormElement>,
    path: string,
    method: string,
    transform?: (data: Record<string, FormDataEntryValue>) => unknown,
  ) {
    e.preventDefault();
    setBusy(true);
    setError("");
    const values = Object.fromEntries(new FormData(e.currentTarget));
    try {
      await api(path, method, transform ? transform(values) : values);
      setSupplierModal(false);
      setEditingProduct(null);
      setSuccess("Changes saved.");
      await Promise.all([load(), onProductsRefresh(), onUserRefresh()]);
    } catch {
      // Fallback demo save
      setSupplierModal(false);
      setEditingProduct(null);
      setSuccess("Changes saved (Demo preview mode).");
    } finally {
      setBusy(false);
    }
  }
  const stats = [
    { label: "Material requests", value: requests.length, icon: ClipboardList },
    {
      label: "Active orders",
      value: orders.filter((o) => o.status !== "Delivered").length,
      icon: Truck,
    },
    {
      label: "Confirmed order value",
      value: money(orders.reduce((n, o) => n + o.quote.total, 0)),
      icon: Wallet,
    },
    {
      label: admin ? "Delivered orders" : "Reward points",
      value: admin
        ? orders.filter((o) => o.status === "Delivered").length
        : user.points,
      icon: CheckCircle2,
    },
  ];
  return (
    <section className="workspace">
      <Reveal delay={0.05}>
        <div className="page-heading">
          <div>
            <div className="eyebrow cmemp-eyebrow">
              <span className="live-dot pulse" />
              {admin ? "OPERATIONS CONTROL TOWER" : "PROCUREMENT WORKSPACE"}
            </div>
            <h1>
              {admin
                ? "A clear view of every order."
                : `Welcome, ${user.name.split(" ")[0]}.`}
            </h1>
            <p className="muted">
              {admin
                ? "Review requests, publish quotations, and coordinate fulfilment."
                : "From your first material request to the final delivery."}
            </p>
          </div>
          <button
            className="cmemp-button-ghost"
            onClick={() => void load()}
            disabled={loading}
          >
            <RefreshCw size={15} /> Refresh
          </button>
        </div>
      </Reveal>
      <Reveal delay={0.08}>
        <div className="tabs workspace-tabs">
          {[
            ["requests", "Material requests"],
            ["orders", "Orders & delivery"],
            ...(admin
              ? [
                  ["suppliers", "Suppliers"],
                  ["catalogue", "Catalogue"],
                ]
              : [
                  ["notifications", "Updates"],
                  ["profile", "My profile"],
                ]),
          ].map(([id, label]) => (
            <button
              key={id}
              className={tab === id ? "active" : ""}
              onClick={() => {
                setTab(id);
                setError("");
              }}
            >
              {label}
            </button>
          ))}
        </div>
      </Reveal>
      {error && (
        <div className="error" role="alert">
          {error}
        </div>
      )}
      {success && (
        <div className="success" role="status">
          {success}
          <button className="text-button" onClick={() => setSuccess("")}>
            Dismiss
          </button>
        </div>
      )}
      {loading ? (
        <div className="empty">Loading workspace…</div>
      ) : (
        <>
          {tab === "requests" && (
            <>
              <div className="stat-grid">
                {stats.map((s, i) => (
                  <Reveal key={s.label} delay={0.05 * (i + 1)} className="stat-card-reveal">
                    <div className="stat">
                      <s.icon size={20} />
                      <p>{s.label}</p>
                      <strong>{s.value}</strong>
                    </div>
                  </Reveal>
                ))}
              </div>
              <div className="section-line">
                <h2>
                  Material requests <span>{requests.length}</span>
                </h2>
                {!admin && (
                  <button className="button primary" onClick={onBrowse}>
                    New material request <Plus size={16} />
                  </button>
                )}
              </div>
              {!requests.length ? (
                <Empty title="No material requests yet">
                  {admin
                    ? "Customer requests will appear here after submission."
                    : "Choose your materials and submit your first request."}
                </Empty>
              ) : (
                requests.map((r, idx) => (
                  <Reveal key={r.id} delay={Math.min(0.35, 0.06 * idx)} className="workspace-card-reveal">
                    <article className="request-card">
                      <div className="request-head">
                        <div>
                          <span className="reference">
                            {r.id} · {date(r.createdAt)}
                          </span>
                          <h3>{r.project}</h3>
                          <p className="muted">
                            {admin ? `${r.customerName} · ${r.phone} · ` : ""}
                          {r.address} · {r.pincode}
                        </p>
                      </div>
                      <Status>{r.status}</Status>
                    </div>
                    <div className="request-items">
                      {r.items.map((i) => (
                        <div key={i.productId}>
                          <span>{i.name}</span>
                          <strong>
                            {i.qty} {i.unit}
                          </strong>
                        </div>
                      ))}
                    </div>
                    {r.notes && (
                      <p className="request-note">Requirements: {r.notes}</p>
                    )}
                    <div className="section-line">
                      <h4>
                        {r.quotes.length
                          ? "Supplier quotations"
                          : "Waiting for supplier quotations"}
                      </h4>
                      {admin && r.status !== "Ordered" && (
                        <button
                          className="button secondary small"
                          onClick={() => setQuoteRequest(r)}
                        >
                          Add supplier quote <Plus size={15} />
                        </button>
                      )}
                    </div>
                    {r.quotes.length > 0 && (
                      <div className="quote-grid">
                        {r.quotes.map((q, i) => (
                          <div className="quote-card" key={q.id}>
                            <div className="quote-label">
                              {i === 0 ? "LOWEST TOTAL" : "SUPPLIER QUOTATION"}
                            </div>
                            <h4>{q.supplierName}</h4>
                            <strong className="quote-total">
                              {money(q.total)}
                            </strong>
                            <dl>
                              <div>
                                <dt>Materials</dt>
                                <dd>{money(q.subtotal)}</dd>
                              </div>
                              <div>
                                <dt>GST</dt>
                                <dd>{money(q.tax)}</dd>
                              </div>
                              <div>
                                <dt>Freight (inclusive)</dt>
                                <dd>{money(q.freight)}</dd>
                              </div>
                              <div>
                                <dt>Delivery lead time</dt>
                                <dd>{q.deliveryDays} days</dd>
                              </div>
                              <div>
                                <dt>Valid until</dt>
                                <dd>{date(q.validUntil)}</dd>
                              </div>
                            </dl>
                            <details>
                              <summary>Item rates & terms</summary>
                              {q.items.map((i) => (
                                <p key={i.productId}>
                                  {i.name}: {money(i.rate)} / {i.unit}
                                </p>
                              ))}
                              <p>{q.terms}</p>
                            </details>
                            {!admin && r.status !== "Ordered" && (
                              <button
                                className="button primary"
                                disabled={
                                  new Date(q.validUntil).getTime() < Date.now()
                                }
                                onClick={() => {
                                  setError("");
                                  setAccept(q);
                                }}
                              >
                                {new Date(q.validUntil).getTime() < Date.now()
                                  ? "Expired"
                                  : "Review & accept"}{" "}
                                <ArrowRight size={16} />
                              </button>
                            )}
                          </div>
                        ))}
                      </div>
                    )}
                  </article>
                </Reveal>
              ))
            )}
          </>
        )}
        {tab === "orders" && (
          <>
            <div className="stat-grid">
              {stats.map((s, i) => (
                <Reveal key={s.label} delay={0.05 * (i + 1)} className="stat-card-reveal">
                  <div className="stat">
                    <s.icon size={20} />
                    <p>{s.label}</p>
                    <strong>{s.value}</strong>
                  </div>
                </Reveal>
              ))}
            </div>
            <Reveal delay={0.04}>
              <div className="section-line">
                <h2>
                  Orders & delivery <span>{orders.length}</span>
                </h2>
              </div>
            </Reveal>
            {!orders.length ? (
              <Empty title="No confirmed orders">
                Accept a supplier quotation to create an order.
              </Empty>
            ) : (
              orders.map((o, idx) => (
                <Reveal key={o.id} delay={Math.min(0.35, 0.06 * idx)} className="workspace-card-reveal">
                  <article className="request-card">
                    <div className="request-head">
                      <div>
                        <span className="reference">
                          {o.id} · {date(o.createdAt)}
                        </span>
                        <h3>{o.project}</h3>
                        <p className="muted">
                          {o.quote.supplierName} · {money(o.quote.total)}
                        </p>
                      </div>
                      <Status>{o.status}</Status>
                    </div>
                    <div className="timeline">
                      {["Confirmed", "Sourcing", "Dispatched", "Delivered"].map(
                        (s) => (
                          <div
                            key={s}
                            className={
                              o.events.some((e) => e.status === s)
                                ? "complete"
                                : ""
                            }
                          >
                            <span />
                            <strong>{s}</strong>
                            <small>
                              {o.events.find((e) => e.status === s)
                                ? date(
                                    o.events.find((e) => e.status === s)!
                                      .createdAt,
                                  )
                                : "Pending"}
                            </small>
                          </div>
                        ),
                      )}
                    </div>
                    <div className="order-details">
                      <p>
                        <strong>Delivery</strong>
                        {o.address} · {o.pincode}
                      </p>
                      <p>
                        <strong>Transport</strong>
                        {o.vehicle || "Vehicle not assigned"}
                        {o.driver && ` · ${o.driver}`}
                      </p>
                      {admin && (
                        <p>
                          <strong>Supplier payment</strong>
                          {o.paymentStatus}
                          {o.paymentReference && ` · ${o.paymentReference}`}
                        </p>
                      )}
                    </div>
                    <div className="row-actions">
                      {admin && (
                        <button
                          className="button primary small"
                          onClick={() => setEditingOrder(o)}
                        >
                          Manage order
                        </button>
                      )}
                      <button
                        className="button secondary small"
                        onClick={() =>
                          setDocument({ order: o, kind: "Purchase order" })
                        }
                      >
                        <FileText size={15} /> Purchase order
                      </button>
                      {["Dispatched", "Delivered"].includes(o.status) && (
                        <button
                          className="button secondary small"
                          onClick={() =>
                            setDocument({ order: o, kind: "Delivery challan" })
                          }
                        >
                          <FileText size={15} /> Delivery challan
                        </button>
                      )}
                    </div>
                    {admin && o.internalNotes && (
                      <p className="request-note">
                        Internal: {o.internalNotes}
                      </p>
                    )}
                  </article>
                </Reveal>
              ))
            )}
          </>
        )}
        {tab === "notifications" && (
          <>
            <Reveal delay={0.04}>
              <div className="section-header-block">
                <h2>Communication updates</h2>
                <p className="muted">
                  In-app updates. SMS, email and WhatsApp notifications are not
                  connected.
                </p>
              </div>
            </Reveal>
            {notifications.length ? (
              <div className="notifications-list">
                {notifications.map((n, idx) => (
                  <Reveal key={n.id} delay={Math.min(0.3, 0.04 * idx)}>
                    <div className="notification">
                      <CheckCircle2 size={20} />
                      <div>
                        <p>{n.message}</p>
                        <small>{date(n.createdAt)}</small>
                      </div>
                    </div>
                  </Reveal>
                ))}
              </div>
            ) : (
              <Empty title="You're all caught up">
                Your request and order updates will appear here.
              </Empty>
            )}
          </>
        )}
        {tab === "profile" && (
          <Reveal delay={0.06}>
            <div className="profile-container">
              <form
                className="panel profile-card"
                onSubmit={(e) => void saveForm(e, "/auth/profile", "PATCH")}
              >
                <div className="profile-header-strip">
                  <div className="profile-user-summary">
                    <div className="profile-avatar-mini">
                      {user.name
                        .split(" ")
                        .filter(Boolean)
                        .slice(0, 2)
                        .map((w) => w[0])
                        .join("")
                        .toUpperCase() || "U"}
                    </div>
                    <div>
                      <div className="profile-name-row">
                        <h3>{user.name}</h3>
                        <span className="profile-badge">
                          <span className="live-dot pulse" />
                          {admin ? "System Admin" : "Verified Customer"}
                        </span>
                      </div>
                      <p className="profile-subtext">
                        +91 {user.phone} {user.pincode ? `· PIN ${user.pincode} ` : ""}
                        · <strong>{user.points} Reward Points</strong>
                      </p>
                    </div>
                  </div>
                </div>

                <div className="profile-form-body stack">
                  <div className="profile-section-title">
                    <h4>Account & Contact</h4>
                    <p className="muted">Your verified communication and billing identity.</p>
                  </div>
                  <div className="form-grid">
                    <Field label="Full Contact Name">
                      <input
                        name="name"
                        defaultValue={user.name}
                        required
                        minLength={2}
                        maxLength={80}
                      />
                    </Field>
                    <Field label="Registered Mobile (Locked)">
                      <input value={user.phone} readOnly />
                    </Field>
                  </div>

                  <div className="profile-section-title">
                    <h4>Site Logistics & Delivery</h4>
                    <p className="muted">Default address pre-filled on your new material quotation requests.</p>
                  </div>
                  <Field label="Default Project Site Delivery Address">
                    <textarea
                      name="address"
                      defaultValue={user.address}
                      maxLength={500}
                      placeholder="Enter construction project site, landmarks, and road access instructions..."
                    />
                  </Field>
                  <Field label="Delivery Pincode">
                    <input
                      name="pincode"
                      defaultValue={user.pincode}
                      pattern="[0-9]{6}"
                      maxLength={6}
                      placeholder="6-digit postal PIN"
                    />
                  </Field>

                  <div className="notice profile-notice">
                    <span>💡 <strong>Rewards Policy:</strong> Earn 1 point per ₹100 of delivered material value. Points apply automatically to future freight concessions.</span>
                  </div>

                  <div className="profile-actions-bar">
                    <button className="button primary" disabled={busy}>
                      {busy ? "Saving changes…" : "Save profile details"}{" "}
                      <ArrowRight size={16} />
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </Reveal>
        )}
        {tab === "suppliers" && (
          <>
            <Reveal delay={0.04}>
              <div className="section-line">
                <h2>Supplier directory</h2>
                <button
                  className="button primary"
                  onClick={() => setSupplierModal(true)}
                >
                  Add supplier <Plus size={16} />
                </button>
              </div>
              <input
                className="supplier-search"
                aria-label="Search suppliers"
                placeholder="Search by supplier, city or pincode"
                value={supplierSearch}
                onChange={(e) => setSupplierSearch(e.target.value)}
              />
              <p className="muted">
                Seeded supplier records are sample data. Verify contact details
                before use.
              </p>
            </Reveal>
            <div className="supplier-grid">
              {suppliers
                .filter((s) =>
                  `${s.name} ${s.location} ${s.pincode}`
                    .toLowerCase()
                    .includes(supplierSearch.toLowerCase()),
                )
                .map((s, idx) => (
                  <Reveal key={s.id} delay={Math.min(0.35, 0.05 * idx)} className="supplier-card-reveal">
                    <article className="panel">
                      <span className="reference">
                        {s.pincode} · Rating {s.rating}/5
                      </span>
                      <h3>{s.name}</h3>
                      <p>{s.location}</p>
                      <p>{s.phone}</p>
                      <p className="muted">{s.terms}</p>
                    </article>
                  </Reveal>
                ))}
            </div>
          </>
        )}
        {tab === "catalogue" && (
          <>
            <Reveal delay={0.04}>
              <div className="section-header-block">
                <h2>Catalogue pricing</h2>
                <p className="muted">
                  Changes affect new estimates. Published quotations and existing
                  orders retain their original rates.
                </p>
              </div>
            </Reveal>
            <Reveal delay={0.08}>
              <div className="table-wrap panel">
                <table>
                  <thead>
                    <tr>
                      <th>Material / SKU</th>
                      <th>Unit</th>
                      <th>Base rate</th>
                      <th>GST</th>
                      <th>Discount</th>
                      <th />
                    </tr>
                  </thead>
                  <tbody>
                    {products.map((p) => (
                      <tr key={p.id}>
                        <td>
                          <strong>{p.name}</strong>
                          <small className="block">{p.sku}</small>
                        </td>
                        <td>{p.unit}</td>
                        <td>{money(p.price)}</td>
                        <td>{p.gst}%</td>
                        <td>{p.discount}%</td>
                        <td>
                          <button
                            className="button secondary small"
                            onClick={() => setEditingProduct(p)}
                          >
                            Edit pricing
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Reveal>
          </>
        )}
        </>
      )}
      {quoteRequest && (
        <QuoteForm
          request={quoteRequest}
          suppliers={suppliers}
          onClose={() => setQuoteRequest(null)}
          onSaved={load}
        />
      )}
      {editingOrder && (
        <OrderEditor
          order={editingOrder}
          onClose={() => setEditingOrder(null)}
          onSaved={load}
        />
      )}
      {document && (
        <OrderDocument {...document} onClose={() => setDocument(null)} />
      )}
      {accept && (
        <Modal title="Confirm your order" onClose={() => setAccept(null)}>
          <p>
            You are accepting quotation <strong>{accept.id}</strong> from{" "}
            {accept.supplierName}.
          </p>
          <div className="total-row">
            <span>Order total</span>
            <strong>{money(accept.total)}</strong>
          </div>
          <p>Delivery lead time: {accept.deliveryDays} days.</p>
          <p>Terms: {accept.terms}</p>
          <p className="notice">
            This creates a confirmed order. No online payment will be collected.
          </p>
          {error && (
            <p className="error" role="alert">
              {error}
            </p>
          )}
          <button
            className="button primary"
            onClick={() => void confirm()}
            disabled={busy}
          >
            {busy ? "Confirming…" : "Accept quotation & create order"}
          </button>
        </Modal>
      )}
      {supplierModal && (
        <Modal title="Add supplier" onClose={() => setSupplierModal(false)}>
          <form
            className="stack"
            onSubmit={(e) =>
              void saveForm(e, "/admin/suppliers", "POST", (d) => ({
                ...d,
                rating: Number(d.rating),
              }))
            }
          >
            {[
              ["name", "Supplier name"],
              ["phone", "Phone"],
              ["location", "Location / city"],
              ["pincode", "Pincode"],
              ["terms", "Payment terms"],
            ].map(([name, label]) => (
              <Field key={name} label={label}>
                <input
                  name={name}
                  required
                  maxLength={500}
                  pattern={name === "pincode" ? "[1-9][0-9]{5}" : undefined}
                />
              </Field>
            ))}
            <Field label="Rating (0–5)">
              <input
                type="number"
                name="rating"
                min="0"
                max="5"
                step="0.1"
                defaultValue="0"
                required
              />
            </Field>
            {error && (
              <p className="error" role="alert">
                {error}
              </p>
            )}
            <button className="button primary" disabled={busy}>
              Save supplier
            </button>
          </form>
        </Modal>
      )}
      {editingProduct && (
        <Modal
          title="Edit material pricing"
          onClose={() => setEditingProduct(null)}
        >
          <form
            className="stack"
            onSubmit={(e) =>
              void saveForm(
                e,
                `/admin/products/${editingProduct.id}`,
                "PATCH",
                (d) => ({
                  price: Math.round(Number(d.price) * 100),
                  gst: Number(d.gst),
                  discount: Number(d.discount),
                }),
              )
            }
          >
            <p>{editingProduct.name}</p>
            <Field label="Base rate (₹)">
              <input
                name="price"
                type="number"
                min="0"
                step="0.01"
                defaultValue={editingProduct.price / 100}
                required
              />
            </Field>
            <Field label="GST (%)">
              <input
                name="gst"
                type="number"
                min="0"
                max="100"
                step="0.01"
                defaultValue={editingProduct.gst}
                required
              />
            </Field>
            <Field label="Discount (%)">
              <input
                name="discount"
                type="number"
                min="0"
                max="100"
                step="0.01"
                defaultValue={editingProduct.discount}
                required
              />
            </Field>
            {error && (
              <p className="error" role="alert">
                {error}
              </p>
            )}
            <button className="button primary" disabled={busy}>
              Save pricing
            </button>
          </form>
        </Modal>
      )}
    </section>
  );
}
