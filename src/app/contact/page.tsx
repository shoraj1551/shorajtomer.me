"use client"

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Mail, MapPin, Phone, Send, CheckCircle2 } from "lucide-react";
import { ScrollAnimation } from "@/components/ui/scroll-animation";

export default function ContactPage() {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSent, setIsSent] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        // Simulate network request
        await new Promise(resolve => setTimeout(resolve, 1500));

        setIsSubmitting(false);
        setIsSent(true);
    };

    return (
        <div className="mx-auto max-w-7xl px-4 py-32 sm:px-6 lg:px-8 min-h-screen flex flex-col justify-center">
            <div className="grid lg:grid-cols-2 gap-16 items-start">

                {/* Contact Info */}
                <ScrollAnimation animation="animate-fadeIn">
                    <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl mb-8 leading-tight">
                        Let's build something meaningful.
                    </h1>
                    <p className="text-xl text-gray-500 mb-12 leading-relaxed font-light">
                        I'm always open to discussing new projects, teaching opportunities,
                        or technical challenges. If you have an idea that needs a system, let's talk.
                    </p>

                    <div className="space-y-6">
                        <div className="flex items-center gap-6 p-4 rounded-2xl hover:bg-gray-50 transition-colors group">
                            <div className="bg-blue-50 p-4 rounded-full group-hover:bg-blue-100 transition-colors">
                                <Mail className="h-6 w-6 text-blue-600" />
                            </div>
                            <div>
                                <h3 className="font-bold text-gray-900">Email</h3>
                                <p className="text-gray-500">contact@shorajtomer.me</p>
                            </div>
                        </div>

                        <div className="flex items-center gap-6 p-4 rounded-2xl hover:bg-gray-50 transition-colors group">
                            <div className="bg-blue-50 p-4 rounded-full group-hover:bg-blue-100 transition-colors">
                                <MapPin className="h-6 w-6 text-blue-600" />
                            </div>
                            <div>
                                <h3 className="font-bold text-gray-900">Location</h3>
                                <p className="text-gray-500">Remote / Worldwide</p>
                            </div>
                        </div>

                        <div className="flex items-center gap-6 p-4 rounded-2xl hover:bg-gray-50 transition-colors group">
                            <div className="bg-blue-50 p-4 rounded-full group-hover:bg-blue-100 transition-colors">
                                <Phone className="h-6 w-6 text-blue-600" />
                            </div>
                            <div>
                                <h3 className="font-bold text-gray-900">Social</h3>
                                <p className="text-gray-500">@shorajtomer</p>
                            </div>
                        </div>
                    </div>
                </ScrollAnimation>

                {/* Contact Form */}
                <ScrollAnimation delay="200ms" animation="animate-slideUp">
                    <Card className="shadow-xl border-gray-100 rounded-3xl overflow-hidden">
                        <CardHeader className="bg-gray-50 border-b border-gray-100 p-8">
                            <CardTitle className="text-2xl font-bold text-gray-900">Send a Message</CardTitle>
                        </CardHeader>
                        <CardContent className="p-8">
                            {isSent ? (
                                <div className="flex flex-col items-center justify-center py-12 text-center animate-fadeIn">
                                    <div className="h-20 w-20 bg-green-50 text-green-600 rounded-full flex items-center justify-center mb-6">
                                        <CheckCircle2 className="h-10 w-10" />
                                    </div>
                                    <h3 className="text-2xl font-bold text-gray-900 mb-2">Message Sent!</h3>
                                    <p className="text-gray-500 mb-8 max-w-xs mx-auto">
                                        Thank you for reaching out. I'll get back to you within 24 hours.
                                    </p>
                                    <Button variant="outline" onClick={() => setIsSent(false)} className="rounded-full">
                                        Send Another Message
                                    </Button>
                                </div>
                            ) : (
                                <form onSubmit={handleSubmit} className="space-y-6">
                                    <div className="grid grid-cols-2 gap-6">
                                        <div className="space-y-2">
                                            <label htmlFor="first-name" className="text-sm font-medium text-gray-700">First name</label>
                                            <Input id="first-name" placeholder="John" required disabled={isSubmitting} className="h-12 rounded-xl" />
                                        </div>
                                        <div className="space-y-2">
                                            <label htmlFor="last-name" className="text-sm font-medium text-gray-700">Last name</label>
                                            <Input id="last-name" placeholder="Doe" required disabled={isSubmitting} className="h-12 rounded-xl" />
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <label htmlFor="email" className="text-sm font-medium text-gray-700">Email</label>
                                        <Input id="email" type="email" placeholder="john@example.com" required disabled={isSubmitting} className="h-12 rounded-xl" />
                                    </div>
                                    <div className="space-y-2">
                                        <label htmlFor="subject" className="text-sm font-medium text-gray-700">Subject</label>
                                        <Input id="subject" placeholder="Project Inquiry" required disabled={isSubmitting} className="h-12 rounded-xl" />
                                    </div>
                                    <div className="space-y-2">
                                        <label htmlFor="message" className="text-sm font-medium text-gray-700">Message</label>
                                        <Textarea
                                            id="message"
                                            placeholder="Tell me about your project..."
                                            className="min-h-[150px] rounded-xl resize-none"
                                            required
                                            disabled={isSubmitting}
                                        />
                                    </div>
                                    <Button type="submit" className="w-full h-12 rounded-xl text-lg" size="lg" disabled={isSubmitting}>
                                        {isSubmitting ? (
                                            <span className="flex items-center justify-center">
                                                Sending...
                                            </span>
                                        ) : (
                                            <span className="flex items-center justify-center">
                                                <Send className="w-4 h-4 mr-2" />
                                                Send Message
                                            </span>
                                        )}
                                    </Button>
                                </form>
                            )}
                        </CardContent>
                    </Card>
                </ScrollAnimation>
            </div>
        </div>
    );
}
