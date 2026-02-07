import { PrismaClient } from "@prisma/client";

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

if (!process.env.DATABASE_URL) {
  const baseUrl =
    "postgresql://postgres:4860853Daro@@db.nyqwqtyhgczaxdsqltyu.supabase.co:5432/postgres";

  // Adicionar SSL para Vercel/Supabase
  const sslParam =
    process.env.VERCEL || process.env.NODE_ENV === "production"
      ? "?sslmode=require"
      : "";

  process.env.DATABASE_URL = `${baseUrl}${sslParam}`;
}

export const prisma = globalForPrisma.prisma ?? new PrismaClient();

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}
