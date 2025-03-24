import Image from "next/image"
import { Button } from "@/components/ui/button"
import { HeroForm } from "@/app/components/hero-form"
import { ArrowRight } from "lucide-react"


interface HeroSectionProps {
  addNotification: (message: string) => void
}

export function HeroSection({ addNotification }: HeroSectionProps) {
  return (
   <section id="accueil" className="relative pt-32 pb-20">
      <div className="absolute inset-0 z-0">
        <Image
          src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/wd29-bg.jpg-srWVxvPY3crvKflO07UQiypgnwMVKW.jpeg"
          alt="Ocean waves background"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-primary/90 to-primary/70" />
      </div>

      <div className="container relative z-10 mx-auto px-4 flex flex-col md:flex-row items-center">
        <div className="md:w-1/2 mb-10 md:mb-0">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight text-white">
            Création de sites internet et d'applications à Brest
          </h1>
          <p className="text-xl text-gray-100 mb-4">Développement / Hébergement / Maintenance</p>
          <p className="text-lg text-gray-200 mb-8">
            Création de sites internet, applications mobiles et logiciels professionnels avec des acteurs locaux
            Brestois
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Button size="lg" className="bg-accent text-primary hover:bg-accent/90">
              Nos réalisations
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="text-white bg-transparent border-white hover:bg-white/20 hover:text-accent transition-colors duration-300"
            >
              Contactez-nous
            </Button>
          </div>
        </div>
         <div className="md:w-1/2 relative">
          <HeroForm addNotification={addNotification} />
        </div>
      </div>
    </section>
  )
}

