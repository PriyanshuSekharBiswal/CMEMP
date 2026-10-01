import { test, before, after } from "node:test";
import assert from "node:assert/strict";
import { mkdtempSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import type { Server } from "node:http";
import { openDatabase } from "../apps/api/src/db/database.js";
import { createApp } from "../apps/api/src/app.js";
import { calculate } from "../apps/api/src/services/procurement.js";
process.env.ADMIN_PASSWORD = "test-admin-password-9274";
process.env.DEMO_AUTH = "true";
const db = openDatabase(":memory:");
let server: Server;
let base: string;
before(async () => {
  server = createApp(db).listen(0, "127.0.0.1");
  await new Promise<void>((r) => server.once("listening", r));
  base = `http://127.0.0.1:${(server.address() as { port: number }).port}/api`;
});
after(async () => {
  await new Promise<void>((resolve, reject) =>
    server.close((e) => (e ? reject(e) : resolve())),
  );
  db.close();
});
class Client {
  cookie = "";
  async call(
    path: string,
    method = "GET",
    body?: unknown,
    headers: Record<string, string> = {},
  ) {
    const r = await fetch(base + path, {
      method,
      headers: {
        "Content-Type": "application/json",
        "X-Requested-With": "CMEMP",
        Cookie: this.cookie,
        ...headers,
      },
      ...(body !== undefined ? { body: JSON.stringify(body) } : {}),
    });
    if (r.headers.get("set-cookie"))
      this.cookie = r.headers.get("set-cookie")!.split(";")[0];
    return { status: r.status, data: await r.json() };
  }
  async customer(phone: string) {
    const { data } = await this.call("/auth/otp/request", "POST", { phone });
    const verify = await this.call("/auth/otp/verify", "POST", {
      phone,
      name: "Test customer",
      code: data.demoCode,
    });
    assert.equal(verify.status, 200);
  }
}
test("money calculations round item tax in paise", () => {
  assert.deepEqual(
    calculate(
      [
        { qty: 1.25, rate: 1051, gst: 18 },
        { qty: 3, rate: 9900, gst: 28 },
      ],
      500,
    ),
    { subtotal: 31014, tax: 8553, total: 40067 },
  );
});
test("authentication, ownership and complete procurement lifecycle", async () => {
  const customer = new Client(),
    other = new Client(),
    admin = new Client(),
    anon = new Client();
  assert.equal((await anon.call("/requests")).status, 401);
  assert.equal(
    (
      await anon.call(
        "/auth/otp/request",
        "POST",
        { phone: "7000000001" },
        { "X-Requested-With": "" },
      )
    ).status,
    403,
  );
  assert.equal(
    (
      await anon.call(
        "/auth/otp/request",
        "POST",
        { phone: "7000000001" },
        { Origin: "https://untrusted.example" },
      )
    ).status,
    403,
  );
  const otp = await customer.call("/auth/otp/request", "POST", {
    phone: "7000000001",
  });
  assert.match(otp.data.demoCode, /^\d{6}$/);
  assert.equal(
    (
      await customer.call("/auth/otp/verify", "POST", {
        phone: "7000000001",
        name: "Customer one",
        code: "000000",
      })
    ).status,
    400,
  );
  assert.equal(
    (
      await customer.call("/auth/otp/verify", "POST", {
        phone: "7000000001",
        name: "Customer one",
        code: otp.data.demoCode,
      })
    ).status,
    200,
  );
  assert.equal(
    (
      await customer.call("/auth/otp/verify", "POST", {
        phone: "7000000001",
        name: "Customer one",
        code: otp.data.demoCode,
      })
    ).status,
    400,
  );
  await other.customer("7000000002");
  assert.equal(
    (
      await admin.call("/auth/admin", "POST", {
        phone: "9000000000",
        password: process.env.ADMIN_PASSWORD,
      })
    ).status,
    200,
  );
  assert.equal((await customer.call("/admin/suppliers")).status, 403);
  const products = (await customer.call("/products")).data;
  assert.ok(products.length >= 3);
  assert.equal(
    products.find((p: { id: string }) => p.id === "MAT-CEM-001").price,
    41500,
  );
  const data = {
    project: "Integration test site",
    address: "Plot 12, Test Road",
    pincode: "751024",
    notes: "Call before delivery",
    items: [
      { productId: products[0].id, qty: 2 },
      { productId: products[3].id, qty: 50 },
    ],
  };
  assert.equal(
    (
      await customer.call("/requests", "POST", {
        ...data,
        items: [{ productId: products[0].id, qty: -1 }],
      })
    ).status,
    400,
  );
  assert.equal(
    (
      await customer.call("/requests", "POST", {
        ...data,
        items: [{ productId: "unknown", qty: 1 }],
      })
    ).status,
    400,
  );
  assert.equal(
    (
      await customer.call("/requests", "POST", {
        ...data,
        items: [data.items[0], data.items[0]],
      })
    ).status,
    400,
  );
  const created = await customer.call("/requests", "POST", data);
  assert.equal(created.status, 201);
  const requestId = created.data.id;
  assert.equal((await other.call("/requests")).data.length, 0);
  const suppliers = (await admin.call("/admin/suppliers")).data;
  const quoteData = {
    supplierId: suppliers[0].id,
    rates: data.items.map((i) => ({
      productId: i.productId,
      rate: products.find((p: { id: string }) => p.id === i.productId).price,
    })),
    freight: 250000,
    deliveryDays: 3,
    validDays: 7,
    terms: "30% advance; balance on delivery",
  };
  assert.equal(
    (
      await customer.call(
        `/admin/requests/${requestId}/quotes`,
        "POST",
        quoteData,
      )
    ).status,
    403,
  );
  assert.equal(
    (
      await admin.call(`/admin/requests/${requestId}/quotes`, "POST", {
        ...quoteData,
        rates: quoteData.rates.slice(0, 1),
      })
    ).status,
    400,
  );
  const quoted = await admin.call(
    `/admin/requests/${requestId}/quotes`,
    "POST",
    quoteData,
  );
  assert.equal(quoted.status, 201);
  const quoteId = quoted.data.id;
  await admin.call(`/admin/requests/${requestId}/quotes`, "POST", {
    ...quoteData,
    supplierId: suppliers[1].id,
    freight: 300000,
  });
  const customerRequest = (await customer.call("/requests")).data[0];
  assert.equal(customerRequest.quotes.length, 2);
  assert.equal(customerRequest.status, "Quoted");
  assert.equal(
    (await other.call(`/quotes/${quoteId}/accept`, "POST")).status,
    404,
  );
  const accepted = await customer.call(`/quotes/${quoteId}/accept`, "POST");
  assert.equal(accepted.status, 201);
  const orderId = accepted.data.id;
  assert.equal(
    (await customer.call(`/quotes/${quoteId}/accept`, "POST")).status,
    409,
  );
  assert.equal(
    (
      await customer.call(
        `/quotes/${customerRequest.quotes[1].id}/accept`,
        "POST",
      )
    ).status,
    409,
  );
  assert.equal(
    (await admin.call(`/admin/requests/${requestId}/quotes`, "POST", quoteData))
      .status,
    409,
  );
  const update = {
    status: "Delivered",
    vehicle: "OD-02-1234",
    driver: "Driver one",
    paymentStatus: "Paid",
    paymentReference: "UTR-TEST-001",
    internalNotes: "Private margin notes",
  };
  assert.equal(
    (await admin.call(`/admin/orders/${orderId}`, "PATCH", update)).status,
    409,
  );
  assert.equal(
    (
      await admin.call(`/admin/orders/${orderId}`, "PATCH", {
        ...update,
        status: "Sourcing",
        paymentReference: "",
      })
    ).status,
    400,
  );
  assert.equal(
    (
      await admin.call(`/admin/orders/${orderId}`, "PATCH", {
        ...update,
        status: "Sourcing",
      })
    ).status,
    200,
  );
  assert.equal(
    (
      await admin.call(`/admin/orders/${orderId}`, "PATCH", {
        ...update,
        status: "Dispatched",
        vehicle: "",
      })
    ).status,
    400,
  );
  assert.equal(
    (
      await admin.call(`/admin/orders/${orderId}`, "PATCH", {
        ...update,
        status: "Dispatched",
      })
    ).status,
    200,
  );
  assert.equal(
    (await admin.call(`/admin/orders/${orderId}`, "PATCH", update)).status,
    200,
  );
  assert.equal((await other.call("/orders")).data.length, 0);
  const order = (await customer.call("/orders")).data[0];
  assert.equal(order.status, "Delivered");
  assert.equal(order.events.length, 4);
  assert.equal(order.internalNotes, undefined);
  const firstPoints = (await customer.call("/auth/me")).data.user.points;
  assert.ok(firstPoints > 0);
  await admin.call(`/admin/orders/${orderId}`, "PATCH", update);
  assert.equal((await customer.call("/auth/me")).data.user.points, firstPoints);
  assert.equal(
    (
      await admin.call(`/admin/orders/${orderId}`, "PATCH", {
        ...update,
        status: "Sourcing",
      })
    ).status,
    409,
  );
  assert.ok((await customer.call("/notifications")).data.length >= 6);
  const originalRate = order.quote.items[0].rate;
  assert.equal(
    (
      await admin.call(`/admin/products/${products[0].id}`, "PATCH", {
        price: originalRate + 10000,
        gst: 18,
        discount: 5,
      })
    ).status,
    200,
  );
  assert.equal(
    (await customer.call("/orders")).data[0].quote.items[0].rate,
    originalRate,
  );
  await customer.call("/auth/logout", "POST");
  assert.equal((await customer.call("/requests")).status, 401);
});
test("expired quotation cannot be accepted", async () => {
  const customer = new Client();
  await customer.customer("7000000003");
  const user = (await customer.call("/auth/me")).data.user;
  db.prepare(
    "INSERT INTO requests(id,customerId,project,address,pincode,notes,createdAt) VALUES(?,?,?,?,?,?,?)",
  ).run("EXPIRED-R", user.id, "Expired", "Address", "751024", "", "2020-01-01");
  db.prepare("INSERT INTO quotes VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?)").run(
    "EXPIRED-Q",
    "EXPIRED-R",
    "SUP-01",
    "Supplier",
    "[]",
    100,
    0,
    0,
    100,
    "2020-01-01",
    2,
    "Terms",
    "2020-01-01",
  );
  assert.equal(
    (await customer.call("/quotes/EXPIRED-Q/accept", "POST")).status,
    409,
  );
});
test("admin phone cannot use customer OTP to bypass its password", async () => {
  const client = new Client();
  const sent = await client.call("/auth/otp/request", "POST", {
    phone: "9000000000",
  });
  assert.equal(
    (
      await client.call("/auth/otp/verify", "POST", {
        phone: "9000000000",
        name: "Attempt",
        code: sent.data.demoCode,
      })
    ).status,
    403,
  );
});
test("SQLite data survives reopening and seed does not reset pricing", () => {
  const dir = mkdtempSync(join(tmpdir(), "cmemp-test-"));
  const file = join(dir, "db.sqlite");
  const first = openDatabase(file);
  first
    .prepare("UPDATE products SET price=123456 WHERE id=?")
    .run("MAT-TMT-001");
  first.close();
  const second = openDatabase(file);
  assert.equal(
    second.prepare("SELECT price FROM products WHERE id=?").get("MAT-TMT-001")!
      .price,
    123456,
  );
  second.close();
  rmSync(dir, { recursive: true });
});
