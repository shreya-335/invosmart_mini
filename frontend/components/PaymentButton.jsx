"use client"

import { useState } from "react"
import { useTheme } from "../context/ThemeContext"

const PaymentButton = ({ invoice, onPaymentSuccess }) => {
  const { theme } = useTheme()
  const [isProcessing, setIsProcessing] = useState(false)
  const [selectedMethod, setSelectedMethod] = useState("")
  const [showModal, setShowModal] = useState(false)

  const paymentMethods = [
    { id: "UPI", name: "UPI", icon: "📱" },
    { id: "Card", name: "Credit/Debit Card", icon: "💳" },
    { id: "Cash", name: "Cash", icon: "💵" },
    { id: "Wallet", name: "Digital Wallet", icon: "👛" },
    { id: "Bank Transfer", name: "Bank Transfer", icon: "🏦" },
  ]

  const handlePayment = async (method) => {
    setIsProcessing(true)
    setSelectedMethod(method)

    try {
      // Simulate payment processing
      if (method === "Cash") {
        // For cash payments, mark as completed immediately
        setTimeout(() => {
          onPaymentSuccess({
            method,
            status: "success",
            transaction_id: `CASH_${Date.now()}`,
          })
          setIsProcessing(false)
          setShowModal(false)
        }, 1000)
      } else {
        // For digital payments, simulate gateway integration
        const response = await fetch("/api/payments/initiate", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify({
            invoice_id: invoice.id,
            method,
            amount: invoice.net_amount,
          }),
        })

        const data = await response.json()

        // Simulate successful payment after 2 seconds
        setTimeout(() => {
          onPaymentSuccess({
            method,
            status: "success",
            transaction_id: data.payment_id,
          })
          setIsProcessing(false)
          setShowModal(false)
        }, 2000)
      }
    } catch (error) {
      console.error("Payment failed:", error)
      setIsProcessing(false)
    }
  }

  return (
    <>
      <button
        onClick={() => setShowModal(true)}
        className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors font-medium"
      >
        Process Payment
      </button>

      {/* Payment Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div
            className={`max-w-md w-full mx-4 rounded-xl backdrop-blur-md border ${
              theme === "dark" ? "bg-gray-800/90 border-gray-700" : "bg-white/90 border-gray-200"
            }`}
          >
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className={`text-lg font-semibold ${theme === "dark" ? "text-white" : "text-gray-900"}`}>
                  Process Payment
                </h3>
                <button
                  onClick={() => setShowModal(false)}
                  disabled={isProcessing}
                  className={`p-2 rounded-lg ${
                    theme === "dark" ? "text-gray-300 hover:bg-gray-700" : "text-gray-700 hover:bg-gray-100"
                  } disabled:opacity-50`}
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              {/* Invoice Details */}
              <div className={`p-4 rounded-lg mb-6 ${theme === "dark" ? "bg-gray-700/50" : "bg-gray-50/50"}`}>
                <div className="flex justify-between items-center">
                  <div>
                    <p className={`text-sm ${theme === "dark" ? "text-gray-300" : "text-gray-600"}`}>
                      Invoice: {invoice.invoice_number}
                    </p>
                    <p className={`text-sm ${theme === "dark" ? "text-gray-300" : "text-gray-600"}`}>
                      Customer: {invoice.customer_name}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className={`text-2xl font-bold ${theme === "dark" ? "text-white" : "text-gray-900"}`}>
                      ₹{invoice.net_amount?.toFixed(2)}
                    </p>
                  </div>
                </div>
              </div>

              {/* Payment Methods */}
              <div className="space-y-3">
                <h4 className={`text-sm font-medium ${theme === "dark" ? "text-gray-300" : "text-gray-700"}`}>
                  Select Payment Method
                </h4>

                {paymentMethods.map((method) => (
                  <button
                    key={method.id}
                    onClick={() => handlePayment(method.id)}
                    disabled={isProcessing}
                    className={`w-full flex items-center justify-between p-3 rounded-lg border transition-colors ${
                      isProcessing && selectedMethod === method.id
                        ? "bg-blue-500 text-white border-blue-500"
                        : theme === "dark"
                          ? "bg-gray-700/50 border-gray-600 text-gray-300 hover:bg-gray-600"
                          : "bg-white/50 border-gray-200 text-gray-700 hover:bg-gray-50"
                    } disabled:opacity-50`}
                  >
                    <div className="flex items-center">
                      <span className="text-2xl mr-3">{method.icon}</span>
                      <span className="font-medium">{method.name}</span>
                    </div>

                    {isProcessing && selectedMethod === method.id && (
                      <div className="flex items-center">
                        <svg className="animate-spin h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24">
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                          ></circle>
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                          ></path>
                        </svg>
                        Processing...
                      </div>
                    )}
                  </button>
                ))}
              </div>

              {isProcessing && (
                <div
                  className={`mt-4 p-3 rounded-lg ${
                    theme === "dark" ? "bg-blue-900/50 text-blue-300" : "bg-blue-50 text-blue-700"
                  }`}
                >
                  <p className="text-sm">Processing payment via {selectedMethod}...</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default PaymentButton
