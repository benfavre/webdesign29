import { Button } from "@/components/ui/button";
import { ArrowRight, Globe, Smartphone } from "lucide-react";

export function ProjectsSection({
	projects,
}: {
	projects: Project[];
}) {
	let error = null;

	if (error) {
		return (
			<section id="projets" className="py-20 bg-gray-50">
				<div className="container mx-auto px-4">
					<div className="text-center py-10">
						<p className="text-red-500">
							Une erreur s'est produite lors du chargement des projets. Veuillez
							réessayer plus tard.
						</p>
					</div>
				</div>
			</section>
		);
	}

	return (
		<section id="projets" className="py-20 bg-gray-50">
			<div className="container mx-auto px-4">
				<div className="text-center mb-16">
					<h2 className="text-3xl font-bold mb-4">Nos Réalisations</h2>
					<p className="text-gray-600 max-w-2xl mx-auto">
						Découvrez quelques-uns de nos projets récents qui illustrent notre
						expertise et notre créativité.
					</p>
				</div>
				{projects.length > 0 ? (
					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
						{projects.map((project) => (
							<div
								key={project.id}
								className="bg-white rounded-lg shadow-md overflow-hidden"
							>
								<div className="p-6">
									<div className="flex items-center justify-between mb-4">
										<div className="bg-accent/10 p-3 rounded-full">
											{project.category.toLowerCase().includes("mobile") ? (
												<Smartphone className="h-6 w-6 text-accent" />
											) : (
												<Globe className="h-6 w-6 text-accent" />
											)}
										</div>
										<span className="text-sm font-medium text-gray-500">
											{project.category}
										</span>
									</div>
									<h3 className="text-xl font-bold mb-2">{project.title}</h3>
									<p className="text-gray-600 mb-4">{project.excerpt}</p>
									<Button variant="outline" className="w-full">
										En savoir plus
										<ArrowRight className="ml-2 h-4 w-4" />
									</Button>
								</div>
							</div>
						))}
					</div>
				) : (
					<div className="text-center py-10">
						<p className="text-gray-500">
							Aucun projet disponible pour le moment.
						</p>
					</div>
				)}
				<div className="text-center mt-12">
					<Button variant="outline" size="lg">
						Voir tous nos projets
						<ArrowRight className="ml-2 h-4 w-4" />
					</Button>
				</div>
			</div>
		</section>
	);
}
