import type { Request, Response, NextFunction } from "express";
import type { DB } from "../db/database.js";
import { createHash, randomBytes } from "node:crypto";
import type { User } from "../../../../packages/shared/src/types.js";
declare global {
  namespace Express {
    interface Request {
      user?: User;
    }
  }
}
export const digest = (s: string) =>
  createHash("sha256").update(s).digest("hex");
export const sessionToken = (req: Request) =>
  req.headers.cookie
    ?.split(";")
    .map((s) => s.trim())
    .find((s) => s.startsWith("cmemp_session="))
    ?.slice(14) || "";
export function authenticate(db: DB) {
  return (req: Request, _res: Response, next: NextFunction) => {
    req.user = db
      .prepare(
        "SELECT u.id,u.phone,u.name,u.role,u.address,u.pincode,u.points FROM sessions s JOIN users u ON u.id=s.userId WHERE s.token=? AND s.expires>?",
      )
      .get(digest(sessionToken(req)), Date.now()) as unknown as
      User | undefined;
    next();
  };
}
export function requireUser(req: Request, res: Response, next: NextFunction) {
  if (!req.user) {
    res.status(401).json({ error: "Please sign in to continue." });
    return;
  }
  next();
}
export function requireAdmin(req: Request, res: Response, next: NextFunction) {
  if (req.user?.role !== "admin") {
    res.status(403).json({ error: "An operations account is required." });
    return;
  }
  next();
}
export function setSession(db: DB, res: Response, userId: string) {
  const token = randomBytes(32).toString("hex");
  db.prepare("DELETE FROM sessions WHERE expires<?").run(Date.now());
  db.prepare("INSERT INTO sessions VALUES(?,?,?)").run(
    digest(token),
    userId,
    Date.now() + 7 * 86400000,
  );
  res.cookie("cmemp_session", token, {
    httpOnly: true,
    sameSite: "strict",
    secure: process.env.COOKIE_SECURE === "true",
    maxAge: 7 * 86400000,
    path: "/",
  });
}
