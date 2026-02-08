import Link from "next/link"
import { Github, Twitter, Linkedin, Instagram, Youtube, Mail } from "lucide-react"

const footerLinks = {
  navigation: [
    { name: "About", href: "/about" },
    { name: "Journey", href: "/#journey" },
    { name: "Writing", href: "/blog" },
    { name: "Work", href: "/projects" },
    { name: "Contact", href: "/contact" },
  ],
  social: [
    { name: "LinkedIn", href: "https://linkedin.com/in/shorajtomer", icon: Linkedin },
    { name: "X (Twitter)", href: "https://twitter.com/shorajtomer", icon: Twitter },
    { name: "Instagram", href: "https://instagram.com/shorajtomer", icon: Instagram },
    { name: "YouTube", href: "https://youtube.com/@shorajtomer", icon: Youtube },
    { name: "GitHub", href: "https://github.com/shorajtomer", icon: Github },
    { name: "Email", href: "mailto:contact@shorajtomer.me", icon: Mail },
  ],
}

export default function Footer() {
  return (
    <footer className="bg-background border-t border-border" aria-labelledby="footer-heading">
      <h2 id="footer-heading" className="sr-only">Footer</h2>
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-start gap-12">

          {/* Column 1: Personal Note */}
          <div className="max-w-xs space-y-4">
            <Link href="/" className="text-2xl font-heading font-bold text-foreground block">
              Shoraj Tomer
            </Link>
            <p className="text-muted-foreground text-sm leading-relaxed">
              Building thoughtful systems and sharing what I learn.
            </p>
            <div className="flex gap-4 pt-2">
              {footerLinks.social.slice(0, 3).map((item) => (
                <Link key={item.name} href={item.href} target="_blank" className="text-muted-foreground hover:text-primary transition-colors">
                  <item.icon className="w-5 h-5" />
                  <span className="sr-only">{item.name}</span>
                </Link>
              ))}
            </div>
            <p className="text-xs text-muted-foreground/60 pt-8">
              &copy; {new Date().getFullYear()} Shoraj Tomer. All rights reserved.
            </p>
          </div>

          {/* Column 2: Links */}
          <div className="grid grid-cols-2 gap-12">
            <div>
              <h3 className="text-sm font-semibold text-foreground tracking-wider uppercase mb-6">Explore</h3>
              <ul role="list" className="space-y-3">
                {footerLinks.navigation.map((item) => (
                  <li key={item.name}>
                    <Link href={item.href} className="text-sm text-muted-foreground hover:text-primary transition-colors">
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-foreground tracking-wider uppercase mb-6">Connect</h3>
              <ul role="list" className="space-y-3">
                {footerLinks.social.map((item) => (
                  <li key={item.name}>
                    <Link
                      href={item.href}
                      className="flex items-center text-sm text-muted-foreground hover:text-primary transition-colors group"
                      target="_blank"
                    >
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

        </div>
      </div>
    </footer>
  )
}
