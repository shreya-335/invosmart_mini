"use client"

import { useState, useEffect } from "react"
import { useTheme } from "../context/ThemeContext"
import ReportsChart from "../components/ReportsChart"
import LoadingSpinner from "../components/LoadingSpinner"

const Reports = () => {
  const { theme } = useTheme()
  const [reportData, setReportData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [selectedPeriod, setSelectedPeriod] = useState("monthly")

  useEffect(() => {
    fetchReportData()
  }, [selectedPeriod])

  const fetchReportData = async () => {
    try {
      // Mock data for demonstration
      const mockData = {
        salesTrends: [
          { name: "Jan", value: 20000, sales: 20000, expenses: 8000 },
          { name: "Feb", value: 25000, sales: 25000, expenses: 9000 },
          { name: "Mar", value: 30000, sales: 30000, expenses: 10000 },
          { name: "Apr", value: 28000, sales: 28000, expenses: 9500 },
          { name: "May", value: 35000, sales: 35000, expenses: 11000 },
          { name: "Jun", value: 40000, sales: 40000, expenses: 12000 },
        ],
        customerPatterns: [
          { name: "John Doe", value: 15000 },
          { name: "Jane Smith", value: 12000 },
          { name: "Bob Johnson", value: 10000 },
          { name: "Alice Brown", value: 8000 },
          { name: "Charlie Wilson", value: 6000 },
        ],
        expenseBreakdown: [
          { name: "Office Rent", value: 15000 },
          { name: "Utilities", value: 5000 },
          { name: "Marketing", value: 8000 },
          { name: "Supplies", value: 3000 },
          { name: "Travel", value: 2000 },
        ],
        paymentMethods: [
          { name: "UPI", value: 45 },
          { name: "Cash", value: 25 },
          { name: "Card", value: 20 },
          { name: "Bank Transfer", value: 10 },
        ],
      }

      setReportData(mockData)
    } catch (error) {
      console.error("Failed to fetch report data:", error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return <LoadingSpinner text="Loading reports..." />
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h1 className={`text-2xl font-bold ${theme === "dark" ? "text-white" : "text-gray-900"}`}>Reports</h1>
        <div className="flex space-x-2">
          <select
            value={selectedPeriod}
            onChange={(e) => setSelectedPeriod(e.target.value)}
            className={`px-4 py-2 rounded-lg border backdrop-blur-sm ${
              theme === "dark"
                ? "bg-gray-700/50 border-gray-600 text-white"
                : "bg-white/50 border-gray-300 text-gray-900"
            } focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
          >
            <option value="daily">Daily</option>
            <option value="weekly">Weekly</option>
            <option value="monthly">Monthly</option>
          </select>
          <button className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors font-medium">
            Export PDF
          </button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[
          { title: "Total Revenue", value: "₹2,48,000", change: "+15.3%", positive: true },
          { title: "Total Expenses", value: "₹59,500", change: "+8.2%", positive: false },
          { title: "Net Profit", value: "₹1,88,500", change: "+18.7%", positive: true },
          { title: "Profit Margin", value: "76%", change: "+2.1%", positive: true },
        ].map((stat, index) => (
          <div
            key={index}
            className={`backdrop-blur-md rounded-xl border p-6 ${
              theme === "dark" ? "bg-gray-800/50 border-gray-700" : "bg-white/50 border-gray-200"
            }`}
          >
            <h3 className={`text-sm font-medium ${theme === "dark" ? "text-gray-400" : "text-gray-600"}`}>
              {stat.title}
            </h3>
            <p className={`text-2xl font-bold mt-2 ${theme === "dark" ? "text-white" : "text-gray-900"}`}>
              {stat.value}
            </p>
            <p className={`text-sm mt-1 ${stat.positive ? "text-green-500" : "text-red-500"}`}>{stat.change}</p>
          </div>
        ))}
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ReportsChart data={reportData?.salesTrends} type="multiline" title="Sales vs Expenses" height={350} />
        <ReportsChart data={reportData?.customerPatterns} type="bar" title="Top Customers" height={350} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ReportsChart data={reportData?.expenseBreakdown} type="pie" title="Expense Breakdown" height={350} />
        <ReportsChart data={reportData?.paymentMethods} type="pie" title="Payment Methods" height={350} />
      </div>

      {/* GST Reports */}
      <div
        className={`backdrop-blur-md rounded-xl border p-6 ${
          theme === "dark" ? "bg-gray-800/50 border-gray-700" : "bg-white/50 border-gray-200"
        }`}
      >
        <h3 className={`text-lg font-semibold mb-4 ${theme === "dark" ? "text-white" : "text-gray-900"}`}>
          GST Reports
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <button
            className={`p-4 rounded-lg border transition-colors ${
              theme === "dark"
                ? "bg-gray-700/30 border-gray-600 text-gray-300 hover:bg-gray-600"
                : "bg-gray-50/50 border-gray-200 text-gray-700 hover:bg-gray-100"
            }`}
          >
            <div className="text-2xl mb-2">📊</div>
            <p className="font-medium">GSTR-1</p>
            <p className="text-sm opacity-75">Outward Supplies</p>
          </button>
          <button
            className={`p-4 rounded-lg border transition-colors ${
              theme === "dark"
                ? "bg-gray-700/30 border-gray-600 text-gray-300 hover:bg-gray-600"
                : "bg-gray-50/50 border-gray-200 text-gray-700 hover:bg-gray-100"
            }`}
          >
            <div className="text-2xl mb-2">📋</div>
            <p className="font-medium">GSTR-3B</p>
            <p className="text-sm opacity-75">Monthly Return</p>
          </button>
          <button
            className={`p-4 rounded-lg border transition-colors ${
              theme === "dark"
                ? "bg-gray-700/30 border-gray-600 text-gray-300 hover:bg-gray-600"
                : "bg-gray-50/50 border-gray-200 text-gray-700 hover:bg-gray-100"
            }`}
          >
            <div className="text-2xl mb-2">📈</div>
            <p className="font-medium">Tax Summary</p>
            <p className="text-sm opacity-75">Tax Analysis</p>
          </button>
        </div>
      </div>
    </div>
  )
}

export default Reports
