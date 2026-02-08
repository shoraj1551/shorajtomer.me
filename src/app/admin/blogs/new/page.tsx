import { BlogForm } from '@/components/admin/blog-form'

export default function NewBlogPage() {
    return (
        <div className="max-w-5xl mx-auto">
            <h1 className="text-3xl font-bold mb-8">Create New Blog Post</h1>
            <BlogForm />
        </div>
    )
}
