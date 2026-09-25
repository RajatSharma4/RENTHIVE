import mongoose from "mongoose";
import ContactModel from "../model/Contact_Model.js";
import AdminModel from "../model/Admin_Model.js";
import OwnerModel from "../model/Owner_Model.js"
import FeedbackModel from "../model/Feedback_Model.js";
import UserRegModel from "../model/User_Model.js"
import ProductModel from "../model/Product_Model.js";
import bcrypt from 'bcrypt';
import { genToken } from "../config/token.js";

// Ensure default admin exists
export async function ensureDefaultAdmin() {
    try {
        const existing = await AdminModel.findOne({ email: "admin@renthive.com" })
        if (!existing) {
            const hashedPassword = await bcrypt.hash("admin123", 10)
            const defaultAdmin = new AdminModel({
                name: "RentHive Administrator",
                email: "admin@renthive.com",
                password: hashedPassword,
                phone: "9999999999",
                role: "admin"
            })
            await defaultAdmin.save()
            console.log("Default admin created: admin@renthive.com / admin123")
        }
    } catch (e) {
        console.error("Error ensuring default admin:", e)
    }
}

// Admin login
export async function adminLogin(request, response) {
    try {
        const { email, password } = request.body
        if (!email || !password) {
            return response.status(400).json({ 
                success: false, 
                message: "Email and password are required" 
            })
        }

        await ensureDefaultAdmin()

        const normalizedEmail = email.toLowerCase().trim()
        let admin = await AdminModel.findOne({ email: normalizedEmail })

        if (!admin) {
            return response.status(401).json({ 
                success: false, 
                message: "Invalid admin credentials" 
            })
        }

        let isMatch = await bcrypt.compare(password, admin.password)
        if (!isMatch && admin.password === password) {
            isMatch = true
            admin.password = await bcrypt.hash(password, 10)
            await admin.save()
        }

        if (!isMatch) {
            return response.status(401).json({ 
                success: false, 
                message: "Invalid admin credentials" 
            })
        }

        const token = genToken(admin._id, 'admin', { email: admin.email, name: admin.name })
        const safeAdmin = {
            _id: admin._id,
            name: admin.name,
            email: admin.email,
            phone: admin.phone,
            role: 'admin'
        }

        return response.status(200).json({ 
            success: true, 
            status: "success", 
            message: "Admin Login Successful", 
            token, 
            user: safeAdmin,
            profileData: safeAdmin
        })
    } catch (err) {
        console.error("adminLogin error:", err)
        return response.status(500).json({ 
            success: false, 
            message: "Error during admin login", 
            error: err.message 
        })
    }
}

// Get all owners (sanitized)
export async function allOwners(request, response) {
    try {
        const owners = await OwnerModel.find().select('-password').sort({ date: -1 })
        return response.status(200).json({ 
            success: true, 
            profileData: owners 
        })
    } catch (err) {
        console.error("allOwners error:", err)
        return response.status(500).json({ 
            success: false, 
            message: "Error retrieving owners", 
            error: err.message 
        })
    }
}

// Get all users (sanitized)
export async function allUsers(request, response) {
    try {
        const users = await UserRegModel.find().select('-password').sort({ date: -1 })
        return response.status(200).json({ 
            success: true, 
            profileData: users 
        })
    } catch (err) {
        console.error("allUsers error:", err)
        return response.status(500).json({ 
            success: false, 
            message: "Error retrieving users", 
            error: err.message 
        })
    }
}

// Admin profile
export async function profile(request, response) {
    try {
        const email = request.query.email || request.user?.email
        if (!email) {
            return response.status(400).json({ 
                success: false, 
                message: "Email is required" 
            })
        }

        const adminDoc = await AdminModel.findOne({ email: email.toLowerCase().trim() }).select('-password')
        if (!adminDoc) {
            return response.status(404).json({ 
                success: false, 
                message: "Admin not found" 
            })
        }

        return response.status(200).json({ 
            success: true, 
            profileData: adminDoc 
        })
    } catch (err) {
        console.error("admin profile error:", err)
        return response.status(500).json({ 
            success: false, 
            message: "Error retrieving admin profile", 
            error: err.message 
        })
    }
}

// All contacts
export async function allContacts(request, response) {
    try {
        const contactDocs = await ContactModel.find().sort({ _id: -1 })
        return response.status(200).json({ 
            success: true, 
            ContactDetails: contactDocs 
        })
    } catch (err) {
        console.error("allContacts error:", err)
        return response.status(500).json({ 
            success: false, 
            message: "Error retrieving contacts", 
            error: err.message 
        })
    }
}

// All feedbacks
export async function allFeedbacks(request, response) {
    try {
        const feedbackDocs = await FeedbackModel.find().sort({ _id: -1 })
        return response.status(200).json({ 
            success: true, 
            FeedbackDetails: feedbackDocs 
        })
    } catch (err) {
        console.error("allFeedbacks error:", err)
        return response.status(500).json({ 
            success: false, 
            message: "Error retrieving feedbacks", 
            error: err.message 
        })
    }
}

// Moderation: Delete user
export async function deleteUser(request, response) {
    try {
        const { id } = request.params
        await UserRegModel.findByIdAndDelete(id)
        return response.status(200).json({ 
            success: true, 
            message: "User deleted successfully" 
        })
    } catch (err) {
        return response.status(500).json({ 
            success: false, 
            message: "Error deleting user", 
            error: err.message 
        })
    }
}

// Moderation: Delete owner
export async function deleteOwner(request, response) {
    try {
        const { id } = request.params
        await OwnerModel.findByIdAndDelete(id)
        // Also remove owner's products
        await ProductModel.deleteMany({ owner: id })
        return response.status(200).json({ 
            success: true, 
            message: "Owner and associated products deleted successfully" 
        })
    } catch (err) {
        return response.status(500).json({ 
            success: false, 
            message: "Error deleting owner", 
            error: err.message 
        })
    }
}