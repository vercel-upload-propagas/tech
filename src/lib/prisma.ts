import { PrismaClient } from "@prisma/client";

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

// Garantir DATABASE_URL e SSL para Vercel/Supabase
let databaseUrl = process.env.DATABASE_URL;

if (!databaseUrl) {
  databaseUrl =
    "postgresql://postgres:4860853Daro@@db.nyqwqtyhgczaxdsqltyu.supabase.co:5432/postgres";
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
