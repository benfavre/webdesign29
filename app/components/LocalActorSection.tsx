"use client"

import { motion } from "framer-motion"

export function LocalActorSection() {
  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4 text-center">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-3xl font-bold mb-8"
        >
          Faites le choix d'un acteur local implanté depuis + de 17 ans
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          viewport={{ once: true }}
          className="text-xl mb-8"
        >
          Retrouvez-nous place de la liberté à Brest !
        </motion.p>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          viewport={{ once: true }}
          className="text-lg mb-8"
        >
          Votre partenaire idéal pour votre transition numérique.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.5 }}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto"
        >
          <h3 className="text-2xl font-semibold mb-4">
            Mise en place d'outils professionnels efficaces et performants
          </h3>
          <p className="text-gray-600">
            Toutes nos solutions prennent en compte les normes en vigueur en fonction de votre activité sectorielle et
            respectent les normes R.G.P.D.
          </p>
        </motion.div>
      </div>
    </section>
  )
}

