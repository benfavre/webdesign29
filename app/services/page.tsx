import { Header } from "@/app/components/Header";
import { Footer } from "@/app/components/Footer";
import { ServicesSection } from "@/app/components/ServicesSection";
import { Metadata } from "next";

export const metadata: Metadata = {
	title: "Nos Services | WD29 - Agence de Design et Développement Web",
	description:
		"Découvrez nos services de conception et développement web sur mesure. Experts en création de sites, applications mobiles et solutions digitales innovantes.",
};

export default function ServicesPage() {
	return (
		<div className="min-h-screen bg-white">
			<Header />
			<main className="container mx-auto px-4 pt-24 pb-16">
				<ServicesSection />
			</main>
			<Footer />
		</div>
	);
}
