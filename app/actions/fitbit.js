'use server'

import { cookies } from 'next/headers'
import axios from 'axios'

// Generate auth URL for Fitbit OAuth
export async function getFitbitAuthUrl() {
  const clientId = process.env.FITBIT_CLIENT_ID
  const redirectUri = process.env.FITBIT_REDIRECT_URI
  
  const scope = 'activity heartrate location profile'
  const responseType = 'code'
  
  const authUrl = `https://www.fitbit.com/oauth2/authorize?client_id=${clientId}&response_type=${responseType}&scope=${scope}&redirect_uri=${encodeURIComponent(redirectUri)}`
  
  return authUrl
}

// Exchange auth code for access token
export async function exchangeCodeForToken(code) {
  try {
    const clientId = process.env.FITBIT_CLIENT_ID
    const clientSecret = process.env.FITBIT_CLIENT_SECRET
    const redirectUri = process.env.FITBIT_REDIRECT_URI
    
    const basicAuth = Buffer.from(`${clientId}:${clientSecret}`).toString('base64')
    
    const response = await axios({
      method: 'post',
      url: 'https://api.fitbit.com/oauth2/token',
      headers: {
        'Authorization': `Basic ${basicAuth}`,
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      data: new URLSearchParams({
        code,
        grant_type: 'authorization_code',
        redirect_uri: redirectUri
      }).toString()
    })
    
    // Store tokens in cookies (in production use a more secure method)
    const cookieStore = cookies()
    cookieStore.set('fitbit_access_token', response.data.access_token, { 
      secure: process.env.NODE_ENV === 'production',
      httpOnly: true,
      maxAge: response.data.expires_in
    })
    cookieStore.set('fitbit_refresh_token', response.data.refresh_token, {
      secure: process.env.NODE_ENV === 'production',
      httpOnly: true,
      maxAge: 60 * 60 * 24 * 30 // 30 days
    })
    
    return { success: true }
  } catch (error) {
    console.error('Error exchanging code for token:', error.response?.data || error.message)
    return { 
      success: false, 
      error: error.response?.data?.errors?.[0]?.message || 'Failed to authenticate with Fitbit'
    }
  }
}

// Get user activity data
export async function getUserActivityData(date) {
  try {
    const cookieStore = cookies()
    const accessToken = cookieStore.get('fitbit_access_token')?.value

    if (!accessToken) {
      return { success: false, error: 'Not authenticated with Fitbit' }
    }

    // If no date is provided, use today's date in YYYY-MM-DD format
    if (!date) {
      const today = new Date().toISOString().split('T')[0] // 'YYYY-MM-DD'
      date = today
    }

    const response = await axios({
      method: 'get',
      url: `https://api.fitbit.com/1/user/-/activities/date/${date}.json`,
      headers: {
        'Authorization': `Bearer ${accessToken}`
      }
    })

    return {
      success: true,
      data: response.data
    }
  } catch (error) {
    if (error.response?.status === 401) {
      // Token expired, try to refresh
      const refreshed = await refreshAccessToken()
      if (refreshed.success) {
        // Try again with new token
        return getUserActivityData(date)
      }
    }

    console.error('Error fetching activity data:', error.response?.data || error.message)
    return {
      success: false,
      error: error.response?.data?.errors?.[0]?.message || 'Failed to fetch activity data'
    }
  }
}

// Function to disconnect Fitbit by removing stored tokens
export async function disconnectFitbit() {
  const cookieStore = cookies()

  // Remove Fitbit authentication tokens
  cookieStore.delete('fitbit_access_token')
  cookieStore.delete('fitbit_refresh_token')

  return { success: true }
}

// Refresh access token
async function refreshAccessToken() {
  try {
    const cookieStore = cookies()
    const refreshToken = cookieStore.get('fitbit_refresh_token')?.value
    
    if (!refreshToken) {
      return { success: false, error: 'No refresh token available' }
    }
    
    const clientId = process.env.FITBIT_CLIENT_ID
    const clientSecret = process.env.FITBIT_CLIENT_SECRET
    const basicAuth = Buffer.from(`${clientId}:${clientSecret}`).toString('base64')
    
    const response = await axios({
      method: 'post',
      url: 'https://api.fitbit.com/oauth2/token',
      headers: {
        'Authorization': `Basic ${basicAuth}`,
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      data: new URLSearchParams({
        grant_type: 'refresh_token',
        refresh_token: refreshToken
      }).toString()
    })
    
    // Update tokens in cookies
    cookieStore.set('fitbit_access_token', response.data.access_token, { 
      secure: process.env.NODE_ENV === 'production',
      httpOnly: true,
      maxAge: response.data.expires_in
    })
    
    if (response.data.refresh_token) {
      cookieStore.set('fitbit_refresh_token', response.data.refresh_token, {
        secure: process.env.NODE_ENV === 'production',
        httpOnly: true,
        maxAge: 60 * 60 * 24 * 30 // 30 days
      })
    }
    
    return { success: true }
  } catch (error) {
    console.error('Error refreshing token:', error.response?.data || error.message)
    return { 
      success: false, 
      error: error.response?.data?.errors?.[0]?.message || 'Failed to refresh token'
    }
  }
}