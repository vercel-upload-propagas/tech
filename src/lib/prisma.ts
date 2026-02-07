import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "@prisma/client";
import { Pool } from "pg";

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

// Verificar se estamos durante o build (quando DATABASE_URL pode não estar disponível)
const isBuildTime = process.env.NEXT_PHASE === "phase-production-build";

function createPrismaClient(): PrismaClient {
  if (!process.env.DATABASE_URL) {
    if (isBuildTime) {
      // Durante o build, criar um cliente dummy que nunca será usado
      const dummyPool = new Pool({
        connectionString: "postgresql://dummy:dummy@localhost:5432/dummy",
      });
      const dummyAdapter = new PrismaPg(dummyPool);
      return new PrismaClient({ adapter: dummyAdapter });
    }
    throw new Error("DATABASE_URL não está definida");
  }

  // Configurar o Pool com opções adequadas para produção (SSL, etc.)
  const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    // Configurações para produção na Vercel
    ssl:
      process.env.NODE_ENV === "production"
        ? { rejectUnauthorized: false }
        : undefined,
    max: 10, // Limite de conexões no pool
    idleTimeoutMillis: 30000,
    connectionTimeoutMillis: 10000,
  });

  const adapter = new PrismaPg(pool);

  return (
    globalForPrisma.prisma ??
    new PrismaClient({
      adapter,
    })
  );
}

const prismaInstance = createPrismaClient();

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prismaInstance;
}

export const prisma = prismaInstance;
