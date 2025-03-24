import { getProjectById } from "@/app/lib/data"
import { ProjectForm } from "@/app/components/admin/ProjectForm"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export default async function EditProjectPage({ params }: { params: { id: string } }) {
  const project = await getProjectById(Number.parseInt(params.id))

  if (!project) {
    return <div>Project not found</div>
  }

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Edit Project</h1>
      <ProjectForm project={project} />
      <div className="mt-4">
        <Link href="/admin/projects">
          <Button variant="outline">Back to Projects</Button>
        </Link>
      </div>
    </div>
  )
}

