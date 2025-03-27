'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { getUserActivityData } from '@/app/actions/fitbit'
import { motion } from 'framer-motion'

interface Distance {
  distance: number
}

interface Summary {
  steps: number
  distances: Distance[]
  fairlyActiveMinutes: number
  veryActiveMinutes: number
}

interface Activity {
  name: string
  duration: number
  calories: number
}

interface ActivityData {
  summary: Summary
  activities: Activity[]
}

export default function ActivityDisplay() {
  const [activityData, setActivityData] = useState<ActivityData | null>(null)
  const [rawData, setRawData] = useState<any | null>(null)
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()

  const todayDate = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  })

  const fetchActivityData = async () => {
    setLoading(true)
    setError(null)

    try {
      const result = await getUserActivityData()

      if (result.success) {
        setActivityData(result.data)
        setRawData(result.data)
      } else {
        setError(result.error ?? null)
      }
    } catch (err) {
      setError('Failed to fetch activity data')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchActivityData()
  }, [])

  const handleReauthenticate = async () => {
    const response = await fetch('/api/fitbit/reauthenticate')
    if (response.ok) {
      window.location.href = response.url
    }
  }

  if (loading) return <div className="text-white text-lg">Loading activity data...</div>
  if (error) return <div className="text-red-500 font-semibold">Error: {error}</div>
  if (!activityData) return <div className="text-gray-500">No activity data available</div>

  return (
    <motion.div
      className="bg-gray-900 shadow-lg rounded-xl p-8 text-white"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">
          Today's Activity - <span className="text-gray-300">{todayDate}</span>
        </h2>

        <div className="flex gap-4">
          <button
            onClick={fetchActivityData}
            className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded transition flex items-center gap-2"
          >
            <svg
              className="w-4 h-4"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M4 12C4 7.58172 7.58172 4 12 4V4C16.4183 4 20 7.58172 20 12V12C20 16.4183 16.4183 20 12 20V20C7.58172 20 4 16.4183 4 12V12Z"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M9 12L11 14L15 10"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            Refresh Data
          </button>

          <button
            onClick={handleReauthenticate}
            className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700 transition"
          >
            Reauthenticate
          </button>
        </div>
      </div>

      <div className="mb-6 flex items-center gap-2">
        <span className="text-gray-400">Data Source:</span>
        <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-blue-500/20 text-blue-300">
          <svg
            className="w-5 h-5"
            viewBox="0 0 24 24"
            fill="currentColor"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M16.942 10.4a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3zM7.023 13.4a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3z" />
            <path d="M12.001 5.3a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3zM12.001 15.7a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3z" />
            <path d="M12 12a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3z" />
          </svg>
          Fitbit
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <motion.div
          className="bg-blue-500 p-6 rounded-xl shadow-md transition transform duration-200"
          whileHover={{ scale: 1.05 }}
        >
          <p className="text-sm text-gray-200">Steps</p>
          <p className="text-3xl font-bold">{activityData.summary.steps}</p>
        </motion.div>

        <motion.div
          className="bg-green-500 p-6 rounded-xl shadow-md transition transform duration-200"
          whileHover={{ scale: 1.05 }}
        >
          <p className="text-sm text-gray-200">Distance</p>
          <p className="text-3xl font-bold">{activityData.summary.distances[0].distance} km</p>
        </motion.div>

        <motion.div
          className="bg-yellow-500 p-6 rounded-xl shadow-md transition transform duration-200"
          whileHover={{ scale: 1.05 }}
        >
          <p className="text-sm text-gray-200">Active Minutes</p>
          <p className="text-3xl font-bold">
            {activityData.summary.fairlyActiveMinutes + activityData.summary.veryActiveMinutes}
          </p>
        </motion.div>
      </div>

      <div className="mt-8">
        <h3 className="text-lg font-semibold mb-4">Activity Details</h3>
        <table className="w-full border-collapse border border-gray-700 rounded-xl overflow-hidden">
          <thead className="bg-gray-800">
            <tr>
              <th className="text-left py-3 px-4 text-gray-200">Activity</th>
              <th className="text-left py-3 px-4 text-gray-200">Duration</th>
              <th className="text-left py-3 px-4 text-gray-200">Calories</th>
            </tr>
          </thead>
          <tbody>
            {activityData.activities.map((activity: Activity, index: number) => (
              <tr key={index} className="border-b border-gray-600 hover:bg-gray-800 transition">
                <td className="py-3 px-4">{activity.name}</td>
                <td className="py-3 px-4">{Math.floor(activity.duration / 60000)} min</td>
                <td className="py-3 px-4">{activity.calories}</td>
              </tr>
            ))}
            {activityData.activities.length === 0 && (
              <tr>
                <td colSpan={3} className="py-6 text-center text-gray-400">
                  No activities recorded today
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {process.env.NODE_ENV === 'development' && (
        <div className="mt-8 p-4 bg-gray-800 rounded-lg overflow-x-auto">
          <details>
            <summary className="cursor-pointer text-green-400 mb-2 text-lg font-semibold">
              Raw API Data
            </summary>
            <pre className="text-xs text-green-400 whitespace-pre-wrap">
              {JSON.stringify(rawData, null, 2)}
            </pre>
          </details>
        </div>
      )}
    </motion.div>
  )
}
