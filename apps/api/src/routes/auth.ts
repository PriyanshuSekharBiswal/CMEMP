import { Router } from "express";
import { z } from "zod";
import {
  randomInt,
  randomUUID,
  scryptSync,
  timingSafeEqual,
} from "node:crypto";
import type { DB } from "../db/database.js";
import {
  digest,
  requireUser,
  sessionToken,
  setSession,
} from "../middleware/auth.js";
const phone = z
  .string()
  .regex(/^[6-9]\d{9}$/, "Enter a 10-digit Indian mobile number");
export function authRoutes(db: DB) {
  const router = Router();
  const attempts = new Map<string, { count: number; expires: number }>();
  router.use((req, res, next) => {
    if (req.method === "GET") return next();
    const key = req.ip || "local";
    const time = Date.now();
    for (const [k, v] of attempts) if (v.expires < time) attempts.delete(k);
    const record = attempts.get(key) || { count: 0, expires: time + 600000 };
    record.count++;
    attempts.set(key, record);
    if (record.count > 30) {
      res
        .status(429)
        .json({ error: "Too many attempts. Try again in 10 minutes." });
      return;
    }
    next();
  });
  router.get("/me", (req, res) =>
    res.json({
      user: req.user || null,
      demoAuth: process.env.DEMO_AUTH === "true",
    }),
  );
  router.post("/otp/request", (req, res) => {
    const input = z.object({ phone }).parse(req.body);
    if (process.env.DEMO_AUTH !== "true") {
      res.status(503).json({
        error:
          "SMS provider is not configured. Local testing requires DEMO_AUTH=true.",
      });
      return;
    }
    const existing = db
      .prepare("SELECT expires FROM otps WHERE phone=?")
      .get(input.phone);
    if (existing && Number(existing.expires) > Date.now() + 240000) {
      res.status(429).json({
        error: "Please wait one minute before requesting another code.",
      });
      return;
    }
    const code = String(randomInt(100000, 1000000));
    db.prepare(
      "INSERT OR REPLACE INTO otps(phone,hash,expires,attempts) VALUES(?,?,?,0)",
    ).run(input.phone, digest(input.phone + code), Date.now() + 300000);
    res.json({
      demoCode: code,
      message: "Local test code only. No SMS was sent.",
    });
  });
  router.post("/otp/verify", (req, res) => {
    const input = z
      .object({
        phone,
        code: z.string().regex(/^\d{6}$/),
        name: z.string().trim().min(2).max(80),
      })
      .parse(req.body);
    if (process.env.DEMO_AUTH !== "true") {
      res.status(503).json({ error: "OTP login is not configured." });
      return;
    }
    const row = db.prepare("SELECT * FROM otps WHERE phone=?").get(input.phone);
    if (!row || Number(row.expires) < Date.now() || Number(row.attempts) >= 5) {
      res.status(400).json({
        error: "Code expired or too many attempts. Request a new code.",
      });
      return;
    }
    db.prepare("UPDATE otps SET attempts=attempts+1 WHERE phone=?").run(
      input.phone,
    );
    if (
      !timingSafeEqual(
        Buffer.from(String(row.hash), "hex"),
        Buffer.from(digest(input.phone + input.code), "hex"),
      )
    ) {
      res.status(400).json({ error: "Incorrect code." });
      return;
    }
    db.prepare("DELETE FROM otps WHERE phone=?").run(input.phone);
    let user = db
      .prepare("SELECT id,role FROM users WHERE phone=?")
      .get(input.phone);
    if (user?.role === "admin") {
      res.status(403).json({ error: "Use the operations password login." });
      return;
    }
    if (!user) {
      const userId = randomUUID();
      db.prepare("INSERT INTO users(id,phone,name) VALUES(?,?,?)").run(
        userId,
        input.phone,
        input.name,
      );
      user = { id: userId, role: "customer" };
    }
    setSession(db, res, String(user.id));
    res.json({ ok: true });
  });
  router.post("/admin", (req, res) => {
    const input = z
      .object({ phone, password: z.string().min(1).max(200) })
      .parse(req.body);
    const user = db
      .prepare("SELECT id,password FROM users WHERE phone=? AND role='admin'")
      .get(input.phone);
    const [salt, hash] = String(
      user?.password || "0000000000000000:" + "0".repeat(128),
    ).split(":");
    const valid = timingSafeEqual(
      scryptSync(input.password, salt, 64),
      Buffer.from(hash, "hex"),
    );
    if (!user || !valid) {
      res.status(401).json({ error: "Incorrect operations credentials." });
      return;
    }
    setSession(db, res, String(user.id));
    res.json({ ok: true });
  });
  router.post("/logout", (req, res) => {
    db.prepare("DELETE FROM sessions WHERE token=?").run(
      digest(sessionToken(req)),
    );
    res.clearCookie("cmemp_session", { path: "/" });
    res.json({ ok: true });
  });
  router.patch("/profile", requireUser, (req, res) => {
    const input = z
      .object({
        name: z.string().trim().min(2).max(80),
        address: z.string().trim().max(500),
        pincode: z.string().regex(/^(\d{6})?$/),
      })
      .parse(req.body);
    db.prepare("UPDATE users SET name=?,address=?,pincode=? WHERE id=?").run(
      input.name,
      input.address,
      input.pincode,
      req.user!.id,
    );
    res.json({ ok: true });
  });
  return router;
}
