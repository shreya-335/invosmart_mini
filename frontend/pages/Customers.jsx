"use client"

import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { useTheme } from "../context/ThemeContext"
import LoadingSpinner from "../components/LoadingSpinner"

const Customers = () => {
  const { theme } = useTheme()
  const [customers, setCustomers] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")

  useEffect(() => {
    fetchCustomers()
  }, [])

  const fetchCustomers = async () => {
    try {
      const response = await fetch("/api/customers", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })

      if (response.ok) {
        const data = await response.json()
        setCustomers(data)
      }
    } catch (error) {
      console.error("Failed to fetch customers:", error)
      // Mock data for demonstration
      setCustomers([
        {
          id: 1,
          name: "John Doe",
          email: "john@example.com",
          phone: "+91-9876543210",
          gst_number: "22AAAAA0000A1Z5",
          created_at: "2024-01-15",
        },
        {
          id: 2,
          name: "Jane Smith",
          email: "jane@example.com",
          phone: "+91-9876543211",
          gst_number: null,
          created_at: "2024-02-20",
        },
        {
          id: 3,
          name: "Bob Johnson",
          email: "bob@example.com",
          phone: "+91-9876543212",
          gst_number: "22BBBBB0000B1Z5",
          created_at: "2024-03-10",
        },
      ])
    } finally {
      setLoading(false)
    }
  }

  const filteredCustomers = customers.filter(
    (customer) =>
      customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.phone?.includes(searchTerm),
  )

  if (loading) {
    return <LoadingSpinner text="Loading customers..." />
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h1 className={`text-2xl font-bold ${theme === "dark" ? "text-white" : "text-gray-900"}`}>Customers</h1>
        <Link
          to="/customers/new"
          className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors font-medium"
        >
          Add Customer
        </Link>
      </div>

      {/* Search */}
      <div
        className={`backdrop-blur-md rounded-xl border p-6 ${
          theme === "dark" ? "bg-gray-800/50 border-gray-700" : "bg-white/50 border-gray-200"
        }`}
      >
        <div className="max-w-md">
          <label className={`block text-sm font-medium mb-2 ${theme === "dark" ? "text-gray-300" : "text-gray-700"}`}>
            Search Customers
          </label>
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search by name, email, or phone..."
            className={`w-full px-4 py-2 rounded-lg border backdrop-blur-sm ${
              theme === "dark"
                ? "bg-gray-700/50 border-gray-600 text-white placeholder-gray-400"
                : "bg-white/50 border-gray-300 text-gray-900 placeholder-gray-500"
            } focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
          />
        </div>
      </div>

      {/* Customers Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCustomers.map((customer) => (
          <div
            key={customer.id}
            className={`backdrop-blur-md rounded-xl border p-6 ${
              theme === "dark" ? "bg-gray-800/50 border-gray-700" : "bg-white/50 border-gray-200"
            }`}
          >
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <h3 className={`text-lg font-semibold ${theme === "dark" ? "text-white" : "text-gray-900"}`}>
                  {customer.name}
                </h3>
                <div className="mt-2 space-y-1">
                  {customer.email && (
                    <p className={`text-sm ${theme === "dark" ? "text-gray-400" : "text-gray-600"}`}>
                      📧 {customer.email}
                    </p>
                  )}
                  {customer.phone && (
                    <p className={`text-sm ${theme === "dark" ? "text-gray-400" : "text-gray-600"}`}>
                      📞 {customer.phone}
                    </p>
                  )}
                  {customer.gst_number && (
                    <p className={`text-sm ${theme === "dark" ? "text-gray-400" : "text-gray-600"}`}>
                      🏢 GST: {customer.gst_number}
                    </p>
                  )}
                  <p className={`text-xs ${theme === "dark" ? "text-gray-500" : "text-gray-500"}`}>
                    Added: {new Date(customer.created_at).toLocaleDateString()}
                  </p>
                </div>
              </div>
              <div
                className={`w-12 h-12 rounded-full flex items-center justify-center ${
                  theme === "dark" ? "bg-blue-600" : "bg-blue-500"
                } text-white font-semibold`}
              >
                {customer.name.charAt(0).toUpperCase()}
              </div>
            </div>

            <div className="mt-4 flex space-x-2">
              <Link
                to={`/customers/${customer.id}`}
                className="flex-1 px-3 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors text-center text-sm font-medium"
              >
                View Details
              </Link>
              <Link
                to={`/customers/${customer.id}/edit`}
                className={`px-3 py-2 rounded-lg border transition-colors text-sm font-medium ${
                  theme === "dark"
                    ? "bg-gray-700/50 border-gray-600 text-gray-300 hover:bg-gray-600"
                    : "bg-gray-50/50 border-gray-300 text-gray-700 hover:bg-gray-100"
                }`}
              >
                Edit
              </Link>
            </div>
          </div>
        ))}
      </div>

      {filteredCustomers.length === 0 && (
        <div
          className={`backdrop-blur-md rounded-xl border p-12 text-center ${
            theme === "dark" ? "bg-gray-800/50 border-gray-700" : "bg-white/50 border-gray-200"
          }`}
        >
          <div className="text-6xl mb-4">👥</div>
          <h3 className={`text-lg font-semibold mb-2 ${theme === "dark" ? "text-white" : "text-gray-900"}`}>
            No customers found
          </h3>
          <p className={`${theme === "dark" ? "text-gray-400" : "text-gray-600"} mb-4`}>
            {searchTerm ? "Try adjusting your search terms." : "Get started by adding your first customer."}
          </p>
          <Link
            to="/customers/new"
            className="inline-block px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors font-medium"
          >
            Add Customer
          </Link>
        </div>
      )}
    </div>
  )
}

export default Customers
