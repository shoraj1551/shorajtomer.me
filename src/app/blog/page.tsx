"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { ScrollAnimation } from "@/components/ui/scroll-animation"
import { ArrowRight } from "lucide-react"
import { supabase } from "@/lib/supabase"
import { BlogService } from "@/services/blog.service"
import { StoryService } from "@/services/story.service"
import { ReadingService } from "@/services/reading.service"
import { Blog, Story, Reading } from "@/types"
import { format } from "date-fns"

export default function WritingPage() {
  const [blogs, setBlogs] = useState<Blog[]>([])
  const [stories, setStories] = useState<Story[]>([])
  const [readings, setReadings] = useState<Reading[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const blogService = new BlogService(supabase)
        const storyService = new StoryService(supabase)
        const readingService = new ReadingService(supabase)

        const [blogData, storyData, readingData] = await Promise.all([
          blogService.getPublished(),
          storyService.getPublished(),
          readingService.getAllWithCategories()
        ])

        setBlogs(blogData.blogs)
        setStories(storyData.stories)
        setReadings(readingData)
      } catch (error) {
        console.error("Failed to fetch data:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  // Group readings by category
  const categorizedReadings = {
    technical: readings.filter(r => r.category?.name?.toLowerCase().includes('technical')),
    learning: readings.filter(r => r.category?.name?.toLowerCase().includes('learning') || r.category?.name?.toLowerCase().includes('non-fiction')),
    fiction: readings.filter(r => r.category?.name?.toLowerCase().includes('fiction'))
  }

  if (loading) {
    return (
      <main className="min-h-screen bg-white pt-32 pb-32 px-6 sm:px-12 flex items-center justify-center">
        <div className="animate-pulse flex flex-col items-center">
          <div className="h-4 w-48 bg-gray-200 rounded mb-4"></div>
          <div className="h-2 w-32 bg-gray-200 rounded"></div>
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-white pt-32 pb-32 px-6 sm:px-12">

      {/* 1. Page Intro */}
      <section className="max-w-3xl mx-auto mb-24 text-center">
        <ScrollAnimation animation="animate-fadeIn" delay="0ms">
          <h1 className="text-4xl sm:text-5xl font-serif font-medium tracking-tight text-gray-900 mb-8 leading-tight">
            Writing, reading, and<br className="hidden sm:block" /> thinking out loud.
          </h1>
          <p className="text-xl text-gray-500 leading-relaxed font-light max-w-2xl mx-auto">
            This is where I write to understand better — about data, systems, learning,
            mathematics, and sometimes stories that don’t fit neatly into categories.
          </p>
        </ScrollAnimation>
      </section>

      {/* 2. Writing Section (Primary) */}
      <section className="max-w-3xl mx-auto mb-32">
        <ScrollAnimation animation="animate-fadeIn" delay="0ms">
          <div className="border-l-2 border-gray-100 pl-8 space-y-16">
            {blogs.length === 0 ? (
              <p className="text-gray-400 italic">No essays published yet.</p>
            ) : (
              blogs.map((blog) => (
                <article key={blog.id} className="group cursor-pointer">
                  <div className="flex items-center gap-3 text-sm text-gray-400 mb-2 font-mono uppercase tracking-wider">
                    <span>{blog.tags?.[0] || 'Uncategorized'}</span>
                    <span>•</span>
                    <span>{blog.published_at ? format(new Date(blog.published_at), 'MMM yyyy') : 'Draft'}</span>
                  </div>
                  <h2 className="text-2xl font-semibold text-gray-900 mb-2 group-hover:underline decoration-blue-500/30 underline-offset-4 transition-all">
                    {blog.title}
                  </h2>
                  <p className="text-lg text-gray-600 leading-relaxed font-light">
                    {blog.excerpt}
                  </p>
                </article>
              ))
            )}
          </div>
        </ScrollAnimation>
      </section>

      {/* 3. Reading Now (Secondary) */}
      <section className="max-w-3xl mx-auto mb-32 grid grid-cols-1 md:grid-cols-3 gap-12">
        <div className="md:col-span-3 mb-4">
          <h2 className="text-xl font-serif font-medium text-gray-900 mb-2">Curated Reading</h2>
          <div className="h-px bg-gray-100 w-full"></div>
        </div>

        <ScrollAnimation animation="animate-fadeIn" delay="0ms">
          <h3 className="text-sm font-bold text-gray-900 uppercase tracking-widest mb-6 text-blue-600">
            Technical
          </h3>
          <ul className="space-y-4">
            {categorizedReadings.technical.map((book) => (
              <li key={book.id} className="text-gray-600 font-light group">
                <span className="block text-gray-900 font-medium group-hover:text-blue-600 transition-colors">{book.title}</span>
                <span className="text-sm text-gray-400">{book.author}</span>
              </li>
            ))}
            {categorizedReadings.technical.length === 0 && <li className="text-gray-400 text-sm">No items yet</li>}
          </ul>
        </ScrollAnimation>

        <ScrollAnimation animation="animate-fadeIn" delay="100ms">
          <h3 className="text-sm font-bold text-gray-900 uppercase tracking-widest mb-6 text-blue-600">
            Learning
          </h3>
          <ul className="space-y-4">
            {categorizedReadings.learning.map((book) => (
              <li key={book.id} className="text-gray-600 font-light group">
                <span className="block text-gray-900 font-medium group-hover:text-blue-600 transition-colors">{book.title}</span>
                <span className="text-sm text-gray-400">{book.author}</span>
              </li>
            ))}
            {categorizedReadings.learning.length === 0 && <li className="text-gray-400 text-sm">No items yet</li>}
          </ul>
        </ScrollAnimation>

        <ScrollAnimation animation="animate-fadeIn" delay="200ms">
          <h3 className="text-sm font-bold text-gray-900 uppercase tracking-widest mb-6 text-blue-600">
            Fiction
          </h3>
          <ul className="space-y-4">
            {categorizedReadings.fiction.map((book) => (
              <li key={book.id} className="text-gray-600 font-light group">
                <span className="block text-gray-900 font-medium group-hover:text-blue-600 transition-colors">{book.title}</span>
                <span className="text-sm text-gray-400">{book.author}</span>
              </li>
            ))}
            {categorizedReadings.fiction.length === 0 && <li className="text-gray-400 text-sm">No items yet</li>}
          </ul>
        </ScrollAnimation>
      </section>

      {/* 4. Stories & Personal (Human Layer) */}
      <section className="max-w-3xl mx-auto mb-32 bg-gray-50 p-10 rounded-2xl">
        <ScrollAnimation animation="animate-fadeIn" delay="0ms">
          <h3 className="text-xl font-serif text-gray-900 mb-6 italic">
            &quot;Sometimes I write stories — not to teach directly, but to explore ideas differently.&quot;
          </h3>
          <ul className="space-y-4 border-l border-gray-200 pl-6">
            {stories.length === 0 ? (
              <li className="text-gray-400">No stories shared yet.</li>
            ) : (
              stories.map((story) => (
                <li key={story.id} className="flex flex-col sm:flex-row sm:justify-between sm:items-baseline group cursor-pointer">
                  <span className="text-gray-800 font-medium group-hover:text-blue-600 transition-colors">
                    {story.title}
                  </span>
                  <span className="text-sm text-gray-400 shrink-0 sm:ml-4 font-mono mt-1 sm:mt-0">
                    {story.created_at ? format(new Date(story.created_at), 'yyyy') : ''}
                  </span>
                </li>
              ))
            )}
          </ul>
        </ScrollAnimation>
      </section>

      {/* 5. Teaching Thread & Navigation */}
      <section className="max-w-3xl mx-auto text-center border-t border-gray-100 pt-20">
        <ScrollAnimation animation="animate-slideUp" delay="0ms">
          <p className="text-lg text-gray-500 font-light mb-8 max-w-xl mx-auto">
            Many of these pieces are shaped by my experience teaching data science and mathematics.
            Explaining things forces clarity.
          </p>

          <div className="flex flex-col sm:flex-row justify-center gap-6 sm:gap-12 text-sm font-medium tracking-wide">
            <Link href="/projects" className="group flex items-center justify-center gap-2 text-gray-900 hover:text-blue-600 transition-colors">
              Explore Learning Platform <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link href="#" className="group flex items-center justify-center gap-2 text-gray-900 hover:text-blue-600 transition-colors">
              Browse by Topic <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </ScrollAnimation>
      </section>

    </main>
  )
}