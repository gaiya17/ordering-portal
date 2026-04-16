# Full-Stack Ordering Portal

A professional-grade CRUD application built as a Senior Developer/System Designer assessment. This project demonstrates a robust architecture, automated unit testing, and modern full-stack integration.

## 🚀 System Overview

The system allows users to manage a catalog of orders with real-time database synchronization. It features a responsive dashboard, inline editing, and business logic validation.

### Core Tech Stack
- **Frontend:** React 19 (Vite), TypeScript, Tailwind CSS
- **Backend:** Node.js, Express.js, TypeScript (ES Modules)
- **Database:** Supabase (PostgreSQL) with Row-Level Security (RLS)
- **Testing:** Jest & ts-jest (Unit Testing)
- **Runtime:** tsx (Modern TypeScript execution)

## 📁 Project Structure

```
ordering-portal/
├── backend/                          # Node.js/Express backend
│   ├── src/
│   │   ├── config/                   # Configuration files
│   │   │   └── supabase.ts          # Supabase client setup
│   │   ├── controllers/             # HTTP request handlers
│   │   │   └── orderController.ts   # Order CRUD operations
│   │   ├── services/                # Business logic layer
│   │   │   └── orderService.ts      # Order service with validation
│   │   ├── tests/                   # Unit tests
│   │   │   └── orderService.test.ts # Service layer tests
│   │   └── index.ts                 # Server entry point
│   ├── package.json
│   ├── tsconfig.json
│   └── jest.config.js
├── frontend/                         # React frontend
│   ├── src/
│   │   ├── services/                # API client
│   │   │   └── api.ts               # HTTP client functions
│   │   ├── App.tsx                  # Main application component
│   │   ├── main.tsx                 # React entry point
│   │   ├── index.css                # Global styles
│   │   └── App.css                  # Component styles
│   ├── index.html                   # HTML template
│   ├── vite.config.ts               # Vite configuration
│   ├── tailwind.config.js           # Tailwind CSS config
│   ├── postcss.config.js            # PostCSS configuration
│   ├── eslint.config.js             # ESLint configuration
│   └── package.json
└── README.md                         # Project documentation
```

---

## 🏗️ Architectural Decisions

### 1. Layered Backend Architecture (Clean Architecture)
The backend is structured into three distinct layers to ensure a high degree of maintainability and testability:
- **Routes:** Defines endpoints and maps them to controllers.
- **Controllers:** Handles HTTP request/response logic and error mapping.
- **Services:** Contains the core business logic and direct database interactions.

### 2. Data Integrity & Security
- **Generated Columns:** `total_price` is calculated at the database level using `GENERATED ALWAYS AS (quantity * unit_price)`, ensuring a "Single Source of Truth."
- **Row-Level Security (RLS):** Configured Supabase policies to restrict database access to verified API requests.
- **Service Validation:** The `OrderService` validates incoming data (e.g., verifying quantity > 0) before any database hit.

### 3. Automated Unit Testing
Implemented a suite of Jest tests to verify the integrity of the `OrderService`. This ensures that even as the project grows, the core business rules cannot be accidentally broken (regression testing).

---

## 🛠️ Setup & Installation

### Prerequisites
- Node.js (v18 or higher)
- A Supabase account and project

### 1. Database Setup
Run the following SQL in your Supabase SQL Editor to create the schema:

```sql
CREATE TABLE orders (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  customer_name TEXT NOT NULL,
  product_name TEXT NOT NULL,
  quantity INTEGER NOT NULL CHECK (quantity > 0),
  unit_price NUMERIC NOT NULL,
  total_price NUMERIC GENERATED ALWAYS AS (quantity * unit_price) STORED,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'completed', 'cancelled'))
);

Note: Ensure you enable RLS policies for SELECT, INSERT, UPDATE, and DELETE for the anon role.

2. Backend Setup
Navigate to the backend: cd backend

Install dependencies: npm install

Create a .env file based on .env.example:

Code snippet
PORT=5000
SUPABASE_URL=your_project_url
SUPABASE_ANON_KEY=your_anon_key
Run the server: npm run dev

Run tests: npm test

3. Frontend Setup
Navigate to the frontend: cd frontend

Install dependencies: npm install

Start the UI: npm run dev

Access the portal at: http://localhost:5173

📋 Features Implemented
[x] Full CRUD: Create, Read, Update, and Delete orders.

[x] TypeScript: End-to-end type safety for both client and server.

[x] Responsive UI: Mobile-first dashboard built with Tailwind CSS.

[x] Business Logic Validation: Backend-level guards against invalid data.

[x] Modern Tooling: Utilizing ES Modules, Vite, and tsx.

👨‍💻 Developer
Gayantha Senior Developer / System Designer Assessment

