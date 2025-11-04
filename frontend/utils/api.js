// API utility functions for making HTTP requests

const API_BASE_URL = process.env.REACT_APP_API_URL || "http://localhost:5000/api"

// Get auth token from localStorage
const getAuthToken = () => {
  return localStorage.getItem("token")
}

// Create headers with auth token
const createHeaders = (contentType = "application/json") => {
  const headers = {
    "Content-Type": contentType,
  }

  const token = getAuthToken()
  if (token) {
    headers.Authorization = `Bearer ${token}`
  }

  return headers
}

// Generic API request function
const apiRequest = async (endpoint, options = {}) => {
  const url = `${API_BASE_URL}${endpoint}`
  const config = {
    headers: createHeaders(),
    ...options,
  }

  try {
    const response = await fetch(url, config)
    const data = await response.json()

    if (!response.ok) {
      throw new Error(data.error || `HTTP error! status: ${response.status}`)
    }

    return data
  } catch (error) {
    console.error("API request failed:", error)
    throw error
  }
}

// API methods
export const api = {
  // Auth endpoints
  auth: {
    login: (credentials) =>
      apiRequest("/auth/login", {
        method: "POST",
        body: JSON.stringify(credentials),
      }),
    register: (userData) =>
      apiRequest("/auth/register", {
        method: "POST",
        body: JSON.stringify(userData),
      }),
    logout: () => apiRequest("/auth/logout", { method: "POST" }),
  },

  // Users endpoints
  users: {
    getAll: () => apiRequest("/users"),
    getById: (id) => apiRequest(`/users/${id}`),
    update: (id, userData) =>
      apiRequest(`/users/${id}`, {
        method: "PUT",
        body: JSON.stringify(userData),
      }),
    delete: (id) => apiRequest(`/users/${id}`, { method: "DELETE" }),
  },

  // Branches endpoints
  branches: {
    getAll: () => apiRequest("/branches"),
    getById: (id) => apiRequest(`/branches/${id}`),
    create: (branchData) =>
      apiRequest("/branches", {
        method: "POST",
        body: JSON.stringify(branchData),
      }),
    update: (id, branchData) =>
      apiRequest(`/branches/${id}`, {
        method: "PUT",
        body: JSON.stringify(branchData),
      }),
    delete: (id) => apiRequest(`/branches/${id}`, { method: "DELETE" }),
  },

  // Customers endpoints
  customers: {
    getAll: () => apiRequest("/customers"),
    getById: (id) => apiRequest(`/customers/${id}`),
    create: (customerData) =>
      apiRequest("/customers", {
        method: "POST",
        body: JSON.stringify(customerData),
      }),
    update: (id, customerData) =>
      apiRequest(`/customers/${id}`, {
        method: "PUT",
        body: JSON.stringify(customerData),
      }),
    delete: (id) => apiRequest(`/customers/${id}`, { method: "DELETE" }),
    getHistory: (id) => apiRequest(`/customers/${id}/history`),
  },

  // Products endpoints
  products: {
    getAll: () => apiRequest("/products"),
    getById: (id) => apiRequest(`/products/${id}`),
    create: (productData) =>
      apiRequest("/products", {
        method: "POST",
        body: JSON.stringify(productData),
      }),
    update: (id, productData) =>
      apiRequest(`/products/${id}`, {
        method: "PUT",
        body: JSON.stringify(productData),
      }),
    delete: (id) => apiRequest(`/products/${id}`, { method: "DELETE" }),
  },

  // Invoices endpoints
  invoices: {
    getAll: (filters = {}) => {
      const queryParams = new URLSearchParams(filters).toString()
      return apiRequest(`/invoices${queryParams ? `?${queryParams}` : ""}`)
    },
    getById: (id) => apiRequest(`/invoices/${id}`),
    create: (invoiceData) =>
      apiRequest("/invoices", {
        method: "POST",
        body: JSON.stringify(invoiceData),
      }),
    update: (id, invoiceData) =>
      apiRequest(`/invoices/${id}`, {
        method: "PUT",
        body: JSON.stringify(invoiceData),
      }),
    delete: (id) => apiRequest(`/invoices/${id}`, { method: "DELETE" }),
    generateBill: (id) =>
      apiRequest(`/invoices/${id}/generate-bill`, {
        method: "POST",
      }),
  },

  // Payments endpoints
  payments: {
    initiate: (paymentData) =>
      apiRequest("/payments/initiate", {
        method: "POST",
        body: JSON.stringify(paymentData),
      }),
    getStatus: (invoiceId) => apiRequest(`/payments/${invoiceId}`),
  },

  // Reports endpoints
  reports: {
    salesTrends: (params = {}) => {
      const queryParams = new URLSearchParams(params).toString()
      return apiRequest(`/reports/sales-trends${queryParams ? `?${queryParams}` : ""}`)
    },
    customerPatterns: () => apiRequest("/reports/customer-patterns"),
    expenses: (params = {}) => {
      const queryParams = new URLSearchParams(params).toString()
      return apiRequest(`/reports/expenses${queryParams ? `?${queryParams}` : ""}`)
    },
    gstr1: (params = {}) => {
      const queryParams = new URLSearchParams(params).toString()
      return apiRequest(`/reports/gstr-1${queryParams ? `?${queryParams}` : ""}`)
    },
    gstr3b: (params = {}) => {
      const queryParams = new URLSearchParams(params).toString()
      return apiRequest(`/reports/gstr-3b${queryParams ? `?${queryParams}` : ""}`)
    },
  },

  // Backups endpoints
  backups: {
    createManual: () => apiRequest("/backups/manual", { method: "POST" }),
    getLatest: () => apiRequest("/backups/latest"),
  },
}

export default api
