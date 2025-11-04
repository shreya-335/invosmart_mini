const express = require("express")
const { Product } = require("../../database/models")
const { validateProduct } = require("../middleware/validation")
const router = express.Router()

// Get all products
router.get("/", async (req, res, next) => {
  try {
    const products = await Product.getAll()
    res.json(products)
  } catch (error) {
    next(error)
  }
})

// Get product by ID
router.get("/:id", async (req, res, next) => {
  try {
    const { id } = req.params
    const product = await Product.findById(id)

    if (!product) {
      return res.status(404).json({ error: "Product not found" })
    }

    res.json(product)
  } catch (error) {
    next(error)
  }
})

// Create new product
router.post("/", validateProduct, async (req, res, next) => {
  try {
    const { name, hsn_sac_code, price, gst_rate, stock } = req.body

    const product = await Product.create({ name, hsn_sac_code, price, gst_rate, stock })
    res.status(201).json(product)
  } catch (error) {
    next(error)
  }
})

// Update product
router.put("/:id", validateProduct, async (req, res, next) => {
  try {
    const { id } = req.params
    const { name, hsn_sac_code, price, gst_rate, stock } = req.body

    const product = await Product.update(id, { name, hsn_sac_code, price, gst_rate, stock })
    if (!product) {
      return res.status(404).json({ error: "Product not found" })
    }

    res.json(product)
  } catch (error) {
    next(error)
  }
})

// Delete product
router.delete("/:id", async (req, res, next) => {
  try {
    const { id } = req.params

    const product = await Product.delete(id)
    if (!product) {
      return res.status(404).json({ error: "Product not found" })
    }

    res.json({ message: "Product deleted successfully" })
  } catch (error) {
    next(error)
  }
})

module.exports = router
