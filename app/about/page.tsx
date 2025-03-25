import { Header } from "@/app/components/Header";
import { Footer } from "@/app/components/Footer";
import { TeamSection } from "@/app/components/TeamSection";
import { LocalActorSection } from "@/app/components/LocalActorSection";
import { Metadata } from "next";

export const metadata: Metadata = {
	title: "À Propos | WD29 - Agence de Design et Développement Web",
	description:
		"Découvrez WD29, votre partenaire en design et développement web. Une équipe passionnée d'experts créant des solutions digitales innovantes et sur mesure.",
};

export default function AboutPage() {
	return (
		<div className="min-h-screen bg-white">
			<Header />
			<main className="container mx-auto px-4 pt-24 pb-16">
				<h1 className="text-4xl font-bold text-center mb-12">
					À Propos de Nous
				</h1>
				<div className="max-w-3xl mx-auto mb-16">
					<p className="text-lg text-gray-700 mb-6">
						WD29 est une agence de design et développement web innovante, dédiée
						à la création de solutions digitales exceptionnelles. Notre mission
						est de transformer vos idées en expériences numériques impactantes
						qui font la différence dans le monde digital d'aujourd'hui.
					</p>
					<p className="text-lg text-gray-700 mb-6">
						Forte d'une expertise approfondie en design et développement, notre
						équipe combine créativité et excellence technique pour délivrer des
						projets qui dépassent les attentes. Nous croyons en l'innovation
						continue et en l'adoption des dernières technologies pour créer des
						solutions performantes et évolutives.
					</p>
					<p className="text-lg text-gray-700">
						Notre approche collaborative et notre engagement envers la qualité
						nous permettent de construire des relations durables avec nos
						clients, comprenant leurs besoins uniques et leur offrant des
						solutions personnalisées qui stimulent leur croissance digitale.
					</p>
				</div>
				<LocalActorSection />
				<TeamSection />
			</main>
			<Footer />
		</div>
	);
}
