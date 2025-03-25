"use client";

import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import { motion, AnimatePresence } from "framer-motion";
import { Home, Loader2, CheckCircle, Send, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useState, useRef, useEffect, useCallback } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { sendQuoteRequest } from "@/app/actions";
import {
	NotificationCenter,
	type NotificationCenterRef,
} from "@/app/components/NotificationCenter";
import ReCAPTCHA from "react-google-recaptcha";

function SubmitButton({ isSubmitting }: { isSubmitting: boolean }) {
	return (
		<Button
			type="submit"
			className="w-full bg-primary hover:bg-primary/90 px-8"
			disabled={isSubmitting}
		>
			{isSubmitting ? (
				<>
					<Loader2 className="mr-2 h-5 w-5 animate-spin" />
					Envoi en cours...
				</>
			) : (
				<>
					<Send className="mr-2 h-5 w-5" />
					Envoyer la demande
				</>
			)}
		</Button>
	);
}

type FieldError = {
	error: boolean;
	message: string;
};

type ValidationErrors = {
	name: FieldError;
	email: FieldError;
	projectType: FieldError;
	description: FieldError;
};

export default function QuoteRequestPage() {
	const notificationCenterRef = useRef<NotificationCenterRef>(null);
	const recaptchaRef = useRef<ReCAPTCHA>(null);
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
		phone: "",
		company: "",
		projectType: "",
		budget: "",
		description: "",
		deadline: "",
	});
	const [validationErrors, setValidationErrors] = useState<ValidationErrors>({
		name: { error: false, message: "" },
		email: { error: false, message: "" },
		projectType: { error: false, message: "" },
		description: { error: false, message: "" },
	});
	const [touched, setTouched] = useState({
		name: false,
		email: false,
		projectType: false,
		description: false,
	});
	const formRef = useRef<HTMLFormElement>(null);

	const addNotification = useCallback((message: string) => {
		notificationCenterRef.current?.addNotification(message);
	}, []);

	useEffect(() => {
		if (formState.success) {
			const timer = setInterval(() => {
				setCountdown((prev) => {
					if (prev <= 1) {
						clearInterval(timer);
						setFormState({});
						setFormData({
							name: "",
							email: "",
							phone: "",
							company: "",
							projectType: "",
							budget: "",
							description: "",
							deadline: "",
						});
						return 5;
					}
					return prev - 1;
				});
			}, 1000);
			return () => clearInterval(timer);
		}
	}, [formState.success]);

	// Validate form field
	const validateField = (name: string, value: string): FieldError => {
		switch (name) {
			case "name":
				if (!value.trim()) {
					return { error: true, message: "Le nom est requis" };
				}
				if (value.trim().length < 2) {
					return {
						error: true,
						message: "Le nom doit contenir au moins 2 caractères",
					};
				}
				return { error: false, message: "" };

			case "email": {
				if (!value.trim()) {
					return { error: true, message: "L'email est requis" };
				}
				// Basic email validation regex
				const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
				if (!emailRegex.test(value)) {
					return {
						error: true,
						message: "Veuillez entrer une adresse email valide",
					};
				}
				return { error: false, message: "" };
			}

			case "projectType":
				if (!value) {
					return {
						error: true,
						message: "Veuillez sélectionner un type de projet",
					};
				}
				return { error: false, message: "" };

			case "description":
				if (!value.trim()) {
					return { error: true, message: "La description est requise" };
				}
				if (value.trim().length < 10) {
					return {
						error: true,
						message: "La description doit contenir au moins 10 caractères",
					};
				}
				if (value.trim().length > 2000) {
					return {
						error: true,
						message: "La description ne doit pas dépasser 2000 caractères",
					};
				}
				return { error: false, message: "" };

			default:
				return { error: false, message: "" };
		}
	};

	// Validate all fields
	const validateForm = (): boolean => {
		const errors = {
			name: validateField("name", formData.name),
			email: validateField("email", formData.email),
			projectType: validateField("projectType", formData.projectType),
			description: validateField("description", formData.description),
		};

		setValidationErrors(errors);

		// Check if any field has an error
		return !Object.values(errors).some((field) => field.error);
	};

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		// Set all fields as touched
		setTouched({
			name: true,
			email: true,
			projectType: true,
			description: true,
		});

		// Validate all fields before submission
		const isValid = validateForm();

		if (!isValid) {
			return;
		}

		// Get reCAPTCHA token
		const recaptchaToken = recaptchaRef.current?.getValue();
		if (!recaptchaToken) {
			setFormState({
				success: false,
				message: "Veuillez valider le reCAPTCHA",
			});
			return;
		}

		setIsSubmitting(true);

		// Create FormData with proper field names
		const formDataToSubmit = new FormData();
		formDataToSubmit.append("name", formData.name);
		formDataToSubmit.append("email", formData.email);
		formDataToSubmit.append("phone", formData.phone);
		formDataToSubmit.append("company", formData.company);
		formDataToSubmit.append("projectType", formData.projectType);
		formDataToSubmit.append("budget", formData.budget);
		formDataToSubmit.append("description", formData.description);
		formDataToSubmit.append("deadline", formData.deadline);
		formDataToSubmit.append("recaptchaToken", recaptchaToken);

		try {
			const result = await sendQuoteRequest(formDataToSubmit);
			setFormState(result);

			if (result.success) {
				addNotification(
					`Nouvelle demande de devis de ${formData.name}: ${formData.projectType}`,
				);
				// Reset reCAPTCHA
				recaptchaRef.current?.reset();
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
	};

	const handleInputChange = (
		e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
	) => {
		const { name, value } = e.target;
		setFormData((prev) => ({ ...prev, [name]: value }));

		// Only validate if the field has been touched
		if (touched[name as keyof typeof touched]) {
			setValidationErrors((prev) => ({
				...prev,
				[name]: validateField(name, value),
			}));
		}
	};

	const handleBlur = (
		e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>,
	) => {
		const { name } = e.target;
		setTouched((prev) => ({ ...prev, [name]: true }));
		setValidationErrors((prev) => ({
			...prev,
			[name]: validateField(name, formData[name as keyof typeof formData]),
		}));
	};

	return (
		<div className="min-h-screen flex flex-col">
			<NotificationCenter ref={notificationCenterRef} />
			<Header />
			<main className="flex-grow pt-24">
				<div className="container mx-auto px-4 pt-4">
					<Link
						href="/"
						className="inline-flex items-center text-primary hover:text-primary/80 mb-4"
					>
						<Home className="w-4 h-4 mr-1" />
						<span>Retour à l'accueil</span>
					</Link>
				</div>
				<section className="py-20">
					<div className="container mx-auto px-4 max-w-3xl">
						<motion.div
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.5 }}
							className="text-center mb-16"
						>
							<h1 className="text-4xl font-bold mb-4">Demander un Devis</h1>
							<p className="text-gray-600">
								Remplissez le formulaire ci-dessous pour recevoir un devis
								personnalisé adapté à vos besoins.
							</p>
						</motion.div>

						<AnimatePresence mode="wait">
							{formState.success ? (
								<motion.div
									key="success"
									initial={{ opacity: 0, scale: 0.8 }}
									animate={{ opacity: 1, scale: 1 }}
									exit={{ opacity: 0, scale: 0.8 }}
									transition={{ duration: 0.5 }}
									className="bg-white p-8 rounded-lg shadow-lg border border-gray-200 text-center"
								>
									<CheckCircle className="text-green-500 w-16 h-16 mx-auto mb-4" />
									<h3 className="text-2xl font-bold text-green-500 mb-2">
										Demande envoyée !
									</h3>
									<p className="text-center text-gray-600 mb-4">
										{formState.message}
									</p>
									<p className="text-center text-gray-500">
										Le formulaire réapparaîtra dans {countdown} secondes
									</p>
								</motion.div>
							) : (
								<motion.form
									key="form"
									initial={{ opacity: 0, y: 20 }}
									animate={{ opacity: 1, y: 0 }}
									transition={{ delay: 0.1, duration: 0.5 }}
									onSubmit={(e: React.FormEvent<HTMLFormElement>) =>
										handleSubmit(e)
									}
									ref={formRef}
									className="bg-white p-8 rounded-lg shadow-lg border border-gray-200"
								>
									<AnimatePresence>
										{formState.message && (
											<motion.div
												initial={{ opacity: 0, y: -10 }}
												animate={{ opacity: 1, y: 0 }}
												exit={{ opacity: 0, y: -10 }}
												className={`p-3 mb-4 rounded-md ${
													formState.success
														? "bg-green-50 text-green-700"
														: "bg-red-50 text-red-700"
												}`}
											>
												{formState.message}
											</motion.div>
										)}
									</AnimatePresence>

									<div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
										<div className="space-y-2">
											<Label htmlFor="name">Nom complet *</Label>
											<Input
												id="name"
												name="name"
												required
												value={formData.name}
												onChange={handleInputChange}
												onBlur={handleBlur}
												className={`${
													validationErrors.name.error && touched.name
														? "border-red-500 focus:ring-red-500"
														: ""
												}`}
												placeholder="Votre nom"
											/>
											{validationErrors.name.error && touched.name && (
												<motion.p
													initial={{ opacity: 0, y: -10 }}
													animate={{ opacity: 1, y: 0 }}
													className="text-sm text-red-500 flex items-center"
												>
													<AlertCircle className="h-4 w-4 mr-1" />
													{validationErrors.name.message}
												</motion.p>
											)}
										</div>
										<div className="space-y-2">
											<Label htmlFor="email">Email *</Label>
											<Input
												id="email"
												name="email"
												type="email"
												required
												value={formData.email}
												onChange={handleInputChange}
												onBlur={handleBlur}
												className={`${
													validationErrors.email.error && touched.email
														? "border-red-500 focus:ring-red-500"
														: ""
												}`}
												placeholder="votre@email.com"
											/>
											{validationErrors.email.error && touched.email && (
												<motion.p
													initial={{ opacity: 0, y: -10 }}
													animate={{ opacity: 1, y: 0 }}
													className="text-sm text-red-500 flex items-center"
												>
													<AlertCircle className="h-4 w-4 mr-1" />
													{validationErrors.email.message}
												</motion.p>
											)}
										</div>
									</div>

									<div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
										<div className="space-y-2">
											<Label htmlFor="phone">Téléphone</Label>
											<Input
												id="phone"
												name="phone"
												type="tel"
												value={formData.phone}
												onChange={handleInputChange}
												placeholder="Votre numéro"
											/>
										</div>
										<div className="space-y-2">
											<Label htmlFor="company">Entreprise</Label>
											<Input
												id="company"
												name="company"
												value={formData.company}
												onChange={handleInputChange}
												placeholder="Nom de votre entreprise"
											/>
										</div>
									</div>

									<div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
										<div className="space-y-2">
											<Label htmlFor="projectType">Type de projet *</Label>
											<Select
												value={formData.projectType}
												onValueChange={(value) => {
													setFormData((prev) => ({
														...prev,
														projectType: value,
													}));
													// Validate immediately when value changes
													if (touched.projectType) {
														setValidationErrors((prev) => ({
															...prev,
															projectType: validateField("projectType", value),
														}));
													}
												}}
											>
												<SelectTrigger
													className={`${
														validationErrors.projectType.error &&
														touched.projectType
															? "border-red-500 focus:ring-red-500"
															: ""
													}`}
												>
													<SelectValue placeholder="Sélectionnez un type" />
												</SelectTrigger>
												<SelectContent>
													<SelectItem value="site-vitrine">
														Site vitrine
													</SelectItem>
													<SelectItem value="ecommerce">E-commerce</SelectItem>
													<SelectItem value="application">
														Application web
													</SelectItem>
													<SelectItem value="autre">Autre</SelectItem>
												</SelectContent>
											</Select>
											{validationErrors.projectType.error &&
												touched.projectType && (
													<motion.p
														initial={{ opacity: 0, y: -10 }}
														animate={{ opacity: 1, y: 0 }}
														className="text-sm text-red-500 flex items-center"
													>
														<AlertCircle className="h-4 w-4 mr-1" />
														{validationErrors.projectType.message}
													</motion.p>
												)}
										</div>
										<div className="space-y-2">
											<Label htmlFor="budget">Budget estimé</Label>
											<Select
												value={formData.budget}
												onValueChange={(value) =>
													setFormData((prev) => ({ ...prev, budget: value }))
												}
											>
												<SelectTrigger>
													<SelectValue placeholder="Sélectionnez un budget" />
												</SelectTrigger>
												<SelectContent>
													<SelectItem value="1000-3000">
														1000€ - 3000€
													</SelectItem>
													<SelectItem value="3000-5000">
														3000€ - 5000€
													</SelectItem>
													<SelectItem value="5000-10000">
														5000€ - 10000€
													</SelectItem>
													<SelectItem value="10000+">10000€ et plus</SelectItem>
												</SelectContent>
											</Select>
										</div>
									</div>

									<div className="space-y-2 mb-6">
										<Label htmlFor="description">Description du projet *</Label>
										<Textarea
											id="description"
											name="description"
											required
											value={formData.description}
											onChange={handleInputChange}
											onBlur={handleBlur}
											className={`min-h-[150px] ${
												validationErrors.description.error &&
												touched.description
													? "border-red-500 focus:ring-red-500"
													: ""
											}`}
											placeholder="Décrivez votre projet en détail..."
										/>
										{validationErrors.description.error &&
											touched.description && (
												<motion.p
													initial={{ opacity: 0, y: -10 }}
													animate={{ opacity: 1, y: 0 }}
													className="text-sm text-red-500 flex items-center"
												>
													<AlertCircle className="h-4 w-4 mr-1" />
													{validationErrors.description.message}
												</motion.p>
											)}
										{formData.description && (
											<p
												className={`text-xs flex justify-end ${
													formData.description.length > 1900
														? "text-amber-500"
														: "text-gray-500"
												}`}
											>
												{formData.description.length}/2000 caractères
											</p>
										)}
									</div>

									<div className="space-y-2 mb-6">
										<Label htmlFor="deadline">Délai souhaité</Label>
										<Input
											id="deadline"
											name="deadline"
											type="date"
											value={formData.deadline}
											onChange={handleInputChange}
										/>
									</div>

									<motion.div
										whileHover={{ scale: 1.02 }}
										whileTap={{ scale: 0.98 }}
										className="mt-10"
									>
										<div className="flex justify-center mb-4">
											<ReCAPTCHA
												ref={recaptchaRef}
												sitekey={
													process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY || ""
												}
												size="normal"
												onChange={(token) => {
													console.log("reCAPTCHA token changed:", token);
												}}
											/>
										</div>
										<SubmitButton isSubmitting={isSubmitting} />
									</motion.div>
								</motion.form>
							)}
						</AnimatePresence>

						<motion.div
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ delay: 0.3, duration: 0.5 }}
							className="mt-12 text-center"
						>
							<p className="text-gray-600">
								Nous vous répondrons dans les plus brefs délais pour discuter de
								votre projet en détail.
							</p>
						</motion.div>
					</div>
				</section>
			</main>
			<Footer />
		</div>
	);
}
