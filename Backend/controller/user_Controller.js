import mongoose from "mongoose"
import FeedbackModel from "../model/Feedback_Model.js"
import UserRegModel from "../model/User_Model.js"
import ProductModel from "../model/Product_Model.js"
import InventoryModel from "../model/Inventory_Model.js"
import OwnerModel from "../model/Owner_Model.js"



//......invoices.........
export async function allInvoice(request, response){
  try{
  const invoiceDoc = await InventoryModel.find()
  console.log(`All Invoices ${invoiceDoc}`);

  response.json({"InvoiceDetail": invoiceDoc})
  
  }
  catch(err){
    console.log(err);
    
  }
}



//........Edit UserProfile.......
export async function editProfile(request, response) {
   const newData = request.body

   const email = request.query.email

   try {
      const { name, phone, city, address } = newData
      const filterCondition = { email: email }

      const modifiedData = {
         $set:
         {
            name: name,
            phone: phone,
            city: city,
            address: address
         }
      }

      const status = await UserRegModel.updateOne(filterCondition, modifiedData)
      console.log(`status is ${status}`);


      response.json({ "updateStatus": status })

   }
   catch (err) {
      console.log(err);

   }


}


//for set category
export async function setCategory(request, response) {
   try {
      const category = request.query.category
      const filterProducts = await ProductModel.find({ productCategory: category }).populate('owner', 'fullname phone address city').exec()
      response.json({ objectData: filterProducts })
   }
   catch (err) {
      console.log(err);

   }
}




//.......showProduct function.........
export async function viewProduct(request, response) {

   try {

      const productDoc = await ProductModel.find().populate('owner', 'fullname phone address city').exec()
      response.json({ "objectData": productDoc })

   }
   catch (err) {
      console.log(err);

   }

}


//.........userProfile Function.....
export async function profile(request, response) {
   const email = request.query.email
   console.log(`Email of user is ${email}`)

   try {
      const UserDoc = await UserRegModel.findOne({ email: email })
      response.json({ "profileData": UserDoc })
   }
   catch (err) {
      console.log(err);

   }
}



//...........user Login function.........
export async function userLogin(request, response) {
   const loginData = request.body
   const { email, password } = loginData

   try {
      const userLoginDoc = await UserRegModel.findOne({ email: email, password: password })
      if (userLoginDoc != null) {
         response.json({ "message": "Login Successfull", "token": email, "status": "success" })
      }
      else {
         response.json({ "message": "Invalid Credentials" })
      }
   }
   catch (err) {
      console.log(err);

   }
}


//........add feedback.........
export async function addFeedback(request, response) {
   const feedbackObject = request.body

   const { fullname, email, rating, remarks } = feedbackObject  //object destructuring 



   try {

      const feedbackDoc = new FeedbackModel({ fullname, email, rating, remarks })
      await feedbackDoc.save()
      console.log("Contact added");

      response.json({ "message": "Contact added successfully" })

   }
   catch (err) {
      console.log(err);

   }



}


//.........userRegistration..........
export async function userRegisteration(request, response) {
   const userRegObject = request.body

   const { email, password, name, phone, city, address } = userRegObject
   const pic = request.file.filename
  
   console.log(`Pic name is ${pic}`);


   try {

      const userRegDoc = new UserRegModel({ email, password, name, phone, city, address, pic })
      await userRegDoc.save()
      console.log("Contact added");

      response.json({ "message": "Register successfully" })

   }
   catch (err) {
      console.log(err);

   }
}