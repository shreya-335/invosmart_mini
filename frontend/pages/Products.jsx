"use client"

import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { useTheme } from "../context/ThemeContext"
import LoadingSpinner from "../components/LoadingSpinner"

const Products = () => {
  const { theme } = useTheme()
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")

  useEffect(() => {
    fetchProducts()
  }, [])

  const fetchProducts = async () => {
    try {
      const response = await fetch("/api/products", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })

      if (response.ok) {
        const data = await response.json()
        setProducts(data)
      }
    } catch (error) {
      console.error("Failed to fetch products:", error)
      // Mock data for demonstration
      setProducts([
        {
          id: 1,
          name: "Premium Widget",
          hsn_sac_code: "1234",
          price: 100.0,
          gst_rate: 18.0,
          stock: 50,
          created_at: "2024-01-15",
        },
        {
          id: 2,
          name: "Consulting Service",
          hsn_sac_code: "5678",
          price: 200.0,
          gst_rate: 18.0,
          stock: 0,
          created_at: "2024-02-20",
        },
        {
          id: 3,
          name: "Basic Package",
          hsn_sac_code: "9012",
          price: 150.0,
          gst_rate: 12.0,
          stock: 25,
          created_at: "2024-03-10",
        },
      ])
    } finally {
      setLoading(false)
    }
  }

  const filteredProducts = products.filter(
    (product) =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) || product.hsn_sac_code?.includes(searchTerm),
  )

  if (loading) {
    return <LoadingSpinner text="Loading products..." />
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h1 className={`text-2xl font-bold ${theme === "dark" ? "text-white" : "text-gray-900"}`}>
          Products & Services
        </h1>
        <Link
          to="/products/new"
          className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors font-medium"
        >
          Add Product
        </Link>
      </div>

      {/* Search */}
      <div
        className={`backdrop-blur-md rounded-xl border p-6 ${
          theme === "dark" ? "bg-gray-800/50 border-gray-700" : "bg-white/50 border-gray-200"
        }`}
      >
        <div className="max-w-md">
          <label className={`block text-sm font-medium mb-2 ${theme === "dark" ? "text-gray-300" : "text-gray-700"}`}>
            Search Products
          </label>
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search by name or HSN/SAC code..."
            className={`w-full px-4 py-2 rounded-lg border backdrop-blur-sm ${
              theme === "dark"
                ? "bg-gray-700/50 border-gray-600 text-white placeholder-gray-400"
                : "bg-white/50 border-gray-300 text-gray-900 placeholder-gray-500"
            } focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
          />
        </div>
      </div>

      {/* Products Table */}
      <div
        className={`backdrop-blur-md rounded-xl border overflow-hidden ${
          theme === "dark" ? "bg-gray-800/50 border-gray-700" : "bg-white/50 border-gray-200"
        }`}
      >
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className={`${theme === "dark" ? "bg-gray-700/50" : "bg-gray-50/50"}`}>
              <tr>
                <th
                  className={`px-6 py-3 text-left text-xs font-medium uppercase tracking-wider ${
                    theme === "dark" ? "text-gray-300" : "text-gray-500"
                  }`}
                >
                  Product Name
                </th>
                <th
                  className={`px-6 py-3 text-left text-xs font-medium uppercase tracking-wider ${
                    theme === "dark" ? "text-gray-300" : "text-gray-500"
                  }`}
                >
                  HSN/SAC Code
                </th>
                <th
                  className={`px-6 py-3 text-left text-xs font-medium uppercase tracking-wider ${
                    theme === "dark" ? "text-gray-300" : "text-gray-500"
                  }`}
                >
                  Price
                </th>
                <th
                  className={`px-6 py-3 text-left text-xs font-medium uppercase tracking-wider ${
                    theme === "dark" ? "text-gray-300" : "text-gray-500"
                  }`}
                >
                  GST Rate
                </th>
                <th
                  className={`px-6 py-3 text-left text-xs font-medium uppercase tracking-wider ${
                    theme === "dark" ? "text-gray-300" : "text-gray-500"
                  }`}
                >
                  Stock
                </th>
                <th
                  className={`px-6 py-3 text-left text-xs font-medium uppercase tracking-wider ${
                    theme === "dark" ? "text-gray-300" : "text-gray-500"
                  }`}
                >
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              {filteredProducts.map((product) => (
                <tr key={product.id}>
                  <td className={`px-6 py-4 whitespace-nowrap ${theme === "dark" ? "text-white" : "text-gray-900"}`}>
                    <div className="flex items-center">
                      <div
                        className={`w-10 h-10 rounded-lg flex items-center justify-center mr-3 ${
                          theme === "dark" ? "bg-blue-600" : "bg-blue-500"
                        } text-white font-semibold`}
                      >
                        {product.name.charAt(0).toUpperCase()}
                      </div>
                      <div>
                        <div className="font-medium">{product.name}</div>
                        <div className={`text-sm ${theme === "dark" ? "text-gray-400" : "text-gray-500"}`}>
                          Added {new Date(product.created_at).toLocaleDateString()}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className={`px-6 py-4 whitespace-nowrap ${theme === "dark" ? "text-gray-300" : "text-gray-700"}`}>
                    {product.hsn_sac_code}
                  </td>
                  <td className={`px-6 py-4 whitespace-nowrap ${theme === "dark" ? "text-white" : "text-gray-900"}`}>
                    ₹{product.price.toFixed(2)}
                  </td>
                  <td className={`px-6 py-4 whitespace-nowrap ${theme === "dark" ? "text-gray-300" : "text-gray-700"}`}>
                    {product.gst_rate}%
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-2 py-1 text-xs rounded-full ${
                        product.stock > 10
                          ? "bg-green-100 text-green-800"
                          : product.stock > 0
                            ? "bg-yellow-100 text-yellow-800"
                            : "bg-red-100 text-red-800"
                      }`}
                    >
                      {product.stock > 0 ? `${product.stock} units` : "Out of stock"}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex space-x-2">
                      <Link
                        to={`/products/${product.id}/edit`}
                        className="text-blue-500 hover:text-blue-600 text-sm font-medium"
                      >
                        Edit
                      </Link>
                      <button className="text-red-500 hover:text-red-600 text-sm font-medium">Delete</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {filteredProducts.length === 0 && (
        <div
          className={`backdrop-blur-md rounded-xl border p-12 text-center ${
            theme === "dark" ? "bg-gray-800/50 border-gray-700" : "bg-white/50 border-gray-200"
          }`}
        >
          <div className="text-6xl mb-4">📦</div>
          <h3 className={`text-lg font-semibold mb-2 ${theme === "dark" ? "text-white" : "text-gray-900"}`}>
            No products found
          </h3>
          <p className={`${theme === "dark" ? "text-gray-400" : "text-gray-600"} mb-4`}>
            {searchTerm ? "Try adjusting your search terms." : "Get started by adding your first product or service."}
          </p>
          <Link
            to="/products/new"
            className="inline-block px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors font-medium"
          >
            Add Product
          </Link>
        </div>
      )}
    </div>
  )
}

export default Products
