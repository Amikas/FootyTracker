import FitbitLogin from '@/components/fitbit-login'

export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="bg-white shadow-2xl rounded-2xl p-10 sm:p-12 w-full max-w-md">
        <h1 className="text-3xl font-extrabold text-center text-gray-800 mb-4">
          Footy Tracker
        </h1>
        <p className="text-center text-gray-500 mb-8 text-sm sm:text-base">
          Connect your Fitbit account to track your football performance.
        </p>
        <div className="flex justify-center">
          <FitbitLogin />
        </div>
      </div>
    </div>
  )
}
