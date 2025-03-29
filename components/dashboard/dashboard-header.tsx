"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { Bell, Menu, User } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
// import { toast } from "@/components/ui/use-toast" // Optional

export default function DashboardHeader() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  useEffect(() => {
    const loggedIn = localStorage.getItem("userId")
    setIsLoggedIn(!!loggedIn)
  }, [])

  const handleLogout = () => {
    localStorage.removeItem("userId")
    setIsLoggedIn(false)
    // toast({ title: "Logged out successfully" }) // Optional
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
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="hidden md:inline-flex">Connect Apps</Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>Available Integrations</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link href="/connect-fitbit" className="flex items-center space-x-2">
                    <img src="/images/fitbit.png" alt="Fitbit" className="h-5 w-5 object-contain" />
                    <span>Fitbit</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/connect-strava" className="flex items-center space-x-2">
                    <img src="/images/strava.png" alt="Strava" className="h-5 w-5 object-contain" />
                    <span>Strava</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/connect-nike" className="flex items-center space-x-2">
                    <img src="/images/nike.png" alt="Nike" className="h-5 w-5 object-contain" />
                    <span>Nike</span>
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <Button variant="ghost" size="icon">
              <Bell className="h-5 w-5" />
            </Button>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon">
                  <User className="h-5 w-5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link href="/profile">Profile</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/settings">Settings</Link>
                </DropdownMenuItem>
                {isLoggedIn && (
                  <DropdownMenuItem onClick={handleLogout}>
                    Logout
                  </DropdownMenuItem>
                )}
              </DropdownMenuContent>
            </DropdownMenu>

            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              <Menu className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
    </header>
  )
}
