import { ContactForm } from "@/app/components/contact-form"
import { MapPin, Mail, Phone, Facebook, Twitter, Instagram } from "lucide-react"

interface ContactSectionProps {
  addNotification: (message: string) => void
}

export function ContactSection({ addNotification }: ContactSectionProps) {
  return (
  
           
   <section id="contact" className="py-20">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div>
            <h2 className="text-3xl font-bold mb-6">Contactez-nous</h2>
            <p className="text-gray-600 mb-8">
              Vous avez un projet en tête ? N'hésitez pas à nous contacter pour en discuter. Nous sommes là pour vous
              aider à concrétiser vos idées.
            </p>
            <div className="space-y-6">
              <div className="flex items-start">
                <div className="bg-accent/10 p-3 rounded-full mr-4">
                  <MapPin className="h-6 w-6 text-accent" />
                </div>
                <div>
                  <h3 className="font-bold mb-1">Adresse</h3>
                  <p className="text-gray-600">5 place de la liberté, 29200 Brest, France</p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="bg-accent/10 p-3 rounded-full mr-4">
                  <Mail className="h-6 w-6 text-accent" />
                </div>
                <div>
                  <h3 className="font-bold mb-1">Email</h3>
                  <p className="text-gray-600">contact@webdesign29.net</p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="bg-accent/10 p-3 rounded-full mr-4">
                  <Phone className="h-6 w-6 text-accent" />
                </div>
                <div>
                  <h3 className="font-bold mb-1">Téléphone</h3>
                  <p className="text-gray-600">+33 7 60 48 51 21</p>
                </div>
              </div>
            </div>
            <div className="mt-8">
              <h3 className="font-bold mb-4">Suivez-nous</h3>
              <div className="flex space-x-4">
                <a href="#" className="bg-accent/10 p-3 rounded-full text-accent hover:bg-accent/20 transition-colors">
                  <Facebook className="h-6 w-6" />
                </a>
                <a href="#" className="bg-accent/10 p-3 rounded-full text-accent hover:bg-accent/20 transition-colors">
                  <Twitter className="h-6 w-6" />
                </a>
                <a href="#" className="bg-accent/10 p-3 rounded-full text-accent hover:bg-accent/20 transition-colors">
                  <Instagram className="h-6 w-6" />
                </a>
                <a href="#" className="bg-accent/10 p-3 rounded-full text-accent hover:bg-accent/20 transition-colors">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                    <rect width="4" height="12" x="2" y="9" />
                    <circle cx="4" cy="4" r="2" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
           <ContactForm addNotification={addNotification} />
        </div>
      </div>
    </section>
  )
}

