/**"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

// Sample data - in a real app, this would come from your API
const weeklyData = [
  { day: "Mon", distance: 5.2, speed: 12, heartRate: 142 },
  { day: "Tue", distance: 0, speed: 0, heartRate: 0 },
  { day: "Wed", distance: 6.8, speed: 14, heartRate: 156 },
  { day: "Thu", distance: 4.5, speed: 11, heartRate: 138 },
  { day: "Fri", distance: 0, speed: 0, heartRate: 0 },
  { day: "Sat", distance: 8.2, speed: 15, heartRate: 162 },
  { day: "Sun", distance: 3.1, speed: 10, heartRate: 130 },
];

export default function PerformanceOverview() {
  return (
    <Card className="col-span-3 md:col-span-2">
      <CardHeader>
        <CardTitle>Performance Overview</CardTitle>
        <CardDescription>Track your training progress over time</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="distance">
          <TabsList className="mb-4">
            <TabsTrigger value="distance">Distance</TabsTrigger>
            <TabsTrigger value="speed">Speed</TabsTrigger>
            <TabsTrigger value="heartRate">Heart Rate</TabsTrigger>
          </TabsList>

          <TabsContent value="distance">
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={weeklyData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="day" />
                  <YAxis unit="km" />
                  <Tooltip />
                  <Line type="monotone" dataKey="distance" stroke="#facc15" strokeWidth={2} dot={{ r: 4 }} activeDot={{ r: 6 }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </TabsContent>

          <TabsContent value="speed">
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={weeklyData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="day" />
                  <YAxis unit="km/h" />
                  <Tooltip />
                  <Line type="monotone" dataKey="speed" stroke="#22c55e" strokeWidth={2} dot={{ r: 4 }} activeDot={{ r: 6 }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </TabsContent>

          <TabsContent value="heartRate">
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={weeklyData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="day" />
                  <YAxis unit="bpm" />
                  <Tooltip />
                  <Line type="monotone" dataKey="heartRate" stroke="#dc2626" strokeWidth={2} dot={{ r: 4 }} activeDot={{ r: 6 }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
**/

'use client'

import { useEffect, useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts'

interface ChartEntry {
  day: string
  distance: number
  speed: number
  heartRate: number
}

export default function PerformanceOverview() {
  const [data, setData] = useState<ChartEntry[]>([])

  useEffect(() => {
    fetch('/api/fitbit/chart')
      .then(res => res.json())
      .then(setData)
      .catch(err => {
        console.error('Failed to fetch chart data:', err)
      })
  }, [])

  return (
    <Card className="col-span-3 md:col-span-2">
      <CardHeader>
        <CardTitle>Performance Overview</CardTitle>
        <CardDescription>Track your training progress over time</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="distance">
          <TabsList className="mb-4">
            <TabsTrigger value="distance">Distance</TabsTrigger>
            <TabsTrigger value="speed">Speed</TabsTrigger>
            <TabsTrigger value="heartRate">Heart Rate</TabsTrigger>
          </TabsList>

          <TabsContent value="distance">
            <ChartContainer>
              <Line dataKey="distance" stroke="#facc15" />
            </ChartContainer>
          </TabsContent>

          <TabsContent value="speed">
            <ChartContainer>
              <Line dataKey="speed" stroke="#22c55e" />
            </ChartContainer>
          </TabsContent>

          <TabsContent value="heartRate">
            <ChartContainer>
              <Line dataKey="heartRate" stroke="#dc2626" />
            </ChartContainer>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )

  function ChartContainer({ children }: { children: React.ReactNode }) {
    return (
      <div className="h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="day" />
            <YAxis />
            <Tooltip />
            {children}
          </LineChart>
        </ResponsiveContainer>
      </div>
    )
  }
}
