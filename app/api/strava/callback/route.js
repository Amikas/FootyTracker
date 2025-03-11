import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { exchangeStravaCode } from '@/app/actions/strava';

export async function GET(request) {
  // Extract the authorization code and state from the URL
  const searchParams = request.nextUrl.searchParams;
  const code = searchParams.get('code');
  const state = searchParams.get('state');
  const error = searchParams.get('error');
  
  // Check for errors from Strava
  if (error) {
    console.error('Strava authorization error:', error);
    return NextResponse.redirect(new URL('/login?error=strava_auth_failed', request.url));
  }
  
  // Validate the required parameters
  if (!code) {
    console.error('Missing authorization code');
    return NextResponse.redirect(new URL('/login?error=missing_code', request.url));
  }
  
  // Verify state parameter to prevent CSRF attacks
  const storedState = cookies().get('strava_auth_state')?.value;
  if (state && storedState && state !== storedState) {
    console.error('State mismatch - possible CSRF attack');
    return NextResponse.redirect(new URL('/login?error=invalid_state', request.url));
  }
  
  try {
    // Exchange the authorization code for tokens
    const result = await exchangeStravaCode(code);
    
    if (!result.success) {
      console.error('Token exchange failed:', result.error);
      return NextResponse.redirect(new URL(`/login?error=${encodeURIComponent(result.error)}`, request.url));
    }
    
    // Clean up the state cookie
    cookies().delete('strava_auth_state');
    
    // Redirect to the dashboard
    return NextResponse.redirect(new URL('/dashboard', request.url));
  } catch (error) {
    console.error('Error in Strava callback:', error);
    return NextResponse.redirect(new URL(`/login?error=${encodeURIComponent(error.message)}`, request.url));
  }
}