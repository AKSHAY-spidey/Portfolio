export default function HomePage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="text-center space-y-6 p-8">
        <h1 className="text-5xl font-bold text-gray-900">
          Portfolio Management System
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl">
          Your professional portfolio is being set up. Complete the database setup to get started.
        </p>
        <div className="space-y-2 text-left bg-white p-6 rounded-lg shadow-lg max-w-2xl mx-auto">
          <h2 className="text-2xl font-semibold mb-4">Setup Instructions:</h2>
          <ol className="list-decimal list-inside space-y-2 text-gray-700">
            <li>Run <code className="bg-gray-100 px-2 py-1 rounded">npx prisma generate</code></li>
            <li>Run <code className="bg-gray-100 px-2 py-1 rounded">npx prisma migrate dev</code></li>
            <li>Run <code className="bg-gray-100 px-2 py-1 rounded">npm run prisma:seed</code></li>
            <li>Visit <a href="/login" className="text-blue-600 hover:underline">/login</a> to access admin dashboard</li>
          </ol>
        </div>
      </div>
    </div>
  )
}
