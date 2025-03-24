"use client"

import Image from "next/image"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import { motion } from "framer-motion"
import { Link } from "react-scroll"

export function Header() {
  const menuItems = [
    { name: "Accueil", target: "accueil" },
    { name: "Services", target: "services" },
    { name: "Projets", target: "projets" },
    { name: "Équipe", target: "equipe" },
    { name: "Témoignages", target: "temoignages" },
    { name: "Contact", target: "contact" },
  ]

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: "spring", stiffness: 100 }}
      className="fixed top-0 left-0 right-0 bg-primary z-50 shadow-sm"
    >
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="flex items-center"
        >
          <Image
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/wd29-logo-2-tNv0T73M6BT4drA5KMOyZnne55624T.svg"
            alt="Webdesign29 Logo"
            width={100}
            height={35}
            className="mr-2"
          />
        </motion.div>
        <nav className="hidden md:flex space-x-8">
          {menuItems.map((item, index) => (
            <motion.div
              key={item.name}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * index }}
            >
              <Link
                to={item.target}
                spy={true}
                smooth={true}
                offset={-70}
                duration={500}
                className="text-white hover:text-accent transition-colors cursor-pointer"
              >
                {item.name}
              </Link>
            </motion.div>
          ))}
        </nav>
        <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }}>
          <Button className="hidden md:flex bg-accent text-primary hover:bg-accent/90">
            Demander un devis
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </motion.div>
        <Button variant="ghost" size="icon" className="md:hidden text-white">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="lucide lucide-menu"
          >
            <line x1="4" x2="20" y1="12" y2="12" />
            <line x1="4" x2="20" y1="6" y2="6" />
            <line x1="4" x2="20" y1="18" y2="18" />
          </svg>
        </Button>
      </div>
    </motion.header>
  )
}

