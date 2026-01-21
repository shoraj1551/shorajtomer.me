"use client"

import { useEffect, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ExternalLink, Github, Layers, Database, BookOpen, Star } from "lucide-react";
import { ScrollAnimation } from "@/components/ui/scroll-animation";
import { supabase } from "@/lib/supabase";
import { ProjectService } from "@/services/project.service";
import { Project } from "@/types";

export default function ProjectsPage() {
    const [projects, setProjects] = useState<Project[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const service = new ProjectService(supabase);
                const data = await service.getPublished();
                setProjects(data);
            } catch (error) {
                console.error("Failed to fetch projects:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    // Helper to get icon component (if mapping needed, for now using defaults or mapping name)
    const getIcon = (name?: string) => {
        if (name === 'Database') return Database;
        return Layers;
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-white flex items-center justify-center">
                <div className="animate-pulse space-y-4 w-full max-w-4xl px-4">
                    <div className="h-12 bg-gray-100 rounded-full w-3/4 mx-auto"></div>
                    <div className="h-64 bg-gray-50 rounded-xl"></div>
                </div>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-white">
            {/* 1. HERO */}
            <section className="py-32 px-4 bg-gray-50 border-b border-gray-100">
                <div className="max-w-4xl mx-auto text-center">
                    <ScrollAnimation animation="animate-fadeIn" delay="0ms">
                        <h1 className="text-4xl sm:text-6xl font-bold tracking-tight text-gray-900 mb-6 leading-tight">
                            Proof of Work.
                        </h1>
                        <p className="text-xl sm:text-2xl text-gray-500 leading-relaxed font-light max-w-2xl mx-auto">
                            I don’t just write code; I build systems. Here are the platforms, tools, and resources I’ve engineered to solve real problems in data and education.
                        </p>
                    </ScrollAnimation>
                </div>
            </section>

            {/* 2. FEATURED PLATFORMS (THE BIG STUFF) */}
            <section className="py-32 px-4">
                <div className="max-w-6xl mx-auto space-y-32">
                    {projects.length === 0 ? (
                        <div className="text-center text-gray-500">
                            <p>No projects showcased yet. Check back soon!</p>
                        </div>
                    ) : (
                        projects.map((project, i) => {
                            const Icon = getIcon(project.icon_name);
                            return (
                                <ScrollAnimation key={project.id} className={`flex flex-col md:flex-row gap-12 items-center ${i % 2 === 1 ? 'md:flex-row-reverse' : ''}`} delay="0ms">
                                    <div className="flex-1 space-y-8">
                                        <div className="inline-flex items-center gap-2 text-blue-600 font-bold tracking-widest uppercase text-sm border-b-2 border-blue-100 pb-1">
                                            <Icon className="h-4 w-4" />
                                            Feature Platform {i + 1}
                                        </div>
                                        <h2 className="text-4xl font-bold text-gray-900 flex items-center gap-3">
                                            {project.title}
                                            {project.is_featured && <Star className="h-6 w-6 text-yellow-500 fill-yellow-500" />}
                                        </h2>
                                        <h3 className="text-2xl text-gray-500 font-light">{project.tagline}</h3>
                                        <p className="text-lg text-gray-600 leading-relaxed">
                                            {project.description}
                                        </p>
                                        <div className="flex flex-wrap gap-2">
                                            {project.tech?.map(t => (
                                                <Badge key={t} variant="secondary" className="bg-gray-100 text-gray-700 hover:bg-gray-200 px-3 py-1 text-sm font-medium">
                                                    {t}
                                                </Badge>
                                            ))}
                                        </div>
                                        <div className="pt-4 flex gap-4">
                                            <Badge variant="outline" className="text-blue-600 border-blue-200">
                                                {project.status || 'Active'}
                                            </Badge>
                                            {project.demo_url && (
                                                <Link href={project.demo_url} target="_blank" className="text-sm font-bold text-blue-600 hover:underline flex items-center gap-1">
                                                    Live Demo <ExternalLink className="h-3 w-3" />
                                                </Link>
                                            )}
                                        </div>
                                    </div>
                                    {/* Placeholder for Project Image/Visual - Using a gradient div for now or image if available */}
                                    <div className="flex-1 w-full aspect-video bg-gradient-to-br from-gray-100 to-gray-200 rounded-3xl border border-gray-100 flex items-center justify-center relative overflow-hidden group">
                                        {project.image_url ? (
                                            <img src={project.image_url} alt={project.title} className="w-full h-full object-cover" />
                                        ) : (
                                            <div className="absolute inset-0 bg-white/50 backdrop-blur-[1px] group-hover:bg-white/30 transition-all flex flex-col items-center justify-center p-8 text-center">
                                                <h4 className="text-xl font-medium text-gray-400">Visual Placeholder</h4>
                                                <p className="text-sm text-gray-400 mt-2">Screenshot of {project.title}</p>
                                            </div>
                                        )}
                                    </div>
                                </ScrollAnimation>
                            );
                        })
                    )}
                </div>
            </section>

            {/* 3. TEACHING & OPEN SOURCE RESOURCES - Static for now, could be dynamic later */}
            <section className="py-32 bg-gray-900 text-white">
                <div className="max-w-6xl mx-auto px-4">
                    <ScrollAnimation className="mb-20 text-center" delay="0ms">
                        <h2 className="text-sm font-bold text-blue-400 uppercase tracking-widest mb-4">Community & Education</h2>
                        <h3 className="text-3xl font-bold text-white">Open Source & Teaching Materials</h3>
                    </ScrollAnimation>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {[
                            {
                                title: "Data Science Bootcamper",
                                desc: "A comprehensive roadmap and curriculum for transitioning into Data Science, covering Stats, Python, and ML.",
                                type: "Curriculum",
                                link: "https://github.com/shorajtomer"
                            },
                            {
                                title: "System Design Primer (Simplified)",
                                desc: "Notes and diagrams explaining complex distributed system concepts for junior engineers.",
                                type: "Educational",
                                link: "https://github.com/shorajtomer"
                            },
                            {
                                title: "React Performance Patterns",
                                desc: "A collection of code examples demonstrating common performance pitfalls and their solutions in React.",
                                type: "Codebase",
                                link: "https://github.com/shorajtomer"
                            }
                        ].map((item, i) => (
                            <ScrollAnimation key={i} delay={`${i * 100}ms`} animation="animate-slideUp">
                                <div className="bg-gray-800/50 p-8 rounded-2xl border border-gray-700 h-full flex flex-col hover:bg-gray-800 transition-colors group">
                                    <div className="flex items-start justify-between mb-6">
                                        <BookOpen className="h-8 w-8 text-blue-400" />
                                        <Badge variant="outline" className="text-gray-400 border-gray-600">
                                            {item.type}
                                        </Badge>
                                    </div>
                                    <h4 className="text-xl font-bold text-white mb-3 group-hover:text-blue-400 transition-colors">{item.title}</h4>
                                    <p className="text-gray-400 leading-relaxed mb-8 flex-1">
                                        {item.desc}
                                    </p>
                                    <Link href={item.link} target="_blank" className="inline-flex items-center text-sm font-bold text-blue-400 hover:text-blue-300">
                                        View Repository <ExternalLink className="ml-2 h-4 w-4" />
                                    </Link>
                                </div>
                            </ScrollAnimation>
                        ))}
                    </div>
                </div>
            </section>

            {/* 4. CTA */}
            <section className="py-32 px-4 text-center">
                <ScrollAnimation delay="0ms">
                    <h2 className="text-3xl font-bold text-gray-900 mb-6">Want to see the code?</h2>
                    <p className="text-xl text-gray-500 mb-10 max-w-2xl mx-auto">
                        My philosophy is open by default. You can explore most of my learning materials and helper libraries on GitHub.
                    </p>
                    <Button size="lg" className="rounded-full px-8 h-12" asChild>
                        <Link href="https://github.com/shorajtomer" target="_blank">
                            <Github className="mr-2 h-5 w-5" />
                            Visit GitHub Profile
                        </Link>
                    </Button>
                </ScrollAnimation>
            </section>
        </div>
    );
}
