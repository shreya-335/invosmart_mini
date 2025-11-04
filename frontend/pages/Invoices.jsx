"use client"

import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { useTheme } from "../context/ThemeContext"
import LoadingSpinner from "../components/LoadingSpinner"
import PaymentButton from "../components/PaymentButton"

const Invoices = () => {
  const { theme } = useTheme()
  const [invoices, setInvoices] = useState([])
  const [loading, setLoading] = useState(true)
  const [filters, setFilters] = useState({
    start_date: "",
    end_date: "",
    customer_id: "",
    status: "",
  })

  useEffect(() => {
    fetchInvoices()
  }, [filters])

  const fetchInvoices = async () => {
    try {
      const queryParams = new URLSearchParams()
      Object.entries(filters).forEach(([key, value]) => {
        if (value) queryParams.append(key, value)
      })

      const response = await fetch(`/api/invoices?${queryParams}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })

      if (response.ok) {
        const data = await response.json()
        setInvoices(data)
      }
    } catch (error) {
      console.error("Failed to fetch invoices:", error)
      // Mock data for demonstration
      setInvoices([
        {
          id: 1,
          invoice_number: "INV-20241201-0001",
          customer_name: "John Doe",
          date: "2024-12-01",
          net_amount: 5000,
          payment_status: "Paid",
          invoice_type: "GST",
        },
        {
          id: 2,
          invoice_number: "INV-20241202-0002",
          customer_name: "Jane Smith",
          date: "2024-12-02",
          net_amount: 3500,
          payment_status: "Pending",
          invoice_type: "GST",
        },
        {
          id: 3,
          invoice_number: "INV-20241203-0003",
          customer_name: "Bob Johnson",
          date: "2024-12-03",
          net_amount: 7200,
          payment_status: "Overdue",
          invoice_type: "Non-GST",
        },
      ])
    } finally {
      setLoading(false)
    }
  }

  const handlePaymentSuccess = (invoiceId, paymentData) => {
    setInvoices((prev) =>
      prev.map((invoice) => (invoice.id === invoiceId ? { ...invoice, payment_status: "Paid" } : invoice)),
    )
  }

  if (loading) {
    return <LoadingSpinner text="Loading invoices..." />
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h1 className={`text-2xl font-bold ${theme === "dark" ? "text-white" : "text-gray-900"}`}>Invoices</h1>
        <Link
          to="/invoices/new"
          className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors font-medium"
        >
          Create Invoice
        </Link>
      </div>

      {/* Filters */}
      <div
        className={`backdrop-blur-md rounded-xl border p-6 ${
          theme === "dark" ? "bg-gray-800/50 border-gray-700" : "bg-white/50 border-gray-200"
        }`}
      >
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div>
            <label className={`block text-sm font-medium mb-2 ${theme === "dark" ? "text-gray-300" : "text-gray-700"}`}>
              Start Date
            </label>
            <input
              type="date"
              value={filters.start_date}
              onChange={(e) => setFilters((prev) => ({ ...prev, start_date: e.target.value }))}
              className={`w-full px-3 py-2 rounded-lg border backdrop-blur-sm ${
                theme === "dark"
                  ? "bg-gray-700/50 border-gray-600 text-white"
                  : "bg-white/50 border-gray-300 text-gray-900"
              } focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
            />
          </div>

          <div>
            <label className={`block text-sm font-medium mb-2 ${theme === "dark" ? "text-gray-300" : "text-gray-700"}`}>
              End Date
            </label>
            <input
              type="date"
              value={filters.end_date}
              onChange={(e) => setFilters((prev) => ({ ...prev, end_date: e.target.value }))}
              className={`w-full px-3 py-2 rounded-lg border backdrop-blur-sm ${
                theme === "dark"
                  ? "bg-gray-700/50 border-gray-600 text-white"
                  : "bg-white/50 border-gray-300 text-gray-900"
              } focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
            />
          </div>

          <div>
            <label className={`block text-sm font-medium mb-2 ${theme === "dark" ? "text-gray-300" : "text-gray-700"}`}>
              Status
            </label>
            <select
              value={filters.status}
              onChange={(e) => setFilters((prev) => ({ ...prev, status: e.target.value }))}
              className={`w-full px-3 py-2 rounded-lg border backdrop-blur-sm ${
                theme === "dark"
                  ? "bg-gray-700/50 border-gray-600 text-white"
                  : "bg-white/50 border-gray-300 text-gray-900"
              } focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
            >
              <option value="">All Status</option>
              <option value="Paid">Paid</option>
              <option value="Pending">Pending</option>
              <option value="Overdue">Overdue</option>
            </select>
          </div>

          <div className="flex items-end">
            <button
              onClick={() => setFilters({ start_date: "", end_date: "", customer_id: "", status: "" })}
              className={`px-4 py-2 rounded-lg border transition-colors ${
                theme === "dark"
                  ? "bg-gray-700/50 border-gray-600 text-gray-300 hover:bg-gray-600"
                  : "bg-gray-50/50 border-gray-300 text-gray-700 hover:bg-gray-100"
              }`}
            >
              Clear Filters
            </button>
          </div>
        </div>
      </div>

      {/* Invoices Table */}
      <div
        className={`backdrop-blur-md rounded-xl border overflow-hidden ${
          theme === "dark" ? "bg-gray-800/50 border-gray-700" : "bg-white/50 border-gray-200"
        }`}
      >
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className={`${theme === "dark" ? "bg-gray-700/50" : "bg-gray-50/50"}`}>
              <tr>
                <th
                  className={`px-6 py-3 text-left text-xs font-medium uppercase tracking-wider ${
                    theme === "dark" ? "text-gray-300" : "text-gray-500"
                  }`}
                >
                  Invoice Number
                </th>
                <th
                  className={`px-6 py-3 text-left text-xs font-medium uppercase tracking-wider ${
                    theme === "dark" ? "text-gray-300" : "text-gray-500"
                  }`}
                >
                  Customer
                </th>
                <th
                  className={`px-6 py-3 text-left text-xs font-medium uppercase tracking-wider ${
                    theme === "dark" ? "text-gray-300" : "text-gray-500"
                  }`}
                >
                  Date
                </th>
                <th
                  className={`px-6 py-3 text-left text-xs font-medium uppercase tracking-wider ${
                    theme === "dark" ? "text-gray-300" : "text-gray-500"
                  }`}
                >
                  Amount
                </th>
                <th
                  className={`px-6 py-3 text-left text-xs font-medium uppercase tracking-wider ${
                    theme === "dark" ? "text-gray-300" : "text-gray-500"
                  }`}
                >
                  Status
                </th>
                <th
                  className={`px-6 py-3 text-left text-xs font-medium uppercase tracking-wider ${
                    theme === "dark" ? "text-gray-300" : "text-gray-500"
                  }`}
                >
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              {invoices.map((invoice) => (
                <tr key={invoice.id}>
                  <td className={`px-6 py-4 whitespace-nowrap ${theme === "dark" ? "text-white" : "text-gray-900"}`}>
                    <Link to={`/invoices/${invoice.id}`} className="text-blue-500 hover:text-blue-600 font-medium">
                      {invoice.invoice_number}
                    </Link>
                  </td>
                  <td className={`px-6 py-4 whitespace-nowrap ${theme === "dark" ? "text-gray-300" : "text-gray-700"}`}>
                    {invoice.customer_name}
                  </td>
                  <td className={`px-6 py-4 whitespace-nowrap ${theme === "dark" ? "text-gray-300" : "text-gray-700"}`}>
                    {new Date(invoice.date).toLocaleDateString()}
                  </td>
                  <td className={`px-6 py-4 whitespace-nowrap ${theme === "dark" ? "text-white" : "text-gray-900"}`}>
                    ₹{invoice.net_amount?.toLocaleString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-2 py-1 text-xs rounded-full ${
                        invoice.payment_status === "Paid"
                          ? "bg-green-100 text-green-800"
                          : invoice.payment_status === "Pending"
                            ? "bg-yellow-100 text-yellow-800"
                            : "bg-red-100 text-red-800"
                      }`}
                    >
                      {invoice.payment_status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex space-x-2">
                      <Link
                        to={`/invoices/${invoice.id}`}
                        className="text-blue-500 hover:text-blue-600 text-sm font-medium"
                      >
                        View
                      </Link>
                      {invoice.payment_status !== "Paid" && (
                        <PaymentButton
                          invoice={invoice}
                          onPaymentSuccess={(paymentData) => handlePaymentSuccess(invoice.id, paymentData)}
                        />
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default Invoices
