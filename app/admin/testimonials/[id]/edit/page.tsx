import { getTestimonialById } from "@/app/lib/data"
import { TestimonialForm } from "@/app/components/admin/TestimonialForm"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export default async function EditTestimonialPage({ params }: { params: { id: string } }) {
  const testimonial = await getTestimonialById(Number.parseInt(params.id))

  if (!testimonial) {
    return <div>Testimonial not found</div>
  }

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Edit Testimonial</h1>
      <TestimonialForm testimonial={testimonial} />
      <div className="mt-4">
        <Link href="/admin/testimonials">
          <Button variant="outline">Back to Testimonials</Button>
        </Link>
      </div>
    </div>
  )
}

