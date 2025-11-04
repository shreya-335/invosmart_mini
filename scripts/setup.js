const fs = require("fs")
const path = require("path")

// Setup script to initialize the project
console.log("🚀 Setting up Business Management System...")

// Create necessary directories
const directories = ["backend/uploads", "backend/logs", "frontend/build"]

directories.forEach((dir) => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true })
    console.log(`✅ Created directory: ${dir}`)
  }
})

// Copy environment file
const envExample = path.join(__dirname, "../backend/.env.example")
const envFile = path.join(__dirname, "../backend/.env")

if (!fs.existsSync(envFile) && fs.existsSync(envExample)) {
  fs.copyFileSync(envExample, envFile)
  console.log("✅ Created .env file from example")
  console.log("⚠️  Please update the .env file with your actual configuration")
}

console.log("\n📋 Next steps:")
console.log("1. Update backend/.env with your PostgreSQL credentials")
console.log("2. Install backend dependencies: cd backend && npm install")
console.log("3. Install frontend dependencies: cd frontend && npm install")
console.log("4. Run database migration: cd backend && npm run migrate")
console.log("5. Start backend: cd backend && npm run dev")
console.log("6. Start frontend: cd frontend && npm start")
console.log("\n🎉 Setup complete!")
