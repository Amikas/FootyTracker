"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Bell, Menu, User, LogOut, Activity, Smartphone, Settings, Download } from "lucide-react";
import ExportButton from "@/components/export-button";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from '@/components/ui/use-toast'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { useSession, signOut } from "next-auth/react"
import { useRouter } from "next/navigation"

interface NavLinkProps {
  href: string;
  children: React.ReactNode;
}

const NavLink = ({ href, children }: NavLinkProps) => (
  <Link
    href={href}
    className="px-3 py-2 rounded-md font-medium transition-colors hover:bg-accent hover:text-accent-foreground active:bg-accent/80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
    role="menuitem"
  >
    {children}
  </Link>
);

export default function DashboardHeader() {
  const { data: session, status } = useSession()
  const queryClient = useQueryClient()
  const router = useRouter()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const handleLogout = async () => {
    try {
      // Clear any cached data
      queryClient.clear()
      
      // Sign out from NextAuth
      await signOut({ 
        redirect: false,
        callbackUrl: '/login'
      })

      // Clear any app-specific state here if needed (for now, handled by NextAuth)
      
      // Redirect to login page
      router.push('/login')
      
      // Show success message
      toast({
        title: "Logged out successfully",
        duration: 2000
      })
    } catch (error) {
      console.error('Logout error:', error)
      toast({
        title: "Error logging out",
        description: "Please try again",
        variant: "destructive"
      })
    }
  }

  const handleConnectApp = (app: string) => {
    if (!session?.user?.id) {
      toast({
        title: "Authentication required",
        description: "Please log in to connect apps",
        variant: "destructive"
      })
      router.push('/login')
      return
    }
    router.push(`/connect-${app.toLowerCase()}`)
  }

  const handleExport = async () => {
    try {
      const response = await fetch('/api/export');
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to export data');
      }

      // Get the CSV content
      const csvContent = await response.text();

      // Create a blob and download link
      const blob = new Blob([csvContent], { type: 'text/csv' });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'training-data.csv';
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);

      toast({
        title: "Export successful",
        description: "Your training data has been downloaded as a CSV file.",
      });
    } catch (error) {
      console.error("Export failed:", error);
      toast({
        title: "Export failed",
        description: error instanceof Error ? error.message : "Failed to export data. Please try again.",
        variant: "destructive",
      });
    }
  };

  // Handle keyboard navigation for the mobile menu
  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'Escape') {
      setIsMobileMenuOpen(false)
    }
  }

  return (
    <>
      {/* Skip to main content link */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 bg-background px-4 py-2 z-50 rounded-md focus:outline-none focus:ring-2 focus:ring-ring"
      >
        Skip to main content
      </a>
      
      <header 
        className="sticky top-0 z-50 w-full bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b"
        role="banner"
      >
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-2">
              <Link
                href="/"
                className="text-xl font-bold hover:opacity-80 transition-opacity focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-md"
                aria-label="Footy Tracker Home"
              >
                Footy Tracker
              </Link>
              
              {/* Mobile menu button */}
              <Button
                variant="ghost"
                size="sm"
                className="md:hidden"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                aria-expanded={isMobileMenuOpen}
                aria-controls="mobile-menu"
                aria-label="Toggle navigation menu"
              >
                <Menu className="h-5 w-5" />
              </Button>
            </div>

            {/* Desktop Navigation */}
            <nav 
              className="hidden md:flex space-x-2" 
              role="navigation" 
              aria-label="Main navigation"
            >
              <NavLink href="/training">Training</NavLink>
              <NavLink href="/measurements">Measurements</NavLink>
              <NavLink href="/calendar">Calendar</NavLink>
            </nav>

            {/* Mobile Navigation */}
            <div
              id="mobile-menu"
              className={`absolute top-16 left-0 right-0 bg-background border-b md:hidden ${
                isMobileMenuOpen ? 'block' : 'hidden'
              }`}
              role="menu"
              aria-orientation="vertical"
              onKeyDown={handleKeyDown}
            >
              <div className="px-2 pt-2 pb-3 space-y-1">
                <NavLink href="/training">Training</NavLink>
                <NavLink href="/measurements">Measurements</NavLink>
                <NavLink href="/calendar">Calendar</NavLink>
              </div>
            </div>

            <div className="flex items-center space-x-2">
              {status === 'authenticated' ? (
                <>
                  {/* Connect Fitbit Only */}
                  <Button
                    variant="outline"
                    size="sm"
                    className="hidden md:inline-flex gap-2"
                    aria-label="Connect Fitbit"
                    onClick={() => handleConnectApp("fitbit")}
                  >
                    {/* Fitbit logo */}
                    <img src="/images/fitbit.png" alt="Fitbit Logo" className="h-4 w-4" />
                    Connect Fitbit
                  </Button>

                  <ThemeToggle />

                  {/* User Menu */}
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        className="hover:bg-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                        aria-label="User menu"
                      >
                        <User className="h-5 w-5" aria-hidden="true" />
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-56" align="end" forceMount>
                      <div className="space-y-1" role="menu">
                        <Button variant="ghost" className="w-full justify-start" asChild>
                          <Link 
                            href="/profile"
                            role="menuitem"
                            className="focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                          >
                            <User className="mr-2 h-4 w-4" aria-hidden="true" />
                            Profile
                          </Link>
                        </Button>
                        <Button 
                          variant="ghost" 
                          className="w-full justify-start focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                          onClick={handleExport}
                          role="menuitem"
                        >
                          <Download className="mr-2 h-4 w-4" aria-hidden="true" />
                          Export Data
                        </Button>
                        <Button 
                          variant="ghost" 
                          className="w-full justify-start focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring" 
                          onClick={handleLogout}
                          role="menuitem"
                        >
                          <LogOut className="mr-2 h-4 w-4" aria-hidden="true" />
                          Log out
                        </Button>
                      </div>
                    </PopoverContent>
                  </Popover>
                </>
              ) : (
                <>
                  <ThemeToggle />
                  <Link 
                    href="/login"
                    className="focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-md"
                  >
                    <Button variant="default" size="sm">
                      Log In
                    </Button>
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </header>
    </>
  );
}