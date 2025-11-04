export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-8">
      <div className="max-w-4xl mx-auto text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-6">Business Management System</h1>
        <p className="text-xl text-gray-600 mb-8">Full-Stack Application with PostgreSQL Integration</p>

        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white/70 backdrop-blur-sm rounded-lg p-6 shadow-lg">
            <h3 className="text-lg font-semibold text-gray-800 mb-2">Frontend</h3>
            <p className="text-gray-600">React.js application with glassmorphism design</p>
            <p className="text-sm text-blue-600 mt-2">📁 /frontend/</p>
          </div>

          <div className="bg-white/70 backdrop-blur-sm rounded-lg p-6 shadow-lg">
            <h3 className="text-lg font-semibold text-gray-800 mb-2">Backend</h3>
            <p className="text-gray-600">Express.js API with JWT authentication</p>
            <p className="text-sm text-blue-600 mt-2">📁 /backend/</p>
          </div>

          <div className="bg-white/70 backdrop-blur-sm rounded-lg p-6 shadow-lg">
            <h3 className="text-lg font-semibold text-gray-800 mb-2">Database</h3>
            <p className="text-gray-600">PostgreSQL with complete schema</p>
            <p className="text-sm text-blue-600 mt-2">📁 /database/</p>
          </div>
        </div>

        <div className="bg-white/70 backdrop-blur-sm rounded-lg p-6 shadow-lg">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Project Structure</h3>
          <div className="text-left text-sm text-gray-600 space-y-1">
            <div>📁 frontend/components/ - React components</div>
            <div>📁 frontend/pages/ - React pages (Dashboard, Invoices, etc.)</div>
            <div>📁 backend/ - Express.js server with all API routes</div>
            <div>📁 database/ - PostgreSQL models and schema</div>
          </div>
        </div>

        <p className="text-gray-500 mt-6">
          Your complete React.js business management system is ready in the project folders above.
        </p>
      </div>
    </div>
  )
}
