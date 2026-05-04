export const ENV = {
  port: process.env.PORT ? Number(process.env.PORT) : 3000,
  databaseUrl: String(process.env.DATABASE_URL),
  betterAuthUrl: String(process.env.BETTER_AUTH_URL),
  trustedOrigins: String(process.env.TRUSTED_ORIGINS),
  frontendUrl: String(process.env.FRONTEND_URL),
  SMTP_HOST: String(process.env.SMTP_HOST),
  SMTP_PORT: process.env.SMTP_PORT ? Number(process.env.SMTP_PORT) : 465,
  SMTP_USER: String(process.env.SMTP_USER),
  SMTP_PASS: String(process.env.SMTP_PASS),
  SMTP_FROM: String(process.env.SMTP_FROM),
};
