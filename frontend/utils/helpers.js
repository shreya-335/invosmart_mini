// Utility helper functions

// Format currency
export const formatCurrency = (amount, currency = "INR") => {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: currency,
    minimumFractionDigits: 2,
  }).format(amount)
}

// Format date
export const formatDate = (date, format = "short") => {
  const dateObj = new Date(date)

  switch (format) {
    case "short":
      return dateObj.toLocaleDateString("en-IN")
    case "long":
      return dateObj.toLocaleDateString("en-IN", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    case "datetime":
      return dateObj.toLocaleString("en-IN")
    default:
      return dateObj.toLocaleDateString("en-IN")
  }
}

// Validate GST number
export const validateGSTNumber = (gstNumber) => {
  const gstRegex = /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/
  return gstRegex.test(gstNumber)
}

// Validate email
export const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

// Validate phone number (Indian format)
export const validatePhone = (phone) => {
  const phoneRegex = /^(\+91|91|0)?[6789]\d{9}$/
  return phoneRegex.test(phone.replace(/\s|-/g, ""))
}

// Generate invoice number
export const generateInvoiceNumber = () => {
  const today = new Date()
  const year = today.getFullYear()
  const month = String(today.getMonth() + 1).padStart(2, "0")
  const day = String(today.getDate()).padStart(2, "0")
  const timestamp = Date.now().toString().slice(-4)

  return `INV-${year}${month}${day}-${timestamp}`
}

// Calculate GST
export const calculateGST = (amount, gstRate) => {
  const gstAmount = (amount * gstRate) / 100
  return {
    baseAmount: amount,
    gstAmount: gstAmount,
    totalAmount: amount + gstAmount,
  }
}

// Debounce function
export const debounce = (func, wait) => {
  let timeout
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout)
      func(...args)
    }
    clearTimeout(timeout)
    timeout = setTimeout(later, wait)
  }
}

// Deep clone object
export const deepClone = (obj) => {
  return JSON.parse(JSON.stringify(obj))
}

// Generate random ID
export const generateId = () => {
  return Math.random().toString(36).substr(2, 9)
}

// Capitalize first letter
export const capitalize = (str) => {
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase()
}

// Get status color
export const getStatusColor = (status) => {
  const statusColors = {
    paid: "green",
    pending: "yellow",
    overdue: "red",
    cancelled: "gray",
    draft: "blue",
  }

  return statusColors[status.toLowerCase()] || "gray"
}

// Export to CSV
export const exportToCSV = (data, filename) => {
  if (!data.length) return

  const headers = Object.keys(data[0])
  const csvContent = [
    headers.join(","),
    ...data.map((row) => headers.map((header) => `"${row[header] || ""}"`).join(",")),
  ].join("\n")

  const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" })
  const link = document.createElement("a")

  if (link.download !== undefined) {
    const url = URL.createObjectURL(blob)
    link.setAttribute("href", url)
    link.setAttribute("download", `${filename}.csv`)
    link.style.visibility = "hidden"
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }
}

// Local storage helpers
export const storage = {
  get: (key, defaultValue = null) => {
    try {
      const item = localStorage.getItem(key)
      return item ? JSON.parse(item) : defaultValue
    } catch (error) {
      console.error("Error reading from localStorage:", error)
      return defaultValue
    }
  },

  set: (key, value) => {
    try {
      localStorage.setItem(key, JSON.stringify(value))
    } catch (error) {
      console.error("Error writing to localStorage:", error)
    }
  },

  remove: (key) => {
    try {
      localStorage.removeItem(key)
    } catch (error) {
      console.error("Error removing from localStorage:", error)
    }
  },

  clear: () => {
    try {
      localStorage.clear()
    } catch (error) {
      console.error("Error clearing localStorage:", error)
    }
  },
}
