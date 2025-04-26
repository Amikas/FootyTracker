import { NextResponse } from "next/server"

// Sample data that matches the Activity interface
const recentActivities = [
  {
    id: 1,
    type: "Morning Run",
    date: "Apr 25, 2025",
    time: "06:30 AM",
    location: "Central Park",
    metrics: {
      distance: "5.2 km",
      duration: "28 min",
      intensity: "High" as const,
    },
  },
  {
    id: 2,
    type: "Strength Training",
    date: "Apr 24, 2025",
    time: "05:45 PM",
    location: "Home Gym",
    metrics: {
      distance: "N/A",
      duration: "45 min",
      intensity: "Medium" as const,
    },
  },
  {
    id: 3,
    type: "Yoga Session",
    date: "Apr 23, 2025",
    time: "07:15 AM",
    location: "Yoga Studio",
    metrics: {
      distance: "N/A",
      duration: "60 min",
      intensity: "Low" as const,
    },
  },
  {
    id: 4,
    type: "Cycling",
    date: "Apr 22, 2025",
    time: "04:30 PM",
    location: "Riverside Trail",
    metrics: {
      distance: "18.5 km",
      duration: "52 min",
      intensity: "Medium" as const,
    },
  },
  {
    id: 5,
    type: "HIIT Workout",
    date: "Apr 21, 2025",
    time: "06:00 PM",
    location: "Fitness Center",
    metrics: {
      distance: "N/A",
      duration: "30 min",
      intensity: "High" as const,
    },
  },
]

export async function GET() {
  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 500))

  return NextResponse.json(recentActivities)
}
