import type { Config } from "drizzle-kit"

export default {
  schema: "./app/lib/schema.ts",
  out: "./drizzle",
  driver: "pg",
  dbCredentials: {
    host: process.env.PGHOST || "",
    user: process.env.PGUSER || "",
    password: process.env.PGPASSWORD || "",
    database: process.env.PGDATABASE || "",
  },
} satisfies Config

