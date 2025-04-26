"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Bell, Menu, User, LogOut, Activity, Smartphone, Settings } from "lucide-react";
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

interface NavLinkProps {
  href: string;
  children: React.ReactNode;
}

const NavLink = ({ href, children }: NavLinkProps) => (
  <Link
    href={href}
    className="px-3 py-2 rounded-md font-medium transition-colors hover:bg-accent hover:text-accent-foreground active:bg-accent/80"
  >
    {children}
  </Link>
);

export default function DashboardHeader() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [initialized, setInitialized] = useState(false);
  const queryClient = useQueryClient()

  useEffect(() => {
    if (!initialized && typeof window !== "undefined") {
      const userId = localStorage.getItem("userId");
      setIsLoggedIn(!!userId);
      setInitialized(true);
    }
  }, [initialized]);

  const handleLogout = () => {
    localStorage.removeItem("userId");
    window.location.href = "/";
  };

  const handleConnectApp = (app: string) => {
    window.location.href = `/connect-${app.toLowerCase()}`;
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-2">
            <Link
              href="/"
              className="text-xl font-bold hover:opacity-80 transition-opacity"
            >
              Footy Tracker
            </Link>
          </div>

          <nav className="hidden md:flex space-x-2">
            <NavLink href="/">Dashboard</NavLink>
            <NavLink href="/training">Training</NavLink>
            <NavLink href="/stats">Stats</NavLink>
            <NavLink href="/goals">Goals</NavLink>
            <NavLink href="/calendar">Calendar</NavLink>
          </nav>

          <div className="flex items-center space-x-2">
            {isLoggedIn ? (
              <>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="outline"
                      size="sm"
                      className="hidden md:inline-flex gap-2"
                    >
                      <Smartphone className="h-4 w-4" />
                      Connect Apps
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-48">
                    <DropdownMenuItem
                      onClick={() => handleConnectApp("fitbit")}
                      className="gap-2"
                    >
                      <Activity className="h-4 w-4" />
                      Connect Fitbit
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() => handleConnectApp("strava")}
                      className="gap-2"
                    >
                      <Activity className="h-4 w-4" />
                      Connect Strava
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() => handleConnectApp("nike")}
                      className="gap-2"
                    >
                      <Activity className="h-4 w-4" />
                      Connect Nike
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>

                <ThemeToggle />

                {/* User Menu */}
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="ghost" size="icon" className="hover:bg-accent">
                      <User className="h-5 w-5" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-56" align="end" forceMount>
                    <div className="space-y-1">
                      <Button variant="ghost" className="w-full justify-start" asChild>
                        <a href="/profile">
                          <User className="mr-2 h-4 w-4" />
                          Profile
                        </a>
                      </Button>
                      <Button variant="ghost" className="w-full justify-start" asChild>
                        <a href="/settings">
                          <Settings className="mr-2 h-4 w-4" />
                          Settings
                        </a>
                      </Button>
                      <Button variant="ghost" className="w-full justify-start" onClick={handleLogout}>
                        <LogOut className="mr-2 h-4 w-4" />
                        Log out
                      </Button>
                    </div>
                  </PopoverContent>
                </Popover>
              </>
            ) : (
              <>
                <ThemeToggle />
                <Link href="/login">
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
  );
}
