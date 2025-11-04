const errorHandler = (err, req, res, next) => {
  console.error("Error:", err)

  // Default error
  const error = {
    message: err.message || "Internal Server Error",
    status: err.status || 500,
  }

  // JWT errors
  if (err.name === "JsonWebTokenError") {
    error.message = "Invalid token"
    error.status = 401
  }

  if (err.name === "TokenExpiredError") {
    error.message = "Token expired"
    error.status = 401
  }

  // Database errors
  if (err.code === "23505") {
    // PostgreSQL unique violation
    error.message = "Resource already exists"
    error.status = 409
  }

  if (err.code === "23503") {
    // PostgreSQL foreign key violation
    error.message = "Referenced resource not found"
    error.status = 400
  }

  // Validation errors
  if (err.name === "ValidationError") {
    error.message = "Validation failed"
    error.status = 400
  }

  res.status(error.status).json({
    error: error.message,
    ...(process.env.NODE_ENV === "development" && { stack: err.stack }),
  })
}

module.exports = errorHandler
