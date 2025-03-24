import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { VercelFloatingBar } from "./components/VercelFloatingBar"
import { Toaster } from "./components/Toaster"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Webdesign29 - Création de sites internet et d'applications à Brest",
  description: "Agence de création web à Brest, spécialisée dans le développement de sites web modernes et efficaces.",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="fr">
      <body className={inter.className}>
        {children}
        <VercelFloatingBar />
        <Toaster />
      </body>
    </html>
  )
}



import './globals.css'