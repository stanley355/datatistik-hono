import { betterAuth } from "better-auth";
import { Pool } from "pg";
import { ENV } from "../envs";
import { apiKey } from "@better-auth/api-key";

const database = new Pool({
  connectionString: ENV.databaseUrl,
});

export const auth = betterAuth({
  database,
  baseURL: ENV.betterAuthUrl,
  emailAndPassword: { enabled: true },
  plugins: [apiKey()],
});

export type AuthType = {
  user: typeof auth.$Infer.Session.user | null;
  session: typeof auth.$Infer.Session.session | null;
};
