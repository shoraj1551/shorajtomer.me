'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { supabase } from '@/lib/supabase'
import { ProjectService } from '@/services/project.service'
import { Project } from '@/types'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Plus, Edit, Trash2, Star, StarOff } from 'lucide-react'
import { Badge } from '@/components/ui/badge'

export default function AdminProjectList() {
    const [projects, setProjects] = useState<Project[]>([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        fetchProjects()
    }, [])

    const fetchProjects = async () => {
        try {
            setLoading(true)
            // Custom query to get all projects regardless of status
            const { data, error } = await supabase
                .from('projects')
                .select('*')
                .order('sort_order', { ascending: true })
                .order('created_at', { ascending: false })

            if (error) throw error
            setProjects(data as Project[])
        } catch (error) {
            console.error('Error fetching projects:', error)
        } finally {
            setLoading(false)
        }
    }

    const handleDelete = async (id: string) => {
        if (!confirm('Are you sure you want to delete this project?')) return

        try {
            const service = new ProjectService(supabase)
            await service.delete(id)
            fetchProjects()
        } catch (error) {
            console.error('Error deleting project:', error)
        }
    }

    const toggleFeatured = async (id: string, current: boolean) => {
        try {
            const { error } = await supabase
                .from('projects')
                .update({ is_featured: !current })
                .eq('id', id)

            if (error) throw error
            fetchProjects()
        } catch (error) {
            console.error('Error toggling featured:', error)
        }
    }

    if (loading) return <div>Loading...</div>

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600">
                    Projects
                </h1>
                <Button asChild className="bg-blue-600 hover:bg-blue-700">
                    <Link href="/admin/projects/new">
                        <Plus className="mr-2 h-4 w-4" />
                        New Project
                    </Link>
                </Button>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>All Projects ({projects.length})</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="rounded-md border">
                        <table className="w-full text-sm text-left">
                            <thead className="bg-gray-50 text-gray-500 font-medium">
                                <tr>
                                    <th className="p-4">Title</th>
                                    <th className="p-4">Status</th>
                                    <th className="p-4">Tech Stack</th>
                                    <th className="p-4">Sort Order</th>
                                    <th className="p-4 text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y">
                                {projects.map((project) => (
                                    <tr key={project.id} className="hover:bg-gray-50/50">
                                        <td className="p-4 font-medium flex items-center gap-2">
                                            {project.is_featured && <Star className="h-3 w-3 text-yellow-500 fill-yellow-500" />}
                                            {project.title}
                                        </td>
                                        <td className="p-4">
                                            <Badge variant="outline" className="border-blue-200 text-blue-700 bg-blue-50">
                                                {project.status || 'Draft'}
                                            </Badge>
                                        </td>
                                        <td className="p-4 text-gray-500 max-w-xs truncate">
                                            {project.tech?.join(', ') || '-'}
                                        </td>
                                        <td className="p-4 text-gray-500">
                                            {project.sort_order}
                                        </td>
                                        <td className="p-4 text-right space-x-2">
                                            <Button variant="ghost" size="icon" onClick={() => toggleFeatured(project.id, project.is_featured)} title={project.is_featured ? "Unfeature" : "Feature"}>
                                                {project.is_featured ? <StarOff className="h-4 w-4 text-gray-400" /> : <Star className="h-4 w-4 text-yellow-500" />}
                                            </Button>
                                            <Button variant="ghost" size="icon" asChild>
                                                <Link href={`/admin/projects/${project.id}`}>
                                                    <Edit className="h-4 w-4 text-blue-600" />
                                                </Link>
                                            </Button>
                                            <Button variant="ghost" size="icon" onClick={() => handleDelete(project.id)}>
                                                <Trash2 className="h-4 w-4 text-red-600" />
                                            </Button>
                                        </td>
                                    </tr>
                                ))}
                                {projects.length === 0 && (
                                    <tr>
                                        <td colSpan={5} className="p-8 text-center text-gray-500">
                                            No projects found. Add your first project!
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}
