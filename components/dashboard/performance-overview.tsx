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
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogClose } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useState } from 'react'

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

  const [modalOpen, setModalOpen] = useState(false)
  const [form, setForm] = useState({
    id: '',
    date: '',
    distance: '',
    duration: '',
    heartRate: '',
    isEdit: false,
  })
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState('')

  // Handler for opening modal for new entry
  function openNewEntry() {
    setForm({ id: '', date: '', distance: '', duration: '', heartRate: '', isEdit: false })
    setModalOpen(true)
  }

  // Handler for submitting manual entry
  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setSubmitting(true)
    setError('')
    try {
      const method = form.isEdit ? 'PUT' : 'POST'
      const res = await fetch('/api/fitbit/manual', {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id: form.id,
          date: form.date,
          distance: parseFloat(form.distance),
          duration: parseInt(form.duration),
          heartRate: form.heartRate ? parseInt(form.heartRate) : undefined,
        }),
      })
      if (!res.ok) throw new Error('Failed to save entry')
      setModalOpen(false)
      // Optionally: refetch chart data here
    } catch (err: any) {
      setError(err.message)
    } finally {
      setSubmitting(false)
    }
  }

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
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>Performance Overview</CardTitle>
          <CardDescription>Track your training progress over time</CardDescription>
        </div>
        <Dialog open={modalOpen} onOpenChange={setModalOpen}>
          <DialogTrigger asChild>
            <Button variant="outline" size="sm" onClick={openNewEntry}>
              + Add Manual Entry
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{form.isEdit ? 'Edit Manual Entry' : 'Add Manual Entry'}</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm mb-1">Date</label>
                <Input type="date" value={form.date} onChange={e => setForm(f => ({ ...f, date: e.target.value }))} required />
              </div>
              <div>
                <label className="block text-sm mb-1">Distance (km)</label>
                <Input type="number" step="0.01" value={form.distance} onChange={e => setForm(f => ({ ...f, distance: e.target.value }))} required />
              </div>
              <div>
                <label className="block text-sm mb-1">Duration (ms)</label>
                <Input type="number" step="1" value={form.duration} onChange={e => setForm(f => ({ ...f, duration: e.target.value }))} required />
              </div>
              <div>
                <label className="block text-sm mb-1">Heart Rate (bpm)</label>
                <Input type="number" step="1" value={form.heartRate} onChange={e => setForm(f => ({ ...f, heartRate: e.target.value }))} />
              </div>
              {error && <div className="text-red-500 text-sm">{error}</div>}
              <div className="flex gap-2 justify-end">
                <Button type="button" variant="ghost" onClick={() => setModalOpen(false)}>Cancel</Button>
                <Button type="submit" disabled={submitting}>{submitting ? 'Saving...' : (form.isEdit ? 'Save Changes' : 'Add Entry')}</Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
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
