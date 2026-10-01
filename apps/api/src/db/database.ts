import { DatabaseSync } from "node:sqlite";
import { mkdirSync, readFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { randomUUID, scryptSync, randomBytes } from "node:crypto";
export function passwordHash(password: string) {
  const salt = randomBytes(16).toString("hex");
  return `${salt}:${scryptSync(password, salt, 64).toString("hex")}`;
}
export function openDatabase(
  filename = process.env.DATABASE_PATH || "storage/cmemp.sqlite",
) {
  if (filename !== ":memory:")
    mkdirSync(dirname(resolve(filename)), { recursive: true });
  const db = new DatabaseSync(filename);
  db.exec(
    "PRAGMA foreign_keys=ON; PRAGMA journal_mode=WAL; PRAGMA busy_timeout=5000;",
  );
  db.exec(
    "CREATE TABLE IF NOT EXISTS schema_migrations(version INTEGER PRIMARY KEY, appliedAt TEXT NOT NULL)",
  );
  if (
    !db.prepare("SELECT version FROM schema_migrations WHERE version=1").get()
  ) {
    db.exec("BEGIN IMMEDIATE");
    try {
      db.exec(
        readFileSync(
          new URL("./migrations/001_initial.sql", import.meta.url),
          "utf8",
        ),
      );
      db.prepare("INSERT INTO schema_migrations VALUES(?,?)").run(
        1,
        new Date().toISOString(),
      );
      db.exec("COMMIT");
    } catch (error) {
      db.exec("ROLLBACK");
      throw error;
    }
  }

  const seed = JSON.parse(
    readFileSync(new URL("./seed.json", import.meta.url), "utf8"),
  );
  const putProduct = db.prepare(
    "INSERT OR IGNORE INTO products(id,sku,name,brand,category,unit,price,gst,specs) VALUES(?,?,?,?,?,?,?,?,?)",
  );
  for (const p of seed.products)
    putProduct.run(
      p.id,
      p.sku,
      p.name,
      p.brand,
      p.category,
      p.unit,
      Math.round(
        (p.unit === "Tonne"
          ? p.basePricePerTonne
          : p.unit === "50kg Bag"
            ? p.basePricePerBag
            : p.basePricePerPipe) * 100,
      ),
      p.gstRate,
      JSON.stringify(p.specs),
    );
  for (const s of seed.suppliers)
    db.prepare("INSERT OR IGNORE INTO suppliers VALUES(?,?,?,?,?,?,?)").run(
      s.id,
      s.name,
      s.phone,
      s.location,
      s.pincode,
      s.rating,
      s.paymentTerms,
    );
  if (process.env.ADMIN_PASSWORD) {
    if (process.env.ADMIN_PASSWORD.length < 12)
      throw Error("ADMIN_PASSWORD must contain at least 12 characters");
    const phone = process.env.ADMIN_PHONE || "9000000000";
    const existing = db
      .prepare("SELECT role FROM users WHERE phone=?")
      .get(phone);
    if (existing && existing.role !== "admin")
      throw Error("ADMIN_PHONE belongs to a customer; choose another phone");
    if (!existing)
      db.prepare(
        "INSERT INTO users(id,phone,name,role,password) VALUES(?,?,?,?,?)",
      ).run(
        randomUUID(),
        phone,
        "Operations team",
        "admin",
        passwordHash(process.env.ADMIN_PASSWORD),
      );
  }
  return db;
}
export type DB = ReturnType<typeof openDatabase>;
