import { notFound } from "next/navigation"
import { Badge } from "@/components/ui/badge"
import { CalendarDays, Clock, User, ArrowLeft } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"

// Mock data (same as in main blog page for consistency)
const blogs = [
    {
        id: "1",
        title: "The Future of Education: Embracing Digital Learning",
        content: `
      <p>Technology is rapidly transforming the educational landscape. From AI-driven personalized learning to virtual classrooms, the opportunities are endless.</p>
      <h2>The Shift to Digital</h2>
      <p>Traditional methods are being augmented with digital tools that provide instant feedback and adaptive learning paths.</p>
      <h2>Benefits of this approach</h2>
      <ul>
        <li>Accessibility for effective remote learning</li>
        <li>Personalized pacing for students</li>
        <li>Data-driven insights for educators</li>
      </ul>
      <p>As we move forward, it is crucial to balance technology with human connection.</p>
    `,
        category: "Education",
        publishedAt: "2024-01-15",
        readTime: "8 min read",
        author: "Shoraj Tomer",
        featured: true
    },
    {
        id: "2",
        title: "The Art of Storytelling in Digital Age",
        content: "<p>Storytelling remains a powerful tool for connection, even in a digital-first world...</p>",
        category: "Storytelling",
        publishedAt: "2024-01-10",
        readTime: "6 min read",
        author: "Shoraj Tomer",
        featured: false
    },
    {
        id: "3",
        title: "Building Effective Online Workshops",
        content: "<p>Workshops are more than just presentations; they are interactive experiences...</p>",
        category: "Workshops",
        publishedAt: "2024-01-05",
        readTime: "12 min read",
        author: "Shoraj Tomer",
        featured: false
    },
    {
        id: "4",
        title: "The Power of Continuous Learning",
        content: "<p>In a rapidly changing world, the ability to learn is the only sustainable competitive advantage...</p>",
        category: "Personal Development",
        publishedAt: "2023-12-28",
        readTime: "5 min read",
        author: "Shoraj Tomer",
        featured: false
    }
]

export default async function BlogPost({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params
    const blog = blogs.find((b) => b.id === id)

    if (!blog) {
        notFound()
    }

    return (
        <article className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
            <div className="mb-8">
                <Button variant="ghost" asChild className="mb-4 pl-0 hover:pl-0 hover:bg-transparent">
                    <Link href="/blog" className="flex items-center gap-2 text-gray-500 hover:text-gray-900">
                        <ArrowLeft className="h-4 w-4" />
                        Back to Blog
                    </Link>
                </Button>

                <div className="flex items-center gap-2 mb-4">
                    <Badge variant="secondary">{blog.category}</Badge>
                </div>

                <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl mb-6">
                    {blog.title}
                </h1>

                <div className="flex items-center gap-6 text-sm text-gray-500 border-b pb-8">
                    <div className="flex items-center gap-2">
                        <User className="h-4 w-4" />
                        {blog.author}
                    </div>
                    <div className="flex items-center gap-2">
                        <CalendarDays className="h-4 w-4" />
                        {new Date(blog.publishedAt).toLocaleDateString()}
                    </div>
                    <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4" />
                        {blog.readTime}
                    </div>
                </div>
            </div>

            <div
                className="prose prose-lg prose-blue max-w-none"
                dangerouslySetInnerHTML={{ __html: blog.content }}
            />
        </article>
    )
}
