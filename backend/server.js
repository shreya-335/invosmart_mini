const express = require("express")
const cors = require("cors")
const helmet = require("helmet")
const morgan = require("morgan")
const rateLimit = require("express-rate-limit")
require("dotenv").config()

// Import routes
const authRoutes = require("./routes/auth")
const userRoutes = require("./routes/users")
const branchRoutes = require("./routes/branches")
const customerRoutes = require("./routes/customers")
const invoiceRoutes = require("./routes/invoices")
const productRoutes = require("./routes/products")
const paymentRoutes = require("./routes/payments")
const reportRoutes = require("./routes/reports")
const backupRoutes = require("./routes/backups")

// Import middleware
const errorHandler = require("./middleware/errorHandler")
const { authenticateToken } = require("./middleware/auth")

const app = express()
const PORT = process.env.PORT || 5000

// Security middleware
app.use(helmet())
app.use(
  cors({
    origin: process.env.FRONTEND_URL || "http://localhost:3000",
    credentials: true,
  }),
)

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  message: "Too many requests from this IP, please try again later.",
})
app.use(limiter)

// Body parsing middleware
app.use(express.json({ limit: "10mb" }))
app.use(express.urlencoded({ extended: true }))

// Logging middleware
app.use(morgan("combined"))

// Health check endpoint
app.get("/health", (req, res) => {
  res.status(200).json({
    status: "OK",
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
  })
})

// API routes
app.use("/api/auth", authRoutes)
app.use("/api/users", authenticateToken, userRoutes)
app.use("/api/branches", authenticateToken, branchRoutes)
app.use("/api/customers", authenticateToken, customerRoutes)
app.use("/api/invoices", authenticateToken, invoiceRoutes)
app.use("/api/products", authenticateToken, productRoutes)
app.use("/api/payments", authenticateToken, paymentRoutes)
app.use("/api/reports", authenticateToken, reportRoutes)
app.use("/api/backups", authenticateToken, backupRoutes)

// 404 handler
app.use("*", (req, res) => {
  res.status(404).json({ error: "Route not found" })
})

// Global error handler
app.use(errorHandler)

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
  console.log(`Environment: ${process.env.NODE_ENV || "development"}`)
})

module.exports = app
