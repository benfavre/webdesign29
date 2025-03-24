import Link from "next/link"
import { Button } from "@/components/ui/button"
import { updateSchema, seedDatabaseAction } from "../actions/database"
import { getProjects, getTestimonials } from "@/app/lib/data"

export default async function AdminDashboard() {
  const projects = await getProjects()
  const testimonials = await getTestimonials()

  async function handleUpdateSchema() {
    "use server"
    const result = await updateSchema()
    console.log(result.message)
  }

  async function handleSeedDatabase() {
    "use server"
    const result = await seedDatabaseAction()
    console.log(result.message)
  }

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">Admin Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Projects</h2>
          <p className="text-3xl font-bold mb-4">{projects.length}</p>
          <Link href="/admin/projects">
            <Button>Manage Projects</Button>
          </Link>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Testimonials</h2>
          <p className="text-3xl font-bold mb-4">{testimonials.length}</p>
          <Link href="/admin/testimonials">
            <Button>Manage Testimonials</Button>
          </Link>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4">Database Management</h2>
        <div className="flex space-x-4">
          <form action={handleUpdateSchema}>
            <Button type="submit">Update Schema</Button>
          </form>
          <form action={handleSeedDatabase}>
            <Button type="submit">Seed Database</Button>
          </form>
        </div>
      </div>
    </div>
  )
}

