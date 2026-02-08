"use client"

import Link from "next/link"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Menu, X, Github, Linkedin, Twitter } from "lucide-react"
import { ThemeToggle } from "@/components/theme-toggle"
import { cn } from "@/lib/utils"

const navigation = [
  { name: "Home", href: "/" },
  { name: "About", href: "/about" },
  { name: "Work", href: "/projects" }, // Work maps to /projects
  { name: "Writing", href: "/blog" }, // Writing maps to /blog
  { name: "Contact", href: "/contact" },
]

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <header
      className={cn(
        "fixed top-0 inset-x-0 z-50 transition-all duration-300 border-b border-transparent",
        isScrolled
          ? "bg-background/60 backdrop-blur-xl border-border/40 supports-[backdrop-filter]:bg-background/60"
          : "bg-transparent py-4"
      )}
    >
      <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8" aria-label="Top">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="text-2xl font-heading font-bold tracking-tighter hover:opacity-80 transition-opacity bg-clip-text text-transparent bg-gradient-to-r from-foreground to-foreground/70">
              Shoraj Tomer
            </Link>
          </div>

          {/* Desktop navigation */}
          <div className="hidden md:flex md:items-center md:space-x-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors relative group"
              >
                {item.name}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all group-hover:w-full" />
              </Link>
            ))}
          </div>

          <div className="hidden md:flex md:items-center space-x-4">
            <Link href="https://github.com/shorajtomer" target="_blank" className="text-muted-foreground hover:text-foreground transition-colors">
              <Github className="h-5 w-5" />
            </Link>
            <Link href="https://linkedin.com/in/shorajtomer" target="_blank" className="text-muted-foreground hover:text-blue-600 transition-colors">
              <Linkedin className="h-5 w-5" />
            </Link>
            <Link href="https://twitter.com/shorajtomer" target="_blank" className="text-muted-foreground hover:text-blue-400 transition-colors">
              <Twitter className="h-5 w-5" />
            </Link>
            <div className="border-l border-border h-6 mx-2" />
            <ThemeToggle />
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center gap-4">
            <ThemeToggle />
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-muted-foreground"
            >
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>

        {/* Mobile menu */}
        {mobileMenuOpen && (
          <div className="md:hidden absolute top-full left-0 right-0 bg-background/95 backdrop-blur-xl border-b border-border shadow-2xl p-4 animate-accordion-down">
            <div className="space-y-2">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="block px-4 py-3 text-base font-medium text-foreground/80 hover:bg-muted/50 hover:text-primary rounded-lg transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
            </div>
            <div className="mt-6 pt-6 border-t border-border flex justify-center gap-6">
              <Link href="https://github.com/shorajtomer" target="_blank" className="text-muted-foreground hover:text-foreground transition-colors">
                <Github className="h-6 w-6" />
              </Link>
              <Link href="https://linkedin.com/in/shorajtomer" target="_blank" className="text-muted-foreground hover:text-blue-600 transition-colors">
                <Linkedin className="h-6 w-6" />
              </Link>
              <Link href="https://twitter.com/shorajtomer" target="_blank" className="text-muted-foreground hover:text-blue-400 transition-colors">
                <Twitter className="h-6 w-6" />
              </Link>
            </div>
          </div>
        )}
      </nav>
    </header>
  )
}