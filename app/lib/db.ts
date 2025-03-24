// Import statements at the top of the file
import { neon, neonConfig } from "@neondatabase/serverless";
import { drizzle as drizzleHttp } from "drizzle-orm/neon-http";
import { Pool } from "@neondatabase/serverless";
import { drizzle as drizzleServerless } from "drizzle-orm/neon-serverless";
import { logger } from "./logger";

// Define custom error types for both environments
export class DatabaseConnectionError extends Error {
  constructor(message: string, cause?: Error) {
    super(message);
    this.name = "DatabaseConnectionError";
    if (cause) this.stack = `${this.stack}\nCaused by: ${cause.stack}`;
  }
}

export class DatabaseConfigError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "DatabaseConfigError";
  }
}

// Create a Drizzle ORM instance for the dev environment
let db: ReturnType<typeof drizzleHttp> | ReturnType<typeof drizzleServerless> | null = null;
let pool: Pool | null = null;

// Initialize the database connection depending on the environment
async function initializeDatabase() {
  if (process.env.NODE_ENV === "dev") {
    await initializeDevDatabase();
  } else if (process.env.NODE_ENV === "prod") {
    await initializeProdDatabase();
  } else {
    throw new Error("Invalid NODE_ENV. Ensure it is either 'dev' or 'prod'.");
  }
}

// Dev environment: Using Neon and Drizzle ORM
async function initializeDevDatabase() {
  try {
    neonConfig.fetchConnectionCache = false; // Disable HTTP pooling for edge environments
    const connectionString = process.env.PGHOST
      ? `postgres://${process.env.PGUSER}:${process.env.PGPASSWORD}@${process.env.PGHOST}/${process.env.PGDATABASE}`
      : process.env.DATABASE_URL!;

    const sql = neon(connectionString);
    db = drizzleHttp(sql);
  } catch (error) {
    throw new DatabaseConnectionError("Failed to connect to the dev database.", error instanceof Error ? error : undefined);
  }
}

// Prod environment: Using Pool and Drizzle ORM with serverless support
async function initializeProdDatabase() {
  if (!process.env.DATABASE_URL || process.env.DATABASE_URL === "your_neon_database_connection_string_here") {
    throw new DatabaseConfigError("DATABASE_URL is not set or is using a placeholder value.");
  }

  try {
    pool = new Pool({ connectionString: process.env.DATABASE_URL });
    db = drizzleServerless(pool);
    logger.info("Database connection pool initialized successfully.", { context: "database" });
  } catch (error) {
    logger.error("Failed to initialize database connection pool", { context: "database", error });
    throw new DatabaseConnectionError("Failed to initialize database connection pool.", error instanceof Error ? error : undefined);
  }
}

// Function to get database instance, ensuring initialization
export async function getDb() {
  if (!db) {
    await initializeDatabase();
  }
  return db;
}

