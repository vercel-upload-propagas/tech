import { PrismaClient } from "@prisma/client";

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

// Garantir DATABASE_URL e SSL para Vercel/Supabase
let databaseUrl = process.env.DATABASE_URL;

if (!databaseUrl) {
  // Para Vercel, usar connection pooler (porta 6543) que é mais confiável para serverless
  // URL do Supabase com connection pooler
  const baseUrl =
    "postgresql://postgres.nyqwqtyhgczaxdsqltyu:4860853Daro@@aws-1-sa-east-1.pooler.supabase.com:5432/postgres";
  const port = process.env.VERCEL ? "6543" : "5432";
  databaseUrl = `${baseUrl}:${port}/postgres`;
}

// Sempre adicionar SSL na Vercel/produção se não tiver
if (
  (process.env.VERCEL || process.env.NODE_ENV === "production") &&
  !databaseUrl.includes("sslmode")
) {
  databaseUrl = `${databaseUrl}${databaseUrl.includes("?") ? "&" : "?"}sslmode=require`;
}

process.env.DATABASE_URL = databaseUrl;

// Log temporário para diagnóstico (apenas na Vercel)
if (process.env.VERCEL) {
  const urlForLog = databaseUrl.replace(/:[^:@]+@/, ":****@");
  console.log("DATABASE_URL configurada:", urlForLog);
  console.log("VERCEL env:", process.env.VERCEL);
  console.log("NODE_ENV:", process.env.NODE_ENV);
}

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
