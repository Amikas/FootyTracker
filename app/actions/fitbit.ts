"use server";

import { cookies } from "next/headers";
import axios, { AxiosResponse } from "axios";

interface TokenResponse {
  access_token: string;
  refresh_token: string;
  expires_in: number;
  [key: string]: any;
}

interface Result<T = undefined> {
  success: boolean;
  data?: T;
  error?: string;
}

// Generate auth URL for Fitbit OAuth
export async function getFitbitAuthUrl(): Promise<string> {
  const clientId = process.env.FITBIT_CLIENT_ID;
  const redirectUri = process.env.FITBIT_REDIRECT_URI;

  const scope = "activity heartrate location profile";
  const responseType = "code";

  const authUrl = `https://www.fitbit.com/oauth2/authorize?client_id=${clientId}&response_type=${responseType}&scope=${scope}&redirect_uri=${encodeURIComponent(
    redirectUri!
  )}`;
  return authUrl;
}

// Exchange auth code for access token
export async function exchangeCodeForToken(code: string): Promise<Result> {
  try {
    const clientId = process.env.FITBIT_CLIENT_ID;
    const clientSecret = process.env.FITBIT_CLIENT_SECRET;
    const redirectUri = process.env.FITBIT_REDIRECT_URI;

    const basicAuth = Buffer.from(`${clientId}:${clientSecret}`).toString(
      "base64"
    );

    const response: AxiosResponse<TokenResponse> = await axios({
      method: "post",
      url: "https://api.fitbit.com/oauth2/token",
      headers: {
        Authorization: `Basic ${basicAuth}`,
        "Content-Type": "application/x-www-form-urlencoded",
      },
      data: new URLSearchParams({
        code,
        grant_type: "authorization_code",
        redirect_uri: redirectUri!,
      }).toString(),
    });

    const cookieStore = await cookies();
    cookieStore.set("fitbit_access_token", response.data.access_token, {
      secure: process.env.NODE_ENV === "production",
      httpOnly: true,
      maxAge: response.data.expires_in,
    });
    cookieStore.set("fitbit_refresh_token", response.data.refresh_token, {
      secure: process.env.NODE_ENV === "production",
      httpOnly: true,
      maxAge: 60 * 60 * 24 * 30,
    });

    return { success: true };
  } catch (error: any) {
    console.error(
      "Error exchanging code for token:",
      error.response?.data || error.message
    );
    return {
      success: false,
      error:
        error.response?.data?.errors?.[0]?.message ||
        "Failed to authenticate with Fitbit",
    };
  }
}

// Get user activity data
export async function getUserActivityData(date?: string): Promise<Result<any>> {
  try {
    const cookieStore = await cookies();
    const accessToken = cookieStore.get("fitbit_access_token")?.value;

    if (!accessToken) {
      return { success: false, error: "Not authenticated with Fitbit" };
    }

    const targetDate = date || new Date().toISOString().split("T")[0];

    const response = await axios({
      method: "get",
      url: `https://api.fitbit.com/1/user/-/activities/date/${targetDate}.json`,
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    //console.log("Fitbit response:", JSON.stringify(response.data, null, 2));

    return {
      success: true,
      data: response.data,
    };
  } catch (error: any) {
    if (error.response?.status === 401) {
      const refreshed = await refreshAccessToken();
      if (refreshed.success) {
        return getUserActivityData(date);
      }
    }

    console.error(
      "Error fetching activity data:",
      error.response?.data || error.message
    );
    return {
      success: false,
      error:
        error.response?.data?.errors?.[0]?.message ||
        "Failed to fetch activity data",
    };
  }
}

// Function to disconnect Fitbit by removing stored tokens
export async function disconnectFitbit(): Promise<Result> {
  const cookieStore = await cookies();
  cookieStore.delete("fitbit_access_token");
  cookieStore.delete("fitbit_refresh_token");
  return { success: true };
}

// Refresh access token
async function refreshAccessToken(): Promise<Result> {
  try {
    const cookieStore = await cookies();
    const refreshToken = cookieStore.get("fitbit_refresh_token")?.value;

    if (!refreshToken) {
      return { success: false, error: "No refresh token available" };
    }

    const clientId = process.env.FITBIT_CLIENT_ID;
    const clientSecret = process.env.FITBIT_CLIENT_SECRET;
    const basicAuth = Buffer.from(`${clientId}:${clientSecret}`).toString(
      "base64"
    );

    const response: AxiosResponse<TokenResponse> = await axios({
      method: "post",
      url: "https://api.fitbit.com/oauth2/token",
      headers: {
        Authorization: `Basic ${basicAuth}`,
        "Content-Type": "application/x-www-form-urlencoded",
      },
      data: new URLSearchParams({
        grant_type: "refresh_token",
        refresh_token: refreshToken,
      }).toString(),
    });

    cookieStore.set("fitbit_access_token", response.data.access_token, {
      secure: process.env.NODE_ENV === "production",
      httpOnly: true,
      maxAge: response.data.expires_in,
    });

    if (response.data.refresh_token) {
      cookieStore.set("fitbit_refresh_token", response.data.refresh_token, {
        secure: process.env.NODE_ENV === "production",
        httpOnly: true,
        maxAge: 60 * 60 * 24 * 30,
      });
    }

    return { success: true };
  } catch (error: any) {
    console.error(
      "Error refreshing token:",
      error.response?.data || error.message
    );
    return {
      success: false,
      error:
        error.response?.data?.errors?.[0]?.message || "Failed to refresh token",
    };
  }
}
