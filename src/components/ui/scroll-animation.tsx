"use client"

import { useEffect, useRef, useState } from "react"
import { cn } from "@/lib/utils"

interface ScrollAnimationProps {
    children: React.ReactNode
    className?: string
    animation?: "animate-slideUp" | "animate-fadeIn" | "animate-fadeInLeft" | "animate-fadeInRight"
    delay?: string
}

export function ScrollAnimation({
    children,
    className,
    animation = "animate-slideUp",
    delay = "0ms"
}: ScrollAnimationProps) {
    const [isVisible, setIsVisible] = useState(false)
    const ref = useRef<HTMLDivElement>(null)

    useEffect(() => {
        const observer = new IntersectionObserver(([entry]) => {
            if (entry.isIntersecting) {
                setIsVisible(true)
                observer.disconnect()
            }
        }, { threshold: 0.1, rootMargin: "50px" })

        if (ref.current) {
            observer.observe(ref.current)
        }

        return () => observer.disconnect()
    }, [])

    return (
        <div
            ref={ref}
            className={cn(
                "transition-all duration-1000",
                isVisible ? `${animation} opacity-100` : "opacity-0 translate-y-4",
                className
            )}
            style={{ animationDelay: delay }}
        >
            {children}
        </div>
    )
}
