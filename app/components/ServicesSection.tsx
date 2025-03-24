"use client"

import { Button } from "@/components/ui/button"
import { Globe, Code, Smartphone, Search, BarChart, FileText } from "lucide-react"
import { motion } from "framer-motion"

export function ServicesSection() {
  const services = [
    {
      icon: Globe,
      title: "Site internet vitrine",
      description:
        "Présentation générale de votre entreprise : activités, produits/services, historique, coordonnées… pour générer des leads ou entrer en contact avec vos clients.",
    },
    {
      icon: Code,
      title: "Site e-Commerce",
      description:
        "Construction d'expériences d'achat numérique pour atteindre des objectifs de vente ambitieux. Intégration de systèmes de gestion de commande et de paiement en ligne.",
    },
    {
      icon: Smartphone,
      title: "Application Mobile",
      description:
        "Création d'applications personnalisées pour contribuer à la croissance de votre entreprise. Solutions métiers sur-mesure pour votre business.",
    },
    {
      icon: Search,
      title: "Optimisation SEO",
      description:
        "Optimisation de votre structure de site internet, contenu, vitesse, backlinks. Solutions professionnelles éprouvées (SEO/SEA/SEM) pour améliorer votre visibilité en ligne.",
    },
    {
      icon: BarChart,
      title: "Gestion CRM & ERP",
      description:
        "Gestion centralisée des relations clients et automatisation des processus internes avec nos solutions CRM et ERP (gantt, facturation, système de ticketing, live chat, ...).",
    },
    {
      icon: FileText,
      title: "Liseuse de PDF",
      description:
        "Plateforme de publication pour magazines numériques, publications interactives et catalogues en ligne. Conversion de documents en belles publications partageables.",
    },
  ]

  return (
    <section id="services" className="py-20">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl font-bold mb-4">Nos Services</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Découvrez notre gamme complète de services pour répondre à tous vos besoins numériques.
          </p>
        </motion.div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              viewport={{ once: true }}
              className="bg-white p-8 rounded-lg shadow-md hover:shadow-lg transition-shadow"
            >
              <div className="bg-accent/10 p-3 rounded-full w-fit mb-6">
                <service.icon className="h-6 w-6 text-accent" />
              </div>
              <h3 className="text-xl font-bold mb-3">{service.title}</h3>
              <p className="text-gray-600 mb-4">{service.description}</p>
              <Button variant="outline" className="mt-2">
                Voir plus
              </Button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

