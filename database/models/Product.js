const db = require("../connection")

class Product {
  static async create(productData) {
    const { name, hsn_sac_code, price, gst_rate, stock } = productData

    const query = `
      INSERT INTO products (name, hsn_sac_code, price, gst_rate, stock)
      VALUES ($1, $2, $3, $4, $5)
      RETURNING *
    `

    const result = await db.query(query, [name, hsn_sac_code, price, gst_rate, stock])
    return result.rows[0]
  }

  static async getAll() {
    const query = "SELECT * FROM products ORDER BY created_at DESC"
    const result = await db.query(query)
    return result.rows
  }

  static async findById(id) {
    const query = "SELECT * FROM products WHERE id = $1"
    const result = await db.query(query, [id])
    return result.rows[0]
  }

  static async update(id, productData) {
    const { name, hsn_sac_code, price, gst_rate, stock } = productData

    const query = `
      UPDATE products 
      SET name = $1, hsn_sac_code = $2, price = $3, gst_rate = $4, stock = $5, updated_at = CURRENT_TIMESTAMP
      WHERE id = $6
      RETURNING *
    `

    const result = await db.query(query, [name, hsn_sac_code, price, gst_rate, stock, id])
    return result.rows[0]
  }

  static async delete(id) {
    const query = "DELETE FROM products WHERE id = $1 RETURNING id"
    const result = await db.query(query, [id])
    return result.rows[0]
  }

  static async updateStock(id, quantity) {
    const query = `
      UPDATE products 
      SET stock = stock - $1, updated_at = CURRENT_TIMESTAMP
      WHERE id = $2 AND stock >= $1
      RETURNING *
    `

    const result = await db.query(query, [quantity, id])
    return result.rows[0]
  }
}

module.exports = Product
