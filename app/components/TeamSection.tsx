import Image from "next/image"
import { Twitter, Instagram } from "lucide-react"

export function TeamSection() {
  const teamMembers = [
    { name: "Benjamin Favre", role: "Directeur & Développeur Full Stack" },
    { name: "Jordan Favre", role: "Ingénieur Responsable Projet" },
    { name: "Karim", role: "Développeur Full Stack & Infrastructure" },
    { name: "Bruno Ducloux", role: "Responsable Projet & Stratégie" },
    { name: "Cécile Auffret", role: "Comptabilité" },
  ]

  return (
    <section id="equipe" className="py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold mb-4">Notre Équipe</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Une équipe de professionnels passionnés et expérimentés, prêts à donner vie à vos projets.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {teamMembers.map((member, index) => (
            <div key={index} className="text-center">
              <div className="relative mx-auto w-48 h-48 mb-6 rounded-full overflow-hidden">
                <Image
                  src={`/placeholder.svg?height=200&width=200&text=${member.name.split(" ")[0]}`}
                  alt={member.name}
                  width={200}
                  height={200}
                  className="object-cover"
                />
              </div>
              <h3 className="text-xl font-bold mb-1">{member.name}</h3>
              <p className="text-gray-600 mb-4">{member.role}</p>
              <div className="flex justify-center space-x-3">
                <a href="#" className="text-gray-400 hover:text-accent transition-colors">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
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
                <a href="#" className="text-gray-400 hover:text-accent transition-colors">
                  <Twitter className="h-5 w-5" />
                </a>
                <a href="#" className="text-gray-400 hover:text-accent transition-colors">
                  <Instagram className="h-5 w-5" />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

