import { betterAuth } from "better-auth";
import { openAPI, admin } from "better-auth/plugins";
import { Pool } from "pg";
import { ENV } from "../envs";
import { mailTransport } from "./mail";

const database = new Pool({
  connectionString: ENV.databaseUrl,
});

export const auth = betterAuth({
  database,
  user: {
    modelName: "users",
  },
  session: {
    modelName: "sessions",
  },
  account: {
    modelName: "accounts",
  },
  verification: {
    modelName: "verifications",
  },
  trustedOrigins: ENV.trustedOrigins.split(","),
  baseURL: ENV.betterAuthUrl,
  emailAndPassword: {
    enabled: true,
    requireEmailVerification: true,
    sendResetPassword: async ({ user, token }) => {
      void mailTransport.sendMail({
        from: ENV.SMTP_FROM,
        to: user.email,
        subject: "DELIFUNDS - Reset your password",
        text: `Click the link to reset your password: ${ENV.frontendUrl}/auth/reset-password?token=${token}`,
      });
    },
  },
  emailVerification: {
    sendOnSignUp: true,
    sendVerificationEmail: async ({ user, url, token }) => {
      void mailTransport.sendMail({
        from: ENV.SMTP_FROM,
        to: user.email,
        subject: "DELIFUNDS - Verify your email address",
        text: `Click the link to verify your email: ${ENV.frontendUrl}/auth/verify-email?token=${token}`,
      });
    },
  },
  advanced: {
    database: { generateId: "uuid" },
  },
  plugins: [openAPI(), admin()],
});

export type AuthType = {
  user: typeof auth.$Infer.Session.user | null;
  session: typeof auth.$Infer.Session.session | null;
};
