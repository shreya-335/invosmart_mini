const db = require("../connection")

class Branch {
  static async create(branchData) {
    const { name, address, gst_number, owner_id } = branchData

    const query = `
      INSERT INTO branches (name, address, gst_number, owner_id)
      VALUES ($1, $2, $3, $4)
      RETURNING *
    `

    const result = await db.query(query, [name, address, gst_number, owner_id])
    return result.rows[0]
  }

  static async getAll() {
    const query = `
      SELECT b.*, u.name as owner_name
      FROM branches b
      LEFT JOIN users u ON b.owner_id = u.id
      ORDER BY b.created_at DESC
    `
    const result = await db.query(query)
    return result.rows
  }

  static async findById(id) {
    const query = `
      SELECT b.*, u.name as owner_name
      FROM branches b
      LEFT JOIN users u ON b.owner_id = u.id
      WHERE b.id = $1
    `
    const result = await db.query(query, [id])
    return result.rows[0]
  }

  static async update(id, branchData) {
    const { name, address, gst_number, owner_id } = branchData

    const query = `
      UPDATE branches 
      SET name = $1, address = $2, gst_number = $3, owner_id = $4, updated_at = CURRENT_TIMESTAMP
      WHERE id = $5
      RETURNING *
    `

    const result = await db.query(query, [name, address, gst_number, owner_id, id])
    return result.rows[0]
  }

  static async delete(id) {
    const query = "DELETE FROM branches WHERE id = $1 RETURNING id"
    const result = await db.query(query, [id])
    return result.rows[0]
  }
}

module.exports = Branch
