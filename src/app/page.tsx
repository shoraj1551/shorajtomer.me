import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { BookOpen, Briefcase, PenTool } from "lucide-react"

export default function Home() {
  return (
    <div className="space-y-16">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8 lg:py-32">
          <div className="text-center">
            <h1 className="text-4xl font-bold tracking-tight sm:text-6xl">
              Shoraj Tomer
            </h1>
            <p className="mt-6 text-lg leading-8 text-gray-200">
              Educator, Storyteller & Content Creator
            </p>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-gray-300">
              I help individuals and businesses communicate their value through compelling stories and educational content.
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <Button size="lg" variant="secondary" asChild>
                <Link href="/projects">View My Work</Link>
              </Button>
              <Button size="lg" variant="outline" className="text-white border-white hover:bg-white/10" asChild>
                <Link href="/contact">Get in Touch</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Value Proposition */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            What I Do
          </h2>
          <p className="mt-4 text-lg text-gray-600">
            Blending education with creativity to deliver impact.
          </p>
        </div>

        <div className="mt-16 grid gap-8 md:grid-cols-3">
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <Briefcase className="h-10 w-10 text-blue-600" />
              <CardTitle>Professional Services</CardTitle>
              <CardDescription>
                Educational consulting, content strategy, and workshop facilitation.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button variant="outline" asChild className="w-full">
                <Link href="/services">Learn More</Link>
              </Button>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <PenTool className="h-10 w-10 text-purple-600" />
              <CardTitle>Content Creation</CardTitle>
              <CardDescription>
                Engaging stories and articles that captivate and educate your audience.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button variant="outline" asChild className="w-full">
                <Link href="/projects">See Examples</Link>
              </Button>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <BookOpen className="h-10 w-10 text-green-600" />
              <CardTitle>Knowledge Sharing</CardTitle>
              <CardDescription>
                Insights on technology, education, and personal growth via my blog.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button variant="outline" asChild className="w-full">
                <Link href="/blog">Read Blog</Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gray-50">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Let's Create Something Together
            </h2>
            <p className="mt-4 text-lg text-gray-600">
              Ready to take your educational content to the next level?
            </p>
            <div className="mt-8 flex items-center justify-center gap-x-6">
              <Button size="lg" asChild>
                <Link href="/contact">Contact Me</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
