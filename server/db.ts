// server/db.ts
/*import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";
import * as schema from "../shared/schema"; */ // adjust path if needed

/*const pool = new Pool({
  connectionString: process.env.DATABASE_URL, // should be defined in your `.env`
  ssl: { rejectUnauthorized: false },
});

export const db = drizzle(pool, { schema });
export type DB = typeof db;*/
/*console.log("Connecting to:", process.env.DATABASE_URL);

if (!process.env.DATABASE_URL?.includes("neon.tech")) {
  throw new Error("⚠️ Wrong DB URL - must use Neon connection");
}

const pool = new Pool({ connectionString: process.env.DATABASE_URL });
export const db = drizzle(pool, { schema });*/
// server/db.ts
/*import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import * as schema from "../shared/schema";

// Debug: Show loaded environment
console.log("Environment keys:", Object.keys(process.env));
console.log("DATABASE_URL exists?:", !!process.env.DATABASE_URL);
// In db.ts, before connection
console.log("Full URL:", process.env.DATABASE_URL);
if (!process.env.DATABASE_URL) {
  throw new Error(`
    ⚠️ Database URL missing!
    Check that:
    1. .env file exists in /server
    2. Contains DATABASE_URL
    3. File is named exactly '.env'
  `);
}

const sql = neon(process.env.DATABASE_URL);
export const db = drizzle(sql, { schema });*/

import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import * as schema from "../shared/schema";

// Debug
console.log("Raw DATABASE_URL:", process.env.DATABASE_URL);

if (!process.env.DATABASE_URL?.includes("neon.tech")) {
  throw new Error(`
    Invalid Neon URL format. Must include 'neon.tech'.
    Current value: ${process.env.DATABASE_URL}
  `);
}

const sql = neon(process.env.DATABASE_URL, {
  // Timeout after 5 seconds
  fetchOptions: { timeout: 5000 },
});

export const db = drizzle(sql, { schema });
