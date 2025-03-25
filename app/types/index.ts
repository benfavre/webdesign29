export interface Project {
	id: string;
	title: string;
	description: string;
	imageUrl: string;
	category: string;
	link?: string;
}

export interface Testimonial {
	id: string;
	name: string;
	role: string;
	company: string;
	content: string;
	imageUrl: string;
}
