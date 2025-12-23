import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ScrollAnimation } from "@/components/ui/scroll-animation"
import { ArrowRight, Github, Linkedin, Twitter, Youtube, Instagram } from "lucide-react"

export default function About() {
  return (
    <div className="flex flex-col min-h-screen bg-white text-gray-900 font-sans">

      {/* 1. OPENING - WHY THIS PAGE EXISTS */}
      <section className="py-32 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <ScrollAnimation animation="animate-fadeIn">
            <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-gray-900 mb-8 leading-tight">
              Builder. Problem Solver. Teacher.
            </h1>
            <p className="text-xl sm:text-2xl text-gray-500 leading-relaxed font-light">
              I work with data and AI, but I also teach. Teaching helps me think clearly, structure ideas, and explain complex concepts simply — whether that’s in data science, mathematics, or statistics.
            </p>
          </ScrollAnimation>
        </div>
      </section>

      {/* 2. MY JOURNEY (NARRATIVE) */}
      <section className="py-24 max-w-2xl mx-auto px-4 space-y-20 border-t border-gray-100">
        {[
          {
            title: "The Teaching Loop",
            content: "I discovered early that you don't truly understand a concept until you can explain it to a beginner. Teaching mathematics and data science isn't just a side hobby; it's how I refine my own understanding. It forces clarity and exposes gaps in my reasoning."
          },
          {
            title: "Building Systems",
            content: "My engineering journey is driven by the same desire for structure. I moved from scripts to complex data platforms because I wanted to build systems that are reliable and intuitive. Good code, like a good lesson, should be understandable."
          },
          {
            title: "Why I Build Learning Platforms",
            content: "I build learning platforms because I believe education needs better infrastructure. I want to create spaces where engineers can learn not just the syntax, but the 'why' behind the systems they use."
          },
          {
            title: "The AI Frontier",
            content: "Now, I'm exploring how AI agents can augment both engineering and learning. I see a future where AI acts as a personalized tutor and a capable pair programmer, effectively scaling high-quality mentorship."
          }
        ].map((block, i) => (
          <ScrollAnimation key={i} delay={`${i * 100}ms`}>
            <div className="space-y-4">
              <h2 className="text-sm font-bold text-gray-400 uppercase tracking-widest">{block.title}</h2>
              <p className="text-xl text-gray-800 leading-relaxed font-medium">
                {block.content}
              </p>
            </div>
          </ScrollAnimation>
        ))}
      </section>

      {/* 3. HOW I APPROACH PROBLEMS */}
      <section className="py-32 bg-gray-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <ScrollAnimation className="mb-16 text-center">
            <h2 className="text-sm font-bold text-blue-600 uppercase tracking-widest mb-4">Principles</h2>
            <h3 className="text-3xl font-bold text-gray-900">How I approach data & education</h3>
          </ScrollAnimation>

          <div className="grid md:grid-cols-3 gap-12">
            {[
              { title: "Clarity is King", desc: "Whether writing code or explaining a theorem, if it's confusing, it's not finished. I prioritize readability and simplicity above all else." },
              { title: "Systems over Syntax", desc: "Tools change. Fundamentals don't. I focus on the underlying systems—linear algebra, distributed computing, statistics—that power our tools." },
              { title: "Build to Teach", desc: "I document my code and my projects as if I'm teaching them. This habit leads to better architecture and easier maintenance for everyone." }
            ].map((item, i) => (
              <ScrollAnimation key={i} delay={`${i * 200}ms`}>
                <div className="bg-white p-8 rounded-2xl border border-gray-100 h-full">
                  <h4 className="text-xl font-bold text-gray-900 mb-4">{item.title}</h4>
                  <p className="text-gray-600 leading-relaxed">{item.desc}</p>
                </div>
              </ScrollAnimation>
            ))}
          </div>
        </div>
      </section>

      {/* 4. WHAT I'M WORKING ON NOW */}
      <section className="py-32 bg-white container mx-auto px-4 max-w-4xl">
        <ScrollAnimation className="flex flex-col md:flex-row gap-16 items-start">
          <div className="md:w-1/3">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">What I'm working on now</h2>
            <p className="text-gray-500">Connecting dots between data, AI, and education.</p>
          </div>
          <div className="md:w-2/3 space-y-8">
            {[
              "Teaching Data Science and Statistics to engineers.",
              "Building a comprehensive Learning Platform for system design.",
              "Developing an Online Test Platform for skill validation.",
              "Exploring AI Agents as educational assistants."
            ].map((item, i) => (
              <ScrollAnimation key={i} delay={`${i * 100}ms`} animation="animate-slideUp">
                <div className="flex items-start">
                  <span className="text-blue-600 mr-4 text-xl">•</span>
                  <p className="text-lg text-gray-800 border-b border-gray-100 pb-4 w-full">{item}</p>
                </div>
              </ScrollAnimation>
            ))}
          </div>
        </ScrollAnimation>
      </section>

      {/* 5. BEYOND WORK */}
      <section className="py-24 bg-gray-900 text-white text-center">
        <div className="max-w-2xl mx-auto px-4">
          <ScrollAnimation>
            <h2 className="text-sm font-bold text-blue-400 uppercase tracking-widest mb-6">Beyond Work</h2>
            <p className="text-xl text-gray-300 leading-relaxed mb-12">
              When I'm not coding or teaching, I'm usually reading science fiction, writing stories, or deep-diving into a math or history topic. I believe that being a lifelong student is the key to being a good teacher.
            </p>
          </ScrollAnimation>
        </div>
      </section>

      {/* 6. CONNECT & VERIFY */}
      <section className="py-24 bg-white border-b border-gray-100">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <ScrollAnimation>
            <h2 className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-8">Connect & Verify</h2>
            <div className="flex flex-wrap justify-center gap-8">
              {[
                { name: "LinkedIn", href: "https://linkedin.com/in/shorajtomer", icon: Linkedin },
                { name: "X", href: "https://twitter.com/shorajtomer", icon: Twitter },
                { name: "Instagram", href: "https://instagram.com/shorajtomer", icon: Instagram },
                { name: "YouTube", href: "https://youtube.com/@shorajtomer", icon: Youtube },
                { name: "GitHub", href: "https://github.com/shorajtomer", icon: Github },
              ].map((social, i) => (
                <Link
                  key={i}
                  href={social.href}
                  target="_blank"
                  className="flex flex-col items-center gap-2 group"
                >
                  <div className="h-12 w-12 rounded-full bg-gray-50 flex items-center justify-center group-hover:bg-blue-50 group-hover:scale-110 transition-all">
                    <social.icon className="h-5 w-5 text-gray-600 group-hover:text-blue-600" />
                  </div>
                  <span className="text-sm text-gray-400 group-hover:text-gray-900 transition-colors">{social.name}</span>
                </Link>
              ))}
            </div>
          </ScrollAnimation>
        </div>
      </section>

      {/* 7. ENDING - SOFT INVITATION */}
      <section className="py-32 bg-white text-center">
        <div className="max-w-xl mx-auto px-4">
          <ScrollAnimation>
            <p className="text-2xl font-serif text-gray-900 italic mb-8">
              "If you care about learning, systems, and building things that last — let’s talk."
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
              <Button size="lg" className="h-14 px-10 text-lg rounded-full" asChild>
                <Link href="/contact">Work with me</Link>
              </Button>
              <Button variant="link" className="text-lg text-gray-600 hover:text-gray-900" asChild>
                <Link href="/blog">Read my writing <ArrowRight className="ml-2 h-4 w-4" /></Link>
              </Button>
            </div>
          </ScrollAnimation>
        </div>
      </section>

    </div>
  )
}