'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase'
import { ProjectService } from '@/services/project.service'
import { Project } from '@/types'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Card, CardContent } from '@/components/ui/card'
import { Loader2, Save, ArrowLeft, X } from 'lucide-react'
import Link from 'next/link'
import { Badge } from '@/components/ui/badge'

interface ProjectFormProps {
    initialData?: Project
    isEditing?: boolean
}

export function ProjectForm({ initialData, isEditing = false }: ProjectFormProps) {
    const router = useRouter()
    const [loading, setLoading] = useState(false)
    const [tagInput, setTagInput] = useState('')

    const [formData, setFormData] = useState<Partial<Project>>({
        title: initialData?.title || '',
        tagline: initialData?.tagline || '',
        description: initialData?.description || '',
        status: initialData?.status || 'Active Development',
        tech: initialData?.tech || [],
        demo_url: initialData?.demo_url || '',
        github_url: initialData?.github_url || '',
        image_url: initialData?.image_url || '',
        sort_order: initialData?.sort_order || 0,
        is_featured: initialData?.is_featured || false,
        icon_name: initialData?.icon_name || 'Layers'
    })

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target
        setFormData(prev => ({ ...prev, [name]: value }))
    }

    const handleAddTag = () => {
        if (tagInput.trim() && !formData.tech?.includes(tagInput.trim())) {
            setFormData(prev => ({ ...prev, tech: [...(prev.tech || []), tagInput.trim()] }))
            setTagInput('')
        }
    }

    const removeTag = (tagToRemove: string) => {
        setFormData(prev => ({ ...prev, tech: (prev.tech || []).filter(t => t !== tagToRemove) }))
    }

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') {
            e.preventDefault()
            handleAddTag()
        }
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)

        try {
            const service = new ProjectService(supabase)

            if (isEditing && initialData) {
                await service.update(initialData.id, formData)
            } else {
                await service.create(formData as Project)
            }

            router.push('/admin/projects')
            router.refresh()
        } catch (error) {
            console.error('Error saving project:', error)
            alert('Failed to save project')
        } finally {
            setLoading(false)
        }
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-8">
            <div className="flex items-center justify-between">
                <Button variant="ghost" asChild>
                    <Link href="/admin/projects">
                        <ArrowLeft className="mr-2 h-4 w-4" />
                        Back to List
                    </Link>
                </Button>
                <Button type="submit" disabled={loading} className="bg-blue-600 hover:bg-blue-700">
                    {loading ? (
                        <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Saving...
                        </>
                    ) : (
                        <>
                            <Save className="mr-2 h-4 w-4" />
                            {isEditing ? 'Update Project' : 'Create Project'}
                        </>
                    )}
                </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="md:col-span-2 space-y-6">
                    <Card>
                        <CardContent className="p-6 space-y-4">
                            <div className="space-y-2">
                                <Label>Project Title</Label>
                                <Input
                                    name="title"
                                    value={formData.title}
                                    onChange={handleChange}
                                    placeholder="e.g. The Learning Platform"
                                    required
                                />
                            </div>
                            <div className="space-y-2">
                                <Label>Tagline</Label>
                                <Input
                                    name="tagline"
                                    value={formData.tagline}
                                    onChange={handleChange}
                                    placeholder="Brief catchy description"
                                />
                            </div>
                            <div className="space-y-2">
                                <Label>Description</Label>
                                <Textarea
                                    name="description"
                                    value={formData.description}
                                    onChange={handleChange}
                                    placeholder="Detailed explanation of the project..."
                                    className="min-h-[150px]"
                                />
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardContent className="p-6 space-y-4">
                            <div className="space-y-2">
                                <Label>Tech Stack</Label>
                                <div className="flex gap-2">
                                    <Input
                                        value={tagInput}
                                        onChange={(e) => setTagInput(e.target.value)}
                                        onKeyDown={handleKeyDown}
                                        placeholder="Add technology (e.g. React, Node.js)"
                                    />
                                    <Button type="button" onClick={handleAddTag} variant="secondary">Add</Button>
                                </div>
                                <div className="flex flex-wrap gap-2 mt-2">
                                    {formData.tech?.map(tag => (
                                        <Badge key={tag} variant="secondary" className="px-2 py-1 flex items-center gap-1">
                                            {tag}
                                            <button type="button" onClick={() => removeTag(tag)} className="hover:text-red-500">
                                                <X className="h-3 w-3" />
                                            </button>
                                        </Badge>
                                    ))}
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                <div className="space-y-6">
                    <Card>
                        <CardContent className="p-6 space-y-4">
                            <div className="space-y-2">
                                <Label>Status</Label>
                                <select
                                    className="flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                    name="status"
                                    value={formData.status}
                                    onChange={handleChange}
                                >
                                    <option value="Active Development">Active Development</option>
                                    <option value="Beta">Beta</option>
                                    <option value="Live">Live</option>
                                    <option value="Archived">Archived</option>
                                </select>
                            </div>

                            <div className="flex items-center space-x-2 border rounded-md p-3">
                                <input
                                    type="checkbox"
                                    className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                                    checked={formData.is_featured}
                                    onChange={(e) => setFormData(prev => ({ ...prev, is_featured: e.target.checked }))}
                                    id="featured"
                                />
                                <Label htmlFor="featured" className="cursor-pointer">Featured Project</Label>
                            </div>

                            <div className="space-y-2">
                                <Label>Sort Order</Label>
                                <Input
                                    type="number"
                                    name="sort_order"
                                    value={formData.sort_order}
                                    onChange={handleChange}
                                />
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardContent className="p-6 space-y-4">
                            <div className="space-y-2">
                                <Label>Demo URL</Label>
                                <Input
                                    name="demo_url"
                                    value={formData.demo_url}
                                    onChange={handleChange}
                                    placeholder="https://"
                                />
                            </div>
                            <div className="space-y-2">
                                <Label>GitHub URL</Label>
                                <Input
                                    name="github_url"
                                    value={formData.github_url}
                                    onChange={handleChange}
                                    placeholder="https://github.com/..."
                                />
                            </div>
                            <div className="space-y-2">
                                <Label>Image URL</Label>
                                <Input
                                    name="image_url"
                                    value={formData.image_url}
                                    onChange={handleChange}
                                    placeholder="https://..."
                                />
                            </div>
                            <div className="space-y-2">
                                <Label>Icon Name (Lucide)</Label>
                                <Input
                                    name="icon_name"
                                    value={formData.icon_name}
                                    onChange={handleChange}
                                    placeholder="e.g. Layers, Database"
                                />
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </form>
    )
}
