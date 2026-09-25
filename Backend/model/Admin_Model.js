import mongoose from "mongoose";

const AdminSchema = new mongoose.Schema({
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    password: { type: String, required: true },
    phone: { type: String, default: "", trim: true },
    role: { type: String, default: "admin" },
    date: { type: Date, default: Date.now }
})

const AdminModel = mongoose.model("Admin", AdminSchema)
export default AdminModel