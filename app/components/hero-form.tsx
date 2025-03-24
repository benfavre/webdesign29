"use client";

import type React from "react";

import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { sendContactEmail } from "@/app/actions";
import { motion, AnimatePresence } from "framer-motion";
import { Loader2, CheckCircle, Send } from "lucide-react";

function SubmitButton({ isSubmitting }: { isSubmitting: boolean }) {
	return (
		<Button
			type="submit"
			className="w-full bg-accent text-primary hover:bg-accent/90"
			disabled={isSubmitting}
		>
			{isSubmitting ? (
				<>
					<Loader2 className="mr-2 h-4 w-4 animate-spin" />
					Envoi en cours...
				</>
			) : (
				<>
					<Send className="mr-2 h-4 w-4" />
					Envoyer
				</>
			)}
		</Button>
	);
}

export function HeroForm({
	addNotification,
}: { addNotification: (message: string) => void }) {
	const [formState, setFormState] = useState<{
		message?: string;
		success?: boolean;
		errors?: Record<string, string[]>;
	}>({});
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [countdown, setCountdown] = useState(5);
	const [formData, setFormData] = useState({
		name: "",
		email: "",
		subject: "",
		message: "",
	});
	const formRef = useRef<HTMLFormElement>(null);

	useEffect(() => {
		if (formState.success) {
			const timer = setInterval(() => {
				setCountdown((prev) => {
					if (prev <= 1) {
						clearInterval(timer);
						setFormState({});
						setFormData({ name: "", email: "", subject: "", message: "" });
						return 5;
					}
					return prev - 1;
				});
			}, 1000);
			return () => clearInterval(timer);
		}
	}, [formState.success]);

	async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
		event.preventDefault();
		setIsSubmitting(true);
		const formData = new FormData(event.currentTarget);
		try {
			const result = await sendContactEmail(formData);
			setFormState(result);

			if (result.success) {
				addNotification(
					`New message from ${formData.get("name")}: ${formData.get("subject")}`,
				);
			}
		} catch (error) {
			console.error("Error during form submission:", error);
			setFormState({
				success: false,
				message:
					"Une erreur s'est produite lors de l'envoi du formulaire. Veuillez réessayer.",
			});
		} finally {
			setIsSubmitting(false);
		}
	}

	const handleInputChange = (
		e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
	) => {
		const { name, value } = e.target;
		setFormData((prev) => ({ ...prev, [name]: value }));
	};

	return (
		<motion.div
			initial={{ opacity: 0, y: 20 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ duration: 0.5 }}
			className="bg-white/10 backdrop-blur-sm rounded-lg p-6 w-full max-w-md mx-auto"
		>
			<AnimatePresence mode="wait">
				{formState.success ? (
					<motion.div
						key="success"
						initial={{ opacity: 0, scale: 0.8 }}
						animate={{ opacity: 1, scale: 1 }}
						exit={{ opacity: 0, scale: 0.8 }}
						transition={{ duration: 0.5 }}
						className="flex flex-col items-center justify-center h-full"
					>
						<CheckCircle className="text-green-500 w-16 h-16 mb-4" />
						<h3 className="text-2xl font-bold text-green-500 mb-2">
							Message envoyé !
						</h3>
						<p className="text-center text-white mb-4">{formState.message}</p>
						<p className="text-center text-white/80">
							Le formulaire réapparaîtra dans {countdown} secondes
						</p>
					</motion.div>
				) : (
					<motion.div
						key="form"
						initial={{ opacity: 1 }}
						exit={{ opacity: 0 }}
						transition={{ duration: 0.5 }}
					>
						<h3 className="text-xl font-bold mb-6 text-white">
							Contactez-nous
						</h3>

						<AnimatePresence>
							{formState.message && (
								<motion.div
									initial={{ opacity: 0, y: -10 }}
									animate={{ opacity: 1, y: 0 }}
									exit={{ opacity: 0, y: -10 }}
									className={`p-3 mb-4 rounded-md ${
										formState.success
											? "bg-green-50/90 text-green-700"
											: "bg-red-50/90 text-red-700"
									}`}
								>
									{formState.message}
								</motion.div>
							)}
						</AnimatePresence>

						<form ref={formRef} onSubmit={handleSubmit} className="space-y-4">
							<div>
								<label
									htmlFor="name-hero"
									className="block text-sm font-medium text-white"
								>
									Nom
								</label>
								<input
									type="text"
									id="name-hero"
									name="name"
									required
									value={formData.name}
									onChange={handleInputChange}
									className={`w-full px-3 py-2 bg-white/20 border ${
										formState.errors?.name
											? "border-red-400"
											: "border-white/30"
									} rounded-md text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent`}
									placeholder="Votre nom"
								/>
								{formState.errors?.name && (
									<p className="mt-1 text-sm text-red-200">
										{formState.errors.name[0]}
									</p>
								)}
							</div>
							<div>
								<label
									htmlFor="email-hero"
									className="block text-sm font-medium text-white"
								>
									Email
								</label>
								<input
									type="email"
									id="email-hero"
									name="email"
									required
									value={formData.email}
									onChange={handleInputChange}
									className={`w-full px-3 py-2 bg-white/20 border ${
										formState.errors?.email
											? "border-red-400"
											: "border-white/30"
									} rounded-md text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent`}
									placeholder="votre@email.com"
								/>
								{formState.errors?.email && (
									<p className="mt-1 text-sm text-red-200">
										{formState.errors.email[0]}
									</p>
								)}
							</div>
							<div>
								<label
									htmlFor="subject-hero"
									className="block text-sm font-medium text-white"
								>
									Sujet
								</label>
								<input
									type="text"
									id="subject-hero"
									name="subject"
									required
									value={formData.subject}
									onChange={handleInputChange}
									className={`w-full px-3 py-2 bg-white/20 border ${
										formState.errors?.subject
											? "border-red-400"
											: "border-white/30"
									} rounded-md text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent`}
									placeholder="Sujet de votre message"
								/>
								{formState.errors?.subject && (
									<p className="mt-1 text-sm text-red-200">
										{formState.errors.subject[0]}
									</p>
								)}
							</div>
							<div>
								<label
									htmlFor="message-hero"
									className="block text-sm font-medium text-white"
								>
									Message
								</label>
								<textarea
									id="message-hero"
									name="message"
									rows={4}
									required
									value={formData.message}
									onChange={handleInputChange}
									className={`w-full px-3 py-2 bg-white/20 border ${
										formState.errors?.message
											? "border-red-400"
											: "border-white/30"
									} rounded-md text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent`}
									placeholder="Votre message"
								/>
								{formState.errors?.message && (
									<p className="mt-1 text-sm text-red-200">
										{formState.errors.message[0]}
									</p>
								)}
							</div>
							<motion.div
								whileHover={{ scale: 1.02 }}
								whileTap={{ scale: 0.98 }}
							>
								<SubmitButton isSubmitting={isSubmitting} />
							</motion.div>
						</form>
					</motion.div>
				)}
			</AnimatePresence>
		</motion.div>
	);
}
