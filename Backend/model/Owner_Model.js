import mongoose from "mongoose";

const OwnerSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    password: { type: String, required: true },
    fullname: { type: String, required: true, trim: true },
    phone: { type: String, required: true, trim: true },
    city: { type: String, required: true, trim: true },
    address: { type: String, required: true, trim: true },
    pic: { type: String, default: "" },
    role: { type: String, default: "owner" },
    date: { type: Date, default: Date.now }
})

const OwnerModel = mongoose.model("Owners", OwnerSchema)
export default OwnerModel