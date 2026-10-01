import { useState } from "react";
import { Trash2 } from "lucide-react";
import type { Product, User } from "../../../../packages/shared/src/types";
import { Modal, Field, Empty } from "./UI";
import { api, money } from "../lib/api";
export function MaterialList({
  products,
  cart,
  setCart,
  user,
  onClose,
  onLogin,
  onSubmitted,
}: {
  products: Product[];
  cart: Record<string, number>;
  setCart: (cart: Record<string, number>) => void;
  user: User | null;
  onClose: () => void;
  onLogin: () => void;
  onSubmitted: () => void;
}) {
  const [project, setProject] = useState(""),
    [address, setAddress] = useState(user?.address || ""),
    [pincode, setPincode] = useState(user?.pincode || ""),
    [notes, setNotes] = useState(""),
    [busy, setBusy] = useState(false),
    [error, setError] = useState("");
  const items = products.filter((p) => p.id in cart);
  const subtotal = items.reduce(
    (sum, p) => sum + Math.round(p.price * (1 - p.discount / 100) * cart[p.id]),
    0,
  );
  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    setError("");
    try {
      await api("/requests", "POST", {
        project,
        address,
        pincode,
        notes,
        items: items.map((p) => ({ productId: p.id, qty: cart[p.id] })),
      });
      setCart({});
      onSubmitted();
    } catch (e) {
      setError((e as Error).message);
    } finally {
      setBusy(false);
    }
  }
  return (
    <Modal title="Your material list" onClose={onClose} wide>
      {!items.length ? (
        <Empty title="Start with your materials">
          Add materials from the catalogue to request a quotation.
        </Empty>
      ) : (
        <form className="stack" onSubmit={submit}>
          {items.map((p) => (
            <div className="cart-row" key={p.id}>
              <div>
                <strong>{p.name}</strong>
                <p className="muted">
                  {money(Math.round(p.price * (1 - p.discount / 100)))} /{" "}
                  {p.unit}
                </p>
              </div>
              <label className="quantity">
                <input
                  aria-label={`Quantity for ${p.name}`}
                  type="number"
                  min="0.01"
                  max="100000"
                  step="0.01"
                  required
                  value={cart[p.id]}
                  onChange={(e) =>
                    setCart({ ...cart, [p.id]: Number(e.target.value) })
                  }
                />
                <span>{p.unit}</span>
              </label>
              <button
                type="button"
                className="icon-button"
                aria-label={`Remove ${p.name}`}
                onClick={() => {
                  const next = { ...cart };
                  delete next[p.id];
                  setCart(next);
                }}
              >
                <Trash2 size={18} />
              </button>
            </div>
          ))}
          <div className="total-row">
            <span>Indicative subtotal</span>
            <strong>{money(subtotal)}</strong>
          </div>
          <p className="muted">
            GST and delivery will be itemised in supplier quotations. Submitting
            a request does not place an order.
          </p>
          {!user ? (
            <button type="button" className="button primary" onClick={onLogin}>
              Sign in to request a quotation
            </button>
          ) : user.role === "admin" ? (
            <div className="notice">
              Sign in with a customer account to submit a material request.
            </div>
          ) : (
            <>
              <Field label="Project / site name">
                <input
                  required
                  maxLength={100}
                  value={project}
                  onChange={(e) => setProject(e.target.value)}
                  placeholder="e.g. Green Valley residence"
                />
              </Field>
              <Field label="Delivery address">
                <textarea
                  required
                  maxLength={500}
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder="Site address, city and state"
                />
              </Field>
              <div className="form-grid">
                <Field label="Delivery pincode">
                  <input
                    required
                    pattern="[1-9][0-9]{5}"
                    maxLength={6}
                    inputMode="numeric"
                    value={pincode}
                    onChange={(e) => setPincode(e.target.value)}
                  />
                </Field>
                <Field label="Requirements / notes">
                  <input
                    maxLength={2000}
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder="Delivery timing, specifications…"
                  />
                </Field>
              </div>
              {error && (
                <p className="error" role="alert">
                  {error}
                </p>
              )}
              <button className="button primary" disabled={busy}>
                {busy ? "Submitting…" : "Submit material request"}
              </button>
            </>
          )}
        </form>
      )}
    </Modal>
  );
}
