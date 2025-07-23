import Link from 'next/link'
import { Button } from '@/components/ui/button'

export default function UnauthorizedPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full text-center">
        <div className="bg-white shadow-lg rounded-lg p-8">
          <div className="text-red-500 text-6xl mb-4">🚫</div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Access Denied</h1>
          <p className="text-gray-600 mb-6">
            You don't have permission to access this page.
          </p>
          <div className="space-y-3">
            <Link href="/admin">
              <Button className="w-full">
                Go to Dashboard
              </Button>
            </Link>
            <Link href="/login">
              <Button variant="outline" className="w-full">
                Login with Different Account
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}