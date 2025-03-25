"use client";

import type React from "react";

import { useState, useRef, useEffect, useTransition } from "react";
import { Button } from "@/components/ui/button";
import { sendContactEmail } from "@/app/actions";
import { motion, AnimatePresence } from "framer-motion";
import {
	Loader2,
	CheckCircle,
	Send,
	AlertCircle,
	User,
	Mail,
	MessageSquare,
	Tag,
} from "lucide-react";

function SubmitButton({ isSubmitting }: { isSubmitting: boolean }) {
	return (
		<Button
			type="submit"
			className="w-full bg-accent text-primary hover:bg-accent/90 py-6 rounded-xl font-semibold text-base transition-all duration-200 shadow-md hover:shadow-lg"
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
					Envoyer le message
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
	subject: FieldError;
	message: FieldError;
};

export function ContactForm({
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
	const [validationErrors, setValidationErrors] = useState<ValidationErrors>({
		name: { error: false, message: "" },
		email: { error: false, message: "" },
		subject: { error: false, message: "" },
		message: { error: false, message: "" },
	});
	const [touched, setTouched] = useState({
		name: false,
		email: false,
		subject: false,
		message: false,
	});
	const formRef = useRef<HTMLFormElement>(null);
	const [isPending, startTransition] = useTransition();

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

			case "subject":
				if (!value.trim()) {
					return { error: true, message: "Le sujet est requis" };
				}
				if (value.trim().length < 3) {
					return {
						error: true,
						message: "Le sujet doit contenir au moins 3 caractères",
					};
				}
				return { error: false, message: "" };

			case "message":
				if (!value.trim()) {
					return { error: true, message: "Le message est requis" };
				}
				if (value.trim().length < 10) {
					return {
						error: true,
						message: "Le message doit contenir au moins 10 caractères",
					};
				}
				if (value.trim().length > 1000) {
					return {
						error: true,
						message: "Le message ne doit pas dépasser 1000 caractères",
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
			subject: validateField("subject", formData.subject),
			message: validateField("message", formData.message),
		};

		setValidationErrors(errors);

		// Check if any field has an error
		return !Object.values(errors).some((field) => field.error);
	};

	function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
		event.preventDefault();

		// Set all fields as touched
		setTouched({
			name: true,
			email: true,
			subject: true,
			message: true,
		});

		// Validate all fields before submission
		const isValid = validateForm();

		if (!isValid) {
			return;
		}

		setIsSubmitting(true);
		const formData = new FormData(event.currentTarget);

		startTransition(() => {
			sendContactEmail(formData)
				.then((result) => {
					setFormState(result);

					if (result.success) {
						addNotification(
							`New message from ${formData.get("name")}: ${formData.get("subject")}`,
						);
					}
				})
				.catch((error) => {
					console.error("Error during form submission:", error);
					setFormState({
						success: false,
						message:
							"Une erreur s'est produite lors de l'envoi du formulaire. Veuillez réessayer.",
					});
				})
				.finally(() => {
					setIsSubmitting(false);
				});
		});
	}

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
		<motion.div
			initial={{ opacity: 0, y: 20 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ duration: 0.5 }}
			className="bg-white p-8 sm:p-10 rounded-xl shadow-lg w-full mx-auto"
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
						<p className="text-center text-gray-600 mb-4">
							{formState.message}
						</p>
						<p className="text-center text-gray-500">
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
						<h3 className="text-2xl font-bold mb-8 text-center">
							Envoyez-nous un message
						</h3>
						<form ref={formRef} onSubmit={handleSubmit} className="space-y-8">
							<div className="relative">
								<div className="flex items-center absolute left-3 top-4 text-gray-400">
									<User size={18} />
								</div>
								<input
									type="text"
									id="name"
									name="name"
									placeholder="Votre nom"
									required
									value={formData.name}
									onChange={handleInputChange}
									onBlur={handleBlur}
									className={`pl-10 pt-4 pb-4 w-full rounded-xl transition-all duration-200 outline-none 
										${
											validationErrors.name.error && touched.name
												? "border-2 border-red-400 bg-red-50 focus:ring-2 focus:ring-red-200"
												: "border border-gray-200 bg-gray-50 focus:border-indigo-300 focus:ring-2 focus:ring-indigo-100"
										} placeholder-gray-400 text-gray-700`}
								/>
								{validationErrors.name.error && touched.name && (
									<motion.p
										initial={{ opacity: 0, y: -10 }}
										animate={{ opacity: 1, y: 0 }}
										className="mt-2 text-sm text-red-500 flex items-center"
									>
										<AlertCircle className="h-4 w-4 mr-1" />
										{validationErrors.name.message}
									</motion.p>
								)}
							</div>

							<div className="relative">
								<div className="flex items-center absolute left-3 top-4 text-gray-400">
									<Mail size={18} />
								</div>
								<input
									type="email"
									id="email"
									name="email"
									placeholder="Votre email"
									required
									value={formData.email}
									onChange={handleInputChange}
									onBlur={handleBlur}
									className={`pl-10 pt-4 pb-4 w-full rounded-xl transition-all duration-200 outline-none
										${
											validationErrors.email.error && touched.email
												? "border-2 border-red-400 bg-red-50 focus:ring-2 focus:ring-red-200"
												: "border border-gray-200 bg-gray-50 focus:border-indigo-300 focus:ring-2 focus:ring-indigo-100"
										} placeholder-gray-400 text-gray-700`}
								/>
								{validationErrors.email.error && touched.email && (
									<motion.p
										initial={{ opacity: 0, y: -10 }}
										animate={{ opacity: 1, y: 0 }}
										className="mt-2 text-sm text-red-500 flex items-center"
									>
										<AlertCircle className="h-4 w-4 mr-1" />
										{validationErrors.email.message}
									</motion.p>
								)}
							</div>

							<div className="relative">
								<div className="flex items-center absolute left-3 top-4 text-gray-400">
									<Tag size={18} />
								</div>
								<input
									type="text"
									id="subject"
									name="subject"
									placeholder="Sujet de votre message"
									required
									value={formData.subject}
									onChange={handleInputChange}
									onBlur={handleBlur}
									className={`pl-10 pt-4 pb-4 w-full rounded-xl transition-all duration-200 outline-none
										${
											validationErrors.subject.error && touched.subject
												? "border-2 border-red-400 bg-red-50 focus:ring-2 focus:ring-red-200"
												: "border border-gray-200 bg-gray-50 focus:border-indigo-300 focus:ring-2 focus:ring-indigo-100"
										} placeholder-gray-400 text-gray-700`}
								/>
								{validationErrors.subject.error && touched.subject && (
									<motion.p
										initial={{ opacity: 0, y: -10 }}
										animate={{ opacity: 1, y: 0 }}
										className="mt-2 text-sm text-red-500 flex items-center"
									>
										<AlertCircle className="h-4 w-4 mr-1" />
										{validationErrors.subject.message}
									</motion.p>
								)}
							</div>

							<div className="relative">
								<div className="flex items-center absolute left-3 top-4 text-gray-400">
									<MessageSquare size={18} />
								</div>
								<textarea
									id="message"
									name="message"
									rows={4}
									placeholder="Votre message"
									required
									value={formData.message}
									onChange={handleInputChange}
									onBlur={handleBlur}
									className={`pl-10 pt-4 pb-4 w-full rounded-xl transition-all duration-200 outline-none
										${
											validationErrors.message.error && touched.message
												? "border-2 border-red-400 bg-red-50 focus:ring-2 focus:ring-red-200"
												: "border border-gray-200 bg-gray-50 focus:border-indigo-300 focus:ring-2 focus:ring-indigo-100"
										} placeholder-gray-400 text-gray-700 resize-none min-h-[120px]`}
								/>
								{validationErrors.message.error && touched.message && (
									<motion.p
										initial={{ opacity: 0, y: -10 }}
										animate={{ opacity: 1, y: 0 }}
										className="mt-2 text-sm text-red-500 flex items-center"
									>
										<AlertCircle className="h-4 w-4 mr-1" />
										{validationErrors.message.message}
									</motion.p>
								)}
								{formData.message && (
									<p
										className={`mt-2 text-xs flex justify-end ${
											formData.message.length > 900
												? "text-amber-500"
												: "text-gray-500"
										}`}
									>
										{formData.message.length}/1000 caractères
									</p>
								)}
							</div>

							<motion.div
								whileHover={{ scale: 1.02 }}
								whileTap={{ scale: 0.98 }}
								className="mt-10"
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
