"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { createTestimonial, updateTestimonial } from "@/app/actions/database";
import { toast } from "sonner";

type Testimonial = {
	id?: number;
	name: string;
	text: string;
	rating: number;
};

export function TestimonialForm({
	testimonial = null,
}: { testimonial?: Testimonial | null }) {
	const router = useRouter();
	const [formData, setFormData] = useState({
		name: testimonial?.name || "",
		text: testimonial?.text || "",
		rating: testimonial?.rating || 5,
	});
	const [isPending, startTransition] = useTransition();

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		startTransition(async () => {
			if (testimonial && testimonial.id) {
				// Update existing testimonial
				const result = await updateTestimonial(testimonial.id, formData);
				if (result.success) {
					toast.success("Testimonial updated successfully");
					router.push("/admin/testimonials");
					router.refresh();
				} else {
					toast.error(result.error);
				}
			} else {
				// Create new testimonial
				const result = await createTestimonial(formData);
				if (result.success) {
					toast.success("Testimonial created successfully");
					router.push("/admin/testimonials");
					router.refresh();
				} else {
					toast.error(result.error);
				}
			}
		});
	};

	return (
		<form onSubmit={handleSubmit} className="space-y-4">
			<div>
				<label
					htmlFor="name"
					className="block text-sm font-medium text-gray-700"
				>
					Name
				</label>
				<Input
					id="name"
					value={formData.name}
					onChange={(e) => setFormData({ ...formData, name: e.target.value })}
					required
				/>
			</div>
			<div>
				<label
					htmlFor="text"
					className="block text-sm font-medium text-gray-700"
				>
					Testimonial
				</label>
				<Textarea
					id="text"
					value={formData.text}
					onChange={(e) => setFormData({ ...formData, text: e.target.value })}
					required
				/>
			</div>
			<div>
				<label
					htmlFor="rating"
					className="block text-sm font-medium text-gray-700"
				>
					Rating
				</label>
				<Input
					id="rating"
					type="number"
					min="1"
					max="5"
					value={formData.rating}
					onChange={(e) =>
						setFormData({
							...formData,
							rating: Number.parseInt(e.target.value),
						})
					}
					required
				/>
			</div>
			<Button type="submit">
				{testimonial ? "Update" : "Create"} Testimonial
			</Button>
		</form>
	);
}
