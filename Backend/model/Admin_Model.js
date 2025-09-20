import mongoose from "mongoose";

const AdminSchema = new mongoose.Schema({

    name:{type:String, required:true},
    email:{type:String, required:true, required:true},
    password:{type:String, required:true},
    phone:{type:String, required:true, length:13},
   



})

const AdminModel = mongoose.model("Admin", AdminSchema)
export default AdminModel