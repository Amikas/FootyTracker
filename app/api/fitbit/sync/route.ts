import { syncFitbitForDate } from '@/lib/sync-fitbit'
import { NextResponse } from 'next/server'

export async function POST() {
  try {
    const today = new Date().toISOString().split('T')[0]
    const result = await syncFitbitForDate(today)

    return NextResponse.json(result)
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message || "Unknown error" }, { status: 500 })
  }
}
