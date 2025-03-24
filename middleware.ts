import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export function middleware(request: NextRequest) {
  // Generate a unique request ID
  const requestId = `req-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`

  // Clone the request headers
  const requestHeaders = new Headers(request.headers)

  // Add the request ID header
  requestHeaders.set("x-request-id", requestId)

  // Return the response with the modified headers
  return NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  })
}

// Add a matcher to apply this middleware to all routes
export const config = {
  matcher: "/((?!api|_next/static|_next/image|favicon.ico).*)",
}

