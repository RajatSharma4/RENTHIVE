import mongoose from "mongoose"
import OwnerModel from "../model/Owner_Model.js"
import ProductModel from "../model/Product_Model.js"
import InventoryModel from "../model/Inventory_Model.js"
import bcrypt from 'bcrypt'
import { genToken } from "../config/token.js"

// .........all Invoices (Scoped to Owner)..........
export async function allInvoice(request, response) {
    try {
        const email = request.query.email || request.user?.email
        const query = email ? { ownerEmail: email.toLowerCase().trim() } : {}

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

// ........Edit owner Profile.........
export async function editProfile(request, response) {
    try {
        const email = request.query.email || request.user?.email
        if (!email) {
            return response.status(400).json({ 
                success: false, 
                message: "Email is required to edit profile" 
            })
        }

        const { fullname, phone, city, address } = request.body
        const updatedOwner = await OwnerModel.findOneAndUpdate(
            { email: email.toLowerCase().trim() },
            { $set: { fullname, phone, city, address } },
            { new: true }
        ).select('-password')

        return response.status(200).json({ 
            success: true, 
            message: "Profile updated successfully", 
            updateStatus: { acknowledged: true },
            owner: updatedOwner 
        })
    } catch (err) {
        console.error("editProfile error:", err)
        return response.status(500).json({ 
            success: false, 
            message: "Error updating owner profile", 
            error: err.message 
        })
    }
}

// ........Update Inventory (Record offline/manual rental).........
export async function updateInventory(request, response) {
    try {
        const { userPhone, ownerEmail, duration, returnDate, rentedDate } = request.body
        const product = request.query.pid || request.body.product
        const idPic = request.file ? request.file.filename : ""

        if (!product || !userPhone) {
            return response.status(400).json({ 
                success: false, 
                message: "Product ID and user phone are required." 
            })
        }

        const newDoc = new InventoryModel({
            product,
            userPhone,
            ownerEmail: ownerEmail || request.user?.email || "",
            duration: duration || "1",
            returnDate: returnDate || "",
            idProof: idPic,
            productStatus: "rented",
            rentedDate: rentedDate ? new Date(rentedDate) : new Date()
        })
        await newDoc.save()

        // Sync Product status to 'rented'
        await ProductModel.findByIdAndUpdate(product, { productStatus: 'rented' })

        return response.status(200).json({ 
            success: true, 
            message: "Inventory updated & product marked as rented" 
        })
    } catch (err) {
        console.error("updateInventory error:", err)
        return response.status(500).json({ 
            success: false, 
            message: "Error updating inventory", 
            error: err.message 
        })
    }
}

// ........Release Rented Product Back to Available.........
export async function releaseProduct(request, response) {
    try {
        const { productId } = request.body
        if (!productId) {
            return response.status(400).json({ 
                success: false, 
                message: "Product ID is required" 
            })
        }

        const product = await ProductModel.findByIdAndUpdate(
            productId, 
            { productStatus: 'available' }, 
            { new: true }
        )

        // Also update latest inventory status if present
        await InventoryModel.updateMany(
            { product: productId, productStatus: 'rented' },
            { $set: { productStatus: 'returned' } }
        )

        return response.status(200).json({ 
            success: true, 
            message: "Product is now marked as available for rent", 
            product 
        })
    } catch (err) {
        console.error("releaseProduct error:", err)
        return response.status(500).json({ 
            success: false, 
            message: "Error releasing product", 
            error: err.message 
        })
    }
}

// ........My Products.........
export async function myProducts(request, response) {
    try {
        const email = request.query.email || request.user?.email
        if (!email) {
            return response.status(400).json({ 
                success: false, 
                message: "Email is required to fetch products" 
            })
        }

        const ownerDoc = await OwnerModel.findOne({ email: email.toLowerCase().trim() })
        if (!ownerDoc) {
            return response.status(404).json({ 
                success: false, 
                message: "Owner not found" 
            })
        }

        const productDoc = await ProductModel.find({ owner: ownerDoc._id }).sort({ _id: -1 })
        return response.status(200).json({ 
            success: true, 
            objectData: productDoc 
        })
    } catch (err) {
        console.error("myProducts error:", err)
        return response.status(500).json({ 
            success: false, 
            message: "Error retrieving owner products", 
            error: err.message 
        })
    }
}  

// .........Owner Profile Function.........
export async function profile(request, response) {
    try {
        const email = request.query.email || request.user?.email
        if (!email) {
            return response.status(400).json({ 
                success: false, 
                message: "Email is required to fetch profile" 
            })
        }

        const ownerDoc = await OwnerModel.findOne({ email: email.toLowerCase().trim() }).select('-password')
        if (!ownerDoc) {
            return response.status(404).json({ 
                success: false, 
                message: "Owner not found" 
            })
        }

        return response.status(200).json({ 
            success: true, 
            profileData: ownerDoc 
        })
    } catch (err) {
        console.error("owner profile error:", err)
        return response.status(500).json({ 
            success: false, 
            message: "Error retrieving owner profile", 
            error: err.message 
        })
    }
}

// .............ownerLogin function.........
export async function ownerLogin(request, response) {
    try {
        const { email, password } = request.body
        if (!email || !password) {
            return response.status(400).json({ 
                success: false, 
                message: "Email and password are required" 
            })
        }

        const normalizedEmail = email.toLowerCase().trim()
        const owner = await OwnerModel.findOne({ email: normalizedEmail })
        if (!owner) {
            return response.status(401).json({ 
                success: false, 
                message: "Invalid email or password" 
            })
        }

        let isMatch = await bcrypt.compare(password, owner.password)
        // Backward compatibility for existing plaintext passwords in database
        if (!isMatch && owner.password === password) {
            isMatch = true
            owner.password = await bcrypt.hash(password, 10)
            await owner.save()
        }

        if (!isMatch) {
            return response.status(401).json({ 
                success: false, 
                message: "Invalid email or password" 
            })
        }

        const token = genToken(owner._id, 'owner', { email: owner.email, name: owner.fullname })
        const safeOwner = {
            _id: owner._id,
            email: owner.email,
            fullname: owner.fullname,
            phone: owner.phone,
            city: owner.city,
            address: owner.address,
            pic: owner.pic,
            role: 'owner'
        }

        return response.status(200).json({ 
            success: true,
            status: "success", 
            message: "Login Successful", 
            token, 
            user: safeOwner,
            profileData: safeOwner
        })
    } catch (err) {
        console.error("ownerLogin error:", err)
        return response.status(500).json({ 
            success: false, 
            message: "Error during owner login", 
            error: err.message 
        })
    }
}

// .............ownerRegistration function.........
export async function ownerRegistration(request, response) {
    try {
        const { email, password, fullname, phone, city, address } = request.body
        const pic = request.file ? request.file.filename : ""

        if (!email || !password || !fullname || !phone) {
            return response.status(400).json({ 
                success: false, 
                message: "Email, password, fullname, and phone are required" 
            })
        }

        const normalizedEmail = email.toLowerCase().trim()
        const existingOwner = await OwnerModel.findOne({ email: normalizedEmail })
        if (existingOwner) {
            return response.status(400).json({ 
                success: false, 
                message: "Owner with this email already exists" 
            })
        }

        const hashedPassword = await bcrypt.hash(password, 10)
        const regDoc = new OwnerModel({ 
            email: normalizedEmail, 
            password: hashedPassword, 
            fullname, 
            phone, 
            city: city || "", 
            address: address || "", 
            pic 
        })
        await regDoc.save()

        const token = genToken(regDoc._id, 'owner', { email: regDoc.email, name: regDoc.fullname })
        const safeOwner = {
            _id: regDoc._id,
            email: regDoc.email,
            fullname: regDoc.fullname,
            phone: regDoc.phone,
            city: regDoc.city,
            address: regDoc.address,
            pic: regDoc.pic,
            role: 'owner'
        }

        return response.status(201).json({ 
            success: true, 
            status: "success",
            message: "Registration completed successfully", 
            token, 
            user: safeOwner 
        })
    } catch (err) {
        console.error("ownerRegistration error:", err)
        return response.status(500).json({ 
            success: false, 
            message: "Error during owner registration", 
            error: err.message 
        })
    }
}

// .............addProduct function.........
export async function addProduct(request, response) {
    try {
        const { owner, productName, productCategory, productDescription, productPrice } = request.body
        const productPic = request.file ? request.file.filename : ""

        if (!productName || !productCategory || !productPrice) {
            return response.status(400).json({ 
                success: false, 
                message: "Product name, category, and price are required." 
            })
        }

        let ownerId = owner
        if (!ownerId && request.user?.userId) {
            ownerId = request.user.userId
        }

        if (!ownerId) {
            return response.status(400).json({ 
                success: false, 
                message: "Owner ID is missing" 
            })
        }

        const newDoc = new ProductModel({
            owner: ownerId,
            productName,
            productCategory,
            productDescription: productDescription || "",
            productPrice,
            productPic,
            productStatus: 'available'
        })
        await newDoc.save()

        return response.status(201).json({ 
            success: true, 
            message: "Product added successfully", 
            product: newDoc 
        })
    } catch (err) {
        console.error("addProduct error:", err)
        return response.status(500).json({ 
            success: false, 
            message: "Error adding product", 
            error: err.message 
        })
    }
}