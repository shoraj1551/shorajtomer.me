'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { supabase } from '@/lib/supabase'
import { BlogService } from '@/services/blog.service'
import { Blog } from '@/types'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Plus, Edit, Trash2, Eye, EyeOff } from 'lucide-react'
import { format } from 'date-fns'
import { Badge } from '@/components/ui/badge'

export default function AdminBlogList() {
    const [blogs, setBlogs] = useState<Blog[]>([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        fetchBlogs()
    }, [])

    const fetchBlogs = async () => {
        try {
            setLoading(true)
            // Assuming getPublished returns published. We need ALL blogs (drafts too).
            // Since BlogService.getAll is generic, let's use it or create a specific admin method.
            // For now, let's use the generic getAll which filters by exact match if provided, or gets all.
            //   const { data } = await service.getAll()
            // Wait, BaseService getAll might be limited. Let's create a custom query here or rely on getPublished but we need drafts.
            // Let's modify BlogService later to have getAllBlogs (admin).
            // For now, let's just use raw supabase query to get everything for admin.
            const { data, error } = await supabase
                .from('blogs')
                .select('*, category:categories(*)')
                .order('created_at', { ascending: false })

            if (error) throw error
            setBlogs(data as Blog[])
        } catch (error) {
            console.error('Error fetching blogs:', error)
        } finally {
            setLoading(false)
        }
    }

    const handleDelete = async (id: string) => {
        if (!confirm('Are you sure you want to delete this blog?')) return

        try {
            const service = new BlogService(supabase)
            await service.delete(id)
            fetchBlogs() // Refresh list
        } catch (error) {
            console.error('Error deleting blog:', error)
        }
    }

    const togglePublish = async (id: string) => {
        try {
            const service = new BlogService(supabase)
            await service.togglePublish(id)
            fetchBlogs()
        } catch (error) {
            console.error('Error toggling publish:', error)
        }
    }

    if (loading) return <div>Loading...</div>

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-600">
                    Blog Posts
                </h1>
                <Button asChild className="bg-blue-600 hover:bg-blue-700">
                    <Link href="/admin/blogs/new">
                        <Plus className="mr-2 h-4 w-4" />
                        New Post
                    </Link>
                </Button>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>All Posts ({blogs.length})</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="rounded-md border">
                        <table className="w-full text-sm text-left">
                            <thead className="bg-gray-50 text-gray-500 font-medium">
                                <tr>
                                    <th className="p-4">Title</th>
                                    <th className="p-4">Status</th>
                                    <th className="p-4">Category</th>
                                    <th className="p-4">Date</th>
                                    <th className="p-4 text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y">
                                {blogs.map((blog) => (
                                    <tr key={blog.id} className="hover:bg-gray-50/50">
                                        <td className="p-4 font-medium max-w-xs truncate" title={blog.title}>
                                            {blog.title}
                                        </td>
                                        <td className="p-4">
                                            <Badge variant={blog.published ? "default" : "secondary"} className={blog.published ? "bg-green-100 text-green-700 hover:bg-green-100" : "bg-yellow-100 text-yellow-700 hover:bg-yellow-100"}>
                                                {blog.published ? 'Published' : 'Draft'}
                                            </Badge>
                                        </td>
                                        <td className="p-4 text-gray-500">
                                            {blog.category?.name || '-'}
                                        </td>
                                        <td className="p-4 text-gray-500">
                                            {format(new Date(blog.created_at), 'MMM d, yyyy')}
                                        </td>
                                        <td className="p-4 text-right space-x-2">
                                            <Button variant="ghost" size="icon" onClick={() => togglePublish(blog.id)} title={blog.published ? "Unpublish" : "Publish"}>
                                                {blog.published ? <EyeOff className="h-4 w-4 text-gray-500" /> : <Eye className="h-4 w-4 text-green-600" />}
                                            </Button>
                                            <Button variant="ghost" size="icon" asChild>
                                                <Link href={`/admin/blogs/${blog.id}`}>
                                                    <Edit className="h-4 w-4 text-blue-600" />
                                                </Link>
                                            </Button>
                                            <Button variant="ghost" size="icon" onClick={() => handleDelete(blog.id)}>
                                                <Trash2 className="h-4 w-4 text-red-600" />
                                            </Button>
                                        </td>
                                    </tr>
                                ))}
                                {blogs.length === 0 && (
                                    <tr>
                                        <td colSpan={5} className="p-8 text-center text-gray-500">
                                            No blog posts found. Create one to get started. // TODO Fix this
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
