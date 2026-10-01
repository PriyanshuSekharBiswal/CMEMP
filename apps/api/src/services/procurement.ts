import type { DB } from "../db/database.js";
import { randomUUID } from "node:crypto";
import type { Quote } from "../../../../packages/shared/src/types.js";
export const now = () => new Date().toISOString();
export const id = (prefix: string) =>
  `${prefix}-${randomUUID().slice(0, 8).toUpperCase()}`;
export function notify(db: DB, userId: string, message: string) {
  db.prepare("INSERT INTO notifications VALUES(?,?,?,?)").run(
    id("N"),
    userId,
    message,
    now(),
  );
}
export function transaction<T>(db: DB, work: () => T): T {
  db.exec("BEGIN IMMEDIATE");
  try {
    const result = work();
    db.exec("COMMIT");
    return result;
  } catch (e) {
    db.exec("ROLLBACK");
    throw e;
  }
}
export function quotesFor(db: DB, requestId: string): Quote[] {
  return db
    .prepare("SELECT * FROM quotes WHERE requestId=? ORDER BY total")
    .all(requestId)
    .map((q) => ({
      ...q,
      items: JSON.parse(q.items as string),
    })) as unknown as Quote[];
}
export function requestsFor(db: DB, user: { id: string; role: string }) {
  return db
    .prepare(
      `SELECT r.*,u.name customerName,u.phone FROM requests r JOIN users u ON u.id=r.customerId ${user.role === "admin" ? "" : "WHERE customerId=?"} ORDER BY createdAt DESC`,
    )
    .all(...(user.role === "admin" ? [] : [user.id]))
    .map((r) => ({
      ...r,
      items: db
        .prepare(
          "SELECT productId,name,brand,unit,qty,gst,rate FROM request_items WHERE requestId=?",
        )
        .all(r.id),
      quotes: quotesFor(db, r.id as string),
    }));
}
export function ordersFor(db: DB, user: { id: string; role: string }) {
  return db
    .prepare(
      `SELECT o.*,r.project,r.address,r.pincode,u.name customerName FROM orders o JOIN requests r ON r.id=o.requestId JOIN users u ON u.id=o.customerId ${user.role === "admin" ? "" : "WHERE o.customerId=?"} ORDER BY o.createdAt DESC`,
    )
    .all(...(user.role === "admin" ? [] : [user.id]))
    .map((o) => {
      const { internalNotes, ...rest } = o;
      return {
        ...rest,
        ...(user.role === "admin" ? { internalNotes } : {}),
        quote: quotesFor(db, o.requestId as string).find(
          (q) => q.id === o.quoteId,
        ),
        events: db
          .prepare(
            "SELECT status,createdAt FROM order_events WHERE orderId=? ORDER BY createdAt,rowid",
          )
          .all(o.id),
      };
    });
}
export function calculate(
  items: { qty: number; rate: number; gst: number }[],
  freight: number,
) {
  const subtotal = items.reduce(
    (sum, i) => sum + Math.round(i.qty * i.rate),
    0,
  );
  const tax = items.reduce(
    (sum, i) => sum + Math.round((Math.round(i.qty * i.rate) * i.gst) / 100),
    0,
  );
  return { subtotal, tax, total: subtotal + tax + freight };
}
