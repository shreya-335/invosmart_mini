"use client"

import { useState, useEffect } from "react"
import { useAuth } from "../context/AuthContext"
import { useTheme } from "../context/ThemeContext"

const BranchSelector = () => {
  const { user } = useAuth()
  const { theme } = useTheme()
  const [branches, setBranches] = useState([])
  const [selectedBranch, setSelectedBranch] = useState("")
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchBranches()
  }, [])

  const fetchBranches = async () => {
    try {
      const response = await fetch("/api/branches", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      const data = await response.json()
      setBranches(data)

      // Set default branch
      if (user?.branch_id) {
        setSelectedBranch(user.branch_id)
      } else if (data.length > 0) {
        setSelectedBranch(data[0].id)
      }
    } catch (error) {
      console.error("Failed to fetch branches:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleBranchChange = (branchId) => {
    setSelectedBranch(branchId)
    // Store selected branch in localStorage or context
    localStorage.setItem("selectedBranch", branchId)
    // Trigger app-wide branch change event
    window.dispatchEvent(new CustomEvent("branchChanged", { detail: branchId }))
  }

  // Only show branch selector for Admin users
  if (user?.role !== "Admin" || loading) {
    return null
  }

  return (
    <div className="relative">
      <select
        value={selectedBranch}
        onChange={(e) => handleBranchChange(e.target.value)}
        className={`px-3 py-2 rounded-lg border backdrop-blur-sm text-sm ${
          theme === "dark" ? "bg-gray-700/50 border-gray-600 text-white" : "bg-white/50 border-gray-300 text-gray-900"
        } focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
      >
        {branches.map((branch) => (
          <option key={branch.id} value={branch.id}>
            {branch.name}
          </option>
        ))}
      </select>
    </div>
  )
}

export default BranchSelector
