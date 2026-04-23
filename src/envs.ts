export const ENV = {
  port: process.env.PORT ? Number(process.env.PORT) : 3000,
  databaseUrl: String(process.env.DATABASE_URL),
  betterAuthUrl: String(process.env.BETTER_AUTH_URL),
  corsOrigin: String(process.env.CORS_ORIGIN),
};
