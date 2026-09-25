import express from "express"
import cors from "cors"
import path from "path"
import { fileURLToPath } from "url"
import 'dotenv/config'

import { dbConnect } from "./database/dbInfo.js"
import commonRouter from "./router/common_Router.js"
import userRouter from "./router/user_Router.js"
import adminRouter from "./router/admin_Router.js"
import ownerRouter from "./router/owner_Router.js"
import { ensureDefaultAdmin } from "./controller/admin_Controller.js"

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const serverApp = express()
const PORT = process.env.PORT || 4000

// Database connection
dbConnect().then(() => {
    ensureDefaultAdmin()
})

// Dynamic CORS configuration
const allowedOrigins = [
    "http://localhost:5173",
    "http://localhost:3000",
    "http://127.0.0.1:5173",
    process.env.CLIENT_URL
].filter(Boolean)

serverApp.use(cors({
    origin: (origin, callback) => {
        // Allow requests with no origin (like mobile apps, curl, postman)
        if (!origin || allowedOrigins.includes(origin) || origin.endsWith('.onrender.com') || origin.endsWith('.vercel.app')) {
            return callback(null, true)
        }
        return callback(null, true) // Permissive fallback for deployment testing
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"]
}))

serverApp.use(express.json({ limit: "25mb" }))
serverApp.use(express.urlencoded({ extended: true, limit: "25mb" }))

// Static assets serving
serverApp.use(express.static(path.join(__dirname, "public")))
serverApp.use("/public", express.static(path.join(__dirname, "public")))
serverApp.use("/uploads", express.static(path.join(__dirname, "public")))
serverApp.use("/productPics", express.static(path.join(__dirname, "public/productPics")))
serverApp.use("/userPics", express.static(path.join(__dirname, "public/userPics")))
serverApp.use("/profilePics", express.static(path.join(__dirname, "public/profilePics")))
serverApp.use("/idPic", express.static(path.join(__dirname, "public/idPic")))

// Health check endpoint for deployment monitoring (Render, Railway, UptimeRobot)
serverApp.get("/health", (req, res) => {
    res.status(200).json({ 
        status: "ok", 
        service: "RentHive Backend", 
        timestamp: new Date().toISOString() 
    })
})

// Route mounting
serverApp.use("/", commonRouter)
serverApp.use("/user", userRouter)
serverApp.use("/admin", adminRouter)
serverApp.use("/owner", ownerRouter)

// 404 handler
serverApp.use((req, res, next) => {
    res.status(404).json({
        success: false,
        message: `Endpoint ${req.originalUrl} not found`
    })
})

// Global Error Handler
serverApp.use((err, req, res, next) => {
    if (err.code === "LIMIT_FILE_SIZE") {
        return res.status(400).json({
            success: false,
            message: "Uploaded image is too large. Maximum supported file size is 25MB."
        })
    }
    if (err.name === "MulterError") {
        return res.status(400).json({
            success: false,
            message: `File upload error: ${err.message}`
        })
    }

    console.error("Unhandled Server Error:", err)
    res.status(err.status || 500).json({
        success: false,
        message: err.message || "Internal server error occurred",
        error: process.env.NODE_ENV === "production" ? undefined : err.stack
    })
})

serverApp.listen(PORT, () => {
    console.log(`RentHive server running on http://localhost:${PORT}`)
})
