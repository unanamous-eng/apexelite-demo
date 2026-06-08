import { drizzle, NodePgDatabase } from "drizzle-orm/node-postgres";
import { Pool } from "pg";

const globalForDb = globalThis as typeof globalThis & {
  __dbPool?: Pool;
  __db?: NodePgDatabase;
};

function createPool(): Pool {
  const databaseUrl = process.env.DATABASE_URL;

  if (!databaseUrl) {
    throw new Error("DATABASE_URL is required");
  }

  return new Pool({
    connectionString: databaseUrl,
  });
}

function createDb(): NodePgDatabase {
  if (globalForDb.__db) {
    return globalForDb.__db;
  }

  if (!globalForDb.__dbPool) {
    globalForDb.__dbPool = createPool();
  }

  const db = drizzle(globalForDb.__dbPool);

  if (process.env.NODE_ENV !== "production") {
    globalForDb.__db = db;
  }

  return db;
}

// Lazy getter that only initializes when accessed
export const db = new Proxy({} as NodePgDatabase, {
  get(_, prop) {
    const instance = createDb();
    return (instance as unknown as Record<string | symbol, unknown>)[prop];
  },
});

export const pool = new Proxy({} as Pool, {
  get(_, prop) {
    if (!globalForDb.__dbPool) {
      globalForDb.__dbPool = createPool();
    }
    return (globalForDb.__dbPool as unknown as Record<string | symbol, unknown>)[prop];
  },
});
