"use client"

import { useEffect, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BookOpen, Users, PenTool, Mic } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { supabase } from "@/lib/supabase";
import { ServiceService } from "@/services/service.service";
import { Service } from "@/types";

export default function ServicesPage() {
    const [services, setServices] = useState<Service[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchServices = async () => {
            try {
                const service = new ServiceService(supabase);
                const data = await service.getActive();
                setServices(data);
            } catch (error) {
                console.error("Failed to fetch services:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchServices();
    }, []);

    // Helper to get icon component
    const getIcon = (name?: string) => {
        switch (name) {
            case 'Users': return Users;
            case 'PenTool': return PenTool;
            case 'Mic': return Mic;
            // Add more cases as needed or use a robust mapping
            default: return BookOpen;
        }
    };

    return (
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
                <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
                    Professional Services
                </h1>
                <p className="mt-4 text-xl text-gray-500 max-w-2xl mx-auto">
                    I combine educational expertise with creative storytelling to deliver impactful experiences.
                </p>
            </div>

            {loading ? (
                <div className="grid gap-8 md:grid-cols-2">
                    {[1, 2, 3, 4].map((i) => (
                        <div key={i} className="h-64 bg-gray-50 rounded-xl animate-pulse"></div>
                    ))}
                </div>
            ) : (
                <div className="grid gap-8 md:grid-cols-2">
                    {services.length === 0 ? (
                        <div className="col-span-2 text-center text-gray-500 py-12">
                            No services listed currently.
                        </div>
                    ) : (
                        services.map((service, index) => {
                            const Icon = getIcon(service.icon_name);
                            return (
                                <Card key={index} className="hover:shadow-lg transition-shadow">
                                    <CardHeader>
                                        <Icon className="h-10 w-10 text-blue-600 mb-4" />
                                        <CardTitle className="text-2xl">{service.title}</CardTitle>
                                        <CardDescription className="text-base">{service.description}</CardDescription>
                                    </CardHeader>
                                    <CardContent>
                                        <ul className="space-y-2 mb-6">
                                            {service.features?.map((feature, idx) => (
                                                <li key={idx} className="flex items-center text-gray-600">
                                                    <div className="h-1.5 w-1.5 rounded-full bg-blue-500 mr-2" />
                                                    {feature}
                                                </li>
                                            ))}
                                        </ul>
                                        <Button variant="outline" asChild className="w-full">
                                            <Link href="/contact">Inquire Now</Link>
                                        </Button>
                                    </CardContent>
                                </Card>
                            );
                        })
                    )}
                </div>
            )}

            {/* Our Platforms Section */}
            <div className="mt-20">
                <div className="text-center mb-12">
                    <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                        Explore My Platforms
                    </h2>
                    <p className="mt-4 text-lg text-gray-500 max-w-2xl mx-auto">
                        Dedicated spaces for skill building and assessment.
                    </p>
                </div>

                <div className="grid gap-8 md:grid-cols-2 max-w-4xl mx-auto">
                    <Card className="hover:border-blue-500/50 transition-colors border-2">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-3">
                                <span className="text-2xl">🎓</span> Learning Platform
                            </CardTitle>
                            <CardDescription>
                                Access structured courses and learning paths.
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <Button className="w-full bg-blue-600 hover:bg-blue-700" asChild>
                                <Link href="#" target="_blank">Start Learning</Link>
                            </Button>
                        </CardContent>
                    </Card>

                    <Card className="hover:border-green-500/50 transition-colors border-2">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-3">
                                <span className="text-2xl">📝</span> Online Test Platform
                            </CardTitle>
                            <CardDescription>
                                Validate your skills with practice tests and quizzes.
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <Button className="w-full bg-green-600 hover:bg-green-700" asChild>
                                <Link href="#" target="_blank">Take a Test</Link>
                            </Button>
                        </CardContent>
                    </Card>
                </div>
            </div>

            <div className="mt-16 text-center bg-gray-50 rounded-2xl p-8 sm:p-12">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">Need something custom?</h2>
                <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
                    I often collaborate on unique projects that sit at the intersection of education and media.
                    Let&apos;s discuss how we can work together.
                </p>
                <Button size="lg" asChild>
                    <Link href="/contact">Get in Touch</Link>
                </Button>
            </div>
        </div>
    );
}
