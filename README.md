# Business Management System

A comprehensive full-stack business management application built with React, Node.js, Express, and PostgreSQL.

## Features

### 🏢 Multi-Branch Support
- Manage multiple business locations
- Branch-specific data and reporting
- Role-based access control

### 📄 Invoice Management
- Create GST and Non-GST invoices
- Dynamic line items with automatic calculations
- PDF generation and e-way bill support
- Payment tracking and status management

### 👥 Customer Management
- Complete customer database
- Purchase history tracking
- GST number validation
- Customer analytics

### 📦 Product & Service Catalog
- Inventory management
- HSN/SAC code support
- Stock tracking
- Pricing management

### 💳 Payment Processing
- Multiple payment methods (UPI, Card, Cash, Wallet, Bank Transfer)
- Payment gateway integration ready
- Transaction tracking
- Payment status monitoring

### 📊 Reports & Analytics
- Sales trends and analytics
- Customer buying patterns
- Expense tracking
- GSTR-1 and GSTR-3B report generation
- Interactive charts and visualizations

### 🔐 Security & Access Control
- JWT-based authentication
- Role-based permissions (Admin, Accountant, Sales)
- Secure API endpoints
- Data encryption

### 🎨 Modern UI/UX
- Glassmorphism design
- Dark/Light mode support
- Multi-language support (English, Hindi, Marathi, Gujarati)
- Responsive design
- Mobile-friendly interface

## Tech Stack

### Frontend
- **React 18** - Modern React with hooks
- **React Router** - Client-side routing
- **Tailwind CSS** - Utility-first CSS framework
- **Recharts** - Interactive charts and graphs
- **Context API** - State management

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web application framework
- **PostgreSQL** - Relational database
- **JWT** - Authentication tokens
- **bcrypt** - Password hashing
- **Express Validator** - Input validation

### Database
- **PostgreSQL** - Primary database
- **UUID** - Primary keys
- **Indexes** - Optimized queries
- **Triggers** - Automatic timestamps
- **Foreign Keys** - Data integrity

## Project Structure

\`\`\`
business-management-system/
├── frontend/                 # React frontend application
│   ├── components/          # Reusable React components
│   ├── pages/              # Page components
│   ├── context/            # React context providers
│   ├── utils/              # Utility functions
│   └── public/             # Static assets
├── backend/                 # Express.js backend API
│   ├── routes/             # API route handlers
│   ├── middleware/         # Custom middleware
│   └── server.js           # Main server file
└── database/               # Database schema and models
    ├── models/             # Database models
    ├── schema.sql          # Database schema
    └── seed.sql            # Sample data
\`\`\`

## Installation & Setup

### Prerequisites
- Node.js (v16 or higher)
- PostgreSQL (v12 or higher)
- npm or yarn

### Database Setup
1. Create a PostgreSQL database:
\`\`\`sql
CREATE DATABASE business_management;
\`\`\`

2. Run the schema setup:
\`\`\`bash
psql -d business_management -f database/schema.sql
\`\`\`

3. (Optional) Add sample data:
\`\`\`bash
psql -d business_management -f database/seed.sql
\`\`\`

### Backend Setup
1. Navigate to the backend directory:
\`\`\`bash
cd backend
\`\`\`

2. Install dependencies:
\`\`\`bash
npm install
\`\`\`

3. Create environment file:
\`\`\`bash
cp .env.example .env
\`\`\`

4. Update the `.env` file with your database credentials and JWT secret.

5. Start the backend server:
\`\`\`bash
npm run dev
\`\`\`

The backend will run on `http://localhost:5000`

### Frontend Setup
1. Navigate to the frontend directory:
\`\`\`bash
cd frontend
\`\`\`

2. Install dependencies:
\`\`\`bash
npm install
\`\`\`

3. Start the development server:
\`\`\`bash
npm start
\`\`\`

The frontend will run on `http://localhost:3000`

## Environment Variables

### Backend (.env)
\`\`\`env
# Database Configuration
DB_HOST=localhost
DB_PORT=5432
DB_NAME=business_management
DB_USER=postgres
DB_PASSWORD=your_password

# JWT Configuration
JWT_SECRET=your-super-secret-jwt-key
JWT_EXPIRES_IN=24h

# Server Configuration
PORT=5000
NODE_ENV=development
FRONTEND_URL=http://localhost:3000
\`\`\`

### Frontend (.env)
\`\`\`env
REACT_APP_API_URL=http://localhost:5000/api
\`\`\`

## API Endpoints

### Authentication
- `POST /api/auth/login` - User login
- `POST /api/auth/register` - User registration
- `POST /api/auth/logout` - User logout

### Users
- `GET /api/users` - Get all users (Admin only)
- `GET /api/users/:id` - Get user by ID
- `PUT /api/users/:id` - Update user
- `DELETE /api/users/:id` - Delete user (Admin only)

### Branches
- `GET /api/branches` - Get all branches
- `POST /api/branches` - Create branch (Admin only)
- `PUT /api/branches/:id` - Update branch (Admin only)
- `DELETE /api/branches/:id` - Delete branch (Admin only)

### Customers
- `GET /api/customers` - Get all customers
- `POST /api/customers` - Create customer
- `PUT /api/customers/:id` - Update customer
- `DELETE /api/customers/:id` - Delete customer
- `GET /api/customers/:id/history` - Get purchase history

### Products
- `GET /api/products` - Get all products
- `POST /api/products` - Create product
- `PUT /api/products/:id` - Update product
- `DELETE /api/products/:id` - Delete product

### Invoices
- `GET /api/invoices` - Get all invoices (with filters)
- `POST /api/invoices` - Create invoice
- `GET /api/invoices/:id` - Get invoice by ID
- `PUT /api/invoices/:id` - Update invoice
- `DELETE /api/invoices/:id` - Delete invoice
- `POST /api/invoices/:id/generate-bill` - Generate PDF bill

### Payments
- `POST /api/payments/initiate` - Initiate payment
- `POST /api/payments/webhook` - Payment webhook
- `GET /api/payments/:invoiceId` - Get payment status

### Reports
- `GET /api/reports/sales-trends` - Sales trends report
- `GET /api/reports/customer-patterns` - Customer analytics
- `GET /api/reports/expenses` - Expense reports
- `GET /api/reports/gstr-1` - GSTR-1 report
- `GET /api/reports/gstr-3b` - GSTR-3B report

## Features in Detail

### Role-Based Access Control
- **Admin**: Full system access, user management, all reports
- **Accountant**: Financial data, reports, invoice management
- **Sales**: Customer management, invoice creation, basic reports

### Invoice System
- Automatic invoice numbering
- GST calculations
- Multiple tax rates support
- Line item management
- Payment status tracking

### Reporting System
- Real-time analytics
- Interactive charts
- Export capabilities
- GST compliance reports
- Custom date ranges

### Multi-Language Support
- English (default)
- Hindi
- Marathi
- Gujarati
- Easy to add more languages

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Support

For support and questions, please open an issue in the GitHub repository.
