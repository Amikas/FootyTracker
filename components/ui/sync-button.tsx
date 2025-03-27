"use client"

import { useState } from "react"

export default function SyncFitbitButton() {
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState("")

  const handleSync = async () => {
    setLoading(true)
    setMessage("")

    const res = await fetch("/api/fitbit/sync", {
      method: "POST",
    })

    const result = await res.json()
    setLoading(false)

    if (result.success) {
      setMessage("✅ Synced successfully!")
    } else {
      setMessage("❌ Sync failed: " + result.error)
    }
  }

  return (
    <div className="my-6">
      <button
        onClick={handleSync}
        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
        disabled={loading}
      >
        {loading ? "Syncing..." : "Sync Today’s Fitbit Data"}
      </button>
      {message && <p className="mt-2 text-sm text-white">{message}</p>}
    </div>
  )
}
