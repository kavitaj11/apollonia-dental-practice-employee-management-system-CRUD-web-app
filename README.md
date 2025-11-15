# Apollonia Dental Practice – Employee Management System

A full-stack CRUD web application for managing **employees** and **departments** for Apollonia Dental Practice.

This project serves as the foundation for a larger digital HR system, using:

- **Node.js**
- **Express**
- **MongoDB + Mongoose**
- **HTML, CSS, JavaScript**
- **REST API**
- **Docker & Docker Compose**

---

## 🚀 Features

### ✔ Employee Management
- Create, read, update, delete employees  
- Assign employees to a department  
- Store hire date, activity status, contact info  

### ✔ Department Management
- CRUD operations for departments  
- Prevent deletion of departments with active employees

### ✔ Modern Web UI
- Clean, responsive interface  
- Real-time data refresh without page reload  
- Inline edit and delete buttons  

### ✔ Validation & Friendly UI Errors
- Detect missing required fields on the client  
- Backend validation via Mongoose (required fields, unique email)  
- Error display box for backend errors (e.g., duplicate email, delete-protected department)  

### ✔ Automatic Seeding
- Pre-load sample departments  
- Pre-load sample employees  

---

## 🗂 Project Structure

```text
apollonia-employee-app/
├─ server.js
├─ seed.js
├─ package.json
├─ Dockerfile
├─ docker-compose.yml
├─ .env.sample
├─ models/
│  ├─ Employee.js
│  └─ Department.js
├─ routes/
│  ├─ employees.js
│  └─ departments.js
└─ public/
   ├─ index.html
   ├─ styles.css
   └─ app.js
```

---

## 📦 Installation & Running

### Option A — Local Setup (No Docker)

#### 1. Install dependencies

```bash
npm install
```

#### 2. Copy environment file

```bash
cp .env.sample .env
```

By default, `.env.sample` assumes a local MongoDB instance on:

```text
mongodb://localhost:27017/apollonia
```

Make sure MongoDB is running on your machine (e.g., via `mongod` or your OS service).

#### 3. (Optional) Seed sample data

```bash
npm run seed
```

This will:

- Clear existing `employees` and `departments`  
- Insert sample departments (Dentistry, Orthodontics, Administration)  
- Insert sample employees (John Doe, Sara Smith, Emily Clark)  

#### 4. Start the server

```bash
npm start
```

Or for development with auto-reload:

```bash
npm run dev
```

#### 5. Open the app

Visit:

```text
http://localhost:3000
```

---

### Option B — Docker & Docker Compose

You can run the API and MongoDB together using Docker.

#### 1. Build and start containers

```bash
docker-compose up --build
```

This will:

- Start a `mongo` container  
- Build & start the Node.js app container (`apollonia-app`)  
- Link the app to MongoDB via `MONGO_URI=mongodb://mongo:27017/apollonia`  

#### 2. Seed data inside the app container

```bash
docker-compose exec app npm run seed
```

#### 3. Open the app

Visit:

```text
http://localhost:3000
```

---

## 🔗 API Endpoints

### Departments

| Method | Endpoint              | Description              |
|--------|-----------------------|--------------------------|
| GET    | `/api/departments`    | Get all departments      |
| GET    | `/api/departments/:id`| Get one department       |
| POST   | `/api/departments`    | Create a new department  |
| PUT    | `/api/departments/:id`| Update a department      |
| DELETE | `/api/departments/:id`| Delete a department      |

> Note: Deleting a department with assigned employees is blocked and returns a 400 error.

### Employees

| Method | Endpoint            | Description            |
|--------|---------------------|------------------------|
| GET    | `/api/employees`    | Get all employees      |
| GET    | `/api/employees/:id`| Get one employee       |
| POST   | `/api/employees`    | Create a new employee  |
| PUT    | `/api/employees/:id`| Update an employee     |
| DELETE | `/api/employees/:id`| Delete an employee     |

---

## 🧪 Sample Seed Data

### Departments

- **Dentistry** – General dental care  
- **Orthodontics** – Braces and alignments  
- **Administration** – Office & operations  

### Employees

- **John Doe** – Dentist (Dentistry)  
- **Sara Smith** – Orthodontist (Orthodontics)  
- **Emily Clark** – Admin Assistant (Administration)  

---

## 🧰 Tech Stack

- **Backend:** Node.js, Express.js  
- **Database:** MongoDB with Mongoose  
- **Frontend:** HTML, CSS, Vanilla JavaScript  
- **API Style:** REST  
- **Containerization:** Docker & Docker Compose  

---

## ✅ How Validation & Errors Work

- Client-side validation prevents submitting:
  - Empty first name, last name, or email for employees  
  - Empty department name  

- Server-side validation:
  - Enforced via Mongoose schemas (`required`, `unique`)  
  - Duplicate email or department name returns a friendly error message  

- UI error handling:
  - All API errors are shown in a red error box at the top of the page  
  - Messages auto-hide after a few seconds  

This combination gives both a good **user experience** and solid **data integrity**.

---

## 📄 License

MIT – for educational and project use.

You are free to modify and extend this project as the Apollonia Dental Practice system grows (e.g., add patient assignments, projects, authentication, etc.).
