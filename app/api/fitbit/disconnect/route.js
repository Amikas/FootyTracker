import { NextResponse } from 'next/server'
import { disconnectFitbit } from '@/app/actions/fitbit'

export async function POST() {
  await disconnectFitbit()
  return NextResponse.json({ success: true })
}
