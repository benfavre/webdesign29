import { Redis } from "@upstash/redis";
import { logger } from "./logger";

// Custom Redis error types
class RedisConfigError extends Error {
	constructor(message: string) {
		super(message);
		this.name = "RedisConfigError";
	}
}

class RedisConnectionError extends Error {
	constructor(
		message: string,
		public cause?: Error,
	) {
		super(message);
		this.name = "RedisConnectionError";
		if (cause) this.stack = `${this.stack}\nCaused by: ${cause.stack}`;
	}
}

let redisClient: Redis | null = null;

// Create a function to get Redis client
async function initializeRedisClient() {
	try {
		if (!process.env.KV_URL) {
			throw new RedisConfigError(
				"Redis environment variables are not properly configured",
			);
		}

		logger.info("Initializing Redis client with Upstash credentials", {
			context: "redis",
		});

		redisClient = new Redis({
			url: process.env.KV_REST_API_URL,
			token: process.env.KV_REST_API_TOKEN,
		});

		// Test the connection
		await redisClient.ping();
		logger.info("Redis connection successful", { context: "redis" });

		return redisClient;
	} catch (error) {
		if (error instanceof RedisConfigError) {
			logger.warn(error.message, { context: "redis" });
		} else {
			logger.error("Failed to initialize Redis client", {
				context: "redis",
				error: error instanceof Error ? error : new Error(String(error)),
			});
		}
		return null;
	}
}

// Function to get Redis client
export async function getRedis() {
	if (!redisClient) {
		redisClient = await initializeRedisClient();
	}
	return redisClient;
}

// Export the error types
export { RedisConfigError, RedisConnectionError };
