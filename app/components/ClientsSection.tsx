import Image from "next/image"

export function ClientsSection() {
  const clients = [
    {
      name: "Planète Loisirs",
      logo: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Logo-.Plabete-loisirspng-150x150-GZAoWQ08a5ae0Cyn4gt2Upo5pDIgrR.png",
    },
    {
      name: "Breizh Cup Cake Events",
      logo: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Logo-Breizh-cup-cake-events-150x150-Bo5HElWIIx7MzYL1eKGXHW6CsW6kCL.png",
    },
    {
      name: "Brest Bretagne Handball",
      logo: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Logo-BBH-150x150-Hy5Hy5Hy5Hy5Hy5Hy5Hy5Hy5Hy5Hy5Hy5.png",
    },
    {
      name: "Brest'Aim",
      logo: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Logo-Brest-aim-150x150-Hy5Hy5Hy5Hy5Hy5Hy5Hy5Hy5Hy5Hy5Hy5.png",
    },
    {
      name: "ORB",
      logo: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Logo-ORB-150x150-Hy5Hy5Hy5Hy5Hy5Hy5Hy5Hy5Hy5Hy5Hy5.png",
    },
    {
      name: "AMF29",
      logo: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Logo-AMF29-150x150-Hy5Hy5Hy5Hy5Hy5Hy5Hy5Hy5Hy5Hy5Hy5.png",
    },
    {
      name: "Carrefour des Communes",
      logo: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Logo-Carrefour-des-communes-150x150-Hy5Hy5Hy5Hy5Hy5Hy5Hy5Hy5Hy5Hy5Hy5.png",
    },
    {
      name: "Ville de Brest",
      logo: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Logo-Ville-de-Brest-150x150-Hy5Hy5Hy5Hy5Hy5Hy5Hy5Hy5Hy5Hy5Hy5.png",
    },
    {
      name: "Brest Métropole",
      logo: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Logo-Brest-Metropole-150x150-Hy5Hy5Hy5Hy5Hy5Hy5Hy5Hy5Hy5Hy5Hy5.png",
    },
    {
      name: "Région Bretagne",
      logo: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Logo-Region-Bretagne-150x150-Hy5Hy5Hy5Hy5Hy5Hy5Hy5Hy5Hy5Hy5Hy5.png",
    },
    {
      name: "Reference Carrelage",
      logo: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Logo-Reference-Carrelage-150x150-Hf5gF5jieTn6xpu6NgfuJq7i1axklC.png",
    },
    {
      name: "Prestanim Location",
      logo: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Logo-Prestanim-150x150-URpqRcKAjAhTMr6uliRc9d0NyTi9hp.png",
    },
    {
      name: "Ucopia",
      logo: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Logo-Ucopia-150x150-dKkanKrtv8abphn1Nvt4IQnJY3FW3y.png",
    },
    {
      name: "Les Viviers de Terenez",
      logo: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Logo-Viviers-de-terenez-150x150-ho83TVpVzUUIAz19fa8BQEhwXgMi4Y.png",
    },
    {
      name: "Rinkla Stadium",
      logo: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Logo-Rinkla-150x150-4pDgEu0yIpuZUtjkOJLPiAsVJWXhoY.png",
    },
    {
      name: "Label 5",
      logo: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Logo-Label5-150x150-YX30aL0hEFHeOlQwVEYbU0Cl2TOi7p.png",
    },
    {
      name: "Clotilde Mallégol Ostéopathe",
      logo: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Logo-Osteopathe-plougastel-150x150-ImFQBaXobXqYGXZ24raPpIxapX1SjF.png",
    },
    {
      name: "Maileva",
      logo: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Logo-Maileva-150x150-q7dUaUlNy8kP8tOCXv72HCJq0LLkc5.png",
    },
    {
      name: "Valograin",
      logo: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Logo-Valograin-150x150-IWFKAOWo5Xo6ao4Ra8WPCHf5fvC0LY.png",
    },
    {
      name: "Le Journal du Vrac",
      logo: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Logo-Journal-du-vrac-150x150-fFJzArQZXeNs4vCqJ9b8qh0HCk8LlS.png",
    },
    {
      name: "Cocoon Habitat",
      logo: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Logo-Cocoon-habitat-150x150-1HzdoPKz6kbn6qwFnYxHC02Mb2BrOf.png",
    },
    {
      name: "Jeremy Capitaine",
      logo: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Logo-Jermemy-capitaine-150x150-n4x8Lg521absLMxhRH8KQ8pX2c5gQx.png",
    },
    {
      name: "ColiPoste",
      logo: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Logo-Coliposte-150x150-tze0qk7OJbKQl9nw1iU4ZsxW1hUiWG.png",
    },
    {
      name: "Dir Ouest",
      logo: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Logo-Dir-ouest-150x150-GFZZvvmFBxuvKAZ3QrFG503pvfMysY.png",
    },
    {
      name: "Haliotika",
      logo: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Logo-Haliotika-150x150-fvrtTAsbG1peRDFx27BldZB6xoweUa.png",
    },
    {
      name: "Escapia",
      logo: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Logo-Escapia-150x150-sDZLlQHQOFPXKB6AbnJv0jQhyBE9Ph.png",
    },
  ]

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold mb-4">Ils nous font confiance</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Découvrez quelques-unes des entreprises avec lesquelles nous avons eu le plaisir de collaborer.
          </p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 items-center justify-items-center">
          {clients.map((client) => (
            <div
              key={client.name}
              className="relative w-full aspect-[3/2] max-w-[200px] transition-transform hover:scale-105"
            >
              <Image
                src={client.logo || "/placeholder.svg"}
                alt={`Logo ${client.name}`}
                fill
                className="object-contain filter hover:brightness-110"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

