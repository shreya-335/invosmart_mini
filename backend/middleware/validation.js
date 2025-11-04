const { body, param, query, validationResult } = require("express-validator")

// Handle validation errors
const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(400).json({
      error: "Validation failed",
      details: errors.array(),
    })
  }
  next()
}

// User validation rules
const validateUser = [
  body("name").trim().isLength({ min: 2, max: 255 }).withMessage("Name must be 2-255 characters"),
  body("email").isEmail().normalizeEmail().withMessage("Valid email required"),
  body("password").isLength({ min: 6 }).withMessage("Password must be at least 6 characters"),
  body("role").isIn(["Admin", "Accountant", "Sales"]).withMessage("Invalid role"),
  handleValidationErrors,
]

// Customer validation rules
const validateCustomer = [
  body("name").trim().isLength({ min: 2, max: 255 }).withMessage("Name must be 2-255 characters"),
  body("phone").optional().isMobilePhone().withMessage("Valid phone number required"),
  body("email").optional().isEmail().normalizeEmail().withMessage("Valid email required"),
  body("gst_number")
    .optional()
    .matches(/^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/)
    .withMessage("Invalid GST number format"),
  handleValidationErrors,
]

// Product validation rules
const validateProduct = [
  body("name").trim().isLength({ min: 2, max: 255 }).withMessage("Product name must be 2-255 characters"),
  body("price").isFloat({ min: 0 }).withMessage("Price must be a positive number"),
  body("gst_rate").isFloat({ min: 0, max: 100 }).withMessage("GST rate must be between 0-100"),
  body("stock").optional().isInt({ min: 0 }).withMessage("Stock must be a non-negative integer"),
  handleValidationErrors,
]

// Invoice validation rules
const validateInvoice = [
  body("customer_id").isUUID().withMessage("Valid customer ID required"),
  body("branch_id").isUUID().withMessage("Valid branch ID required"),
  body("date").isISO8601().withMessage("Valid date required"),
  body("invoice_type").isIn(["GST", "Non-GST"]).withMessage("Invalid invoice type"),
  body("items").isArray({ min: 1 }).withMessage("At least one item required"),
  body("items.*.product_id").isUUID().withMessage("Valid product ID required"),
  body("items.*.quantity").isInt({ min: 1 }).withMessage("Quantity must be at least 1"),
  body("items.*.price").isFloat({ min: 0 }).withMessage("Price must be positive"),
  handleValidationErrors,
]

// Payment validation rules
const validatePayment = [
  body("invoice_id").isUUID().withMessage("Valid invoice ID required"),
  body("method").isIn(["UPI", "Card", "Cash", "Wallet", "Bank Transfer"]).withMessage("Invalid payment method"),
  body("amount").isFloat({ min: 0 }).withMessage("Amount must be positive"),
  handleValidationErrors,
]

module.exports = {
  validateUser,
  validateCustomer,
  validateProduct,
  validateInvoice,
  validatePayment,
  handleValidationErrors,
}
