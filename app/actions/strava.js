'use server'

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

// Constants for Strava API
const STRAVA_AUTH_URL = 'https://www.strava.com/oauth/authorize';
const STRAVA_TOKEN_URL = 'https://www.strava.com/oauth/token';
const STRAVA_API_BASE = 'https://www.strava.com/api/v3';

/**
 * Generate the Strava authorization URL
 * @returns {string} - The Strava authorization URL
 */
export async function getStravaAuthUrl() {
  const clientId = process.env.STRAVA_CLIENT_ID;
  const redirectUri = process.env.STRAVA_CALLBACK_URL;
  
  // Check if environment variables are set
  if (!clientId || !redirectUri) {
    throw new Error('Strava configuration is missing');
  }
  
  // Define the required scopes for your app
  // Scopes: read_all (view private activities), activity:read_all (view detailed activity information)
  const scope = 'read_all,activity:read_all';
  
  // Generate state parameter for security (optional but recommended)
  const state = Math.random().toString(36).substring(2, 15);
  
  // Store state in cookies for validation during callback
  cookies().set('strava_auth_state', state, { 
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    maxAge: 3600,
    path: '/'
  });
  
  // Construct the authorization URL
  const authUrl = `${STRAVA_AUTH_URL}?client_id=${clientId}&redirect_uri=${encodeURIComponent(redirectUri)}&response_type=code&scope=${scope}&state=${state}`;
  
  return authUrl;
}

/**
 * Exchange authorization code for access token
 * @param {string} code - The authorization code
 * @returns {object} - The token response
 */
export async function exchangeStravaCode(code) {
  try {
    const clientId = process.env.STRAVA_CLIENT_ID;
    const clientSecret = process.env.STRAVA_CLIENT_SECRET;
    
    if (!clientId || !clientSecret) {
      throw new Error('Strava configuration is missing');
    }
    
    // Exchange code for tokens
    const response = await fetch(STRAVA_TOKEN_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        client_id: clientId,
        client_secret: clientSecret,
        code: code,
        grant_type: 'authorization_code'
      }),
    });
    
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(`Failed to exchange token: ${errorData.message || response.statusText}`);
    }
    
    const tokenData = await response.json();
    
    // Store tokens in cookies or your secure storage method
    cookies().set('strava_access_token', tokenData.access_token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: tokenData.expires_in,
      path: '/'
    });
    
    cookies().set('strava_refresh_token', tokenData.refresh_token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 60 * 60 * 24 * 30, // 30 days
      path: '/'
    });
    
    cookies().set('strava_token_expires_at', tokenData.expires_at.toString(), {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 60 * 60 * 24 * 30, // 30 days
      path: '/'
    });
    
    return { success: true, data: tokenData };
  } catch (error) {
    console.error('Error exchanging Strava code:', error);
    return { success: false, error: error.message };
  }
}

/**
 * Refresh the Strava access token if expired
 * @returns {object} - Result of the refresh operation
 */
async function refreshStravaToken() {
  try {
    const refreshToken = cookies().get('strava_refresh_token')?.value;
    const clientId = process.env.STRAVA_CLIENT_ID;
    const clientSecret = process.env.STRAVA_CLIENT_SECRET;
    
    if (!refreshToken || !clientId || !clientSecret) {
      return { success: false, error: 'Missing refresh token or client credentials' };
    }
    
    const response = await fetch(STRAVA_TOKEN_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        client_id: clientId,
        client_secret: clientSecret,
        refresh_token: refreshToken,
        grant_type: 'refresh_token'
      }),
    });
    
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(`Failed to refresh token: ${errorData.message || response.statusText}`);
    }
    
    const tokenData = await response.json();
    
    // Update stored tokens
    cookies().set('strava_access_token', tokenData.access_token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: tokenData.expires_in,
      path: '/'
    });
    
    cookies().set('strava_refresh_token', tokenData.refresh_token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 60 * 60 * 24 * 30, // 30 days
      path: '/'
    });
    
    cookies().set('strava_token_expires_at', tokenData.expires_at.toString(), {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 60 * 60 * 24 * 30, // 30 days
      path: '/'
    });
    
    return { success: true, accessToken: tokenData.access_token };
  } catch (error) {
    console.error('Error refreshing Strava token:', error);
    return { success: false, error: error.message };
  }
}

