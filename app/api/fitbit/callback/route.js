import { NextResponse } from 'next/server'
import { exchangeCodeForToken } from '@/app/actions/fitbit'

export async function GET(request) {
  const { searchParams } = new URL(request.url)
  const code = searchParams.get('code')
  const error = searchParams.get('error')
  
  if (error) {
    // Redirect to error page or handle error
    return NextResponse.redirect(new URL('/auth/error?error=' + error, request.url))
  }
  
  if (!code) {
    return NextResponse.redirect(new URL('/auth/error?error=missing_code', request.url))
  }
  
  // Exchange authorization code for access token
  const result = await exchangeCodeForToken(code)
  
  if (result.success) {
    // Redirect to dashboard or success page
    return NextResponse.redirect(new URL('/', request.url))
  } else {
    // Redirect to error page with error message
    return NextResponse.redirect(new URL(`/auth/error?error=${encodeURIComponent(result.error)}`, request.url))
  }
}