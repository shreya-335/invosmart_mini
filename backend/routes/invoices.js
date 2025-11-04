const express = require("express")
const { Invoice } = require("../../database/models")
const { validateInvoice } = require("../middleware/validation")
const router = express.Router()

// Get all invoices with filters
router.get("/", async (req, res, next) => {
  try {
    const { branch_id, customer_id, start_date, end_date } = req.query

    const filters = {}
    if (branch_id) filters.branch_id = branch_id
    if (customer_id) filters.customer_id = customer_id
    if (start_date) filters.start_date = start_date
    if (end_date) filters.end_date = end_date

    // Non-admin users can only see invoices from their branch
    if (req.user.role !== "Admin") {
      filters.branch_id = req.user.branch_id
    }

    const invoices = await Invoice.getAll(filters)
    res.json(invoices)
  } catch (error) {
    next(error)
  }
})

// Get invoice by ID
router.get("/:id", async (req, res, next) => {
  try {
    const { id } = req.params
    const invoice = await Invoice.findById(id)

    if (!invoice) {
      return res.status(404).json({ error: "Invoice not found" })
    }

    // Non-admin users can only see invoices from their branch
    if (req.user.role !== "Admin" && invoice.branch_id !== req.user.branch_id) {
      return res.status(403).json({ error: "Access denied" })
    }

    res.json(invoice)
  } catch (error) {
    next(error)
  }
})

// Create new invoice
router.post("/", validateInvoice, async (req, res, next) => {
  try {
    const { customer_id, branch_id, date, invoice_type, items } = req.body

    // Non-admin users can only create invoices for their branch
    if (req.user.role !== "Admin" && branch_id !== req.user.branch_id) {
      return res.status(403).json({ error: "Access denied" })
    }

    // Generate invoice number
    const invoice_number = await Invoice.generateInvoiceNumber()

    // Calculate totals
    let total_amount = 0
    let gst_amount = 0

    const processedItems = items.map((item) => {
      const itemTotal = item.quantity * item.price
      const itemGst = invoice_type === "GST" ? (itemTotal * item.gst_rate) / 100 : 0

      total_amount += itemTotal
      gst_amount += itemGst

      return {
        ...item,
        total: itemTotal,
        gst_rate: invoice_type === "GST" ? item.gst_rate : 0,
      }
    })

    const net_amount = total_amount + gst_amount

    const invoiceData = {
      invoice_number,
      customer_id,
      branch_id,
      date,
      total_amount,
      gst_amount,
      net_amount,
      invoice_type,
      created_by: req.user.id,
      items: processedItems,
    }

    const invoice = await Invoice.create(invoiceData)
    res.status(201).json(invoice)
  } catch (error) {
    next(error)
  }
})

// Update invoice
router.put("/:id", async (req, res, next) => {
  try {
    const { id } = req.params
    const { total_amount, gst_amount, net_amount, payment_status } = req.body

    const invoice = await Invoice.update(id, { total_amount, gst_amount, net_amount, payment_status })
    if (!invoice) {
      return res.status(404).json({ error: "Invoice not found" })
    }

    res.json(invoice)
  } catch (error) {
    next(error)
  }
})

// Delete invoice
router.delete("/:id", async (req, res, next) => {
  try {
    const { id } = req.params

    const invoice = await Invoice.delete(id)
    if (!invoice) {
      return res.status(404).json({ error: "Invoice not found" })
    }

    res.json({ message: "Invoice deleted successfully" })
  } catch (error) {
    next(error)
  }
})

// Generate PDF bill (placeholder)
router.post("/:id/generate-bill", async (req, res, next) => {
  try {
    const { id } = req.params

    // This would integrate with a PDF generation library
    // For now, return a placeholder response
    res.json({
      message: "PDF generation initiated",
      download_url: `/api/invoices/${id}/download`,
    })
  } catch (error) {
    next(error)
  }
})

module.exports = router
