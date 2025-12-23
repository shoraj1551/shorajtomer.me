import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ScrollAnimation } from "@/components/ui/scroll-animation"
import { Timeline } from "@/components/timeline"
import { ArrowRight, ArrowUpRight, Code2, Brain, Library } from "lucide-react"

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-white">

      {/* 1. HERO V2 - IDENTITY FIRST */}
      <section className="relative min-h-[90vh] flex flex-col items-center justify-center px-4 overflow-hidden">
        {/* Subtle background grain/gradient */}
        <div className="absolute inset-0 bg-white bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-30" />

        <div className="relative z-10 max-w-4xl w-full text-center">
          <ScrollAnimation animation="animate-fadeIn">
            <h1 className="text-5xl sm:text-7xl font-bold tracking-tighter text-gray-900 mb-8 leading-[1.1]">
              I work at the intersection of <br className="hidden sm:block" />
              <span className="text-gray-500">data, systems, and intelligence.</span>
            </h1>
          </ScrollAnimation>

          <ScrollAnimation animation="animate-slideUp" delay="200ms">
            <p className="text-xl sm:text-2xl font-medium text-gray-700 tracking-wide mb-4">
              Data & AI Professional • Problem Solver • Builder
            </p>
            <p className="text-lg text-gray-500 mb-12">
              Exploring systems that think, scale, and last.
            </p>
          </ScrollAnimation>

          <ScrollAnimation animation="animate-slideUp" delay="400ms">
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
              <Button size="lg" className="h-14 px-10 text-lg rounded-full bg-gray-900 hover:bg-black transition-all hover:scale-105" asChild>
                <Link href="#journey">Explore my journey</Link>
              </Button>
              <Link
                href="/contact"
                className="group flex items-center text-lg font-medium text-gray-600 hover:text-gray-900 transition-colors"
              >
                Work with me
                <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </ScrollAnimation>
        </div>
      </section>

      {/* 2. JOURNEY TIMELINE */}
      <section id="journey" className="py-32 bg-gray-50/50">
        <ScrollAnimation className="text-center mb-24">
          <h2 className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-4">Evolution</h2>
          <h3 className="text-3xl font-bold text-gray-900">The Path So Far</h3>
        </ScrollAnimation>
        <Timeline />
      </section>

      {/* 3. WHAT I BUILD (Horizontal Sections) */}
      <section className="py-32 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <ScrollAnimation className="mb-20">
            <h2 className="text-sm font-bold text-blue-600 uppercase tracking-widest mb-4">Core Focus</h2>
            <h3 className="text-4xl font-bold text-gray-900">What I Build</h3>
          </ScrollAnimation>

          <div className="space-y-24">
            {[
              {
                title: "Data Systems",
                tagline: "Reliable, scalable, understandable.",
                desc: "Architecting pipelines that turn raw chaos into trusted structured data. I prioritize maintainability and observability over complex abstractions.",
                icon: Code2,
                align: "left"
              },
              {
                title: "AI-driven Thinking",
                tagline: "Applying intelligence thoughtfully.",
                desc: "Moving beyond hype to implement AI agents and LLMs that actually solve human problems, automating workflows that previously required heavy cognitive load.",
                icon: Brain,
                align: "right"
              },
              {
                title: "Learning Platforms",
                tagline: "Teaching through structure.",
                desc: "Building spaces where knowledge is not just consumed but applied. My platforms focus on real-world engineering challenges, not just theory.",
                icon: Library,
                align: "left"
              }
            ].map((item, i) => (
              <ScrollAnimation key={i} animation={item.align === 'left' ? "animate-fadeInRight" : "animate-fadeInLeft"}>
                <div className={`flex flex-col md:flex-row gap-12 items-center ${item.align === 'right' ? 'md:flex-row-reverse' : ''}`}>
                  <div className="flex-1 space-y-6">
                    <div className="h-16 w-16 bg-gray-100 rounded-2xl flex items-center justify-center mb-6">
                      <item.icon className="h-8 w-8 text-gray-900" />
                    </div>
                    <h3 className="text-4xl font-bold text-gray-900">{item.title}</h3>
                    <p className="text-2xl text-gray-500 font-medium">{item.tagline}</p>
                    <p className="text-lg text-gray-600 leading-relaxed max-w-xl">{item.desc}</p>
                  </div>
                  <div className="flex-1 w-full relative aspect-video bg-gray-100 rounded-3xl overflow-hidden border border-gray-200">
                    {/* Abstract Visual Placeholder */}
                    <div className="absolute inset-0 bg-gradient-to-br from-gray-50 to-gray-200 opacity-50" />
                    <div className="absolute inset-0 flex items-center justify-center text-gray-300 font-bold text-4xl uppercase tracking-widest opacity-20">
                      Visual
                    </div>
                  </div>
                </div>
              </ScrollAnimation>
            ))}
          </div>
        </div>
      </section>

      {/* 4. WHAT I'M EXPLORING (Living Section) */}
      <section className="py-32 bg-gray-900 text-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-16">
            <div>
              <ScrollAnimation>
                <h2 className="text-sm font-bold text-blue-400 uppercase tracking-widest mb-4">Curiosity Stack</h2>
                <h3 className="text-4xl font-bold mb-8">What I’m Exploring</h3>
                <p className="text-xl text-gray-400 leading-relaxed mb-8">
                  My work is fueled by what I read and write. Here’s a glimpse into my current intellectual diet.
                </p>
                <Button variant="outline" className="border-gray-700 text-white hover:bg-gray-800 hover:text-white rounded-full px-8" asChild>
                  <Link href="/blog">Read my writing <ArrowRight className="ml-2 h-4 w-4" /></Link>
                </Button>
              </ScrollAnimation>
            </div>

            <div className="space-y-12">
              {[
                { title: "Technical Reading", items: ["Agents as OS Interfaces", "Scalable Vector Databases"] },
                { title: "Books & Ideas", items: ["Thinking in Systems", "The Beginning of Infinity"] },
              ].map((block, i) => (
                <ScrollAnimation key={i} delay={`${i * 200}ms`}>
                  <h4 className="text-xl font-bold text-white mb-4 border-b border-gray-800 pb-2">{block.title}</h4>
                  <ul className="space-y-3">
                    {block.items.map((item, idx) => (
                      <li key={idx} className="flex items-center text-gray-400 hover:text-blue-400 transition-colors cursor-default">
                        <span className="w-1.5 h-1.5 bg-blue-500 rounded-full mr-3" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </ScrollAnimation>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 5. ECOSYSTEM LINKS */}
      <section className="py-32 bg-white text-center">
        <div className="mx-auto max-w-4xl px-4">
          <ScrollAnimation>
            <h2 className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-12">Connected Ecosystem</h2>
            <div className="flex flex-wrap justify-center gap-8 sm:gap-16">
              {[
                { name: "Learning Platform", href: "/services" },
                { name: "Online Test Platform", href: "/services" },
                { name: "Blog & Writing", href: "/blog" },
                { name: "Projects", href: "/projects" }
              ].map((link, i) => (
                <Link
                  key={i}
                  href={link.href}
                  className="group flex items-center text-xl sm:text-2xl font-bold text-gray-900 hover:text-blue-600 transition-colors"
                >
                  {link.name}
                  <ArrowUpRight className="ml-2 h-5 w-5 opacity-0 group-hover:opacity-100 transition-all -translate-y-1 group-hover:translate-y-0" />
                </Link>
              ))}
            </div>
          </ScrollAnimation>
        </div>
      </section>

    </div>
  )
}
