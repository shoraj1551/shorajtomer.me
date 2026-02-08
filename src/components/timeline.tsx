"use client"

import { ScrollAnimation } from "@/components/ui/scroll-animation"
import { cn } from "@/lib/utils"

interface TimelineItemProps {
    year: string
    title: string
    description: string
    align?: "left" | "right"
    delay: string
    isLast?: boolean
}

function TimelineItem({ year, title, description, align = "left", delay = "0ms", isLast }: TimelineItemProps) {
    return (
        <div className={cn("flex w-full items-start justify-center relative", isLast ? "" : "pb-16")}>
            {/* Center Line (Static for now, could be animated height) */}
            {!isLast && (
                <div className="absolute left-1/2 top-4 bottom-0 w-px bg-border -translate-x-1/2 hidden md:block" />
            )}

            {/* Node */}
            <div className="absolute left-1/2 top-0 -translate-x-1/2 w-4 h-4 rounded-full bg-background border-4 border-primary shadow-[0_0_10px_rgba(var(--primary),0.5)] z-10 hidden md:block" />

            {/* Content */}
            <div className={cn(
                "flex w-full md:w-1/2 flex-col gap-2",
                align === "left" ? "md:pr-12 md:text-right md:items-end" : "md:pl-12 md:ml-auto md:text-left md:items-start"
            )}>
                <ScrollAnimation animation={align === "left" ? "animate-fadeInRight" : "animate-fadeInLeft"} delay={delay}>
                    <span className="inline-block px-3 py-1 rounded-full bg-primary/10 text-xs font-bold text-primary tracking-wider mb-2">{year}</span>
                    <h3 className="text-xl font-bold text-foreground">{title}</h3>
                    <p className="text-muted-foreground max-w-sm leading-relaxed">{description}</p>
                </ScrollAnimation>
            </div>
        </div>
    )
}

export function Timeline() {
    const milestones = [
        {
            year: "ORIGIN",
            title: "The Curiosity Engine",
            description: "Started with a fascination for how things work. Breaking computers, writing scripts, and asking infinite questions.",
            align: "left"
        },
        {
            year: "GROWTH",
            title: "Engineering at Scale",
            description: "Moved from writing code to building systems. Learned that software engineering is about trade-offs, not just syntax.",
            align: "right"
        },
        {
            year: "PHILOSOPHY",
            title: "Data as Infrastructure",
            description: "Realized that reliable data is the lifeblood of modern applications. Focused on reliability, quality, and pipeline architecture.",
            align: "left"
        },
        {
            year: "TEACHING",
            title: "Sharing the Knowledge",
            description: "Building platforms to help others navigate the complexity of engineering. Because understanding is the best way to leverage technology.",
            align: "right"
        },
        {
            year: "CURRENT",
            title: "Agentic Systems",
            description: "Exploring the frontier of AI agents and how they will reshape software development and human productivity.",
            align: "left"
        }
    ]

    return (
        <div className="relative max-w-4xl mx-auto px-4">
            {/* Mobile continuous line */}
            <div className="absolute left-8 top-4 bottom-0 w-px bg-border md:hidden" />

            <div className="space-y-0">
                {milestones.map((item, i) => (
                    <TimelineItem
                        key={i}
                        {...item}
                        align={item.align as "left" | "right"}
                        delay={`${i * 150}ms`}
                        isLast={i === milestones.length - 1}
                    />
                ))}
            </div>
        </div>
    )
}
