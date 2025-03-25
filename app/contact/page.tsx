"use client";

import { Header } from "@/app/components/Header";
import { Footer } from "@/app/components/Footer";
import { ContactSection } from "@/app/components/ContactSection";
import {
	NotificationCenter,
	type NotificationCenterRef,
} from "@/app/components/NotificationCenter";
import { useRef } from "react";

export default function ContactPage() {
	const notificationCenterRef = useRef<NotificationCenterRef>(null);

	const addNotification = (message: string) => {
		notificationCenterRef.current?.addNotification(message);
	};

	return (
		<div className="min-h-screen bg-white">
			<NotificationCenter ref={notificationCenterRef} />
			<Header />
			<main className="container mx-auto px-4 pt-24 pb-16">
				{/* Hero Section */}
				<div className="max-w-3xl mx-auto text-center mb-16">
					<h1 className="text-4xl md:text-5xl font-bold mb-6">
						Contactez-Nous
					</h1>
					<p className="text-lg md:text-xl text-gray-700 mb-4">
						Experts en design et développement web à Brest, nous sommes là pour
						donner vie à vos projets digitaux. De la conception à la
						réalisation, notre équipe vous accompagne dans chaque étape de votre
						transformation numérique.
					</p>
				</div>

				{/* Main Content */}
				<div className="max-w-6xl mx-auto">
					<div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
						{/* Left Column - Information */}
						<div className="space-y-12">
							{/* Project Introduction */}
							<div>
								<h2 className="text-2xl md:text-3xl font-semibold mb-4">
									Parlons de Votre Projet
								</h2>
								<p className="text-lg text-gray-700">
									Vous avez un projet digital en tête ? Notre équipe d'experts
									en design et développement est là pour vous accompagner dans
									sa réalisation.
								</p>
							</div>

							{/* Expertise Section */}
							<div className="bg-gray-50 p-6 md:p-8 rounded-xl">
								<h3 className="text-xl md:text-2xl font-semibold mb-4">
									Nos Domaines d'Expertise
								</h3>
								<ul className="space-y-3 text-gray-700">
									<li className="flex items-center">
										<span className="w-2 h-2 bg-accent rounded-full mr-3" />
										Création de sites web sur mesure
									</li>
									<li className="flex items-center">
										<span className="w-2 h-2 bg-accent rounded-full mr-3" />
										Applications web et mobiles
									</li>
									<li className="flex items-center">
										<span className="w-2 h-2 bg-accent rounded-full mr-3" />
										Design UX/UI innovant
									</li>
									<li className="flex items-center">
										<span className="w-2 h-2 bg-accent rounded-full mr-3" />
										Solutions e-commerce
									</li>
									<li className="flex items-center">
										<span className="w-2 h-2 bg-accent rounded-full mr-3" />
										Optimisation SEO
									</li>
								</ul>
							</div>

							{/* Approach Section */}
							<div className="bg-gray-50 p-6 md:p-8 rounded-xl">
								<h3 className="text-xl md:text-2xl font-semibold mb-4">
									Notre Approche
								</h3>
								<p className="text-gray-700">
									Nous privilégions une approche collaborative et transparente,
									en vous impliquant à chaque étape du projet pour garantir un
									résultat qui correspond parfaitement à vos attentes et aux
									besoins de vos utilisateurs.
								</p>
							</div>

							{/* Why Choose Us Section */}
							<div className="bg-gray-50 p-6 md:p-8 rounded-xl">
								<h3 className="text-xl md:text-2xl font-semibold mb-4">
									Pourquoi Nous Choisir ?
								</h3>
								<ul className="space-y-3 text-gray-700">
									<li className="flex items-center">
										<span className="w-2 h-2 bg-accent rounded-full mr-3" />
										Plus de 17 ans d'expérience
									</li>
									<li className="flex items-center">
										<span className="w-2 h-2 bg-accent rounded-full mr-3" />
										Équipe locale basée à Brest
									</li>
									<li className="flex items-center">
										<span className="w-2 h-2 bg-accent rounded-full mr-3" />
										Solutions personnalisées
									</li>
									<li className="flex items-center">
										<span className="w-2 h-2 bg-accent rounded-full mr-3" />
										Support technique réactif
									</li>
									<li className="flex items-center">
										<span className="w-2 h-2 bg-accent rounded-full mr-3" />
										Méthodologie agile
									</li>
								</ul>
							</div>
						</div>

						{/* Right Column - Contact Form */}
						<div className="lg:sticky lg:top-24">
							<ContactSection addNotification={addNotification} />
						</div>
					</div>
				</div>
			</main>
			<Footer />
		</div>
	);
}
