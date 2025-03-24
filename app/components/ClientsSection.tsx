import Image from "next/image";

export function ClientsSection() {
	const clients = [
		{
			name: "ORB",
			logo: "/clients/Logo-ORB-150x150.png",
		},
		{
			name: "AMF29",
			logo: "/clients/Logo-amf29-150x150.png",
		},
		{
			name: "Open Brest Arena",
			logo: "/clients/Logo-Open-Brest-Arena-150x150.png",
		},
		{
			name: "Tymmo",
			logo: "/clients/Logo-Tymmo-150x150.png",
		},
		{
			name: "Sparfel",
			logo: "/clients/Logo-sparfel-150x150.png",
		},
		{
			name: "Planète Loisirs",
			logo: "/clients/Logo-.Plabete-loisirspng-150x150.png",
		},
		{
			name: "Brest Bretagne Handball",
			logo: "/clients/Logo-BBH-150x150.png",
		},
		{
			name: "La Poste",
			logo: "/clients/Logo-la-poste-150x150.png",
		},
		{
			name: "Mairie de Crozon",
			logo: "/clients/Logo-mairie-crozon-1-150x150.png",
		},
		// {
		// 	name: "Brest'Aim",
		// 	logo: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Logo-Brest-aim-150x150-Hy5Hy5Hy5Hy5Hy5Hy5Hy5Hy5Hy5Hy5Hy5.png",
		// },

		// {
		// 	name: "Ville de Brest",
		// 	logo: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Logo-Ville-de-Brest-150x150-Hy5Hy5Hy5Hy5Hy5Hy5Hy5Hy5Hy5Hy5Hy5.png",
		// },
		{
			name: "Brest Métropole",
			logo: "/clients/Logo-Bmh-150x150.png",
		},
		// {
		// 	name: "Région Bretagne",
		// 	logo: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Logo-Region-Bretagne-150x150-Hy5Hy5Hy5Hy5Hy5Hy5Hy5Hy5Hy5Hy5Hy5.png",
		// },
		{
			name: "Reference Carrelage",
			logo: "/clients/Logo-Reference-Carrelage-150x150.png",
		},
		{
			name: "Prestanim Location",
			logo: "/clients/Logo-Prestanim-150x150.png",
		},
		{
			name: "Ucopia",
			logo: "/clients/Logo-Ucopia-150x150.png",
		},
		{
			name: "Les Viviers de Terenez",
			logo: "/clients/Logo-Viviers-de-terenez-150x150.png",
		},
		{
			name: "Rinkla Stadium",
			logo: "/clients/Logo-Rinkla-150x150.png",
		},
		{
			name: "Label 5",
			logo: "/clients/Logo-Label5-150x150.png",
		},
		{
			name: "Clotilde Mallégol Ostéopathe",
			logo: "/clients/Logo-Osteopathe-plougastel-150x150.png",
		},
		{
			name: "Maileva",
			logo: "/clients/Logo-Maileva-150x150.png",
		},
		{
			name: "Valograin",
			logo: "/clients/Logo-Valograin-150x150.png",
		},
		{
			name: "Le Journal du Vrac",
			logo: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Logo-Journal-du-vrac-150x150-fFJzArQZXeNs4vCqJ9b8qh0HCk8LlS.png",
		},
		{
			name: "Cocoon Habitat",
			logo: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Logo-Cocoon-habitat-150x150-1HzdoPKz6kbn6qwFnYxHC02Mb2BrOf.png",
		},
		{
			name: "Jeremy Capitaine",
			logo: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Logo-Jermemy-capitaine-150x150-n4x8Lg521absLMxhRH8KQ8pX2c5gQx.png",
		},
		{
			name: "ColiPoste",
			logo: "/clients/Logo-Coliposte-150x150.png",
		},
		{
			name: "Dir Ouest",
			logo: "/clients/Logo-Dir-ouest-150x150.png",
		},
		{
			name: "Haliotika",
			logo: "/clients/Logo-Haliotika-150x150.png",
		},
		{
			name: "Escapia",
			logo: "/clients/Logo-Escapia-150x150.png",
		},
		// Adding missing clients from the public/clients folder
		{
			name: "Agence Concept",
			logo: "/clients/Logo-Agence-Concept-150x150.png",
		},
		{
			name: "Air Liquide",
			logo: "/clients/Logo-Air-liquide-150x150.png",
		},
		{
			name: "Alliance Courtage",
			logo: "/clients/Logo-Alliance-Courtage-150x150.png",
		},
		{
			name: "Alliance Médicale Service",
			logo: "/clients/Logo-AllianceMedicaleService-150x150.png",
		},
		{
			name: "Armor Lux",
			logo: "/clients/Logo-Armor-Lux-150x150.png",
		},
		{
			name: "Armen",
			logo: "/clients/Logo-Armen-150x150.png",
		},
		{
			name: "ActiComm",
			logo: "/clients/Logo-ActiComm-150x150.png",
		},
		{
			name: "Atsuke",
			logo: "/clients/Logo-atsuke-150x150.png",
		},
		{
			name: "Bewoopi",
			logo: "/clients/Logo-Bewoopi-150x150.png",
		},
		{
			name: "Biofil",
			logo: "/clients/Logo-Biofil-150x150.png",
		},
		{
			name: "Bose",
			logo: "/clients/Logo-Bose-150x150.png",
		},
		{
			name: "Byzantine",
			logo: "/clients/Logo-Byzantine-150x150.png",
		},
		{
			name: "Cabasse",
			logo: "/clients/Logo-Cabasse-150x150.png",
		},
		{
			name: "Camping Crozon",
			logo: "/clients/Logo-Camping-Crozon-150x150.png",
		},
		{
			name: "Finistarmor",
			logo: "/clients/Logo-finistarmor-150x150.png",
		},
		{
			name: "Haute Berthault",
			logo: "/clients/Logo-Haute-Berthault-150x150.png",
		},

		{
			name: "Monfort",
			logo: "/clients/Logo-Monfort-150x150.png",
		},

		{
			name: "Rivacom",
			logo: "/clients/Logo-Rivacom-150x150.png",
		},

		{
			name: "Tentes 4 Saisons",
			logo: "/clients/Logo-tentes4saisons-150x150.png",
		},
	];

	return (
		<section className="py-20 bg-white">
			<div className="container mx-auto px-4">
				<div className="text-center mb-16">
					<h2 className="text-3xl font-bold mb-4">Ils nous font confiance</h2>
					<p className="text-gray-600 max-w-2xl mx-auto">
						Découvrez quelques-unes des entreprises avec lesquelles nous avons
						eu le plaisir de collaborer.
					</p>
				</div>
				<div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 items-center justify-items-center">
					{clients.map((client) => (
						<div
							key={client.name}
							className="relative w-full aspect-[3/2] max-w-[200px] transition-transform hover:scale-105"
						>
							<Image
								src={client.logo || "/placeholder.svg"}
								alt={`Logo ${client.name}`}
								fill
								className="object-contain filter hover:brightness-110"
							/>
						</div>
					))}
				</div>
			</div>
		</section>
	);
}
