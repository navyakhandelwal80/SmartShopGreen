import "dotenv/config"; // MUST be at very top of your entry file
import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import * as schema from "../shared/schema";

// Debug
console.log("Environment variables loaded:", {
  DATABASE_URL: process.env.DATABASE_URL ? "*****" : "UNDEFINED",
  ENV_FILE: process.env.ENV_FILE || ".env",
});

if (!process.env.DATABASE_URL) {
  throw new Error(`
    ❌ DATABASE_URL is missing!
    Solutions:
    1. Create .env file in project root
    2. Add DATABASE_URL="your-neon-url"
    3. Install dotenv (npm install dotenv)
    4. Add 'import "dotenv/config"' to your entry file
  `);
}

if (!process.env.DATABASE_URL.includes("neon.tech")) {
  throw new Error(`
    ❌ Invalid Neon URL!
    Your URL: ${process.env.DATABASE_URL.slice(0, 30)}...
    Must contain 'neon.tech' and full connection string
  `);
}

const sql = neon(process.env.DATABASE_URL, {
  fetchOptions: { timeout: 5000 },
});

export const db = drizzle(sql, { schema });
