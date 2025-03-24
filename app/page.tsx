"use client"

import { useCallback, useRef } from "react"
import { Suspense } from "react"
import { Header } from "@/app/components/Header"
import { HeroSection } from "@/app/components/HeroSection"
import { LocalActorSection } from "@/app/components/LocalActorSection"
import { ServicesSection } from "@/app/components/ServicesSection"
import { ProjectsSection } from "@/app/components/ProjectsSection"
import { TeamSection } from "@/app/components/TeamSection"
import { TestimonialsSection } from "@/app/components/TestimonialsSection"
import { ClientsSection } from "@/app/components/ClientsSection"
import { ContactSection } from "@/app/components/ContactSection"
import { Footer } from "@/app/components/Footer"
import { ProjectsSectionSkeleton } from "@/app/components/skeletons/ProjectsSectionSkeleton"
import { TestimonialsSectionSkeleton } from "@/app/components/skeletons/TestimonialsSectionSkeleton"
import { NotificationCenter, type NotificationCenterRef } from "@/app/components/NotificationCenter"

export default function Home() {
  const notificationCenterRef = useRef<NotificationCenterRef>(null)

  const addNotification = useCallback((message: string) => {
    notificationCenterRef.current?.addNotification(message)
  }, [])

  return (
    <div className="min-h-screen bg-white">
      <NotificationCenter ref={notificationCenterRef} />
      <Header />
      <HeroSection addNotification={addNotification} />
      <LocalActorSection />
      <ServicesSection />
      <Suspense fallback={<ProjectsSectionSkeleton />}>
        <ProjectsSection />
      </Suspense>
      <TeamSection />
      <Suspense fallback={<TestimonialsSectionSkeleton />}>
        <TestimonialsSection />
      </Suspense>
      <ClientsSection />
      <ContactSection addNotification={addNotification} />
      <Footer />
    </div>
  )
}

