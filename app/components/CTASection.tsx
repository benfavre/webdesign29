import Link from "next/link";

export function CTASection() {
	return (
		<section className="bg-gradient-to-r from-blue-600 to-blue-800 py-16">
			<div className="container mx-auto px-4">
				<div className="max-w-3xl mx-auto text-center">
					<h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
						Prêt à Transformer Votre Présence Numérique ?
					</h2>
					<p className="text-lg text-blue-100 mb-8">
						Travaillons ensemble pour créer quelque chose d'extraordinaire.
						Notre équipe est prête à vous aider à atteindre vos objectifs.
					</p>
					<div className="flex flex-col sm:flex-row gap-4 justify-center">
						<Link
							href="/contact"
							className="inline-block bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors"
						>
							Commencer
						</Link>
						{/* <Link
							href="/portfolio"
							className="inline-block border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white/10 transition-colors"
						>
							Voir Nos Réalisations
						</Link> */}
					</div>
				</div>
			</div>
		</section>
	);
}
