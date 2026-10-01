import express from "express";
import { resolve } from "node:path";
import { existsSync } from "node:fs";
import { ZodError } from "zod";
import type { DB } from "./db/database.js";
import { authenticate } from "./middleware/auth.js";
import { authRoutes } from "./routes/auth.js";
import { procurementRoutes } from "./routes/procurement.js";
export function createApp(db: DB) {
  const app = express();
  app.disable("x-powered-by");
  app.use((_req, res, next) => {
    res.setHeader("X-Content-Type-Options", "nosniff");
    res.setHeader("X-Frame-Options", "DENY");
    res.setHeader("Referrer-Policy", "same-origin");
    next();
  });
  app.use("/api", (_req, res, next) => {
    res.setHeader("Cache-Control", "no-store");
    next();
  });
  app.use("/api", (req, res, next) => {
    if (
      !["GET", "HEAD", "OPTIONS"].includes(req.method) &&
      req.headers["x-requested-with"] !== "CMEMP"
    ) {
      res.status(403).json({ error: "Request verification failed." });
      return;
    }
    const origin = req.headers.origin;
    const allowed = [
      `http://${req.headers.host}`,
      `https://${req.headers.host}`,
      process.env.WEB_ORIGIN || "http://127.0.0.1:5184",
      "http://localhost:5184",
    ];
    if (origin && !allowed.includes(origin)) {
      res.status(403).json({ error: "Origin not allowed." });
      return;
    }
    next();
  });
  app.use(express.json({ limit: "100kb" }));
  app.use("/api", authenticate(db));
  app.get("/api/health", (_req, res) => res.json({ ok: true }));
  app.use("/api/auth", authRoutes(db));
  app.use("/api", procurementRoutes(db));
  app.use("/api", (_req, res) =>
    res.status(404).json({ error: "Endpoint not found." }),
  );
  const webDir = existsSync(resolve("dist/web"))
    ? resolve("dist/web")
    : resolve("dist");
  app.use(express.static(webDir));
  app.get("/{*path}", (_req, res) =>
    res.sendFile(resolve(webDir, "index.html")),
  );
  app.use(
    (
      error: unknown,
      _req: express.Request,
      res: express.Response,
      _next: express.NextFunction,
    ) => {
      if (error instanceof ZodError) {
        res.status(400).json({
          error: error.issues
            .map((i) => `${i.path.join(".")}: ${i.message}`)
            .join("; "),
        });
        return;
      }
      if (error instanceof SyntaxError) {
        res.status(400).json({ error: "Invalid JSON body." });
        return;
      }
      console.error(error);
      res.status(500).json({
        error: "The request could not be completed. Please try again.",
      });
    },
  );
  return app;
}
