import { PrismaClient } from "@prisma/client";

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

// Garantir DATABASE_URL e SSL para Vercel/Supabase
let databaseUrl = process.env.DATABASE_URL;

if (!databaseUrl) {
  // Para serverless (Vercel), usar connection pooler na porta 6543
  const baseUrl =
    "postgresql://postgres:4860853Daro@@db.nyqwqtyhgczaxdsqltyu.supabase.co";
  const port =
    process.env.VERCEL || process.env.NODE_ENV === "production"
      ? "6543"
      : "5432";
  databaseUrl = `${baseUrl}:${port}/postgres`;
} else if (process.env.VERCEL || process.env.NODE_ENV === "production") {
  // Se já tem DATABASE_URL mas está na Vercel, trocar porta 5432 por 6543 (pooler)
  if (databaseUrl.includes(":5432/")) {
    databaseUrl = databaseUrl.replace(":5432/", ":6543/");
  }
}

// Sempre adicionar SSL na Vercel/produção se não tiver
if (
  (process.env.VERCEL || process.env.NODE_ENV === "production") &&
  !databaseUrl.includes("sslmode")
) {
  databaseUrl = `${databaseUrl}${databaseUrl.includes("?") ? "&" : "?"}sslmode=require`;
}

process.env.DATABASE_URL = databaseUrl;

// Configuração para serverless (Vercel)
const prismaOptions: ConstructorParameters<typeof PrismaClient>[0] = {};

// Em produção/Vercel, desabilitar logs ou usar apenas erros
if (process.env.NODE_ENV === "production" || process.env.VERCEL) {
  prismaOptions.log = ["error"];
}

export const prisma = globalForPrisma.prisma ?? new PrismaClient(prismaOptions);

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}
