"use client";

import { motion } from "framer-motion";
import { MapPin, Clock, Shield, ArrowRight } from "lucide-react";
import { useId } from "react";
import Link from "next/link";
export function LocalActorSection() {
	const baseId = useId();

	return (
		<section className="py-24 relative overflow-hidden">
			{/* Animated abstract background - more subtle */}
			<div className="absolute inset-0 z-0">
				<motion.div
					className="absolute inset-0 opacity-30"
					initial={{ opacity: 0 }}
					animate={{ opacity: 0.3 }}
					transition={{ duration: 1.5 }}
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
								width="12"
								height="12"
								patternUnits="userSpaceOnUse"
							>
								<path
									d="M 12 0 L 0 0 0 12"
									fill="none"
									stroke="#93C5FD"
									strokeWidth="0.7"
								/>
							</pattern>
							<pattern
								id="circles"
								width="40"
								height="40"
								patternUnits="userSpaceOnUse"
							>
								<circle
									cx="20"
									cy="20"
									r="8"
									fill="none"
									stroke="#C4B5FD"
									strokeWidth="0.7"
								/>
							</pattern>
						</defs>
						<rect width="100%" height="100%" fill="url(#grid)" />
						<rect width="100%" height="100%" fill="url(#circles)" />
					</svg>
				</motion.div>

				{/* Animated floating elements with subtle animation */}
				<div className="absolute inset-0">
					{Array.from({ length: 5 }).map((_, index) => {
						// Generate random positions and sizes
						const width = Math.random() * 250 + 150;
						const height = Math.random() * 250 + 150;
						const posX = `${Math.random() * 100 - 50}%`;
						const posY = `${Math.random() * 100 - 50}%`;
						const targetX = `${Math.random() * 100 - 50}%`;
						const targetY = `${Math.random() * 100 - 50}%`;

						// Generate a unique identifier for each element
						const uniqueId = `${baseId}-floating-${index}-${Math.random().toString(36).substr(2, 9)}`;

						return (
							<motion.div
								key={uniqueId}
								className="absolute rounded-full bg-gradient-to-r from-blue-200 to-purple-200 opacity-20"
								style={{
									width,
									height,
									x: posX,
									y: posY,
									filter: "blur(80px)",
								}}
								animate={{
									x: [posX, targetX],
									y: [posY, targetY],
									scale: [1, 1.1, 0.95, 1.05, 1],
								}}
								transition={{
									x: {
										duration: Math.random() * 60 + 80,
										ease: "easeInOut",
										repeat: Number.POSITIVE_INFINITY,
										repeatType: "reverse",
									},
									y: {
										duration: Math.random() * 60 + 80,
										ease: "easeInOut",
										repeat: Number.POSITIVE_INFINITY,
										repeatType: "reverse",
										delay: Math.random() * 5,
									},
									scale: {
										duration: Math.random() * 20 + 20,
										ease: "easeInOut",
										repeat: Number.POSITIVE_INFINITY,
										repeatType: "reverse",
									},
								}}
							/>
						);
					})}
				</div>

				{/* Subtle gradient overlay */}
				<div className="absolute inset-0 bg-gradient-to-b from-gray-50/70 to-white/80" />
			</div>

			{/* Pulsing dots animation */}
			<div className="absolute inset-0 z-0 opacity-10">
				<div className="relative w-full h-full">
					{Array.from({ length: 30 }).map((_, index) => {
						const posX = Math.random() * 100;
						const posY = Math.random() * 100;
						const size = Math.random() * 4 + 2;
						const uniqueId = `${baseId}-dot-${index}`;
						const delay = Math.random() * 5;

						return (
							<motion.div
								key={uniqueId}
								className="absolute rounded-full bg-blue-500"
								style={{
									left: `${posX}%`,
									top: `${posY}%`,
									width: size,
									height: size,
								}}
								animate={{
									opacity: [0.1, 0.5, 0.1],
									scale: [1, 1.5, 1],
								}}
								transition={{
									duration: Math.random() * 3 + 2,
									ease: "easeInOut",
									repeat: Number.POSITIVE_INFINITY,
									delay,
								}}
							/>
						);
					})}
				</div>
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
					<div className="bg-white/80 backdrop-filter backdrop-blur-sm p-8 rounded-lg shadow-md hover:shadow-lg transition-shadow">
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

					<div className="bg-white/80 backdrop-filter backdrop-blur-sm p-8 rounded-lg shadow-md hover:shadow-lg transition-shadow">
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

					<div className="bg-white/80 backdrop-filter backdrop-blur-sm p-8 rounded-lg shadow-md hover:shadow-lg transition-shadow">
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
					className="max-w-3xl mx-auto bg-white/80 backdrop-filter backdrop-blur-sm p-8 rounded-lg border border-blue-100 text-center shadow-md"
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
						<Link href="/contact" className="flex items-center">
							Nous contacter <ArrowRight className="ml-2 w-4 h-4" />
						</Link>
					</motion.button>
				</motion.div>
			</div>
		</section>
	);
}
