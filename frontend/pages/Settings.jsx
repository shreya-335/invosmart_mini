"use client"

import { useState } from "react"
import { useTheme } from "../context/ThemeContext"
import { useAuth } from "../context/AuthContext"
import RoleGuard from "../components/RoleGuard"

const Settings = () => {
  const { theme } = useTheme()
  const { user } = useAuth()
  const [activeTab, setActiveTab] = useState("profile")
  const [businessProfile, setBusinessProfile] = useState({
    businessName: "My Business",
    gstNumber: "22AAAAA0000A1Z5",
    address: "123 Business Street, City, State 12345",
    phone: "+91-9876543210",
    email: "business@example.com",
  })

  const tabs = [
    { id: "profile", name: "Business Profile", icon: "🏢" },
    { id: "preferences", name: "Preferences", icon: "⚙️" },
    { id: "backup", name: "Backup & Security", icon: "🔒", roles: ["Admin"] },
    { id: "integrations", name: "Integrations", icon: "🔗", roles: ["Admin"] },
  ]

  const handleSave = () => {
    // Save settings logic
    console.log("Settings saved")
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <h1 className={`text-2xl font-bold ${theme === "dark" ? "text-white" : "text-gray-900"}`}>Settings</h1>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Sidebar */}
        <div
          className={`backdrop-blur-md rounded-xl border p-4 h-fit ${
            theme === "dark" ? "bg-gray-800/50 border-gray-700" : "bg-white/50 border-gray-200"
          }`}
        >
          <nav className="space-y-2">
            {tabs.map((tab) => (
              <RoleGuard key={tab.id} allowedRoles={tab.roles || ["Admin", "Accountant", "Sales"]}>
                <button
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full flex items-center px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                    activeTab === tab.id
                      ? theme === "dark"
                        ? "bg-blue-600 text-white"
                        : "bg-blue-500 text-white"
                      : theme === "dark"
                        ? "text-gray-300 hover:bg-gray-700"
                        : "text-gray-700 hover:bg-gray-100"
                  }`}
                >
                  <span className="mr-3">{tab.icon}</span>
                  {tab.name}
                </button>
              </RoleGuard>
            ))}
          </nav>
        </div>

        {/* Content */}
        <div className="lg:col-span-3">
          <div
            className={`backdrop-blur-md rounded-xl border p-6 ${
              theme === "dark" ? "bg-gray-800/50 border-gray-700" : "bg-white/50 border-gray-200"
            }`}
          >
            {activeTab === "profile" && (
              <div className="space-y-6">
                <h2 className={`text-xl font-semibold ${theme === "dark" ? "text-white" : "text-gray-900"}`}>
                  Business Profile
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label
                      className={`block text-sm font-medium mb-2 ${theme === "dark" ? "text-gray-300" : "text-gray-700"}`}
                    >
                      Business Name
                    </label>
                    <input
                      type="text"
                      value={businessProfile.businessName}
                      onChange={(e) => setBusinessProfile((prev) => ({ ...prev, businessName: e.target.value }))}
                      className={`w-full px-3 py-2 rounded-lg border backdrop-blur-sm ${
                        theme === "dark"
                          ? "bg-gray-700/50 border-gray-600 text-white"
                          : "bg-white/50 border-gray-300 text-gray-900"
                      } focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
                    />
                  </div>

                  <div>
                    <label
                      className={`block text-sm font-medium mb-2 ${theme === "dark" ? "text-gray-300" : "text-gray-700"}`}
                    >
                      GST Number
                    </label>
                    <input
                      type="text"
                      value={businessProfile.gstNumber}
                      onChange={(e) => setBusinessProfile((prev) => ({ ...prev, gstNumber: e.target.value }))}
                      className={`w-full px-3 py-2 rounded-lg border backdrop-blur-sm ${
                        theme === "dark"
                          ? "bg-gray-700/50 border-gray-600 text-white"
                          : "bg-white/50 border-gray-300 text-gray-900"
                      } focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label
                      className={`block text-sm font-medium mb-2 ${theme === "dark" ? "text-gray-300" : "text-gray-700"}`}
                    >
                      Address
                    </label>
                    <textarea
                      value={businessProfile.address}
                      onChange={(e) => setBusinessProfile((prev) => ({ ...prev, address: e.target.value }))}
                      rows={3}
                      className={`w-full px-3 py-2 rounded-lg border backdrop-blur-sm ${
                        theme === "dark"
                          ? "bg-gray-700/50 border-gray-600 text-white"
                          : "bg-white/50 border-gray-300 text-gray-900"
                      } focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
                    />
                  </div>

                  <div>
                    <label
                      className={`block text-sm font-medium mb-2 ${theme === "dark" ? "text-gray-300" : "text-gray-700"}`}
                    >
                      Phone
                    </label>
                    <input
                      type="tel"
                      value={businessProfile.phone}
                      onChange={(e) => setBusinessProfile((prev) => ({ ...prev, phone: e.target.value }))}
                      className={`w-full px-3 py-2 rounded-lg border backdrop-blur-sm ${
                        theme === "dark"
                          ? "bg-gray-700/50 border-gray-600 text-white"
                          : "bg-white/50 border-gray-300 text-gray-900"
                      } focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
                    />
                  </div>

                  <div>
                    <label
                      className={`block text-sm font-medium mb-2 ${theme === "dark" ? "text-gray-300" : "text-gray-700"}`}
                    >
                      Email
                    </label>
                    <input
                      type="email"
                      value={businessProfile.email}
                      onChange={(e) => setBusinessProfile((prev) => ({ ...prev, email: e.target.value }))}
                      className={`w-full px-3 py-2 rounded-lg border backdrop-blur-sm ${
                        theme === "dark"
                          ? "bg-gray-700/50 border-gray-600 text-white"
                          : "bg-white/50 border-gray-300 text-gray-900"
                      } focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
                    />
                  </div>
                </div>
              </div>
            )}

            {activeTab === "preferences" && (
              <div className="space-y-6">
                <h2 className={`text-xl font-semibold ${theme === "dark" ? "text-white" : "text-gray-900"}`}>
                  Preferences
                </h2>

                <div className="space-y-4">
                  <div>
                    <h3 className={`text-lg font-medium mb-3 ${theme === "dark" ? "text-white" : "text-gray-900"}`}>
                      Appearance
                    </h3>
                    <div className="space-y-2">
                      <label className="flex items-center">
                        <input type="radio" name="theme" value="light" className="mr-2" />
                        <span className={theme === "dark" ? "text-gray-300" : "text-gray-700"}>Light Mode</span>
                      </label>
                      <label className="flex items-center">
                        <input type="radio" name="theme" value="dark" className="mr-2" />
                        <span className={theme === "dark" ? "text-gray-300" : "text-gray-700"}>Dark Mode</span>
                      </label>
                      <label className="flex items-center">
                        <input type="radio" name="theme" value="system" className="mr-2" />
                        <span className={theme === "dark" ? "text-gray-300" : "text-gray-700"}>System Default</span>
                      </label>
                    </div>
                  </div>

                  <div>
                    <h3 className={`text-lg font-medium mb-3 ${theme === "dark" ? "text-white" : "text-gray-900"}`}>
                      Language
                    </h3>
                    <select
                      className={`w-full max-w-xs px-3 py-2 rounded-lg border backdrop-blur-sm ${
                        theme === "dark"
                          ? "bg-gray-700/50 border-gray-600 text-white"
                          : "bg-white/50 border-gray-300 text-gray-900"
                      } focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
                    >
                      <option value="en">English</option>
                      <option value="hi">हिंदी</option>
                      <option value="mr">मराठी</option>
                      <option value="gu">ગુજરાતી</option>
                    </select>
                  </div>

                  <div>
                    <h3 className={`text-lg font-medium mb-3 ${theme === "dark" ? "text-white" : "text-gray-900"}`}>
                      Notifications
                    </h3>
                    <div className="space-y-2">
                      <label className="flex items-center">
                        <input type="checkbox" className="mr-2" defaultChecked />
                        <span className={theme === "dark" ? "text-gray-300" : "text-gray-700"}>
                          Email notifications for new invoices
                        </span>
                      </label>
                      <label className="flex items-center">
                        <input type="checkbox" className="mr-2" defaultChecked />
                        <span className={theme === "dark" ? "text-gray-300" : "text-gray-700"}>
                          SMS alerts for payment reminders
                        </span>
                      </label>
                      <label className="flex items-center">
                        <input type="checkbox" className="mr-2" />
                        <span className={theme === "dark" ? "text-gray-300" : "text-gray-700"}>
                          Weekly sales reports
                        </span>
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "backup" && (
              <RoleGuard allowedRoles={["Admin"]}>
                <div className="space-y-6">
                  <h2 className={`text-xl font-semibold ${theme === "dark" ? "text-white" : "text-gray-900"}`}>
                    Backup & Security
                  </h2>

                  <div className="space-y-4">
                    <div>
                      <h3 className={`text-lg font-medium mb-3 ${theme === "dark" ? "text-white" : "text-gray-900"}`}>
                        Data Backup
                      </h3>
                      <div className="flex space-x-4">
                        <button className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors">
                          Create Manual Backup
                        </button>
                        <button
                          className={`px-4 py-2 rounded-lg border transition-colors ${
                            theme === "dark"
                              ? "bg-gray-700/50 border-gray-600 text-gray-300 hover:bg-gray-600"
                              : "bg-gray-50/50 border-gray-300 text-gray-700 hover:bg-gray-100"
                          }`}
                        >
                          Download Latest Backup
                        </button>
                      </div>
                    </div>

                    <div>
                      <h3 className={`text-lg font-medium mb-3 ${theme === "dark" ? "text-white" : "text-gray-900"}`}>
                        Automatic Backups
                      </h3>
                      <div className="space-y-2">
                        <label className="flex items-center">
                          <input type="checkbox" className="mr-2" defaultChecked />
                          <span className={theme === "dark" ? "text-gray-300" : "text-gray-700"}>Daily backups</span>
                        </label>
                        <label className="flex items-center">
                          <input type="checkbox" className="mr-2" defaultChecked />
                          <span className={theme === "dark" ? "text-gray-300" : "text-gray-700"}>Weekly backups</span>
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
              </RoleGuard>
            )}

            {activeTab === "integrations" && (
              <RoleGuard allowedRoles={["Admin"]}>
                <div className="space-y-6">
                  <h2 className={`text-xl font-semibold ${theme === "dark" ? "text-white" : "text-gray-900"}`}>
                    Integrations
                  </h2>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {[
                      { name: "Razorpay", status: "Connected", icon: "💳" },
                      { name: "Paytm", status: "Not Connected", icon: "📱" },
                      { name: "Google Drive", status: "Connected", icon: "☁️" },
                      { name: "WhatsApp Business", status: "Not Connected", icon: "💬" },
                    ].map((integration, index) => (
                      <div
                        key={index}
                        className={`p-4 rounded-lg border ${
                          theme === "dark" ? "bg-gray-700/30 border-gray-600" : "bg-gray-50/50 border-gray-200"
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center">
                            <span className="text-2xl mr-3">{integration.icon}</span>
                            <div>
                              <h4 className={`font-medium ${theme === "dark" ? "text-white" : "text-gray-900"}`}>
                                {integration.name}
                              </h4>
                              <p
                                className={`text-sm ${
                                  integration.status === "Connected" ? "text-green-500" : "text-gray-500"
                                }`}
                              >
                                {integration.status}
                              </p>
                            </div>
                          </div>
                          <button
                            className={`px-3 py-1 rounded text-sm font-medium ${
                              integration.status === "Connected"
                                ? "bg-red-500 text-white hover:bg-red-600"
                                : "bg-blue-500 text-white hover:bg-blue-600"
                            } transition-colors`}
                          >
                            {integration.status === "Connected" ? "Disconnect" : "Connect"}
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </RoleGuard>
            )}

            {/* Save Button */}
            <div className="mt-8 flex justify-end">
              <button
                onClick={handleSave}
                className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors font-medium"
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Settings
