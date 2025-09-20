import mongoose from "mongoose";

const UserRegSchema = new mongoose.Schema({

    email: { type: String, required: true, unique:true },
    password: {type: String, required:true, length:45},
    name: { type: String, required: true, length:50 },
    phone: {type: Number, required:true, length:13},
    city: {type: String, required:true, length:50},
    address: {type: String, required:true, length:100},
    pic:{type:String, required:false, length:250},
    date: { type: Date, default: Date.now}

})

const UserRegModel = mongoose.model("userReg", UserRegSchema)
export default UserRegModel