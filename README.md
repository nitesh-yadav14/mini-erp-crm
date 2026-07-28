# Mini ERP + CRM Operations Portal

A full-stack ERP & CRM web application developed as part of the Fundsroom Infotech Full Stack Developer Case Study. The project is designed to simplify day-to-day business operations by providing a centralized platform for customer management, inventory tracking, product administration, and sales challan processing.

The application follows a modular architecture with a React-based frontend and a RESTful backend built using Node.js, Express, and TypeScript. Prisma ORM and PostgreSQL are used for data persistence, while JWT authentication secures access to protected resources. The user interface is responsive, intuitive, and optimized for internal business users.

---

# Project Highlights

- Secure JWT-based Authentication
- User Registration & Login
- Customer Relationship Management (CRM)
- Product & Inventory Management
- Inventory Movement Tracking
- Sales Challan Management
- Dashboard Analytics
- PDF Challan Generation
- Responsive Admin Dashboard
- RESTful API Architecture
- PostgreSQL Database with Prisma ORM

---

# Technology Stack

### Frontend

- React
- TypeScript
- Vite
- Tailwind CSS
- React Router DOM
- Axios
- Recharts
- Lucide React
- React Hot Toast

### Backend

- Node.js
- Express.js
- TypeScript
- Prisma ORM
- PostgreSQL
- JWT Authentication
- bcrypt
- Express Validator

### Database

- PostgreSQL (Neon)

### Development Tools

- Git & GitHub
- VS Code
- Postman
- Prisma Studio

---

# Application Modules

## Authentication

- User Registration
- Secure Login
- JWT Authentication
- Password Encryption
- Protected Routes

---

## Dashboard

The dashboard provides a quick overview of business activities by displaying:

- Total Customers
- Total Products
- Inventory Summary
- Sales Challans
- Monthly Activity Chart

---

## Customer Management

- Create Customer
- Update Customer
- Delete Customer
- Search Customers
- Customer Details
- Business Information
- GST Information
- Customer Status

---

## Product Management

- Add Products
- Edit Products
- Delete Products
- Product Search
- SKU Management
- Warehouse Information
- Low Stock Indicators

---

## Inventory Management

- Inventory Logs
- Stock Movement History
- Product Availability
- Stock Updates

---

## Sales Challans

- Create Sales Challans
- Multiple Product Selection
- Customer Selection
- Automatic Challan Number
- Draft / Confirmed / Cancelled Status
- Download Challan as PDF

---

# 📁 Project Structure

```
mini-erp-crm/
│
├── backend/
│   ├── prisma/
│   │   └── schema.prisma
│   │
│   ├── src/
│   │   ├── config/
│   │   │   └── prisma.ts
│   │   │
│   │   ├── controllers/
│   │   │   ├── auth.controller.ts
│   │   │   ├── challan.controller.ts
│   │   │   ├── customer.controller.ts
│   │   │   ├── dashboard.controller.ts
│   │   │   ├── inventory.controller.ts
│   │   │   └── product.controller.ts
│   │   │
│   │   ├── middleware/
│   │   │   ├── auth.middleware.ts
│   │   │   ├── error.middleware.ts
│   │   │   └── role.middleware.ts
│   │   │
│   │   ├── routes/
│   │   │   ├── auth.routes.ts
│   │   │   ├── challan.routes.ts
│   │   │   ├── customer.routes.ts
│   │   │   ├── dashboard.routes.ts
│   │   │   ├── inventory.routes.ts
│   │   │   └── product.routes.ts
│   │   │
│   │   ├── services/
│   │   │   ├── auth.service.ts
│   │   │   ├── challan.service.ts
│   │   │   ├── customer.service.ts
│   │   │   ├── dashboard.service.ts
│   │   │   ├── inventory.service.ts
│   │   │   └── product.service.ts
│   │   │
│   │   ├── validators/
│   │   │   ├── auth.validator.ts
│   │   │   ├── challan.validator.ts
│   │   │   ├── customer.validator.ts
│   │   │   └── product.validator.ts
│   │   │
│   │   ├── utils/
│   │   │   ├── ApiError.ts
│   │   │   ├── ApiResponse.ts
│   │   │   └── jwt.ts
│   │   │
│   │   ├── types/
│   │   │   └── express.d.ts
│   │   │
│   │   ├── app.ts
│   │   └── server.ts
│   │
│   ├── package.json
│   ├── tsconfig.json
│   └── .gitignore
│
├── frontend/
│   ├── public/
│   │   ├── favicon.svg
│   │   └── icons.svg
│   │
│   ├── src/
│   │   ├── api/
│   │   │   └── axios.ts
│   │   │
│   │   ├── components/
│   │   │   ├── Button.tsx
│   │   │   ├── Card.tsx
│   │   │   ├── ChallanForm.tsx
│   │   │   ├── CustomerForm.tsx
│   │   │   ├── DashboardCard.tsx
│   │   │   ├── DataTable.tsx
│   │   │   ├── EmptyState.tsx
│   │   │   ├── Input.tsx
│   │   │   ├── InventoryForm.tsx
│   │   │   ├── Modal.tsx
│   │   │   ├── Navbar.tsx
│   │   │   ├── ProductForm.tsx
│   │   │   ├── ProtectedRoute.tsx
│   │   │   ├── Sidebar.tsx
│   │   │   ├── Skeleton.tsx
│   │   │   └── StockForm.tsx
│   │   │
│   │   ├── dashboard/
│   │   │   ├── DashboardChart.tsx
│   │   │   ├── DashboardCard.tsx
│   │   │   ├── LowStockCard.tsx
│   │   │   ├── RecentChallans.tsx
│   │   │   ├── RecentMovements.tsx
│   │   │   └── StatsRow.tsx
│   │   │
│   │   ├── layouts/
│   │   │   └── DashboardLayout.tsx
│   │   │
│   │   ├── pages/
│   │   │   ├── Login.tsx
│   │   │   ├── Register.tsx
│   │   │   ├── Dashboard.tsx
│   │   │   ├── Customers.tsx
│   │   │   ├── Products.tsx
│   │   │   ├── Inventory.tsx
│   │   │   └── Challans.tsx
│   │   │
│   │   ├── routes/
│   │   │   └── AppRoutes.tsx
│   │   │
│   │   ├── services/
│   │   │   ├── auth.service.ts
│   │   │   ├── customer.service.ts
│   │   │   ├── product.service.ts
│   │   │   ├── inventory.service.ts
│   │   │   ├── challan.service.ts
│   │   │   └── dashboard.service.ts
│   │   │
│   │   ├── context/
│   │   │   └── AuthContext.tsx
│   │   │
│   │   ├── types/
│   │   │   ├── customer.ts
│   │   │   ├── product.ts
│   │   │   ├── inventory.ts
│   │   │   └── challan.ts
│   │   │
│   │   ├── utils/
│   │   │   ├── generateChallanPDF.ts
│   │   │   └── token.ts
│   │   │
│   │   ├── App.tsx
│   │   ├── main.tsx
│   │   └── index.css
│   │
│   ├── package.json
│   ├── vite.config.ts
│   └── tsconfig.json
│
├── README.md
├── LICENSE
└── .gitignore

---

# Getting Started

## Clone the Repository

```bash
git clone https://github.com/<your-username>/mini-erp-crm.git

