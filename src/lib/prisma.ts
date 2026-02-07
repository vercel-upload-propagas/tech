import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "@prisma/client";
import { Pool } from "pg";

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
  pool: Pool | undefined;
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

  // Verificar se já existe um pool reutilizável (para desenvolvimento)
  const existingPool = globalForPrisma.pool;

  // Configurar o Pool com opções adequadas para serverless (Vercel)
  const pool =
    existingPool ??
    new Pool({
      connectionString: process.env.DATABASE_URL,
      // Configurações para serverless/Vercel
      ssl:
        process.env.NODE_ENV === "production" || process.env.VERCEL === "1"
          ? { rejectUnauthorized: false }
          : undefined,
      // Configurações otimizadas para serverless
      max: process.env.VERCEL ? 1 : 10, // Em serverless, usar apenas 1 conexão
      min: 0,
      idleTimeoutMillis: 30000,
      connectionTimeoutMillis: 20000, // Aumentar timeout para Vercel
      // Permitir que conexões sejam fechadas rapidamente em ambientes serverless
      allowExitOnIdle: true,
    });

  // Armazenar o pool globalmente apenas em desenvolvimento
  if (process.env.NODE_ENV !== "production" && !globalForPrisma.pool) {
    globalForPrisma.pool = pool;
  }

  const adapter = new PrismaPg(pool);

  return (
    globalForPrisma.prisma ??
    new PrismaClient({
      adapter,
      log:
        process.env.NODE_ENV === "development"
          ? ["query", "error", "warn"]
          : ["error"],
    })
  );
}

const prismaInstance = createPrismaClient();

// Em desenvolvimento, reutilizar a instância
if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prismaInstance;
}

export const prisma = prismaInstance;
