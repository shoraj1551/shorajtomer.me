import Link from 'next/link'
import { Button } from '@/components/ui/button'

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="text-center space-y-6 max-w-md mx-auto">
        <div className="space-y-2">
          <h1 className="text-6xl font-bold text-gray-900 dark:text-gray-100">404</h1>
          <h2 className="text-2xl font-semibold text-gray-700 dark:text-gray-300">
            Page Not Found
          </h2>
        </div>
        
        <p className="text-gray-600 dark:text-gray-400 text-lg">
          Sorry, the page you are looking for doesn't exist or has been moved.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button asChild>
            <Link href="/">
              Go Home
            </Link>
          </Button>
          
          <Button variant="outline" asChild>
            <Link href="/blog">
              Browse Blog
            </Link>
          </Button>
        </div>
      </div>
    </div>
  )
}