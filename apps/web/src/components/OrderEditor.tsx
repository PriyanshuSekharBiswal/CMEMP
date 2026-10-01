import { useState } from "react";
import type { Order } from "../../../../packages/shared/src/types";
import { Modal, Field } from "./UI";
import { api } from "../lib/api";
export function OrderEditor({
  order,
  onClose,
  onSaved,
}: {
  order: Order;
  onClose: () => void;
  onSaved: () => Promise<void>;
}) {
  const [form, setForm] = useState({
      status: order.status,
      vehicle: order.vehicle,
      driver: order.driver,
      paymentStatus: order.paymentStatus,
      paymentReference: order.paymentReference,
      internalNotes: order.internalNotes || "",
    }),
    [error, setError] = useState(""),
    [busy, setBusy] = useState(false);
  const stages = ["Confirmed", "Sourcing", "Dispatched", "Delivered"];
  async function save(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    setError("");
    try {
      await api(`/admin/orders/${order.id}`, "PATCH", form);
      await onSaved();
      onClose();
    } catch (e) {
      setError((e as Error).message);
    } finally {
      setBusy(false);
    }
  }
  return (
    <Modal title={`Manage ${order.id}`} onClose={onClose}>
      <form className="stack" onSubmit={save}>
        <Field label="Order status">
          <select
            value={form.status}
            onChange={(e) =>
              setForm({ ...form, status: e.target.value as Order["status"] })
            }
          >
            {stages.map((s, i) => (
              <option
                key={s}
                disabled={
                  i < stages.indexOf(order.status) ||
                  i > stages.indexOf(order.status) + 1
                }
              >
                {s}
              </option>
            ))}
          </select>
        </Field>
        <Field label="Vehicle / registration">
          <input
            maxLength={80}
            value={form.vehicle}
            onChange={(e) => setForm({ ...form, vehicle: e.target.value })}
          />
        </Field>
        <Field label="Driver name & contact">
          <input
            maxLength={100}
            value={form.driver}
            onChange={(e) => setForm({ ...form, driver: e.target.value })}
          />
        </Field>
        <div className="notice">
          Supplier payment status is a manual record. Saving this form does not
          move money.
        </div>
        <Field label="Supplier payment status">
          <select
            value={form.paymentStatus}
            onChange={(e) =>
              setForm({ ...form, paymentStatus: e.target.value })
            }
          >
            {["Unpaid", "Part-paid", "Paid"].map((s) => (
              <option key={s}>{s}</option>
            ))}
          </select>
        </Field>
        <Field label="Payment reference / confirmation">
          <input
            maxLength={200}
            value={form.paymentReference}
            onChange={(e) =>
              setForm({ ...form, paymentReference: e.target.value })
            }
          />
        </Field>
        <Field label="Internal liaison notes (operations only)">
          <textarea
            maxLength={2000}
            value={form.internalNotes}
            onChange={(e) =>
              setForm({ ...form, internalNotes: e.target.value })
            }
          />
        </Field>
        {error && (
          <p className="error" role="alert">
            {error}
          </p>
        )}
        <button className="button primary" disabled={busy}>
          {busy ? "Saving…" : "Save order update"}
        </button>
      </form>
    </Modal>
  );
}
