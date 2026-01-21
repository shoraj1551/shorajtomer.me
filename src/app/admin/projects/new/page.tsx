import { ProjectForm } from '@/components/admin/project-form'

export default function NewProjectPage() {
    return (
        <div className="max-w-5xl mx-auto">
            <h1 className="text-3xl font-bold mb-8">Add New Project</h1>
            <ProjectForm />
        </div>
    )
}
