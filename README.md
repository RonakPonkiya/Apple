# React + Vite

# 📘 React Practical Task – Project Documentation

## 🗂️ Project Structure

src/
│
├── App.jsx                    # Main application component
├── main.jsx                   # Entry point
├── index.css                  # Global styles
│
├── components/                # Reusable UI components
│   ├── Carousel.jsx           # Image carousel for landing page
│   ├── Modal.jsx              # Reusable modal for product view/update
│   ├── Navbar.jsx             # Responsive navbar
│   ├── ProductForm.jsx        # Form to create or update a product
│   ├── ProductTable.jsx       # Table displaying product list
│   └── Auth/
│       ├── LoginForm.jsx      # Login form with validations
│       └── SignupForm.jsx     # Signup form with validations
│
├── context/
│   └── AuthContext.jsx        # Global context for authentication state
│
├── Layout/
│   └── Layout.jsx             # Common layout wrapper with Navbar
│
├── pages/                     # Route-based page views
│   ├── HomePage.jsx           # Landing page with carousel
│   ├── Login.jsx              # Login screen
│   ├── Signup.jsx             # Signup screen
│   └── Products.jsx           # products screen
│
├── routes/
│   └── AppRoutes.jsx          # All app routes 
│
└── utils/
    └── api.jsx                # Utility for API interactions 
```

---

## ✅ Features Overview

### 1️⃣ Landing Page

* ✅ Contains a **Navbar** with:

  * Logo
  * Login and Signup buttons
* ✅ Displays an **Image Carousel** (in `Carousel.jsx`)
* ✅ Additional section with some welcome text or a call to action

---

### 2️⃣ Signup Form (`SignupForm.jsx`)

* ✅ Fields:

  * Username
  * Email
  * Password
  * Confirm Password
* ✅ Validations:

  * All fields are required
  * Email must be valid
  * Password & Confirm Password must match
* ✅ Data is stored in **Local Storage** (no backend)

---

### 3️⃣ Login Form (`LoginForm.jsx`)

* ✅ Fields:

  * Username
  * Password
* ✅ Validates against existing **Local Storage** users
* ❗ Only previously signed up users can log in

---

### 4️⃣ Authenticated Navbar

* 🔐 After Login/Signup:

  * ✅ Navbar shows Logout button
  * ✅ Displays logged-in username

---

### 5️⃣ Product Management (`Products.jsx`)

> 🔐 Protected Button (accessible only after login)

* ✅ Add New Product (via `ProductForm`)
* ✅ Product Table (via `ProductTable`) displays:

  * Title
  * Price
  * Description
  * Category
  * **Actions**:

    * **View** (opens modal with full details)
    * **Update** (editable form in modal, data displayed on submit via console/alert ,accessible only after login)
    * **Delete** (removes product, confirmation via console/alert, accessible only after login)

---

### 6️⃣ Search Functionality

* ✅ Live filter/search by product **title or category**
* ✅ Input box filters the data in real time

---

### 7️⃣ Dropdown Filter for Table

* ✅ Dropdown component filters data by **category**
* ✅ Can be combined with search for better UX

---

## 🔒 Authentication (LocalStorage Based)

* Authentication context (`AuthContext.jsx`) manages login/logout state
* User is stored in `localStorage` and retrieved across page reloads
