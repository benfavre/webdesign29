import { getDb } from "./db"
import { projects, testimonials } from "./schema"

export async function seedDatabase() {
  try {
    console.log("Seeding database...")

    // Get the db instance using getDb()
    const db = await getDb()
    if (!db) {
      console.warn("Database connection not available. Skipping seed operation.")
      return
    }

    // Seed projects
    await db.insert(projects).values([
      {
        title: "Intervention suite à une attaque de piratage – ORB",
        category: "Site vitrine",
        excerpt: "Sécurité Web Renforcée : ORB surmonte les Vulnérabilités avec Expertise",
        description:
          "Nous avons aidé ORB à récupérer après une attaque de piratage, en renforçant la sécurité de leur site web et en mettant en place des mesures préventives.",
      },
      {
        title: "Envoi d'Emails personnalisés – Carrefour des communes – AMF29",
        category: "Application Mobile",
        excerpt: "Envoi d'emailing – Carrefour des Communes – AMF29 La communication efficace est cruciale pour le",
        description:
          "Développement d'une solution d'emailing personnalisée pour le Carrefour des Communes et l'AMF29, permettant d'améliorer leur communication avec leurs membres.",
      },
      {
        title: "Création d'un site internet – Breizh Cup Cake Events",
        category: "Site vitrine",
        excerpt: "Création d'un site internet – Breizh Cup Cake Events Breizh Cup Cake Events est une entreprise",
        description:
          "Conception et développement d'un site vitrine pour Breizh Cup Cake Events, mettant en valeur leurs produits et services de pâtisserie événementielle.",
      },
      {
        title: "Création d'un site internet – Planète Loisirs",
        category: "Site e-commerce",
        excerpt: "Création d'un site internet – Planète Loisirs Planète Loisirs est une entreprise spécialisée dans",
        description:
          "Développement d'une plateforme e-commerce complète pour Planète Loisirs, permettant la vente en ligne de leurs produits et la gestion de leur inventaire.",
      },
      {
        title: "Création d'un site internet – Brest Bretagne Handball",
        category: "Site vitrine",
        excerpt: "Création d'un site internet – Brest Bretagne Handball Le Brest Bretagne Handball est un club de",
        description:
          "Conception d'un site web moderne pour le Brest Bretagne Handball, incluant des fonctionnalités de billetterie, d'actualités et de présentation de l'équipe.",
      },
      {
        title: "Création d'un site internet – Brest'Aim",
        category: "Site vitrine",
        excerpt: "Création d'un site internet – Brest'Aim Brest'aim est une société d'économie mixte qui gère",
        description:
          "Développement d'un site institutionnel pour Brest'Aim, présentant leurs différentes activités et services dans la région brestoise.",
      },
    ])

    // Seed testimonials
    await db.insert(testimonials).values([
      {
        name: "Adrien RAULT",
        text: "Merci à Webdesign 29 qui ont conçu mon site web, il répond parfaitement à mes attentes. Ils sont à l'écoute et très réactifs. Je vous recommande leurs services, ils sont très professionnels.",
        rating: 5,
      },
      {
        name: "Pierre DANIEL",
        text: "Une équipe réactive, polyvalente et très professionnelle qui répondra au mieux à vos besoins pour vos sites et applications web sur Brest.",
        rating: 5,
      },
      {
        name: "Pascal PIOGER",
        text: "Travail très pro, la qualité est au rendez-vous je ne suis pas déçu. Je recommande!",
        rating: 5,
      },
      {
        name: "Jean-Baptiste KERLEROUX",
        text: "Merci à Webdesign29 pour son accompagnement sur la refonte de notre site internet qui datait un peu et qui manquait de dynamisme et d'une bonne architecture pour assurer un bon référencement. De plus, l'équipe de développement a pu se libérer rapidement pour travailler sur notre dossier. Souhaitant travailler avec un acteur local, nous sommes enchantés. Merci",
        rating: 5,
      },
    ])

    console.log("Database seeded successfully!")
  } catch (error) {
    console.error("Error seeding database:", error)
  }
}

