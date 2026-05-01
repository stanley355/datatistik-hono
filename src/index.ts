import { Hono } from "hono";
import { cors } from "hono/cors";
import { auth } from "./lib/auth";
import type { AuthType } from "./lib/auth";
import { ENV } from "./envs";

const router = new Hono<{ Bindings: AuthType }>({
  strict: false,
});

const authCors = cors({
  origin: ENV.trustedOrigins.split(","),
  allowHeaders: ["Content-Type", "Authorization"],
  allowMethods: ["POST", "GET"],
  exposeHeaders: ["Content-Length"],
  maxAge: 600,
  credentials: true,
});

router.use("/api/auth/*", authCors);

router.on(["POST", "GET"], "/api/auth/*", async (c) => {
  return auth.handler(c.req.raw);
});

export default {
  port: ENV.port,
  fetch: router.fetch,
};
