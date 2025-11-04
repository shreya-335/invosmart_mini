const express = require("express")
const { User } = require("../../database/models")
const { generateToken } = require("../middleware/auth")
const { validateUser } = require("../middleware/validation")
const router = express.Router()

// Register new user
router.post("/register", validateUser, async (req, res, next) => {
  try {
    const { name, email, password, role, branch_id } = req.body

    // Check if user already exists
    const existingUser = await User.findByEmail(email)
    if (existingUser) {
      return res.status(409).json({ error: "User already exists" })
    }

    // Create new user
    const user = await User.create({ name, email, password, role, branch_id })
    const token = generateToken(user)

    res.status(201).json({
      message: "User created successfully",
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        branch_id: user.branch_id,
      },
      token,
    })
  } catch (error) {
    next(error)
  }
})

// Login user
router.post("/login", async (req, res, next) => {
  try {
    const { email, password } = req.body

    if (!email || !password) {
      return res.status(400).json({ error: "Email and password required" })
    }

    // Find user by email
    const user = await User.findByEmail(email)
    if (!user) {
      return res.status(401).json({ error: "Invalid credentials" })
    }

    // Verify password
    const isValidPassword = await User.verifyPassword(password, user.password)
    if (!isValidPassword) {
      return res.status(401).json({ error: "Invalid credentials" })
    }

    // Generate token
    const token = generateToken(user)

    res.json({
      message: "Login successful",
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        branch_id: user.branch_id,
      },
      token,
    })
  } catch (error) {
    next(error)
  }
})

// Logout (client-side token removal)
router.post("/logout", (req, res) => {
  res.json({ message: "Logout successful" })
})

module.exports = router
