// server/db.ts
import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";
import * as schema from "../shared/schema"; // adjust path if needed

const pool = new Pool({
  connectionString: process.env.DATABASE_URL, // should be defined in your `.env`
});

export const db = drizzle(pool, { schema });
export type DB = typeof db;
