"use client";

import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import { motion } from "framer-motion";
import { Check, Home } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function PricingPage() {
	const pricingPlans = [
		{
			id: "essential",
			name: "Essentiel",
			price: "1890€",
			description: "Idéal pour les petites entreprises et indépendants",
			features: [
				"Site vitrine jusqu'à 5 pages",
				"Design responsive",
				"Optimisation SEO de base",
				"Formulaire de contact",
				"Intégration réseaux sociaux",
				"Hébergement pour 1 an",
				"Nom de domaine pour 1 an",
			],
			popular: false,
		},
		{
			id: "professional",
			name: "Professionnel",
			price: "3500€",
			description: "Pour les PME cherchant une présence web complète",
			features: [
				"Site jusqu'à 10 pages",
				"Design personnalisé responsive",
				"Optimisation SEO avancée",
				"Formulaires interactifs",
				"Blog intégré",
				"Galerie photos/vidéos",
				"Compatibilité multi-langues",
				"Hébergement pour 1 an",
				"Nom de domaine pour 1 an",
				"Tableau de bord d'administration",
			],
			popular: true,
		},
		{
			id: "ecommerce",
			name: "E-Commerce",
			price: "5500€",
			description: "Solution complète pour vendre en ligne",
			features: [
				"Boutique jusqu'à 100 produits",
				"Design e-commerce responsive",
				"Système de paiement sécurisé",
				"Gestion des stocks",
				"Facturation automatique",
				"Optimisation SEO e-commerce",
				"Page produits personnalisées",
				"Système de promotion/coupons",
				"Hébergement haute performance",
				"Support technique prioritaire",
			],
			popular: false,
		},
	];

	const additionalServices = [
		{
			id: "maintenance",
			name: "Maintenance mensuelle",
			price: "À partir de 35€/mois",
			description: "Mises à jour, sauvegardes et sécurité pour votre site",
		},
		{
			id: "booking",
			name: "Module de réservation",
			price: "390€",
			description: "Intégration d'un système de réservation en ligne",
		},
		{
			id: "mobile",
			name: "Application mobile",
			price: "À partir de 2990€",
			description: "Développement d'une application mobile native iOS/Android",
		},
		{
			id: "redesign",
			name: "Refonte de site",
			price: "Sur devis",
			description: "Modernisation complète de votre site existant",
		},
	];

	return (
		<div className="min-h-screen flex flex-col">
			<Header />
			<main className="flex-grow pt-24">
				<div className="container mx-auto px-4 pt-4">
					<Link
						href="/"
						className="inline-flex items-center text-primary hover:text-primary/80 mb-4"
					>
						<Home className="w-4 h-4 mr-1" />
						<span>Retour à l'accueil</span>
					</Link>
				</div>
				<section className="py-20">
					<div className="container mx-auto px-4">
						<motion.div
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.5 }}
							className="text-center mb-16"
						>
							<h1 className="text-4xl font-bold mb-4">Nos Tarifs</h1>
							<p className="text-gray-600 max-w-2xl mx-auto">
								Des solutions adaptées à vos besoins et votre budget. Tous nos
								prix sont affichés HT.
							</p>
						</motion.div>

						{/* Pricing Cards */}
						<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
							{pricingPlans.map((plan) => (
								<motion.div
									key={plan.id}
									initial={{ opacity: 0, y: 20 }}
									animate={{ opacity: 1, y: 0 }}
									transition={{ delay: 0.1, duration: 0.5 }}
									className={`bg-white p-8 rounded-lg shadow-lg relative border ${
										plan.popular ? "border-accent" : "border-gray-200"
									}`}
								>
									{plan.popular && (
										<div className="absolute top-0 right-0 bg-accent text-white px-4 py-1 text-sm rounded-bl-lg rounded-tr-lg font-medium">
											Populaire
										</div>
									)}
									<h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
									<div className="text-3xl font-bold text-primary mb-4">
										{plan.price}
									</div>
									<p className="text-gray-600 mb-6">{plan.description}</p>
									<ul className="space-y-3 mb-8">
										{plan.features.map((feature, idx) => (
											<li
												key={`${plan.id}-feature-${idx}`}
												className="flex items-start"
											>
												<Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
												<span>{feature}</span>
											</li>
										))}
									</ul>
									<Button className="w-full bg-primary hover:bg-primary/90">
										Demander un devis
									</Button>
								</motion.div>
							))}
						</div>

						{/* Additional Services */}
						<motion.div
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ delay: 0.3, duration: 0.5 }}
							className="mb-16"
						>
							<h2 className="text-3xl font-bold mb-8 text-center">
								Services Additionnels
							</h2>
							<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
								{additionalServices.map((service) => (
									<div
										key={service.id}
										className="bg-white p-6 rounded-lg shadow-md border border-gray-200"
									>
										<div className="flex justify-between items-start mb-4">
											<h3 className="text-xl font-bold">{service.name}</h3>
											<span className="text-primary font-bold">
												{service.price}
											</span>
										</div>
										<p className="text-gray-600">{service.description}</p>
									</div>
								))}
							</div>
						</motion.div>

						{/* Call to Action */}
						<motion.div
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ delay: 0.4, duration: 0.5 }}
							className="bg-accent/10 p-8 rounded-lg text-center"
						>
							<h2 className="text-2xl font-bold mb-4">
								Vous avez un projet spécifique ?
							</h2>
							<p className="text-gray-600 mb-6 max-w-2xl mx-auto">
								Contactez-nous pour discuter de vos besoins particuliers. Nous
								vous proposerons une solution sur mesure adaptée à votre budget.
							</p>
							<Button
								size="lg"
								className="bg-accent text-primary hover:bg-accent/90"
							>
								Contactez-nous
							</Button>
						</motion.div>
					</div>
				</section>
			</main>
			<Footer />
		</div>
	);
}
