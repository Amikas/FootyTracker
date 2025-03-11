import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { getFitbitAuthUrl } from '@/app/actions/fitbit'

export async function GET() {
  const cookieStore = cookies()

  // Clear Fitbit authentication cookies
  cookieStore.set('fitbit_access_token', '', { maxAge: -1 })
  cookieStore.set('fitbit_refresh_token', '', { maxAge: -1 })

  // Get a fresh Fitbit login URL
  const authUrl = await getFitbitAuthUrl()

  // Redirect user to the Fitbit login page
  return NextResponse.redirect(authUrl)
}
