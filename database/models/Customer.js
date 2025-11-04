const db = require("../connection")

class Customer {
  static async create(customerData) {
    const { name, phone, email, address, gst_number } = customerData

    const query = `
      INSERT INTO customers (name, phone, email, address, gst_number)
      VALUES ($1, $2, $3, $4, $5)
      RETURNING *
    `

    const result = await db.query(query, [name, phone, email, address, gst_number])
    return result.rows[0]
  }

  static async getAll() {
    const query = "SELECT * FROM customers ORDER BY created_at DESC"
    const result = await db.query(query)
    return result.rows
  }

  static async findById(id) {
    const query = "SELECT * FROM customers WHERE id = $1"
    const result = await db.query(query, [id])
    return result.rows[0]
  }

  static async update(id, customerData) {
    const { name, phone, email, address, gst_number } = customerData

    const query = `
      UPDATE customers 
      SET name = $1, phone = $2, email = $3, address = $4, gst_number = $5, updated_at = CURRENT_TIMESTAMP
      WHERE id = $6
      RETURNING *
    `

    const result = await db.query(query, [name, phone, email, address, gst_number, id])
    return result.rows[0]
  }

  static async delete(id) {
    const query = "DELETE FROM customers WHERE id = $1 RETURNING id"
    const result = await db.query(query, [id])
    return result.rows[0]
  }

  static async getPurchaseHistory(customerId) {
    const query = `
      SELECT i.*, ii.quantity, ii.price, p.name as product_name
      FROM invoices i
      JOIN invoice_items ii ON i.id = ii.invoice_id
      JOIN products p ON ii.product_id = p.id
      WHERE i.customer_id = $1
      ORDER BY i.date DESC
    `
    const result = await db.query(query, [customerId])
    return result.rows
  }
}

module.exports = Customer
