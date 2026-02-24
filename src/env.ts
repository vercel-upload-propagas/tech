import { z } from "zod";

const clientEnvSchema = z.object({
  NEXT_PUBLIC_API_URL: z.url(),
  NEXT_PUBLIC_SITE_URL: z.url(),
  WEBSITE_ID: z.string(),
  NODE_ENV: z.enum(["development", "production"]).default("development"),
});

export const clientEnv = clientEnvSchema.parse(process.env);
