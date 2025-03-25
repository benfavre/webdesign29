"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ArrowRight, Menu, X } from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "react-scroll";
import NextLink from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import {
	Sheet,
	SheetContent,
	SheetHeader,
	SheetTitle,
	SheetTrigger,
} from "@/components/ui/sheet";

export function Header() {
	const pathname = usePathname();
	const isHomePage = pathname === "/";
	const [isOpen, setIsOpen] = useState(false);

	const menuItems = [
		{ name: "Accueil", path: "/", target: "accueil" },
		{ name: "Services", path: "/services", target: "services" },
		{ name: "Projets", path: "/projects", target: "projets" },
		{ name: "À Propos", path: "/about", target: "equipe" },
		{ name: "Contact", path: "/contact", target: "contact" },
		{ name: "Tarifs", path: "/pricing", target: null },
	];

	const handleLinkClick = () => {
		setIsOpen(false);
	};

	return (
		<motion.header
			initial={{ y: -100 }}
			animate={{ y: 0 }}
			transition={{ type: "spring", stiffness: 100 }}
			className="fixed top-0 left-0 right-0 bg-primary z-50 shadow-sm"
		>
			<div className="container mx-auto px-4 py-4 flex justify-between items-center">
				<motion.div
					initial={{ opacity: 0, x: -20 }}
					animate={{ opacity: 1, x: 0 }}
					transition={{ delay: 0.2 }}
					className="flex items-center"
				>
					<NextLink href="/">
						<Image
							src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/wd29-logo-2-tNv0T73M6BT4drA5KMOyZnne55624T.svg"
							alt="Webdesign29 Logo"
							width={100}
							height={35}
							className="mr-2"
						/>
					</NextLink>
				</motion.div>
				<nav className="hidden md:flex space-x-8">
					{menuItems.map((item, index) => (
						<motion.div
							key={item.name}
							initial={{ opacity: 0, y: -20 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ delay: 0.1 * index }}
						>
							{isHomePage && item.target ? (
								<Link
									to={item.target}
									spy={true}
									smooth={true}
									offset={-70}
									duration={500}
									className="text-white hover:text-accent transition-colors cursor-pointer"
								>
									{item.name}
								</Link>
							) : (
								<NextLink
									href={item.path}
									className="text-white hover:text-accent transition-colors cursor-pointer"
								>
									{item.name}
								</NextLink>
							)}
						</motion.div>
					))}
				</nav>
				<motion.div
					initial={{ opacity: 0, x: 20 }}
					animate={{ opacity: 1, x: 0 }}
					transition={{ delay: 0.2 }}
					className="flex items-center gap-4"
				>
					<NextLink href="/devis">
						<Button className="hidden md:flex bg-accent text-primary hover:bg-accent/90">
							Demander un devis
							<ArrowRight className="ml-2 h-4 w-4" />
						</Button>
					</NextLink>
					<Sheet open={isOpen} onOpenChange={setIsOpen}>
						<SheetTrigger asChild>
							<Button
								variant="ghost"
								size="icon"
								className="md:hidden text-white"
								aria-label="Menu"
							>
								{isOpen ? (
									<X className="h-6 w-6" />
								) : (
									<Menu className="h-6 w-6" />
								)}
							</Button>
						</SheetTrigger>
						<SheetContent
							side="right"
							className="w-[300px] bg-primary border-none"
						>
							<SheetHeader>
								<SheetTitle className="text-white">Menu</SheetTitle>
							</SheetHeader>
							<nav className="mt-8 flex flex-col space-y-4">
								{menuItems.map((item) => (
									<div key={item.name}>
										{isHomePage && item.target ? (
											<Link
												to={item.target}
												spy={true}
												smooth={true}
												offset={-70}
												duration={500}
												className="block text-white hover:text-accent transition-colors cursor-pointer text-lg"
												onClick={handleLinkClick}
											>
												{item.name}
											</Link>
										) : (
											<NextLink
												href={item.path}
												className="block text-white hover:text-accent transition-colors cursor-pointer text-lg"
												onClick={handleLinkClick}
											>
												{item.name}
											</NextLink>
										)}
									</div>
								))}
								<NextLink
									href="/devis"
									className="block text-white hover:text-accent transition-colors cursor-pointer text-lg"
									onClick={handleLinkClick}
								>
									Demander un devis
								</NextLink>
							</nav>
						</SheetContent>
					</Sheet>
				</motion.div>
			</div>
		</motion.header>
	);
}
