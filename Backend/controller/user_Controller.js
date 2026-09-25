import mongoose from "mongoose"
import FeedbackModel from "../model/Feedback_Model.js"
import UserRegModel from "../model/User_Model.js"
import ProductModel from "../model/Product_Model.js"
import InventoryModel from "../model/Inventory_Model.js"
import OwnerModel from "../model/Owner_Model.js"
import bcrypt from 'bcrypt'
import { genToken } from "../config/token.js"

// .........userRegistration..........
export async function userRegisteration(request, response) {
    try {
        const { email, password, name, phone, city, address } = request.body
        const pic = request.file ? request.file.filename : ""

        if (!email || !password || !name || !phone) {
            return response.status(400).json({ 
                success: false, 
                message: "Email, password, name, and phone are required." 
            })
        }

        const normalizedEmail = email.toLowerCase().trim()
        const existingUser = await UserRegModel.findOne({ email: normalizedEmail })
        if (existingUser) {
            return response.status(400).json({ 
                success: false, 
                message: "User with this email already exists. Please log in." 
            })
        }

        const hashedPassword = await bcrypt.hash(password, 10)
        const userRegDoc = new UserRegModel({ 
            email: normalizedEmail, 
            password: hashedPassword, 
            name, 
            phone, 
            city: city || "", 
            address: address || "", 
            pic 
        })
        await userRegDoc.save()

        const token = genToken(userRegDoc._id, 'user', { email: userRegDoc.email, name: userRegDoc.name })
        const safeUser = {
            _id: userRegDoc._id,
            email: userRegDoc.email,
            name: userRegDoc.name,
            phone: userRegDoc.phone,
            city: userRegDoc.city,
            address: userRegDoc.address,
            pic: userRegDoc.pic,
            role: 'user'
        }

        return response.status(201).json({ 
            success: true, 
            status: "success",
            message: "User registered successfully", 
            token, 
            user: safeUser 
        })
    } catch (err) {
        console.error("userRegisteration error:", err)
        return response.status(500).json({ 
            success: false, 
            message: "Internal server error during registration", 
            error: err.message 
        })
    }
}

// ...........user Login function.........
export async function userLogin(request, response) {
    try {
        const { email, password } = request.body
        if (!email || !password) {
            return response.status(400).json({ 
                success: false, 
                message: "Email and password are required" 
            })
        }

        const normalizedEmail = email.toLowerCase().trim()
        const user = await UserRegModel.findOne({ email: normalizedEmail })
        if (!user) {
            return response.status(401).json({ 
                success: false, 
                message: "Invalid email or password" 
            })
        }

        let isMatch = await bcrypt.compare(password, user.password)
        // Backward compatibility for existing plaintext passwords in database
        if (!isMatch && user.password === password) {
            isMatch = true
            user.password = await bcrypt.hash(password, 10)
            await user.save()
        }

        if (!isMatch) {
            return response.status(401).json({ 
                success: false, 
                message: "Invalid email or password" 
            })
        }

        const token = genToken(user._id, 'user', { email: user.email, name: user.name })
        const safeUser = {
            _id: user._id,
            email: user.email,
            name: user.name,
            phone: user.phone,
            city: user.city,
            address: user.address,
            pic: user.pic,
            role: 'user'
        }

        return response.status(200).json({ 
            success: true,
            status: "success", 
            message: "Login Successful", 
            token, 
            user: safeUser 
        })
    } catch (err) {
        console.error("userLogin error:", err)
        return response.status(500).json({ 
            success: false, 
            message: "Internal server error during login", 
            error: err.message 
        })
    }
}

// .........Logout.........
export const Logout = async (req, res) => {
    try {
        return res.status(200).json({ 
            success: true, 
            message: "Logout Successfully" 
        })
    } catch (error) {
        return res.status(500).json({ 
            success: false, 
            message: `Logout error: ${error.message}` 
        })
    }
}

// ........add feedback.........
export async function addFeedback(request, response) {
    try {
        const { fullname, email, rating, remarks } = request.body

        if (!fullname || !email || !remarks) {
            return response.status(400).json({ 
                success: false, 
                message: "Full name, email, and remarks are required." 
            })
        }

        const feedbackDoc = new FeedbackModel({ 
            fullname, 
            email: email.toLowerCase().trim(), 
            rating: Number(rating) || 5, 
            remarks 
        })
        await feedbackDoc.save()

        return response.status(201).json({ 
            success: true, 
            message: "Feedback submitted successfully" 
        })
    } catch (err) {
        console.error("addFeedback error:", err)
        return response.status(500).json({ 
            success: false, 
            message: "Error submitting feedback", 
            error: err.message 
        })
    }
}

