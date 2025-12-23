"use client"

import Link from "next/link"
import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { CalendarDays } from "lucide-react"
import { ScrollAnimation } from "@/components/ui/scroll-animation"
import { cn } from "@/lib/utils"

// Mock data - In real app, this would come from Supabase or CMS
const blogs = [
  {
    id: "1",
    title: "The Future of Education: Embracing Digital Learning",
    excerpt: "Exploring how technology is transforming the way we learn and teach in the modern world. We move beyond simple digitization to true digital transformation.",
    category: "Technical",
    publishedAt: "2024-01-15",
    readTime: "8 min read",
    author: "Shoraj Tomer",
    featured: true
  },
  {
    id: "2",
    title: "The Art of Storytelling in Digital Age",
    excerpt: "How traditional storytelling techniques can be adapted for digital platforms. Why narrative matters more than ever in a world of infinite content.",
    category: "Stories",
    publishedAt: "2024-01-10",
    readTime: "6 min read",
    author: "Shoraj Tomer",
    featured: false
  },
  {
    id: "3",
    title: "Building Effective Online Workshops",
    excerpt: "A comprehensive guide to creating engaging and impactful virtual learning experiences. It's not just about Zoom; it's about interaction design.",
    category: "Workshops",
    publishedAt: "2024-01-05",
    readTime: "12 min read",
    author: "Shoraj Tomer",
    featured: false
  },
  {
    id: "4",
    title: "The Power of Continuous Learning",
    excerpt: "Why lifelong learning is essential in today's rapidly changing world. Strategies for keeping your technical skills sharp without burning out.",
    category: "Personal Development",
    publishedAt: "2023-12-28",
    readTime: "5 min read",
    author: "Shoraj Tomer",
    featured: false
  },
  {
    id: "5",
    title: "System Design for Junior Engineers",
    excerpt: "Breaking down complex distributed systems into simple, understandable concepts. A primer for those preparing for interviews or architectural roles.",
    category: "Technical",
    publishedAt: "2023-11-15",
    readTime: "15 min read",
    author: "Shoraj Tomer",
    featured: false
  }
]

const categories = ["All", "Technical", "Stories", "Education", "Workshops", "Personal Development"]

export default function Blog() {
  const [activeCategory, setActiveCategory] = useState("All")

  const featuredBlog = blogs.find(blog => blog.featured)
  const filteredBlogs = blogs.filter(blog => {
    if (blog.featured) return false; // Don't show featured in regular list
    if (activeCategory === "All") return true;
    return blog.category === activeCategory;
  })

  return (
    <div className="min-h-screen bg-white pb-24">
      {/* 1. HEADER */}
      <section className="py-24 px-4 bg-gray-50 border-b border-gray-100 mb-16">
        <div className="max-w-4xl mx-auto text-center">
          <ScrollAnimation animation="animate-fadeIn">
            <h1 className="text-4xl sm:text-6xl font-bold tracking-tight text-gray-900 mb-6 leading-tight">
              Writing & Thoughts.
            </h1>
            <p className="text-xl text-gray-500 leading-relaxed font-light max-w-2xl mx-auto">
              I write to clear my mind. Here you’ll find technical deep dives, stories about teaching, and notes on building systems.
            </p>
          </ScrollAnimation>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

        {/* 2. CATEGORIES */}
        <ScrollAnimation className="mb-16">
          <div className="flex flex-wrap gap-2 justify-center">
            {categories.map((category) => (
              <Button
                key={category}
                variant={activeCategory === category ? "default" : "outline"}
                onClick={() => setActiveCategory(category)}
                className={cn(
                  "rounded-full px-6 transition-all",
                  activeCategory === category ? "bg-gray-900 text-white hover:bg-gray-800" : "text-gray-600 hover:text-gray-900 border-gray-200"
                )}
              >
                {category}
              </Button>
            ))}
          </div>
        </ScrollAnimation>

        {/* 3. FEATURED (Only show if All is selected or category matches) */}
        {featuredBlog && (activeCategory === "All" || activeCategory === featuredBlog.category) && (
          <ScrollAnimation className="mb-16">
            <h2 className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-6">Featured Article</h2>
            <Link href={`/blog/${featuredBlog.id}`} className="group block">
              <div className="relative overflow-hidden rounded-3xl border border-gray-100 bg-white shadow-sm hover:shadow-md transition-all">
                <div className="md:flex h-full">
                  <div className="md:w-2/5 md:min-h-[300px] bg-gray-100 group-hover:bg-gray-200 transition-colors flex items-center justify-center">
                    {/* Placeholder for Image */}
                    <span className="text-gray-400 font-medium">Cover Image</span>
                  </div>
                  <div className="md:w-3/5 p-8 md:p-12 flex flex-col justify-center">
                    <div className="flex items-center gap-3 mb-4">
                      <Badge variant="secondary" className="bg-blue-50 text-blue-700 hover:bg-blue-100">{featuredBlog.category}</Badge>
                      <span className="text-sm text-gray-400">{featuredBlog.readTime}</span>
                    </div>
                    <h3 className="text-3xl font-bold text-gray-900 mb-4 group-hover:text-blue-600 transition-colors">
                      {featuredBlog.title}
                    </h3>
                    <p className="text-lg text-gray-600 mb-6 leading-relaxed">{featuredBlog.excerpt}</p>
                    <div className="flex items-center gap-2 text-sm text-gray-400 font-medium mt-auto">
                      <span>{featuredBlog.author}</span>
                      <span>•</span>
                      <span>{new Date(featuredBlog.publishedAt).toLocaleDateString()}</span>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          </ScrollAnimation>
        )}

        {/* 4. POST LIST */}
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {filteredBlogs.length > 0 ? (
            filteredBlogs.map((blog, i) => (
              <ScrollAnimation key={blog.id} delay={`${i * 100}ms`} animation="animate-slideUp">
                <Link href={`/blog/${blog.id}`} className="group h-full block">
                  <Card className="h-full flex flex-col border-gray-100 shadow-sm hover:shadow-md hover:border-blue-100 transition-all">
                    <CardHeader>
                      <div className="flex items-center justify-between mb-3">
                        <Badge variant="secondary" className="bg-gray-50 text-gray-600 group-hover:bg-blue-50 group-hover:text-blue-600 transition-colors">{blog.category}</Badge>
                        <span className="text-xs text-gray-400">{blog.readTime}</span>
                      </div>
                      <CardTitle className="line-clamp-2 text-xl group-hover:text-blue-600 transition-colors leading-tight">
                        {blog.title}
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="mt-auto pt-0">
                      <CardDescription className="line-clamp-3 mb-4 text-base">
                        {blog.excerpt}
                      </CardDescription>
                      <div className="flex items-center gap-2 text-xs text-gray-400 mt-4 pt-4 border-t border-gray-50">
                        <CalendarDays className="w-3 h-3" />
                        {new Date(blog.publishedAt).toLocaleDateString()}
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              </ScrollAnimation>
            ))
          ) : (
            <div className="col-span-full text-center py-20">
              <p className="text-gray-500 text-lg">No articles found in this category yet.</p>
              <Button variant="link" onClick={() => setActiveCategory("All")} className="mt-2">View all articles</Button>
            </div>
          )}
        </div>

      </div>
    </div>
  )
}