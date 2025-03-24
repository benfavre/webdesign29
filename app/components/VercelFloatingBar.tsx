"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"

export function VercelFloatingBar() {
  const [isVercelDomain, setIsVercelDomain] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const hostname = window.location.hostname
    setIsVercelDomain(hostname.endsWith(".vercel.app"))
  }, [])

  if (!isVercelDomain) return null

  const isAdminPage = pathname.startsWith("/admin")

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-gray-800 text-white p-4 flex justify-between items-center">
      <span className="text-sm">Vercel Preview Deployment</span>
      <div>
        {isAdminPage ? (
          <Link href="/">
            <Button variant="outline" size="sm">
              View Frontend
            </Button>
          </Link>
        ) : (
          <Link href="/admin">
            <Button variant="outline" size="sm">
              Go to Admin
            </Button>
          </Link>
        )}
      </div>
    </div>
  )
}

