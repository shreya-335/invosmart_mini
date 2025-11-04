"use client"

import { useState, useEffect } from "react"
import { useTheme } from "../context/ThemeContext"
import { useAuth } from "../context/AuthContext"
import ReportsChart from "../components/ReportsChart"
import LoadingSpinner from "../components/LoadingSpinner"

const Dashboard = () => {
  const { theme } = useTheme()
  const { user } = useAuth()
  const [dashboardData, setDashboardData] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchDashboardData()
  }, [])

  const fetchDashboardData = async () => {
    try {
      // Simulate API calls for dashboard data
      const [salesResponse, expensesResponse, customersResponse] = await Promise.all([
        fetch("/api/reports/sales-trends?period=monthly", {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }),
        fetch("/api/reports/expenses", {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }),
        fetch("/api/reports/customer-patterns", {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }),
      ])

      // Mock data for demonstration
      const mockData = {
        kpis: {
          totalSales: 125000,
          pendingPayments: 15000,
          totalCustomers: 45,
          monthlyGrowth: 12.5,
        },
        salesTrends: [
          { name: "Jan", value: 20000 },
          { name: "Feb", value: 25000 },
          { name: "Mar", value: 30000 },
          { name: "Apr", value: 28000 },
          { name: "May", value: 35000 },
          { name: "Jun", value: 40000 },
        ],
        expenseBreakdown: [
          { name: "Office Rent", value: 15000 },
          { name: "Utilities", value: 5000 },
          { name: "Marketing", value: 8000 },
          { name: "Supplies", value: 3000 },
        ],
        recentInvoices: [
          { id: 1, invoice_number: "INV-001", customer_name: "John Doe", amount: 5000, status: "Paid" },
          { id: 2, invoice_number: "INV-002", customer_name: "Jane Smith", amount: 3500, status: "Pending" },
          { id: 3, invoice_number: "INV-003", customer_name: "Bob Johnson", amount: 7200, status: "Overdue" },
        ],
      }

      setDashboardData(mockData)
    } catch (error) {
      console.error("Failed to fetch dashboard data:", error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return <LoadingSpinner text="Loading dashboard..." />
  }

  return (
    <div className="space-y-6">
      {/* Welcome Header */}
      <div
        className={`backdrop-blur-md rounded-xl border p-6 ${
          theme === "dark" ? "bg-gray-800/50 border-gray-700" : "bg-white/50 border-gray-200"
        }`}
      >
        <h1 className={`text-2xl font-bold ${theme === "dark" ? "text-white" : "text-gray-900"}`}>
          Welcome back, {user?.name}!
        </h1>
        <p className={`mt-2 ${theme === "dark" ? "text-gray-400" : "text-gray-600"}`}>
          Here's what's happening with your business today.
        </p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          {
            title: "Total Sales",
            value: `₹${dashboardData?.kpis.totalSales.toLocaleString()}`,
            change: "+12.5%",
            positive: true,
            icon: "💰",
          },
          {
            title: "Pending Payments",
            value: `₹${dashboardData?.kpis.pendingPayments.toLocaleString()}`,
            change: "-5.2%",
            positive: true,
            icon: "⏳",
          },
          {
            title: "Total Customers",
            value: dashboardData?.kpis.totalCustomers,
            change: "+8.1%",
            positive: true,
            icon: "👥",
          },
          {
            title: "Monthly Growth",
            value: `${dashboardData?.kpis.monthlyGrowth}%`,
            change: "+2.3%",
            positive: true,
            icon: "📈",
          },
        ].map((kpi, index) => (
          <div
            key={index}
            className={`backdrop-blur-md rounded-xl border p-6 ${
              theme === "dark" ? "bg-gray-800/50 border-gray-700" : "bg-white/50 border-gray-200"
            }`}
          >
            <div className="flex items-center justify-between">
              <div>
                <p className={`text-sm font-medium ${theme === "dark" ? "text-gray-400" : "text-gray-600"}`}>
                  {kpi.title}
                </p>
                <p className={`text-2xl font-bold mt-2 ${theme === "dark" ? "text-white" : "text-gray-900"}`}>
                  {kpi.value}
                </p>
                <p className={`text-sm mt-1 ${kpi.positive ? "text-green-500" : "text-red-500"} flex items-center`}>
                  {kpi.change}
                  <span className="ml-1">vs last month</span>
                </p>
              </div>
              <div className="text-3xl">{kpi.icon}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ReportsChart data={dashboardData?.salesTrends} type="area" title="Sales Trends" height={300} />
        <ReportsChart data={dashboardData?.expenseBreakdown} type="pie" title="Expense Breakdown" height={300} />
      </div>

      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Invoices */}
        <div
          className={`backdrop-blur-md rounded-xl border p-6 ${
            theme === "dark" ? "bg-gray-800/50 border-gray-700" : "bg-white/50 border-gray-200"
          }`}
        >
          <h3 className={`text-lg font-semibold mb-4 ${theme === "dark" ? "text-white" : "text-gray-900"}`}>
            Recent Invoices
          </h3>
          <div className="space-y-3">
            {dashboardData?.recentInvoices.map((invoice) => (
              <div
                key={invoice.id}
                className={`flex items-center justify-between p-3 rounded-lg ${
                  theme === "dark" ? "bg-gray-700/30" : "bg-gray-50/50"
                }`}
              >
                <div>
                  <p className={`font-medium ${theme === "dark" ? "text-white" : "text-gray-900"}`}>
                    {invoice.invoice_number}
                  </p>
                  <p className={`text-sm ${theme === "dark" ? "text-gray-400" : "text-gray-600"}`}>
                    {invoice.customer_name}
                  </p>
                </div>
                <div className="text-right">
                  <p className={`font-medium ${theme === "dark" ? "text-white" : "text-gray-900"}`}>
                    ₹{invoice.amount.toLocaleString()}
                  </p>
                  <span
                    className={`text-xs px-2 py-1 rounded-full ${
                      invoice.status === "Paid"
                        ? "bg-green-100 text-green-800"
                        : invoice.status === "Pending"
                          ? "bg-yellow-100 text-yellow-800"
                          : "bg-red-100 text-red-800"
                    }`}
                  >
                    {invoice.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div
          className={`backdrop-blur-md rounded-xl border p-6 ${
            theme === "dark" ? "bg-gray-800/50 border-gray-700" : "bg-white/50 border-gray-200"
          }`}
        >
          <h3 className={`text-lg font-semibold mb-4 ${theme === "dark" ? "text-white" : "text-gray-900"}`}>
            Quick Actions
          </h3>
          <div className="grid grid-cols-2 gap-3">
            {[
              { name: "New Invoice", icon: "📄", path: "/invoices/new" },
              { name: "Add Customer", icon: "👤", path: "/customers/new" },
              { name: "Add Product", icon: "📦", path: "/products/new" },
              { name: "View Reports", icon: "📊", path: "/reports" },
            ].map((action, index) => (
              <button
                key={index}
                className={`p-4 rounded-lg border transition-colors ${
                  theme === "dark"
                    ? "bg-gray-700/30 border-gray-600 text-gray-300 hover:bg-gray-600"
                    : "bg-gray-50/50 border-gray-200 text-gray-700 hover:bg-gray-100"
                }`}
              >
                <div className="text-2xl mb-2">{action.icon}</div>
                <p className="text-sm font-medium">{action.name}</p>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
