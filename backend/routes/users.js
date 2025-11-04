const express = require("express")
const { User } = require("../../database/models")
const { requireRole } = require("../middleware/auth")
const { validateUser } = require("../middleware/validation")
const router = express.Router()

// Get all users (Admin only)
router.get("/", requireRole(["Admin"]), async (req, res, next) => {
  try {
    const users = await User.getAll()
    res.json(users)
  } catch (error) {
    next(error)
  }
})

// Get user by ID
router.get("/:id", async (req, res, next) => {
  try {
    const { id } = req.params

    // Users can only view their own profile unless they're admin
    if (req.user.role !== "Admin" && req.user.id !== id) {
      return res.status(403).json({ error: "Access denied" })
    }

    const user = await User.findById(id)
    if (!user) {
      return res.status(404).json({ error: "User not found" })
    }

    // Remove password from response
    delete user.password
    res.json(user)
  } catch (error) {
    next(error)
  }
})

// Update user
router.put("/:id", async (req, res, next) => {
  try {
    const { id } = req.params
    const { name, email, role, branch_id } = req.body

    // Users can only update their own profile unless they're admin
    if (req.user.role !== "Admin" && req.user.id !== id) {
      return res.status(403).json({ error: "Access denied" })
    }

    // Only admin can change roles
    if (req.user.role !== "Admin" && role && role !== req.user.role) {
      return res.status(403).json({ error: "Cannot change role" })
    }

    const user = await User.update(id, { name, email, role, branch_id })
    if (!user) {
      return res.status(404).json({ error: "User not found" })
    }

    res.json(user)
  } catch (error) {
    next(error)
  }
})

// Delete user (Admin only)
router.delete("/:id", requireRole(["Admin"]), async (req, res, next) => {
  try {
    const { id } = req.params

    const user = await User.delete(id)
    if (!user) {
      return res.status(404).json({ error: "User not found" })
    }

    res.json({ message: "User deleted successfully" })
  } catch (error) {
    next(error)
  }
})

module.exports = router
