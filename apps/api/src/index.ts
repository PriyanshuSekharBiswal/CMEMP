import { existsSync } from "node:fs";
if (existsSync(".env")) process.loadEnvFile(".env");
const { openDatabase } = await import("./db/database.js");
const { createApp } = await import("./app.js");
const db = openDatabase();
const port = Number(process.env.PORT || 3104);
const server = createApp(db).listen(port, "127.0.0.1", () =>
  console.log(
    `CMEMP API: http://127.0.0.1:${port} | Local OTP: ${process.env.DEMO_AUTH === "true" ? "enabled (no SMS)" : "disabled"}`,
  ),
);
for (const signal of ["SIGINT", "SIGTERM"] as const)
  process.on(signal, () =>
    server.close(() => {
      db.close();
      process.exit(0);
    }),
  );
