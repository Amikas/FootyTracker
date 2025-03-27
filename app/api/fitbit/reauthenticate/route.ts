import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { getFitbitAuthUrl } from '@/app/actions/fitbit'

export async function GET(): Promise<Response> {
  const cookieStore = await cookies()

  cookieStore.set('fitbit_access_token', '', { maxAge: -1 })
  cookieStore.set('fitbit_refresh_token', '', { maxAge: -1 })

  const authUrl = await getFitbitAuthUrl()

  return NextResponse.redirect(authUrl)
}
