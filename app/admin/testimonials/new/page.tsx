import { TestimonialForm } from "@/app/components/admin/TestimonialForm"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function NewTestimonialPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Add New Testimonial</h1>
      <TestimonialForm />
      <div className="mt-4">
        <Link href="/admin/testimonials">
          <Button variant="outline">Back to Testimonials</Button>
        </Link>
      </div>
    </div>
  )
}

