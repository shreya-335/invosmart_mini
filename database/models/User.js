const db = require("../connection")
const bcrypt = require("bcrypt")

class User {
  static async create(userData) {
    const { name, email, password, role, branch_id } = userData
    const hashedPassword = await bcrypt.hash(password, 10)

    const query = `
      INSERT INTO users (name, email, password, role, branch_id)
      VALUES ($1, $2, $3, $4, $5)
      RETURNING id, name, email, role, branch_id, created_at
    `

    const result = await db.query(query, [name, email, hashedPassword, role, branch_id])
    return result.rows[0]
  }

  static async findByEmail(email) {
    const query = "SELECT * FROM users WHERE email = $1"
    const result = await db.query(query, [email])
    return result.rows[0]
  }

  static async findById(id) {
    const query = `
      SELECT u.*, b.name as branch_name 
      FROM users u 
      LEFT JOIN branches b ON u.branch_id = b.id 
      WHERE u.id = $1
    `
    const result = await db.query(query, [id])
    return result.rows[0]
  }

  static async getAll() {
    const query = `
      SELECT u.id, u.name, u.email, u.role, u.created_at, b.name as branch_name
      FROM users u 
      LEFT JOIN branches b ON u.branch_id = b.id
      ORDER BY u.created_at DESC
    `
    const result = await db.query(query)
    return result.rows
  }

  static async update(id, userData) {
    const { name, email, role, branch_id } = userData
    const query = `
      UPDATE users 
      SET name = $1, email = $2, role = $3, branch_id = $4, updated_at = CURRENT_TIMESTAMP
      WHERE id = $5
      RETURNING id, name, email, role, branch_id, updated_at
    `

    const result = await db.query(query, [name, email, role, branch_id, id])
    return result.rows[0]
  }

  static async delete(id) {
    const query = "DELETE FROM users WHERE id = $1 RETURNING id"
    const result = await db.query(query, [id])
    return result.rows[0]
  }

  static async verifyPassword(plainPassword, hashedPassword) {
    return await bcrypt.compare(plainPassword, hashedPassword)
  }
}

module.exports = User
