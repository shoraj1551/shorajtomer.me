import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ScrollAnimation } from "@/components/ui/scroll-animation"
import { Timeline } from "@/components/timeline"
import { ArrowRight, ArrowUpRight, Code2, Brain, Library, Sparkles, Layers, Cpu } from "lucide-react"

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-background overflow-hidden">

      {/* 1. HERO SECTION - Cosmic Data Stream */}
      <section className="relative min-h-[100vh] flex flex-col items-center justify-center px-4 overflow-hidden pt-16">
        {/* Animated Background */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-primary/20 via-background to-background opacity-40 blur-3xl" />
          <div className="absolute top-0 left-0 w-full h-full bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]" />
          {/* Meteor/Star effects can be added here with CSS animations */}
        </div>

        <div className="relative z-10 max-w-5xl w-full text-center space-y-8">
          <ScrollAnimation animation="animate-fadeIn" delay="0ms">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-secondary/50 border border-secondary text-secondary-foreground text-sm font-medium mb-6 backdrop-blur-sm">
              <Sparkles className="w-4 h-4" />
              <span>Designing Intelligence</span>
            </div>
          </ScrollAnimation>

          <ScrollAnimation animation="animate-slideUp" delay="100ms">
            <h1 className="text-5xl sm:text-7xl md:text-8xl font-heading font-bold tracking-tighter text-foreground mb-4 leading-[1.05]">
              Data. Systems. <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-purple-400">Intelligence.</span>
            </h1>
          </ScrollAnimation>

          <ScrollAnimation animation="animate-slideUp" delay="200ms">
            <p className="text-xl sm:text-2xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              I architect systems that turn chaotic data into clear decisions.
              Exploring the frontier where software meets cognitive agents.
            </p>
          </ScrollAnimation>

          <ScrollAnimation animation="animate-slideUp" delay="300ms">
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
              <Button size="lg" className="h-14 px-8 text-lg rounded-full bg-primary hover:bg-primary/90 shadow-[0_0_20px_rgba(37,99,235,0.3)] transition-all hover:scale-105" asChild>
                <Link href="#work">View My Work</Link>
              </Button>
              <Button size="lg" variant="outline" className="h-14 px-8 text-lg rounded-full border-border/50 hover:bg-secondary/50 transition-all" asChild>
                <Link href="/blog">Read My Thoughts</Link>
              </Button>
            </div>
          </ScrollAnimation>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce opacity-50">
          <div className="w-[1px] h-16 bg-gradient-to-b from-transparent via-foreground to-transparent" />
        </div>
      </section>

      {/* 2. BENTO GRID - What I build */}
      <section id="work" className="py-32 relative">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <ScrollAnimation className="mb-16 text-center" delay="0ms">
            <h2 className="text-3xl sm:text-4xl font-heading font-bold mb-4">The Stack</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">My technical focus areas, visualized.</p>
          </ScrollAnimation>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Card 1: Data Systems (Large) */}
            <ScrollAnimation className="md:col-span-2 group relative overflow-hidden rounded-3xl bg-secondary/20 border border-white/5 p-8 hover:border-primary/50 transition-colors" delay="0ms">
              <div className="absolute top-0 right-0 -mt-20 -mr-20 w-80 h-80 bg-primary/20 rounded-full blur-3xl opacity-20 group-hover:opacity-40 transition-opacity" />
              <div className="relative z-10">
                <div className="h-12 w-12 bg-primary/20 rounded-xl flex items-center justify-center mb-6 text-primary">
                  <Layers className="h-6 w-6" />
                </div>
                <h3 className="text-2xl font-bold mb-2">Data Infrastructure</h3>
                <p className="text-muted-foreground mb-6 max-w-md">Scalable pipelines that move terabytes. I trust in schema-on-write and strong consistency.</p>
                <div className="h-40 w-full bg-background/50 rounded-xl border border-white/5 flex items-center justify-center overflow-hidden">
                  {/* Mock Code Block */}
                  <div className="text-xs font-mono text-muted-foreground p-4 w-full">
                    <p><span className="text-purple-400">class</span> <span className="text-yellow-300">DataPipeline</span>:</p>
                    <p className="pl-4"><span className="text-blue-400">def</span> <span className="text-yellow-300">ingest</span>(source):</p>
                    <p className="pl-8">stream = source.connect()</p>
                    <p className="pl-8">return stream.transform().load()</p>
                  </div>
                </div>
              </div>
            </ScrollAnimation>

            {/* Card 2: AI Agents */}
            <ScrollAnimation className="md:row-span-2 group relative overflow-hidden rounded-3xl bg-secondary/20 border border-white/5 p-8 hover:border-purple-500/50 transition-colors" delay="100ms">
              <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-purple-500/10 to-transparent" />
              <div className="relative z-10 h-full flex flex-col">
                <div className="h-12 w-12 bg-purple-500/20 rounded-xl flex items-center justify-center mb-6 text-purple-400">
                  <Brain className="h-6 w-6" />
                </div>
                <h3 className="text-2xl font-bold mb-2">Cognitive Systems</h3>
                <p className="text-muted-foreground mb-6">LLMs as operating system interfaces. Building agents that can plan and execute.</p>
                <div className="mt-auto flex justify-center">
                  <div className="relative w-32 h-32 animate-float">
                    <Cpu className="w-full h-full text-foreground/10" />
                    <div className="absolute inset-0 bg-purple-500/20 blur-2xl rounded-full" />
                  </div>
                </div>
              </div>
            </ScrollAnimation>

            {/* Card 3: Learning Platforms */}
            <ScrollAnimation className="group relative overflow-hidden rounded-3xl bg-secondary/20 border border-white/5 p-8 hover:border-blue-400/50 transition-colors" delay="200ms">
              <div className="relative z-10">
                <div className="h-12 w-12 bg-blue-400/20 rounded-xl flex items-center justify-center mb-6 text-blue-400">
                  <Library className="h-6 w-6" />
                </div>
                <h3 className="text-2xl font-bold mb-2">EdTech Platforms</h3>
                <p className="text-muted-foreground">Interfaces that facilitate deep learning and retention.</p>
              </div>
            </ScrollAnimation>

            {/* Card 4: Open Source */}
            <ScrollAnimation className="group relative overflow-hidden rounded-3xl bg-secondary/20 border border-white/5 p-8 hover:border-green-400/50 transition-colors" delay="300ms">
              <div className="relative z-10 flex items-center gap-4">
                <div className="h-12 w-12 bg-green-400/20 rounded-xl flex items-center justify-center text-green-400">
                  <Code2 className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="text-xl font-bold">Open Source</h3>
                  <Link href="https://github.com/shorajtomer" className="text-sm text-muted-foreground hover:text-green-400 flex items-center gap-1">
                    github.com/shorajtomer <ArrowUpRight className="w-3 h-3" />
                  </Link>
                </div>
              </div>
            </ScrollAnimation>
          </div>
        </div>
      </section>

      {/* 3. TIMELINE - System Logs */}
      <section className="py-32 bg-secondary/10">
        <ScrollAnimation className="text-center mb-20" delay="0ms">
          <h2 className="text-sm font-bold text-primary uppercase tracking-widest mb-4">System Logistics</h2>
          <h3 className="text-3xl font-heading font-bold">The Sequence</h3>
        </ScrollAnimation>
        <Timeline />
      </section>

      {/* 4. EXPLORATION - Dark Mode Grid */}
      <section className="py-32 bg-background relative overflow-hidden">
        <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-border to-transparent" />

        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div>
              <ScrollAnimation delay="0ms">
                <h2 className="text-sm font-bold text-primary uppercase tracking-widest mb-4">Input Stream</h2>
                <h3 className="text-4xl font-heading font-bold mb-6">What I’m Exploring</h3>
                <p className="text-xl text-muted-foreground leading-relaxed mb-8">
                  My output is a function of my input. Here is the current training data for my own neural net.
                </p>
                <div className="flex flex-wrap gap-4">
                  {["Vector DBs", "Agentic Workflows", "Rust", "System Design"].map((tag) => (
                    <span key={tag} className="px-4 py-2 rounded-full border border-border bg-secondary/30 text-sm font-medium">
                      {tag}
                    </span>
                  ))}
                </div>
                <div className="mt-10">
                  <Button variant="default" size="lg" className="rounded-full" asChild>
                    <Link href="/blog">Read Engineering Logs <ArrowRight className="ml-2 h-4 w-4" /></Link>
                  </Button>
                </div>
              </ScrollAnimation>
            </div>

            <div className="relative">
              {/* Decorative Code Interface */}
              <div className="rounded-xl bg-[#0d1117] border border-gray-800 p-6 font-mono text-sm leading-relaxed shadow-2xl relative">
                <div className="flex gap-2 mb-4">
                  <div className="w-3 h-3 rounded-full bg-red-500/50" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500/50" />
                  <div className="w-3 h-3 rounded-full bg-green-500/50" />
                </div>
                <div className="space-y-2 text-gray-400">
                  <p><span className="text-blue-400">const</span> <span className="text-purple-400">currentFocus</span> = <span className="text-green-400">&quot;Scale&quot;</span>;</p>
                  <p><span className="text-blue-400">await</span> <span className="text-yellow-300">learn</span>(<span className="text-orange-300">&quot;rust&quot;</span>);</p>
                  <p className="text-gray-600">{/* Optimizing for throughput and reliability */}</p>
                  <p><span className="text-blue-400">if</span> (complexity &gt; threshold) {'{'}</p>
                  <p className="pl-4"><span className="text-purple-400">deploy_agent</span>();</p>
                  <p>{'}'}</p>
                </div>
              </div>
              <div className="absolute -z-10 -inset-4 bg-gradient-to-r from-primary/30 to-purple-500/30 blur-2xl rounded-full opacity-50" />
            </div>
          </div>
        </div>
      </section>

    </div>
  )
}
