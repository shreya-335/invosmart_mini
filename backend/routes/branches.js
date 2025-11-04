const express = require("express")
const { Branch } = require("../../database/models")
const { requireRole } = require("../middleware/auth")
const router = express.Router()

// Get all branches
router.get("/", async (req, res, next) => {
  try {
    const branches = await Branch.getAll()
    res.json(branches)
  } catch (error) {
    next(error)
  }
})

// Get branch by ID
router.get("/:id", async (req, res, next) => {
  try {
    const { id } = req.params
    const branch = await Branch.findById(id)

    if (!branch) {
      return res.status(404).json({ error: "Branch not found" })
    }

    res.json(branch)
  } catch (error) {
    next(error)
  }
})

// Create new branch (Admin only)
router.post("/", requireRole(["Admin"]), async (req, res, next) => {
  try {
    const { name, address, gst_number, owner_id } = req.body

    const branch = await Branch.create({ name, address, gst_number, owner_id })
    res.status(201).json(branch)
  } catch (error) {
    next(error)
  }
})

// Update branch (Admin only)
router.put("/:id", requireRole(["Admin"]), async (req, res, next) => {
  try {
    const { id } = req.params
    const { name, address, gst_number, owner_id } = req.body

    const branch = await Branch.update(id, { name, address, gst_number, owner_id })
    if (!branch) {
      return res.status(404).json({ error: "Branch not found" })
    }

    res.json(branch)
  } catch (error) {
    next(error)
  }
})

// Delete branch (Admin only)
router.delete("/:id", requireRole(["Admin"]), async (req, res, next) => {
  try {
    const { id } = req.params

    const branch = await Branch.delete(id)
    if (!branch) {
      return res.status(404).json({ error: "Branch not found" })
    }

    res.json({ message: "Branch deleted successfully" })
  } catch (error) {
    next(error)
  }
})

module.exports = router
