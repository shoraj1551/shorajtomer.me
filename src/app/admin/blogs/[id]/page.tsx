'use client'

import { useEffect, useState, use } from 'react'
import { supabase } from '@/lib/supabase'
import { BlogForm } from '@/components/admin/blog-form'
import { BlogService } from '@/services/blog.service'
import { Blog } from '@/types'

// Correctly defined PageProps for Next.js App Router dynamic routes
interface PageProps {
    params: Promise<{ id: string }>
}

export default function EditBlogPage({ params }: PageProps) {
    // Unwrap params using React.use()
    const { id } = use(params)

    const [blog, setBlog] = useState<Blog | null>(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchBlog = async () => {
            try {
                const service = new BlogService(supabase)
                const data = await service.getById(id)
                if (data) setBlog(data as Blog)
            } catch (error) {
                console.error('Error fetching blog:', error)
            } finally {
                setLoading(false)
            }
        }
        fetchBlog()
    }, [id])

    if (loading) return <div>Loading...</div>
    if (!blog) return <div>Blog found</div>

    return (
        <div className="max-w-5xl mx-auto">
            <h1 className="text-3xl font-bold mb-8">Edit Blog Post</h1>
            <BlogForm initialData={blog} isEditing />
        </div>
    )
}
