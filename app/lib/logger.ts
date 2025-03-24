type LogLevel = "debug" | "info" | "warn" | "error"

interface LogOptions {
  context?: string
  requestId?: string
  error?: Error | unknown
  data?: Record<string, any>
}

class Logger {
  private static instance: Logger
  private isDevelopment: boolean

  private constructor() {
    this.isDevelopment = process.env.NODE_ENV === "development"
  }

  public static getInstance(): Logger {
    if (!Logger.instance) {
      Logger.instance = new Logger()
    }
    return Logger.instance
  }

  private formatMessage(level: LogLevel, message: string, options?: LogOptions): string {
    const timestamp = new Date().toISOString()
    const context = options?.context ? `[${options.context}]` : ""
    const requestId = options?.requestId ? `(reqId: ${options.requestId})` : ""

    return `${timestamp} ${level.toUpperCase()} ${context} ${requestId} ${message}`
  }

  private formatError(error: Error | unknown): string {
    if (error instanceof Error) {
      return `${error.name}: ${error.message}\n${error.stack || ""}`
    }
    return String(error)
  }

  debug(message: string, options?: LogOptions): void {
    if (this.isDevelopment) {
      console.debug(this.formatMessage("debug", message, options))
      if (options?.data) {
        console.debug(options.data)
      }
    }
  }

  info(message: string, options?: LogOptions): void {
    console.info(this.formatMessage("info", message, options))
    if (options?.data && this.isDevelopment) {
      console.info(options.data)
    }
  }

  warn(message: string, options?: LogOptions): void {
    console.warn(this.formatMessage("warn", message, options))
    if (options?.error) {
      console.warn(this.formatError(options.error))
    }
    if (options?.data) {
      console.warn(options.data)
    }
  }

  error(message: string, options?: LogOptions): void {
    console.error(this.formatMessage("error", message, options))
    if (options?.error) {
      console.error(this.formatError(options.error))
    }
    if (options?.data) {
      console.error(options.data)
    }
  }
}

export const logger = Logger.getInstance()

