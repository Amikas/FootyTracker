"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { Bell, Menu, User } from "lucide-react"
import { Button } from "@/components/ui/button"
import ExportButton from "@/components/export-button"

export default function DashboardHeader() {
  // Use a ref to prevent re-fetching on every render
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [initialized, setInitialized] = useState(false)

  // Only check login state once when component mounts
  useEffect(() => {
    if (!initialized && typeof window !== 'undefined') {
      const userId = localStorage.getItem("userId")
      setIsLoggedIn(!!userId)
      setInitialized(true)
    }
  }, [initialized])

  const handleLogout = () => {
    localStorage.removeItem("userId")
    window.location.href = "/"
  }

  return (
    <header className="bg-gray-900 text-white">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="text-xl font-bold">Footy Tracker</Link>
          </div>

          <nav className="hidden md:flex space-x-4">
            <Link href="/" className="px-3 py-2 rounded-md font-medium hover:bg-gray-800">Dashboard</Link>
            <Link href="/training" className="px-3 py-2 rounded-md font-medium hover:bg-gray-800">Training</Link>
            <Link href="/stats" className="px-3 py-2 rounded-md font-medium hover:bg-gray-800">Stats</Link>
            <Link href="/goals" className="px-3 py-2 rounded-md font-medium hover:bg-gray-800">Goals</Link>
          </nav>

          <div className="flex items-center space-x-2">
            {/* Export Button */}
            {isLoggedIn && <ExportButton />}

            {/* Simple buttons instead of dropdowns */}
            <Link href="/connect-fitbit">
              <Button variant="outline" size="sm" className="hidden md:inline-flex">
                Connect Fitbit
              </Button>
            </Link>

            <Link href="/profile">
              <Button variant="ghost" size="icon">
                <User className="h-5 w-5" />
              </Button>
            </Link>

            {isLoggedIn && (
              <Button onClick={handleLogout} variant="ghost" size="sm">
                Logout
              </Button>
            )}
          </div>
        </div>
      </div>
    </header>
  )
}