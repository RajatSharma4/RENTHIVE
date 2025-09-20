import mongoose from "mongoose";

const ContactSchema = new mongoose.Schema({

    firstname:{type:String, required:true},
    lastname:{type:String, required:true},
    email:{type:String, required:true},
    phone:{type:String, required:true, length:13},
    message:{type:String, required:true},
    date:{type:Date, default:Date.now}



})

const ContactModel = mongoose.model("Contact", ContactSchema)
export default ContactModel