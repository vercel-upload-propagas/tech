import { z } from "zod";

const clientEnvSchema = z.object({
  NODE_ENV: z.enum(["development", "production"]).default("development"),
  
  NEXT_PUBLIC_API_URL: z.url(),
  NEXT_PUBLIC_SITE_URL: z.url(),
  NEXT_PUBLIC_WEBSITE_ID: z.string(),
  /** ID do cliente Google AdSense (ex: ca-pub-xxxxxxxx). Quando definido, os blocos de anúncio são exibidos. */
  NEXT_PUBLIC_ADSENSE_CLIENT_ID: z.string().optional(),
  /** ID do slot da unidade de anúncio (ex: 1234567890). Obtenha no painel do AdSense. */
  NEXT_PUBLIC_ADSENSE_SLOT: z.string().optional(),
  /** E-mail de contato exibido na página /contato (opcional). */
  NEXT_PUBLIC_CONTACT_EMAIL: z.string().optional(),
});

export const clientEnv = clientEnvSchema.parse(process.env);
