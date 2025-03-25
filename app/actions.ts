"use server";

import { z } from "zod";
import { createContactSubmission } from "./lib/data";
import { logger } from "./lib/logger";

// Define validation schema for the contact form
const contactFormSchema = z.object({
	name: z
		.string()
		.min(2, { message: "Le nom doit contenir au moins 2 caractères" }),
	email: z
		.string()
		.email({ message: "Veuillez entrer une adresse email valide" }),
	subject: z
		.string()
		.min(2, { message: "Le sujet doit contenir au moins 2 caractères" }),
	message: z
		.string()
		.min(10, { message: "Le message doit contenir au moins 10 caractères" }),
});

type ContactFormData = z.infer<typeof contactFormSchema>;

// Server action to send email via Postmark and save to database
export async function sendContactEmail(formData: FormData) {
	const requestId = `contact-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;

	try {
		logger.info("Processing contact form submission", {
			context: "contact-form",
			requestId,
		});

		// Extract and validate form data
		const rawFormData = {
			name: formData.get("name"),
			email: formData.get("email"),
			subject: formData.get("subject"),
			message: formData.get("message"),
		};

		logger.debug("Validating form data", {
			context: "contact-form",
			requestId,
			data: {
				name: rawFormData.name,
				email: rawFormData.email,
				subject: rawFormData.subject,
				messageLength:
					typeof rawFormData.message === "string"
						? rawFormData.message.length
						: 0,
			},
		});

		// Validate form data
		const validatedFields = contactFormSchema.safeParse(rawFormData);

		// Return early if validation fails
		if (!validatedFields.success) {
			logger.warn("Form validation failed", {
				context: "contact-form",
				requestId,
				data: { errors: validatedFields.error.flatten().fieldErrors },
			});

			return {
				success: false,
				errors: validatedFields.error.flatten().fieldErrors,
			};
		}

		const { name, email, subject, message } = validatedFields.data;

		// Save to database
		logger.info("Saving contact submission to database", {
			context: "contact-form",
			requestId,
		});

		const dbResult = await createContactSubmission({
			name,
			email,
			subject,
			message,
		});

		if (!dbResult) {
			logger.error("Failed to save contact submission to database", {
				context: "contact-form",
				requestId,
			});
		} else {
			logger.info("Contact submission saved to database", {
				context: "contact-form",
				requestId,
				data: { submissionId: dbResult.id },
			});
		}

		// Create HTML email body
		const htmlBody = `
      <h2>Nouveau message de contact depuis webdesign29.net</h2>
      <p><strong>Nom:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Sujet:</strong> ${subject}</p>
      <p><strong>Message:</strong></p>
      <p>${message.replace(/\n/g, "<br>")}</p>
    `;

		// Send email via Postmark API
		logger.info("Sending email via Postmark API", {
			context: "contact-form",
			requestId,
		});

		try {
			const postmarkApiKey = process.env.POSTMARK_API_KEY || "";
			if (!postmarkApiKey) {
				logger.error("Postmark API key is not set", {
					context: "contact-form",
					requestId,
				});
				throw new Error("Postmark API key is not set");
			}
			const response = await fetch("https://api.postmarkapp.com/email", {
				method: "POST",
				headers: {
					Accept: "application/json",
					"Content-Type": "application/json",
					"X-Postmark-Server-Token": postmarkApiKey,
				},
				body: JSON.stringify({
					From: "contact@activ-communication.com",
					To: "ben@webdesign29.net",
					Subject: `Contact WebDesign29: ${subject}`,
					HtmlBody: htmlBody,
					MessageStream: "www-webdesign29-net-site",
				}),
			});

			if (!response.ok) {
				const errorData = await response.json();
				logger.error("Postmark API error", {
					context: "contact-form",
					requestId,
					data: { postmarkError: errorData },
				});

				return {
					success: false,
					message:
						"Une erreur s'est produite lors de l'envoi de votre message. Veuillez réessayer.",
				};
			}

			logger.info("Email sent successfully via Postmark", {
				context: "contact-form",
				requestId,
			});

			return {
				success: true,
				message:
					"Votre message a été envoyé avec succès. Nous vous répondrons dans les plus brefs délais.",
			};
		} catch (emailError) {
			logger.error("Error sending email via Postmark", {
				context: "contact-form",
				requestId,
				error: emailError,
			});

			return {
				success: false,
				message:
					"Une erreur s'est produite lors de l'envoi de votre message. Veuillez réessayer.",
			};
		}
	} catch (error) {
		logger.error("Unexpected error in contact form submission", {
			context: "contact-form",
			requestId,
			error,
		});

		return {
			success: false,
			message:
				"Une erreur s'est produite lors de l'envoi de votre message. Veuillez réessayer.",
		};
	}
}

// Define validation schema for the quote request form
const quoteRequestSchema = z.object({
	name: z
		.string()
		.min(2, { message: "Le nom doit contenir au moins 2 caractères" }),
	email: z
		.string()
		.email({ message: "Veuillez entrer une adresse email valide" }),
	phone: z.string().optional(),
	company: z.string().optional(),
	projectType: z
		.string()
		.min(1, { message: "Veuillez sélectionner un type de projet" }),
	budget: z.string().optional(),
	description: z
		.string()
		.min(10, { message: "La description doit contenir au moins 10 caractères" })
		.max(2000, {
			message: "La description ne doit pas dépasser 2000 caractères",
		}),
	deadline: z.string().optional(),
});

type QuoteRequestData = z.infer<typeof quoteRequestSchema>;

// Server action to send quote request email via Postmark
export async function sendQuoteRequest(formData: FormData) {
	const requestId = `quote-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;

	try {
		logger.info("Processing quote request submission", {
			context: "quote-request",
			requestId,
		});

		// Validate reCAPTCHA token
		const recaptchaToken = formData.get("recaptchaToken");
		if (!recaptchaToken) {
			logger.warn("reCAPTCHA token is missing", {
				context: "quote-request",
				requestId,
			});
			return {
				success: false,
				message: "Veuillez valider le reCAPTCHA",
			};
		}

		// Verify reCAPTCHA token with Google
		const recaptchaSecret = process.env.RECAPTCHA_SECRET_KEY;
		if (!recaptchaSecret) {
			logger.error("reCAPTCHA secret key is not set", {
				context: "quote-request",
				requestId,
			});
			throw new Error("reCAPTCHA secret key is not set");
		}

		const recaptchaResponse = await fetch(
			"https://www.google.com/recaptcha/api/siteverify",
			{
				method: "POST",
				headers: {
					"Content-Type": "application/x-www-form-urlencoded",
				},
				body: `secret=${recaptchaSecret}&response=${recaptchaToken}`,
			},
		);

		const recaptchaData = await recaptchaResponse.json();
		if (!recaptchaData.success) {
			logger.warn("reCAPTCHA verification failed", {
				context: "quote-request",
				requestId,
				data: recaptchaData,
			});
			return {
				success: false,
				message: "La validation reCAPTCHA a échoué. Veuillez réessayer.",
			};
		}

		// Extract and validate form data
		const rawFormData = {
			name: formData.get("name"),
			email: formData.get("email"),
			phone: formData.get("phone"),
			company: formData.get("company"),
			projectType: formData.get("projectType"),
			budget: formData.get("budget"),
			description: formData.get("description"),
			deadline: formData.get("deadline"),
		};

		logger.debug("Validating form data", {
			context: "quote-request",
			requestId,
			data: {
				name: rawFormData.name,
				email: rawFormData.email,
				projectType: rawFormData.projectType,
				descriptionLength:
					typeof rawFormData.description === "string"
						? rawFormData.description.length
						: 0,
			},
		});

		// Validate form data
		const validatedFields = quoteRequestSchema.safeParse(rawFormData);

		// Return early if validation fails
		if (!validatedFields.success) {
			logger.warn("Form validation failed", {
				context: "quote-request",
				requestId,
				data: { errors: validatedFields.error.flatten().fieldErrors },
			});

			return {
				success: false,
				errors: validatedFields.error.flatten().fieldErrors,
			};
		}

		const {
			name,
			email,
			phone,
			company,
			projectType,
			budget,
			description,
			deadline,
		} = validatedFields.data;

		// Create HTML email body
		const htmlBody = `
      <h2>Nouvelle demande de devis depuis webdesign29.net</h2>
      <p><strong>Nom:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      ${phone ? `<p><strong>Téléphone:</strong> ${phone}</p>` : ""}
      ${company ? `<p><strong>Entreprise:</strong> ${company}</p>` : ""}
      <p><strong>Type de projet:</strong> ${projectType}</p>
      ${budget ? `<p><strong>Budget estimé:</strong> ${budget}</p>` : ""}
      ${deadline ? `<p><strong>Délai souhaité:</strong> ${deadline}</p>` : ""}
      <p><strong>Description du projet:</strong></p>
      <p>${description.replace(/\n/g, "<br>")}</p>
    `;

		// Send email via Postmark API
		logger.info("Sending email via Postmark API", {
			context: "quote-request",
			requestId,
		});

		try {
			const postmarkApiKey = process.env.POSTMARK_API_KEY || "";
			if (!postmarkApiKey) {
				logger.error("Postmark API key is not set", {
					context: "quote-request",
					requestId,
				});
				throw new Error("Postmark API key is not set");
			}
			const response = await fetch("https://api.postmarkapp.com/email", {
				method: "POST",
				headers: {
					Accept: "application/json",
					"Content-Type": "application/json",
					"X-Postmark-Server-Token": postmarkApiKey,
				},
				body: JSON.stringify({
					From: "contact@activ-communication.com",
					To: "ben@webdesign29.net",
					Subject: `Nouvelle demande de devis: ${projectType}`,
					HtmlBody: htmlBody,
					MessageStream: "www-webdesign29-net-site",
				}),
			});

			if (!response.ok) {
				const errorData = await response.json();
				logger.error("Postmark API error", {
					context: "quote-request",
					requestId,
					data: { postmarkError: errorData },
				});

				return {
					success: false,
					message:
						"Une erreur s'est produite lors de l'envoi de votre demande. Veuillez réessayer.",
				};
			}

			logger.info("Email sent successfully via Postmark", {
				context: "quote-request",
				requestId,
			});

			return {
				success: true,
				message:
					"Votre demande de devis a été envoyée avec succès. Nous vous répondrons dans les plus brefs délais.",
			};
		} catch (emailError) {
			logger.error("Error sending email via Postmark", {
				context: "quote-request",
				requestId,
				error: emailError,
			});

			return {
				success: false,
				message:
					"Une erreur s'est produite lors de l'envoi de votre demande. Veuillez réessayer.",
			};
		}
	} catch (error) {
		logger.error("Unexpected error in quote request submission", {
			context: "quote-request",
			requestId,
			error,
		});

		return {
			success: false,
			message:
				"Une erreur s'est produite lors de l'envoi de votre demande. Veuillez réessayer.",
		};
	}
}
