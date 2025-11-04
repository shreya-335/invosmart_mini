const express = require("express")
const db = require("../../database/connection")
const { requireRole } = require("../middleware/auth")
const router = express.Router()

// Sales trends report
router.get("/sales-trends", async (req, res, next) => {
  try {
    const { period = "monthly", branch_id } = req.query

    let dateFormat = "YYYY-MM"
    if (period === "daily") dateFormat = "YYYY-MM-DD"
    if (period === "weekly") dateFormat = "YYYY-WW"

    let query = `
      SELECT 
        TO_CHAR(date, '${dateFormat}') as period,
        COUNT(*) as invoice_count,
        SUM(net_amount) as total_sales,
        AVG(net_amount) as avg_invoice_value
      FROM invoices
      WHERE 1=1
    `

    const params = []
    let paramCount = 0

    if (branch_id) {
      paramCount++
      query += ` AND branch_id = $${paramCount}`
      params.push(branch_id)
    }

    // Non-admin users can only see their branch data
    if (req.user.role !== "Admin") {
      paramCount++
      query += ` AND branch_id = $${paramCount}`
      params.push(req.user.branch_id)
    }

    query += ` GROUP BY TO_CHAR(date, '${dateFormat}') ORDER BY period DESC LIMIT 12`

    const result = await db.query(query, params)
    res.json(result.rows)
  } catch (error) {
    next(error)
  }
})

// Customer buying patterns
router.get("/customer-patterns", async (req, res, next) => {
  try {
    const query = `
      SELECT 
        c.name as customer_name,
        COUNT(i.id) as total_invoices,
        SUM(i.net_amount) as total_spent,
        AVG(i.net_amount) as avg_invoice_value,
        MAX(i.date) as last_purchase
      FROM customers c
      JOIN invoices i ON c.id = i.customer_id
      WHERE ($1::uuid IS NULL OR i.branch_id = $1)
      GROUP BY c.id, c.name
      ORDER BY total_spent DESC
      LIMIT 20
    `

    const branch_id = req.user.role === "Admin" ? null : req.user.branch_id
    const result = await db.query(query, [branch_id])
    res.json(result.rows)
  } catch (error) {
    next(error)
  }
})

// Expense tracking
router.get("/expenses", async (req, res, next) => {
  try {
    const { start_date, end_date } = req.query

    let query = `
      SELECT 
        category,
        SUM(amount) as total_amount,
        COUNT(*) as expense_count,
        AVG(amount) as avg_amount
      FROM expenses
      WHERE ($1::uuid IS NULL OR branch_id = $1)
    `

    const params = [req.user.role === "Admin" ? null : req.user.branch_id]
    let paramCount = 1

    if (start_date) {
      paramCount++
      query += ` AND date >= $${paramCount}`
      params.push(start_date)
    }

    if (end_date) {
      paramCount++
      query += ` AND date <= $${paramCount}`
      params.push(end_date)
    }

    query += ` GROUP BY category ORDER BY total_amount DESC`

    const result = await db.query(query, params)
    res.json(result.rows)
  } catch (error) {
    next(error)
  }
})

// GSTR-1 report (placeholder)
router.get("/gstr-1", requireRole(["Admin", "Accountant"]), async (req, res, next) => {
  try {
    const { month, year } = req.query

    // This would generate actual GSTR-1 format data
    const gstrData = {
      period: `${month}/${year}`,
      b2b_invoices: [],
      b2c_invoices: [],
      total_taxable_value: 0,
      total_tax_amount: 0,
    }

    res.json(gstrData)
  } catch (error) {
    next(error)
  }
})

// GSTR-3B report (placeholder)
router.get("/gstr-3b", requireRole(["Admin", "Accountant"]), async (req, res, next) => {
  try {
    const { month, year } = req.query

    // This would generate actual GSTR-3B format data
    const gstr3bData = {
      period: `${month}/${year}`,
      outward_supplies: 0,
      inward_supplies: 0,
      tax_liability: 0,
      tax_paid: 0,
    }

    res.json(gstr3bData)
  } catch (error) {
    next(error)
  }
})

module.exports = router
