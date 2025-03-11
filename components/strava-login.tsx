'use client'

import { useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import FitbitLogin from '@/components/fitbit-login'
import StravaLogin from '@/components/strava-login'

export default function LoginPage() {
  const searchParams = useSearchParams()
  const [error, setError] = useState('')

  useEffect(() => {
    // Check if there's an error parameter in the URL
    const errorParam = searchParams.get('error')
    if (errorParam) {
      setError(decodeURIComponent(errorParam))
    }
  }, [searchParams])

  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-24">
      <div className="bg-white shadow rounded-lg p-8 max-w-md w-full">
        <h1 className="text-2xl font-bold mb-6 text-center">Footy Tracker</h1>
        
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            <p>{error}</p>
          </div>
        )}
        
        <p className="mb-6 text-gray-600 text-center">
          Connect your fitness accounts to track your football performance
        </p>
        
        <div className="space-y-4">
          <div className="flex justify-center">
            <FitbitLogin />
          </div>
          
          <div className="flex items-center justify-center">
            <div className="border-b border-gray-300 w-full"></div>
            <span className="px-4 text-gray-500 text-sm">OR</span>
            <div className="border-b border-gray-300 w-full"></div>
          </div>
          
          <div className="flex justify-center">
            <StravaLogin />
          </div>
        </div>
      </div>
    </div>
  )
}
