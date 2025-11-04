const express = require("express")
const { Customer } = require("../../database/models")
const { validateCustomer } = require("../middleware/validation")
const router = express.Router()

// Get all customers
router.get("/", async (req, res, next) => {
  try {
    const customers = await Customer.getAll()
    res.json(customers)
  } catch (error) {
    next(error)
  }
})

// Get customer by ID
router.get("/:id", async (req, res, next) => {
  try {
    const { id } = req.params
    const customer = await Customer.findById(id)

    if (!customer) {
      return res.status(404).json({ error: "Customer not found" })
    }

    res.json(customer)
  } catch (error) {
    next(error)
  }
})

// Get customer purchase history
router.get("/:id/history", async (req, res, next) => {
  try {
    const { id } = req.params
    const history = await Customer.getPurchaseHistory(id)
    res.json(history)
  } catch (error) {
    next(error)
  }
})

// Create new customer
router.post("/", validateCustomer, async (req, res, next) => {
  try {
    const { name, phone, email, address, gst_number } = req.body

    const customer = await Customer.create({ name, phone, email, address, gst_number })
    res.status(201).json(customer)
  } catch (error) {
    next(error)
  }
})

// Update customer
router.put("/:id", validateCustomer, async (req, res, next) => {
  try {
    const { id } = req.params
    const { name, phone, email, address, gst_number } = req.body

    const customer = await Customer.update(id, { name, phone, email, address, gst_number })
    if (!customer) {
      return res.status(404).json({ error: "Customer not found" })
    }

    res.json(customer)
  } catch (error) {
    next(error)
  }
})

// Delete customer
router.delete("/:id", async (req, res, next) => {
  try {
    const { id } = req.params

    const customer = await Customer.delete(id)
    if (!customer) {
      return res.status(404).json({ error: "Customer not found" })
    }

    res.json({ message: "Customer deleted successfully" })
  } catch (error) {
    next(error)
  }
})

module.exports = router
