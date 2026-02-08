'use client'

import { useEffect, useState, use } from 'react'
import { supabase } from '@/lib/supabase'
import { ProjectForm } from '@/components/admin/project-form'
import { ProjectService } from '@/services/project.service'
import { Project } from '@/types'

// Correctly defined PageProps for Next.js App Router dynamic routes
interface PageProps {
    params: Promise<{ id: string }>
}

export default function EditProjectPage({ params }: PageProps) {
    // Unwrap params using React.use()
    const { id } = use(params)

    const [project, setProject] = useState<Project | null>(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchProject = async () => {
            try {
                const service = new ProjectService(supabase)
                const data = await service.getById(id)
                if (data) setProject(data as Project)
            } catch (error) {
                console.error('Error fetching project:', error)
            } finally {
                setLoading(false)
            }
        }
        fetchProject()
    }, [id])

    if (loading) return <div>Loading...</div>
    if (!project) return <div>Project not found</div>

    return (
        <div className="max-w-5xl mx-auto">
            <h1 className="text-3xl font-bold mb-8">Edit Project</h1>
            <ProjectForm initialData={project} isEditing />
        </div>
    )
}
