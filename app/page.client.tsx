"use client";

import { Header } from "@/app/components/Header";
import { HeroSection } from "@/app/components/HeroSection";
import { LocalActorSection } from "@/app/components/LocalActorSection";
import { ServicesSection } from "@/app/components/ServicesSection";
import { ProjectsSection } from "@/app/components/ProjectsSection";
import { TeamSection } from "@/app/components/TeamSection";
import { TestimonialsSection } from "@/app/components/TestimonialsSection";
import { ClientsSection } from "@/app/components/ClientsSection";
import { ContactSection } from "@/app/components/ContactSection";
import { Footer } from "@/app/components/Footer";
import { ProjectsSectionSkeleton } from "@/app/components/skeletons/ProjectsSectionSkeleton";
import { TestimonialsSectionSkeleton } from "@/app/components/skeletons/TestimonialsSectionSkeleton";
import { Suspense } from "react";
import {
	NotificationCenter,
	type NotificationCenterRef,
} from "@/app/components/NotificationCenter";
import { useCallback, useRef } from "react";

export default function Home({
	projects,
	testimonials,
}: {
	projects: Project[];
	testimonials: Testimonial[];
}) {
	const notificationCenterRef = useRef<NotificationCenterRef>(null);

	const addNotification = useCallback((message: string) => {
		notificationCenterRef.current?.addNotification(message);
	}, []);
	return (
		<div className="min-h-screen bg-white">
			<NotificationCenter ref={notificationCenterRef} />
			<Header />
			<HeroSection addNotification={addNotification} />
			<LocalActorSection />
			<ServicesSection />
			<Suspense fallback={<ProjectsSectionSkeleton />}>
				<ProjectsSection projects={projects} />
			</Suspense>
			<TeamSection />
			<Suspense fallback={<TestimonialsSectionSkeleton />}>
				<TestimonialsSection testimonials={testimonials} />
			</Suspense>
			<ClientsSection />
			<Footer />
		</div>
	);
}
