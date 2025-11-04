"use client"

import { useState } from "react"
import { useTheme } from "../context/ThemeContext"

const LanguageSwitcher = () => {
  const { theme } = useTheme()
  const [selectedLanguage, setSelectedLanguage] = useState("en")

  const languages = [
    { code: "en", name: "English", flag: "🇺🇸" },
    { code: "hi", name: "हिंदी", flag: "🇮🇳" },
    { code: "mr", name: "मराठी", flag: "🇮🇳" },
    { code: "gu", name: "ગુજરાતી", flag: "🇮🇳" },
  ]

  const handleLanguageChange = (languageCode) => {
    setSelectedLanguage(languageCode)
    // Store language preference
    localStorage.setItem("selectedLanguage", languageCode)
    // Trigger app-wide language change event
    window.dispatchEvent(new CustomEvent("languageChanged", { detail: languageCode }))
  }

  return (
    <div className="relative">
      <select
        value={selectedLanguage}
        onChange={(e) => handleLanguageChange(e.target.value)}
        className={`px-3 py-2 rounded-lg border backdrop-blur-sm text-sm ${
          theme === "dark" ? "bg-gray-700/50 border-gray-600 text-white" : "bg-white/50 border-gray-300 text-gray-900"
        } focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
      >
        {languages.map((language) => (
          <option key={language.code} value={language.code}>
            {language.flag} {language.name}
          </option>
        ))}
      </select>
    </div>
  )
}

export default LanguageSwitcher
