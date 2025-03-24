// Import statements at the top of the file
import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import * as schema from "./schema";
import { logger } from "./logger";

// Define custom error for database connection issues
export class DatabaseConnectionError extends Error {
	constructor(message: string, cause?: Error) {
		super(message);
		this.name = "DatabaseConnectionError";
		if (cause) this.stack = `${this.stack}\nCaused by: ${cause.stack}`;
	}
}

// Check if DATABASE_URL exists
if (!process.env.DATABASE_URL) {
	throw new DatabaseConnectionError("DATABASE_URL is not defined");
}

// Create connection
const sql = neon(process.env.DATABASE_URL);

// Export db instance with schema
export const db = drizzle(sql, { schema });

// Maintain backward compatibility with existing code
export async function getDb() {
	return db;
}
