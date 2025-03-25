import Image from "next/image";
import NextLink from "next/link";
import {
	MapPin,
	Mail,
	Phone,
	Facebook,
	Twitter,
	Instagram,
} from "lucide-react";

export function Footer() {
	return (
		<footer className="bg-primary text-white py-12">
			<div className="container mx-auto px-4">
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
					<div>
						<div className="flex items-center mb-6">
							<NextLink href="/">
								<Image
									src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/wd29-logo-2-tNv0T73M6BT4drA5KMOyZnne55624T.svg"
									alt="Webdesign29 Logo"
									width={100}
									height={35}
									className="mr-2"
								/>
							</NextLink>
						</div>
						<p className="text-gray-400 mb-6">
							Agence de création web à Brest, spécialisée dans le développement
							de sites web modernes et efficaces.
						</p>
					</div>
					<div>
						<h3 className="text-lg font-bold mb-6">Liens Rapides</h3>
						<ul className="space-y-3">
							<li>
								<NextLink
									href="/"
									className="text-gray-400 hover:text-white transition-colors"
								>
									Accueil
								</NextLink>
							</li>
							<li>
								<NextLink
									href="/services"
									className="text-gray-400 hover:text-white transition-colors"
								>
									Services
								</NextLink>
							</li>
							<li>
								<NextLink
									href="/projects"
									className="text-gray-400 hover:text-white transition-colors"
								>
									Projets
								</NextLink>
							</li>
							<li>
								<NextLink
									href="/about"
									className="text-gray-400 hover:text-white transition-colors"
								>
									À Propos
								</NextLink>
							</li>
							<li>
								<NextLink
									href="/contact"
									className="text-gray-400 hover:text-white transition-colors"
								>
									Contact
								</NextLink>
							</li>
							<li>
								<NextLink
									href="/pricing"
									className="text-gray-400 hover:text-white transition-colors"
								>
									Tarifs
								</NextLink>
							</li>
						</ul>
					</div>
					<div>
						<h3 className="text-lg font-bold mb-6">Services</h3>
						<ul className="space-y-3">
							<li>
								<NextLink
									href="/services"
									className="text-gray-400 hover:text-white transition-colors"
								>
									Développement Web
								</NextLink>
							</li>
							<li>
								<NextLink
									href="/services"
									className="text-gray-400 hover:text-white transition-colors"
								>
									Design Responsive
								</NextLink>
							</li>
							<li>
								<NextLink
									href="/services"
									className="text-gray-400 hover:text-white transition-colors"
								>
									Référencement SEO
								</NextLink>
							</li>
							<li>
								<NextLink
									href="/services"
									className="text-gray-400 hover:text-white transition-colors"
								>
									Stratégie Digitale
								</NextLink>
							</li>
							<li>
								<NextLink
									href="/services"
									className="text-gray-400 hover:text-white transition-colors"
								>
									Identité Visuelle
								</NextLink>
							</li>
						</ul>
					</div>
					<div>
						<h3 className="text-lg font-bold mb-6">Contact</h3>
						<ul className="space-y-3">
							<li className="flex items-center">
								<MapPin className="h-5 w-5 mr-2 text-gray-400" />
								<span className="text-gray-400">
									5 place de la liberté, 29200 Brest
								</span>
							</li>
							<li className="flex items-center">
								<Mail className="h-5 w-5 mr-2 text-gray-400" />
								<a
									href="mailto:contact@webdesign29.net"
									className="text-gray-400 hover:text-white transition-colors"
								>
									contact@webdesign29.net
								</a>
							</li>
							<li className="flex items-center">
								<Phone className="h-5 w-5 mr-2 text-gray-400" />
								<a
									href="tel:+33760485121"
									className="text-gray-400 hover:text-white transition-colors"
								>
									+33 7 60 48 51 21
								</a>
							</li>
						</ul>
					</div>
				</div>
				<div className="pt-8 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center">
					<p className="text-gray-400 text-sm mb-4 md:mb-0">
						© {new Date().getFullYear()} Webdesign29. Tous droits réservés.
					</p>
					<p className="text-gray-400 text-sm mb-4 md:mb-0">
						www.webdesign29.net
					</p>
					<div className="flex space-x-6">
						<a
							href="https://facebook.com/webdesign29"
							target="_blank"
							rel="noopener noreferrer"
							className="text-gray-400 hover:text-white transition-colors"
						>
							<Facebook className="h-5 w-5" />
						</a>
						<a
							href="https://twitter.com/webdesign29"
							target="_blank"
							rel="noopener noreferrer"
							className="text-gray-400 hover:text-white transition-colors"
						>
							<Twitter className="h-5 w-5" />
						</a>
						<a
							href="https://instagram.com/webdesign29"
							target="_blank"
							rel="noopener noreferrer"
							className="text-gray-400 hover:text-white transition-colors"
						>
							<Instagram className="h-5 w-5" />
						</a>
						<a
							href="https://linkedin.com/company/webdesign29"
							target="_blank"
							rel="noopener noreferrer"
							className="text-gray-400 hover:text-white transition-colors"
						>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								width="20"
								height="20"
								viewBox="0 0 24 24"
								fill="none"
								stroke="currentColor"
								strokeWidth="2"
								strokeLinecap="round"
								strokeLinejoin="round"
							>
								<path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
								<rect width="4" height="12" x="2" y="9" />
								<circle cx="4" cy="4" r="2" />
							</svg>
						</a>
					</div>
				</div>
			</div>
		</footer>
	);
}
