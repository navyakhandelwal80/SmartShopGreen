import { defineConfig } from "drizzle-kit";
import * as dotenv from "dotenv";

dotenv.config(); // Make sure .env variables are loaded

export default defineConfig({
  schema: "../shared/schema.ts", // Adjust path if your schema is elsewhere
  out: "./drizzle/migrations", // Or whatever directory you want for migrations
  dialect: "postgresql",
  dbCredentials: {
    url: process.env.DATABASE_URL!,
  },
});
