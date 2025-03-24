import { getProjects, getTestimonials } from "./lib/data";
import PageClient from "./page.client";

export default async function Home() {
	const projects = await getProjects();
	const testimonials = await getTestimonials();

	return <PageClient projects={projects} testimonials={testimonials} />;
}
