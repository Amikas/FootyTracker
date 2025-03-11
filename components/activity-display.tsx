'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { getUserActivityData } from '@/app/actions/fitbit'
import { getUserStravaData } from '@/app/actions/strava'
import { motion } from "framer-motion"; // For smooth animations

interface Distance {
  distance: number;
}

interface Summary {
  steps: number;
  distances: Distance[];
  fairlyActiveMinutes: number;
  veryActiveMinutes: number;
}

interface Activity {
  name: string;
  duration: number;
  calories: number;
}

interface ActivityData {
  summary: Summary;
  activities: Activity[];
}

interface DataSource {
  id: string;
  name: string;
  color: string;
  icon: JSX.Element;
}

export default function ActivityDisplay() {
  const [activityData, setActivityData] = useState<ActivityData | null>(null);
  const [rawData, setRawData] = useState<any | null>(null);  // Store raw API response
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [activeSource, setActiveSource] = useState<string>('fitbit');
  const router = useRouter();

  // Data sources configuration
  const dataSources: DataSource[] = [
    {
      id: 'fitbit',
      name: 'Fitbit',
      color: 'bg-blue-500 hover:bg-blue-600',
      icon: (
        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
          <path d="M16.942 10.4a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3zM7.023 13.4a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3z"/>
          <path d="M12.001 5.3a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3zM12.001 15.7a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3z"/>
          <path d="M12 12a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3z"/>
        </svg>
      )
    },
    {
      id: 'strava',
      name: 'Strava',
      color: 'bg-orange-500 hover:bg-orange-600',
      icon: (
        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
          <path d="M15.387 17.944L13.872 15.439L12.356 17.944H10.238L13.872 11.549L17.506 17.944H15.387ZM19.333 17.944L17.818 15.439L16.303 17.944H14.536L17.818 12.144L21.1 17.944H19.333ZM10.904 17.944L7.271 11.549L3.638 17.944H5.737L7.271 15.439L8.786 17.944H10.904Z"/>
        </svg>
      )
    }
  ];

  // Get today's date in "Day, Month DD, YYYY" format
  const todayDate = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });

  // Function to fetch activity data
  const fetchActivityData = async () => {
    setLoading(true);
    setError(null);

    try {
      let result;
      if (activeSource === 'fitbit') {
        result = await getUserActivityData();
      } else if (activeSource === 'strava') {
        result = await getUserStravaData();
      } else {
        throw new Error('Invalid data source');
      }

      if (result.success) {
        setActivityData(result.data);
        setRawData(result.data); // Store raw API response for debugging
      } else {
        setError(result.error);
      }
    } catch (err) {
      setError(`Failed to fetch ${activeSource} data`);
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchActivityData();
  }, [activeSource]);

  const handleReauthenticate = async () => {
    if (activeSource === 'fitbit') {
      const response = await fetch('/api/fitbit/reauthenticate');
      if (response.ok) {
        window.location.href = response.url;
      }
    } else if (activeSource === 'strava') {
      try {
        const authUrl = await fetch('/api/strava/reauthenticate');
        if (authUrl.ok) {
          window.location.href = authUrl.url;
        }
      } catch (error) {
        console.error('Failed to reauthenticate with Strava:', error);
      }
    }
  };

  // Find the active data source
  const currentSource = dataSources.find(source => source.id === activeSource) || dataSources[0];

  if (loading) return <div className="text-white text-lg">Loading activity data...</div>;
  if (error) return <div className="text-red-500 font-semibold">Error: {error}</div>;
  if (!activityData) return <div className="text-gray-500">No activity data available</div>;

  return (
    <motion.div 
      className="bg-gray-900 shadow-lg rounded-xl p-8 text-white"
      initial={{ opacity: 0, y: 10 }} 
      animate={{ opacity: 1, y: 0 }} 
      transition={{ duration: 0.3 }}
    >
      <div className="flex justify-between items-center mb-6">
        {/* Display "Today's Activity" with the current date */}
        <h2 className="text-2xl font-bold">
          Today's Activity - <span className="text-gray-300">{todayDate}</span>
        </h2>

        <div className="flex gap-4">
          {/* Data Source Selector */}
          <div className="bg-gray-800 rounded-lg p-1 flex">
            {dataSources.map((source) => (
              <button
                key={source.id}
                onClick={() => setActiveSource(source.id)}
                className={`px-3 py-1 rounded-md transition flex items-center gap-2 ${
                  activeSource === source.id
                    ? source.color + ' text-white'
                    : 'text-gray-300 hover:bg-gray-700'
                }`}
              >
                {source.icon}
                {source.name}
              </button>
            ))}
          </div>

          {/* Refresh Data Button */}
          <button 
            onClick={fetchActivityData} 
            className={`px-4 py-2 ${currentSource.color} text-white rounded transition flex items-center gap-2`}
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M4 12C4 7.58172 7.58172 4 12 4V4C16.4183 4 20 7.58172 20 12V12C20 16.4183 16.4183 20 12 20V20C7.58172 20 4 16.4183 4 12V12Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M9 12L11 14L15 10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            Refresh Data
          </button>

          {/* Reauthenticate Button */}
          <button 
            onClick={handleReauthenticate} 
            className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700 transition"
          >
            Reauthenticate
          </button>
        </div>
      </div>

      {/* Data Source Indicator */}
      <div className="mb-6 flex items-center gap-2">
        <span className="text-gray-400">Data Source:</span>
        <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full ${
          activeSource === 'fitbit' ? 'bg-blue-500/20 text-blue-300' : 'bg-orange-500/20 text-orange-300'
        }`}>
          {currentSource.icon}
          {currentSource.name}
        </span>
      </div>

      {/* Activity Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Steps */}
        <motion.div 
          className="bg-blue-500 p-6 rounded-xl shadow-md transition transform duration-200"
          whileHover={{ scale: 1.05 }}
        >
          <p className="text-sm text-gray-200">Steps</p>
          <p className="text-3xl font-bold">{activityData.summary.steps}</p>
        </motion.div>

        {/* Distance */}
        <motion.div 
          className="bg-green-500 p-6 rounded-xl shadow-md transition transform duration-200"
          whileHover={{ scale: 1.05 }}
        >
          <p className="text-sm text-gray-200">Distance</p>
          <p className="text-3xl font-bold">{activityData.summary.distances[0].distance} km</p>
        </motion.div>

        {/* Active Minutes */}
        <motion.div 
          className="bg-yellow-500 p-6 rounded-xl shadow-md transition transform duration-200"
          whileHover={{ scale: 1.05 }}
        >
          <p className="text-sm text-gray-200">Active Minutes</p>
          <p className="text-3xl font-bold">
            {activityData.summary.fairlyActiveMinutes + activityData.summary.veryActiveMinutes}
          </p>
        </motion.div>
      </div>

      {/* Activity Table */}
      <div className="mt-8">
        <h3 className="text-lg font-semibold mb-4">Activity Details</h3>
        <table className="w-full border-collapse border border-gray-700 rounded-xl overflow-hidden">
          <thead className="bg-gray-800">
            <tr>
              <th className="text-left py-3 px-4 text-gray-200">Activity</th>
              <th className="text-left py-3 px-4 text-gray-200">Duration</th>
              <th className="text-left py-3 px-4 text-gray-200">Calories</th>
            </tr>
          </thead>
          <tbody>
            {activityData.activities.map((activity: Activity, index: number) => (
              <tr key={index} className="border-b border-gray-600 hover:bg-gray-800 transition">
                <td className="py-3 px-4">{activity.name}</td>
                <td className="py-3 px-4">{Math.floor(activity.duration / 60000)} min</td>
                <td className="py-3 px-4">{activity.calories}</td>
              </tr>
            ))}
            {activityData.activities.length === 0 && (
              <tr>
                <td colSpan={3} className="py-6 text-center text-gray-400">
                  No activities recorded today
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Debugging Section: Show Raw API Data */}
      {process.env.NODE_ENV === 'development' && (
        <div className="mt-8 p-4 bg-gray-800 rounded-lg overflow-x-auto">
          <details>
            <summary className="cursor-pointer text-green-400 mb-2 text-lg font-semibold">Raw API Data</summary>
            <pre className="text-xs text-green-400 whitespace-pre-wrap">
              {JSON.stringify(rawData, null, 2)}
            </pre>
          </details>
        </div>
      )}
    </motion.div>
  );
}