// ......invoices (scoped to current user).........
export async function allInvoice(request, response) {
    try {
        const email = request.query.email || request.user?.email
        const phone = request.query.phone

        const query = {}
        if (email) {
            query.$or = [{ userEmail: email.toLowerCase().trim() }, { userPhone: phone }]
        } else if (phone) {
            query.userPhone = phone
        }

        const invoiceDoc = await InventoryModel.find(query)
            .populate('product')
            .sort({ rentedDate: -1 })

        return response.status(200).json({ 
            success: true, 
            InvoiceDetail: invoiceDoc 
        })
    } catch (err) {
        console.error("allInvoice error:", err)
        return response.status(500).json({ 
            success: false, 
            message: "Error retrieving invoices", 
            error: err.message 
        })
    }
}

// ......Direct in-app booking/rent request.......
export async function bookProduct(request, response) {
    try {
        const { productId, userPhone, userEmail, duration, returnDate, rentedDate } = request.body

        if (!productId || !userPhone || !duration) {
            return response.status(400).json({ 
                success: false, 
                message: "Product ID, phone number, and duration are required." 
            })
        }

        const product = await ProductModel.findById(productId).populate('owner')
        if (!product) {
            return response.status(404).json({ 
                success: false, 
                message: "Product not found" 
            })
        }

        if (product.productStatus === 'rented') {
            return response.status(400).json({ 
                success: false, 
                message: "This product is currently rented and unavailable." 
            })
        }

        const ownerEmail = product.owner?.email || "owner@renthive.com"

        const inventoryDoc = new InventoryModel({
            product: productId,
            userPhone,
            userEmail: userEmail || request.user?.email || "",
            ownerEmail,
            duration: String(duration),
            returnDate: returnDate || "",
            productStatus: "rented",
            rentedDate: rentedDate ? new Date(rentedDate) : new Date()
        })
        await inventoryDoc.save()

        // Update product status to rented
        product.productStatus = 'rented'
        await product.save()

        return response.status(201).json({ 
            success: true, 
            message: "Product rented successfully! Owner has been notified.", 
            inventory: inventoryDoc 
        })
    } catch (err) {
        console.error("bookProduct error:", err)
        return response.status(500).json({ 
            success: false, 
            message: "Error processing rental booking", 
            error: err.message 
        })
    }
}

// for set category filter
export async function setCategory(request, response) {
    try {
        const category = request.query.category
        const filter = {}
        if (category && category !== 'all' && category !== '') {
            filter.productCategory = new RegExp(`^${category}$`, 'i')
        }
        const filterProducts = await ProductModel.find(filter)
            .populate('owner', 'fullname phone address city email')
            .sort({ _id: -1 })
            .exec()

        return response.status(200).json({ 
            success: true, 
            objectData: filterProducts 
        })
    } catch (err) {
        console.error("setCategory error:", err)
        return response.status(500).json({ 
            success: false, 
            message: "Error filtering products by category", 
            error: err.message 
        })
    }
}

// .......showProduct function.........
export async function viewProduct(request, response) {
    try {
        const search = request.query.search
        const filter = {}

        if (search) {
            filter.$or = [
                { productName: { $regex: search, $options: 'i' } },
                { productCategory: { $regex: search, $options: 'i' } },
                { productDescription: { $regex: search, $options: 'i' } }
            ]
        }

        const productDoc = await ProductModel.find(filter)
            .populate('owner', 'fullname phone address city email')
            .sort({ _id: -1 })
            .exec()

        return response.status(200).json({ 
            success: true, 
            objectData: productDoc 
        })
    } catch (err) {
        console.error("viewProduct error:", err)
        return response.status(500).json({ 
            success: false, 
            message: "Error retrieving products", 
            error: err.message 
        })
    }
}

// .........userProfile Function.....
export async function profile(request, response) {
    try {
        const email = request.query.email || request.user?.email
        if (!email) {
            return response.status(400).json({ 
                success: false, 
                message: "Email is required to fetch profile" 
            })
        }

        const userDoc = await UserRegModel.findOne({ email: email.toLowerCase().trim() }).select('-password')
        if (!userDoc) {
            return response.status(404).json({ 
                success: false, 
                message: "User not found" 
            })
        }

        return response.status(200).json({ 
            success: true, 
            profileData: userDoc 
        })
    } catch (err) {
        console.error("profile error:", err)
        return response.status(500).json({ 
            success: false, 
            message: "Error retrieving user profile", 
            error: err.message 
        })
    }
}

// ........Edit UserProfile.......
export async function editProfile(request, response) {
    try {
        const email = request.query.email || request.user?.email
        if (!email) {
            return response.status(400).json({ 
                success: false, 
                message: "Email is required to edit profile" 
            })
        }

        const { name, phone, city, address } = request.body
        const updatedUser = await UserRegModel.findOneAndUpdate(
            { email: email.toLowerCase().trim() },
            { $set: { name, phone, city, address } },
            { new: true }
        ).select('-password')

        return response.status(200).json({ 
            success: true, 
            message: "Profile updated successfully", 
            updateStatus: { acknowledged: true }, 
            user: updatedUser 
        })
    } catch (err) {
        console.error("editProfile error:", err)
        return response.status(500).json({ 
            success: false, 
            message: "Error updating profile", 
            error: err.message 
        })
    }
}
