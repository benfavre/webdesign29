"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { createProject, updateProject } from "@/app/actions/database";
import { toast } from "sonner";

type Project = {
	id?: number;
	title: string;
	category: string;
	excerpt: string;
	description: string;
	imageUrl: string;
};

export function ProjectForm({ project = null }: { project?: Project | null }) {
	const router = useRouter();
	const [formData, setFormData] = useState({
		title: project?.title || "",
		category: project?.category || "",
		excerpt: project?.excerpt || "",
		description: project?.description || "",
		imageUrl: project?.imageUrl || "",
	});
	const [isPending, startTransition] = useTransition();

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		startTransition(async () => {
			if (project?.id) {
				// Update existing project
				const result = await updateProject(project.id, formData);
				if (result.success) {
					toast.success("Project updated successfully");
					router.push("/admin/projects");
					router.refresh();
				} else {
					toast.error(result.error);
				}
			} else {
				// Create new project
				const result = await createProject(formData);
				if (result.success) {
					toast.success("Project created successfully");
					router.push("/admin/projects");
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
					htmlFor="title"
					className="block text-sm font-medium text-gray-700"
				>
					Title
				</label>
				<Input
					id="title"
					value={formData.title}
					onChange={(e) => setFormData({ ...formData, title: e.target.value })}
					required
				/>
			</div>
			<div>
				<label
					htmlFor="category"
					className="block text-sm font-medium text-gray-700"
				>
					Category
				</label>
				<Input
					id="category"
					value={formData.category}
					onChange={(e) =>
						setFormData({ ...formData, category: e.target.value })
					}
					required
				/>
			</div>
			<div>
				<label
					htmlFor="excerpt"
					className="block text-sm font-medium text-gray-700"
				>
					Excerpt
				</label>
				<Textarea
					id="excerpt"
					value={formData.excerpt}
					onChange={(e) =>
						setFormData({ ...formData, excerpt: e.target.value })
					}
					required
				/>
			</div>
			<div>
				<label
					htmlFor="description"
					className="block text-sm font-medium text-gray-700"
				>
					Description
				</label>
				<Textarea
					id="description"
					value={formData.description}
					onChange={(e) =>
						setFormData({ ...formData, description: e.target.value })
					}
				/>
			</div>
			<div>
				<label
					htmlFor="imageUrl"
					className="block text-sm font-medium text-gray-700"
				>
					Image URL
				</label>
				<Input
					id="imageUrl"
					value={formData.imageUrl}
					onChange={(e) =>
						setFormData({ ...formData, imageUrl: e.target.value })
					}
				/>
			</div>
			<Button type="submit">{project ? "Update" : "Create"} Project</Button>
		</form>
	);
}
