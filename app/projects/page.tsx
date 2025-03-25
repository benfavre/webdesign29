import { Header } from "@/app/components/Header";
import { Footer } from "@/app/components/Footer";
import { ProjectsSection } from "@/app/components/ProjectsSection";
import { getProjects } from "../lib/data";
import { Metadata } from "next";

export const metadata: Metadata = {
	title: "Nos Réalisations | WD29 - Agence de Design et Développement Web",
	description:
		"Découvrez notre portfolio de projets web et mobile. Des solutions digitales innovantes créées sur mesure pour nos clients dans différents secteurs d'activité.",
};

export default async function ProjectsPage() {
	const projects = await getProjects();

	return (
		<div className="min-h-screen bg-white">
			<Header />
			<main className="container mx-auto px-4 pt-24 pb-16">
				<h1 className="text-4xl font-bold text-center mb-8">
					Nos Réalisations
				</h1>
				<div className="max-w-3xl mx-auto text-center mb-12">
					<p className="text-lg text-gray-700">
						Explorez notre collection de projets réussis, démontrant notre
						expertise en design et développement. Chaque projet reflète notre
						engagement envers l'excellence et l'innovation dans la création de
						solutions digitales sur mesure.
					</p>
				</div>
				<ProjectsSection projects={projects} />
			</main>
			<Footer />
		</div>
	);
}
