import { Router } from "express";
import { z } from "zod";
import type { DB } from "../db/database.js";
import { requireAdmin, requireUser } from "../middleware/auth.js";
import {
  calculate,
  id,
  now,
  notify,
  ordersFor,
  requestsFor,
  transaction,
} from "../services/procurement.js";
const text = z.string().trim().min(1).max(500);
const money = z.number().int().min(0).max(10000000000);
const statuses = ["Confirmed", "Sourcing", "Dispatched", "Delivered"] as const;
export function procurementRoutes(db: DB) {
  const router = Router();
  router.get("/products", (_req, res) =>
    res.json(
      db
        .prepare("SELECT * FROM products WHERE active=1")
        .all()
        .map((p) => ({ ...p, specs: JSON.parse(String(p.specs)) })),
    ),
  );
  router.use(requireUser);
  router.get("/requests", (req, res) => res.json(requestsFor(db, req.user!)));
  router.get("/orders", (req, res) => res.json(ordersFor(db, req.user!)));
  router.get("/notifications", (req, res) =>
    res.json(
      db
        .prepare(
          "SELECT id,message,createdAt FROM notifications WHERE userId=? ORDER BY createdAt DESC LIMIT 50",
        )
        .all(req.user!.id),
    ),
  );
  router.post("/requests", (req, res) => {
    if (req.user!.role !== "customer") {
      res
        .status(403)
        .json({ error: "Sign in as a customer to request materials." });
      return;
    }
    const input = z
      .object({
        project: text,
        address: text,
        pincode: z.string().regex(/^[1-9]\d{5}$/),
        notes: z.string().max(2000).default(""),
        items: z
          .array(
            z.object({
              productId: text,
              qty: z.number().positive().max(100000),
            }),
          )
          .min(1)
          .max(50),
      })
      .parse(req.body);
    if (
      new Set(input.items.map((i) => i.productId)).size !== input.items.length
    ) {
      res.status(400).json({ error: "Duplicate materials are not allowed." });
      return;
    }
    const products = input.items.map((i) =>
      db
        .prepare("SELECT * FROM products WHERE id=? AND active=1")
        .get(i.productId),
    );
    if (products.some((p) => !p)) {
      res
        .status(400)
        .json({ error: "A selected material is no longer available." });
      return;
    }
    const requestId = id("RFQ");
    transaction(db, () => {
      db.prepare(
        "INSERT INTO requests(id,customerId,project,address,pincode,notes,createdAt) VALUES(?,?,?,?,?,?,?)",
      ).run(
        requestId,
        req.user!.id,
        input.project,
        input.address,
        input.pincode,
        input.notes,
        now(),
      );
      input.items.forEach((i, index) => {
        const p = products[index]!;
        db.prepare("INSERT INTO request_items VALUES(?,?,?,?,?,?,?,?)").run(
          requestId,
          p.id,
          p.name,
          p.brand,
          p.unit,
          i.qty,
          p.gst,
          Math.round(Number(p.price) * (1 - Number(p.discount) / 100)),
        );
      });
      notify(
        db,
        req.user!.id,
        `${requestId}: Your material request has been received.`,
      );
    });
    res.status(201).json({ id: requestId });
  });
  router.post("/quotes/:quoteId/accept", (req, res) => {
    const quote = db
      .prepare(
        "SELECT q.*,r.customerId,r.status FROM quotes q JOIN requests r ON q.requestId=r.id WHERE q.id=?",
      )
      .get(String(req.params.quoteId));
    if (!quote || quote.customerId !== req.user!.id) {
      res.status(404).json({ error: "Quotation not found." });
      return;
    }
    if (quote.status === "Ordered") {
      res.status(409).json({ error: "This request already has an order." });
      return;
    }
    if (new Date(String(quote.validUntil)).getTime() < Date.now()) {
      res
        .status(409)
        .json({ error: "Quotation has expired. Request an updated quote." });
      return;
    }
    const orderId = id("ORD");
    transaction(db, () => {
      db.prepare(
        "INSERT INTO orders(id,requestId,quoteId,customerId,createdAt) VALUES(?,?,?,?,?)",
      ).run(orderId, quote.requestId, quote.id, req.user!.id, now());
      db.prepare("UPDATE requests SET status='Ordered' WHERE id=?").run(
        quote.requestId,
      );
      db.prepare("INSERT INTO order_events VALUES(?,?,?,?)").run(
        id("EV"),
        orderId,
        "Confirmed",
        now(),
      );
      notify(
        db,
        req.user!.id,
        `${orderId}: Quote accepted. Your order is confirmed.`,
      );
    });
    res.status(201).json({ id: orderId });
  });
  router.use("/admin", requireAdmin);
  router.get("/admin/suppliers", (_req, res) =>
    res.json(db.prepare("SELECT * FROM suppliers ORDER BY name").all()),
  );
  router.post("/admin/suppliers", (req, res) => {
    const input = z
      .object({
        name: text,
        phone: z.string().regex(/^\+?[\d\s-]{10,18}$/),
        location: text,
        pincode: z.string().regex(/^[1-9]\d{5}$/),
        rating: z.number().min(0).max(5),
        terms: text,
      })
      .parse(req.body);
    const supplierId = id("SUP");
    db.prepare("INSERT INTO suppliers VALUES(?,?,?,?,?,?,?)").run(
      supplierId,
      input.name,
      input.phone,
      input.location,
      input.pincode,
      input.rating,
      input.terms,
    );
    res.status(201).json({ id: supplierId });
  });
  router.post("/admin/requests/:requestId/quotes", (req, res) => {
    const input = z
      .object({
        supplierId: text,
        rates: z
          .array(z.object({ productId: text, rate: money }))
          .min(1)
          .max(50),
        freight: money,
        deliveryDays: z.number().int().min(1).max(365),
        validDays: z.number().int().min(1).max(90),
        terms: text,
      })
      .parse(req.body);
    const requestId = String(req.params.requestId);
    const request = db
      .prepare("SELECT * FROM requests WHERE id=?")
      .get(requestId);
    const supplier = db
      .prepare("SELECT * FROM suppliers WHERE id=?")
      .get(input.supplierId);
    if (!request || !supplier) {
      res.status(404).json({ error: "Request or supplier not found." });
      return;
    }
    if (request.status === "Ordered") {
      res.status(409).json({ error: "This request is already ordered." });
      return;
    }
    const items = db
      .prepare(
        "SELECT productId,name,brand,unit,qty,gst,rate FROM request_items WHERE requestId=?",
      )
      .all(requestId);
    if (
      items.length !== input.rates.length ||
      new Set(input.rates.map((i) => i.productId)).size !== items.length ||
      items.some((i) => !input.rates.some((r) => r.productId === i.productId))
    ) {
      res
        .status(400)
        .json({ error: "Provide one rate for every requested material." });
      return;
    }
    const priced = items.map((i) => ({
      ...i,
      qty: Number(i.qty),
      gst: Number(i.gst),
      rate: input.rates.find((r) => r.productId === i.productId)!.rate,
    }));
    const totals = calculate(priced, input.freight);
    const quoteId = id("QT");
    transaction(db, () => {
      db.prepare("INSERT INTO quotes VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?)").run(
        quoteId,
        requestId,
        supplier.id,
        supplier.name,
        JSON.stringify(priced),
        totals.subtotal,
        totals.tax,
        input.freight,
        totals.total,
        new Date(Date.now() + input.validDays * 86400000).toISOString(),
        input.deliveryDays,
        input.terms,
        now(),
      );
      db.prepare("UPDATE requests SET status='Quoted' WHERE id=?").run(
        requestId,
      );
      notify(
        db,
        String(request.customerId),
        `${requestId}: A supplier quotation is ready to compare.`,
      );
    });
    res.status(201).json({ id: quoteId });
  });
  router.patch("/admin/orders/:orderId", (req, res) => {
    const input = z
      .object({
        status: z.enum(statuses),
        vehicle: z.string().trim().max(80),
        driver: z.string().trim().max(100),
        paymentStatus: z.enum(["Unpaid", "Part-paid", "Paid"]),
        paymentReference: z.string().trim().max(200),
        internalNotes: z.string().max(2000),
      })
      .parse(req.body);
    const orderId = String(req.params.orderId),
      order = db.prepare("SELECT * FROM orders WHERE id=?").get(orderId);
    if (!order) {
      res.status(404).json({ error: "Order not found." });
      return;
    }
    const oldIndex = statuses.indexOf(
        order.status as (typeof statuses)[number],
      ),
      newIndex = statuses.indexOf(input.status);
    if (newIndex < oldIndex || newIndex > oldIndex + 1) {
      res.status(409).json({ error: "Advance orders one stage at a time." });
      return;
    }
    if (newIndex >= 2 && (!input.vehicle || !input.driver)) {
      res.status(400).json({
        error: "Vehicle and driver details are required for dispatch.",
      });
      return;
    }
    if (input.paymentStatus !== "Unpaid" && !input.paymentReference) {
      res.status(400).json({
        error: "Add a payment reference for a manual payment record.",
      });
      return;
    }
    transaction(db, () => {
      db.prepare(
        "UPDATE orders SET status=?,vehicle=?,driver=?,paymentStatus=?,paymentReference=?,internalNotes=? WHERE id=?",
      ).run(
        input.status,
        input.vehicle,
        input.driver,
        input.paymentStatus,
        input.paymentReference,
        input.internalNotes,
        orderId,
      );
      if (order.status !== input.status) {
        db.prepare("INSERT INTO order_events VALUES(?,?,?,?)").run(
          id("EV"),
          orderId,
          input.status,
          now(),
        );
        notify(
          db,
          String(order.customerId),
          `${orderId}: Order status changed to ${input.status}.`,
        );
      }
      if (input.status === "Delivered" && order.status !== "Delivered") {
        const q = db
          .prepare("SELECT total FROM quotes WHERE id=?")
          .get(order.quoteId)!;
        const points = Math.floor(Number(q.total) / 10000);
        db.prepare("UPDATE users SET points=points+? WHERE id=?").run(
          points,
          order.customerId,
        );
        notify(
          db,
          String(order.customerId),
          `${points} reward points earned on ${orderId}.`,
        );
      }
    });
    res.json({ ok: true });
  });
  router.patch("/admin/products/:productId", (req, res) => {
    const input = z
      .object({
        price: money,
        gst: z.number().min(0).max(100),
        discount: z.number().min(0).max(100),
      })
      .parse(req.body);
    const result = db
      .prepare("UPDATE products SET price=?,gst=?,discount=? WHERE id=?")
      .run(
        input.price,
        input.gst,
        input.discount,
        String(req.params.productId),
      );
    if (!result.changes) {
      res.status(404).json({ error: "Material not found." });
      return;
    }
    res.json({ ok: true });
  });
  return router;
}
