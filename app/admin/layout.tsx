import type { ReactNode } from "react"
import Link from "next/link"
import { Home, Briefcase, MessageSquare, Users, PlusCircle } from "lucide-react"

export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-md">
        <div className="p-4">
          <h1 className="text-2xl font-bold text-primary">Admin Panel</h1>
        </div>
        <nav className="mt-6">
          <Link
            href="/admin"
            className="block px-4 py-2 text-gray-600 hover:bg-primary hover:text-white transition-colors"
          >
            <Home className="inline-block w-5 h-5 mr-2" />
            Dashboard
          </Link>
          <Link
            href="/admin/projects"
            className="block px-4 py-2 text-gray-600 hover:bg-primary hover:text-white transition-colors"
          >
            <Briefcase className="inline-block w-5 h-5 mr-2" />
            Projects
          </Link>
          <Link
            href="/admin/projects/new"
            className="block px-4 py-2 text-gray-600 hover:bg-primary hover:text-white transition-colors"
          >
            <PlusCircle className="inline-block w-5 h-5 mr-2" />
            New Project
          </Link>
          <Link
            href="/admin/testimonials"
            className="block px-4 py-2 text-gray-600 hover:bg-primary hover:text-white transition-colors"
          >
            <MessageSquare className="inline-block w-5 h-5 mr-2" />
            Testimonials
          </Link>
          <Link
            href="/admin/testimonials/new"
            className="block px-4 py-2 text-gray-600 hover:bg-primary hover:text-white transition-colors"
          >
            <PlusCircle className="inline-block w-5 h-5 mr-2" />
            New Testimonial
          </Link>
          <Link
            href="/admin/contact-submissions"
            className="block px-4 py-2 text-gray-600 hover:bg-primary hover:text-white transition-colors"
          >
            <Users className="inline-block w-5 h-5 mr-2" />
            Contact Submissions
          </Link>
        </nav>
      </aside>

      {/* Main content */}
      <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100">
        <div className="container mx-auto px-6 py-8">{children}</div>
      </main>
    </div>
  )
}

