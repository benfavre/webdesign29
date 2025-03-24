import { ProjectForm } from "@/app/components/admin/ProjectForm"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function NewProjectPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Add New Project</h1>
      <ProjectForm />
      <div className="mt-4">
        <Link href="/admin/projects">
          <Button variant="outline">Back to Projects</Button>
        </Link>
      </div>
    </div>
  )
}

