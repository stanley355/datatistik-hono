import { betterAuth } from "better-auth";
import { openAPI } from "better-auth/plugins";
import { Pool } from "pg";
import { ENV } from "../envs";

const database = new Pool({
  connectionString: ENV.databaseUrl,
});

export const auth = betterAuth({
  database,
  trustedOrigins: ENV.trustedOrigins.split(","),
  baseURL: ENV.betterAuthUrl,
  emailAndPassword: { enabled: true, requireEmailVerification: true },
  emailVerification: { sendOnSignUp: true },
  plugins: [openAPI()],
});

export type AuthType = {
  user: typeof auth.$Infer.Session.user | null;
  session: typeof auth.$Infer.Session.session | null;
};
