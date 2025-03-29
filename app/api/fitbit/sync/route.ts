import { syncFitbitData } from '@/lib/sync-fitbit'
import { NextResponse } from 'next/server'

export async function POST() {
  try {
    const result = await syncFitbitData()
    return NextResponse.json(result)
  } catch (error) {
    console.error(error)
    return NextResponse.json({ success: false, error: 'Sync failed' })
  }
}
