"use server"

import { getDb, DatabaseConnectionError } from "../lib/db"
import { projects, testimonials } from "../lib/schema"
import { eq } from "drizzle-orm"
import { seedDatabase } from "../lib/seed"
import { toast } from "sonner"
import { getRedis } from "../lib/redis"
import { logger } from "../lib/logger"

// Helper function to handle database errors
async function executeDbAction<T>(
  actionName: string,
  action: () => Promise<T>,
  onSuccess: (result: T) => void = () => {},
): Promise<{ success: boolean; data?: T; error?: string; message?: string }> {
  try {
    const db = await getDb()
    if (!db) {
      logger.warn(`Database connection not available. ${actionName} simulated.`, {
        context: "database-action",
      })
      throw new DatabaseConnectionError("Database connection not available")
    }

    const result = await action()
    onSuccess(result)

    logger.info(`${actionName} completed successfully`, {
      context: "database-action",
      data: { action: actionName },
    })

    return { success: true, data: result }
  } catch (error) {
    if (error instanceof DatabaseConnectionError) {
      logger.warn(`Database connection error in ${actionName}`, {
        context: "database-action",
        error,
        data: { action: actionName },
      })
    } else {
      logger.error(`Error in ${actionName}`, {
        context: "database-action",
        error: error instanceof Error ? error : new Error(String(error)),
        data: { action: actionName },
      })
    }

    return {
      success: false,
      error: `Failed to ${actionName.toLowerCase()}`,
      message: error instanceof Error ? error.message : String(error),
    }
  }
}

export async function updateSchema() {
  return executeDbAction("Update Schema", async () => {
    const db = await getDb()
    if (!db) throw new Error("Database not initialized")
    // Create projects table
    await db.execute(`
        CREATE TABLE IF NOT EXISTS projects (
          id SERIAL PRIMARY KEY,
          title TEXT NOT NULL,
          category TEXT NOT NULL,
          excerpt TEXT NOT NULL,
          description TEXT,
          image_url TEXT,
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
          updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        );
      `)

    // Create testimonials table
    await db.execute(`
        CREATE TABLE IF NOT EXISTS testimonials (
          id SERIAL PRIMARY KEY,
          name TEXT NOT NULL,
          text TEXT NOT NULL,
          rating INTEGER NOT NULL,
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        );
      `)

    // Create contact_submissions table
    await db.execute(`
        CREATE TABLE IF NOT EXISTS contact_submissions (
          id SERIAL PRIMARY KEY,
          name TEXT NOT NULL,
          email TEXT NOT NULL,
          subject TEXT NOT NULL,
          message TEXT NOT NULL,
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        );
      `)

    toast.success("Schema updated successfully")
    return { success: true, message: "Schema updated successfully" }
  })
}

export async function seedDatabaseAction() {
  return executeDbAction("Seed Database", async () => {
    await seedDatabase()
    toast.success("Database seeded successfully")
    return { success: true, message: "Database seeded successfully" }
  })
}

// Update the invalidateCache function to handle null redis client
async function invalidateCache(key: string) {
  const redis = await getRedis()
  if (redis) {
    try {
      logger.debug(`Invalidating cache for ${key}`, { context: "cache" })
      await redis.del(key)
      logger.debug(`Cache invalidated for ${key}`, { context: "cache" })
    } catch (error) {
      logger.warn(`Failed to invalidate cache for ${key}`, {
        context: "cache",
        error,
      })
      // Continue execution as cache invalidation is not critical
    }
  } else {
    logger.debug(`Redis client not available, skipping cache invalidation for ${key}`, { context: "cache" })
  }
}

export async function createProject(data: typeof projects.$inferInsert) {
  return executeDbAction(
    "Create Project",
    async () => {
      const db = await getDb()
      if (!db) throw new Error("Database not initialized")
      const result = await db.insert(projects).values(data).returning()
      return result[0]
    },
    async (result) => {
      await invalidateCache("projects")
      toast.success("Project created successfully")
    },
  )
}

export async function updateProject(id: number, data: Partial<typeof projects.$inferInsert>) {
  return executeDbAction(
    "Update Project",
    async () => {
      const db = await getDb()
      if (!db) throw new Error("Database not initialized")
      const result = await db.update(projects).set(data).where(eq(projects.id, id)).returning()
      return result[0]
    },
    async (result) => {
      await invalidateCache("projects")
      await invalidateCache(`project:${id}`)
      toast.success("Project updated successfully")
    },
  )
}

export async function deleteProject(id: number) {
  return executeDbAction(
    "Delete Project",
    async () => {
      const db = await getDb()
      if (!db) throw new Error("Database not initialized")
      await db.delete(projects).where(eq(projects.id, id))
      return { id }
    },
    async () => {
      await invalidateCache("projects")
      await invalidateCache(`project:${id}`)
      toast.success("Project deleted successfully")
    },
  )
}

// Testimonials CRUD actions
export async function createTestimonial(data: typeof testimonials.$inferInsert) {
  return executeDbAction(
    "Create Testimonial",
    async () => {
      const db = await getDb()
      if (!db) throw new Error("Database not initialized")
      const result = await db.insert(testimonials).values(data).returning()
      return result[0]
    },
    async (result) => {
      await invalidateCache("testimonials")
      toast.success("Testimonial created successfully")
    },
  )
}

export async function updateTestimonial(id: number, data: Partial<typeof testimonials.$inferInsert>) {
  return executeDbAction(
    "Update Testimonial",
    async () => {
      const db = await getDb()
      if (!db) throw new Error("Database not initialized")
      const result = await db.update(testimonials).set(data).where(eq(testimonials.id, id)).returning()
      return result[0]
    },
    async (result) => {
      await invalidateCache("testimonials")
      await invalidateCache(`testimonial:${id}`)
      toast.success("Testimonial updated successfully")
    },
  )
}

export async function deleteTestimonial(id: number) {
  return executeDbAction(
    "Delete Testimonial",
    async () => {
      const db = await getDb()
      if (!db) throw new Error("Database not initialized")
      await db.delete(testimonials).where(eq(testimonials.id, id))
      return { id }
    },
    async () => {
      await invalidateCache("testimonials")
      await invalidateCache(`testimonial:${id}`)
      toast.success("Testimonial deleted successfully")
    },
  )
}

