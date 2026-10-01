import { useState } from "react";
import type {
  MaterialRequest,
  Supplier,
} from "../../../../packages/shared/src/types";
import { Modal, Field } from "./UI";
import { api, money } from "../lib/api";
export function QuoteForm({
  request,
  suppliers,
  onClose,
  onSaved,
}: {
  request: MaterialRequest;
  suppliers: Supplier[];
  onClose: () => void;
  onSaved: () => Promise<void>;
}) {
  const [supplierId, setSupplierId] = useState(suppliers[0]?.id || ""),
    [rates, setRates] = useState<Record<string, number>>(
      Object.fromEntries(request.items.map((i) => [i.productId, i.rate / 100])),
    ),
    [freight, setFreight] = useState(0),
    [days, setDays] = useState(3),
    [valid, setValid] = useState(7),
    [terms, setTerms] = useState(suppliers[0]?.terms || ""),
    [busy, setBusy] = useState(false),
    [error, setError] = useState("");
  const total = request.items.reduce(
    (sum, i) => {
      const line = Math.round(rates[i.productId] * 100 * i.qty);
      return sum + line + Math.round((line * i.gst) / 100);
    },
    Math.round(freight * 100),
  );
  async function save(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    setError("");
    try {
      await api(`/admin/requests/${request.id}/quotes`, "POST", {
        supplierId,
        rates: request.items.map((i) => ({
          productId: i.productId,
          rate: Math.round(rates[i.productId] * 100),
        })),
        freight: Math.round(freight * 100),
        deliveryDays: days,
        validDays: valid,
        terms,
      });
      await onSaved();
      onClose();
    } catch (e) {
      setError((e as Error).message);
    } finally {
      setBusy(false);
    }
  }
  return (
    <Modal
      title={`Add supplier quotation · ${request.id}`}
      onClose={onClose}
      wide
    >
      <form className="stack" onSubmit={save}>
        <div className="notice">
          Record rates received from the supplier. Publishing makes this
          quotation available for the customer to accept.
        </div>
        <Field label="Supplier">
          <select
            required
            value={supplierId}
            onChange={(e) => {
              setSupplierId(e.target.value);
              setTerms(
                suppliers.find((s) => s.id === e.target.value)?.terms || "",
              );
            }}
          >
            {suppliers.map((s) => (
              <option key={s.id} value={s.id}>
                {s.name} · {s.pincode}
              </option>
            ))}
          </select>
        </Field>
        {request.items.map((i) => (
          <Field
            key={i.productId}
            label={`${i.name} · ${i.qty} ${i.unit} · GST ${i.gst}%`}
          >
            <input
              aria-label={`Rate for ${i.name}`}
              type="number"
              min="0"
              max="100000000"
              step="0.01"
              required
              value={rates[i.productId]}
              onChange={(e) =>
                setRates({ ...rates, [i.productId]: Number(e.target.value) })
              }
            />
          </Field>
        ))}
        <div className="form-grid">
          <Field label="Freight, inclusive of applicable tax (₹)">
            <input
              type="number"
              min="0"
              step="0.01"
              required
              value={freight}
              onChange={(e) => setFreight(Number(e.target.value))}
            />
          </Field>
          <Field label="Delivery lead time (days)">
            <input
              type="number"
              min="1"
              max="365"
              required
              value={days}
              onChange={(e) => setDays(Number(e.target.value))}
            />
          </Field>
          <Field label="Quote valid for (days)">
            <input
              type="number"
              min="1"
              max="90"
              required
              value={valid}
              onChange={(e) => setValid(Number(e.target.value))}
            />
          </Field>
        </div>
        <Field label="Payment terms">
          <textarea
            required
            maxLength={500}
            value={terms}
            onChange={(e) => setTerms(e.target.value)}
          />
        </Field>
        <div className="total-row">
          <span>Total including GST & freight</span>
          <strong>{money(total)}</strong>
        </div>
        {error && (
          <p className="error" role="alert">
            {error}
          </p>
        )}
        <button className="button primary" disabled={busy || !suppliers.length}>
          {busy ? "Publishing…" : "Publish quotation"}
        </button>
      </form>
    </Modal>
  );
}