/**
 * Get the current valid Strava access token, refreshing if necessary
 * @returns {string|null} - The access token or null if unavailable
 */
async function getValidStravaToken() {
  // Check if token exists and is not expired
  const accessToken = cookies().get('strava_access_token')?.value;
  const expiresAt = cookies().get('strava_token_expires_at')?.value;
  
  if (!accessToken || !expiresAt) {
    return null;
  }
  
  // Check if token is expired (with a 5-minute buffer)
  const currentTime = Math.floor(Date.now() / 1000);
  if (parseInt(expiresAt) - currentTime < 300) {
    // Token is about to expire, refresh it
    const refreshResult = await refreshStravaToken();
    if (refreshResult.success) {
      return refreshResult.accessToken;
    }
    return null;
  }
  
  // Token is still valid
  return accessToken;
}

/**
 * Get user's Strava activity data
 * @returns {object} - User's activity data or error
 */
export async function getUserStravaData() {
  try {
    const accessToken = await getValidStravaToken();
    
    if (!accessToken) {
      return { 
        success: false, 
        error: 'Not authenticated with Strava' 
      };
    }
    
    // Get athlete activities (last 30 days)
    const now = new Date();
    const thirtyDaysAgo = new Date(now.getTime() - (30 * 24 * 60 * 60 * 1000));
    const afterTimestamp = Math.floor(thirtyDaysAgo.getTime() / 1000);
    
    const activitiesResponse = await fetch(
      `${STRAVA_API_BASE}/athlete/activities?after=${afterTimestamp}&per_page=30`,
      {
        headers: {
          'Authorization': `Bearer ${accessToken}`
        }
      }
    );
    
    if (!activitiesResponse.ok) {
      throw new Error(`Failed to fetch activities: ${activitiesResponse.statusText}`);
    }
    
    const activitiesData = await activitiesResponse.json();
    
    // Get today's activities
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const todayTimestamp = Math.floor(today.getTime() / 1000);
    
    const todayActivities = activitiesData.filter(activity => {
      const activityDate = new Date(activity.start_date);
      return activityDate >= today;
    });
    
    // Calculate summary statistics for today
    const summary = calculateActivitySummary(todayActivities);
    
    // Format activities for display
    const formattedActivities = todayActivities.map(activity => ({
      name: activity.name,
      duration: activity.elapsed_time * 1000, // Convert to milliseconds to match Fitbit format
      calories: activity.calories || 0
    }));
    
    // Return in a format compatible with the existing ActivityDisplay component
    return {
      success: true,
      data: {
        summary: {
          steps: summary.steps,
          distances: [{ distance: summary.totalDistance }],
          fairlyActiveMinutes: Math.floor(summary.totalActiveTime / 2),
          veryActiveMinutes: Math.ceil(summary.totalActiveTime / 2)
        },
        activities: formattedActivities,
        rawStravaData: activitiesData // Include the raw data for debugging
      }
    };
  } catch (error) {
    console.error('Error fetching Strava data:', error);
    return { success: false, error: error.message };
  }
}

/**
 * Calculate summary statistics from activities
 * @param {Array} activities - List of Strava activities
 * @returns {object} - Summary statistics
 */
function calculateActivitySummary(activities) {
  // Default values
  const summary = {
    steps: 0,
    totalDistance: 0,
    totalActiveTime: 0
  };
  
  if (!activities || activities.length === 0) {
    return summary;
  }
  
  activities.forEach(activity => {
    // Add distance (convert from meters to kilometers)
    summary.totalDistance += activity.distance / 1000;
    
    // Add moving time (in minutes)
    summary.totalActiveTime += activity.moving_time / 60;
    
    // Estimate steps based on activity type and distance
    // This is a rough approximation - Strava doesn't always provide step counts
    if (activity.type === 'Run' || activity.type === 'Walk') {
      // Rough estimate: ~1300 steps per km for running, ~1500 for walking
      const stepsPerKm = activity.type === 'Run' ? 1300 : 1500;
      summary.steps += Math.round((activity.distance / 1000) * stepsPerKm);
    }
  });
  
  // Round distance to 2 decimal places
  summary.totalDistance = parseFloat(summary.totalDistance.toFixed(2));
  
  // Round active time to nearest minute
  summary.totalActiveTime = Math.round(summary.totalActiveTime);
  
  return summary;
}