const db = require("../connection")

class Invoice {
  static async create(invoiceData) {
    const {
      invoice_number,
      customer_id,
      branch_id,
      date,
      total_amount,
      gst_amount,
      net_amount,
      invoice_type,
      created_by,
      items,
    } = invoiceData

    const client = await db.pool.connect()

    try {
      await client.query("BEGIN")

      // Create invoice
      const invoiceQuery = `
        INSERT INTO invoices (invoice_number, customer_id, branch_id, date, total_amount, gst_amount, net_amount, invoice_type, created_by)
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
        RETURNING *
      `

      const invoiceResult = await client.query(invoiceQuery, [
        invoice_number,
        customer_id,
        branch_id,
        date,
        total_amount,
        gst_amount,
        net_amount,
        invoice_type,
        created_by,
      ])

      const invoice = invoiceResult.rows[0]

      // Create invoice items
      for (const item of items) {
        const itemQuery = `
          INSERT INTO invoice_items (invoice_id, product_id, quantity, price, gst_rate, total)
          VALUES ($1, $2, $3, $4, $5, $6)
        `

        await client.query(itemQuery, [
          invoice.id,
          item.product_id,
          item.quantity,
          item.price,
          item.gst_rate,
          item.total,
        ])
      }

      await client.query("COMMIT")
      return invoice
    } catch (error) {
      await client.query("ROLLBACK")
      throw error
    } finally {
      client.release()
    }
  }

  static async getAll(filters = {}) {
    let query = `
      SELECT i.*, c.name as customer_name, b.name as branch_name, u.name as created_by_name
      FROM invoices i
      JOIN customers c ON i.customer_id = c.id
      JOIN branches b ON i.branch_id = b.id
      JOIN users u ON i.created_by = u.id
      WHERE 1=1
    `

    const params = []
    let paramCount = 0

    if (filters.branch_id) {
      paramCount++
      query += ` AND i.branch_id = $${paramCount}`
      params.push(filters.branch_id)
    }

    if (filters.customer_id) {
      paramCount++
      query += ` AND i.customer_id = $${paramCount}`
      params.push(filters.customer_id)
    }

    if (filters.start_date) {
      paramCount++
      query += ` AND i.date >= $${paramCount}`
      params.push(filters.start_date)
    }

    if (filters.end_date) {
      paramCount++
      query += ` AND i.date <= $${paramCount}`
      params.push(filters.end_date)
    }

    query += " ORDER BY i.date DESC"

    const result = await db.query(query, params)
    return result.rows
  }

  static async findById(id) {
    const query = `
      SELECT i.*, c.name as customer_name, c.address as customer_address, c.gst_number as customer_gst,
             b.name as branch_name, b.address as branch_address, b.gst_number as branch_gst,
             u.name as created_by_name
      FROM invoices i
      JOIN customers c ON i.customer_id = c.id
      JOIN branches b ON i.branch_id = b.id
      JOIN users u ON i.created_by = u.id
      WHERE i.id = $1
    `

    const result = await db.query(query, [id])

    if (result.rows.length === 0) return null

    const invoice = result.rows[0]

    // Get invoice items
    const itemsQuery = `
      SELECT ii.*, p.name as product_name, p.hsn_sac_code
      FROM invoice_items ii
      JOIN products p ON ii.product_id = p.id
      WHERE ii.invoice_id = $1
    `

    const itemsResult = await db.query(itemsQuery, [id])
    invoice.items = itemsResult.rows

    return invoice
  }

  static async update(id, invoiceData) {
    const { total_amount, gst_amount, net_amount, payment_status } = invoiceData

    const query = `
      UPDATE invoices 
      SET total_amount = $1, gst_amount = $2, net_amount = $3, payment_status = $4, updated_at = CURRENT_TIMESTAMP
      WHERE id = $5
      RETURNING *
    `

    const result = await db.query(query, [total_amount, gst_amount, net_amount, payment_status, id])
    return result.rows[0]
  }

  static async delete(id) {
    const query = "DELETE FROM invoices WHERE id = $1 RETURNING id"
    const result = await db.query(query, [id])
    return result.rows[0]
  }

  static async generateInvoiceNumber() {
    const query = "SELECT COUNT(*) as count FROM invoices WHERE date = CURRENT_DATE"
    const result = await db.query(query)
    const count = Number.parseInt(result.rows[0].count) + 1
    const today = new Date().toISOString().slice(0, 10).replace(/-/g, "")
    return `INV-${today}-${count.toString().padStart(4, "0")}`
  }
}

module.exports = Invoice
