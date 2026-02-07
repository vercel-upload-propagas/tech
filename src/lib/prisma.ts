import { PrismaClient } from "@prisma/client";

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

// Garantir DATABASE_URL e SSL para Vercel/Supabase
let databaseUrl = process.env.DATABASE_URL;

if (!databaseUrl) {
  // Para Vercel, usar connection pooler (porta 6543) com pgbouncer=true
  if (process.env.VERCEL || process.env.NODE_ENV === "production") {
    databaseUrl =
      "postgresql://postgres.nyqwqtyhgczaxdsqltyu:4860853Daro@@aws-1-sa-east-1.pooler.supabase.com:6543/postgres?pgbouncer=true&sslmode=require";
  } else {
    // Local: conexão direta (porta 5432)
    databaseUrl =
      "postgresql://postgres.nyqwqtyhgczaxdsqltyu:4860853Daro@@aws-1-sa-east-1.pooler.supabase.com:5432/postgres?sslmode=require";
  }
} else if (process.env.VERCEL || process.env.NODE_ENV === "production") {
  // Se já tem DATABASE_URL mas está na Vercel, garantir pgbouncer=true e porta 6543
  // Substituir porta 5432 por 6543 se necessário
  if (databaseUrl.includes(":5432/")) {
    databaseUrl = databaseUrl.replace(":5432/", ":6543/");
  }
  // Garantir pgbouncer=true
  if (!databaseUrl.includes("pgbouncer=true")) {
    databaseUrl = `${databaseUrl}${databaseUrl.includes("?") ? "&" : "?"}pgbouncer=true`;
  }
  // Garantir SSL
  if (!databaseUrl.includes("sslmode")) {
    databaseUrl = `${databaseUrl}${databaseUrl.includes("?") ? "&" : "?"}sslmode=require`;
  }
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
