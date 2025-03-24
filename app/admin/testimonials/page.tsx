import { getTestimonials } from "@/app/lib/data"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { deleteTestimonial } from "@/app/actions/database"

export default async function TestimonialsListPage() {
  const testimonials = await getTestimonials()

  async function handleDeleteTestimonial(id: number) {
    "use server"
    await deleteTestimonial(id)
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Testimonials</h1>
        <Link href="/admin/testimonials/new">
          <Button>Add New Testimonial</Button>
        </Link>
      </div>
      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Rating</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {testimonials.map((testimonial) => (
              <tr key={testimonial.id}>
                <td className="px-6 py-4 whitespace-nowrap">{testimonial.id}</td>
                <td className="px-6 py-4 whitespace-nowrap">{testimonial.name}</td>
                <td className="px-6 py-4 whitespace-nowrap">{testimonial.rating} ⭐</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <Link href={`/admin/testimonials/${testimonial.id}/edit`}>
                    <Button variant="outline" size="sm" className="mr-2">
                      Edit
                    </Button>
                  </Link>
                  <form action={handleDeleteTestimonial.bind(null, testimonial.id)} className="inline">
                    <Button variant="destructive" size="sm" type="submit">
                      Delete
                    </Button>
                  </form>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

