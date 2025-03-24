"use client";

import { motion } from "framer-motion";
import { MapPin, Clock, Shield, ArrowRight } from "lucide-react";
import { useId } from "react";

export function LocalActorSection() {
	const baseId = useId();

	return (
		<section className="py-24 relative overflow-hidden">
			{/* Animated abstract background */}
			<div className="absolute inset-0 -z-10">
				<motion.div
					className="absolute inset-0 opacity-[0.15]"
					initial={{ opacity: 0 }}
					animate={{ opacity: 0.15 }}
					transition={{ duration: 1 }}
				>
					<svg
						width="100%"
						height="100%"
						xmlns="http://www.w3.org/2000/svg"
						viewBox="0 0 100 100"
						preserveAspectRatio="none"
						aria-hidden="true"
					>
						<defs>
							<pattern
								id="grid"
								width="8"
								height="8"
								patternUnits="userSpaceOnUse"
							>
								<path
									d="M 8 0 L 0 0 0 8"
									fill="none"
									stroke="#3B82F6"
									strokeWidth="0.8"
								/>
							</pattern>
							<pattern
								id="circles"
								width="30"
								height="30"
								patternUnits="userSpaceOnUse"
							>
								<circle
									cx="15"
									cy="15"
									r="5"
									fill="none"
									stroke="#8B5CF6"
									strokeWidth="0.8"
								/>
							</pattern>
						</defs>
						<rect width="100%" height="100%" fill="url(#grid)" />
						<rect width="100%" height="100%" fill="url(#circles)" />
					</svg>
				</motion.div>

				{/* Animated floating elements */}
				<div className="absolute inset-0">
					{Array.from({ length: 10 }).map((_, index) => {
						// Generate random positions and sizes
						const width = Math.random() * 200 + 100;
						const height = Math.random() * 200 + 100;
						const posX = `${Math.random() * 100 - 50}%`;
						const posY = `${Math.random() * 100 - 50}%`;
						const targetX = `${Math.random() * 100 - 50}%`;
						const targetY = `${Math.random() * 100 - 50}%`;

						// Generate a unique identifier for each element
						const uniqueId = `${baseId}-floating-${index}-${Math.random().toString(36).substr(2, 9)}`;

						return (
							<motion.div
								key={uniqueId}
								className="absolute rounded-full bg-gradient-to-r from-blue-500 to-purple-500 opacity-20"
								style={{
									width,
									height,
									x: posX,
									y: posY,
								}}
								animate={{
									x: [posX, targetX],
									y: [posY, targetY],
								}}
								transition={{
									duration: Math.random() * 60 + 60,
									ease: "linear",
									repeat: Number.POSITIVE_INFINITY,
									repeatType: "reverse",
								}}
							/>
						);
					})}
				</div>

				{/* Gradient overlay */}
				<div className="absolute inset-0 bg-gradient-to-b from-gray-50/80 to-white/90" />
			</div>

			<div className="container mx-auto px-4 relative z-10">
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					whileInView={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.5 }}
					viewport={{ once: true }}
					className="text-center max-w-3xl mx-auto mb-16"
				>
					<h2 className="text-4xl font-bold mb-6 text-gray-800">
						Faites le choix d'un acteur local implanté depuis + de 17 ans
					</h2>
					<p className="text-xl text-gray-600">
						Retrouvez-nous place de la liberté à Brest !
					</p>
				</motion.div>

				<motion.div
					initial={{ opacity: 0, y: 30 }}
					whileInView={{ opacity: 1, y: 0 }}
					transition={{ delay: 0.2, duration: 0.6 }}
					viewport={{ once: true }}
					className="grid md:grid-cols-3 gap-8 mb-16"
				>
					<div className="bg-white p-8 rounded-lg shadow-md hover:shadow-lg transition-shadow">
						<div className="flex items-center mb-6">
							<div className="bg-blue-100 p-3 rounded-full mr-4">
								<MapPin className="w-6 h-6 text-blue-600" />
							</div>
							<h3 className="text-xl font-semibold">Acteur Local</h3>
						</div>
						<p className="text-gray-600">
							Basé à Brest, nous sommes proches de vous et comprenons les enjeux
							locaux de votre activité.
						</p>
					</div>

					<div className="bg-white p-8 rounded-lg shadow-md hover:shadow-lg transition-shadow">
						<div className="flex items-center mb-6">
							<div className="bg-green-100 p-3 rounded-full mr-4">
								<Clock className="w-6 h-6 text-green-600" />
							</div>
							<h3 className="text-xl font-semibold">Expérience</h3>
						</div>
						<p className="text-gray-600">
							Plus de 17 ans d'expertise dans la création et l'implémentation de
							solutions numériques.
						</p>
					</div>

					<div className="bg-white p-8 rounded-lg shadow-md hover:shadow-lg transition-shadow">
						<div className="flex items-center mb-6">
							<div className="bg-purple-100 p-3 rounded-full mr-4">
								<Shield className="w-6 h-6 text-purple-600" />
							</div>
							<h3 className="text-xl font-semibold">Conformité</h3>
						</div>
						<p className="text-gray-600">
							Toutes nos solutions respectent les normes en vigueur et sont
							conformes au R.G.P.D.
						</p>
					</div>
				</motion.div>

				<motion.div
					initial={{ opacity: 0, y: 20 }}
					whileInView={{ opacity: 1, y: 0 }}
					transition={{ delay: 0.4, duration: 0.5 }}
					viewport={{ once: true }}
					className="max-w-3xl mx-auto bg-white bg-opacity-90 backdrop-blur-sm p-8 rounded-lg border border-blue-100 text-center shadow-md"
				>
					<h3 className="text-2xl font-semibold mb-4 text-gray-800">
						Votre partenaire idéal pour votre transition numérique
					</h3>
					<p className="text-gray-700 mb-8">
						Mise en place d'outils professionnels efficaces et performants
						adaptés aux besoins spécifiques de votre secteur d'activité.
					</p>
					<motion.button
						whileHover={{ scale: 1.05 }}
						whileTap={{ scale: 0.95 }}
						className="inline-flex items-center px-6 py-3 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 transition-colors"
					>
						Nous contacter <ArrowRight className="ml-2 w-4 h-4" />
					</motion.button>
				</motion.div>
			</div>
		</section>
	);
}
