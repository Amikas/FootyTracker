'use client'

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
import { useQuery } from '@tanstack/react-query'
import { BounceLoader } from 'react-spinners'

interface ChartEntry {
  day: string
  distance: number
  speed: number
  heartRate: number
}

export default function PerformanceOverview() {
  const { data = [], isLoading } = useQuery({
    queryKey: ['chartData'],
    queryFn: async () => {
      const response = await fetch('/api/fitbit/chart')
      if (!response.ok) {
        throw new Error('Failed to fetch chart data')
      }
      return response.json()
    },
    staleTime: 10 * 60 * 1000, // Consider data fresh for 10 minutes
  })

  if (isLoading) {
    return (
      <Card className="col-span-3 md:col-span-2">
        <CardContent className="flex flex-col items-center justify-center min-h-[400px]">
          <BounceLoader color="#3B82F6" size={120} className="mb-8" />
          <p className="mt-4 text-sm italic animate-pulse text-blue-500">Loading chart data...</p>
        </CardContent>
      </Card>
    )
  }

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
              <Line dataKey="distance" stroke="#facc15" strokeWidth={2} dot={{ r: 4 }} activeDot={{ r: 6 }} />
            </ChartContainer>
          </TabsContent>

          <TabsContent value="speed">
            <ChartContainer>
              <Line dataKey="speed" stroke="#22c55e" strokeWidth={2} dot={{ r: 4 }} activeDot={{ r: 6 }} />
            </ChartContainer>
          </TabsContent>

          <TabsContent value="heartRate">
            <ChartContainer>
              <Line dataKey="heartRate" stroke="#dc2626" strokeWidth={2} dot={{ r: 4 }} activeDot={{ r: 6 }} />
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
