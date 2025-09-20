import mongoose from "mongoose";

const OwnerSchema = new mongoose.Schema({

    email: { type: String, required: true, unique:true },
    password: {type: String, required:true, length:45},
    fullname: { type: String, required: true, length:50 },
    phone: {type: Number, required:true, length:13},
    city: {type: String, required:true, length:50},
    address: {type: String, required:true, length:100},
    pic:{type:String, required:false, length:250},
    date: { type: Date, default: Date.now}

})

const OwnerModel = mongoose.model("Owners", OwnerSchema)
export default OwnerModel