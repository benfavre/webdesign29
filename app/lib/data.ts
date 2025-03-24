import { getDb } from "./db"
import { projects, testimonials, contactSubmissions } from "./schema"
import { eq } from "drizzle-orm"
import { getRedis } from "./redis"
import { logger } from "./logger"

// Fallback data (keep as is)
const fallbackProjects = []
const fallbackTestimonials = []

// Helper function to get data with caching
async function getDataWithCache<T>(key: string, fallbackData: T, fetchFunction: () => Promise<T>): Promise<T> {
  const context = "data-fetching"
  const requestId = `req-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`

  try {
    const redis = await getRedis()
    if (redis) {
      try {
        logger.debug(`Attempting to fetch ${key} from cache`, { context, requestId })
        const cachedData = await redis.get(key)
        if (cachedData) {
          try {
            const parsedData = cachedData
            logger.info(`Cache hit for ${key}`, { context, requestId })
            return parsedData as T
          } catch (parseError) {
            logger.warn(`Failed to parse cached data for ${key}, fetching fresh data`, {
              context,
              requestId,
              error: parseError instanceof Error ? parseError.message : String(parseError),
            })
          }
        } else {
          logger.debug(`Cache miss for ${key}`, { context, requestId })
        }
      } catch (cacheError) {
        logger.warn(`Redis cache error for ${key}, fetching fresh data`, {
          context,
          requestId,
          error: cacheError instanceof Error ? cacheError.message : String(cacheError),
        })
      }
    } else {
      logger.debug(`Redis client not available, skipping cache for ${key}`, { context, requestId })
    }

    // Fetch fresh data
    logger.debug(`Fetching ${key} from database`, { context, requestId })
    const data = await fetchFunction()
    logger.info(`Successfully fetched ${key} from database`, { context, requestId })

    // Cache the fresh data
    if (redis) {
      try {
        const serializedData = JSON.stringify(data)
        logger.debug(`Caching ${key} for 5 minutes`, { context, requestId })
        await redis.set(key, serializedData, { ex: 300 })
        logger.debug(`Successfully cached ${key}`, { context, requestId })
      } catch (cacheError) {
        logger.warn(`Failed to cache ${key}`, {
          context,
          requestId,
          error: cacheError instanceof Error ? cacheError.message : String(cacheError),
        })
      }
    }

    return data
  } catch (error) {
    logger.error(`Failed to fetch ${key}`, {
      context,
      requestId,
      error: error instanceof Error ? error.message : String(error),
      stack: error instanceof Error ? error.stack : undefined,
      details: JSON.stringify(error, Object.getOwnPropertyNames(error)),
    })
    return fallbackData
  }
}

// Projects
export async function getProjects() {
  return getDataWithCache("projects", fallbackProjects, async () => {
    const db = await getDb()
    if (!db) {
      logger.warn("Database connection not available. Using fallback data for projects.", {
        context: "projects",
      })
      return fallbackProjects
    }

    try {
      logger.debug("Attempting to fetch projects from database", { context: "projects" })
      const query = db.select().from(projects)
      logger.debug("SQL query:", { context: "projects", query: query.toSQL() })
      const result = await query
      logger.debug(`Successfully fetched ${result.length} projects from database`, {
        context: "projects",
        data: result,
      })
      return result
    } catch (error) {
      logger.error("Error fetching projects from database", {
        context: "projects",
        error: error instanceof Error ? error.message : String(error),
        stack: error instanceof Error ? error.stack : undefined,
        details: JSON.stringify(error, Object.getOwnPropertyNames(error)),
      })
      throw error // Let getDataWithCache handle the fallback
    }
  })
}

export async function getProjectById(id: number) {
  const db = await getDb()
  if (!db) {
    logger.warn("Database connection not available.", {
      context: "projects",
    })
    return null
  }

  try {
    logger.debug(`Attempting to fetch project with id ${id} from database`, { context: "projects" })
    const query = db.select().from(projects).where(eq(projects.id, id))
    logger.debug("SQL query:", { context: "projects", query: query.toSQL() })
    const result = await query
    logger.debug(`Successfully fetched project with id ${id} from database`, { context: "projects", data: result[0] })
    return result[0]
  } catch (error) {
    logger.error(`Error fetching project with id ${id} from database`, {
      context: "projects",
      error: error instanceof Error ? error.message : String(error),
      stack: error instanceof Error ? error.stack : undefined,
      details: JSON.stringify(error, Object.getOwnPropertyNames(error)),
    })
    return null
  }
}

// Testimonials
export async function getTestimonials() {
  return getDataWithCache("testimonials", fallbackTestimonials, async () => {
    const db = await getDb()
    if (!db) {
      logger.warn("Database connection not available. Using fallback data for testimonials.", {
        context: "testimonials",
      })
      return fallbackTestimonials
    }

    try {
      logger.debug("Attempting to fetch testimonials from database", { context: "testimonials" })
      const query = db.select().from(testimonials)
      logger.debug("SQL query:", { context: "testimonials", query: query.toSQL() })
      const result = await query
      logger.debug(`Successfully fetched ${result.length} testimonials from database`, {
        context: "testimonials",
        data: result,
      })
      return result
    } catch (error) {
      logger.error("Error fetching testimonials from database", {
        context: "testimonials",
        error: error instanceof Error ? error.message : String(error),
        stack: error instanceof Error ? error.stack : undefined,
        details: JSON.stringify(error, Object.getOwnPropertyNames(error)),
      })
      throw error // Let getDataWithCache handle the fallback
    }
  })
}

export async function getTestimonialById(id: number) {
  const db = await getDb()
  if (!db) {
    logger.warn("Database connection not available.", {
      context: "testimonials",
    })
    return null
  }

  try {
    logger.debug(`Attempting to fetch testimonial with id ${id} from database`, { context: "testimonials" })
    const query = db.select().from(testimonials).where(eq(testimonials.id, id))
    logger.debug("SQL query:", { context: "testimonials", query: query.toSQL() })
    const result = await query
    logger.debug(`Successfully fetched testimonial with id ${id} from database`, {
      context: "testimonials",
      data: result[0],
    })
    return result[0]
  } catch (error) {
    logger.error(`Error fetching testimonial with id ${id} from database`, {
      context: "testimonials",
      error: error instanceof Error ? error.message : String(error),
      stack: error instanceof Error ? error.stack : undefined,
      details: JSON.stringify(error, Object.getOwnPropertyNames(error)),
    })
    return null
  }
}

export async function createContactSubmission(data: Omit<typeof contactSubmissions.$inferInsert, "id" | "createdAt">) {
  const db = await getDb()
  if (!db) {
    logger.warn("Database connection not available.", {
      context: "contactSubmissions",
    })
    return null
  }

  try {
    logger.debug("Attempting to create contact submission in database", { context: "contactSubmissions" })
    const query = db.insert(contactSubmissions).values(data).returning()
    logger.debug("SQL query:", { context: "contactSubmissions", query: query.toSQL() })
    const result = await query
    logger.debug(`Successfully created contact submission with id ${result[0].id} in database`, {
      context: "contactSubmissions",
      data: result[0],
    })
    return result[0]
  } catch (error) {
    logger.error("Error creating contact submission in database", {
      context: "contactSubmissions",
      error: error instanceof Error ? error.message : String(error),
      stack: error instanceof Error ? error.stack : undefined,
      details: JSON.stringify(error, Object.getOwnPropertyNames(error)),
    })
    return null
  }
}

