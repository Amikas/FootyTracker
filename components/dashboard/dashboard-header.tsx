"use client"

import { Bell, Menu, User } from "lucide-react"
import Link from "next/link"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export default function DashboardHeader() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  return (
    <header className="bg-primary text-primary-foreground">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="flex items-center">
              <span className="text-xl font-bold">Footy Tracker</span>
            </Link>
          </div>

          <nav className="hidden md:flex space-x-4">
            <Link href="/dashboard" className="px-3 py-2 rounded-md font-medium hover:bg-primary-foreground/10">
              Dashboard
            </Link>
            <Link href="/training" className="px-3 py-2 rounded-md font-medium hover:bg-primary-foreground/10">
              Training
            </Link>
            <Link href="/stats" className="px-3 py-2 rounded-md font-medium hover:bg-primary-foreground/10">
              Stats
            </Link>
            <Link href="/goals" className="px-3 py-2 rounded-md font-medium hover:bg-primary-foreground/10">
              Goals
            </Link>
          </nav>

          <div className="flex items-center space-x-2">
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
                <DropdownMenuItem>Profile</DropdownMenuItem>
                <DropdownMenuItem>Settings</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Logout</DropdownMenuItem>
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

        {isMobileMenuOpen && (
          <div className="md:hidden py-2">
            <div className="flex flex-col space-y-2 pb-3">
              <Link
                href="/dashboard"
                className="px-3 py-2 rounded-md font-medium hover:bg-primary-foreground/10"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Dashboard
              </Link>
              <Link
                href="/training"
                className="px-3 py-2 rounded-md font-medium hover:bg-primary-foreground/10"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Training
              </Link>
              <Link
                href="/stats"
                className="px-3 py-2 rounded-md font-medium hover:bg-primary-foreground/10"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Stats
              </Link>
              <Link
                href="/goals"
                className="px-3 py-2 rounded-md font-medium hover:bg-primary-foreground/10"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Goals
              </Link>
            </div>
          </div>
        )}
      </div>
    </header>
  )
}

