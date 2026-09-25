import mongoose from "mongoose";

const UserRegSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    password: { type: String, required: true },
    name: { type: String, required: true, trim: true },
    phone: { type: String, required: true, trim: true },
    city: { type: String, required: true, trim: true },
    address: { type: String, required: true, trim: true },
    pic: { type: String, default: "" },
    role: { type: String, default: "user" },
    date: { type: Date, default: Date.now }
})

const UserRegModel = mongoose.model("userReg", UserRegSchema)
export default UserRegModel