"use client"

import { useEffect } from "react"
import { Button } from "@/components/ui/button"
import { logger } from "./lib/logger"

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // Log the error to our structured logger
    logger.error("App-level error boundary triggered", {
      context: "error-boundary",
      error,
      data: { digest: error.digest },
    })
  }, [error])

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="bg-white p-8 rounded-lg shadow-md max-w-md w-full">
        <h2 className="text-2xl font-bold mb-4 text-red-600">Une erreur s'est produite</h2>
        <p className="text-gray-600 mb-6">
          Nous sommes désolés, une erreur inattendue s'est produite. Notre équipe technique a été notifiée.
        </p>
        {error.digest && <p className="text-sm text-gray-500 mb-6">Code d'erreur: {error.digest}</p>}
        <Button onClick={() => reset()} className="w-full">
          Réessayer
        </Button>
      </div>
    </div>
  )
}

