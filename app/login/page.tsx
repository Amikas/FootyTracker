import FitbitLogin from '@/components/fitbit-login'



export default function LoginPage() {

  return (

    <div className="flex min-h-screen flex-col items-center justify-center p-24">

      <div className="bg-white shadow rounded-lg p-8 max-w-md w-full">

        <h1 className="text-2xl font-bold mb-6 text-center">Footy Tracker</h1>

        <p className="mb-6 text-gray-600 text-center">

          Connect your Fitbit account to track your football performance

        </p>

        

        <div className="flex justify-center">

          <FitbitLogin />

        </div>

      </div>

    </div>

  )

}