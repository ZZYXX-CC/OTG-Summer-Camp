import { Button } from '@/components/ui/button'
import { FileDown, Home } from 'lucide-react'
import Link from 'next/link'

export default function SuccessPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-nyanza-50 to-nyanza-100 py-12 px-4">
      <div className="max-w-2xl mx-auto text-center">
        <div className="bg-white rounded-xl shadow-lg p-8 md:p-12">
          <div className="mb-8">
            <div className="w-16 h-16 bg-pakistan_green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg
                className="w-8 h-8 text-pakistan_green-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-pakistan_green-800 mb-4">
              Registration Successful!
            </h1>
            <p className="text-lg text-gray-600 mb-8">
              Thank you for registering for our Easter Football Camp. We will contact you shortly with further details.
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              asChild
              size="lg"
              className="gap-2 bg-pakistan_green-600 hover:bg-pakistan_green-700"
            >
              <Link href="https://offthegame.com">
                <Home className="w-5 h-5" />
                Return to Home
              </Link>
            </Button>
            
            <Button
              asChild
              size="lg"
              variant="outline"
              className="gap-2 border-pakistan_green-600 text-pakistan_green-600 hover:bg-pakistan_green-50"
            >
              <Link href="/brochure.pdf" target="_blank" rel="noopener noreferrer">
                <FileDown className="w-5 h-5" />
                Download Brochure
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
