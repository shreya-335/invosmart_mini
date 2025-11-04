"use client"

import { useState } from "react"
import { useAuth } from "../context/AuthContext"
import { useTheme } from "../context/ThemeContext"
import BranchSelector from "./BranchSelector"
import LanguageSwitcher from "./LanguageSwitcher"
import ThemeToggle from "./ThemeToggle"

const Navbar = () => {
  const { user, logout } = useAuth()
  const { theme } = useTheme()
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const handleLogout = () => {
    logout()
    setIsMenuOpen(false)
  }

  return (
    <nav
      className={`sticky top-0 z-50 backdrop-blur-md border-b ${
        theme === "dark" ? "bg-gray-900/80 border-gray-700" : "bg-white/80 border-gray-200"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center">
            <div className={`text-xl font-bold ${theme === "dark" ? "text-white" : "text-gray-900"}`}>BusinessPro</div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-4">
            <BranchSelector />
            <LanguageSwitcher />
            <ThemeToggle />

            {/* User Menu */}
            <div className="relative">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition-colors ${
                  theme === "dark" ? "text-gray-300 hover:bg-gray-700" : "text-gray-700 hover:bg-gray-100"
                }`}
              >
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    theme === "dark" ? "bg-blue-600" : "bg-blue-500"
                  } text-white font-medium`}
                >
                  {user?.name?.charAt(0).toUpperCase()}
                </div>
                <span className="text-sm font-medium">{user?.name}</span>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {/* Dropdown Menu */}
              {isMenuOpen && (
                <div
                  className={`absolute right-0 mt-2 w-48 rounded-lg shadow-lg backdrop-blur-md border ${
                    theme === "dark" ? "bg-gray-800/90 border-gray-700" : "bg-white/90 border-gray-200"
                  }`}
                >
                  <div className="py-1">
                    <div
                      className={`px-4 py-2 text-sm border-b ${
                        theme === "dark" ? "text-gray-300 border-gray-700" : "text-gray-700 border-gray-200"
                      }`}
                    >
                      <div className="font-medium">{user?.name}</div>
                      <div className="text-xs opacity-75">{user?.role}</div>
                    </div>
                    <button
                      onClick={handleLogout}
                      className={`w-full text-left px-4 py-2 text-sm transition-colors ${
                        theme === "dark" ? "text-gray-300 hover:bg-gray-700" : "text-gray-700 hover:bg-gray-100"
                      }`}
                    >
                      Sign Out
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className={`p-2 rounded-lg ${
                theme === "dark" ? "text-gray-300 hover:bg-gray-700" : "text-gray-700 hover:bg-gray-100"
              }`}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div
          className={`md:hidden border-t backdrop-blur-md ${
            theme === "dark" ? "bg-gray-900/90 border-gray-700" : "bg-white/90 border-gray-200"
          }`}
        >
          <div className="px-4 py-3 space-y-3">
            <BranchSelector />
            <div className="flex items-center justify-between">
              <LanguageSwitcher />
              <ThemeToggle />
            </div>
            <button
              onClick={handleLogout}
              className={`w-full text-left px-3 py-2 rounded-lg transition-colors ${
                theme === "dark" ? "text-gray-300 hover:bg-gray-700" : "text-gray-700 hover:bg-gray-100"
              }`}
            >
              Sign Out
            </button>
          </div>
        </div>
      )}
    </nav>
  )
}

export default Navbar
