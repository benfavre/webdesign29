import { Button } from "@/components/ui/button"
import { Star } from "lucide-react"
import { getTestimonials } from "@/app/lib/data"
import { logger } from "@/app/lib/logger"

export async function TestimonialsSection() {
  let testimonials = []
  let error = null

  try {
    testimonials = await getTestimonials()
  } catch (err) {
    error = err
    logger.error("Failed to load testimonials in TestimonialsSection", {
      context: "TestimonialsSection",
      error: err instanceof Error ? err.message : String(err),
    })
  }

  if (error) {
    return (
      <section id="temoignages" className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center py-10">
            <p className="text-red-500">
              Une erreur s'est produite lors du chargement des témoignages. Veuillez réessayer plus tard.
            </p>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section id="temoignages" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold mb-4">Ce que nos clients disent de nous</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            La satisfaction de nos clients est notre priorité. Voici quelques témoignages de ceux qui nous ont fait
            confiance.
          </p>
        </div>
        {testimonials.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {testimonials.map((testimonial) => (
              <div key={testimonial.id} className="bg-white p-8 rounded-lg shadow-md flex flex-col h-full">
                <div className="flex items-center mb-4">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      className={`h-5 w-5 ${star <= testimonial.rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}`}
                    />
                  ))}
                </div>
                <p className="text-gray-600 mb-6 italic flex-grow">
                  {testimonial.text.length > 150 ? `${testimonial.text.substring(0, 150)}...` : testimonial.text}
                </p>
                <div className="flex items-center mt-auto">
                  <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center mr-4">
                    <span className="text-lg font-bold text-gray-500">{testimonial.name.charAt(0)}</span>
                  </div>
                  <div>
                    <h4 className="font-bold">{testimonial.name}</h4>
                    <p className="text-gray-600 text-sm">Client</p>
                  </div>
                </div>
                {testimonial.text.length > 150 && (
                  <Button variant="link" className="mt-4 text-accent hover:text-accent/80">
                    Lire plus
                  </Button>
                )}
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-10">
            <p className="text-gray-500">Aucun témoignage disponible pour le moment.</p>
          </div>
        )}
      </div>
    </section>
  )
}

