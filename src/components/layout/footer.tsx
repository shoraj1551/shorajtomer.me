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
    <footer className="bg-white border-t border-gray-100" aria-labelledby="footer-heading">
      <h2 id="footer-heading" className="sr-only">Footer</h2>
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8">

          {/* Column 1: Personal Note */}
          <div className="max-w-xs">
            <Link href="/" className="text-xl font-bold text-gray-900 block mb-4">
              Shoraj Tomer
            </Link>
            <p className="text-gray-500 text-sm leading-relaxed">
              Building thoughtful systems and sharing what I learn. Focused on clarity, reliability, and human-centric engineering.
            </p>
            <p className="text-xs text-gray-400 mt-8">
              &copy; {new Date().getFullYear()} Shoraj Tomer.
            </p>
          </div>

          {/* Column 2: Navigation */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 tracking-wider uppercase mb-6">Explore</h3>
            <ul role="list" className="space-y-3">
              {footerLinks.navigation.map((item) => (
                <li key={item.name}>
                  <Link href={item.href} className="text-sm text-gray-500 hover:text-blue-600 transition-colors">
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Social */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 tracking-wider uppercase mb-6">Connect</h3>
            <ul role="list" className="space-y-3">
              {footerLinks.social.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className="flex items-center text-sm text-gray-500 hover:text-blue-600 transition-colors group"
                    target="_blank"
                  >
                    <item.icon className="h-4 w-4 mr-3 text-gray-400 group-hover:text-blue-600 transition-colors" />
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

        </div>
      </div>
    </footer>
  )
}