cd mini-erp-crm
```

---

## Backend Setup

```bash
cd backend

npm install
```

Create a `.env` file inside the backend directory.

```env
DATABASE_URL=your_database_url

JWT_SECRET=your_secret_key

PORT=5000
```

Generate Prisma Client

```bash
npx prisma generate
```

Run Database Migrations

```bash
npx prisma migrate dev
```

Start Backend Server

```bash
npm run dev
```

---

## Frontend Setup

```bash
cd frontend

npm install
```

Create a `.env` file.

```env
VITE_API_URL=http://localhost:5000/api
```

Start the development server.

```bash
npm run dev
```

The application will be available at

```
http://localhost:5173
```

---

# Environment Variables

## Backend

| Variable | Description |
|----------|-------------|
| DATABASE_URL | PostgreSQL Connection String |
| JWT_SECRET | Secret key used for JWT authentication |
| PORT | Backend server port |

## Frontend

| Variable | Description |
|----------|-------------|
| VITE_API_URL | Base URL of the backend API |

---

# REST API Overview

## Authentication

```
POST /api/auth/register

POST /api/auth/login
```

## Customers

```
GET /api/customers

POST /api/customers

PUT /api/customers/:id

DELETE /api/customers/:id
```

## Products

```
GET /api/products

POST /api/products

PUT /api/products/:id

DELETE /api/products/:id
```

## Inventory

```
GET /api/inventory

POST /api/inventory
```

## Challans

```
GET /api/challans

POST /api/challans

PATCH /api/challans/:id/confirm

PATCH /api/challans/:id/cancel
```

## Dashboard

```
GET /api/dashboard
```

---

# Database Design

The application uses PostgreSQL with Prisma ORM.

Core entities include:

- Users
- Customers
- Products
- Inventory
- Challans
- Challan Items

Relationships are managed through Prisma to ensure data consistency and maintainability.

---

# Security

- JWT Authentication
- Password Hashing using bcrypt
- Protected Routes
- Input Validation
- Centralized Error Handling
- Environment Variable Configuration

---

# Deployment

The project is deployment-ready and can be hosted using:

- **Frontend:** Vercel
- **Backend:** Render
- **Database:** Neon PostgreSQL

---

# Future Improvements

- Role-Based Access Control
- Purchase Order Module
- Invoice Management
- Email Notifications
- Docker Support
- CI/CD Pipeline
- AWS S3 Image Upload
- Multi-Warehouse Support

---

# Known Limitations

- Purchase Order workflow is not implemented.
- Invoice management is outside the current project scope.
- Advanced role permissions can be expanded further.

---

# Author

**Nitesh Yadav**

B.Tech Computer Science & Engineering  
KIIT University

My Portfolio: https://nitesh-yadav14-github-io.onrender.com/#projects

GitHub: [https://github.com/<your-username>](https://github.com/nitesh-yadav14)

LinkedIn: [https://linkedin.com/in/<your-linkedin>](https://www.linkedin.com/in/nitesh-yadav14/)

Email: <yadav.nitesh1009@gmail.com>
