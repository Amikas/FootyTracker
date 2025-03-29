'use client'

import { useState } from 'react'
import { getFitbitAuthUrl } from '@/app/actions/fitbit'

export default function FitbitLogin() {
  const [loading, setLoading] = useState(false)

  const handleFitbitLogin = async () => {
    setLoading(true)
    try {
      const authUrl = await getFitbitAuthUrl()
      window.location.href = authUrl
    } catch (error) {
      console.error('Failed to get auth URL:', error)
      setLoading(false)
    }
  }

  const handleReauth = () => {
    window.location.href = '/api/fitbit/reauthenticate'
  }

  return (
    <div className="flex flex-col items-center space-y-4">
      <button
        onClick={handleFitbitLogin}
        disabled={loading}
        className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
      >
        {loading ? 'Connecting...' : 'Connect with Fitbit'}
      </button>

      <button
        onClick={handleReauth}
        className="text-sm text-gray-500 underline hover:text-gray-700"
      >
        Reauthenticate Fitbit
      </button>
    </div>
  )
}
