import "dotenv/config";

import { defineConfig } from "prisma/config";

export default defineConfig({
  schema: "prisma/schema.prisma",
  migrations: {
    path: "prisma/migrations",
    seed: "tsx prisma/seed.ts",
  },
  datasource: {
    url: "postgresql://postgres:4860853Daro@@db.nyqwqtyhgczaxdsqltyu.supabase.co:5432/postgres",
  },
});
