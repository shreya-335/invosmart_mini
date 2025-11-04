"use client"

import { useState, useEffect } from "react"
import { useTheme } from "../context/ThemeContext"

const InvoiceForm = ({ onSubmit, initialData = null, customers = [], products = [] }) => {
  const { theme } = useTheme()
  const [formData, setFormData] = useState({
    customer_id: "",
    date: new Date().toISOString().split("T")[0],
    invoice_type: "GST",
    items: [{ product_id: "", quantity: 1, price: 0, gst_rate: 18 }],
  })

  useEffect(() => {
    if (initialData) {
      setFormData(initialData)
    }
  }, [initialData])

  const addItem = () => {
    setFormData((prev) => ({
      ...prev,
      items: [...prev.items, { product_id: "", quantity: 1, price: 0, gst_rate: 18 }],
    }))
  }

  const removeItem = (index) => {
    setFormData((prev) => ({
      ...prev,
      items: prev.items.filter((_, i) => i !== index),
    }))
  }

  const updateItem = (index, field, value) => {
    setFormData((prev) => ({
      ...prev,
      items: prev.items.map((item, i) => (i === index ? { ...item, [field]: value } : item)),
    }))
  }

  const handleProductChange = (index, productId) => {
    const product = products.find((p) => p.id === productId)
    if (product) {
      updateItem(index, "product_id", productId)
      updateItem(index, "price", product.price)
      updateItem(index, "gst_rate", product.gst_rate)
    }
  }

  const calculateTotals = () => {
    let totalAmount = 0
    let gstAmount = 0

    formData.items.forEach((item) => {
      const itemTotal = item.quantity * item.price
      const itemGst = formData.invoice_type === "GST" ? (itemTotal * item.gst_rate) / 100 : 0
      totalAmount += itemTotal
      gstAmount += itemGst
    })

    return {
      totalAmount,
      gstAmount,
      netAmount: totalAmount + gstAmount,
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const totals = calculateTotals()
    onSubmit({
      ...formData,
      ...totals,
    })
  }

  const totals = calculateTotals()

  return (
    <div
      className={`backdrop-blur-md rounded-xl border p-6 ${
        theme === "dark" ? "bg-gray-800/50 border-gray-700" : "bg-white/50 border-gray-200"
      }`}
    >
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Invoice Header */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className={`block text-sm font-medium mb-2 ${theme === "dark" ? "text-gray-300" : "text-gray-700"}`}>
              Customer
            </label>
            <select
              value={formData.customer_id}
              onChange={(e) => setFormData((prev) => ({ ...prev, customer_id: e.target.value }))}
              required
              className={`w-full px-3 py-2 rounded-lg border backdrop-blur-sm ${
                theme === "dark"
                  ? "bg-gray-700/50 border-gray-600 text-white"
                  : "bg-white/50 border-gray-300 text-gray-900"
              } focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
            >
              <option value="">Select Customer</option>
              {customers.map((customer) => (
                <option key={customer.id} value={customer.id}>
                  {customer.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className={`block text-sm font-medium mb-2 ${theme === "dark" ? "text-gray-300" : "text-gray-700"}`}>
              Date
            </label>
            <input
              type="date"
              value={formData.date}
              onChange={(e) => setFormData((prev) => ({ ...prev, date: e.target.value }))}
              required
              className={`w-full px-3 py-2 rounded-lg border backdrop-blur-sm ${
                theme === "dark"
                  ? "bg-gray-700/50 border-gray-600 text-white"
                  : "bg-white/50 border-gray-300 text-gray-900"
              } focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
            />
          </div>
        </div>

        {/* Invoice Type */}
        <div>
          <label className={`block text-sm font-medium mb-2 ${theme === "dark" ? "text-gray-300" : "text-gray-700"}`}>
            Invoice Type
          </label>
          <div className="flex space-x-4">
            {["GST", "Non-GST"].map((type) => (
              <label key={type} className="flex items-center">
                <input
                  type="radio"
                  value={type}
                  checked={formData.invoice_type === type}
                  onChange={(e) => setFormData((prev) => ({ ...prev, invoice_type: e.target.value }))}
                  className="mr-2 text-blue-500"
                />
                <span className={theme === "dark" ? "text-gray-300" : "text-gray-700"}>{type}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Invoice Items */}
        <div>
          <div className="flex justify-between items-center mb-4">
            <h3 className={`text-lg font-medium ${theme === "dark" ? "text-white" : "text-gray-900"}`}>Items</h3>
            <button
              type="button"
              onClick={addItem}
              className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
            >
              Add Item
            </button>
          </div>

          <div className="space-y-4">
            {formData.items.map((item, index) => (
              <div
                key={index}
                className={`p-4 rounded-lg border ${
                  theme === "dark" ? "bg-gray-700/30 border-gray-600" : "bg-gray-50/50 border-gray-200"
                }`}
              >
                <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                  <div className="md:col-span-2">
                    <label
                      className={`block text-sm font-medium mb-1 ${
                        theme === "dark" ? "text-gray-300" : "text-gray-700"
                      }`}
                    >
                      Product
                    </label>
                    <select
                      value={item.product_id}
                      onChange={(e) => handleProductChange(index, e.target.value)}
                      required
                      className={`w-full px-3 py-2 rounded-lg border backdrop-blur-sm ${
                        theme === "dark"
                          ? "bg-gray-700/50 border-gray-600 text-white"
                          : "bg-white/50 border-gray-300 text-gray-900"
                      } focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
                    >
                      <option value="">Select Product</option>
                      {products.map((product) => (
                        <option key={product.id} value={product.id}>
                          {product.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label
                      className={`block text-sm font-medium mb-1 ${
                        theme === "dark" ? "text-gray-300" : "text-gray-700"
                      }`}
                    >
                      Quantity
                    </label>
                    <input
                      type="number"
                      min="1"
                      value={item.quantity}
                      onChange={(e) => updateItem(index, "quantity", Number.parseInt(e.target.value))}
                      required
                      className={`w-full px-3 py-2 rounded-lg border backdrop-blur-sm ${
                        theme === "dark"
                          ? "bg-gray-700/50 border-gray-600 text-white"
                          : "bg-white/50 border-gray-300 text-gray-900"
                      } focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
                    />
                  </div>

                  <div>
                    <label
                      className={`block text-sm font-medium mb-1 ${
                        theme === "dark" ? "text-gray-300" : "text-gray-700"
                      }`}
                    >
                      Price
                    </label>
                    <input
                      type="number"
                      step="0.01"
                      min="0"
                      value={item.price}
                      onChange={(e) => updateItem(index, "price", Number.parseFloat(e.target.value))}
                      required
                      className={`w-full px-3 py-2 rounded-lg border backdrop-blur-sm ${
                        theme === "dark"
                          ? "bg-gray-700/50 border-gray-600 text-white"
                          : "bg-white/50 border-gray-300 text-gray-900"
                      } focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
                    />
                  </div>

                  <div className="flex items-end">
                    <button
                      type="button"
                      onClick={() => removeItem(index)}
                      disabled={formData.items.length === 1}
                      className="w-full px-3 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    >
                      Remove
                    </button>
                  </div>
                </div>

                {formData.invoice_type === "GST" && (
                  <div className="mt-3">
                    <label
                      className={`block text-sm font-medium mb-1 ${
                        theme === "dark" ? "text-gray-300" : "text-gray-700"
                      }`}
                    >
                      GST Rate (%)
                    </label>
                    <input
                      type="number"
                      step="0.01"
                      min="0"
                      max="100"
                      value={item.gst_rate}
                      onChange={(e) => updateItem(index, "gst_rate", Number.parseFloat(e.target.value))}
                      className={`w-32 px-3 py-2 rounded-lg border backdrop-blur-sm ${
                        theme === "dark"
                          ? "bg-gray-700/50 border-gray-600 text-white"
                          : "bg-white/50 border-gray-300 text-gray-900"
                      } focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
                    />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Totals */}
        <div
          className={`p-4 rounded-lg border ${
            theme === "dark" ? "bg-gray-700/30 border-gray-600" : "bg-gray-50/50 border-gray-200"
          }`}
        >
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className={theme === "dark" ? "text-gray-300" : "text-gray-700"}>Subtotal:</span>
              <span className={theme === "dark" ? "text-white" : "text-gray-900"}>
                ₹{totals.totalAmount.toFixed(2)}
              </span>
            </div>
            {formData.invoice_type === "GST" && (
              <div className="flex justify-between">
                <span className={theme === "dark" ? "text-gray-300" : "text-gray-700"}>GST:</span>
                <span className={theme === "dark" ? "text-white" : "text-gray-900"}>
                  ₹{totals.gstAmount.toFixed(2)}
                </span>
              </div>
            )}
            <div
              className={`flex justify-between text-lg font-semibold pt-2 border-t ${
                theme === "dark" ? "border-gray-600 text-white" : "border-gray-200 text-gray-900"
              }`}
            >
              <span>Total:</span>
              <span>₹{totals.netAmount.toFixed(2)}</span>
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <div className="flex justify-end">
          <button
            type="submit"
            className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors font-medium"
          >
            {initialData ? "Update Invoice" : "Create Invoice"}
          </button>
        </div>
      </form>
    </div>
  )
}

export default InvoiceForm
