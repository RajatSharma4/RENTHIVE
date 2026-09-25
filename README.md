# 🐝 RentHive — Modern Peer-to-Peer Rental Marketplace

RentHive is a full-stack peer-to-peer rental marketplace designed to make accessing premium goods—from cinema cameras and gaming setups to luxury furniture and electric bikes—affordable, simple, and sustainable.

---

## 🚀 Key Highlights & Architectural Overhaul

- **Unified Design System**: Built with modern typography (*Plus Jakarta Sans*), fluid glassmorphism, responsive CSS grid layouts, and an **Indigo & Slate** palette with **Emerald** accents.
- **Enterprise-Grade Authentication**: Unified JWT (`jsonwebtoken`) token architecture with Bearer token authentication and Role-Based Access Control (`user`, `owner`, `admin`).
- **Cryptographic Security**: Passwords salted and hashed with `bcryptjs`.
- **In-App & Offline Rental Lifecycle**:
  - In-app rental booking modal with duration, return date calculations, and real-time total pricing.
  - Offline rental recording for owners with renter identification document uploads.
  - Dynamic status toggling (`available` ⇄ `rented` ⇄ `returned`).
  - Scoped invoice history for both renters and owners.
- **Direct WhatsApp Integration**: Instant chat link pre-populated with product name and renter inquiry.
- **Admin Management Console**:
  - Live metric counters for renters, rental partners, inquiries, and customer feedback.
  - Moderation and delete controls across users and owners.
  - Pre-seeded super-administrator (`admin@renthive.com` / `admin123`).
- **Fully Responsive**: Optimized for fluid viewports on mobile smartphones (<576px), tablets (768px-1024px), and desktop screens (>1200px) with offcanvas navigation drawers.

---

## 🛠️ Technology Stack

### Frontend
- **Framework**: React 19 SPA with Vite
- **Routing**: React Router DOM v7 with `ProtectedRoute` guards and role authentication
- **Styling**: Vanilla CSS Design System + Bootstrap 5 grid utilities + Font Awesome & Bootstrap Icons
- **HTTP Client**: Axios with centralized `apiClient` Bearer token interceptor
- **Alerts & Modals**: SweetAlert2 & React Toastify

### Backend
- **Runtime**: Node.js & Express.js
- **Database**: MongoDB with Mongoose ODM
- **File Uploads**: Multer with file extension preservation and filename sanitization
- **Security**: CORS whitelist, Bcrypt, JWT auth middleware

---

## ⚙️ Environment Configuration

### Backend (`Backend/.env`)
```env
PORT=4000
MONGODB_URI=mongodb://localhost:27017/renthive
JWT_SECRET=renthive_super_secure_jwt_secret_key_2025
CLIENT_ORIGIN=http://localhost:5173
```

### Frontend (`Frontend/.env`)
```env
VITE_API_BASE_URL=http://localhost:4000
```

---

## 🏃 Running the Project Locally

### 1. Backend Server
```bash
cd Backend
npm install
npm run dev
# Server starts on http://localhost:4000
# Automatic admin seed verified: admin@renthive.com / admin123
```

### 2. Frontend Development Server
```bash
cd Frontend
npm install
npm run dev
# Client starts on http://localhost:5173
```

### 3. Production Build
```bash
cd Frontend
npm run build
# Outputs optimized production assets to Frontend/dist
```

---

## 🔑 Default Credentials & Role Accounts

| Role | Email | Password | Access Portal |
| :--- | :--- | :--- | :--- |
| **Super Admin (Primary)** | `admin@renthive.com` | `admin123` | `/adminLogin` |
| **Super Admin (Legacy)** | `admin@gmail.com` | `admin` | `/adminLogin` |
| **Renter** | *Self-register* | *User password* | `/userLogin` or `/register` |
| **Partner / Owner** | *Self-register* | *Owner password* | `/ownerLogin` or `/ownerRegister` |

---

## 🌐 Production Deployment

- **Frontend (Vercel / Netlify / Render Static Site)**:
  - Root directory: `Frontend`
  - Build command: `npm run build`
  - Output directory: `dist`
  - Environment variable: `VITE_API_BASE_URL=https://your-backend-api.onrender.com`
- **Backend (Render Web Service / Railway / AWS)**:
  - Root directory: `Backend`
  - Build command: `npm install`
  - Start command: `npm start`
  - Environment variables: `PORT=4000`, `MONGODB_URI=<your-mongodb-atlas-url>`, `JWT_SECRET=<strong-random-key>`, `CLIENT_ORIGIN=https://your-frontend.vercel.app`
