import { Metadata } from "next";

export const metadata: Metadata = {
	title: "Contact | WD29 - Agence de Design et Développement Web",
	description:
		"Contactez WD29 pour vos projets de design et développement web. Experts en création de solutions digitales sur mesure pour votre entreprise.",
};

export default function ContactLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return children;
}
