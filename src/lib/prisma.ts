import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "@prisma/client";
import { Pool } from "pg";

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

function createPrismaClient(): PrismaClient {
  if (!process.env.DATABASE_URL) {
    // Durante o build, se DATABASE_URL não estiver disponível,
    // criar um cliente que nunca será usado (as funções verificam DATABASE_URL antes)
    // Usamos uma URL dummy apenas para satisfazer o construtor do PrismaClient
    const dummyPool = new Pool({
      connectionString: "postgresql://dummy:dummy@localhost:5432/dummy",
    });
    const dummyAdapter = new PrismaPg(dummyPool);
    return new PrismaClient({ adapter: dummyAdapter });
  }

  const pool = new Pool({ connectionString: process.env.DATABASE_URL });
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
