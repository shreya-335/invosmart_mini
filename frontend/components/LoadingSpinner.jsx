"use client"
import { useTheme } from "../context/ThemeContext"

const LoadingSpinner = ({ size = "md", text = "Loading..." }) => {
  const { theme } = useTheme()

  const sizeClasses = {
    sm: "w-4 h-4",
    md: "w-8 h-8",
    lg: "w-12 h-12",
  }

  return (
    <div className="flex flex-col items-center justify-center p-8">
      <div
        className={`animate-spin rounded-full border-2 border-t-transparent ${
          theme === "dark" ? "border-gray-600" : "border-gray-300"
        } ${sizeClasses[size]}`}
      >
        <div
          className={`rounded-full ${sizeClasses[size]} ${
            theme === "dark" ? "border-t-blue-400" : "border-t-blue-500"
          } border-t-2`}
        ></div>
      </div>
      {text && <p className={`mt-4 text-sm ${theme === "dark" ? "text-gray-400" : "text-gray-600"}`}>{text}</p>}
    </div>
  )
}

export default LoadingSpinner
